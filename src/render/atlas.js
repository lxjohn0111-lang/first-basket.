// Generated canvas textures: an alpha atlas for shirt numbers and stadium words,
// and the live scoreboard screen. Nothing is loaded from disk.
import * as THREE from 'three';

const W = 1024, H = 1024;

export class Atlas {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = W; this.canvas.height = H;
    this.ctx = this.canvas.getContext('2d');
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.anisotropy = 4;
    this.words = new Map();
    this.reset();
  }

  reset() {
    const c = this.ctx;
    c.clearRect(0, 0, W, H);
    c.fillStyle = '#fff';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.font = 'bold 88px "Arial Black", Arial, Helvetica, sans-serif';
    for (let d = 0; d < 10; d++) c.fillText(String(d), d * 64 + 32, 52);
    this.words.clear();
    this.slot = 0;
    this.texture.needsUpdate = true;
  }

  rect(x, y, w, h) { return [x / W, 1 - (y + h) / H, (x + w) / W, 1 - y / H]; }

  digit(d) { return this.rect(d * 64 + 6, 4, 52, 96); }

  word(text) {
    if (this.words.has(text)) return this.words.get(text);
    const col = this.slot % 2, row = Math.floor(this.slot / 2);
    if (row > 13) return this.rect(0, 0, 1, 1);
    this.slot++;
    const x = col * 512, y = 112 + row * 64;
    const c = this.ctx;
    c.save();
    c.clearRect(x, y, 512, 64);
    c.fillStyle = '#fff';
    c.textAlign = 'center'; c.textBaseline = 'middle';
    let size = 46;
    c.font = `bold ${size}px "Arial Black", Arial, Helvetica, sans-serif`;
    while (c.measureText(text).width > 496 && size > 14) { size -= 2; c.font = `bold ${size}px "Arial Black", Arial, Helvetica, sans-serif`; }
    c.fillText(text, x + 256, y + 33);
    c.restore();
    const r = this.rect(x + 2, y + 2, 508, 60);
    this.words.set(text, r);
    this.texture.needsUpdate = true;
    return r;
  }
}

export class ScoreboardTexture {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 512; this.canvas.height = 288;
    this.ctx = this.canvas.getContext('2d');
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.key = '';
  }
  // home/away names, score, game clock, shot clock and possession arrow
  update(home, away, score, clock, shot, poss, style, final = false, period = '') {
    const key = `${home}|${away}|${score}|${clock}|${shot}|${poss}|${style}|${final}|${period}`;
    if (key === this.key) return;
    this.key = key;
    const c = this.ctx;
    const neo = style === 'neo';
    c.fillStyle = neo ? '#111' : '#f6f5ef';
    c.fillRect(0, 0, 512, 288);
    c.strokeStyle = neo ? '#ffd23f' : '#222';
    c.lineWidth = neo ? 10 : 4;
    c.strokeRect(8, 8, 496, 272);
    c.textAlign = 'center'; c.textBaseline = 'middle';
    c.font = 'bold 40px "Arial Black", Arial, sans-serif';
    c.fillStyle = neo ? '#fff' : '#161616';
    c.fillText(home, 120, 50);
    c.fillText(away, 392, 50);
    c.font = 'bold 96px "Arial Black", Arial, sans-serif';
    c.fillStyle = neo ? '#ff7a1a' : '#161616';
    c.fillText(String(score[0]), 120, 140);
    c.fillText(String(score[1]), 392, 140);
    c.font = 'bold 54px "Arial Black", Arial, sans-serif';
    c.fillStyle = neo ? '#3ee0ff' : '#333';
    c.fillText(final ? 'FINAL' : clock, 256, 132);
    // the quarter
    if (period && !final) {
      c.font = 'bold 30px "Arial Black", Arial, sans-serif';
      c.fillStyle = neo ? '#ffd23f' : '#161616';
      c.fillText(period, 256, 74);
    }
    // possession arrow
    if (poss === 0 || poss === 1) {
      c.fillStyle = neo ? '#ffd23f' : '#161616';
      c.beginPath();
      const x = poss === 0 ? 210 : 302, d = poss === 0 ? -1 : 1;
      c.moveTo(x + d * 22, 200); c.lineTo(x, 186); c.lineTo(x, 214); c.closePath(); c.fill();
    }
    c.font = 'bold 50px "Arial Black", Arial, sans-serif';
    c.fillStyle = neo ? '#ff3d6e' : '#7a1010';
    c.fillText(final ? '' : shot, 256, 222);
    c.font = 'bold 20px Arial, sans-serif';
    c.fillStyle = neo ? '#aaa' : '#666';
    c.fillText('SHOT', 256, 258);
    this.texture.needsUpdate = true;
  }
}

export class ShotClockTexture {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 128; this.canvas.height = 80;
    this.ctx = this.canvas.getContext('2d');
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.key = '';
  }
  update(text, style) {
    const key = `${text}|${style}`;
    if (key === this.key) return;
    this.key = key;
    const c = this.ctx, neo = style === 'neo';
    c.fillStyle = neo ? '#0c0c0c' : '#f3f2ec';
    c.fillRect(0, 0, 128, 80);
    c.strokeStyle = neo ? '#000' : '#222'; c.lineWidth = 6; c.strokeRect(3, 3, 122, 74);
    c.textAlign = 'center'; c.textBaseline = 'middle';
    c.font = 'bold 60px "Arial Black", Arial, sans-serif';
    c.fillStyle = neo ? '#ff3d3d' : '#8a1a1a';
    c.fillText(text, 64, 43);
    this.texture.needsUpdate = true;
  }
}
