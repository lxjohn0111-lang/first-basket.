// Full games with a scripted player driving the real human controls (the same
// HumanController the keyboard and mouse feed): move and look, hold-and-release
// shooting timed on the meter, passing, calling for the ball, stance, steals and jumps.
// node tests/human.mjs [games] [full|3v3|1v1] [difficulty] [timing noise]
// (full: a 5v5 full-court game with two-minute quarters)
import { Match } from '../src/sim/match.js';
import { HumanController } from '../src/sim/human.js';
import { TEAMS, teamConfig, defaultPlayer } from '../src/game/teams.js';
import { DT } from '../src/sim/constants.js';
import { Bot } from './bot.mjs';

const games = Number(process.argv[2] || 3);
const fmt = process.argv[3] || '3v3';
const diff = process.argv[4] || 'pro';
const noise = Number(process.argv[5] ?? 0.04);
const full = fmt === 'full';
const size = fmt === '1v1' ? 1 : full ? 5 : 3;
let fails = 0;
const agg = { pts: 0, fga: 0, fgm: 0, stl: 0, blk: 0, ast: 0, tov: 0, wins: 0, opp: 0, perfect: 0, shots: 0, dunks: 0, layups: 0, presses: {} };

for (let g = 0; g < games; g++) {
  const me = { ...defaultPlayer(), archetype: ['slasher', 'shooter', 'guard', 'big'][g % 4] };
  const tA = teamConfig(TEAMS[g % 8], size, full && g % 2 ? null : me), tB = teamConfig(TEAMS[(g + 5) % 8], size, full && g % 2 ? me : null);
  const m = new Match({ court: full ? 'full' : 'half', quarter: 120, seed: 900 + g, clock: 300, target: fmt === '1v1' ? 11 : 21, difficulty: diff, teams: [tA, tB] });
  const ctl = new HumanController(m, m.human);
  m.humanCtl = ctl;
  const bot = new Bot(m, ctl, { seed: 4242 + g * 17, noise, full, onPress: (t) => { agg.presses[t] = (agg.presses[t] || 0) + 1; } });
  m.events.on('shot', (e) => { if (e.player === m.human) { agg.shots++; if (e.grade.tier === 'perfect') agg.perfect++; if (e.kind === 'dunk') agg.dunks++; if (e.kind === 'layup') agg.layups++; } });
  m.start();
  let steps = 0;
  try {
    while (m.phase !== 'over' && m.time < (full ? 1400 : 900)) {
      bot.update();
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
