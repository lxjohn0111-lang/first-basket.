// End-to-end browser flow through the real interface (needs `node server.js` on :8080):
// main menu -> 3v3 setup -> tip off -> play -> result + box score -> main menu;
// pause menu, settings tabs, visual style, how to play, My Player; practice court,
// shootout and their result screens. Fails on any page error or a dead button.
// node tests/flow.mjs   (screenshots in tests/out/flow-*.png)
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const base = 'http://localhost:' + (process.env.PORT || 8080) + '/index.html?fps=' + (process.env.FPS || 4);
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const pg = await b.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
pg.on('pageerror', (e) => { errors.push(e.message); console.log('PAGEERROR', e.message); });
pg.on('console', (m) => { if (m.type() === 'error') { errors.push(m.text()); console.log('CONSOLE', m.text()); } });
let n = 0;
const shot = async (name) => { await pg.waitForTimeout(700); await pg.screenshot({ path: `tests/out/flow-${String(++n).padStart(2, '0')}-${name}.png`, timeout: 120000 }); console.log('shot', name); };
const click = async (sel, timeout = 30000) => { await pg.click(sel, { timeout }); };
const screen = () => pg.evaluate(() => window.__cs.screens.current);
const expect = async (want) => { const s = await screen(); if (s !== want) { errors.push(`expected screen ${want}, got ${s}`); console.log('UNEXPECTED SCREEN', s, 'wanted', want); } };

await pg.goto(base, { waitUntil: 'commit', timeout: 60000 });
await pg.waitForFunction(() => window.__cs, null, { timeout: 60000 });
await expect('menu');
// 3v3 setup
await click('[data-act="play"]'); await expect('setup'); await shot('setup');
await click('[data-act="awayNext"]');
await click('.seg[data-key="venue"] .opt[data-v="gym"]');
await click('[data-act="go"]'); await expect('click'); await shot('click-to-play');
await pg.evaluate(() => { const a = window.__cs; a.input.dragMode = true; a.resume(); });
await pg.waitForFunction(() => window.__cs.session && !window.__cs.paused, null, { timeout: 30000 });
await shot('playing-gym');
// pause menu and its screens
await pg.keyboard.press('KeyP'); await expect('pause'); await shot('pause');
await click('[data-act="stats"]'); await shot('box-live'); await click('[data-act="back"]');
await click('[data-act="settings"]'); await click('.tab[data-tab="video"]'); await shot('settings-video'); await click('[data-act="back"]');
await click('[data-act="controls"]'); await shot('controls'); await click('[data-act="back"]');
await click('[data-act="resume"]');
// fast-forward the game to the end (the human idles; the AI plays)
await pg.evaluate(() => { const a = window.__cs, m = a.session.match; m.clock = 25; a.debugStep(120 * 40); });
await pg.waitForFunction(() => window.__cs.screens.current === 'result', null, { timeout: 120000 });
await shot('result');
await click('[data-act="more"]'); await shot('result-box');
await click('[data-act="menu"]'); await expect('menu');
// my player
await click('[data-act="player"]'); await expect('player');
await click('[data-arch="shooter"]'); await click('[data-act="numUp"]');
await pg.fill('#pname', 'Tester'); await shot('my-player');
await click('[data-act="done"]');
const prof = await pg.evaluate(() => window.__cs.profile);
if (prof.name !== 'Tester' || prof.archetype !== 'shooter') errors.push('profile not saved ' + JSON.stringify(prof));
// visual style + how to play
await click('[data-act="style"]', 240000); await shot('style'); await click('[data-act="pick"][data-s="neo"]', 240000); await click('[data-act="back"]');
await click('[data-act="help"]'); await shot('howto'); await click('[data-act="back"]');
// 1v1 in the neo style
await click('[data-act="one"]'); await click('[data-act="go"]');
await pg.evaluate(() => { const a = window.__cs; a.input.dragMode = true; a.resume(); });
await pg.waitForFunction(() => window.__cs.session && !window.__cs.paused, null, { timeout: 30000 });
await pg.evaluate(() => { const a = window.__cs; a.session.match.checkerReady = true; a.debugStep(200); });
await shot('1v1-neo');
await pg.keyboard.press('KeyP'); await click('[data-act="exit"]'); await expect('menu');
// practice court: the coach card, then skip through the drills
await click('[data-act="practice"]'); await expect('practice'); await shot('practice-menu');
await click('[data-act="drills"]');
await pg.evaluate(() => { const a = window.__cs; a.input.dragMode = true; a.resume(); });
await pg.waitForFunction(() => window.__cs.session && !window.__cs.paused, null, { timeout: 30000 });
await shot('drill-1');
for (let i = 0; i < 6; i++) await pg.keyboard.press('Enter');
await pg.evaluate(() => window.__cs.debugStep(60));
await shot('drill-stance');
for (let i = 0; i < 4; i++) await pg.keyboard.press('Enter');
await pg.evaluate(() => window.__cs.debugStep(400));
await pg.waitForFunction(() => window.__cs.screens.current === 'presult', null, { timeout: 120000 });
await shot('drills-result');
await click('[data-act="practice"]');
// shootout: run the clock out
await click('[data-act="shootout"]');
await pg.evaluate(() => { const a = window.__cs; a.input.dragMode = true; a.resume(); });
await pg.waitForFunction(() => window.__cs.session && !window.__cs.paused, null, { timeout: 30000 });
await shot('shootout');
await pg.evaluate(() => window.__cs.debugStep(120 * 62));
await pg.waitForFunction(() => window.__cs.screens.current === 'presult', null, { timeout: 120000 });
await shot('shootout-result');
await click('[data-act="menu"]'); await expect('menu');
await b.close();
console.log(errors.length ? `FAILED: ${errors.length} problem(s)\n${errors.join('\n')}` : 'flow OK, no errors');
process.exit(errors.length ? 1 : 0);
