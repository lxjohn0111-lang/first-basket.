// Headless full-court AI-vs-AI games: four quarters, both baskets, switching ends at
// half time, throw-ins, the 24/8/5-second rules, and stats/points consistency.
// node tests/full.mjs [games] [size 5|4|3] [difficulty] [quarter seconds]
import { Match } from '../src/sim/match.js';
import { TEAMS, teamConfig } from '../src/game/teams.js';
import { DT, FULL } from '../src/sim/constants.js';

const games = Number(process.argv[2] || 3);
const size = Number(process.argv[3] || 5);
const diff = process.argv[4] || 'pro';
const quarter = Number(process.argv[5] || 120);
let fail = 0;
const bad = (msg) => { console.log('   FAIL', msg); fail++; };
const tot = { fga: 0, fgm: 0, tpa: 0, tpm: 0, fta: 0, ftm: 0, stl: 0, blk: 0, tov: 0, pf: 0, ast: 0, pts: 0, oreb: 0, dreb: 0 };
let totTime = 0, totPoss = 0;
for (let g = 0; g < games; g++) {
  const a = TEAMS[g % TEAMS.length], b = TEAMS[(g + 3) % TEAMS.length];
  const m = new Match({ court: 'full', quarter, seed: 2000 + g, difficulty: diff, teams: [teamConfig(a, size), teamConfig(b, size)] });
  const counts = {};
  const sides = { 1: 0, '-1': 0 };
  const scoredAt = [];
  m.events.on('*', (e) => { counts[e.type] = (counts[e.type] || 0) + 1; });
  m.events.on('basket', (e) => { if (e.kind !== 'ft') { const s = e.pos.x > 0 ? 1 : -1; sides[s]++; scoredAt.push({ team: e.team, s, dir: m.side(e.team), period: m.period }); } });
  let dirsAtStart = null, dirsAfterHalf = null;
  m.events.on('periodStart', (e) => { if (e.period === 3) dirsAfterHalf = [...m.dirs]; });
  m.start();
  dirsAtStart = [...m.dirs];
  let last = '0-0', lastChange = 0, maxGap = 0, lastPoss = 0, possGap = 0;
  let phaseT = 0, lastPhase = m.phase, maxInbound = 0, maxDead = 0;
  const t0 = performance.now();
  let steps = 0;
  while (m.phase !== 'over' && m.time < quarter * 8 + 400) {
    m.step(DT); steps++;
    const sc = m.scoreline.join('-');
    if (sc !== last) { maxGap = Math.max(maxGap, m.time - lastChange); lastChange = m.time; last = sc; }
    if (m.possessions !== lastPoss) { possGap = Math.max(possGap, m.time - (lastPoss ? lastPossT : 0)); lastPoss = m.possessions; var lastPossT = m.time; }
    if (m.phase !== lastPhase) { lastPhase = m.phase; phaseT = 0; } else phaseT += DT;
    if (m.phase === 'inbound') maxInbound = Math.max(maxInbound, phaseT);
    if (m.phase === 'dead' || m.phase === 'scored') maxDead = Math.max(maxDead, phaseT);
    if (!m.ball.pos.isFinite() || m.players.some((p) => !p.pos.isFinite())) { bad('NaN at ' + m.time); break; }
    // the ball carrier never stands on the wrong side once over half court
  }
  const ms = performance.now() - t0;
  totTime += m.time; totPoss += m.possessions;
  const ts = [m.stats.team(0), m.stats.team(1)];
  for (const t of ts) for (const k in tot) tot[k] += t[k];
  console.log(`game ${g + 1}: ${a.short} ${m.scoreline[0]} - ${m.scoreline[1]} ${b.short}  ${m.periodLabel} ${m.phase}  time ${m.time.toFixed(0)}s  possessions ${m.possessions}  maxGap ${maxGap.toFixed(0)}s  ${(ms / steps * 1000).toFixed(1)}us/step`);
  console.log('   FG', ts.map((t) => `${t.fgm}/${t.fga} 3P ${t.tpm}/${t.tpa} FT ${t.ftm}/${t.fta} REB ${t.oreb}+${t.dreb} ST ${t.stl} BL ${t.blk} TO ${t.tov} PF ${t.pf} AS ${t.ast}`).join('  |  '));
  console.log('   events', Object.entries(counts).filter(([k]) => !['bounce', 'hit', 'gain', 'pass', 'shotStart', 'deflect', 'stealTry', 'jump', 'snap'].includes(k)).map(([k, v]) => `${k}:${v}`).join(' '));
  console.log(`   baskets at +X ${sides[1]}  at -X ${sides[-1]}  max throw-in ${maxInbound.toFixed(1)}s  max stoppage ${maxDead.toFixed(1)}s`);
  if (m.phase !== 'over') bad('did not finish');
  if (m.period < FULL.QUARTERS) bad('ended before the fourth quarter');
  if (!counts.tip || !counts.tapped) bad('no tip-off');
  if (!dirsAfterHalf || dirsAfterHalf[0] !== -dirsAtStart[0]) bad('teams did not switch ends at half time');
  if (scoredAt.some((e) => e.s !== e.dir)) bad('a basket at the wrong end counted: ' + JSON.stringify(scoredAt.filter((e) => e.s !== e.dir)));
  if (!sides[1] || !sides[-1]) bad('only one basket was used');
  if (maxInbound > FULL.INBOUND + 0.2) bad('a throw-in took ' + maxInbound.toFixed(1) + ' s');
  if (maxGap > 150) bad('no score for ' + maxGap.toFixed(0) + ' s');
  for (let t = 0; t < 2; t++) if (ts[t].pts !== m.teams[t].score) bad(`points mismatch team ${t}: ${ts[t].pts} vs ${m.teams[t].score}`);
}
console.log('TOTAL', JSON.stringify(tot), `FG% ${(tot.fgm / tot.fga * 100).toFixed(0)} 3P% ${(tot.tpm / Math.max(1, tot.tpa) * 100).toFixed(0)} FT% ${(tot.ftm / Math.max(1, tot.fta) * 100).toFixed(0)}  pts/team/game ${(tot.pts / games / 2).toFixed(1)}  s/possession ${(totTime / totPoss).toFixed(1)}`);
console.log(fail ? `${fail} FAILED` : 'full-court games ok');
process.exit(fail ? 1 : 0);
