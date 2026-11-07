// The basketball. One authoritative model with explicit states:
//   free     - physics: gravity, drag, spin, energy-losing bounces on the floor, a torus
//              rim, the backboard box and the rim bracket, a soft net, and player bodies
//              (both baskets: the one at the ball's end of the floor is tested)
//   held     - in a player's hands (kinematic, placed by the holder's pose every step)
//   dribble  - bouncing between a player's hand and the floor (kinematic, see dribble.js)
//   dead     - frozen between plays (check ball, free-throw setup)
// Kinematic states keep a finite-difference velocity, so a ball knocked loose or
// released leaves with exactly the motion it had on screen (no teleport, no float).
import { V3, clamp } from './vec.js';
import { BALL_R, BALL, G, HOOP } from './constants.js';

const I_RATIO = 1.5 / (BALL_R * BALL_R); // m / I for a hollow sphere (I = 2/3 m R^2)
const RING = HOOP.R + HOOP.TUBE;          // rim tube centreline radius
const _n = new V3(), _c = new V3(), _r = new V3(), _u = new V3(), _jt = new V3();

export function netRadiusAt(y) {
  const t = clamp((HOOP.Y - y) / HOOP.NET_LEN, 0, 1);
  return HOOP.R + (HOOP.NET_R1 - HOOP.R) * t;
}

function cross(a, b, out) { return out.set(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x); }

export class Ball {
  constructor() {
    this.pos = new V3(0, BALL_R, 0);
    this.prevPos = new V3(0, BALL_R, 0);
    this.vel = new V3();
    this.w = new V3();        // angular velocity (rad/s)
    this.q = [0, 0, 0, 1];    // orientation for rendering
    this.prevQ = [0, 0, 0, 1];
    this.state = 'dead';
    this.owner = null;
    this.shot = null;         // shot in flight: { shooter, team, value, t, rim, board, ... }
    this.pass = null;         // pass in flight: { passer, target, team, t }
    this.lastTouch = null;    // { player, team, t }
    this.ignore = null;       // a player whose body the ball passes through for a moment
    this.ignoreUntil = 0;
    this.net = { count: 0, x: 0, y: 0, z: 0, vy: 0, amp: 0 };
    this.scoredAt = -10;
    this.cb = null;           // event callbacks (set by the match)
    this.quiet = false;       // prediction copies emit nothing
    this.restT = 0;
  }

  copyFrom(b) {
    this.pos.copy(b.pos); this.vel.copy(b.vel); this.w.copy(b.w);
    this.state = b.state; this.scoredAt = b.scoredAt;
    return this;
  }

  // ------------------------------------------------------------ kinematic control
  setKinematic(x, y, z, dt) {
    if (dt > 0) this.vel.set((x - this.pos.x) / dt, (y - this.pos.y) / dt, (z - this.pos.z) / dt);
    this.pos.set(x, y, z);
  }

  release(vx, vy, vz, wx = 0, wy = 0, wz = 0) {
    this.state = 'free';
    this.owner = null;
    this.vel.set(vx, vy, vz);
    this.w.set(wx, wy, wz);
    this.restT = 0;
  }

  place(x, y, z) {
    this.pos.set(x, y, z); this.prevPos.set(x, y, z);
    this.vel.set(0, 0, 0); this.w.set(0, 0, 0);
  }

  get speed() { return this.vel.len(); }

  // ------------------------------------------------------------ per step
  beginStep() {
    this.prevPos.copy(this.pos);
    this.prevQ[0] = this.q[0]; this.prevQ[1] = this.q[1]; this.prevQ[2] = this.q[2]; this.prevQ[3] = this.q[3];
  }

  step(dt, now, players) {
    if (this.state === 'free') {
      const sp = this.vel.len();
      const n = clamp(Math.ceil((sp * dt) / 0.025), 1, 10);
      const h = dt / n;
      for (let i = 0; i < n; i++) this.substep(h, now, players);
    }
    this.spin(dt);
  }

  substep(h, now, players) {
    const v = this.vel, p = this.pos;
    const sp = v.len();
    // gravity and quadratic drag
    const k = BALL.AIR_DRAG * sp;
    v.x -= v.x * k * h; v.z -= v.z * k * h;
    v.y -= (G + v.y * k) * h;
    this.w.scale(Math.exp(-0.15 * h));
    const py = p.y;
    p.addScaled(v, h);
    // the basket at this end of the floor
    const s = p.x >= 0 ? 1 : -1, hx = s * HOOP.X;
    // a basket: the ball's centre drops through the rim from above, inside the ring
    if (py >= HOOP.Y && p.y < HOOP.Y && v.y < 0) {
      const t = (py - HOOP.Y) / (py - p.y || 1);
      const cx = this.prevX(t, h), cz = this.prevZ(t, h);
      if (Math.hypot(cx - hx, cz - HOOP.Z) < HOOP.R - 0.01 && now - this.scoredAt > 1) {
        this.scoredAt = now;
        this.scoredSide = s;
        if (this.cb && !this.quiet) this.cb.score(this, s);
      }
    }
    this.collideFloor(h);
    this.collideRim(hx);
    this.collideBoard(s);
    this.collideNet(h, hx);
    if (players && !this.quiet) this.collidePlayers(players, now);
  }
  prevX(t, h) { return this.pos.x - this.vel.x * h * (1 - t); }
  prevZ(t, h) { return this.pos.z - this.vel.z * h * (1 - t); }

  // impulse response with Coulomb friction and spin (n points from the surface to the ball)
  contact(nx, ny, nz, e, kind) {
    const v = this.vel;
    _n.set(nx, ny, nz);
    const vn = v.dot(_n);
    if (vn >= 0) return 0;
    _r.set(-nx * BALL_R, -ny * BALL_R, -nz * BALL_R);
    cross(this.w, _r, _u).add(v);
    const un = _u.dot(_n);
    _u.addScaled(_n, -un);
    const jn = -(1 + e) * vn;
    v.addScaled(_n, jn);
    const ut = _u.len();
    if (ut > 1e-6) {
      const jt = Math.min(0.4 * ut, BALL.FRICTION * jn);
      _jt.copy(_u).scale(-jt / ut);
      v.add(_jt);
      cross(_r, _jt, _u);
      this.w.addScaled(_u, I_RATIO);
    }
    const speed = -vn;
    if (this.cb && !this.quiet && speed > 0.25) this.cb.hit(this, kind, speed);
    return speed;
  }

  collideFloor(h) {
    const p = this.pos, v = this.vel;
    if (p.y >= BALL_R) return;
    p.y = BALL_R;
    if (v.y < -0.35) {
      this.contact(0, 1, 0, BALL.FLOOR_E, 'floor');
    } else {
      // rolling: no bounce, rolling resistance, spin follows the motion
      v.y = 0;
      const s = Math.hypot(v.x, v.z);
      if (s > 1e-4) { const k = Math.max(0, s - 0.35 * h) / s; v.x *= k; v.z *= k; }
      this.w.set(v.z / BALL_R, this.w.y * 0.98, -v.x / BALL_R);
    }
  }

  collideRim(hx = HOOP.X) {
    const p = this.pos;
    const dx = p.x - hx, dz = p.z - HOOP.Z;
    if (Math.abs(p.y - HOOP.Y) > BALL_R + 0.05) return;
    const r = Math.hypot(dx, dz);
    if (r > RING + BALL_R + 0.05 || r < RING - BALL_R - 0.05) return;
    const ux = r > 1e-6 ? dx / r : 1, uz = r > 1e-6 ? dz / r : 0;
    _c.set(hx + ux * RING, HOOP.Y, HOOP.Z + uz * RING);
    const nx = p.x - _c.x, ny = p.y - _c.y, nz = p.z - _c.z;
    const d = Math.hypot(nx, ny, nz);
    const min = BALL_R + HOOP.TUBE;
    if (d >= min || d < 1e-6) return;
    p.x = _c.x + (nx / d) * min; p.y = _c.y + (ny / d) * min; p.z = _c.z + (nz / d) * min;
    this.contact(nx / d, ny / d, nz / d, BALL.RIM_E, 'rim');
  }

  // axis-aligned box collider (closest point test covers faces, edges and corners);
  // boxes are given for the +X basket and mirrored for s = -1
  collideBox(x0, x1, y0, y1, z0, z1, e, kind, s = 1) {
    const p = this.pos;
    if (s < 0) { const a = -x1; x1 = -x0; x0 = a; }
    const cx = clamp(p.x, x0, x1), cy = clamp(p.y, y0, y1), cz = clamp(p.z, z0, z1);
    const nx = p.x - cx, ny = p.y - cy, nz = p.z - cz;
    const d = Math.hypot(nx, ny, nz);
    if (d >= BALL_R) return;
    // centre inside the box: out the court side
    if (d < 1e-6) { p.x = s > 0 ? x0 - BALL_R : x1 + BALL_R; this.contact(-s, 0, 0, e, kind); return; }
    p.x = cx + (nx / d) * BALL_R; p.y = cy + (ny / d) * BALL_R; p.z = cz + (nz / d) * BALL_R;
    this.contact(nx / d, ny / d, nz / d, e, kind);
  }

  collideBoard(s = 1) {
    const p = this.pos;
    if (s * p.x < HOOP.BOARD_X - 0.3 || p.y < HOOP.BOARD_Y0 - 0.3) return;
    this.collideBox(HOOP.BOARD_X, HOOP.BOARD_X + HOOP.BOARD_T, HOOP.BOARD_Y0, HOOP.BOARD_Y0 + HOOP.BOARD_H, -HOOP.BOARD_W / 2, HOOP.BOARD_W / 2, BALL.BOARD_E, 'board', s);
    // the bracket that holds the rim to the board
    this.collideBox(HOOP.X + RING + 0.005, HOOP.BOARD_X, HOOP.Y - 0.05, HOOP.Y + 0.005, -0.07, 0.07, 0.4, 'rim', s);
    // the padded support arm behind the board
    this.collideBox(HOOP.BOARD_X + HOOP.BOARD_T, HOOP.BOARD_X + 1.4, HOOP.BOARD_Y0 + 0.2, HOOP.BOARD_Y0 + 0.55, -0.12, 0.12, 0.3, 'board', s);
  }

  // the net slows a ball dropping through and steers it down the middle
  collideNet(h, hx = HOOP.X) {
    const p = this.pos, v = this.vel;
    if (p.y > HOOP.Y - 0.02 || p.y < HOOP.Y - HOOP.NET_LEN - 0.05) return;
    const dx = p.x - hx, dz = p.z - HOOP.Z;
    const r = Math.hypot(dx, dz);
    const nr = netRadiusAt(p.y);
    if (r > nr + BALL_R * 0.5) return; // outside the net
    // inside: drag and a soft pull toward the axis where the ball presses the mesh
    const press = r + BALL_R * 0.55 - nr;
    if (press > 0 && r > 1e-4) {
      const k = Math.min(1, press * 60 * h);
      p.x -= (dx / r) * press * k; p.z -= (dz / r) * press * k;
      const vr = (v.x * dx + v.z * dz) / r;
      if (vr > 0) { v.x -= (dx / r) * vr * 0.85; v.z -= (dz / r) * vr * 0.85; }
    }
    const damp = Math.exp(-5.5 * h);
    v.x *= damp; v.z *= damp;
    if (v.y < -2.2) v.y *= Math.exp(-3.2 * h);
    const nt = this.net;
    nt.x = p.x; nt.y = p.y; nt.z = p.z; nt.vy = v.y;
    nt.amp = Math.max(nt.amp, Math.min(1, 0.25 + Math.abs(v.y) * 0.12 + Math.max(0, press) * 6));
    nt.count++;
  }

  // player bodies are vertical capsules; a loose ball glances off them
  collidePlayers(players, now) {
    const p = this.pos;
    for (let i = 0; i < players.length; i++) {
      const q = players[i];
      if (q === this.ignore && now < this.ignoreUntil) continue;
      const dx = p.x - q.pos.x, dz = p.z - q.pos.z;
      const rr = 0.26 + BALL_R;
      if (dx * dx + dz * dz > rr * rr) continue;
      const y0 = q.pos.y + 0.35, y1 = q.pos.y + 1.6;
      if (p.y < y0 - BALL_R || p.y > y1 + BALL_R) continue;
      const cy = clamp(p.y, y0, y1);
      const nx = dx, ny = p.y - cy, nz = dz;
      const d = Math.hypot(nx, ny, nz);
      if (d >= rr || d < 1e-6) continue;
      p.x = q.pos.x + (nx / d) * rr; p.y = cy + (ny / d) * rr; p.z = q.pos.z + (nz / d) * rr;
      // relative to the moving body
      this.vel.x -= q.vel.x; this.vel.z -= q.vel.z;
      const s = this.contact(nx / d, ny / d, nz / d, 0.35, 'body');
      this.vel.x += q.vel.x; this.vel.z += q.vel.z;
      if (s > 0.5 && this.cb) this.cb.body(this, q, s);
    }
  }

  // rendering orientation follows the angular velocity
  spin(dt) {
    const w = this.w;
    if (this.state !== 'free') {
      // in hand / dribbling: a gentle roll with the motion
      const v = this.vel;
      w.set(v.z / BALL_R * 0.35, 0, -v.x / BALL_R * 0.35);
    }
    const wl = w.len();
    if (wl < 1e-5) return;
    const a = wl * dt * 0.5, s = Math.sin(a) / wl;
    const qx = w.x * s, qy = w.y * s, qz = w.z * s, qw = Math.cos(a);
    const [x, y, z, ww] = this.q;
    const nx = qw * x + qx * ww + qy * z - qz * y;
    const ny = qw * y - qx * z + qy * ww + qz * x;
    const nz = qw * z + qx * y - qy * x + qz * ww;
    const nw = qw * ww - qx * x - qy * y - qz * z;
    const l = Math.hypot(nx, ny, nz, nw) || 1;
    this.q[0] = nx / l; this.q[1] = ny / l; this.q[2] = nz / l; this.q[3] = nw / l;
  }
}

// ---------------------------------------------------------------- prediction
const scratch = new Ball();
scratch.quiet = true;

// Pure flight (drag and gravity, no collisions) from p with velocity v until the ball
// comes down through height y. Returns the horizontal distance travelled and the time,
// or null if it never gets that high.
export function flightTo(px, py, pz, vx, vy, vz, y, dt = 1 / 240) {
  let x = px, yy = py, z = pz, ux = vx, uy = vy, uz = vz, t = 0;
  let peaked = false;
  for (let i = 0; i < 2400; i++) {
    const sp = Math.sqrt(ux * ux + uy * uy + uz * uz);
    const k = BALL.AIR_DRAG * sp;
    ux -= ux * k * dt; uz -= uz * k * dt; uy -= (G + uy * k) * dt;
    const py0 = yy;
    x += ux * dt; yy += uy * dt; z += uz * dt; t += dt;
    if (uy < 0) peaked = true;
    if (peaked && py0 >= y && yy < y) {
      const f = (py0 - y) / (py0 - yy);
      const fx = x - ux * dt * (1 - f), fz = z - uz * dt * (1 - f);
      return { d: Math.hypot(fx - px, fz - pz), t: t - dt * (1 - f), x: fx, z: fz };
    }
    if (yy < 0) return null;
  }
  return null;
}

// Launch speed so a ball released at p with elevation `ang` (radians) toward a target at
// horizontal distance D comes down through the target's height there.
export function solveLaunchSpeed(px, py, pz, dirX, dirZ, ang, D, ty) {
  let lo = 1.5, hi = 18;
  const c = Math.cos(ang), s = Math.sin(ang);
  for (let it = 0; it < 26; it++) {
    const mid = (lo + hi) / 2;
    const r = flightTo(px, py, pz, dirX * c * mid, s * mid, dirZ * c * mid, ty);
    if (!r || r.d < D) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

// Predict where a free ball will be after t seconds (full physics incl. rim and board),
// for AI rebounding. Calls back each sample with (time, pos).
export function predictFree(ball, t, step, cb) {
  scratch.copyFrom(ball);
  scratch.state = 'free';
  const dt = 1 / 120;
  let acc = 0;
  for (let time = 0; time < t; time += dt) {
    scratch.substep(dt, 0, null);
    acc += dt;
    if (acc >= step) { acc = 0; if (cb(time, scratch.pos, scratch.vel) === false) return; }
  }
}
