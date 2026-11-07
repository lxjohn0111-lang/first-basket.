// End-to-end browser flow through the real interface (needs `node server.js` on :8080):
// main menu -> full-court setup -> tip-off -> play -> result + box score -> main menu;
// pause menu, settings tabs, visual style, how to play, My Player; half court (1v1);
// career (create a player, hub tabs, training, a played game to its report, a simulated
// game, retire); practice court, shootout and their result screens. Fails on any page
// error or a dead button.
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
// full-court setup (the default game)
await click('[data-act="play"]'); await expect('setup'); await shot('setup');
await click('[data-act="awayNext"]');
await click('.seg[data-key="venue"] .opt[data-v="gym"]');
await click('.seg[data-key="teamSize"] .opt[data-v="4"]');
await click('.seg[data-key="teamSize"] .opt[data-v="5"]');
await click('[data-act="go"]'); await expect('click'); await shot('click-to-play');
await pg.evaluate(() => { const a = window.__cs; a.input.dragMode = true; a.resume(); });
await pg.waitForFunction(() => window.__cs.session && !window.__cs.paused, null, { timeout: 30000 });
const fc = await pg.evaluate(() => { const m = window.__cs.session.match; return { full: m.full, n: m.players.length, phase: m.phase }; });
if (!fc.full || fc.n !== 10 || fc.phase !== 'tip') errors.push('not a 5v5 full-court game at the tip: ' + JSON.stringify(fc));
await shot('tip-off');
await pg.evaluate(() => window.__cs.debugStep(120 * 8));
await shot('playing-full');
// pause menu and its screens
await pg.keyboard.press('KeyP'); await expect('pause'); await shot('pause');
await click('[data-act="stats"]'); await shot('box-live'); await click('[data-act="back"]');
await click('[data-act="settings"]'); await click('.tab[data-tab="video"]'); await shot('settings-video'); await click('[data-act="back"]');
await click('[data-act="controls"]'); await shot('controls'); await click('[data-act="back"]');
await click('[data-act="resume"]');
// fast-forward to the fourth quarter's last seconds (the human idles; the AI plays)
await pg.evaluate(() => { const a = window.__cs, m = a.session.match; m.period = 4; m.clock = 15; if (m.scoreline[0] === m.scoreline[1]) m.teams[0].score += 2; a.debugStep(120 * 30); });
await pg.waitForFunction(() => window.__cs.screens.current === 'result' || (window.__cs.session && window.__cs.session.match.phase === 'over'), null, { timeout: 120000 });
await pg.evaluate(() => { const s = window.__cs.session; if (s && s.match.inOvertime) { s.match.clock = 1; window.__cs.debugStep(120 * 20); } });
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
// half court: 1v1 in the neo style
await click('[data-act="half"]'); await expect('setup');
await click('.seg[data-key="format"] .opt[data-v="1v1"]'); await shot('half-setup');
await click('[data-act="go"]');
await pg.evaluate(() => { const a = window.__cs; a.input.dragMode = true; a.resume(); });
await pg.waitForFunction(() => window.__cs.session && !window.__cs.paused, null, { timeout: 30000 });
await pg.evaluate(() => { const a = window.__cs; a.session.match.checkerReady = true; a.debugStep(200); });
await shot('1v1-neo');
await pg.keyboard.press('KeyP'); await click('[data-act="exit"]'); await expect('menu');
// career: create a player, look around the hub, play a game to the report, simulate one
await click('[data-act="career"]'); await expect('careerNew');
await pg.fill('#cname', 'Rookie Test');
await click('[data-arch="guard"]'); await click('[data-club="westgate"]');
await shot('career-new');
await click('[data-act="start"]'); await expect('career'); await shot('career-hub');
for (const t of ['games', 'offers', 'train', 'stats', 'news', 'table']) { await click(`.tab[data-tab="${t}"]`); if (t === 'train' || t === 'table') await shot('career-' + t); }
await click('.seg[data-key="lg"] .opt[data-v="1"]');
await click('.tab[data-tab="train"]');
const p0 = await pg.evaluate(() => window.__cs.career.points);
await click('[data-train="shooting"]');
const p1 = await pg.evaluate(() => window.__cs.career.points);
if (!(p1 < p0)) errors.push(`training did not spend a point (${p0} -> ${p1})`);
await click('[data-act="play"]'); await expect('click');
await pg.evaluate(() => { const a = window.__cs; a.input.dragMode = true; a.resume(); });
await pg.waitForFunction(() => window.__cs.session && !window.__cs.paused, null, { timeout: 30000 });
const cm = await pg.evaluate(() => { const m = window.__cs.session.match, c = window.__cs.career; return { full: m.full, team: m.teams[m.human.team].id, club: c.clubId, shooting: m.human.attrs.shooting, cs: c.player.attrs.shooting }; });
if (!cm.full || cm.team !== cm.club || cm.shooting !== cm.cs) errors.push('career game not set up for the career player: ' + JSON.stringify(cm));
await pg.evaluate(() => window.__cs.debugStep(120 * 6));
await shot('career-game');
await pg.evaluate(() => { const a = window.__cs, m = a.session.match; m.period = 4; m.clock = 10; if (m.scoreline[0] === m.scoreline[1]) m.teams[0].score += 2; a.debugStep(120 * 30); });
await pg.evaluate(() => { const s = window.__cs.session; if (s && s.match.inOvertime) { s.match.clock = 1; window.__cs.debugStep(120 * 20); } });
await pg.waitForFunction(() => window.__cs.screens.current === 'careerResult', null, { timeout: 120000 });
await shot('career-result');
await click('[data-act="box"]'); await click('[data-act="go"]'); await expect('career');
const r1 = await pg.evaluate(() => window.__cs.career.round);
if (r1 !== 1) errors.push('the played career game did not count (round ' + r1 + ')');
await click('[data-act="sim"]'); await expect('careerResult'); await shot('career-sim');
await click('[data-act="go"]'); await expect('career');
await click('[data-act="menu"]'); await expect('menu');
await click('[data-act="career"]'); await expect('career');
await click('[data-act="retire"]'); await click('[data-yes]'); await expect('menu');
if (await pg.evaluate(() => !!window.__cs.career)) errors.push('retiring did not end the career');
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
