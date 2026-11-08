// The CrazyGames build with the REAL SDK v3 (https://sdk.crazygames.com, needs network
// access to it). A small parent page plays the part of the CrazyGames page around the
// game (the SDK's handshake, its init answer and the signed-out user), so the SDK runs
// in its "crazygames" environment: the game must load quickly, use the data module and
// report loading start / stop. Opened on any other host, the SDK gives up on the page
// after 7 s and the game must still load (without it).
// Needs `npm run crazygames` first and `node server.js` running on :8080.
import { createRequire } from 'node:module';
import http from 'node:http';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
let fails = 0;
const check = (name, ok, info = '') => { console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${info ? ' - ' + info : ''}`); if (!ok) fails++; };
const GAME = 'http://game.test:8080/crazygames/upload/index.html';
const parent = `<!doctype html><html><body style="margin:0"><iframe src="${GAME}?fps=4" style="width:1100px;height:600px;border:0"></iframe>
<script>
window.__msgs = [];
const config = { gameLink: 'https://www.crazygames.com/preview/courtside', gameId: 'courtside', dataModule: { isEnabled: true }, userAccountAvailable: true,
  systemInfo: { countryCode: 'HU', locale: 'en-US', device: { type: 'desktop' }, os: { name: 'Linux' }, browser: { name: 'Chrome' } } };
window.addEventListener('message', (e) => {
  const d = e.data || {};
  window.__msgs.push(d.type || '');
  if (d.type === 'checkCrazyGamesGF') e.source.postMessage({ type: 'crazyGamesGFConfirmation' }, '*');
  if (d.type === 'init-js-sdk') {
    e.source.postMessage({ type: 'initialized', data: config }, '*');
    setTimeout(() => e.source.postMessage({ messageTarget: 'sdk', type: 'initialUserSet', data: { user: null } }, '*'), 50);
  }
});
</script></body></html>`;
const srv = http.createServer((q, r) => { r.writeHead(200, { 'content-type': 'text/html' }); r.end(parent); }).listen(8091);
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--host-resolver-rules=MAP game.test 127.0.0.1, MAP parent.test 127.0.0.1'] });
const errors = [];
const state = (f) => f.evaluate(() => ({ cs: !!window.__cs, env: window.__cs && window.__cs.platform.env, saves: window.__cs && window.__cs.platform.saves, screen: window.__cs && window.__cs.screens.current, sdk: window.CrazyGames && window.CrazyGames.SDK && window.CrazyGames.SDK.environment }));

// on CrazyGames (the page emulated)
{
  const page = await browser.newPage({ viewport: { width: 1143, height: 620 } });
  page.on('pageerror', (e) => errors.push(e.message));
  const t0 = Date.now();
  await page.goto('http://parent.test:8091/', { waitUntil: 'commit' });
  let f = null, st = null;
  for (let i = 0; i < 60 && !(st && st.cs); i++) {
    await page.waitForTimeout(500);
    f = page.frames().find((fr) => fr.url().includes('game.test'));
    if (f) st = await state(f).catch(() => null);
  }
  const secs = (Date.now() - t0) / 1000;
  check('the real SDK initialises in its "crazygames" environment', st && st.sdk === 'crazygames', JSON.stringify(st));
  check('the game loads quickly on CrazyGames', st && st.cs && st.screen && secs < 15, `${secs.toFixed(1)} s, screen ${st && st.screen}`);
  check('saves go through the data module', st && st.env === 'crazygames' && st.saves === 'crazygames');
  const msgs = await page.evaluate(() => window.__msgs);
  check('the page hears loading start and stop', msgs.includes('sdkGameLoadingStart') && msgs.includes('sdkGameLoadingStop'), msgs.filter((m) => /Loading|useDataModule|getUser/.test(m)).slice(0, 6).join(','));
  await page.close();
}
// on another host (not CrazyGames)
{
  const page = await browser.newPage({ viewport: { width: 1143, height: 620 } });
  page.on('pageerror', (e) => errors.push(e.message));
  const t0 = Date.now();
  await page.goto(GAME + '?fps=4', { waitUntil: 'commit' });
  await page.waitForFunction(() => window.__cs && window.__cs.screens.current, null, { timeout: 60000 });
  const st = await state(page.mainFrame());
  const secs = (Date.now() - t0) / 1000;
  check('elsewhere the game still loads (the SDK is "disabled")', st.sdk === 'disabled' && st.env === 'disabled' && st.saves === 'localStorage' && secs < 15, `${secs.toFixed(1)} s ${JSON.stringify(st)}`);
  await page.close();
}
await browser.close();
srv.close();
if (errors.length) { console.log('page errors:\n' + errors.join('\n')); fails += errors.length; }
console.log(fails ? `${fails} FAILED` : 'real SDK checks OK');
process.exit(fails ? 1 : 0);
