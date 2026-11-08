// The first-run tutorial in the browser (needs `node server.js` on :8080):
// a first visit goes straight into the tutorial (no menu); every step is done with the
// real controls (the HumanController the mouse, keyboard and touch feed); the end asks
// "Are you ready?" and its button starts a 5v5 full-court game; a second visit opens
// the main menu; Skip (Enter) jumps to the same question.
// node tests/tutorial.mjs   (screenshots in tests/out/tutorial-*.png)
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const base = 'http://localhost:' + (process.env.PORT || 8080) + '/index.html?fps=' + (process.env.FPS || 4);
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const errors = [];
let n = 0;
async function open(ctx, url) {
  const pg = await ctx.newPage();
  pg.setDefaultTimeout(120000);
  pg.on('pageerror', (e) => { errors.push(e.message); console.log('PAGEERROR', e.message); });
  pg.on('console', (m) => { if (m.type() === 'error') { errors.push(m.text()); console.log('CONSOLE', m.text()); } });
  await pg.goto(url, { waitUntil: 'commit', timeout: 60000 });
  await pg.waitForFunction(() => window.__cs, null, { timeout: 60000 });
  return pg;
}
const shot = async (pg, name) => { await pg.waitForTimeout(600); await pg.screenshot({ path: `tests/out/tutorial-${String(++n).padStart(2, '0')}-${name}.png`, timeout: 120000 }); console.log('shot', name); };
const check = (c, msg) => { console.log(`${c ? 'ok  ' : 'FAIL'} ${msg}`); if (!c) errors.push(msg); };

// ---------------------------------------------------------------- a first visit, played through
{
  const ctx = await b.newContext({ viewport: { width: 1280, height: 720 } });
  const pg = await open(ctx, base + '&tutorial');
  const first = await pg.evaluate(() => { const a = window.__cs; return { screen: a.screens.current, kind: a.session && a.session.cfg.practice && a.session.cfg.practice.kind, menu: !!a.menuSession }; });
  check(first.kind === 'tutorial' && first.screen === 'click' && !first.menu, `a first visit starts the tutorial, not the menu (${JSON.stringify(first)})`);
  await pg.evaluate(() => { const a = window.__cs; a.input.dragMode = true; a.resume(); });
  await pg.waitForFunction(() => !window.__cs.paused, null, { timeout: 30000 });
  await shot(pg, 'look');
  // drive the player through the real controller, the simulation stepped by the test
  await pg.evaluate(() => {
    const a = window.__cs, s = a.session, m = s.match, ctl = s.ctl, h = m.human, t = s.cfg.practice;
    s.paused = true; // the page stops feeding the (idle) mouse and keyboard; the test drives
    const HX = 12.425;
    const yawTo = (x, z) => Math.atan2(x - h.pos.x, z - h.pos.z);
    const step = (k) => { for (let i = 0; i < k; i++) { m.step(1 / 120); t.step(s, 1 / 120); } };
    const idle = () => { const c = ctl.input; c.moveF = 0; c.moveR = 0; c.sprint = false; };
    const shoot = () => {
      ctl.input.yaw = yawTo(HX, 0); ctl.input.lmb = true; ctl.press('shoot');
      for (let i = 0; i < 300; i++) { step(1); const ac = h.action; if (ac && ac.type === 'shot' && ac.charge >= ac.spot.c) break; }
      ctl.input.lmb = false; ctl.release('shoot'); step(240);
    };
    const log = [];
    const at = () => t.idx;
    // until the step is done (the card flashes) or the time runs out, then on to the next
    const busy = (i0) => t.idx === i0 && !t.done && !(t.gap > 0);
    const next = (i0, name) => { idle(); for (let k = 0; k < 400 && t.idx === i0 && !t.done; k++) step(3); const r = t.results[i0]; log.push([name, t.idx > i0 || t.done, r && r.done]); };
    // 1 look: turn to the basket
    let i0 = at(); ctl.input.yaw = yawTo(HX, 0); for (let k = 0; k < 200 && busy(i0); k++) step(3); next(i0, 'look');
    // 2 dribble to the gold circle
    i0 = at(); for (let k = 0; k < 800 && busy(i0); k++) { const sp = t.spot; ctl.input.yaw = yawTo(sp.x, sp.z); ctl.input.moveF = Math.hypot(sp.x - h.pos.x, sp.z - h.pos.z) > 0.3 ? 1 : 0; step(3); } next(i0, 'dribble');
    // 3 a jump shot released in the green
    const shootNow = (i) => {
      ctl.input.yaw = yawTo(HX, 0); ctl.input.lmb = true; ctl.press('shoot');
      for (let k = 0; k < 300; k++) { step(1); const ac = h.action; if (ac && ac.type === 'shot' && ac.charge >= ac.spot.c) break; }
      ctl.input.lmb = false; ctl.release('shoot');
      for (let k = 0; k < 100 && busy(i) && !(m.ball.shot && m.ball.shot.done) && m.ball.owner !== t.reb; k++) step(3);
    };
    i0 = at(); for (let k = 0; k < 6 && busy(i0); k++) { for (let w = 0; w < 300 && m.ball.owner !== h && busy(i0); w++) step(3); if (busy(i0)) shootNow(i0); }
    next(i0, 'shoot');
    // 4 sprint at the rim and finish
    i0 = at(); for (let k = 0; k < 4 && busy(i0); k++) {
      for (let w = 0; w < 300 && m.ball.owner !== h && busy(i0); w++) step(3);
      for (let w = 0; w < 400 && busy(i0) && Math.hypot(HX - h.pos.x, h.pos.z) > 2.2; w++) { ctl.input.yaw = yawTo(HX - 0.8, 0); ctl.input.moveF = 1; ctl.input.sprint = true; step(2); }
      idle(); if (busy(i0)) shootNow(i0);
    }
    next(i0, 'layup');
    // 5 pass to Jojo (he passes it back)
    i0 = at(); for (let k = 0; k < 4 && busy(i0); k++) { ctl.input.yaw = yawTo(t.reb.pos.x, t.reb.pos.z); step(30); ctl.press('pass'); for (let w = 0; w < 150 && busy(i0); w++) step(3); }
    next(i0, 'pass');
    // 6 steal from Barry: get close, poke when the dribble is low
    i0 = at(); for (let k = 0; k < 2500 && busy(i0); k++) {
      const d = t.dummy, dist = Math.hypot(d.pos.x - h.pos.x, d.pos.z - h.pos.z);
      ctl.input.yaw = yawTo(m.ball.pos.x, m.ball.pos.z);
      ctl.input.moveF = dist > 1.0 ? 1 : 0;
      if (dist < 1.25 && m.ball.owner === d && m.ball.pos.y < 0.7 && m.time >= h.stealReadyAt) ctl.press('steal');
      step(3);
    }
    next(i0, 'steal');
    window.__tutlog = log;
    s.paused = false;
  });
  const log = await pg.evaluate(() => window.__tutlog);
  for (const [name, advanced, done] of log) check(advanced, `step "${name}" ${done === false ? 'moved on (cap)' : 'completed'}`);
  const sum = await pg.evaluate(() => window.__cs.session && window.__cs.session.cfg.practice.summary());
  console.log('     summary', JSON.stringify(sum));
  check(sum && sum.done >= 5 && sum.completed, `the tutorial was played to the end, at least 5 of 6 steps done with the real controls (${sum && sum.done})`);
  await pg.waitForFunction(() => window.__cs.screens.current === 'ready', null, { timeout: 120000 });
  await shot(pg, 'ready');
  const txt = await pg.evaluate(() => document.querySelector('.ready').textContent);
  check(/Are you ready\?/.test(txt) && /Play 5v5/.test(txt), 'the end asks "Are you ready?" with a Play 5v5 button');
  await pg.evaluate(() => { window.__cs.input.dragMode = true; });
  await pg.click('[data-act="go"]');
  await pg.waitForFunction(() => window.__cs.session && window.__cs.session.match.full, null, { timeout: 60000 });
  await pg.waitForTimeout(800);
  const game = await pg.evaluate(() => { const a = window.__cs, m = a.session.match; return { players: m.players.length, phase: m.phase, screen: a.screens.current, paused: a.paused, practice: !!a.session.cfg.practice }; });
  check(game.players === 10 && !game.practice && game.screen !== 'menu', `the button starts a 5v5 full-court game (${JSON.stringify(game)})`);
  await shot(pg, 'first-game');
  const seen = await pg.evaluate(() => localStorage.getItem('courtside.tutorial'));
  check(seen === 'done', `the tutorial is remembered (${seen})`);
  // a second visit: the main menu
  await pg.close();
  const pg2 = await open(ctx, base + '&tutorial');
  await pg2.waitForTimeout(500);
  const second = await pg2.evaluate(() => ({ screen: window.__cs.screens.current, session: !!window.__cs.session }));
  check(second.screen === 'menu' && !second.session, `a second visit opens the main menu (${JSON.stringify(second)})`);
  // replay from Practice
  await pg2.click('[data-act="practice"]');
  await pg2.click('[data-act="tutorial"]');
  const replay = await pg2.evaluate(() => window.__cs.session && window.__cs.session.cfg.practice.kind);
  check(replay === 'tutorial', 'the tutorial can be replayed from Practice');
  await pg2.close();
  await ctx.close();
}

// ---------------------------------------------------------------- skipping it
{
  const ctx = await b.newContext({ viewport: { width: 1280, height: 720 } });
  const pg = await open(ctx, base + '&tutorial');
  await pg.evaluate(() => { const a = window.__cs; a.input.dragMode = true; a.resume(); });
  await pg.waitForFunction(() => !window.__cs.paused, null, { timeout: 30000 });
  await pg.keyboard.press('Enter');
  await pg.waitForFunction(() => window.__cs.screens.current === 'ready', null, { timeout: 120000 });
  const txt = await pg.evaluate(() => document.querySelector('.ready').textContent);
  check(/skipped/i.test(txt), 'Enter skips the tutorial to the same question');
  const seen = await pg.evaluate(() => localStorage.getItem('courtside.tutorial'));
  check(seen === 'skipped', 'a skipped tutorial is not shown again');
  await ctx.close();
}

// ---------------------------------------------------------------- on a phone
{
  const { devices } = require('playwright');
  const ctx = await b.newContext({ ...devices['Pixel 7 landscape'] });
  const pg = await open(ctx, base + '&tutorial&nofs');
  await pg.tap('.screen');
  await pg.waitForFunction(() => window.__cs.session && !window.__cs.paused, null, { timeout: 30000 });
  await pg.waitForTimeout(1200);
  await shot(pg, 'phone');
  const info = await pg.evaluate(() => ({ hint: document.querySelector('.coach-hint').textContent, buttons: [...document.querySelectorAll('.tc-btn:not(.off)')].map((e) => e.textContent), coach: document.querySelector('.coach').getBoundingClientRect().right <= innerWidth }));
  check(/Drag|thumb/i.test(info.hint) && info.buttons.includes('SHOOT') && info.coach, `touch hints and buttons on a phone (${JSON.stringify(info)})`);
  await ctx.close();
}

await b.close();
console.log(errors.length ? `FAILED: ${errors.length} problem(s)\n${errors.join('\n')}` : 'tutorial OK, no errors');
process.exit(errors.length ? 1 : 0);
