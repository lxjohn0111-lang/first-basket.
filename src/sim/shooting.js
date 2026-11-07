// The shot model. Holding the shoot input fills a power meter; the green sweet spot
// sits higher on the meter the further the shot is (more power needed). Releasing
// inside it gives the right power; early is short, late is long. On top of that the
// shooter's rating, the defence's pressure, moving while shooting, fatigue and where
// they are looking add a little scatter. The result is only a launch velocity: from
// release on, the ball is pure physics against the rim, backboard and net.
import { clamp, angleDiff, yawOf } from './vec.js';
import { HOOP, distToHoop, isThree } from './constants.js';

// the attack sign of a player's team (+1 attacks the +X basket)
const sideOf = (m, p) => (m.side ? m.side(p.team) : 1);
import { solveLaunchSpeed } from './ball.js';
import { BODY } from './player.js';

export const FILL_TIME = { jumper: 1.0, three: 1.0, layup: 0.8, ft: 1.05, dunk: 0.5 };

// a jump shot's jump starts so that its peak comes at the sweet spot
export function jumpStartFor(spotC, kind, h) {
  const tUp = Math.sqrt((2 * h) / 9.81);
  return Math.max(0.05, spotC * FILL_TIME[kind] - tUp - 0.03);
}

export function canDunk(p, runUp) {
  return p.jumpHeight() + (runUp ? 0.28 : 0.12) >= 1.02;
}

// what pressing shoot would do from here
export function shotKind(m, p) {
  if (m.phase === 'ft') return 'ft';
  const s = sideOf(m, p);
  const d = distToHoop(p.pos.x, p.pos.z, s);
  const toward = (p.vel.x * (s * HOOP.X - p.pos.x) + p.vel.z * (HOOP.Z - p.pos.z)) / Math.max(0.01, d);
  if (d < 2.3 && canDunk(p, toward > 1.6) && (toward > 1.6 || d < 1.25)) return 'dunk';
  if (d < 3.3) return 'layup';
  return isThree(p.pos.x, p.pos.z, s) ? 'three' : 'jumper';
}
export const SHOT_LABEL = { dunk: 'DUNK', layup: 'LAYUP', jumper: 'JUMP SHOT', three: '3PT SHOT', ft: 'FREE THROW' };

// how closely the nearest defender contests a shooter (0 open .. 1 smothered)
export function pressureOn(m, p) {
  let best = 0;
  const hx = sideOf(m, p) * HOOP.X - p.pos.x, hz = HOOP.Z - p.pos.z;
  const hl = Math.hypot(hx, hz) || 1;
  for (const q of m.players) {
    if (q.team === p.team) continue;
    const dx = q.pos.x - p.pos.x, dz = q.pos.z - p.pos.z;
    const d = Math.hypot(dx, dz);
    if (d > 2.6) continue;
    const front = (dx * hx + dz * hz) / (hl * (d || 1));
    let c = clamp((2.6 - d) / 1.7, 0, 1) * clamp(0.35 + 0.65 * front, 0, 1);
    c *= q.handsUp || q.airborne ? 1 : 0.65;
    if (m.time < q.beatenUntil || m.time < q.offBalanceUntil) c *= 0.35;
    c *= 0.72 + 0.28 * (q.attrs.defense / 99);
    if (c > best) best = c;
  }
  return clamp(best, 0, 1);
}

// the sweet spot on the meter: centre and half width
export function sweetSpot(m, p, kind, pressure, moving) {
  const d = distToHoop(p.pos.x, p.pos.z, sideOf(m, p));
  let c, w;
  const s = p.attrs.shooting / 99;
  if (kind === 'layup') { c = 0.5; w = 0.09 + 0.05 * (p.attrs.handling / 99); }
  else if (kind === 'ft') { c = 0.62; w = 0.06 + 0.05 * s; }
  else if (kind === 'dunk') { c = 0.5; w = 0.5; }
  else { c = 0.44 + 0.4 * clamp((d - 3) / 5.5, 0, 1); w = 0.05 + 0.055 * s; }
  w *= 1 - 0.5 * pressure;
  w *= 1 - 0.35 * clamp(moving, 0, 1);
  w *= 1 - 0.3 * clamp((0.35 - p.stamina) / 0.35, 0, 1);
  if (p.isHuman) w *= m.assist.window;
  return { c: clamp(c, 0.2, 0.9), w: Math.max(0.022, w) };
}

// grade a release on the meter
export function grade(charge, spot) {
  const e = charge - spot.c;
  const a = Math.abs(e);
  if (a <= spot.w * 0.45) return { e, tier: 'perfect', label: 'PERFECT RELEASE' };
  if (a <= spot.w) return { e, tier: 'good', label: 'GOOD RELEASE' };
  if (a <= spot.w + 0.12) return { e, tier: e < 0 ? 'early' : 'late', label: e < 0 ? 'SLIGHTLY EARLY' : 'SLIGHTLY LATE' };
  return { e, tier: e < 0 ? 'early' : 'late', label: e < 0 ? 'WAY EARLY' : 'WAY LATE' };
}

// Launch velocity for a release. ctx: { kind, charge, spot, pressure, moving, aimYaw, pos }
export function launchVelocity(m, p, ctx) {
  const rng = m.rng;
  const kind = ctx.kind;
  const P = ctx.pos;
  const s = p.attrs.shooting / 99;
  const g = grade(ctx.charge, ctx.spot);
  // aim a touch past the centre of the rim, toward the board
  const sd = sideOf(m, p);
  const tx = sd * (HOOP.X + 0.035), tz = HOOP.Z;
  const D = Math.hypot(tx - P.x, tz - P.z);
  const toYaw = yawOf(tx - P.x, tz - P.z);
  // power: outside the sweet spot the shot comes up short or long
  const over = g.e - Math.sign(g.e) * Math.min(Math.abs(g.e), ctx.spot.w);
  let distErr = over * (kind === 'layup' ? 1.5 : kind === 'ft' ? 0.95 : 1.1);
  const clean = g.tier === 'perfect' ? 0.62 : g.tier === 'good' ? 0.92 : 1;
  const base = kind === 'layup' ? 0.02 : kind === 'ft' ? 0.012 : 0.016;
  const sigD = (base + 0.022 * (1 - s) + 0.014 * ctx.pressure + 0.01 * ctx.moving) * clean;
  const sigL = (0.006 + 0.012 * (1 - s) + 0.014 * ctx.pressure + 0.006 * ctx.moving) * clean;
  distErr += rng.gauss() * sigD;
  // looking away from the hoop pulls the shot that way (a little assistance near it)
  const look = angleDiff(toYaw, ctx.aimYaw);
  const cone = kind === 'layup' ? 0.6 : 0.16;
  const aimErr = Math.abs(look) > cone ? (Math.abs(look) - cone) * Math.sign(look) * 0.85 : 0;
  const yaw = toYaw + aimErr + rng.gauss() * sigL;
  const Dt = Math.max(0.3, D * (1 + distErr) + rng.gauss() * (kind === 'layup' ? 0.035 : 0.015));
  // the arc: a peak comfortably above the rim (higher for longer shots), which gives a
  // ~45 degree way in at every distance; drag is then corrected numerically
  const apex = Math.max(HOOP.Y + (kind === 'layup' ? 0.42 : 0.55) + 0.1 * D, P.y + 0.35);
  const vy0 = Math.sqrt(2 * 9.81 * (apex - P.y));
  const T = vy0 / 9.81 + Math.sqrt((2 * (apex - HOOP.Y)) / 9.81);
  const ang = Math.atan2(vy0, Dt / T);
  const dx = Math.sin(yaw), dz = Math.cos(yaw);
  const v = solveLaunchSpeed(P.x, P.y, P.z, dx, dz, ang, Dt, HOOP.Y);
  const c = Math.cos(ang), sn = Math.sin(ang);
  return { vx: dx * c * v, vy: sn * v, vz: dz * c * v, grade: g, backspin: 7 + 5 * s, yaw };
}

// quick analytic estimate of a shot's chance for AI decisions (no simulation),
// fitted to what the physics gives for an AI's typical release
export function makeChance(p, kind, d, pressure, moving = 0) {
  const s = p.attrs.shooting / 99;
  let base;
  if (kind === 'dunk') return clamp(0.96 * (1 - 0.3 * pressure), 0.3, 0.97);
  if (kind === 'layup') base = 0.78 + 0.12 * (p.attrs.handling / 99);
  else if (kind === 'ft') base = 0.45 + 0.42 * s;
  else base = 0.42 + 0.4 * s - 0.04 * Math.max(0, d - 3);
  return clamp(base * (1 - 0.62 * pressure) * (1 - 0.3 * moving), 0.02, 0.95);
}

export function shotValue(m, p, kind) {
  if (kind === 'ft') return 1;
  return kind === 'three' ? 3 : 2;
}

export function releaseHeight(p) { return p.pos.y + BODY.EYE + 0.42; }
