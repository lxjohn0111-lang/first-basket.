// Shot make rates from different distances with perfect / good / early / late releases,
// uncontested, to calibrate the shot model against the real rim physics.
// node tests/shooting.mjs [shooting rating]
import { Match } from '../src/sim/match.js';
import { TEAMS, teamConfig } from '../src/game/teams.js';
import { DT, HOOP } from '../src/sim/constants.js';
import { startShot } from '../src/sim/actions.js';

const rating = Number(process.argv[2] || 75);
function trial(dist, ang, offset, kind, n = 120) {
  let made = 0, rim = 0;
  for (let i = 0; i < n; i++) {
    const tc = teamConfig(TEAMS[0], 1); tc.roster[0].attrs.shooting = rating;
    const m = new Match({ seed: 50 + i * 7, rules: false, teams: [tc, teamConfig(TEAMS[1], 1)] });
    const p = m.players[0], d = m.players[1];
    m.place(d, 1, 7);
    m.place(p, HOOP.X - Math.cos(ang) * dist, HOOP.Z + Math.sin(ang) * dist);
    m.setPhase('live');
    m.gainBall(p, 'test');
    let scored = false;
    m.events.on('basket', () => { scored = true; });
    for (let k = 0; k < 30; k++) m.step(DT);
    const spot0 = null; void spot0;
    startShot(m, p, { kind, releaseCharge: 0 });
    p.action.ai = true;
    p.action.releaseCharge = Math.max(0.05, p.action.spot.c + offset * (offset === 9 ? 0 : 1));
    if (offset === 9) p.action.releaseCharge = p.action.spot.c + p.action.spot.w * 0.8;
    for (let k = 0; k < 600 && !scored; k++) { m.step(DT); if (m.ball.shot && m.ball.shot.rim) m.ball.shot.rimSeen = true; }
    if (scored) made++;
  }
  return made / n;
}
for (const [label, dist, kind] of [['layup 1.8m', 1.8, 'layup'], ['close 3.5m', 3.5, 'jumper'], ['mid 5m', 5, 'jumper'], ['long 6.2m', 6.2, 'jumper'], ['three 7.0m', 7.0, 'three'], ['deep 8m', 8, 'three'], ['FT', HOOP.X - (14 - 5.8 - 0.32), 'ft']]) {
  const row = [];
  for (const [ol, off] of [['perfect', 0], ['edge', 9], ['early .12', -0.12], ['late .12', 0.12], ['way early', -0.25]]) row.push(`${ol} ${(trial(dist, 0.3, off, kind) * 100).toFixed(0)}%`);
  console.log(label.padEnd(12), row.join('  '));
}
