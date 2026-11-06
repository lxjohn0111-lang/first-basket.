// Dribbling and ball-in-hands kinematics.
//
// A dribble cycle is solved like a real bounce: the hand pushes the ball down with a
// speed vd, it falls under gravity, bounces off the floor with the hardwood's
// restitution and rises back into the (same or other) hand. vd is chosen so the whole
// cycle lasts the period the player's speed calls for (quick and low when sprinting
// or under pressure, slower when standing). The cycle lives in the player's moving
// frame, so the ball carries the player's velocity and stays at their side as they
// turn. The animator places the dribbling hand on top of the ball whenever the ball
// is near the top of its bounce, so the hand and ball can never drift apart.
import { clamp } from './vec.js';
import { BALL_R, BALL, G } from './constants.js';
import { BODY } from './player.js';

const E = BALL.FLOOR_E;

// time down, time up and push speed for a bounce from height h (ball centre above the
// floor contact height) that should take period T
export function solveBounce(h, T) {
  const tOf = (vd) => {
    const td = (-vd + Math.sqrt(vd * vd + 2 * G * h)) / G;
    const vu = E * (vd + G * td);
    const disc = vu * vu - 2 * G * h;
    if (disc < 0) return null;
    const tu = (vu - Math.sqrt(disc)) / G;
    return { td, tu, vd, vu, T: td + tu };
  };
  const vImpMin = Math.sqrt(2 * G * h) / E;
  const vdMin = Math.sqrt(Math.max(0, vImpMin * vImpMin - 2 * G * h)) + 1e-3;
  let r = tOf(vdMin);
  if (!r || r.T <= T) return r || { td: T * 0.4, tu: T * 0.6, vd: vdMin, vu: 0, T };
  let lo = vdMin, hi = 20;
  for (let i = 0; i < 28; i++) {
    const mid = (lo + hi) / 2;
    const m = tOf(mid);
    if (m && m.T > T) lo = mid; else hi = mid;
  }
  return tOf((lo + hi) / 2);
}

const sideOf = (hand) => (hand === 'L' ? 1 : -1);

// where the hand holds the ball at the top of the bounce, in the player's frame:
// [lateral (+ left), forward, ball centre height]
function topPoint(p, hand, sf, low) {
  const s = sideOf(hand);
  return [s * (0.3 - 0.05 * sf), 0.34 + 0.3 * sf + 0.04 * low, 0.86 - 0.2 * low + 0.06 * sf];
}

export function startDribble(p, hand, o = {}) {
  p.hand = hand;
  p.dribble = { t: 0, T: 0.5, td: 0.2, tu: 0.3, from: hand, to: hand, crossQueued: false, a: [0, 0.4, 0.86], b: [0, 0.5, BALL_R], c: [0, 0.4, 0.86], cross: false, low: 0, count: 0 };
  newCycle(p, o.low || 0, o.fromPos);
}

// begin the next push: the ball is in the `from` hand at the top of the bounce
export function newCycle(p, low = 0, fromLocal = null) {
  const d = p.dribble;
  const sp = Math.hypot(p.vel.x, p.vel.z);
  const sf = clamp(sp / 6.5, 0, 1);
  d.low += (low - d.low) * 0.6;
  const cross = d.crossQueued;
  d.crossQueued = false;
  d.cross = cross;
  d.from = d.to;
  d.to = cross ? (d.from === 'L' ? 'R' : 'L') : d.from;
  p.hand = d.to;
  const a = fromLocal || topPoint(p, d.from, sf, d.low);
  const c = topPoint(p, d.to, sf, d.low);
  // bounce point: beside the dribbling foot and a little ahead (further ahead at speed);
  // a crossover bounces between the feet in front of the body
  const s = sideOf(d.from);
  const bl = cross ? 0 : s * (0.33 - 0.04 * sf);
  const bf = (a[1] + c[1]) / 2 + 0.06 + 0.22 * sf;
  d.a = a; d.c = c; d.b = [bl, bf, BALL_R];
  // quicker and lower when sprinting or protecting the ball; a crossover is snappy
  let T = 0.56 - 0.17 * sf - 0.08 * d.low;
  if (cross) T *= 0.82;
  T *= 1 - (p.attrs.handling - 60) * 0.0015;
  const h = Math.max(0.3, Math.min(a[2], c[2]) - BALL_R);
  const r = solveBounce(h, T);
  d.T = r.T; d.td = (r.td * (a[2] - BALL_R)) / h; d.tu = r.T - d.td;
  d.vd = r.vd;
  d.t = 0;
  d.count++;
}

// ball centre in the player's frame at the current point of the cycle
export function dribbleLocal(p, out) {
  const d = p.dribble;
  const t = d.t;
  if (t < d.td) {
    const u = t / d.td;
    const ha = d.a[2] - BALL_R;
    // pushed down: y falls under gravity from the hand
    const y = d.a[2] - (d.vd * t + 0.5 * G * t * t) * (ha / Math.max(0.01, d.vd * d.td + 0.5 * G * d.td * d.td));
    out[0] = d.a[0] + (d.b[0] - d.a[0]) * u;
    out[1] = d.a[1] + (d.b[1] - d.a[1]) * u;
    out[2] = Math.max(BALL_R, y);
  } else {
    const tt = t - d.td, u = clamp(tt / d.tu, 0, 1);
    const vImp = d.vd + G * d.td;
    const vu = E * vImp;
    const hc = d.c[2] - BALL_R;
    // rising after the bounce, decelerating into the hand
    const raw = vu * tt - 0.5 * G * tt * tt;
    const rawEnd = vu * d.tu - 0.5 * G * d.tu * d.tu;
    const y = BALL_R + raw * (hc / Math.max(0.01, rawEnd));
    out[0] = d.b[0] + (d.c[0] - d.b[0]) * u;
    out[1] = d.b[1] + (d.c[1] - d.b[1]) * u;
    out[2] = Math.max(BALL_R, y);
  }
  return out;
}

// the ball goes down toward the floor (true) or up into the hand (false)
export function dribbleFalling(p) { return p.dribble && p.dribble.t < p.dribble.td; }

// local -> world for a player-frame point [lateral(+left), forward, height]
export function toWorld(p, l, out, x = p.pos.x, z = p.pos.z, yaw = p.yaw) {
  const fx = Math.sin(yaw), fz = Math.cos(yaw);
  const lx = Math.cos(yaw), lz = -Math.sin(yaw);
  out.x = x + lx * l[0] + fx * l[1];
  out.z = z + lz * l[0] + fz * l[1];
  out.y = l[2];
  return out;
}

export function toLocal(p, x, y, z) {
  const dx = x - p.pos.x, dz = z - p.pos.z;
  const fx = Math.sin(p.yaw), fz = Math.cos(p.yaw);
  const lx = Math.cos(p.yaw), lz = -Math.sin(p.yaw);
  return [dx * lx + dz * lz, dx * fx + dz * fz, y];
}

// held ball positions in the player's frame (height above the player's feet)
export const HOLD = {
  chest: [0, 0.36, 1.2],     // triple threat / ready to pass
  gather: [0, 0.32, 1.28],
  pass: [0, 0.6, 1.3],        // arms extended at the release of a chest pass
  set: [-0.1, 0.22, BODY.EYE + 0.24],   // jump shot set point (right-handed)
  release: [-0.1, 0.36, BODY.EYE + 0.42],
  layup: [-0.14, 0.42, BODY.REACH - 0.05],
  ft: [-0.08, 0.24, BODY.EYE + 0.18],
};
// the first-person player shoots from a set point a little further out, so the rim
// stays in view under the ball (the eyes are the camera)
export const HOLD_FP = {
  set: [-0.17, 0.44, BODY.EYE + 0.14],
  ft: [-0.15, 0.44, BODY.EYE + 0.1],
  layup: [-0.12, 0.52, BODY.REACH - 0.12],
};
