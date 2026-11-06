// Browser smoke screenshots (needs `node server.js` on :8080). Writes tests/out/*.png
// node tests/shots.mjs [what...]
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const base = 'http://localhost:' + (process.env.PORT || 8080) + '/index.html?fps=' + (process.env.FPS || 4);
const what = process.argv.slice(2);
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const errors = [];
async function page(url, w = 1280, h = 720) {
  const pg = await b.newPage({ viewport: { width: w, height: h } });
  pg.on('pageerror', (e) => { errors.push(e.message); console.log('PAGEERROR', e.message); });
  pg.on('console', (m) => { if (m.type() === 'error') { errors.push(m.text()); console.log('CONSOLE', m.text()); } });
  await pg.goto(url, { waitUntil: 'commit', timeout: 60000 });
  await pg.waitForFunction(() => window.__cs, null, { timeout: 60000 });
  return pg;
}
const shot = (pg, n) => pg.screenshot({ path: `tests/out/${n}.png`, timeout: 120000 }).then(() => console.log('shot', n));
if (!what.length || what.includes('menu')) {
  const pg = await page(base);
  await pg.waitForTimeout(2500); await shot(pg, 'menu');
  await pg.close();
}
if (!what.length || what.includes('game')) {
  for (const style of ['classic', 'neo']) {
    const pg = await page(base + `&auto=quick&live&style=${style}&home=harbor&away=summit`);
    await pg.waitForFunction(() => window.__cs.session, null, { timeout: 60000 });
    await pg.evaluate(() => { const a = window.__cs; a.input.dragMode = true; a.resume(); });
    await pg.waitForTimeout(1500); await shot(pg, `fp-${style}-check`);
    // start play and dribble forward a bit
    await pg.evaluate(() => { const a = window.__cs, m = a.session.match; m.checkerReady = true; a.debugStep(120); });
    await pg.keyboard.down('KeyW'); await pg.waitForTimeout(900); await pg.keyboard.up('KeyW');
    await shot(pg, `fp-${style}-dribble`);
    await pg.close();
  }
}
await b.close();
console.log(errors.length ? `ERRORS: ${errors.length}` : 'no errors');
