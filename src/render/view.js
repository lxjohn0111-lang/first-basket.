// The scene view: renderer, venue, characters, ball, nets and effects, plus live
// visual-style switching that only recolours shared role colours and flips uniforms
// (nothing is rebuilt, the simulation is never touched). Adapted from First Touch.
//
// First person: the camera is the local player's eyes. Their head and torso are not
// drawn; their legs are (look down and you see your sneakers). Their arms and the ball
// in their hands are drawn in a second "view-model" pass over the scene, rotated about
// the eye by a small pitch so the dribble and the hands sit in view the way they would
// in your peripheral vision. The offset changes smoothly with the action (lifted for
// the dribble, lowered for the shooting set point) and blends to zero as the ball
// leaves the hands, so the ball hands over to its real flight without a jump.
import * as THREE from 'three';
import { SU, makeSolidMaterial, makeEdgeMaterial, makeSkyMaterial, makeScreenMaterial } from './shaders.js';
import { R, applyStyle, STYLES, setGameColours } from './palette.js';
import { buildVenue, buildNets } from './venues.js';
import { CharacterBatch, ViewModel, VM, PER, P } from './characters.js';
import { Animator } from './anim.js';
import { Atlas, ScoreboardTexture, ShotClockTexture } from './atlas.js';
import { BlobShadows, Markers, Burst } from './effects.js';
import { BALL_R } from '../sim/constants.js';

THREE.ColorManagement.enabled = false;

export const MAX_FOV = 120;
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

export class SceneView {
  constructor(canvas, opts = {}) {
    this.canvas = canvas;
    this.quality = opts.quality || 'high';
    this.lite = !!opts.lite; // phones and tablets: a thinner crowd, a cheaper pixel ratio
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', preserveDrawingBuffer: !!opts.preserve });
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    renderer.shadowMap.autoUpdate = false;
    this.renderer = renderer;
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xf2f1ea, 45, 160);
    this.camera = new THREE.PerspectiveCamera(70, 16 / 9, 0.05, 600);
    this.camera.rotation.order = 'YXZ';

    // indoor lighting: one high key light for the toon steps and hard shadows
    const sun = new THREE.DirectionalLight(0xffffff, 1);
    sun.position.set(-9, 40, 14);
    sun.castShadow = true;
    const sc = sun.shadow.camera;
    sc.left = -24; sc.right = 24; sc.top = 18; sc.bottom = -18; sc.near = 1; sc.far = 90;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.bias = -0.0006;
    sun.shadow.normalBias = 0.02;
    this.sun = sun;
    this.scene.add(sun, sun.target);
    SU.uLightDir.value.copy(sun.position).normalize();

    this.sky = new THREE.Mesh(new THREE.SphereGeometry(400, 24, 12), makeSkyMaterial());
    this.sky.renderOrder = -10;
    this.sky.frustumCulled = false;
    this.scene.add(this.sky);

    this.atlas = new Atlas();
    SU.uAtlas.value = this.atlas.texture;
    this.scoreTex = new ScoreboardTexture();
    this.shotTex = new ShotClockTexture();
    this.screenMat = makeScreenMaterial(this.scoreTex.texture);
    this.shotMat = makeScreenMaterial(this.shotTex.texture);

    this.staticMat = makeSolidMaterial({ crowd: true, atlas: true });
    this.staticEdgeMat = makeEdgeMaterial({ crowd: true });
    this.casterMat = makeSolidMaterial({ atlas: true });
    this.casterEdgeMat = makeEdgeMaterial({});
    this.netMat = makeEdgeMaterial({ net: true, role: R.NET, widthScale: 0.6 });
    this.nets = new THREE.Mesh(buildNets(), this.netMat);
    this.nets.frustumCulled = false;
    this.scene.add(this.nets);
    this.netState = { amp: 0, t: 9, x: 0, y: 0, z: 0, dx: 0, dz: 0, count: 0 };

    this.blobs = new BlobShadows(16);
    this.markers = new Markers();
    this.burst = new Burst(220);
    this.scene.add(this.blobs.mesh, this.markers.group, this.burst.mesh);

    this.venueObjs = [];
    this.batch = null;
    this.vm = null;
    this.animators = [];
    this.match = null;
    this.style = 'classic';
    this.time = 0;
    this.shake = 0;
    this.ballPos = new THREE.Vector3();
    this.ballQ = new THREE.Quaternion();
    this.ballM = new THREE.Matrix4();
    this.crowdLevel = 0;
    this.localPlayer = null;
    this.firstPerson = true;
    this.hideHead = true;
    this.vmD = 0.3;       // view-model pitch (radians)
    this.vmBallUntil = 0; // keep a just-released ball in the view model while it blends out
    this._rv = new THREE.Matrix4(); this._t1 = new THREE.Matrix4(); this._t2 = new THREE.Matrix4(); this._q = new THREE.Quaternion(); this._ax = new THREE.Vector3(); this._mm = new THREE.Matrix4();
    this.resize();
  }

  setQuality(q) {
    this.quality = q;
    const dpr = window.devicePixelRatio || 1;
    let base = q === 'low' ? Math.min(1, dpr) * 0.75 : q === 'medium' ? Math.min(1.25, dpr) : Math.min(2, dpr);
    // phones: never more than 1.5 device pixels per CSS pixel (sharp enough on a small screen)
    if (this.lite) base = Math.min(base, 1.5);
    this.renderer.setPixelRatio(base * (this.resScale || 1));
    const size = q === 'high' ? 2048 : 1024;
    if (this.sun.shadow.mapSize.x !== size) {
      this.sun.shadow.mapSize.set(size, size);
      if (this.sun.shadow.map) { this.sun.shadow.map.dispose(); this.sun.shadow.map = null; }
    }
    this.resize();
  }
  setResolutionScale(k) {
    if (Math.abs(k - (this.resScale || 1)) < 0.01) return;
    this.resScale = k;
    this.setQuality(this.quality);
  }

  resize() {
    const w = this.canvas.clientWidth || window.innerWidth, h = this.canvas.clientHeight || window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    const pr = this.renderer.getPixelRatio();
    SU.uResolution.value.set(w * pr, h * pr);
    this.pixelRatio = pr;
    this.applyLineWidth();
  }

  applyLineWidth() {
    const st = STYLES[this.style];
    const pr = this.pixelRatio || 1;
    SU.uLineWidth.value = st.lineWidth * pr;
    SU.uMinWidth.value = Math.min(st.lineWidth, 1.1) * pr;
    const neo = st.name === 'neo';
    SU.uTaper.value = neo ? 10 : 30;
    SU.uTaperMin.value = neo ? 0.25 : 0.4;
    SU.uDetailDist.value = neo ? 30 : 42;
    SU.uCreaseDist.value = neo ? 14 : 20;
  }

  // ------------------------------------------------------------- style
  setStyle(name) {
    const st = applyStyle(name);
    this.style = st.name;
    SU.uToon.value = st.toon;
    SU.uShadowAmt.value = st.shadow;
    this.renderer.shadowMap.autoUpdate = st.shadow > 0;
    this.renderer.shadowMap.needsUpdate = st.shadow > 0;
    this.scene.fog.color.set(st.fog);
    this.scene.fog.near = st.fogNear;
    this.scene.fog.far = st.fogFar;
    this.blobShowPlayers = st.blobs;
    this.applyLineWidth();
    if (this.match) this.updateScoreboard(true);
    document.documentElement.dataset.style = st.name;
  }

  // ------------------------------------------------------------- venue
  setVenue(type, o = {}) {
    const key = `${type}|${o.homeName}|${o.awayName}|${this.quality}`;
    if (this.venueKey === key) return;
    this.venueKey = key;
    for (const obj of this.venueObjs) { this.scene.remove(obj); obj.geometry.dispose(); }
    this.venueObjs = [];
    const v = buildVenue(type, { atlas: this.atlas, quality: this.quality, homeName: o.homeName || 'HOME', awayName: o.awayName || 'AWAY', seed: o.seed || 7, crowd: this.lite ? 0.6 : 1 });
    this.venue = v;
    const solid = new THREE.Mesh(v.solid, this.staticMat);
    solid.receiveShadow = true;
    const edges = new THREE.Mesh(v.edges, this.staticEdgeMat);
    edges.frustumCulled = false;
    const cs = new THREE.Mesh(v.casterSolid, this.casterMat);
    cs.castShadow = true; cs.receiveShadow = true;
    const ceM = new THREE.Mesh(v.casterEdges, this.casterEdgeMat);
    ceM.frustumCulled = false;
    this.venueObjs.push(solid, edges, cs, ceM);
    for (const s of v.screens) {
      const q = new THREE.Mesh(new THREE.PlaneGeometry(s.w, s.h), s.kind === 'shot' ? this.shotMat : this.screenMat);
      q.position.set(s.x, s.y, s.z);
      q.rotation.y = s.ry + Math.PI;
      q.translateZ(s.kind === 'shot' ? 0.01 : 0.06);
      this.venueObjs.push(q);
    }
    for (const o2 of this.venueObjs) this.scene.add(o2);
    this.renderer.shadowMap.needsUpdate = true;
  }

  // ------------------------------------------------------------- match
  setMatch(match, colours) {
    this.match = match;
    if (colours) setGameColours(colours.kits, colours.human, colours.court);
    this.kits = colours && colours.kits ? colours.kits : null;
    this.rebuildCharacters();
    this.burst.clear();
    this.netState.amp = 0; this.netState.t = 9;
    this.updateScoreboard(true);
  }

  rebuildCharacters() {
    if (this.batch) { this.scene.remove(this.batch.mesh, this.batch.edges); this.batch.dispose(); }
    if (this.vm) { this.vm.dispose(); this.vm = null; }
    this.batch = new CharacterBatch(this.match.players, this.atlas, { kits: this.kits, quality: this.quality });
    this.scene.add(this.batch.mesh, this.batch.edges);
    this.animators = this.match.players.map((p) => new Animator(p));
    if (this.localPlayer) this.vm = new ViewModel(this.localPlayer, { quality: this.quality });
  }

  setLocal(p) {
    this.localPlayer = p;
    this.firstPerson = !!p;
    if (this.vm) { this.vm.dispose(); this.vm = null; }
    if (p && this.match) this.vm = new ViewModel(p, { quality: this.quality });
  }

  updateScoreboard(force) {
    const m = this.match;
    if (!m) return;
    if (force) { this.scoreTex.key = ''; this.shotTex.key = ''; }
    const live = m.phase === 'live' || m.phase === 'check' || m.phase === 'inbound';
    this.scoreTex.update(m.teams[0].short, m.teams[1].short, m.scoreline, m.rules ? m.displayClock : '--:--', m.shotClockOn ? m.displayShot : '', live ? m.offense : -1, this.style, m.phase === 'over', m.full ? m.periodLabel : '');
    this.shotTex.update(m.shotClockOn && m.phase !== 'over' ? m.displayShot : '', this.style);
  }

  // ------------------------------------------------------------- per frame
  // cam: { yaw, pitch, mode: 'fp'|'orbit'|'free', eye, fov, bob, shake }
  render(alpha, dt, cam, extras = {}) {
    const m = this.match;
    this.time += dt;
    SU.uTime.value = this.time;
    this.crowdLevel = Math.max(extras.crowd ?? 0, this.crowdLevel - dt * 0.35);
    SU.uCrowd.value = this.crowdLevel;
    this.updateCamera(cam, dt, alpha);
    let vmOn = false;
    if (m && this.batch) {
      const now = m.time - (1 - alpha) * (1 / 120);
      const b = m.ball;
      this.ballPos.set(b.prevPos.x + (b.pos.x - b.prevPos.x) * alpha, b.prevPos.y + (b.pos.y - b.prevPos.y) * alpha, b.prevPos.z + (b.pos.z - b.prevPos.z) * alpha);
      const qa = this._qa || (this._qa = new THREE.Quaternion()), qb = this._qb || (this._qb = new THREE.Quaternion());
      qa.set(b.prevQ[0], b.prevQ[1], b.prevQ[2], b.prevQ[3]);
      qb.set(b.q[0], b.q[1], b.q[2], b.q[3]);
      this.ballQ.slerpQuaternions(qa, qb, alpha);
      this.ballM.compose(this.ballPos, this.ballQ, this._one || (this._one = new THREE.Vector3(1, 1, 1)));
      this.batch.setMatrix(this.batch.ballRow, this.ballM);
      const ctx = { match: m, alpha, dt, now, ball: this.ballPos, local: false };
      this.blobs.begin();
      const local = this.firstPerson && cam.mode === 'fp' ? this.localPlayer : null;
      for (let i = 0; i < this.animators.length; i++) {
        const an = this.animators[i];
        const p = an.p;
        ctx.local = p === local;
        const mats = an.update(ctx);
        const base = i * PER;
        for (let k = 0; k < PER; k++) this.batch.setMatrix(base + k, mats[k]);
        if (ctx.local && this.hideHead) {
          for (const k of [P.HEAD, P.TORSO, P.UARM_L, P.UARM_R, P.FARM_L, P.FARM_R]) this.batch.hide(base + k);
          vmOn = this.updateViewModel(an, mats, cam, dt, now);
        }
        if (this.blobShowPlayers) this.blobs.add(an.root.x, an.root.z, 0.95, 0.2);
      }
      if (vmOn && this.vmBall) this.batch.hide(this.batch.ballRow);
      const h = Math.max(0, this.ballPos.y - BALL_R);
      this.blobs.add(this.ballPos.x, this.ballPos.z, 0.36 + h * 0.1, 0.42 / (1 + h * 0.8));
      this.blobs.end();
      this.batch.commit();
      this.updateNets(dt);
      this.updateScoreboard(false);
    }
    this.burst.update(dt);
    if (this.noDraw) return;
    const r = this.renderer;
    r.render(this.scene, this.camera);
    if (vmOn && this.vm) {
      r.autoClear = false;
      r.clearDepth();
      r.render(this.vm.scene, this.camera);
      r.autoClear = true;
    }
  }

  // the local player's arms (and the ball in their hands) for the first-person pass
  updateViewModel(an, mats, cam, dt, now) {
    const vm = this.vm, p = an.p, m = this.match;
    if (!vm) return false;
    const b = m.ball;
    const a = p.action;
    const mine = b.owner === p && (b.state === 'held' || b.state === 'dribble');
    // the offset fades as the player looks down (then the hands are really in view)
    const look = clamp((cam.pitch + 0.85) / 0.6, 0, 1);
    let target;
    if (a && a.type === 'shot' && !a.released && this.ballPos.y > p.pos.y + 1.6) target = a.kind === 'dunk' ? 0 : 0.12;
    else if (a && a.type === 'shot' && a.released) target = a.t - a.rt < 0.5 ? 0.1 : 0.6 * look;
    else if (a && a.type === 'pass' && a.released) target = 0;
    else if (mine) target = (b.state === 'dribble' ? 0.82 : 0.78) * look;
    else if (p.handsUp || p.airborne || (a && a.type === 'jump')) target = -0.2;
    else if (a && a.type === 'steal') target = 0.55 * look;
    else target = 0.62 * look;
    // a just-released ball stays in the view model while the offset blends out
    const released = !mine && b.state === 'free' && b.lastTouch && b.lastTouch.player === p && m.time - b.lastTouch.t < 0.4 && (b.shot || b.pass);
    if (released) { target = 0; this.vmBallUntil = now + 0.05; }
    const rate = released ? 14 : 9;
    this.vmD += (target - this.vmD) * (1 - Math.exp(-dt * rate));
    this.vmBall = mine || (released && Math.abs(this.vmD) > 0.01);
    // rotation about the eye around the camera's right axis
    const eye = this.camera.position;
    this._ax.setFromMatrixColumn(this.camera.matrixWorld, 0).normalize();
    this._q.setFromAxisAngle(this._ax, this.vmD);
    this._t1.makeTranslation(-eye.x, -eye.y, -eye.z);
    this._t2.makeTranslation(eye.x, eye.y, eye.z);
    this._rv.makeRotationFromQuaternion(this._q).premultiply(this._t2).multiply(this._t1);
    // forearms and hands only (upper arms would sit right against the lens)
    vm.hide(VM.UARM_L); vm.hide(VM.UARM_R);
    for (const [vr, pr] of [[VM.FARM_L, P.FARM_L], [VM.FARM_R, P.FARM_R]]) vm.setMatrix(vr, this._mm.multiplyMatrices(this._rv, mats[pr]));
    if (this.vmBall) vm.setMatrix(VM.BALL, this._mm.multiplyMatrices(this._rv, this.ballM));
    else vm.hide(VM.BALL);
    vm.commit();
    return true;
  }

  updateNets(dt) {
    const n = this.match.ball.net, st = this.netState;
    if (n.count !== st.count) {
      st.count = n.count;
      st.t = 0;
      st.x = n.x; st.y = n.y; st.z = n.z;
      st.amp = Math.max(st.amp * 0.9, n.amp);
      const b = this.match.ball;
      const sp = Math.hypot(b.vel.x, b.vel.z) + 0.6;
      st.dx = (b.vel.x / sp) * 0.05 + (st.x >= 0 ? 0.012 : -0.012); st.dz = (b.vel.z / sp) * 0.05;
    } else st.t += dt;
    const bulge = st.amp * Math.exp(-st.t * 9);
    const sway = Math.sin(st.t * 13) * Math.exp(-st.t * 2.6) * Math.min(1, st.amp * 1.6);
    if (st.t > 4) st.amp = 0;
    // the net the ball went through moves; the one at the other end hangs still
    const [A, DA, B, DB] = st.x >= 0 ? [SU.uNetA, SU.uNetDA, SU.uNetB, SU.uNetDB] : [SU.uNetB, SU.uNetDB, SU.uNetA, SU.uNetDA];
    A.value.set(st.x, st.y, st.z, bulge);
    DA.value.set(st.dx * sway, 0, st.dz * sway);
    B.value.set(0, -9, 0, 0);
    DB.value.set(0, 0, 0);
  }

  updateCamera(cam, dt, alpha) {
    const c = this.camera;
    if (cam.fov) {
      // the field of view setting is horizontal; three.js wants vertical
      let v;
      const hf = Math.min(cam.fov, MAX_FOV);
      if (c.aspect < 1) v = clamp(Math.min(hf, 100), 35, 100);
      else v = clamp((2 * Math.atan(Math.tan((hf * Math.PI) / 360) / c.aspect) * 180) / Math.PI, 35, 100);
      if (Math.abs(v - c.fov) > 0.01) { c.fov = v; c.updateProjectionMatrix(); }
    }
    if (cam.mode === 'fp' && this.localPlayer && this.match) {
      const p = this.localPlayer;
      const x = p.prevPos.x + (p.pos.x - p.prevPos.x) * alpha;
      const y = p.prevPos.y + (p.pos.y - p.prevPos.y) * alpha;
      const z = p.prevPos.z + (p.pos.z - p.prevPos.z) * alpha;
      let eye = (cam.eye ?? 1.9) + y;
      if (cam.bob) {
        const sp = Math.min(1, p.speed / 7);
        eye += Math.sin((p.prevGait + (p.gait - p.prevGait) * alpha) * Math.PI * 4) * 0.014 * sp * cam.bob;
      }
      c.position.set(x + Math.sin(cam.yaw) * 0.02, eye, z + Math.cos(cam.yaw) * 0.02);
      if (cam.shake && this.shake > 0) {
        const s = this.shake * cam.shake;
        c.position.x += (Math.random() - 0.5) * 0.02 * s;
        c.position.y += (Math.random() - 0.5) * 0.02 * s;
      }
      this.shake = Math.max(0, this.shake - dt * 4);
      c.rotation.set(cam.pitch, cam.yaw + Math.PI, cam.roll || 0, 'YXZ');
    } else if (cam.mode === 'orbit') {
      const a = cam.angle;
      c.position.set(Math.cos(a) * cam.radius + (cam.cx || 0), cam.height, Math.sin(a) * cam.radius);
      c.lookAt((this._look || (this._look = new THREE.Vector3())).set(cam.cx || 0, 1.6, 0));
    } else if (cam.pos) {
      const Pp = cam.pos, L = cam.look;
      c.position.set(Pp.x ?? Pp[0], Pp.y ?? Pp[1], Pp.z ?? Pp[2]);
      if (L) c.lookAt(L.x ?? L[0], L.y ?? L[1], L.z ?? L[2]); else c.rotation.set(cam.pitch || 0, (cam.yaw || 0) + Math.PI, 0, 'YXZ');
    }
    c.updateMatrixWorld();
  }

  celebrate(x, y, z, team, big = 1) {
    const roles = this.style === 'neo'
      ? [team === 0 ? R.JERSEY_0 : R.JERSEY_1, R.GOLD, R.MARKER, R.LINES, R.STAND_C]
      : [R.INK, R.LINES, team === 0 ? R.JERSEY_0 : R.JERSEY_1];
    this.burst.spawn(x, y, z, Math.round(60 * big), roles, 5);
  }

  // where a world point is on screen (NDC -1..1; off-screen points point the shorter way)
  projectToScreen(pos, out) {
    const c = this.camera;
    out.copy(pos).applyMatrix4(c.matrixWorldInverse);
    if (out.z > -0.05) {
      const sx = out.x >= 0 ? 1 : -1;
      const up = clamp(out.y / (Math.hypot(out.x, out.z) + 1e-3), -0.6, 0.6);
      return out.set(sx * 50, up * 50, 0);
    }
    return out.applyMatrix4(c.projectionMatrix);
  }

  // render the live scene in a given style into a small image (for the style menu)
  renderPreview(styleName, w, h, cam) {
    const prev = this.style;
    const rt = new THREE.WebGLRenderTarget(w, h, { samples: 4 });
    const oldRes = SU.uResolution.value.clone();
    const oldAspect = this.camera.aspect;
    this.setStyle(styleName);
    SU.uResolution.value.set(w, h);
    SU.uLineWidth.value = STYLES[styleName].lineWidth;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    const savedPos = this.camera.position.clone(), savedQ = this.camera.quaternion.clone();
    if (cam) {
      this.camera.position.set(cam.pos[0], cam.pos[1], cam.pos[2]);
      this.camera.lookAt(new THREE.Vector3(cam.look[0], cam.look[1], cam.look[2]));
      this.camera.updateMatrixWorld();
    }
    this.renderer.shadowMap.needsUpdate = true;
    this.renderer.setRenderTarget(rt);
    this.renderer.render(this.scene, this.camera);
    if (!cam && this.vm && this.firstPerson) { this.renderer.autoClear = false; this.renderer.clearDepth(); this.renderer.render(this.vm.scene, this.camera); this.renderer.autoClear = true; }
    const buf = new Uint8Array(w * h * 4);
    this.renderer.readRenderTargetPixels(rt, 0, 0, w, h, buf);
    this.renderer.setRenderTarget(null);
    rt.dispose();
    const cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    const ctx2 = cv.getContext('2d');
    const img = ctx2.createImageData(w, h);
    for (let y = 0; y < h; y++) img.data.set(buf.subarray((h - 1 - y) * w * 4, (h - y) * w * 4), y * w * 4);
    ctx2.putImageData(img, 0, 0);
    this.setStyle(prev);
    this.camera.position.copy(savedPos);
    this.camera.quaternion.copy(savedQ);
    SU.uResolution.value.copy(oldRes);
    this.applyLineWidth();
    this.camera.aspect = oldAspect;
    this.camera.updateProjectionMatrix();
    return cv.toDataURL('image/png');
  }

  stats() {
    const i = this.renderer.info;
    return { calls: i.render.calls, tris: i.render.triangles, people: this.venue ? this.venue.people : 0 };
  }
}
