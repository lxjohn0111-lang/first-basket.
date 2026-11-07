// Court, hoop, ball and rule constants (metres, seconds, Y up).
// FIBA court: 28 x 15 m with a basket at each end (x = +-12.425). Full-court games use
// both: each team attacks one basket (its attack sign s = +1 or -1, swapped at half
// time). Half-court games (3x3 / 1v1) and practice are played on the +X half only.
// Everything below is written for the +X basket; `s` mirrors it (x -> s*x, z -> s*z).

export const DT = 1 / 120; // fixed physics timestep

export const COURT = {
  L: 28, W: 15,
  HL: 14, HW: 7.5,
};

// the +X basket (the -X one is its mirror image)
export const HOOP = {
  X: 14 - 1.575,      // rim centre, 1.575 m in from the baseline
  Z: 0,
  Y: 3.05,            // rim height
  R: 0.225,           // rim inner radius (45 cm ring)
  TUBE: 0.011,        // rim tube radius
  BOARD_X: 14 - 1.2,  // backboard front face
  BOARD_W: 1.8, BOARD_H: 1.05, BOARD_Y0: 2.9, BOARD_T: 0.05,
  NET_LEN: 0.42, NET_R1: 0.15,
};

export const LINES = {
  THREE_R: 6.75,          // three-point arc radius from the rim centre
  THREE_Z: 6.6,           // straight part of the three-point line (0.9 m from the sidelines)
  KEY_HW: 2.45,           // key (painted area) half width
  FT_X: 14 - 5.8,         // free-throw line
  FT_R: 1.8,              // free-throw circle
  NC_R: 1.25,             // no-charge semicircle
  CENTER_R: 1.8,
};
// where the three-point line turns from straight into the arc
LINES.THREE_X = HOOP.X - Math.sqrt(LINES.THREE_R * LINES.THREE_R - LINES.THREE_Z * LINES.THREE_Z);

export const BALL_R = 0.12;
export const G = 9.81;

export const BALL = {
  AIR_DRAG: 0.012,        // quadratic air drag (1/m)
  FLOOR_E: 0.8,           // hardwood restitution
  RIM_E: 0.55,
  BOARD_E: 0.62,
  FRICTION: 0.35,         // Coulomb friction for contacts
  SPIN_DAMP: 0.4,
};

export const RULES = {
  SHOT_CLOCK: 14,
  CHECK_DIST: 5.2,        // check ball spot distance in from the half-court line (x)
  PICKUP_R: 0.62,         // a loose ball this close to a player's body can be gathered
  HUMAN_PICKUP_R: 0.78,
  STEAL_RANGE: 1.25,
  STEAL_COOLDOWN: 0.75,
  PASS_LOCK: 0.3,         // a passer cannot catch their own pass for this long
  SHOT_LOCK: 0.5,
  INPUT_BUFFER: 0.15,
  FT_DIST: 0.15,
  BONUS_FOULS: 6,         // from this team foul on, every foul is two free throws
};

// full-court rules (FIBA style): 24-second shot clock (14 after an offensive rebound
// off the rim), 8 seconds to cross half court, 5 seconds to inbound, team fouls per
// quarter with free throws from the 5th
export const FULL = {
  SHOT_CLOCK: 24,
  OREB_CLOCK: 14,
  BACKCOURT: 8,
  INBOUND: 5,
  BONUS_FOULS: 5,
  QUARTERS: 4,
};

// full-court game lengths: real-time minutes per quarter
export const FULL_LENGTHS = {
  short: { quarter: 120, ot: 60, label: '4 × 2 min' },
  normal: { quarter: 180, ot: 90, label: '4 × 3 min' },
  long: { quarter: 300, ot: 120, label: '4 × 5 min' },
};

// half-court game length presets: clock seconds and the score that wins outright
export const GAME_LENGTHS = {
  short: { clock: 180, target: 11, label: '3 min · to 11' },
  normal: { clock: 300, target: 21, label: '5 min · to 21' },
  long: { clock: 480, target: 21, label: '8 min · to 21' },
};

// standard spots on the half court (x along the court, z across)
export const SPOTS = {
  top: [HOOP.X - 7.4, 0],
  wingL: [HOOP.X - 5.6, -4.9],
  wingR: [HOOP.X - 5.6, 4.9],
  cornerL: [13.0, -6.95],
  cornerR: [13.0, 6.95],
  elbowL: [LINES.FT_X + 0.2, -2.3],
  elbowR: [LINES.FT_X + 0.2, 2.3],
  postL: [HOOP.X - 1.4, -2.6],
  postR: [HOOP.X - 1.4, 2.6],
  slotL: [HOOP.X - 6.9, -2.6],
  slotR: [HOOP.X - 6.9, 2.6],
};

// rim centre x of the basket attacked with sign s
export const hoopX = (s = 1) => s * HOOP.X;
export function distToHoop(x, z, s = 1) { return Math.hypot(x - s * HOOP.X, z - HOOP.Z); }
// a named spot for the team attacking with sign s
export function spot(name, s = 1) { const p = SPOTS[name]; return [p[0] * s, p[1] * s]; }

// is a floor position beyond the three-point line of basket s (on the line counts as two)
export function isThree(x, z, s = 1) {
  x *= s; z *= s;
  if (Math.abs(z) > LINES.THREE_Z) return true;
  if (x > LINES.THREE_X) return false;
  return Math.hypot(x - HOOP.X, z - HOOP.Z) > LINES.THREE_R + 0.03;
}

// inside the playing area (lines are out): the +X half, or the whole floor
export function inBounds(x, z, margin = 0, full = false) {
  if (Math.abs(z) >= COURT.HW - margin) return false;
  return full ? Math.abs(x) < COURT.HL - margin : x > margin && x < COURT.HL - margin;
}

export const ATTRS = ['shooting', 'handling', 'speed', 'defense', 'passing', 'vertical'];
export const ATTR_LABELS = { shooting: 'Shooting', handling: 'Ball handling', speed: 'Speed', defense: 'Defense', passing: 'Passing', vertical: 'Vertical' };
export const ATTR_SHORT = { shooting: 'SHT', handling: 'HDL', speed: 'SPD', defense: 'DEF', passing: 'PAS', vertical: 'VRT' };
