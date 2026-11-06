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
import { V3, clamp, yawOf, pointSegDistXZ } from './vec.js';
import { HOOP, SPOTS, isThree, distToHoop, COURT, BALL_R } from './constants.js';
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
    if (h && h.team !== offTeam && handler && freeO.has(handler)) { marks.set(h, handler); freeO.delete(handler); freeD.delete(h); }
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
    if (m.phase === 'live' && m.offense !== this.markTeam) this.assignMarks(m.offense, m.ball.owner);
    if (m.phase === 'live' && m.time - this.rebAt > 0.12) this.predictRebound();
    for (const p of m.players) {
      if (p.isHuman) continue;
      p.handsUp = false;
      p.stance = false;
      p.faceYaw = null;
      p.sprint = false;
      if (m.phase === 'ft') { this.ftShooter(p); p.desired.set(0, 0, 0); continue; }
      if (m.phase === 'check' || m.phase === 'intro' || m.phase === 'over') {
        p.desired.set(0, 0, 0);
        if (m.phase === 'over' && m.winner !== p.team) p.faceYaw = p.yaw;
        continue;
      }
      if (m.phase === 'scored' || m.phase === 'dead') { this.drift(p, dt); continue; }
      if (!m.rules) { this.practice(p, dt); continue; }
      const b = m.ball;
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
  clampTarget(v) { v.x = clamp(v.x, 0.9, COURT.HL - 0.6); v.z = clamp(v.z, -COURT.HW + 0.5, COURT.HW - 0.5); return v; }

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
    const P = m.aiParams[p.team];
    if (p.action && p.action.type !== 'jump') return; // mid shot / pass / fake
    if (p.airborne) { p.desired.set(0, 0, 0); return; }
    const d = distToHoop(p.pos.x, p.pos.z);
    // catch: a beat in triple threat first
    if (ai.caughtAt == null || ai.holder !== m.possessions) { ai.caughtAt = m.time; ai.holder = m.possessions; ai.mode = null; }
    if (this.decide(p, 0.26)) this.chooseHandlerPlay(p, d);
    const t = ai.target;
    let speed = p.jogSpeed(), sprint = false;
    if (ai.mode === 'drive') {
      t.set(HOOP.X - 0.9, 0, HOOP.Z + clamp(p.pos.z * 0.25, -0.6, 0.6));
      sprint = true; speed = p.sprintSpeed();
      if (d < 2.4 && canAct(m, p)) { this.shoot(p); return; }
    } else if (ai.mode === 'clear') {
      sprint = this.closestDefender(p).d > 2.2; speed = sprint ? p.sprintSpeed() : p.jogSpeed();
    } else if (ai.mode === 'hold') {
      t.set(p.pos.x, 0, p.pos.z);
    }
    this.clampTarget(t);
    const moving = Math.hypot(t.x - p.pos.x, t.z - p.pos.z) > 0.3;
    if (moving && b.state === 'held' && !p.action) {
      // start the dribble with the hand away from the nearest defender
      const cd = this.closestDefender(p);
      let hand = 'R';
      if (cd.q) { const side = (cd.q.pos.x - p.pos.x) * Math.cos(p.yaw) - (cd.q.pos.z - p.pos.z) * Math.sin(p.yaw); hand = side > 0 ? 'R' : 'L'; }
      startDribble(p, hand, {});
      b.state = 'dribble';
    }
    if (b.state === 'held') { p.desired.set(0, 0, 0); this.face(p, HOOP.X, HOOP.Z); return; }
    this.moveTo(p, t.x, t.z, speed, sprint);
    if (ai.mode === 'drive' || ai.mode === 'clear') p.faceYaw = null; else this.face(p, HOOP.X, HOOP.Z);
    void P; void dt;
  }

  chooseHandlerPlay(p, d) {
    const m = this.m, b = m.ball, ai = p.ai, rng = m.rng;
    const P = m.aiParams[p.team];
    const held = m.time - ai.caughtAt;
    // after a change of possession: back beyond the arc first
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
    const chance = makeChance(p, kind, d, pr, kind === 'layup' || kind === 'dunk' ? 0 : mv) * P.shot;
    const value = kind === 'three' ? 3 : 2;
    let thr = 1.05 - (m.shotClock < 4 ? 0.6 : m.shotClock < 7 ? 0.22 : 0) - (kind === 'dunk' || kind === 'layup' ? 0.2 : kind === 'jumper' ? 0.12 : 0);
    // don't fire straight off the catch unless open
    if (held < 0.2 && kind !== 'layup' && kind !== 'dunk') thr += 0.08;
    const shotEV = chance * value;
    // the drive: an open lane to the rim (a beaten defender doesn't count)
    const lane = this.laneToRim(p);
    const driveEV = lane > 0.5 && d > 2.6 ? 1.15 * (0.55 + 0.45 * (p.attrs.speed + p.attrs.handling) / 198) * (0.55 + 0.45 * P.aggression) : 0;
    // the best pass: the receiver's shot as it will be once the defence recovers a little
    let pass = null, passEV = 0;
    for (const q of m.teams[p.team].players) {
      if (q === p || q.airborne) continue;
      const qd = distToHoop(q.pos.x, q.pos.z);
      const qk = qd < 3.3 ? 'layup' : isThree(q.pos.x, q.pos.z) ? 'three' : 'jumper';
      const qp = Math.min(1, pressureOn(m, q) * 1.15 + 0.08);
      const qc = makeChance(q, qk, qd, qp) * (qk === 'three' ? 3 : 2);
      const lb = laneBlocked(m, p, q.pos.x, q.pos.z);
      let ev = qc * (1 - lb.risk * 0.9) * 0.93;
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
    if (m.mustClear == null && (shotEV >= thr || m.shotClock < 1.6) && canAct(m, p)) { this.shoot(p); return; }
    if (driveEV > Math.max(shotEV, passEV) && rng.next() < 0.85) { ai.mode = 'drive'; return; }
    // probe: a dribble move, a fake, or move toward a better spot
    const cd = this.closestDefender(p);
    if (b.state === 'dribble' && cd.d < 1.5 && rng.next() < 0.3 * P.aggression) startCross(m, p);
    else if (cd.d < 2 && d < 7.5 && b.state === 'held' && rng.next() < 0.12) { startFake(m, p); return; }
    if (rng.next() < 0.45 || ai.mode !== 'probe') {
      ai.mode = 'probe';
      const pick = rng.pick(['top', 'wingL', 'wingR', 'slotL', 'slotR', 'elbowL', 'elbowR']);
      const s = SPOTS[pick];
      ai.target.set(s[0] + rng.gauss() * 0.4, 0, s[1] + rng.gauss() * 0.4);
    }
  }

  shoot(p) {
    const m = this.m;
    const P = m.aiParams[p.team];
    const kind = shotKind(m, p);
    const spot = sweetSpot(m, p, kind, pressureOn(m, p), clamp(p.speed / 6, 0, 1));
    const sigma = (0.035 + 0.06 * (1 - p.attrs.shooting / 99)) * P.timing;
    const rc = clamp(spot.c + m.rng.gauss() * sigma, 0.15, 1);
    startShot(m, p, { kind, releaseCharge: rc });
    if (p.action) p.action.ai = true;
  }

  laneToRim(p) {
    const m = this.m;
    let open = 1;
    for (const q of m.players) {
      if (q.team === p.team) continue;
      const r = pointSegDistXZ(q.pos.x, q.pos.z, p.pos.x, p.pos.z, HOOP.X - 0.6, HOOP.Z);
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
    // a pass on its way to me: go and meet it
    if (b.pass && b.pass.target === p && b.state === 'free') {
      this.moveTo(p, b.pos.x + b.vel.x * 0.15, b.pos.z + b.vel.z * 0.15, p.jogSpeed());
      this.face(p, b.pos.x, b.pos.z);
      return;
    }
    const handler = b.owner;
    if (this.decide(p, 0.6)) {
      const myDef = this.defenderOf(p);
      const defGap = myDef ? myDef.pos.distXZ(p.pos) : 9;
      const lost = myDef && (m.time < myDef.beatenUntil || (defGap > 2.6 && distToHoop(myDef.pos.x, myDef.pos.z) > distToHoop(p.pos.x, p.pos.z) - 0.5));
      if (ai.mode !== 'cut' && lost && rng.next() < 0.55 && handler) {
        ai.mode = 'cut'; ai.cutUntil = m.time + 2.2;
        ai.target.set(HOOP.X - 1.1, 0, clamp(p.pos.z * 0.2, -0.9, 0.9));
      } else if (ai.mode !== 'cut' || m.time > ai.cutUntil) {
        ai.mode = 'space';
        this.pickSpot(p);
      }
      // call for it when open
      const open = this.closestDefender(p).d > 2.3;
      if (open && handler && handler.team === p.team) p.requestUntil = m.time + 0.8;
    }
    const t = this.clampTarget(ai.target);
    this.moveTo(p, t.x, t.z, ai.mode === 'cut' ? p.sprintSpeed() : p.jogSpeed(), ai.mode === 'cut');
    if (b.owner) this.face(p, b.pos.x, b.pos.z);
    void dt;
  }

  // a free spot away from the ball and from teammates
  pickSpot(p) {
    const m = this.m, b = m.ball;
    let best = null, bs = -1e9;
    for (const [name, s] of SPOT_LIST) {
      if ((name === 'postL' || name === 'postR') && p.archetype !== 'big') continue;
      const [x, z] = s;
      const db = Math.hypot(x - b.pos.x, z - b.pos.z);
      let sc = -Math.abs(db - 5.5) * 0.6 - Math.hypot(x - p.pos.x, z - p.pos.z) * 0.25;
      for (const q of m.teams[p.team].players) {
        if (q === p) continue;
        const tq = q.ai.mode === 'space' || q.ai.mode === 'cut' ? q.ai.target : q.pos;
        const dq = Math.hypot(x - tq.x, z - tq.z);
        if (dq < 3.2) sc -= (3.2 - dq) * 2.5;
      }
      if (p.archetype === 'shooter' && isThree(x, z)) sc += 0.8;
      if (p.archetype === 'big' && !isThree(x, z)) sc += 0.6;
      sc += m.rng.next() * 0.5;
      if (sc > bs) { bs = sc; best = s; }
    }
    p.ai.target.set(best[0] + m.rng.gauss() * 0.3, 0, best[1] + m.rng.gauss() * 0.3);
  }

  // ------------------------------------------------------------------ defence
  defend(p, dt) {
    const m = this.m, b = m.ball, ai = p.ai, P = m.aiParams[p.team], rng = m.rng;
    if (p.action && (p.action.type === 'steal' || p.action.type === 'jump')) { if (p.airborne) p.handsUp = true; }
    if (this.rebounding(p)) return;
    const man = this.markOf(p) || m.teams[m.offense].players[0];
    // observed position lags the real one by the reaction time (more after a fake)
    if (!ai.obs) ai.obs = new V3(man.pos.x, 0, man.pos.z);
    const tau = P.react + (m.time < p.beatenUntil ? 0.55 : 0);
    const k = 1 - Math.exp(-dt / Math.max(0.02, tau));
    ai.obs.x += (man.pos.x + man.vel.x * 0.12 - ai.obs.x) * k;
    ai.obs.z += (man.pos.z + man.vel.z * 0.12 - ai.obs.z) * k;
    const onBall = b.owner === man;
    const hx = HOOP.X - ai.obs.x, hz = HOOP.Z - ai.obs.z, hl = Math.hypot(hx, hz) || 1;
    let tx, tz;
    // help: a driver with a lane gets met by the nearest helper
    const handler = b.owner && b.owner.team !== p.team ? b.owner : null;
    let helping = false;
    if (handler && !onBall && distToHoop(handler.pos.x, handler.pos.z) < 4.6) {
      const hd = this.defenderOf(handler);
      const beat = !hd || distToHoop(hd.pos.x, hd.pos.z) > distToHoop(handler.pos.x, handler.pos.z) + 0.2 || m.time < hd.beatenUntil;
      if (beat && this.isNearestHelper(p, handler)) {
        helping = true;
        const gx = HOOP.X - handler.pos.x, gz = HOOP.Z - handler.pos.z, gl = Math.hypot(gx, gz) || 1;
        tx = handler.pos.x + (gx / gl) * 1.0; tz = handler.pos.z + (gz / gl) * 1.0;
      }
    }
    if (!helping) {
      if (onBall) {
        const gap = clamp(1.25 - 0.35 * P.aggression - (distToHoop(ai.obs.x, ai.obs.z) < 4 ? 0.2 : 0), 0.75, 1.3);
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
    const far = Math.hypot(tx - p.pos.x, tz - p.pos.z);
    p.stance = (onBall || helping) && far < 2.2 && !p.airborne;
    this.moveTo(p, tx, tz, far > 2.4 ? p.sprintSpeed() : p.jogSpeed() * 1.1, far > 2.4);
    if (onBall || helping) this.face(p, (handler || man).pos.x, (handler || man).pos.z);
    else this.face(p, (b.pos.x + man.pos.x) / 2, (b.pos.z + man.pos.z) / 2);
    // contesting shots
    const target = handler || (onBall ? man : null);
    const sa = target && target.action && target.action.type === 'shot' ? target.action : null;
    if (sa && !sa.released) {
      const dd = p.pos.distXZ(target.pos);
      if (dd < 2.6) {
        p.handsUp = true;
        this.moveTo(p, target.pos.x + (HOOP.X - target.pos.x) * 0.12, target.pos.z + (HOOP.Z - target.pos.z) * 0.12, p.sprintSpeed(), true);
        // jump to block: timed with the shooter's rise, more likely near the rim
        const rim = distToHoop(target.pos.x, target.pos.z) < 3.0;
        if (!p.airborne && !p.action && !ai.blockTried && sa.kind !== 'ft' && (sa.jumped || rim) && dd < (rim ? 1.9 : 1.25)) {
          ai.blockTried = true;
          const chance = (rim ? 0.6 : 0.3) * P.contest * (0.45 + 0.55 * (p.attrs.vertical + p.attrs.defense) / 198);
          if (rng.next() < chance) setTimeout0(() => startJumpAction(m, p), m, p, rim ? 0.02 : 0.07);
        }
      }
    } else ai.blockTried = false;
    // steals: poke at an exposed dribble
    if (onBall && !p.action && b.state === 'dribble' && m.time >= p.stealReadyAt && this.decide(p, 0.32)) {
      const dd = p.pos.distXZ(man.pos);
      if (dd < 1.35 && b.pos.y < 0.75) {
        const r = pointSegDistXZ(man.pos.x, man.pos.z, p.pos.x, p.pos.z, b.pos.x, b.pos.z);
        const shield = r.t > 0.05 && r.t < 0.95 && r.d < 0.25;
        const chance = (shield ? 0.04 : 0.2) * P.aggression * (0.5 + p.attrs.defense / 99);
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
    // while the shot is still going up, defenders box out their man
    if (inAir && team !== s.team) {
      const man = this.markOf(p);
      if (man) {
        const hx = HOOP.X - man.pos.x, hz = HOOP.Z - man.pos.z, hl = Math.hypot(hx, hz) || 1;
        const tx = man.pos.x + (hx / hl) * 0.7, tz = man.pos.z + (hz / hl) * 0.7;
        this.moveTo(p, tx, tz, p.jogSpeed());
        this.face(p, b.pos.x, b.pos.z);
        p.handsUp = p.pos.distXZ(s.shooter.pos) < 2;
        return true;
      }
    }
    if (rank > 1 && !(inAir && team === s.team && rank === 2)) {
      // the others hold a safe spot
      if (team === m.offense) { this.moveTo(p, SPOTS.top[0] + 1, SPOTS.top[1], p.jogSpeed()); this.face(p, b.pos.x, b.pos.z); return true; }
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
    const tx = clamp(p.pos.x - 0.6, 3, 12), tz = p.pos.z * 0.9;
    this.moveTo(p, tx, tz, 1.4);
    void dt;
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

