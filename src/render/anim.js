// Procedural animation from simulation state (the First Touch approach): feet are
// planted in world space from the sim's gait phase (no foot sliding), legs and arms
// use analytic two-bone IK. Basketball poses take their hand targets from where the
// simulation has put the ball, so hands and ball can never drift apart:
//   dribble   the dribbling hand rides the top of the ball near the top of the bounce
//             and waits above it while it travels to the floor and back
//   held      both hands on the sides of the ball; at a jump shot's set point the
//             shooting hand is under the ball and the guide hand on its side
//   release   gooseneck follow-through toward the rim; a pass ends with the arms out
//   catch     hands reach to meet an incoming ball
//   defence   stance with the hands out, a steal swipe, arms up to contest or block
import * as THREE from 'three';
import { P, DIM } from './characters.js';
import { strideLength, stanceFraction, BODY } from '../sim/player.js';
import { BALL_R, HOOP } from '../sim/constants.js';

const UP = new THREE.Vector3(0, 1, 0);
const tmp = Array.from({ length: 24 }, () => new THREE.Vector3());
const eA = new THREE.Euler();
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const smooth = (t) => { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };
function lerpAngle(a, b, t) { let d = b - a; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; return a + d * t; }
function frac(x) { return x - Math.floor(x); }

const V3 = () => new THREE.Vector3();
const LS = { x: V3(), y: V3(), z: V3() };
const IKS = { d: V3(), bend: V3(), r: V3(), t: V3() };
const U = { pelvis: V3(), waist: V3(), neck: V3(), fwd: V3(), side: V3(), hip: V3(), ankT: V3(), knee: V3(), ankle: V3(), pole: V3(), back: V3(), sh: V3(), tgt: V3(), off: V3(), elbow: V3(), hand: V3(), pole2: V3() };
const STAND_PELVIS = 1.03;

// matrix for a limb segment extending along local -Y from `from` to `to`
function limb(out, from, to, fwdHint) {
  const y = LS.y.subVectors(from, to);
  if (y.lengthSq() < 1e-8) y.set(0, 1, 0);
  y.normalize();
  const z = LS.z.copy(fwdHint).addScaledVector(y, -fwdHint.dot(y));
  if (z.lengthSq() < 1e-6) { z.set(0, 0, 1).addScaledVector(y, -y.z); if (z.lengthSq() < 1e-6) z.set(1, 0, 0); }
  z.normalize();
  const x = LS.x.crossVectors(y, z);
  out.makeBasis(x, y, z);
  out.setPosition(from);
  return out;
}

// two-bone IK. returns joint position in `mid`, adjusted end in `end`
function ik(root0, target0, l1, l2, pole, mid, end) {
  const root = IKS.r.copy(root0), target = IKS.t.copy(target0);
  const d = IKS.d.subVectors(target, root);
  let len = d.length();
  if (len < 1e-4) { d.set(0, -1, 0); len = 1e-4; } else d.divideScalar(len);
  len = clamp(len, Math.abs(l1 - l2) + 0.02, l1 + l2 - 0.002);
  end.copy(root).addScaledVector(d, len);
  const cosA = clamp((l1 * l1 + len * len - l2 * l2) / (2 * l1 * len), -1, 1);
  const sinA = Math.sqrt(1 - cosA * cosA);
  const bend = IKS.bend.copy(pole).addScaledVector(d, -pole.dot(d));
  if (bend.lengthSq() < 1e-6) bend.set(0, 0, 1);
  bend.normalize();
  mid.copy(root).addScaledVector(d, l1 * cosA).addScaledVector(bend, l1 * sinA);
}

class Foot {
  constructor() { this.pos = V3(); this.plant = V3(); this.from = V3(); this.swing = false; this.step = null; this.out = V3(); }
}

export class Animator {
  constructor(player) {
    this.p = player;
    this.feet = [new Foot(), new Foot()];
    this.ready = false;
    this.lastRoot = V3();
    this.lean = 0;
    this.headYaw = 0;
    this.headPitch = 0;
    this.m = Array.from({ length: 13 }, () => new THREE.Matrix4());
    this.root = V3();
    this.yaw = 0;
    this.hands = [V3(), V3()];
    this.shoulders = [V3(), V3()];
    this.handW = [0, 0];          // blend toward world-space hand targets
    this.prevHand = [V3(), V3()];
    this.wTarget = [V3(), V3()];
    this.reachW = 0;
    this.stance = 0;
  }

  reset() { this.ready = false; }

  // ctx: { match, alpha, dt, now, ball (rendered position), local }
  update(ctx) {
    const p = this.p, m = ctx.match, dt = Math.min(ctx.dt, 0.05), now = ctx.now;
    const alpha = ctx.alpha;
    const b = m.ball;
    const a = p.action;
    const rootY = lerp(p.prevPos.y, p.pos.y, alpha);
    const root = this.root.set(lerp(p.prevPos.x, p.pos.x, alpha), 0, lerp(p.prevPos.z, p.pos.z, alpha));
    const yaw = this.yaw = lerpAngle(p.prevYaw, p.yaw, alpha);
    const fwd = tmp[0].set(Math.sin(yaw), 0, Math.cos(yaw));
    const left = tmp[1].set(Math.cos(yaw), 0, -Math.sin(yaw));
    const vx = p.vel.x, vz = p.vel.z;
    const speed = Math.hypot(vx, vz);
    const sf = clamp(speed / 7, 0, 1);
    const air = rootY > 0.01;
    this.stance = lerp(this.stance, p.stanceW, 1 - Math.exp(-dt * 12));
    const st = this.stance;
    const latBase = 0.12 + 0.11 * st;

    if (!this.ready || this.lastRoot.distanceTo(root) > 2.5) {
      this.ready = true;
      for (let i = 0; i < 2; i++) {
        const f = this.feet[i];
        f.pos.copy(root).addScaledVector(left, i === 0 ? latBase : -latBase);
        f.plant.copy(f.pos); f.swing = false; f.step = null;
      }
      this.prevHand[0].set(0, -9, 0); this.prevHand[1].set(0, -9, 0);
    }
    this.lastRoot.copy(root);

    // ---------------- feet
    const g = lerp(p.prevGait, p.gait, alpha);
    const S = strideLength(Math.max(speed, 0.6));
    const beta = stanceFraction(S);
    const vdx = speed > 0.01 ? vx / speed : fwd.x, vdz = speed > 0.01 ? vz / speed : fwd.z;
    for (let i = 0; i < 2; i++) {
      const f = this.feet[i];
      const sgn = i === 0 ? 1 : -1;
      const latX = left.x * latBase * sgn, latZ = left.z * latBase * sgn;
      if (air) {
        // in the air: feet hang under the body, knees a little tucked
        const tuck = 0.12 * Math.sin(Math.min(1, (p.vy > 0 ? 0.5 : 1)) * Math.PI);
        f.pos.set(root.x + latX * 0.8 + fwd.x * (i === 0 ? 0.06 : -0.04), rootY + 0.04 + tuck * (i === 0 ? 1 : 0.6), root.z + latZ * 0.8 + fwd.z * (i === 0 ? 0.06 : -0.04));
        f.plant.set(f.pos.x, 0, f.pos.z); f.swing = false; f.step = null;
      } else if (speed > 0.35) {
        f.step = null;
        const u = frac(g - (i === 0 ? 0 : 0.5));
        if (u < beta) {
          if (f.swing) { f.swing = false; f.plant.set(f.pos.x, 0, f.pos.z); }
          const hx = root.x + latX, hz = root.z + latZ;
          if (Math.hypot(f.plant.x - hx, f.plant.z - hz) > 0.95) f.plant.set(hx + vdx * 0.2, 0, hz + vdz * 0.2);
          f.pos.copy(f.plant);
        } else {
          if (!f.swing) { f.swing = true; f.from.set(f.pos.x, 0, f.pos.z); }
          const s = (u - beta) / (1 - beta);
          const tRemain = ((1 - u) * S) / Math.max(speed, 0.5);
          const tx = root.x + vx * tRemain + vdx * beta * S * 0.5 + latX;
          const tz = root.z + vz * tRemain + vdz * beta * S * 0.5 + latZ;
          const e = smooth(s);
          // a stance slide keeps the feet low (a shuffle), a run lifts them
          f.pos.set(lerp(f.from.x, tx, e), (0.09 + speed * 0.035) * (1 - 0.6 * st) * Math.sin(Math.PI * Math.pow(s, 0.75)), lerp(f.from.z, tz, e));
        }
      } else {
        const ix = root.x + latX + fwd.x * (i === 0 ? 0.04 : -0.04), iz = root.z + latZ + fwd.z * (i === 0 ? 0.04 : -0.04);
        if (f.swing) { f.swing = false; f.step = { fx: f.pos.x, fz: f.pos.z, t: 0, dur: 0.13 }; }
        const other = this.feet[1 - i];
        if (f.step) {
          f.step.t += dt;
          const s = clamp(f.step.t / f.step.dur, 0, 1), e = smooth(s);
          f.pos.set(lerp(f.step.fx, ix, e), 0.07 * Math.sin(Math.PI * s), lerp(f.step.fz, iz, e));
          if (s >= 1) { f.step = null; f.plant.set(ix, 0, iz); }
        } else if (Math.hypot(f.plant.x - ix, f.plant.z - iz) > 0.2 && !other.step) {
          f.step = { fx: f.plant.x, fz: f.plant.z, t: 0, dur: 0.15 };
        } else f.pos.copy(f.plant);
      }
      f.out.copy(f.pos);
    }

    // ---------------- body
    let pelvisY = STAND_PELVIS - 0.05 * sf + 0.018 * sf * Math.cos(g * Math.PI * 4) - 0.2 * st + rootY;
    const land = now - p.landT;
    if (land >= 0 && land < 0.22) pelvisY -= 0.13 * Math.sin((land / 0.22) * Math.PI);
    if (air) pelvisY = rootY + STAND_PELVIS - 0.04;
    let lean = 0.05 + 0.14 * sf + 0.24 * st + (p.sprint ? 0.04 : 0);
    const twist = 0.14 * sf * Math.sin(g * Math.PI * 2) * (1 - st);

    // hand targets: body-frame defaults (relative to the shoulders)
    const swing = Math.sin(g * Math.PI * 2);
    const armAmp = (0.08 + 0.3 * sf) * (1 - st);
    const handL = tmp[2].set(0.05, -0.55 + 0.18 * sf, -swing * armAmp);
    const handR = tmp[3].set(-0.05, -0.55 + 0.18 * sf, swing * armAmp);
    // stance: hands out wide, one higher
    if (st > 0.01) {
      handL.lerp(tmp[10].set(0.42, -0.15, 0.3), st);
      handR.lerp(tmp[11].set(-0.42, -0.3, 0.3), st);
    }
    const W = [null, null]; // world-space targets per hand (0 left, 1 right)
    const ball = ctx.ball;
    const mine = b.owner === p && (b.state === 'held' || b.state === 'dribble');
    const sideL = (k, v, out) => out.copy(v).addScaledVector(left, k);

    if (mine && b.state === 'dribble' && p.dribble) {
      const d = p.dribble;
      const hand = d.t < d.td ? d.from : d.to;
      const hi = hand === 'L' ? 0 : 1;
      const restY = rootY + (d.t < d.td ? d.a[2] : d.c[2]) + BALL_R + 0.03;
      const hy = clamp(ball.y + BALL_R + 0.025, restY - 0.26, restY + 0.02);
      W[hi] = tmp[12].set(ball.x - fwd.x * 0.03, hy, ball.z - fwd.z * 0.03);
      // the other arm: a bar against a close defender, otherwise loose
      const def = nearestOpp(m, p);
      const oh = hi === 0 ? handR : handL;
      if (def && def.d < 1.8) oh.set(hi === 0 ? -0.2 : 0.2, -0.22, 0.32);
      else oh.set(hi === 0 ? -0.1 : 0.1, -0.5, 0.12 + swing * 0.08);
      lean += 0.06;
    } else if (mine) {
      const shotA = a && a.type === 'shot' && !a.released ? a : null;
      const high = ball.y > rootY + 1.7;
      if (shotA && (shotA.kind === 'layup' || (shotA.kind === 'dunk' && high))) {
        // one hand under the ball, the other low (both on a dunk)
        W[1] = tmp[12].copy(ball).addScaledVector(fwd, -0.05).addScaledVector(UP, -BALL_R - 0.02);
        if (shotA.kind === 'dunk') W[0] = sideL(BALL_R + 0.03, ball, tmp[13]);
        else handL.set(0.25, -0.35, 0.15);
      } else if (shotA && high) {
        // set point: shooting hand under and behind, guide hand on the side
        W[1] = tmp[12].copy(ball).addScaledVector(fwd, -0.1).addScaledVector(left, -0.025).addScaledVector(UP, -0.075);
        W[0] = sideL(BALL_R + 0.028, ball, tmp[13]).addScaledVector(fwd, -0.02);
      } else {
        W[0] = sideL(BALL_R + 0.026, ball, tmp[12]).addScaledVector(fwd, -0.035);
        W[1] = sideL(-(BALL_R + 0.026), ball, tmp[13]).addScaledVector(fwd, -0.035);
      }
    } else if (a && a.type === 'shot' && a.released) {
      const ft = a.t - a.rt;
      if (a.kind === 'dunk' && air) {
        // hanging on the rim
        const HX = (root.x >= 0 ? 1 : -1) * HOOP.X;
        const rx = HX - root.x, rz = HOOP.Z - root.z, rl = Math.hypot(rx, rz) || 1;
        const fx = HX - (rx / rl) * HOOP.R, fz = HOOP.Z - (rz / rl) * HOOP.R;
        W[0] = tmp[12].set(fx, HOOP.Y + 0.02, fz).addScaledVector(left, 0.14);
        W[1] = tmp[13].set(fx, HOOP.Y + 0.02, fz).addScaledVector(left, -0.14);
      } else if (ft < 0.55) {
        // follow-through: the shooting arm reaches up toward the rim, wrist down
        const k = 1 - smooth((ft - 0.35) / 0.2);
        const hx = (this.p.shotSide ?? 1) * HOOP.X - root.x, hz = HOOP.Z - root.z, hl = Math.hypot(hx, hz) || 1;
        const sy = rootY + BODY.SHOULDER;
        W[1] = tmp[12].set(root.x + (hx / hl) * 0.38 - left.x * 0.12, sy + 0.58, root.z + (hz / hl) * 0.38 - left.z * 0.12);
        W[0] = tmp[13].set(root.x + (hx / hl) * 0.25 + left.x * 0.2, sy + 0.38, root.z + (hz / hl) * 0.25 + left.z * 0.2);
        this.handW[0] = Math.min(this.handW[0], k + 0.001); this.handW[1] = Math.min(this.handW[1], k + 0.001);
        if (k < 0.02) { W[0] = W[1] = null; }
      }
    } else if (a && a.type === 'pass' && a.released) {
      const ft = (a.t - a.rt) / 0.3;
      const tq = a.target;
      const dx = tq.pos.x - root.x, dz = tq.pos.z - root.z, dl = Math.hypot(dx, dz) || 1;
      const k = 1 - smooth((ft - 0.5) / 0.5);
      const y = rootY + (a.kind === 'bounce' ? 1.0 : 1.3);
      W[0] = tmp[12].set(root.x + (dx / dl) * 0.6 + left.x * 0.13, y, root.z + (dz / dl) * 0.6 + left.z * 0.13);
      W[1] = tmp[13].set(root.x + (dx / dl) * 0.6 - left.x * 0.13, y, root.z + (dz / dl) * 0.6 - left.z * 0.13);
      this.handW[0] = Math.min(this.handW[0], k + 0.001); this.handW[1] = Math.min(this.handW[1], k + 0.001);
    } else if (a && a.type === 'steal') {
      // a quick swipe at the ball with the near hand
      const t = a.t;
      const ext = t < 0.11 ? smooth(t / 0.11) : 1 - smooth((t - 0.16) / 0.18);
      const dir = tmp[6].set(Math.sin(a.dir), 0, Math.cos(a.dir));
      const hi = a.hand === 'L' ? 0 : 1;
      W[hi] = tmp[12].copy(root).addScaledVector(dir, 0.3 + 0.48 * ext).addScaledVector(left, hi === 0 ? 0.12 : -0.12);
      W[hi].y = rootY + lerp(1.15, 0.8, ext);
      lean += 0.18 * ext;
      pelvisY -= 0.06 * ext;
    } else if (p.handsUp || (a && a.type === 'jump') || (air && !mine)) {
      // arms up: contest / block / rebound (a contest on the ground keeps one hand lower)
      // (the first-person player's hands go up a little further forward, into view)
      const fp = ctx.local;
      const top = rootY + BODY.REACH - (fp ? 0.16 : 0.04), reach = fp ? 0.42 : 0.16;
      W[0] = tmp[12].copy(root).addScaledVector(fwd, reach).addScaledVector(left, 0.18); W[0].y = top;
      W[1] = tmp[13].copy(root).addScaledVector(fwd, reach).addScaledVector(left, -0.18); W[1].y = air ? top : top - 0.3;
    } else if (now < p.celebrateUntil) {
      const t = now * 7 + p.id;
      handL.set(0.22, 0.6 + 0.07 * Math.sin(t), 0.05);
      handR.set(-0.22, 0.6 + 0.07 * Math.cos(t), 0.05);
    }

    // catching: hands go to meet a ball coming to this player
    if (!mine && b.state === 'free' && !(a && (a.type === 'steal' || (a.type === 'shot' && a.released) || (a.type === 'pass' && a.released)))) {
      const dx = ball.x - root.x, dz = ball.z - root.z, dd = Math.hypot(dx, dz);
      const toMe = (b.pass && b.pass.target === p) || (dd < 1.4 && ball.y < rootY + BODY.REACH + 0.3 && ball.y > rootY + 0.3 && !(b.shot && !b.shot.rim && !b.shot.board && !b.shot.done));
      if (toMe && dd < 2.2) {
        const k = clamp(1 - (dd - 0.5) / 1.6, 0, 1);
        W[0] = sideL(BALL_R + 0.03, ball, tmp[14]); W[1] = sideL(-(BALL_R + 0.03), ball, tmp[15]);
        this.reachW = Math.max(this.reachW * 0.9, k);
        lean += 0.08 * k;
      }
    }

    // world targets blend in and out smoothly (no snapping between poses)
    for (let i = 0; i < 2; i++) {
      const want = W[i] ? 1 : 0;
      const rate = want ? (mine ? 30 : 16) : 9;
      this.handW[i] += (want - this.handW[i]) * (1 - Math.exp(-dt * rate));
      if (W[i]) this.wTarget[i].copy(W[i]);
      if (mine && W[i]) this.handW[i] = Math.max(this.handW[i], 0.85);
    }

    // look at the ball
    const bx = ball.x - root.x, bz = ball.z - root.z;
    let hy = Math.atan2(bx, bz) - yaw;
    while (hy > Math.PI) hy -= Math.PI * 2; while (hy < -Math.PI) hy += Math.PI * 2;
    hy = clamp(hy, -1.1, 1.1);
    this.headYaw = lerp(this.headYaw, hy, 1 - Math.exp(-dt * 8));
    const bd = Math.hypot(bx, bz);
    this.headPitch = lerp(this.headPitch, clamp(Math.atan2(rootY + 1.9 - ball.y, bd) * 0.6, -0.5, 0.5), 1 - Math.exp(-dt * 6));
    this.lean = lerp(this.lean, lean, 1 - Math.exp(-dt * 10));
    this.poseUpright(root, yaw, pelvisY, this.lean, twist, handL, handR, ctx.local);
    return this.m;
  }

  poseUpright(root, yaw, pelvisY, lean, twist, handL, handR, local) {
    const Mx = this.m;
    const pelvis = U.pelvis.set(root.x, pelvisY, root.z);
    const fwd = U.fwd.set(Math.sin(yaw), 0, Math.cos(yaw));
    const side = U.side.set(Math.cos(yaw), 0, -Math.sin(yaw));
    if (local) pelvis.addScaledVector(fwd, -0.03);
    eA.set(0, yaw - twist * 0.4, 0, 'YXZ');
    Mx[P.PELVIS].makeRotationFromEuler(eA).setPosition(pelvis);
    const pelvisM = Mx[P.PELVIS];
    const waist = U.waist.set(0, DIM.waist, 0).applyMatrix4(pelvisM);
    eA.set(lean, yaw + twist, 0, 'YXZ');
    Mx[P.TORSO].makeRotationFromEuler(eA).setPosition(waist);
    const torsoM = Mx[P.TORSO];
    const neck = U.neck.set(0, DIM.neck, 0).applyMatrix4(torsoM);
    eA.set(this.headPitch - lean * 0.5, yaw + this.headYaw, 0, 'YXZ');
    Mx[P.HEAD].makeRotationFromEuler(eA).setPosition(neck);
    // legs
    for (let i = 0; i < 2; i++) {
      const hip = U.hip.set(i === 0 ? DIM.hipW : -DIM.hipW, -0.02, 0).applyMatrix4(pelvisM);
      const foot = this.feet[i].out;
      const ankleT = U.ankT.set(foot.x, foot.y + DIM.ankle, foot.z);
      const pole = U.pole.copy(fwd).addScaledVector(UP, 0.1);
      ik(hip, ankleT, DIM.thigh, DIM.shin, pole, U.knee, U.ankle);
      limb(Mx[i === 0 ? P.THIGH_L : P.THIGH_R], hip, U.knee, fwd);
      limb(Mx[i === 0 ? P.SHIN_L : P.SHIN_R], U.knee, U.ankle, fwd);
      const pitch = clamp((U.ankle.y - DIM.ankle - (root.y || 0)) * 1.2, 0, 0.6) * (this.feet[i].swing ? 1 : 0);
      eA.set(pitch, yaw, 0, 'YXZ');
      Mx[i === 0 ? P.BOOT_L : P.BOOT_R].makeRotationFromEuler(eA).setPosition(U.ankle);
    }
    // arms via IK toward the hand targets
    const back = U.back.set(-fwd.x, -0.6, -fwd.z);
    for (let i = 0; i < 2; i++) {
      const s = i === 0 ? 1 : -1;
      const sh = U.sh.set(s * DIM.shoulderW, DIM.shoulderY, 0).applyMatrix4(torsoM);
      const target = U.tgt.copy(i === 0 ? handL : handR).add(U.off.set(s * DIM.shoulderW, DIM.shoulderY, 0)).applyMatrix4(torsoM);
      const w = this.handW[i];
      if (w > 0.001) target.lerp(this.wTarget[i], w);
      // raised arms lift the shoulder a little (more reach overhead)
      const lift = clamp((target.y - sh.y) / 0.6, 0, 1) * 0.07;
      sh.y += lift;
      const pole = U.pole2.copy(back).addScaledVector(side, s * 0.55);
      ik(sh, target, DIM.upper, DIM.fore, pole, U.elbow, U.hand);
      limb(Mx[i === 0 ? P.UARM_L : P.UARM_R], sh, U.elbow, fwd);
      limb(Mx[i === 0 ? P.FARM_L : P.FARM_R], U.elbow, U.hand, fwd);
      this.hands[i].copy(U.hand);
      this.shoulders[i].copy(sh);
    }
  }
}

function nearestOpp(m, p) {
  let best = null, bd = 1e9;
  for (const q of m.players) { if (q.team === p.team) continue; const d = Math.hypot(q.pos.x - p.pos.x, q.pos.z - p.pos.z); if (d < bd) { bd = d; best = q; } }
  return best ? { q: best, d: bd } : null;
}
