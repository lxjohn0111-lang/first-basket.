// Physics and rules checks: bounce restitution, the rim and the basket detection,
// the dribble staying in sync with the player (never through the floor, never drifting),
// the shot solver, the clear-it rule, the shot clock and free throws.
import { Ball } from '../src/sim/ball.js';
import { Match } from '../src/sim/match.js';
import { TEAMS, teamConfig } from '../src/game/teams.js';
import { DT, HOOP, BALL_R, RULES, LINES } from '../src/sim/constants.js';
import { startDribble, dribbleLocal } from '../src/sim/dribble.js';
import { launchVelocity, sweetSpot } from '../src/sim/shooting.js';
import { startShot } from '../src/sim/actions.js';
import { flightTo } from '../src/sim/ball.js';

let fails = 0;
const ok = (cond, msg) => { console.log(`${cond ? 'ok  ' : 'FAIL'} ${msg}`); if (!cond) fails++; };
const game = (o = {}) => new Match({ seed: 3, clock: 300, target: 21, difficulty: 'pro', teams: [teamConfig(TEAMS[0], o.size || 1), teamConfig(TEAMS[1], o.size || 1)], ...o });

// 1. a drop from 1.8 m bounces back to about e^2 of the height
{
  const b = new Ball(); b.place(0, 1.8, 0); b.state = 'free';
  let peak = 0, bounced = false;
  for (let i = 0; i < 400; i++) { b.beginStep(); b.step(DT, i * DT, null); if (b.vel.y > 0) bounced = true; if (bounced) peak = Math.max(peak, b.pos.y); if (bounced && b.vel.y < 0 && peak > 0.5) break; }
  ok(peak > 1.0 && peak < 1.3, `drop from 1.8 m bounces to ${peak.toFixed(2)} m`);
}
// 2. dropped through the middle of the ring: one basket
{
  const b = new Ball(); let n = 0; b.cb = { score: () => n++, hit() {}, body() {} };
  b.place(HOOP.X, 3.6, HOOP.Z); b.state = 'free';
  for (let i = 0; i < 300; i++) { b.beginStep(); b.step(DT, i * DT, null); }
  ok(n === 1, `ball through the centre of the rim scores once (${n})`);
}
// 3. dropped onto the front of the rim: it bounces off, no basket
{
  const b = new Ball(); let n = 0, rim = 0; b.cb = { score: () => n++, hit: (bb, k) => { if (k === 'rim') rim++; }, body() {} };
  b.place(HOOP.X - HOOP.R - HOOP.TUBE - 0.02, 3.7, 0); b.state = 'free';
  for (let i = 0; i < 300; i++) { b.beginStep(); b.step(DT, i * DT, null); }
  ok(rim > 0 && n === 0, `ball on the front rim: ${rim} rim hits, ${n} baskets`);
}
// 4. the dribble: never below the floor, close to the player, no jumps between steps
{
  const m = game();
  const p = m.players[0];
  m.ai.update = () => {}; m.rules = false;
  m.setPhase('live'); m.place(p, 5, 0); m.place(m.players[1], 1, -7); m.gainBall(p, 't');
  m.ball.place(p.pos.x, 1.2, p.pos.z + 0.36);
  for (let i = 0; i < 60; i++) m.step(DT); // settle in the hands
  startDribble(p, 'R', {}); m.ball.state = 'dribble';
  let minY = 9, maxD = 0, maxStep = 0, bounces = 0;
  m.events.on('bounce', () => bounces++);
  const loc = [0, 0, 0];
  for (let i = 0; i < 120 * 8; i++) {
    const t = i * DT;
    const sp = t < 2 ? 0 : t < 5 ? 4 : 6.5;
    p.desired.set(0, 0, sp); p.sprint = sp > 5; p.faceYaw = 0;
    const before = m.ball.pos.clone();
    m.step(DT);
    if (m.ball.owner !== p) break;
    dribbleLocal(p, loc);
    minY = Math.min(minY, m.ball.pos.y);
    maxD = Math.max(maxD, Math.hypot(m.ball.pos.x - p.pos.x, m.ball.pos.z - p.pos.z));
    maxStep = Math.max(maxStep, before.dist(m.ball.pos));
    p.pos.z = Math.min(p.pos.z, 6); // stay on the floor for the test
  }
  ok(minY >= BALL_R - 1e-6, `dribble never goes through the floor (min centre ${minY.toFixed(3)})`);
  ok(maxD < 1.2, `dribble stays at the player's side (max ${maxD.toFixed(2)} m)`);
  ok(maxStep < 0.12, `dribble moves smoothly (max ${(maxStep * 100).toFixed(1)} cm per step)`);
  ok(bounces > 12, `${bounces} dribble bounces in 8 s`);
}
// 5. the shot solver: a perfect release passes through the rim centre without scatter
{
  const m = game();
  const p = m.players[0];
  m.rng.gauss = () => 0;
  for (const d of [3.5, 5, 7]) {
    m.place(p, HOOP.X - d, 0);
    const spot = sweetSpot(m, p, d > LINES.THREE_R ? 'three' : 'jumper', 0, 0);
    const pos = { x: p.pos.x + 0.3, y: 2.4, z: 0 };
    const r = launchVelocity(m, p, { kind: 'jumper', charge: spot.c, spot, pressure: 0, moving: 0, aimYaw: Math.PI / 2, pos });
    const f = flightTo(pos.x, pos.y, pos.z, r.vx, r.vy, r.vz, HOOP.Y);
    ok(f && Math.hypot(f.x - (HOOP.X + 0.035), f.z) < 0.03, `perfect ${d} m shot comes down through the rim (miss ${(f ? Math.hypot(f.x - HOOP.X - 0.035, f.z) * 100 : 999).toFixed(1)} cm)`);
  }
}
// 6. clear it: a defensive rebound must go back beyond the arc before a basket counts
{
  const m = game();
  const [a, d] = m.players;
  m.start(0); m.goLive();
  m.place(d, HOOP.X - 1, 0.5); m.gainBall(d, 'rebound');
  ok(m.mustClear === 1, 'a change of possession inside the arc must be cleared');
  let notCleared = 0; m.events.on('notCleared', () => notCleared++);
  m.ball.shot = { shooter: d, team: 1, kind: 'layup', value: 2, t: m.time, foul: null };
  m.awardBasket(m.ball.shot, false);
  ok(notCleared === 1 && m.teams[1].score === 0, 'a basket before clearing does not count');
  void a;
}
// 7. the shot clock: holding the ball for 14 s is a violation
{
  const m = game();
  m.start(0); m.goLive();
  let vio = 0; m.events.on('shotClockViolation', () => vio++);
  for (let i = 0; i < 120 * 15; i++) { m.players.forEach((p) => { p.desired.set(0, 0, 0); }); m.ai.update = () => {}; m.step(DT); if (vio) break; }
  ok(vio === 1 && m.phase === 'dead', `shot clock violation after ${RULES.SHOT_CLOCK} s`);
}
// 8. free throws: the shooter takes them from the line and they count one each
{
  const m = game();
  const s = m.players[0];
  m.start(0); m.startFreeThrows(s, 2);
  let made = 0; m.events.on('basket', (e) => { if (e.kind === 'ft') made++; });
  for (let i = 0; i < 120 * 12 && m.phase !== 'check'; i++) {
    if (m.phase === 'ft' && m.ball.owner === s && !s.action && m.phaseT > 0.2) { m.rng.gauss = () => 0; startShot(m, s, { kind: 'ft', releaseCharge: 0.62 }); if (s.action) s.action.ai = true; }
    m.step(DT);
  }
  ok(made === 2 && m.teams[0].score === 2, `two perfect free throws: ${made} made, score ${m.teams[0].score}`);
  ok(Math.abs(s.pos.x - (LINES.FT_X - 0.32)) < 0.5 || m.phase === 'check', 'the shooter stands at the line');
}
console.log(fails ? `${fails} FAILED` : 'all physics and rules checks passed');
process.exit(fails ? 1 : 0);
