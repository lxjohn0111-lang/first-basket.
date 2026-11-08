// Venue construction: the 28 x 15 m hardwood court with full markings, both hoops
// (stanchion, glass backboard, rim, net and shot clock) and three indoor venues.
// All static geometry is merged into one solid mesh and one edge batch (roles give
// each part its colour); spectators animate in the shader (First Touch technique).
import * as THREE from 'three';
import { GeoBuilder, tIco, tCone, tFrom } from './geometry.js';
import { R } from './palette.js';
import { COURT, HOOP, LINES } from '../sim/constants.js';

export const VENUES = {
  gym: { name: 'Neighborhood Gym', crowd: 220, loud: 0.5 },
  arena: { name: 'City Arena', crowd: 1700, loud: 1.0 },
  practice: { name: 'Practice Gym', crowd: 0, loud: 0 },
};

function rnd(seed) { let s = seed >>> 0 || 1; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

const LW = 0.05;   // line width
const LY = 0.012;  // line height above the floor

function strip(b, x0, z0, x1, z1, role = R.LINES, w = LW, y = LY) {
  const dx = x1 - x0, dz = z1 - z0;
  const len = Math.hypot(dx, dz);
  b.plane(role, w, len + w * 0.5, (x0 + x1) / 2, y, (z0 + z1) / 2, { ry: Math.atan2(dx, dz) });
}
function arc(b, cx, cz, r, a0, a1, seg = 36, dashed = false) {
  for (let i = 0; i < seg; i++) {
    if (dashed && i % 2) continue;
    const t0 = a0 + (a1 - a0) * (i / seg), t1 = a0 + (a1 - a0) * ((i + 1) / seg);
    strip(b, cx + Math.cos(t0) * r, cz + Math.sin(t0) * r, cx + Math.cos(t1) * r, cz + Math.sin(t1) * r);
  }
}
const circleT = (r, seg) => tFrom(`circle:${r}:${seg}`, () => { const g = new THREE.CircleGeometry(r, seg); g.rotateX(-Math.PI / 2); return g; }, 30, false);
function disc(b, role, cx, cz, r, y, seg = 40) {
  b.add(circleT(r, seg), GeoBuilder.mat(cx, y, cz), role, { noEdges: true });
}

// local frame helper for structures facing the court (from First Touch)
class Frame {
  constructor(b, cx, cz, ry) { this.b = b; this.cx = cx; this.cz = cz; this.ry = ry; this.c = Math.cos(ry); this.s = Math.sin(ry); }
  w(lx, lz) { return [this.cx + lx * this.c + lz * this.s, this.cz - lx * this.s + lz * this.c]; }
  box(role, w, h, d, lx, y, lz, o = {}) { const [x, z] = this.w(lx, lz); this.b.box(role, w, h, d, x, y, z, this.ry + (o.ry || 0), o); }
  cyl(role, r0, r1, h, seg, lx, y, lz, o = {}) { const [x, z] = this.w(lx, lz); this.b.cyl(role, r0, r1, h, seg, x, y, z, o); }
  quad(role, w, h, lx, y, lz, o = {}) { const [x, z] = this.w(lx, lz); this.b.quad(role, w, h, x, y, z, this.ry + Math.PI + (o.ry || 0), o); }
}

// ---------------------------------------------------------------------------
// the floor and its markings
export function buildCourt(b, o = {}) {
  const HL = COURT.HL, HW = COURT.HW;
  const rand = rnd(11);
  // hardwood: boards running the length of the court in three tones
  const ex = HL + (o.apronX || 3.2), ez = HW + (o.apronZ || 2.6);
  const rowW = 0.5;
  for (let z = -ez; z < ez - 1e-6; z += rowW) {
    let x = -ex - rand() * 3;
    let k = Math.floor(rand() * 3);
    while (x < ex) {
      const len = 2.4 + rand() * 2.8;
      const x0 = Math.max(-ex, x), x1 = Math.min(ex, x + len);
      const inside = Math.abs(z + rowW / 2) < HW && true;
      const role = inside ? [R.FLOOR_A, R.FLOOR_B, R.FLOOR_C][k % 3] : R.APRON;
      if (x1 > x0) {
        // boards on the apron outside the lines are stained darker
        if (!inside) b.plane(R.APRON, x1 - x0, rowW, (x0 + x1) / 2, 0, z + rowW / 2);
        else {
          const xa = Math.max(x0, -HL), xb = Math.min(x1, HL);
          if (xb > xa) b.plane(role, xb - xa, rowW, (xa + xb) / 2, 0, z + rowW / 2);
          if (x0 < -HL) b.plane(R.APRON, Math.min(x1, -HL) - x0, rowW, (x0 + Math.min(x1, -HL)) / 2, 0, z + rowW / 2);
          if (x1 > HL) b.plane(R.APRON, x1 - Math.max(x0, HL), rowW, (Math.max(x0, HL) + x1) / 2, 0, z + rowW / 2);
        }
      }
      x += len; k++;
    }
  }
  // boundary, half-court line and centre circle
  const h = LW / 2;
  strip(b, -HL, HW - h, HL, HW - h); strip(b, -HL, -HW + h, HL, -HW + h);
  strip(b, HL - h, -HW, HL - h, HW); strip(b, -HL + h, -HW, -HL + h, HW);
  strip(b, 0, -HW, 0, HW);
  arc(b, 0, 0, LINES.CENTER_R, 0, Math.PI * 2, 48);
  disc(b, R.CENTER, 0, 0, 1.2, 0.006);
  if (o.atlas) b.quad(R.LINES, 1.9, 0.42, 0, 0.014, 0, Math.PI / 2, { rx: -Math.PI / 2, uvRect: o.atlas.word(o.logo || 'COURTSIDE') });
  for (const sx of [1, -1]) {
    const hx = sx * HOOP.X, base = sx * HL, ftx = sx * LINES.FT_X;
    // the key, painted
    b.plane(R.PAINT, HL - LINES.FT_X, LINES.KEY_HW * 2, (base + ftx) / 2, 0.005, 0);
    strip(b, base, LINES.KEY_HW, ftx, LINES.KEY_HW); strip(b, base, -LINES.KEY_HW, ftx, -LINES.KEY_HW);
    strip(b, ftx, -LINES.KEY_HW, ftx, LINES.KEY_HW);
    // lane hash marks
    for (const d of [1.75, 2.6, 3.45, 4.3]) for (const zs of [1, -1]) strip(b, base - sx * d, zs * LINES.KEY_HW, base - sx * d, zs * (LINES.KEY_HW + 0.12));
    // free-throw circle: solid outside the key, dashed inside
    const a0 = sx > 0 ? Math.PI / 2 : -Math.PI / 2;
    arc(b, ftx, 0, LINES.FT_R, a0, a0 + Math.PI, 20);
    arc(b, ftx, 0, LINES.FT_R, a0 + Math.PI, a0 + Math.PI * 2, 20, true);
    // no-charge semicircle
    arc(b, hx, 0, LINES.NC_R, a0, a0 + Math.PI, 18);
    // three-point line: straight from the baseline, then the arc
    for (const zs of [1, -1]) strip(b, base, zs * LINES.THREE_Z, sx * LINES.THREE_X, zs * LINES.THREE_Z);
    const ang = Math.asin(LINES.THREE_Z / LINES.THREE_R);
    const c0 = sx > 0 ? Math.PI - ang : -ang, c1 = sx > 0 ? Math.PI + ang : ang;
    arc(b, hx, 0, LINES.THREE_R, c0, c1, 56);
  }
}

// ---------------------------------------------------------------------------
// a hoop at the +x (sx = 1) or -x (sx = -1) end: stanchion, board, rim, shot clock
const torusT = () => tFrom('rim', () => { const g = new THREE.TorusGeometry(HOOP.R + HOOP.TUBE, HOOP.TUBE * 1.25, 6, 32); g.rotateX(Math.PI / 2); return g; }, 50);

export function buildHoop(b, sx, screens) {
  const bx = sx * HOOP.BOARD_X, T = HOOP.BOARD_T;
  const backX = bx + sx * T;
  // padded base behind the baseline, the pole and the arm out to the board
  const px = sx * (COURT.HL + 1.7);
  b.box(R.PAD, 1.3, 1.1, 1.9, px + sx * 0.3, 0.55, 0);
  b.box(R.POLE, 0.3, 3.1, 0.3, px, 2.65, 0);
  b.box(R.PAD, 0.36, 1.8, 0.36, px, 1.9, 0);
  b.between(R.POLE, 0.1, px, 3.25, 0, backX + sx * 0.15, 3.32, 0, 8);
  b.between(R.POLE, 0.06, px, 2.35, 0, backX + sx * 0.25, 3.15, 0, 6);
  b.box(R.PAD, 0.5, 0.36, 0.3, backX + sx * 0.35, 3.3, 0);
  // the glass board, its frame and the shooter's square
  const by = HOOP.BOARD_Y0 + HOOP.BOARD_H / 2;
  b.box(R.GLASS, T, HOOP.BOARD_H, HOOP.BOARD_W, bx + sx * (T / 2), by, 0);
  const fx = bx - sx * 0.006, fw = 0.05;
  b.box(R.BOARD_FRAME, 0.012, fw, HOOP.BOARD_W, fx, HOOP.BOARD_Y0 + HOOP.BOARD_H - fw / 2, 0, 0, { noEdges: true });
  b.box(R.BOARD_FRAME, 0.012, fw, HOOP.BOARD_W, fx, HOOP.BOARD_Y0 + fw / 2, 0, 0, { noEdges: true });
  for (const zs of [1, -1]) b.box(R.BOARD_FRAME, 0.012, HOOP.BOARD_H, fw, fx, by, zs * (HOOP.BOARD_W / 2 - fw / 2), 0, { noEdges: true });
  const sqy = HOOP.Y + 0.02;
  b.box(R.BOARD_FRAME, 0.012, 0.05, 0.59, fx, sqy + 0.45, 0, 0, { noEdges: true });
  b.box(R.BOARD_FRAME, 0.012, 0.05, 0.59, fx, sqy, 0, 0, { noEdges: true });
  for (const zs of [1, -1]) b.box(R.BOARD_FRAME, 0.012, 0.45, 0.05, fx, sqy + 0.225, zs * 0.27, 0, { noEdges: true });
  // a padded strip along the bottom edge
  b.box(R.PAD, T + 0.04, 0.06, HOOP.BOARD_W + 0.02, bx + sx * (T / 2), HOOP.BOARD_Y0 - 0.02, 0);
  // rim, bracket and net hooks
  const rx = sx * HOOP.X;
  b.add(torusT(), GeoBuilder.mat(rx, HOOP.Y, 0), R.RIM);
  b.box(R.RIM, (HOOP.BOARD_X - HOOP.X - HOOP.R) * 1.0, 0.05, 0.14, sx * (HOOP.X + HOOP.R + (HOOP.BOARD_X - HOOP.X - HOOP.R) / 2), HOOP.Y - 0.02, 0);
  // shot clock unit on top of the board
  b.box(R.METAL, 0.16, 0.36, 0.56, backX - sx * 0.04, HOOP.BOARD_Y0 + HOOP.BOARD_H + 0.22, 0);
  screens.push({ kind: 'shot', x: bx - sx * 0.04 - sx * 0.08, y: HOOP.BOARD_Y0 + HOOP.BOARD_H + 0.22, z: 0, ry: sx > 0 ? -Math.PI / 2 : Math.PI / 2, w: 0.5, h: 0.3 });
}

// nets: diamond mesh lines (edges only), displaced in the shader when the ball passes
export function buildNets() {
  const b = new GeoBuilder();
  const strands = 12, rings = 5;
  for (const sx of [1, -1]) {
    const cx = sx * HOOP.X;
    const pt = (k, j) => {
      const t = k / (rings - 1);
      const r = HOOP.R + 0.004 + (HOOP.NET_R1 - HOOP.R) * t;
      const a = ((j + (k % 2) * 0.5) / strands) * Math.PI * 2;
      return [cx + Math.cos(a) * r, HOOP.Y - 0.01 - HOOP.NET_LEN * t, Math.sin(a) * r];
    };
    // each strand zigzags down: from ring k to the neighbouring knots on ring k + 1
    for (let k = 0; k < rings - 1; k++) {
      for (let j = 0; j < strands; j++) {
        const A = pt(k, j), B = pt(k + 1, j), D = pt(k + 1, k % 2 ? j + 1 : j - 1);
        b.line(A[0], A[1], A[2], B[0], B[1], B[2]);
        b.line(A[0], A[1], A[2], D[0], D[1], D[2]);
      }
    }
  }
  return b.buildEdges();
}

// ---------------------------------------------------------------------------
// spectators and stands (the First Touch builders, re-used)
const CROWD_ROLES = [R.CROWD_1, R.CROWD_1, R.CROWD_1, R.CROWD_2, R.CROWD_3, R.CROWD_4, R.CROWD_1, R.CROWD_3];
const SKINS = [R.SKIN_1, R.SKIN_2, R.SKIN_3];

function person(f, lx, y, lz, rand, seated = true, arms = true) {
  const role = CROWD_ROLES[Math.floor(rand() * CROWD_ROLES.length)];
  const bob = [rand(), 1];
  const h = seated ? 0.46 : 0.62;
  const team = rand() < 0.5 ? R.CROWD_1 : R.CROWD_2;
  f.box(role, 0.42, h, 0.27, lx, y + h / 2, lz, { bob });
  const [x, z] = f.w(lx, lz);
  const skin = SKINS[Math.floor(rand() * 3)];
  f.b.add(tIco(0.135, 0), GeoBuilder.mat(x, y + h + 0.16, z, 0, rand() * 6, 0), skin, { bob });
  if (arms) {
    const up = rand() < 0.16;
    for (const s of [-1, 1]) {
      if (up) f.box(role, 0.1, 0.42, 0.11, lx + s * 0.25, y + h + 0.18, lz, { bob, rz: s * 0.25, detail: true });
      else f.box(role, 0.1, h * 0.8, 0.12, lx + s * 0.26, y + h * 0.56, lz - 0.02, { bob, detail: true });
    }
  }
  const extra = rand();
  if (extra < 0.14) { const [hx, hz] = f.w(lx, lz); f.b.add(tCone(0.12, 0.2, 6), GeoBuilder.mat(hx, y + h + 0.3, hz), team, { bob, detail: true }); }
  else if (extra < 0.24) f.box(R.GOLD, 0.06, 0.5, 0.06, lx + 0.2, y + h + 0.35, lz - 0.1, { bob, detail: true }); // a foam finger / sign
}

function stand(b, o, rand, stats) {
  const f = new Frame(b, o.cx, o.cz, o.ry);
  const rows = o.rows, rd = o.rowDepth || 0.8, rh = o.rowHeight || 0.4, base = o.base || 0.5, len = o.len;
  const z0 = o.z0 || 0;
  const roles = o.roles || [R.STAND_A, R.STAND_B];
  f.box(o.wallRole || R.CONCRETE, len, base, 0.3, 0, base / 2, z0 - 0.15);
  const posts = Math.max(2, Math.round(len / 2.2));
  b.fine(() => {
    for (let i = 0; i <= posts; i++) f.cyl(R.METAL, 0.03, 0.03, 0.9, 5, -len / 2 + (len * i) / posts, base + 0.45, z0 - 0.15);
    const [ax, az] = f.w(-len / 2, z0 - 0.15), [bx, bz] = f.w(len / 2, z0 - 0.15);
    b.between(R.METAL, 0.035, ax, base + 0.9, az, bx, base + 0.9, bz, 6);
  });
  const nAisle = Math.max(1, Math.round(len / 11));
  const aisles = [];
  for (let k = 1; k < nAisle + 1; k++) aisles.push(-len / 2 + (len * k) / (nAisle + 1));
  const aw = 1.0;
  for (let i = 0; i < rows; i++) {
    const y = base + i * rh;
    const tread = roles[Math.floor(i / (o.band || 2)) % roles.length];
    const seatRole = o.seatRole || roles[(Math.floor(i / (o.band || 2)) + 1) % roles.length];
    f.box(tread, len, rh, rd, 0, y + rh / 2, z0 + rd * (i + 0.5));
    const edges = [-len / 2, ...aisles.flatMap((ax) => [ax - aw / 2, ax + aw / 2]), len / 2];
    b.fine(() => {
      for (let k = 0; k < edges.length; k += 2) {
        const a0 = edges[k] + 0.1, a1 = edges[k + 1] - 0.1;
        if (a1 - a0 > 0.4) f.box(seatRole, a1 - a0, 0.28, 0.07, (a0 + a1) / 2, y + rh + 0.14, z0 + rd * (i + 1) - 0.1);
      }
    });
    if (o.density > 0) {
      const n = Math.floor(len / 0.6);
      for (let k = 0; k < n; k++) {
        const lx = -len / 2 + 0.3 + k * 0.6 + (rand() - 0.5) * 0.1;
        if (aisles.some((ax) => Math.abs(lx - ax) < aw / 2 + 0.15)) continue;
        stats.seats.push({ f, lx, y: y + rh, lz: z0 + rd * (i + 0.5) + 0.05, w: o.density, seated: true, row: i + (o.tier || 0) * 20 });
      }
    }
  }
  const top = base + rows * rh, back = z0 + rd * rows;
  f.box(o.wallRole || R.CONCRETE, len + 0.4, top + 1.2, 0.3, 0, (top + 1.2) / 2, back + 0.15);
  for (const sx of [-1, 1]) f.box(o.wallRole || R.CONCRETE, 0.3, top + 0.5, back - z0, sx * (len / 2 + 0.15), (top + 0.5) / 2, z0 + (back - z0) / 2);
  return { top, back };
}

function bench(b, x, z, ry, role) {
  const f = new Frame(b, x, z, ry);
  f.box(R.METAL, 6, 0.08, 0.5, 0, 0.45, 0);
  b.fine(() => {
    for (let i = 0; i < 8; i++) {
      const lx = -2.6 + i * 0.75;
      f.box(role, 0.5, 0.08, 0.46, lx, 0.5, 0);
      f.box(role, 0.5, 0.5, 0.06, lx, 0.78, 0.24, { rx: -0.1 });
    }
  });
  for (const lx of [-2.8, 2.8]) f.box(R.METAL, 0.06, 0.45, 0.4, lx, 0.22, 0);
  // towels and water bottles
  for (let i = 0; i < 4; i++) f.box(R.BAND, 0.3, 0.03, 0.2, -2 + i * 1.3, 0.56, 0.05, { noEdges: true });
}

function scorersTable(b, atlas, x, z, words) {
  const f = new Frame(b, x, z, 0);
  f.box(R.TABLE, 8, 0.8, 0.8, 0, 0.4, 0);
  f.box(R.SCREEN, 8.1, 0.5, 0.06, 0, 0.45, -0.42);
  words.forEach((w, i) => f.quad(i % 2 ? R.LAMP : R.GOLD, 2.4, 0.32, -2.7 + i * 2.7, 0.45, -0.46, { ry: Math.PI, uvRect: atlas.word(w) }));
  for (let i = 0; i < 5; i++) f.box(R.CHAIR, 0.5, 0.9, 0.5, -3 + i * 1.5, 0.45, 0.75);
}

// LED advertising boards around the court, words facing the floor
function ledBoards(b, atlas, words, xEdge, zEdge, skipZ = 0) {
  let wi = 0;
  const seg = (fixed, from, to, alongZ, faceRy) => {
    const len = Math.abs(to - from);
    const n = Math.max(1, Math.round(len / 6));
    const l = len / n;
    for (let i = 0; i < n; i++) {
      const c = Math.min(from, to) + l * (i + 0.5);
      const cx = alongZ ? fixed : c, cz = alongZ ? c : fixed;
      if (!alongZ && Math.abs(cx) < skipZ) continue;
      b.box(R.SCREEN, l - 0.08, 0.8, 0.2, cx, 0.4, cz, alongZ ? Math.PI / 2 : 0);
      const off = 0.12;
      const px = cx + (alongZ ? -Math.sign(fixed) * off : 0), pz = cz + (alongZ ? 0 : -Math.sign(fixed) * off);
      b.quad([R.LAMP, R.GOLD, R.BANNER_HOME][wi % 3], Math.min(l - 0.5, 4.6), 0.5, px, 0.42, pz, faceRy, { uvRect: atlas.word(words[wi++ % words.length]) });
    }
  };
  seg(zEdge, -xEdge, xEdge, false, Math.PI);
  seg(xEdge, -zEdge + 0.5, zEdge - 0.5, true, -Math.PI / 2);
  seg(-xEdge, -zEdge + 0.5, zEdge - 0.5, true, Math.PI / 2);
}

function banner(b, x, y, z, ry, w, h, role, atlas, word) {
  const f = new Frame(b, x, z, ry);
  f.box(role, w, h, 0.05, 0, y, 0);
  f.box(R.GOLD, w, 0.12, 0.07, 0, y - h / 2 + 0.06, 0);
  if (word) f.quad(R.BAND, w * 0.85, h * 0.25, 0, y + h * 0.15, -0.04, { ry: Math.PI, uvRect: atlas.word(word) });
}

// a big rectangular room: walls, high windows, wall pads, a ceiling with trusses and lights
function room(b, hx, hz, h, o = {}) {
  const t = 0.4;
  b.box(R.WALL_A, hx * 2 + t * 2, h, t, 0, h / 2, hz + t / 2);
  b.box(R.WALL_A, hx * 2 + t * 2, h, t, 0, h / 2, -hz - t / 2);
  b.box(R.WALL_B, t, h, hz * 2, hx + t / 2, h / 2, 0);
  b.box(R.WALL_B, t, h, hz * 2, -hx - t / 2, h / 2, 0);
  // lower walls padded / painted in a band
  b.box(R.BRICK, hx * 2, o.dado || 1.6, 0.06, 0, (o.dado || 1.6) / 2, hz - 0.03, 0, { noEdges: false });
  b.box(R.BRICK, hx * 2, o.dado || 1.6, 0.06, 0, (o.dado || 1.6) / 2, -hz + 0.03);
  b.box(R.BRICK, 0.06, o.dado || 1.6, hz * 2, hx - 0.03, (o.dado || 1.6) / 2, 0);
  b.box(R.BRICK, 0.06, o.dado || 1.6, hz * 2, -hx + 0.03, (o.dado || 1.6) / 2, 0);
  b.box(R.CEIL, hx * 2 + t * 2, 0.3, hz * 2 + t * 2, 0, h + 0.15, 0);
  // windows along the long walls, high up
  if (o.windows) {
    b.fine(() => {
      for (let i = 0; i < o.windows; i++) {
        const x = -hx + (hx * 2 * (i + 0.5)) / o.windows;
        for (const zs of [1, -1]) {
          b.box(R.WINDOW, 2.6, 1.6, 0.08, x, h - 1.6, zs * (hz - 0.02));
          b.box(R.METAL, 0.06, 1.6, 0.1, x, h - 1.6, zs * (hz - 0.04));
          b.box(R.METAL, 2.6, 0.06, 0.1, x, h - 1.6, zs * (hz - 0.04));
        }
      }
    });
  }
  // roof trusses across the room and lamp rows
  const nT = Math.round(hx * 2 / 4);
  b.fine(() => {
    for (let i = 0; i <= nT; i++) {
      const x = -hx + (hx * 2 * i) / nT;
      b.between(R.METAL, 0.06, x, h - 0.05, -hz, x, h - 0.05, hz, 5);
      b.between(R.METAL, 0.04, x, h - 1.0, -hz * 0.8, x, h - 1.0, hz * 0.8, 5);
      for (let k = 0; k < 8; k++) {
        const z0 = -hz * 0.8 + (hz * 1.6 * k) / 8, z1 = -hz * 0.8 + (hz * 1.6 * (k + 1)) / 8;
        b.line(x, h - 1.0, z0, x, h - 0.05, z1);
      }
    }
  });
  const lamps = o.lamps || [5, 3];
  for (let i = 0; i < lamps[0]; i++) for (let k = 0; k < lamps[1]; k++) {
    const x = -hx * 0.7 + (hx * 1.4 * i) / Math.max(1, lamps[0] - 1), z = -hz * 0.55 + (hz * 1.1 * k) / Math.max(1, lamps[1] - 1);
    b.cyl(R.METAL, 0.45, 0.7, 0.5, 10, x, h - 1.4, z);
    b.cyl(R.LAMP, 0.6, 0.6, 0.06, 10, x, h - 1.66, z);
    b.line(x, h - 1.15, z, x, h - 0.05, z);
  }
}

// a wall-mounted (or hung) scoreboard
function scoreboard(b, x, y, z, ry, w, h, screens) {
  const f = new Frame(b, x, z, ry);
  f.box(R.METAL, w + 0.6, h + 0.6, 0.4, 0, y, 0.25);
  f.box(R.BANNER_HOME, w + 0.7, 0.18, 0.45, 0, y + h / 2 + 0.25, 0.25);
  screens.push({ kind: 'score', x, y, z, ry, w, h });
}

// ---------------------------------------------------------------------------
export function buildVenue(type, ctx) {
  const { atlas, quality = 'high', homeName = 'HOME', awayName = 'AWAY', seed = 7, crowd = 1 } = ctx;
  const rand = rnd(seed * 31 + type.length);
  // crowd: a thinner crowd on phones (the stands are the bulk of the triangles)
  const density = (quality === 'low' ? 0.35 : quality === 'medium' ? 0.65 : 1) * crowd;
  const b = new GeoBuilder({ bob: true, atlas: true });
  const bc = new GeoBuilder({ atlas: true });
  const stats = { seats: [], people: 0 };
  const screens = [];
  const v = { type };
  buildCourt(b, { atlas, logo: ctx.logo || 'COURTSIDE' });
  buildHoop(bc, 1, screens);
  buildHoop(bc, -1, screens);
  const words = ['COURTSIDE', homeName.toUpperCase(), 'GAME DAY', awayName.toUpperCase(), 'DEFENSE!', 'FIRST PERSON HOOPS'];
  if (type === 'gym' || type === 'practice') {
    const hx = 20, hz = 14.5, h = 9;
    room(b, hx, hz, h, { windows: 6, lamps: [5, 3], dado: 1.8 });
    // wall pads behind the baselines
    for (const sx of [1, -1]) for (let i = -3; i <= 3; i++) b.box(R.PAD, 0.12, 1.8, 1.9, sx * (hx - 0.1), 0.9, i * 2.05);
    // championship banners and the team banners on the end walls
    for (const sx of [1, -1]) {
      for (let i = 0; i < 4; i++) banner(b, sx * (hx - 0.25), 6.6, -4.5 + i * 3, sx > 0 ? -Math.PI / 2 : Math.PI / 2, 1.6, 2.4, i % 2 ? R.BANNER_HOME : R.BANNER_AWAY, atlas, i % 2 ? homeName.toUpperCase().slice(0, 12) : 'CHAMPIONS');
    }
    scoreboard(b, hx - 0.3, 5.2, 0, -Math.PI / 2, 4.4, 1.7, screens);
    scoreboard(b, -hx + 0.3, 5.2, 0, Math.PI / 2, 4.4, 1.7, screens);
    if (type === 'gym') {
      // pull-out wooden bleachers along both sides
      for (const zs of [1, -1]) stand(b, { cx: 0, cz: zs * (COURT.HW + 2.6), ry: zs > 0 ? 0 : Math.PI, len: 26, rows: 7, rowDepth: 0.72, rowHeight: 0.36, base: 0.42, density, roles: [R.WOOD, R.STAND_B], seatRole: R.WOOD, wallRole: R.WALL_B }, rand, stats);
      bench(bc, -6, -(COURT.HW + 1.35), Math.PI, R.BANNER_HOME);
      bench(bc, 6, -(COURT.HW + 1.35), Math.PI, R.BANNER_AWAY);
    } else {
      // practice: ball racks and cones, folded bleachers
      for (const zs of [1, -1]) b.box(R.WOOD, 26, 2.4, 0.9, 0, 1.2, zs * (hz - 0.6));
      for (let i = 0; i < 2; i++) {
        const x = 2 + i * 4;
        b.box(R.METAL, 1.4, 0.06, 0.45, x, 0.7, -(COURT.HW + 1.6)); b.box(R.METAL, 1.4, 0.06, 0.45, x, 0.35, -(COURT.HW + 1.6));
        for (let k = 0; k < 5; k++) { b.sphere(R.BALL, 0.12, x - 0.52 + k * 0.26, 0.85, -(COURT.HW + 1.6), { ws: 8, hs: 6 }); b.sphere(R.BALL, 0.12, x - 0.52 + k * 0.26, 0.5, -(COURT.HW + 1.6), { ws: 8, hs: 6 }); }
      }
      for (let i = 0; i < 6; i++) b.cone(R.CONE, 0.12, 0.3, 10, -6 + i * 1.2, 0.15, COURT.HW + 1.2);
    }
  } else {
    // the arena: a bowl of stands, courtside seats, LED boards and a centre-hung scoreboard
    const hx = 30, hz = 25, h = 22;
    room(b, hx, hz, h, { windows: 0, lamps: [6, 4], dado: 3 });
    ledBoards(b, atlas, words, COURT.HL + 2.3, COURT.HW + 2.2, 7.5);
    const stc = { rows: 12, rowDepth: 0.85, rowHeight: 0.45, base: 1.2, density: density, roles: [R.STAND_A, R.STAND_C], seatRole: R.SEAT };
    for (const zs of [1, -1]) stand(b, { ...stc, cx: 0, cz: zs * (COURT.HW + 4.4), ry: zs > 0 ? 0 : Math.PI, len: 34 }, rand, stats);
    for (const sx of [1, -1]) stand(b, { ...stc, cx: sx * (COURT.HL + 4.8), cz: 0, ry: sx > 0 ? Math.PI / 2 : -Math.PI / 2, len: 24 }, rand, stats);
    const up = { ...stc, rows: 10, base: 7.4, z0: 11, tier: 1, density: 0.85 * density, roles: [R.STAND_B, R.STAND_C], wallRole: R.WALL_B };
    for (const zs of [1, -1]) stand(b, { ...up, cx: 0, cz: zs * (COURT.HW + 4.4), ry: zs > 0 ? 0 : Math.PI, len: 44 }, rand, stats);
    for (const sx of [1, -1]) stand(b, { ...up, cx: sx * (COURT.HL + 4.8), cz: 0, ry: sx > 0 ? Math.PI / 2 : -Math.PI / 2, len: 32 }, rand, stats);
    // courtside chairs (with fans) and benches
    const cs = new Frame(b, 0, COURT.HW + 1.5, 0);
    for (let i = 0; i < 26; i++) {
      const lx = -12.5 + i;
      cs.box(R.CHAIR, 0.5, 0.45, 0.5, lx, 0.22, 0);
      if (rand() < 0.75 * density) { person(cs, lx, 0.45, 0, rand, true, quality === 'high'); stats.people++; }
    }
    bench(bc, -6, -(COURT.HW + 1.6), Math.PI, R.BANNER_HOME);
    bench(bc, 6, -(COURT.HW + 1.6), Math.PI, R.BANNER_AWAY);
    scorersTable(bc, atlas, 0, -(COURT.HW + 1.9), ['COURTSIDE', homeName.toUpperCase(), awayName.toUpperCase()]);
    // centre-hung scoreboard: four faces
    const sy = 12.5, sw = 6.4, sh = 3.6;
    b.box(R.METAL, sw + 0.6, sh + 0.8, sw + 0.6, 0, sy, 0);
    b.box(R.BANNER_HOME, sw + 0.8, 0.4, sw + 0.8, 0, sy + sh / 2 + 0.55, 0);
    b.box(R.METAL, 3, 1.4, 3, 0, sy - sh / 2 - 1, 0);
    for (const [x, z, ry] of [[0, sw / 2 + 0.31, 0], [0, -sw / 2 - 0.31, Math.PI], [sw / 2 + 0.31, 0, Math.PI / 2], [-sw / 2 - 0.31, 0, -Math.PI / 2]]) screens.push({ kind: 'score', x, y: sy, z, ry: ry + Math.PI, w: sw, h: sh });
    for (const [x, z] of [[-3, -3], [3, -3], [3, 3], [-3, 3]]) b.line(x, sy + sh / 2 + 0.75, z, x * 2, h, z * 2);
    // hanging banners
    for (let i = 0; i < 6; i++) banner(b, -12.5 + i * 5, 17, hz - 0.4, Math.PI, 2, 3.4, i % 2 ? R.BANNER_HOME : R.GOLD, atlas, i % 2 ? homeName.toUpperCase().slice(0, 12) : 'CHAMPIONS');
  }
  // fill the stands to the venue's crowd budget
  const budget = Math.round(VENUES[type].crowd * density);
  if (budget > 0 && stats.seats.length) {
    const seats = stats.seats;
    const wsum = seats.reduce((a, q) => a + q.w, 0);
    const p = Math.min(1, budget / wsum);
    for (const q of seats) if (rand() < q.w * p) { person(q.f, q.lx, q.y, q.lz, rand, q.seated, quality === 'high' && q.row < 5); stats.people++; }
  }
  v.people = stats.people;
  v.solid = b.buildSolid();
  v.edges = b.buildEdges();
  v.casterSolid = bc.buildSolid();
  v.casterEdges = bc.buildEdges();
  v.screens = screens;
  v.edgeCount = b.edgeCount;
  v.vertCount = b.vcount;
  return v;
}

