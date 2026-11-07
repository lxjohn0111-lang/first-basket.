// Player actions shared by the human and the AI: shots (jump shot, three, layup, dunk,
// free throw), passes (chest and bounce), steals, jumps/blocks, pump fakes and
// crossovers. Each action has an anticipation, an explicit release/contact moment and
// a follow-through; the ball leaves the hands exactly at the release tick, from where
// the hands are holding it.
import { V3, clamp, yawOf, angleDiff, pointSegDistXZ } from './vec.js';
import { HOOP, RULES, BALL_R, G } from './constants.js';
import { startJump, BODY } from './player.js';
import { startDribble, toWorld, toLocal, HOLD, HOLD_FP } from './dribble.js';
import { shotKind, pressureOn, sweetSpot, launchVelocity, FILL_TIME, shotValue, jumpStartFor } from './shooting.js';

export function hasBall(m, p) { return m.ball.owner === p && (m.ball.state === 'held' || m.ball.state === 'dribble'); }

// can start a new ball action now
export function canAct(m, p) {
  const a = p.action;
  if (a && !(a.type === 'jump' && !hasBall(m, p))) return false;
  return m.time >= p.offBalanceUntil || hasBall(m, p);
}

// ------------------------------------------------------------------ holding
// ask for the dribble to be picked up as soon as the ball is back in reach
function gather(m, p) {
  if (m.ball.state === 'dribble' && m.ball.owner === p) p.gatherPending = true;
}

export function startHolding(m, p) {
  const b = m.ball;
  b.state = 'held';
  b.owner = p;
  p.dribble = null;
  p.gatherPending = false;
  p.holdLocal = toLocal(p, b.pos.x, b.pos.y - p.pos.y, b.pos.z);
}

// where the hands want the ball now (player frame, height above the player's feet)
function holdTarget(m, p, out) {
  const a = p.action;
  const L = (A, B, k) => { k = clamp(k, 0, 1); out[0] = A[0] + (B[0] - A[0]) * k; out[1] = A[1] + (B[1] - A[1]) * k; out[2] = A[2] + (B[2] - A[2]) * k; return out; };
  if (!a) return L(HOLD.chest, HOLD.chest, 0);
  if (a.type === 'shot') {
    if (a.tg == null) return L(HOLD.gather, HOLD.gather, 0);
    const k = (a.t - a.tg) / (a.kind === 'ft' ? 0.35 : 0.24);
    const H = p.isHuman ? { ...HOLD, ...HOLD_FP } : HOLD;
    if (a.kind === 'layup') return L(HOLD.gather, H.layup, (a.t - a.tg) / 0.42);
    if (a.kind === 'dunk') {
      // carried up toward the rim
      const sd = m.side(p.team);
      const loc = toLocal(p, sd * (HOOP.X - 0.05), 0, HOOP.Z);
      const up = [clamp(loc[0], -0.25, 0.25), clamp(loc[1], 0.15, 0.55), BODY.REACH + 0.18];
      return L(HOLD.gather, up, (a.t - a.tg) / 0.3);
    }
    return L(HOLD.gather, a.kind === 'ft' ? H.ft : H.set, k);
  }
  if (a.type === 'pass') {
    if (a.tg == null) return L(HOLD.chest, HOLD.chest, 0);
    return L(HOLD.chest, a.kind === 'bounce' ? [0, 0.55, 1.0] : HOLD.pass, (a.t - a.tg) / a.push);
  }
  if (a.type === 'fake') return L(HOLD.chest, HOLD.set, Math.sin(clamp(a.t / 0.42, 0, 1) * Math.PI) * 0.85);
  return L(HOLD.chest, HOLD.chest, 0);
}

const _ht = [0, 0, 0], _bw = new V3();
// keep the ball in the hands (kinematic) for one step
export function updateHeld(m, p, dt) {
  const b = m.ball;
  holdTarget(m, p, _ht);
  const hl = p.holdLocal || (p.holdLocal = [..._ht]);
  const k = 1 - Math.exp(-dt * 26);
  hl[0] += (_ht[0] - hl[0]) * k; hl[1] += (_ht[1] - hl[1]) * k; hl[2] += (_ht[2] - hl[2]) * k;
  toWorld(p, hl, _bw);
  b.setKinematic(_bw.x, _bw.y + p.pos.y, _bw.z, dt);
}

// ------------------------------------------------------------------ shots
export function startShot(m, p, o = {}) {
  if (!hasBall(m, p) || !canAct(m, p)) return false;
  const kind = o.kind || shotKind(m, p);
  const pressure = pressureOn(m, p);
  const moving = clamp(p.speed / 6, 0, 1);
  const spot = sweetSpot(m, p, kind, pressure, kind === 'layup' || kind === 'dunk' ? 0 : moving);
  p.action = {
    type: 'shot', kind, t: 0, t0: m.time, tg: m.ball.state === 'held' ? 0 : null,
    charging: !!o.charging, charge: 0, relCharge: null, releaseCharge: o.releaseCharge ?? spot.c,
    aimYaw: o.aimYaw ?? yawOf(m.side(p.team) * HOOP.X - p.pos.x, HOOP.Z - p.pos.z),
    spot, pressure, moving, value: shotValue(m, p, kind), released: false, jumped: false,
    lockMove: kind === 'layup' || kind === 'dunk' ? undefined : 3,
    from: { x: p.pos.x, z: p.pos.z },
  };
  gather(m, p);
  m.events.emit('shotStart', { player: p, kind, t: m.time });
  return true;
}

export function releaseCharge(a, now) {
  if (a.type !== 'shot' || !a.charging) return;
  a.charging = false;
  a.relCharge = clamp((now - a.t0) / FILL_TIME[a.kind], 0, 1);
}

function updateShot(m, p, a, dt) {
  const b = m.ball, now = m.time;
  a.t += dt;
  if (!a.released) {
    if (b.owner !== p) { p.action = null; return; } // stripped or blocked out of the hands
    a.charge = clamp((now - a.t0) / FILL_TIME[a.kind], 0, 1);
    if (a.tg == null) {
      if (b.state === 'held') a.tg = a.t;
      else if (a.t > 0.45) { startHolding(m, p); a.tg = a.t; }
      else return;
    }
    const since = a.t - a.tg;
    const hx = m.side(p.team) * HOOP.X - p.pos.x, hz = HOOP.Z - p.pos.z, hd = Math.hypot(hx, hz) || 1;
    // an AI shooter keeps squared up to the rim (the human aims with the view)
    if (a.ai) a.aimYaw = yawOf(hx, hz);
    if (!a.jumped) {
      if (a.kind === 'jumper' || a.kind === 'three') {
        const h = p.jumpHeight() * 0.62;
        if (since > 0.05 && a.t >= jumpStartFor(a.spot.c, a.kind, h)) { startJump(p, now, h); a.jumped = true; }
      } else if (a.kind === 'layup') {
        // a gather step toward the rim, then up off one foot
        p.desired.set((hx / hd) * 4, 0, (hz / hd) * 4);
        p.faceYaw = yawOf(hx, hz);
        if (since > 0.2) {
          startJump(p, now, p.jumpHeight() * 0.8);
          const v = Math.min(3, Math.max(0, hd - 0.7) / 0.55);
          p.vel.set((hx / hd) * v, 0, (hz / hd) * v);
          a.jumped = true;
        }
      } else if (a.kind === 'dunk') {
        p.faceYaw = yawOf(hx, hz);
        if (since > 0.06) {
          // jump high enough to get the ball over the rim, travelling to just in front of it
          const need = HOOP.Y + 0.3 - BODY.REACH;
          startJump(p, now, Math.max(need, p.jumpHeight()));
          const tUp = Math.sqrt((2 * Math.max(need, 0.5)) / G);
          const reach = Math.max(0, hd - 0.55);
          const v = Math.min(5.5, reach / tUp);
          p.vel.set((hx / hd) * v, 0, (hz / hd) * v);
          a.jumped = true;
          a.apexT = a.t + tUp;
        }
      } else a.jumped = true; // free throw: a set shot
    }
    // when the shot goes
    let go = false;
    if (a.kind === 'dunk') go = a.jumped && a.t >= (a.apexT ?? 9) - 0.04;
    else if (p.isHuman && !a.ai) {
      const minRise = a.kind === 'ft' ? 0.3 : a.kind === 'layup' ? 0.32 : 0.16;
      if (a.charge >= 1 && a.charging) { a.charging = false; a.relCharge = 1; }
      go = !a.charging && since >= minRise;
      // still holding as the feet come back down: it goes now, late
      if (a.jumped && a.kind !== 'ft' && p.vy < 0 && p.pos.y < 0.1 && since > 0.25) { if (a.charging) { a.charging = false; a.relCharge = a.charge; } go = true; }
    } else {
      const minRise = a.kind === 'ft' ? 0.3 : a.kind === 'layup' ? 0.32 : 0.16;
      go = since >= minRise && a.charge >= a.releaseCharge;
      if (a.jumped && a.kind !== 'ft' && p.vy < 0 && p.pos.y < 0.1 && since > 0.25) go = true;
      if (go) a.relCharge = a.charge;
    }
    if (go) releaseShot(m, p, a);
    return;
  }
  // follow-through until the feet are back down
  if (a.t - a.rt > 0.45 && !p.airborne) p.action = null;
}

function releaseShot(m, p, a) {
  const b = m.ball, now = m.time;
  a.released = true;
  a.rt = a.t;
  p.shotSide = m.side(p.team);
  const charge = a.relCharge ?? a.charge;
  const dx = m.side(p.team) * HOOP.X - b.pos.x, dz = HOOP.Z - b.pos.z;
  if (a.kind === 'dunk' && Math.hypot(dx, dz) < 0.5 && b.pos.y > HOOP.Y + 0.08) {
    // slam: straight down through the ring
    b.release(dx * 4, -5.5, dz * 4, 0, 0, 0);
    a.gradeInfo = { tier: 'perfect', label: 'DUNK' };
  } else if (a.kind === 'dunk') {
    // couldn't get over the rim (a body in the way): it becomes a soft finish
    const r = launchVelocity(m, p, { kind: 'layup', charge: 0.5, spot: { c: 0.5, w: 0.2 }, pressure: a.pressure, moving: 0, aimYaw: yawOf(dx, dz), pos: b.pos });
    b.release(r.vx, r.vy, r.vz, 0, 0, 0);
    a.kind = 'layup';
    a.gradeInfo = r.grade;
  } else {
    const r = launchVelocity(m, p, { kind: a.kind, charge, spot: a.spot, pressure: a.pressure, moving: a.moving, aimYaw: a.aimYaw, pos: b.pos });
    // backspin about the axis across the flight
    const sx = Math.cos(r.yaw), sz = -Math.sin(r.yaw);
    b.release(r.vx, r.vy, r.vz, sx * r.backspin, 0, sz * r.backspin);
    a.gradeInfo = r.grade;
  }
  b.ignore = p; b.ignoreUntil = now + 0.35;
  p.noCatchUntil = now + RULES.SHOT_LOCK;
  b.lastTouch = { player: p, team: p.team, t: now };
  b.shot = { shooter: p, team: p.team, side: m.side(p.team), kind: a.kind, value: a.value, t: now, rim: false, board: false, blocked: false, from: { ...a.from }, foul: null, grade: a.gradeInfo, charge, spot: a.spot };
  b.pass = null;
  m.events.emit('shot', { player: p, kind: a.kind, value: a.value, grade: a.gradeInfo, pressure: a.pressure, t: now });
}

// ------------------------------------------------------------------ passes
export function laneBlocked(m, p, tx, tz) {
  let worst = 0, who = null;
  const L = Math.hypot(tx - p.pos.x, tz - p.pos.z);
  for (const q of m.players) {
    if (q.team === p.team) continue;
    const r = pointSegDistXZ(q.pos.x, q.pos.z, p.pos.x, p.pos.z, tx, tz);
    const along = r.t * L;
    // (a defender right on the passer can't get to it; one fronting the receiver can)
    if (along < 0.35 || along > L + 0.3) continue;
    const risk = clamp((1.15 - r.d) / 0.9, 0, 1);
    if (risk > worst) { worst = risk; who = q; }
  }
  return { risk: worst, who };
}

export function startPass(m, p, target, o = {}) {
  if (!target || !hasBall(m, p) || !canAct(m, p)) return false;
  const lane = laneBlocked(m, p, target.pos.x, target.pos.z);
  const d = Math.hypot(target.pos.x - p.pos.x, target.pos.z - p.pos.z);
  const kind = o.kind || (lane.risk > 0.35 && d > 2.5 ? 'bounce' : d > 9 ? 'lob' : 'chest');
  p.action = { type: 'pass', target, kind, t: 0, tg: m.ball.state === 'held' ? 0 : null, push: kind === 'bounce' ? 0.13 : 0.11, released: false, lockMove: 2.5 };
  p.faceYaw = yawOf(target.pos.x - p.pos.x, target.pos.z - p.pos.z);
  gather(m, p);
  return true;
}

function updatePass(m, p, a, dt) {
  const b = m.ball;
  a.t += dt;
  if (!a.released) {
    if (b.owner !== p) { p.action = null; return; }
    if (a.tg == null) {
      if (b.state === 'held') a.tg = a.t;
      else if (a.t > 0.4) { startHolding(m, p); a.tg = a.t; }
      else return;
    }
    if (a.t - a.tg >= a.push) releasePass(m, p, a);
    return;
  }
  if (a.t - a.rt > 0.3) p.action = null;
}

function releasePass(m, p, a) {
  const b = m.ball, now = m.time, rng = m.rng;
  const q = a.target;
  a.released = true; a.rt = a.t;
  const pass = p.attrs.passing / 99;
  const P = b.pos;
  // lead the receiver: where they will be when the ball arrives
  let tx = q.pos.x, tz = q.pos.z;
  // a lob goes slower and higher (over the defence), dropping into the hands
  const vh = a.kind === 'bounce' ? 7.6 + pass * 1.5 : a.kind === 'lob' ? 7.6 + pass * 1.2 : 9.2 + pass * 2.4;
  let T = 0;
  for (let i = 0; i < 3; i++) {
    const d = Math.hypot(tx - P.x, tz - P.z);
    T = d / vh;
    tx = q.pos.x + q.vel.x * T * 0.85; tz = q.pos.z + q.vel.z * T * 0.85;
  }
  // the weaker the passer and the closer the defence, the looser the pass
  const pres = pressureOn(m, p);
  const err = (0.012 + 0.04 * (1 - pass) + 0.03 * pres) * (p.isHuman ? m.assist.passErr : 1);
  const dx = tx - P.x, dz = tz - P.z;
  const d = Math.hypot(dx, dz) || 1;
  const yaw = yawOf(dx, dz) + rng.gauss() * err;
  const ux = Math.sin(yaw), uz = Math.cos(yaw);
  let vx, vy, vz;
  if (a.kind === 'bounce') {
    const d1 = d * 0.6;
    const T1 = d1 / vh;
    vy = (BALL_R - P.y + 0.5 * G * T1 * T1) / T1;
    vx = ux * vh; vz = uz * vh;
  } else {
    const ty = q.pos.y + (a.kind === 'lob' ? 1.55 : 1.25);
    // air drag slows a long pass: a touch more speed so it still gets there
    const Tf = d / vh;
    const drag = 1 + 0.012 * vh * Tf * 0.5;
    vy = (ty - P.y + 0.5 * G * Tf * Tf) / Tf;
    vx = ux * vh * drag; vz = uz * vh * drag;
  }
  vx *= 1 + rng.gauss() * err * 0.5; vz *= 1 + rng.gauss() * err * 0.5;
  b.release(vx, vy, vz, 0, 0, 0);
  b.ignore = p; b.ignoreUntil = now + 0.2;
  p.noCatchUntil = now + RULES.PASS_LOCK;
  b.lastTouch = { player: p, team: p.team, t: now };
  b.pass = { passer: p, target: q, team: p.team, t: now, kind: a.kind, tried: new Set() };
  b.shot = null;
  m.events.emit('pass', { player: p, target: q, kind: a.kind, t: now });
}

// ------------------------------------------------------------------ steals
export function startSteal(m, p) {
  const now = m.time;
  if (now < p.stealReadyAt || p.action || hasBall(m, p)) return false;
  const b = m.ball;
  let target = null;
  if (b.owner && b.owner.team !== p.team && b.owner.pos.distXZ(p.pos) < RULES.STEAL_RANGE + 0.3) target = b.owner;
  const dir = target ? yawOf(b.pos.x - p.pos.x, b.pos.z - p.pos.z) : p.yaw;
  p.action = { type: 'steal', t: 0, target, dir, resolved: false, lockMove: 2.2, hand: angleDiff(p.yaw, dir) > 0 ? 'L' : 'R' };
  p.stealReadyAt = now + RULES.STEAL_COOLDOWN;
  m.events.emit('stealTry', { player: p, t: now });
  return true;
}

function updateSteal(m, p, a, dt) {
  a.t += dt;
  if (!a.resolved && a.t >= 0.11) { a.resolved = true; resolveSteal(m, p, a); }
  if (a.t >= 0.34) p.action = null;
}

function resolveSteal(m, p, a) {
  const b = m.ball, now = m.time, rng = m.rng;
  const fx = Math.sin(a.dir), fz = Math.cos(a.dir);
  // the reaching hand
  const hx = p.pos.x + fx * 0.72, hz = p.pos.z + fz * 0.72;
  const o = b.owner;
  if (o && o.team !== p.team && (b.state === 'dribble' || b.state === 'held')) {
    const dBall = Math.hypot(b.pos.x - hx, b.pos.z - hz);
    if (dBall > 0.95 || b.pos.y > 2.2) { whiff(m, p, 0.32); return; }
    // reaching across (or through) the dribbler's body: shielded, and a likely foul
    const r = pointSegDistXZ(o.pos.x, o.pos.z, p.pos.x, p.pos.z, b.pos.x, b.pos.z);
    const shielded = r.t > 0.05 && r.t < 0.95 && r.d < 0.24;
    let exposure;
    if (b.state === 'dribble') exposure = b.pos.y < 0.7 ? 1 : 0.55;
    else exposure = o.action && o.action.type === 'shot' && o.action.tg == null ? 0.7 : 0.22;
    const skill = (p.attrs.defense - o.attrs.handling) / 99;
    let chance = clamp(0.16 + 0.42 * exposure + 0.35 * skill, 0.04, 0.82) * clamp(1.25 - dBall * 0.5, 0.4, 1);
    if (shielded) chance *= 0.22;
    if (p.isHuman) chance *= m.assist.steal;
    else if (o.isHuman) chance *= m.assist.stealVsHuman;
    if (rng.next() < chance) {
      // poked loose toward the stealer's side
      const vx = (hx - o.pos.x) * 1.4 + (p.pos.x - o.pos.x) * 0.6 + rng.gauss() * 0.5;
      const vz = (hz - o.pos.z) * 1.4 + (p.pos.z - o.pos.z) * 0.6 + rng.gauss() * 0.5;
      if (o.action && (o.action.type === 'shot' || o.action.type === 'pass') && !o.action.released) o.action = null;
      o.dribble = null;
      b.release(vx, 0.6, vz);
      b.lastTouch = { player: p, team: p.team, t: now };
      b.ignore = o; b.ignoreUntil = now + 0.3;
      o.noCatchUntil = now + 0.35;
      m.pendingSteal = { player: p, victim: o, t: now };
      m.events.emit('poke', { player: p, victim: o, t: now });
      return;
    }
    const foulP = shielded ? (p.isHuman ? 0.4 : 0.5) : 0.07;
    if (rng.next() < foulP * (p.isHuman ? 1 : m.assist.aiFoul)) { m.foul(p, o, 'reach'); return; }
    whiff(m, p, 0.42);
    return;
  }
  // a pass in flight within reach of the swipe
  if (b.state === 'free' && b.pass && b.pass.team !== p.team) {
    const d = Math.hypot(b.pos.x - hx, b.pos.z - hz);
    if (d < 1.1 && b.pos.y < 2.3) {
      if (rng.next() < 0.75) { m.gainBall(p, 'interception'); return; }
      b.vel.scale(0.3); b.vel.y = 1; b.pass = null; b.lastTouch = { player: p, team: p.team, t: now };
      m.events.emit('deflect', { player: p, t: now });
      return;
    }
  }
  whiff(m, p, 0.25);
}

function whiff(m, p, t) {
  p.offBalanceUntil = m.time + t;
  m.events.emit('stealMiss', { player: p, t: m.time });
}

// ------------------------------------------------------------------ jumps and blocks
export function startJumpAction(m, p) {
  if (p.airborne || p.action || hasBall(m, p)) return false;
  if (!startJump(p, m.time)) return false;
  p.action = { type: 'jump', t: 0 };
  m.events.emit('jump', { player: p, t: m.time });
  return true;
}

function updateJump(m, p, a, dt) {
  a.t += dt;
  if (a.t > 0.1 && !p.airborne) p.action = null;
}

// the point between the raised hands
export function blockPoint(p, out) {
  const fx = Math.sin(p.yaw), fz = Math.cos(p.yaw);
  return out.set(p.pos.x + fx * 0.22, p.pos.y + BODY.REACH - 0.06, p.pos.z + fz * 0.22);
}

// ------------------------------------------------------------------ fakes and moves
export function startFake(m, p) {
  if (!hasBall(m, p) || !canAct(m, p)) return false;
  p.action = { type: 'fake', t: 0, tg: null, lockMove: 0.8, bit: false };
  gather(m, p);
  return true;
}

function updateFake(m, p, a, dt) {
  const b = m.ball;
  if (b.owner !== p) { p.action = null; return; }
  if (b.state !== 'held') return; // waiting for the dribble to come up
  a.t += dt;
  if (!a.bit && a.t > 0.12) {
    a.bit = true;
    m.events.emit('fake', { player: p, t: m.time });
    // defenders in front may leave their feet
    for (const q of m.players) {
      if (q.team === p.team || q.isHuman || q.airborne) continue;
      const d = q.pos.distXZ(p.pos);
      if (d > 2.4) continue;
      const bite = clamp(0.62 - q.attrs.defense / 230, 0.1, 0.6) * m.aiParams[q.team].bite;
      if (m.rng.next() < bite) {
        startJump(q, m.time, q.jumpHeight() * 0.9);
        q.action = { type: 'jump', t: 0 };
        q.beatenUntil = m.time + 0.75;
        m.events.emit('bite', { player: q, by: p, t: m.time });
      }
    }
  }
  if (a.t >= 0.42) p.action = null;
}

// crossover: switch the dribble hand with a quick lateral push
export function startCross(m, p) {
  const b = m.ball;
  if (b.owner !== p) return false;
  if (b.state === 'held' && !p.action && !p.airborne) { startDribble(p, p.hand === 'L' ? 'R' : 'L', {}); b.state = 'dribble'; return true; }
  if (b.state !== 'dribble' || !p.dribble || p.dribble.crossQueued || p.dribble.cross) return false;
  p.dribble.crossQueued = true;
  return true;
}

// called when a crossover bounce begins
export function crossBurst(m, p) {
  const d = p.dribble;
  const s = d.to === 'L' ? 1 : -1;
  const lx = Math.cos(p.yaw), lz = -Math.sin(p.yaw);
  const burst = 1.3 + p.attrs.handling * 0.008;
  p.vel.x += lx * s * burst; p.vel.z += lz * s * burst;
  m.events.emit('cross', { player: p, t: m.time });
  // the on-ball defender may bite
  for (const q of m.players) {
    if (q.team === p.team || q.isHuman) continue;
    const d2 = q.pos.distXZ(p.pos);
    if (d2 > 1.9) continue;
    const chance = clamp(0.3 + (p.attrs.handling - q.attrs.defense) / 160, 0.06, 0.62) * m.aiParams[q.team].bite;
    if (m.rng.next() < chance) { q.beatenUntil = m.time + 0.55; m.events.emit('ankles', { player: q, by: p, t: m.time }); }
  }
}

// ------------------------------------------------------------------ per step
export function updateAction(m, p, dt) {
  const a = p.action;
  if (!a) return;
  switch (a.type) {
    case 'shot': updateShot(m, p, a, dt); break;
    case 'pass': updatePass(m, p, a, dt); break;
    case 'steal': updateSteal(m, p, a, dt); break;
    case 'jump': updateJump(m, p, a, dt); break;
    case 'fake': updateFake(m, p, a, dt); break;
    case 'celebrate': a.t += dt; if (a.t > a.dur) p.action = null; break;
    default: a.t = (a.t || 0) + dt; if (a.t > 2) p.action = null;
  }
}

