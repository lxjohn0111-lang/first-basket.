// DOM screens: main menu, game setup, My Player, practice, visual style (with previews
// rendered by the game itself), settings, how to play, pause, box score and results.
// Built from First Touch's arcade design system (styles.css): one obvious primary
// action per screen, custom controls (no native selects or colour pickers), short
// text, and a sound on every action.
import { CONTROLS, TOUCH_CONTROLS } from '../core/input.js';
import { FOV_MIN, FOV_MAX } from '../core/settings.js';
import { TEAMS, teamById, ARCHETYPES, LOOK_OPTIONS } from '../game/teams.js';
import { ATTRS, ATTR_LABELS, ATTR_SHORT, GAME_LENGTHS, FULL_LENGTHS } from '../sim/constants.js';
import { DIFFICULTY } from '../sim/match.js';
import { VENUES } from '../render/venues.js';
import { icon } from './icons.js';
import { CareerScreens } from './career.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const BALL_SVG = `<svg class="logo-ball" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46" fill="#ff7a1a" stroke="#070b1d" stroke-width="6"/>
  <path d="M50 4v92M4 50h92" stroke="#070b1d" stroke-width="5" fill="none"/>
  <path d="M20 13c14 12 14 62 0 74M80 13c-14 12-14 62 0 74" stroke="#070b1d" stroke-width="5" fill="none"/></svg>`;

const HAIR_NAMES = ['Crop', 'Afro', 'Buzz', 'Headband', 'Braids', 'Bald'];

// a simple generated team badge: shield in the team colours with the initial
export function crestSVG(team, size = 48) {
  const [a, b] = team.colors;
  return `<svg class="crest" width="${size}" height="${size}" viewBox="0 0 48 48" aria-hidden="true"><path d="M24 3 42 9v14c0 11-8 19-18 22C14 42 6 34 6 23V9z" fill="${a}" stroke="#070b1d" stroke-width="3"/>
    <path d="M6 23h36" stroke="${b}" stroke-width="3"/><circle cx="24" cy="23" r="9" fill="${b}" stroke="#070b1d" stroke-width="2.5"/>
    <text x="24" y="27.5" text-anchor="middle" font-family="Arial Black, Arial" font-weight="900" font-size="12" fill="${a}">${esc(team.short[0])}</text></svg>`;
}

export class Screens {
  constructor(app) {
    this.app = app;
    this.root = document.createElement('div');
    this.root.className = 'screens';
    app.uiRoot.appendChild(this.root);
    this.current = null;
    this.lastShown = null;
    this.setup = { format: '3v3', home: 'harbor', away: 'mesa', venue: 'arena' };
    this.career = new CareerScreens(this);
    let hovered = null, lastHover = 0;
    this.root.addEventListener('pointerover', (e) => {
      if (e.pointerType !== 'mouse') return;
      const t = e.target.closest('.btn:not(:disabled), .card.pick, .tab, .opt, .sw');
      if (!t || t === hovered) return;
      hovered = t;
      const now = performance.now();
      if (now - lastHover > 60) { lastHover = now; this.sfx('uiHover', 0.12); }
    });
  }

  sfx(name, gain = 0.4) { this.app.audio.play(name, { gain }); }

  show(html, acts = {}, cls = 'screen center dim') {
    const again = this.current && this.current === this.lastShown;
    this.lastShown = this.current;
    if (!again) this.sfx('uiSwoosh', 0.18);
    this.root.innerHTML = `<div class="${cls}">${html}</div>`;
    const scr = this.root.firstChild;
    if (again) scr.querySelectorAll(':scope > *').forEach((e) => { e.style.animation = 'none'; });
    scr.querySelectorAll('[data-act]').forEach((b) => {
      const fn = acts[b.dataset.act];
      if (fn) {
        b.addEventListener('click', (e) => {
          e.preventDefault();
          if (b.disabled) return;
          this.sfx(b.classList.contains('primary') ? 'uiConfirm' : 'uiClick', b.classList.contains('primary') ? 0.35 : 0.4);
          fn(b, e);
        });
      }
    });
    return scr;
  }
  clear() { this.root.innerHTML = ''; this.current = null; this.lastShown = null; }
  toast(text, bad = false, ms = 3200) {
    const t = document.createElement('div');
    t.className = 'toast' + (bad === true ? ' bad' : bad === 'good' ? ' good' : '');
    t.textContent = text;
    this.app.uiRoot.appendChild(t);
    if (bad === true) this.sfx('uiError', 0.35);
    setTimeout(() => t.remove(), ms);
  }

  seg(key, opts, value) {
    return `<div class="seg" data-key="${key}">${opts.map(([v, l]) => `<button class="opt ${String(value) === String(v) ? 'on' : ''}" data-v="${v}">${l}</button>`).join('')}</div>`;
  }
  bindChoices(el, onPick) {
    el.querySelectorAll('.seg').forEach((g) => g.querySelectorAll('.opt').forEach((b) => b.addEventListener('click', () => {
      g.querySelectorAll('.opt').forEach((x) => x.classList.remove('on'));
      b.classList.add('on');
      this.sfx('uiClick', 0.35);
      let v = b.dataset.v;
      if (v === 'true') v = true; else if (v === 'false') v = false;
      onPick(g.dataset.key, v, b);
    })));
  }
  slider(id, min, max, step, value, label) {
    const p = ((value - min) / (max - min)) * 100;
    return `<div class="slider"><input class="range" type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${value}" style="--p:${p}%"></div><span class="val" id="v-${id.slice(2)}">${label}</span>`;
  }

  // ------------------------------------------------------------------ menu
  mainMenu() {
    this.current = 'menu';
    const app = this.app;
    app.hud.show(false);
    const r = app.records, pr = app.profile;
    const arch = ARCHETYPES[pr.archetype] || ARCHETYPES.slasher;
    const rec = r.games ? `${r.wins}-${r.losses} record` : 'Two baskets, four quarters';
    const size = app.settings.teamSize || 5;
    const car = app.career;
    const carSub = car ? `${esc(car.player.name)} · ${esc(this.career.clubName())}` : 'Create your player';
    this.show(`
      <div class="menu-inner">
        <div class="menu-head">
          <div class="logo">${BALL_SVG}<div class="logo-text">Court<em>side</em></div></div>
          <div class="tagline">First-person basketball. Your eyes. Your handles. Your shot.</div>
        </div>
        <div class="menu-actions col">
          <div class="menu-play"><button class="btn xl primary" data-act="play">${icon('play', 36)}<span class="stack">Play ${size}v${size}<small>Full court · ${esc(rec)}</small></span></button></div>
          <div class="menu-row">
            <button class="btn lg" data-act="career">${icon('trophy')}<span class="stack">Career<small>${carSub}</small></span></button>
            <button class="btn lg" data-act="half">${icon('user')}<span class="stack">Half Court<small>3x3 · 1v1</small></span></button>
          </div>
          <div class="menu-row">
            <button class="btn" data-act="practice">${icon('cone', 20)} Practice</button>
            <button class="btn" data-act="player">${icon('star', 20)} My Player<small style="margin:0 0 0 6px">#${esc(pr.number)} ${esc(arch.name)}</small></button>
          </div>
          <div class="menu-icons">
            <button class="btn sm" data-act="settings">${icon('gear', 18)} Settings</button>
            <button class="btn sm" data-act="help">${icon('help', 18)} How to Play</button>
            <button class="btn sm" data-act="style">${icon('brush', 18)} Visual Style</button>
          </div>
        </div>
      </div>`, {
      play: () => this.gameSetup('full'),
      half: () => this.gameSetup(this.setup.half || '3v3'),
      career: () => (app.career ? this.career.hub() : this.career.create()),
      practice: () => this.practiceMenu(),
      player: () => this.myPlayer(),
      settings: () => this.settings(),
      help: () => this.howTo(),
      style: () => this.styleMenu(),
    }, 'screen menu');
  }

  // ------------------------------------------------------------ game setup
  // format: 'full' (full court) | '3v3' | '1v1' (half court)
  gameSetup(format) {
    this.current = 'setup';
    const app = this.app, s = this.setup;
    const full = format === 'full';
    s.format = format;
    if (!full) s.half = format;
    if (s.home === s.away) s.away = TEAMS[(TEAMS.findIndex((t) => t.id === s.home) + 1) % TEAMS.length].id;
    const pick = (side) => {
      const t = teamById(s[side]);
      return `<div class="card team-pick">
        <div class="small muted" style="font-weight:800;text-transform:uppercase;letter-spacing:1px">${side === 'home' ? 'Your team' : 'Opponent'}</div>
        ${crestSVG(t, 72)}
        <div class="tp-name">${esc(t.name)}</div>
        <div class="tp-tier">Team rating ${t.strength}</div>
        <div class="row"><button class="btn sm icon" data-act="${side}Prev" aria-label="Previous">${icon('left', 18)}</button><button class="btn sm icon" data-act="${side}Next" aria-label="Next">${icon('right', 18)}</button></div>
      </div>`;
    };
    const cycle = (side, d) => {
      let i = TEAMS.findIndex((t) => t.id === s[side]);
      do { i = (i + d + TEAMS.length) % TEAMS.length; } while (TEAMS[i].id === s[side === 'home' ? 'away' : 'home']);
      s[side] = TEAMS[i].id;
      this.gameSetup(format);
    };
    const len = GAME_LENGTHS[app.settings.gameLength] || GAME_LENGTHS.normal;
    const size = app.settings.teamSize || 5;
    const title = full ? 'Full Court' : 'Half Court';
    const lead = full
      ? 'Two baskets, four quarters. 24-second shot clock, 8 seconds to get it over half court, throw-ins after baskets. Teams switch ends at half time.'
      : format === '1v1' ? 'You against their best player. Half court, make your own shots.' : 'Half court, FIBA 3x3 style: check ball, clear it after a steal or rebound, 14-second shot clock.';
    const opts = full
      ? `<div class="set"><span class="lab">Players</span>${this.seg('teamSize', [[5, '5v5'], [4, '4v4'], [3, '3v3']], size)}</div>
         <div class="set"><span class="lab">Quarters</span>${this.seg('quarterLength', Object.entries(FULL_LENGTHS).map(([k, g]) => [k, g.label]), app.settings.quarterLength)}</div>`
      : `<div class="set"><span class="lab">Format</span>${this.seg('format', [['3v3', '3v3'], ['1v1', '1v1']], format)}</div>
         <div class="set"><span class="lab">Game</span>${this.seg('gameLength', Object.entries(GAME_LENGTHS).map(([k, g]) => [k, g.label]), app.settings.gameLength)}</div>`;
    const foot = full ? 'Higher score after four quarters wins; a tie goes to overtime. Inside the arc 2, outside 3.' : `${format === '1v1' ? `1v1 is played to ${Math.min(11, len.target)}.` : `First to ${len.target} or the higher score at the buzzer.`} Inside the arc 2, outside 3.`;
    const el = this.show(`<div class="panel wide"><div class="h-title">${title}</div>
      <p class="lead">${lead}</p>
      <div class="vs">${pick('home')}<div class="vs-mid">VS</div>${pick('away')}</div>
      <div class="set"><span class="lab">Venue</span>${this.seg('venue', [['arena', VENUES.arena.name], ['gym', VENUES.gym.name]], s.venue)}</div>
      <div class="set"><span class="lab">Difficulty</span>${this.seg('difficulty', Object.entries(DIFFICULTY).map(([k, d]) => [k, d.label]), app.settings.difficulty)}</div>
      ${opts}
      <div class="small muted" style="margin-top:6px">${foot}</div>
      <div class="actions"><button class="btn primary lg" data-act="go">${icon('play')} Tip off</button><button class="btn ghost" data-act="back">Back</button></div></div>`, {
      homePrev: () => cycle('home', -1), homeNext: () => cycle('home', 1),
      awayPrev: () => cycle('away', -1), awayNext: () => cycle('away', 1),
      go: () => app.startGame({ format: s.format, home: s.home, away: s.away, venue: s.venue }),
      back: () => this.mainMenu(),
    });
    this.bindChoices(el, (key, v) => {
      if (key === 'venue') { s.venue = v; return; }
      if (key === 'format') { this.gameSetup(v); return; }
      app.settings[key] = key === 'teamSize' ? Number(v) : v;
      app.applySettings(); app.commitSettings();
      if (key === 'teamSize') this.gameSetup(format);
    });
  }

  // ------------------------------------------------------------ my player
  myPlayer() {
    this.current = 'player';
    const app = this.app, pr = app.profile;
    const arch = ARCHETYPES[pr.archetype] || ARCHETYPES.slasher;
    const sw = (key, list, v) => `<div class="swatches" data-sw="${key}">${list.map((c) => `<button class="sw ${c === v ? 'on' : ''}" data-c="${c}" style="background:${c}" aria-label="${c}"></button>`).join('')}</div>`;
    const bars = Object.entries(arch.attrs).map(([k, v]) => `<div class="attr" style="grid-template-columns:110px 1fr 36px"><span>${ATTR_LABELS[k]}</span><div class="bar ${v >= 85 ? 'good' : ''}"><i style="width:${v}%"></i></div><b>${v}</b></div>`).join('');
    const el = this.show(`<div class="panel wide"><div class="h-title">My Player</div>
      <div class="grid2">
        <div>
          <div class="h-sec">Name &amp; number</div>
          <input class="field" id="pname" maxlength="16" value="${esc(pr.name)}" placeholder="Your name">
          <div class="stepper" style="margin-top:var(--s3)"><button class="btn sm icon" data-act="numDown" aria-label="Lower number">${icon('minus', 18)}</button><span class="pv">#${pr.number}</span><button class="btn sm icon" data-act="numUp" aria-label="Higher number">${icon('plus', 18)}</button></div>
          <div class="h-sec">Look</div>
          <div class="set"><span class="lab">Skin</span>${sw('skin', LOOK_OPTIONS.SKIN, pr.look.skin)}</div>
          <div class="set"><span class="lab">Hair</span>${sw('hair', LOOK_OPTIONS.HAIR, pr.look.hair)}</div>
          <div class="set"><span class="lab">Style</span>${this.seg('style', HAIR_NAMES.map((n, i) => [i, n]), pr.look.style || 0)}</div>
          <div class="set"><span class="lab">Shoes</span>${sw('shoes', LOOK_OPTIONS.SHOES, pr.look.shoes)}</div>
        </div>
        <div>
          <div class="h-sec">Play style</div>
          <div class="choices">${Object.values(ARCHETYPES).map((a) => `<button class="card pick choice ${a.id === arch.id ? 'on' : ''}" data-arch="${a.id}"><b>${a.name} · ${a.pos}</b><span>${a.desc}</span></button>`).join('')}</div>
          <div class="h-sec">Attributes</div>
          ${bars}
        </div>
      </div>
      <div class="actions"><button class="btn primary lg" data-act="done">Done</button></div></div>`, {
      numDown: () => { pr.number = (pr.number + 99) % 100; this.myPlayer(); },
      numUp: () => { pr.number = (pr.number + 1) % 100; this.myPlayer(); },
      done: () => { app.saveProfile(); this.mainMenu(); },
    });
    el.querySelector('#pname').addEventListener('input', (e) => { pr.name = e.target.value.trim().slice(0, 16) || 'You'; });
    el.querySelectorAll('[data-arch]').forEach((b) => b.addEventListener('click', () => { pr.archetype = b.dataset.arch; this.sfx('uiClick'); app.saveProfile(); this.myPlayer(); }));
    el.querySelectorAll('[data-sw]').forEach((g) => g.querySelectorAll('.sw').forEach((b) => b.addEventListener('click', () => {
      pr.look[g.dataset.sw] = b.dataset.c;
      g.querySelectorAll('.sw').forEach((x) => x.classList.toggle('on', x === b));
      this.sfx('uiClick', 0.3);
    })));
    this.bindChoices(el, (key, v) => { if (key === 'style') pr.look.style = Number(v); });
  }

  // ------------------------------------------------------------ practice
  practiceMenu() {
    this.current = 'practice';
    const app = this.app, r = app.records;
    const card = (act, ic, title, desc, badge = '') => `<button class="card pick choice" data-act="${act}" style="min-height:120px">${icon(ic, 28)}<b>${title} ${badge}</b><span>${desc}</span></button>`;
    this.show(`<div class="panel mid"><div class="h-title">Practice</div>
      <div class="choices" style="grid-template-columns:repeat(auto-fill,minmax(180px,1fr))">
        ${card('drills', 'whistle', 'Practice Court', 'Coach Mo walks you through dribbling, crossovers, shooting, layups and dunks, passing, stance, steals and blocks.', r.practiceDone ? '<span class="badge good">done</span>' : '<span class="badge gold pulse">start here</span>')}
        ${card('shootout', 'trophy', 'Shootout', '60 seconds to score as much as you can. The gold hot spot doubles a make.', r.bestShootout ? `<span class="badge cyan">best ${r.bestShootout}</span>` : '')}
        ${card('free', 'ball', 'Free Shootaround', 'No clock. Find your range; a rebounder feeds you.')}
      </div>
      <div class="actions"><button class="btn ghost" data-act="back">Back</button></div></div>`, {
      drills: () => app.startPractice('drills'),
      shootout: () => app.startPractice('shootout'),
      free: () => app.startPractice('free'),
      back: () => this.mainMenu(),
    });
  }

  practiceResult(session) {
    const app = this.app;
    app.input.active = false;
    app.input.exitLock();
    app.hud.show(false);
    this.current = 'presult';
    const sum = session.cfg.practice.summary();
    let body = '', word = 'Nice work!';
    if (sum.kind === 'drills') {
      app.records.practiceDone = true;
      word = sum.done === sum.total ? 'Drills done!' : 'Session over';
      body = `<div class="stars">${Array.from({ length: sum.total }, (_, i) => `<i class="${i < sum.stars ? '' : 'off'}" style="animation-delay:${i * 0.07}s">★</i>`).join('')}</div>
        <div class="small muted" style="margin:6px 0 var(--s3)">${sum.done}/${sum.total} drills completed · a star for each under par</div>
        <div class="tips">${sum.rows.map((r) => `<div class="tip"><b>${r.done ? (r.star ? '★ ' : '✓ ') : '– '}${esc(r.say)}</b>${r.done ? `${r.t.toFixed(1)} s` : 'skipped'}</div>`).join('')}</div>`;
    } else {
      const best = app.records.bestShootout || 0;
      const isBest = sum.kind === 'shootout' && sum.points > best;
      if (isBest) app.records.bestShootout = sum.points;
      word = sum.kind === 'shootout' ? (isBest ? 'New best!' : 'Time!') : 'Good session';
      body = `<div class="rating-hero"><span class="lab">${sum.kind === 'shootout' ? 'Points' : 'Made'}</span><span class="num ${isBest ? 'hi' : ''}">${sum.kind === 'shootout' ? sum.points : sum.made}</span></div>
        <div class="key-stats"><div class="mini"><b>${sum.made}/${sum.att}</b><span>Made</span></div><div class="mini"><b>${sum.att ? Math.round((sum.made / sum.att) * 100) : 0}%</b><span>Accuracy</span></div><div class="mini"><b>${app.records.bestShootout || 0}</b><span>Best</span></div></div>`;
    }
    app.saveRecords();
    this.show(`<div class="panel result"><div class="small muted" style="font-weight:800;text-transform:uppercase;letter-spacing:1px">${esc(sum.title)}</div>
      <div class="result-word win">${word}</div>${body}
      <div class="actions mid"><button class="btn primary lg" data-act="again">${icon('play')} Again</button><button class="btn" data-act="practice">Practice</button><button class="btn ghost" data-act="menu">Main menu</button></div></div>`, {
      again: () => { const k = sum.kind; app.endSession(); app.startPractice(k); },
      practice: () => { app.endSession(); this.practiceMenu(); },
      menu: () => { app.endSession(); this.mainMenu(); },
    });
    this.sfx('uiReward', 0.4);
  }

  // ------------------------------------------------------------ career
  careerHub(tab) { this.career.hub(tab); }
  careerResult(session) { this.career.result(session); }

  // ------------------------------------------------------------ results
  result(session) {
    const app = this.app;
    app.input.active = false;
    app.input.exitLock();
    app.hud.show(false);
    this.current = 'result';
    const m = session.match, h = m.human;
    const rep = m.stats.report(h);
    const st = rep.stats;
    const my = rep.score[h.team], th = rep.score[1 - h.team];
    const outcome = my > th ? 'win' : my < th ? 'loss' : 'draw';
    if (!session.committed) {
      session.committed = true;
      const r = app.records;
      r.games++; r.points += st.pts;
      if (outcome === 'win') r.wins++; else if (outcome === 'loss') r.losses++;
      app.saveRecords();
    }
    const word = { win: 'You win!', loss: 'Defeat', draw: 'Draw' }[outcome];
    const tA = teamById(m.teams[0].id), tB = teamById(m.teams[1].id);
    const mini = (v, l) => `<div class="mini"><b>${v}</b><span>${l}</span></div>`;
    const pct = (v) => (v == null ? '-' : `${v}%`);
    const row = (p) => { const s = m.stats.of(p); return `<tr class="${p === h ? 'me' : ''}"><td>${esc(m.teams[p.team].short)}</td><td>#${p.number} ${esc(p.name)}</td><td>${s.pts}</td><td>${s.fgm}/${s.fga}</td><td>${s.tpm}/${s.tpa}</td><td>${s.oreb + s.dreb}</td><td>${s.ast}</td><td>${s.stl}</td><td>${s.blk}</td><td>${s.tov}</td></tr>`; };
    const el = this.show(`
      <div class="panel result report">
        <div class="small muted r-title" style="font-weight:800;text-transform:uppercase;letter-spacing:1px">${esc(session.cfg.title || 'Final')}</div>
        <div class="result-word ${outcome}">${word}</div>
        <div class="r-cols">
          <div class="r-match">
            <div class="scoreline"><div class="side">${crestSVG(tA, 56)}${esc(m.teams[0].name)}</div><div class="sc">${rep.score[0]} - ${rep.score[1]}</div><div class="side">${crestSVG(tB, 56)}${esc(m.teams[1].name)}</div></div>
            <div class="scorers">Player of the game: ${rep.mvp ? esc(rep.mvp.name) : '-'}${m.inOvertime ? ' · overtime' : ''}</div>
          </div>
          <div class="r-you">
            <div class="rating-hero"><span class="lab">Your grade</span><span class="num ${/^A/.test(rep.grade) ? 'hi' : /^[DF]/.test(rep.grade) ? 'lo' : ''}" id="r-num">${rep.grade}</span></div>
            <div class="key-stats">${mini(st.pts, 'Points')}${mini(`${st.fgm}/${st.fga}`, 'Field goals')}${mini(st.ast + st.stl + st.blk, 'AST+STL+BLK')}</div>
          </div>
        </div>
        <div class="actions mid">
          <button class="btn primary lg" data-act="again">${icon('play')} Rematch</button>
          <button class="btn" data-act="change">Change teams</button>
          <button class="btn ghost" data-act="menu">Main menu</button>
          <button class="btn ghost sm" data-act="more">${icon('chart', 16)} Box score</button>
        </div>
        <div class="more" hidden>
          <div class="mini-stats">${mini(pct(st.fgPct), 'FG%')}${mini(`${st.tpm}/${st.tpa}`, '3PT')}${mini(`${st.ftm}/${st.fta}`, 'FT')}${mini(st.reb, 'Rebounds')}${mini(st.ast, 'Assists')}${mini(st.stl, 'Steals')}${mini(st.blk, 'Blocks')}${mini(st.tov, 'Turnovers')}</div>
          <table class="box"><thead><tr><th></th><th>Player</th><th>PTS</th><th>FG</th><th>3PT</th><th>REB</th><th>AST</th><th>STL</th><th>BLK</th><th>TO</th></tr></thead><tbody>${m.players.map(row).join('')}</tbody></table>
          <div class="small muted" style="margin-top:6px;text-align:center">Possession ${rep.possession[0]}% - ${rep.possession[1]}% · Fouls ${rep.teams[0].pf} - ${rep.teams[1].pf}</div>
        </div>
      </div>`, {
      more: (b) => { const box = el.querySelector('.more'); box.hidden = !box.hidden; b.innerHTML = `${icon('chart', 16)} ${box.hidden ? 'Box score' : 'Hide'}`; if (!box.hidden) box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); },
      again: () => { app.endSession(); app.startGame(app.lastGame || {}); },
      change: () => { const f = (app.lastGame || {}).format || 'full'; app.endSession(); this.gameSetup(f); },
      menu: () => { app.endSession(); this.mainMenu(); },
    });
    this.sfx(outcome === 'win' ? 'uiReward' : 'uiConfirm', 0.4);
  }

  // ------------------------------------------------------------ style
  styleMenu(fromPause = false, back = null) {
    this.current = fromPause ? 'pauseSub' : 'style';
    const app = this.app;
    let imgs = {};
    try {
      const pc = app.session ? null : { pos: [6.5, 2.4, 5.6], look: [12.4, 2.6, 0] };
      for (const s of ['classic', 'neo']) imgs[s] = app.view.renderPreview(s, 480, 270, pc);
    } catch (e) { imgs = {}; }
    const card = (s, label, desc) => `<div class="card pick preview ${app.style === s ? 'on' : ''}" data-act="pick" data-s="${s}">${imgs[s] ? `<img src="${imgs[s]}" alt="${label}">` : ''}<h3>${label}</h3><div class="small" style="color:var(--text2);font-weight:600">${desc}</div></div>`;
    this.show(`<div class="panel wide"><div class="h-title">Visual Style</div>
      <div class="previews">${card('classic', 'Classic', 'Ink drawing: pale colours, thin black lines.')}${card('neo', 'Neobrutalist', 'Bold colours, thick outlines, hard shadows.')}</div>
      <div class="actions"><button class="btn primary" data-act="back">Done</button></div></div>`, {
      pick: (b) => { app.setStyle(b.dataset.s); this.styleMenu(fromPause, back); },
      back: () => { app.commitSettings(); if (back) back(); else if (fromPause) this.pauseMenu(); else this.mainMenu(); },
    });
  }

  // ------------------------------------------------------------ settings
  settings(fromPause = false, tab = 'game') {
    this.current = fromPause ? 'pauseSub' : 'settings';
    const app = this.app, s = app.settings;
    const sec = (k, html) => `<div class="tab-body" data-body="${k}" ${k === tab ? '' : 'hidden'}>${html}</div>`;
    const row = (label, ctrl) => `<div class="set"><span class="lab">${label}</span>${ctrl}</div>`;
    const onOff = (key) => this.seg(key, [[true, 'On'], [false, 'Off']], s[key]);
    const el = this.show(`<div class="panel mid"><div class="h-title">Settings</div>
      <div class="tabs">${[['game', 'Game'], ['controls', 'Controls'], ['video', 'Video'], ['audio', 'Audio']].map(([k, l]) => `<button class="tab ${k === tab ? 'on' : ''}" data-tab="${k}">${l}</button>`).join('')}</div>
      ${sec('game', `${row('Difficulty', this.seg('difficulty', Object.entries(DIFFICULTY).map(([k, d]) => [k, d.label]), s.difficulty))}
        <div class="small muted" style="margin:-4px 0 6px">Rookie: a wider green on the meter, slower opponents. All-Star: they read your passes and close out hard.</div>
        ${row('Quarters', this.seg('quarterLength', Object.entries(FULL_LENGTHS).map(([k, g]) => [k, g.label]), s.quarterLength))}
        ${row('Players', this.seg('teamSize', [[5, '5v5'], [4, '4v4'], [3, '3v3']], s.teamSize))}
        ${row('Half court game', this.seg('gameLength', Object.entries(GAME_LENGTHS).map(([k, g]) => [k, g.label]), s.gameLength))}
        ${row('Shot meter', onOff('meter'))}`)}
      ${sec('controls', `${row('Look speed', this.slider('s-sens', 0.2, 3, 0.05, s.sensitivity, s.sensitivity.toFixed(2)))}
        ${row('Invert Y', this.seg('invertY', [[false, 'Off'], [true, 'On']], s.invertY))}
        ${row('Touch controls', this.seg('touch', [['auto', 'Auto'], ['on', 'On'], ['off', 'Off']], s.touch))}`)}
      ${sec('video', `${row('Style', `<div class="row">${this.seg('style', [['classic', 'Classic'], ['neo', 'Neo']], app.style)}<button class="btn sm icon" data-act="preview" title="Preview" aria-label="Preview styles">${icon('eye', 18)}</button></div>`)}
        ${row('Quality', this.seg('quality', [['low', 'Low'], ['medium', 'Medium'], ['high', 'High']], s.quality))}
        ${row('Field of view', this.slider('s-fov', FOV_MIN, FOV_MAX, 1, s.fov, `${s.fov}°`))}
        ${row('View bob', onOff('bob'))}
        ${row('Camera shake', onOff('shake'))}`)}
      ${sec('audio', `${row('Master', this.slider('s-master', 0, 1, 0.05, s.master, pct(s.master)))}
        ${row('Effects', this.slider('s-sfx', 0, 1, 0.05, s.sfx, pct(s.sfx)))}
        ${row('Crowd', this.slider('s-crowd', 0, 1, 0.05, s.crowd, pct(s.crowd)))}`)}
      <div class="actions"><button class="btn primary lg" data-act="back">Done</button></div></div>`, {
      back: () => { app.applySettings(); app.commitSettings(); fromPause ? this.pauseMenu() : this.mainMenu(); },
      preview: () => { app.applySettings(); this.styleMenu(fromPause, () => this.settings(fromPause, 'video')); },
    });
    el.querySelectorAll('.tab').forEach((t) => t.addEventListener('click', () => {
      tab = t.dataset.tab;
      el.querySelectorAll('.tab').forEach((x) => x.classList.toggle('on', x === t));
      el.querySelectorAll('.tab-body').forEach((b) => { b.hidden = b.dataset.body !== tab; });
      this.sfx('uiClick', 0.3);
    }));
    const bindRange = (id, key, fmt) => {
      const r = el.querySelector(`#${id}`);
      r.addEventListener('input', () => {
        s[key] = parseFloat(r.value);
        r.style.setProperty('--p', `${((s[key] - +r.min) / (+r.max - +r.min)) * 100}%`);
        el.querySelector(`#v-${id.slice(2)}`).textContent = fmt(s[key]);
        app.applySettings();
      });
    };
    bindRange('s-sens', 'sensitivity', (v) => v.toFixed(2)); bindRange('s-fov', 'fov', (v) => `${v}°`);
    bindRange('s-master', 'master', pct); bindRange('s-sfx', 'sfx', pct); bindRange('s-crowd', 'crowd', pct);
    this.bindChoices(el, (key, v) => {
      if (key === 'style') { app.setStyle(v); return; }
      s[key] = key === 'teamSize' ? Number(v) : v;
      app.applySettings();
      if (['difficulty', 'gameLength', 'quarterLength', 'teamSize'].includes(key) && app.session) this.toast('Applies from the next game.');
    });
  }

  // ------------------------------------------------------------ how to
  howTo(fromPause = false) {
    this.current = fromPause ? 'pauseSub' : 'help';
    const touchFirst = this.app.input.touchMode;
    const keys = (list) => `<div class="keys">${list.map(([k, d]) => `<div class="key"><span class="kc">${esc(k)}</span><span>${esc(d.split(' (')[0])}</span></div>`).join('')}</div>`;
    const tip = (t, d) => `<div class="tip"><b>${t}</b>${d}</div>`;
    const el = this.show(`<div class="panel wide"><div class="h-title">How to Play</div>
      <div class="tabs"><button class="tab ${touchFirst ? '' : 'on'}" data-tab="kb">Keyboard &amp; mouse</button><button class="tab ${touchFirst ? 'on' : ''}" data-tab="touch">Touch</button></div>
      <div class="tab-body" data-body="kb" ${touchFirst ? 'hidden' : ''}>${keys(CONTROLS)}</div>
      <div class="tab-body" data-body="touch" ${touchFirst ? '' : 'hidden'}>${keys(TOUCH_CONTROLS)}</div>
      <div class="h-sec">Tips</div>
      <div class="tips">
        ${tip('The meter', 'Hold shoot. Let go in the green: it sits higher the further out you are. Early is short, late is long.')}
        ${tip('Get open', 'Contested and on-the-move shots shrink the green. Pump fake (Space) and crossovers (Q) buy space.')}
        ${tip('Attack the rim', 'Sprint at the basket and shoot near it: a layup, or a dunk if you have the bounce.')}
        ${tip('Defence', 'Stay between your man (red ring) and the rim in a stance (C). Steal (E) when the dribble is low and on your side; reaching across the body is a foul.')}
      </div>
      <div class="h-sec">Full court</div>
      <div class="tips">
        ${tip('Two baskets', 'Each team attacks one basket and defends the other; teams switch ends at half time. The radar always shows the basket you attack at the top.')}
        ${tip('Clocks', 'Four quarters. 24-second shot clock (14 after an offensive rebound off the rim). 8 seconds to bring the ball over half court; once over, going back is a backcourt violation.')}
        ${tip('Throw-ins', 'After a basket the other team inbounds from the baseline, after a whistle from the sideline; 5 seconds to get it in. Call for it (RMB) to get the ball.')}
        ${tip('Fouls', 'Shooting fouls give free throws (and one if it goes in). From a team\'s 5th foul of a quarter every foul is two shots (a red bar on the scoreboard).')}
      </div>
      <div class="h-sec">Half court</div>
      <div class="tips">
        ${tip('3x3 rules', 'Check ball at the top after a basket or a whistle. 14-second shot clock, reset when a shot hits the rim.')}
        ${tip('Clear it', 'After a steal or a defensive rebound, take the ball beyond the arc before you score.')}
        ${tip('Scoring', 'Two inside the arc, three outside, one per free throw. First to the target score, or ahead at the buzzer; a tie goes to sudden death.')}
      </div>
      <div class="small muted" style="margin-top:var(--s4)">Rendering: three.js (MIT). All teams and players are fictional; all art and sound are generated by the game.</div>
      <div class="actions"><button class="btn primary" data-act="back">Got it</button></div></div>`, {
      back: () => (fromPause ? this.pauseMenu() : this.mainMenu()),
    });
    el.querySelectorAll('.tab').forEach((t) => t.addEventListener('click', () => {
      el.querySelectorAll('.tab').forEach((x) => x.classList.toggle('on', x === t));
      el.querySelectorAll('.tab-body').forEach((b) => { b.hidden = b.dataset.body !== t.dataset.tab; });
      this.sfx('uiClick', 0.3);
    }));
  }

  // -------------------------------------------------------------- pause
  pauseMenu() {
    this.current = 'pause';
    const app = this.app;
    const sess = app.session;
    const practice = sess && sess.cfg.practice;
    const career = sess && sess.cfg.career;
    this.show(`<div class="panel narrow center-t"><div class="h-title">Paused</div>
      <div class="col">
        <button class="btn primary lg block" data-act="resume">${icon('play')} Resume</button>
        <div class="grid2" style="gap:var(--s2)">
          <button class="btn sm" data-act="settings">${icon('gear', 18)} Settings</button>
          <button class="btn sm" data-act="controls">${icon('help', 18)} Controls</button>
          <button class="btn sm" data-act="style">${icon('brush', 18)} Visual Style</button>
          ${!practice ? `<button class="btn sm" data-act="stats">${icon('chart', 18)} Box Score</button>` : `<button class="btn sm" data-act="finish">${icon('check', 18)} Finish</button>`}
        </div>
        <button class="btn ghost block" data-act="exit">${practice ? 'Exit to Practice' : career ? 'Exit to Career' : 'Exit to Main Menu'}</button>
      </div>
      ${!practice ? `<div class="small muted" style="margin-top:var(--s3)">${career ? 'Leaving abandons this game: it will not count, and you can play it again.' : 'Leaving ends this game.'}</div>` : ''}</div>`, {
      resume: () => app.resume(),
      controls: () => this.howTo(true),
      settings: () => this.settings(true),
      style: () => this.styleMenu(true),
      stats: () => this.liveStats(),
      finish: () => { if (practice) { practice.finish(); app.unpause(); } },
      exit: () => { app.endSession(); if (practice) this.practiceMenu(); else if (career) this.careerHub(); else this.mainMenu(); },
    });
  }

  liveStats() {
    this.current = 'pauseSub';
    const m = this.app.session.match;
    const h = m.human;
    const r = m.stats.report(h);
    const st = r.stats;
    const mini = (v, l) => `<div class="mini"><b>${v}</b><span>${l}</span></div>`;
    this.show(`<div class="panel narrow center-t"><div class="h-title">Box Score</div>
      <div class="scoreline" style="margin-top:0"><div class="side">${esc(m.teams[0].short)}</div><div class="sc">${r.score[0]} - ${r.score[1]}</div><div class="side">${esc(m.teams[1].short)}</div></div>
      <div class="rating-hero"><span class="lab">Your grade so far</span><span class="num">${r.grade}</span></div>
      <div class="mini-stats">${mini(st.pts, 'Points')}${mini(`${st.fgm}/${st.fga}`, 'FG')}${mini(`${st.tpm}/${st.tpa}`, '3PT')}${mini(st.ast, 'Assists')}${mini(st.reb, 'Rebounds')}${mini(st.stl, 'Steals')}${mini(st.blk, 'Blocks')}${mini(st.tov, 'Turnovers')}</div>
      <div class="small muted" style="margin-top:var(--s3)">${m.full ? `${m.periodLabel} · ` : ''}${m.displayClock} left · team fouls ${m.teams[0].fouls} - ${m.teams[1].fouls}</div>
      <div class="actions mid"><button class="btn primary" data-act="back">Back</button></div></div>`, { back: () => this.pauseMenu() });
  }

  clickToPlay(o = {}) {
    this.current = 'click';
    const sess = this.app.session;
    if (o.resume) {
      const sub = o.retry ? 'Click once more to capture the mouse' : 'Click or press Tab · P opens the menu';
      const drag = o.retry >= 2 ? '<div class="actions mid"><button class="btn sm ghost" data-act="drag">Play with drag-to-look</button></div>' : '';
      this.show(`<div class="panel narrow go-card"><div class="go-big">Click to continue</div><div class="go-sub">${sub}</div>${drag}</div>`, {
        drag: (b, e) => { e.stopPropagation(); this.app.input.dragMode = true; this.app.resume(); },
      }, 'screen center dim');
      this.root.firstChild.addEventListener('click', (e) => { if (e.target.closest('[data-act]')) return; this.sfx('uiConfirm', 0.3); this.app.resume(); }, { once: true });
      return;
    }
    const first = !this.seenControls;
    this.seenControls = true;
    const title = sess && sess.cfg.title ? `<div class="small muted" style="font-weight:800;text-transform:uppercase;letter-spacing:1px">${esc(sess.cfg.title)}</div>` : '';
    const touch = this.app.input.touchMode;
    const quick = touch
      ? [['Left thumb', 'Move'], ['Right thumb', 'Look'], ['SHOOT', 'Hold & release'], ['PASS', 'To the ring'], ['CROSS', 'Crossover'], ['STEAL', 'On defence'], ['II', 'Pause']]
      : [['WASD', 'Move'], ['Mouse', 'Look'], ['Shift', 'Sprint'], ['Left click', 'Shoot (hold)'], ['Right click', 'Pass'], ['Q', 'Crossover'], ['E', 'Steal'], ['Space', 'Jump / fake'], ['C', 'Stance'], ['P', 'Pause']];
    const keys = `<div class="keys" style="margin-top:var(--s4);text-align:left">${quick.map(([k, d]) => `<div class="key"><span class="kc">${k}</span><span>${d}</span></div>`).join('')}</div>`;
    this.show(`<div class="panel mid go-card">${title}<div class="go-big">${touch ? 'Tap to play' : 'Click to play'}</div>
      ${first ? keys : `<div class="go-sub">${touch ? 'Left thumb move · right thumb look' : 'WASD move · mouse look · P pause'}</div>`}</div>`, {}, 'screen center dim');
    this.root.firstChild.addEventListener('click', () => { this.sfx('uiConfirm', 0.3); this.app.resume(); }, { once: true });
  }
}

function pct(v) { return `${Math.round(v * 100)}%`; }
export { ATTRS };
