// Headless AI-vs-AI games: flow, scoring, stats sanity and stall detection.
// node tests/sim.mjs [games] [format 3v3|1v1] [difficulty]
import { Match } from '../src/sim/match.js';
import { TEAMS, teamConfig } from '../src/game/teams.js';
import { DT } from '../src/sim/constants.js';

const games = Number(process.argv[2] || 4);
const format = process.argv[3] || '3v3';
const diff = process.argv[4] || 'pro';
const size = format === '1v1' ? 1 : 3;
let fail = 0;
const tot = { fga: 0, fgm: 0, tpa: 0, tpm: 0, fta: 0, ftm: 0, stl: 0, blk: 0, tov: 0, pf: 0, ast: 0, pts: 0 };
for (let g = 0; g < games; g++) {
  const a = TEAMS[g % TEAMS.length], b = TEAMS[(g + 3) % TEAMS.length];
  const m = new Match({ seed: 1000 + g, clock: 300, target: 21, difficulty: diff, teams: [teamConfig(a, size), teamConfig(b, size)] });
  const counts = {};
  m.events.on('*', (e) => { counts[e.type] = (counts[e.type] || 0) + 1; });
  m.start();
  let lastScoreT = 0, last = '0-0', maxGap = 0;
  const t0 = performance.now();
  let steps = 0;
  while (m.phase !== 'over' && m.time < 900) {
    m.step(DT); steps++;
    const sc = m.scoreline.join('-');
    if (sc !== last) { maxGap = Math.max(maxGap, m.time - lastScoreT); lastScoreT = m.time; last = sc; }
    if (!m.ball.pos.isFinite() || m.players.some((p) => !p.pos.isFinite())) { console.log('NaN at', m.time); fail++; break; }
  }
  const ms = performance.now() - t0;
  const ts = [m.stats.team(0), m.stats.team(1)];
  for (const t of ts) for (const k in tot) tot[k] += t[k];
  console.log(`game ${g + 1}: ${a.short} ${m.scoreline[0]} - ${m.scoreline[1]} ${b.short}  time ${m.time.toFixed(0)}s clock ${m.displayClock} ${m.phase}  maxGap ${maxGap.toFixed(0)}s  ${(ms / steps * 1000).toFixed(1)}us/step`);
  console.log('   FG', ts.map((t) => `${t.fgm}/${t.fga} 3P ${t.tpm}/${t.tpa} FT ${t.ftm}/${t.fta} ST ${t.stl} BL ${t.blk} TO ${t.tov} PF ${t.pf} AS ${t.ast}`).join('  |  '));
  console.log('   events', Object.entries(counts).filter(([k]) => !['bounce', 'hit', 'gain'].includes(k)).map(([k, v]) => `${k}:${v}`).join(' '));
  if (m.phase !== 'over') { console.log('   DID NOT FINISH'); fail++; }
  if (maxGap > 120) { console.log('   STALL: no score for', maxGap.toFixed(0), 's'); }
  // points check: team score equals sum of player points
  for (let t = 0; t < 2; t++) if (ts[t].pts !== m.teams[t].score) { console.log('   POINTS MISMATCH team', t, ts[t].pts, m.teams[t].score); fail++; }
}
console.log('TOTAL', JSON.stringify(tot), `FG% ${(tot.fgm / tot.fga * 100).toFixed(0)} 3P% ${(tot.tpm / Math.max(1, tot.tpa) * 100).toFixed(0)} FT% ${(tot.ftm / Math.max(1, tot.fta) * 100).toFixed(0)}`);
process.exit(fail ? 1 : 0);
