// In-game HUD (First Touch's HUD, adapted): score bug with a possession arrow, game
// clock and shot clock at the top, your card (points, shooting, energy) top left,
// a small crosshair with the shot meter beside it, contextual hints, short
// notifications, an off-screen ball arrow and a radar (the half court, or the whole
// floor with the basket you attack at the top).
//
// The shot meter fills while the shoot input is held. Its green sweet spot sits
// higher the further the shot (more power needed) and narrows under pressure or on
// the move; a tick shows where you released and a grade pops up.
import * as THREE from 'three';
import { COURT, HOOP, LINES } from '../sim/constants.js';
import { SHOT_LABEL } from '../sim/shooting.js';

const el = (tag, cls, parent, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  if (parent) parent.appendChild(e);
  return e;
};

export class Hud {
  constructor(root) {
    this.root = el('div', 'hud hidden', root);
    this.poss = el('div', 'hud-poss', this.root);
    el('div', 'hud-poss-label', this.poss, 'YOU HAVE THE BALL');
    this.hasBall = false;
    const top = el('div', 'hud-top', this.root);
    this.teamA = el('span', 'hud-team', top);
    this.score = el('span', 'hud-score', top, '0 - 0');
    this.teamB = el('span', 'hud-team', top);
    const clocks = el('div', 'hud-clocks', this.root);
    this.period = el('div', 'hud-period hidden', clocks, 'Q1');
    this.clock = el('div', 'hud-clock', clocks, '5:00');
    this.shot = el('div', 'hud-shot', clocks, '14');
    this.phase = el('div', 'hud-phase', this.root);
    const tl = el('div', 'hud-player', this.root);
    const row = el('div', 'hud-prow', tl);
    this.ptsEl = el('div', 'hud-rating', row, '0');
    el('div', 'hud-rating-label', row, 'PTS');
    this.lineEl = el('div', 'hud-line', tl, '');
    const stam = el('div', 'hud-stamina', tl);
    this.stamFill = el('div', 'hud-stamina-fill', stam);
    this.nameEl = el('div', 'hud-name', tl);
    this.cross = el('div', 'hud-cross', this.root);
    // shot meter
    this.meter = el('div', 'hud-meter hidden', this.root);
    this.meterLabel = el('div', 'hm-label', this.meter);
    const bar = el('div', 'hm-bar', this.meter);
    this.meterFill = el('i', 'hm-fill', bar);
    this.meterBand = el('i', 'hm-band', bar);
    this.meterPerfect = el('i', 'hm-perfect', bar);
    this.meterTick = el('i', 'hm-tick', bar);
    this.clear = el('div', 'hud-clear hidden', this.root, 'CLEAR IT · take it past the arc');
    this.hint = el('div', 'hud-hint', this.root);
    this.notes = el('div', 'hud-notes', this.root);
    this.arrow = el('div', 'hud-arrow hidden', this.root);
    this.banner = el('div', 'hud-banner hidden', this.root);
    this.count = el('div', 'hud-count hidden', this.root);
    this.countTitle = el('div', 'c-title', this.count);
    this.countNum = el('div', 'c-num', this.count);
    this.fade = el('div', 'hud-fade', this.root);
    this.radar = el('canvas', 'hud-radar', this.root);
    this.radar.width = 200; this.radar.height = 176;
    this.rctx = this.radar.getContext('2d');
    this.v = new THREE.Vector3();
    this.bannerUntil = 0;
  }

  show(on) { this.root.classList.toggle('hidden', !on); }

  notify(text, kind = '') {
    const n = el('div', 'hud-note ' + kind, this.notes, text);
    setTimeout(() => n.classList.add('out'), 1300);
    setTimeout(() => n.remove(), 1700);
    while (this.notes.children.length > 3) this.notes.firstChild.remove();
  }

  showBanner(text, sub = '', ms = 2200, kind = '') {
    this.banner.className = 'hud-banner ' + kind;
    this.banner.innerHTML = `<div class="b-main">${text}</div>${sub ? `<div class="b-sub">${sub}</div>` : ''}`;
    this.bannerUntil = performance.now() + ms;
  }

  showCountdown(title, num) {
    if (title != null) this.countTitle.textContent = title;
    this.count.classList.remove('hidden');
    this.countNum.textContent = num;
    this.countNum.classList.toggle('go', num === 'GO!');
    this.countNum.classList.remove('pop'); void this.countNum.offsetWidth; this.countNum.classList.add('pop');
  }
  endCountdown() { this.count.classList.add('hidden'); }
  flashFade() { this.fade.classList.remove('on'); void this.fade.offsetWidth; this.fade.classList.add('on'); }

  update(s) {
    const m = s.match;
    const h = m.human;
    this.teamA.textContent = m.teams[0].short;
    this.teamB.textContent = m.teams[1].short;
    this.teamA.style.setProperty('--kit', s.kitA || '#c00');
    this.teamB.style.setProperty('--kit', s.kitB || '#00c');
    const live = m.phase === 'live' || m.phase === 'check' || m.phase === 'inbound';
    this.teamA.classList.toggle('poss', live && m.offense === 0 && m.rules);
    this.teamB.classList.toggle('poss', live && m.offense === 1 && m.rules);
    // full court: the quarter, and who is in the bonus (team fouls)
    const fullCourt = !!m.full && s.clockText == null;
    this.period.classList.toggle('hidden', !fullCourt);
    if (fullCourt) this.period.textContent = m.periodLabel;
    const bonus = m.full ? 5 : 6;
    this.teamA.classList.toggle('bonus', !!m.rules && m.teams[1].fouls >= bonus - 1 && m.phase !== 'over');
    this.teamB.classList.toggle('bonus', !!m.rules && m.teams[0].fouls >= bonus - 1 && m.phase !== 'over');
    const sc = `${m.teams[0].score} - ${m.teams[1].score}`;
    if (sc !== this.score.textContent) {
      if (this.score.textContent !== '0 - 0' || sc !== '0 - 0') { this.score.classList.remove('bump'); void this.score.offsetWidth; this.score.classList.add('bump'); }
      this.score.textContent = sc;
    }
    this.clock.textContent = s.clockText ?? m.displayClock;
    const showShot = m.shotClockOn && m.phase !== 'over' && s.clockText == null;
    this.shot.classList.toggle('hidden', !showShot);
    if (showShot) {
      this.shot.textContent = m.displayShot;
      this.shot.classList.toggle('low', m.shotClock <= 5 && m.phase === 'live');
    }
    this.phase.textContent = s.phaseText || '';
    if (h) {
      const st = m.stats.of(h);
      this.ptsEl.textContent = st.pts;
      this.lineEl.textContent = `FG ${st.fgm}/${st.fga} · 3P ${st.tpm}/${st.tpa}${st.ast ? ` · AST ${st.ast}` : ''}${st.stl ? ` · STL ${st.stl}` : ''}`;
      this.stamFill.style.width = `${Math.round(h.stamina * 100)}%`;
      this.stamFill.classList.toggle('low', h.stamina < 0.3);
      this.nameEl.textContent = `#${h.number} ${h.name}`;
    }
    this.updateMeter(s);
    this.clear.classList.toggle('hidden', !(h && m.mustClear === h.team && m.ball.owner && m.ball.owner.team === h.team && m.phase === 'live'));
    this.hint.textContent = s.hint || '';
    const has = !!h && m.ball.owner === h && (m.ball.state === 'held' || m.ball.state === 'dribble') && (m.phase === 'live' || m.phase === 'check');
    if (has !== this.hasBall) { this.hasBall = has; this.poss.classList.toggle('on', has); }
    this.banner.classList.toggle('hidden', performance.now() > this.bannerUntil);
    this.updateArrow(s);
    this.drawRadar(s);
  }

  updateMeter(s) {
    const pv = s.preview;
    const show = !!pv && s.meter !== false;
    this.meter.classList.toggle('hidden', !show);
    if (!show) return;
    const spot = pv.spot;
    const pct = (x) => `${Math.round(Math.max(0, Math.min(1, x)) * 1000) / 10}%`;
    this.meterBand.style.bottom = pct(spot.c - spot.w); this.meterBand.style.height = pct(spot.w * 2);
    this.meterPerfect.style.bottom = pct(spot.c - spot.w * 0.45); this.meterPerfect.style.height = pct(spot.w * 0.9);
    this.meterFill.style.height = pct(pv.charge || 0);
    this.meter.classList.toggle('idle', !pv.live && !pv.released);
    this.meter.classList.toggle('done', !!pv.released);
    this.meterTick.style.bottom = pct(pv.charge || 0);
    this.meterTick.style.display = pv.released ? 'block' : 'none';
    this.meterLabel.textContent = pv.released && pv.grade ? pv.grade.label : SHOT_LABEL[pv.kind] || '';
    this.meter.dataset.tier = pv.released && pv.grade ? pv.grade.tier : '';
  }

  updateArrow(s) {
    const m = s.match;
    const b = m.ball.pos;
    const v = s.view.projectToScreen(this.v.set(b.x, b.y, b.z), this.v);
    const off = Math.abs(v.x) > 0.98 || Math.abs(v.y) > 0.98;
    if (!off || s.noArrow || this.hasBall || m.phase === 'over') { this.arrow.classList.add('hidden'); return; }
    const ang = Math.atan2(v.y, v.x);
    const r = 0.86;
    const k = Math.min(r / Math.max(Math.abs(Math.cos(ang)), 1e-3), r / Math.max(Math.abs(Math.sin(ang)), 1e-3));
    const px = (Math.cos(ang) * k * 0.5 + 0.5) * 100, py = (-Math.sin(ang) * k * 0.5 + 0.5) * 100;
    this.arrow.classList.remove('hidden');
    this.arrow.style.left = `${px}%`;
    this.arrow.style.top = `${py}%`;
    this.arrow.style.transform = `translate(-50%,-50%) rotate(${-ang}rad)`;
  }

  // the half court (hoop at the top), or the full court with the basket the human
  // attacks at the top
  drawRadar(s) {
    const m = s.match, c = this.rctx;
    const h = m.human;
    const full = !!m.full;
    if (full !== this.radarFull) {
      this.radarFull = full;
      this.radar.width = full ? 124 : 200; this.radar.height = full ? 216 : 176;
      this.radar.classList.toggle('full', full);
    }
    const W = this.radar.width, H = this.radar.height;
    const pad = full ? 7 : 10;
    // world -> radar: in the attack frame of the human's team (sign sg)
    const sg = full ? (h ? m.side(h.team) : 1) : 1;
    const sx = (W - pad * 2) / COURT.W, sy = (H - pad * 2) / (full ? COURT.L : COURT.HL);
    const map = (x, z) => [pad + (COURT.HW + z * sg) * sx, pad + (COURT.HL - x * sg) * sy];
    c.clearRect(0, 0, W, H);
    c.fillStyle = s.style === 'neo' ? 'rgba(236,159,60,0.92)' : 'rgba(150,110,60,0.88)';
    c.fillRect(0, 0, W, H);
    c.strokeStyle = 'rgba(255,255,255,0.9)';
    c.lineWidth = 1;
    c.strokeRect(pad, pad, W - pad * 2, H - pad * 2);
    // one end (in radar space: e = +1 top, -1 bottom)
    const end = (e) => {
      const m2 = (x, z) => map(e * x * sg, e * z * sg);
      const [k0x, k0y] = m2(COURT.HL, -LINES.KEY_HW), [k1x, k1y] = m2(LINES.FT_X, LINES.KEY_HW);
      c.strokeStyle = 'rgba(255,255,255,0.9)'; c.lineWidth = 1;
      c.strokeRect(Math.min(k0x, k1x), Math.min(k0y, k1y), Math.abs(k1x - k0x), Math.abs(k1y - k0y));
      const [hx, hy] = m2(HOOP.X, 0);
      const [cLx] = m2(0, -LINES.THREE_Z), [cRx] = m2(0, LINES.THREE_Z);
      const [, turnY] = m2(LINES.THREE_X, 0);
      const [, baseY] = m2(COURT.HL, 0);
      const a = Math.asin(LINES.THREE_Z / LINES.THREE_R);
      c.beginPath();
      c.moveTo(cLx, baseY); c.lineTo(cLx, turnY);
      if (e > 0) c.arc(hx, hy, LINES.THREE_R * sx, Math.PI / 2 + a, Math.PI / 2 - a, true);
      else c.arc(hx, hy, LINES.THREE_R * sx, -Math.PI / 2 + a, -Math.PI / 2 - a, true);
      c.lineTo(cRx, baseY);
      c.stroke();
      c.beginPath(); c.arc(hx, hy, full ? 2.4 : 3, 0, Math.PI * 2); c.strokeStyle = e > 0 ? '#ff6a1a' : 'rgba(255,255,255,0.7)'; c.lineWidth = 2; c.stroke();
    };
    end(1);
    if (full) {
      end(-1);
      const [, my] = map(0, 0);
      c.strokeStyle = 'rgba(255,255,255,0.9)'; c.lineWidth = 1;
      c.beginPath(); c.moveTo(pad, my); c.lineTo(W - pad, my); c.stroke();
      c.beginPath(); c.arc(W / 2, my, LINES.CENTER_R * sx, 0, Math.PI * 2); c.stroke();
    }
    const dot = full ? 3.4 : 4.2;
    for (const p of m.players) {
      if (p === h) continue;
      const [x, y] = map(p.pos.x, p.pos.z);
      c.fillStyle = p.team === 0 ? s.kitA : s.kitB;
      c.strokeStyle = '#111'; c.lineWidth = 1.2;
      c.beginPath(); c.arc(x, y, dot, 0, Math.PI * 2); c.fill(); c.stroke();
    }
    if (h) {
      const [x, y] = map(h.pos.x, h.pos.z);
      const yaw = s.camYaw;
      const dx = Math.cos(yaw) * sg, dy = -Math.sin(yaw) * sg;
      c.fillStyle = '#ffc61a';
      c.beginPath();
      c.moveTo(x + dx * 10, y + dy * 10);
      c.lineTo(x - dy * 6 - dx * 4, y + dx * 6 - dy * 4);
      c.lineTo(x + dy * 6 - dx * 4, y - dx * 6 - dy * 4);
      c.closePath(); c.fill();
      c.strokeStyle = '#070b1d'; c.lineWidth = 2; c.stroke();
    }
    const [bx, by] = map(m.ball.pos.x, m.ball.pos.z);
    c.fillStyle = '#ff7a1a'; c.strokeStyle = '#000'; c.lineWidth = 1.5;
    c.beginPath(); c.arc(bx, by, 3.2, 0, Math.PI * 2); c.fill(); c.stroke();
  }
}
