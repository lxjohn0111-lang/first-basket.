// Every surface belongs to a material role. Roles are shared THREE.Color objects
// referenced by all ink materials, so switching visual style only recolours
// them in place: no material or geometry is ever rebuilt.
// Same two styles as First Touch: Classic (pale ink drawing) and Neobrutalist
// (saturated toon colours, thick outlines, hard shadows).
import * as THREE from 'three';

export const R = {
  FLOOR_A: 1, FLOOR_B: 2, FLOOR_C: 3, APRON: 4, PAINT: 5, LINES: 6, CENTER: 7,
  RIM: 8, NET: 9, GLASS: 10, BOARD_FRAME: 11, PAD: 12, POLE: 13,
  STAND_A: 14, STAND_B: 15, STAND_C: 16, WALL_A: 17, WALL_B: 18, CEIL: 19, CONCRETE: 20, METAL: 21, WOOD: 22, SEAT: 23,
  BANNER_HOME: 24, BANNER_AWAY: 25, BOARD_A: 26, BOARD_B: 27, SCREEN: 28, LAMP: 29,
  CROWD_1: 30, CROWD_2: 31, CROWD_3: 32, CROWD_4: 33,
  SKIN_1: 34, SKIN_2: 35, SKIN_3: 36, SKIN_H: 37,
  HAIR_1: 38, HAIR_2: 39, HAIR_H: 40,
  SHOE: 41, SHOE_H: 42, SOLE: 43,
  JERSEY_0: 44, SHORTS_0: 45, TRIM_0: 46, NUM_0: 47,
  JERSEY_1: 48, SHORTS_1: 49, TRIM_1: 50, NUM_1: 51,
  SOCK: 52, BALL: 53, BALL_SEAM: 54, CONE: 55, TARGET: 56, CLOUD: 57,
  SKY_TOP: 58, SKY_BOTTOM: 59, GOLD: 60, EYE: 61, INK: 62, MARKER: 63,
  WINDOW: 64, DOOR: 65, BRICK: 66, PLANT: 67, BAND: 68, MARKER_DEF: 69, CHAIR: 70, TABLE: 71,
};
export const NUM_ROLES = 72;

// the shared role colours
export const palette = Array.from({ length: NUM_ROLES }, () => new THREE.Color(1, 1, 1));

function hex(h) { return new THREE.Color(h); }

const CLASSIC = {
  name: 'classic',
  label: 'Classic',
  bg: '#f2f1ea', fog: '#f2f1ea', fogNear: 45, fogFar: 160,
  ink: '#161616', lineWidth: 1.2, toon: 0, shadow: 0, clouds: false, blobs: true,
  roles: {
    FLOOR_A: '#f3e7cf', FLOOR_B: '#efe1c5', FLOOR_C: '#f6ecd8', APRON: '#e6dccb', LINES: '#2b2b2b',
    RIM: '#f2b48c', NET: '#7a7a7a', GLASS: '#eef2f2', BOARD_FRAME: '#ffffff', PAD: '#e9e4dc', POLE: '#ecebe6',
    STAND_A: '#f6f6f2', STAND_B: '#ecebe5', STAND_C: '#e2e0d8', WALL_A: '#f7f6f1', WALL_B: '#efede6', CEIL: '#faf9f5', CONCRETE: '#efeee8', METAL: '#e8e8e6', WOOD: '#f1ebe0', SEAT: '#ebe8e0',
    BOARD_A: '#fbfbf8', BOARD_B: '#efefea', SCREEN: '#f7f7f4', LAMP: '#ffffff',
    CROWD_3: '#efefeb', CROWD_4: '#e3e2dc',
    SKIN_1: '#fbf6f0', SKIN_2: '#f3eadf', SKIN_3: '#e8dccd',
    HAIR_1: '#d9d4cc', HAIR_2: '#bdb7ae',
    SHOE: '#3a3a3a', SOLE: '#f4f4f0', SOCK: '#ffffff', BALL: '#f3c3a0', BALL_SEAM: '#1b1b1b', CONE: '#f2c9a0', TARGET: '#f0b8b0',
    CLOUD: '#ffffff', SKY_TOP: '#f4f3ee', SKY_BOTTOM: '#f2f1ea', GOLD: '#eadcaa', EYE: '#1b1b1b', INK: '#161616', MARKER: '#222222', MARKER_DEF: '#c8102e',
    WINDOW: '#e3eaee', DOOR: '#e6ddd0', BRICK: '#ece4d8', PLANT: '#d8e4cc', BAND: '#ffffff', CHAIR: '#e4e2dc', TABLE: '#f3f1ea',
  },
  kitMix: 0.42, kitSat: 0.75, skinMix: 0.55, paintMix: 0.72,
};

const NEO = {
  name: 'neo',
  label: 'Neobrutalist',
  bg: '#3b2f8f', fog: '#9d8cff', fogNear: 70, fogFar: 260,
  ink: '#000000', lineWidth: 3, toon: 1, shadow: 1, clouds: false, blobs: false,
  roles: {
    FLOOR_A: '#f6b24f', FLOOR_B: '#ec9f3c', FLOOR_C: '#fbc46a', APRON: '#c96f2a', LINES: '#ffffff',
    RIM: '#ff5a1f', NET: '#ffffff', GLASS: '#8ff0ff', BOARD_FRAME: '#ffffff', PAD: '#3d9bff', POLE: '#ffffff',
    STAND_A: '#ff5c8a', STAND_B: '#ffd23f', STAND_C: '#3d9bff', WALL_A: '#7b4dff', WALL_B: '#5f37e0', CEIL: '#2e2470', CONCRETE: '#d9d2ff', METAL: '#b5b5c8', WOOD: '#ffb347', SEAT: '#ff3d6e',
    BOARD_A: '#ffffff', BOARD_B: '#ffe45c', SCREEN: '#141414', LAMP: '#fffbe0',
    CROWD_3: '#ffe45c', CROWD_4: '#b48cff',
    SKIN_1: '#ffd8b8', SKIN_2: '#d9a27a', SKIN_3: '#9a6440',
    HAIR_1: '#2b1d14', HAIR_2: '#f2c14e',
    SHOE: '#101010', SOLE: '#ffffff', SOCK: '#ffffff', BALL: '#ff7a1a', BALL_SEAM: '#101010', CONE: '#ff7a1a', TARGET: '#ff3d6e',
    CLOUD: '#ffffff', SKY_TOP: '#2a1f6e', SKY_BOTTOM: '#6c5ce7', GOLD: '#ffc81a', EYE: '#000000', INK: '#000000', MARKER: '#ff3dcf', MARKER_DEF: '#ff3d3d',
    WINDOW: '#3ee0ff', DOOR: '#ff5c8a', BRICK: '#ff8a4c', PLANT: '#1bbd57', BAND: '#ffffff', CHAIR: '#141414', TABLE: '#ffffff',
  },
  kitMix: 0, kitSat: 1.15, skinMix: 0, paintMix: 0,
};

export const STYLES = { classic: CLASSIC, neo: NEO };

// per-game colours (kits and appearance) before style treatment
const gameColours = {
  kits: [
    { jersey: '#c8102e', shorts: '#c8102e', trim: '#ffffff', number: '#ffffff' },
    { jersey: '#1d4ed8', shorts: '#1d4ed8', trim: '#ffffff', number: '#ffffff' },
  ],
  human: { skin: '#e0b48c', hair: '#3b2a1e', shoes: '#ffc61a' },
  court: '#c8102e',
};

let currentStyle = CLASSIC;

function treat(c, mixWhite, satMul) {
  const col = hex(c);
  const hsl = {};
  col.getHSL(hsl);
  col.setHSL(hsl.h, Math.min(1, hsl.s * satMul), hsl.l);
  if (mixWhite > 0) col.lerp(new THREE.Color(1, 1, 1), mixWhite);
  return col;
}

export function applyStyle(styleName) {
  const st = STYLES[styleName] || CLASSIC;
  currentStyle = st;
  for (const [k, v] of Object.entries(st.roles)) palette[R[k]].set(v);
  applyGameColours();
  return st;
}

export function setGameColours(kits, human, court) {
  if (kits) gameColours.kits = kits;
  if (human) gameColours.human = human;
  if (court) gameColours.court = court;
  applyGameColours();
}

function applyGameColours() {
  const st = currentStyle;
  const k = gameColours.kits;
  const mix = st.kitMix, sat = st.kitSat;
  for (let t = 0; t < 2; t++) {
    const kit = k[t];
    const base = t === 0 ? 0 : 4;
    palette[R.JERSEY_0 + base].copy(treat(kit.jersey, mix, sat));
    palette[R.SHORTS_0 + base].copy(treat(kit.shorts, mix, sat));
    const tc = colourDistance(kit.trim, kit.jersey) < 0.3 ? (colourDistance(kit.jersey, '#ffffff') > 0.6 ? '#ffffff' : '#141414') : kit.trim;
    palette[R.TRIM_0 + base].copy(treat(tc, mix, sat));
    const shirt = palette[R.JERSEY_0 + base];
    const lum = shirt.r * 0.3 + shirt.g * 0.59 + shirt.b * 0.11;
    palette[R.NUM_0 + base].set(lum > 0.6 ? '#141414' : '#ffffff');
  }
  palette[R.BANNER_HOME].copy(treat(k[0].jersey, mix * 0.7, sat));
  palette[R.BANNER_AWAY].copy(treat(k[1].jersey, mix * 0.7, sat));
  palette[R.CROWD_1].copy(treat(k[0].jersey, st.name === 'classic' ? 0.62 : 0, sat));
  palette[R.CROWD_2].copy(treat(k[1].jersey, st.name === 'classic' ? 0.62 : 0, sat));
  // the painted key and centre logo take the home colour
  palette[R.PAINT].copy(treat(gameColours.court, st.paintMix, sat * 0.9));
  palette[R.CENTER].copy(treat(gameColours.court, st.paintMix * 0.8, sat));
  const h = gameColours.human;
  palette[R.SKIN_H].copy(treat(h.skin, st.skinMix, 1));
  palette[R.HAIR_H].copy(treat(h.hair, st.skinMix * 0.8, 1));
  palette[R.SHOE_H].copy(treat(h.shoes, st.name === 'classic' ? 0.2 : 0, 1));
}

export function colourDistance(a, b) {
  const ca = hex(a), cb = hex(b);
  return Math.hypot(ca.r - cb.r, ca.g - cb.g, ca.b - cb.b);
}

// home and away kits that keep both teams clearly distinct
export function resolveKits(home, away) {
  const h = { jersey: home.colors[0], shorts: home.colors[0], trim: home.colors[1], number: home.colors[1] };
  let a = { jersey: away.colors[0], shorts: away.colors[0], trim: away.colors[1], number: away.colors[1] };
  if (colourDistance(h.jersey, a.jersey) < 0.55) {
    a = { jersey: away.colors[1], shorts: away.colors[1], trim: away.colors[0], number: away.colors[0] };
    if (colourDistance(h.jersey, a.jersey) < 0.55) a = { jersey: '#f4f4f4', shorts: '#f4f4f4', trim: away.colors[0], number: '#111111' };
  }
  return [h, a];
}

export function currentStyleDef() { return currentStyle; }
