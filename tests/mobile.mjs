// Phone emulation with touch: the touch buttons, the compact HUD and the menus fit.
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
await b.close();
console.log(errors.length ? 'FAILED ' + errors.join('; ') : 'mobile OK');
process.exit(errors.length ? 1 : 0);
