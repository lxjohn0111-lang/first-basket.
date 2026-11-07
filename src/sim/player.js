// Player physical model shared by the human and every AI player: the same speed,
// acceleration, jump, stamina and cooldown rules for everyone.
import { V3, clamp, turnTowards, yawOf, angleDiff } from './vec.js';
import { G } from './constants.js';

export function strideLength(speed) {
  // distance covered per full gait cycle (two steps)
  if (speed < 1.5) return 1.05 + speed * 0.18;
  if (speed < 5) return 1.32 + (speed - 1.5) * 0.42;
  return 2.79 + (speed - 5) * 0.28;
}
export function stanceFraction(stride) { return clamp(0.68 / stride, 0.18, 0.6); }

let NEXT_ID = 1;

export function makeAttrs(base = 60) {
  return { shooting: base, handling: base, speed: base, defense: base, passing: base, vertical: base };
}

// body dimensions shared with the renderer (players are about 2.0 m tall)
export const BODY = {
  EYE: 1.9,           // first-person eye height
  SHOULDER: 1.6,
  REACH: 2.36,        // standing reach with the arms up
  HOLD_Y: 1.12,       // ball held in front of the chest/hips
  RADIUS: 0.3,
};

export class Player {
  constructor(o = {}) {
    this.id = NEXT_ID++;
    this.team = o.team ?? 0;
    this.slot = o.slot ?? 0;
    this.name = o.name || 'Player';
    this.number = o.number ?? 7;
    this.isHuman = !!o.isHuman;
    this.archetype = o.archetype || 'wing';
    this.attrs = Object.assign(makeAttrs(60), o.attrs || {});
    this.look = o.look || null;

    this.pos = new V3();
    this.prevPos = new V3();
    this.vel = new V3();
    this.vy = 0;                // vertical velocity (jumps)
    this.yaw = 0;
    this.prevYaw = 0;
    this.desired = new V3();
    this.sprint = false;
    this.faceYaw = null;
    this.stance = false;        // defensive stance (lower, quicker side to side)
    this.stanceW = 0;
    this.handsUp = false;       // contesting with the arms up
    this.stamina = 1;
    this.gait = 0; this.prevGait = 0;
    this.jumpH = 0;             // height of the current jump (for poses)
    this.landT = -10;

    this.action = null;
    this.dribble = null;        // dribble cycle while this player dribbles
    this.hand = 'R';            // dribble hand
    this.noCatchUntil = 0;
    this.stealReadyAt = 0;
    this.offBalanceUntil = 0;
    this.bumpUntil = 0;
    this.celebrateUntil = 0;
    this.requestUntil = 0;
    this.requestReadyAt = 0;
    this.beatenUntil = 0;       // a defender who bit on a move reacts late for a moment
    this.ai = { state: 'idle', target: new V3(), think: 0, mark: null, spot: null, wait: 0 };
  }

  get speed() { return Math.sqrt(this.vel.x * this.vel.x + this.vel.z * this.vel.z); }
  get airborne() { return this.pos.y > 0.001 || this.vy > 0; }

  jogSpeed() { return 4.2 + (this.attrs.speed - 50) * 0.014; }
  sprintSpeed() {
    const fat = this.stamina < 0.35 ? (0.35 - this.stamina) / 0.35 : 0;
    return (6.2 + (this.attrs.speed - 50) * 0.028) * (1 - 0.14 * fat);
  }
  stanceSpeed() { return 3.5 + (this.attrs.defense - 50) * 0.012 + (this.attrs.speed - 50) * 0.006; }
  maxSpeed(sprint, withBall) {
    if (this.stance) return this.stanceSpeed();
    let s = sprint && this.stamina > 0.02 ? this.sprintSpeed() : this.jogSpeed();
    if (withBall) s *= sprint ? 0.88 + (this.attrs.handling - 50) * 0.0012 : 0.94;
    return s;
  }
  jumpHeight() { return 0.5 + (this.attrs.vertical / 99) * 0.42; }
  forwardX() { return Math.sin(this.yaw); }
  forwardZ() { return Math.cos(this.yaw); }
}

export function resetPlayerState(p) {
  p.action = null;
  p.dribble = null;
  p.vel.set(0, 0, 0);
  p.desired.set(0, 0, 0);
  p.vy = 0;
  p.pos.y = 0;
  p.stance = false;
  p.handsUp = false;
  p.offBalanceUntil = 0;
  p.celebrateUntil = 0;
  p.requestUntil = 0;
  p.beatenUntil = 0;
  p.prevPos.copy(p.pos);
  p.prevYaw = p.yaw;
}

export function startJump(p, now, height) {
  if (p.airborne) return false;
  const h = height ?? p.jumpHeight();
  p.vy = Math.sqrt(2 * G * h);
  p.jumpH = h;
  // the run-up carries into the jump; a standing jump drifts a little
  p.vel.scale(0.85);
  return true;
}

// Movement integration for one fixed step.
export function movePlayer(p, dt, now, withBall = false) {
  p.prevPos.copy(p.pos);
  p.prevYaw = p.yaw;
  p.prevGait = p.gait;

  // airborne: no control, gravity only
  if (p.airborne) {
    p.vy -= G * dt;
    p.pos.x += p.vel.x * dt; p.pos.z += p.vel.z * dt;
    p.pos.y += p.vy * dt;
    if (p.pos.y <= 0) { p.pos.y = 0; p.vy = 0; p.landT = now; p.vel.scale(0.45); }
    const fy = p.faceYaw ?? p.yaw;
    p.yaw = turnTowards(p.yaw, fy, 6 * dt);
    return;
  }

  let cap = Infinity;
  if (now < p.offBalanceUntil) cap = 1.6;
  if (now < p.bumpUntil) cap = Math.min(cap, 2.4);
  if (now - p.landT < 0.12) cap = Math.min(cap, 1.0);
  const a = p.action;
  if (a && a.lockMove) cap = Math.min(cap, a.lockMove);

  const d = p.desired;
  let tx = d.x, tz = d.z;
  let dl = Math.sqrt(tx * tx + tz * tz);
  let max = Math.min(p.maxSpeed(p.sprint, withBall), cap);
  // backpedalling is slower than running forward (a stance slide is quick sideways)
  if (dl > 0.1) {
    const rel = Math.abs(angleDiff(p.yaw, yawOf(tx, tz)));
    const k = p.stance ? (rel > 2.2 ? 0.85 : 1) : rel > 2.2 ? 0.66 : rel > 1.1 ? 0.86 : 1;
    max *= k;
  }
  if (dl > max) { tx *= max / dl; tz *= max / dl; dl = max; }

  const vx = p.vel.x, vz = p.vel.z;
  let dvx = tx - vx, dvz = tz - vz;
  const dvl = Math.sqrt(dvx * dvx + dvz * dvz);
  // quick stops and cuts, smooth acceleration; the stance is the quickest laterally
  const accel = (p.stance ? 17 : 12) + p.attrs.speed * 0.05;
  const slowing = tx * vx + tz * vz < vx * vx + vz * vz - 0.01;
  const rate = (slowing ? 22 : accel) * dt;
  if (dvl > rate) { dvx *= rate / dvl; dvz *= rate / dvl; }
  p.vel.x += dvx; p.vel.z += dvz; p.vel.y = 0;
  p.pos.x += p.vel.x * dt; p.pos.z += p.vel.z * dt; p.pos.y = 0;

  // facing
  let targetYaw = p.faceYaw;
  const sp = p.speed;
  if (targetYaw == null) targetYaw = sp > 0.4 ? yawOf(p.vel.x, p.vel.z) : p.yaw;
  const turnRate = (p.isHuman ? 16 : 9) * dt;
  p.yaw = turnTowards(p.yaw, targetYaw, turnRate);

  // stamina: sprinting drains, jogging and walking restore it
  if (p.sprint && sp > p.jogSpeed() * 1.03) p.stamina -= 0.06 * dt;
  else if (sp < 2.2) p.stamina += 0.06 * dt;
  else p.stamina += 0.02 * dt;
  p.stamina = clamp(p.stamina, 0, 1);

  if (sp > 0.05) p.gait += (sp * dt) / strideLength(sp);
  p.stanceW += ((p.stance ? 1 : 0) - p.stanceW) * Math.min(1, dt * 10);
}

// keep players from overlapping (deterministic order); a set defender is not pushed
// around by a driving ball handler, who is slowed by the bump instead
export function separatePlayers(players, now, ballOwner) {
  const n = players.length;
  for (let i = 0; i < n; i++) {
    const a = players[i];
    for (let j = i + 1; j < n; j++) {
      const b = players[j];
      const dx = b.pos.x - a.pos.x, dz = b.pos.z - a.pos.z;
      const d2 = dx * dx + dz * dz;
      const min = a.isHuman || b.isHuman ? 0.7 : 0.62;
      if (d2 < min * min && d2 > 1e-8) {
        const d = Math.sqrt(d2);
        const push = min - d;
        const nx = dx / d, nz = dz / d;
        let wa = 1, wb = 1;
        if (a === ballOwner && b.stance) { wa = 1.6; wb = 0.4; a.bumpUntil = now + 0.25; }
        else if (b === ballOwner && a.stance) { wb = 1.6; wa = 0.4; b.bumpUntil = now + 0.25; }
        const sw = wa + wb;
        a.pos.x -= nx * push * (wa / sw); a.pos.z -= nz * push * (wa / sw);
        b.pos.x += nx * push * (wb / sw); b.pos.z += nz * push * (wb / sw);
      } else if (d2 <= 1e-8) {
        b.pos.x += 0.05;
      }
    }
  }
}

// keep everyone on (or just off) the floor: the +X half, or the whole court
export function clampToFloor(p, full = false) {
  p.pos.x = clamp(p.pos.x, full ? -14.6 : -1.5, 14.6);
  p.pos.z = clamp(p.pos.z, -8.3, 8.3);
}
