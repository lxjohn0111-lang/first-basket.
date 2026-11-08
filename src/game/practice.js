// Practice modes on the practice court (the match engine with the rules off):
//   drills    Coach Mo's guided drills, one skill at a time, each with a par time
//             for a star and a time limit after which the coach moves on
//   shootout  60 seconds: make as many as you can; a gold hot spot doubles a make
//   free      free shootaround, no clock; a rebounder feeds you the ball
// Like First Touch's tutorial: a small coach card, progress dots, stars, a timer bar,
// an arrow toward an objective that is out of view, and Enter / a button to skip.
import { CoachCard } from '../ui/coach.js';
import { HOOP, SPOTS, distToHoop } from '../sim/constants.js';
import { teamConfig, teamById, humanEntry } from './teams.js';
import { startDribble } from '../sim/dribble.js';
import { startShot } from '../sim/actions.js';
import { sweetSpot, pressureOn } from '../sim/shooting.js';
import { yawOf } from '../sim/vec.js';

const V = (x, z) => ({ x, z });

function practiceTeams(profile, withDummy) {
  const t0 = teamConfig(teamById('harbor'), 1);
  const reb = { ...t0.roster[0], name: 'Jojo Rebounds', number: 11, archetype: 'guard', attrs: { shooting: 70, handling: 70, speed: 80, defense: 60, passing: 92, vertical: 60 } };
  const teams = [{ ...t0, name: 'You', short: 'YOU', roster: [humanEntry(profile), reb] }];
  const t1 = teamConfig(teamById('summit'), 1);
  const dummy = { ...t1.roster[0], name: 'Big Barry', number: 50, archetype: 'big', attrs: { shooting: 70, handling: 62, speed: 58, defense: 70, passing: 60, vertical: 66 } };
  teams.push({ ...t1, name: 'Practice', short: 'PRC', roster: withDummy ? [dummy] : [dummy] });
  return teams;
}

// ---------------------------------------------------------------- base
export class PracticeBase {
  constructor(app) { this.app = app; this.t = 0; this.made = 0; this.att = 0; this.points = 0; this.done = false; }
  matchConfig(profile) { return { seed: 77, rules: false, difficulty: this.app.settings.difficulty, teams: practiceTeams(profile, true) }; }
  attach(s) {
    this.s = s;
    const m = s.match;
    this.human = m.human;
    this.reb = m.teams[0].players[1];
    this.dummy = m.teams[1].players[0];
    this.unsub = [
      m.events.on('shot', (e) => { if (e.player === this.human && e.kind !== 'ft') this.att++; }),
      m.events.on('basket', (e) => this.onBasket(e)),
    ];
  }
  start(s) {
    const m = s.match;
    m.setPhase('live');
    m.offense = 0;
    this.parkDummy();
    m.place(this.human, HOOP.X - 6.5, 0.5);
    m.place(this.reb, HOOP.X - 1.6, -1.2);
    m.gainBall(this.human, 'practice');
    m.events.emit('snap', { t: m.time });
  }
  parkDummy() { const m = this.s.match; m.place(this.dummy, 2.2, -6.9, 0); this.dummy.drill = (p) => { p.desired.set(0, 0, 0); p.faceYaw = Math.PI / 2; }; }
  onBasket(e) { if (e.player === this.human) { this.made++; this.points += e.value; } }
  step() {}
  frame() {}
  markers() {}
  dispose() { for (const u of this.unsub || []) u(); if (this.card) this.card.dispose(); }
  finish() { const m = this.s.match; this.done = true; m.setPhase('over'); m.phaseT = 3.1; if (this.card) { this.card.pointAt(null); this.card.show(false); } }
}

// ---------------------------------------------------------------- drills
const DRILLS = [
  { id: 'dribble', say: 'Dribble around', hint: { kb: 'Move with WASD while you have the ball', touch: 'Move with the left stick' }, par: 8, limit: 30 },
  { id: 'cross', say: 'Crossover twice', hint: { kb: 'Press Q to switch hands', touch: 'Tap CROSS' }, par: 8, limit: 30 },
  { id: 'jumper', say: 'Hit a jump shot from the gold spot', hint: { kb: 'Hold left mouse, release in the green', touch: 'Hold SHOOT, release in the green' }, par: 20, limit: 50 },
  { id: 'three', say: 'Now a three from the gold spot', hint: { kb: 'Further out: the green sits higher on the meter', touch: 'Further out: the green sits higher' }, par: 25, limit: 55 },
  { id: 'layup', say: 'Drive and finish at the rim', hint: { kb: 'Sprint (Shift) at the rim, then shoot: layup or dunk', touch: 'Push the stick to sprint, then SHOOT near the rim' }, par: 12, limit: 40 },
  { id: 'pass', say: 'Pass to Jojo and get it back', hint: { kb: 'Look at Jojo, right mouse to pass', touch: 'Look at Jojo, tap PASS' }, par: 10, limit: 35 },
  { id: 'stance', say: 'Stay in front of Barry', hint: { kb: 'Hold C for the stance, slide with A/D', touch: 'Hold STANCE and slide' }, par: 10, limit: 30 },
  { id: 'steal', say: 'Steal the ball from Barry', hint: { kb: 'Press E when the dribble is low and on your side', touch: 'Tap STEAL when the dribble is low' }, par: 15, limit: 40 },
  { id: 'block', say: 'Block (or contest) Barry\'s shot', hint: { kb: 'Space to jump with him as he rises', touch: 'Tap BLOCK as he rises' }, par: 15, limit: 40 },
];

class Drills extends PracticeBase {
  constructor(app) { super(app); this.title = 'Practice Court'; this.idx = 0; this.stars = 0; this.results = []; }
  attach(s) {
    super.attach(s);
    const m = s.match;
    this.card = new CoachCard(this.app.uiRoot, DRILLS.length, () => this.skip(s));
    this.card.show(true);
    this.unsub.push(
      m.events.on('cross', (e) => { if (e.player === this.human) this.count++; }),
      m.events.on('pass', (e) => { if (e.player === this.human) this.passed = true; }),
      m.events.on('gain', (e) => { if (e.player === this.human && this.passed) this.count++; }),
      m.events.on('poke', (e) => { if (e.player === this.human) this.count++; }),
      m.events.on('block', (e) => { if (e.player === this.human) this.count += 2; }),
      m.events.on('bounce', (e) => { if (e.player === this.human && this.human.speed > 1.5) this.dribbles++; }),
    );
  }
  start(s) { super.start(s); this.begin(0); }
  begin(i) {
    const m = this.s.match;
    this.idx = i; this.t = 0; this.count = 0; this.passed = false; this.dribbles = 0; this.inFront = 0; this.resetAt = 0;
    this.drill = DRILLS[i];
    if (!this.drill) { this.finish(); return; }
    const id = this.drill.id;
    this.spot = id === 'jumper' ? V(SPOTS.elbowL[0], SPOTS.elbowL[1]) : id === 'three' ? V(SPOTS.wingR[0], SPOTS.wingR[1]) : null;
    this.parkDummy();
    m.place(this.reb, HOOP.X - 1.6, -1.6);
    if (id === 'stance' || id === 'steal' || id === 'block') {
      m.place(this.human, HOOP.X - 4.2, 0, yawOf(-1, 0));
      this.setupDummy(id);
    } else {
      const sp = this.spot || V(HOOP.X - 7, 1.5);
      m.place(this.human, sp.x - 0.6, sp.z * 0.9);
      m.gainBall(this.human, 'practice');
    }
    m.events.emit('snap', { t: m.time });
    this.s.hud.notify(this.drill.say.toUpperCase(), '');
  }
  setupDummy(id) {
    const m = this.s.match, d = this.dummy;
    m.place(d, HOOP.X - 6.8, 0, yawOf(1, 0));
    m.gainBall(d, 'practice');
    let dir = 1, timer = 0;
    if (id === 'block') {
      d.drill = (p, dt) => {
        timer += dt;
        p.desired.set(0, 0, 0);
        p.faceYaw = yawOf(HOOP.X - p.pos.x, HOOP.Z - p.pos.z);
        if (m.ball.owner === p && m.ball.state === 'held' && !p.action && timer > 2.2) {
          timer = 0;
          const spot = sweetSpot(m, p, 'jumper', pressureOn(m, p), 0);
          startShot(m, p, { kind: 'jumper', releaseCharge: spot.c });
          if (p.action) p.action.ai = true;
        }
      };
      return;
    }
    // a dribbler sliding from side to side at the top of the key
    d.drill = (p, dt) => {
      if (m.ball.owner === p && m.ball.state === 'held' && !p.action) { startDribble(p, 'R', {}); m.ball.state = 'dribble'; }
      timer += dt;
      if (Math.abs(p.pos.z) > 2.6) dir = -Math.sign(p.pos.z);
      const sp = id === 'stance' ? 2.4 : 1.4;
      p.desired.set(Math.sin(timer * 0.9) * 0.6, 0, dir * sp);
      p.faceYaw = yawOf(HOOP.X - p.pos.x, HOOP.Z - p.pos.z);
    };
  }
  skip(s) { if (this.done) return; this.results[this.idx] = { done: false, t: this.t }; this.begin(this.idx + 1); void s; }
  complete() {
    const ok = { done: true, t: this.t, star: this.t <= this.drill.par };
    this.results[this.idx] = ok;
    if (ok.star) this.stars++;
    this.app.audio.play('uiReward', { gain: 0.4 });
    this.s.hud.notify(ok.star ? '★ NICE! UNDER PAR' : 'DONE!', 'good');
    this.begin(this.idx + 1);
  }
  onBasket(e) {
    super.onBasket(e);
    if (e.player !== this.human || !this.drill) return;
    const id = this.drill.id;
    if (id === 'jumper' && e.kind !== 'layup' && e.kind !== 'dunk') this.count++;
    if (id === 'three' && e.value === 3) this.count++;
    if (id === 'layup' && (e.kind === 'layup' || e.kind === 'dunk')) this.count++;
  }
  step(s, dt) {
    if (this.done || !this.drill) return;
    const m = s.match, h = this.human, d = this.dummy, id = this.drill.id;
    this.t += dt;
    let ok = false;
    if (id === 'dribble') ok = this.dribbles >= 6;
    else if (id === 'cross') ok = this.count >= 2;
    else if (id === 'jumper' || id === 'three' || id === 'layup' || id === 'pass') ok = this.count >= 1;
    else if (id === 'stance') {
      // between Barry and the rim, close, in a stance
      const front = distToHoop(h.pos.x, h.pos.z) < distToHoop(d.pos.x, d.pos.z) - 0.3;
      const near = h.pos.distXZ(d.pos) < 1.9;
      if (front && near && h.stance) this.inFront += dt;
      ok = this.inFront >= 4;
    } else if (id === 'steal') ok = this.count >= 1;
    else if (id === 'block') {
      ok = this.count >= 2;
      const a = d.action;
      if (a && a.type === 'shot' && a.released && !this.contested && h.pos.distXZ(d.pos) < 1.8 && (h.airborne || h.handsUp)) { this.contested = true; this.count++; s.hud.notify('CONTESTED', 'good'); }
      if (!a) this.contested = false;
    }
    if (ok) { this.complete(); return; }
    if (this.t > this.drill.limit) { this.s.hud.notify('MOVING ON', ''); this.skip(s); return; }
    // the ball goes back to the dummy after a steal or a shot in the defensive drills
    if ((id === 'steal' || id === 'block' || id === 'stance') && m.ball.owner !== d && !(m.ball.shot && !m.ball.shot.done && !m.ball.shot.rim)) {
      this.resetAt += dt;
      if (this.resetAt > 1.4) { this.resetAt = 0; m.place(d, d.pos.x, d.pos.z, yawOf(1, 0)); m.gainBall(d, 'practice'); }
    } else this.resetAt = 0;
    // in the offensive drills the rebounder feeds you (the AI does it) - keep the human with the ball
  }
  frame(s) {
    if (!this.card || !this.drill) return;
    const touch = this.app.input.touchMode;
    this.card.update({ index: this.idx, doneCount: this.idx, say: this.drill.say, hint: touch ? this.drill.hint.touch : this.drill.hint.kb, stars: this.stars, frac: 1 - this.t / this.drill.limit, keyboard: !touch });
    const obj = this.spot ? { x: this.spot.x, y: 0.5, z: this.spot.z } : this.drill.id === 'layup' ? { x: HOOP.X, y: HOOP.Y, z: 0 } : this.drill.id === 'pass' ? this.reb.pos : ['stance', 'steal', 'block'].includes(this.drill.id) ? this.dummy.pos : null;
    if (obj) { const v = s.view.projectToScreen(s.view._pt || (s.view._pt = s.view.camera.position.clone()).set(obj.x, obj.y ?? 1, obj.z), s.view._pt2 || (s.view._pt2 = s.view.camera.position.clone())); this.card.pointAt(v); } else this.card.pointAt(null);
  }
  markers(s, mk) { if (this.spot) mk.showSpot(0, this.spot.x, this.spot.z, s.match.time); }
  hint() { return ''; }
  phaseText() { return `PRACTICE COURT · DRILL ${Math.min(DRILLS.length, this.idx + 1)}/${DRILLS.length}`; }
  clockText() { return `★ ${this.stars}`; }
  summary() {
    const done = this.results.filter((r) => r && r.done).length;
    return { kind: 'drills', title: 'Practice Court', stars: this.stars, total: DRILLS.length, done, rows: DRILLS.map((d, i) => ({ say: d.say, ...(this.results[i] || { done: false }) })) };
  }
}

// ---------------------------------------------------------------- shootout
const SHOOT_SPOTS = [SPOTS.cornerL, SPOTS.wingL, SPOTS.top, SPOTS.wingR, SPOTS.cornerR, SPOTS.elbowL, SPOTS.elbowR];
class Shootout extends PracticeBase {
  constructor(app, timed = true) { super(app); this.timed = timed; this.title = timed ? 'Shootout' : 'Free Shootaround'; this.len = 60; this.hot = 2; }
  start(s) { super.start(s); if (this.timed) this.s.hud.showBanner('60 SECONDS', 'Hit the gold spot for double points', 1800); }
  onBasket(e) {
    if (e.player !== this.human) return;
    this.made++;
    let v = e.value;
    const p = this.lastShotFrom;
    if (p && this.timed) {
      const hs = SHOOT_SPOTS[this.hot];
      if (Math.hypot(p.x - hs[0], p.z - hs[1]) < 1.0) { v *= 2; this.s.hud.notify(`HOT SPOT ×2 · +${v}`, 'good'); this.hot = (this.hot + 1 + Math.floor(Math.random() * (SHOOT_SPOTS.length - 1))) % SHOOT_SPOTS.length; }
    }
    this.points += v;
  }
  attach(s) {
    super.attach(s);
    this.unsub.push(s.match.events.on('shotStart', (e) => { if (e.player === this.human) this.lastShotFrom = { x: e.player.pos.x, z: e.player.pos.z }; }));
  }
  step(s, dt) {
    if (this.done) return;
    this.t += dt;
    if (this.timed && this.t >= this.len) {
      const m = s.match;
      // a shot in the air at the horn still counts
      if (m.ball.shot && !m.ball.shot.done && m.ball.state === 'free') return;
      s.audio.play('buzzer', { gain: 0.8 });
      this.finish();
    }
  }
  markers(s, mk) {
    if (!this.timed) return;
    const hs = SHOOT_SPOTS[this.hot];
    mk.showSpot(0, hs[0], hs[1], s.match.time);
  }
  hint() { return null; }
  phaseText() { return this.timed ? `SHOOTOUT · ${this.points} PTS · ${this.made}/${this.att}` : `SHOOTAROUND · ${this.made}/${this.att}`; }
  clockText() { if (!this.timed) return `${this.made}/${this.att}`; const r = Math.max(0, this.len - this.t); return r < 10 ? r.toFixed(1) : `0:${String(Math.ceil(r)).padStart(2, '0')}`; }
  summary() { return { kind: this.timed ? 'shootout' : 'free', title: this.title, points: this.points, made: this.made, att: this.att }; }
}

export function makePractice(kind, app) {
  if (kind === 'shootout') return new Shootout(app, true);
  if (kind === 'free') return new Shootout(app, false);
  return new Drills(app);
}

