// The CrazyGames build (crazygames/upload/index.html) with a stand-in SDK (tests/fakes):
// the SDK is initialised before the game loads; progress (career, My Player, records,
// settings, style, tutorial) is saved through the data module and comes back after a
// reload; earlier localStorage saves are copied in once; gameplayStart / gameplayStop
// follow real play (pauses count as stops); happytime when a game is won; the platform
// mute silences the game; the player's name is the CrazyGames username (or the guest
// name); no ads are requested; a slow SDK never leaves the game loading for ever (it starts
// without it and connects it when it is ready); anything that stops the game before it
// starts is shown on the loading screen; a blocked SDK script doesn't stop the game; and
// on other domains ("disabled") or without the data module the game
// falls back to localStorage.
// Needs `npm run crazygames` first and `node server.js` running. Usage: node tests/crazygames.mjs
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const fake = fs.readFileSync(new URL('./fakes/crazygames-sdk.js', import.meta.url), 'utf8');
const BASE = 'http://localhost:' + (process.env.PORT || 8080) + '/crazygames/upload/index.html';
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const errors = [];
let fails = 0;
const check = (name, ok, info = '') => { console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${info ? ' - ' + info : ''}`); if (!ok) fails++; };

async function open(ctx, query = '') {
  const page = await ctx.newPage();
  page.setDefaultTimeout(180000);
  page.on('pageerror', (e) => { errors.push(e.message); console.log('PAGEERROR', e.message); });
  await page.route('https://sdk.crazygames.com/**', (r) => r.fulfill({ status: 200, contentType: 'application/javascript', body: fake }));
  await page.goto(`${BASE}?fps=4${query}`);
  await page.waitForFunction(() => window.__cs, null, { timeout: 60000 });
  await page.waitForTimeout(400);
  return page;
}
const calls = (page) => page.evaluate(() => window.__cg.calls.slice());

// ---------------------------------------------------------------- saving
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  // older saves in this browser's localStorage, from before the data module
  await ctx.addInitScript(() => {
    if (!sessionStorage.getItem('seeded')) {
      sessionStorage.setItem('seeded', '1');
      localStorage.setItem('courtside.tutorial', 'done');
      localStorage.setItem('courtside.settings.v1', JSON.stringify({ rev: 3, quality: 'medium', fov: 111 }));
    }
  });
  let page = await open(ctx);
  const st = await page.evaluate(() => ({ env: window.__cs.platform.env, saves: window.__cs.platform.saves, fov: window.__cs.settings.fov, screen: window.__cs.screens.current }));
  const c0 = await calls(page);
  check('the SDK is initialised before the game loads', c0[0] === 'init' && c0.indexOf('loadingStart') > 0 && c0.includes('loadingStop'), c0.slice(0, 5).join(','));
  check('saves go to the data module', st.env === 'crazygames' && st.saves === 'crazygames', JSON.stringify(st));
  check('earlier localStorage saves are copied into the data module once', st.fov === 111 && st.screen === 'menu' && (await page.evaluate(() => !!localStorage.getItem('cgcloud:courtside.settings.v1') && !!localStorage.getItem('cgcloud:courtside.tutorial'))));
  // a new career through the screens, and a settings change saved on Done
  await page.click('[data-act="career"]');
  await page.click('[data-club="maple"]');
  await page.click('[data-act="start"]');
  await page.click('.tab[data-tab="train"]');
  await page.click('[data-train="shooting"]');
  await page.click('[data-act="menu"]');
  await page.click('[data-act="settings"]');
  await page.click('.tab[data-tab="controls"]');
  await page.locator('#s-sens').fill('1.7');
  await page.click('[data-act="back"]');
  const stored = await page.evaluate(() => ({ cloud: !!localStorage.getItem('cgcloud:courtside.career'), local: !!localStorage.getItem('courtside.career'), sens: JSON.parse(localStorage.getItem('cgcloud:courtside.settings.v1')).sensitivity, shooting: JSON.parse(localStorage.getItem('cgcloud:courtside.career')).player.attrs.shooting }));
  check('the career and the settings are written through the data module only', stored.cloud && !stored.local && stored.sens === 1.7, JSON.stringify(stored));
  const kb = await page.evaluate(() => Math.round(localStorage.getItem('cgcloud:courtside.career').length / 1024));
  check('a career save is small (well under the 1 MB limit)', kb < 100, `${kb} KB`);
  await page.reload();
  await page.waitForFunction(() => window.__cs, null, { timeout: 60000 });
  await page.waitForTimeout(400);
  const back = await page.evaluate(() => ({ club: window.__cs.career && window.__cs.career.clubId, shooting: window.__cs.career && window.__cs.career.player.attrs.shooting, sens: window.__cs.settings.sensitivity }));
  check('after a reload the career and the settings come back from the data module', back.club === 'maple' && back.shooting === stored.shooting && back.sens === 1.7, JSON.stringify(back));
  // the player's name: a guest plays under the guest name, with no text field
  await page.click('[data-act="player"]');
  const guest = await page.evaluate(() => ({ field: !!document.querySelector('#pname'), name: window.__cs.profile.name, career: window.__cs.career.player.name }));
  check('a guest plays under the guest name (no name field)', !guest.field && guest.name === 'Rookie' && guest.career === 'Rookie', JSON.stringify(guest));
  await page.evaluate(() => window.__cg.login('HoopFan'));
  await page.waitForTimeout(200);
  const named = await page.evaluate(() => ({ name: window.__cs.profile.name, career: window.__cs.career.player.name, shown: document.querySelector('.panel .field').textContent }));
  check('logging in during the session switches to the CrazyGames username', named.name === 'HoopFan' && named.career === 'HoopFan' && /HoopFan/.test(named.shown), JSON.stringify(named));
  await page.close();
  await ctx.close();
}

// ---------------------------------------------------------------- play events, happytime, mute, no ads
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  await ctx.addInitScript(() => { localStorage.setItem('cgcloud:courtside.tutorial', 'done'); });
  const page = await open(ctx, '&muteAudio=true&cguser=Baller');
  const m0 = await page.evaluate(() => window.__cs.audio.platformMute);
  await page.evaluate(() => window.__cg.setMute(false));
  const m1 = await page.evaluate(() => window.__cs.audio.platformMute);
  check('the platform mute silences the game, and lifting it un-mutes', m0 === true && m1 === false);
  const named = await page.evaluate(() => window.__cs.profile.name);
  check('a logged-in player plays under their username', named === 'Baller', named);
  // a quick game: gameplay starts with play, stops on pause, and a win is a happytime
  await page.click('[data-act="play"]');
  await page.click('[data-act="go"]');
  const before = (await calls(page)).filter((x) => x === 'gameplayStart').length;
  await page.evaluate(() => { const a = window.__cs; a.input.dragMode = true; a.resume(); });
  await page.waitForTimeout(800);
  const c1 = await calls(page);
  check('gameplayStart when play starts (not while the click-to-play card is up)', before === 0 && c1.filter((x) => x === 'gameplayStart').length === 1 && c1[c1.length - 1] === 'gameplayStart', c1.slice(-3).join(','));
  await page.keyboard.press('KeyP');
  await page.waitForTimeout(500);
  const c2 = await calls(page);
  check('gameplayStop when the game is paused', c2[c2.length - 1] === 'gameplayStop', c2.slice(-2).join(','));
  await page.evaluate(() => { const a = window.__cs; a.resume(); });
  await page.waitForTimeout(500);
  await page.evaluate(() => { const a = window.__cs, m = a.session.match; m.period = 4; m.clock = 3; m.teams[m.human.team].score = m.teams[1 - m.human.team].score + 9; a.debugStep(120 * 12); });
  await page.waitForFunction(() => window.__cs.screens.current === 'result', null, { timeout: 120000 });
  await page.waitForTimeout(500);
  const c3 = await calls(page);
  check('a win is a happytime, and the result screen is a gameplayStop', c3.includes('happytime') && c3[c3.length - 1] !== 'gameplayStart', c3.slice(-3).join(','));
  check('no ads are requested', !c3.some((x) => /requestAd|requestBanner/.test(x)));
  await page.close();
  await ctx.close();
}

// ---------------------------------------------------------------- first visit on CrazyGames
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await open(ctx, '&tutorial');
  const t = await page.evaluate(() => ({ kind: window.__cs.session && window.__cs.session.cfg.practice.kind }));
  check('a first visit starts the tutorial', t.kind === 'tutorial');
  await page.evaluate(() => { const a = window.__cs; a.input.dragMode = true; a.resume(); });
  await page.waitForTimeout(500);
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => window.__cs.screens.current === 'ready', null, { timeout: 120000 });
  const saved = await page.evaluate(() => localStorage.getItem('cgcloud:courtside.tutorial'));
  check('the tutorial flag is saved through the data module', saved === 'skipped', saved);
  await page.close();
  await ctx.close();
}

// ---------------------------------------------------------------- a slow SDK, a missing game.js
{
  // the SDK takes longer than the game waits: the game starts without it and connects it later
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  await ctx.addInitScript(() => { localStorage.setItem('courtside.tutorial', 'done'); });
  const page = await ctx.newPage();
  page.setDefaultTimeout(180000);
  page.on('pageerror', (e) => { errors.push(e.message); console.log('PAGEERROR', e.message); });
  await page.route('https://sdk.crazygames.com/**', (r) => r.fulfill({ status: 200, contentType: 'application/javascript', body: fake }));
  await page.goto(`${BASE}?fps=4&cginitdelay=34000`);
  await page.waitForTimeout(4000);
  const waiting = await page.evaluate(() => document.getElementById('boot') && document.getElementById('boot').textContent);
  check('while the SDK gets ready the loading screen says so', /Connecting to CrazyGames/.test(waiting || ''), waiting);
  await page.waitForFunction(() => window.__cs, null, { timeout: 60000 });
  const early = await page.evaluate(() => ({ env: window.__cs.platform.env, saves: window.__cs.platform.saves, screen: window.__cs.screens.current }));
  check('a slow SDK: the game starts without it after the wait (no endless loading)', early.env === 'disabled' && early.screen === 'menu', JSON.stringify(early));
  await page.waitForFunction(() => window.__cs.platform.sdk, null, { timeout: 30000 });
  await page.waitForTimeout(300);
  const late = await page.evaluate(() => ({ env: window.__cs.platform.env, saves: window.__cs.platform.saves, calls: window.__cg.calls.filter((x) => /loading|gameplay/.test(x)) }));
  check('when the SDK is ready later it is connected (loading events, saves to the data module)', late.env === 'crazygames' && late.saves === 'crazygames' && late.calls.includes('loadingStart') && late.calls.includes('loadingStop'), JSON.stringify(late));
  await page.evaluate(() => { const a = window.__cs; a.settings.fov = 103; a.applySettings(); a.commitSettings(); });
  const cloud = await page.evaluate(() => !!localStorage.getItem('cgcloud:courtside.settings.v1') && !!localStorage.getItem('cgcloud:courtside.tutorial'));
  check('after connecting, saves go through the data module (earlier ones copied in)', cloud);
  await page.close();
  await ctx.close();
}
{
  // something stops the game before it starts: the loading screen shows the browser's error
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await ctx.newPage();
  await page.route('https://sdk.crazygames.com/**', (r) => r.fulfill({ status: 200, contentType: 'application/javascript', body: fake }));
  await page.route('**/crazygames/upload/index.html*', async (r) => {
    const res = await r.fetch();
    const html = (await res.text()).replace(/<script>\n\/\* Courtside[\s\S]*<\/script>\n<\/body>/, '<script>\nthrow new Error("test failure before start");\n</script>\n</body>');
    r.fulfill({ response: res, body: html });
  });
  await page.goto(`${BASE}?fps=4`);
  await page.waitForTimeout(16500);
  const txt = await page.evaluate(() => document.getElementById('boot') && document.getElementById('boot').textContent);
  check('if the game cannot start, the loading screen shows why (not "Loading" for ever)', /did not start/i.test(txt || '') && /test failure before start/.test(txt || ''), txt);
  await page.close();
  await ctx.close();
}
{
  // the SDK script itself can't be loaded (blocked): the game still starts, without it
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  await ctx.addInitScript(() => { localStorage.setItem('courtside.tutorial', 'done'); });
  const page = await ctx.newPage();
  await page.route('https://sdk.crazygames.com/**', (r) => r.abort('blockedbyclient'));
  await page.goto(`${BASE}?fps=4`);
  await page.waitForFunction(() => window.__cs && window.__cs.screens.current, null, { timeout: 60000 });
  const st = await page.evaluate(() => ({ env: window.__cs.platform.env, screen: window.__cs.screens.current }));
  check('with the SDK script blocked the game still starts', st.env === 'none' && st.screen === 'menu', JSON.stringify(st));
  await page.close();
  await ctx.close();
}

// ---------------------------------------------------------------- fallbacks
for (const [q, what] of [['&cgenv=disabled', 'on another domain (SDK disabled)'], ['&cgdata=off', 'with the data module off']]) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  await ctx.addInitScript(() => { localStorage.setItem('courtside.tutorial', 'done'); });
  const page = await open(ctx, q);
  await page.evaluate(() => { const a = window.__cs; a.settings.fov = 104; a.applySettings(); a.commitSettings(); });
  const r = await page.evaluate(() => ({ saves: window.__cs.platform.saves, local: !!localStorage.getItem('courtside.settings.v1'), screen: window.__cs.screens.current }));
  check(`${what}: the game runs and saves to localStorage`, r.saves === 'localStorage' && r.local && r.screen === 'menu', JSON.stringify(r));
  await page.close();
  await ctx.close();
}

await browser.close();
if (errors.length) { console.log('page errors:', errors.join('\n')); fails += errors.length; }
console.log(fails ? `${fails} FAILED` : 'crazygames build OK');
process.exit(fails ? 1 : 0);
