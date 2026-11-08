// The first-run tutorial: a quick, hands-on warm-up on the practice court before the
// first game. Six short steps, each one thing to do with one line of text and the
// control for this device (keyboard and mouse, or touch):
//   look      turn to face the basket
//   dribble   dribble to the gold circle
//   shoot     a jump shot: hold, release in the green
//   layup     sprint at the rim and finish
//   pass      pass to Jojo (and get it back)
//   steal     take the ball off Barry
// Every step has a time cap after which the coach simply moves on, so the whole thing
// never runs much past two minutes; Skip (or Enter) ends it at any time. When it is
// over the game asks "Are you ready?" and the next button starts a 5v5 game.
// It runs on the ordinary match simulation (rules off), like the Practice Court.
import { CoachCard } from '../ui/coach.js';
import { HOOP, SPOTS, distToHoop } from '../sim/constants.js';
import { startDribble } from '../sim/dribble.js';
import { yawOf, angleDiff } from '../sim/vec.js';
import { storage } from '../core/storage.js';
import { PracticeBase } from './practice.js';

const KEY = 'courtside.tutorial';
export function tutorialSeen() {
  try { return !!storage.getItem(KEY); } catch (e) { return false; }
}
export function markTutorial(how) {
  try { storage.setItem(KEY, how); } catch (e) { /* storage unavailable: it may show again */ }
}

// say: what to do (short); kb / touch: the control
export const STEPS = [
  { id: 'look', say: 'Turn to the basket', kb: 'Move the mouse (follow the arrow)', touch: 'Drag on the right side (follow the arrow)', cap: 15 },
  { id: 'dribble', say: 'Dribble to the gold circle', kb: 'W A S D to move', touch: 'Move with your left thumb', cap: 18 },
  { id: 'shoot', say: 'Shoot! Let go in the green', kb: 'Hold left click, release in the green', touch: 'Hold SHOOT, release in the green', cap: 30 },
  { id: 'layup', say: 'Sprint to the rim and score', kb: 'Hold Shift to sprint, click near the rim', touch: 'Push the stick all the way, SHOOT near the rim', cap: 25 },
  { id: 'pass', say: 'Pass to Jojo', kb: 'Look at him, right click', touch: 'Look at him, tap PASS', cap: 18 },
  { id: 'steal', say: 'Steal the ball from Barry', kb: 'Get close, press E', touch: 'Get close, tap STEAL', cap: 25 },
];
const PRAISE = ['NICE!', 'GREAT!', 'SWEET!', 'PERFECT!', 'EASY!', 'CLEAN!'];

const V = (x, z) => ({ x, z });

export class Tutorial extends PracticeBase {
  constructor(app) {
    super(app);
    this.kind = 'tutorial';
    this.title = 'Tutorial';
    this.idx = -1;
    this.doneSteps = 0;
    this.results = [];
    this.gap = 0;      // a short pause after a step is done
    this.total = 0;
  }

  attach(s) {
    super.attach(s);
    const m = s.match;
    this.card = new CoachCard(this.app.uiRoot, STEPS.length, () => this.skipAll(), { skipWord: 'Skip tutorial', stars: false });
    this.card.show(true);
    this.unsub.push(
      m.events.on('pass', (e) => { if (e.player === this.human) this.passed = true; }),
      m.events.on('gain', (e) => { if (e.player === this.human && this.passed && this.cur && this.cur.id === 'pass') this.count++; }),
      m.events.on('poke', (e) => { if (e.player === this.human) this.count++; }),
      m.events.on('shot', (e) => { if (e.player === this.human) this.tries++; }),
    );
  }

  start(s) {
    super.start(s);
    s.hud.showBanner('WELCOME TO COURTSIDE', 'A quick warm-up, then your first game', 2400, 'mine');
    this.begin(0);
  }

  begin(i) {
    const m = this.s.match;
    this.idx = i;
    this.t = 0; this.count = 0; this.tries = 0; this.passed = false; this.hold = 0; this.gap = 0; this.resetAt = 0;
    this.cur = STEPS[i];
    if (!this.cur) { this.end(true); return; }
    const id = this.cur.id;
    this.spot = null;
    this.reb.ai.home = null; // back under the basket to rebound
    this.parkDummy();
    m.place(this.reb, HOOP.X - 1.6, -1.6);
    if (id === 'look') {
      // start facing the sideline (neither basket in view): the arrow shows the way
      m.place(this.human, HOOP.X - 6.2, 0.6, yawOf(-0.3, 1));
      m.gainBall(this.human, 'practice');
    } else if (id === 'dribble') {
      this.spot = V(SPOTS.elbowR[0], SPOTS.elbowR[1]);
      m.place(this.human, HOOP.X - 8.2, -1.4);
      m.gainBall(this.human, 'practice');
    } else if (id === 'shoot') {
      this.spot = V(SPOTS.elbowR[0], SPOTS.elbowR[1]);
      if (Math.hypot(this.human.pos.x - this.spot.x, this.human.pos.z - this.spot.z) > 1.2) m.place(this.human, this.spot.x, this.spot.z);
      if (m.ball.owner !== this.human) m.gainBall(this.human, 'practice');
    } else if (id === 'layup') {
      m.place(this.human, HOOP.X - 7.6, 0);
      m.gainBall(this.human, 'practice');
    } else if (id === 'pass') {
      // Jojo waits on the left wing (and passes it straight back)
      m.place(this.reb, SPOTS.wingL[0], SPOTS.wingL[1]);
      this.reb.ai.home = { x: SPOTS.wingL[0], z: SPOTS.wingL[1] };
      m.place(this.human, HOOP.X - 7, 1.2);
      m.gainBall(this.human, 'practice');
    } else if (id === 'steal') {
      m.place(this.human, HOOP.X - 4.4, 0, yawOf(-1, 0));
      this.setupDribbler();
    }
    // the human keeps facing where they were looking; only a teleport resets the camera
    m.events.emit('snap', { t: m.time });
  }

  // Barry dribbles slowly from side to side at the top of the key
  setupDribbler() {
    const m = this.s.match, d = this.dummy;
    m.place(d, HOOP.X - 6.6, 0, yawOf(1, 0));
    m.gainBall(d, 'practice');
    let dir = 1, timer = 0;
    d.drill = (p, dt) => {
      if (m.ball.owner === p && m.ball.state === 'held' && !p.action) { startDribble(p, 'R', {}); m.ball.state = 'dribble'; }
      timer += dt;
      if (Math.abs(p.pos.z) > 2.2) dir = -Math.sign(p.pos.z);
      p.desired.set(Math.sin(timer * 0.8) * 0.4, 0, dir * 1.1);
      p.faceYaw = yawOf(HOOP.X - p.pos.x, HOOP.Z - p.pos.z);
    };
  }

  complete(ok = true) {
    this.results[this.idx] = { done: ok, t: this.t };
    if (ok) this.doneSteps++;
    this.app.audio.play(ok ? 'uiReward' : 'uiClick', { gain: 0.4 });
    this.okText = ok ? PRAISE[this.idx % PRAISE.length] : 'MOVING ON';
    this.gap = 0.0001;
  }

  // Skip / Enter: the whole tutorial
  skip() { this.skipAll(); }
  skipAll() { if (!this.done) this.end(false); }

  end(completed) {
    this.completed = completed;
    markTutorial(completed ? 'done' : 'skipped');
    this.finish();
  }

  onBasket(e) {
    super.onBasket(e);
    if (e.player !== this.human || !this.cur) return;
    const id = this.cur.id;
    if (id === 'shoot' && e.kind !== 'layup' && e.kind !== 'dunk') this.count++;
    if (id === 'layup' && (e.kind === 'layup' || e.kind === 'dunk')) this.count++;
    // a make in the dribble / look steps is fine too
  }

  step(s, dt) {
    if (this.done || !this.cur) return;
    const m = s.match, h = this.human, id = this.cur.id;
    this.total += dt;
    // a beat to enjoy it before the next step
    if (this.gap > 0) { this.gap += dt; if (this.gap > 0.9) { this.okText = null; this.begin(this.idx + 1); } return; }
    this.t += dt;
    let ok = false;
    if (id === 'look') {
      const a = Math.abs(angleDiff(h.yaw, yawOf(HOOP.X - h.pos.x, HOOP.Z - h.pos.z)));
      this.hold = a < 0.2 ? this.hold + dt : 0;
      ok = this.hold > 0.25;
    } else if (id === 'dribble') ok = Math.hypot(h.pos.x - this.spot.x, h.pos.z - this.spot.z) < 1.0 && m.ball.owner === h;
    else if (id === 'shoot' || id === 'layup' || id === 'pass' || id === 'steal') ok = this.count >= 1;
    if (ok) { this.complete(true); return; }
    // missed a few: move on rather than get stuck
    const missed = (id === 'shoot' && this.tries >= 4 && !(m.ball.shot && !m.ball.shot.done)) || (id === 'layup' && this.tries >= 3 && !(m.ball.shot && !m.ball.shot.done));
    if (missed || this.t > this.cur.cap) { this.complete(false); return; }
    // the steal drill: the ball goes back to Barry after it is knocked away
    if (id === 'steal' && m.ball.owner !== this.dummy) {
      this.resetAt += dt;
      if (this.resetAt > 1.4) { this.resetAt = 0; m.place(this.dummy, this.dummy.pos.x, this.dummy.pos.z, yawOf(1, 0)); m.gainBall(this.dummy, 'practice'); }
    } else this.resetAt = 0;
    void distToHoop;
  }

  frame(s) {
    if (!this.card || !this.cur) return;
    const touch = this.app.input.touchMode;
    const ok = this.gap > 0;
    this.card.update({
      index: this.idx, doneCount: this.idx + (ok ? 1 : 0), say: ok ? this.okText : this.cur.say,
      hint: ok ? '' : touch ? this.cur.touch : this.cur.kb, frac: 1 - this.t / this.cur.cap,
      keyboard: !touch, step: `${Math.min(STEPS.length, this.idx + 1)} / ${STEPS.length}`, ok,
    });
    const id = this.cur.id;
    const obj = this.spot ? { x: this.spot.x, y: 0.5, z: this.spot.z } : id === 'look' || id === 'layup' ? { x: HOOP.X, y: HOOP.Y, z: 0 } : id === 'pass' ? { x: this.reb.pos.x, y: 1.4, z: this.reb.pos.z } : id === 'steal' ? { x: this.dummy.pos.x, y: 1, z: this.dummy.pos.z } : null;
    if (obj && !ok) {
      const v = s.view.projectToScreen(s.view._pt || (s.view._pt = s.view.camera.position.clone()).set(obj.x, obj.y, obj.z), s.view._pt2 || (s.view._pt2 = s.view.camera.position.clone()));
      this.card.pointAt(v);
    } else this.card.pointAt(null);
  }

  markers(s, mk) { if (this.spot && this.cur && this.cur.id === 'dribble') mk.showSpot(0, this.spot.x, this.spot.z, s.match.time); }
  hint() { return ''; }
  phaseText() { return 'TUTORIAL'; }
  clockText() { return `${Math.min(STEPS.length, Math.max(1, this.idx + 1))}/${STEPS.length}`; }
  summary() { return { kind: 'tutorial', title: 'Tutorial', completed: !!this.completed, done: this.doneSteps, total: STEPS.length }; }
}
