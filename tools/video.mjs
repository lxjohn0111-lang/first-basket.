// Records a gameplay video for the store page: a 5v5 full-court game seen through the
// player's eyes, played by the scripted test bot (tests/bot.mjs) through the real
// controls, with no interface at all (adapted from First Touch's recorder). The game itself
// is untouched: the recorder only hides the HTML overlay and the helper rings in its own
// browser page, drives the game frame by frame and screenshots every frame, then encodes
// them with ffmpeg (H.264, no audio track).
//
// It first plays games without drawing to find a stretch that ends with a basket by the
// player (the clip ends just after it), then replays that same (deterministic) game and
// records the chosen seconds.
//
// Usage: node tools/video.mjs [--seconds 18] [--fps 30] [--width 1920] [--height 1080]
//          [--render-width 1280 --render-height 720]  (render smaller, scale up with lanczos)
//          [--fov 100]  (the game's field of view setting)
//          [--home harbor] [--away summit] [--style classic] [--seed 1] [--tries 10]
//          [--out crazygames/video/courtside-landscape.mp4]
// Needs Playwright with Chromium and an ffmpeg with libx264 (FFMPEG=/path/to/ffmpeg).
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import * as esbuild from 'esbuild';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const SECONDS = Number(arg('seconds', 18)), FPS = Number(arg('fps', 30));
const W = Number(arg('width', 1920)), H = Number(arg('height', 1080));
const HOME = arg('home', 'harbor'), AWAY = arg('away', 'summit'), STYLE = arg('style', 'classic');
const SEED0 = Number(arg('seed', 1)), TRIES = Number(arg('tries', 10));
const AFTER = Number(arg('after', 0.6)); // seconds kept after the player's basket
const OUT = path.resolve(root, arg('out', `crazygames/video/courtside-${W >= H ? 'landscape' : 'portrait'}.mp4`));
const RW = Number(arg('render-width', W)), RH = Number(arg('render-height', H));
// the field of view setting (in a portrait frame the game uses it as the vertical angle)
const FOV = Number(arg('fov', 100));
const FFMPEG = process.env.FFMPEG || 'ffmpeg';
const FRAMES = SECONDS * FPS;
const STEPS = Math.round(120 / FPS); // fixed 120 Hz simulation steps per video frame

// the scripted player, bundled for the page
const botJs = (await esbuild.build({ entryPoints: [path.join(root, 'tests/bot.mjs')], bundle: true, format: 'iife', globalName: 'BotLib', write: false })).outputFiles[0].text;

const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--allow-file-access-from-files'] });

async function openGame(seed) {
  const page = await browser.newPage({ viewport: { width: RW, height: RH }, deviceScaleFactor: 1 });
  page.setDefaultTimeout(600000);
  await page.addInitScript((fov) => {
    localStorage.setItem('courtside.tutorial', 'done');
    localStorage.setItem('courtside.settings.v1', JSON.stringify({ rev: 3, quality: 'high', touch: 'off', fov }));
  }, FOV);
  // not "live": the game waits behind its click-to-play card until the recorder takes over,
  // so every run of a seed starts from exactly the same state
  const url = `${pathToFileURL(path.join(root, 'index.html')).href}?auto=quick&home=${HOME}&away=${AWAY}&venue=arena&style=${STYLE}&seed=${seed}&quarter=300&size=5&nofs`;
  await page.goto(url);
  await page.waitForFunction(() => window.__cs && window.__cs.session, null, { timeout: 120000 });
  await page.addScriptTag({ content: botJs });
  // recorder-only setup: no HTML overlay, no helper rings, the game driven by hand
  await page.addStyleTag({ content: '#ui { display: none !important; }' });
  await page.evaluate(({ STEPS, FPS, seed }) => {
    const a = window.__cs, s = a.session, m = s.match, v = a.view;
    a.loop = () => {};
    a.screens.clear();
    a.paused = false;
    v.markers.group.visible = false;
    s.paused = true; // the session only draws; the recorder steps the simulation itself
    const bot = new window.BotLib.Bot(m, s.ctl, { seed: 7000 + seed, noise: 0.03 });
    const wrap = (x) => { while (x > Math.PI) x -= Math.PI * 2; while (x < -Math.PI) x += Math.PI * 2; return x; };
    const rec = { frame: 0, shots: [], baskets: [] };
    m.events.on('shot', (e) => { if (e.player === m.human) rec.shots.push({ f: rec.frame, kind: e.kind }); });
    m.events.on('basket', (e) => rec.baskets.push({ f: rec.frame, mine: e.player === m.human, team: e.team === m.human.team, kind: e.kind }));
    window.__rec = rec;
    // one video frame: the bot plays through the real controls, the camera follows its
    // look like a hand on a mouse would (smoothly)
    window.__advance = (draw) => {
      for (let i = 0; i < STEPS; i++) { bot.update(); m.step(1 / 120); }
      const ci = s.ctl.input, k = 1 - Math.exp(-10 / FPS);
      s.cam.yaw += wrap(ci.yaw - s.cam.yaw) * k;
      s.cam.pitch += (-0.06 - s.cam.pitch) * k;
      if (draw) s.frame(1 / FPS);
      rec.frame++;
    };
    s.cam.yaw = s.ctl.input.yaw = m.human.yaw;
  }, { STEPS, FPS, seed });
  return page;
}

// 1) find a stretch that ends with a basket by the player (no drawing: fast)
let pick = null;
for (let t = 0; t < TRIES; t++) {
  const seed = SEED0 + t;
  const page = await openGame(seed);
  const total = 60 * FPS * 4; // the first four minutes of play
  const r = await page.evaluate((total) => { for (let i = 0; i < total; i++) window.__advance(false); return window.__rec; }, total);
  await page.close();
  console.log(`seed ${seed}: ${r.shots.length} shots by the player, baskets ${r.baskets.map((g) => `${g.mine ? `player(${g.kind})` : g.team ? 'team' : 'opp'}@${(g.f / FPS).toFixed(1)}s`).join(' ') || 'none'}`);
  // a basket by the player near the end of the clip (3 s of celebration after it), no
  // basket by the other team in the clip, and as many of the player's own shots as possible
  for (const g of r.baskets) {
    if (!g.mine) continue;
    const end = g.f + Math.round(AFTER * FPS), start = end - FRAMES;
    if (end > total || start < FPS * 3 || r.baskets.some((o) => o !== g && !o.team && o.f >= start && o.f < end)) continue;
    const shots = r.shots.filter((k) => k.f >= start && k.f < end).length;
    // a dunk or a three is the best ending; a basket by the team before it is a bonus
    const bonus = (g.kind === 'dunk' ? 4 : g.kind === 'three' ? 3 : g.kind === 'layup' ? 1 : 0) + r.baskets.filter((o) => o !== g && o.team && o.f >= start && o.f < end).length;
    if (!pick || shots + bonus > pick.score) pick = { seed, start, end, basket: g.f, kind: g.kind, score: shots + bonus };
  }
}
if (!pick) { console.error('no basket by the player found; try more --tries or another --seed'); process.exit(1); }
console.log(`recording seed ${pick.seed}, ${(pick.start / FPS).toFixed(1)}s to ${(pick.end / FPS).toFixed(1)}s (${pick.kind} at ${(pick.basket / FPS).toFixed(1)}s)`);

// 2) replay the same game and record the stretch
fs.mkdirSync(path.dirname(OUT), { recursive: true });
const tmp = fs.mkdtempSync(path.join(path.dirname(OUT), '.frames-'));
const page = await openGame(pick.seed);
const warm = Math.max(0, pick.start - 30);
await page.evaluate((n) => { for (let i = 0; i < n; i++) window.__advance(false); }, warm);
for (let f = warm; f < pick.start; f++) await page.evaluate(() => window.__advance(true)); // the camera settles
const t0 = Date.now();
for (let f = 0; f < FRAMES; f++) {
  await page.evaluate(() => window.__advance(true));
  await page.screenshot({ path: path.join(tmp, `f_${String(f).padStart(4, '0')}.png`) });
  if (f % 60 === 59) console.log(`frame ${f + 1}/${FRAMES} (${((Date.now() - t0) / (f + 1) / 1000).toFixed(2)} s per frame)`);
}
await browser.close();

// 3) encode: H.264, yuv420p for every player, no audio track
execFileSync(FFMPEG, ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', path.join(tmp, 'f_%04d.png'),
  ...(RW !== W || RH !== H ? ['-vf', `scale=${W}:${H}:flags=lanczos`] : []),
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '28', '-tune', 'animation', '-pix_fmt', 'yuv420p', '-an', '-movflags', '+faststart', OUT], { stdio: 'inherit' });
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`${path.relative(root, OUT)}: ${W}x${H} (rendered at ${RW}x${RH}), ${SECONDS} s at ${FPS} fps, no audio, ${(fs.statSync(OUT).size / 1048576).toFixed(1)} MB`);
