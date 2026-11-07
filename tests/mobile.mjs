// Phone emulation with touch: the touch buttons, the compact HUD (half and full court)
// and the menus (including the career hub) fit.
// node tests/mobile.mjs  (needs `node server.js` on :8080; screenshots in tests/out/)
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium, devices } = require('playwright');
const base = 'http://localhost:' + (process.env.PORT || 8080) + '/index.html?fps=3&nofs';
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const ctx = await b.newContext({ ...devices['Pixel 7 landscape'] });
const pg = await ctx.newPage();
const errors = [];
pg.on('pageerror', (e) => errors.push(e.message));
await pg.goto(base, { waitUntil: 'commit', timeout: 60000 });
await pg.waitForFunction(() => window.__cs, null, { timeout: 60000 });
await pg.waitForTimeout(1500);
await pg.screenshot({ path: 'tests/out/mobile-menu.png', timeout: 120000 });
await pg.tap('[data-act="practice"]');
await pg.tap('[data-act="free"]');
await pg.waitForTimeout(800);
await pg.tap('.screen', { timeout: 30000 });
await pg.waitForFunction(() => window.__cs.session && !window.__cs.paused, null, { timeout: 30000 });
await pg.waitForTimeout(1500);
await pg.screenshot({ path: 'tests/out/mobile-attack.png', timeout: 120000 });
const vis = await pg.evaluate(() => ({ touch: window.__cs.input.touchMode, buttons: [...document.querySelectorAll('.tc-btn:not(.off)')].map((e) => e.textContent) }));
console.log(JSON.stringify(vis));
if (!vis.touch || !vis.buttons.includes('SHOOT')) errors.push('touch controls not shown');
// a full-court game: the compact full-court radar and the touch buttons
await pg.goto(base + '&auto=quick&live', { waitUntil: 'commit', timeout: 60000 });
await pg.waitForFunction(() => window.__cs && window.__cs.session, null, { timeout: 60000 });
await pg.evaluate(() => { const a = window.__cs; a.resume(); a.debugStep(120 * 8); });
await pg.waitForTimeout(1500);
await pg.screenshot({ path: 'tests/out/mobile-full.png', timeout: 120000 });
const radar = await pg.evaluate(() => { const r = document.querySelector('.hud-radar'); const b = r.getBoundingClientRect(); return { full: r.classList.contains('full'), w: b.width, h: b.height }; });
if (!radar.full || radar.h <= radar.w) errors.push('full-court radar not shown: ' + JSON.stringify(radar));
// the career hub fits a phone
await pg.goto(base, { waitUntil: 'commit', timeout: 60000 });
await pg.waitForFunction(() => window.__cs, null, { timeout: 60000 });
await pg.tap('[data-act="career"]');
await pg.tap('[data-act="start"]');
await pg.waitForTimeout(800);
await pg.screenshot({ path: 'tests/out/mobile-career.png', timeout: 120000 });
const over = await pg.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1 || [...document.querySelectorAll('.hub *')].some((e) => e.getBoundingClientRect().right > innerWidth + 2));
if (over) errors.push('the career hub is wider than the screen');
await b.close();
console.log(errors.length ? 'FAILED ' + errors.join('; ') : 'mobile OK');
process.exit(errors.length ? 1 : 0);
