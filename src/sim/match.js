// A basketball game at a fixed 120 Hz: full court (two baskets, 5v5 by default) or
// half court (3v3 / 1v1, FIBA 3x3 style).
//
// FULL COURT (FIBA style). Each team attacks one basket (attack sign +1/-1), and the
// teams switch ends at half time. Four quarters; a tie after the fourth goes to
// overtime periods.
//   tip      the opening jump ball at centre court; the team that doesn't win it gets
//            the alternating-possession arrow (it inbounds to start quarters 2-4 / OT)
//   live     clocks run: game clock, 24-second shot clock (14 after an offensive
//            rebound off the rim), 8 seconds to get the ball over half court; once
//            over, taking it back is a backcourt violation
//   scored   a made basket drops through the net; the other team inbounds from the
//            baseline under it
//   dead     a whistle (turnover, violation, foul, out of bounds); the ball is
//            inbounded from the nearest sideline (or baseline), 5 seconds to do it
//   inbound  the throw-in: everyone moves except the inbounder; the clocks start when
//            the ball is touched on the court
//   ft       free throws (shooting fouls, and every foul from a team's 5th of the quarter)
//   break    between quarters (the half-time break also switches ends)
//
// HALF COURT. Phases: intro -> check -> live -> (scored | dead | ft) -> check ... -> over
//   check   the team with the ball checks it at the top of the arc; the clock waits
//   live    clocks run: game clock, 14-second shot clock (reset when a shot hits the rim)
//   scored  a made basket falls through the net; the other team checks next
//   dead    a whistle (turnover, violation, foul, out of bounds) before the next check
//   ft      free throws after a shooting foul or in the bonus
// After a defensive rebound or a steal the new offence must take the ball back beyond
// the arc ("clear it") before a basket counts. Twos inside the arc, threes outside;
// first to the target score, or the higher score when the clock runs out (a tie goes
// to sudden-death overtime: next basket wins).
import { V3, clamp, yawOf } from './vec.js';
import { Rng } from './rng.js';
import { EventBus } from './events.js';
import { Ball } from './ball.js';
import { Player, movePlayer, separatePlayers, resetPlayerState, clampToFloor, startJump, BODY } from './player.js';
import { HOOP, RULES, BALL_R, SPOTS, LINES, COURT, FULL, isThree, inBounds, distToHoop } from './constants.js';
import { updateAction, startHolding, updateHeld, crossBurst, blockPoint } from './actions.js';
import { newCycle, dribbleLocal, toWorld } from './dribble.js';
import { Stats } from './stats.js';
import { AI } from './ai.js';

export const DIFFICULTY = {
  rookie: { label: 'Rookie', window: 1.4, steal: 1.3, stealVsHuman: 0.45, passErr: 0.6, aiFoul: 0.75, catchR: 1.1,
    ai: { react: 0.34, shot: 0.8, aggression: 0.55, bite: 1.3, timing: 1.6, intercept: 0.55, contest: 0.7 } },
  pro: { label: 'Pro', window: 1.0, steal: 1.0, stealVsHuman: 0.7, passErr: 1, aiFoul: 1, catchR: 1,
    ai: { react: 0.22, shot: 1, aggression: 0.85, bite: 1, timing: 1, intercept: 0.85, contest: 1 } },
  allstar: { label: 'All-Star', window: 0.8, steal: 0.85, stealVsHuman: 0.95, passErr: 1.1, aiFoul: 1, catchR: 0.95,
    ai: { react: 0.14, shot: 1.12, aggression: 1, bite: 0.7, timing: 0.7, intercept: 1.05, contest: 1.1 } },
};
// the human's teammates always play at full sharpness
const TEAMMATE_AI = { react: 0.2, shot: 1, aggression: 0.85, bite: 0.9, timing: 0.9, intercept: 0.9, contest: 1 };

const _bp = new V3(), _w = new V3(), _loc = [0, 0, 0];

export class Match {
  constructor(cfg) {
    this.cfg = cfg;
    this.rules = cfg.rules !== false;
    this.rng = new Rng(cfg.seed || 1);
    this.events = new EventBus();
    this.difficulty = DIFFICULTY[cfg.difficulty] || DIFFICULTY.pro;
    this.assist = this.difficulty;
    this.ball = new Ball();
    this.players = [];
    this.teams = cfg.teams.map((t, i) => ({ ...t, index: i, score: 0, fouls: 0, players: [] }));
    let human = null;
    this.teams.forEach((t, ti) => {
      t.roster.forEach((pc, k) => {
        const p = new Player({ ...pc, team: ti, slot: k });
        this.players.push(p);
        t.players.push(p);
        if (p.isHuman) human = p;
      });
    });
    this.human = human;
    this.humanTeam = human ? human.team : -1;
    this.aiParams = this.teams.map((t, i) => (i === this.humanTeam ? TEAMMATE_AI : this.difficulty.ai));
    this.time = 0;
    this.phase = 'intro';
    this.phaseT = 0;
    // full court: each team attacks one basket (sign), switched at half time
    this.full = cfg.court === 'full';
    this.dirs = this.full ? [1, -1] : [1, 1];
    this.period = 1;
    this.quarterLen = cfg.quarter || 180;
    this.otLen = cfg.ot || Math.max(60, this.quarterLen / 2);
    this.clockLen = this.full ? this.quarterLen : cfg.clock || 300;
    this.clock = this.clockLen;
    this.target = this.full ? Infinity : cfg.target || 21;
    this.shotLen = this.full ? FULL.SHOT_CLOCK : RULES.SHOT_CLOCK;
    this.shotClock = this.shotLen;
    this.shotClockOn = this.rules && cfg.shotClock !== false;
    this.frontcourt = false;   // the team with the ball has brought it over half court
    this.backcourtT = 0;       // time spent bringing it up (8-second rule)
    this.inb = null;           // throw-in state
    this.inbPending = false;   // the throw-in is in the air: clocks wait for a touch
    this.tip = null;           // jump ball state
    this.arrow = null;         // alternating possession: the team that inbounds next period
    this.offense = 0;
    this.mustClear = null;
    this.overtime = false;
    this.possessions = 0;
    this.checker = null;
    this.next = null;          // what follows a dead ball
    this.ft = null;            // free-throw state
    this.pendingSteal = null;
    this.lastPass = null;      // for assists
    this.skipRequested = false;
    this.winner = null;
    this.stats = new Stats(this);
    this.ai = new AI(this);
    this.humanCtl = null;
    this.ball.cb = {
      score: (b, side) => this.onBasket(side),
      hit: (b, kind, speed) => this.onBallHit(kind, speed),
      body: (b, q, s) => this.events.emit('deflect', { player: q, speed: s, t: this.time }),
    };
  }

  // ------------------------------------------------------------------ helpers
  // the attack sign of a team: +1 attacks the +X basket
  side(team) { return this.dirs[team] ?? 1; }
  hoopX(team) { return this.side(team) * HOOP.X; }
  // the team attacking the basket at end `s`
  teamAttacking(s) { return this.dirs[0] === s ? 0 : this.dirs[1] === s ? 1 : this.offense; }
  // x in the attack frame of a team (> 0: its frontcourt)
  localX(team, x) { return this.side(team) * x; }
  get periodLabel() {
    if (!this.full) return this.overtime ? 'OT' : '';
    const q = FULL.QUARTERS;
    return this.period <= q ? `Q${this.period}` : this.period === q + 1 ? 'OT' : `OT${this.period - q}`;
  }
  get inOvertime() { return this.full ? this.period > FULL.QUARTERS : this.overtime; }
  isOpp(p) { return this.human && p.team !== this.human.team; }
  teamOf(i) { return this.teams[i]; }
  get scoreline() { return [this.teams[0].score, this.teams[1].score]; }
  get displayClock() {
    if (this.overtime && !this.full) return 'OT';
    const c = Math.max(0, this.clock);
    if (c < 10) return c.toFixed(1);
    const s = Math.ceil(c);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  }
  get displayShot() { return String(Math.max(0, Math.ceil(this.shotClock))); }
  requestSkip() { this.skipRequested = true; }
  setPhase(ph) { this.phase = ph; this.phaseT = 0; this.skipRequested = false; }

  place(p, x, z, yaw) {
    resetPlayerState(p);
    p.pos.set(x, 0, z);
    p.prevPos.copy(p.pos);
    p.yaw = p.prevYaw = yaw ?? yawOf(this.hoopX(p.team) - x, HOOP.Z - z);
    p.gait = p.prevGait = 0;
  }

  // ------------------------------------------------------------------ flow
  start(firstTeam) {
    const t = firstTeam ?? (this.rng.next() < 0.5 ? 0 : 1);
    this.events.emit('tipoff', { team: t, t: this.time });
    if (!this.rules) { this.setPhase('live'); return; }
    if (this.full) { this.startTip(); return; }
    this.startCheck(t, true);
  }

  // ------------------------------------------------------------------ full court: jump ball
  // the jumper for a team: the best leaper among its AI players (the human jumps if
  // they are the team's big, or the only choice)
  jumperOf(team) {
    let best = null, bs = -1;
    for (const p of this.teams[team].players) {
      const sc = p.attrs.vertical + (p.archetype === 'big' ? 30 : p.archetype === 'forward' ? 12 : 0) - (p.isHuman && p.archetype !== 'big' ? 100 : 0);
      if (sc > bs) { bs = sc; best = p; }
    }
    return best;
  }

  startTip() {
    this.setPhase('tip');
    const ja = this.jumperOf(0), jb = this.jumperOf(1);
    this.tip = { jumpers: [ja, jb], t: 0, tossed: false, won: null };
    this.offense = 0;
    for (const team of [0, 1]) {
      const s = this.side(team);
      const j = team === 0 ? ja : jb;
      // each jumper on the side of the basket they defend, facing the one they attack
      this.place(j, -s * 0.42, 0, yawOf(s, 0));
      // the others around the circle (positions in the team's attack frame)
      const spots = [[2.2, 2.2], [-2.4, -3.6], [2.6, -2.6], [-7, 0.8]];
      let k = 0;
      for (const p of this.teams[team].players) {
        if (p === j) continue;
        const [lx, lz] = spots[k++ % spots.length];
        this.place(p, s * lx, s * lz, yawOf(-s * lx, -s * lz));
      }
    }
    const b = this.ball;
    b.owner = null; b.shot = null; b.pass = null; b.ignore = null;
    b.state = 'dead';
    b.place(0, 1.9, 0);
    this.events.emit('snap', { t: this.time });
    this.events.emit('tip', { jumpers: [ja, jb], t: this.time });
  }

  updateTip(dt) {
    const tp = this.tip, b = this.ball;
    if (!tp) return;
    tp.t += dt;
    // the referee tosses it up; it peaks above anyone's reach
    if (!tp.tossed) {
      if (tp.t > (this.human ? 1.6 : 0.8)) {
        tp.tossed = true;
        tp.tossT = this.time;
        b.state = 'free';
        b.release(0, 6.4, 0);
        b.lastTouch = null;
        this.events.emit('toss', { t: this.time });
        // AI jumpers time their jump to meet it at the top of their reach
        for (const j of tp.jumpers) {
          if (j.isHuman) continue;
          const reachTop = 2.36 + j.jumpHeight();
          const tBall = 6.4 / 9.81 + Math.sqrt(Math.max(0, 2 * (2.09 + 1.9 - reachTop)) / 9.81);
          const tUp = Math.sqrt((2 * j.jumpHeight()) / 9.81);
          j.ai.tipJumpAt = this.time + tBall - tUp + this.rng.gauss() * 0.07 * this.aiParams[j.team].timing;
        }
      }
      return;
    }
    for (const j of tp.jumpers) {
      if (!j.isHuman && j.ai.tipJumpAt != null && this.time >= j.ai.tipJumpAt && !j.airborne) {
        j.ai.tipJumpAt = null;
        startJump(j, this.time);
        j.action = { type: 'jump', t: 0 };
        this.events.emit('jump', { player: j, t: this.time });
      }
    }
    // a raised hand meeting the ball on its way down taps it to a teammate
    if (b.vel.y < 0.5) {
      let best = null, bh = -1;
      for (const j of tp.jumpers) {
        const hand = j.pos.y + 2.36 + 0.1;
        const d = Math.hypot(b.pos.x - j.pos.x, b.pos.z - j.pos.z);
        if (b.pos.y <= hand + 0.06 && b.pos.y > hand - 0.45 && d < 0.75) {
          const sc = hand + this.rng.next() * 0.04;
          if (sc > bh) { bh = sc; best = j; }
        }
      }
      if (best) { this.tapTo(best); return; }
    }
    // nobody got a hand to it: a loose ball once it drops below the jumpers
    if (b.pos.y < 1.6 && b.vel.y < 0) { this.tip = null; this.goLiveLoose(null); }
  }

  tapTo(j) {
    const b = this.ball, s = this.side(j.team);
    // to the nearest teammate, preferably behind the jumper (on their own half)
    let best = null, bs = 1e9;
    for (const q of this.teams[j.team].players) {
      if (q === j) continue;
      const d = q.pos.distXZ(j.pos) + (this.localX(j.team, q.pos.x) > 0.5 ? 1.5 : 0) + this.rng.next() * 1.2;
      if (d < bs) { bs = d; best = q; }
    }
    const tx = best ? best.pos.x : -s * 3, tz = best ? best.pos.z : 0;
    const dx = tx - b.pos.x, dz = tz - b.pos.z, dl = Math.hypot(dx, dz) || 1;
    const sp = Math.min(6.5, dl / 0.55);
    b.state = 'free';
    b.vel.set((dx / dl) * sp, 0.8, (dz / dl) * sp);
    b.lastTouch = { player: j, team: j.team, t: this.time };
    this.tip = null;
    this.events.emit('tapped', { player: j, to: best, t: this.time });
    this.goLiveLoose(j.team);
  }

  // play starts with nobody holding the ball (after the tap)
  goLiveLoose(team) {
    this.offense = team ?? this.offense;
    this.shotClock = this.shotLen;
    this.frontcourt = false;
    this.backcourtT = 0;
    this.tipLoose = true;
    this.setPhase('live');
    this.events.emit('live', { team: this.offense, t: this.time });
  }

  // ------------------------------------------------------------------ full court: throw-ins
  // a spot on the nearest sideline (never right at a corner)
  sidelineSpot(x, z) {
    return { x: clamp(x, -COURT.HL + 1.2, COURT.HL - 1.2), z: (z >= 0 ? 1 : -1) * (COURT.HW + 0.4), kind: 'sideline' };
  }
  // behind the baseline at end s, beside the basket support
  baselineSpot(s, z = 1.5) {
    const zz = Math.abs(z) < 1.4 ? (z >= 0 ? 1.5 : -1.5) : clamp(z, -COURT.HW + 0.8, COURT.HW - 0.8);
    return { x: s * (COURT.HL + 0.45), z: zz, kind: 'baseline' };
  }
  // where a ball that went out at (x, z) comes back in
  outSpot(x, z) {
    if (Math.abs(x) >= COURT.HL - 0.05 && Math.abs(z) < COURT.HW - 0.4) return this.baselineSpot(x >= 0 ? 1 : -1, z);
    return this.sidelineSpot(x, z);
  }
  // an inbound for `team` at a spot: { type, team, x, z, kind, inbounder? }
  inboundNext(team, sp, o = {}) { return { type: 'inbound', team, x: sp.x, z: sp.z, kind: sp.kind, ...o }; }

  // the AI player of `team` nearest to (x, z) takes the ball out
  pickInbounder(team, x, z) {
    let best = null, bd = 1e9;
    const ps = this.teams[team].players;
    for (const p of ps) {
      if (p.isHuman && ps.length > 1) continue;
      const d = Math.hypot(p.pos.x - x, p.pos.z - z);
      if (d < bd) { bd = d; best = p; }
    }
    return best;
  }

  startInbound(team, x, z, kind = 'sideline', o = {}) {
    const newPoss = team !== this.offense || o.newPoss;
    this.setPhase('inbound');
    if (newPoss) {
      this.possessions++;
      this.shotClock = this.shotLen;
      this.frontcourt = false;
      this.backcourtT = 0;
      this.lastPass = null;
    } else if (this.localX(team, x) > 0) {
      // the same team keeps it in its frontcourt: at least 14 on the shot clock
      this.shotClock = Math.max(this.shotClock, FULL.OREB_CLOCK);
    }
    this.offense = team;
    this.mustClear = null;
    const ib = o.inbounder && o.inbounder.team === team && !o.inbounder.isHuman ? o.inbounder : this.pickInbounder(team, x, z);
    // the inbounder stands just out of bounds facing into the court
    resetPlayerState(ib);
    ib.pos.set(x, 0, z);
    ib.yaw = yawOf(-x * (kind === 'baseline' ? 1 : 0.15), -z * (kind === 'baseline' ? 0.2 : 1));
    ib.prevYaw = ib.yaw;
    this.inb = { team, x, z, kind, inbounder: ib, t: 0, released: false };
    const b = this.ball;
    b.shot = null; b.pass = null; b.ignore = null;
    b.owner = ib;
    b.pos.set(ib.pos.x + Math.sin(ib.yaw) * 0.36, BODY.HOLD_Y, ib.pos.z + Math.cos(ib.yaw) * 0.36);
    b.prevPos.copy(b.pos);
    b.vel.set(0, 0, 0); b.w.set(0, 0, 0);
    startHolding(this, ib);
    b.state = 'held';
    if (o.snap) this.events.emit('snap', { t: this.time });
    this.events.emit('inbound', { team, player: ib, kind, newPoss, t: this.time });
  }

  updateInbound(dt) {
    const f = this.inb, b = this.ball;
    if (!f) return;
    f.t += dt;
    const ib = f.inbounder;
    // released: play is live, the clocks wait for the first touch
    if (b.state === 'free' && b.pass && b.pass.passer === ib) {
      f.released = true;
      this.inb = null;
      this.inbPending = true;
      this.setPhase('live');
      this.events.emit('live', { team: this.offense, t: this.time });
      return;
    }
    if (b.owner !== ib) { this.inb = null; this.setPhase('live'); return; }
    // five seconds to get it in
    if (f.t > FULL.INBOUND && !(ib.action && ib.action.type === 'pass')) {
      this.events.emit('fiveSeconds', { team: f.team, t: this.time });
      this.turnover(f.team, 'fiveSec', ib, { x: f.x, z: f.z, kind: f.kind });
    }
  }

  // ------------------------------------------------------------------ full court: periods
  endOfPeriod() {
    if (this.phase === 'over' || this.phase === 'break') return;
    this.events.emit('buzzer', { t: this.time });
    const [a, c] = this.scoreline;
    if (this.period >= FULL.QUARTERS && a !== c) { this.finish(); return; }
    const b = this.ball;
    if (b.owner) { const p = b.owner; if (p.action && p.action.type !== 'jump') p.action = null; p.dribble = null; }
    if (b.state !== 'free') { b.state = 'free'; b.owner = null; b.vel.scale(0.3); }
    b.shot = null; b.pass = null;
    this.inb = null; this.inbPending = false; this.ft = null;
    for (const p of this.players) { if (p.action && p.action.type !== 'jump') p.action = null; p.stance = false; p.handsUp = false; }
    this.events.emit('periodEnd', { period: this.period, half: this.period === 2, ot: this.period >= FULL.QUARTERS, t: this.time });
    this.setPhase('break');
    this.next = { type: 'period' };
  }

  startPeriod() {
    this.period++;
    const ot = this.period > FULL.QUARTERS;
    this.clockLen = ot ? this.otLen : this.quarterLen;
    this.clock = this.clockLen;
    // team fouls start again each quarter (overtime counts as the fourth)
    if (!ot) for (const t of this.teams) t.fouls = 0;
    // half time: the teams switch ends
    if (this.period === 3) this.dirs = [-this.dirs[0], -this.dirs[1]];
    const team = this.arrow ?? 0;
    this.arrow = 1 - team;
    this.events.emit('periodStart', { period: this.period, ot, team, label: this.periodLabel, t: this.time });
    this.placeFormation(team);
    const sp = { x: 0, z: COURT.HW + 0.4, kind: 'centre' };
    this.startInbound(team, sp.x, sp.z, 'centre', { newPoss: true, inbounder: this.formationInbounder, snap: true });
  }

  // everyone set for a throw-in at the centre line (start of quarters 2-4 and overtime)
  placeFormation(team) {
    const s = this.side(team);
    const off = this.teams[team].players, def = this.teams[1 - team].players;
    const ib = this.pickInbounder(team, 0, COURT.HW);
    this.formationInbounder = ib;
    // offence spots relative to the throw-in (attack frame): two to receive, the rest spaced
    const spots = [[-2.2, 4.4], [3.0, 3.6], [6.6, -1.2], [3.4, -4.2], [8.5, 3.6]];
    let k = 0;
    // the human (if on this team) gets the receiving spot nearest the ball
    const order = [...off.filter((p) => p.isHuman), ...off.filter((p) => !p.isHuman && p !== ib)];
    for (const p of order) {
      const [lx, lz] = spots[k++ % spots.length];
      this.place(p, s * lx, lz, yawOf(0 - s * lx, COURT.HW - lz));
    }
    this.place(ib, 0, COURT.HW + 0.4);
    // defenders between their man and the basket they defend
    const marks = this.ai.assignMarks(team, ib);
    for (const d of def) {
      const man = marks.get(d) || off[0];
      const hx = s * HOOP.X - man.pos.x, hz = -man.pos.z, hl = Math.hypot(hx, hz) || 1;
      const gap = man === ib ? 2.6 : 1.6;
      this.place(d, man.pos.x + (hx / hl) * gap, clamp(man.pos.z + (hz / hl) * gap, -COURT.HW + 0.5, COURT.HW - 0.5), yawOf(-hx, -hz));
    }
  }

  // check ball at the top of the arc for `team`
  startCheck(team, first = false) {
    this.setPhase('check');
    this.offense = team;
    this.mustClear = null;
    this.shotClock = RULES.SHOT_CLOCK;
    this.possessions++;
    const off = this.teams[team].players, def = this.teams[1 - team].players;
    const human = this.human;
    const checker = human && human.team === team ? human : off[(this.possessions >> 1) % off.length];
    this.checker = checker;
    const others = off.filter((p) => p !== checker);
    const [tx, tz] = SPOTS.top;
    this.place(checker, tx, tz);
    const spots = [SPOTS.wingL, SPOTS.wingR];
    others.forEach((p, i) => this.place(p, spots[i % 2][0] + (this.rng.next() - 0.5) * 0.6, spots[i % 2][1]));
    // defenders: one on the ball (the human if defending), the rest on their men
    const marks = this.ai.assignMarks(team, checker);
    for (const d of def) {
      const man = marks.get(d) || checker;
      const toward = man === checker ? 1.8 : 2.6;
      const dx = HOOP.X - man.pos.x, dz = HOOP.Z - man.pos.z, dl = Math.hypot(dx, dz) || 1;
      this.place(d, man.pos.x + (dx / dl) * toward, man.pos.z + (dz / dl) * toward, yawOf(-dx, -dz));
    }
    const b = this.ball;
    b.shot = null; b.pass = null; b.ignore = null;
    b.owner = checker;
    b.pos.set(checker.pos.x + Math.sin(checker.yaw) * 0.36, BODY.HOLD_Y, checker.pos.z + Math.cos(checker.yaw) * 0.36);
    b.prevPos.copy(b.pos);
    b.vel.set(0, 0, 0); b.w.set(0, 0, 0);
    startHolding(this, checker);
    b.state = 'held';
    this.events.emit('snap', { t: this.time });
    this.events.emit('check', { team, player: checker, first, t: this.time });
  }

  goLive() {
    this.setPhase('live');
    this.events.emit('live', { team: this.offense, t: this.time });
  }

  // a whistle: the ball is dead, then `next` (a check or free throws)
  whistle(reason, next, o = {}) {
    if (this.phase === 'over') return;
    this.setPhase('dead');
    this.next = next;
    const b = this.ball;
    if (b.owner) { const p = b.owner; if (p.action && p.action.type !== 'jump') p.action = null; p.dribble = null; }
    if (b.state !== 'free') { b.state = 'free'; b.owner = null; b.vel.scale(0.3); }
    b.shot = null; b.pass = null;
    this.events.emit('whistle', { reason, t: this.time, ...o });
  }

  turnover(team, reason, player = null, spot = null) {
    // team = the team that loses the ball
    if (player) this.stats.add(player, 'tov');
    this.events.emit('turnover', { team, reason, player, t: this.time });
    if (this.full) {
      const b = this.ball;
      const sp = spot || this.sidelineSpot(b.pos.x, b.pos.z);
      this.whistle(reason, this.inboundNext(1 - team, sp), { team });
      return;
    }
    this.whistle(reason, { type: 'check', team: 1 - team }, { team });
  }

  // ------------------------------------------------------------------ fouls
  foul(fouler, victim, kind) {
    if (this.phase !== 'live' || !this.rules) return;
    const t = this.teams[fouler.team];
    t.fouls++;
    this.stats.add(fouler, 'pf');
    this.events.emit('foul', { player: fouler, victim, kind, t: this.time, teamFouls: t.fouls });
    if (kind === 'shooting') return; // the shot plays on; free throws when it resolves
    const bonus = t.fouls >= (this.full ? FULL.BONUS_FOULS : RULES.BONUS_FOULS);
    const keep = this.full ? this.inboundNext(victim.team, this.sidelineSpot(victim.pos.x, victim.pos.z)) : { type: 'check', team: victim.team };
    this.whistle('foul', bonus ? { type: 'ft', shooter: victim, n: 2 } : keep, { foul: true, bonus });
  }

  // ------------------------------------------------------------------ step
  step(dt) {
    this.time += dt;
    this.phaseT += dt;
    const b = this.ball;
    b.beginStep();
    const now = this.time;
    const live = this.phase === 'live';
    const frozen = this.phase === 'check' || this.phase === 'ft' || this.phase === 'intro' || this.phase === 'over' || this.phase === 'tip' || this.phase === 'break';
    const inbounder = this.phase === 'inbound' && this.inb ? this.inb.inbounder : null;

    // controllers
    if (this.humanCtl) this.humanCtl.update(dt);
    this.ai.update(dt);

    for (const p of this.players) updateAction(this, p, dt);
    for (const p of this.players) {
      if (frozen || p === inbounder) {
        p.desired.set(0, 0, 0); p.sprint = false;
        if (!p.airborne) { p.vel.set(0, 0, 0); }
      }
      movePlayer(p, dt, now, b.owner === p);
    }
    separatePlayers(this.players, now, b.owner);
    if (inbounder && this.inb) { inbounder.pos.x = this.inb.x; inbounder.pos.z = this.inb.z; }
    for (const p of this.players) clampToFloor(p, this.full);

    // ball
    if (b.owner && (b.state === 'held' || b.state === 'dribble')) this.updateCarried(b.owner, dt);
    else if (b.state === 'free') b.step(dt, now, this.players);
    if (b.net.amp > 0) b.net.amp = Math.max(0, b.net.amp - dt * 0.5);

    if (live) {
      this.updatePossession();
      this.checkBlocks();
      this.checkShootingFouls();
      this.rulesLive(dt);
    }
    this.updatePhase(dt);
    this.stats.update(dt);
  }

  // dribble cycle or hands, kinematic
  updateCarried(p, dt) {
    const b = this.ball;
    if (b.state === 'dribble') {
      const d = p.dribble;
      if (!d || p.airborne) { startHolding(this, p); updateHeld(this, p, dt); return; }
      const before = d.t;
      d.t += dt;
      if (before < d.td && d.t >= d.td) this.events.emit('bounce', { player: p, x: b.pos.x, z: b.pos.z, dribble: true, t: this.time });
      // picking the dribble up: as soon as the ball is back in reach of the hands
      if (p.gatherPending) {
        dribbleLocal(p, _loc);
        const rising = d.t >= d.td;
        if (_loc[2] > 0.58 && (rising || d.t < d.td * 0.35)) { startHolding(this, p); updateHeld(this, p, dt); return; }
      }
      if (d.t >= d.T) {
        if (p.gatherPending) { startHolding(this, p); updateHeld(this, p, dt); return; }
        newCycle(p, this.ai.pressureLow(p));
        if (d.cross) crossBurst(this, p);
      }
      dribbleLocal(p, _loc);
      toWorld(p, _loc, _w);
      b.setKinematic(_w.x, _w.y + p.pos.y, _w.z, dt);
      return;
    }
    updateHeld(this, p, dt);
  }

  // ------------------------------------------------------------------ possession
  gainBall(p, how) {
    const b = this.ball, now = this.time;
    const prevTeam = this.offense;
    const shot = b.shot, pass = b.pass;
    const prevTouch = b.lastTouch;
    if (p.action && p.action.type !== 'jump' && p.action.type !== 'celebrate') p.action = null;
    startHolding(this, p);
    b.owner = p;
    b.state = 'held';
    b.shot = null; b.pass = null;
    b.lastTouch = { player: p, team: p.team, t: now };
    p.gainT = now;
    this.inbPending = false;
    this.tipLoose = false;
    if (this.full && this.arrow == null) this.arrow = 1 - p.team;
    // rebounds
    if (shot && !shot.done) this.resolveMiss(shot);
    if (shot) {
      this.stats.add(p, p.team === shot.team ? 'oreb' : 'dreb');
      this.events.emit('rebound', { player: p, offensive: p.team === shot.team, t: now });
    }
    if (pass) {
      if (pass.team === p.team && pass.passer !== p) {
        this.stats.add(pass.passer, 'pcmp');
        this.lastPass = { passer: pass.passer, receiver: p, t: now };
      } else if (pass.team !== p.team) {
        this.stats.add(p, 'stl');
        this.stats.add(pass.passer, 'tov');
        this.events.emit('interception', { player: p, victim: pass.passer, t: now });
      }
    }
    if (this.pendingSteal && now - this.pendingSteal.t < 2 && p.team === this.pendingSteal.player.team) {
      this.stats.add(this.pendingSteal.player, 'stl');
      this.stats.add(this.pendingSteal.victim, 'tov');
      this.events.emit('steal', { player: this.pendingSteal.player, victim: this.pendingSteal.victim, t: now });
    }
    this.pendingSteal = null;
    if (p.team !== prevTeam) {
      this.offense = p.team;
      this.shotClock = this.shotLen;
      this.lastPass = null;
      if (this.rules && this.phase === 'live' && !this.full) this.mustClear = isThree(p.pos.x, p.pos.z) ? null : p.team;
      this.frontcourt = false;
      this.backcourtT = 0;
      this.possessions++;
      this.events.emit('possession', { team: p.team, player: p, how, t: now });
    } else {
      if (shot && (shot.rim || shot.board)) this.shotClock = this.full ? Math.max(this.shotClock, FULL.OREB_CLOCK) : RULES.SHOT_CLOCK;
      // after a shot, or a ball the defence knocked away, the half-court line starts again
      if (shot || (prevTouch && prevTouch.team !== p.team)) { this.frontcourt = false; this.backcourtT = 0; }
    }
    if (this.full && this.localX(p.team, p.pos.x) > 0.12) this.frontcourt = true;
    this.events.emit('gain', { player: p, how, t: now });
  }

  updatePossession() {
    const b = this.ball, now = this.time;
    if (b.state !== 'free') return;
    const shot = b.shot, pass = b.pass;
    // a shot on its way up (or still above the rim before touching it) can't be caught
    const shotLive = shot && !shot.rim && !shot.board && !shot.blocked && !shot.done;
    if (shotLive && b.pos.y > 2.0) return;
    let best = null, bestD = 1e9;
    for (const p of this.players) {
      if (now < p.noCatchUntil) continue;
      if (p.action && p.action.type === 'shot' && !p.action.released) continue;
      const dx = b.pos.x - p.pos.x, dz = b.pos.z - p.pos.z;
      const d = Math.hypot(dx, dz);
      const reachTop = p.pos.y + BODY.REACH + 0.12;
      if (b.pos.y > reachTop || b.pos.y < p.pos.y - 0.2) continue;
      let r = p.isHuman ? RULES.HUMAN_PICKUP_R * this.assist.catchR : RULES.PICKUP_R;
      if (pass && pass.target === p) r = Math.max(r, 0.9);
      // high balls need the hands up: only within arm's reach overhead
      if (b.pos.y > p.pos.y + 2.0) r *= 0.75;
      if (d > r) continue;
      const rel = Math.hypot(b.vel.x - p.vel.x, b.vel.y, b.vel.z - p.vel.z);
      if (rel > 14) continue;
      // an opponent reading a pass: a chance, decided once per pass
      if (pass && pass.team !== p.team && !p.isHuman) {
        if (pass.tried.has(p)) continue;
        pass.tried.add(p);
        // the closer to the ball's path, the better the chance
        const k = clamp(0.3 + p.attrs.defense / 260, 0.2, 0.75) * this.aiParams[p.team].intercept * (now < p.beatenUntil ? 0.3 : 1) * clamp(1.25 - d / r, 0.35, 1);
        if (this.rng.next() > k) {
          if (d < 0.45) { b.vel.x *= 0.55; b.vel.z *= 0.55; b.vel.y = Math.abs(b.vel.y) * 0.3 + 0.5; b.pass = null; b.lastTouch = { player: p, team: p.team, t: now }; this.events.emit('deflect', { player: p, t: now }); }
          continue;
        }
      }
      if (d < bestD - 1e-6 || (Math.abs(d - bestD) <= 1e-6 && best && p.id < best.id)) { best = p; bestD = d; }
    }
    if (best) this.gainBall(best, pass ? (pass.team === best.team ? 'catch' : 'interception') : shot ? 'rebound' : 'loose');
  }

  // raised hands meeting the ball: a block, a strip, or goaltending
  checkBlocks() {
    const b = this.ball, now = this.time;
    for (const q of this.players) {
      if (q.team === this.offense) continue;
      if (!q.airborne && !q.handsUp) continue;
      blockPoint(q, _bp);
      const d = _bp.dist(b.pos);
      if (d > 0.32) continue;
      // hands in the shooter's face: a contest, and sometimes a clean block (decided once)
      const key = b.shot && !b.owner ? b.shot : b.owner && b.owner.action;
      if (!key || (key.tried && key.tried.has(q))) continue;
      (key.tried || (key.tried = new Set())).add(q);
      const skill = (q.attrs.vertical + q.attrs.defense) / 198;
      const end = b.pos.x >= 0 ? 1 : -1;
      const nearRim = distToHoop(b.pos.x, b.pos.z, end) < 2.6;
      let chance = q.isHuman ? 0.3 + 0.25 * skill : (0.08 + 0.24 * skill) * (nearRim ? 1.3 : 0.75) * this.aiParams[q.team].contest;
      // timing: hands on the way up or at the peak block; a late jump (falling) rarely does
      if (q.airborne && q.vy < -1.5) chance *= 0.35;
      if (this.rng.next() > chance) continue;
      const shooter = b.owner;
      if (shooter && shooter.team !== q.team && shooter.action && shooter.action.type === 'shot' && !shooter.action.released && b.pos.y > 1.95) {
        if (shooter.action.blockedBy) continue;
        // blocked out of the hands: swatted away
        const dx = b.pos.x - q.pos.x, dz = b.pos.z - q.pos.z, dl = Math.hypot(dx, dz) || 1;
        shooter.action = null;
        shooter.dribble = null;
        b.release((dx / dl) * 3 + this.rng.gauss() * 0.8, -1.5, (dz / dl) * 3 + this.rng.gauss() * 0.8);
        b.lastTouch = { player: q, team: q.team, t: now };
        b.ignore = shooter; b.ignoreUntil = now + 0.4;
        shooter.noCatchUntil = now + 0.4;
        b.shot = { shooter, team: shooter.team, kind: 'blocked', value: 0, t: now, rim: false, board: false, blocked: true, done: true };
        this.stats.add(q, 'blk');
        this.stats.add(shooter, 'fga');
        this.events.emit('block', { player: q, victim: shooter, t: now });
        return;
      }
      const s = b.shot;
      if (s && !s.blocked && !s.rim && !s.board && b.state === 'free' && now - s.t < 1.2 && s.team !== q.team) {
        // on the way down over the rim: goaltending, the basket counts
        if (b.vel.y < 0 && b.pos.y > HOOP.Y && distToHoop(b.pos.x, b.pos.z, end) < 1.6) {
          this.events.emit('goaltend', { player: q, t: now });
          s.goaltend = true;
          this.awardBasket(s, true);
          return;
        }
        s.blocked = true;
        s.done = true;
        const fx = Math.sin(q.yaw), fz = Math.cos(q.yaw);
        b.vel.set(fx * 3.2 - b.vel.x * 0.15 + this.rng.gauss() * 0.7, -1.2 - Math.random() * 0.5, fz * 3.2 - b.vel.z * 0.15 + this.rng.gauss() * 0.7);
        b.lastTouch = { player: q, team: q.team, t: now };
        this.stats.add(q, 'blk');
        this.events.emit('block', { player: q, victim: s.shooter, t: now });
        return;
      }
    }
  }

  // a defender crashing into a shooter in the act
  checkShootingFouls() {
    for (const s of this.players) {
      const a = s.action;
      if (!a || a.type !== 'shot' || a.fouledBy || a.kind === 'ft') continue;
      if (a.released && this.time - (a.t0 + a.rt) > 0.15) continue;
      for (const q of this.players) {
        if (q.team === s.team) continue;
        const d = q.pos.distXZ(s.pos);
        if (d > 0.8) continue;
        const rvx = q.vel.x - s.vel.x, rvz = q.vel.z - s.vel.z;
        const into = -(rvx * (q.pos.x - s.pos.x) + rvz * (q.pos.z - s.pos.z)) / (d || 1);
        if (!(q.airborne || into > 1.2 || (q.handsUp && d < 0.7))) continue;
        a.fouledBy = q; // decided once per shot
        const atRim = a.kind === 'layup' || a.kind === 'dunk';
        const chance = (q.isHuman ? 0.42 : 0.24 * this.assist.aiFoul) * (q.airborne ? 1.25 : 1) * (atRim ? 1.3 : 0.6) * (d < 0.6 ? 1.2 : 1);
        if (this.rng.next() < chance) {
          a.foul = q;
          if (a.released && this.ball.shot && this.ball.shot.shooter === s) this.ball.shot.foul = q;
          this.foul(q, s, 'shooting');
        }
      }
    }
  }

  // ------------------------------------------------------------------ scoring
  onBallHit(kind, speed) {
    const b = this.ball, s = b.shot, now = this.time;
    if (s && !s.done) {
      if (kind === 'rim') s.rim = true;
      if (kind === 'board') s.board = true;
      if (kind === 'floor') { this.resolveMiss(s); }
    }
    this.events.emit('hit', { kind, speed, x: b.pos.x, y: b.pos.y, z: b.pos.z, t: now });
  }

  onBasket(side = 1) {
    const b = this.ball;
    let s = b.shot;
    // full court: a ball through a basket counts for the team attacking it
    if (this.full && s && s.side != null && s.side !== side) s = null;
    if (this.phase === 'ft' && this.ft) {
      this.teams[this.ft.shooter.team].score += 1;
      this.stats.add(this.ft.shooter, 'ftm');
      this.stats.add(this.ft.shooter, 'pts', 1);
      if (s) s.done = true;
      this.ft.made = true;
      this.events.emit('basket', { team: this.ft.shooter.team, value: 1, player: this.ft.shooter, kind: 'ft', t: this.time, pos: b.pos.clone() });
      return;
    }
    if (this.phase !== 'live') { this.events.emit('swish', { t: this.time }); return; }
    if (s && !s.done) { this.awardBasket(s, false); return; }
    // a loose ball tipped in counts two for the team on offence (attacking that basket)
    if (!s) {
      const lt = b.lastTouch;
      const team = this.full ? this.teamAttacking(side) : this.offense;
      const p = lt && lt.team === team ? lt.player : null;
      if (b.shot) b.shot.done = true;
      this.awardBasket({ shooter: p, team, side, kind: 'tip', value: 2, t: this.time, foul: null }, false);
    }
  }

  awardBasket(s, goaltend) {
    const b = this.ball, now = this.time;
    s.done = true;
    const team = s.team;
    // not cleared beyond the arc after a change of possession: no basket
    if (this.rules && this.mustClear === team && s.kind !== 'ft') {
      this.events.emit('notCleared', { team, t: now });
      if (s.shooter) this.stats.add(s.shooter, 'fga');
      this.turnover(team, 'notCleared', s.shooter);
      return;
    }
    const value = s.kind === 'tip' ? 2 : s.value;
    this.teams[team].score += value;
    if (s.shooter) {
      this.stats.add(s.shooter, 'pts', value);
      if (s.kind === 'ft') this.stats.add(s.shooter, 'ftm');
      else if (s.kind !== 'tip') {
        this.stats.add(s.shooter, 'fga'); this.stats.add(s.shooter, 'fgm');
        if (value === 3) { this.stats.add(s.shooter, 'tpa'); this.stats.add(s.shooter, 'tpm'); }
      }
    }
    // assist: the last pass to the scorer within 4 seconds of the shot
    let assist = null;
    const lp = this.lastPass;
    if (lp && s.shooter && lp.receiver === s.shooter && now - lp.t < 6 && (s.t - lp.t) < 4.5) { assist = lp.passer; this.stats.add(assist, 'ast'); }
    this.lastPass = null;
    this.events.emit('basket', { team, value, player: s.shooter, assist, kind: s.kind, goaltend, grade: s.grade, t: now, pos: b.pos.clone(), andOne: !!s.foul });
    if (s.shooter) s.shooter.celebrateUntil = now + 1.4;
    b.shot = null;
    // and one
    if (s.foul) { this.setPhase('scored'); this.next = { type: 'ft', shooter: s.shooter, n: 1 }; return; }
    this.setPhase('scored');
    if (this.full) {
      // the other team takes it out under this basket
      const sp = this.baselineSpot(s.side ?? this.side(team), b.pos.z);
      this.next = this.inboundNext(1 - team, sp, { inbounder: this.pickInbounder(1 - team, sp.x, sp.z) });
      return;
    }
    this.next = { type: 'check', team: 1 - team };
    if (this.teams[team].score >= this.target || this.overtime) this.next = { type: 'over' };
  }

  // a shot that didn't go in (it hit the floor, or somebody got the rebound)
  resolveMiss(s) {
    if (s.done) return;
    s.done = true;
    if (s.kind === 'ft') { if (this.ft && this.phase === 'ft') this.ft.missed = true; this.events.emit('miss', { player: s.shooter, ft: true, t: this.time }); return; }
    if (s.kind !== 'blocked' && s.kind !== 'tip') {
      this.stats.add(s.shooter, 'fga');
      if (s.value === 3) this.stats.add(s.shooter, 'tpa');
    }
    this.events.emit('miss', { player: s.shooter, airball: !s.rim && !s.board, t: this.time });
    if (s.foul && this.phase === 'live') this.whistle('shootingFoul', { type: 'ft', shooter: s.shooter, n: s.value }, { foul: true });
    else if (!s.rim && !s.board && this.shotClock <= 0 && this.phase === 'live') this.turnover(s.team, 'shotClock');
  }

  // ------------------------------------------------------------------ rules
  rulesLive(dt) {
    const b = this.ball, now = this.time;
    if (!this.rules) return;
    // clearing the ball beyond the arc
    if (this.mustClear != null && b.owner && b.owner.team === this.mustClear && isThree(b.owner.pos.x, b.owner.pos.z)) {
      this.mustClear = null;
      this.events.emit('cleared', { team: b.owner.team, t: now });
    }
    const full = this.full;
    // out of bounds: the ball on the floor outside the lines, or the carrier stepping out
    if (b.state === 'free' && b.pos.y < BALL_R + 0.03 && !inBounds(b.pos.x, b.pos.z, -BALL_R * 0.5, full)) {
      const lt = b.lastTouch;
      if (b.shot && !b.shot.done) this.resolveMiss(b.shot);
      if (this.phase === 'live') { this.turnover(lt ? lt.team : 1 - this.offense, 'out', null, full ? this.outSpot(b.pos.x, b.pos.z) : null); return; }
    }
    if (b.state === 'free' && ((full ? Math.abs(b.pos.x) > 15.5 : b.pos.x > 15.5 || b.pos.x < -2) || Math.abs(b.pos.z) > 9.5)) {
      const lt = b.lastTouch;
      this.turnover(lt ? lt.team : 1 - this.offense, 'out', null, full ? this.outSpot(b.pos.x, b.pos.z) : null);
      return;
    }
    const o = b.owner;
    if (o && !o.airborne && !inBounds(o.pos.x, o.pos.z, -0.12, full)) { this.turnover(o.team, 'out', o, full ? this.outSpot(o.pos.x, o.pos.z) : null); return; }
    // the throw-in is in the air: the clocks start when someone touches it
    if (this.inbPending || this.tipLoose) return;
    // half court: 8 seconds to cross it, and no going back once over
    if (full && o && o.team === this.offense && !o.airborne) {
      const lx = this.localX(o.team, o.pos.x);
      if (!this.frontcourt) {
        if (lx > 0.12) { this.frontcourt = true; this.events.emit('frontcourt', { team: o.team, t: now }); }
        else {
          this.backcourtT += dt;
          if (this.backcourtT >= FULL.BACKCOURT) { this.events.emit('eightSeconds', { team: o.team, t: now }); this.turnover(o.team, 'eightSec', o); return; }
        }
      } else if (lx < -0.12) { this.events.emit('backcourt', { team: o.team, t: now }); this.turnover(o.team, 'backcourt', o); return; }
    }
    // shot clock
    if (this.shotClockOn) {
      // the shot clock waits while a shot is up, and after it hits the rim until someone has the ball
      const shotPending = b.shot && (!b.shot.done || b.shot.rim || b.shot.board);
      if (!shotPending) this.shotClock -= dt;
      if (this.shotClock <= 0 && !shotPending) {
        this.shotClock = 0;
        this.events.emit('shotClockViolation', { team: this.offense, t: now });
        this.turnover(this.offense, 'shotClock', o);
        return;
      }
    }
    // game clock
    if (!this.overtime) {
      this.clock -= dt;
      if (this.clock <= 0) {
        this.clock = 0;
        if (b.shot && !b.shot.done) return; // a shot in the air at the buzzer still counts
        this.endOfRegulation();
      }
    }
  }

  endOfRegulation() {
    if (this.full) { this.endOfPeriod(); return; }
    if (this.phase === 'over') return;
    this.events.emit('buzzer', { t: this.time });
    const [a, c] = this.scoreline;
    if (a === c) {
      this.overtime = true;
      this.events.emit('overtime', { t: this.time });
      this.whistle('overtime', { type: 'check', team: this.rng.next() < 0.5 ? 0 : 1 });
      return;
    }
    this.finish();
  }

  finish() {
    const [a, c] = this.scoreline;
    this.winner = a > c ? 0 : c > a ? 1 : -1;
    this.setPhase('over');
    this.ball.shot = null;
    for (const p of this.players) { p.action = null; p.stance = false; p.handsUp = false; }
    for (const p of this.players) if (p.team === this.winner) p.celebrateUntil = this.time + 6;
    this.events.emit('final', { winner: this.winner, score: this.scoreline, t: this.time });
  }

  // ------------------------------------------------------------------ phases
  updatePhase(dt) {
    const ph = this.phase, t = this.phaseT;
    if (ph === 'intro') return;
    if (ph === 'tip') { this.updateTip(dt); return; }
    if (ph === 'inbound') { this.updateInbound(dt); return; }
    if (ph === 'break') {
      const dur = this.period === 2 ? 4 : 2.6;
      if (t > dur || (this.skipRequested && t > 0.8)) this.afterDead();
      return;
    }
    if (ph === 'check') {
      // the checker can start play with the ball; otherwise it starts by itself
      const ready = this.checker && this.checker.isHuman ? t > 0.6 && this.checkerReady : false;
      if (t > (this.checker && this.checker.isHuman ? 6 : 1.4) || ready) { this.checkerReady = false; this.goLive(); }
      return;
    }
    if (ph === 'scored' || ph === 'dead') {
      const dur = ph === 'scored' ? 1.9 : 1.35;
      if (t > dur || (this.skipRequested && t > 0.5)) this.afterDead();
      return;
    }
    if (ph === 'ft') this.updateFT();
    if (ph === 'live' && this.rules && !this.overtime && this.clock <= 0 && !(this.ball.shot && !this.ball.shot.done)) this.endOfRegulation();
  }

  afterDead() {
    const n = this.next;
    this.next = null;
    if (this.full) {
      if (n && n.type === 'over') { this.finish(); return; }
      if (n && n.type === 'period') { this.startPeriod(); return; }
      if (n && n.type === 'ft') { this.startFreeThrows(n.shooter, n.n); return; }
      // the period ran out during the stoppage
      if (this.rules && this.clock <= 0) { this.endOfPeriod(); return; }
      const nn = n || this.inboundNext(1 - this.offense, this.sidelineSpot(this.ball.pos.x, this.ball.pos.z));
      this.startInbound(nn.team, nn.x, nn.z, nn.kind, { inbounder: nn.inbounder });
      return;
    }
    if (!n || n.type === 'check') {
      if (this.rules && !this.overtime && this.clock <= 0) { this.endOfRegulation(); return; }
      this.startCheck(n ? n.team : 1 - this.offense);
    } else if (n.type === 'ft') this.startFreeThrows(n.shooter, n.n);
    else if (n.type === 'over') this.finish();
  }

  // ------------------------------------------------------------------ free throws
  startFreeThrows(shooter, n) {
    this.setPhase('ft');
    this.offense = shooter.team;
    this.mustClear = null;
    this.ft = { shooter, left: n, total: n, made: false, missed: false, released: false, wait: 0 };
    this.placeFT();
    this.events.emit('ftStart', { player: shooter, n, t: this.time });
  }

  placeFT() {
    const sh = this.ft.shooter;
    const s = this.side(sh.team), hx = s * HOOP.X;
    this.place(sh, s * (LINES.FT_X - 0.32), 0);
    // lane spots: up to three defenders and two shooters' teammates, the rest behind the arc
    const lane = [1.1, 2.0, 2.9];
    const def = this.teams[1 - sh.team].players, off = this.teams[sh.team].players.filter((p) => p !== sh);
    const outside = [[-7.6, 0.6], [-6.4, -4.4], [-6.4, 4.4], [-8.4, -2.2], [-8.4, 2.2]];
    let o = 0;
    const back = (p) => { const [lx, lz] = outside[o++ % outside.length]; const x = hx + s * lx, z = s * lz; this.place(p, x, z, yawOf(hx - x, -z)); };
    def.forEach((p, i) => {
      if (i >= 3) { back(p); return; }
      const x = hx - s * lane[i === 2 ? 1 : 0], z = (i % 2 ? -1 : 1) * (LINES.KEY_HW + 0.35);
      this.place(p, x, z, yawOf(hx - x, -z * 0.3));
    });
    off.forEach((p, i) => {
      if (i >= 2) { back(p); return; }
      const x = hx - s * lane[1 + (i === 1 ? 1 : 0)], z = (i % 2 ? 1 : -1) * (LINES.KEY_HW + 0.35);
      this.place(p, x, z, yawOf(hx - x, -z * 0.3));
    });
    const b = this.ball;
    b.shot = null; b.pass = null;
    b.owner = sh;
    b.state = 'held';
    b.pos.set(sh.pos.x + s * 0.36, BODY.HOLD_Y, sh.pos.z);
    b.prevPos.copy(b.pos);
    startHolding(this, sh);
    this.ft.released = false; this.ft.made = false; this.ft.missed = false; this.ft.wait = 0;
    this.events.emit('snap', { t: this.time });
  }

  updateFT() {
    const f = this.ft, b = this.ball;
    if (!f) return;
    const sh = f.shooter;
    if (!f.released) {
      if (b.shot && b.shot.shooter === sh && b.state === 'free') {
        f.released = true;
        f.left--;
        this.stats.add(sh, 'fta');
        if (f.left <= 0) {
          // the last one is live: everyone crashes the boards
          this.setPhase('live');
          this.ftLast = { shooter: sh };
          this.shotClock = this.shotLen;
          this.frontcourt = true;
          this.backcourtT = 0;
          this.ball.shot.kind = 'ft';
          this.ball.shot.value = 1;
          this.mustClear = null;
          this.ftLastShot = b.shot;
        }
      }
      return;
    }
    f.wait += 1 / 120;
    if (f.made || f.missed || f.wait > 2.4) {
      if (b.shot) b.shot.done = true;
      f.missed = !f.made;
      if (f.wait > 0.9) this.placeFT();
    }
  }
}
