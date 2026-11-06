// Court, hoop, ball and rule constants (metres, seconds, Y up).
// FIBA court: 28 x 15 m. Games are played on the +X half (half-court 3v3 / 1v1),
// attacking the basket at the +X end; the other half and hoop are still built.

export const DT = 1 / 120; // fixed physics timestep

export const COURT = {
  L: 28, W: 15,
  HL: 14, HW: 7.5,
};

// the hoop the match is played at (+X end)
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

// game length presets: clock seconds and the score that wins outright
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

export function distToHoop(x, z) { return Math.hypot(x - HOOP.X, z - HOOP.Z); }

// is a floor position beyond the three-point line (on the line counts as two)
export function isThree(x, z) {
  if (Math.abs(z) > LINES.THREE_Z) return true;
  if (x > LINES.THREE_X) return false;
  return distToHoop(x, z) > LINES.THREE_R + 0.03;
}

// inside the half court's playing area (lines are out)
export function inBounds(x, z, margin = 0) {
  return x > margin && x < COURT.HL - margin && Math.abs(z) < COURT.HW - margin;
}

export const ATTRS = ['shooting', 'handling', 'speed', 'defense', 'passing', 'vertical'];
export const ATTR_LABELS = { shooting: 'Shooting', handling: 'Ball handling', speed: 'Speed', defense: 'Defense', passing: 'Passing', vertical: 'Vertical' };
export const ATTR_SHORT = { shooting: 'SHT', handling: 'HDL', speed: 'SPD', defense: 'DEF', passing: 'PAS', vertical: 'VRT' };
