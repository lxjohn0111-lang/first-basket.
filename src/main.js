// Courtside - application shell: boot, main loop, menus, pause, pointer lock and
// focus handling. The structure follows First Touch's shell.
import css from './ui/styles.css';
import { SceneView } from './render/view.js';
import { AudioSystem } from './audio/audio.js';
import { Input } from './core/input.js';
import { Hud } from './ui/hud.js';
import { TouchControls } from './ui/touch.js';
import { GameSession } from './game/session.js';
import { loadSettings, saveSettings, loadStyle, saveStyle, hasSavedSettings } from './core/settings.js';
import { storage } from './core/storage.js';
import { Screens } from './ui/screens.js';
import { TEAMS, teamById, teamConfig, defaultPlayer } from './game/teams.js';
import { resolveKits } from './render/palette.js';
import { GAME_LENGTHS } from './sim/constants.js';
import { makePractice } from './game/practice.js';

const PROFILE_KEY = 'courtside.profile', RECORDS_KEY = 'courtside.records';

class App {
  constructor() {
    const st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
    this.params = new URLSearchParams(location.search);
    this.coarse = !!(window.matchMedia && matchMedia('(pointer: coarse)').matches);
    this.settings = loadSettings(this.coarse);
    if (this.coarse && !hasSavedSettings()) this.settings.quality = 'medium';
    this.canvas = document.getElementById('game');
    this.uiRoot = document.getElementById('ui');
    this.view = new SceneView(this.canvas, { quality: this.settings.quality, preserve: this.params.has('preserve') });
    this.view.setQuality(this.settings.quality);
    this.style = this.params.get('style') || loadStyle();
    this.view.setStyle(this.style);
    this.audio = new AudioSystem();
    this.audio.setVolumes({ master: this.settings.master, sfx: this.settings.sfx, crowd: this.settings.crowd });
    this.input = new Input(this.canvas);
    this.input.sensitivity = this.settings.sensitivity;
    this.input.invertY = this.settings.invertY;
    this.hud = new Hud(this.uiRoot);
    this.touch = new TouchControls(this, this.uiRoot);
    this.setTouchMode(this.settings.touch === 'on' || (this.settings.touch !== 'off' && this.coarse));
    window.addEventListener('pointerdown', (e) => {
      if (this.settings.touch !== 'auto') return;
      if (e.pointerType === 'touch' && !this.input.touchMode) this.setTouchMode(true);
      else if (e.pointerType === 'mouse' && this.input.touchMode && !this.input.fromTouch(e)) this.setTouchMode(false);
    }, true);
    this.profile = this.loadJSON(PROFILE_KEY, defaultPlayer());
    this.records = this.loadJSON(RECORDS_KEY, { wins: 0, losses: 0, games: 0, bestShootout: 0, practiceDone: false, points: 0 });
    this.screens = new Screens(this);
    this.session = null;
    this.menuSession = null;
    this.paused = false;
    this.last = performance.now();
    this.fpsCap = Number(this.params.get('fps') || 0);
    this.frameAcc = 0;
    this.adapt = { on: this.params.has('adapt') || (!navigator.webdriver && !this.fpsCap), ema: 1 / 60, scale: 1, floor: 0.5, low: 0, high: 0, check: null };

    this.input.onPause = () => this.togglePause();
    this.input.onToggleLock = () => this.toggleLock();
    this.input.onSkip = () => { if (this.session && this.session.cfg.practice && !this.paused && this.session.cfg.practice.skip) this.session.cfg.practice.skip(this.session); };
    this.canvas.addEventListener('click', () => {
      if (this.session && !this.paused && this.input.active && !this.input.touchMode && !this.input.locked && !this.input.dragMode) this.input.requestLock();
    });
    this.input.onLockLost = () => { if (this.session && !this.paused) this.pause(document.hasFocus() ? 'lock' : 'blur'); };
    this.input.onLockGained = () => { this.lockFails = 0; if (this.session && this.awaitingLock) this.unpause(); };
    this.input.onLockError = () => { if (this.session && this.awaitingLock) this.lockFailed(); };
    document.addEventListener('visibilitychange', () => { if (document.hidden) this.onBlur(); else this.onFocus(); });
    window.addEventListener('blur', () => this.onBlur());
    window.addEventListener('focus', () => this.onFocus());
    window.addEventListener('resize', () => this.view.resize());
    const unlock = () => { this.audio.init(); if (!this.paused || !this.session) this.audio.resume(); };
    for (const t of ['pointerdown', 'pointerup', 'touchend', 'click', 'keydown']) window.addEventListener(t, unlock, { capture: true });
    document.addEventListener('gesturestart', (e) => e.preventDefault());
    document.addEventListener('contextmenu', (e) => { if (!(e.target.closest && e.target.closest('input'))) e.preventDefault(); });

    document.getElementById('boot')?.remove();
    this.startMenuBackground();
    this.screens.mainMenu();
    requestAnimationFrame((t) => this.loop(t));
    window.__cs = this;
    this.debugStep = (n) => { const s = this.session || this.menuSession; for (let i = 0; i < n; i++) { s.match.step(1 / 120); if (s.cfg.practice) s.cfg.practice.step(s, 1 / 120); } };
    const auto = this.params.get('auto');
    if (auto) setTimeout(() => this.autostart(auto), 50);
  }

  loadJSON(key, def) {
    try { const r = storage.getItem(key); return r ? { ...def, ...JSON.parse(r) } : { ...def }; } catch (e) { return { ...def }; }
  }
  saveJSON(key, v) { try { storage.setItem(key, JSON.stringify(v)); return true; } catch (e) { return false; } }
  saveProfile() { if (!this.saveJSON(PROFILE_KEY, this.profile)) this.screens.toast('Your player could not be saved (storage unavailable).', true); }
  saveRecords() { this.saveJSON(RECORDS_KEY, this.records); }

  autostart(kind) {
    const q = this.params;
    if (kind === 'quick' || kind === '1v1') this.startGame({ format: kind === '1v1' ? '1v1' : '3v3', home: q.get('home') || 'harbor', away: q.get('away') || 'mesa', venue: q.get('venue') || (kind === '1v1' ? 'gym' : 'arena'), live: q.has('live'), clock: q.get('clock') ? Number(q.get('clock')) : undefined, target: q.get('target') ? Number(q.get('target')) : undefined });
    else if (kind.startsWith('practice')) this.startPractice(kind.split(':')[1] || 'drills', { live: q.has('live') });
  }

  // ------------------------------------------------------------------ loop
  loop(t) {
    requestAnimationFrame((tt) => this.loop(tt));
    let dt = (t - this.last) / 1000;
    this.adaptResolution(dt);
    if (this.fpsCap) {
      this.frameAcc += dt;
      this.last = t;
      if (this.frameAcc < 1 / this.fpsCap) return;
      dt = this.frameAcc;
      this.frameAcc = 0;
    } else this.last = t;
    dt = Math.min(dt, 0.1);
    const s = this.session || this.menuSession;
    if (s) s.frame(this.paused && this.session ? 0 : dt);
    this.updateLockHint();
    const playing = !!(this.session && this.session.human && !this.paused && !this.session.ended);
    this.touch.setVisible(this.input.touchMode && playing);
    if (this.touch.visible) this.touch.update(this.session);
    if (this.onFrame) this.onFrame(dt);
  }

  updateLockHint() {
    const show = !!(this.session && !this.paused && !this.session.ended && this.session.human && this.input.active && !this.input.touchMode && !this.input.locked && !this.input.dragMode);
    if (!this.lockHint && show) {
      this.lockHint = document.createElement('div');
      this.lockHint.className = 'tut-click';
      this.lockHint.innerHTML = 'Click to take control<small>the mouse looks and aims</small>';
      this.uiRoot.appendChild(this.lockHint);
    }
    if (this.lockHint) this.lockHint.hidden = !show;
    const drag = !!(this.session && !this.paused && !this.session.ended && this.session.human && this.input.active && !this.input.touchMode && !this.input.locked && this.input.dragMode);
    if (!this.dragHint && drag) {
      this.dragHint = document.createElement('div');
      this.dragHint.className = 'drag-hint';
      this.dragHint.textContent = 'Drag to look · Tab captures the cursor';
      this.uiRoot.appendChild(this.dragHint);
    }
    if (this.dragHint) this.dragHint.hidden = !drag;
  }

  // keeps play smooth on weaker devices: the render resolution steps down (to half at
  // most) if frames stay slow and back up with headroom (First Touch's adaptive scale)
  adaptResolution(dt) {
    const a = this.adapt;
    if (!a.on || dt <= 0 || dt > 0.5) return;
    const active = !!(this.session && !this.paused && !document.hidden);
    if (!active) { a.low = 0; a.high = 0; a.check = null; return; }
    a.ema += (dt - a.ema) * 0.06;
    a.floorT = (a.floorT || 0) + dt;
    if (a.floor > 0.5 && a.floorT > 30) a.floor = 0.5;
    if (a.check) {
      a.check.t += dt;
      if (a.check.t > 2) {
        if (a.ema > a.check.before * 0.92) { a.floor = a.check.prev; a.floorT = 0; a.scale = a.check.prev; this.view.setResolutionScale(a.scale); }
        a.check = null;
      }
      return;
    }
    if (a.ema > 1 / 42) { a.low += dt; a.high = 0; } else if (a.ema < 1 / 56) { a.high += dt; a.low = 0; } else { a.low = 0; a.high = 0; }
    if (a.low > 1.5 && a.scale > a.floor + 0.01) {
      const prev = a.scale;
      a.scale = Math.max(a.floor, a.scale * 0.85);
      this.view.setResolutionScale(a.scale);
      a.check = { before: a.ema, prev, t: 0 };
      a.low = 0;
    } else if (a.high > 6 && a.scale < 1) {
      a.scale = Math.min(1, a.scale * 1.12);
      this.view.setResolutionScale(a.scale);
      a.high = 0;
    }
  }

  setTouchMode(on) {
    this.input.touchMode = on;
    document.documentElement.dataset.touch = on ? '1' : '0';
    if (!on) this.touch.setVisible(false);
  }

  tryFullscreen() {
    if (!this.input.touchMode || document.fullscreenElement || this.params.has('nofs')) return;
    const el = document.documentElement;
    try {
      const r = el.requestFullscreen && el.requestFullscreen({ navigationUI: 'hide' });
      if (r && r.then) r.then(() => { try { const o = screen.orientation && screen.orientation.lock && screen.orientation.lock('landscape'); if (o && o.catch) o.catch(() => {}); } catch (e) { /* not supported */ } }).catch(() => {});
    } catch (e) { /* not supported */ }
  }

  // --------------------------------------------------------- background
  // the menus sit over a live AI game in the arena
  startMenuBackground() {
    if (this.menuSession) return;
    const home = TEAMS[3], away = TEAMS[6];
    const kits = resolveKits(home, away);
    kits[0].word = home.short; kits[1].word = away.short;
    const cfg = {
      mode: 'menu', venue: 'arena', venueOpts: { homeName: home.name, awayName: away.name },
      colours: { kits, human: this.profile.look, court: home.colors[0] },
      match: { seed: 99, clock: 100000, target: 999, difficulty: 'pro', teams: [teamConfig(home, 3), teamConfig(away, 3)] },
    };
    this.menuSession = new GameSession(this, cfg);
    this.menuSession.start();
  }
  stopMenuBackground() {
    if (this.menuSession) { this.menuSession.dispose(); this.menuSession = null; }
  }

  // ------------------------------------------------------------ games
  gameConfig(o) {
    const fmt = o.format || '3v3';
    const size = fmt === '1v1' ? 1 : 3;
    const home = teamById(o.home), away = teamById(o.away);
    const kits = resolveKits(home, away);
    kits[0].word = home.short; kits[1].word = away.short;
    const len = GAME_LENGTHS[o.length || this.settings.gameLength] || GAME_LENGTHS.normal;
    const target = o.target || (fmt === '1v1' ? Math.min(11, len.target) : len.target);
    const seed = this.params.get('seed') ? Number(this.params.get('seed')) : (Date.now() & 0xffff) + 1;
    return {
      kits,
      match: { seed, clock: o.clock || len.clock, target, difficulty: o.difficulty || this.settings.difficulty, teams: [teamConfig(home, size, this.profile), teamConfig(away, size)] },
      home, away,
    };
  }

  startSession(cfg) {
    this.stopMenuBackground();
    if (this.session) this.session.dispose();
    this.screens.clear();
    this.session = new GameSession(this, cfg);
    this.hud.show(true);
    this.hud.root.classList.toggle('practice', !!cfg.practice);
    this.session.start();
    this.input.active = true;
    if (cfg.live) {
      this.paused = false;
      this.session.setPaused(false);
      return this.session;
    }
    this.paused = true;
    this.session.setPaused(true);
    this.screens.clickToPlay();
    return this.session;
  }

  endSession() {
    if (this.session) this.session.dispose();
    this.session = null;
    this.paused = false;
    this.input.active = false;
    this.input.exitLock();
    this.hud.show(false);
    this.startMenuBackground();
  }

  startGame(o) {
    this.lastGame = o;
    const c = this.gameConfig(o);
    const fmt = o.format || '3v3';
    return this.startSession({
      mode: fmt === '1v1' ? '1v1' : 'quick', live: o.live,
      venue: o.venue || (fmt === '1v1' ? 'gym' : 'arena'),
      venueOpts: { homeName: c.home.name, awayName: c.away.name },
      title: `${fmt === '1v1' ? '1v1 Challenge' : '3v3 Quick Match'} · ${c.home.name} v ${c.away.name}`,
      colours: { kits: c.kits, human: this.profile.look, court: c.home.colors[0] }, match: c.match, firstTeam: o.firstTeam,
      onEnd: (s) => this.screens.result(s),
    });
  }

  startPractice(kind, o = {}) {
    const practice = makePractice(kind, this);
    const home = teamById('harbor'), away = teamById('summit');
    const kits = resolveKits(home, away);
    kits[0].word = 'PRACTICE';
    return this.startSession({
      mode: 'practice', live: o.live, venue: 'practice', venueOpts: { homeName: 'Practice', awayName: '' },
      title: practice.title,
      colours: { kits, human: this.profile.look, court: '#3a86ff' },
      match: practice.matchConfig(this.profile), practice,
      onEnd: (s) => this.screens.practiceResult(s),
    });
  }

  // -------------------------------------------------------------- pause
  togglePause() {
    if (!this.session || this.session.ended) return;
    if (this.paused && this.screens.current === 'click') { this.screens.pauseMenu(); return; }
    if (this.paused) this.resume(); else this.pause();
  }
  pause(reason = 'user') {
    if (!this.session || this.session.ended) return;
    this.paused = true;
    this.session.setPaused(true);
    this.input.releaseAll();
    this.touch.setVisible(false);
    this.input.exitLock();
    this.audio.suspend();
    if (reason === 'lock') this.screens.clickToPlay({ resume: true });
    else this.screens.pauseMenu();
  }
  resume() {
    if (!this.session) return;
    this.input.active = true;
    if (this.input.touchMode) { this.tryFullscreen(); this.unpause(); return; }
    if (this.input.locked) { this.unpause(); return; }
    if (this.input.dragMode) { this.unpause(); return; }
    this.screens.clear();
    this.awaitingLock = true;
    this.requestLockSoon();
  }
  requestLockSoon() {
    clearTimeout(this.lockDelay);
    clearTimeout(this.lockTimer);
    const wait = Math.max(0, this.input.lastLockExit + 1150 - performance.now());
    const go = () => {
      if (!this.input.requestLock()) { this.awaitingLock = false; this.input.dragMode = true; this.unpause(); return; }
      this.lockTimer = setTimeout(() => { if (this.awaitingLock && !this.input.locked) this.lockFailed(); }, 1500);
    };
    if (wait > 0) this.lockDelay = setTimeout(go, wait); else go();
  }
  lockFailed() {
    this.awaitingLock = false;
    clearTimeout(this.lockTimer);
    this.lockFails = (this.lockFails || 0) + 1;
    // embedded in a frame that may not allow capturing the mouse: drag-to-look straight away
    if (window.top !== window && this.session) { this.input.dragMode = true; this.unpause(); return; }
    if (this.session && this.paused) this.screens.clickToPlay({ resume: true, retry: this.lockFails });
  }
  toggleLock() {
    if (!this.session || this.session.ended || this.input.touchMode) return;
    if (this.input.locked) { this.pause('lock'); return; }
    this.input.dragMode = false;
    if (this.paused) { this.resume(); return; }
    this.awaitingLock = false;
    this.requestLockSoon();
  }
  unpause() {
    this.awaitingLock = false;
    this.commitSettings();
    this.screens.clear();
    this.paused = false;
    if (this.session) this.session.setPaused(false);
    this.audio.resume();
  }
  onBlur() {
    this.audio.setMuted(true);
    if (this.session && !this.paused && !this.session.ended) this.pause('blur');
  }
  onFocus() { this.audio.setMuted(false); if (this.paused) this.audio.suspend(); }

  // ------------------------------------------------------------ settings
  applySettings() {
    const s = this.settings;
    const wantTouch = s.touch === 'on' || (s.touch !== 'off' && (this.coarse || this.input.touchMode));
    if (wantTouch !== this.input.touchMode) this.setTouchMode(wantTouch);
    this.input.sensitivity = s.sensitivity;
    this.input.invertY = s.invertY;
    this.audio.setVolumes({ master: s.master, sfx: s.sfx, crowd: s.crowd });
    if (this.view.quality !== s.quality) {
      this.view.setQuality(s.quality);
      this.view.venueKey = null;
      const cur = this.session || this.menuSession;
      if (cur) this.view.setVenue(cur.cfg.venue, cur.cfg.venueOpts || {});
      if (this.view.match) this.view.rebuildCharacters();
    }
    this.settingsDirty = true;
  }
  setStyle(name) {
    this.style = name;
    this.view.setStyle(name);
    this.styleDirty = true;
  }
  commitSettings() {
    if (this.settingsDirty) {
      this.settingsDirty = false;
      if (!saveSettings(this.settings)) this.screens.toast('Settings could not be saved (storage unavailable).', true);
    }
    if (this.styleDirty) { this.styleDirty = false; saveStyle(this.style); }
  }
}

function boot() {
  try {
    new App();
  } catch (e) {
    console.error(e);
    const b = document.getElementById('boot');
    if (b) b.textContent = 'Courtside could not start: ' + e.message + ' (a browser with WebGL2 is required).';
  }
}
if (document.readyState === 'loading') window.addEventListener('DOMContentLoaded', boot); else boot();
