// A live game (or practice) wired to the view, input, HUD and audio: a fixed 120 Hz
// simulation with interpolated rendering (First Touch's session structure).
import { Match } from '../sim/match.js';
import { HumanController } from '../sim/human.js';
import { DT, HOOP, distToHoop } from '../sim/constants.js';
import { VENUES } from '../render/venues.js';
import { BODY } from '../sim/player.js';

const MAX_STEPS = 12;

export class GameSession {
  constructor(app, cfg) {
    this.app = app;
    this.cfg = cfg;
    this.view = app.view;
    this.audio = app.audio;
    this.hud = app.hud;
    this.input = app.input;
    this.match = new Match(cfg.match);
    const m = this.match;
    this.human = m.human;
    if (this.human) { this.ctl = new HumanController(m, this.human); m.humanCtl = this.ctl; }
    const full = m.full;
    this.cam = { mode: this.human ? 'fp' : 'orbit', yaw: Math.PI / 2, pitch: -0.1, eye: BODY.EYE, fov: app.settings.fov, bob: app.settings.bob ? 1 : 0, shake: app.settings.shake ? 1 : 0, angle: 0.9, radius: full ? 14.5 : 11.5, height: full ? 6.4 : 5.6, cx: full ? 0 : 8.5 };
    this.acc = 0;
    this.paused = false;
    this.ended = false;
    this.excite = 0;
    this.unsubs = [];
    this.kitA = cfg.colours ? cfg.colours.kits[0].jersey : '#c00';
    this.kitB = cfg.colours ? cfg.colours.kits[1].jersey : '#00c';
    this.sq = new Map();
    this.view.setVenue(cfg.venue || 'gym', cfg.venueOpts || {});
    this.view.setLocal(this.human);
    this.view.setMatch(m, cfg.colours);
    this.hookEvents();
    if (this.human) {
      this.unsubs.push(this.input.on((type, down) => {
        if (this.paused || !this.ctl) return;
        if (down) this.ctl.press(type); else this.ctl.release(type);
      }));
    }
    if (cfg.practice) cfg.practice.attach(this);
  }

  start() {
    const m = this.match;
    if (this.cfg.practice) this.cfg.practice.start(this);
    else m.start(this.cfg.firstTeam);
    if (this.human) { this.cam.yaw = this.human.yaw; }
    const loud = (VENUES[this.cfg.venue] || VENUES.gym).loud;
    if (this.cfg.mode !== 'menu') this.audio.startCrowd(0.2 + loud * 0.8);
  }

  hookEvents() {
    const m = this.match, ev = m.events, a = this.audio, v = this.view, hud = this.hud;
    const on = (t, f) => this.unsubs.push(ev.on(t, f));
    const menu = this.cfg.mode === 'menu';
    const practice = !!this.cfg.practice;
    const me = () => this.human;
    const spatial = (pos, base = 1) => {
      if (menu) return { gain: 0 };
      const c = v.camera.position;
      const dx = pos.x - c.x, dz = pos.z - c.z;
      const d = Math.hypot(dx, dz);
      const yaw = this.cam.yaw;
      const right = -Math.cos(yaw) * dx + Math.sin(yaw) * dz;
      return { gain: base / (1 + d * 0.09), pan: right / (d + 3) };
    };
    const short = (t) => m.teams[t].short;
    on('bounce', (e) => a.play(Math.random() < 0.5 ? 'bounce' : 'bounce2', { ...spatial({ x: e.x, z: e.z }, e.player === me() ? 0.75 : 0.9), rate: 0.95 + Math.random() * 0.1 }));
    on('hit', (e) => {
      if (e.kind === 'floor' && e.speed > 0.8) a.play('bounce', { ...spatial(e, Math.min(1, e.speed / 6)), rate: 0.9 + Math.random() * 0.15 });
      else if (e.kind === 'rim') { a.play('rim', { ...spatial(e, Math.min(1, 0.3 + e.speed / 6)), rate: 0.95 + Math.random() * 0.1 }); if (e.speed > 1.5) this.excite = Math.max(this.excite, 0.7); }
      else if (e.kind === 'board') a.play('board', spatial(e, Math.min(1, 0.3 + e.speed / 7)));
      else if (e.kind === 'body') a.play('catch', spatial(e, 0.4));
    });
    on('shot', (e) => {
      a.play('release', spatial(e.player.pos, 0.6));
      if (e.player === me()) {
        v.shake = 0.4;
        if (e.grade && e.kind !== 'dunk') { hud.notify(e.grade.label, e.grade.tier === 'perfect' ? 'good' : e.grade.tier === 'good' ? '' : 'bad'); if (e.grade.tier === 'perfect') a.play('perfect', { gain: 0.45 }); }
      }
      this.excite = Math.max(this.excite, 0.6);
    });
    on('pass', (e) => a.play('pass', spatial(e.player.pos, 0.6)));
    on('gain', (e) => a.play('catch', spatial(e.player.pos, e.player === me() ? 0.55 : 0.7)));
    on('stealTry', (e) => a.play('steal', { ...spatial(e.player.pos, 0.25), rate: 1.2 }));
    on('poke', (e) => { a.play('steal', spatial(e.player.pos, 1)); if (e.player === me()) hud.notify('POKED LOOSE!', 'good'); if (e.victim === me()) hud.notify('STRIPPED', 'bad'); });
    on('steal', (e) => { if (!menu) a.play('ooh', { group: 'crowd', gain: 0.5 }); if (e.player === me()) hud.showBanner('STEAL!', '', 1300, 'mine'); });
    on('interception', (e) => { if (e.player === me()) hud.showBanner('PICKED OFF!', '', 1300, 'mine'); else if (e.victim === me()) hud.notify('INTERCEPTED', 'bad'); });
    on('stealMiss', (e) => { if (e.player === me()) hud.notify('REACHED · OFF BALANCE', 'bad'); });
    on('block', (e) => {
      a.play('block', spatial(e.player.pos, 1));
      if (!menu) a.play('ooh', { group: 'crowd', gain: 0.8 });
      this.excite = 1;
      if (e.player === me()) hud.showBanner('BLOCKED!', 'Get out of here!', 1500, 'mine');
      else if (e.victim === me()) hud.notify('BLOCKED', 'bad');
    });
    on('cross', (e) => a.play(['squeak1', 'squeak2', 'squeak3'][Math.floor(Math.random() * 3)], spatial(e.player.pos, 0.7)));
    on('ankles', (e) => { if (!menu) a.play('ooh', { group: 'crowd', gain: 0.45 }); if (e.by === me()) hud.notify('DEFENDER BEATEN', 'good'); });
    on('bite', (e) => { if (e.by === me()) hud.notify('BIT ON THE FAKE', 'good'); });
    on('fake', (e) => a.play('squeak3', spatial(e.player.pos, 0.4)));
    on('jump', (e) => a.play('squeak2', { ...spatial(e.player.pos, 0.3), rate: 1.2 }));
    on('request', () => a.play('shout', { gain: 0.5 }));
    on('rebound', (e) => { if (e.player === me()) hud.notify(e.offensive ? 'OFFENSIVE BOARD' : 'REBOUND', 'good'); });
    on('miss', (e) => { if (!menu && !practice && e.airball) { a.play('groan', { group: 'crowd', gain: 0.6 }); if (e.player === me()) hud.notify('AIR BALL', 'bad'); } });
    on('swish', () => a.play('net', { gain: 0.5 }));
    on('basket', (e) => {
      a.play('net', spatial(e.pos, 1));
      if (menu) return;
      const ours = e.team === 0;
      a.play(ours ? 'cheer' : 'groan', { group: 'crowd', gain: ours ? 1 : 0.55 });
      this.excite = 1;
      v.crowdLevel = ours ? 1 : 0.4;
      v.celebrate(e.pos.x, 3, e.pos.z, e.team, e.kind === 'dunk' ? 1.2 : 0.7);
      const mine = e.player === me();
      const what = e.kind === 'dunk' ? 'SLAM DUNK!' : e.goaltend ? 'GOALTENDING' : e.kind === 'ft' ? 'FREE THROW' : e.value === 3 ? 'THREE!' : e.kind === 'layup' ? 'LAYUP' : e.kind === 'tip' ? 'PUT-BACK' : 'BUCKET';
      if (practice) { if (mine) hud.notify(`+${e.value} ${what}`, 'good'); return; }
      const who = e.player ? `${e.player.name}${e.assist ? ` · assist ${e.assist.name}` : ''}` : '';
      hud.showBanner(mine ? what : `+${e.value}`, `${short(0)} ${m.scoreline[0]} - ${m.scoreline[1]} ${short(1)}${who ? ` · ${who}` : ''}${e.andOne ? ' · AND ONE!' : ''}`, 2000, mine ? 'mine' : e.team === (me() ? me().team : 0) ? 'good' : '');
      if (e.assist === me()) hud.notify('ASSIST', 'good');
    });
    on('whistle', (e) => {
      if (menu) return;
      if (e.reason === 'shotClock') a.play('buzzer', { gain: 0.6 }); else a.play('whistle', { gain: 0.8 });
      const label = { out: 'OUT OF BOUNDS', shotClock: 'SHOT CLOCK', foul: e.bonus ? 'FOUL · BONUS' : 'FOUL', shootingFoul: 'SHOOTING FOUL', notCleared: 'NOT CLEARED', overtime: 'OVERTIME', eightSec: '8 SECONDS', backcourt: 'BACKCOURT', fiveSec: '5 SECONDS' }[e.reason] || '';
      if (label && e.reason !== 'overtime') hud.showBanner(label, e.team != null ? `${short(1 - e.team)} ball` : '', 1500);
    });
    // full court
    on('tip', (e) => {
      if (menu) return;
      const mine = me() && e.jumpers.includes(me());
      hud.showBanner('TIP-OFF', mine ? 'Jump (Space) as the ball comes down' : `${m.teams[0].name} v ${m.teams[1].name}`, 1900);
    });
    on('toss', () => { if (!menu) a.play('whistle', { gain: 0.5, rate: 1.1 }); });
    on('tapped', (e) => { if (!menu && e.player === me()) hud.notify('WON THE TIP', 'good'); });
    on('inbound', (e) => {
      if (menu || practice) return;
      if (e.kind !== 'baseline') hud.notify(`${short(e.team)} BALL`, '');
    });
    on('periodEnd', (e) => {
      if (menu) return;
      const [x, y] = m.scoreline;
      const title = e.half ? 'HALFTIME' : e.ot ? (m.period > 4 ? 'END OF OVERTIME' : 'END OF REGULATION') : `END OF Q${e.period}`;
      hud.showBanner(title, `${short(0)} ${x} - ${y} ${short(1)}${e.half ? ' · teams switch ends' : e.ot ? ' · tied: overtime' : ''}`, e.half ? 3600 : 2400);
      a.play('cheer', { group: 'crowd', gain: 0.5 });
    });
    on('periodStart', (e) => {
      if (menu) return;
      const names = ['', '1ST QUARTER', '2ND QUARTER', '3RD QUARTER', '4TH QUARTER'];
      hud.showBanner(e.ot ? (e.label === 'OT' ? 'OVERTIME' : e.label) : names[e.period] || e.label, `${m.teams[e.team].name} ball`, 1800);
    });
    on('eightSeconds', (e) => { if (!menu && me() && e.team === me().team) hud.notify('GET IT OVER HALF COURT IN 8 SECONDS', 'bad'); });
    on('backcourt', (e) => { if (!menu && me() && e.team === me().team) hud.notify('NO GOING BACK OVER HALF COURT', 'bad'); });
    on('notCleared', (e) => { if (!menu && me() && e.team === me().team) hud.notify('NO BASKET · CLEAR IT FIRST', 'bad'); });
    on('foul', (e) => {
      if (menu) return;
      if (e.player === me()) hud.notify(`FOUL ON YOU (${e.kind === 'reach' ? 'REACH-IN' : e.kind === 'shooting' ? 'ON THE SHOT' : 'BLOCKING'})`, 'bad');
      else if (e.victim === me()) hud.notify('FOULED', 'good');
      if (e.kind === 'shooting') a.play('whistle', { gain: 0.8 });
    });
    on('ftStart', (e) => { if (!menu) hud.showBanner('FREE THROW', `${e.player.name} · ${e.n} shot${e.n > 1 ? 's' : ''}`, 1500); });
    on('check', (e) => {
      if (menu) return;
      if (e.first) hud.showBanner('CHECK BALL', `${m.teams[e.team].name} ball`, 1700);
      else if (!practice) hud.notify(`${short(e.team)} BALL · CHECK`, '');
    });
    on('snap', () => {
      if (menu) return;
      hud.flashFade();
      if (this.human) { this.cam.yaw = this.human.yaw; this.cam.pitch = -0.1; }
    });
    on('cleared', (e) => { if (me() && e.team === me().team) hud.notify('CLEARED', ''); });
    on('buzzer', () => { if (!menu) a.play('buzzer', { gain: 0.8 }); });
    on('overtime', () => { if (!menu) hud.showBanner('OVERTIME', 'Next basket wins', 2400); });
    on('final', () => {
      if (menu) return;
      a.play('buzzer', { gain: 0.9 });
      const [x, y] = m.scoreline;
      const won = this.human && (this.human.team === 0 ? x > y : y > x);
      hud.showBanner(won ? 'YOU WIN!' : 'FINAL', `${short(0)} ${x} - ${y} ${short(1)}`, 3200, won ? 'mine' : '');
      if (won) { a.play('cheer', { group: 'crowd', gain: 1 }); v.crowdLevel = 1; const hx = m.hoopX(this.human.team), sg = Math.sign(hx); for (let i = 0; i < 3; i++) setTimeout(() => v.celebrate(hx - sg * (4 - Math.random() * 4), 3, (Math.random() - 0.5) * 8, this.human.team, 1.2), i * 450); }
    });
  }

  // one rendered frame
  frame(dtReal) {
    const m = this.match;
    if (!this.paused && !this.ended) {
      if (this.human && this.ctl) {
        const ax = this.input.axes();
        this.input.consumeLook(this.cam, dtReal);
        const ci = this.ctl.input;
        ci.moveF = ax.f; ci.moveR = ax.r; ci.sprint = ax.sprint; ci.stance = ax.stance;
        ci.yaw = this.cam.yaw; ci.pitch = this.cam.pitch;
        const held = this.input.held;
        ci.lmb = held.lmb; ci.rmb = held.rmb;
      }
      this.acc += Math.min(dtReal, 0.1) * (this.cfg.timeScale || 1);
      let n = 0;
      while (this.acc >= DT && n < MAX_STEPS) {
        m.step(DT); this.acc -= DT; n++;
        if (this.cfg.practice) this.cfg.practice.step(this, DT);
      }
      if (n >= MAX_STEPS) this.acc = 0;
      this.sneakerSounds(dtReal);
      if (m.phase === 'over' && !this.ended && m.phaseT > (this.cfg.mode === 'menu' ? 0 : 3.2)) {
        this.ended = true;
        if (this.cfg.onEnd) this.cfg.onEnd(this);
      }
    }
    const alpha = this.paused ? 1 : this.acc / DT;
    // atmosphere: the crowd follows the action near the rim
    const b = m.ball.pos;
    const near = Math.max(0, 1 - distToHoop(b.x, b.z, b.x >= 0 ? 1 : -1) / 7);
    this.excite = Math.max(near * 0.4, this.excite - dtReal * 0.3);
    if (this.cfg.mode !== 'menu') this.audio.setExcitement(this.excite);
    // eye height: lower in a stance and on landing, and with the jump (added by the view)
    if (this.human) {
      const h = this.human;
      let eye = BODY.EYE - 0.24 * h.stanceW;
      const land = m.time - h.landT;
      if (land >= 0 && land < 0.25) eye -= 0.09 * Math.sin((land / 0.25) * Math.PI);
      this.cam.eye += (eye - this.cam.eye) * (1 - Math.exp(-dtReal * 14));
    } else {
      this.cam.angle += dtReal * 0.04;
      // full court: the camera drifts toward the end where the ball is
      if (m.full) {
        const tx = Math.max(-7, Math.min(7, m.ball.pos.x * 0.55));
        this.cam.cx += (tx - this.cam.cx) * (1 - Math.exp(-dtReal * 0.5));
      }
    }
    this.cam.fov = this.app.settings.fov;
    this.cam.bob = this.app.settings.bob ? 1 : 0;
    this.cam.shake = this.app.settings.shake ? 1 : 0;
    const cam = this.app.debugCam ? { mode: 'free', pos: this.app.debugCam.pos, look: this.app.debugCam.look, fov: this.app.debugCam.fov || this.cam.fov } : this.cam;
    this.view.render(alpha, dtReal, cam, { crowd: this.excite * 0.5 });
    this.updateMarkers();
    if (this.cfg.practice) this.cfg.practice.frame(this, dtReal);
    if (this.cfg.mode !== 'menu') this.hud.update(this.hudState());
  }

  // shoe squeaks on hard cuts and soft footsteps nearby
  sneakerSounds(dt) {
    if (this.cfg.mode === 'menu' || dt <= 0) return;
    const m = this.match, c = this.view.camera.position;
    for (const p of m.players) {
      const st = this.sq.get(p) || { vx: 0, vz: 0, t: 0, g: 0 };
      const ax = (p.vel.x - st.vx) / dt, az = (p.vel.z - st.vz) / dt;
      const acc = Math.hypot(ax, az);
      const d = Math.hypot(p.pos.x - c.x, p.pos.z - c.z);
      if (acc > 14 && p.speed > 2.2 && m.time - st.t > 0.45 && !p.airborne && d < 14) {
        st.t = m.time;
        this.audio.play(['squeak1', 'squeak2', 'squeak3'][Math.floor(Math.random() * 3)], { gain: 0.5 / (1 + d * 0.15), rate: 0.9 + Math.random() * 0.25 });
      }
      const g = Math.floor(p.gait * 2);
      if (g !== st.g && !p.airborne && d < 9 && p.speed > 0.8) this.audio.play(g % 2 ? 'step1' : 'step2', { gain: (p === this.human ? 0.18 : 0.3) / (1 + d * 0.3), rate: 0.9 + Math.random() * 0.2 });
      st.g = g;
      st.vx = p.vel.x; st.vz = p.vel.z;
      this.sq.set(p, st);
    }
  }

  updateMarkers() {
    const mk = this.view.markers, m = this.match;
    mk.hideAll();
    if (!this.ctl || this.cfg.mode === 'menu') return;
    const h = this.human;
    const t = this.ctl.passTarget;
    if (t && this.ctl.targetVisible && m.teams[h.team].players.length > 1) mk.showRing(t.pos.x, t.pos.z, m.time);
    if (m.rules && m.offense !== h.team && (m.phase === 'live' || m.phase === 'check' || m.phase === 'inbound')) {
      const man = m.ai.markOf(h);
      if (man) mk.showDef(man.pos.x, man.pos.z);
    }
    const b = m.ball;
    if (b.pass && b.pass.target === h && b.state === 'free') mk.showIncoming(b.pos.x + b.vel.x * 0.25, b.pos.z + b.vel.z * 0.25);
    if (this.cfg.practice) this.cfg.practice.markers(this, mk);
  }

  hudState() {
    const m = this.match, h = this.human;
    let hint = '';
    const touch = this.input.touchMode;
    if (h) {
      const b = m.ball;
      const mine = b.owner === h;
      if (m.phase === 'tip') hint = m.tip && m.tip.jumpers.includes(h) ? (touch ? 'Tap JUMP as the ball comes down' : 'Space: jump for the tip as the ball comes down') : 'Tip-off';
      else if (m.phase === 'inbound') hint = m.offense === h.team ? (touch ? 'Get open · CALL for the throw-in' : 'Get open · RMB calls for the throw-in') : 'Find your man (red ring)';
      else if (m.phase === 'break') hint = touch ? 'Tap any button to continue' : 'Press any action to continue';
      else if (m.phase === 'check' && m.checker === h) hint = touch ? 'Move or tap a button to check the ball in' : 'Move or press any button to check the ball in';
      else if (m.phase === 'ft') hint = m.ft && m.ft.shooter === h ? (touch ? 'Hold SHOOT, release in the green' : 'Hold left mouse, release in the green') : 'Free throw';
      else if (m.phase === 'scored' || m.phase === 'dead') hint = touch ? 'Tap any button to skip' : 'Press any action to skip';
      else if (touch) hint = '';
      else if (mine) hint = 'LMB shoot · RMB pass · Q crossover · Space fake';
      else if (b.owner && b.owner.team !== h.team) hint = b.owner.pos.distXZ(h.pos) < 2.2 ? 'E steal · C stance · Space block' : 'Stay between your man and the rim · C stance';
      else if (b.owner && b.owner.team === h.team) hint = h.requestUntil > m.time ? 'Ball called for' : 'RMB call for the ball';
      else if (b.state === 'free' && b.shot) hint = 'Space jump for the rebound';
      // full court: the 8-second count while bringing it up
      if (m.full && m.phase === 'live' && b.owner && b.owner.team === h.team && !m.frontcourt && m.backcourtT > 4) hint = `Over half court: ${Math.max(0, 8 - m.backcourtT).toFixed(0)} s`;
    }
    if (this.cfg.practice && this.cfg.practice.hint) hint = this.cfg.practice.hint(this) ?? hint;
    let phaseText = '';
    if (m.full) {
      if (m.phase === 'tip') phaseText = 'TIP-OFF';
      else if (m.phase === 'inbound') phaseText = 'THROW-IN';
      else if (m.phase === 'ft' && m.ft) phaseText = `FREE THROW ${m.ft.total - m.ft.left + (m.ft.released ? 0 : 1)}/${m.ft.total}`;
      else if (m.phase === 'break') phaseText = m.period === 2 ? 'HALFTIME' : `END OF ${m.periodLabel}`;
      else if (m.phase === 'over') phaseText = 'FINAL';
      else phaseText = `TEAM FOULS ${m.teams[0].fouls} - ${m.teams[1].fouls}`;
    } else if (m.phase === 'check') phaseText = 'CHECK BALL';
    else if (m.phase === 'ft' && m.ft) phaseText = `FREE THROW ${m.ft.total - m.ft.left + (m.ft.released ? 0 : 1)}/${m.ft.total}`;
    else if (m.overtime) phaseText = 'OVERTIME · NEXT BASKET WINS';
    else if (m.phase === 'over') phaseText = 'FINAL';
    else if (m.rules) phaseText = `FIRST TO ${m.target}`;
    if (this.cfg.practice && this.cfg.practice.phaseText) phaseText = this.cfg.practice.phaseText(this);
    return {
      match: m, camera: this.view.camera, view: this.view, camYaw: this.cam.yaw, style: this.view.style,
      kitA: this.kitA, kitB: this.kitB, hint, phaseText,
      preview: this.ctl ? this.ctl.preview : null, meter: this.app.settings.meter !== false,
      clockText: this.cfg.practice && this.cfg.practice.clockText ? this.cfg.practice.clockText(this) : undefined,
      noArrow: this.cfg.noArrow,
    };
  }

  setPaused(p) {
    this.paused = p;
    if (this.ctl && p) this.ctl.buffer.length = 0;
  }

  dispose() {
    for (const u of this.unsubs) u();
    this.unsubs = [];
    if (this.cfg.practice) this.cfg.practice.dispose(this);
    this.audio.stopCrowd();
    this.view.markers.hideAll();
  }
}
