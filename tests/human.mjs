// Full games with a scripted player driving the real human controls (the same
// HumanController the keyboard and mouse feed): move and look, hold-and-release
// shooting timed on the meter, passing, calling for the ball, stance, steals and jumps.
// node tests/human.mjs [games] [3v3|1v1] [difficulty] [timing noise]
import { Match } from '../src/sim/match.js';
import { HumanController } from '../src/sim/human.js';
import { TEAMS, teamConfig, defaultPlayer } from '../src/game/teams.js';
import { DT, HOOP, distToHoop, isThree, SPOTS } from '../src/sim/constants.js';
import { yawOf, angleDiff } from '../src/sim/vec.js';

const games = Number(process.argv[2] || 3);
const fmt = process.argv[3] || '3v3';
const diff = process.argv[4] || 'pro';
const noise = Number(process.argv[5] ?? 0.04);
const size = fmt === '1v1' ? 1 : 3;
let fails = 0;
const agg = { pts: 0, fga: 0, fgm: 0, stl: 0, blk: 0, ast: 0, tov: 0, wins: 0, opp: 0, perfect: 0, shots: 0, dunks: 0, layups: 0, presses: {} };

function bot(m, ctl, rng) {
  const h = ctl.p, b = m.ball, inp = ctl.input, st = bot.st || (bot.st = { hold: null, cd: 0, target: null, retarget: 0 });
  const press = (t) => { ctl.press(t); agg.presses[t] = (agg.presses[t] || 0) + 1; };
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
  const hoopYaw = yawOf(HOOP.X - h.pos.x, HOOP.Z - h.pos.z);
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
  if (m.phase !== 'live') { inp.moveF = 0; inp.moveR = 0; return; }
  const mine = b.owner === h;
  if (mine) {
    const d = distToHoop(h.pos.x, h.pos.z);
    if (m.mustClear === h.team) { const a = Math.atan2(h.pos.z, h.pos.x - HOOP.X); moveTo(HOOP.X + Math.cos(a) * 7.6, Math.sin(a) * 7.6, true); inp.yaw = yawOf(inp.moveF, 0) + hoopYaw * 0; inp.yaw = hoopYaw; return; }
    st.retarget -= DT;
    if (!st.target || st.retarget <= 0) {
      const r = rng();
      st.target = r < 0.35 ? { x: HOOP.X - 0.8, z: (rng() - 0.5) * 1.2, drive: true } : r < 0.7 ? { x: SPOTS.wingL[0], z: SPOTS.wingL[1] * (rng() < 0.5 ? 1 : -1) } : { x: SPOTS.elbowR[0], z: SPOTS.elbowR[1] * (rng() < 0.5 ? 1 : -1) };
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
    moveTo(SPOTS.wingR[0], SPOTS.wingR[1]);
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
  const hx = HOOP.X - man.pos.x, hz = HOOP.Z - man.pos.z, hl = Math.hypot(hx, hz) || 1;
  const gap = b.owner === man ? 1.1 : 2.2;
  moveTo(man.pos.x + (hx / hl) * gap, man.pos.z + (hz / hl) * gap);
  inp.yaw = yawOf(man.pos.x - h.pos.x, man.pos.z - h.pos.z);
  inp.stance = b.owner === man && h.pos.distXZ(man.pos) < 2.2;
  if (b.owner === man && st.cd <= 0 && h.pos.distXZ(man.pos) < 1.3 && b.pos.y < 0.7 && rng() < 0.08) { press('steal'); st.cd = 0.8; }
  if (man.action && man.action.type === 'shot' && man.action.jumped && h.pos.distXZ(man.pos) < 1.6 && st.cd <= 0) { press('jump'); st.cd = 1; }
}

for (let g = 0; g < games; g++) {
  bot.st = null;
  let seed = 4242 + g * 17;
  const rng = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const me = { ...defaultPlayer(), archetype: ['slasher', 'shooter', 'guard', 'big'][g % 4] };
  const m = new Match({ seed: 900 + g, clock: 300, target: fmt === '1v1' ? 11 : 21, difficulty: diff, teams: [teamConfig(TEAMS[g % 8], size, me), teamConfig(TEAMS[(g + 5) % 8], size)] });
  const ctl = new HumanController(m, m.human);
  m.humanCtl = ctl;
  m.events.on('shot', (e) => { if (e.player === m.human) { agg.shots++; if (e.grade.tier === 'perfect') agg.perfect++; if (e.kind === 'dunk') agg.dunks++; if (e.kind === 'layup') agg.layups++; } });
  m.start();
  let steps = 0;
  try {
    while (m.phase !== 'over' && m.time < 900) {
      bot(m, ctl, rng);
      m.step(DT); steps++;
      if (!m.ball.pos.isFinite() || m.players.some((p) => !p.pos.isFinite())) throw new Error('NaN at ' + m.time);
    }
  } catch (e) { console.log('ERROR', e.stack); fails++; }
  const s = m.stats.of(m.human), t = m.human.team;
  for (const k of ['pts', 'fga', 'fgm', 'stl', 'blk', 'ast', 'tov']) agg[k] += s[k];
  agg.wins += m.winner === t ? 1 : 0;
  agg.opp += m.scoreline[1 - t];
  console.log(`game ${g + 1} (${me.archetype}): ${m.teams[0].short} ${m.scoreline[0]} - ${m.scoreline[1]} ${m.teams[1].short} ${m.phase} t=${m.time.toFixed(0)}s  you: ${s.pts} pts ${s.fgm}/${s.fga} FG, ${s.tpm}/${s.tpa} 3P, ${s.ftm}/${s.fta} FT, ${s.ast} ast, ${s.stl} stl, ${s.blk} blk, ${s.tov} to, ${s.pf} pf  grade ${m.stats.grade(m.human)}`);
  if (m.phase !== 'over') { console.log('  DID NOT FINISH'); fails++; }
  for (let k = 0; k < 2; k++) if (m.stats.team(k).pts !== m.teams[k].score) { console.log('  POINTS MISMATCH'); fails++; }
}
console.log('TOTAL', JSON.stringify(agg));
process.exit(fails ? 1 : 0);
