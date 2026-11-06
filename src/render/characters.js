// Player rig geometry. Every player (and the ball) is merged into ONE mesh and ONE
// edge batch; each vertex belongs to a rigid part whose world matrix is fetched from
// a float texture updated every frame by the animator (the First Touch technique).
// Basketball players are about 2 m tall: tank-top jerseys with front and back
// numbers, long shorts with side stripes, short socks and high-top sneakers.
// The local player's arms and the ball in their hands are also built into a small
// separate "view-model" batch for the first-person view.
import * as THREE from 'three';
import { GeoBuilder, tSphere, tCyl, tCone, tQuad, tBox, tLoft, tIco, tFrom } from './geometry.js';
import { R } from './palette.js';
import { makeSolidMaterial, makeEdgeMaterial, makePartsDepthMaterial, SU } from './shaders.js';
import { BALL_R } from '../sim/constants.js';

export const P = { PELVIS: 0, TORSO: 1, HEAD: 2, UARM_L: 3, UARM_R: 4, FARM_L: 5, FARM_R: 6, THIGH_L: 7, THIGH_R: 8, SHIN_L: 9, SHIN_R: 10, BOOT_L: 11, BOOT_R: 12 };
export const PER = 13;
// body scale (players are ~10% taller than First Touch's footballers) and arm length
export const K = 1.1, ARM = 1.07;
export const DIM = {
  thigh: 0.44 * K, shin: 0.43 * K, ankle: 0.08 * K, upper: 0.29 * K * ARM, fore: 0.27 * K * ARM,
  hipW: 0.095 * K, shoulderW: 0.19 * K, torsoH: 0.5 * K, waist: 0.07 * K, neck: 0.58 * K, shoulderY: 0.45 * K,
};

const SK = new THREE.Matrix4().makeScale(K, K, K);
const SA = new THREE.Matrix4().makeScale(K, K * ARM, K);
const M = (x, y, z, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) => SK.clone().multiply(GeoBuilder.mat(x, y, z, rx, ry, rz, sx, sy, sz));
const MA = (x, y, z, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) => SA.clone().multiply(GeoBuilder.mat(x, y, z, rx, ry, rz, sx, sy, sz));

const DETAIL = {
  high: { body: 16, limb: 11, head: [16, 12], small: [8, 6], joint: [11, 8], sole: 11, laces: true },
  medium: { body: 10, limb: 8, head: [12, 9], small: [6, 4], joint: [7, 5], sole: 7, laces: true },
  low: { body: 8, limb: 6, head: [10, 7], small: [5, 4], joint: [6, 4], sole: 6, laces: false },
};

// sculpted shapes as lofted ellipses: [y, half width, half depth, forward offset]
const TORSO = [[0, 0.165, 0.112, 0], [0.1, 0.176, 0.118, 0.004], [0.22, 0.198, 0.126, 0.01], [0.34, 0.222, 0.132, 0.012], [0.44, 0.232, 0.122, 0.002], [0.5, 0.198, 0.106, -0.004], [0.545, 0.1, 0.07, 0]];
const PELVIS = [[-0.13, 0.162, 0.118, 0], [-0.03, 0.178, 0.126, 0.002], [0.08, 0.17, 0.118, 0]];
const WAISTBAND = [[0.04, 0.176, 0.124, 0], [0.085, 0.174, 0.122, 0]];
const SHORTS_LEG = [[-0.34, 0.094, 0.096, 0.004], [-0.15, 0.1, 0.102, 0.004], [-0.02, 0.098, 0.1, 0.002], [0.03, 0.097, 0.099, 0]];
const THIGH = [[-0.455, 0.045, 0.047, 0.004], [-0.4, 0.05, 0.053, 0.004], [-0.3, 0.056, 0.058, 0.004], [-0.14, 0.064, 0.069, 0.008], [0, 0.066, 0.067, 0.004]];
const CALF = [[-0.43, 0.038, 0.04, 0.002], [-0.3, 0.044, 0.046, 0], [-0.14, 0.054, 0.06, -0.009], [-0.04, 0.05, 0.054, -0.003], [0, 0.046, 0.05, 0]];
const SOCK = [[-0.44, 0.042, 0.044, 0.002], [-0.34, 0.046, 0.048, 0]];
const UPPER = [[-0.27, 0.04, 0.04, 0], [-0.14, 0.05, 0.052, 0], [-0.03, 0.058, 0.058, 0], [0.02, 0.056, 0.056, 0]];
const FORE = [[-0.255, 0.03, 0.027, 0], [-0.08, 0.043, 0.042, 0], [0, 0.04, 0.041, 0]];
const ARMHOLE = [[-0.02, 0.064, 0.064, 0], [0.012, 0.063, 0.063, 0]];
// sneakers run along +z (heel to toe): [z, half width, half height, -(centre height)]
const SHOE = [[-0.062, 0.034, 0.05, 0.03], [-0.045, 0.047, 0.062, 0.03], [0.02, 0.052, 0.058, 0.033], [0.1, 0.056, 0.042, 0.047], [0.17, 0.05, 0.03, 0.058], [0.212, 0.03, 0.02, 0.066]];
const SOLE = [[-0.066, 0.04, 0.012, 0.082], [-0.04, 0.051, 0.012, 0.083], [0.1, 0.06, 0.012, 0.083], [0.175, 0.055, 0.012, 0.083], [0.218, 0.033, 0.011, 0.081]];

const HAIRS = [R.HAIR_1, R.HAIR_2, R.HAIR_1];
const SKINS = [R.SKIN_1, R.SKIN_2, R.SKIN_3];
const HAIR_STYLES = ['crop', 'afro', 'buzz', 'headband', 'braids', 'bald'];

function roleSet(p) {
  const t = p.team;
  return {
    shirt: t === 0 ? R.JERSEY_0 : R.JERSEY_1,
    shorts: t === 0 ? R.SHORTS_0 : R.SHORTS_1,
    trim: t === 0 ? R.TRIM_0 : R.TRIM_1,
    num: t === 0 ? R.NUM_0 : R.NUM_1,
    skin: p.isHuman ? R.SKIN_H : SKINS[(p.id * 7) % 3],
    hair: p.isHuman ? R.HAIR_H : HAIRS[(p.id * 5) % 3],
    shoe: p.isHuman ? R.SHOE_H : R.SHOE,
  };
}

function loftRoles(t, nLevels, seg, fn) {
  const Pp = t.positions, roles = new Array(Pp.length / 3);
  const side = (nLevels - 1) * seg * 2;
  for (let k = 0; k < Pp.length / 9; k++) {
    const r = k < side ? fn(Math.floor((k % (2 * seg)) / 2), Math.floor(k / (2 * seg))) : fn(-1, -1);
    roles[k * 3] = roles[k * 3 + 1] = roles[k * 3 + 2] = r;
  }
  return roles;
}

function torsoSurface(y, x, back) {
  let i = 0;
  while (i < TORSO.length - 2 && TORSO[i + 1][0] < y) i++;
  const a = TORSO[i], b = TORSO[i + 1], t = Math.min(1, Math.max(0, (y - a[0]) / (b[0] - a[0])));
  const rx = a[1] + (b[1] - a[1]) * t, rz = a[2] + (b[2] - a[2]) * t, dz = a[3] + (b[3] - a[3]) * t;
  const u = Math.min(0.97, Math.abs(x) / rx);
  const zz = rz * Math.sqrt(1 - u * u) * (back ? -1 : 1);
  return { z: dz + zz, ry: Math.atan2(x / (rx * rx), zz / (rz * rz)) };
}

function addHead(b, r, part, D, style) {
  const [hw, hh] = D.head, [sw, sh] = D.small;
  b.add(tSphere(0.113, hw, hh), M(0, 0.14, -0.004, 0, 0, 0, 0.93, 1.03, 1), r.skin, part);
  b.add(tSphere(0.083, Math.round(hw * 0.75), Math.round(hh * 0.75)), M(0, 0.078, 0.022, 0, 0, 0, 0.97, 0.86, 1), r.skin, part);
  for (const s of [-1, 1]) {
    b.add(tSphere(0.027, sw, sh), M(s * 0.106, 0.125, -0.004, 0, 0, 0, 0.45, 1.15, 0.8), r.skin, part);
    b.add(tSphere(0.0135, sw, sh), M(s * 0.041, 0.142, 0.101, 0, 0, 0, 1.25, 1, 0.55), R.EYE, { ...part, noEdges: true });
    b.add(tBox(0.04, 0.01, 0.012), M(s * 0.041, 0.166, 0.1, 0, 0, -s * 0.12), r.hair, { ...part, creaseOnly: true });
  }
  b.add(tCone(0.019, 0.042, 6), M(0, 0.118, 0.11, Math.PI / 2 + 0.25), r.skin, part);
  b.add(tBox(0.036, 0.005, 0.006), M(0, 0.071, 0.103), R.EYE, { ...part, noEdges: true });
  const cap = (rad, len, tilt, y = 0.145, z = -0.012) => b.add(tSphere(rad, hw, Math.max(4, Math.round(hh * 0.5)), Math.PI * 2, Math.PI * len), M(0, y, z, tilt), r.hair, part);
  switch (style) {
    case 'buzz': cap(0.1165, 0.37, -0.2); break;
    case 'bald': break;
    case 'afro':
      b.add(tSphere(0.14, hw, hh), M(0, 0.19, -0.03, 0, 0, 0, 1.05, 0.82, 1.02), r.hair, part);
      break;
    case 'headband':
      cap(0.119, 0.42, -0.25);
      b.add(tLoft('band', [[0.155, 0.112, 0.118, -0.004], [0.19, 0.108, 0.114, -0.006]], D.limb, { caps: [false, false] }), M(0, 0, 0), R.BAND, part);
      break;
    case 'braids':
      cap(0.118, 0.44, -0.25);
      for (let k = -3; k <= 3; k++) b.add(tCyl(0.012, 0.012, 0.2, 5), M(k * 0.03, 0.2, -0.02, 0.15, 0, 0, 1, 1, 1), r.hair, { ...part, creaseOnly: true });
      break;
    default: cap(0.12, 0.43, -0.25);
  }
}

// one arm (shoulder, upper arm, forearm and hand) on parts ua / fa
function addArm(b, r, ua, fa, s, D) {
  const [sw, sh] = D.small;
  // bare shoulder and the jersey's armhole edge
  b.add(tSphere(0.064, D.limb, Math.round(D.limb * 0.7)), MA(0, -0.005, 0), r.skin, ua);
  b.add(tLoft('armhole', ARMHOLE, D.limb, { caps: [false, false] }), MA(0, 0, 0, 0, 0, s * 0.35), r.trim, ua);
  b.add(tLoft('upper', UPPER, D.limb), MA(0, 0, 0), r.skin, ua);
  b.add(tSphere(0.041, D.joint[0], D.joint[1]), MA(0, 0, 0), r.skin, { ...fa, noEdges: true });
  b.add(tLoft('fore', FORE, D.limb), MA(0, 0, 0), r.skin, fa);
  // hand: palm, fingers and thumb
  b.add(tSphere(0.05, sw + 2, sh + 1), MA(0, -0.29, 0.004, 0, 0, 0, 0.74, 1.15, 0.5), r.skin, fa);
  b.add(tSphere(0.021, sw, sh), MA(-s * 0.018, -0.27, 0.03, 0.3, 0, 0, 0.9, 1.5, 0.9), r.skin, fa);
}

function addCharacter(b, p, base, atlas, D, kit) {
  const r = roleSet(p);
  const part = (k) => ({ part: base + k });
  const n = D.body, nl = TORSO.length;
  // shorts: hips, waistband and long legs with side stripes
  b.add(tLoft('pelvis', PELVIS, D.body), M(0, 0, 0), r.shorts, part(P.PELVIS));
  b.add(tLoft('waistband', WAISTBAND, D.body, { caps: [false, false] }), M(0, 0, 0), r.trim, part(P.PELVIS));
  // jersey: sculpted tank top with side panels in the trim colour
  const torso = tLoft('torso', TORSO, D.body);
  const side = (i) => { const u = (i + 0.5) / n; return Math.abs(u - 0.25) < 0.045 || Math.abs(u - 0.75) < 0.045; };
  const roles = kit && kit.pattern === 'stripes'
    ? loftRoles(torso, nl, n, (i) => (i >= 0 && i % 2 === 1 ? r.trim : r.shirt))
    : loftRoles(torso, nl, n, (i, l) => (i >= 0 && side(i) && l < 5 ? r.trim : r.shirt));
  b.add(torso, M(0, 0, 0), r.shirt, { ...part(P.TORSO), roles });
  // V-neck trim and neck
  b.add(tLoft('collar', [[0.505, 0.09, 0.07, 0.004], [0.548, 0.078, 0.06, 0.002]], D.body, { caps: [false, false] }), M(0, 0, 0), r.trim, part(P.TORSO));
  b.add(tCyl(0.05, 0.056, 0.12, D.limb), M(0, 0.575, 0), r.skin, part(P.TORSO));
  // numbers: big on the back (with the name above), smaller on the front with the team name
  const num = String(p.number ?? 0);
  const dw = num.length > 1 ? 0.13 : 0.17;
  for (let i = 0; i < num.length; i++) {
    const x = (i - (num.length - 1) / 2) * dw * 0.95;
    const sf = torsoSurface(0.27, x, true);
    b.add(tQuad(dw, 0.22), M(x, 0.27, sf.z - 0.005, 0, sf.ry, 0), r.num, { ...part(P.TORSO), uvRect: atlas.digit(+num[i]), noEdges: true });
    const ff = torsoSurface(0.26, x * 0.7, false);
    b.add(tQuad(dw * 0.7, 0.15), M(x * 0.7, 0.26, ff.z + 0.005, 0, ff.ry, 0), r.num, { ...part(P.TORSO), uvRect: atlas.digit(+num[i]), noEdges: true });
  }
  const surname = (p.name || '').split(' ').pop().toUpperCase().slice(0, 10);
  if (surname) { const sf = torsoSurface(0.43, 0, true); b.add(tQuad(0.26, 0.045), M(0, 0.43, sf.z - 0.006, 0, sf.ry, 0), r.num, { ...part(P.TORSO), uvRect: atlas.word(surname), noEdges: true }); }
  if (kit && kit.word) { const ff = torsoSurface(0.385, 0, false); b.add(tQuad(0.28, 0.06), M(0, 0.385, ff.z + 0.006, 0, ff.ry, 0), r.num, { ...part(P.TORSO), uvRect: atlas.word(kit.word), noEdges: true }); }
  // head
  const style = p.isHuman ? HAIR_STYLES[(p.look && p.look.style) || 0] : HAIR_STYLES[(p.id * 5 + (p.number || 0) * 3) % HAIR_STYLES.length];
  addHead(b, r, part(P.HEAD), D, style);
  addArm(b, r, part(P.UARM_L), part(P.FARM_L), 1, D);
  addArm(b, r, part(P.UARM_R), part(P.FARM_R), -1, D);
  // legs: long shorts legs with stripes, thighs, calves, socks, sneakers
  for (const [th, shn, bt, s] of [[P.THIGH_L, P.SHIN_L, P.BOOT_L, 1], [P.THIGH_R, P.SHIN_R, P.BOOT_R, -1]]) {
    b.add(tLoft('shortsleg', SHORTS_LEG, D.limb, { caps: [false, false] }), M(0, 0, 0), r.shorts, part(th));
    b.add(tBox(0.016, 0.33, 0.03), M(s * 0.097, -0.16, 0), r.trim, { ...part(th), creaseOnly: true });
    b.add(tLoft('thigh', THIGH, D.limb), M(0, 0, 0), r.skin, part(th));
    b.add(tSphere(0.047, D.joint[0], D.joint[1]), M(0, -0.005, 0.006), r.skin, { ...part(shn), noEdges: true });
    b.add(tLoft('calf', CALF, D.limb), M(0, 0, 0), r.skin, part(shn));
    b.add(tLoft('sock', SOCK, D.limb, { caps: [false, false] }), M(0, 0, 0), R.SOCK, part(shn));
    b.add(tLoft('shoe', SHOE, D.limb, { axis: 'z' }), M(0, 0, 0), r.shoe, part(bt));
    b.add(tLoft('sole', SOLE, D.sole, { axis: 'z' }), M(0, 0, 0), R.SOLE, { ...part(bt), creaseOnly: true });
    if (D.laces) {
      for (let k = 0; k < 3; k++) b.add(tBox(0.036, 0.004, 0.008), M(0, -0.002 - k * 0.008, 0.03 + k * 0.03, -0.25), R.SOLE, { ...part(bt), noEdges: true });
      b.add(tBox(0.004, 0.02, 0.09), M(s * 0.053, -0.045, 0.05, -0.12), R.SOLE, { ...part(bt), noEdges: true });
    }
  }
}

// the basketball: orange sphere with ink seams (two great circles and two curved panels)
export function addBall(b, row) {
  const t = tFrom('bball', () => new THREE.IcosahedronGeometry(BALL_R, 3), 70);
  b.add(t, new THREE.Matrix4(), R.BALL, { part: row });
  const r = BALL_R * 1.004, N = 40;
  const ring = (fn) => {
    let prev = fn(0);
    for (let i = 1; i <= N; i++) { const c = fn((i / N) * Math.PI * 2); b.line(prev[0], prev[1], prev[2], c[0], c[1], c[2], row); prev = c; }
  };
  ring((a) => [Math.cos(a) * r, 0, Math.sin(a) * r]);
  ring((a) => [0, Math.cos(a) * r, Math.sin(a) * r]);
  // the two curved seams: small circles around the +x and -x axes
  for (const sx of [1, -1]) {
    const ang = 0.92;
    ring((a) => [sx * Math.cos(ang) * r, Math.sin(ang) * Math.cos(a) * r, Math.sin(ang) * Math.sin(a) * r]);
  }
}

export class CharacterBatch {
  constructor(players, atlas, o = {}) {
    this.players = players;
    this.rows = players.length * PER + 1;
    this.ballRow = players.length * PER;
    const h = Math.max(1, this.rows);
    this.data = new Float32Array(4 * 4 * h);
    this.texture = new THREE.DataTexture(this.data, 4, h, THREE.RGBAFormat, THREE.FloatType);
    this.texture.minFilter = THREE.NearestFilter;
    this.texture.magFilter = THREE.NearestFilter;
    this.texture.needsUpdate = true;
    SU.uParts.value = this.texture;
    const b = new GeoBuilder({ parts: true, atlas: true });
    const D = DETAIL[o.quality] || DETAIL.high;
    const kits = o.kits || [];
    players.forEach((p, i) => addCharacter(b, p, i * PER, atlas, D, kits[p.team]));
    addBall(b, this.ballRow);
    this.solidGeo = b.buildSolid();
    this.edgeGeo = b.buildEdges();
    this.mesh = new THREE.Mesh(this.solidGeo, CharacterBatch.solidMaterial());
    this.mesh.frustumCulled = false;
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.customDepthMaterial = CharacterBatch.depthMaterial();
    this.edges = new THREE.Mesh(this.edgeGeo, CharacterBatch.edgeMaterial());
    this.edges.frustumCulled = false;
    this.edges.renderOrder = 1;
    for (let r = 0; r < this.rows; r++) this.setIdentity(r);
  }

  static solidMaterial() { return (CharacterBatch._sm ||= makeSolidMaterial({ parts: true, atlas: true })); }
  static edgeMaterial() { return (CharacterBatch._em ||= makeEdgeMaterial({ parts: true, widthScale: 0.75 })); }
  static depthMaterial() { return (CharacterBatch._dm ||= makePartsDepthMaterial()); }

  setIdentity(row) { const o = row * 16; this.data.fill(0, o, o + 16); this.data[o] = this.data[o + 5] = this.data[o + 10] = this.data[o + 15] = 1; }
  setMatrix(row, m) { this.data.set(m.elements, row * 16); }
  hide(row) { const o = row * 16; this.data.fill(0, o, o + 16); this.data[o] = this.data[o + 5] = this.data[o + 10] = 0.0001; this.data[o + 13] = -50; this.data[o + 15] = 1; }
  commit() { this.texture.needsUpdate = true; }

  dispose() { this.solidGeo.dispose(); this.edgeGeo.dispose(); this.texture.dispose(); }
}

// First-person view model: the local player's two arms and the ball, drawn in a
// second pass over the scene (depth cleared) with their own parts texture.
export const VM = { UARM_L: 0, UARM_R: 1, FARM_L: 2, FARM_R: 3, BALL: 4 };
export class ViewModel {
  constructor(player, o = {}) {
    this.rows = 5;
    this.data = new Float32Array(16 * this.rows);
    this.texture = new THREE.DataTexture(this.data, 4, this.rows, THREE.RGBAFormat, THREE.FloatType);
    this.texture.minFilter = THREE.NearestFilter;
    this.texture.magFilter = THREE.NearestFilter;
    const b = new GeoBuilder({ parts: true, atlas: true });
    const D = DETAIL[o.quality] || DETAIL.high;
    const r = roleSet(player);
    addArm(b, r, { part: VM.UARM_L }, { part: VM.FARM_L }, 1, D);
    addArm(b, r, { part: VM.UARM_R }, { part: VM.FARM_R }, -1, D);
    addBall(b, VM.BALL);
    this.solidGeo = b.buildSolid();
    this.edgeGeo = b.buildEdges();
    const sm = makeSolidMaterial({ parts: true, atlas: true });
    sm.uniforms.uParts = { value: this.texture };
    const em = makeEdgeMaterial({ parts: true, widthScale: 0.8 });
    em.uniforms.uParts = { value: this.texture };
    this.mesh = new THREE.Mesh(this.solidGeo, sm);
    this.edges = new THREE.Mesh(this.edgeGeo, em);
    this.mesh.frustumCulled = false; this.edges.frustumCulled = false;
    this.edges.renderOrder = 1;
    this.scene = new THREE.Scene();
    this.scene.add(this.mesh, this.edges);
    this.materials = [sm, em];
    for (let i = 0; i < this.rows; i++) this.hide(i);
  }
  setMatrix(row, m) { this.data.set(m.elements, row * 16); }
  hide(row) { const o = row * 16; this.data.fill(0, o, o + 16); this.data[o] = this.data[o + 5] = this.data[o + 10] = 0.0001; this.data[o + 13] = -50; this.data[o + 15] = 1; }
  commit() { this.texture.needsUpdate = true; }
  dispose() { this.solidGeo.dispose(); this.edgeGeo.dispose(); this.texture.dispose(); for (const m of this.materials) m.dispose(); }
}

export { tIco };
