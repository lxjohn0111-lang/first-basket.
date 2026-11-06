// The human's controller. Turns buffered input into the same actions AI players use.
// Presses are buffered for ~150 ms so a press made while an action finishes still
// counts. Movement is relative to where the player looks; the body faces the view.
import { clamp, yawOf, angleDiff } from './vec.js';
import { RULES } from './constants.js';
import { startShot, releaseCharge, startPass, startSteal, startJumpAction, startFake, startCross, hasBall, canAct } from './actions.js';
import { startDribble } from './dribble.js';
import { shotKind, pressureOn, sweetSpot } from './shooting.js';

export class HumanController {
  constructor(match, player) {
    this.m = match;
    this.p = player;
    this.input = { moveF: 0, moveR: 0, sprint: false, yaw: 0, pitch: 0, lmb: false, rmb: false, stance: false };
    this.buffer = [];
    this.passTarget = null;
    this.targetVisible = false;
    this.preview = null;     // shot type and sweet spot from where the player stands
    this.lastAction = null;
  }

  press(type) { this.buffer.push({ type, t: this.m.time }); }
  release(type) { this.buffer.push({ type: type + 'Up', t: this.m.time }); }

  update(dt) {
    const m = this.m, p = this.p, now = m.time, b = m.ball, inp = this.input;
    const yaw = inp.yaw;
    const fx = Math.sin(yaw), fz = Math.cos(yaw);
    const rx = -Math.cos(yaw), rz = Math.sin(yaw);
    let mx = fx * inp.moveF + rx * inp.moveR, mz = fz * inp.moveF + rz * inp.moveR;
    const ml = Math.hypot(mx, mz);
    if (ml > 1) { mx /= ml; mz /= ml; }
    const mine = hasBall(m, p);
    const oppBall = b.owner && b.owner.team !== p.team;
    p.stance = !mine && !p.airborne && (inp.stance || (inp.rmb && !!oppBall)) && m.phase === 'live';
    p.handsUp = !mine && inp.lmb && m.phase === 'live';
    p.sprint = inp.sprint && ml > 0.1 && !p.stance;
    const max = p.maxSpeed(p.sprint, mine);
    p.desired.set(mx * max, 0, mz * max);
    p.faceYaw = yaw;

    // auto-dribble: moving with the ball in the hands starts a dribble
    if (mine && b.state === 'held' && !p.action && !p.airborne && ml > 0.2 && m.phase === 'live') {
      startDribble(p, p.hand || 'R', {});
      b.state = 'dribble';
    }

    // pass target (the ring), and the shot preview for the meter
    const teamHasIt = b.owner && b.owner.team === p.team;
    if (mine || (m.phase === 'check' && m.checker === p)) {
      this.passTarget = choosePassTarget(m, p, yaw, this.passTarget);
      this.targetVisible = !!this.passTarget;
    } else { this.targetVisible = false; if (!teamHasIt) this.passTarget = null; }
    if (mine || (m.phase === 'ft' && m.ft && m.ft.shooter === p)) {
      const kind = shotKind(m, p);
      const a = p.action;
      if (a && a.type === 'shot') this.preview = { kind: a.kind, spot: a.spot, charge: a.charging ? a.charge : (a.relCharge ?? a.charge), live: !a.released, released: a.released, grade: a.gradeInfo };
      else this.preview = { kind, spot: sweetSpot(m, p, kind, pressureOn(m, p), kind === 'layup' || kind === 'dunk' ? 0 : clamp(p.speed / 6, 0, 1)), charge: 0, live: false };
    } else {
      const a = p.action;
      this.preview = a && a.type === 'shot' && a.released && a.t - a.rt < 0.8 ? { kind: a.kind, spot: a.spot, charge: a.relCharge ?? a.charge, live: false, released: true, grade: a.gradeInfo } : null;
    }
    // shot aim follows the view while charging
    const a = p.action;
    if (a && a.type === 'shot' && !a.released) a.aimYaw = yaw;

    const ph = m.phase;
    if (ph === 'scored' || ph === 'dead' || ph === 'over') {
      for (const e of this.buffer) if (!e.type.endsWith('Up')) m.requestSkip();
      this.buffer.length = 0;
      return;
    }
    if (ph === 'check') {
      // the checker starts play when ready (moving or any action)
      if (m.checker === p && (ml > 0.2 || this.buffer.some((e) => !e.type.endsWith('Up')))) m.checkerReady = true;
      this.buffer = this.buffer.filter((e) => now - e.t < RULES.INPUT_BUFFER && !e.type.endsWith('Up') && e.type !== 'jump');
      return;
    }
    if (ph === 'ft') {
      const f = m.ft;
      for (const e of this.buffer) {
        if (f && f.shooter === p && e.type === 'shoot' && !p.action && !f.released && b.owner === p) startShot(m, p, { kind: 'ft', charging: inp.lmb, aimYaw: yaw });
        if (e.type === 'shootUp' && p.action && p.action.type === 'shot') releaseCharge(p.action, now);
      }
      this.buffer.length = 0;
      return;
    }
    if (ph !== 'live') { this.buffer.length = 0; return; }

    const keep = [];
    for (const e of this.buffer) {
      if (this.handle(e)) continue;
      if (now - e.t < (e.type === 'steal' ? 0.3 : RULES.INPUT_BUFFER) && !e.type.endsWith('Up')) keep.push(e);
    }
    this.buffer = keep;
  }

  handle(e) {
    const m = this.m, p = this.p, now = m.time, inp = this.input, b = m.ball;
    const mine = hasBall(m, p);
    const a = p.action;
    switch (e.type) {
      case 'shootUp':
        if (a && a.type === 'shot' && a.charging) releaseCharge(a, now);
        return true;
      case 'shoot':
        if (!mine) return true; // on defence the held button raises the hands (contest)
        if (!canAct(m, p)) return false;
        startShot(m, p, { charging: inp.lmb, aimYaw: inp.yaw });
        this.lastAction = { kind: 'shot', t: now };
        return true;
      case 'pass':
        if (mine) {
          if (!canAct(m, p)) return false;
          if (!this.passTarget) return true;
          startPass(m, p, this.passTarget);
          this.lastAction = { kind: 'pass', t: now };
          return true;
        }
        if (b.owner && b.owner.team === p.team) this.requestPass();
        else if (b.pass && b.pass.team === p.team) this.requestPass();
        return true;
      case 'jump':
        if (mine) { if (!canAct(m, p)) return false; startFake(m, p); return true; }
        if (p.airborne) return true;
        if (a && a.type !== 'jump') return false;
        startJumpAction(m, p);
        return true;
      case 'steal':
        if (mine) return true;
        if (a || now < p.stealReadyAt) return false;
        startSteal(m, p);
        this.lastAction = { kind: 'steal', t: now };
        return true;
      case 'cross':
        if (!mine) return true;
        startCross(m, p);
        return true;
      default:
        return true;
    }
  }

  requestPass() {
    const m = this.m, p = this.p, now = m.time;
    if (now < p.requestReadyAt) return;
    p.requestUntil = now + 2.2;
    p.requestReadyAt = now + 1.0;
    m.events.emit('request', { player: p, t: now });
  }
}

// the teammate the human is looking toward (with a little stickiness)
export function choosePassTarget(m, p, yaw, prev) {
  let best = null, bs = 1e9;
  for (const q of m.teams[p.team].players) {
    if (q === p) continue;
    const ang = Math.abs(angleDiff(yaw, yawOf(q.pos.x - p.pos.x, q.pos.z - p.pos.z)));
    const d = q.pos.distXZ(p.pos);
    let sc = ang + d * 0.015 + (ang > 0.85 ? 1 : 0);
    if (q === prev) sc -= 0.18;
    if (sc < bs) { bs = sc; best = q; }
  }
  return best;
}
