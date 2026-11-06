// Keyboard + mouse input with pointer lock (requested inside click handlers)
// and a click-and-drag / arrow-key look fallback when pointer lock is refused
// (the First Touch input layer). One control scheme everywhere:
// WASD move, mouse look, Shift sprint, LMB shoot (hold / release), RMB pass,
// Space jump / block (pump fake with the ball), E steal, Q crossover, C stance,
// P pause, Tab frees / captures the mouse cursor. Esc is left to the browser.
// On touch screens the on-screen controls (ui/touch.js) feed the same actions.

export const CONTROLS = [
  ['W A S D', 'Move (relative to where you look)'],
  ['Mouse', 'Look and aim'],
  ['Shift', 'Sprint (a faster, lower dribble)'],
  ['Left mouse', 'Shoot: hold to fill the meter, release in the green. On defence: hands up'],
  ['Right mouse', 'Pass to the ringed teammate. Without the ball: call for it / defensive stance'],
  ['Space', 'Jump to block or rebound (with the ball: pump fake)'],
  ['E', 'Steal (poke at the ball; time it when the dribble is low)'],
  ['Q', 'Crossover (switch the dribble hand with a quick burst)'],
  ['C', 'Defensive stance (hold): quicker side to side'],
  ['P', 'Pause'],
  ['Tab', 'Free / capture the mouse cursor'],
];

export const TOUCH_CONTROLS = [
  ['Left thumb', 'Drag anywhere on the left side to move; push to the edge of the stick to sprint'],
  ['Right thumb', 'Drag anywhere on the right side to look and aim'],
  ['SHOOT', 'Hold to fill the meter, release in the green'],
  ['PASS', 'Pass to the ringed teammate (CALL without the ball)'],
  ['CROSS / FAKE', 'Crossover dribble / pump fake'],
  ['STEAL · BLOCK · STANCE', 'Replace the attack buttons while the other team has the ball'],
  ['II', 'Pause'],
];

export class Input {
  constructor(el) {
    this.el = el;
    this.keys = new Set();
    this.lookX = 0; this.lookY = 0;
    this.buttons = 0;
    this.locked = false;
    this.lockSupported = 'requestPointerLock' in el;
    this.dragMode = !this.lockSupported;
    this.active = false; // gameplay capturing input
    this.listeners = [];
    this.onPause = null;
    this.onLockLost = null;
    this.onLockError = null;
    this.sensitivity = 1;
    this.invertY = false;
    this.lastLockExit = 0;
    // touch: analog stick state from the on-screen controls
    this.touchMode = false;
    this.touch = { active: false, f: 0, r: 0, sprint: false, stance: false };
    this.lastTouchAt = -1e9;

    this.handlers = {
      keydown: (e) => this.keydown(e),
      keyup: (e) => this.keyup(e),
      mousemove: (e) => this.mousemove(e),
      mousedown: (e) => this.mousedown(e),
      mouseup: (e) => this.mouseup(e),
      contextmenu: (e) => { if (this.active) e.preventDefault(); },
      plc: () => this.lockChange(),
      ple: () => { this.locked = false; if (this.onLockError) this.onLockError(); },
      blur: () => { this.keys.clear(); this.releaseAll(); },
      touchSeen: (e) => { if (e.pointerType === 'touch' || e.pointerType === 'pen') this.lastTouchAt = performance.now(); },
    };
    window.addEventListener('pointerdown', this.handlers.touchSeen, true);
    window.addEventListener('pointerup', this.handlers.touchSeen, true);
    window.addEventListener('keydown', this.handlers.keydown);
    window.addEventListener('keyup', this.handlers.keyup);
    window.addEventListener('mousemove', this.handlers.mousemove);
    window.addEventListener('mousedown', this.handlers.mousedown);
    window.addEventListener('mouseup', this.handlers.mouseup);
    window.addEventListener('contextmenu', this.handlers.contextmenu);
    document.addEventListener('pointerlockchange', this.handlers.plc);
    document.addEventListener('pointerlockerror', this.handlers.ple);
    window.addEventListener('blur', this.handlers.blur);
  }

  on(fn) { this.listeners.push(fn); return () => { this.listeners = this.listeners.filter((f) => f !== fn); }; }
  emit(type, down) { for (const f of this.listeners) f(type, down); }

  // must be called from inside a user gesture (click) handler
  requestLock() {
    if (!this.lockSupported) { this.dragMode = true; return false; }
    try {
      const r = this.el.requestPointerLock();
      if (r && r.catch) r.catch(() => { if (this.onLockError) this.onLockError(); });
    } catch (e) {
      this.dragMode = true;
      return false;
    }
    return true;
  }
  exitLock() { if (document.pointerLockElement) document.exitPointerLock(); }

  lockChange() {
    const was = this.locked;
    this.locked = document.pointerLockElement === this.el;
    if (this.locked) { this.dragMode = false; if (!was && this.onLockGained) this.onLockGained(); }
    if (was && !this.locked) {
      this.lastLockExit = performance.now();
      this.releaseAll();
      if (this.active && this.onLockLost) this.onLockLost();
    }
  }

  releaseAll() {
    if (this.buttons & 1) this.emit('shoot', false);
    if (this.buttons & 2) this.emit('pass', false);
    this.buttons = 0;
    this.touch.active = false; this.touch.f = 0; this.touch.r = 0; this.touch.sprint = false; this.touch.stance = false;
    if (this.onReleaseAll) this.onReleaseAll();
  }

  // browsers follow a tap with emulated mouse events; those must not shoot or pass
  fromTouch(e) {
    return (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) || performance.now() - this.lastTouchAt < 900;
  }

  // on-screen buttons: same actions as the mouse buttons and keys
  touchAction(type, down) {
    if (!this.active) return;
    if (type === 'shoot') { if (down) this.buttons |= 1; else this.buttons &= ~1; }
    if (type === 'pass') { if (down) this.buttons |= 2; else this.buttons &= ~2; }
    if (type === 'stance') { this.touch.stance = down; return; }
    if (!down && (type === 'steal' || type === 'cross' || type === 'jump')) return;
    this.emit(type, down);
  }
  touchLook(dx, dy) { if (this.active) { this.lookX += dx; this.lookY += dy; } }

  keydown(e) {
    const k = e.code;
    if (!this.active) return;
    // Tab toggles the cursor lock (and never moves the browser's focus during play)
    if (k === 'Tab') { e.preventDefault(); if (!e.repeat && this.onToggleLock) this.onToggleLock(); return; }
    if (['Space', 'ShiftLeft', 'ShiftRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyQ', 'KeyE', 'KeyC', 'ControlLeft', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(k)) e.preventDefault();
    if (e.repeat) return;
    this.keys.add(k);
    if (k === 'Space') this.emit('jump', true);
    else if (k === 'KeyE') this.emit('steal', true);
    else if (k === 'KeyQ') this.emit('cross', true);
    else if (k === 'KeyP') { if (this.onPause) this.onPause(); }
    else if (k === 'Enter' || k === 'NumpadEnter') { if (this.onSkip) this.onSkip(); }
  }
  keyup(e) {
    this.keys.delete(e.code);
  }

  mousedown(e) {
    if (!this.active || this.fromTouch(e)) return;
    if (!this.locked && !this.dragMode) return;
    if (e.target !== this.el && !this.locked) return;
    if (e.button === 0) { this.buttons |= 1; this.emit('shoot', true); }
    if (e.button === 2) { this.buttons |= 2; this.emit('pass', true); e.preventDefault(); }
  }
  mouseup(e) {
    if (this.fromTouch(e)) return;
    if (e.button === 0 && this.buttons & 1) { this.buttons &= ~1; this.emit('shoot', false); }
    if (e.button === 2 && this.buttons & 2) { this.buttons &= ~2; this.emit('pass', false); }
  }
  mousemove(e) {
    if (!this.active || this.fromTouch(e)) return;
    if (this.locked || (this.dragMode && (e.buttons & 7))) {
      this.lookX += e.movementX || 0;
      this.lookY += e.movementY || 0;
    }
  }

  // camera-relative movement axes
  axes() {
    const k = this.keys;
    let f = (k.has('KeyW') ? 1 : 0) - (k.has('KeyS') ? 1 : 0);
    let r = (k.has('KeyD') ? 1 : 0) - (k.has('KeyA') ? 1 : 0);
    let sprint = k.has('ShiftLeft') || k.has('ShiftRight');
    const stance = k.has('KeyC') || k.has('ControlLeft') || this.touch.stance;
    const t = this.touch;
    if (t.active) {
      // analog stick: partial deflection walks, full deflection sprints
      f = Math.max(-1, Math.min(1, f + t.f)); r = Math.max(-1, Math.min(1, r + t.r));
      sprint = sprint || t.sprint;
    }
    return { f, r, sprint, stance };
  }

  // apply accumulated look to yaw/pitch
  consumeLook(state, dt) {
    const s = 0.0022 * this.sensitivity;
    state.yaw -= this.lookX * s;
    state.pitch -= this.lookY * s * (this.invertY ? -1 : 1);
    // arrow keys also look (fallback)
    const k = this.keys;
    const kr = 2.2 * dt * this.sensitivity;
    if (k.has('ArrowLeft')) state.yaw += kr;
    if (k.has('ArrowRight')) state.yaw -= kr;
    if (k.has('ArrowUp')) state.pitch += kr * 0.6 * (this.invertY ? -1 : 1);
    if (k.has('ArrowDown')) state.pitch -= kr * 0.6 * (this.invertY ? -1 : 1);
    this.lookX = 0; this.lookY = 0;
    state.pitch = Math.max(-1.3, Math.min(1.15, state.pitch));
  }

  get held() { return { lmb: !!(this.buttons & 1), rmb: !!(this.buttons & 2) }; }
}
