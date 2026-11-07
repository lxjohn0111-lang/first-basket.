// Basketball AI for teammates and opponents. Lightweight: decisions are made a few
// times a second per player; steering runs every step. Everyone uses the same actions
// and movement limits as the human.
//
// Offence: the ball handler weighs the expected points of a shot, a drive and each
// pass (lanes and defenders included) and clears the ball after a change of
// possession; off the ball players keep spaced on real spots (wings, corners, slots,
// posts), cut to the rim when their defender loses them and call for the ball when
// open.
// Defence: man-to-man. The on-ball defender stays between the ball and the rim in a
// stance (with a reaction lag set by the difficulty), pokes at exposed dribbles,
// closes out and contests shots, and can bite on fakes and crossovers. Off the ball
// they sag toward the rim and rotate over to help on drives.
// Rebounds: the ball's real flight is predicted; defenders box out, the nearest players
// go for it and jump when it comes into reach.
// Full court: everything above runs in the attack frame of the team with the ball (its
// basket mirrored to +X). On top of it: the ball is brought up (pushed on a break, an
// outlet pass to the best ball handler after a rebound), off-ball players run the floor
// to their spots, defenders sprint back and pick up around half court, and throw-ins
// are made to a receiver who comes to meet the ball.
import { V3, clamp, yawOf, pointSegDistXZ } from './vec.js';
import { HOOP, SPOTS, isThree, distToHoop, spot, COURT, BALL_R } from './constants.js';
import { predictFree } from './ball.js';
import { BODY, startJump } from './player.js';
import { startDribble } from './dribble.js';
import { startShot, startPass, startSteal, startCross, startFake, startJumpAction, laneBlocked, hasBall, canAct } from './actions.js';
import { shotKind, pressureOn, makeChance, sweetSpot } from './shooting.js';

const SPOT_LIST = Object.entries(SPOTS);

export class AI {
  constructor(m) {
    this.m = m;
    this.marks = new Map();       // defender -> man
    this.reb = null;              // predicted rebound point { x, z, y, t }
    this.rebAt = -1;
    this.markTeam = -1;
  }

  // ------------------------------------------------------------------ assignments
  // man-to-man pairs for the team defending `offTeam`; the human defender takes the ball
  assignMarks(offTeam, handler) {
    const m = this.m;
    const off = m.teams[offTeam].players, def = m.teams[1 - offTeam].players;
    const marks = new Map();
    const freeO = new Set(off), freeD = new Set(def);
    const h = m.human;
    if (m.full) {
      // full court: matchups by position (slot), fixed for the possession
      for (const d of def) {
        const o = off.find((q) => q.slot === d.slot && freeO.has(q));
        if (o) { marks.set(d, o); freeO.delete(o); freeD.delete(d); }
      }
    } else if (h && h.team !== offTeam && handler && freeO.has(handler)) { marks.set(h, handler); freeO.delete(handler); freeD.delete(h); }
    // greedy nearest pairs (by slot order on ties)
    while (freeD.size && freeO.size) {
      let best = null, bd = 1e9;
      for (const d of freeD) for (const o of freeO) {
        const dist = d.pos.distXZ(o.pos) + Math.abs(d.slot - o.slot) * 0.01;
        if (dist < bd) { bd = dist; best = [d, o]; }
      }
      marks.set(best[0], best[1]); freeD.delete(best[0]); freeO.delete(best[1]);
    }
    for (const d of def) if (!marks.has(d)) marks.set(d, off[0]);
    this.marks = marks;
    this.markTeam = offTeam;
    for (const d of def) { const o = marks.get(d); d.ai.obs = new V3(o.pos.x, 0, o.pos.z); }
    return marks;
  }
  markOf(d) { return this.marks.get(d) || null; }
  defenderOf(o) { for (const [d, man] of this.marks) if (man === o) return d; return null; }

  // the dribble goes low when a defender is close
  pressureLow(p) {
    let low = 0;
    for (const q of this.m.players) {
      if (q.team === p.team) continue;
      const d = q.pos.distXZ(p.pos);
      if (d < 2) low = Math.max(low, clamp((2 - d) / 1.1, 0, 1));
    }
    return low;
  }

  // ------------------------------------------------------------------ per step
  update(dt) {
    const m = this.m;
    runPending(m);
    const ph = m.phase;
    if ((ph === 'live' || ph === 'inbound') && m.offense !== this.markTeam) this.assignMarks(m.offense, m.ball.owner);
    if (ph === 'live' && m.time - this.rebAt > 0.12) this.predictRebound();
    for (const p of m.players) {
      if (p.isHuman) continue;
      p.handsUp = false;
      p.stance = false;
      p.faceYaw = null;
      p.sprint = false;
      if (ph === 'ft') { this.ftShooter(p); p.desired.set(0, 0, 0); continue; }
      if (ph === 'check' || ph === 'intro' || ph === 'over' || ph === 'tip' || ph === 'break') {
        p.desired.set(0, 0, 0);
        if (ph === 'over' && m.winner !== p.team) p.faceYaw = p.yaw;
        if (ph === 'tip' && m.ball.state === 'free') this.face(p, m.ball.pos.x, m.ball.pos.z);
        continue;
      }
      if (ph === 'scored' || ph === 'dead') { this.drift(p, dt); continue; }
      if (!m.rules) { this.practice(p, dt); continue; }
      const b = m.ball;
      if (ph === 'inbound') { this.inbound(p, dt); continue; }
      if (b.owner === p) this.handler(p, dt);
      else if (p.team === m.offense) this.offBall(p, dt);
      else this.defend(p, dt);
    }
  }

  // ------------------------------------------------------------------ helpers
  moveTo(p, x, z, speed, sprint = false) {
    const dx = x - p.pos.x, dz = z - p.pos.z;
    const d = Math.hypot(dx, dz);
    if (d < 0.12) { p.desired.set(0, 0, 0); return d; }
    // arrive gently
    const s = Math.min(speed, d * 3.2);
    p.desired.set((dx / d) * s, 0, (dz / d) * s);
    p.sprint = sprint;
    return d;
  }
  face(p, x, z) { p.faceYaw = yawOf(x - p.pos.x, z - p.pos.z); }
  // keep a target on the floor; on offence once over half court, in the frontcourt
  clampTarget(v, team = -1) {
    const m = this.m;
    if (m.full) {
      v.x = clamp(v.x, -COURT.HL + 0.6, COURT.HL - 0.6);
      if (team === m.offense && m.frontcourt) { const s = m.side(team); if (s * v.x < 0.9) v.x = s * 0.9; }
    } else v.x = clamp(v.x, 0.9, COURT.HL - 0.6);
    v.z = clamp(v.z, -COURT.HW + 0.5, COURT.HW - 0.5);
    return v;
  }
  // over half court yet (for the team with the ball)
  inBackcourt(team) { return this.m.full && !this.m.frontcourt && team === this.m.offense; }

  decide(p, every) {
    const m = this.m;
    if (m.time < p.ai.think) return false;
    const react = m.aiParams[p.team].react;
    p.ai.think = m.time + every * (0.75 + m.rng.next() * 0.5) + react * 0.4;
    return true;
  }

  // ------------------------------------------------------------------ ball handler
  handler(p, dt) {
    const m = this.m, b = m.ball, ai = p.ai;
    if (p.action && p.action.type !== 'jump') return; // mid shot / pass / fake
    if (p.airborne) { p.desired.set(0, 0, 0); return; }
    const s = m.side(p.team), hx = s * HOOP.X;
    const d = distToHoop(p.pos.x, p.pos.z, s);
    // catch: a beat in triple threat first
    if (ai.caughtAt == null || ai.holder !== m.possessions) { ai.caughtAt = m.time; ai.holder = m.possessions; ai.mode = null; }
    if (this.decide(p, 0.26)) this.chooseHandlerPlay(p, d);
    if (p.action && p.action.type !== 'jump') return;
    const t = ai.target;
    let speed = p.jogSpeed(), sprint = false;
    if (ai.mode === 'drive') {
      t.set(s * (HOOP.X - 0.9), 0, HOOP.Z + clamp(p.pos.z * 0.25, -0.6, 0.6));
      sprint = true; speed = p.sprintSpeed();
      if (d < 2.4 && canAct(m, p)) { this.shoot(p); return; }
    } else if (ai.mode === 'clear') {
      sprint = this.closestDefender(p).d > 2.2; speed = sprint ? p.sprintSpeed() : p.jogSpeed();
    } else if (ai.mode === 'bring') {
      // bringing it up: push it while the defence isn't back
      sprint = this.closestDefender(p).d > 4 && p.stamina > 0.3; speed = sprint ? p.sprintSpeed() : p.jogSpeed();
    } else if (ai.mode === 'hold') {
      t.set(p.pos.x, 0, p.pos.z);
    }
    this.clampTarget(t, p.team);
    const moving = Math.hypot(t.x - p.pos.x, t.z - p.pos.z) > 0.3;
    if (moving && b.state === 'held' && !p.action) {
      // start the dribble with the hand away from the nearest defender
      const cd = this.closestDefender(p);
      let hand = 'R';
      if (cd.q) { const side = (cd.q.pos.x - p.pos.x) * Math.cos(p.yaw) - (cd.q.pos.z - p.pos.z) * Math.sin(p.yaw); hand = side > 0 ? 'R' : 'L'; }
      startDribble(p, hand, {});
      b.state = 'dribble';
    }
    if (b.state === 'held') { p.desired.set(0, 0, 0); this.face(p, hx, HOOP.Z); return; }
    this.moveTo(p, t.x, t.z, speed, sprint);
    if (ai.mode === 'drive' || ai.mode === 'clear' || ai.mode === 'bring') p.faceYaw = null; else this.face(p, hx, HOOP.Z);
    void dt;
  }

  chooseHandlerPlay(p, d) {
    const m = this.m, b = m.ball, ai = p.ai, rng = m.rng;
    const P = m.aiParams[p.team];
    const s = m.side(p.team), hx = s * HOOP.X;
    const held = m.time - ai.caughtAt;
    const back = this.inBackcourt(p.team);
    // half court, after a change of possession: back beyond the arc first
    if (m.mustClear === p.team) {
      ai.mode = 'clear';
      const ang = Math.atan2(p.pos.z - HOOP.Z, p.pos.x - HOOP.X);
      const r = 7.5;
      let x = HOOP.X + Math.cos(ang) * r, z = HOOP.Z + Math.sin(ang) * r;
      if (x > 11.5) { x = 9; z = Math.sign(p.pos.z || 1) * 5.6; }
      ai.target.set(x, 0, z);
      if (!isThree(x, z)) ai.target.set(SPOTS.top[0], 0, SPOTS.top[1]);
      return;
    }
    const kind = shotKind(m, p);
    const pr = pressureOn(m, p);
    const mv = clamp(p.speed / 6, 0, 1);
    const chance = back && d > 9 ? 0 : makeChance(p, kind, d, pr, kind === 'layup' || kind === 'dunk' ? 0 : mv) * P.shot;
    const value = kind === 'three' ? 3 : 2;
    let thr = 1.05 - (m.shotClock < 4 ? 0.6 : m.shotClock < 7 ? 0.22 : 0) - (kind === 'dunk' || kind === 'layup' ? 0.2 : kind === 'jumper' ? 0.12 : 0) + (kind === 'three' && m.shotClock > 5 ? 0.15 : 0);
    // don't fire straight off the catch unless open
    if (held < 0.2 && kind !== 'layup' && kind !== 'dunk') thr += 0.08;
    // full court: work for a better look than an early three
    if (m.full && kind === 'three' && m.shotClock > 9) thr += 0.12;
    const shotEV = chance * value;
    // the drive: an open lane to the rim (a beaten defender doesn't count)
    const lane = this.laneToRim(p);
    const driveEV = lane > 0.42 && d > 2.6 && d < (m.full ? 15 : 99) ? 1.25 * (0.55 + 0.45 * (p.attrs.speed + p.attrs.handling) / 198) * (0.55 + 0.45 * P.aggression) : 0;
    // the best pass: the receiver's shot as it will be once the defence recovers a little
    let pass = null, passEV = 0;
    for (const q of m.teams[p.team].players) {
      if (q === p || q.airborne) continue;
      const qlx = m.localX(p.team, q.pos.x);
      // never back over half court once the ball is across
      if (m.full && m.frontcourt && qlx < 0.4) continue;
      const qd = distToHoop(q.pos.x, q.pos.z, s);
      const qk = qd < 3.3 ? 'layup' : isThree(q.pos.x, q.pos.z, s) ? 'three' : 'jumper';
      const qp = Math.min(1, pressureOn(m, q) * 1.15 + 0.08);
      const qc = qd > 10 ? 0.01 : makeChance(q, qk, qd, qp) * (qk === 'three' ? 3 : 2);
      const lb = laneBlocked(m, p, q.pos.x, q.pos.z);
      const far = Math.hypot(q.pos.x - p.pos.x, q.pos.z - p.pos.z);
      let ev = qc * (1 - lb.risk * 0.9) * 0.93 * (far > 14 ? 0.7 : 1);
      // full court: an outlet to a better ball handler to bring it up
      if (back && q.attrs.handling > p.attrs.handling + 8 && lb.risk < 0.3 && far < 13 && this.closestDefender(q).d > 2) ev = Math.max(ev, 0.86 + (q.attrs.handling - p.attrs.handling) / 120);
      if (q.isHuman) ev *= q.requestUntil > m.time ? 1.6 : 1.15;
      if (ai.lastPassTo === q && m.time - ai.lastPassAt < 2) ev *= 0.85;
      if (ev > passEV) { passEV = ev; pass = q; }
    }
    // a teammate who is clearly better placed gets it
    if (pass && passEV > Math.max(shotEV * 1.08, 0.8) && held > 0.12 && canAct(m, p) && m.shotClock > 1.2) {
      startPass(m, p, pass);
      p.ai.lastPassTo = pass; p.ai.lastPassAt = m.time;
      return;
    }
    if (m.mustClear == null && (shotEV >= thr || (m.shotClock < 1.6 && !back)) && canAct(m, p)) { this.shoot(p); return; }
    if (driveEV > Math.max(shotEV, passEV) && rng.next() < 0.85) { ai.mode = 'drive'; return; }
    // full court: bring it up to a spot over half court
    if (back) {
      if (ai.mode !== 'bring' || rng.next() < 0.15) {
        ai.mode = 'bring';
        const pick = rng.pick(['top', 'slotL', 'slotR', 'wingL', 'wingR']);
        const [x, z] = spot(pick, s);
        ai.target.set(x + rng.gauss() * 0.5, 0, z + rng.gauss() * 0.5);
      }
      return;
    }
    // probe: a dribble move, a fake, or move toward a better spot
    const cd = this.closestDefender(p);
    if (b.state === 'dribble' && cd.d < 1.5 && rng.next() < 0.3 * P.aggression) startCross(m, p);
    else if (cd.d < 2 && d < 7.5 && b.state === 'held' && rng.next() < 0.12) { startFake(m, p); return; }
    if (rng.next() < 0.45 || ai.mode !== 'probe') {
      ai.mode = 'probe';
      const pick = rng.pick(['top', 'wingL', 'wingR', 'slotL', 'slotR', 'elbowL', 'elbowR']);
      const [x, z] = spot(pick, s);
      ai.target.set(x + rng.gauss() * 0.4, 0, z + rng.gauss() * 0.4);
    }
    void hx;
  }

  shoot(p) {
    const m = this.m;
    const P = m.aiParams[p.team];
    const kind = shotKind(m, p);
    const pr = pressureOn(m, p);
    const spot0 = sweetSpot(m, p, kind, pr, clamp(p.speed / 6, 0, 1));
    // release timing: steadier for good shooters, shakier with a hand in the face
    const sigma = (0.038 + 0.06 * (1 - p.attrs.shooting / 99)) * P.timing * (1 + 0.6 * pr);
    const rc = clamp(spot0.c + m.rng.gauss() * sigma, 0.15, 1);
    // a jump shot: stop and pop (layups and dunks keep the momentum)
    if (kind === 'jumper' || kind === 'three') p.desired.set(0, 0, 0);
    startShot(m, p, { kind, releaseCharge: rc });
    if (p.action) p.action.ai = true;
  }

  laneToRim(p) {
    const m = this.m;
    const hx = m.hoopX(p.team), s = m.side(p.team);
    let open = 1;
    for (const q of m.players) {
      if (q.team === p.team) continue;
      const r = pointSegDistXZ(q.pos.x, q.pos.z, p.pos.x, p.pos.z, hx - s * 0.6, HOOP.Z);
      if (r.t < 0.05 || r.t > 0.8) continue;
      const block = clamp((1.2 - r.d) / 0.9, 0, 1) * (m.time < q.beatenUntil || m.time < q.offBalanceUntil || q.airborne ? 0.2 : 1);
      open = Math.min(open, 1 - block);
    }
    return open;
  }

  closestDefender(p) {
    let best = null, bd = 1e9;
    for (const q of this.m.players) { if (q.team === p.team) continue; const d = q.pos.distXZ(p.pos); if (d < bd) { bd = d; best = q; } }
    return { q: best, d: bd };
  }

  // ------------------------------------------------------------------ off the ball
  offBall(p, dt) {
    const m = this.m, b = m.ball, ai = p.ai, rng = m.rng;
    if (p.action && p.action.type === 'shot') return;
    if (this.rebounding(p)) return;
    const s = m.side(p.team);
    // a pass on its way to me: go to where it comes down to catching height
    if (b.pass && b.pass.target === p && b.state === 'free') {
      const c = catchPoint(b, p);
      this.moveTo(p, c.x, c.z, c.far ? p.sprintSpeed() : p.jogSpeed(), c.far);
      this.face(p, b.pos.x, b.pos.z);
      return;
    }
    const handler = b.owner;
    if (this.decide(p, 0.6)) {
      const myDef = this.defenderOf(p);
      const defGap = myDef ? myDef.pos.distXZ(p.pos) : 9;
      const lost = myDef && (m.time < myDef.beatenUntil || (defGap > 2.6 && distToHoop(myDef.pos.x, myDef.pos.z, s) > distToHoop(p.pos.x, p.pos.z, s) - 0.5));
      // full court: only cut once near enough to the basket (or leaking out on a break)
      const nearEnough = !m.full || distToHoop(p.pos.x, p.pos.z, s) < 13;
      if (ai.mode !== 'cut' && lost && nearEnough && rng.next() < 0.55 && handler) {
        ai.mode = 'cut'; ai.cutUntil = m.time + 2.2;
        ai.target.set(s * (HOOP.X - 1.1), 0, clamp(p.pos.z * 0.2, -0.9, 0.9));
      } else if (ai.mode !== 'cut' || m.time > ai.cutUntil) {
        ai.mode = 'space';
        this.pickSpot(p);
      }
      // call for it when open
      const open = this.closestDefender(p).d > 2.3;
      if (open && handler && handler.team === p.team) p.requestUntil = m.time + 0.8;
    }
    const t = this.clampTarget(ai.target, p.team);
    // running the floor: sprint to a far spot
    const far = Math.hypot(t.x - p.pos.x, t.z - p.pos.z) > 6 && p.stamina > 0.25;
    const run = ai.mode === 'cut' || (m.full && far);
    this.moveTo(p, t.x, t.z, run ? p.sprintSpeed() : p.jogSpeed(), run);
    if (b.owner && !run) this.face(p, b.pos.x, b.pos.z);
    void dt;
  }

  // a free spot away from the ball and from teammates (in the team's frontcourt)
  pickSpot(p) {
    const m = this.m, b = m.ball;
    const s = m.side(p.team);
    let best = null, bs = -1e9;
    for (const [name, s0] of SPOT_LIST) {
      if ((name === 'postL' || name === 'postR') && p.archetype !== 'big' && p.archetype !== 'forward') continue;
      const x = s0[0] * s, z = s0[1] * s;
      const db = Math.hypot(x - b.pos.x, z - b.pos.z);
      let sc = -Math.abs(Math.min(db, 9) - 5.5) * 0.6 - Math.hypot(x - p.pos.x, z - p.pos.z) * 0.25;
      for (const q of m.teams[p.team].players) {
        if (q === p) continue;
        const tq = q.ai.mode === 'space' || q.ai.mode === 'cut' ? q.ai.target : q.pos;
        const dq = Math.hypot(x - tq.x, z - tq.z);
        if (dq < 3.2) sc -= (3.2 - dq) * 2.5;
      }
      const three = isThree(x, z, s);
      if (p.archetype === 'shooter' && three) sc += 0.8;
      if ((p.archetype === 'big' || p.archetype === 'forward') && !three) sc += p.archetype === 'big' ? 0.6 : 0.3;
      sc += m.rng.next() * 0.5;
      if (sc > bs) { bs = sc; best = [x, z]; }
    }
    p.ai.target.set(best[0] + m.rng.gauss() * 0.3, 0, best[1] + m.rng.gauss() * 0.3);
  }

  // ------------------------------------------------------------------ defence
  defend(p, dt) {
    const m = this.m, b = m.ball, ai = p.ai, P = m.aiParams[p.team], rng = m.rng;
    if (p.action && (p.action.type === 'steal' || p.action.type === 'jump')) { if (p.airborne) p.handsUp = true; }
    if (this.rebounding(p)) return;
    // the basket being attacked (the one this player defends)
    const s = m.side(m.offense), HX = s * HOOP.X;
    const man = this.markOf(p) || m.teams[m.offense].players[0];
    // observed position lags the real one by the reaction time (more after a fake)
    if (!ai.obs) ai.obs = new V3(man.pos.x, 0, man.pos.z);
    const tau = P.react + (m.time < p.beatenUntil ? 0.55 : 0);
    const k = 1 - Math.exp(-dt / Math.max(0.02, tau));
    ai.obs.x += (man.pos.x + man.vel.x * 0.12 - ai.obs.x) * k;
    ai.obs.z += (man.pos.z + man.vel.z * 0.12 - ai.obs.z) * k;
    const onBall = b.owner === man;
    const hx = HX - ai.obs.x, hz = HOOP.Z - ai.obs.z, hl = Math.hypot(hx, hz) || 1;
    let tx, tz;
    // help: a driver with a lane gets met by the nearest helper
    const handler = b.owner && b.owner.team !== p.team ? b.owner : null;
    let helping = false;
    if (handler && !onBall && distToHoop(handler.pos.x, handler.pos.z, s) < 4.6) {
      const hd = this.defenderOf(handler);
      const beat = !hd || distToHoop(hd.pos.x, hd.pos.z, s) > distToHoop(handler.pos.x, handler.pos.z, s) + 0.2 || m.time < hd.beatenUntil;
      if (beat && this.isNearestHelper(p, handler)) {
        helping = true;
        const gx = HX - handler.pos.x, gz = HOOP.Z - handler.pos.z, gl = Math.hypot(gx, gz) || 1;
        tx = handler.pos.x + (gx / gl) * 1.0; tz = handler.pos.z + (gz / gl) * 1.0;
      }
    }
    if (!helping) {
      if (onBall) {
        const gap = clamp(1.3 - 0.3 * P.aggression - (distToHoop(ai.obs.x, ai.obs.z, s) < 4 ? 0.15 : 0), 0.9, 1.3) + (this.inBackcourt(m.offense) ? 0.9 : 0);
        tx = ai.obs.x + (hx / hl) * gap; tz = ai.obs.z + (hz / hl) * gap;
      } else {
        // sag toward the rim; further when the ball is on the other side
        const bs = b.pos.z * man.pos.z < 0 ? 0.42 : 0.28;
        const dist = clamp(hl * bs, 1.1, 3.4);
        tx = ai.obs.x + (hx / hl) * dist; tz = ai.obs.z + (hz / hl) * dist;
        // and a step toward the ball
        tx += (b.pos.x - tx) * 0.12; tz += (b.pos.z - tz) * 0.12;
      }
    }
    // full court: get back and pick up around half court rather than chase into the backcourt
    if (m.full) {
      const pickup = onBall ? -4.5 : -0.8;
      if (s * tx < pickup) tx = s * pickup;
    }
    const far = Math.hypot(tx - p.pos.x, tz - p.pos.z);
    // behind the play: sprint back
    const behind = m.full && s * p.pos.x < s * man.pos.x - 1;
    p.stance = (onBall || helping) && far < 2.2 && !p.airborne;
    const run = far > 2.4 || (behind && far > 1);
    this.moveTo(p, tx, tz, run ? p.sprintSpeed() : p.jogSpeed() * 1.1, run);
    if (onBall || helping) this.face(p, (handler || man).pos.x, (handler || man).pos.z);
    else if (!run || far < 5) this.face(p, (b.pos.x + man.pos.x) / 2, (b.pos.z + man.pos.z) / 2);
    // contesting shots
    const target = handler || (onBall ? man : null);
    const sa = target && target.action && target.action.type === 'shot' ? target.action : null;
    if (sa && !sa.released) {
      const dd = p.pos.distXZ(target.pos);
      if (dd < 2.6) {
        p.handsUp = true;
        this.moveTo(p, target.pos.x + (HX - target.pos.x) * 0.12, target.pos.z + (HOOP.Z - target.pos.z) * 0.12, p.sprintSpeed(), true);
        // jump to block: timed with the shooter's rise, more likely near the rim
        const rim = distToHoop(target.pos.x, target.pos.z, s) < 3.0;
        if (!p.airborne && !p.action && !ai.blockTried && sa.kind !== 'ft' && (sa.jumped || rim) && dd < (rim ? 1.9 : 1.25)) {
          ai.blockTried = true;
          const chance = (rim ? 0.6 : 0.3) * P.contest * (0.45 + 0.55 * (p.attrs.vertical + p.attrs.defense) / 198);
          if (rng.next() < chance) setTimeout0(() => startJumpAction(m, p), m, p, rim ? 0.02 : 0.07);
        }
      }
    } else ai.blockTried = false;
    // steals: poke at an exposed dribble (not while retreating in the backcourt)
    if (onBall && !p.action && b.state === 'dribble' && m.time >= p.stealReadyAt && !this.inBackcourt(m.offense) && this.decide(p, 0.32)) {
      const dd = p.pos.distXZ(man.pos);
      if (dd < 1.35 && b.pos.y < 0.75) {
        const r = pointSegDistXZ(man.pos.x, man.pos.z, p.pos.x, p.pos.z, b.pos.x, b.pos.z);
        const shield = r.t > 0.05 && r.t < 0.95 && r.d < 0.25;
        // a tight handle makes them think twice
        const handle = clamp(1.25 - (man.attrs.handling - p.attrs.defense) / 80, 0.45, 1.4);
        const chance = (shield ? 0.04 : m.full ? 0.13 : 0.2) * P.aggression * (0.5 + p.attrs.defense / 99) * (m.full ? handle : 1);
        if (rng.next() < chance) startSteal(m, p);
      }
    }
    // jump into a passing lane
    if (b.pass && b.pass.team !== p.team && b.state === 'free' && !p.action) {
      const r = pointSegDistXZ(p.pos.x, p.pos.z, b.pos.x, b.pos.z, b.pos.x + b.vel.x * 0.6, b.pos.z + b.vel.z * 0.6);
      if (r.d < 1.6) this.moveTo(p, b.pos.x + b.vel.x * r.t * 0.6, b.pos.z + b.vel.z * r.t * 0.6, p.sprintSpeed(), true);
    }
  }

  isNearestHelper(p, handler) {
    const m = this.m;
    const hd = this.defenderOf(handler);
    let best = null, bd = 1e9;
    for (const q of m.teams[p.team].players) {
      if (q === hd || q.isHuman) continue;
      const d = q.pos.distXZ(handler.pos);
      if (d < bd) { bd = d; best = q; }
    }
    return best === p && bd < 4.5;
  }

  // ------------------------------------------------------------------ full court: throw-ins
  inbound(p, dt) {
    const m = this.m, f = m.inb, b = m.ball;
    if (!f) { p.desired.set(0, 0, 0); return; }
    const s = m.side(f.team);
    if (p === f.inbounder) {
      p.desired.set(0, 0, 0);
      this.face(p, 0, 0);
      if (b.owner !== p || p.action || m.phaseT < (f.kind === 'baseline' ? 1.0 : 0.7)) return;
      if (!this.decide(p, 0.22)) return;
      // the most open receiver in range (the human when they call for it)
      let best = null, bs = -1e9;
      for (const q of m.teams[p.team].players) {
        if (q === p) continue;
        const d = q.pos.distXZ(p.pos);
        if (d < 1.8 || d > 13) continue;
        const open = this.closestDefender(q).d;
        const lb = laneBlocked(m, p, q.pos.x, q.pos.z);
        let sc = Math.min(open, 4) - lb.risk * 4 - d * 0.08 + q.attrs.handling / 60;
        if (q.isHuman) sc += q.requestUntil > m.time ? 3 : 0.6;
        if (sc > bs) { bs = sc; best = q; }
      }
      if (best && (bs > 2.2 || m.phaseT > 3.2)) startPass(m, p, best);
      return;
    }
    if (p.team === f.team) {
      // a receiver comes to meet the ball; the others run to their spots
      const recv = this.inboundReceiver(f);
      if (p === recv) {
        const ix = f.x, iz = f.z;
        let tx, tz;
        if (f.kind === 'baseline') { tx = ix - Math.sign(ix) * 3.6; tz = clamp(iz * 0.5 + (iz >= 0 ? 1.4 : -1.4), -5, 5); }
        else { tx = ix - s * 1.6; tz = iz - Math.sign(iz) * 3.4; }
        this.moveTo(p, tx, tz, p.jogSpeed());
        this.face(p, ix, iz);
        p.requestUntil = m.time + 0.5;
        return;
      }
      if (this.decide(p, 0.8) || p.ai.mode !== 'space') { p.ai.mode = 'space'; this.pickSpot(p); }
      const t = this.clampTarget(p.ai.target);
      const far = Math.hypot(t.x - p.pos.x, t.z - p.pos.z) > 6;
      this.moveTo(p, t.x, t.z, far ? p.sprintSpeed() : p.jogSpeed(), far);
      return;
    }
    // defence: back to the basket and on their men
    this.defend(p, dt);
  }

  // who comes to get the throw-in: the human if they call for it, else the best handler
  inboundReceiver(f) {
    const m = this.m;
    const team = m.teams[f.team].players;
    const h = team.find((q) => q.isHuman && q !== f.inbounder);
    if (h && h.requestUntil > m.time) return h;
    if (f.recv && f.recv !== f.inbounder && !(f.recv.isHuman && f.recv.requestUntil < m.time - 3)) return f.recv;
    let best = null, bs = -1e9;
    for (const q of team) { if (q === f.inbounder || q.isHuman) continue; const sc = q.attrs.handling - q.pos.distXZ(f.inbounder.pos) * 2; if (sc > bs) { bs = sc; best = q; } }
    f.recv = best || h;
    return f.recv;
  }

  // ------------------------------------------------------------------ rebounds
  predictRebound() {
    const m = this.m, b = m.ball;
    this.rebAt = m.time;
    this.reb = null;
    if (b.state !== 'free' || b.pass) return;
    let res = null;
    predictFree(b, 2.2, 1 / 30, (t, pos, vel) => {
      // the first moment it is catchable: below 2.6 m on the way down, or rolling
      if ((vel.y < 0 && pos.y < 2.7) || pos.y < BALL_R + 0.05) { res = { x: pos.x, y: pos.y, z: pos.z, t }; return false; }
      return true;
    });
    if (!res) res = { x: b.pos.x, y: b.pos.y, z: b.pos.z, t: 0.5 };
    this.reb = res;
  }

  // chase a loose ball / rebound; returns true when doing so
  rebounding(p) {
    const m = this.m, b = m.ball;
    if (b.state !== 'free' || b.pass || !this.reb) return false;
    const s = b.shot;
    const r = this.reb;
    const team = p.team;
    // rank players of this team by distance to the rebound point: the closest two go for it
    const mine = m.teams[team].players.filter((q) => !q.isHuman || true);
    mine.sort((a, c) => Math.hypot(a.pos.x - r.x, a.pos.z - r.z) - Math.hypot(c.pos.x - r.x, c.pos.z - r.z));
    const rank = mine.indexOf(p);
    const inAir = s && !s.done && !s.rim && !s.board;
    // the basket the ball is coming off
    const end = m.full ? (s && s.side != null ? s.side : m.side(m.offense)) : 1;
    // full court: a loose ball far from both baskets is only chased by the nearest
    if (m.full && !s && rank > 0 && Math.hypot(r.x - p.pos.x, r.z - p.pos.z) > 6) return false;
    // while the shot is still going up, defenders box out their man
    if (inAir && team !== s.team) {
      const man = this.markOf(p);
      if (man) {
        const hx = end * HOOP.X - man.pos.x, hz = HOOP.Z - man.pos.z, hl = Math.hypot(hx, hz) || 1;
        const tx = man.pos.x + (hx / hl) * 0.7, tz = man.pos.z + (hz / hl) * 0.7;
        this.moveTo(p, tx, tz, p.jogSpeed());
        this.face(p, b.pos.x, b.pos.z);
        p.handsUp = p.pos.distXZ(s.shooter.pos) < 2;
        return true;
      }
    }
    if (rank > 1 && !(inAir && team === s.team && rank === 2)) {
      // the others hold a safe spot (full court: the guards get back)
      if (team === m.offense) {
        const [x, z] = spot('top', end);
        const back = m.full && (p.archetype === 'guard' || p.archetype === 'shooter') ? end * 3.5 : x + end * 1;
        this.moveTo(p, back, z, p.jogSpeed());
        this.face(p, b.pos.x, b.pos.z);
        return true;
      }
      return false;
    }
    const lead = Math.max(0, r.t - 0.15);
    const tx = r.x, tz = r.z;
    const d = this.moveTo(p, tx, tz, p.sprintSpeed(), true);
    this.face(p, b.pos.x, b.pos.z);
    // jump for a high ball coming into reach
    const hd = Math.hypot(b.pos.x - p.pos.x, b.pos.z - p.pos.z);
    if (!p.airborne && !p.action && b.vel.y < 1 && b.pos.y > BODY.REACH - 0.1 && b.pos.y < BODY.REACH + p.jumpHeight() + 0.2 && hd < 1.0 && (!s || s.rim || s.board || s.done)) {
      startJump(p, m.time, p.jumpHeight() * 0.9);
      p.action = { type: 'jump', t: 0 };
    }
    if (p.airborne) p.handsUp = true;
    void lead; void d;
    return true;
  }

  // ------------------------------------------------------------------ stoppages
  drift(p, dt) {
    const m = this.m;
    if (m.time < p.celebrateUntil) { p.desired.set(0, 0, 0); return; }
    if (m.full) { this.transition(p); return; }
    const tx = clamp(p.pos.x - 0.6, 3, 12), tz = p.pos.z * 0.9;
    this.moveTo(p, tx, tz, 1.4);
    void dt;
  }

  // full court, during a stoppage: the next inbounder goes to the ball, the team that
  // will have it heads up the floor, the other team gets back
  transition(p) {
    const m = this.m, n = m.next;
    if (!n || n.type !== 'inbound') { p.desired.set(0, 0, 0); return; }
    if (n.inbounder === p) { this.moveTo(p, n.x, n.z, p.sprintSpeed(), true); return; }
    const s = m.side(n.team);
    if (p.team === n.team) {
      const tx = clamp(p.pos.x + s * 2.5, -COURT.HL + 2, COURT.HL - 2);
      this.moveTo(p, tx, p.pos.z * 0.9, p.jogSpeed() * 0.7);
    } else {
      // between the ball and the basket they defend
      const tx = s * clamp(s * p.pos.x + 3, 2, 9), tz = p.pos.z * 0.8;
      this.moveTo(p, tx, tz, p.jogSpeed());
    }
  }

  ftShooter(p) {
    const m = this.m, f = m.ft;
    if (!f || f.shooter !== p || f.released || p.action) return;
    if (m.phaseT > 1.1 && m.ball.owner === p && m.ball.state === 'held') {
      const P = m.aiParams[p.team];
      const spot = sweetSpot(m, p, 'ft', 0, 0);
      const sigma = (0.04 + 0.06 * (1 - p.attrs.shooting / 99)) * P.timing;
      startShot(m, p, { kind: 'ft', releaseCharge: clamp(spot.c + m.rng.gauss() * sigma, 0.2, 1) });
      if (p.action) p.action.ai = true;
    }
  }

  // practice: teammates rebound and pass the ball back to the human; dummies follow the drill
  practice(p, dt) {
    const m = this.m, b = m.ball;
    if (p.drill) { p.drill(p, dt); return; }
    if (b.owner === p) {
      if (b.state === 'held' && !p.action && m.human && m.time - (p.gainT ?? 0) > 0.55 && canAct(m, p)) {
        if (hasBall(m, p)) startPass(m, p, m.human);
      }
      p.desired.set(0, 0, 0);
      if (m.human) this.face(p, m.human.pos.x, m.human.pos.z);
      return;
    }
    if (b.owner == null && b.state === 'free' && !b.pass) {
      const r = this.reb || { x: b.pos.x, z: b.pos.z };
      this.moveTo(p, r.x, r.z, p.sprintSpeed(), true);
      return;
    }
    const home = p.ai.home || (p.ai.home = new V3(HOOP.X - 1.6, 0, 0.0));
    this.moveTo(p, home.x, home.z, p.jogSpeed());
    if (m.human) this.face(p, m.human.pos.x, m.human.pos.z);
    void dt;
  }
}

// where a ball in flight comes down to a receiver's catching height (no drag, no bounce:
// a bounce pass is met on its way up from the floor)
export function catchPoint(b, p) {
  const vy = b.vel.y, y = b.pos.y, h = p.pos.y + 1.4;
  let t = 0.12;
  const disc = vy * vy + 2 * 9.81 * (y - h);
  if (disc > 0) t = Math.max(0.05, (vy + Math.sqrt(disc)) / 9.81);
  if (b.pass && b.pass.kind === 'bounce') t = Math.min(t, 0.25);
  const x = b.pos.x + b.vel.x * t, z = b.pos.z + b.vel.z * t;
  return { x, z, t, far: Math.hypot(x - p.pos.x, z - p.pos.z) > 1.5 };
}

// a short delay before an AI action (block jumps timed after the shooter rises)
function setTimeout0(fn, m, p, delay) {
  p.ai.pending = { fn, at: m.time + delay };
}
export function runPending(m) {
  for (const p of m.players) {
    const pd = p.ai.pending;
    if (pd && m.time >= pd.at) { p.ai.pending = null; pd.fn(); }
  }
}

