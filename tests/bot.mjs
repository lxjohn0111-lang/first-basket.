// A scripted player for the real controls (the HumanController the keyboard, mouse and
// touch feed): it moves and looks, holds and releases the shot on the meter (with a
// little human error), passes, calls for the ball, defends in a stance, steals, blocks
// and rebounds, on the half court or the full court (both ends). Used by
// tests/human.mjs and by tools/video.mjs (bundled for the page).
import { DT, HOOP, distToHoop, spot } from '../src/sim/constants.js';
import { yawOf, angleDiff } from '../src/sim/vec.js';

export class Bot {
  // o: { seed, noise (meter timing error), full, onPress(type) }
  constructor(m, ctl, o = {}) {
    this.m = m; this.ctl = ctl;
    this.o = { noise: 0.04, full: !!m.full, ...o };
    let seed = o.seed ?? 4242;
    this.rng = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    this.st = { hold: null, cd: 0, target: null, retarget: 0 };
  }
  update() { step(this.m, this.ctl, this.rng, this.st, this.o); }
}

function step(m, ctl, rng, st, o) {
  const { noise, full } = o;
  const h = ctl.p, b = m.ball, inp = ctl.input;
  const press = (t) => { ctl.press(t); if (o.onPress) o.onPress(t); };
  st.cd -= DT;
  const moveTo = (x, z, sprint = false) => {
    const dx = x - h.pos.x, dz = z - h.pos.z, d = Math.hypot(dx, dz);
    if (d < 0.25) { inp.moveF = 0; inp.moveR = 0; return d; }
    // movement is relative to the look direction
    const want = yawOf(dx, dz), rel = angleDiff(inp.yaw, want);
    inp.moveF = Math.cos(rel); inp.moveR = -Math.sin(rel);
    inp.sprint = sprint;
    return d;
  };
  inp.stance = false; inp.rmb = false;
  // the basket I attack, and the one the team with the ball attacks
  const s = m.side(h.team), HX = s * HOOP.X;
  const ds = m.side(m.offense), DX = ds * HOOP.X;
  const hoopYaw = yawOf(HX - h.pos.x, HOOP.Z - h.pos.z);
  // holding the shoot button: release at the sweet spot (with some human error)
  if (st.hold) {
    const a = h.action;
    inp.yaw = hoopYaw;
    if (!a || a.type !== 'shot') { st.hold = null; inp.lmb = false; return; }
    if (a.charge >= st.hold.at) { inp.lmb = false; ctl.release('shoot'); st.hold = null; }
    return;
  }
  if (m.phase === 'ft') {
    if (m.ft && m.ft.shooter === h && b.owner === h && !h.action && st.cd <= 0) { inp.yaw = hoopYaw; inp.lmb = true; press('shoot'); st.hold = { at: 0.62 + rng() * noise * 2 - noise }; st.cd = 1.2; }
    return;
  }
  if (m.phase === 'check' && m.checker === h) { inp.moveF = 0.5; inp.yaw = hoopYaw; return; }
  if (m.phase === 'tip') {
    // jump as the ball comes down to about 3.4 m
    inp.moveF = 0; inp.moveR = 0;
    inp.yaw = yawOf(b.pos.x - h.pos.x + 0.001, b.pos.z - h.pos.z);
    if (m.tip && m.tip.jumpers.includes(h) && m.tip.tossed && b.vel.y < 0 && b.pos.y < 3.75 && !h.airborne && st.cd <= 0) { press('jump'); st.cd = 2; }
    return;
  }
  if (m.phase === 'inbound') {
    // get open for the throw-in, and call for it
    if (m.offense === h.team && m.inb) {
      const ib = m.inb;
      moveTo(ib.x - Math.sign(ib.x || 1) * (ib.kind === 'baseline' ? 3.5 : 1.5), ib.z - (ib.kind === 'baseline' ? 0 : Math.sign(ib.z) * 3.2));
      inp.yaw = yawOf(ib.x - h.pos.x, ib.z - h.pos.z);
      if (st.cd <= 0 && rng() < 0.05) { press('pass'); st.cd = 1.5; }
    } else { inp.moveF = 0; inp.moveR = 0; }
    return;
  }
  if (m.phase !== 'live') { inp.moveF = 0; inp.moveR = 0; return; }
  const mine = b.owner === h;
  if (mine) {
    const d = distToHoop(h.pos.x, h.pos.z, s);
    if (m.mustClear === h.team) { const a = Math.atan2(h.pos.z, h.pos.x - HOOP.X); moveTo(HOOP.X + Math.cos(a) * 7.6, Math.sin(a) * 7.6, true); inp.yaw = hoopYaw; return; }
    st.retarget -= DT;
    // full court: over half court first
    if (full && !m.frontcourt && s * h.pos.x < 0.5) {
      const [tx, tz] = spot('top', s);
      inp.yaw = hoopYaw;
      moveTo(tx, tz, m.backcourtT > 4);
      return;
    }
    if (!st.target || st.retarget <= 0) {
      const r = rng();
      const [wx, wz] = spot('wingL', s), [ex, ez] = spot('elbowR', s);
      st.target = r < 0.35 ? { x: HX - s * 0.8, z: (rng() - 0.5) * 1.2, drive: true } : r < 0.7 ? { x: wx, z: wz * (rng() < 0.5 ? 1 : -1) } : { x: ex, z: ez * (rng() < 0.5 ? 1 : -1) };
      st.retarget = 2.5;
    }
    inp.yaw = hoopYaw;
    const dist = moveTo(st.target.x, st.target.z, !!st.target.drive);
    if (st.cd <= 0 && rng() < 0.05) { press('cross'); st.cd = 0.4; }
    const teammates = m.teams[h.team].players.filter((q) => q !== h);
    if (st.cd <= 0 && (dist < 0.6 || (st.target.drive && d < 2.6) || m.shotClock < 3)) {
      inp.lmb = true; press('shoot');
      const spot = ctl.preview ? ctl.preview.spot : { c: 0.5 };
      st.hold = { at: spot.c + (rng() * 2 - 1) * noise };
      st.cd = 0.8; st.target = null;
      return;
    }
    if (st.cd <= 0 && teammates.length && rng() < 0.012) {
      const q = teammates[Math.floor(rng() * teammates.length)];
      inp.yaw = yawOf(q.pos.x - h.pos.x, q.pos.z - h.pos.z);
      ctl.update(0); press('pass'); st.cd = 0.6;
    }
    return;
  }
  st.target = null;
  if (b.owner && b.owner.team === h.team) {
    // spot up, call for it now and then
    const [wx, wz] = spot('wingR', s);
    moveTo(wx, wz, Math.hypot(wx - h.pos.x, wz - h.pos.z) > 6);
    inp.yaw = yawOf(b.pos.x - h.pos.x, b.pos.z - h.pos.z);
    if (st.cd <= 0 && rng() < 0.01) { press('pass'); st.cd = 1; }
    return;
  }
  if (b.state === 'free') {
    // chase loose balls and rebounds
    const r = m.ai.reb || { x: b.pos.x, z: b.pos.z };
    moveTo(r.x, r.z, true);
    inp.yaw = yawOf(b.pos.x - h.pos.x, b.pos.z - h.pos.z);
    if (b.pos.y > 2.3 && Math.hypot(b.pos.x - h.pos.x, b.pos.z - h.pos.z) < 0.9 && b.vel.y < 0 && st.cd <= 0) { press('jump'); st.cd = 0.8; }
    return;
  }
  // defence: between my man and the rim, stance, poke, contest
  const man = m.ai.markOf(h) || b.owner;
  if (!man) return;
  const hx = DX - man.pos.x, hz = HOOP.Z - man.pos.z, hl = Math.hypot(hx, hz) || 1;
  const gap = b.owner === man ? 1.1 : 2.2;
  const tx = man.pos.x + (hx / hl) * gap, tz = man.pos.z + (hz / hl) * gap;
  moveTo(tx, tz, Math.hypot(tx - h.pos.x, tz - h.pos.z) > 4);
  inp.yaw = yawOf(man.pos.x - h.pos.x, man.pos.z - h.pos.z);
  inp.stance = b.owner === man && h.pos.distXZ(man.pos) < 2.2;
  if (b.owner === man && st.cd <= 0 && h.pos.distXZ(man.pos) < 1.3 && b.pos.y < 0.7 && rng() < 0.08) { press('steal'); st.cd = 0.8; }
  if (man.action && man.action.type === 'shot' && man.action.jumped && h.pos.distXZ(man.pos) < 1.6 && st.cd <= 0) { press('jump'); st.cd = 1; }
}

