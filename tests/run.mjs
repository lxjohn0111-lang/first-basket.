// npm test: the headless suites (no browser needed).
import { spawnSync } from 'node:child_process';
const runs = [
  ['tests/physics.mjs'],
  ['tests/full.mjs', '2', '5', 'pro', '120'],
  ['tests/full.mjs', '1', '3', 'allstar', '120'],
  ['tests/human.mjs', '2', 'full', 'pro'],
  ['tests/career.mjs'],
  ['tests/sim.mjs', '3', '3v3', 'pro'],
  ['tests/sim.mjs', '2', '1v1', 'allstar'],
  ['tests/human.mjs', '2', '3v3', 'pro'],
  ['tests/human.mjs', '1', '1v1', 'rookie'],
];
let failed = 0;
for (const r of runs) {
  console.log(`\n=== node ${r.join(' ')}`);
  const p = spawnSync(process.execPath, r, { stdio: 'inherit' });
  if (p.status !== 0) { failed++; console.log(`FAILED: ${r.join(' ')}`); }
}
console.log(failed ? `\n${failed} suite(s) failed` : '\nall suites passed');
process.exit(failed ? 1 : 0);
