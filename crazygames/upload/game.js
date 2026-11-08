/* Courtside - bundled game. three.js is MIT licensed (see vendor/three/LICENSE). */
(()=>{var _d=`/* Courtside interface: First Touch's arcade design system, carried over unchanged in
   its tokens, for every screen, the HUD and the touch controls (independent of the
   3D visual style). Everything below is built from
   these shared tokens: colours, radii, borders, depth, type, sizes and spacing. */
:root {
  /* colour */
  --bg: #0e1430; --bg2: #141c40;
  --panel: #1b244e; --panel2: #243063; --panel3: #2f3d7a;
  --line: #070b1d; --edge: rgba(255, 255, 255, 0.09);
  --text: #ffffff; --text2: #c3cbef; --muted: #8d98c8;
  --primary: #ffc61a; --primary-hi: #ffdb52; --primary-lo: #d69600; --primary-ink: #2b1c00;
  --secondary: #3b4892; --secondary-hi: #4b5ab0; --secondary-lo: #283270;
  --accent: #2fd4ff; --accent-lo: #129bc4;
  --success: #33d36c; --success-lo: #1d9a49;
  --danger: #ff4d5e; --danger-lo: #c22b3d;
  --warn: #ff9f1c;
  --gold: #ffc61a;
  /* shape */
  --r-sm: 10px; --r: 14px; --r-lg: 20px; --r-pill: 999px;
  --bw: 3px;
  --depth: 5px;
  --sh-panel: 0 16px 40px rgba(0, 0, 0, 0.45);
  --hi: inset 0 2px 0 rgba(255, 255, 255, 0.22);
  /* type */
  --f-display: "Arial Rounded MT Bold", "Arial Black", "Segoe UI Black", "Helvetica Neue", system-ui, sans-serif;
  --f-body: system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  /* sizes and spacing */
  --h-xl: 76px; --h-lg: 60px; --h-md: 50px; --h-sm: 40px;
  --s1: 4px; --s2: 8px; --s3: 12px; --s4: 16px; --s5: 24px; --s6: 32px; --s7: 48px;
  /* motion */
  --t-fast: 0.12s; --t: 0.2s; --t-slow: 0.3s;
  --pop: cubic-bezier(0.2, 0.9, 0.3, 1.25);
  --out: cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* ------------------------------------------------------------- base */
#ui { position: fixed; inset: 0; pointer-events: none; font-family: var(--f-body); color: var(--text); z-index: 10; -webkit-font-smoothing: antialiased; }
#ui * { box-sizing: border-box; }
html, body { overscroll-behavior: none; }
#game { touch-action: none; }
#ui { -webkit-tap-highlight-color: transparent; -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; }
#ui input { -webkit-user-select: text; user-select: text; }
.hidden { display: none !important; }
.ico { display: inline-block; vertical-align: middle; flex: none; }

.screen { position: absolute; inset: 0; pointer-events: auto; display: flex; overflow: auto; touch-action: pan-x pan-y; }
.screen.center { align-items: flex-start; justify-content: flex-start; padding: var(--s4); }
.screen.center > .panel { margin: auto; max-width: 100%; }
/* the game keeps running behind every screen: a coloured veil keeps the UI readable */
.dim { background: radial-gradient(ellipse at 50% 40%, rgba(20, 28, 70, 0.62), rgba(6, 9, 26, 0.86)); }
.screen > * { animation: screenIn var(--t-slow) var(--out) both; }
@keyframes screenIn { from { opacity: 0; transform: translateY(14px) scale(0.98); } }

/* ------------------------------------------------------------- type */
.h-title { font-family: var(--f-display); font-weight: 900; font-size: 32px; letter-spacing: 0.5px; text-transform: uppercase; margin: 0 0 var(--s4); line-height: 1.05; }
.h-sec { font-family: var(--f-display); font-weight: 900; font-size: 14px; letter-spacing: 1.6px; text-transform: uppercase; color: var(--text2); margin: var(--s5) 0 var(--s3); }
.h-sec:first-child { margin-top: 0; }
.lead { font-size: 16px; color: var(--text2); margin: 0 0 var(--s4); line-height: 1.4; }
.muted { color: var(--muted); }
.small { font-size: 13px; }
.center-t { text-align: center; }
.big-num { font-family: var(--f-display); font-weight: 900; font-variant-numeric: tabular-nums; }

/* ------------------------------------------------------------- panels and cards */
.panel { background: linear-gradient(180deg, var(--panel2), var(--panel) 120px); border: var(--bw) solid var(--line); border-radius: var(--r-lg); box-shadow: var(--sh-panel), inset 0 1px 0 var(--edge); padding: var(--s5); }
.panel.narrow { width: min(460px, 94vw); }
.panel.mid { width: min(640px, 94vw); }
.panel.wide { width: min(920px, 96vw); }
.card { background: var(--panel2); border: var(--bw) solid var(--line); border-radius: var(--r); padding: var(--s4); box-shadow: 0 var(--depth) 0 var(--line), var(--hi); transition: transform var(--t) var(--pop), box-shadow var(--t), border-color var(--t), background var(--t); }
.card.pick { cursor: pointer; }
.card.pick:hover { transform: translateY(-3px); background: var(--panel3); }
.card.pick:active { transform: translateY(2px); box-shadow: 0 1px 0 var(--line), var(--hi); }
.card.on, .card.pick.on { border-color: var(--accent); background: var(--panel3); box-shadow: 0 var(--depth) 0 var(--accent-lo), 0 0 0 3px rgba(47, 212, 255, 0.25), var(--hi); transform: translateY(-3px); }
.row { display: flex; gap: var(--s3); align-items: center; }
.row.wrap { flex-wrap: wrap; }
.row.end { justify-content: flex-end; }
.row.mid { justify-content: center; }
.col { display: flex; flex-direction: column; gap: var(--s3); }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--s4); }
.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s3); }
.spacer { flex: 1; }
.actions { display: flex; gap: var(--s3); align-items: center; margin-top: var(--s5); flex-wrap: wrap; }
.actions.mid { justify-content: center; }

/* ------------------------------------------------------------- buttons */
.btn { --b: var(--secondary); --b-hi: var(--secondary-hi); --b-lo: var(--secondary-lo); --b-ink: #fff;
  position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--s2);
  min-height: var(--h-md); padding: 0 var(--s5); font: 900 16px/1.1 var(--f-display); letter-spacing: 0.8px; text-transform: uppercase;
  color: var(--b-ink); background: linear-gradient(180deg, var(--b-hi), var(--b)); border: var(--bw) solid var(--line); border-radius: var(--r);
  box-shadow: 0 var(--depth) 0 var(--line), var(--hi); cursor: pointer; text-align: center; white-space: nowrap; overflow: hidden;
  transition: transform var(--t-fast) var(--pop), box-shadow var(--t-fast), filter var(--t-fast), background var(--t); }
.btn:hover { transform: translateY(-2px) scale(1.03); filter: brightness(1.08); box-shadow: 0 calc(var(--depth) + 2px) 0 var(--line), var(--hi); }
.btn:active, .btn.pressed { transform: translateY(var(--depth)) scale(0.99); box-shadow: 0 0 0 var(--line), var(--hi); filter: brightness(0.96); transition-duration: 0.05s; }
.btn:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; }
.btn:disabled, .btn.disabled { filter: grayscale(0.85) brightness(0.7); cursor: not-allowed; transform: none; box-shadow: 0 var(--depth) 0 var(--line); opacity: 0.6; }
.btn small { display: block; font: 600 12px/1.2 var(--f-body); letter-spacing: 0; text-transform: none; opacity: 0.85; margin-top: 3px; }
.btn .stack { display: flex; flex-direction: column; align-items: flex-start; text-align: left; }
.btn.primary { --b: var(--primary); --b-hi: var(--primary-hi); --b-lo: var(--primary-lo); --b-ink: var(--primary-ink); }
.btn.success { --b: var(--success); --b-hi: #52e386; --b-ink: #052812; }
.btn.danger { --b: var(--danger); --b-hi: #ff6b79; --b-ink: #fff; }
.btn.ghost { background: transparent; box-shadow: none; border-color: rgba(255, 255, 255, 0.22); color: var(--text2); }
.btn.ghost:hover { background: rgba(255, 255, 255, 0.07); box-shadow: none; color: #fff; }
.btn.ghost:active { transform: scale(0.97); }
.btn.sm { min-height: var(--h-sm); padding: 0 var(--s4); font-size: 14px; border-radius: var(--r-sm); --depth: 4px; }
.btn.lg { min-height: var(--h-lg); padding: 0 var(--s6); font-size: 20px; }
.btn.xl { min-height: var(--h-xl); padding: 0 var(--s7); font-size: 30px; letter-spacing: 1.5px; border-radius: var(--r-lg); --depth: 7px; }
.btn.icon { min-width: var(--h-md); padding: 0; }
.btn.icon.sm { min-width: var(--h-sm); }
.btn.block { display: flex; width: 100%; }
.btn { max-width: 100%; }
/* the primary action catches the eye with a highlight that sweeps across it */
.btn.primary::after { content: ""; position: absolute; top: -20%; bottom: -20%; width: 40%; left: -60%; background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.55), transparent); transform: skewX(-18deg); animation: shine 3.2s ease-in-out infinite; pointer-events: none; }
@keyframes shine { 0%, 62% { left: -60%; } 85%, 100% { left: 130%; } }
.badge { display: inline-flex; align-items: center; gap: 4px; font: 900 12px/1 var(--f-display); letter-spacing: 0.6px; text-transform: uppercase; padding: 5px 9px; border-radius: var(--r-pill); background: var(--panel3); color: var(--text); border: 2px solid var(--line); }
.badge.gold { background: var(--primary); color: var(--primary-ink); }
.badge.good { background: var(--success); color: #052812; }
.badge.bad { background: var(--danger); color: #fff; }
.badge.cyan { background: var(--accent); color: #032430; }
.badge.pulse { animation: badgePulse 1.2s ease-in-out infinite; }
@keyframes badgePulse { 50% { transform: scale(1.12); } }
.dot-new { position: absolute; top: -6px; right: -6px; min-width: 22px; height: 22px; border-radius: 11px; background: var(--danger); color: #fff; font: 900 12px/18px var(--f-display); text-align: center; border: 2px solid var(--line); padding: 0 5px; animation: badgePulse 1.2s ease-in-out infinite; }

/* ------------------------------------------------------------- controls */
/* segmented choice (also the on / off switches) */
.seg { display: inline-flex; flex-wrap: wrap; gap: 4px; padding: 4px; background: var(--bg); border: var(--bw) solid var(--line); border-radius: var(--r); }
.seg .opt { font: 900 14px/1 var(--f-display); letter-spacing: 0.6px; text-transform: uppercase; color: var(--text2); background: transparent; border: none; border-radius: var(--r-sm); min-height: 38px; padding: 0 var(--s4); cursor: pointer; transition: background var(--t), color var(--t), transform var(--t-fast) var(--pop); }
.seg .opt:hover { color: #fff; background: rgba(255, 255, 255, 0.08); }
.seg .opt:active { transform: scale(0.95); }
.seg .opt.on { background: var(--accent); color: #032430; box-shadow: 0 3px 0 var(--accent-lo); animation: optOn var(--t) var(--pop); }
@keyframes optOn { from { transform: scale(0.88); } }
/* labelled setting row */
.set { display: flex; align-items: center; justify-content: space-between; gap: var(--s4); padding: var(--s3) 0; border-bottom: 2px solid rgba(255, 255, 255, 0.06); }
.set:last-child { border-bottom: none; }
.set > label, .set > .lab { font: 900 15px/1.2 var(--f-display); letter-spacing: 0.4px; text-transform: uppercase; }
.set .val { font: 900 15px var(--f-display); color: var(--primary); min-width: 3.5em; text-align: right; font-variant-numeric: tabular-nums; }
/* slider */
.slider { display: flex; align-items: center; gap: var(--s3); flex: 1; max-width: 340px; }
input.range { -webkit-appearance: none; appearance: none; flex: 1; height: 14px; border-radius: var(--r-pill); border: var(--bw) solid var(--line); outline: none; padding: 0; margin: 0; cursor: pointer;
  background: linear-gradient(90deg, var(--primary) 0 var(--p, 50%), var(--bg) var(--p, 50%) 100%); }
input.range::-webkit-slider-thumb { -webkit-appearance: none; width: 28px; height: 28px; border-radius: 50%; background: #fff; border: var(--bw) solid var(--line); box-shadow: 0 3px 0 var(--line); transition: transform var(--t-fast) var(--pop); }
input.range::-moz-range-thumb { width: 24px; height: 24px; border-radius: 50%; background: #fff; border: var(--bw) solid var(--line); box-shadow: 0 3px 0 var(--line); }
input.range:hover::-webkit-slider-thumb { transform: scale(1.12); }
input.range:active::-webkit-slider-thumb { transform: scale(0.95); }
/* text field */
.field { width: 100%; font: 800 18px var(--f-body); color: #fff; background: var(--bg); border: var(--bw) solid var(--line); border-radius: var(--r); padding: 0 var(--s4); min-height: var(--h-md); outline: none; box-shadow: inset 0 3px 0 rgba(0, 0, 0, 0.35); transition: border-color var(--t), box-shadow var(--t); }
.field.locked { display: flex; align-items: center; gap: var(--s2); color: var(--text2); cursor: default; user-select: none; }
.field.locked span { color: #fff; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.field:focus { border-color: var(--accent); box-shadow: inset 0 3px 0 rgba(0, 0, 0, 0.35), 0 0 0 4px rgba(47, 212, 255, 0.25); }
/* arrow picker (one value at a time, with arrows) */
.picker { display: flex; align-items: center; gap: var(--s2); }
.picker .pv { flex: 1; min-height: var(--h-md); display: flex; align-items: center; justify-content: center; gap: var(--s2); font: 900 16px var(--f-display); text-transform: uppercase; background: var(--bg); border: var(--bw) solid var(--line); border-radius: var(--r); padding: 0 var(--s3); text-align: center; }
/* stepper */
.stepper { display: flex; align-items: center; gap: var(--s2); }
.stepper .pv { min-width: 64px; text-align: center; font: 900 26px var(--f-display); }
/* colour swatches */
.swatches { display: flex; flex-wrap: wrap; gap: var(--s2); }
.sw { width: 40px; height: 40px; border-radius: 50%; border: var(--bw) solid var(--line); cursor: pointer; box-shadow: 0 3px 0 var(--line); transition: transform var(--t-fast) var(--pop); }
.sw:hover { transform: scale(1.12); }
.sw.on { box-shadow: 0 0 0 3px #fff, 0 0 0 6px var(--accent); transform: scale(1.08); }
/* tabs */
.tabs { display: flex; gap: var(--s2); flex-wrap: wrap; margin-bottom: var(--s4); }
.tab { position: relative; font: 900 14px/1 var(--f-display); letter-spacing: 0.8px; text-transform: uppercase; color: var(--text2); background: var(--bg); border: var(--bw) solid var(--line); border-radius: var(--r-pill); min-height: 42px; padding: 0 var(--s4); cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: background var(--t), color var(--t), transform var(--t-fast) var(--pop); }
.tab:hover { color: #fff; transform: translateY(-1px); }
.tab:active { transform: scale(0.96); }
.tab.on { background: #fff; color: var(--bg); }

/* bars */
.bar { height: 12px; background: var(--bg); border: 2px solid var(--line); border-radius: var(--r-pill); overflow: hidden; position: relative; }
.bar > i { position: absolute; left: 0; top: 0; bottom: 0; background: linear-gradient(180deg, #7fe0ff, var(--accent)); border-radius: var(--r-pill); transition: width 0.6s var(--out); }
.bar.good > i { background: linear-gradient(180deg, #7ff0a6, var(--success)); }
.bar.gold > i { background: linear-gradient(180deg, var(--primary-hi), var(--primary)); }
.crest { vertical-align: middle; flex: none; filter: drop-shadow(0 2px 0 rgba(0, 0, 0, 0.35)); }

/* ------------------------------------------------------------- toast */
.toast { position: absolute; left: 50%; bottom: calc(28px + env(safe-area-inset-bottom, 0px)); transform: translateX(-50%); pointer-events: auto; max-width: min(560px, 92vw); padding: var(--s3) var(--s5); background: var(--panel2); color: #fff; border: var(--bw) solid var(--line); border-left: 8px solid var(--accent); border-radius: var(--r); box-shadow: var(--sh-panel); font: 800 15px/1.35 var(--f-body); z-index: 50; animation: toastIn var(--t-slow) var(--pop); }
.toast.bad { border-left-color: var(--danger); }
.toast.good { border-left-color: var(--success); }
@keyframes toastIn { from { opacity: 0; transform: translate(-50%, 16px) scale(0.92); } }

/* ------------------------------------------------------------- main menu */
.menu { align-items: stretch; background: linear-gradient(90deg, rgba(8, 12, 32, 0.92) 0%, rgba(8, 12, 32, 0.78) 34%, rgba(8, 12, 32, 0.15) 70%, rgba(8, 12, 32, 0) 100%); }
.menu-inner { display: flex; flex-direction: column; justify-content: center; gap: var(--s5); padding: 5vh 6vw; width: min(680px, 100%); }
.logo { display: flex; align-items: center; gap: var(--s4); animation: logoIn 0.5s var(--pop) both; }
.logo-ball { width: 78px; height: 78px; flex: none; animation: ballSpin 6s linear infinite; filter: drop-shadow(0 6px 0 rgba(0, 0, 0, 0.5)); }
.logo-text { font-family: var(--f-display); font-weight: 900; font-size: clamp(46px, 7.5vw, 88px); line-height: 0.88; letter-spacing: -1px; text-transform: uppercase; color: #fff; text-shadow: 0 6px 0 var(--line), 0 0 30px rgba(0, 0, 0, 0.4); -webkit-text-stroke: 2px var(--line); }
.logo-text em { font-style: normal; color: var(--primary); display: block; }
.tagline { font: 800 17px/1.35 var(--f-body); color: var(--text2); margin-top: var(--s3); max-width: 440px; text-shadow: 0 2px 0 var(--line); }
@keyframes logoIn { from { opacity: 0; transform: translateY(-14px) scale(0.94); } }
@keyframes ballSpin { to { transform: rotate(360deg); } }
.menu-play { display: flex; flex-direction: column; gap: var(--s3); }
.menu-play .btn.xl { justify-content: flex-start; padding-left: var(--s5); }
.menu-play .btn.xl .ico { width: 36px; height: 36px; }
.menu-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--s3); }
.menu-row .btn { justify-content: flex-start; padding: 0 var(--s4); font-size: 18px; }
.menu-icons { display: flex; gap: var(--s3); }
.menu-icons .btn { flex: 1; font-size: 12px; letter-spacing: 0.3px; padding: 0 var(--s2); gap: 6px; }
.menu-foot { font-size: 12px; color: var(--muted); }

/* ------------------------------------------------------------- choice cards */
.choices { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: var(--s3); }
.choice { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; cursor: pointer; padding: var(--s3) var(--s4); text-align: left; color: #fff; font: inherit; }
.choice b { font: 900 16px/1.1 var(--f-display); text-transform: uppercase; letter-spacing: 0.4px; }
.choice span { font-size: 12px; color: var(--text2); line-height: 1.3; }
.club-chip { display: flex; align-items: center; gap: var(--s2); font: 900 14px/1.1 var(--f-display); text-transform: uppercase; }

/* ------------------------------------------------------------- quick match */
.vs { display: grid; grid-template-columns: 1fr auto 1fr; gap: var(--s4); align-items: stretch; }
.vs-mid { align-self: center; font: 900 30px var(--f-display); color: var(--primary); text-shadow: 0 4px 0 var(--line); }
.team-pick { display: flex; flex-direction: column; align-items: center; gap: var(--s2); text-align: center; padding: var(--s4); }
.team-pick .tp-name { font: 900 18px/1.1 var(--f-display); text-transform: uppercase; min-height: 2.2em; display: flex; align-items: center; }
.team-pick .tp-tier { font-size: 12px; color: var(--text2); font-weight: 700; }
.team-pick .row { width: 100%; justify-content: space-between; }
.team-pick .me { margin-top: var(--s1); }
.club-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: var(--s2); margin-top: var(--s3); }
.club-grid .h-sec { grid-column: 1 / -1; margin: var(--s3) 0 0; }
.club-grid .card { padding: var(--s2) var(--s3); }

/* ------------------------------------------------------------- hub */
.hub { flex-direction: column; gap: var(--s4); padding: var(--s4) var(--s5); background: linear-gradient(180deg, rgba(8, 12, 32, 0.9), rgba(8, 12, 32, 0.8)); }
.topbar { display: flex; align-items: center; gap: var(--s4); flex-wrap: wrap; }
.topbar .who { display: flex; align-items: center; gap: var(--s3); min-width: 0; }
.topbar h1 { margin: 0; font: 900 28px/1 var(--f-display); text-transform: uppercase; }
.topbar .sub { color: var(--text2); font-size: 14px; font-weight: 700; margin-top: 4px; }
.lvl { display: flex; align-items: center; gap: var(--s3); background: var(--panel); border: var(--bw) solid var(--line); border-radius: var(--r-pill); padding: 6px 14px 6px 6px; }
.lvl .ring { width: 40px; height: 40px; border-radius: 50%; background: var(--primary); color: var(--primary-ink); display: grid; place-items: center; font: 900 18px var(--f-display); border: var(--bw) solid var(--line); }
.lvl .bar { width: 110px; }
.hub-main { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: var(--s4); align-items: start; }
.next { text-align: center; }
.next .comp { font: 900 13px var(--f-display); letter-spacing: 1.2px; text-transform: uppercase; color: var(--text2); }
.fixture { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: var(--s3); margin: var(--s4) 0; }
.fixture .side { display: flex; flex-direction: column; align-items: center; gap: var(--s2); font: 900 18px/1.1 var(--f-display); text-transform: uppercase; }
.fixture .v { font: 900 26px var(--f-display); color: var(--primary); }
.next .venue { font-size: 13px; color: var(--muted); font-weight: 700; margin-bottom: var(--s4); }
/* banner ads (CrazyGames only), part of the hub's layout: cards drawn like its panels,
   with a hole the size of the banner. The SDK's container (.ad-slot) is laid exactly over
   the hole by src/platform/banners.js; until a banner is served the hole shows a tip. */
.ad-card { align-self: start; max-width: 100%; display: flex; flex-direction: column; align-items: center; gap: 2px; padding: var(--s1) var(--s3) var(--s3); background: linear-gradient(180deg, var(--panel2), var(--panel) 120px); border: var(--bw) solid var(--line); border-radius: var(--r-lg); box-shadow: var(--sh-panel), inset 0 1px 0 var(--edge); }
.ad-label { height: 16px; font: 900 10px/16px var(--f-display); letter-spacing: 1.6px; text-transform: uppercase; color: var(--muted); visibility: hidden; }
.ad-card.filled .ad-label { visibility: visible; }
.ad-hole { flex: none; width: 320px; height: 50px; display: grid; place-items: center; overflow: hidden; border-radius: var(--r-sm); background: rgba(7, 11, 29, 0.55); box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.06); }
.ad-tip { padding: 0 var(--s4); font: 700 13px/1.3 var(--f-body); color: var(--text2); text-align: center; }
.ad-tip b { font: 900 11px var(--f-display); letter-spacing: 1px; text-transform: uppercase; color: var(--primary); margin-right: 8px; }
.ad-card.filled .ad-tip { visibility: hidden; }
/* the wide card: a row of its own under the panels, centred */
.hub-main > .ad-wide { grid-column: 1 / -1; justify-self: center; }
.ad-side { display: none; }
.ad-slot { position: fixed; z-index: 5; overflow: hidden; pointer-events: auto; }
.ad-slot[hidden] { display: none; }
/* toasts move up while a banner shows, so they never cover it */
#ui:has(> .ad-slot:not([hidden])) > .toast { top: calc(var(--s7) + env(safe-area-inset-top, 0px)); bottom: auto; }
@media (min-width: 540px) and (min-height: 430px) { .ad-wide .ad-hole { width: 468px; height: 60px; } }
@media (min-width: 820px) and (min-height: 560px) { .ad-wide .ad-hole { width: 728px; height: 90px; } }
@media (max-width: 539px) and (min-height: 760px) { .ad-wide .ad-hole { width: 320px; height: 100px; } }
/* one column (phones): the banner comes right after the match card */
@media (max-width: 900px) {
  .hub-main > .next { order: 0; }
  .hub-main > .ad-wide { order: 1; }
  .hub-main > .tabs-panel { order: 2; }
}
/* two columns: the tabs never push the banner out of view, they scroll inside their
   panel (as tall as the match card) */
@media (min-width: 901px) and (max-height: 900px) {
  .hub.ads .tabs-panel { contain: size; align-self: stretch; min-height: 300px; display: flex; flex-direction: column; }
  .hub.ads .tabs-panel .tabs { flex: none; }
  .hub.ads .tabs-panel .tab-body { flex: 1 1 auto; min-height: 0; overflow: auto; }
}
/* short windows: a more compact hub, so the panels and the banner fit without scrolling */
@media (min-width: 901px) and (max-height: 700px) {
  .hub.ads { padding-top: var(--s3); padding-bottom: var(--s2); gap: var(--s3); }
  .hub.ads .hub-main { gap: var(--s3); }
  .hub.ads .topbar .who > svg { width: 44px; height: 44px; }
  .hub.ads .topbar h1 { font-size: 24px; }
  .hub.ads .panel.next { padding: var(--s4); }
  .hub.ads .fixture { margin: var(--s2) 0; }
  .hub.ads .fixture svg { width: 52px; height: 52px; }
  .hub.ads .next .venue { margin-bottom: var(--s2); }
  .hub.ads .next .btn.xl { min-height: var(--h-lg); font-size: 24px; }
  .hub.ads .next .actions.mid { margin-top: var(--s2) !important; }
  .hub.ads .tabs { gap: 6px; margin-bottom: var(--s3); }
  .hub.ads .tab { min-height: 36px; padding: 0 var(--s3); font-size: 13px; letter-spacing: 0.5px; }
  .hub.ads .tab > .ico { display: none; }
}
/* wide screens: a 300x250 card as the hub's third column */
@media (min-width: 1360px) and (min-height: 640px) {
  .hub-main.with-ad { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr) auto; }
  .ad-side { display: flex; }
  .ad-side .ad-hole { width: 300px; height: 250px; }
  .ad-side .ad-tip { font-size: 15px; }
}
.attr { display: grid; grid-template-columns: 110px 1fr 36px 40px; align-items: center; gap: var(--s3); margin: 8px 0; font-weight: 800; font-size: 14px; }
.attr b { font: 900 16px var(--f-display); text-align: right; }
.attr .btn { min-height: 34px; min-width: 40px; padding: 0; font-size: 18px; --depth: 3px; }
.mini-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--s2); margin-top: var(--s3); }
.mini { background: var(--bg); border: 2px solid var(--line); border-radius: var(--r-sm); padding: var(--s2); text-align: center; }
.mini b { display: block; font: 900 22px var(--f-display); }
.mini span { font-size: 11px; color: var(--text2); font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
.form-dots { display: flex; gap: 6px; }
.form-dots span { min-width: 42px; text-align: center; font: 900 13px var(--f-display); border-radius: var(--r-sm); padding: 6px 0; background: var(--panel3); border: 2px solid var(--line); }
.form-dots span.hi { background: var(--success); color: #052812; }
.form-dots span.lo { background: var(--danger); }
table.t { border-collapse: separate; border-spacing: 0 4px; width: 100%; font-size: 14px; font-weight: 700; }
table.t th { font: 900 11px var(--f-display); text-transform: uppercase; letter-spacing: 0.8px; color: var(--muted); padding: 2px 8px; text-align: left; }
table.t td { padding: 7px 8px; background: rgba(255, 255, 255, 0.04); }
table.t td:first-child { border-radius: var(--r-sm) 0 0 var(--r-sm); }
table.t td:last-child { border-radius: 0 var(--r-sm) var(--r-sm) 0; }
table.t tr.me td { background: rgba(255, 198, 26, 0.2); color: #fff; }
table.t td.n, table.t th.n { text-align: right; font-variant-numeric: tabular-nums; }
.offer { margin: var(--s3) 0; }
.offer .row { align-items: flex-start; }
.timeline { max-height: 240px; overflow: auto; font-size: 13px; font-weight: 600; color: var(--text2); }
.timeline div { padding: 6px 0; border-bottom: 2px solid rgba(255, 255, 255, 0.05); }
.trophies { display: flex; gap: var(--s2); flex-wrap: wrap; }

/* ------------------------------------------------------------- result screen */
.result { width: min(620px, 96vw); text-align: center; }
.result-word { margin-top: var(--s2); font: 900 clamp(48px, 10vw, 84px)/0.95 var(--f-display); text-transform: uppercase; letter-spacing: 1px; color: var(--primary); text-shadow: 0 7px 0 var(--line); -webkit-text-stroke: 2px var(--line); animation: punch 0.55s var(--pop) both; }
.result-word.win { color: var(--success); }
.result-word.loss { color: var(--danger); }
@keyframes punch { 0% { transform: scale(0.4); opacity: 0; } 60% { transform: scale(1.12); opacity: 1; } 100% { transform: scale(1); } }
.scoreline { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: var(--s3); margin: var(--s4) 0 var(--s2); }
.scoreline .side { display: flex; flex-direction: column; align-items: center; gap: 6px; font: 900 15px/1.1 var(--f-display); text-transform: uppercase; }
.scoreline .sc { font: 900 46px var(--f-display); font-variant-numeric: tabular-nums; background: var(--bg); border: var(--bw) solid var(--line); border-radius: var(--r); padding: 2px var(--s4); }
.scorers { font-size: 13px; color: var(--text2); font-weight: 700; min-height: 1em; }
.rating-hero { display: inline-flex; flex-direction: column; align-items: center; margin: var(--s4) 0 var(--s2); }
.rating-hero .lab { font: 900 12px var(--f-display); letter-spacing: 1.5px; color: var(--text2); text-transform: uppercase; }
.rating-hero .num { font: 900 64px/1 var(--f-display); color: #fff; text-shadow: 0 5px 0 var(--line); }
.rating-hero .num.hi { color: var(--success); } .rating-hero .num.lo { color: var(--danger); }
.key-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s2); margin: var(--s3) 0; }
.reward { display: inline-flex; align-items: center; gap: var(--s2); font: 900 17px var(--f-display); text-transform: uppercase; background: var(--primary); color: var(--primary-ink); border: var(--bw) solid var(--line); border-radius: var(--r-pill); padding: 8px 18px; box-shadow: 0 4px 0 var(--line); animation: rewardIn 0.5s 0.5s var(--pop) both; }
.reward.plain { background: var(--panel3); color: var(--text2); }
@keyframes rewardIn { from { opacity: 0; transform: scale(0.5) rotate(-6deg); } }
details.more { margin-top: var(--s3); text-align: left; }
/* the match report: the match on the left, you on the right, the reward below; it fits
   the window without scrolling (only an opened "More stats" may scroll) */
.result.report { width: min(880px, 96vw); }
.report .result-word { font-size: clamp(30px, min(9vh, 12vw), 76px); white-space: nowrap; }
.report .scoreline .sc { white-space: nowrap; }
/* the scorers keep to two lines here; the full list is under More stats */
.report .scorers { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.report .more { margin-top: var(--s2); text-align: left; }
.r-cols { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: var(--s3); align-items: stretch; margin-top: var(--s3); }
.r-match, .r-you { background: rgba(7, 11, 29, 0.35); border: 2px solid rgba(7, 11, 29, 0.6); border-radius: var(--r); padding: var(--s2) var(--s3); display: flex; flex-direction: column; justify-content: center; min-width: 0; }
.r-match .scoreline { margin: var(--s1) 0 var(--s2); }
.r-you .rating-hero { margin: 0 auto; }
.r-you .key-stats { margin: var(--s2) 0 0; }
.r-reward { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: var(--s2) var(--s3); margin-top: var(--s3); }
.r-reward:empty { display: none; }
.r-reward .rw-row { margin: 0; }
.report .actions { margin-top: var(--s2); }
@media (max-width: 620px) {
  .r-cols { grid-template-columns: minmax(0, 1fr); }
  .report .scoreline .side { font-size: 12px; }
  .report .scoreline .sc { font-size: 30px; padding: 2px var(--s3); }
}
@media (max-height: 560px) {
  .report .result-word { font-size: clamp(32px, 9vh, 48px); }
  .r-cols { margin-top: var(--s2); }
  .report .scoreline .crest { width: 36px; height: 36px; }
  .report .scoreline .sc { font-size: 30px; }
  .report .scoreline .side { font-size: 12px; }
  .report .scorers { font-size: 11px; }
  .report .rating-hero .num { font-size: 38px; }
  .report .mini { padding: 4px; }
  .report .mini b { font-size: 16px; }
  .report .reward { font-size: 14px; padding: 5px 14px; }
  .report .btn.lg, .report .btn.rw { min-height: 42px; font-size: 15px; }
  .report .actions .btn { min-height: 42px; }
  .r-reward { margin-top: var(--s2); }
  .report.panel { padding: var(--s2) var(--s4) var(--s3); }
  .report .r-match, .report .r-you { padding: 6px var(--s2); }
  .report .rating-hero .lab { font-size: 10px; }
}
@media (max-height: 380px) {
  .report .r-title { display: none; }
  .report .result-word { font-size: 30px; }
  .report .scoreline { margin: 0 0 4px; }
  .report .scoreline .crest { width: 30px; height: 30px; }
  .report .scoreline .sc { font-size: 26px; }
  .report .scorers { -webkit-line-clamp: 1; }
  .report .rating-hero .num { font-size: 32px; }
  .report .key-stats { gap: 6px; margin-top: 4px; }
  .report .btn.lg, .report .btn.rw, .report .actions .btn { min-height: 38px; font-size: 14px; }
  .report .reward { font-size: 13px; padding: 4px 12px; }
}
details.more summary { cursor: pointer; font: 900 13px var(--f-display); letter-spacing: 1px; text-transform: uppercase; color: var(--text2); list-style: none; text-align: center; padding: var(--s2); border-radius: var(--r-sm); }
details.more summary::-webkit-details-marker { display: none; }
details.more summary:hover { color: #fff; background: rgba(255, 255, 255, 0.06); }
.why .plus { color: var(--success); } .why .minus { color: var(--danger); }
.stars { font-size: 40px; letter-spacing: 4px; color: var(--primary); text-shadow: 0 4px 0 var(--line); line-height: 1.1; }
.stars i { font-style: normal; display: inline-block; animation: punch 0.45s var(--pop) both; }
.stars i.off { color: var(--panel3); }

/* ------------------------------------------------------------- style previews */
.previews { display: grid; grid-template-columns: 1fr 1fr; gap: var(--s4); }
.preview { cursor: pointer; padding: var(--s3); }
.preview img { width: 100%; display: block; border-radius: var(--r-sm); border: 2px solid var(--line); }
.preview h3 { margin: var(--s3) 0 4px; font: 900 18px var(--f-display); text-transform: uppercase; }

/* ------------------------------------------------------------- how to play */
.keys { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: var(--s2); }
.key { display: flex; align-items: center; gap: var(--s3); background: var(--bg); border: 2px solid var(--line); border-radius: var(--r); padding: var(--s2) var(--s3); font-weight: 700; font-size: 14px; }
.kc { display: inline-flex; align-items: center; justify-content: center; min-width: 40px; height: 36px; padding: 0 8px; border-radius: 8px; background: #fff; color: var(--bg); font: 900 13px var(--f-display); text-transform: uppercase; border: 2px solid var(--line); box-shadow: 0 3px 0 var(--line); white-space: nowrap; flex-shrink: 0; }
.key > span:last-child { min-width: 0; }
.tips { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: var(--s2); }
.tip { background: var(--bg); border: 2px solid var(--line); border-radius: var(--r); padding: var(--s3); font-size: 14px; font-weight: 700; color: var(--text2); }
.tip b { display: block; color: #fff; font: 900 14px var(--f-display); text-transform: uppercase; margin-bottom: 4px; }

/* ------------------------------------------------------------- click / tap to play */
.go-card { text-align: center; }
.go-big { font: 900 clamp(34px, 6vw, 56px)/1 var(--f-display); text-transform: uppercase; color: var(--primary); text-shadow: 0 5px 0 var(--line); animation: goPulse 1.1s ease-in-out infinite; margin: var(--s2) 0 var(--s4); }
@keyframes goPulse { 50% { transform: scale(1.06); } }
.go-sub { color: var(--text2); font-weight: 700; font-size: 14px; }

/* ------------------------------------------------------------- HUD */
.hud { position: absolute; inset: 0; pointer-events: none; font-family: var(--f-body); }
.hud-top { position: absolute; top: calc(12px + env(safe-area-inset-top, 0px)); left: 50%; transform: translateX(-50%); display: flex; align-items: stretch; border: var(--bw) solid var(--line); border-radius: var(--r); overflow: hidden; box-shadow: 0 4px 0 var(--line); font: 900 16px/1 var(--f-display); text-transform: uppercase; }
.hud-team { display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: rgba(14, 20, 48, 0.88); color: #fff; letter-spacing: 0.8px; }
.hud-team::before { content: ""; width: 12px; height: 12px; border-radius: 3px; background: var(--kit, #888); border: 2px solid #fff; }
.hud-team:last-child { flex-direction: row-reverse; }
.hud-score { padding: 8px 14px; background: var(--primary); color: var(--primary-ink); font-size: 21px; font-variant-numeric: tabular-nums; border-left: var(--bw) solid var(--line); border-right: var(--bw) solid var(--line); display: flex; align-items: center; }
.hud-score.bump { animation: punch 0.45s var(--pop); }
.hud-clocks { position: absolute; top: calc(58px + env(safe-area-inset-top, 0px)); left: 50%; transform: translateX(-50%); display: flex; gap: 6px; }
.hud-clock { font: 900 14px var(--f-display); font-variant-numeric: tabular-nums; color: #fff; background: rgba(14, 20, 48, 0.88); border: 2px solid var(--line); border-radius: var(--r-pill); padding: 3px 11px; }
.hud-shot { font: 900 14px var(--f-display); font-variant-numeric: tabular-nums; color: #fff; background: var(--danger-lo); border: 2px solid var(--line); border-radius: var(--r-sm); padding: 3px 8px; min-width: 34px; text-align: center; }
.hud-shot.low { background: var(--danger); animation: lowPulse 0.5s ease-in-out infinite; }
.hud-period { font: 900 14px var(--f-display); color: var(--primary-ink); background: var(--primary); border: 2px solid var(--line); border-radius: var(--r-sm); padding: 3px 8px; }
/* the team in the bonus: its opponent shoots free throws on every foul */
.hud-team.bonus { box-shadow: inset 0 3px 0 var(--danger); }
.hud-team.bonus.poss { box-shadow: inset 0 3px 0 var(--danger), inset 0 -4px 0 var(--primary); }
.hud-radar.full { width: 100px; height: 174px; }
.hud-team.poss { box-shadow: inset 0 -4px 0 var(--primary); }
.hud-team.poss::after { content: ""; width: 0; height: 0; border-top: 6px solid transparent; border-bottom: 6px solid transparent; border-left: 9px solid var(--primary); }
.hud-team:last-child.poss::after { border-left: none; border-right: 9px solid var(--primary); }
.hud-prow { display: flex; align-items: baseline; gap: 6px; }
.hud-line { font: 800 11px var(--f-body); color: var(--text2); margin-top: 2px; white-space: nowrap; }
.hud-meter { position: absolute; left: calc(50% + 40px); top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; align-items: center; gap: 6px; transition: opacity 0.2s; }
.hud-meter.idle { opacity: 0.32; }
.hm-bar { position: relative; width: 16px; height: 128px; border: var(--bw) solid var(--line); border-radius: var(--r-pill); background: rgba(14, 20, 48, 0.72); overflow: hidden; box-shadow: 0 3px 0 var(--line); }
.hm-bar i { position: absolute; left: 0; right: 0; display: block; }
.hm-band { background: rgba(51, 211, 108, 0.55); box-shadow: inset 0 2px 0 #fff, inset 0 -2px 0 #fff; }
.hm-perfect { background: rgba(182, 255, 208, 0.75); }
.hm-fill { bottom: 0; background: linear-gradient(0deg, var(--primary), var(--warn)); }
.hm-tick { height: 3px; background: #fff; box-shadow: 0 0 0 1px var(--line); }
.hm-label { font: 900 12px var(--f-display); letter-spacing: 1px; color: #fff; background: rgba(14, 20, 48, 0.88); border: 2px solid var(--line); border-radius: var(--r-pill); padding: 3px 9px; white-space: nowrap; }
.hud-meter[data-tier="perfect"] .hm-label { background: var(--success); color: #052812; animation: punch 0.35s var(--pop); }
.hud-meter[data-tier="good"] .hm-label { background: var(--accent); color: #032430; }
.hud-meter[data-tier="early"] .hm-label, .hud-meter[data-tier="late"] .hm-label { background: var(--danger); }
.hud-clear { position: absolute; left: 50%; top: calc(50% + 90px); transform: translateX(-50%); font: 900 13px var(--f-display); letter-spacing: 1px; color: var(--primary-ink); background: var(--primary); border: var(--bw) solid var(--line); border-radius: var(--r-pill); box-shadow: 0 4px 0 var(--line); padding: 5px 14px; white-space: nowrap; animation: badgePulse 1.2s ease-in-out infinite; }
.hud-phase { position: absolute; top: calc(88px + env(safe-area-inset-top, 0px)); left: 50%; transform: translateX(-50%); font: 900 10px var(--f-display); letter-spacing: 1.4px; color: #fff; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8); opacity: 0.8; }
.hud-player { position: absolute; top: calc(12px + env(safe-area-inset-top, 0px)); left: calc(12px + env(safe-area-inset-left, 0px)); background: rgba(14, 20, 48, 0.88); color: #fff; border: var(--bw) solid var(--line); border-radius: var(--r); box-shadow: 0 4px 0 var(--line); padding: 8px 12px; min-width: 140px; }
.hud-rating { font: 900 28px/1 var(--f-display); color: var(--primary); font-variant-numeric: tabular-nums; }
.hud-rating-label { font: 900 9px var(--f-display); letter-spacing: 1.4px; color: var(--text2); }
.hud-stamina { height: 8px; background: rgba(0, 0, 0, 0.45); border-radius: var(--r-pill); margin-top: 6px; overflow: hidden; }
.hud-stamina-fill { height: 100%; background: var(--success); border-radius: var(--r-pill); transition: width 0.3s; }
.hud-stamina-fill.low { background: var(--danger); animation: lowPulse 0.8s ease-in-out infinite; }
@keyframes lowPulse { 50% { opacity: 0.5; } }
.hud-name { font: 800 11px var(--f-body); margin-top: 5px; color: var(--text2); }
.hud-cross { position: absolute; left: 50%; top: 50%; width: 16px; height: 16px; transform: translate(-50%, -50%); }
.hud-cross::before, .hud-cross::after { content: ""; position: absolute; background: #fff; box-shadow: 0 0 0 1.5px rgba(7, 11, 29, 0.85); border-radius: 1px; }
.hud-cross::before { left: 7px; top: 0; width: 2px; height: 16px; }
.hud-cross::after { top: 7px; left: 0; height: 2px; width: 16px; }
.hud-power { position: absolute; left: 50%; top: calc(50% + 24px); transform: translateX(-50%); width: 130px; height: 12px; border: 2px solid var(--line); border-radius: var(--r-pill); background: rgba(14, 20, 48, 0.7); overflow: hidden; }
.hud-power-fill { height: 100%; background: linear-gradient(90deg, var(--primary), var(--warn), var(--danger)); }
.hud-hint { position: absolute; left: 50%; bottom: calc(18px + env(safe-area-inset-bottom, 0px)); transform: translateX(-50%); font: 800 13px var(--f-body); color: #fff; background: rgba(14, 20, 48, 0.85); border: 2px solid var(--line); border-radius: var(--r-pill); padding: 6px 14px; white-space: nowrap; }
.hud-hint:empty { display: none; }
.hud-notes { position: absolute; top: calc(106px + env(safe-area-inset-top, 0px)); left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 6px; }
.hud-note { font: 900 15px var(--f-display); letter-spacing: 1px; text-transform: uppercase; padding: 6px 14px; color: #fff; background: rgba(14, 20, 48, 0.92); border: var(--bw) solid var(--line); border-radius: var(--r-pill); box-shadow: 0 4px 0 var(--line); animation: punch 0.35s var(--pop); transition: opacity 0.35s, transform 0.35s; }
.hud-note.good { background: var(--success); color: #052812; }
.hud-note.bad { background: var(--danger); }
.hud-note.out { opacity: 0; transform: translateY(-10px) scale(0.9); }
.hud-arrow { position: absolute; width: 0; height: 0; border-top: 12px solid transparent; border-bottom: 12px solid transparent; border-left: 22px solid var(--primary); filter: drop-shadow(0 0 1px var(--line)) drop-shadow(0 2px 0 var(--line)); }
.hud-radar { position: absolute; right: calc(12px + env(safe-area-inset-right, 0px)); bottom: calc(12px + env(safe-area-inset-bottom, 0px)); width: 160px; height: 141px; border: var(--bw) solid var(--line); border-radius: var(--r); box-shadow: 0 4px 0 var(--line); }
.hud-count { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; background: radial-gradient(ellipse at center, rgba(7, 11, 29, 0.55), rgba(7, 11, 29, 0) 65%); pointer-events: none; z-index: 7; }
.hud-count.hidden { display: none; }
.hud.counting .hud-hint, .hud.counting .hud-banner { display: none; }
.hud-count .c-title { font: 900 clamp(26px, 5vw, 46px)/1 var(--f-display); letter-spacing: 2px; text-transform: uppercase; color: var(--primary); text-shadow: 0 5px 0 var(--line); -webkit-text-stroke: 2px var(--line); animation: countTitle 0.5s var(--pop) both; }
@keyframes countTitle { 0% { transform: scale(0.4); opacity: 0; } 60% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(1); } }
.hud-count .c-num { font: 900 clamp(84px, 16vw, 150px)/1 var(--f-display); color: #fff; text-shadow: 0 9px 0 var(--line); -webkit-text-stroke: 4px var(--line); }
.hud-count .c-num.go { color: var(--success); font-size: clamp(64px, 12vw, 120px); }
.hud-count .c-num.pop { animation: countPop 0.8s var(--pop) both; }
@keyframes countPop { 0% { transform: scale(0.35); opacity: 0; } 25% { transform: scale(1.15); opacity: 1; } 45% { transform: scale(1); } 85% { opacity: 1; } 100% { transform: scale(0.9); opacity: 0.2; } }
.hud-banner { position: absolute; top: 32%; left: 50%; transform: translate(-50%, -50%); text-align: center; animation: bannerIn 0.5s var(--pop); }
.hud-banner .b-main { font: 900 clamp(48px, 9vw, 96px)/0.95 var(--f-display); letter-spacing: 2px; text-transform: uppercase; color: #fff; text-shadow: 0 7px 0 var(--line); -webkit-text-stroke: 3px var(--line); }
.hud-banner.mine .b-main { color: var(--primary); }
.hud-banner .b-sub { display: inline-block; font: 800 15px var(--f-body); margin-top: 10px; color: #fff; background: rgba(14, 20, 48, 0.88); border: 2px solid var(--line); border-radius: var(--r-pill); padding: 6px 16px; }
@keyframes bannerIn { 0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; } 60% { transform: translate(-50%, -50%) scale(1.12); opacity: 1; } 100% { transform: translate(-50%, -50%) scale(1); } }
/* possession: the screen edge pulses green while the player has the ball */
.hud-poss { position: absolute; inset: 0; opacity: 0; transition: opacity 0.18s ease-out; box-shadow: inset 0 0 0 5px rgba(51, 211, 108, 0.95); }
.hud-poss::before { content: ""; position: absolute; inset: 0; box-shadow: inset 0 0 60px 24px rgba(51, 211, 108, 0.6); animation: possPulse 1s ease-in-out infinite alternate; }
.hud-poss.on { opacity: 1; }
.hud-poss-label { position: absolute; left: calc(12px + env(safe-area-inset-left, 0px)); bottom: calc(14px + env(safe-area-inset-bottom, 0px)); transform-origin: left center; font: 900 13px var(--f-display); letter-spacing: 1.5px; color: #052812; background: var(--success); border: var(--bw) solid var(--line); border-radius: var(--r-pill); box-shadow: 0 4px 0 var(--line); padding: 6px 16px; white-space: nowrap; animation: possLabel 1s ease-in-out infinite alternate; }
.hud-poss.on .hud-poss-label { animation: possIn 0.25s var(--pop), possLabel 1s ease-in-out 0.25s infinite alternate; }
@keyframes possPulse { from { opacity: 0.3; } to { opacity: 1; } }
@keyframes possLabel { from { transform: scale(1); } to { transform: scale(1.06); } }
@keyframes possIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.hud-fade { position: absolute; inset: 0; background: #fff; opacity: 0; }
.hud-fade.on { animation: fadeFlash 0.4s ease-out; }
@keyframes fadeFlash { 0% { opacity: 0.9; } 100% { opacity: 0; } }

/* goal replay: everything else in the HUD steps aside for cinema bars */
.hud-replay { display: none; position: absolute; inset: 0; pointer-events: none; color: #fff; }
.hud.replaying .hud-replay { display: block; }
.hud.replaying > :not(.hud-replay):not(.hud-fade) { display: none !important; }
.rp-bar { position: absolute; left: 0; right: 0; height: 8.5vh; background: #050816; }
.rp-top { top: 0; } .rp-bot { bottom: 0; }
.rp-tag { position: absolute; top: calc(8.5vh + 12px); left: calc(16px + env(safe-area-inset-left, 0px)); font: 900 15px var(--f-display); letter-spacing: 4px; background: var(--danger); border: var(--bw) solid var(--line); border-radius: var(--r-pill); box-shadow: 0 4px 0 var(--line); padding: 6px 14px 6px 12px; display: flex; align-items: center; gap: 8px; }
.rp-tag i { width: 10px; height: 10px; border-radius: 50%; background: #fff; animation: rpDot 1s steps(2) infinite; }
@keyframes rpDot { 50% { opacity: 0.2; } }
.rp-info { position: absolute; bottom: calc(8.5vh + 16px); left: calc(16px + env(safe-area-inset-left, 0px)); font: 900 16px var(--f-display); text-transform: uppercase; text-shadow: 0 2px 0 var(--line); max-width: 58vw; }
.rp-prog { position: absolute; left: 0; right: 0; bottom: 8.5vh; height: 4px; background: rgba(255, 255, 255, 0.15); }
.rp-prog i { display: block; height: 100%; width: 0; background: var(--primary); }
.rp-skip { --b: var(--primary); --b-hi: var(--primary-hi); position: absolute; bottom: calc(8.5vh + 12px); right: calc(16px + env(safe-area-inset-right, 0px)); pointer-events: auto; min-height: 48px; padding: 0 var(--s5); font: 900 15px var(--f-display); letter-spacing: 0.8px; text-transform: uppercase; color: var(--primary-ink); background: linear-gradient(180deg, var(--b-hi), var(--b)); border: var(--bw) solid var(--line); border-radius: var(--r); box-shadow: 0 5px 0 var(--line), var(--hi); cursor: pointer; touch-action: manipulation; transition: transform var(--t-fast) var(--pop), box-shadow var(--t-fast); }
.rp-skip:hover { transform: translateY(-2px) scale(1.04); }
.rp-skip:active { transform: translateY(5px); box-shadow: 0 0 0 var(--line), var(--hi); }
.rp-skip b { font: 800 11px var(--f-body); opacity: 0.65; margin-left: 6px; text-transform: none; letter-spacing: 0; }
@media (max-height: 520px) { .rp-bar { height: 6vh; } .rp-tag { top: calc(6vh + 8px); font-size: 13px; } .rp-info { bottom: calc(6vh + 12px); font-size: 13px; } .rp-prog { bottom: 6vh; } .rp-skip { bottom: calc(6vh + 8px); } }
@media (max-width: 600px) { .rp-info { font-size: 12px; max-width: 45vw; } .rp-skip { font-size: 13px; padding: 0 var(--s3); } .rp-skip b { display: none; } }

/* ------------------------------------------------------------- touch controls */
.touch { position: absolute; inset: 0; pointer-events: auto; touch-action: none; }
.tc-zone { position: absolute; inset: 0; }
.tc-stick { position: absolute; width: 0; height: 0; pointer-events: none; }
.tc-stick::before { content: ""; position: absolute; width: var(--stick, 124px); height: var(--stick, 124px); left: calc(var(--stick, 124px) / -2); top: calc(var(--stick, 124px) / -2); border-radius: 50%; border: var(--bw) solid rgba(255, 255, 255, 0.55); background: rgba(14, 20, 48, 0.3); }
.tc-knob { position: absolute; width: 58px; height: 58px; left: -29px; top: -29px; border-radius: 50%; background: #fff; border: var(--bw) solid var(--line); box-shadow: 0 4px 0 var(--line); }
.tc-stick.idle { left: calc(96px + env(safe-area-inset-left, 0px)); top: calc(100% - 104px - env(safe-area-inset-bottom, 0px)); opacity: 0.5; }
.tc-stick.sprint .tc-knob { background: var(--success); }
.tc-btn { --b: var(--secondary); --b-hi: var(--secondary-hi); position: absolute; border-radius: 50%; border: var(--bw) solid var(--line); background: radial-gradient(circle at 50% 30%, var(--b-hi), var(--b)); color: #fff; font: 900 calc(var(--s, 60px) * 0.17)/1 var(--f-display); letter-spacing: 0.3px; display: flex; align-items: center; justify-content: center; padding: 0 calc(var(--s, 60px) * 0.16); text-align: center; overflow: hidden; touch-action: none; box-shadow: 0 5px 0 var(--line), var(--hi); transition: transform 0.06s, box-shadow 0.06s, opacity 0.15s; }
.tc-btn.down { transform: translateY(5px) scale(0.95); box-shadow: 0 0 0 var(--line), var(--hi); filter: brightness(1.15); }
.tc-btn.off { opacity: 0; pointer-events: none; }
.tc-btn.cool { opacity: 0.45; }
.tc-a { --b: var(--primary); --b-hi: var(--primary-hi); color: var(--primary-ink); --s: clamp(70px, 22vh, 96px); width: var(--s); height: var(--s); right: calc(22px + env(safe-area-inset-right, 0px)); bottom: calc(26px + env(safe-area-inset-bottom, 0px)); }
.tc-b { --b: var(--accent-lo); --b-hi: var(--accent); color: #032430; --s: clamp(56px, 16vh, 74px); width: var(--s); height: var(--s); right: calc(22px + clamp(70px, 22vh, 96px) + 14px + env(safe-area-inset-right, 0px)); bottom: calc(20px + env(safe-area-inset-bottom, 0px)); }
.tc-b, .tc-c { font-size: calc(var(--s) * 0.2); }
.tc-c { --b: var(--success-lo); --b-hi: var(--success); color: #052812; --s: clamp(52px, 15vh, 66px); width: var(--s); height: var(--s); right: calc(22px + env(safe-area-inset-right, 0px) + clamp(8px, 2vh, 14px)); bottom: calc(26px + clamp(70px, 22vh, 96px) + 14px + env(safe-area-inset-bottom, 0px)); }
/* short landscape screens: the third button joins the bottom row, clear of the radar */
@media (max-height: 340px) {
  .tc-c { right: calc(22px + clamp(70px, 22vh, 96px) + 14px + clamp(56px, 16vh, 74px) + 12px + env(safe-area-inset-right, 0px)); bottom: calc(16px + env(safe-area-inset-bottom, 0px)); }
}
.tc-d { --b: var(--secondary); --b-hi: var(--secondary-hi); --s: clamp(46px, 13vh, 58px); width: var(--s); height: var(--s); font-size: calc(var(--s) * 0.2); right: calc(22px + clamp(70px, 22vh, 96px) + 14px + env(safe-area-inset-right, 0px) + clamp(6px, 2vh, 12px)); bottom: calc(26px + clamp(56px, 16vh, 74px) + 14px + env(safe-area-inset-bottom, 0px)); }
.tc-btn[data-type="steal"], .tc-btn[data-type="stance"] { --b: var(--danger-lo); --b-hi: var(--danger); color: #fff; }
.tc-pause { position: absolute; left: calc(10px + env(safe-area-inset-left, 0px)); top: calc(10px + env(safe-area-inset-top, 0px)); width: 46px; height: 46px; border-radius: var(--r); border: var(--bw) solid var(--line); background: rgba(14, 20, 48, 0.88); box-shadow: 0 4px 0 var(--line); display: flex; gap: 6px; align-items: center; justify-content: center; padding: 0; }
.tc-pause i { display: block; width: 5px; height: 17px; border-radius: 2px; background: #fff; }
.tc-pause:active { transform: translateY(4px); box-shadow: none; }
.tc-rotate { display: none; position: absolute; left: 50%; top: calc(100px + env(safe-area-inset-top, 0px)); transform: translateX(-50%); font: 800 12px var(--f-body); color: #fff; padding: 5px 12px; background: rgba(14, 20, 48, 0.88); border: 2px solid var(--line); border-radius: var(--r-pill); white-space: nowrap; pointer-events: none; }
@media (orientation: portrait) { .tc-rotate { display: block; } }

/* HUD with touch controls: pause top-left, compact player card, radar top-right,
   the bottom corners belong to the thumbs */
html[data-touch="1"] .hud-player { left: calc(66px + env(safe-area-inset-left, 0px)); top: calc(10px + env(safe-area-inset-top, 0px)); min-width: 0; padding: 5px 9px; }
html[data-touch="1"] .hud-rating { font-size: 20px; }
html[data-touch="1"] .hud-name { display: none; }
html[data-touch="1"] .hud-radar { top: calc(10px + env(safe-area-inset-top, 0px)); right: calc(10px + env(safe-area-inset-right, 0px)); bottom: auto; width: 96px; height: 85px; }
html[data-touch="1"] .hud-radar.full { width: 58px; height: 101px; }
html[data-touch="1"] .hud-line { display: none; }
html[data-touch="1"] .hud-meter { left: calc(50% + 30px); }
html[data-touch="1"] .hm-bar { height: 96px; }
html[data-touch="1"] .hud-hint { bottom: calc(10px + env(safe-area-inset-bottom, 0px)); font-size: 12px; max-width: 42vw; white-space: normal; text-align: center; }
html[data-touch="1"] .hud-poss-label { left: 50%; bottom: auto; top: calc(10px + env(safe-area-inset-top, 0px)); transform-origin: center; margin-left: -80px; font-size: 11px; letter-spacing: 1px; }
html[data-touch="1"] .hud-power { width: 96px; }

/* ------------------------------------------------------------- tutorial */
.coach { position: absolute; top: calc(12px + env(safe-area-inset-top, 0px)); left: 50%; transform: translateX(-50%); width: min(420px, 92vw); background: rgba(14, 20, 48, 0.94); color: #fff; border: var(--bw) solid var(--line); border-radius: var(--r); box-shadow: 0 5px 0 var(--line); padding: 8px 12px 12px; pointer-events: none; z-index: 5; overflow: hidden; }
.coach-main { display: flex; align-items: flex-start; gap: 8px; }
.coach-txt { flex: 1; min-width: 0; }
.coach-say { font: 900 19px/1.15 var(--f-display); text-transform: uppercase; color: var(--primary); }
.coach-say.pop { animation: punch 0.35s var(--pop); }
.coach-hint { font: 700 13px/1.2 var(--f-body); margin-top: 2px; color: var(--text2); }
.coach-hint.empty { display: none; }
.coach-skip { pointer-events: auto; font: 900 11px var(--f-display); letter-spacing: 0.6px; text-transform: uppercase; padding: 6px 10px; border: 2px solid rgba(255, 255, 255, 0.3); background: transparent; color: var(--text2); cursor: pointer; border-radius: var(--r-sm); touch-action: manipulation; white-space: nowrap; transition: background var(--t), color var(--t); }
.coach-skip:hover { background: rgba(255, 255, 255, 0.1); color: #fff; }
.coach-skip:active { transform: scale(0.95); }
.coach-foot { display: flex; align-items: center; gap: 8px; margin-top: 6px; }
.coach-dots { display: flex; gap: 4px; flex: 1; }
.coach-dots i { width: 9px; height: 9px; border-radius: 50%; background: rgba(255, 255, 255, 0.18); transition: background var(--t), transform var(--t) var(--pop); }
.coach-dots i.done { background: var(--success); }
.coach-dots i.now { background: var(--primary); animation: dotPulse 0.8s ease-in-out infinite alternate; }
.coach-stars { color: var(--primary); font: 900 13px var(--f-display); white-space: nowrap; }
.coach-bar { position: absolute; left: 0; right: 0; bottom: 0; height: 5px; background: rgba(255, 255, 255, 0.08); }
.coach-bar i { display: block; height: 100%; background: var(--primary); }
/* a step just done: the card flashes green */
.coach.ok { border-color: var(--success); }
.coach.ok .coach-say { color: var(--success); }
/* the screen after the tutorial: one question, one button */
.ready { text-align: center; width: min(560px, 94vw); }
.ready .go-big { margin: var(--s3) 0 var(--s2); }
.ready .ready-sub { color: var(--text2); font-weight: 800; font-size: 15px; line-height: 1.4; }
.ready .ready-done { display: inline-flex; gap: 8px; align-items: center; font: 900 13px var(--f-display); letter-spacing: 1px; text-transform: uppercase; color: var(--success); }
.ready .btn.xl { margin-top: var(--s5); min-width: min(360px, 80vw); justify-content: center; }
@keyframes dotPulse { from { transform: scale(0.85); } to { transform: scale(1.25); } }
/* the warm-up hides the match furniture; notes drop below the card */
.hud.tut .hud-top, .hud.tut .hud-clock, .hud.tut .hud-phase, .hud.tut .hud-player, .hud.tut .hud-hint, .hud.tut .hud-arrow { display: none; }
.tut-arrow { position: absolute; width: 0; height: 0; border-top: 16px solid transparent; border-bottom: 16px solid transparent; border-left: 30px solid var(--primary); filter: drop-shadow(0 0 1px var(--line)) drop-shadow(0 3px 0 var(--line)); transform: translate(-50%, -50%) rotate(var(--rot, 0rad)); animation: tutArrow 0.6s ease-in-out infinite alternate; pointer-events: none; z-index: 4; }
@keyframes tutArrow { from { opacity: 0.55; } to { opacity: 1; } }
.hud.tut .hud-notes { top: 104px; }
html[data-touch="1"] .coach { top: calc(6px + env(safe-area-inset-top, 0px)); width: min(340px, calc(100vw - 250px)); }

/* ------------------------------------------------------------- responsive */
@media (hover: none) {
  .btn:hover { transform: none; filter: none; box-shadow: 0 var(--depth) 0 var(--line), var(--hi); }
  .btn.ghost:hover { box-shadow: none; background: transparent; }
  .card.pick:hover { transform: none; background: var(--panel2); }
  .card.on:hover { background: var(--panel3); transform: translateY(-3px); }
}
@media (pointer: coarse) { #ui input.field { font-size: 16px; } }
@media (max-width: 900px) {
  .hub-main { grid-template-columns: minmax(0, 1fr); }
}
@media (max-width: 700px) {
  .panel { padding: var(--s4); border-radius: var(--r); }
  .h-title { font-size: 26px; }
  .grid2, .grid3, .previews { grid-template-columns: 1fr; }
  .hub { padding: var(--s3); }
  .topbar h1 { font-size: 21px; }
  .mini-stats { grid-template-columns: repeat(2, 1fr); }
  .attr { grid-template-columns: 92px 1fr 30px 38px; }
  .menu { background: linear-gradient(180deg, rgba(8, 12, 32, 0.6), rgba(8, 12, 32, 0.92)); }
  .menu-inner { padding: 5vh 6vw; width: 100%; }
  .vs { grid-template-columns: minmax(0, 1fr); }
  .btn.xl { padding: 0 var(--s4); font-size: 24px; }
  .btn.lg { padding: 0 var(--s4); }
  .fixture .side { font-size: 15px; }
  .vs-mid { text-align: center; }
  .scoreline .sc { font-size: 36px; }
}
/* short windows: the result screen tightens up so its buttons stay in view */
@media (max-height: 680px) {
  .result-word { font-size: 50px; }
  .scoreline { margin: var(--s2) 0 var(--s1); }
  .scoreline .sc { font-size: 34px; }
  .scoreline .crest { width: 44px; height: 44px; }
  .rating-hero { margin: var(--s2) 0 0; }
  .rating-hero .num { font-size: 44px; }
  .key-stats { margin: var(--s2) 0; }
  .mini b { font-size: 18px; }
  .result .actions { margin-top: var(--s3); }
}
/* short landscape phones: the main menu becomes two columns */
@media (max-height: 560px) and (orientation: landscape) {
  .menu-inner { flex-direction: row; flex-wrap: wrap; align-items: center; gap: var(--s3) var(--s5); padding: 3vh 4vw; width: 100%; }
  .menu-head { flex: 1 1 260px; }
  .menu-actions { flex: 1 1 320px; display: flex; flex-direction: column; gap: var(--s2); }
  .logo-ball { width: 52px; height: 52px; }
  .logo-text { font-size: clamp(32px, 11vh, 56px); }
  .tagline { font-size: 13px; margin-top: 0; }
  .btn.xl { min-height: 60px; font-size: 24px; }
  .menu-row .btn { font-size: 15px; }
  .menu-icons .btn { font-size: 11px; }
  .btn { min-height: 44px; }
  .menu { background: linear-gradient(90deg, rgba(8, 12, 32, 0.9), rgba(8, 12, 32, 0.6)); }
  .panel { padding: var(--s3) var(--s4); }
  .h-title { font-size: 22px; margin-bottom: var(--s3); }
  .result-word { font-size: 46px; }
  .rating-hero .num { font-size: 46px; }
  .hud-top { top: 6px; }
  .hud-team { padding: 5px 9px; font-size: 13px; }
  .hud-score { padding: 5px 10px; font-size: 17px; }
  .hud-clocks { top: 46px; } .hud-clock, .hud-shot, .hud-period { font-size: 11px; }
  .hud-phase { top: 73px; }
  .hud-notes { top: 88px; }
  .hud-note { font-size: 13px; }
  .coach { padding: 5px 9px 9px; }
  .coach-say { font-size: 15px; }
  .coach-hint { font-size: 11px; margin-top: 0; }
  .coach-foot { margin-top: 3px; }
  .coach-skip { font-size: 10px; padding: 4px 7px; }
  .hud.tut .hud-notes { top: 78px; }
}
/* narrow (portrait) touch screens: score and clock drop below the pause button,
   rating card and radar */
@media (max-width: 600px) {
  html[data-touch="1"] .hud-top { top: calc(62px + env(safe-area-inset-top, 0px)); }
  html[data-touch="1"] .hud-clocks { top: calc(108px + env(safe-area-inset-top, 0px)); }
  html[data-touch="1"] .hud-phase { top: calc(134px + env(safe-area-inset-top, 0px)); }
  html[data-touch="1"] .tc-rotate { top: calc(152px + env(safe-area-inset-top, 0px)); }
  html[data-touch="1"] .hud-notes { top: calc(184px + env(safe-area-inset-top, 0px)); }
  html[data-touch="1"] .coach { top: calc(8px + env(safe-area-inset-top, 0px)); width: calc(100vw - 120px); }
  html[data-touch="1"] .hud.tut .hud-notes { top: calc(96px + env(safe-area-inset-top, 0px)); }
}
@media (prefers-reduced-motion: reduce) {
  .screen > *, .btn.primary::after, .logo-ball, .go-big, .badge.pulse, .dot-new, .hud-poss::before, .hud-poss-label, .hud-poss.on .hud-poss-label, .coach-say.pop, .coach-dots i.now, .rp-tag i { animation: none !important; }
  .hud-poss::before { opacity: 0.8; }
}

/* ---------------------------------------------------------- ads (CrazyGames) */
/* rewarded ads: always opt-in, always labelled */
.btn.rw { --b: var(--success); --b-hi: #52e386; --b-ink: #052812; white-space: normal; }
.btn.rw .ad-chip { display: inline-flex; align-items: center; gap: 3px; font: 900 11px/1 var(--f-display); padding: 4px 6px; border-radius: 6px; background: #062812; color: #3fe07c; letter-spacing: 0.5px; }
.btn.rw.busy { filter: saturate(0.4); pointer-events: none; }
.rw-row { display: flex; justify-content: center; margin-top: var(--s3); }
.rw-done { display: inline-flex; align-items: center; gap: 6px; font: 900 14px var(--f-display); text-transform: uppercase; color: var(--success); }
.boost-on { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: var(--r-pill); background: rgba(51, 211, 108, 0.16); border: 2px solid var(--success); color: #9ff0bc; font: 900 13px var(--f-display); text-transform: uppercase; letter-spacing: 0.5px; }
/* the first-run tutorial: one click captures the mouse (the game is already running) */
.tut-click { position: absolute; left: 50%; top: 58%; transform: translate(-50%, -50%); pointer-events: none; text-align: center; color: #fff; font: 900 30px/1.1 var(--f-display); text-transform: uppercase; letter-spacing: 1px; text-shadow: 0 4px 0 var(--line), 0 0 24px rgba(0, 0, 0, 0.5); animation: tutClick 1.1s ease-in-out infinite alternate; z-index: 6; }
.drag-hint { position: absolute; left: 50%; top: calc(86px + env(safe-area-inset-top, 0px)); transform: translateX(-50%); font: 800 13px var(--f-body); color: #fff; background: rgba(14, 20, 48, 0.85); border: 2px solid var(--line); border-radius: var(--r-pill); padding: 5px 14px; white-space: nowrap; pointer-events: none; z-index: 6; }
.drag-hint[hidden] { display: none; }
/* with a coach card at the top the drag hint sits at the bottom instead */
#ui:has(.coach:not(.hidden)) .drag-hint { top: auto; bottom: calc(64px + env(safe-area-inset-bottom, 0px)); }
.hud.tut .hud-shot, .hud.tut .hud-period { display: none; }
/* on touch screens the "you have the ball" label sits at the top: under a coach card it goes */
html[data-touch="1"] .hud.tut .hud-poss-label, html[data-touch="1"] .hud.practice .hud-poss-label { display: none; }
.tut-click small { display: block; margin-top: 8px; font: 800 15px var(--f-body); text-transform: none; letter-spacing: 0; color: var(--text2); }
.tut-click[hidden] { display: none; }
@keyframes tutClick { from { opacity: 0.75; transform: translate(-50%, -50%) scale(0.97); } to { opacity: 1; transform: translate(-50%, -50%) scale(1.03); } }

/* ---------------------------------------------------------- scrollbars */
/* every scrolling panel uses the game's own scrollbar: a dark track and a rounded thumb */
#ui ::-webkit-scrollbar { width: 12px; height: 12px; }
#ui ::-webkit-scrollbar-track { background: rgba(7, 11, 29, 0.55); border-radius: var(--r-pill); }
#ui ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, var(--secondary-hi), var(--secondary)); border: 3px solid rgba(7, 11, 29, 0.85); border-radius: var(--r-pill); min-height: 40px; }
#ui ::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, var(--primary-hi), var(--primary)); }
#ui ::-webkit-scrollbar-corner, #ui ::-webkit-scrollbar-button { display: none; background: transparent; }
@supports (-moz-appearance: none) { #ui * { scrollbar-width: thin; scrollbar-color: var(--secondary-hi) rgba(7, 11, 29, 0.55); } }

/* ------------------------------------------------------------- Courtside additions */
table.box { width: 100%; border-collapse: collapse; margin-top: var(--s3); font: 800 13px var(--f-body); }
table.box th { font: 900 11px var(--f-display); letter-spacing: 1px; color: var(--text2); text-align: left; padding: 6px; border-bottom: 2px solid var(--line); }
table.box td { padding: 6px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-variant-numeric: tabular-nums; }
table.box tr.me td { color: var(--primary); }
.hud.practice .hud-top, .hud.practice .hud-player { display: none; }
.hud.practice .hud-notes { top: 128px; }
.hud.practice .hud-clocks { top: calc(118px + env(safe-area-inset-top, 0px)); }
.hud.practice .hud-phase { top: calc(146px + env(safe-area-inset-top, 0px)); }
.menu-row .btn small { display: inline; opacity: 0.8; }
`;var $d=0,Mh=1,Xd=2;var Sh=0,fa=1,qd=2,vr=3,bn=0,Je=1,Fi=2,_n=0,yr=1,wh=2,Eh=3,Th=4,Yd=5;var As=100,Kd=101,Zd=102,Jd=103,jd=104,Qd=200,tf=201,ef=202,nf=203,Ah=204,Rh=205,sf=206,rf=207,af=208,of=209,lf=210,cf=211,hf=212,uf=213,df=214,fo=0,po=1,mo=2,cr=3,go=4,xo=5,vo=6,yo=7,Ch=0,ff=1,pf=2,Qi=0,Ph=1,Ih=2,Lh=3,kh=4,Nh=5,Dh=6,Oh=7;var Uh=300,es=301,Rs=302,qo=303,Yo=304,pa=306,bo=1e3,mn=1001,_o=1002,Ne=1003,mf=1004;var ma=1005;var Ze=1006,Ko=1007;var is=1008;var Ei=1009,Fh=1010,Bh=1011,br=1012,Zo=1013,tn=1014,pi=1015,en=1016,Jo=1017,jo=1018,_r=1020,zh=35902,Hh=35899,Vh=1021,Gh=1022,mi=1023,gn=1026,ns=1027,Qo=1028,tl=1029,ss=1030,el=1031;var il=1033,ga=33776,xa=33777,va=33778,ya=33779,nl=35840,sl=35841,rl=35842,al=35843,ol=36196,ll=37492,cl=37496,hl=37488,ul=37489,ba=37490,dl=37491,fl=37808,pl=37809,ml=37810,gl=37811,xl=37812,vl=37813,yl=37814,bl=37815,_l=37816,Ml=37817,Sl=37818,wl=37819,El=37820,Tl=37821,Al=36492,Rl=36494,Cl=36495,Pl=36283,Il=36284,_a=36285,Ll=36286;var Kr=2300,Mo=2301,ho=2302,mh=2303,gh=2400,xh=2401,vh=2402;var gf=3200;var Wh=0,xf=1,Dn="",Ri="srgb",vs="srgb-linear",Zr="linear",de="srgb";var uo=7680;var vf=519,yf=512,bf=513,_f=514,kl=515,Mf=516,Sf=517,Nl=518,wf=519,Ef=35044,$h=35048;var Xh="300 es",ji=2e3,hr=2001;function i0(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function n0(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Jr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Tf(){let s=Jr("canvas");return s.style.display="block",s}var Md={},ur=null;function qh(...s){let t="THREE."+s.shift();ur?ur("log",t,...s):console.log(t,...s)}function Af(s){let t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Ft(...s){s=Af(s);let t="THREE."+s.shift();if(ur)ur("warn",t,...s);else{let e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function Bt(...s){s=Af(s);let t="THREE."+s.shift();if(ur)ur("error",t,...s);else{let e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function xs(...s){let t=s.join(" ");t in Md||(Md[t]=!0,Ft(...s))}function Rf(s,t,e){return new Promise(function(i,n){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:n();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}var Cf={[fo]:po,[mo]:vo,[go]:yo,[cr]:xo,[po]:fo,[vo]:mo,[yo]:go,[xo]:cr},xn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let n=i[t];if(n!==void 0){let r=n.indexOf(e);r!==-1&&n.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let n=i.slice(0);for(let r=0,a=n.length;r<a;r++)n[r].call(this,t);t.target=null}}},ni=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Xc=Math.PI/180,So=180/Math.PI;function Ma(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ni[s&255]+ni[s>>8&255]+ni[s>>16&255]+ni[s>>24&255]+"-"+ni[t&255]+ni[t>>8&255]+"-"+ni[t>>16&15|64]+ni[t>>24&255]+"-"+ni[e&63|128]+ni[e>>8&255]+"-"+ni[e>>16&255]+ni[e>>24&255]+ni[i&255]+ni[i>>8&255]+ni[i>>16&255]+ni[i>>24&255]).toLowerCase()}function ae(s,t,e){return Math.max(t,Math.min(e,s))}function s0(s,t){return(s%t+t)%t}function qc(s,t,e){return(1-e)*s+e*t}function Vr(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Mi(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var jh=class jh{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6],this.y=n[1]*e+n[4]*i+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ae(this.x,t.x,e.x),this.y=ae(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ae(this.x,t,e),this.y=ae(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ae(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(ae(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),n=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*n+t.x,this.y=r*n+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};jh.prototype.isVector2=!0;var qt=jh,Ge=class{constructor(t=0,e=0,i=0,n=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=n}static slerpFlat(t,e,i,n,r,a,o){let l=i[n+0],c=i[n+1],h=i[n+2],d=i[n+3],u=r[a+0],f=r[a+1],g=r[a+2],x=r[a+3];if(d!==x||l!==u||c!==f||h!==g){let m=l*u+c*f+h*g+d*x;m<0&&(u=-u,f=-f,g=-g,x=-x,m=-m);let p=1-o;if(m<.9995){let v=Math.acos(m),E=Math.sin(v);p=Math.sin(p*v)/E,o=Math.sin(o*v)/E,l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+x*o}else{l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+x*o;let v=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=v,c*=v,h*=v,d*=v}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,n,r,a){let o=i[n],l=i[n+1],c=i[n+2],h=i[n+3],d=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+h*d+l*f-c*u,t[e+1]=l*g+h*u+c*d-o*f,t[e+2]=c*g+h*f+o*u-l*d,t[e+3]=h*g-o*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,n){return this._x=t,this._y=e,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,n=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(n/2),d=o(r/2),u=l(i/2),f=l(n/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:Ft("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,n=Math.sin(i);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],n=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=i+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-n)*f}else if(i>o&&i>d){let f=2*Math.sqrt(1+i-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(n+a)/f,this._z=(r+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-i-d);this._w=(r-c)/f,this._x=(n+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-i-o);this._w=(a-n)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ae(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let n=Math.min(1,e/i);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,n=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+n*c-r*l,this._y=n*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-n*o,this._w=a*h-i*o-n*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,n=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,n=-n,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(n*Math.sin(t),n*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Qh=class Qh{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Sd.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Sd.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*n,this.y=r[1]*e+r[4]*i+r[7]*n,this.z=r[2]*e+r[5]*i+r[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,n=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*n+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*n+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*n+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,n=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*n-o*i),h=2*(o*e-r*n),d=2*(r*i-a*e);return this.x=e+l*c+a*d-o*h,this.y=i+l*h+o*c-r*d,this.z=n+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*n,this.y=r[1]*e+r[5]*i+r[9]*n,this.z=r[2]*e+r[6]*i+r[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ae(this.x,t.x,e.x),this.y=ae(this.y,t.y,e.y),this.z=ae(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ae(this.x,t,e),this.y=ae(this.y,t,e),this.z=ae(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ae(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,n=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=n*l-r*o,this.y=r*a-i*l,this.z=i*o-n*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Yc.copy(this).projectOnVector(t),this.sub(Yc)}reflect(t){return this.sub(Yc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(ae(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return e*e+i*i+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let n=Math.sin(e)*t;return this.x=n*Math.sin(i),this.y=Math.cos(e)*t,this.z=n*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Qh.prototype.isVector3=!0;var k=Qh,Yc=new k,Sd=new Ge,tu=class tu{constructor(t,e,i,n,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,a,o,l,c)}set(t,e,i,n,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=n,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,n=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],f=i[5],g=i[8],x=n[0],m=n[3],p=n[6],v=n[1],E=n[4],y=n[7],S=n[2],M=n[5],R=n[8];return r[0]=a*x+o*v+l*S,r[3]=a*m+o*E+l*M,r[6]=a*p+o*y+l*R,r[1]=c*x+h*v+d*S,r[4]=c*m+h*E+d*M,r[7]=c*p+h*y+d*R,r[2]=u*x+f*v+g*S,r[5]=u*m+f*E+g*M,r[8]=u*p+f*y+g*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+n*r*c-n*a*l}invert(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,g=e*d+i*u+n*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=d*x,t[1]=(n*c-h*i)*x,t[2]=(o*i-n*a)*x,t[3]=u*x,t[4]=(h*e-n*l)*x,t[5]=(n*r-o*e)*x,t[6]=f*x,t[7]=(i*l-c*e)*x,t[8]=(a*e-i*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,n,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-n*c,n*l,-n*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return xs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Kc.makeScale(t,e)),this}rotate(t){return xs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Kc.makeRotation(-t)),this}translate(t,e){return xs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Kc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let n=0;n<9;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};tu.prototype.isMatrix3=!0;var Ht=tu,Kc=new Ht,wd=new Ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ed=new Ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function r0(){let s={enabled:!0,workingColorSpace:vs,spaces:{},convert:function(n,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===de&&(n.r=Nn(n.r),n.g=Nn(n.g),n.b=Nn(n.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(n.applyMatrix3(this.spaces[r].toXYZ),n.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===de&&(n.r=lr(n.r),n.g=lr(n.g),n.b=lr(n.b))),n},workingToColorSpace:function(n,r){return this.convert(n,this.workingColorSpace,r)},colorSpaceToWorking:function(n,r){return this.convert(n,r,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Dn?Zr:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,r=this.workingColorSpace){return n.fromArray(this.spaces[r].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,r,a){return n.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,r){return xs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(n,r)},toWorkingColorSpace:function(n,r){return xs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(n,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return s.define({[vs]:{primaries:t,whitePoint:i,transfer:Zr,toXYZ:wd,fromXYZ:Ed,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ri},outputColorSpaceConfig:{drawingBufferColorSpace:Ri}},[Ri]:{primaries:t,whitePoint:i,transfer:de,toXYZ:wd,fromXYZ:Ed,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ri}}}),s}var Qt=r0();function Nn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function lr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Ys,wo=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Ys===void 0&&(Ys=Jr("canvas")),Ys.width=t.width,Ys.height=t.height;let n=Ys.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),i=Ys}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Jr("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let n=i.getImageData(0,0,t.width,t.height),r=n.data;for(let a=0;a<r.length;a++)r[a]=Nn(r[a]/255)*255;return i.putImageData(n,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Nn(e[i]/255)*255):e[i]=Nn(e[i]);return{data:e,width:t.width,height:t.height}}else return Ft("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},a0=0,dr=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:a0++}),this.uuid=Ma(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let a=0,o=n.length;a<o;a++)n[a].isDataTexture?r.push(Zc(n[a].image)):r.push(Zc(n[a]))}else r=Zc(n);i.url=r}return e||(t.images[this.uuid]=i),i}};function Zc(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?wo.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Ft("Texture: Unable to serialize Texture."),{})}var o0=0,Jc=new k,di=class s extends xn{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,i=mn,n=mn,r=Ze,a=is,o=mi,l=Ei,c=s.DEFAULT_ANISOTROPY,h=Dn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:o0++}),this.uuid=Ma(),this.name="",this.source=new dr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new qt(0,0),this.repeat=new qt(1,1),this.center=new qt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Jc).x}get height(){return this.source.getSize(Jc).y}get depth(){return this.source.getSize(Jc).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){Ft(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let n=this[e];if(n===void 0){Ft(`Texture.setValues(): property '${e}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Uh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case bo:t.x=t.x-Math.floor(t.x);break;case mn:t.x=t.x<0?0:1;break;case _o:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case bo:t.y=t.y-Math.floor(t.y);break;case mn:t.y=t.y<0?0:1;break;case _o:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};di.DEFAULT_IMAGE=null;di.DEFAULT_MAPPING=Uh;di.DEFAULT_ANISOTROPY=1;var eu=class eu{constructor(t=0,e=0,i=0,n=1){this.x=t,this.y=e,this.z=i,this.w=n}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,n=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*n+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*n+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*n+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*n+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,n,r,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let E=(c+1)/2,y=(f+1)/2,S=(p+1)/2,M=(h+u)/4,R=(d+x)/4,b=(g+m)/4;return E>y&&E>S?E<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(E),n=M/i,r=R/i):y>S?y<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(y),i=M/n,r=b/n):S<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(S),i=R/r,n=b/r),this.set(i,n,r,e),this}let v=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(d-x)/v,this.z=(u-h)/v,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ae(this.x,t.x,e.x),this.y=ae(this.y,t.y,e.y),this.z=ae(this.z,t.z,e.z),this.w=ae(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ae(this.x,t,e),this.y=ae(this.y,t,e),this.z=ae(this.z,t,e),this.w=ae(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ae(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};eu.prototype.isVector4=!0;var _e=eu,Eo=class extends xn{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ze,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new _e(0,0,t,e),this.scissorTest=!1,this.viewport=new _e(0,0,t,e),this.textures=[];let n={width:t,height:e,depth:i.depth},r=new di(n),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Ze,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let n=0,r=this.textures.length;n<r;n++)this.textures[n].image.width=t,this.textures[n].image.height=e,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let n=Object.assign({},t.textures[e].image);this.textures[e].source=new dr(n)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},ai=class extends Eo{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},jr=class extends di{constructor(t=null,e=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Ne,this.minFilter=Ne,this.wrapR=mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var To=class extends di{constructor(t=null,e=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Ne,this.minFilter=Ne,this.wrapR=mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Xo=class Xo{constructor(t,e,i,n,r,a,o,l,c,h,d,u,f,g,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,a,o,l,c,h,d,u,f,g,x,m)}set(t,e,i,n,r,a,o,l,c,h,d,u,f,g,x,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=n,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Xo().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,n=1/Ks.setFromMatrixColumn(t,0).length(),r=1/Ks.setFromMatrixColumn(t,1).length(),a=1/Ks.setFromMatrixColumn(t,2).length();return e[0]=i[0]*n,e[1]=i[1]*n,e[2]=i[2]*n,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,n=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(n),c=Math.sin(n),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=a*h,f=a*d,g=o*h,x=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=u-x*c,e[9]=-o*l,e[2]=x-u*c,e[6]=g+f*c,e[10]=a*l}else if(t.order==="YXZ"){let u=l*h,f=l*d,g=c*h,x=c*d;e[0]=u+x*o,e[4]=g*o-f,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=x+u*o,e[10]=a*l}else if(t.order==="ZXY"){let u=l*h,f=l*d,g=c*h,x=c*d;e[0]=u-x*o,e[4]=-a*d,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=x-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let u=a*h,f=a*d,g=o*h,x=o*d;e[0]=l*h,e[4]=g*c-f,e[8]=u*c+x,e[1]=l*d,e[5]=x*c+u,e[9]=f*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let u=a*l,f=a*c,g=o*l,x=o*c;e[0]=l*h,e[4]=x-u*d,e[8]=g*d+f,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*d+g,e[10]=u-x*d}else if(t.order==="XZY"){let u=a*l,f=a*c,g=o*l,x=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+x,e[5]=a*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=o*h,e[10]=x*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(l0,t,c0)}lookAt(t,e,i){let n=this.elements;return Ti.subVectors(t,e),Ti.lengthSq()===0&&(Ti.z=1),Ti.normalize(),Gn.crossVectors(i,Ti),Gn.lengthSq()===0&&(Math.abs(i.z)===1?Ti.x+=1e-4:Ti.z+=1e-4,Ti.normalize(),Gn.crossVectors(i,Ti)),Gn.normalize(),Wa.crossVectors(Ti,Gn),n[0]=Gn.x,n[4]=Wa.x,n[8]=Ti.x,n[1]=Gn.y,n[5]=Wa.y,n[9]=Ti.y,n[2]=Gn.z,n[6]=Wa.z,n[10]=Ti.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,n=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],f=i[13],g=i[2],x=i[6],m=i[10],p=i[14],v=i[3],E=i[7],y=i[11],S=i[15],M=n[0],R=n[4],b=n[8],T=n[12],A=n[1],P=n[5],N=n[9],H=n[13],L=n[2],V=n[6],K=n[10],Z=n[14],j=n[3],X=n[7],et=n[11],nt=n[15];return r[0]=a*M+o*A+l*L+c*j,r[4]=a*R+o*P+l*V+c*X,r[8]=a*b+o*N+l*K+c*et,r[12]=a*T+o*H+l*Z+c*nt,r[1]=h*M+d*A+u*L+f*j,r[5]=h*R+d*P+u*V+f*X,r[9]=h*b+d*N+u*K+f*et,r[13]=h*T+d*H+u*Z+f*nt,r[2]=g*M+x*A+m*L+p*j,r[6]=g*R+x*P+m*V+p*X,r[10]=g*b+x*N+m*K+p*et,r[14]=g*T+x*H+m*Z+p*nt,r[3]=v*M+E*A+y*L+S*j,r[7]=v*R+E*P+y*V+S*X,r[11]=v*b+E*N+y*K+S*et,r[15]=v*T+E*H+y*Z+S*nt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],n=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],x=t[7],m=t[11],p=t[15],v=l*f-c*u,E=o*f-c*d,y=o*u-l*d,S=a*f-c*h,M=a*u-l*h,R=a*d-o*h;return e*(x*v-m*E+p*y)-i*(g*v-m*S+p*M)+n*(g*E-x*S+p*R)-r*(g*y-x*M+m*R)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],n=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-i*(r*h-o*l)+n*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],x=t[13],m=t[14],p=t[15],v=e*o-i*a,E=e*l-n*a,y=e*c-r*a,S=i*l-n*o,M=i*c-r*o,R=n*c-r*l,b=h*x-d*g,T=h*m-u*g,A=h*p-f*g,P=d*m-u*x,N=d*p-f*x,H=u*p-f*m,L=v*H-E*N+y*P+S*A-M*T+R*b;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let V=1/L;return t[0]=(o*H-l*N+c*P)*V,t[1]=(n*N-i*H-r*P)*V,t[2]=(x*R-m*M+p*S)*V,t[3]=(u*M-d*R-f*S)*V,t[4]=(l*A-a*H-c*T)*V,t[5]=(e*H-n*A+r*T)*V,t[6]=(m*y-g*R-p*E)*V,t[7]=(h*R-u*y+f*E)*V,t[8]=(a*N-o*A+c*b)*V,t[9]=(i*A-e*N-r*b)*V,t[10]=(g*M-x*y+p*v)*V,t[11]=(d*y-h*M-f*v)*V,t[12]=(o*T-a*P-l*b)*V,t[13]=(e*P-i*T+n*b)*V,t[14]=(x*E-g*S-m*v)*V,t[15]=(h*S-d*E+u*v)*V,this}scale(t){let e=this.elements,i=t.x,n=t.y,r=t.z;return e[0]*=i,e[4]*=n,e[8]*=r,e[1]*=i,e[5]*=n,e[9]*=r,e[2]*=i,e[6]*=n,e[10]*=r,e[3]*=i,e[7]*=n,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,n))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),n=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-n*l,c*l+n*o,0,c*o+n*l,h*o+i,h*l-n*a,0,c*l-n*o,h*l+n*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,n,r,a){return this.set(1,i,r,0,t,1,a,0,e,n,1,0,0,0,0,1),this}compose(t,e,i){let n=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,g=r*d,x=a*h,m=a*d,p=o*d,v=l*c,E=l*h,y=l*d,S=i.x,M=i.y,R=i.z;return n[0]=(1-(x+p))*S,n[1]=(f+y)*S,n[2]=(g-E)*S,n[3]=0,n[4]=(f-y)*M,n[5]=(1-(u+p))*M,n[6]=(m+v)*M,n[7]=0,n[8]=(g+E)*R,n[9]=(m-v)*R,n[10]=(1-(u+x))*R,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,i){let n=this.elements;t.x=n[12],t.y=n[13],t.z=n[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let a=Ks.set(n[0],n[1],n[2]).length(),o=Ks.set(n[4],n[5],n[6]).length(),l=Ks.set(n[8],n[9],n[10]).length();r<0&&(a=-a),Yi.copy(this);let c=1/a,h=1/o,d=1/l;return Yi.elements[0]*=c,Yi.elements[1]*=c,Yi.elements[2]*=c,Yi.elements[4]*=h,Yi.elements[5]*=h,Yi.elements[6]*=h,Yi.elements[8]*=d,Yi.elements[9]*=d,Yi.elements[10]*=d,e.setFromRotationMatrix(Yi),i.x=a,i.y=o,i.z=l,this}makePerspective(t,e,i,n,r,a,o=ji,l=!1){let c=this.elements,h=2*r/(e-t),d=2*r/(i-n),u=(e+t)/(e-t),f=(i+n)/(i-n),g,x;if(l)g=r/(a-r),x=a*r/(a-r);else if(o===ji)g=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===hr)g=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,n,r,a,o=ji,l=!1){let c=this.elements,h=2/(e-t),d=2/(i-n),u=-(e+t)/(e-t),f=-(i+n)/(i-n),g,x;if(l)g=1/(a-r),x=a/(a-r);else if(o===ji)g=-2/(a-r),x=-(a+r)/(a-r);else if(o===hr)g=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let n=0;n<16;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};Xo.prototype.isMatrix4=!0;var Gt=Xo,Ks=new k,Yi=new Gt,l0=new k(0,0,0),c0=new k(1,1,1),Gn=new k,Wa=new k,Ti=new k,Td=new Gt,Ad=new Ge,Si=class s{constructor(t=0,e=0,i=0,n=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=n}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,n=this._order){return this._x=t,this._y=e,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let n=t.elements,r=n[0],a=n[4],o=n[8],l=n[1],c=n[5],h=n[9],d=n[2],u=n[6],f=n[10];switch(e){case"XYZ":this._y=Math.asin(ae(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ae(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ae(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ae(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ae(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ae(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ft("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Td.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Td,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ad.setFromEuler(this),this.setFromQuaternion(Ad,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Si.DEFAULT_ORDER="XYZ";var Qr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},h0=0,Rd=new k,Zs=new Ge,Rn=new Gt,$a=new k,Gr=new k,u0=new k,d0=new Ge,Cd=new k(1,0,0),Pd=new k(0,1,0),Id=new k(0,0,1),Ld={type:"added"},f0={type:"removed"},Js={type:"childadded",child:null},jc={type:"childremoved",child:null},fi=class s extends xn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:h0++}),this.uuid=Ma(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new k,e=new Si,i=new Ge,n=new k(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new Gt},normalMatrix:{value:new Ht}}),this.matrix=new Gt,this.matrixWorld=new Gt,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Qr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Zs.setFromAxisAngle(t,e),this.quaternion.multiply(Zs),this}rotateOnWorldAxis(t,e){return Zs.setFromAxisAngle(t,e),this.quaternion.premultiply(Zs),this}rotateX(t){return this.rotateOnAxis(Cd,t)}rotateY(t){return this.rotateOnAxis(Pd,t)}rotateZ(t){return this.rotateOnAxis(Id,t)}translateOnAxis(t,e){return Rd.copy(t).applyQuaternion(this.quaternion),this.position.add(Rd.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Cd,t)}translateY(t){return this.translateOnAxis(Pd,t)}translateZ(t){return this.translateOnAxis(Id,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Rn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?$a.copy(t):$a.set(t,e,i);let n=this.parent;this.updateWorldMatrix(!0,!1),Gr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rn.lookAt(Gr,$a,this.up):Rn.lookAt($a,Gr,this.up),this.quaternion.setFromRotationMatrix(Rn),n&&(Rn.extractRotation(n.matrixWorld),Zs.setFromRotationMatrix(Rn),this.quaternion.premultiply(Zs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Bt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ld),Js.child=t,this.dispatchEvent(Js),Js.child=null):Bt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(f0),jc.child=t,this.dispatchEvent(jc),jc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Rn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Rn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Rn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ld),Js.child=t,this.dispatchEvent(Js),Js.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,n=this.children.length;i<n;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gr,t,u0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gr,d0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,n=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*n,r[13]+=i-r[1]*e-r[5]*i-r[9]*n,r[14]+=n-r[2]*e-r[6]*i-r[10]*n}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let n={};n.uuid=this.uuid,n.type=this.type,n.name=this.name,n.castShadow=this.castShadow,n.receiveShadow=this.receiveShadow,n.visible=this.visible,n.frustumCulled=this.frustumCulled,n.renderOrder=this.renderOrder,n.static=this.static,n.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.pivot!==null&&(n.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(n.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(n.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(t),n.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));n.material=o}else n.material=r(t.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];n.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=n,i;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let n=t.children[i];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};fi.DEFAULT_UP=new k(0,1,0);fi.DEFAULT_MATRIX_AUTO_UPDATE=!0;fi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var kn=class extends fi{constructor(){super(),this.isGroup=!0,this.type="Group"}},p0={type:"move"},fr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new kn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new kn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new kn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let n=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,i),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(n=e.getPose(t.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(p0)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new kn;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},Pf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wn={h:0,s:0,l:0},Xa={h:0,s:0,l:0};function Qc(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var Yt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let n=t;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ri){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Qt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,n=Qt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Qt.colorSpaceToWorking(this,n),this}setHSL(t,e,i,n=Qt.workingColorSpace){if(t=s0(t,1),e=ae(e,0,1),i=ae(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=Qc(a,r,t+1/3),this.g=Qc(a,r,t),this.b=Qc(a,r,t-1/3)}return Qt.colorSpaceToWorking(this,n),this}setStyle(t,e=Ri){function i(r){r!==void 0&&parseFloat(r)<1&&Ft("Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=n[1],o=n[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ft("Color: Unknown color model "+t)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=n[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Ft("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ri){let i=Pf[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Ft("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Nn(t.r),this.g=Nn(t.g),this.b=Nn(t.b),this}copyLinearToSRGB(t){return this.r=lr(t.r),this.g=lr(t.g),this.b=lr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ri){return Qt.workingToColorSpace(si.copy(this),t),Math.round(ae(si.r*255,0,255))*65536+Math.round(ae(si.g*255,0,255))*256+Math.round(ae(si.b*255,0,255))}getHexString(t=Ri){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Qt.workingColorSpace){Qt.workingToColorSpace(si.copy(this),e);let i=si.r,n=si.g,r=si.b,a=Math.max(i,n,r),o=Math.min(i,n,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case i:l=(n-r)/d+(n<r?6:0);break;case n:l=(r-i)/d+2;break;case r:l=(i-n)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Qt.workingColorSpace){return Qt.workingToColorSpace(si.copy(this),e),t.r=si.r,t.g=si.g,t.b=si.b,t}getStyle(t=Ri){Qt.workingToColorSpace(si.copy(this),t);let e=si.r,i=si.g,n=si.b;return t!==Ri?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(t,e,i){return this.getHSL(Wn),this.setHSL(Wn.h+t,Wn.s+e,Wn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Wn),t.getHSL(Xa);let i=qc(Wn.h,Xa.h,e),n=qc(Wn.s,Xa.s,e),r=qc(Wn.l,Xa.l,e);return this.setHSL(i,n,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,n=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*n,this.g=r[1]*e+r[4]*i+r[7]*n,this.b=r[2]*e+r[5]*i+r[8]*n,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},si=new Yt;Yt.NAMES=Pf;var ta=class s{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Yt(t),this.near=e,this.far=i}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},ys=class extends fi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Si,this.environmentIntensity=1,this.environmentRotation=new Si,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Ki=new k,Cn=new k,th=new k,Pn=new k,js=new k,Qs=new k,kd=new k,eh=new k,ih=new k,nh=new k,sh=new _e,rh=new _e,ah=new _e,Yn=class s{constructor(t=new k,e=new k,i=new k){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,n){n.subVectors(i,e),Ki.subVectors(t,e),n.cross(Ki);let r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(t,e,i,n,r){Ki.subVectors(n,e),Cn.subVectors(i,e),th.subVectors(t,e);let a=Ki.dot(Ki),o=Ki.dot(Cn),l=Ki.dot(th),c=Cn.dot(Cn),h=Cn.dot(th),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,i,n){return this.getBarycoord(t,e,i,n,Pn)===null?!1:Pn.x>=0&&Pn.y>=0&&Pn.x+Pn.y<=1}static getInterpolation(t,e,i,n,r,a,o,l){return this.getBarycoord(t,e,i,n,Pn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Pn.x),l.addScaledVector(a,Pn.y),l.addScaledVector(o,Pn.z),l)}static getInterpolatedAttribute(t,e,i,n,r,a){return sh.setScalar(0),rh.setScalar(0),ah.setScalar(0),sh.fromBufferAttribute(t,e),rh.fromBufferAttribute(t,i),ah.fromBufferAttribute(t,n),a.setScalar(0),a.addScaledVector(sh,r.x),a.addScaledVector(rh,r.y),a.addScaledVector(ah,r.z),a}static isFrontFacing(t,e,i,n){return Ki.subVectors(i,e),Cn.subVectors(t,e),Ki.cross(Cn).dot(n)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,n){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[n]),this}setFromAttributeAndIndices(t,e,i,n){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ki.subVectors(this.c,this.b),Cn.subVectors(this.a,this.b),Ki.cross(Cn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,n,r){return s.getInterpolation(t,this.a,this.b,this.c,e,i,n,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,n=this.b,r=this.c,a,o;js.subVectors(n,i),Qs.subVectors(r,i),eh.subVectors(t,i);let l=js.dot(eh),c=Qs.dot(eh);if(l<=0&&c<=0)return e.copy(i);ih.subVectors(t,n);let h=js.dot(ih),d=Qs.dot(ih);if(h>=0&&d<=h)return e.copy(n);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector(js,a);nh.subVectors(t,r);let f=js.dot(nh),g=Qs.dot(nh);if(g>=0&&f<=g)return e.copy(r);let x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(i).addScaledVector(Qs,o);let m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return kd.subVectors(r,n),o=(d-h)/(d-h+(f-g)),e.copy(n).addScaledVector(kd,o);let p=1/(m+x+u);return a=x*p,o=u*p,e.copy(i).addScaledVector(js,a).addScaledVector(Qs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},vn=class{constructor(t=new k(1/0,1/0,1/0),e=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Zi.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Zi.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=Zi.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Zi):Zi.fromBufferAttribute(r,a),Zi.applyMatrix4(t.matrixWorld),this.expandByPoint(Zi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),qa.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),qa.copy(i.boundingBox)),qa.applyMatrix4(t.matrixWorld),this.union(qa)}let n=t.children;for(let r=0,a=n.length;r<a;r++)this.expandByObject(n[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Zi),Zi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Wr),Ya.subVectors(this.max,Wr),tr.subVectors(t.a,Wr),er.subVectors(t.b,Wr),ir.subVectors(t.c,Wr),$n.subVectors(er,tr),Xn.subVectors(ir,er),fs.subVectors(tr,ir);let e=[0,-$n.z,$n.y,0,-Xn.z,Xn.y,0,-fs.z,fs.y,$n.z,0,-$n.x,Xn.z,0,-Xn.x,fs.z,0,-fs.x,-$n.y,$n.x,0,-Xn.y,Xn.x,0,-fs.y,fs.x,0];return!oh(e,tr,er,ir,Ya)||(e=[1,0,0,0,1,0,0,0,1],!oh(e,tr,er,ir,Ya))?!1:(Ka.crossVectors($n,Xn),e=[Ka.x,Ka.y,Ka.z],oh(e,tr,er,ir,Ya))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Zi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Zi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(In[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),In[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),In[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),In[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),In[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),In[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),In[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),In[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(In),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},In=[new k,new k,new k,new k,new k,new k,new k,new k],Zi=new k,qa=new vn,tr=new k,er=new k,ir=new k,$n=new k,Xn=new k,fs=new k,Wr=new k,Ya=new k,Ka=new k,ps=new k;function oh(s,t,e,i,n){for(let r=0,a=s.length-3;r<=a;r+=3){ps.fromArray(s,r);let o=n.x*Math.abs(ps.x)+n.y*Math.abs(ps.y)+n.z*Math.abs(ps.z),l=t.dot(ps),c=e.dot(ps),h=i.dot(ps);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Ve=new k,Za=new qt,m0=0,Ci=class extends xn{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:m0++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Ef,this.updateRanges=[],this.gpuType=pi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[t+n]=e.array[i+n];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Za.fromBufferAttribute(this,e),Za.applyMatrix3(t),this.setXY(e,Za.x,Za.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix3(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix4(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.applyNormalMatrix(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.transformDirection(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Vr(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Mi(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Vr(e,this.array)),e}setX(t,e){return this.normalized&&(e=Mi(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Vr(e,this.array)),e}setY(t,e){return this.normalized&&(e=Mi(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Vr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Mi(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Vr(e,this.array)),e}setW(t,e){return this.normalized&&(e=Mi(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Mi(e,this.array),i=Mi(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,n){return t*=this.itemSize,this.normalized&&(e=Mi(e,this.array),i=Mi(i,this.array),n=Mi(n,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this}setXYZW(t,e,i,n,r){return t*=this.itemSize,this.normalized&&(e=Mi(e,this.array),i=Mi(i,this.array),n=Mi(n,this.array),r=Mi(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var ea=class extends Ci{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var ia=class extends Ci{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var Jt=class extends Ci{constructor(t,e,i){super(new Float32Array(t),e,i)}},g0=new vn,$r=new k,lh=new k,yn=class{constructor(t=new k,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):g0.setFromPoints(t).getCenter(i);let n=0;for(let r=0,a=t.length;r<a;r++)n=Math.max(n,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(n),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;$r.subVectors(t,this.center);let e=$r.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),n=(i-this.radius)*.5;this.center.addScaledVector($r,n/i),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(lh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint($r.copy(t.center).add(lh)),this.expandByPoint($r.copy(t.center).sub(lh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},x0=0,Oi=new Gt,ch=new fi,nr=new k,Ai=new vn,Xr=new vn,Ye=new k,We=class s extends xn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:x0++}),this.uuid=Ma(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(i0(t)?ia:ea)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Ht().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Oi.makeRotationFromQuaternion(t),this.applyMatrix4(Oi),this}rotateX(t){return Oi.makeRotationX(t),this.applyMatrix4(Oi),this}rotateY(t){return Oi.makeRotationY(t),this.applyMatrix4(Oi),this}rotateZ(t){return Oi.makeRotationZ(t),this.applyMatrix4(Oi),this}translate(t,e,i){return Oi.makeTranslation(t,e,i),this.applyMatrix4(Oi),this}scale(t,e,i){return Oi.makeScale(t,e,i),this.applyMatrix4(Oi),this}lookAt(t){return ch.lookAt(t),ch.updateMatrix(),this.applyMatrix4(ch.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(nr).negate(),this.translate(nr.x,nr.y,nr.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let n=0,r=t.length;n<r;n++){let a=t[n];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Jt(i,3))}else{let i=Math.min(t.length,e.count);for(let n=0;n<i;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&Ft("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Bt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,n=e.length;i<n;i++){let r=e[i];Ai.setFromBufferAttribute(r),this.morphTargetsRelative?(Ye.addVectors(this.boundingBox.min,Ai.min),this.boundingBox.expandByPoint(Ye),Ye.addVectors(this.boundingBox.max,Ai.max),this.boundingBox.expandByPoint(Ye)):(this.boundingBox.expandByPoint(Ai.min),this.boundingBox.expandByPoint(Ai.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Bt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Bt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(t){let i=this.boundingSphere.center;if(Ai.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Xr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ye.addVectors(Ai.min,Xr.min),Ai.expandByPoint(Ye),Ye.addVectors(Ai.max,Xr.max),Ai.expandByPoint(Ye)):(Ai.expandByPoint(Xr.min),Ai.expandByPoint(Xr.max))}Ai.getCenter(i);let n=0;for(let r=0,a=t.count;r<a;r++)Ye.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(Ye));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ye.fromBufferAttribute(o,c),l&&(nr.fromBufferAttribute(t,c),Ye.add(nr)),n=Math.max(n,i.distanceToSquared(Ye))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&Bt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Bt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,n=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Ci(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let b=0;b<i.count;b++)o[b]=new k,l[b]=new k;let c=new k,h=new k,d=new k,u=new qt,f=new qt,g=new qt,x=new k,m=new k;function p(b,T,A){c.fromBufferAttribute(i,b),h.fromBufferAttribute(i,T),d.fromBufferAttribute(i,A),u.fromBufferAttribute(r,b),f.fromBufferAttribute(r,T),g.fromBufferAttribute(r,A),h.sub(c),d.sub(c),f.sub(u),g.sub(u);let P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(P),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),o[b].add(x),o[T].add(x),o[A].add(x),l[b].add(m),l[T].add(m),l[A].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let b=0,T=v.length;b<T;++b){let A=v[b],P=A.start,N=A.count;for(let H=P,L=P+N;H<L;H+=3)p(t.getX(H+0),t.getX(H+1),t.getX(H+2))}let E=new k,y=new k,S=new k,M=new k;function R(b){S.fromBufferAttribute(n,b),M.copy(S);let T=o[b];E.copy(T),E.sub(S.multiplyScalar(S.dot(T))).normalize(),y.crossVectors(M,T);let P=y.dot(l[b])<0?-1:1;a.setXYZW(b,E.x,E.y,E.z,P)}for(let b=0,T=v.length;b<T;++b){let A=v[b],P=A.start,N=A.count;for(let H=P,L=P+N;H<L;H+=3)R(t.getX(H+0)),R(t.getX(H+1)),R(t.getX(H+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new Ci(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);let n=new k,r=new k,a=new k,o=new k,l=new k,c=new k,h=new k,d=new k;if(t)for(let u=0,f=t.count;u<f;u+=3){let g=t.getX(u+0),x=t.getX(u+1),m=t.getX(u+2);n.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,m),h.subVectors(a,r),d.subVectors(n,r),h.cross(d),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)n.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(n,r),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ye.fromBufferAttribute(t,e),Ye.normalize(),t.setXYZ(e,Ye.x,Ye.y,Ye.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),f=0,g=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new Ci(u,h,d)}if(this.index===null)return Ft("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,i=this.index.array,n=this.attributes;for(let o in n){let l=n[o],c=t(l,i);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=t(u,i);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let n={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(n[l]=h,r=!0)}r&&(t.data.morphAttributes=n,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let n=t.attributes;for(let c in n){let h=n[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var hh=new k,v0=new k,y0=new Ht,Ji=class{constructor(t=new k(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,n){return this.normal.set(t,e,i),this.constant=n,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let n=hh.subVectors(i,e).cross(v0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(n,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let n=t.delta(hh),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(n,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||y0.getNormalMatrix(t),n=this.coplanarPoint(hh).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},b0=0,bs=class extends xn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:b0++}),this.uuid=Ma(),this.name="",this.type="Material",this.blending=yr,this.side=bn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ah,this.blendDst=Rh,this.blendEquation=As,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Yt(0,0,0),this.blendAlpha=0,this.depthFunc=cr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=vf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=uo,this.stencilZFail=uo,this.stencilZPass=uo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){Ft(`Material: parameter '${e}' has value of undefined.`);continue}let n=this[e];if(n===void 0){Ft(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector2&&i&&i.isVector2||n&&n.isEuler&&i&&i.isEuler||n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=n(t.textures),a=n(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Yt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new Ji().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new qt().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new qt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let n=e.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Ln=new k,uh=new k,Ja=new k,ja=new k,Ao=class{constructor(t=new k,e=new k(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ln)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Ln.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ln.copy(this.origin).addScaledVector(this.direction,e),Ln.distanceToSquared(t))}distanceSqToSegment(t,e,i,n){uh.copy(t).add(e).multiplyScalar(.5),Ja.copy(e).sub(t).normalize(),ja.copy(this.origin).sub(uh);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Ja),o=ja.dot(this.direction),l=-ja.dot(Ja),c=ja.lengthSq(),h=Math.abs(1-a*a),d,u,f,g;if(h>0)if(d=a*l-o,u=a*o-l,g=r*h,d>=0)if(u>=-g)if(u<=g){let x=1/h;d*=x,u*=x,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),n&&n.copy(uh).addScaledVector(Ja,u),f}intersectSphere(t,e){if(t.radius<0)return null;Ln.subVectors(t.center,this.origin);let i=Ln.dot(this.direction),n=Ln.dot(Ln)-i*i,r=t.radius*t.radius;if(n>r)return null;let a=Math.sqrt(r-n),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,n,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,n=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,n=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),i>a||r>n||((r>i||isNaN(i))&&(i=r),(a<n||isNaN(n))&&(n=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),i>l||o>n)||((o>i||i!==i)&&(i=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,e)}intersectsBox(t){return this.intersectBox(t,Ln)!==null}intersectTriangle(t,e,i,n,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=t.x-a.x,u=t.y-a.y,f=t.z-a.z,g=e.x-a.x,x=e.y-a.y,m=e.z-a.z,p=i.x-a.x,v=i.y-a.y,E=i.z-a.z,y=Math.abs(l),S=Math.abs(c),M=Math.abs(h),R,b,T,A,P,N,H,L,V,K,Z,j;if(y>=S&&y>=M?(T=l,N=d,V=g,j=p,l>=0?(R=c,b=h,A=u,P=f,H=x,L=m,K=v,Z=E):(R=h,b=c,A=f,P=u,H=m,L=x,K=E,Z=v)):S>=M?(T=c,N=u,V=x,j=v,c>=0?(R=h,b=l,A=f,P=d,H=m,L=g,K=E,Z=p):(R=l,b=h,A=d,P=f,H=g,L=m,K=p,Z=E)):(T=h,N=f,V=m,j=E,h>=0?(R=l,b=c,A=d,P=u,H=g,L=x,K=p,Z=v):(R=c,b=l,A=u,P=d,H=x,L=g,K=v,Z=p)),T===0)return null;let X=R/T,et=b/T,nt=1/T,Lt=A-X*N,At=P-et*N,oe=H-X*V,ne=L-et*V,rt=K-X*j,I=Z-et*j,Y=rt*ne-I*oe,at=Lt*I-At*rt,yt=oe*At-ne*Lt;if(n){if(Y<0||at<0||yt<0)return null}else if((Y<0||at<0||yt<0)&&(Y>0||at>0||yt>0))return null;let ot=Y+at+yt;if(ot===0)return null;let Ct=nt*(Y*N+at*V+yt*j);return(ot>0?Ct<0:Ct>0)?null:this.at(Ct/ot,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},_s=class extends bs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Si,this.combine=Ch,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Nd=new Gt,ms=new Ao,Qa=new yn,Dd=new k,to=new k,eo=new k,io=new k,dh=new k,no=new k,Od=new k,so=new k,ce=class extends fi{constructor(t=new We,e=new _s){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){let o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(n,t);let o=this.morphTargetInfluences;if(r&&o){no.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(dh.fromBufferAttribute(d,t),a?no.addScaledVector(dh,h):no.addScaledVector(dh.sub(e),h))}e.add(no)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Qa.copy(i.boundingSphere),Qa.applyMatrix4(r),ms.copy(t.ray).recast(t.near),!(Qa.containsPoint(ms.origin)===!1&&(ms.intersectSphere(Qa,Dd)===null||ms.origin.distanceToSquared(Dd)>(t.far-t.near)**2))&&(Nd.copy(r).invert(),ms.copy(t.ray).applyMatrix4(Nd),!(i.boundingBox!==null&&ms.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,ms)))}_computeIntersections(t,e,i){let n,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){let m=u[g],p=a[m.materialIndex],v=Math.max(m.start,f.start),E=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let y=v,S=E;y<S;y+=3){let M=o.getX(y),R=o.getX(y+1),b=o.getX(y+2);n=ro(this,p,t,i,c,h,d,M,R,b),n&&(n.faceIndex=Math.floor(y/3),n.face.materialIndex=m.materialIndex,e.push(n))}}else{let g=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let v=o.getX(m),E=o.getX(m+1),y=o.getX(m+2);n=ro(this,a,t,i,c,h,d,v,E,y),n&&(n.faceIndex=Math.floor(m/3),e.push(n))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){let m=u[g],p=a[m.materialIndex],v=Math.max(m.start,f.start),E=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let y=v,S=E;y<S;y+=3){let M=y,R=y+1,b=y+2;n=ro(this,p,t,i,c,h,d,M,R,b),n&&(n.faceIndex=Math.floor(y/3),n.face.materialIndex=m.materialIndex,e.push(n))}}else{let g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let v=m,E=m+1,y=m+2;n=ro(this,a,t,i,c,h,d,v,E,y),n&&(n.faceIndex=Math.floor(m/3),e.push(n))}}}};function _0(s,t,e,i,n,r,a,o){let l;if(t.side===Je?l=i.intersectTriangle(a,r,n,!0,o):l=i.intersectTriangle(n,r,a,t.side===bn,o),l===null)return null;so.copy(o),so.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(so);return c<e.near||c>e.far?null:{distance:c,point:so.clone(),object:s}}function ro(s,t,e,i,n,r,a,o,l,c){s.getVertexPosition(o,to),s.getVertexPosition(l,eo),s.getVertexPosition(c,io);let h=_0(s,t,e,i,to,eo,io,Od);if(h){let d=new k;Yn.getBarycoord(Od,to,eo,io,d),n&&(h.uv=Yn.getInterpolatedAttribute(n,o,l,c,d,new qt)),r&&(h.uv1=Yn.getInterpolatedAttribute(r,o,l,c,d,new qt)),a&&(h.normal=Yn.getInterpolatedAttribute(a,o,l,c,d,new k),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new k,materialIndex:0};Yn.getNormal(to,eo,io,u.normal),h.face=u,h.barycoord=d}return h}var Kn=class extends di{constructor(t=null,e=1,i=1,n,r,a,o,l,c=Ne,h=Ne,d,u){super(null,a,o,l,c,h,n,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var wi=class extends Ci{constructor(t,e,i,n=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},sr=new Gt,Ud=new Gt,ao=[],Fd=new vn,M0=new Gt,qr=new ce,Yr=new yn,pr=class extends ce{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new wi(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,M0)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new vn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,sr),Fd.copy(t.boundingBox).applyMatrix4(sr),this.boundingBox.union(Fd)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new yn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,sr),Yr.copy(t.boundingSphere).applyMatrix4(sr),this.boundingSphere.union(Yr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let i=e.morphTargetInfluences,n=this.morphTexture.source.data.data,r=i.length+1,a=t*r+1;for(let o=0;o<i.length;o++)i[o]=n[a+o]}raycast(t,e){let i=this.matrixWorld,n=this.count;if(qr.geometry=this.geometry,qr.material=this.material,qr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Yr.copy(this.boundingSphere),Yr.applyMatrix4(i),t.ray.intersectsSphere(Yr)!==!1))for(let r=0;r<n;r++){this.getMatrixAt(r,sr),Ud.multiplyMatrices(i,sr),qr.matrixWorld=Ud,qr.raycast(t,ao);for(let a=0,o=ao.length;a<o;a++){let l=ao[a];l.instanceId=r,l.object=this,e.push(l)}ao.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new wi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let i=e.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new Kn(new Float32Array(n*this.count),n,this.count,Qo,pi));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<i.length;c++)a+=i[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=n*t;return r[l]=o,r.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},gs=new yn,S0=new qt(.5,.5),oo=new k,mr=class{constructor(t=new Ji,e=new Ji,i=new Ji,n=new Ji,r=new Ji,a=new Ji){this.planes=[t,e,i,n,r,a]}set(t,e,i,n,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(n),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=ji,i=!1){let n=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],x=r[9],m=r[10],p=r[11],v=r[12],E=r[13],y=r[14],S=r[15];if(n[0].setComponents(c-a,f-h,p-g,S-v).normalize(),n[1].setComponents(c+a,f+h,p+g,S+v).normalize(),n[2].setComponents(c+o,f+d,p+x,S+E).normalize(),n[3].setComponents(c-o,f-d,p-x,S-E).normalize(),i)n[4].setComponents(l,u,m,y).normalize(),n[5].setComponents(c-l,f-u,p-m,S-y).normalize();else if(n[4].setComponents(c-l,f-u,p-m,S-y).normalize(),e===ji)n[5].setComponents(c+l,f+u,p+m,S+y).normalize();else if(e===hr)n[5].setComponents(l,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),gs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),gs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(gs)}intersectsSprite(t){gs.center.set(0,0,0);let e=S0.distanceTo(t.center);return gs.radius=.7071067811865476+e,gs.applyMatrix4(t.matrixWorld),this.intersectsSphere(gs)}intersectsSphere(t){let e=this.planes,i=t.center,n=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let n=e[i];if(oo.x=n.normal.x>0?t.max.x:t.min.x,oo.y=n.normal.y>0?t.max.y:t.min.y,oo.z=n.normal.z>0?t.max.z:t.min.z,n.distanceToPoint(oo)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var na=class extends di{constructor(t=[],e=es,i,n,r,a,o,l,c,h){super(t,e,i,n,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Ms=class extends di{constructor(t,e,i,n,r,a,o,l,c){super(t,e,i,n,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Zn=class extends di{constructor(t,e,i=tn,n,r,a,o=Ne,l=Ne,c,h=gn,d=1){if(h!==gn&&h!==ns)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,n,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new dr(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Ro=class extends Zn{constructor(t,e=tn,i=es,n,r,a=Ne,o=Ne,l,c=gn){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,i,n,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},sa=class extends di{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Jn=class s extends We{constructor(t=1,e=1,i=1,n=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:n,heightSegments:r,depthSegments:a};let o=this;n=Math.floor(n),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,f=0;g("z","y","x",-1,-1,i,e,t,a,r,0),g("z","y","x",1,-1,i,e,-t,a,r,1),g("x","z","y",1,1,t,i,e,n,a,2),g("x","z","y",1,-1,t,i,-e,n,a,3),g("x","y","z",1,-1,t,e,i,n,r,4),g("x","y","z",-1,-1,t,e,-i,n,r,5),this.setIndex(l),this.setAttribute("position",new Jt(c,3)),this.setAttribute("normal",new Jt(h,3)),this.setAttribute("uv",new Jt(d,2));function g(x,m,p,v,E,y,S,M,R,b,T){let A=y/R,P=S/b,N=y/2,H=S/2,L=M/2,V=R+1,K=b+1,Z=0,j=0,X=new k;for(let et=0;et<K;et++){let nt=et*P-H;for(let Lt=0;Lt<V;Lt++){let At=Lt*A-N;X[x]=At*v,X[m]=nt*E,X[p]=L,c.push(X.x,X.y,X.z),X[x]=0,X[m]=0,X[p]=M>0?1:-1,h.push(X.x,X.y,X.z),d.push(Lt/R),d.push(1-et/b),Z+=1}}for(let et=0;et<b;et++)for(let nt=0;nt<R;nt++){let Lt=u+nt+V*et,At=u+nt+V*(et+1),oe=u+(nt+1)+V*(et+1),ne=u+(nt+1)+V*et;l.push(Lt,At,ne),l.push(At,oe,ne),j+=6}o.addGroup(f,j,T),f+=j,u+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var ra=class s extends We{constructor(t=1,e=32,i=0,n=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:n},e=Math.max(3,e);let r=[],a=[],o=[],l=[],c=new k,h=new qt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){let f=i+d/e*n;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Jt(a,3)),this.setAttribute("normal",new Jt(o,3)),this.setAttribute("uv",new Jt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.segments,t.thetaStart,t.thetaLength)}},gr=class s extends We{constructor(t=1,e=1,i=1,n=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:n,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;n=Math.floor(n),r=Math.floor(r);let h=[],d=[],u=[],f=[],g=0,x=[],m=i/2,p=0;v(),a===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new Jt(d,3)),this.setAttribute("normal",new Jt(u,3)),this.setAttribute("uv",new Jt(f,2));function v(){let y=new k,S=new k,M=0,R=(e-t)/i;for(let b=0;b<=r;b++){let T=[],A=b/r,P=A*(e-t)+t;for(let N=0;N<=n;N++){let H=N/n,L=H*l+o,V=Math.sin(L),K=Math.cos(L);S.x=P*V,S.y=-A*i+m,S.z=P*K,d.push(S.x,S.y,S.z),y.set(V,R,K).normalize(),u.push(y.x,y.y,y.z),f.push(H,1-A),T.push(g++)}x.push(T)}for(let b=0;b<n;b++)for(let T=0;T<r;T++){let A=x[T][b],P=x[T+1][b],N=x[T+1][b+1],H=x[T][b+1];(t>0||T!==0)&&(h.push(A,P,H),M+=3),(e>0||T!==r-1)&&(h.push(P,N,H),M+=3)}c.addGroup(p,M,0),p+=M}function E(y){let S=g,M=new qt,R=new k,b=0,T=y===!0?t:e,A=y===!0?1:-1;for(let N=1;N<=n;N++)d.push(0,m*A,0),u.push(0,A,0),f.push(.5,.5),g++;let P=g;for(let N=0;N<=n;N++){let L=N/n*l+o,V=Math.cos(L),K=Math.sin(L);R.x=T*K,R.y=m*A,R.z=T*V,d.push(R.x,R.y,R.z),u.push(0,A,0),M.x=V*.5+.5,M.y=K*.5*A+.5,f.push(M.x,M.y),g++}for(let N=0;N<n;N++){let H=S+N,L=P+N;y===!0?h.push(L,L+1,H):h.push(L+1,L,H),b+=3}c.addGroup(p,b,y===!0?1:2),p+=b}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ss=class s extends gr{constructor(t=1,e=1,i=32,n=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,i,n,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:n,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new s(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},aa=class s extends We{constructor(t=[],e=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:n};let r=[],a=[];o(n),c(i),h(),this.setAttribute("position",new Jt(r,3)),this.setAttribute("normal",new Jt(r.slice(),3)),this.setAttribute("uv",new Jt(a,2)),n===0?this.computeVertexNormals():this.normalizeNormals();function o(v){let E=new k,y=new k,S=new k;for(let M=0;M<e.length;M+=3)f(e[M+0],E),f(e[M+1],y),f(e[M+2],S),l(E,y,S,v)}function l(v,E,y,S){let M=S+1,R=[];for(let b=0;b<=M;b++){R[b]=[];let T=v.clone().lerp(y,b/M),A=E.clone().lerp(y,b/M),P=M-b;for(let N=0;N<=P;N++)N===0&&b===M?R[b][N]=T:R[b][N]=T.clone().lerp(A,N/P)}for(let b=0;b<M;b++)for(let T=0;T<2*(M-b)-1;T++){let A=Math.floor(T/2);T%2===0?(u(R[b][A+1]),u(R[b+1][A]),u(R[b][A])):(u(R[b][A+1]),u(R[b+1][A+1]),u(R[b+1][A]))}}function c(v){let E=new k;for(let y=0;y<r.length;y+=3)E.x=r[y+0],E.y=r[y+1],E.z=r[y+2],E.normalize().multiplyScalar(v),r[y+0]=E.x,r[y+1]=E.y,r[y+2]=E.z}function h(){let v=new k;for(let E=0;E<r.length;E+=3){v.x=r[E+0],v.y=r[E+1],v.z=r[E+2];let y=m(v)/2/Math.PI+.5,S=p(v)/Math.PI+.5;a.push(y,1-S)}g(),d()}function d(){for(let v=0;v<a.length;v+=6){let E=a[v+0],y=a[v+2],S=a[v+4],M=Math.max(E,y,S),R=Math.min(E,y,S);M>.9&&R<.1&&(E<.2&&(a[v+0]+=1),y<.2&&(a[v+2]+=1),S<.2&&(a[v+4]+=1))}}function u(v){r.push(v.x,v.y,v.z)}function f(v,E){let y=v*3;E.x=t[y+0],E.y=t[y+1],E.z=t[y+2]}function g(){let v=new k,E=new k,y=new k,S=new k,M=new qt,R=new qt,b=new qt;for(let T=0,A=0;T<r.length;T+=9,A+=6){v.set(r[T+0],r[T+1],r[T+2]),E.set(r[T+3],r[T+4],r[T+5]),y.set(r[T+6],r[T+7],r[T+8]),M.set(a[A+0],a[A+1]),R.set(a[A+2],a[A+3]),b.set(a[A+4],a[A+5]),S.copy(v).add(E).add(y).divideScalar(3);let P=m(S);x(M,A+0,v,P),x(R,A+2,E,P),x(b,A+4,y,P)}}function x(v,E,y,S){S<0&&v.x===1&&(a[E]=v.x-1),y.x===0&&y.z===0&&(a[E]=S/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.vertices,t.indices,t.radius,t.detail)}};var ws=class s extends aa{constructor(t=1,e=0){let i=(1+Math.sqrt(5))/2,n=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(n,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}};var Ui=class s extends We{constructor(t=1,e=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:n};let r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(n),c=o+1,h=l+1,d=t/o,u=e/l,f=[],g=[],x=[],m=[];for(let p=0;p<h;p++){let v=p*u-a;for(let E=0;E<c;E++){let y=E*d-r;g.push(y,-v,0),x.push(0,0,1),m.push(E/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<o;v++){let E=v+c*p,y=v+c*(p+1),S=v+1+c*(p+1),M=v+1+c*p;f.push(E,y,M),f.push(y,S,M)}this.setIndex(f),this.setAttribute("position",new Jt(g,3)),this.setAttribute("normal",new Jt(x,3)),this.setAttribute("uv",new Jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}},Es=class s extends We{constructor(t=.5,e=1,i=32,n=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:n,thetaStart:r,thetaLength:a},i=Math.max(3,i),n=Math.max(1,n);let o=[],l=[],c=[],h=[],d=t,u=(e-t)/n,f=new k,g=new qt;for(let x=0;x<=n;x++){for(let m=0;m<=i;m++){let p=r+m/i*a;f.x=d*Math.cos(p),f.y=d*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}d+=u}for(let x=0;x<n;x++){let m=x*(i+1);for(let p=0;p<i;p++){let v=p+m,E=v,y=v+i+1,S=v+i+2,M=v+1;o.push(E,y,M),o.push(y,S,M)}}this.setIndex(o),this.setAttribute("position",new Jt(l,3)),this.setAttribute("normal",new Jt(c,3)),this.setAttribute("uv",new Jt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var Ts=class s extends We{constructor(t=1,e=32,i=16,n=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:n,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new k,u=new k,f=[],g=[],x=[],m=[];for(let p=0;p<=i;p++){let v=[],E=p/i,y=a+E*o,S=t*Math.cos(y),M=Math.sqrt(t*t-S*S),R=0;p===0&&a===0?R=.5/e:p===i&&l===Math.PI&&(R=-.5/e);for(let b=0;b<=e;b++){let T=b/e,A=n+T*r;d.x=-M*Math.cos(A),d.y=S,d.z=M*Math.sin(A),g.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),m.push(T+R,1-E),v.push(c++)}h.push(v)}for(let p=0;p<i;p++)for(let v=0;v<e;v++){let E=h[p][v+1],y=h[p][v],S=h[p+1][v],M=h[p+1][v+1];(p!==0||a>0)&&f.push(E,y,M),(p!==i-1||l<Math.PI)&&f.push(y,S,M)}this.setIndex(f),this.setAttribute("position",new Jt(g,3)),this.setAttribute("normal",new Jt(x,3)),this.setAttribute("uv",new Jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},oa=class s extends aa{constructor(t=1,e=0){let i=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],n=[2,1,0,0,3,2,1,3,0,2,3,1];super(i,n,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}},la=class s extends We{constructor(t=1,e=.4,i=12,n=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:n,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),n=Math.floor(n);let l=[],c=[],h=[],d=[],u=new k,f=new k,g=new k;for(let x=0;x<=i;x++){let m=a+x/i*o;for(let p=0;p<=n;p++){let v=p/n*r;f.x=(t+e*Math.cos(m))*Math.cos(v),f.y=(t+e*Math.cos(m))*Math.sin(v),f.z=e*Math.sin(m),c.push(f.x,f.y,f.z),u.x=t*Math.cos(v),u.y=t*Math.sin(v),g.subVectors(f,u).normalize(),h.push(g.x,g.y,g.z),d.push(p/n),d.push(x/i)}}for(let x=1;x<=i;x++)for(let m=1;m<=n;m++){let p=(n+1)*x+m-1,v=(n+1)*(x-1)+m-1,E=(n+1)*(x-1)+m,y=(n+1)*x+m;l.push(p,v,y),l.push(v,E,y)}this.setIndex(l),this.setAttribute("position",new Jt(c,3)),this.setAttribute("normal",new Jt(h,3)),this.setAttribute("uv",new Jt(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function Cs(s){let t={};for(let e in s){t[e]={};for(let i in s[e]){let n=s[e][i];if(Bd(n))n.isRenderTargetTexture?(Ft("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=n.clone();else if(Array.isArray(n))if(Bd(n[0])){let r=[];for(let a=0,o=n.length;a<o;a++)r[a]=n[a].clone();t[e][i]=r}else t[e][i]=n.slice();else t[e][i]=n}}return t}function oi(s){let t={};for(let e=0;e<s.length;e++){let i=Cs(s[e]);for(let n in i)t[n]=i[n]}return t}function Bd(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function w0(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Yh(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Qt.workingColorSpace}var Sa={clone:Cs,merge:oi},E0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,T0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Fe=class extends bs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=E0,this.fragmentShader=T0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Cs(t.uniforms),this.uniformsGroups=w0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let n in this.uniforms){let a=this.uniforms[n].value;a&&a.isTexture?e.uniforms[n]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[n]={type:"m4",value:a.toArray()}:e.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let n=t.uniforms[i];switch(this.uniforms[i]={},n.type){case"t":this.uniforms[i].value=e[n.value]||null;break;case"c":this.uniforms[i].value=new Yt().setHex(n.value);break;case"v2":this.uniforms[i].value=new qt().fromArray(n.value);break;case"v3":this.uniforms[i].value=new k().fromArray(n.value);break;case"v4":this.uniforms[i].value=new _e().fromArray(n.value);break;case"m3":this.uniforms[i].value=new Ht().fromArray(n.value);break;case"m4":this.uniforms[i].value=new Gt().fromArray(n.value);break;default:this.uniforms[i].value=n.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Co=class extends Fe{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Po=class extends bs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=gf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Io=class extends bs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function rr(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function fh(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}var jn=class{constructor(t,e,i,n){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=n!==void 0?n:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,n=e[i],r=e[i-1];i:{t:{let a;e:{n:if(!(t<n)){for(let o=i+2;;){if(n===void 0){if(t<r)break n;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=n,n=e[++i],t<n)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(n=r,r=e[--i-1],t>=r)break t}a=i,i=0;break e}break i}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(n=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,n)}return this.interpolate_(i,r,t,n)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,n=this.valueSize,r=t*n;for(let a=0;a!==n;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Lo=class extends jn{constructor(t,e,i,n){super(t,e,i,n),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:gh,endingEnd:gh}}intervalChanged_(t,e,i){let n=this.parameterPositions,r=t-2,a=t+1,o=n[r],l=n[a];if(o===void 0)switch(this.getSettings_().endingStart){case xh:r=t,o=2*e-i;break;case vh:r=n.length-2,o=e+n[r]-n[r+1];break;default:r=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case xh:a=t,l=2*i-e;break;case vh:a=1,l=i+n[1]-n[0];break;default:a=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(i-e)/(n-e),x=g*g,m=x*g,p=-u*m+2*u*x-u*g,v=(1+u)*m+(-1.5-2*u)*x+(-.5+u)*g+1,E=(-1-f)*m+(1.5+f)*x+.5*g,y=f*m-f*x;for(let S=0;S!==o;++S)r[S]=p*a[h+S]+v*a[c+S]+E*a[l+S]+y*a[d+S];return r}},ko=class extends jn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(i-e)/(n-e),d=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*d+a[l+u]*h;return r}},No=class extends jn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t){return this.copySampleValue_(t-1)}},Do=class extends jn{interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let g=(i-e)/(n-e),x=1-g;for(let m=0;m!==o;++m)r[m]=a[c+m]*x+a[l+m]*g;return r}let u=o*2,f=t-1;for(let g=0;g!==o;++g){let x=a[c+g],m=a[l+g],p=f*u+g*2,v=d[p],E=d[p+1],y=t*u+g*2,S=h[y],M=h[y+1],R=R0(i,e,v,S,n);r[g]=If(R,x,E,M,m)}return r}};function If(s,t,e,i,n){let r=1-s;return r*r*r*t+3*r*r*s*e+3*r*s*s*i+s*s*s*n}function A0(s,t,e,i,n){let r=1-s;return 3*r*r*(e-t)+6*r*s*(i-e)+3*s*s*(n-i)}function R0(s,t,e,i,n){let r=(s-t)/(n-t);for(let a=0;a<8;a++){let o=If(r,t,e,i,n)-s;if(Math.abs(o)<1e-10)break;let l=A0(r,t,e,i,n);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var Pi=class{constructor(t,e,i,n){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=rr(e,this.TimeBufferType),this.values=rr(i,this.ValueBufferType),this.setInterpolation(n||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:rr(t.times,Array),values:rr(t.values,Array)};let n=t.getInterpolation();n!==t.DefaultInterpolation&&(i.interpolation=n),fh(t.settings)&&(i.settings={inTangents:rr(t.settings.inTangents,Array),outTangents:rr(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new No(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new ko(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Lo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Do(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Kr:e=this.InterpolantFactoryMethodDiscrete;break;case Mo:e=this.InterpolantFactoryMethodLinear;break;case ho:e=this.InterpolantFactoryMethodSmooth;break;case mh:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ft("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Kr;case this.InterpolantFactoryMethodLinear:return Mo;case this.InterpolantFactoryMethodSmooth:return ho;case this.InterpolantFactoryMethodBezier:return mh}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,n=e.length;i!==n;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,n=e.length;i!==n;++i)e[i]*=t;fh(this.settings)&&(zd(this.settings.inTangents,t),zd(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,n=i.length,r=0,a=n-1;for(;r!==n&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==n){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Bt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,n=this.values,r=i.length;r===0&&(Bt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Bt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Bt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(n!==void 0&&n0(n))for(let o=0,l=n.length;o!==l;++o){let c=n[o];if(isNaN(c)){Bt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),n=this.getInterpolation()===ho,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(n)l=!0;else{let d=o*i,u=d-i,f=d+i;for(let g=0;g!==i;++g){let x=e[d+g];if(x!==e[u+g]||x!==e[f+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*i,u=a*i;for(let f=0;f!==i;++f)e[u+f]=e[d+f]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,n=new i(this.name,t,e);return n.createInterpolant=this.createInterpolant,fh(this.settings)&&(n.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),n}};function zd(s,t){for(let e=0,i=s.length;e!==i;e+=2)s[e]*=t}Pi.prototype.ValueTypeName="";Pi.prototype.TimeBufferType=Float32Array;Pi.prototype.ValueBufferType=Float32Array;Pi.prototype.DefaultInterpolation=Mo;var Qn=class extends Pi{constructor(t,e,i){super(t,e,i)}};Qn.prototype.ValueTypeName="bool";Qn.prototype.ValueBufferType=Array;Qn.prototype.DefaultInterpolation=Kr;Qn.prototype.InterpolantFactoryMethodLinear=void 0;Qn.prototype.InterpolantFactoryMethodSmooth=void 0;var Oo=class extends Pi{constructor(t,e,i,n){super(t,e,i,n)}};Oo.prototype.ValueTypeName="color";var Uo=class extends Pi{constructor(t,e,i,n){super(t,e,i,n)}};Uo.prototype.ValueTypeName="number";var Fo=class extends jn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-e)/(n-e),c=t*o;for(let h=c+o;c!==h;c+=4)Ge.slerpFlat(r,0,a,c-o,a,c,l);return r}},ca=class extends Pi{constructor(t,e,i,n){super(t,e,i,n)}InterpolantFactoryMethodLinear(t){return new Fo(this.times,this.values,this.getValueSize(),t)}};ca.prototype.ValueTypeName="quaternion";ca.prototype.InterpolantFactoryMethodSmooth=void 0;var ts=class extends Pi{constructor(t,e,i){super(t,e,i)}};ts.prototype.ValueTypeName="string";ts.prototype.ValueBufferType=Array;ts.prototype.DefaultInterpolation=Kr;ts.prototype.InterpolantFactoryMethodLinear=void 0;ts.prototype.InterpolantFactoryMethodSmooth=void 0;var Bo=class extends Pi{constructor(t,e,i,n){super(t,e,i,n)}};Bo.prototype.ValueTypeName="vector";var zo=class{constructor(t,e,i){let n=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&n.onStart!==void 0&&n.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,n.onProgress!==void 0&&n.onProgress(h,a,o),a===o&&(r=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(h){n.onError!==void 0&&n.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Lf=new zo,Ho=class{constructor(t){this.manager=t!==void 0?t:Lf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(n,r){i.load(t,n,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Ho.DEFAULT_MATERIAL_NAME="__DEFAULT";var Vo=class extends fi{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Yt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}};var ph=new Gt,Hd=new k,Vd=new k,Go=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new qt(512,512),this.mapType=Ei,this.map=null,this.mapPass=null,this.matrix=new Gt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new mr,this._frameExtents=new qt(1,1),this._viewportCount=1,this._viewports=[new _e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Hd.setFromMatrixPosition(t.matrixWorld),e.position.copy(Hd),Vd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Vd),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,n){ph.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(ph,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=n?n.z/r.x:1,o=n?n.w/r.y:1,l=n?n.x/r.x:0,c=n?n.y/r.y:0;t.coordinateSystem===hr||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(ph)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},lo=new k,co=new Ge,pn=new k,ha=class extends fi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Gt,this.projectionMatrix=new Gt,this.projectionMatrixInverse=new Gt,this.coordinateSystem=ji,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(lo,co,pn),pn.x===1&&pn.y===1&&pn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(lo,co,pn.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(lo,co,pn),pn.x===1&&pn.y===1&&pn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(lo,co,pn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},qn=new k,Gd=new qt,Wd=new qt,ri=class extends ha{constructor(t=50,e=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=So*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Xc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return So*2*Math.atan(Math.tan(Xc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){qn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(qn.x,qn.y).multiplyScalar(-t/qn.z),qn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(qn.x,qn.y).multiplyScalar(-t/qn.z)}getViewSize(t,e){return this.getViewBounds(t,Gd,Wd),e.subVectors(Wd,Gd)}setViewOffset(t,e,i,n,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Xc*.5*this.fov)/this.zoom,i=2*e,n=this.aspect*i,r=-.5*n,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*n/l,e-=a.offsetY*i/c,n*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var xr=class extends ha{constructor(t=-1,e=1,i=1,n=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=n,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,n,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2,r=i-t,a=i+t,o=n+e,l=n-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},yh=class extends Go{constructor(){super(new xr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ua=class extends Vo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(fi.DEFAULT_UP),this.updateMatrix(),this.target=new fi,this.shadow=new yh}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var da=class extends We{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){let t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}};var ar=-90,or=1,Wo=class extends fi{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let n=new ri(ar,or,t,e);n.layers=this.layers,this.add(n);let r=new ri(ar,or,t,e);r.layers=this.layers,this.add(r);let a=new ri(ar,or,t,e);a.layers=this.layers,this.add(a);let o=new ri(ar,or,t,e);o.layers=this.layers,this.add(o);let l=new ri(ar,or,t,e);l.layers=this.layers,this.add(l);let c=new ri(ar,or,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,n,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===ji)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===hr)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},$o=class extends ri{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Kh="\\[\\]\\.:\\/",C0=new RegExp("["+Kh+"]","g"),Zh="[^"+Kh+"]",P0="[^"+Kh.replace("\\.","")+"]",I0=/((?:WC+[\/:])*)/.source.replace("WC",Zh),L0=/(WCOD+)?/.source.replace("WCOD",P0),k0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Zh),N0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Zh),D0=new RegExp("^"+I0+L0+k0+N0+"$"),O0=["material","materials","bones","map"],bh=class{constructor(t,e,i){let n=i||Ae.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,n)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,n=this._bindings[i];n!==void 0&&n.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let n=this._targetGroup.nCachedObjects_,r=i.length;n!==r;++n)i[n].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},Ae=class s{constructor(t,e,i){this.path=e,this.parsedPath=i||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,i):new s(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(C0,"")}static parseTrackName(t){let e=D0.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},n=i.nodeName&&i.nodeName.lastIndexOf(".");if(n!==void 0&&n!==-1){let r=i.nodeName.substring(n+1);O0.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,n),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=i(o.children);if(l)return l}return null},n=i(t.children);if(n)return n}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)t[e++]=i[n]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,n=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Ft("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){Bt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Bt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Bt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Bt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Bt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Bt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){Bt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[n];if(a===void 0){let c=e.nodeName;Bt("PropertyBinding: Trying to update property for track: "+c+"."+n+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(n==="morphTargetInfluences"){if(!t.geometry){Bt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Bt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=n;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ae.Composite=bh;Ae.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ae.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ae.prototype.GetterByBindingType=[Ae.prototype._getValue_direct,Ae.prototype._getValue_array,Ae.prototype._getValue_arrayElement,Ae.prototype._getValue_toArray];Ae.prototype.SetterByBindingTypeAndVersioning=[[Ae.prototype._setValue_direct,Ae.prototype._setValue_direct_setNeedsUpdate,Ae.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_array,Ae.prototype._setValue_array_setNeedsUpdate,Ae.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_arrayElement,Ae.prototype._setValue_arrayElement_setNeedsUpdate,Ae.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_fromArray,Ae.prototype._setValue_fromArray_setNeedsUpdate,Ae.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var o1=new Float32Array(1);var iu=class iu{constructor(t,e,i,n){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,n)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,n){let r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=n,this}};iu.prototype.isMatrix2=!0;var _h=iu;function Jh(s,t,e,i){let n=U0(i);switch(e){case Vh:return s*t;case Qo:return s*t/n.components*n.byteLength;case tl:return s*t/n.components*n.byteLength;case ss:return s*t*2/n.components*n.byteLength;case el:return s*t*2/n.components*n.byteLength;case Gh:return s*t*3/n.components*n.byteLength;case mi:return s*t*4/n.components*n.byteLength;case il:return s*t*4/n.components*n.byteLength;case ga:case xa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case va:case ya:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case sl:case al:return Math.max(s,16)*Math.max(t,8)/4;case nl:case rl:return Math.max(s,8)*Math.max(t,8)/2;case ol:case ll:case hl:case ul:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case cl:case ba:case dl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case fl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case pl:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case ml:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case gl:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case xl:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case vl:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case yl:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case bl:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case _l:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Ml:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Sl:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case wl:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case El:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Tl:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Al:case Rl:case Cl:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Pl:case Il:return Math.ceil(s/4)*Math.ceil(t/4)*8;case _a:case Ll:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function U0(s){switch(s){case Ei:case Fh:return{byteLength:1,components:1};case br:case Bh:case en:return{byteLength:2,components:1};case Jo:case jo:return{byteLength:2,components:4};case tn:case Zo:case pi:return{byteLength:4,components:1};case zh:case Hh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ft("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function tp(){let s=null,t=!1,e=null,i=null;function n(r,a){i=s.requestAnimationFrame(n),e(r,a)}return{start:function(){t!==!0&&e!==null&&s!==null&&(i=s.requestAnimationFrame(n),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function B0(s){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){let h=l.array,d=l.updateRanges;if(s.bindBuffer(c,o),d.length===0)s.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){let g=d[u],x=d[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,d[u]=x)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){let x=d[f];s.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:n,remove:r,update:a}}var z0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,H0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,V0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,G0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,W0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,X0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,q0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Y0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,K0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Z0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,J0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,j0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Q0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,tg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,eg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ig=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ng=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,sg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,rg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ag=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,og=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,lg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,cg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,hg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ug=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,dg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,fg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,pg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,mg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,gg="gl_FragColor = linearToOutputTexel( gl_FragColor );",xg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,yg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,bg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,_g=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Mg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Sg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Eg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Tg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ag=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Rg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Cg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Pg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ig=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Lg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,kg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ng=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Dg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Og=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ug=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Fg=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Bg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,zg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Hg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Vg=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Gg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Wg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$g=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,qg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Yg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Kg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Zg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Jg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,jg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Qg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,tx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ex=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ix=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,nx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,rx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ax=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ox=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,cx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,hx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ux=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,dx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,fx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,px=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,gx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,bx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,_x=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Mx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Sx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,wx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ex=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Tx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ax=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Rx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Cx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Px=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ix=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Lx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,kx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Nx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Dx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ox=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ux=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Fx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Bx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,zx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Hx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$x=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,qx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Yx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Kx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Zx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Jx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Qx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ev=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iv=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,rv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,av=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ov=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,lv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,uv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,mv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,yv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Zt={alphahash_fragment:z0,alphahash_pars_fragment:H0,alphamap_fragment:V0,alphamap_pars_fragment:G0,alphatest_fragment:W0,alphatest_pars_fragment:$0,aomap_fragment:X0,aomap_pars_fragment:q0,batching_pars_vertex:Y0,batching_vertex:K0,begin_vertex:Z0,beginnormal_vertex:J0,bsdfs:j0,iridescence_fragment:Q0,bumpmap_pars_fragment:tg,clipping_planes_fragment:eg,clipping_planes_pars_fragment:ig,clipping_planes_pars_vertex:ng,clipping_planes_vertex:sg,color_fragment:rg,color_pars_fragment:ag,color_pars_vertex:og,color_vertex:lg,common:cg,cube_uv_reflection_fragment:hg,defaultnormal_vertex:ug,displacementmap_pars_vertex:dg,displacementmap_vertex:fg,emissivemap_fragment:pg,emissivemap_pars_fragment:mg,colorspace_fragment:gg,colorspace_pars_fragment:xg,envmap_fragment:vg,envmap_common_pars_fragment:yg,envmap_pars_fragment:bg,envmap_pars_vertex:_g,envmap_physical_pars_fragment:Lg,envmap_vertex:Mg,fog_vertex:Sg,fog_pars_vertex:wg,fog_fragment:Eg,fog_pars_fragment:Tg,gradientmap_pars_fragment:Ag,lightmap_pars_fragment:Rg,lights_lambert_fragment:Cg,lights_lambert_pars_fragment:Pg,lights_pars_begin:Ig,lights_toon_fragment:kg,lights_toon_pars_fragment:Ng,lights_phong_fragment:Dg,lights_phong_pars_fragment:Og,lights_physical_fragment:Ug,lights_physical_pars_fragment:Fg,lights_fragment_begin:Bg,lights_fragment_maps:zg,lights_fragment_end:Hg,lightprobes_pars_fragment:Vg,logdepthbuf_fragment:Gg,logdepthbuf_pars_fragment:Wg,logdepthbuf_pars_vertex:$g,logdepthbuf_vertex:Xg,map_fragment:qg,map_pars_fragment:Yg,map_particle_fragment:Kg,map_particle_pars_fragment:Zg,metalnessmap_fragment:Jg,metalnessmap_pars_fragment:jg,morphinstance_vertex:Qg,morphcolor_vertex:tx,morphnormal_vertex:ex,morphtarget_pars_vertex:ix,morphtarget_vertex:nx,normal_fragment_begin:sx,normal_fragment_maps:rx,normal_pars_fragment:ax,normal_pars_vertex:ox,normal_vertex:lx,normalmap_pars_fragment:cx,clearcoat_normal_fragment_begin:hx,clearcoat_normal_fragment_maps:ux,clearcoat_pars_fragment:dx,iridescence_pars_fragment:fx,opaque_fragment:px,packing:mx,premultiplied_alpha_fragment:gx,project_vertex:xx,dithering_fragment:vx,dithering_pars_fragment:yx,roughnessmap_fragment:bx,roughnessmap_pars_fragment:_x,shadowmap_pars_fragment:Mx,shadowmap_pars_vertex:Sx,shadowmap_vertex:wx,shadowmask_pars_fragment:Ex,skinbase_vertex:Tx,skinning_pars_vertex:Ax,skinning_vertex:Rx,skinnormal_vertex:Cx,specularmap_fragment:Px,specularmap_pars_fragment:Ix,tonemapping_fragment:Lx,tonemapping_pars_fragment:kx,transmission_fragment:Nx,transmission_pars_fragment:Dx,uv_pars_fragment:Ox,uv_pars_vertex:Ux,uv_vertex:Fx,worldpos_vertex:Bx,background_vert:zx,background_frag:Hx,backgroundCube_vert:Vx,backgroundCube_frag:Gx,cube_vert:Wx,cube_frag:$x,depth_vert:Xx,depth_frag:qx,distance_vert:Yx,distance_frag:Kx,equirect_vert:Zx,equirect_frag:Jx,linedashed_vert:jx,linedashed_frag:Qx,meshbasic_vert:tv,meshbasic_frag:ev,meshlambert_vert:iv,meshlambert_frag:nv,meshmatcap_vert:sv,meshmatcap_frag:rv,meshnormal_vert:av,meshnormal_frag:ov,meshphong_vert:lv,meshphong_frag:cv,meshphysical_vert:hv,meshphysical_frag:uv,meshtoon_vert:dv,meshtoon_frag:fv,points_vert:pv,points_frag:mv,shadow_vert:gv,shadow_frag:xv,sprite_vert:vv,sprite_frag:yv},ct={common:{diffuse:{value:new Yt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new qt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new k},probesMax:{value:new k},probesResolution:{value:new k}},points:{diffuse:{value:new Yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new Yt(16777215)},opacity:{value:1},center:{value:new qt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},Sn={basic:{uniforms:oi([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.fog]),vertexShader:Zt.meshbasic_vert,fragmentShader:Zt.meshbasic_frag},lambert:{uniforms:oi([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new Yt(0)},envMapIntensity:{value:1}}]),vertexShader:Zt.meshlambert_vert,fragmentShader:Zt.meshlambert_frag},phong:{uniforms:oi([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new Yt(0)},specular:{value:new Yt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphong_vert,fragmentShader:Zt.meshphong_frag},standard:{uniforms:oi([ct.common,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.roughnessmap,ct.metalnessmap,ct.fog,ct.lights,{emissive:{value:new Yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag},toon:{uniforms:oi([ct.common,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.gradientmap,ct.fog,ct.lights,{emissive:{value:new Yt(0)}}]),vertexShader:Zt.meshtoon_vert,fragmentShader:Zt.meshtoon_frag},matcap:{uniforms:oi([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,{matcap:{value:null}}]),vertexShader:Zt.meshmatcap_vert,fragmentShader:Zt.meshmatcap_frag},points:{uniforms:oi([ct.points,ct.fog]),vertexShader:Zt.points_vert,fragmentShader:Zt.points_frag},dashed:{uniforms:oi([ct.common,ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Zt.linedashed_vert,fragmentShader:Zt.linedashed_frag},depth:{uniforms:oi([ct.common,ct.displacementmap]),vertexShader:Zt.depth_vert,fragmentShader:Zt.depth_frag},normal:{uniforms:oi([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,{opacity:{value:1}}]),vertexShader:Zt.meshnormal_vert,fragmentShader:Zt.meshnormal_frag},sprite:{uniforms:oi([ct.sprite,ct.fog]),vertexShader:Zt.sprite_vert,fragmentShader:Zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Zt.background_vert,fragmentShader:Zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht}},vertexShader:Zt.backgroundCube_vert,fragmentShader:Zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Zt.cube_vert,fragmentShader:Zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Zt.equirect_vert,fragmentShader:Zt.equirect_frag},distance:{uniforms:oi([ct.common,ct.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Zt.distance_vert,fragmentShader:Zt.distance_frag},shadow:{uniforms:oi([ct.lights,ct.fog,{color:{value:new Yt(0)},opacity:{value:1}}]),vertexShader:Zt.shadow_vert,fragmentShader:Zt.shadow_frag}};Sn.physical={uniforms:oi([Sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new qt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new Yt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new qt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new Yt(0)},specularColor:{value:new Yt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new qt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag};var Dl={r:0,b:0,g:0},bv=new Gt,ep=new Ht;ep.set(-1,0,0,0,1,0,0,0,1);function _v(s,t,e,i,n,r){let a=new Yt(0),o=n===!0?0:1,l,c,h=null,d=0,u=null;function f(v){let E=v.isScene===!0?v.background:null;if(E&&E.isTexture){let y=v.backgroundBlurriness>0;E=t.get(E,y)}return E}function g(v){let E=!1,y=f(v);y===null?m(a,o):y&&y.isColor&&(m(y,1),E=!0);let S=s.xr.getEnvironmentBlendMode();S==="additive"?e.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function x(v,E){let y=f(E);y&&(y.isCubeTexture||y.mapping===pa)?(c===void 0&&(c=new ce(new Jn(1,1,1),new Fe({name:"BackgroundCubeMaterial",uniforms:Cs(Sn.backgroundCube.uniforms),vertexShader:Sn.backgroundCube.vertexShader,fragmentShader:Sn.backgroundCube.fragmentShader,side:Je,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(S,M,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(bv.makeRotationFromEuler(E.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(ep),c.material.toneMapped=Qt.getTransfer(y.colorSpace)!==de,(h!==y||d!==y.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=y,d=y.version,u=s.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new ce(new Ui(2,2),new Fe({name:"BackgroundMaterial",uniforms:Cs(Sn.background.uniforms),vertexShader:Sn.background.vertexShader,fragmentShader:Sn.background.fragmentShader,side:bn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=Qt.getTransfer(y.colorSpace)!==de,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=y,d=y.version,u=s.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function m(v,E){v.getRGB(Dl,Yh(s)),e.buffers.color.setClear(Dl.r,Dl.g,Dl.b,E,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,E=1){a.set(v),o=E,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,m(a,o)},render:g,addToRenderList:x,dispose:p}}function Mv(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),i={},n=u(null),r=n,a=!1;function o(P,N,H,L,V){let K=!1,Z=d(P,L,H,N);r!==Z&&(r=Z,c(r.object)),K=f(P,L,H,V),K&&g(P,L,H,V),V!==null&&t.update(V,s.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,y(P,N,H,L),V!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return s.createVertexArray()}function c(P){return s.bindVertexArray(P)}function h(P){return s.deleteVertexArray(P)}function d(P,N,H,L){let V=L.wireframe===!0,K=i[N.id];K===void 0&&(K={},i[N.id]=K);let Z=P.isInstancedMesh===!0?P.id:0,j=K[Z];j===void 0&&(j={},K[Z]=j);let X=j[H.id];X===void 0&&(X={},j[H.id]=X);let et=X[V];return et===void 0&&(et=u(l()),X[V]=et),et}function u(P){let N=[],H=[],L=[];for(let V=0;V<e;V++)N[V]=0,H[V]=0,L[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:H,attributeDivisors:L,object:P,attributes:{},index:null}}function f(P,N,H,L){let V=r.attributes,K=N.attributes,Z=0,j=H.getAttributes();for(let X in j)if(j[X].location>=0){let nt=V[X],Lt=K[X];if(Lt===void 0&&(X==="instanceMatrix"&&P.instanceMatrix&&(Lt=P.instanceMatrix),X==="instanceColor"&&P.instanceColor&&(Lt=P.instanceColor)),nt===void 0||nt.attribute!==Lt||Lt&&nt.data!==Lt.data)return!0;Z++}return r.attributesNum!==Z||r.index!==L}function g(P,N,H,L){let V={},K=N.attributes,Z=0,j=H.getAttributes();for(let X in j)if(j[X].location>=0){let nt=K[X];nt===void 0&&(X==="instanceMatrix"&&P.instanceMatrix&&(nt=P.instanceMatrix),X==="instanceColor"&&P.instanceColor&&(nt=P.instanceColor));let Lt={};Lt.attribute=nt,nt&&nt.data&&(Lt.data=nt.data),V[X]=Lt,Z++}r.attributes=V,r.attributesNum=Z,r.index=L}function x(){let P=r.newAttributes;for(let N=0,H=P.length;N<H;N++)P[N]=0}function m(P){p(P,0)}function p(P,N){let H=r.newAttributes,L=r.enabledAttributes,V=r.attributeDivisors;H[P]=1,L[P]===0&&(s.enableVertexAttribArray(P),L[P]=1),V[P]!==N&&(s.vertexAttribDivisor(P,N),V[P]=N)}function v(){let P=r.newAttributes,N=r.enabledAttributes;for(let H=0,L=N.length;H<L;H++)N[H]!==P[H]&&(s.disableVertexAttribArray(H),N[H]=0)}function E(P,N,H,L,V,K,Z){Z===!0?s.vertexAttribIPointer(P,N,H,V,K):s.vertexAttribPointer(P,N,H,L,V,K)}function y(P,N,H,L){x();let V=L.attributes,K=H.getAttributes(),Z=N.defaultAttributeValues;for(let j in K){let X=K[j];if(X.location>=0){let et=V[j];if(et===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(et=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(et=P.instanceColor)),et!==void 0){let nt=et.normalized,Lt=et.itemSize,At=t.get(et);if(At===void 0)continue;let oe=At.buffer,ne=At.type,rt=At.bytesPerElement,I=ne===s.INT||ne===s.UNSIGNED_INT||et.gpuType===Zo;if(et.isInterleavedBufferAttribute){let Y=et.data,at=Y.stride,yt=et.offset;if(Y.isInstancedInterleavedBuffer){for(let ot=0;ot<X.locationSize;ot++)p(X.location+ot,Y.meshPerAttribute);P.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let ot=0;ot<X.locationSize;ot++)m(X.location+ot);s.bindBuffer(s.ARRAY_BUFFER,oe);for(let ot=0;ot<X.locationSize;ot++)E(X.location+ot,Lt/X.locationSize,ne,nt,at*rt,(yt+Lt/X.locationSize*ot)*rt,I)}else{if(et.isInstancedBufferAttribute){for(let Y=0;Y<X.locationSize;Y++)p(X.location+Y,et.meshPerAttribute);P.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let Y=0;Y<X.locationSize;Y++)m(X.location+Y);s.bindBuffer(s.ARRAY_BUFFER,oe);for(let Y=0;Y<X.locationSize;Y++)E(X.location+Y,Lt/X.locationSize,ne,nt,Lt*rt,Lt/X.locationSize*Y*rt,I)}}else if(Z!==void 0){let nt=Z[j];if(nt!==void 0)switch(nt.length){case 2:s.vertexAttrib2fv(X.location,nt);break;case 3:s.vertexAttrib3fv(X.location,nt);break;case 4:s.vertexAttrib4fv(X.location,nt);break;default:s.vertexAttrib1fv(X.location,nt)}}}}v()}function S(){T();for(let P in i){let N=i[P];for(let H in N){let L=N[H];for(let V in L){let K=L[V];for(let Z in K)h(K[Z].object),delete K[Z];delete L[V]}}delete i[P]}}function M(P){if(i[P.id]===void 0)return;let N=i[P.id];for(let H in N){let L=N[H];for(let V in L){let K=L[V];for(let Z in K)h(K[Z].object),delete K[Z];delete L[V]}}delete i[P.id]}function R(P){for(let N in i){let H=i[N];for(let L in H){let V=H[L];if(V[P.id]===void 0)continue;let K=V[P.id];for(let Z in K)h(K[Z].object),delete K[Z];delete V[P.id]}}}function b(P){for(let N in i){let H=i[N],L=P.isInstancedMesh===!0?P.id:0,V=H[L];if(V!==void 0){for(let K in V){let Z=V[K];for(let j in Z)h(Z[j].object),delete Z[j];delete V[K]}delete H[L],Object.keys(H).length===0&&delete i[N]}}}function T(){A(),a=!0,r!==n&&(r=n,c(r.object))}function A(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:T,resetDefaultState:A,dispose:S,releaseStatesOfGeometry:M,releaseStatesOfObject:b,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:m,disableUnusedAttributes:v}}function Sv(s,t,e){let i;function n(l){i=l}function r(l,c){s.drawArrays(i,l,c),e.update(c,i,1)}function a(l,c,h){h!==0&&(s.drawArraysInstanced(i,l,c,h),e.update(c,i,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];e.update(u,i,1)}this.setMode=n,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function wv(s,t,e,i){let n;function r(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(R){return!(R!==mi&&i.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){let b=R===en&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Ei&&R!==pi&&!b&&i.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Ft("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Ft("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),v=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),E=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),S=s.getParameter(s.MAX_SAMPLES),M=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:v,maxVaryings:E,maxFragmentUniforms:y,maxSamples:S,samples:M}}function Ev(s){let t=this,e=null,i=0,n=!1,r=!1,a=new Ji,o=new Ht,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||i!==0||n;return n=u,i=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,p=s.get(d);if(!n||g===null||g.length===0||r&&!m)r?h(null):c();else{let v=r?0:i,E=v*4,y=p.clippingState||null;l.value=y,y=h(g,u,E,f);for(let S=0;S!==E;++S)y[S]=e[S];p.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(d,u,f,g){let x=d!==null?d.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let p=f+x*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let E=0,y=f;E!==x;++E,y+=4)a.copy(d[E]).applyMatrix4(v,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}var Sr=4,Tv=6,Av=20,Rv=256,wa=new xr,kf=new Yt,nu=null,su=0,ru=0,au=!1,Cv=new k,Ps=new k,Ul=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,n=100,r={}){let{size:a=256,position:o=Cv}=r;nu=this._renderer.getRenderTarget(),su=this._renderer.getActiveCubeFace(),ru=this._renderer.getActiveMipmapLevel(),au=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,n,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Of(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Df(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(nu,su,ru),this._renderer.xr.enabled=au,t.scissorTest=!1,Mr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===es||t.mapping===Rs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),nu=this._renderer.getRenderTarget(),su=this._renderer.getActiveCubeFace(),ru=this._renderer.getActiveMipmapLevel(),au=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Ze,minFilter:Ze,generateMipmaps:!1,type:en,format:mi,colorSpace:vs,depthBuffer:!1},n=Nf(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Nf(t,e,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Pv(r)),this._blurMaterial=Lv(r,t,e),this._ggxMaterial=Iv(r,t,e)}return n}_compileMaterial(t){let e=new ce(new We,t);this._renderer.compile(e,wa)}_sceneToCubeUV(t,e,i,n,r){let l=new ri(90,1,e,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(kf),d.toneMapping=Qi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(n),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ce(new Jn,new _s({name:"PMREM.Background",side:Je,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,m=x.material,p=!1,v=t.background;v?v.isColor&&(m.color.copy(v),t.background=null,p=!0):(m.color.copy(kf),p=!0);for(let E=0;E<6;E++){let y=E%3;y===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[E],r.y,r.z)):y===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[E]));let S=this._cubeSize;Mr(n,y*S,E>2?S:0,S,S),d.setRenderTarget(n),p&&d.render(x,l),d.render(t,l)}d.toneMapping=f,d.autoClear=u,t.background=v}_textureToCubeUV(t,e){let i=this._renderer,n=t.mapping===es||t.mapping===Rs;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Of()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Df());let r=n?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;Mr(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,wa)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let n=this._lodMeshes.length;for(let r=1;r<n;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){let n=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms,c=i/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,f=d*u,{_lodMax:g}=this,x=this._sizeLods[i],m=3*x*(i>g-Sr?i-g+Sr:0),p=4*(this._cubeSize-x);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=g-e,Mr(r,m,p,3*x,2*x),n.setRenderTarget(r),n.render(o,wa),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-i,Mr(t,m,p,3*x,2*x),n.setRenderTarget(t),n.render(o,wa)}_blur(t,e,i,n){let r=this._pingPongRenderTarget,a=Math.min(n,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,i,a),this._blurPass(r,t,i,i,a)}_blurPass(t,e,i,n,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[n];l.material=o;let c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;let h=this._sizeLods[n],d=3*h*(n>this._lodMax-Sr?n-this._lodMax+Sr:0),u=4*(this._cubeSize-h);Mr(e,d,u,3*h,2*h),a.setRenderTarget(e),a.render(l,wa)}};function Pv(s){let t=[],e=[],i=s,n=s-Sr+1+Tv;for(let r=0;r<n;r++){let a=Math.pow(2,i);t.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,g=new Float32Array(f*u*d),x=new Float32Array(f*u*d);for(let p=0;p<d;p++){let v=p%3*2/3-1,E=p>2?0:-1,y=[v,E,0,v+2/3,E,0,v+2/3,E+1,0,v,E,0,v+2/3,E+1,0,v,E+1,0];g.set(y,f*u*p);for(let S=0;S<u;S++){let M=h[S*2]*2-1,R=h[S*2+1]*2-1;p===0?Ps.set(1,R,M):p===1?Ps.set(-M,1,-R):p===2?Ps.set(-M,R,1):p===3?Ps.set(-1,R,-M):p===4?Ps.set(-M,-1,R):Ps.set(M,R,-1),Ps.toArray(x,(p*u+S)*f)}}let m=new We;m.setAttribute("position",new Ci(g,f)),m.setAttribute("outputDirection",new Ci(x,f)),e.push(new ce(m,null)),i>Sr&&i--}return{lodMeshes:e,sizeLods:t}}function Nf(s,t,e){let i=new ai(s,t,e);return i.texture.mapping=pa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Mr(s,t,e,i,n){s.viewport.set(t,e,i,n),s.scissor.set(t,e,i,n)}function Iv(s,t,e){return new Fe({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Rv,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:zl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:_n,depthTest:!1,depthWrite:!1})}function Lv(s,t,e){return new Fe({name:"SphericalGaussianBlur",defines:{SAMPLES:Av,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:zl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:_n,depthTest:!1,depthWrite:!1})}function Df(){return new Fe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:_n,depthTest:!1,depthWrite:!1})}function Of(){return new Fe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:_n,depthTest:!1,depthWrite:!1})}function zl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Fl=class extends ai{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},n=[i,i,i,i,i,i];this.texture=new na(n),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new Jn(5,5,5),r=new Fe({name:"CubemapFromEquirect",uniforms:Cs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Je,blending:_n});r.uniforms.tEquirect.value=e;let a=new ce(n,r),o=e.minFilter;return e.minFilter===is&&(e.minFilter=Ze),new Wo(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,n=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,n);t.setRenderTarget(r)}};function kv(s){let t=new WeakMap,e=new WeakMap,i=null;function n(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===qo||f===Yo)if(t.has(u)){let g=t.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let x=new Fl(g.height);return x.fromEquirectangularTexture(s,u),t.set(u,x),u.addEventListener("dispose",c),o(x.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let f=u.mapping,g=f===qo||f===Yo,x=f===es||f===Rs;if(g||x){let m=e.get(u),p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return i===null&&(i=new Ul(s)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{let v=u.image;return g&&v&&v.height>0||x&&v&&l(v)?(i===null&&(i=new Ul(s)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,f){return f===qo?u.mapping=es:f===Yo&&(u.mapping=Rs),u}function l(u){let f=0,g=6;for(let x=0;x<g;x++)u[x]!==void 0&&f++;return f===g}function c(u){let f=u.target;f.removeEventListener("dispose",c);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function d(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:n,dispose:d}}function Nv(s){let t={};function e(i){if(t[i]!==void 0)return t[i];let n=s.getExtension(i);return t[i]=n,n}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let n=e(i);return n===null&&xs("WebGLRenderer: "+i+" extension not supported."),n}}}function Dv(s,t,e,i){let n={},r=new WeakMap;function a(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete n[u.id];let f=r.get(u);f&&(t.remove(f),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return n[u.id]===!0||(u.addEventListener("dispose",a),n[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)t.update(u[f],s.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,g=d.attributes.position,x=0;if(g===void 0)return;if(f!==null){let v=f.array;x=f.version;for(let E=0,y=v.length;E<y;E+=3){let S=v[E+0],M=v[E+1],R=v[E+2];u.push(S,M,M,R,R,S)}}else{let v=g.array;x=g.version;for(let E=0,y=v.length/3-1;E<y;E+=3){let S=E+0,M=E+1,R=E+2;u.push(S,M,M,R,R,S)}}let m=new(g.count>=65535?ia:ea)(u,1);m.version=x;let p=r.get(d);p&&t.remove(p),r.set(d,m)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function Ov(s,t,e){let i;function n(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){s.drawElements(i,u,r,d*a),e.update(u,i,1)}function c(d,u,f){f!==0&&(s.drawElementsInstanced(i,u,r,d*a,f),e.update(u,i,f))}function h(d,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,d,0,f);let x=0;for(let m=0;m<f;m++)x+=u[m];e.update(x,i,1)}this.setMode=n,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Uv(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:Bt("WebGLInfo: Unknown draw mode:",a);break}}function n(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:n,update:i}}function Fv(s,t,e){let i=new WeakMap,n=new _e;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=i.get(o);if(u===void 0||u.count!==d){let T=function(){R.dispose(),i.delete(o),o.removeEventListener("dispose",T)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],E=0;f===!0&&(E=1),g===!0&&(E=2),x===!0&&(E=3);let y=o.attributes.position.count*E,S=1;y>t.maxTextureSize&&(S=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let M=new Float32Array(y*S*4*d),R=new jr(M,y,S,d);R.type=pi,R.needsUpdate=!0;let b=E*4;for(let A=0;A<d;A++){let P=m[A],N=p[A],H=v[A],L=y*S*4*A;for(let V=0;V<P.count;V++){let K=V*b;f===!0&&(n.fromBufferAttribute(P,V),M[L+K+0]=n.x,M[L+K+1]=n.y,M[L+K+2]=n.z,M[L+K+3]=0),g===!0&&(n.fromBufferAttribute(N,V),M[L+K+4]=n.x,M[L+K+5]=n.y,M[L+K+6]=n.z,M[L+K+7]=0),x===!0&&(n.fromBufferAttribute(H,V),M[L+K+8]=n.x,M[L+K+9]=n.y,M[L+K+10]=n.z,M[L+K+11]=H.itemSize===4?n.w:1)}}u={count:d,texture:R,size:new qt(y,S)},i.set(o,u),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function Bv(s,t,e,i,n){let r=new WeakMap;function a(c){let h=n.render.frame,d=c.geometry,u=t.get(c,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var zv={[Ph]:"LINEAR_TONE_MAPPING",[Ih]:"REINHARD_TONE_MAPPING",[Lh]:"CINEON_TONE_MAPPING",[kh]:"ACES_FILMIC_TONE_MAPPING",[Dh]:"AGX_TONE_MAPPING",[Oh]:"NEUTRAL_TONE_MAPPING",[Nh]:"CUSTOM_TONE_MAPPING"};function Hv(s,t,e,i,n,r){let a=new ai(t,e,{type:s,depthBuffer:n,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new We;c.setAttribute("position",new Jt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Jt([0,2,0,0,2,0],2));let h=new Co({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new ce(c,h),u=new xr(-1,1,1,-1,0,1),f=null,g=null,x=!1,m,p=null,v=[],E=!1;this.setSize=function(y,S){a.setSize(y,S),o!==null&&o.setSize(y,S),l!==null&&l.setSize(y,S);for(let M=0;M<v.length;M++){let R=v[M];R.setSize&&R.setSize(y,S)}},this.setEffects=function(y){v=y,E=v.length>0&&v[0].isRenderPass===!0;let S=a.width,M=a.height;v.length>0&&o===null&&(o=new ai(S,M,{type:en,depthBuffer:!1,stencilBuffer:!1}),l=new ai(S,M,{type:en,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<v.length;R++){let b=v[R];b.setSize&&b.setSize(S,M)}},this.begin=function(y,S){if(x||y.toneMapping===Qi&&v.length===0)return!1;if(p=S,S!==null){let M=S.width,R=S.height;(a.width!==M||a.height!==R)&&this.setSize(M,R)}return E===!1&&y.setRenderTarget(a),m=y.toneMapping,y.toneMapping=Qi,!0},this.hasRenderPass=function(){return E},this.end=function(y,S){y.toneMapping=m,x=!0;let M=a,R=o;for(let b=0;b<v.length;b++){let T=v[b];T.enabled!==!1&&(T.render(y,R,M,S),T.needsSwap!==!1&&(M=R,R=R===o?l:o))}if(f!==y.outputColorSpace||g!==y.toneMapping){f=y.outputColorSpace,g=y.toneMapping,h.defines={},Qt.getTransfer(f)===de&&(h.defines.SRGB_TRANSFER="");let b=zv[g];b&&(h.defines[b]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=M.texture,y.setRenderTarget(p),y.render(d,u),p=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var ip=new di,cu=new Zn(1,1),np=new jr,sp=new To,rp=new na,Uf=[],Ff=[],Bf=new Float32Array(16),zf=new Float32Array(9),Hf=new Float32Array(4);function Er(s,t,e){let i=s[0];if(i<=0||i>0)return s;let n=t*e,r=Uf[n];if(r===void 0&&(r=new Float32Array(n),Uf[n]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function $e(s,t){if(s.length!==t.length)return!1;for(let e=0,i=s.length;e<i;e++)if(s[e]!==t[e])return!1;return!0}function Xe(s,t){for(let e=0,i=t.length;e<i;e++)s[e]=t[e]}function Hl(s,t){let e=Ff[t];e===void 0&&(e=new Int32Array(t),Ff[t]=e);for(let i=0;i!==t;++i)e[i]=s.allocateTextureUnit();return e}function Vv(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Gv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if($e(e,t))return;s.uniform2fv(this.addr,t),Xe(e,t)}}function Wv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if($e(e,t))return;s.uniform3fv(this.addr,t),Xe(e,t)}}function $v(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if($e(e,t))return;s.uniform4fv(this.addr,t),Xe(e,t)}}function Xv(s,t){let e=this.cache,i=t.elements;if(i===void 0){if($e(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Xe(e,t)}else{if($e(e,i))return;Hf.set(i),s.uniformMatrix2fv(this.addr,!1,Hf),Xe(e,i)}}function qv(s,t){let e=this.cache,i=t.elements;if(i===void 0){if($e(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Xe(e,t)}else{if($e(e,i))return;zf.set(i),s.uniformMatrix3fv(this.addr,!1,zf),Xe(e,i)}}function Yv(s,t){let e=this.cache,i=t.elements;if(i===void 0){if($e(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Xe(e,t)}else{if($e(e,i))return;Bf.set(i),s.uniformMatrix4fv(this.addr,!1,Bf),Xe(e,i)}}function Kv(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Zv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if($e(e,t))return;s.uniform2iv(this.addr,t),Xe(e,t)}}function Jv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if($e(e,t))return;s.uniform3iv(this.addr,t),Xe(e,t)}}function jv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if($e(e,t))return;s.uniform4iv(this.addr,t),Xe(e,t)}}function Qv(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function ty(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if($e(e,t))return;s.uniform2uiv(this.addr,t),Xe(e,t)}}function ey(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if($e(e,t))return;s.uniform3uiv(this.addr,t),Xe(e,t)}}function iy(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if($e(e,t))return;s.uniform4uiv(this.addr,t),Xe(e,t)}}function ny(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);let r;this.type===s.SAMPLER_2D_SHADOW?(cu.compareFunction=e.isReversedDepthBuffer()?Nl:kl,r=cu):r=ip,e.setTexture2D(t||r,n)}function sy(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture3D(t||sp,n)}function ry(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTextureCube(t||rp,n)}function ay(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture2DArray(t||np,n)}function oy(s){switch(s){case 5126:return Vv;case 35664:return Gv;case 35665:return Wv;case 35666:return $v;case 35674:return Xv;case 35675:return qv;case 35676:return Yv;case 5124:case 35670:return Kv;case 35667:case 35671:return Zv;case 35668:case 35672:return Jv;case 35669:case 35673:return jv;case 5125:return Qv;case 36294:return ty;case 36295:return ey;case 36296:return iy;case 35678:case 36198:case 36298:case 36306:case 35682:return ny;case 35679:case 36299:case 36307:return sy;case 35680:case 36300:case 36308:case 36293:return ry;case 36289:case 36303:case 36311:case 36292:return ay}}function ly(s,t){s.uniform1fv(this.addr,t)}function cy(s,t){let e=Er(t,this.size,2);s.uniform2fv(this.addr,e)}function hy(s,t){let e=Er(t,this.size,3);s.uniform3fv(this.addr,e)}function uy(s,t){let e=Er(t,this.size,4);s.uniform4fv(this.addr,e)}function dy(s,t){let e=Er(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function fy(s,t){let e=Er(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function py(s,t){let e=Er(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function my(s,t){s.uniform1iv(this.addr,t)}function gy(s,t){s.uniform2iv(this.addr,t)}function xy(s,t){s.uniform3iv(this.addr,t)}function vy(s,t){s.uniform4iv(this.addr,t)}function yy(s,t){s.uniform1uiv(this.addr,t)}function by(s,t){s.uniform2uiv(this.addr,t)}function _y(s,t){s.uniform3uiv(this.addr,t)}function My(s,t){s.uniform4uiv(this.addr,t)}function Sy(s,t,e){let i=this.cache,n=t.length,r=Hl(e,n);$e(i,r)||(s.uniform1iv(this.addr,r),Xe(i,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=cu:a=ip;for(let o=0;o!==n;++o)e.setTexture2D(t[o]||a,r[o])}function wy(s,t,e){let i=this.cache,n=t.length,r=Hl(e,n);$e(i,r)||(s.uniform1iv(this.addr,r),Xe(i,r));for(let a=0;a!==n;++a)e.setTexture3D(t[a]||sp,r[a])}function Ey(s,t,e){let i=this.cache,n=t.length,r=Hl(e,n);$e(i,r)||(s.uniform1iv(this.addr,r),Xe(i,r));for(let a=0;a!==n;++a)e.setTextureCube(t[a]||rp,r[a])}function Ty(s,t,e){let i=this.cache,n=t.length,r=Hl(e,n);$e(i,r)||(s.uniform1iv(this.addr,r),Xe(i,r));for(let a=0;a!==n;++a)e.setTexture2DArray(t[a]||np,r[a])}function Ay(s){switch(s){case 5126:return ly;case 35664:return cy;case 35665:return hy;case 35666:return uy;case 35674:return dy;case 35675:return fy;case 35676:return py;case 5124:case 35670:return my;case 35667:case 35671:return gy;case 35668:case 35672:return xy;case 35669:case 35673:return vy;case 5125:return yy;case 36294:return by;case 36295:return _y;case 36296:return My;case 35678:case 36198:case 36298:case 36306:case 35682:return Sy;case 35679:case 36299:case 36307:return wy;case 35680:case 36300:case 36308:case 36293:return Ey;case 36289:case 36303:case 36311:case 36292:return Ty}}var hu=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=oy(e.type)}},uu=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Ay(e.type)}},du=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let n=this.seq;for(let r=0,a=n.length;r!==a;++r){let o=n[r];o.setValue(t,e[o.id],i)}}},ou=/(\w+)(\])?(\[|\.)?/g;function Vf(s,t){s.seq.push(t),s.map[t.id]=t}function Ry(s,t,e){let i=s.name,n=i.length;for(ou.lastIndex=0;;){let r=ou.exec(i),a=ou.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===n){Vf(e,c===void 0?new hu(o,s,t):new uu(o,s,t));break}else{let d=e.map[o];d===void 0&&(d=new du(o),Vf(e,d)),e=d}}}var wr=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);Ry(o,l,this)}let n=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?n.push(a):r.push(a);n.length>0&&(this.seq=n.concat(r))}setValue(t,e,i,n){let r=this.map[e];r!==void 0&&r.setValue(t,i,n)}setOptional(t,e,i){let n=e[i];n!==void 0&&this.setValue(t,i,n)}static upload(t,e,i,n){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,n)}}static seqWithValue(t,e){let i=[];for(let n=0,r=t.length;n!==r;++n){let a=t[n];a.id in e&&i.push(a)}return i}};function Gf(s,t,e){let i=s.createShader(t);return s.shaderSource(i,e),s.compileShader(i),i}var Cy=37297,Py=0;function Iy(s,t){let e=s.split(`
`),i=[],n=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=n;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}var Wf=new Ht;function Ly(s){Qt._getMatrix(Wf,Qt.workingColorSpace,s);let t=`mat3( ${Wf.elements.map(e=>e.toFixed(4))} )`;switch(Qt.getTransfer(s)){case Zr:return[t,"LinearTransferOETF"];case de:return[t,"sRGBTransferOETF"];default:return Ft("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function $f(s,t,e){let i=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Iy(s.getShaderSource(t),o)}else return r}function ky(s,t){let e=Ly(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var Ny={[Ph]:"Linear",[Ih]:"Reinhard",[Lh]:"Cineon",[kh]:"ACESFilmic",[Dh]:"AgX",[Oh]:"Neutral",[Nh]:"Custom"};function Dy(s,t){let e=Ny[t];return e===void 0?(Ft("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Ol=new k;function Oy(){Qt.getLuminanceCoefficients(Ol);let s=Ol.x.toFixed(4),t=Ol.y.toFixed(4),e=Ol.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Uy(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ta).join(`
`)}function Fy(s){let t=[];for(let e in s){let i=s[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function By(s,t){let e={},i=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){let r=s.getActiveAttrib(t,n),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function Ta(s){return s!==""}function Xf(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function qf(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var zy=/^[ \t]*#include +<([\w\d./]+)>/gm;function fu(s){return s.replace(zy,Vy)}var Hy=new Map;function Vy(s,t){let e=Zt[t];if(e===void 0){let i=Hy.get(t);if(i!==void 0)e=Zt[i],Ft('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return fu(e)}var Gy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yf(s){return s.replace(Gy,Wy)}function Wy(s,t,e,i){let n="";for(let r=parseInt(t);r<parseInt(e);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function Kf(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var $y={[fa]:"SHADOWMAP_TYPE_PCF",[vr]:"SHADOWMAP_TYPE_VSM"};function Xy(s){return $y[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var qy={[es]:"ENVMAP_TYPE_CUBE",[Rs]:"ENVMAP_TYPE_CUBE",[pa]:"ENVMAP_TYPE_CUBE_UV"};function Yy(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":qy[s.envMapMode]||"ENVMAP_TYPE_CUBE"}var Ky={[Rs]:"ENVMAP_MODE_REFRACTION"};function Zy(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":Ky[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Jy={[Ch]:"ENVMAP_BLENDING_MULTIPLY",[ff]:"ENVMAP_BLENDING_MIX",[pf]:"ENVMAP_BLENDING_ADD"};function jy(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":Jy[s.combine]||"ENVMAP_BLENDING_NONE"}function Qy(s){let t=s.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function tb(s,t,e,i){let n=s.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=Xy(e),c=Yy(e),h=Zy(e),d=jy(e),u=Qy(e),f=Uy(e),g=Fy(r),x=n.createProgram(),m,p,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ta).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ta).join(`
`),p.length>0&&(p+=`
`)):(m=[Kf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ta).join(`
`),p=[Kf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Qi?"#define TONE_MAPPING":"",e.toneMapping!==Qi?Zt.tonemapping_pars_fragment:"",e.toneMapping!==Qi?Dy("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Zt.colorspace_pars_fragment,ky("linearToOutputTexel",e.outputColorSpace),Oy(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ta).join(`
`)),a=fu(a),a=Xf(a,e),a=qf(a,e),o=fu(o),o=Xf(o,e),o=qf(o,e),a=Yf(a),o=Yf(o),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Xh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Xh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let E=v+m+a,y=v+p+o,S=Gf(n,n.VERTEX_SHADER,E),M=Gf(n,n.FRAGMENT_SHADER,y);n.attachShader(x,S),n.attachShader(x,M),e.index0AttributeName!==void 0?n.bindAttribLocation(x,0,e.index0AttributeName):e.hasPositionAttribute===!0&&n.bindAttribLocation(x,0,"position"),n.linkProgram(x);function R(P){if(s.debug.checkShaderErrors){let N=n.getProgramInfoLog(x)||"",H=n.getShaderInfoLog(S)||"",L=n.getShaderInfoLog(M)||"",V=N.trim(),K=H.trim(),Z=L.trim(),j=!0,X=!0;if(n.getProgramParameter(x,n.LINK_STATUS)===!1)if(j=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,x,S,M);else{let et=$f(n,S,"vertex"),nt=$f(n,M,"fragment");Bt("WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(x,n.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+V+`
`+et+`
`+nt)}else V!==""?Ft("WebGLProgram: Program Info Log:",V):(K===""||Z==="")&&(X=!1);X&&(P.diagnostics={runnable:j,programLog:V,vertexShader:{log:K,prefix:m},fragmentShader:{log:Z,prefix:p}})}n.deleteShader(S),n.deleteShader(M),b=new wr(n,x),T=By(n,x)}let b;this.getUniforms=function(){return b===void 0&&R(this),b};let T;this.getAttributes=function(){return T===void 0&&R(this),T};let A=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=n.getProgramParameter(x,Cy)),A},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Py++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=S,this.fragmentShader=M,this}var eb=0,pu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let n=this._getShaderCacheForMaterial(t);return n.has(e)===!1&&(n.add(e),e.usedTimes++),n.has(i)===!1&&(n.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new mu(t),e.set(t,i)),i}},mu=class{constructor(t){this.id=eb++,this.code=t,this.usedTimes=0}};function ib(s){return s===ss||s===ba||s===_a}function nb(s,t,e,i,n,r){let a=new Qr,o=new pu,l=new Set,c=[],h=new Map,d=i.logarithmicDepthBuffer,u=i.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(b){return l.add(b),b===0?"uv":`uv${b}`}function x(b,T,A,P,N,H){let L=P.fog,V=N.geometry,K=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?P.environment:null,Z=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,j=t.get(b.envMap||K,Z),X=j&&j.mapping===pa?j.image.height:null,et=f[b.type];b.precision!==null&&(u=i.getMaxPrecision(b.precision),u!==b.precision&&Ft("WebGLProgram.getParameters:",b.precision,"not supported, using",u,"instead."));let nt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Lt=nt!==void 0?nt.length:0,At=0;V.morphAttributes.position!==void 0&&(At=1),V.morphAttributes.normal!==void 0&&(At=2),V.morphAttributes.color!==void 0&&(At=3);let oe,ne,rt,I;if(et){let Se=Sn[et];oe=Se.vertexShader,ne=Se.fragmentShader}else{oe=b.vertexShader,ne=b.fragmentShader;let Se=o.getVertexShaderStage(b),he=o.getFragmentShaderStage(b);o.update(b,Se,he),rt=Se.id,I=he.id}let Y=s.getRenderTarget(),at=s.state.buffers.depth.getReversed(),yt=N.isInstancedMesh===!0,ot=N.isBatchedMesh===!0,Ct=!!b.map,ye=!!b.matcap,Wt=!!j,ee=!!b.aoMap,me=!!b.lightMap,se=!!b.bumpMap&&b.wireframe===!1,Ce=!!b.normalMap,qe=!!b.displacementMap,_i=!!b.emissiveMap,ke=!!b.metalnessMap,ze=!!b.roughnessMap,U=b.anisotropy>0,ei=b.clearcoat>0,ge=b.dispersion>0,C=b.retroreflectivity>0,_=b.iridescence>0,z=b.sheen>0,$=b.transmission>0,J=U&&!!b.anisotropyMap,lt=ei&&!!b.clearcoatMap,ht=ei&&!!b.clearcoatNormalMap,Q=ei&&!!b.clearcoatRoughnessMap,it=_&&!!b.iridescenceMap,ut=_&&!!b.iridescenceThicknessMap,Pt=z&&!!b.sheenColorMap,mt=z&&!!b.sheenRoughnessMap,dt=!!b.specularMap,It=!!b.specularColorMap,Dt=!!b.specularIntensityMap,Xt=$&&!!b.transmissionMap,O=$&&!!b.thicknessMap,ft=!!b.gradientMap,tt=!!b.alphaMap,pt=b.alphaTest>0,vt=!!b.alphaHash,st=!!b.extensions,kt=Qi;b.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(kt=s.toneMapping);let Tt={shaderID:et,shaderType:b.type,shaderName:b.name,vertexShader:oe,fragmentShader:ne,defines:b.defines,customVertexShaderID:rt,customFragmentShaderID:I,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:u,batching:ot,batchingColor:ot&&N._colorsTexture!==null,instancing:yt,instancingColor:yt&&N.instanceColor!==null,instancingMorph:yt&&N.morphTexture!==null,outputColorSpace:Y===null?s.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:Qt.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:Ct,matcap:ye,envMap:Wt,envMapMode:Wt&&j.mapping,envMapCubeUVHeight:X,aoMap:ee,lightMap:me,bumpMap:se,normalMap:Ce,displacementMap:qe,emissiveMap:_i,normalMapObjectSpace:Ce&&b.normalMapType===xf,normalMapTangentSpace:Ce&&b.normalMapType===Wh,packedNormalMap:Ce&&b.normalMapType===Wh&&ib(b.normalMap.format),metalnessMap:ke,roughnessMap:ze,anisotropy:U,anisotropyMap:J,clearcoat:ei,clearcoatMap:lt,clearcoatNormalMap:ht,clearcoatRoughnessMap:Q,dispersion:ge,retroreflection:C,iridescence:_,iridescenceMap:it,iridescenceThicknessMap:ut,sheen:z,sheenColorMap:Pt,sheenRoughnessMap:mt,specularMap:dt,specularColorMap:It,specularIntensityMap:Dt,transmission:$,transmissionMap:Xt,thicknessMap:O,gradientMap:ft,opaque:b.transparent===!1&&b.blending===yr&&b.alphaToCoverage===!1,alphaMap:tt,alphaTest:pt,alphaHash:vt,combine:b.combine,mapUv:Ct&&g(b.map.channel),aoMapUv:ee&&g(b.aoMap.channel),lightMapUv:me&&g(b.lightMap.channel),bumpMapUv:se&&g(b.bumpMap.channel),normalMapUv:Ce&&g(b.normalMap.channel),displacementMapUv:qe&&g(b.displacementMap.channel),emissiveMapUv:_i&&g(b.emissiveMap.channel),metalnessMapUv:ke&&g(b.metalnessMap.channel),roughnessMapUv:ze&&g(b.roughnessMap.channel),anisotropyMapUv:J&&g(b.anisotropyMap.channel),clearcoatMapUv:lt&&g(b.clearcoatMap.channel),clearcoatNormalMapUv:ht&&g(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&g(b.clearcoatRoughnessMap.channel),iridescenceMapUv:it&&g(b.iridescenceMap.channel),iridescenceThicknessMapUv:ut&&g(b.iridescenceThicknessMap.channel),sheenColorMapUv:Pt&&g(b.sheenColorMap.channel),sheenRoughnessMapUv:mt&&g(b.sheenRoughnessMap.channel),specularMapUv:dt&&g(b.specularMap.channel),specularColorMapUv:It&&g(b.specularColorMap.channel),specularIntensityMapUv:Dt&&g(b.specularIntensityMap.channel),transmissionMapUv:Xt&&g(b.transmissionMap.channel),thicknessMapUv:O&&g(b.thicknessMap.channel),alphaMapUv:tt&&g(b.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Ce||U),vertexNormals:!!V.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!V.attributes.uv&&(Ct||tt),fog:!!L,useFog:b.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||V.attributes.normal===void 0&&Ce===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:at,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:V.attributes.position!==void 0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:Lt,morphTextureStride:At,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:H.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&A.length>0,shadowMapType:s.shadowMap.type,toneMapping:kt,decodeVideoTexture:Ct&&b.map.isVideoTexture===!0&&Qt.getTransfer(b.map.colorSpace)===de,decodeVideoTextureEmissive:_i&&b.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(b.emissiveMap.colorSpace)===de,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Fi,flipSided:b.side===Je,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:st&&b.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(st&&b.extensions.multiDraw===!0||ot)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Tt.vertexUv1s=l.has(1),Tt.vertexUv2s=l.has(2),Tt.vertexUv3s=l.has(3),l.clear(),Tt}function m(b){let T=[];if(b.shaderID?T.push(b.shaderID):(T.push(b.customVertexShaderID),T.push(b.customFragmentShaderID)),b.defines!==void 0)for(let A in b.defines)T.push(A),T.push(b.defines[A]);return b.isRawShaderMaterial===!1&&(p(T,b),v(T,b),T.push(s.outputColorSpace)),T.push(b.customProgramCacheKey),T.join()}function p(b,T){b.push(T.precision),b.push(T.outputColorSpace),b.push(T.envMapMode),b.push(T.envMapCubeUVHeight),b.push(T.mapUv),b.push(T.alphaMapUv),b.push(T.lightMapUv),b.push(T.aoMapUv),b.push(T.bumpMapUv),b.push(T.normalMapUv),b.push(T.displacementMapUv),b.push(T.emissiveMapUv),b.push(T.metalnessMapUv),b.push(T.roughnessMapUv),b.push(T.anisotropyMapUv),b.push(T.clearcoatMapUv),b.push(T.clearcoatNormalMapUv),b.push(T.clearcoatRoughnessMapUv),b.push(T.iridescenceMapUv),b.push(T.iridescenceThicknessMapUv),b.push(T.sheenColorMapUv),b.push(T.sheenRoughnessMapUv),b.push(T.specularMapUv),b.push(T.specularColorMapUv),b.push(T.specularIntensityMapUv),b.push(T.transmissionMapUv),b.push(T.thicknessMapUv),b.push(T.combine),b.push(T.fogExp2),b.push(T.sizeAttenuation),b.push(T.morphTargetsCount),b.push(T.morphAttributeCount),b.push(T.numSunLights),b.push(T.numDirLights),b.push(T.numPointLights),b.push(T.numSpotLights),b.push(T.numSpotLightMaps),b.push(T.numHemiLights),b.push(T.numRectAreaLights),b.push(T.numSunLightShadows),b.push(T.numDirLightShadows),b.push(T.numPointLightShadows),b.push(T.numSpotLightShadows),b.push(T.numSpotLightShadowsWithMaps),b.push(T.numLightProbes),b.push(T.shadowMapType),b.push(T.toneMapping),b.push(T.numClippingPlanes),b.push(T.numClipIntersection),b.push(T.depthPacking)}function v(b,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.retroreflection&&a.enable(24),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),b.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),b.push(a.mask)}function E(b){let T=f[b.type],A;if(T){let P=Sn[T];A=Sa.clone(P.uniforms)}else A=b.uniforms;return A}function y(b,T){let A=h.get(T);return A!==void 0?++A.usedTimes:(A=new tb(s,T,b,n),c.push(A),h.set(T,A)),A}function S(b){if(--b.usedTimes===0){let T=c.indexOf(b);c[T]=c[c.length-1],c.pop(),h.delete(b.cacheKey),b.destroy()}}function M(b){o.remove(b)}function R(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:E,acquireProgram:y,releaseProgram:S,releaseShaderCache:M,programs:c,dispose:R}}function sb(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function i(a){s.delete(a)}function n(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:i,update:n,dispose:r}}function rb(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function Zf(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Jf(){let s=[],t=0,e=[],i=[],n=[];function r(){t=0,e.length=0,i.length=0,n.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,x,m,p){let v=s[t];return v===void 0?(v={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:x,renderOrder:u.renderOrder,z:m,group:p},s[t]=v):(v.id=u.id,v.object=u,v.geometry=f,v.material=g,v.materialVariant=a(u),v.groupOrder=x,v.renderOrder=u.renderOrder,v.z=m,v.group=p),t++,v}function l(u,f,g,x,m,p,v){v.reversedDepth===!0&&(m=-m);let E=o(u,f,g,x,m,p);g.transmission>0?i.push(E):g.transparent===!0?n.push(E):e.push(E)}function c(u,f,g,x,m,p){let v=o(u,f,g,x,m,p);g.transmission>0?i.unshift(v):g.transparent===!0?n.unshift(v):e.unshift(v)}function h(u,f){e.length>1&&e.sort(u||rb),i.length>1&&i.sort(f||Zf),n.length>1&&n.sort(f||Zf)}function d(){for(let u=t,f=s.length;u<f;u++){let g=s[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:i,transparent:n,init:r,push:l,unshift:c,finish:d,sort:h}}function ab(){let s=new WeakMap;function t(i,n){let r=s.get(i),a;return r===void 0?(a=new Jf,s.set(i,[a])):n>=r.length?(a=new Jf,r.push(a)):a=r[n],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function ob(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new k,color:new Yt};break;case"SpotLight":e={position:new k,direction:new k,color:new Yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new k,color:new Yt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new k,skyColor:new Yt,groundColor:new Yt};break;case"RectAreaLight":e={color:new Yt,position:new k,halfWidth:new k,halfHeight:new k};break}return s[t.id]=e,e}}}function lb(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var cb=0;function hb(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function ub(s){let t=new ob,e=lb(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new k);let n=new k,r=new Gt,a=new Gt;function o(c){let h=0,d=0,u=0;for(let N=0;N<9;N++)i.probe[N].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,v=0,E=0,y=0,S=0,M=0,R=0,b=0,T=0,A=0;c.sort(hb);for(let N=0,H=c.length;N<H;N++){let L=c[N],V=L.color,K=L.intensity,Z=L.distance,j=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===ss?j=L.shadow.map.texture:j=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=V.r*K,d+=V.g*K,u+=V.b*K;else if(L.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(L.sh.coefficients[X],K);A++}else if(L.isSunLight){let X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let et=L.shadow,nt=e.get(L);nt.shadowIntensity=et.intensity,nt.shadowBias=et.bias,nt.shadowNormalBias=et.normalBias,nt.shadowRadius=et.radius,nt.shadowMapSize.copy(et.mapSize).multiply(et.getFrameExtents()),i.sunShadow[g]=nt,i.sunShadowMap[g]=j;let Lt=et.getViewportCount();for(let At=0;At<Lt;At++)i.sunShadowMatrix[x+At]=et.getMatrix(At),i.sunShadowCascade[x+At]=et._cascadeData[At];x+=Lt,g++}i.sun[f]=X,f++}else if(L.isDirectionalLight){let X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let et=L.shadow,nt=e.get(L);nt.shadowIntensity=et.intensity,nt.shadowBias=et.bias,nt.shadowNormalBias=et.normalBias,nt.shadowRadius=et.radius,nt.shadowMapSize=et.mapSize,i.directionalShadow[m]=nt,i.directionalShadowMap[m]=j,i.directionalShadowMatrix[m]=L.shadow.matrix,S++}i.directional[m]=X,m++}else if(L.isSpotLight){let X=t.get(L);X.position.setFromMatrixPosition(L.matrixWorld),X.color.copy(V).multiplyScalar(K),X.distance=Z,X.coneCos=Math.cos(L.angle),X.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),X.decay=L.decay,i.spot[v]=X;let et=L.shadow;if(L.map&&(i.spotLightMap[b]=L.map,b++,et.updateMatrices(L),L.castShadow&&T++),i.spotLightMatrix[v]=et.matrix,L.castShadow){let nt=e.get(L);nt.shadowIntensity=et.intensity,nt.shadowBias=et.bias,nt.shadowNormalBias=et.normalBias,nt.shadowRadius=et.radius,nt.shadowMapSize=et.mapSize,i.spotShadow[v]=nt,i.spotShadowMap[v]=j,R++}v++}else if(L.isRectAreaLight){let X=t.get(L);X.color.copy(V).multiplyScalar(K),X.halfWidth.set(L.width*.5,0,0),X.halfHeight.set(0,L.height*.5,0),i.rectArea[E]=X,E++}else if(L.isPointLight){let X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),X.distance=L.distance,X.decay=L.decay,L.castShadow){let et=L.shadow,nt=e.get(L);nt.shadowIntensity=et.intensity,nt.shadowBias=et.bias,nt.shadowNormalBias=et.normalBias,nt.shadowRadius=et.radius,nt.shadowMapSize=et.mapSize,nt.shadowCameraNear=et.camera.near,nt.shadowCameraFar=et.camera.far,i.pointShadow[p]=nt,i.pointShadowMap[p]=j,i.pointShadowMatrix[p]=L.shadow.matrix,M++}i.point[p]=X,p++}else if(L.isHemisphereLight){let X=t.get(L);X.skyColor.copy(L.color).multiplyScalar(K),X.groundColor.copy(L.groundColor).multiplyScalar(K),i.hemi[y]=X,y++}}E>0&&(s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ct.LTC_FLOAT_1,i.rectAreaLTC2=ct.LTC_FLOAT_2):(i.rectAreaLTC1=ct.LTC_HALF_1,i.rectAreaLTC2=ct.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;let P=i.hash;(P.sunLength!==f||P.directionalLength!==m||P.pointLength!==p||P.spotLength!==v||P.rectAreaLength!==E||P.hemiLength!==y||P.numSunShadows!==g||P.numDirectionalShadows!==S||P.numPointShadows!==M||P.numSpotShadows!==R||P.numSpotMaps!==b||P.numLightProbes!==A)&&(i.sun.length=f,i.directional.length=m,i.spot.length=v,i.rectArea.length=E,i.point.length=p,i.hemi.length=y,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=x,i.sunShadowCascade.length=x,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.directionalShadowMatrix.length=S,i.pointShadow.length=M,i.pointShadowMap.length=M,i.pointShadowMatrix.length=M,i.spotShadow.length=R,i.spotShadowMap.length=R,i.spotLightMatrix.length=R+b-T,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=A,P.sunLength=f,P.directionalLength=m,P.pointLength=p,P.spotLength=v,P.rectAreaLength=E,P.hemiLength=y,P.numSunShadows=g,P.numDirectionalShadows=S,P.numPointShadows=M,P.numSpotShadows=R,P.numSpotMaps=b,P.numLightProbes=A,i.version=cb++)}function l(c,h){let d=0,u=0,f=0,g=0,x=0,m=0,p=h.matrixWorldInverse;for(let v=0,E=c.length;v<E;v++){let y=c[v];if(y.isSunLight){let S=i.sun[d];S.direction.setFromMatrixPosition(y.matrixWorld),S.direction.transformDirection(p),d++}else if(y.isDirectionalLight){let S=i.directional[u];S.direction.setFromMatrixPosition(y.matrixWorld),n.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(n),S.direction.transformDirection(p),u++}else if(y.isSpotLight){let S=i.spot[g];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(y.matrixWorld),n.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(n),S.direction.transformDirection(p),g++}else if(y.isRectAreaLight){let S=i.rectArea[x];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(p),a.identity(),r.copy(y.matrixWorld),r.premultiply(p),a.extractRotation(r),S.halfWidth.set(y.width*.5,0,0),S.halfHeight.set(0,y.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),x++}else if(y.isPointLight){let S=i.point[f];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(p),f++}else if(y.isHemisphereLight){let S=i.hemi[m];S.direction.setFromMatrixPosition(y.matrixWorld),S.direction.transformDirection(p),m++}}}return{setup:o,setupView:l,state:i}}function jf(s){let t=new ub(s),e=[],i=[],n=[];function r(u){d.camera=u,e.length=0,i.length=0,n.length=0}function a(u){e.push(u)}function o(u){i.push(u)}function l(u){n.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}let d={lightsArray:e,shadowsArray:i,lightProbeGridArray:n,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function db(s){let t=new WeakMap;function e(n,r=0){let a=t.get(n),o;return a===void 0?(o=new jf(s),t.set(n,[o])):r>=a.length?(o=new jf(s),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}var fb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,mb=[new k(1,0,0),new k(-1,0,0),new k(0,1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1)],gb=[new k(0,-1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1),new k(0,-1,0),new k(0,-1,0)],Qf=new Gt,Ea=new k,lu=new k;function xb(s,t,e){let i=new mr,n=new qt,r=new qt,a=new _e,o=new Po,l=new Io,c={},h=e.maxTextureSize,d={[bn]:Je,[Je]:bn,[Fi]:Fi},u=new Fe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qt},radius:{value:4}},vertexShader:fb,fragmentShader:pb}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new We;g.setAttribute("position",new Ci(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new ce(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=fa;let p=this.type;this.render=function(M,R,b){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;this.type===qd&&(Ft("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=fa);let T=s.getRenderTarget(),A=s.getActiveCubeFace(),P=s.getActiveMipmapLevel(),N=s.state;N.setBlending(_n),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let H=p!==this.type;H&&R.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(V=>V.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,V=M.length;L<V;L++){let K=M[L],Z=K.shadow;if(Z===void 0){Ft("WebGLShadowMap:",K,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;n.copy(Z.mapSize);let j=Z.getFrameExtents();n.multiply(j),r.copy(Z.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(r.x=Math.floor(h/j.x),n.x=r.x*j.x,Z.mapSize.x=r.x),n.y>h&&(r.y=Math.floor(h/j.y),n.y=r.y*j.y,Z.mapSize.y=r.y));let X=s.state.buffers.depth.getReversed();if(Z.camera._reversedDepth=X,Z.map===null||H===!0){if(Z.map!==null&&(Z.map.depthTexture!==null&&(Z.map.depthTexture.dispose(),Z.map.depthTexture=null),Z.map.dispose()),this.type===vr){if(K.isPointLight){Ft("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Z.map=new ai(n.x,n.y,{format:ss,type:en,minFilter:Ze,magFilter:Ze,generateMipmaps:!1}),Z.map.texture.name=K.name+".shadowMap",Z.map.depthTexture=new Zn(n.x,n.y,pi),Z.map.depthTexture.name=K.name+".shadowMapDepth",Z.map.depthTexture.format=gn,Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Ne,Z.map.depthTexture.magFilter=Ne}else K.isPointLight?(Z.map=new Fl(n.x),Z.map.depthTexture=new Ro(n.x,tn)):(Z.map=new ai(n.x,n.y),Z.map.depthTexture=new Zn(n.x,n.y,tn)),Z.map.depthTexture.name=K.name+".shadowMap",Z.map.depthTexture.format=gn,this.type===fa?(Z.map.depthTexture.compareFunction=X?Nl:kl,Z.map.depthTexture.minFilter=Ze,Z.map.depthTexture.magFilter=Ze):(Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Ne,Z.map.depthTexture.magFilter=Ne);Z.camera.updateProjectionMatrix()}Z.map.isWebGLCubeRenderTarget!==!0&&(Z.map.width!==n.x||Z.map.height!==n.y)&&Z.map.setSize(n.x,n.y);let et=Z.map.isWebGLCubeRenderTarget?6:Z.getViewportCount();K.isPointLight!==!0&&Z.updateMatrices(K,b);for(let nt=0;nt<et;nt++){let Lt=Z.getCamera(nt);if(K.isPointLight){let At=Z.camera,oe=Z.matrix,ne=K.distance||At.far;ne!==At.far&&(At.far=ne,At.updateProjectionMatrix()),Ea.setFromMatrixPosition(K.matrixWorld),At.position.copy(Ea),lu.copy(At.position),lu.add(mb[nt]),At.up.copy(gb[nt]),At.lookAt(lu),At.updateMatrixWorld(),oe.makeTranslation(-Ea.x,-Ea.y,-Ea.z),Qf.multiplyMatrices(At.projectionMatrix,At.matrixWorldInverse),Z._frustum.setFromProjectionMatrix(Qf,At.coordinateSystem,At.reversedDepth)}if(Z.map.isWebGLCubeRenderTarget)s.setRenderTarget(Z.map,nt),s.clear();else{nt===0&&(s.setRenderTarget(Z.map),s.clear());let At=Z.getViewport(nt);a.set(r.x*At.x,r.y*At.y,r.x*At.z,r.y*At.w),N.viewport(a)}i=Z.getFrustum(nt),y(R,b,Lt,K,this.type)}Z.isPointLightShadow!==!0&&this.type===vr&&v(Z,b),Z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(T,A,P)};function v(M,R){let b=t.update(x);u.defines.VSM_SAMPLES!==M.blurSamples&&(u.defines.VSM_SAMPLES=M.blurSamples,f.defines.VSM_SAMPLES=M.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),M.mapPass===null?M.mapPass=new ai(n.x,n.y,{format:ss,type:en}):(M.mapPass.width!==M.map.width||M.mapPass.height!==M.map.height)&&M.mapPass.setSize(M.map.width,M.map.height),u.uniforms.shadow_pass.value=M.map.depthTexture,u.uniforms.resolution.value.set(M.map.width,M.map.height),u.uniforms.radius.value=M.radius,s.setRenderTarget(M.mapPass),s.clear(),s.renderBufferDirect(R,null,b,u,x,null),f.uniforms.shadow_pass.value=M.mapPass.texture,f.uniforms.resolution.value.set(M.map.width,M.map.height),f.uniforms.radius.value=M.radius,s.setRenderTarget(M.map),s.clear(),s.renderBufferDirect(R,null,b,f,x,null)}function E(M,R,b,T){let A=null,P=b.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(P!==void 0)A=P;else if(A=b.isPointLight===!0?l:o,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let N=A.uuid,H=R.uuid,L=c[N];L===void 0&&(L={},c[N]=L);let V=L[H];V===void 0&&(V=A.clone(),L[H]=V,R.addEventListener("dispose",S)),A=V}if(A.visible=R.visible,A.wireframe=R.wireframe,T===vr?A.side=R.shadowSide!==null?R.shadowSide:R.side:A.side=R.shadowSide!==null?R.shadowSide:d[R.side],A.alphaMap=R.alphaMap,A.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,A.map=R.map,A.clipShadows=R.clipShadows,A.clippingPlanes=R.clippingPlanes,A.clipIntersection=R.clipIntersection,A.displacementMap=R.displacementMap,A.displacementScale=R.displacementScale,A.displacementBias=R.displacementBias,A.wireframeLinewidth=R.wireframeLinewidth,A.linewidth=R.linewidth,b.isPointLight===!0&&A.isMeshDistanceMaterial===!0){let N=s.properties.get(A);N.light=b}return A}function y(M,R,b,T,A){if(M.visible===!1)return;if(M.layers.test(R.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&A===vr)&&(!M.frustumCulled||M.intersectsFrustum(i))){M.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,M.matrixWorld);let H=t.update(M),L=M.material;if(Array.isArray(L)){let V=H.groups;for(let K=0,Z=V.length;K<Z;K++){let j=V[K],X=L[j.materialIndex];if(X&&X.visible){let et=E(M,X,T,A);M.onBeforeShadow(s,M,R,b,H,et,j),s.renderBufferDirect(b,null,H,et,M,j),M.onAfterShadow(s,M,R,b,H,et,j)}}}else if(L.visible){let V=E(M,L,T,A);M.onBeforeShadow(s,M,R,b,H,V,null),s.renderBufferDirect(b,null,H,V,M,null),M.onAfterShadow(s,M,R,b,H,V,null)}}let N=M.children;for(let H=0,L=N.length;H<L;H++)y(N[H],R,b,T,A)}function S(M){M.target.removeEventListener("dispose",S);for(let b in c){let T=c[b],A=M.target.uuid;A in T&&(T[A].dispose(),delete T[A])}}}function vb(s,t){function e(){let O=!1,ft=new _e,tt=null,pt=new _e(0,0,0,0);return{setMask:function(vt){tt!==vt&&!O&&(s.colorMask(vt,vt,vt,vt),tt=vt)},setLocked:function(vt){O=vt},setClear:function(vt,st,kt,Tt,Se){Se===!0&&(vt*=Tt,st*=Tt,kt*=Tt),ft.set(vt,st,kt,Tt),pt.equals(ft)===!1&&(s.clearColor(vt,st,kt,Tt),pt.copy(ft))},reset:function(){O=!1,tt=null,pt.set(-1,0,0,0)}}}function i(){let O=!1,ft=!1,tt=null,pt=null,vt=null;return{setReversed:function(st){if(ft!==st){let kt=t.get("EXT_clip_control");st?kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.ZERO_TO_ONE_EXT):kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.NEGATIVE_ONE_TO_ONE_EXT),ft=st;let Tt=vt;vt=null,this.setClear(Tt)}},getReversed:function(){return ft},setTest:function(st){st?Y(s.DEPTH_TEST):at(s.DEPTH_TEST)},setMask:function(st){tt!==st&&!O&&(s.depthMask(st),tt=st)},setFunc:function(st){if(ft&&(st=Cf[st]),pt!==st){switch(st){case fo:s.depthFunc(s.NEVER);break;case po:s.depthFunc(s.ALWAYS);break;case mo:s.depthFunc(s.LESS);break;case cr:s.depthFunc(s.LEQUAL);break;case go:s.depthFunc(s.EQUAL);break;case xo:s.depthFunc(s.GEQUAL);break;case vo:s.depthFunc(s.GREATER);break;case yo:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}pt=st}},setLocked:function(st){O=st},setClear:function(st){vt!==st&&(vt=st,ft&&(st=1-st),s.clearDepth(st))},reset:function(){O=!1,tt=null,pt=null,vt=null,ft=!1}}}function n(){let O=!1,ft=null,tt=null,pt=null,vt=null,st=null,kt=null,Tt=null,Se=null;return{setTest:function(he){O||(he?Y(s.STENCIL_TEST):at(s.STENCIL_TEST))},setMask:function(he){ft!==he&&!O&&(s.stencilMask(he),ft=he)},setFunc:function(he,qi,dn){(tt!==he||pt!==qi||vt!==dn)&&(s.stencilFunc(he,qi,dn),tt=he,pt=qi,vt=dn)},setOp:function(he,qi,dn){(st!==he||kt!==qi||Tt!==dn)&&(s.stencilOp(he,qi,dn),st=he,kt=qi,Tt=dn)},setLocked:function(he){O=he},setClear:function(he){Se!==he&&(s.clearStencil(he),Se=he)},reset:function(){O=!1,ft=null,tt=null,pt=null,vt=null,st=null,kt=null,Tt=null,Se=null}}}let r=new e,a=new i,o=new n,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,g=[],x=null,m=!1,p=null,v=null,E=null,y=null,S=null,M=null,R=null,b=new Yt(0,0,0),T=0,A=!1,P=null,N=null,H=null,L=null,V=null,K=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Z=!1,j=0,X=s.getParameter(s.VERSION);X.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(X)[1]),Z=j>=1):X.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),Z=j>=2);let et=null,nt={},Lt=s.getParameter(s.SCISSOR_BOX),At=s.getParameter(s.VIEWPORT),oe=new _e().fromArray(Lt),ne=new _e().fromArray(At);function rt(O,ft,tt,pt){let vt=new Uint8Array(4),st=s.createTexture();s.bindTexture(O,st),s.texParameteri(O,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(O,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let kt=0;kt<tt;kt++)O===s.TEXTURE_3D||O===s.TEXTURE_2D_ARRAY?s.texImage3D(ft,0,s.RGBA,1,1,pt,0,s.RGBA,s.UNSIGNED_BYTE,vt):s.texImage2D(ft+kt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,vt);return st}let I={};I[s.TEXTURE_2D]=rt(s.TEXTURE_2D,s.TEXTURE_2D,1),I[s.TEXTURE_CUBE_MAP]=rt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),I[s.TEXTURE_2D_ARRAY]=rt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),I[s.TEXTURE_3D]=rt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Y(s.DEPTH_TEST),a.setFunc(cr),se(!1),Ce(Mh),Y(s.CULL_FACE),ee(_n);function Y(O){h[O]!==!0&&(s.enable(O),h[O]=!0)}function at(O){h[O]!==!1&&(s.disable(O),h[O]=!1)}function yt(O,ft){return u[O]!==ft?(s.bindFramebuffer(O,ft),u[O]=ft,O===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=ft),O===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=ft),!0):!1}function ot(O,ft){let tt=g,pt=!1;if(O){tt=f.get(ft),tt===void 0&&(tt=[],f.set(ft,tt));let vt=O.textures;if(tt.length!==vt.length||tt[0]!==s.COLOR_ATTACHMENT0){for(let st=0,kt=vt.length;st<kt;st++)tt[st]=s.COLOR_ATTACHMENT0+st;tt.length=vt.length,pt=!0}}else tt[0]!==s.BACK&&(tt[0]=s.BACK,pt=!0);pt&&s.drawBuffers(tt)}function Ct(O){return x!==O?(s.useProgram(O),x=O,!0):!1}let ye={[As]:s.FUNC_ADD,[Kd]:s.FUNC_SUBTRACT,[Zd]:s.FUNC_REVERSE_SUBTRACT};ye[Jd]=s.MIN,ye[jd]=s.MAX;let Wt={[Qd]:s.ZERO,[tf]:s.ONE,[ef]:s.SRC_COLOR,[Ah]:s.SRC_ALPHA,[lf]:s.SRC_ALPHA_SATURATE,[af]:s.DST_COLOR,[sf]:s.DST_ALPHA,[nf]:s.ONE_MINUS_SRC_COLOR,[Rh]:s.ONE_MINUS_SRC_ALPHA,[of]:s.ONE_MINUS_DST_COLOR,[rf]:s.ONE_MINUS_DST_ALPHA,[cf]:s.CONSTANT_COLOR,[hf]:s.ONE_MINUS_CONSTANT_COLOR,[uf]:s.CONSTANT_ALPHA,[df]:s.ONE_MINUS_CONSTANT_ALPHA};function ee(O,ft,tt,pt,vt,st,kt,Tt,Se,he){if(O===_n){m===!0&&(at(s.BLEND),m=!1);return}if(m===!1&&(Y(s.BLEND),m=!0),O!==Yd){if(O!==p||he!==A){if((v!==As||S!==As)&&(s.blendEquation(s.FUNC_ADD),v=As,S=As),he)switch(O){case yr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case wh:s.blendFunc(s.ONE,s.ONE);break;case Eh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Th:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Bt("WebGLState: Invalid blending: ",O);break}else switch(O){case yr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case wh:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Eh:Bt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Th:Bt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Bt("WebGLState: Invalid blending: ",O);break}E=null,y=null,M=null,R=null,b.set(0,0,0),T=0,p=O,A=he}return}vt=vt||ft,st=st||tt,kt=kt||pt,(ft!==v||vt!==S)&&(s.blendEquationSeparate(ye[ft],ye[vt]),v=ft,S=vt),(tt!==E||pt!==y||st!==M||kt!==R)&&(s.blendFuncSeparate(Wt[tt],Wt[pt],Wt[st],Wt[kt]),E=tt,y=pt,M=st,R=kt),(Tt.equals(b)===!1||Se!==T)&&(s.blendColor(Tt.r,Tt.g,Tt.b,Se),b.copy(Tt),T=Se),p=O,A=!1}function me(O,ft){O.side===Fi?at(s.CULL_FACE):Y(s.CULL_FACE);let tt=O.side===Je;ft&&(tt=!tt),se(tt),O.blending===yr&&O.transparent===!1?ee(_n):ee(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),a.setFunc(O.depthFunc),a.setTest(O.depthTest),a.setMask(O.depthWrite),r.setMask(O.colorWrite);let pt=O.stencilWrite;o.setTest(pt),pt&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),_i(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?Y(s.SAMPLE_ALPHA_TO_COVERAGE):at(s.SAMPLE_ALPHA_TO_COVERAGE)}function se(O){P!==O&&(O?s.frontFace(s.CW):s.frontFace(s.CCW),P=O)}function Ce(O){O!==$d?(Y(s.CULL_FACE),O!==N&&(O===Mh?s.cullFace(s.BACK):O===Xd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):at(s.CULL_FACE),N=O}function qe(O){O!==H&&(Z&&s.lineWidth(O),H=O)}function _i(O,ft,tt){O?(Y(s.POLYGON_OFFSET_FILL),(L!==ft||V!==tt)&&(L=ft,V=tt,a.getReversed()&&(ft=-ft),s.polygonOffset(ft,tt))):at(s.POLYGON_OFFSET_FILL)}function ke(O){O?Y(s.SCISSOR_TEST):at(s.SCISSOR_TEST)}function ze(O){O===void 0&&(O=s.TEXTURE0+K-1),et!==O&&(s.activeTexture(O),et=O)}function U(O,ft,tt){tt===void 0&&(et===null?tt=s.TEXTURE0+K-1:tt=et);let pt=nt[tt];pt===void 0&&(pt={type:void 0,texture:void 0},nt[tt]=pt),(pt.type!==O||pt.texture!==ft)&&(et!==tt&&(s.activeTexture(tt),et=tt),s.bindTexture(O,ft||I[O]),pt.type=O,pt.texture=ft)}function ei(){let O=nt[et];O!==void 0&&O.type!==void 0&&(s.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function ge(){try{s.compressedTexImage2D(...arguments)}catch(O){Bt("WebGLState:",O)}}function C(){try{s.compressedTexImage3D(...arguments)}catch(O){Bt("WebGLState:",O)}}function _(){try{s.texSubImage2D(...arguments)}catch(O){Bt("WebGLState:",O)}}function z(){try{s.texSubImage3D(...arguments)}catch(O){Bt("WebGLState:",O)}}function $(){try{s.compressedTexSubImage2D(...arguments)}catch(O){Bt("WebGLState:",O)}}function J(){try{s.compressedTexSubImage3D(...arguments)}catch(O){Bt("WebGLState:",O)}}function lt(){try{s.texStorage2D(...arguments)}catch(O){Bt("WebGLState:",O)}}function ht(){try{s.texStorage3D(...arguments)}catch(O){Bt("WebGLState:",O)}}function Q(){try{s.texImage2D(...arguments)}catch(O){Bt("WebGLState:",O)}}function it(){try{s.texImage3D(...arguments)}catch(O){Bt("WebGLState:",O)}}function ut(O){return d[O]!==void 0?d[O]:s.getParameter(O)}function Pt(O,ft){d[O]!==ft&&(s.pixelStorei(O,ft),d[O]=ft)}function mt(O){oe.equals(O)===!1&&(s.scissor(O.x,O.y,O.z,O.w),oe.copy(O))}function dt(O){ne.equals(O)===!1&&(s.viewport(O.x,O.y,O.z,O.w),ne.copy(O))}function It(O,ft){let tt=c.get(ft);tt===void 0&&(tt=new WeakMap,c.set(ft,tt));let pt=tt.get(O);pt===void 0&&(pt=s.getUniformBlockIndex(ft,O.name),tt.set(O,pt))}function Dt(O,ft){let pt=c.get(ft).get(O);l.get(ft)!==pt&&(s.uniformBlockBinding(ft,pt,O.__bindingPointIndex),l.set(ft,pt))}function Xt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},d={},et=null,nt={},u={},f=new WeakMap,g=[],x=null,m=!1,p=null,v=null,E=null,y=null,S=null,M=null,R=null,b=new Yt(0,0,0),T=0,A=!1,P=null,N=null,H=null,L=null,V=null,oe.set(0,0,s.canvas.width,s.canvas.height),ne.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Y,disable:at,bindFramebuffer:yt,drawBuffers:ot,useProgram:Ct,setBlending:ee,setMaterial:me,setFlipSided:se,setCullFace:Ce,setLineWidth:qe,setPolygonOffset:_i,setScissorTest:ke,activeTexture:ze,bindTexture:U,unbindTexture:ei,compressedTexImage2D:ge,compressedTexImage3D:C,texImage2D:Q,texImage3D:it,pixelStorei:Pt,getParameter:ut,updateUBOMapping:It,uniformBlockBinding:Dt,texStorage2D:lt,texStorage3D:ht,texSubImage2D:_,texSubImage3D:z,compressedTexSubImage2D:$,compressedTexSubImage3D:J,scissor:mt,viewport:dt,reset:Xt}}function yb(s,t,e,i,n,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new qt,h=new WeakMap,d=new Set,u,f=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(C,_){return g?new OffscreenCanvas(C,_):Jr("canvas")}function m(C,_,z){let $=1,J=ge(C);if((J.width>z||J.height>z)&&($=z/Math.max(J.width,J.height)),$<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let lt=Math.floor($*J.width),ht=Math.floor($*J.height);u===void 0&&(u=x(lt,ht));let Q=_?x(lt,ht):u;return Q.width=lt,Q.height=ht,Q.getContext("2d").drawImage(C,0,0,lt,ht),Ft("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+lt+"x"+ht+")."),Q}else return"data"in C&&Ft("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),C;return C}function p(C){return C.generateMipmaps}function v(C){s.generateMipmap(C)}function E(C){return C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?s.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function y(C,_,z,$,J,lt=!1){if(C!==null){if(s[C]!==void 0)return s[C];Ft("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let ht;$&&(ht=t.get("EXT_texture_norm16"),ht||Ft("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=_;if(_===s.RED&&(z===s.FLOAT&&(Q=s.R32F),z===s.HALF_FLOAT&&(Q=s.R16F),z===s.UNSIGNED_BYTE&&(Q=s.R8),z===s.UNSIGNED_SHORT&&ht&&(Q=ht.R16_EXT),z===s.SHORT&&ht&&(Q=ht.R16_SNORM_EXT)),_===s.RED_INTEGER&&(z===s.UNSIGNED_BYTE&&(Q=s.R8UI),z===s.UNSIGNED_SHORT&&(Q=s.R16UI),z===s.UNSIGNED_INT&&(Q=s.R32UI),z===s.BYTE&&(Q=s.R8I),z===s.SHORT&&(Q=s.R16I),z===s.INT&&(Q=s.R32I)),_===s.RG&&(z===s.FLOAT&&(Q=s.RG32F),z===s.HALF_FLOAT&&(Q=s.RG16F),z===s.UNSIGNED_BYTE&&(Q=s.RG8),z===s.UNSIGNED_SHORT&&ht&&(Q=ht.RG16_EXT),z===s.SHORT&&ht&&(Q=ht.RG16_SNORM_EXT)),_===s.RG_INTEGER&&(z===s.UNSIGNED_BYTE&&(Q=s.RG8UI),z===s.UNSIGNED_SHORT&&(Q=s.RG16UI),z===s.UNSIGNED_INT&&(Q=s.RG32UI),z===s.BYTE&&(Q=s.RG8I),z===s.SHORT&&(Q=s.RG16I),z===s.INT&&(Q=s.RG32I)),_===s.RGB_INTEGER&&(z===s.UNSIGNED_BYTE&&(Q=s.RGB8UI),z===s.UNSIGNED_SHORT&&(Q=s.RGB16UI),z===s.UNSIGNED_INT&&(Q=s.RGB32UI),z===s.BYTE&&(Q=s.RGB8I),z===s.SHORT&&(Q=s.RGB16I),z===s.INT&&(Q=s.RGB32I)),_===s.RGBA_INTEGER&&(z===s.UNSIGNED_BYTE&&(Q=s.RGBA8UI),z===s.UNSIGNED_SHORT&&(Q=s.RGBA16UI),z===s.UNSIGNED_INT&&(Q=s.RGBA32UI),z===s.BYTE&&(Q=s.RGBA8I),z===s.SHORT&&(Q=s.RGBA16I),z===s.INT&&(Q=s.RGBA32I)),_===s.RGB&&(z===s.UNSIGNED_SHORT&&ht&&(Q=ht.RGB16_EXT),z===s.SHORT&&ht&&(Q=ht.RGB16_SNORM_EXT),z===s.UNSIGNED_INT_5_9_9_9_REV&&(Q=s.RGB9_E5),z===s.UNSIGNED_INT_10F_11F_11F_REV&&(Q=s.R11F_G11F_B10F)),_===s.RGBA){let it=lt?Zr:Qt.getTransfer(J);z===s.FLOAT&&(Q=s.RGBA32F),z===s.HALF_FLOAT&&(Q=s.RGBA16F),z===s.UNSIGNED_BYTE&&(Q=it===de?s.SRGB8_ALPHA8:s.RGBA8),z===s.UNSIGNED_SHORT&&ht&&(Q=ht.RGBA16_EXT),z===s.SHORT&&ht&&(Q=ht.RGBA16_SNORM_EXT),z===s.UNSIGNED_SHORT_4_4_4_4&&(Q=s.RGBA4),z===s.UNSIGNED_SHORT_5_5_5_1&&(Q=s.RGB5_A1)}return(Q===s.R16F||Q===s.R32F||Q===s.RG16F||Q===s.RG32F||Q===s.RGBA16F||Q===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function S(C,_){let z;return C?_===null||_===tn||_===_r?z=s.DEPTH24_STENCIL8:_===pi?z=s.DEPTH32F_STENCIL8:_===br&&(z=s.DEPTH24_STENCIL8,Ft("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===tn||_===_r?z=s.DEPTH_COMPONENT24:_===pi?z=s.DEPTH_COMPONENT32F:_===br&&(z=s.DEPTH_COMPONENT16),z}function M(C,_){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==Ne&&C.minFilter!==Ze?Math.log2(Math.max(_.width,_.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?_.mipmaps.length:1}function R(C){let _=C.target;_.removeEventListener("dispose",R),T(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&d.delete(_)}function b(C){let _=C.target;_.removeEventListener("dispose",b),P(_)}function T(C){let _=i.get(C);if(_.__webglInit===void 0)return;let z=C.source,$=f.get(z);if($){let J=$[_.__cacheKey];J.usedTimes--,J.usedTimes===0&&A(C),Object.keys($).length===0&&f.delete(z)}i.remove(C)}function A(C){let _=i.get(C);s.deleteTexture(_.__webglTexture);let z=C.source,$=f.get(z);delete $[_.__cacheKey],a.memory.textures--}function P(C){let _=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(_.__webglFramebuffer[$]))for(let J=0;J<_.__webglFramebuffer[$].length;J++)s.deleteFramebuffer(_.__webglFramebuffer[$][J]);else s.deleteFramebuffer(_.__webglFramebuffer[$]);_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer[$])}else{if(Array.isArray(_.__webglFramebuffer))for(let $=0;$<_.__webglFramebuffer.length;$++)s.deleteFramebuffer(_.__webglFramebuffer[$]);else s.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&s.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let $=0;$<_.__webglColorRenderbuffer.length;$++)_.__webglColorRenderbuffer[$]&&s.deleteRenderbuffer(_.__webglColorRenderbuffer[$]);_.__webglDepthRenderbuffer&&s.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let z=C.textures;for(let $=0,J=z.length;$<J;$++){let lt=i.get(z[$]);lt.__webglTexture&&(s.deleteTexture(lt.__webglTexture),a.memory.textures--),i.remove(z[$])}i.remove(C)}let N=0;function H(){N=0}function L(){return N}function V(C){N=C}function K(){let C=N;return C>=n.maxTextures&&Ft("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+n.maxTextures),N+=1,C}function Z(C){let _=[];return _.push(C.wrapS),_.push(C.wrapT),_.push(C.wrapR||0),_.push(C.magFilter),_.push(C.minFilter),_.push(C.anisotropy),_.push(C.internalFormat),_.push(C.format),_.push(C.type),_.push(C.generateMipmaps),_.push(C.premultiplyAlpha),_.push(C.flipY),_.push(C.unpackAlignment),_.push(C.colorSpace),_.join()}function j(C,_){let z=i.get(C);if(C.isVideoTexture&&U(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&z.__version!==C.version){let $=C.image;if($===null)Ft("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)Ft("WebGLRenderer: Texture marked for update but image is incomplete");else{at(z,C,_);return}}else C.isExternalTexture&&(z.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,z.__webglTexture,s.TEXTURE0+_)}function X(C,_){let z=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){at(z,C,_);return}else C.isExternalTexture&&(z.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,z.__webglTexture,s.TEXTURE0+_)}function et(C,_){let z=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){at(z,C,_);return}e.bindTexture(s.TEXTURE_3D,z.__webglTexture,s.TEXTURE0+_)}function nt(C,_){let z=i.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&z.__version!==C.version){yt(z,C,_);return}e.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture,s.TEXTURE0+_)}let Lt={[bo]:s.REPEAT,[mn]:s.CLAMP_TO_EDGE,[_o]:s.MIRRORED_REPEAT},At={[Ne]:s.NEAREST,[mf]:s.NEAREST_MIPMAP_NEAREST,[ma]:s.NEAREST_MIPMAP_LINEAR,[Ze]:s.LINEAR,[Ko]:s.LINEAR_MIPMAP_NEAREST,[is]:s.LINEAR_MIPMAP_LINEAR},oe={[yf]:s.NEVER,[wf]:s.ALWAYS,[bf]:s.LESS,[kl]:s.LEQUAL,[_f]:s.EQUAL,[Nl]:s.GEQUAL,[Mf]:s.GREATER,[Sf]:s.NOTEQUAL};function ne(C,_){if(_.type===pi&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===Ze||_.magFilter===Ko||_.magFilter===ma||_.magFilter===is||_.minFilter===Ze||_.minFilter===Ko||_.minFilter===ma||_.minFilter===is)&&Ft("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,Lt[_.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,Lt[_.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,Lt[_.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,At[_.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,At[_.minFilter]),_.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,oe[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ne||_.minFilter!==ma&&_.minFilter!==is||_.type===pi&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){let z=t.get("EXT_texture_filter_anisotropic");s.texParameterf(C,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,n.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function rt(C,_){let z=!1;C.__webglInit===void 0&&(C.__webglInit=!0,_.addEventListener("dispose",R));let $=_.source,J=f.get($);J===void 0&&(J={},f.set($,J));let lt=Z(_);if(lt!==C.__cacheKey){J[lt]===void 0&&(J[lt]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,z=!0),J[lt].usedTimes++;let ht=J[C.__cacheKey];ht!==void 0&&(J[C.__cacheKey].usedTimes--,ht.usedTimes===0&&A(_)),C.__cacheKey=lt,C.__webglTexture=J[lt].texture}return z}function I(C,_,z){return Math.floor(Math.floor(C/z)/_)}function Y(C,_,z,$){let lt=C.updateRanges;if(lt.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,_.width,_.height,z,$,_.data);else{lt.sort((Pt,mt)=>Pt.start-mt.start);let ht=0;for(let Pt=1;Pt<lt.length;Pt++){let mt=lt[ht],dt=lt[Pt],It=mt.start+mt.count,Dt=I(dt.start,_.width,4),Xt=I(mt.start,_.width,4);dt.start<=It+1&&Dt===Xt&&I(dt.start+dt.count-1,_.width,4)===Dt?mt.count=Math.max(mt.count,dt.start+dt.count-mt.start):(++ht,lt[ht]=dt)}lt.length=ht+1;let Q=e.getParameter(s.UNPACK_ROW_LENGTH),it=e.getParameter(s.UNPACK_SKIP_PIXELS),ut=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,_.width);for(let Pt=0,mt=lt.length;Pt<mt;Pt++){let dt=lt[Pt],It=Math.floor(dt.start/4),Dt=Math.ceil(dt.count/4),Xt=It%_.width,O=Math.floor(It/_.width),ft=Dt,tt=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,Xt),e.pixelStorei(s.UNPACK_SKIP_ROWS,O),e.texSubImage2D(s.TEXTURE_2D,0,Xt,O,ft,tt,z,$,_.data)}C.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,Q),e.pixelStorei(s.UNPACK_SKIP_PIXELS,it),e.pixelStorei(s.UNPACK_SKIP_ROWS,ut)}}function at(C,_,z){let $=s.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&($=s.TEXTURE_2D_ARRAY),_.isData3DTexture&&($=s.TEXTURE_3D);let J=rt(C,_),lt=_.source;e.bindTexture($,C.__webglTexture,s.TEXTURE0+z);let ht=i.get(lt);if(lt.version!==ht.__version||J===!0){if(e.activeTexture(s.TEXTURE0+z),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let tt=Qt.getPrimaries(Qt.workingColorSpace),pt=_.colorSpace===Dn?null:Qt.getPrimaries(_.colorSpace),vt=_.colorSpace===Dn||tt===pt?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt)}e.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment);let it=m(_.image,!1,n.maxTextureSize);it=ei(_,it);let ut=r.convert(_.format,_.colorSpace),Pt=r.convert(_.type),mt=y(_.internalFormat,ut,Pt,_.normalized,_.colorSpace,_.isVideoTexture);ne($,_);let dt,It=_.mipmaps,Dt=_.isVideoTexture!==!0,Xt=ht.__version===void 0||J===!0,O=lt.dataReady,ft=M(_,it);if(_.isDepthTexture)mt=S(_.format===ns,_.type),Xt&&(Dt?e.texStorage2D(s.TEXTURE_2D,1,mt,it.width,it.height):e.texImage2D(s.TEXTURE_2D,0,mt,it.width,it.height,0,ut,Pt,null));else if(_.isDataTexture)if(It.length>0){Dt&&Xt&&e.texStorage2D(s.TEXTURE_2D,ft,mt,It[0].width,It[0].height);for(let tt=0,pt=It.length;tt<pt;tt++)dt=It[tt],Dt?O&&e.texSubImage2D(s.TEXTURE_2D,tt,0,0,dt.width,dt.height,ut,Pt,dt.data):e.texImage2D(s.TEXTURE_2D,tt,mt,dt.width,dt.height,0,ut,Pt,dt.data);_.generateMipmaps=!1}else Dt?(Xt&&e.texStorage2D(s.TEXTURE_2D,ft,mt,it.width,it.height),O&&Y(_,it,ut,Pt)):e.texImage2D(s.TEXTURE_2D,0,mt,it.width,it.height,0,ut,Pt,it.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Dt&&Xt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ft,mt,It[0].width,It[0].height,it.depth);for(let tt=0,pt=It.length;tt<pt;tt++)if(dt=It[tt],_.format!==mi)if(ut!==null)if(Dt){if(O)if(_.layerUpdates.size>0){let vt=Jh(dt.width,dt.height,_.format,_.type);for(let st of _.layerUpdates){let kt=dt.data.subarray(st*vt/dt.data.BYTES_PER_ELEMENT,(st+1)*vt/dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,tt,0,0,st,dt.width,dt.height,1,ut,kt)}}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,tt,0,0,0,dt.width,dt.height,it.depth,ut,dt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,tt,mt,dt.width,dt.height,it.depth,0,dt.data,0,0);else Ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Dt?O&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,tt,0,0,0,dt.width,dt.height,it.depth,ut,Pt,dt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,tt,mt,dt.width,dt.height,it.depth,0,ut,Pt,dt.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Dt&&Xt&&e.texStorage2D(s.TEXTURE_2D,ft,mt,It[0].width,It[0].height);for(let tt=0,pt=It.length;tt<pt;tt++)dt=It[tt],_.format!==mi?ut!==null?Dt?O&&e.compressedTexSubImage2D(s.TEXTURE_2D,tt,0,0,dt.width,dt.height,ut,dt.data):e.compressedTexImage2D(s.TEXTURE_2D,tt,mt,dt.width,dt.height,0,dt.data):Ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Dt?O&&e.texSubImage2D(s.TEXTURE_2D,tt,0,0,dt.width,dt.height,ut,Pt,dt.data):e.texImage2D(s.TEXTURE_2D,tt,mt,dt.width,dt.height,0,ut,Pt,dt.data)}else if(_.isDataArrayTexture)if(Dt){if(Xt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ft,mt,it.width,it.height,it.depth),O)if(_.layerUpdates.size>0){let tt=Jh(it.width,it.height,_.format,_.type);for(let pt of _.layerUpdates){let vt=it.data.subarray(pt*tt/it.data.BYTES_PER_ELEMENT,(pt+1)*tt/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,pt,it.width,it.height,1,ut,Pt,vt)}_.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,ut,Pt,it.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,mt,it.width,it.height,it.depth,0,ut,Pt,it.data);else if(_.isData3DTexture)Dt?(Xt&&e.texStorage3D(s.TEXTURE_3D,ft,mt,it.width,it.height,it.depth),O&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,ut,Pt,it.data)):e.texImage3D(s.TEXTURE_3D,0,mt,it.width,it.height,it.depth,0,ut,Pt,it.data);else if(_.isFramebufferTexture){if(Xt)if(Dt)e.texStorage2D(s.TEXTURE_2D,ft,mt,it.width,it.height);else{let tt=it.width,pt=it.height;for(let vt=0;vt<ft;vt++)e.texImage2D(s.TEXTURE_2D,vt,mt,tt,pt,0,ut,Pt,null),tt>>=1,pt>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in s){let tt=s.canvas;if(tt.hasAttribute("layoutsubtree")||tt.setAttribute("layoutsubtree","true"),it.parentNode!==tt){tt.appendChild(it),d.add(_),tt.onpaint=pt=>{let vt=pt.changedElements;for(let st of d)vt.includes(st.image)&&(st.needsUpdate=!0)},tt.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,it);else{let vt=s.RGBA,st=s.RGBA,kt=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,vt,st,kt,it)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(It.length>0){if(Dt&&Xt){let tt=ge(It[0]);e.texStorage2D(s.TEXTURE_2D,ft,mt,tt.width,tt.height)}for(let tt=0,pt=It.length;tt<pt;tt++)dt=It[tt],Dt?O&&e.texSubImage2D(s.TEXTURE_2D,tt,0,0,ut,Pt,dt):e.texImage2D(s.TEXTURE_2D,tt,mt,ut,Pt,dt);_.generateMipmaps=!1}else if(Dt){if(Xt){let tt=ge(it);e.texStorage2D(s.TEXTURE_2D,ft,mt,tt.width,tt.height)}O&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,ut,Pt,it)}else e.texImage2D(s.TEXTURE_2D,0,mt,ut,Pt,it);p(_)&&v($),ht.__version=lt.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function yt(C,_,z){if(_.image.length!==6)return;let $=rt(C,_),J=_.source;e.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+z);let lt=i.get(J);if(J.version!==lt.__version||$===!0){e.activeTexture(s.TEXTURE0+z);let ht=Qt.getPrimaries(Qt.workingColorSpace),Q=_.colorSpace===Dn?null:Qt.getPrimaries(_.colorSpace),it=_.colorSpace===Dn||ht===Q?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,it);let ut=_.isCompressedTexture||_.image[0].isCompressedTexture,Pt=_.image[0]&&_.image[0].isDataTexture,mt=[];for(let st=0;st<6;st++)!ut&&!Pt?mt[st]=m(_.image[st],!0,n.maxCubemapSize):mt[st]=Pt?_.image[st].image:_.image[st],mt[st]=ei(_,mt[st]);let dt=mt[0],It=r.convert(_.format,_.colorSpace),Dt=r.convert(_.type),Xt=y(_.internalFormat,It,Dt,_.normalized,_.colorSpace),O=_.isVideoTexture!==!0,ft=lt.__version===void 0||$===!0,tt=J.dataReady,pt=M(_,dt);ne(s.TEXTURE_CUBE_MAP,_);let vt;if(ut){O&&ft&&e.texStorage2D(s.TEXTURE_CUBE_MAP,pt,Xt,dt.width,dt.height);for(let st=0;st<6;st++){vt=mt[st].mipmaps;for(let kt=0;kt<vt.length;kt++){let Tt=vt[kt];_.format!==mi?It!==null?O?tt&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,kt,0,0,Tt.width,Tt.height,It,Tt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,kt,Xt,Tt.width,Tt.height,0,Tt.data):Ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?tt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,kt,0,0,Tt.width,Tt.height,It,Dt,Tt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,kt,Xt,Tt.width,Tt.height,0,It,Dt,Tt.data)}}}else{if(vt=_.mipmaps,O&&ft){vt.length>0&&pt++;let st=ge(mt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,pt,Xt,st.width,st.height)}for(let st=0;st<6;st++)if(Pt){O?tt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,mt[st].width,mt[st].height,It,Dt,mt[st].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Xt,mt[st].width,mt[st].height,0,It,Dt,mt[st].data);for(let kt=0;kt<vt.length;kt++){let Se=vt[kt].image[st].image;O?tt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,kt+1,0,0,Se.width,Se.height,It,Dt,Se.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,kt+1,Xt,Se.width,Se.height,0,It,Dt,Se.data)}}else{O?tt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,It,Dt,mt[st]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Xt,It,Dt,mt[st]);for(let kt=0;kt<vt.length;kt++){let Tt=vt[kt];O?tt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,kt+1,0,0,It,Dt,Tt.image[st]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,kt+1,Xt,It,Dt,Tt.image[st])}}}p(_)&&v(s.TEXTURE_CUBE_MAP),lt.__version=J.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function ot(C,_,z,$,J,lt){let ht=r.convert(z.format,z.colorSpace),Q=r.convert(z.type),it=y(z.internalFormat,ht,Q,z.normalized,z.colorSpace),ut=i.get(_),Pt=i.get(z);if(Pt.__renderTarget=_,!ut.__hasExternalTextures){let mt=Math.max(1,_.width>>lt),dt=Math.max(1,_.height>>lt);J===s.TEXTURE_3D||J===s.TEXTURE_2D_ARRAY?e.texImage3D(J,lt,it,mt,dt,_.depth,0,ht,Q,null):e.texImage2D(J,lt,it,mt,dt,0,ht,Q,null)}e.bindFramebuffer(s.FRAMEBUFFER,C),ze(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,$,J,Pt.__webglTexture,0,ke(_)):(J===s.TEXTURE_2D||J>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,$,J,Pt.__webglTexture,lt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function Ct(C,_,z){if(s.bindRenderbuffer(s.RENDERBUFFER,C),_.depthBuffer){let $=_.depthTexture,J=$&&$.isDepthTexture?$.type:null,lt=S(_.stencilBuffer,J),ht=_.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;ze(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ke(_),lt,_.width,_.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,ke(_),lt,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,lt,_.width,_.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,ht,s.RENDERBUFFER,C)}else{let $=_.textures;for(let J=0;J<$.length;J++){let lt=$[J],ht=r.convert(lt.format,lt.colorSpace),Q=r.convert(lt.type),it=y(lt.internalFormat,ht,Q,lt.normalized,lt.colorSpace);ze(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ke(_),it,_.width,_.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,ke(_),it,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,it,_.width,_.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ye(C,_,z){let $=_.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,C),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let J=i.get(_.depthTexture);if(J.__renderTarget=_,(!J.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),$){if(J.__webglInit===void 0&&(J.__webglInit=!0,_.depthTexture.addEventListener("dispose",R)),J.__webglTexture===void 0){J.__webglTexture=s.createTexture(),e.bindTexture(s.TEXTURE_CUBE_MAP,J.__webglTexture),ne(s.TEXTURE_CUBE_MAP,_.depthTexture);let ut=r.convert(_.depthTexture.format),Pt=r.convert(_.depthTexture.type),mt;_.depthTexture.format===gn?mt=s.DEPTH_COMPONENT24:_.depthTexture.format===ns&&(mt=s.DEPTH24_STENCIL8);for(let dt=0;dt<6;dt++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,mt,_.width,_.height,0,ut,Pt,null)}}else j(_.depthTexture,0);let lt=J.__webglTexture,ht=ke(_),Q=$?s.TEXTURE_CUBE_MAP_POSITIVE_X+z:s.TEXTURE_2D,it=_.depthTexture.format===ns?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(_.depthTexture.format===gn)ze(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,it,Q,lt,0,ht):s.framebufferTexture2D(s.FRAMEBUFFER,it,Q,lt,0);else if(_.depthTexture.format===ns)ze(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,it,Q,lt,0,ht):s.framebufferTexture2D(s.FRAMEBUFFER,it,Q,lt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Wt(C){let _=i.get(C),z=C.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==C.depthTexture){let $=C.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),$){let J=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,$.removeEventListener("dispose",J)};$.addEventListener("dispose",J),_.__depthDisposeCallback=J}_.__boundDepthTexture=$}if(C.depthTexture&&!_.__autoAllocateDepthBuffer)if(z)for(let $=0;$<6;$++)ye(_.__webglFramebuffer[$],C,$);else{let $=C.texture.mipmaps;$&&$.length>0?ye(_.__webglFramebuffer[0],C,0):ye(_.__webglFramebuffer,C,0)}else if(z){_.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[$]),_.__webglDepthbuffer[$]===void 0)_.__webglDepthbuffer[$]=s.createRenderbuffer(),Ct(_.__webglDepthbuffer[$],C,!1);else{let J=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,lt=_.__webglDepthbuffer[$];s.bindRenderbuffer(s.RENDERBUFFER,lt),s.framebufferRenderbuffer(s.FRAMEBUFFER,J,s.RENDERBUFFER,lt)}}else{let $=C.texture.mipmaps;if($&&$.length>0?e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=s.createRenderbuffer(),Ct(_.__webglDepthbuffer,C,!1);else{let J=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,lt=_.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,lt),s.framebufferRenderbuffer(s.FRAMEBUFFER,J,s.RENDERBUFFER,lt)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function ee(C,_,z){let $=i.get(C);_!==void 0&&ot($.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),z!==void 0&&Wt(C)}function me(C){let _=C.texture,z=i.get(C),$=i.get(_);C.addEventListener("dispose",b);let J=C.textures,lt=C.isWebGLCubeRenderTarget===!0,ht=J.length>1;if(ht||($.__webglTexture===void 0&&($.__webglTexture=s.createTexture()),$.__version=_.version,a.memory.textures++),lt){z.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(_.mipmaps&&_.mipmaps.length>0){z.__webglFramebuffer[Q]=[];for(let it=0;it<_.mipmaps.length;it++)z.__webglFramebuffer[Q][it]=s.createFramebuffer()}else z.__webglFramebuffer[Q]=s.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){z.__webglFramebuffer=[];for(let Q=0;Q<_.mipmaps.length;Q++)z.__webglFramebuffer[Q]=s.createFramebuffer()}else z.__webglFramebuffer=s.createFramebuffer();if(ht)for(let Q=0,it=J.length;Q<it;Q++){let ut=i.get(J[Q]);ut.__webglTexture===void 0&&(ut.__webglTexture=s.createTexture(),a.memory.textures++)}if(C.samples>0&&ze(C)===!1){z.__webglMultisampledFramebuffer=s.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let Q=0;Q<J.length;Q++){let it=J[Q];z.__webglColorRenderbuffer[Q]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,z.__webglColorRenderbuffer[Q]);let ut=r.convert(it.format,it.colorSpace),Pt=r.convert(it.type),mt=y(it.internalFormat,ut,Pt,it.normalized,it.colorSpace,C.isXRRenderTarget===!0),dt=ke(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,dt,mt,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Q,s.RENDERBUFFER,z.__webglColorRenderbuffer[Q])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(z.__webglDepthRenderbuffer=s.createRenderbuffer(),Ct(z.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(lt){e.bindTexture(s.TEXTURE_CUBE_MAP,$.__webglTexture),ne(s.TEXTURE_CUBE_MAP,_);for(let Q=0;Q<6;Q++)if(_.mipmaps&&_.mipmaps.length>0)for(let it=0;it<_.mipmaps.length;it++)ot(z.__webglFramebuffer[Q][it],C,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,it);else ot(z.__webglFramebuffer[Q],C,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);p(_)&&v(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ht){for(let Q=0,it=J.length;Q<it;Q++){let ut=J[Q],Pt=i.get(ut),mt=s.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(mt=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(mt,Pt.__webglTexture),ne(mt,ut),ot(z.__webglFramebuffer,C,ut,s.COLOR_ATTACHMENT0+Q,mt,0),p(ut)&&v(mt)}e.unbindTexture()}else{let Q=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Q=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(Q,$.__webglTexture),ne(Q,_),_.mipmaps&&_.mipmaps.length>0)for(let it=0;it<_.mipmaps.length;it++)ot(z.__webglFramebuffer[it],C,_,s.COLOR_ATTACHMENT0,Q,it);else ot(z.__webglFramebuffer,C,_,s.COLOR_ATTACHMENT0,Q,0);p(_)&&v(Q),e.unbindTexture()}C.depthBuffer&&Wt(C)}function se(C){let _=C.textures;for(let z=0,$=_.length;z<$;z++){let J=_[z];if(p(J)){let lt=E(C),ht=i.get(J).__webglTexture;e.bindTexture(lt,ht),v(lt),e.unbindTexture()}}}let Ce=[],qe=[];function _i(C){if(C.samples>0){if(ze(C)===!1){let _=C.textures,z=C.width,$=C.height,J=s.COLOR_BUFFER_BIT,lt=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ht=i.get(C),Q=_.length>1;if(Q)for(let ut=0;ut<_.length;ut++)e.bindFramebuffer(s.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ut,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,ht.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ut,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,ht.__webglMultisampledFramebuffer);let it=C.texture.mipmaps;it&&it.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ht.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ht.__webglFramebuffer);for(let ut=0;ut<_.length;ut++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(J|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(J|=s.STENCIL_BUFFER_BIT)),Q){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,ht.__webglColorRenderbuffer[ut]);let Pt=i.get(_[ut]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Pt,0)}s.blitFramebuffer(0,0,z,$,0,0,z,$,J,s.NEAREST),l===!0&&(Ce.length=0,qe.length=0,Ce.push(s.COLOR_ATTACHMENT0+ut),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(Ce.push(lt),qe.push(lt),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,qe)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Ce))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Q)for(let ut=0;ut<_.length;ut++){e.bindFramebuffer(s.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ut,s.RENDERBUFFER,ht.__webglColorRenderbuffer[ut]);let Pt=i.get(_[ut]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,ht.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ut,s.TEXTURE_2D,Pt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ht.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&l){let _=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[_])}}}function ke(C){return Math.min(n.maxSamples,C.samples)}function ze(C){let _=i.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function U(C){let _=a.render.frame;h.get(C)!==_&&(h.set(C,_),C.update())}function ei(C,_){let z=C.colorSpace,$=C.format,J=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||z!==vs&&z!==Dn&&(Qt.getTransfer(z)===de?($!==mi||J!==Ei)&&Ft("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Bt("WebGLTextures: Unsupported texture color space:",z)),_}function ge(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=K,this.resetTextureUnits=H,this.getTextureUnits=L,this.setTextureUnits=V,this.setTexture2D=j,this.setTexture2DArray=X,this.setTexture3D=et,this.setTextureCube=nt,this.rebindTextures=ee,this.setupRenderTarget=me,this.updateRenderTargetMipmap=se,this.updateMultisampleRenderTarget=_i,this.setupDepthRenderbuffer=Wt,this.setupFrameBufferTexture=ot,this.useMultisampledRTT=ze,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function bb(s,t){function e(i,n=Dn){let r,a=Qt.getTransfer(n);if(i===Ei)return s.UNSIGNED_BYTE;if(i===Jo)return s.UNSIGNED_SHORT_4_4_4_4;if(i===jo)return s.UNSIGNED_SHORT_5_5_5_1;if(i===zh)return s.UNSIGNED_INT_5_9_9_9_REV;if(i===Hh)return s.UNSIGNED_INT_10F_11F_11F_REV;if(i===Fh)return s.BYTE;if(i===Bh)return s.SHORT;if(i===br)return s.UNSIGNED_SHORT;if(i===Zo)return s.INT;if(i===tn)return s.UNSIGNED_INT;if(i===pi)return s.FLOAT;if(i===en)return s.HALF_FLOAT;if(i===Vh)return s.ALPHA;if(i===Gh)return s.RGB;if(i===mi)return s.RGBA;if(i===gn)return s.DEPTH_COMPONENT;if(i===ns)return s.DEPTH_STENCIL;if(i===Qo)return s.RED;if(i===tl)return s.RED_INTEGER;if(i===ss)return s.RG;if(i===el)return s.RG_INTEGER;if(i===il)return s.RGBA_INTEGER;if(i===ga||i===xa||i===va||i===ya)if(a===de)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===ga)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===xa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===va)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ya)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===ga)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===xa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===va)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ya)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===nl||i===sl||i===rl||i===al)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===nl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===sl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===rl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===al)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ol||i===ll||i===cl||i===hl||i===ul||i===ba||i===dl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===ol||i===ll)return a===de?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===cl)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===hl)return r.COMPRESSED_R11_EAC;if(i===ul)return r.COMPRESSED_SIGNED_R11_EAC;if(i===ba)return r.COMPRESSED_RG11_EAC;if(i===dl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===fl||i===pl||i===ml||i===gl||i===xl||i===vl||i===yl||i===bl||i===_l||i===Ml||i===Sl||i===wl||i===El||i===Tl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===fl)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===pl)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ml)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===gl)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===xl)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===vl)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===yl)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===bl)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===_l)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ml)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Sl)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===wl)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===El)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Tl)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Al||i===Rl||i===Cl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Al)return a===de?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Rl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Cl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Pl||i===Il||i===_a||i===Ll)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Pl)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Il)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===_a)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ll)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===_r?s.UNSIGNED_INT_24_8:s[i]!==void 0?s[i]:null}return{convert:e}}var _b=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Mb=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,gu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new sa(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new Fe({vertexShader:_b,fragmentShader:Mb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ce(new Ui(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},xu=class extends xn{constructor(t,e){super();let i=this,n=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null,x=typeof XRWebGLBinding<"u",m=new gu,p={},v=e.getContextAttributes(),E=null,y=null,S=[],M=[],R=new qt,b=null,T=null,A=new ri;A.viewport=new _e;let P=new ri;P.viewport=new _e;let N=[A,P],H=new $o,L=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(I){let Y=S[I];return Y===void 0&&(Y=new fr,S[I]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(I){let Y=S[I];return Y===void 0&&(Y=new fr,S[I]=Y),Y.getGripSpace()},this.getHand=function(I){let Y=S[I];return Y===void 0&&(Y=new fr,S[I]=Y),Y.getHandSpace()};function K(I){let Y=M.indexOf(I.inputSource);if(Y===-1)return;let at=S[Y];at!==void 0&&(at.update(I.inputSource,I.frame,c||a),at.dispatchEvent({type:I.type,data:I.inputSource}))}function Z(){n.removeEventListener("select",K),n.removeEventListener("selectstart",K),n.removeEventListener("selectend",K),n.removeEventListener("squeeze",K),n.removeEventListener("squeezestart",K),n.removeEventListener("squeezeend",K),n.removeEventListener("end",Z),n.removeEventListener("inputsourceschange",j);for(let I=0;I<S.length;I++){let Y=M[I];Y!==null&&(M[I]=null,S[I].disconnect(Y))}L=null,V=null,m.reset();for(let I in p)delete p[I];if(t.setRenderTarget(E),f=null,u=null,d=null,n=null,y=null,rt.stop(),i.isPresenting=!1,t.setPixelRatio(b),t.setSize(R.width,R.height,!1),T!==null){let I=T.camera;I.fov=T.fov,I.zoom=T.zoom,I.updateProjectionMatrix(),T=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(I){r=I,i.isPresenting===!0&&Ft("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(I){o=I,i.isPresenting===!0&&Ft("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(I){c=I},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(n,e)),d},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(I){if(n=I,n!==null){if(E=t.getRenderTarget(),n.addEventListener("select",K),n.addEventListener("selectstart",K),n.addEventListener("selectend",K),n.addEventListener("squeeze",K),n.addEventListener("squeezestart",K),n.addEventListener("squeezeend",K),n.addEventListener("end",Z),n.addEventListener("inputsourceschange",j),v.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(R),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let at=null,yt=null,ot=null;v.depth&&(ot=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,at=v.stencil?ns:gn,yt=v.stencil?_r:tn);let Ct={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Ct),n.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),y=new ai(u.textureWidth,u.textureHeight,{format:mi,type:Ei,depthTexture:new Zn(u.textureWidth,u.textureHeight,yt,void 0,void 0,void 0,void 0,void 0,void 0,at),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let at={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(n,e,at),n.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new ai(f.framebufferWidth,f.framebufferHeight,{format:mi,type:Ei,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await n.requestReferenceSpace(o),rt.setContext(n),rt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function j(I){for(let Y=0;Y<I.removed.length;Y++){let at=I.removed[Y],yt=M.indexOf(at);yt>=0&&(M[yt]=null,S[yt].disconnect(at))}for(let Y=0;Y<I.added.length;Y++){let at=I.added[Y],yt=M.indexOf(at);if(yt===-1){for(let Ct=0;Ct<S.length;Ct++)if(Ct>=M.length){M.push(at),yt=Ct;break}else if(M[Ct]===null){M[Ct]=at,yt=Ct;break}if(yt===-1)break}let ot=S[yt];ot&&ot.connect(at)}}let X=new k,et=new k;function nt(I,Y,at){X.setFromMatrixPosition(Y.matrixWorld),et.setFromMatrixPosition(at.matrixWorld);let yt=X.distanceTo(et),ot=Y.projectionMatrix.elements,Ct=at.projectionMatrix.elements,ye=ot[14]/(ot[10]-1),Wt=ot[14]/(ot[10]+1),ee=(ot[9]+1)/ot[5],me=(ot[9]-1)/ot[5],se=(ot[8]-1)/ot[0],Ce=(Ct[8]+1)/Ct[0],qe=ye*se,_i=ye*Ce,ke=yt/(-se+Ce),ze=ke*-se;if(Y.matrixWorld.decompose(I.position,I.quaternion,I.scale),I.translateX(ze),I.translateZ(ke),I.matrixWorld.compose(I.position,I.quaternion,I.scale),I.matrixWorldInverse.copy(I.matrixWorld).invert(),ot[10]===-1)I.projectionMatrix.copy(Y.projectionMatrix),I.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{let U=ye+ke,ei=Wt+ke,ge=qe-ze,C=_i+(yt-ze),_=ee*Wt/ei*U,z=me*Wt/ei*U;I.projectionMatrix.makePerspective(ge,C,_,z,U,ei),I.projectionMatrixInverse.copy(I.projectionMatrix).invert()}}function Lt(I,Y){Y===null?I.matrixWorld.copy(I.matrix):I.matrixWorld.multiplyMatrices(Y.matrixWorld,I.matrix),I.matrixWorldInverse.copy(I.matrixWorld).invert()}this.updateCamera=function(I){if(n===null)return;let Y=I.near,at=I.far;m.texture!==null&&(m.depthNear>0&&(Y=m.depthNear),m.depthFar>0&&(at=m.depthFar)),H.near=P.near=A.near=Y,H.far=P.far=A.far=at,(L!==H.near||V!==H.far)&&(n.updateRenderState({depthNear:H.near,depthFar:H.far}),L=H.near,V=H.far),H.layers.mask=I.layers.mask|6,A.layers.mask=H.layers.mask&-5,P.layers.mask=H.layers.mask&-3;let yt=I.parent,ot=H.cameras;Lt(H,yt);for(let Ct=0;Ct<ot.length;Ct++)Lt(ot[Ct],yt);ot.length===2?nt(H,A,P):H.projectionMatrix.copy(A.projectionMatrix),T===null&&I.isPerspectiveCamera&&(T={camera:I,fov:I.fov,zoom:I.zoom}),At(I,H,yt)};function At(I,Y,at){at===null?I.matrix.copy(Y.matrixWorld):(I.matrix.copy(at.matrixWorld),I.matrix.invert(),I.matrix.multiply(Y.matrixWorld)),I.matrix.decompose(I.position,I.quaternion,I.scale),I.updateMatrixWorld(!0),I.projectionMatrix.copy(Y.projectionMatrix),I.projectionMatrixInverse.copy(Y.projectionMatrixInverse),I.isPerspectiveCamera&&(I.fov=So*2*Math.atan(1/I.projectionMatrix.elements[5]),I.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(I){l=I,u!==null&&(u.fixedFoveation=I),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=I)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(H)},this.getCameraTexture=function(I){return p[I]};let oe=null;function ne(I,Y){if(h=Y.getViewerPose(c||a),g=Y,h!==null){let at=h.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let yt=!1;at.length!==H.cameras.length&&(H.cameras.length=0,yt=!0);for(let Wt=0;Wt<at.length;Wt++){let ee=at[Wt],me=null;if(f!==null)me=f.getViewport(ee);else{let Ce=d.getViewSubImage(u,ee);me=Ce.viewport,Wt===0&&(t.setRenderTargetTextures(y,Ce.colorTexture,Ce.depthStencilTexture),t.setRenderTarget(y))}let se=N[Wt];se===void 0&&(se=new ri,se.layers.enable(Wt),se.viewport=new _e,N[Wt]=se),se.matrix.fromArray(ee.transform.matrix),se.matrix.decompose(se.position,se.quaternion,se.scale),se.projectionMatrix.fromArray(ee.projectionMatrix),se.projectionMatrixInverse.copy(se.projectionMatrix).invert(),se.viewport.set(me.x,me.y,me.width,me.height),Wt===0&&(H.matrix.copy(se.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),yt===!0&&H.cameras.push(se)}let ot=n.enabledFeatures;if(ot&&ot.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&x){d=i.getBinding();let Wt=d.getDepthInformation(at[0]);Wt&&Wt.isValid&&Wt.texture&&m.init(Wt,n.renderState)}if(ot&&ot.includes("camera-access")&&x){t.state.unbindTexture(),d=i.getBinding();for(let Wt=0;Wt<at.length;Wt++){let ee=at[Wt].camera;if(ee){let me=p[ee];me||(me=new sa,p[ee]=me);let se=d.getCameraImage(ee);me.sourceTexture=se}}}}for(let at=0;at<S.length;at++){let yt=M[at],ot=S[at];yt!==null&&ot!==void 0&&ot.update(yt,Y,c||a)}oe&&oe(I,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),g=null}let rt=new tp;rt.setAnimationLoop(ne),this.setAnimationLoop=function(I){oe=I},this.dispose=function(){}}},Sb=new Gt,ap=new Ht;ap.set(-1,0,0,0,1,0,0,0,1);function wb(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Yh(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function n(m,p,v,E,y){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,v,E):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Je&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Je&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let v=t.get(p),E=v.envMap,y=v.envMapRotation;E&&(m.envMap.value=E,m.envMapRotation.value.setFromMatrix4(Sb.makeRotationFromEuler(y)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(ap),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,v,E){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=E*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Je&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let v=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function Eb(s,t,e,i){let n={},r={},a=[],o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,S){let M=S.program;i.uniformBlockBinding(y,M)}function c(y,S){let M=n[y.id];M===void 0&&(m(y),M=h(y),n[y.id]=M,y.addEventListener("dispose",v));let R=S.program;i.updateUBOMapping(y,R);let b=t.render.frame;r[y.id]!==b&&(u(y),r[y.id]=b)}function h(y){let S=d();y.__bindingPointIndex=S;let M=s.createBuffer(),R=y.__size,b=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,M),s.bufferData(s.UNIFORM_BUFFER,R,b),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,S,M),M}function d(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return Bt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){let S=n[y.id],M=y.uniforms,R=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,S);for(let b=0,T=M.length;b<T;b++){let A=M[b];if(Array.isArray(A))for(let P=0,N=A.length;P<N;P++)f(A[P],b,P,R);else f(A,b,0,R)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(y,S,M,R){if(x(y,S,M,R)===!0){let b=y.__offset,T=y.value;if(Array.isArray(T)){let A=0;for(let P=0;P<T.length;P++){let N=T[P],H=p(N);g(N,y.__data,A),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(A+=H.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(T,y.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,b,y.__data)}}function g(y,S,M){typeof y=="number"||typeof y=="boolean"?S[0]=y:y.isMatrix3?(S[0]=y.elements[0],S[1]=y.elements[1],S[2]=y.elements[2],S[3]=0,S[4]=y.elements[3],S[5]=y.elements[4],S[6]=y.elements[5],S[7]=0,S[8]=y.elements[6],S[9]=y.elements[7],S[10]=y.elements[8],S[11]=0):ArrayBuffer.isView(y)?S.set(new y.constructor(y.buffer,y.byteOffset,S.length)):y.toArray(S,M)}function x(y,S,M,R){let b=y.value,T=S+"_"+M;if(R[T]===void 0)return typeof b=="number"||typeof b=="boolean"?R[T]=b:ArrayBuffer.isView(b)?R[T]=b.slice():R[T]=b.clone(),!0;{let A=R[T];if(typeof b=="number"||typeof b=="boolean"){if(A!==b)return R[T]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(A.equals(b)===!1)return A.copy(b),!0}}return!1}function m(y){let S=y.uniforms,M=0,R=16;for(let T=0,A=S.length;T<A;T++){let P=Array.isArray(S[T])?S[T]:[S[T]];for(let N=0,H=P.length;N<H;N++){let L=P[N],V=Array.isArray(L.value)?L.value:[L.value];for(let K=0,Z=V.length;K<Z;K++){let j=V[K],X=p(j),et=M%R,nt=et%X.boundary,Lt=et+nt;M+=nt,Lt!==0&&R-Lt<X.storage&&(M+=R-Lt),L.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=M,M+=X.storage}}}let b=M%R;return b>0&&(M+=R-b),y.__size=M,y.__cache={},this}function p(y){let S={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(S.boundary=4,S.storage=4):y.isVector2?(S.boundary=8,S.storage=8):y.isVector3||y.isColor?(S.boundary=16,S.storage=12):y.isVector4?(S.boundary=16,S.storage=16):y.isMatrix3?(S.boundary=48,S.storage=48):y.isMatrix4?(S.boundary=64,S.storage=64):y.isTexture?Ft("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(S.boundary=16,S.storage=y.byteLength):Ft("WebGLRenderer: Unsupported uniform value type.",y),S}function v(y){let S=y.target;S.removeEventListener("dispose",v);let M=a.indexOf(S.__bindingPointIndex);a.splice(M,1),s.deleteBuffer(n[S.id]),delete n[S.id],delete r[S.id]}function E(){for(let y in n)s.deleteBuffer(n[y]);a=[],n={},r={}}return{bind:l,update:c,dispose:E}}var Tb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Mn=null;function Ab(){return Mn===null&&(Mn=new Kn(Tb,16,16,ss,en),Mn.name="DFG_LUT",Mn.minFilter=Ze,Mn.magFilter=Ze,Mn.wrapS=mn,Mn.wrapT=mn,Mn.generateMipmaps=!1,Mn.needsUpdate=!0),Mn}var Bl=class{constructor(t={}){let{canvas:e=Tf(),context:i=null,depth:n=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Ei}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;let x=f,m=new Set([il,el,tl]),p=new Set([Ei,tn,br,_r,Jo,jo]),v=new Uint32Array(4),E=new Int32Array(4),y=new k,S=null,M=null,R=[],b=[],T=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Qi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let A=this,P=!1,N=null,H=null,L=null,V=null;this._outputColorSpace=Ri;let K=0,Z=0,j=null,X=-1,et=null,nt=new _e,Lt=new _e,At=null,oe=new Yt(0),ne=0,rt=e.width,I=e.height,Y=1,at=null,yt=null,ot=new _e(0,0,rt,I),Ct=new _e(0,0,rt,I),ye=!1,Wt=new mr,ee=!1,me=!1,se=new Gt,Ce=new k,qe=new _e,_i={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ke=!1;function ze(){return j===null?Y:1}let U=i;function ei(w,D){return e.getContext(w,D)}let ge,C,_,z,$,J,lt,ht,Q,it,ut,Pt,mt,dt,It,Dt,Xt,O,ft,tt,pt,vt,st;try{let w={alpha:!0,depth:n,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",Se,!1),e.addEventListener("webglcontextrestored",he,!1),e.addEventListener("webglcontextcreationerror",qi,!1),U===null){let D="webgl2";if(U=ei(D,w),U===null)throw ei(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}kt()}catch(w){throw e.removeEventListener("webglcontextlost",Se,!1),e.removeEventListener("webglcontextrestored",he,!1),e.removeEventListener("webglcontextcreationerror",qi,!1),Bt("WebGLRenderer: "+w.message),w}function kt(){ge=new Nv(U),ge.init(),pt=new bb(U,ge),C=new wv(U,ge,t,pt),_=new vb(U,ge),C.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),H=U.createFramebuffer(),L=U.createFramebuffer(),V=U.createFramebuffer(),z=new Uv(U),$=new sb,J=new yb(U,ge,_,$,C,pt,z),lt=new kv(A),ht=new B0(U),vt=new Mv(U,ht),Q=new Dv(U,ht,z,vt),it=new Bv(U,Q,ht,vt,z),O=new Fv(U,C,J),It=new Ev($),ut=new nb(A,lt,ge,C,vt,It),Pt=new wb(A,$),mt=new ab,dt=new db(ge),Xt=new _v(A,lt,_,it,g,l),Dt=new xb(A,it,C),st=new Eb(U,z,C,_),ft=new Sv(U,ge,z),tt=new Ov(U,ge,z),z.programs=ut.programs,A.capabilities=C,A.extensions=ge,A.properties=$,A.renderLists=mt,A.shadowMap=Dt,A.state=_,A.info=z}x!==Ei&&(T=new Hv(x,e.width,e.height,o,n,r));let Tt=new xu(A,U);this.xr=Tt,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let w=ge.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=ge.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(w){w!==void 0&&(Y=w,this.setSize(rt,I,!1))},this.getSize=function(w){return w.set(rt,I)},this.setSize=function(w,D,q=!0){if(Tt.isPresenting){Ft("WebGLRenderer: Can't change size while VR device is presenting.");return}rt=w,I=D,e.width=Math.floor(w*Y),e.height=Math.floor(D*Y),q===!0&&(e.style.width=w+"px",e.style.height=D+"px"),T!==null&&T.setSize(e.width,e.height),this.setViewport(0,0,w,D)},this.getDrawingBufferSize=function(w){return w.set(rt*Y,I*Y).floor()},this.setDrawingBufferSize=function(w,D,q){rt=w,I=D,Y=q,e.width=Math.floor(w*q),e.height=Math.floor(D*q),this.setViewport(0,0,w,D)},this.setEffects=function(w){if(x===Ei){Bt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let D=0;D<w.length;D++)if(w[D].isOutputPass===!0){Ft("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(nt)},this.getViewport=function(w){return w.copy(ot)},this.setViewport=function(w,D,q,G){w.isVector4?ot.set(w.x,w.y,w.z,w.w):ot.set(w,D,q,G),_.viewport(nt.copy(ot).multiplyScalar(Y).round())},this.getScissor=function(w){return w.copy(Ct)},this.setScissor=function(w,D,q,G){w.isVector4?Ct.set(w.x,w.y,w.z,w.w):Ct.set(w,D,q,G),_.scissor(Lt.copy(Ct).multiplyScalar(Y).round())},this.getScissorTest=function(){return ye},this.setScissorTest=function(w){_.setScissorTest(ye=w)},this.setOpaqueSort=function(w){at=w},this.setTransparentSort=function(w){yt=w},this.getClearColor=function(w){return w.copy(Xt.getClearColor())},this.setClearColor=function(){Xt.setClearColor(...arguments)},this.getClearAlpha=function(){return Xt.getClearAlpha()},this.setClearAlpha=function(){Xt.setClearAlpha(...arguments)},this.clear=function(w=!0,D=!0,q=!0){let G=0;if(w){let W=!1;if(j!==null){let xt=j.texture.format;W=m.has(xt)}if(W){let xt=j.texture.type,Mt=p.has(xt),gt=Xt.getClearColor(),St=Xt.getClearAlpha(),Rt=gt.r,Kt=gt.g,ie=gt.b;Mt?(v[0]=Rt,v[1]=Kt,v[2]=ie,v[3]=St,U.clearBufferuiv(U.COLOR,0,v)):(E[0]=Rt,E[1]=Kt,E[2]=ie,E[3]=St,U.clearBufferiv(U.COLOR,0,E))}else G|=U.COLOR_BUFFER_BIT}D&&(G|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(G|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&U.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),N=w},this.dispose=function(){e.removeEventListener("webglcontextlost",Se,!1),e.removeEventListener("webglcontextrestored",he,!1),e.removeEventListener("webglcontextcreationerror",qi,!1),Xt.dispose(),mt.dispose(),dt.dispose(),$.dispose(),lt.dispose(),it.dispose(),vt.dispose(),st.dispose(),ut.dispose(),Tt.dispose(),Tt.removeEventListener("sessionstart",dd),Tt.removeEventListener("sessionend",fd),ds.stop()};function Se(w){w.preventDefault(),qh("WebGLRenderer: Context Lost."),P=!0}function he(){qh("WebGLRenderer: Context Restored."),P=!1;let w=z.autoReset,D=Dt.enabled,q=Dt.autoUpdate,G=Dt.needsUpdate,W=Dt.type;kt(),z.autoReset=w,Dt.enabled=D,Dt.autoUpdate=q,Dt.needsUpdate=G,Dt.type=W}function qi(w){Bt("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function dn(w){let D=w.target;D.removeEventListener("dispose",dn),Ym(D)}function Ym(w){Km(w),$.remove(w)}function Km(w){let D=$.get(w).programs;D!==void 0&&(D.forEach(function(q){ut.releaseProgram(q)}),w.isShaderMaterial&&ut.releaseShaderCache(w))}this.renderBufferDirect=function(w,D,q,G,W,xt){D===null&&(D=_i);let Mt=W.isMesh&&W.matrixWorld.determinantAffine()<0,gt=jm(w,D,q,G,W);_.setMaterial(G,Mt);let St=q.index,Rt=1;if(G.wireframe===!0){if(St=Q.getWireframeAttribute(q),St===void 0)return;Rt=2}let Kt=q.drawRange,ie=q.attributes.position,wt=Kt.start*Rt,ue=(Kt.start+Kt.count)*Rt;xt!==null&&(wt=Math.max(wt,xt.start*Rt),ue=Math.min(ue,(xt.start+xt.count)*Rt)),St!==null?(wt=Math.max(wt,0),ue=Math.min(ue,St.count)):ie!=null&&(wt=Math.max(wt,0),ue=Math.min(ue,ie.count));let He=ue-wt;if(He<0||He===1/0)return;vt.setup(W,G,gt,q,St);let Te,be=ft;if(St!==null&&(Te=ht.get(St),be=tt,be.setIndex(Te)),W.isMesh)G.wireframe===!0?(_.setLineWidth(G.wireframeLinewidth*ze()),be.setMode(U.LINES)):be.setMode(U.TRIANGLES);else if(W.isLine){let ii=G.linewidth;ii===void 0&&(ii=1),_.setLineWidth(ii*ze()),W.isLineSegments?be.setMode(U.LINES):W.isLineLoop?be.setMode(U.LINE_LOOP):be.setMode(U.LINE_STRIP)}else W.isPoints?be.setMode(U.POINTS):W.isSprite&&be.setMode(U.TRIANGLES);if(W.isBatchedMesh)if(ge.get("WEBGL_multi_draw"))be.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{let ii=W._multiDrawStarts,bt=W._multiDrawCounts,ui=W._multiDrawCount,le=St?ht.get(St).bytesPerElement:1,Di=$.get(G).currentProgram.getUniforms();for(let fn=0;fn<ui;fn++)Di.setValue(U,"_gl_DrawID",fn),be.render(ii[fn]/le,bt[fn])}else if(W.isInstancedMesh)be.renderInstances(wt,He,W.count);else if(q.isInstancedBufferGeometry){let ii=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,bt=Math.min(q.instanceCount,ii);be.renderInstances(wt,He,bt)}else be.render(wt,He)};function ud(w,D,q,G){N!==null&&w.isNodeMaterial&&N.setObject(G,w),ee===!0&&It.setState(w,q,!1),w.transparent===!0&&w.side===Fi&&w.forceSinglePass===!1?(w.side=Je,w.needsUpdate=!0,Ga(w,D,G),w.side=bn,w.needsUpdate=!0,Ga(w,D,G),w.side=Fi):Ga(w,D,G)}this.compile=function(w,D,q=null){q===null&&(q=w),N!==null&&N.renderStart(w,D,q),M=dt.get(q),M.init(D),b.push(M),q.traverseVisible(function(W){W.isLight&&W.layers.test(D.layers)&&(M.pushLight(W),W.castShadow&&M.pushShadow(W))}),w!==q&&w.traverseVisible(function(W){W.isLight&&W.layers.test(D.layers)&&(M.pushLight(W),W.castShadow&&M.pushShadow(W))}),M.setupLights(),N!==null&&N.updateLights(M.state.lightsArray),me=this.localClippingEnabled,ee=It.init(this.clippingPlanes,me),ee===!0&&It.setGlobalState(this.clippingPlanes,D),N!==null&&Dt.render(M.state.shadowsArray,q,D);let G=new Set;return w.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;let xt=W.material;if(xt)if(Array.isArray(xt))for(let Mt=0;Mt<xt.length;Mt++){let gt=xt[Mt];ud(gt,q,D,W),G.add(gt)}else ud(xt,q,D,W),G.add(xt)}),M=b.pop(),N!==null&&N.renderEnd(),G},this.compileAsync=function(w,D,q=null){let G=this.compile(w,D,q);return new Promise(W=>{function xt(){if(G.forEach(function(Mt){let St=$.get(Mt).currentProgram;(St===void 0||St.isReady())&&G.delete(Mt)}),G.size===0){W(w);return}setTimeout(xt,10)}ge.get("KHR_parallel_shader_compile")!==null?xt():setTimeout(xt,10)})};let Wc=null;function Zm(w){Wc&&Wc(w)}function dd(){ds.stop()}function fd(){ds.start()}let ds=new tp;ds.setAnimationLoop(Zm),typeof self<"u"&&ds.setContext(self),this.setAnimationLoop=function(w){Wc=w,Tt.setAnimationLoop(w),w===null?ds.stop():ds.start()},Tt.addEventListener("sessionstart",dd),Tt.addEventListener("sessionend",fd),this.render=function(w,D){if(D!==void 0&&D.isCamera!==!0){Bt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;N!==null&&N.renderStart(w,D);let q=Tt.enabled===!0&&Tt.isPresenting===!0,G=T!==null&&(j===null||q)&&T.begin(A,j);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Tt.enabled===!0&&Tt.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Tt.cameraAutoUpdate===!0&&Tt.updateCamera(D),D=Tt.getCamera()),w.isScene===!0&&w.onBeforeRender(A,w,D,j),M=dt.get(w,b.length),M.init(D),M.state.textureUnits=J.getTextureUnits(),b.push(M),se.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Wt.setFromProjectionMatrix(se,ji,D.reversedDepth),me=this.localClippingEnabled,ee=It.init(this.clippingPlanes,me),S=mt.get(w,R.length),S.init(),R.push(S),Tt.enabled===!0&&Tt.isPresenting===!0){let Mt=A.xr.getDepthSensingMesh();Mt!==null&&$c(Mt,D,-1/0,A.sortObjects)}$c(w,D,0,A.sortObjects),S.finish(),N!==null&&N.updateLights(M.state.lightsArray),A.sortObjects===!0&&S.sort(at,yt),ke=Tt.enabled===!1||Tt.isPresenting===!1||Tt.hasDepthSensing()===!1,ke&&Xt.addToRenderList(S,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ee===!0&&It.beginShadows();let W=M.state.shadowsArray;if(Dt.render(W,w,D),ee===!0&&It.endShadows(),(G&&T.hasRenderPass())===!1){let Mt=S.opaque,gt=S.transmissive;if(M.setupLights(),D.isArrayCamera){let St=D.cameras;if(gt.length>0)for(let Rt=0,Kt=St.length;Rt<Kt;Rt++){let ie=St[Rt];md(Mt,gt,w,ie)}ke&&Xt.render(w);for(let Rt=0,Kt=St.length;Rt<Kt;Rt++){let ie=St[Rt];pd(S,w,ie,ie.viewport)}}else gt.length>0&&md(Mt,gt,w,D),ke&&Xt.render(w),pd(S,w,D)}j!==null&&Z===0&&(J.updateMultisampleRenderTarget(j),J.updateRenderTargetMipmap(j)),G&&T.end(A),w.isScene===!0&&w.onAfterRender(A,w,D),vt.resetDefaultState(),X=-1,et=null,b.pop(),b.length>0?(M=b[b.length-1],J.setTextureUnits(M.state.textureUnits),ee===!0&&It.setGlobalState(A.clippingPlanes,M.state.camera)):M=null,R.pop(),R.length>0?S=R[R.length-1]:S=null,N!==null&&N.renderEnd()};function $c(w,D,q,G){if(w.visible===!1)return;if(w.layers.test(D.layers)){if(w.isGroup)q=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(D);else if(w.isLightProbeGrid)M.pushLightProbeGrid(w);else if(w.isLight)M.pushLight(w),w.castShadow&&M.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(Wt)){G&&qe.setFromMatrixPosition(w.matrixWorld).applyMatrix4(se);let Mt=it.update(w),gt=w.material;gt.visible&&S.push(w,Mt,gt,q,qe.z,null,D)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(Wt))){let Mt=it.update(w),gt=w.material;if(G&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),qe.copy(w.boundingSphere.center)):(Mt.boundingSphere===null&&Mt.computeBoundingSphere(),qe.copy(Mt.boundingSphere.center)),qe.applyMatrix4(w.matrixWorld).applyMatrix4(se)),Array.isArray(gt)){let St=Mt.groups;for(let Rt=0,Kt=St.length;Rt<Kt;Rt++){let ie=St[Rt],wt=gt[ie.materialIndex];wt&&wt.visible&&S.push(w,Mt,wt,q,qe.z,ie,D)}}else gt.visible&&S.push(w,Mt,gt,q,qe.z,null,D)}}let xt=w.children;for(let Mt=0,gt=xt.length;Mt<gt;Mt++)$c(xt[Mt],D,q,G)}function pd(w,D,q,G){let{opaque:W,transmissive:xt,transparent:Mt}=w;M.setupLightsView(q),ee===!0&&It.setGlobalState(A.clippingPlanes,q),G&&_.viewport(nt.copy(G)),W.length>0&&Va(W,D,q),xt.length>0&&Va(xt,D,q),Mt.length>0&&Va(Mt,D,q),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function md(w,D,q,G){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[G.id]===void 0){let wt=ge.has("EXT_color_buffer_half_float")||ge.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[G.id]=new ai(1,1,{generateMipmaps:!0,type:wt?en:Ei,minFilter:is,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Qt.workingColorSpace})}let xt=M.state.transmissionRenderTarget[G.id],Mt=G.viewport||nt;xt.setSize(Mt.z*A.transmissionResolutionScale,Mt.w*A.transmissionResolutionScale);let gt=A.getRenderTarget(),St=A.getActiveCubeFace(),Rt=A.getActiveMipmapLevel();A.setRenderTarget(xt),A.getClearColor(oe),ne=A.getClearAlpha(),ne<1&&A.setClearColor(16777215,.5),A.clear(),ke&&Xt.render(q);let Kt=A.toneMapping;A.toneMapping=Qi;let ie=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),M.setupLightsView(G),ee===!0&&It.setGlobalState(A.clippingPlanes,G),Va(w,q,G),J.updateMultisampleRenderTarget(xt),J.updateRenderTargetMipmap(xt),ge.has("WEBGL_multisampled_render_to_texture")===!1){let wt=!1;for(let ue=0,He=D.length;ue<He;ue++){let Te=D[ue],{object:be,geometry:ii,material:bt,group:ui}=Te;if(bt.side===Fi&&be.layers.test(G.layers)){let le=bt.side;bt.side=Je,bt.needsUpdate=!0,gd(be,q,G,ii,bt,ui),bt.side=le,bt.needsUpdate=!0,wt=!0}}wt===!0&&(J.updateMultisampleRenderTarget(xt),J.updateRenderTargetMipmap(xt))}A.setRenderTarget(gt,St,Rt),A.setClearColor(oe,ne),ie!==void 0&&(G.viewport=ie),A.toneMapping=Kt}function Va(w,D,q){let G=D.isScene===!0?D.overrideMaterial:null;for(let W=0,xt=w.length;W<xt;W++){let Mt=w[W],{object:gt,geometry:St,group:Rt}=Mt,Kt=Mt.material;Kt.allowOverride===!0&&G!==null&&(Kt=G),gt.layers.test(q.layers)&&gd(gt,D,q,St,Kt,Rt)}}function gd(w,D,q,G,W,xt){N!==null&&W.isNodeMaterial&&N.setObject(w,W),w.onBeforeRender(A,D,q,G,W,xt),w.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),W.onBeforeRender(A,D,q,G,w,xt),W.transparent===!0&&W.side===Fi&&W.forceSinglePass===!1?(W.side=Je,W.needsUpdate=!0,A.renderBufferDirect(q,D,G,W,w,xt),W.side=bn,W.needsUpdate=!0,A.renderBufferDirect(q,D,G,W,w,xt),W.side=Fi):A.renderBufferDirect(q,D,G,W,w,xt),w.onAfterRender(A,D,q,G,W,xt)}function Ga(w,D,q){D.isScene!==!0&&(D=_i);let G=$.get(w),W=M.state.lights,xt=M.state.shadowsArray,Mt=W.state.version,gt=ut.getParameters(w,W.state,xt,D,q,M.state.lightProbeGridArray),St=ut.getProgramCacheKey(gt),Rt=G.programs;G.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?D.environment:null,G.fog=D.fog;let Kt=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;G.envMap=lt.get(w.envMap||G.environment,Kt),G.envMapRotation=G.environment!==null&&w.envMap===null?D.environmentRotation:w.envMapRotation,Rt===void 0&&(w.addEventListener("dispose",dn),Rt=new Map,G.programs=Rt);let ie=Rt.get(St);if(ie!==void 0){if(G.currentProgram===ie&&G.lightsStateVersion===Mt)return vd(w,gt),ie}else gt.uniforms=ut.getUniforms(w),N!==null&&w.isNodeMaterial&&N.build(w,q,gt),w.onBeforeCompile(gt,A),ie=ut.acquireProgram(gt,St),Rt.set(St,ie),G.uniforms=gt.uniforms;let wt=G.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(wt.clippingPlanes=It.uniform),vd(w,gt),G.needsLights=t0(w),G.lightsStateVersion=Mt,G.needsLights&&(wt.ambientLightColor.value=W.state.ambient,wt.lightProbe.value=W.state.probe,wt.sunLights.value=W.state.sun,wt.sunLightShadows.value=W.state.sunShadow,wt.directionalLights.value=W.state.directional,wt.directionalLightShadows.value=W.state.directionalShadow,wt.spotLights.value=W.state.spot,wt.spotLightShadows.value=W.state.spotShadow,wt.rectAreaLights.value=W.state.rectArea,wt.ltc_1.value=W.state.rectAreaLTC1,wt.ltc_2.value=W.state.rectAreaLTC2,wt.pointLights.value=W.state.point,wt.pointLightShadows.value=W.state.pointShadow,wt.hemisphereLights.value=W.state.hemi,wt.sunShadowMatrix.value=W.state.sunShadowMatrix,wt.sunShadowCascade.value=W.state.sunShadowCascade,wt.directionalShadowMatrix.value=W.state.directionalShadowMatrix,wt.spotLightMatrix.value=W.state.spotLightMatrix,wt.spotLightMap.value=W.state.spotLightMap,wt.pointShadowMatrix.value=W.state.pointShadowMatrix),G.lightProbeGrid=M.state.lightProbeGridArray.length>0,G.currentProgram=ie,G.uniformsList=null,ie}function xd(w){if(w.uniformsList===null){let D=w.currentProgram.getUniforms();w.uniformsList=wr.seqWithValue(D.seq,w.uniforms)}return w.uniformsList}function vd(w,D){let q=$.get(w);q.outputColorSpace=D.outputColorSpace,q.batching=D.batching,q.batchingColor=D.batchingColor,q.instancing=D.instancing,q.instancingColor=D.instancingColor,q.instancingMorph=D.instancingMorph,q.skinning=D.skinning,q.morphTargets=D.morphTargets,q.morphNormals=D.morphNormals,q.morphColors=D.morphColors,q.morphTargetsCount=D.morphTargetsCount,q.numClippingPlanes=D.numClippingPlanes,q.numIntersection=D.numClipIntersection,q.vertexAlphas=D.vertexAlphas,q.vertexTangents=D.vertexTangents,q.toneMapping=D.toneMapping}function Jm(w,D){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;y.setFromMatrixPosition(D.matrixWorld);for(let q=0,G=w.length;q<G;q++){let W=w[q];if(W.texture!==null&&W.boundingBox.containsPoint(y))return W}return null}function jm(w,D,q,G,W){D.isScene!==!0&&(D=_i),J.resetTextureUnits();let xt=D.fog,Mt=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?D.environment:null,gt=j===null?A.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Qt.workingColorSpace,St=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Rt=lt.get(G.envMap||Mt,St),Kt=G.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,ie=!!q.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),wt=!!q.morphAttributes.position,ue=!!q.morphAttributes.normal,He=!!q.morphAttributes.color,Te=Qi;G.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Te=A.toneMapping);let be=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,ii=be!==void 0?be.length:0,bt=$.get(G),ui=M.state.lights;if(ee===!0&&(me===!0||w!==et)){let we=w===et&&G.id===X;It.setState(G,w,we)}let le=!1;G.version===bt.__version?(bt.needsLights&&bt.lightsStateVersion!==ui.state.version||bt.outputColorSpace!==gt||W.isBatchedMesh&&bt.batching===!1||!W.isBatchedMesh&&bt.batching===!0||W.isBatchedMesh&&bt.batchingColor===!0&&W._colorsTexture===null||W.isBatchedMesh&&bt.batchingColor===!1&&W._colorsTexture!==null||W.isInstancedMesh&&bt.instancing===!1||!W.isInstancedMesh&&bt.instancing===!0||W.isSkinnedMesh&&bt.skinning===!1||!W.isSkinnedMesh&&bt.skinning===!0||W.isInstancedMesh&&bt.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&bt.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&bt.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&bt.instancingMorph===!1&&W.morphTexture!==null||bt.envMap!==Rt||G.fog===!0&&bt.fog!==xt||bt.numClippingPlanes!==void 0&&(bt.numClippingPlanes!==It.numPlanes||bt.numIntersection!==It.numIntersection)||bt.vertexAlphas!==Kt||bt.vertexTangents!==ie||bt.morphTargets!==wt||bt.morphNormals!==ue||bt.morphColors!==He||bt.toneMapping!==Te||bt.morphTargetsCount!==ii||!!bt.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(le=!0):(le=!0,bt.__version=G.version);let Di=bt.currentProgram;le===!0&&(Di=Ga(G,D,W),N&&G.isNodeMaterial&&N.onUpdateProgram(G,Di,bt));let fn=!1,zn=!1,Xs=!1,xe=Di.getUniforms(),Ue=bt.uniforms;if(_.useProgram(Di.program)&&(fn=!0,zn=!0,Xs=!0),G.id!==X&&(X=G.id,zn=!0),bt.needsLights){let we=Jm(M.state.lightProbeGridArray,W);bt.lightProbeGrid!==we&&(bt.lightProbeGrid=we,zn=!0)}if(fn||et!==w){_.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),xe.setValue(U,"projectionMatrix",w.projectionMatrix),xe.setValue(U,"viewMatrix",w.matrixWorldInverse);let Vn=xe.map.cameraPosition;Vn!==void 0&&Vn.setValue(U,Ce.setFromMatrixPosition(w.matrixWorld)),C.logarithmicDepthBuffer&&xe.setValue(U,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&xe.setValue(U,"isOrthographic",w.isOrthographicCamera===!0),et!==w&&(et=w,zn=!0,Xs=!0)}if(bt.needsLights&&(ui.state.sunShadowMap.length>0&&xe.setValue(U,"sunShadowMap",ui.state.sunShadowMap,J),ui.state.directionalShadowMap.length>0&&xe.setValue(U,"directionalShadowMap",ui.state.directionalShadowMap,J),ui.state.spotShadowMap.length>0&&xe.setValue(U,"spotShadowMap",ui.state.spotShadowMap,J),ui.state.pointShadowMap.length>0&&xe.setValue(U,"pointShadowMap",ui.state.pointShadowMap,J)),W.isSkinnedMesh){xe.setOptional(U,W,"bindMatrix"),xe.setOptional(U,W,"bindMatrixInverse");let we=W.skeleton;we&&(we.boneTexture===null&&we.computeBoneTexture(),xe.setValue(U,"boneTexture",we.boneTexture,J))}W.isBatchedMesh&&(xe.setOptional(U,W,"batchingTexture"),xe.setValue(U,"batchingTexture",W._matricesTexture,J),xe.setOptional(U,W,"batchingIdTexture"),xe.setValue(U,"batchingIdTexture",W._indirectTexture,J),xe.setOptional(U,W,"batchingColorTexture"),W._colorsTexture!==null&&xe.setValue(U,"batchingColorTexture",W._colorsTexture,J));let Hn=q.morphAttributes;if((Hn.position!==void 0||Hn.normal!==void 0||Hn.color!==void 0)&&O.update(W,q,Di),(zn||bt.receiveShadow!==W.receiveShadow)&&(bt.receiveShadow=W.receiveShadow,xe.setValue(U,"receiveShadow",W.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&D.environment!==null&&(Ue.envMapIntensity.value=D.environmentIntensity),Ue.dfgLUT!==void 0&&(Ue.dfgLUT.value=Ab()),zn){if(xe.setValue(U,"toneMappingExposure",A.toneMappingExposure),bt.needsLights&&Qm(Ue,Xs),xt&&G.fog===!0&&Pt.refreshFogUniforms(Ue,xt),Pt.refreshMaterialUniforms(Ue,G,Y,I,M.state.transmissionRenderTarget[w.id]),bt.needsLights&&bt.lightProbeGrid){let we=bt.lightProbeGrid;Ue.probesSH.value=we.texture,Ue.probesMin.value.copy(we.boundingBox.min),Ue.probesMax.value.copy(we.boundingBox.max),Ue.probesResolution.value.copy(we.resolution)}wr.upload(U,xd(bt),Ue,J)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(wr.upload(U,xd(bt),Ue,J),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&xe.setValue(U,"center",W.center),xe.setValue(U,"modelViewMatrix",W.modelViewMatrix),xe.setValue(U,"normalMatrix",W.normalMatrix),xe.setValue(U,"modelMatrix",W.matrixWorld),G.uniformsGroups!==void 0){let we=G.uniformsGroups;for(let Vn=0,qs=we.length;Vn<qs;Vn++){let bd=we[Vn];st.update(bd,Di),st.bind(bd,Di)}}return Di}function Qm(w,D){w.ambientLightColor.needsUpdate=D,w.lightProbe.needsUpdate=D,w.sunLights.needsUpdate=D,w.sunLightShadows.needsUpdate=D,w.directionalLights.needsUpdate=D,w.directionalLightShadows.needsUpdate=D,w.pointLights.needsUpdate=D,w.pointLightShadows.needsUpdate=D,w.spotLights.needsUpdate=D,w.spotLightShadows.needsUpdate=D,w.rectAreaLights.needsUpdate=D,w.hemisphereLights.needsUpdate=D}function t0(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return Z},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(w,D,q){let G=$.get(w);G.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),$.get(w.texture).__webglTexture=D,$.get(w.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:q,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,D){let q=$.get(w);q.__webglFramebuffer=D,q.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(w,D=0,q=0){j=w,K=D,Z=q;let G=null,W=!1,xt=!1;if(w){let gt=$.get(w);if(gt.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(U.FRAMEBUFFER,gt.__webglFramebuffer),nt.copy(w.viewport),Lt.copy(w.scissor),At=w.scissorTest,_.viewport(nt),_.scissor(Lt),_.setScissorTest(At),X=-1;return}else if(gt.__webglFramebuffer===void 0)J.setupRenderTarget(w);else if(gt.__hasExternalTextures)J.rebindTextures(w,$.get(w.texture).__webglTexture,$.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let Kt=w.depthTexture;if(gt.__boundDepthTexture!==Kt){if(Kt!==null&&$.has(Kt)&&(w.width!==Kt.image.width||w.height!==Kt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");J.setupDepthRenderbuffer(w)}}let St=w.texture;(St.isData3DTexture||St.isDataArrayTexture||St.isCompressedArrayTexture)&&(xt=!0);let Rt=$.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Rt[D])?G=Rt[D][q]:G=Rt[D],W=!0):w.samples>0&&J.useMultisampledRTT(w)===!1?G=$.get(w).__webglMultisampledFramebuffer:Array.isArray(Rt)?G=Rt[q]:G=Rt,nt.copy(w.viewport),Lt.copy(w.scissor),At=w.scissorTest}else nt.copy(ot).multiplyScalar(Y).floor(),Lt.copy(Ct).multiplyScalar(Y).floor(),At=ye;if(q!==0&&(G=H),_.bindFramebuffer(U.FRAMEBUFFER,G)&&_.drawBuffers(w,G),_.viewport(nt),_.scissor(Lt),_.setScissorTest(At),W){let gt=$.get(w.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+D,gt.__webglTexture,q)}else if(xt){let gt=D;for(let St=0;St<w.textures.length;St++){let Rt=$.get(w.textures[St]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+St,Rt.__webglTexture,q,gt)}}else if(w!==null&&q!==0){let gt=$.get(w.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,gt.__webglTexture,q)}X=-1};function yd(w){let D=$.get(w);return(D.__readFormat!==w.format||D.__readType!==w.type)&&(D.__readFormat=w.format,D.__readType=w.type,D.__formatReadable=C.textureFormatReadable(w.format),D.__typeReadable=C.textureTypeReadable(w.type)),D}this.readRenderTargetPixels=function(w,D,q,G,W,xt,Mt,gt=0){if(!(w&&w.isWebGLRenderTarget)){Bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let St=$.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Mt!==void 0&&(St=St[Mt]),St){_.bindFramebuffer(U.FRAMEBUFFER,St);try{let Rt=w.textures[gt],Kt=Rt.format,ie=Rt.type;w.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+gt);let wt=yd(Rt);if(wt.__formatReadable===!1){Bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(wt.__typeReadable===!1){Bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=w.width-G&&q>=0&&q<=w.height-W&&U.readPixels(D,q,G,W,pt.convert(Kt),pt.convert(ie),xt)}finally{let Rt=j!==null?$.get(j).__webglFramebuffer:null;_.bindFramebuffer(U.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(w,D,q,G,W,xt,Mt,gt=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let St=$.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Mt!==void 0&&(St=St[Mt]),St)if(D>=0&&D<=w.width-G&&q>=0&&q<=w.height-W){_.bindFramebuffer(U.FRAMEBUFFER,St);let Rt=w.textures[gt],Kt=Rt.format,ie=Rt.type;w.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+gt);let wt=yd(Rt);if(wt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(wt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ue=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,ue),U.bufferData(U.PIXEL_PACK_BUFFER,xt.byteLength,U.STREAM_READ),U.readPixels(D,q,G,W,pt.convert(Kt),pt.convert(ie),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let He=j!==null?$.get(j).__webglFramebuffer:null;_.bindFramebuffer(U.FRAMEBUFFER,He);let Te=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Rf(U,Te,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,ue),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,xt),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(ue),U.deleteSync(Te),xt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,D=null,q=0){let G=Math.pow(2,-q),W=Math.floor(w.image.width*G),xt=Math.floor(w.image.height*G),Mt=D!==null?D.x:0,gt=D!==null?D.y:0;J.setTexture2D(w,0),U.copyTexSubImage2D(U.TEXTURE_2D,q,0,0,Mt,gt,W,xt),_.unbindTexture()},this.copyTextureToTexture=function(w,D,q=null,G=null,W=0,xt=0){let Mt,gt,St,Rt,Kt,ie,wt,ue,He,Te=w.isCompressedTexture?w.mipmaps[xt]:w.image;if(q!==null)Mt=q.max.x-q.min.x,gt=q.max.y-q.min.y,St=q.isBox3?q.max.z-q.min.z:1,Rt=q.min.x,Kt=q.min.y,ie=q.isBox3?q.min.z:0;else{let Ue=Math.pow(2,-W);Mt=Math.floor(Te.width*Ue),gt=Math.floor(Te.height*Ue),w.isDataArrayTexture?St=Te.depth:w.isData3DTexture?St=Math.floor(Te.depth*Ue):St=1,Rt=0,Kt=0,ie=0}G!==null?(wt=G.x,ue=G.y,He=G.z):(wt=0,ue=0,He=0);let be=pt.convert(D.format),ii=pt.convert(D.type),bt;D.isData3DTexture?(J.setTexture3D(D,0),bt=U.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(J.setTexture2DArray(D,0),bt=U.TEXTURE_2D_ARRAY):(J.setTexture2D(D,0),bt=U.TEXTURE_2D),_.activeTexture(U.TEXTURE0),_.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,D.flipY),_.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),_.pixelStorei(U.UNPACK_ALIGNMENT,D.unpackAlignment);let ui=_.getParameter(U.UNPACK_ROW_LENGTH),le=_.getParameter(U.UNPACK_IMAGE_HEIGHT),Di=_.getParameter(U.UNPACK_SKIP_PIXELS),fn=_.getParameter(U.UNPACK_SKIP_ROWS),zn=_.getParameter(U.UNPACK_SKIP_IMAGES);_.pixelStorei(U.UNPACK_ROW_LENGTH,Te.width),_.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Te.height),_.pixelStorei(U.UNPACK_SKIP_PIXELS,Rt),_.pixelStorei(U.UNPACK_SKIP_ROWS,Kt),_.pixelStorei(U.UNPACK_SKIP_IMAGES,ie);let Xs=w.isDataArrayTexture||w.isData3DTexture,xe=D.isDataArrayTexture||D.isData3DTexture;if(w.isDepthTexture){let Ue=$.get(w),Hn=$.get(D),we=$.get(Ue.__renderTarget),Vn=$.get(Hn.__renderTarget);_.bindFramebuffer(U.READ_FRAMEBUFFER,we.__webglFramebuffer),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,Vn.__webglFramebuffer);for(let qs=0;qs<St;qs++)Xs&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,$.get(w).__webglTexture,W,ie+qs),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,$.get(D).__webglTexture,xt,He+qs)),U.blitFramebuffer(Rt,Kt,Mt,gt,wt,ue,Mt,gt,U.DEPTH_BUFFER_BIT,U.NEAREST);_.bindFramebuffer(U.READ_FRAMEBUFFER,null),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(W!==0||w.isRenderTargetTexture||$.has(w)){let Ue=$.get(w),Hn=$.get(D);_.bindFramebuffer(U.READ_FRAMEBUFFER,L),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,V);for(let we=0;we<St;we++)Xs?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ue.__webglTexture,W,ie+we):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Ue.__webglTexture,W),xe?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Hn.__webglTexture,xt,He+we):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Hn.__webglTexture,xt),W!==0?U.blitFramebuffer(Rt,Kt,Mt,gt,wt,ue,Mt,gt,U.COLOR_BUFFER_BIT,U.NEAREST):xe?U.copyTexSubImage3D(bt,xt,wt,ue,He+we,Rt,Kt,Mt,gt):U.copyTexSubImage2D(bt,xt,wt,ue,Rt,Kt,Mt,gt);_.bindFramebuffer(U.READ_FRAMEBUFFER,null),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else xe?w.isDataTexture||w.isData3DTexture?U.texSubImage3D(bt,xt,wt,ue,He,Mt,gt,St,be,ii,Te.data):D.isCompressedArrayTexture?U.compressedTexSubImage3D(bt,xt,wt,ue,He,Mt,gt,St,be,Te.data):U.texSubImage3D(bt,xt,wt,ue,He,Mt,gt,St,be,ii,Te):w.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,xt,wt,ue,Mt,gt,be,ii,Te.data):w.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,xt,wt,ue,Te.width,Te.height,be,Te.data):U.texSubImage2D(U.TEXTURE_2D,xt,wt,ue,Mt,gt,be,ii,Te);_.pixelStorei(U.UNPACK_ROW_LENGTH,ui),_.pixelStorei(U.UNPACK_IMAGE_HEIGHT,le),_.pixelStorei(U.UNPACK_SKIP_PIXELS,Di),_.pixelStorei(U.UNPACK_SKIP_ROWS,fn),_.pixelStorei(U.UNPACK_SKIP_IMAGES,zn),xt===0&&D.generateMipmaps&&U.generateMipmap(bt),_.unbindTexture()},this.initRenderTarget=function(w){$.get(w).__webglFramebuffer===void 0&&J.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?J.setTextureCube(w,0):w.isData3DTexture?J.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?J.setTexture2DArray(w,0):J.setTexture2D(w,0),_.unbindTexture()},this.resetState=function(){K=0,Z=0,j=null,_.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ji}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Qt._getUnpackColorSpace()}};var B={FLOOR_A:1,FLOOR_B:2,FLOOR_C:3,APRON:4,PAINT:5,LINES:6,CENTER:7,RIM:8,NET:9,GLASS:10,BOARD_FRAME:11,PAD:12,POLE:13,STAND_A:14,STAND_B:15,STAND_C:16,WALL_A:17,WALL_B:18,CEIL:19,CONCRETE:20,METAL:21,WOOD:22,SEAT:23,BANNER_HOME:24,BANNER_AWAY:25,BOARD_A:26,BOARD_B:27,SCREEN:28,LAMP:29,CROWD_1:30,CROWD_2:31,CROWD_3:32,CROWD_4:33,SKIN_1:34,SKIN_2:35,SKIN_3:36,SKIN_H:37,HAIR_1:38,HAIR_2:39,HAIR_H:40,SHOE:41,SHOE_H:42,SOLE:43,JERSEY_0:44,SHORTS_0:45,TRIM_0:46,NUM_0:47,JERSEY_1:48,SHORTS_1:49,TRIM_1:50,NUM_1:51,SOCK:52,BALL:53,BALL_SEAM:54,CONE:55,TARGET:56,CLOUD:57,SKY_TOP:58,SKY_BOTTOM:59,GOLD:60,EYE:61,INK:62,MARKER:63,WINDOW:64,DOOR:65,BRICK:66,PLANT:67,BAND:68,MARKER_DEF:69,CHAIR:70,TABLE:71},yu=72,Pe=Array.from({length:yu},()=>new Yt(1,1,1));function vu(s){return new Yt(s)}var bu={name:"classic",label:"Classic",bg:"#f2f1ea",fog:"#f2f1ea",fogNear:45,fogFar:160,ink:"#161616",lineWidth:1.2,toon:0,shadow:0,clouds:!1,blobs:!0,roles:{FLOOR_A:"#f3e7cf",FLOOR_B:"#efe1c5",FLOOR_C:"#f6ecd8",APRON:"#e6dccb",LINES:"#2b2b2b",RIM:"#f2b48c",NET:"#7a7a7a",GLASS:"#eef2f2",BOARD_FRAME:"#ffffff",PAD:"#e9e4dc",POLE:"#ecebe6",STAND_A:"#f6f6f2",STAND_B:"#ecebe5",STAND_C:"#e2e0d8",WALL_A:"#f7f6f1",WALL_B:"#efede6",CEIL:"#faf9f5",CONCRETE:"#efeee8",METAL:"#e8e8e6",WOOD:"#f1ebe0",SEAT:"#ebe8e0",BOARD_A:"#fbfbf8",BOARD_B:"#efefea",SCREEN:"#f7f7f4",LAMP:"#ffffff",CROWD_3:"#efefeb",CROWD_4:"#e3e2dc",SKIN_1:"#fbf6f0",SKIN_2:"#f3eadf",SKIN_3:"#e8dccd",HAIR_1:"#d9d4cc",HAIR_2:"#bdb7ae",SHOE:"#3a3a3a",SOLE:"#f4f4f0",SOCK:"#ffffff",BALL:"#f3c3a0",BALL_SEAM:"#1b1b1b",CONE:"#f2c9a0",TARGET:"#f0b8b0",CLOUD:"#ffffff",SKY_TOP:"#f4f3ee",SKY_BOTTOM:"#f2f1ea",GOLD:"#eadcaa",EYE:"#1b1b1b",INK:"#161616",MARKER:"#222222",MARKER_DEF:"#c8102e",WINDOW:"#e3eaee",DOOR:"#e6ddd0",BRICK:"#ece4d8",PLANT:"#d8e4cc",BAND:"#ffffff",CHAIR:"#e4e2dc",TABLE:"#f3f1ea"},kitMix:.42,kitSat:.75,skinMix:.55,paintMix:.72},Rb={name:"neo",label:"Neobrutalist",bg:"#3b2f8f",fog:"#9d8cff",fogNear:70,fogFar:260,ink:"#000000",lineWidth:3,toon:1,shadow:1,clouds:!1,blobs:!1,roles:{FLOOR_A:"#f6b24f",FLOOR_B:"#ec9f3c",FLOOR_C:"#fbc46a",APRON:"#c96f2a",LINES:"#ffffff",RIM:"#ff5a1f",NET:"#ffffff",GLASS:"#8ff0ff",BOARD_FRAME:"#ffffff",PAD:"#3d9bff",POLE:"#ffffff",STAND_A:"#ff5c8a",STAND_B:"#ffd23f",STAND_C:"#3d9bff",WALL_A:"#7b4dff",WALL_B:"#5f37e0",CEIL:"#2e2470",CONCRETE:"#d9d2ff",METAL:"#b5b5c8",WOOD:"#ffb347",SEAT:"#ff3d6e",BOARD_A:"#ffffff",BOARD_B:"#ffe45c",SCREEN:"#141414",LAMP:"#fffbe0",CROWD_3:"#ffe45c",CROWD_4:"#b48cff",SKIN_1:"#ffd8b8",SKIN_2:"#d9a27a",SKIN_3:"#9a6440",HAIR_1:"#2b1d14",HAIR_2:"#f2c14e",SHOE:"#101010",SOLE:"#ffffff",SOCK:"#ffffff",BALL:"#ff7a1a",BALL_SEAM:"#101010",CONE:"#ff7a1a",TARGET:"#ff3d6e",CLOUD:"#ffffff",SKY_TOP:"#2a1f6e",SKY_BOTTOM:"#6c5ce7",GOLD:"#ffc81a",EYE:"#000000",INK:"#000000",MARKER:"#ff3dcf",MARKER_DEF:"#ff3d3d",WINDOW:"#3ee0ff",DOOR:"#ff5c8a",BRICK:"#ff8a4c",PLANT:"#1bbd57",BAND:"#ffffff",CHAIR:"#141414",TABLE:"#ffffff"},kitMix:0,kitSat:1.15,skinMix:0,paintMix:0},Gl={classic:bu,neo:Rb},Is={kits:[{jersey:"#c8102e",shorts:"#c8102e",trim:"#ffffff",number:"#ffffff"},{jersey:"#1d4ed8",shorts:"#1d4ed8",trim:"#ffffff",number:"#ffffff"}],human:{skin:"#e0b48c",hair:"#3b2a1e",shoes:"#ffc61a"},court:"#c8102e"},op=bu;function Bi(s,t,e){let i=vu(s),n={};return i.getHSL(n),i.setHSL(n.h,Math.min(1,n.s*e),n.l),t>0&&i.lerp(new Yt(1,1,1),t),i}function lp(s){let t=Gl[s]||bu;op=t;for(let[e,i]of Object.entries(t.roles))Pe[B[e]].set(i);return hp(),t}function cp(s,t,e){s&&(Is.kits=s),t&&(Is.human=t),e&&(Is.court=e),hp()}function hp(){let s=op,t=Is.kits,e=s.kitMix,i=s.kitSat;for(let r=0;r<2;r++){let a=t[r],o=r===0?0:4;Pe[B.JERSEY_0+o].copy(Bi(a.jersey,e,i)),Pe[B.SHORTS_0+o].copy(Bi(a.shorts,e,i));let l=Vl(a.trim,a.jersey)<.3?Vl(a.jersey,"#ffffff")>.6?"#ffffff":"#141414":a.trim;Pe[B.TRIM_0+o].copy(Bi(l,e,i));let c=Pe[B.JERSEY_0+o],h=c.r*.3+c.g*.59+c.b*.11;Pe[B.NUM_0+o].set(h>.6?"#141414":"#ffffff")}Pe[B.BANNER_HOME].copy(Bi(t[0].jersey,e*.7,i)),Pe[B.BANNER_AWAY].copy(Bi(t[1].jersey,e*.7,i)),Pe[B.CROWD_1].copy(Bi(t[0].jersey,s.name==="classic"?.62:0,i)),Pe[B.CROWD_2].copy(Bi(t[1].jersey,s.name==="classic"?.62:0,i)),Pe[B.PAINT].copy(Bi(Is.court,s.paintMix,i*.9)),Pe[B.CENTER].copy(Bi(Is.court,s.paintMix*.8,i));let n=Is.human;Pe[B.SKIN_H].copy(Bi(n.skin,s.skinMix,1)),Pe[B.HAIR_H].copy(Bi(n.hair,s.skinMix*.8,1)),Pe[B.SHOE_H].copy(Bi(n.shoes,s.name==="classic"?.2:0,1))}function Vl(s,t){let e=vu(s),i=vu(t);return Math.hypot(e.r-i.r,e.g-i.g,e.b-i.b)}function Wl(s,t){let e={jersey:s.colors[0],shorts:s.colors[0],trim:s.colors[1],number:s.colors[1]},i={jersey:t.colors[0],shorts:t.colors[0],trim:t.colors[1],number:t.colors[1]};return Vl(e.jersey,i.jersey)<.55&&(i={jersey:t.colors[1],shorts:t.colors[1],trim:t.colors[0],number:t.colors[0]},Vl(e.jersey,i.jersey)<.55&&(i={jersey:"#f4f4f4",shorts:"#f4f4f4",trim:t.colors[0],number:"#111111"})),[e,i]}var Ot={uPalette:{value:Pe},uLightDir:{value:new k(-.45,.8,.38).normalize()},uToon:{value:0},uShadowAmt:{value:0},uLineWidth:{value:1.2},uMinWidth:{value:1},uTaper:{value:22},uTaperMin:{value:.3},uDetailDist:{value:50},uCreaseDist:{value:20},uResolution:{value:new qt(1280,720)},uTime:{value:0},uCrowd:{value:0},uParts:{value:null},uAtlas:{value:null},uNetA:{value:new _e(0,0,0,0)},uNetDA:{value:new k(1,0,0)},uNetB:{value:new _e(0,0,0,0)},uNetDB:{value:new k(-1,0,0)}},_u=`
uniform highp sampler2D uParts;
mat4 partMatrix(float idx) {
  int row = int(idx + 0.5);
  return mat4(texelFetch(uParts, ivec2(0, row), 0), texelFetch(uParts, ivec2(1, row), 0),
              texelFetch(uParts, ivec2(2, row), 0), texelFetch(uParts, ivec2(3, row), 0));
}
`,up=`
uniform float uTime;
uniform float uCrowd;
float crowdLift(vec2 bob) {
  float rate = 2.6 + fract(bob.x * 7.31) * 2.4 + uCrowd * 4.0;
  float s = sin(uTime * rate + bob.x * 6.2831);
  return bob.y * (0.035 * s + uCrowd * (0.18 + 0.2 * fract(bob.x * 3.7)) * max(0.0, s));
}
`,Cb=`
uniform vec4 uNetA; uniform vec3 uNetDA;
uniform vec4 uNetB; uniform vec3 uNetDB;
vec3 netPush(vec3 p, vec4 c, vec3 d) {
  vec3 dd = p - c.xyz;
  float f = c.w * exp(-dot(dd, dd) / 0.05);
  vec2 r = dd.xz; float rl = length(r) + 1e-4;
  vec3 outw = vec3(r.x / rl, -0.6, r.y / rl);
  // sway grows toward the bottom of the net
  float depth = clamp((3.05 - p.y) * 2.4, 0.0, 1.0);
  return outw * f * 0.11 + d * depth;
}
vec3 netDisp(vec3 p) {
  return p.x > 0.0 ? netPush(p, uNetA, uNetDA) : netPush(p, uNetB, uNetDB);
}
`,Pb=`
attribute float aRole;
#ifdef PARTS
attribute float aPart;
${_u}
#endif
#ifdef CROWD
attribute vec2 aBob;
${up}
#endif
uniform vec3 uPalette[${yu}];
varying vec3 vColor;
varying vec3 vNormalW;
varying vec2 vUv2;
#include <common>
#include <fog_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
  vec3 transformed = position;
  vec3 objectNormal = normal;
#ifdef CROWD
  transformed.y += crowdLift(aBob);
#endif
#ifdef PARTS
  mat4 pm = partMatrix(aPart);
  transformed = (pm * vec4(transformed, 1.0)).xyz;
  objectNormal = mat3(pm) * objectNormal;
#endif
  vColor = uPalette[int(aRole + 0.5)];
#ifdef USE_ATLAS
  vUv2 = uv;
#else
  vUv2 = vec2(-1.0);
#endif
  vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);
  vNormalW = normalize(mat3(modelMatrix) * objectNormal);
  vec4 mvPosition = viewMatrix * worldPosition;
  gl_Position = projectionMatrix * mvPosition;
  vec3 transformedNormal = normalMatrix * objectNormal;
  #include <shadowmap_vertex>
  #include <fog_vertex>
}
`,Ib=`
uniform float uToon;
uniform float uShadowAmt;
uniform vec3 uLightDir;
#ifdef USE_ATLAS
uniform sampler2D uAtlas;
#endif
varying vec3 vColor;
varying vec3 vNormalW;
varying vec2 vUv2;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
  vec3 base = vColor;
#ifdef USE_ATLAS
  if (vUv2.x >= 0.0) {
    float a = texture2D(uAtlas, vUv2).a;
    if (a < 0.5) discard;
  }
#endif
  vec3 n = normalize(vNormalW);
  if (!gl_FrontFacing) n = -n;
  float ndl = dot(n, uLightDir);
  // Classic: near-unlit paper with a whisper of form shading
  float classic = 0.9 + 0.08 * clamp(ndl * 0.5 + 0.5, 0.0, 1.0) + 0.02 * clamp(n.y, 0.0, 1.0);
  // Neobrutalist: two tone steps and hard sun shadows
  float sh = mix(1.0, getShadowMask(), uShadowAmt);
  float lit = step(0.1, ndl) * sh;
  float toon = mix(0.68, 1.0, lit);
  float shade = mix(classic, toon, uToon);
  gl_FragColor = vec4(base * shade, 1.0);
  #include <fog_fragment>
}
`;function Tr(s={}){let t={};s.parts&&(t.PARTS=""),s.crowd&&(t.CROWD=""),s.atlas&&(t.USE_ATLAS="");let e=Sa.merge([ct.lights,ct.fog]);return Object.assign(e,{uPalette:Ot.uPalette,uLightDir:Ot.uLightDir,uToon:Ot.uToon,uShadowAmt:Ot.uShadowAmt,uParts:Ot.uParts,uAtlas:Ot.uAtlas,uTime:Ot.uTime,uCrowd:Ot.uCrowd}),new Fe({uniforms:e,defines:t,vertexShader:Pb,fragmentShader:Ib,lights:!0,fog:s.fog!==!1,side:s.doubleSided?Fi:bn,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1})}var Lb=`
attribute vec3 iA;
attribute vec3 iB;
attribute vec3 iN1;
attribute vec3 iN2;
attribute vec2 iMeta;
#ifdef PARTS
${_u}
#endif
#ifdef CROWD
attribute vec2 iBob;
${up}
#endif
#ifdef NET
${Cb}
#endif
uniform float uLineWidth;
uniform float uWidthScale;
uniform float uMinWidth;
uniform float uTaper;
uniform float uTaperMin;
uniform float uDetailDist;
uniform float uCreaseDist;
uniform vec2 uResolution;
#include <common>
#include <fog_pars_vertex>

void trimSegment(const in vec4 start, inout vec4 end) {
  float a = projectionMatrix[2][2];
  float b = projectionMatrix[3][2];
  float nearEstimate = -0.5 * b / a;
  float alpha = (nearEstimate - start.z) / (end.z - start.z);
  end.xyz = mix(start.xyz, end.xyz, alpha);
}

void main() {
  vec3 a = iA, b = iB, n1 = iN1, n2 = iN2;
#ifdef PARTS
  if (iMeta.x >= 0.0) {
    mat4 pm = partMatrix(iMeta.x);
    a = (pm * vec4(a, 1.0)).xyz; b = (pm * vec4(b, 1.0)).xyz;
    n1 = mat3(pm) * n1; n2 = mat3(pm) * n2;
  }
#endif
#ifdef CROWD
  float lift = crowdLift(iBob);
  a.y += lift; b.y += lift;
#endif
#ifdef NET
  a += netDisp(a); b += netDisp(b);
#endif
  vec4 wa = modelMatrix * vec4(a, 1.0);
  vec4 wb = modelMatrix * vec4(b, 1.0);
  // iMeta.y: 1 = crease, +2 = fine detail that fades out with distance
  float detail = step(1.5, iMeta.y);
  float crease = iMeta.y - 2.0 * detail;
  float camDist = length(0.5 * (wa.xyz + wb.xyz) - cameraPosition);
  if (detail > 0.5 && camDist > uDetailDist) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  bool boundary = dot(n2, n2) < 0.01;
  if (!boundary) {
    vec3 V = 0.5 * (wa.xyz + wb.xyz) - cameraPosition;
    float d1 = dot(mat3(modelMatrix) * n1, V);
    float d2 = dot(mat3(modelMatrix) * n2, V);
    bool silhouette = d1 * d2 <= 0.0;
    bool visibleCrease = crease > 0.5 && (d1 < 0.0 || d2 < 0.0);
    if (!silhouette && !visibleCrease) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
#ifdef PARTS
    // far figures keep their outline only, not the creases between their parts
    if (!silhouette && camDist > uCreaseDist) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
#endif
  }
  vec4 start = viewMatrix * wa;
  vec4 end = viewMatrix * wb;
  if (start.z < 0.0 && end.z >= 0.0) trimSegment(start, end);
  else if (end.z < 0.0 && start.z >= 0.0) trimSegment(end, start);
  vec4 clipStart = projectionMatrix * start;
  vec4 clipEnd = projectionMatrix * end;
  vec3 ndcStart = clipStart.xyz / clipStart.w;
  vec3 ndcEnd = clipEnd.xyz / clipEnd.w;
  float aspect = uResolution.x / uResolution.y;
  vec2 dir = ndcEnd.xy - ndcStart.xy;
  dir.x *= aspect;
  dir = normalize(dir);
  vec2 offset = vec2(dir.y, -dir.x);
  dir.x /= aspect;
  offset.x /= aspect;
  if (position.x < 0.0) offset *= -1.0;
  // square caps so thick lines join cleanly at corners
  offset += (position.y < 0.5) ? -dir : dir;
  vec4 clip = (position.y < 0.5) ? clipStart : clipEnd;
  // thick ink thins out with distance so far figures stay readable
  float wpx = uLineWidth * uWidthScale;
  wpx = max(min(wpx, uMinWidth), wpx * clamp(uTaper / max(clip.w, 0.1), uTaperMin, 1.0));
  offset *= wpx;
  offset /= uResolution.y;
  offset *= clip.w;
  clip.xy += offset;
  // Depth: the ink is tested as if it sat a few centimetres nearer the eye along the same
  // view ray (screen position unchanged). A fixed bias in depth-buffer units would grow
  // with the square of the distance and let the outlines of parts behind (the far leg,
  // a stand behind a wall) show through whatever is in front of them.
  vec4 mvPosition = (position.y < 0.5) ? start : end;
  float wv = -mvPosition.z;
  float pull = min(min(0.15, 0.02 + 0.0025 * wv), 0.5 * wv);
  vec4 pz = projectionMatrix * vec4(mvPosition.xyz * ((wv - pull) / max(wv, 1e-4)), 1.0);
  clip.z = (pz.z / pz.w) * clip.w;
  gl_Position = clip;
  #include <fog_vertex>
}
`,kb=`
uniform vec3 uColor;
uniform float uOpacity;
#include <common>
#include <fog_pars_fragment>
void main() {
  gl_FragColor = vec4(uColor, uOpacity);
  #include <fog_fragment>
}
`;function Ls(s={}){let t={};s.parts&&(t.PARTS=""),s.crowd&&(t.CROWD=""),s.net&&(t.NET="");let e=Sa.merge([ct.fog]);return Object.assign(e,{uLineWidth:Ot.uLineWidth,uMinWidth:Ot.uMinWidth,uTaper:Ot.uTaper,uTaperMin:Ot.uTaperMin,uDetailDist:Ot.uDetailDist,uCreaseDist:Ot.uCreaseDist,uResolution:Ot.uResolution,uParts:Ot.uParts,uTime:Ot.uTime,uCrowd:Ot.uCrowd,uNetA:Ot.uNetA,uNetDA:Ot.uNetDA,uNetB:Ot.uNetB,uNetDB:Ot.uNetDB,uColor:{value:Pe[s.role??B.INK]},uOpacity:{value:s.opacity??1},uWidthScale:{value:s.widthScale??1}}),new Fe({uniforms:e,defines:t,vertexShader:Lb,fragmentShader:kb,fog:s.fog!==!1,transparent:(s.opacity??1)<1,depthWrite:(s.opacity??1)>=1})}function dp(){return new Fe({uniforms:{uParts:Ot.uParts},vertexShader:`${_u}
attribute float aPart;
void main(){ vec3 p = (partMatrix(aPart) * vec4(position,1.0)).xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0); }`,fragmentShader:"void main(){ gl_FragColor = vec4(1.0); }"})}function fp(){return new Fe({uniforms:{uTop:{value:Pe[B.SKY_TOP]},uBottom:{value:Pe[B.SKY_BOTTOM]}},vertexShader:"varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform vec3 uTop; uniform vec3 uBottom; varying vec3 vDir; void main(){ float t = smoothstep(-0.02, 0.55, vDir.y); gl_FragColor = vec4(mix(uBottom, uTop, t), 1.0); }",side:Je,depthWrite:!1,fog:!1})}function pp(){return new Fe({uniforms:{uInk:{value:Pe[B.INK]}},vertexShader:"attribute float aAlpha; varying vec2 vP; varying float vA; void main(){ vP = position.xz * 2.0; vA = aAlpha; gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * vec4(position,1.0); }",fragmentShader:"uniform vec3 uInk; varying vec2 vP; varying float vA; void main(){ float d = length(vP); float a = (1.0 - smoothstep(0.35, 1.0, d)) * vA; if (a < 0.01) discard; gl_FragColor = vec4(uInk, a); }",transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})}function Ar(s,t=1){return new Fe({uniforms:{uColor:{value:Pe[s]},uOpacity:{value:t}},vertexShader:"void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform vec3 uColor; uniform float uOpacity; void main(){ gl_FragColor = vec4(uColor, uOpacity); }",transparent:t<1,depthWrite:t>=1})}function Mu(s){return new Fe({uniforms:{uMap:{value:s}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform sampler2D uMap; varying vec2 vUv; void main(){ gl_FragColor = vec4(texture2D(uMap, vUv).rgb, 1.0); }"})}var Ie=new Map;function rs(s,t,e=!0){let i=s.index?s.toNonIndexed():s,n=new Float32Array(i.attributes.position.array),r=new Float32Array(i.attributes.normal.array),a=i.attributes.uv?new Float32Array(i.attributes.uv.array):null,o=e?Nb(s,t):[];return{positions:n,normals:r,uvs:a,edges:o}}function Nb(s,t=32){let e=s.attributes.position,i=new Map,n=[],r=new Int32Array(e.count);for(let x=0;x<e.count;x++){let m=e.getX(x),p=e.getY(x),v=e.getZ(x),E=`${Math.round(m*1e4)},${Math.round(p*1e4)},${Math.round(v*1e4)}`,y=i.get(E);y===void 0&&(y=n.length,i.set(E,y),n.push([m,p,v])),r[x]=y}let a=s.index?s.index.array:null,o=a?a.length/3:e.count/3,l=new Map,c=n.length,h=new k,d=new k,u=new k;for(let x=0;x<o;x++){let m=r[a?a[x*3]:x*3],p=r[a?a[x*3+1]:x*3+1],v=r[a?a[x*3+2]:x*3+2];if(m===p||p===v||m===v)continue;let E=n[m],y=n[p],S=n[v];if(h.set(y[0]-E[0],y[1]-E[1],y[2]-E[2]),d.set(S[0]-E[0],S[1]-E[1],S[2]-E[2]),u.crossVectors(h,d),u.lengthSq()<1e-14)continue;u.normalize();let M=[u.x,u.y,u.z];for(let[R,b]of[[m,p],[p,v],[v,m]]){let T=Math.min(R,b),A=Math.max(R,b),P=T*c+A,N=l.get(P);N||(N={a:T,b:A,normals:[]},l.set(P,N)),N.normals.push(M)}}let f=Math.cos(t*Math.PI/180),g=[];for(let x of l.values()){let m=x.normals[0];if(x.normals.length===1){g.push({a:n[x.a],b:n[x.b],n1:m,n2:[0,0,0],crease:1});continue}let p=x.normals[1],v=m[0]*p[0]+m[1]*p[1]+m[2]*p[2];v>.9999||g.push({a:n[x.a],b:n[x.b],n1:m,n2:p,crease:v<f?1:0})}return g}function ks(s,t,e){let i=`box:${s}:${t}:${e}`;return Ie.has(i)||Ie.set(i,rs(new Jn(s,t,e),30)),Ie.get(i)}function Aa(s,t,e,i=8,n=!1){let r=`cyl:${s}:${t}:${e}:${i}:${n}`;return Ie.has(r)||Ie.set(r,rs(new gr(s,t,e,i,1,n),i<=4?30:60)),Ie.get(r)}function Li(s,t=12,e=8,i=Math.PI*2,n=Math.PI){let r=`sph:${s}:${t}:${e}:${i}:${n}`;return Ie.has(r)||Ie.set(r,rs(new Ts(s,t,e,0,i,0,n),70)),Ie.get(r)}function Ra(s,t,e=8){let i=`cone:${s}:${t}:${e}`;return Ie.has(i)||Ie.set(i,rs(new Ss(s,t,e),e<=4?30:60)),Ie.get(i)}function Db(s,t,e=!1){let i=`plane:${s}:${t}:${e}`;if(!Ie.has(i)){let n=new Ui(s,t);n.rotateX(-Math.PI/2),Ie.set(i,rs(n,30,e))}return Ie.get(i)}function Rr(s,t){let e=`quad:${s}:${t}`;return Ie.has(e)||Ie.set(e,rs(new Ui(s,t),30,!1)),Ie.get(e)}function Cr(s,t,e=30,i=!0){return Ie.has(s)||Ie.set(s,rs(t(),e,i)),Ie.get(s)}function Ob(s,t=12,e=[!0,!0]){let i=[],n=[],r=t+1;for(let[c,h,d,u=0]of s)for(let f=0;f<=t;f++){let g=f/t*Math.PI*2;i.push(Math.sin(g)*h,c,Math.cos(g)*d+u)}for(let c=0;c<s.length-1;c++)for(let h=0;h<t;h++){let d=c*r+h,u=d+1,f=d+r,g=f+1;n.push(d,u,f,u,g,f)}let a=(c,h)=>{let[d,u,f,g=0]=s[c];if(u<1e-5&&f<1e-5)return;let x=i.length/3;i.push(0,d,g);for(let m=0;m<=t;m++){let p=m/t*Math.PI*2;i.push(Math.sin(p)*u,d,Math.cos(p)*f+g)}for(let m=0;m<t;m++)h?n.push(x,x+1+m,x+2+m):n.push(x,x+2+m,x+1+m)};e[0]&&a(0,!1),e[1]&&a(s.length-1,!0);let o=new We;o.setAttribute("position",new Jt(i,3)),o.setIndex(n),o.computeVertexNormals();let l=o.attributes.normal;for(let c=0;c<s.length;c++){let h=c*r,d=c*r+t,u=l.getX(h)+l.getX(d),f=l.getY(h)+l.getY(d),g=l.getZ(h)+l.getZ(d),x=Math.hypot(u,f,g)||1;l.setXYZ(h,u/x,f/x,g/x),l.setXYZ(d,u/x,f/x,g/x)}return o}function xi(s,t,e=12,i={}){return Cr(`loft:${s}:${e}`,()=>{let n=Ob(t,e,i.caps||[!0,!0]);return i.axis==="z"&&n.rotateX(Math.PI/2),n},i.crease??55)}function Su(s,t=1){let e=`ico:${s}:${t}`;return Ie.has(e)||Ie.set(e,rs(new ws(s,t),70)),Ie.get(e)}var Ow=new Gt,$l=new Ht,Ii=new k,mp=new Ge,gp=new Si,Ub=new k,gi=class s{constructor(t={}){this.opts=t,this.pos=[],this.nor=[],this.role=[],this.part=[],this.bob=[],this.uv=[],this.eA=[],this.eB=[],this.eN1=[],this.eN2=[],this.eMeta=[],this.eBob=[],this.vcount=0,this.detail=!1}add(t,e,i,n={}){$l.getNormalMatrix(e);let r=e.elements,a=t.positions,o=t.normals,l=n.part??-1,c=n.bob||null,h=n.uvRect||null,d=n.roleFn||null;for(let g=0;g<a.length;g+=3){let x=a[g],m=a[g+1],p=a[g+2];if(this.pos.push(r[0]*x+r[4]*m+r[8]*p+r[12],r[1]*x+r[5]*m+r[9]*p+r[13],r[2]*x+r[6]*m+r[10]*p+r[14]),Ii.set(o[g],o[g+1],o[g+2]).applyMatrix3($l).normalize(),this.nor.push(Ii.x,Ii.y,Ii.z),this.role.push(n.roles?n.roles[g/3]:d?d(g/3,x,m,p):i),this.opts.parts&&this.part.push(l),this.opts.bob&&this.bob.push(c?c[0]:0,c?c[1]:0),this.opts.atlas)if(h&&t.uvs){let v=g/3*2;this.uv.push(h[0]+t.uvs[v]*(h[2]-h[0]),h[1]+t.uvs[v+1]*(h[3]-h[1]))}else this.uv.push(-1,-1)}if(this.vcount+=a.length/3,n.noEdges||!t.edges.length)return this;let u=!!n.creaseOnly,f=n.detail??this.detail?2:0;for(let g of t.edges){if(u&&g.crease<.5)continue;let x=g.a,m=g.b;this.eA.push(r[0]*x[0]+r[4]*x[1]+r[8]*x[2]+r[12],r[1]*x[0]+r[5]*x[1]+r[9]*x[2]+r[13],r[2]*x[0]+r[6]*x[1]+r[10]*x[2]+r[14]),this.eB.push(r[0]*m[0]+r[4]*m[1]+r[8]*m[2]+r[12],r[1]*m[0]+r[5]*m[1]+r[9]*m[2]+r[13],r[2]*m[0]+r[6]*m[1]+r[10]*m[2]+r[14]),Ii.set(g.n1[0],g.n1[1],g.n1[2]).applyMatrix3($l).normalize(),this.eN1.push(Ii.x,Ii.y,Ii.z),g.n2[0]===0&&g.n2[1]===0&&g.n2[2]===0?this.eN2.push(0,0,0):(Ii.set(g.n2[0],g.n2[1],g.n2[2]).applyMatrix3($l).normalize(),this.eN2.push(Ii.x,Ii.y,Ii.z)),this.eMeta.push(l,g.crease+f),this.opts.bob&&this.eBob.push(c?c[0]:0,c?c[1]:0)}return this}line(t,e,i,n,r,a,o=-1){return this.eA.push(t,e,i),this.eB.push(n,r,a),this.eN1.push(0,1,0),this.eN2.push(0,0,0),this.eMeta.push(o,this.detail?3:1),this.opts.bob&&this.eBob.push(0,0),this}static mat(t,e,i,n=0,r=0,a=0,o=1,l=1,c=1){return gp.set(n,r,a,"YXZ"),mp.setFromEuler(gp),new Gt().compose(Ii.set(t,e,i).clone(),mp.clone(),Ub.set(o,l,c).clone())}box(t,e,i,n,r,a,o,l=0,c={}){return this.add(ks(e,i,n),s.mat(r,a,o,c.rx||0,l,c.rz||0),t,c)}cyl(t,e,i,n,r,a,o,l,c={}){return this.add(Aa(e,i,n,r,c.open),s.mat(a,o,l,c.rx||0,c.ry||0,c.rz||0,c.sx||1,1,c.sz||1),t,c)}sphere(t,e,i,n,r,a={}){return this.add(Li(e,a.ws||12,a.hs||8,a.phi,a.theta),s.mat(i,n,r,a.rx||0,a.ry||0,a.rz||0,a.sx||1,a.sy||1,a.sz||1),t,a)}cone(t,e,i,n,r,a,o,l={}){return this.add(Ra(e,i,n),s.mat(r,a,o,l.rx||0,l.ry||0,l.rz||0,l.sx||1,l.sy||1,l.sz||1),t,l)}plane(t,e,i,n,r,a,o={}){return this.add(Db(e,i,!!o.edges),s.mat(n,r,a,0,o.ry||0,0),t,{noEdges:!o.edges,...o})}quad(t,e,i,n,r,a,o=0,l={}){return this.add(Rr(e,i),s.mat(n,r,a,l.rx||0,o,0),t,{noEdges:!0,...l})}between(t,e,i,n,r,a,o,l,c=6,h={}){let d=a-i,u=o-n,f=l-r,g=Math.hypot(d,u,f),x=new Gt,m=new k(d,u,f).normalize(),p=new Ge().setFromUnitVectors(new k(0,1,0),m);return x.compose(new k((i+a)/2,(n+o)/2,(r+l)/2),p,new k(1,1,1)),this.add(Aa(e,e,g,c),x,t,h)}buildSolid(){let t=new We;return t.setAttribute("position",new Jt(this.pos,3)),t.setAttribute("normal",new Jt(this.nor,3)),t.setAttribute("aRole",new Jt(this.role,1)),this.opts.parts&&t.setAttribute("aPart",new Jt(this.part,1)),this.opts.bob&&t.setAttribute("aBob",new Jt(this.bob,2)),this.opts.atlas&&t.setAttribute("uv",new Jt(this.uv,2)),t.computeBoundingSphere(),t}buildEdges(){let t=new da,e=[-1,0,0,1,0,0,-1,1,0,1,1,0];t.setIndex([0,1,2,2,1,3]),t.setAttribute("position",new Jt(e,3));let i=this.eA.length/3;return t.setAttribute("iA",new wi(new Float32Array(this.eA),3)),t.setAttribute("iB",new wi(new Float32Array(this.eB),3)),t.setAttribute("iN1",new wi(new Float32Array(this.eN1),3)),t.setAttribute("iN2",new wi(new Float32Array(this.eN2),3)),t.setAttribute("iMeta",new wi(new Float32Array(this.eMeta),2)),this.opts.bob&&t.setAttribute("iBob",new wi(new Float32Array(this.eBob),2)),t.instanceCount=i,t.boundingSphere=new yn(new k,1e6),t}get edgeCount(){return this.eA.length/3}fine(t){let e=this.detail;this.detail=!0;try{t()}finally{this.detail=e}}};var Pr=.008333333333333333,Nt={L:28,W:15,HL:14,HW:7.5},F={X:14-1.575,Z:0,Y:3.05,R:.225,TUBE:.011,BOARD_X:14-1.2,BOARD_W:1.8,BOARD_H:1.05,BOARD_Y0:2.9,BOARD_T:.05,NET_LEN:.42,NET_R1:.15},zt={THREE_R:6.75,THREE_Z:6.6,KEY_HW:2.45,FT_X:14-5.8,FT_R:1.8,NC_R:1.25,CENTER_R:1.8};zt.THREE_X=F.X-Math.sqrt(zt.THREE_R*zt.THREE_R-zt.THREE_Z*zt.THREE_Z);var Et=.12,De=9.81,On={AIR_DRAG:.012,FLOOR_E:.8,RIM_E:.55,BOARD_E:.62,FRICTION:.35,SPIN_DAMP:.4},vi={SHOT_CLOCK:14,CHECK_DIST:5.2,PICKUP_R:.62,HUMAN_PICKUP_R:.78,STEAL_RANGE:1.25,STEAL_COOLDOWN:.75,PASS_LOCK:.3,SHOT_LOCK:.5,INPUT_BUFFER:.15,FT_DIST:.15,BONUS_FOULS:6},zi={SHOT_CLOCK:24,OREB_CLOCK:14,BACKCOURT:8,INBOUND:5,BONUS_FOULS:5,QUARTERS:4},Hi={short:{quarter:120,ot:60,label:"4 \xD7 2 min"},normal:{quarter:180,ot:90,label:"4 \xD7 3 min"},long:{quarter:300,ot:120,label:"4 \xD7 5 min"}},as={short:{clock:180,target:11,label:"3 min \xB7 to 11"},normal:{clock:300,target:21,label:"5 min \xB7 to 21"},long:{clock:480,target:21,label:"8 min \xB7 to 21"}},fe={top:[F.X-7.4,0],wingL:[F.X-5.6,-4.9],wingR:[F.X-5.6,4.9],cornerL:[13,-6.95],cornerR:[13,6.95],elbowL:[zt.FT_X+.2,-2.3],elbowR:[zt.FT_X+.2,2.3],postL:[F.X-1.4,-2.6],postR:[F.X-1.4,2.6],slotL:[F.X-6.9,-2.6],slotR:[F.X-6.9,2.6]};function Le(s,t,e=1){return Math.hypot(s-e*F.X,t-F.Z)}function Xl(s,t=1){let e=fe[s];return[e[0]*t,e[1]*t]}function Un(s,t,e=1){return s*=e,t*=e,Math.abs(t)>zt.THREE_Z?!0:s>zt.THREE_X?!1:Math.hypot(s-F.X,t-F.Z)>zt.THREE_R+.03}function wu(s,t,e=0,i=!1){return Math.abs(t)>=Nt.HW-e?!1:i?Math.abs(s)<Nt.HL-e:s>e&&s<Nt.HL-e}var os=["shooting","handling","speed","defense","passing","vertical"],Ca={shooting:"Shooting",handling:"Ball handling",speed:"Speed",defense:"Defense",passing:"Passing",vertical:"Vertical"};var Ns={gym:{name:"Neighborhood Gym",crowd:220,loud:.5},arena:{name:"City Arena",crowd:1700,loud:1},practice:{name:"Practice Gym",crowd:0,loud:0}};function Sp(s){let t=s>>>0||1;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}var wp=.05,Fb=.012;function nn(s,t,e,i,n,r=B.LINES,a=wp,o=Fb){let l=i-t,c=n-e,h=Math.hypot(l,c);s.plane(r,a,h+a*.5,(t+i)/2,o,(e+n)/2,{ry:Math.atan2(l,c)})}function Pa(s,t,e,i,n,r,a=36,o=!1){for(let l=0;l<a;l++){if(o&&l%2)continue;let c=n+(r-n)*(l/a),h=n+(r-n)*((l+1)/a);nn(s,t+Math.cos(c)*i,e+Math.sin(c)*i,t+Math.cos(h)*i,e+Math.sin(h)*i)}}var Bb=(s,t)=>Cr(`circle:${s}:${t}`,()=>{let e=new ra(s,t);return e.rotateX(-Math.PI/2),e},30,!1);function zb(s,t,e,i,n,r,a=40){s.add(Bb(n,a),gi.mat(e,r,i),t,{noEdges:!0})}var ls=class{constructor(t,e,i,n){this.b=t,this.cx=e,this.cz=i,this.ry=n,this.c=Math.cos(n),this.s=Math.sin(n)}w(t,e){return[this.cx+t*this.c+e*this.s,this.cz-t*this.s+e*this.c]}box(t,e,i,n,r,a,o,l={}){let[c,h]=this.w(r,o);this.b.box(t,e,i,n,c,a,h,this.ry+(l.ry||0),l)}cyl(t,e,i,n,r,a,o,l,c={}){let[h,d]=this.w(a,l);this.b.cyl(t,e,i,n,r,h,o,d,c)}quad(t,e,i,n,r,a,o={}){let[l,c]=this.w(n,a);this.b.quad(t,e,i,l,r,c,this.ry+Math.PI+(o.ry||0),o)}};function Hb(s,t={}){let e=Nt.HL,i=Nt.HW,n=Sp(11),r=e+(t.apronX||3.2),a=i+(t.apronZ||2.6),o=.5;for(let c=-a;c<a-1e-6;c+=o){let h=-r-n()*3,d=Math.floor(n()*3);for(;h<r;){let u=2.4+n()*2.8,f=Math.max(-r,h),g=Math.min(r,h+u),x=Math.abs(c+o/2)<i&&!0,m=x?[B.FLOOR_A,B.FLOOR_B,B.FLOOR_C][d%3]:B.APRON;if(g>f)if(!x)s.plane(B.APRON,g-f,o,(f+g)/2,0,c+o/2);else{let p=Math.max(f,-e),v=Math.min(g,e);v>p&&s.plane(m,v-p,o,(p+v)/2,0,c+o/2),f<-e&&s.plane(B.APRON,Math.min(g,-e)-f,o,(f+Math.min(g,-e))/2,0,c+o/2),g>e&&s.plane(B.APRON,g-Math.max(f,e),o,(Math.max(f,e)+g)/2,0,c+o/2)}h+=u,d++}}let l=wp/2;nn(s,-e,i-l,e,i-l),nn(s,-e,-i+l,e,-i+l),nn(s,e-l,-i,e-l,i),nn(s,-e+l,-i,-e+l,i),nn(s,0,-i,0,i),Pa(s,0,0,zt.CENTER_R,0,Math.PI*2,48),zb(s,B.CENTER,0,0,1.2,.006),t.atlas&&s.quad(B.LINES,1.9,.42,0,.014,0,Math.PI/2,{rx:-Math.PI/2,uvRect:t.atlas.word(t.logo||"COURTSIDE")});for(let c of[1,-1]){let h=c*F.X,d=c*e,u=c*zt.FT_X;s.plane(B.PAINT,e-zt.FT_X,zt.KEY_HW*2,(d+u)/2,.005,0),nn(s,d,zt.KEY_HW,u,zt.KEY_HW),nn(s,d,-zt.KEY_HW,u,-zt.KEY_HW),nn(s,u,-zt.KEY_HW,u,zt.KEY_HW);for(let p of[1.75,2.6,3.45,4.3])for(let v of[1,-1])nn(s,d-c*p,v*zt.KEY_HW,d-c*p,v*(zt.KEY_HW+.12));let f=c>0?Math.PI/2:-Math.PI/2;Pa(s,u,0,zt.FT_R,f,f+Math.PI,20),Pa(s,u,0,zt.FT_R,f+Math.PI,f+Math.PI*2,20,!0),Pa(s,h,0,zt.NC_R,f,f+Math.PI,18);for(let p of[1,-1])nn(s,d,p*zt.THREE_Z,c*zt.THREE_X,p*zt.THREE_Z);let g=Math.asin(zt.THREE_Z/zt.THREE_R),x=c>0?Math.PI-g:-g,m=c>0?Math.PI+g:g;Pa(s,h,0,zt.THREE_R,x,m,56)}}var Vb=()=>Cr("rim",()=>{let s=new la(F.R+F.TUBE,F.TUBE*1.25,6,32);return s.rotateX(Math.PI/2),s},50);function xp(s,t,e){let i=t*F.BOARD_X,n=F.BOARD_T,r=i+t*n,a=t*(Nt.HL+1.7);s.box(B.PAD,1.3,1.1,1.9,a+t*.3,.55,0),s.box(B.POLE,.3,3.1,.3,a,2.65,0),s.box(B.PAD,.36,1.8,.36,a,1.9,0),s.between(B.POLE,.1,a,3.25,0,r+t*.15,3.32,0,8),s.between(B.POLE,.06,a,2.35,0,r+t*.25,3.15,0,6),s.box(B.PAD,.5,.36,.3,r+t*.35,3.3,0);let o=F.BOARD_Y0+F.BOARD_H/2;s.box(B.GLASS,n,F.BOARD_H,F.BOARD_W,i+t*(n/2),o,0);let l=i-t*.006,c=.05;s.box(B.BOARD_FRAME,.012,c,F.BOARD_W,l,F.BOARD_Y0+F.BOARD_H-c/2,0,0,{noEdges:!0}),s.box(B.BOARD_FRAME,.012,c,F.BOARD_W,l,F.BOARD_Y0+c/2,0,0,{noEdges:!0});for(let u of[1,-1])s.box(B.BOARD_FRAME,.012,F.BOARD_H,c,l,o,u*(F.BOARD_W/2-c/2),0,{noEdges:!0});let h=F.Y+.02;s.box(B.BOARD_FRAME,.012,.05,.59,l,h+.45,0,0,{noEdges:!0}),s.box(B.BOARD_FRAME,.012,.05,.59,l,h,0,0,{noEdges:!0});for(let u of[1,-1])s.box(B.BOARD_FRAME,.012,.45,.05,l,h+.225,u*.27,0,{noEdges:!0});s.box(B.PAD,n+.04,.06,F.BOARD_W+.02,i+t*(n/2),F.BOARD_Y0-.02,0);let d=t*F.X;s.add(Vb(),gi.mat(d,F.Y,0),B.RIM),s.box(B.RIM,(F.BOARD_X-F.X-F.R)*1,.05,.14,t*(F.X+F.R+(F.BOARD_X-F.X-F.R)/2),F.Y-.02,0),s.box(B.METAL,.16,.36,.56,r-t*.04,F.BOARD_Y0+F.BOARD_H+.22,0),e.push({kind:"shot",x:i-t*.04-t*.08,y:F.BOARD_Y0+F.BOARD_H+.22,z:0,ry:t>0?-Math.PI/2:Math.PI/2,w:.5,h:.3})}function Ep(){let s=new gi,t=12,e=5;for(let i of[1,-1]){let n=i*F.X,r=(a,o)=>{let l=a/(e-1),c=F.R+.004+(F.NET_R1-F.R)*l,h=(o+a%2*.5)/t*Math.PI*2;return[n+Math.cos(h)*c,F.Y-.01-F.NET_LEN*l,Math.sin(h)*c]};for(let a=0;a<e-1;a++)for(let o=0;o<t;o++){let l=r(a,o),c=r(a+1,o),h=r(a+1,a%2?o+1:o-1);s.line(l[0],l[1],l[2],c[0],c[1],c[2]),s.line(l[0],l[1],l[2],h[0],h[1],h[2])}}return s.buildEdges()}var vp=[B.CROWD_1,B.CROWD_1,B.CROWD_1,B.CROWD_2,B.CROWD_3,B.CROWD_4,B.CROWD_1,B.CROWD_3],Gb=[B.SKIN_1,B.SKIN_2,B.SKIN_3];function yp(s,t,e,i,n,r=!0,a=!0){let o=vp[Math.floor(n()*vp.length)],l=[n(),1],c=r?.46:.62,h=n()<.5?B.CROWD_1:B.CROWD_2;s.box(o,.42,c,.27,t,e+c/2,i,{bob:l});let[d,u]=s.w(t,i),f=Gb[Math.floor(n()*3)];if(s.b.add(Su(.135,0),gi.mat(d,e+c+.16,u,0,n()*6,0),f,{bob:l}),a){let x=n()<.16;for(let m of[-1,1])x?s.box(o,.1,.42,.11,t+m*.25,e+c+.18,i,{bob:l,rz:m*.25,detail:!0}):s.box(o,.1,c*.8,.12,t+m*.26,e+c*.56,i-.02,{bob:l,detail:!0})}let g=n();if(g<.14){let[x,m]=s.w(t,i);s.b.add(Ra(.12,.2,6),gi.mat(x,e+c+.3,m),h,{bob:l,detail:!0})}else g<.24&&s.box(B.GOLD,.06,.5,.06,t+.2,e+c+.35,i-.1,{bob:l,detail:!0})}function Ia(s,t,e,i){let n=new ls(s,t.cx,t.cz,t.ry),r=t.rows,a=t.rowDepth||.8,o=t.rowHeight||.4,l=t.base||.5,c=t.len,h=t.z0||0,d=t.roles||[B.STAND_A,B.STAND_B];n.box(t.wallRole||B.CONCRETE,c,l,.3,0,l/2,h-.15);let u=Math.max(2,Math.round(c/2.2));s.fine(()=>{for(let M=0;M<=u;M++)n.cyl(B.METAL,.03,.03,.9,5,-c/2+c*M/u,l+.45,h-.15);let[v,E]=n.w(-c/2,h-.15),[y,S]=n.w(c/2,h-.15);s.between(B.METAL,.035,v,l+.9,E,y,l+.9,S,6)});let f=Math.max(1,Math.round(c/11)),g=[];for(let v=1;v<f+1;v++)g.push(-c/2+c*v/(f+1));let x=1;for(let v=0;v<r;v++){let E=l+v*o,y=d[Math.floor(v/(t.band||2))%d.length],S=t.seatRole||d[(Math.floor(v/(t.band||2))+1)%d.length];n.box(y,c,o,a,0,E+o/2,h+a*(v+.5));let M=[-c/2,...g.flatMap(R=>[R-x/2,R+x/2]),c/2];if(s.fine(()=>{for(let R=0;R<M.length;R+=2){let b=M[R]+.1,T=M[R+1]-.1;T-b>.4&&n.box(S,T-b,.28,.07,(b+T)/2,E+o+.14,h+a*(v+1)-.1)}}),t.density>0){let R=Math.floor(c/.6);for(let b=0;b<R;b++){let T=-c/2+.3+b*.6+(e()-.5)*.1;g.some(A=>Math.abs(T-A)<x/2+.15)||i.seats.push({f:n,lx:T,y:E+o,lz:h+a*(v+.5)+.05,w:t.density,seated:!0,row:v+(t.tier||0)*20})}}}let m=l+r*o,p=h+a*r;n.box(t.wallRole||B.CONCRETE,c+.4,m+1.2,.3,0,(m+1.2)/2,p+.15);for(let v of[-1,1])n.box(t.wallRole||B.CONCRETE,.3,m+.5,p-h,v*(c/2+.15),(m+.5)/2,h+(p-h)/2);return{top:m,back:p}}function ql(s,t,e,i,n){let r=new ls(s,t,e,i);r.box(B.METAL,6,.08,.5,0,.45,0),s.fine(()=>{for(let a=0;a<8;a++){let o=-2.6+a*.75;r.box(n,.5,.08,.46,o,.5,0),r.box(n,.5,.5,.06,o,.78,.24,{rx:-.1})}});for(let a of[-2.8,2.8])r.box(B.METAL,.06,.45,.4,a,.22,0);for(let a=0;a<4;a++)r.box(B.BAND,.3,.03,.2,-2+a*1.3,.56,.05,{noEdges:!0})}function Wb(s,t,e,i,n){let r=new ls(s,e,i,0);r.box(B.TABLE,8,.8,.8,0,.4,0),r.box(B.SCREEN,8.1,.5,.06,0,.45,-.42),n.forEach((a,o)=>r.quad(o%2?B.LAMP:B.GOLD,2.4,.32,-2.7+o*2.7,.45,-.46,{ry:Math.PI,uvRect:t.word(a)}));for(let a=0;a<5;a++)r.box(B.CHAIR,.5,.9,.5,-3+a*1.5,.45,.75)}function $b(s,t,e,i,n,r=0){let a=0,o=(l,c,h,d,u)=>{let f=Math.abs(h-c),g=Math.max(1,Math.round(f/6)),x=f/g;for(let m=0;m<g;m++){let p=Math.min(c,h)+x*(m+.5),v=d?l:p,E=d?p:l;if(!d&&Math.abs(v)<r)continue;s.box(B.SCREEN,x-.08,.8,.2,v,.4,E,d?Math.PI/2:0);let y=.12,S=v+(d?-Math.sign(l)*y:0),M=E+(d?0:-Math.sign(l)*y);s.quad([B.LAMP,B.GOLD,B.BANNER_HOME][a%3],Math.min(x-.5,4.6),.5,S,.42,M,u,{uvRect:t.word(e[a++%e.length])})}};o(n,-i,i,!1,Math.PI),o(i,-n+.5,n-.5,!0,-Math.PI/2),o(-i,-n+.5,n-.5,!0,Math.PI/2)}function bp(s,t,e,i,n,r,a,o,l,c){let h=new ls(s,t,i,n);h.box(o,r,a,.05,0,e,0),h.box(B.GOLD,r,.12,.07,0,e-a/2+.06,0),c&&h.quad(B.BAND,r*.85,a*.25,0,e+a*.15,-.04,{ry:Math.PI,uvRect:l.word(c)})}function _p(s,t,e,i,n={}){s.box(B.WALL_A,t*2+.4*2,i,.4,0,i/2,e+.4/2),s.box(B.WALL_A,t*2+.4*2,i,.4,0,i/2,-e-.4/2),s.box(B.WALL_B,.4,i,e*2,t+.4/2,i/2,0),s.box(B.WALL_B,.4,i,e*2,-t-.4/2,i/2,0),s.box(B.BRICK,t*2,n.dado||1.6,.06,0,(n.dado||1.6)/2,e-.03,0,{noEdges:!1}),s.box(B.BRICK,t*2,n.dado||1.6,.06,0,(n.dado||1.6)/2,-e+.03),s.box(B.BRICK,.06,n.dado||1.6,e*2,t-.03,(n.dado||1.6)/2,0),s.box(B.BRICK,.06,n.dado||1.6,e*2,-t+.03,(n.dado||1.6)/2,0),s.box(B.CEIL,t*2+.4*2,.3,e*2+.4*2,0,i+.15,0),n.windows&&s.fine(()=>{for(let l=0;l<n.windows;l++){let c=-t+t*2*(l+.5)/n.windows;for(let h of[1,-1])s.box(B.WINDOW,2.6,1.6,.08,c,i-1.6,h*(e-.02)),s.box(B.METAL,.06,1.6,.1,c,i-1.6,h*(e-.04)),s.box(B.METAL,2.6,.06,.1,c,i-1.6,h*(e-.04))}});let a=Math.round(t*2/4);s.fine(()=>{for(let l=0;l<=a;l++){let c=-t+t*2*l/a;s.between(B.METAL,.06,c,i-.05,-e,c,i-.05,e,5),s.between(B.METAL,.04,c,i-1,-e*.8,c,i-1,e*.8,5);for(let h=0;h<8;h++){let d=-e*.8+e*1.6*h/8,u=-e*.8+e*1.6*(h+1)/8;s.line(c,i-1,d,c,i-.05,u)}}});let o=n.lamps||[5,3];for(let l=0;l<o[0];l++)for(let c=0;c<o[1];c++){let h=-t*.7+t*1.4*l/Math.max(1,o[0]-1),d=-e*.55+e*1.1*c/Math.max(1,o[1]-1);s.cyl(B.METAL,.45,.7,.5,10,h,i-1.4,d),s.cyl(B.LAMP,.6,.6,.06,10,h,i-1.66,d),s.line(h,i-1.15,d,h,i-.05,d)}}function Mp(s,t,e,i,n,r,a,o){let l=new ls(s,t,i,n);l.box(B.METAL,r+.6,a+.6,.4,0,e,.25),l.box(B.BANNER_HOME,r+.7,.18,.45,0,e+a/2+.25,.25),o.push({kind:"score",x:t,y:e,z:i,ry:n,w:r,h:a})}function Tp(s,t){let{atlas:e,quality:i="high",homeName:n="HOME",awayName:r="AWAY",seed:a=7,crowd:o=1}=t,l=Sp(a*31+s.length),c=(i==="low"?.35:i==="medium"?.65:1)*o,h=new gi({bob:!0,atlas:!0}),d=new gi({atlas:!0}),u={seats:[],people:0},f=[],g={type:s};Hb(h,{atlas:e,logo:t.logo||"COURTSIDE"}),xp(d,1,f),xp(d,-1,f);let x=["COURTSIDE",n.toUpperCase(),"GAME DAY",r.toUpperCase(),"DEFENSE!","FIRST PERSON HOOPS"];if(s==="gym"||s==="practice"){_p(h,20,14.5,9,{windows:6,lamps:[5,3],dado:1.8});for(let y of[1,-1])for(let S=-3;S<=3;S++)h.box(B.PAD,.12,1.8,1.9,y*(20-.1),.9,S*2.05);for(let y of[1,-1])for(let S=0;S<4;S++)bp(h,y*(20-.25),6.6,-4.5+S*3,y>0?-Math.PI/2:Math.PI/2,1.6,2.4,S%2?B.BANNER_HOME:B.BANNER_AWAY,e,S%2?n.toUpperCase().slice(0,12):"CHAMPIONS");if(Mp(h,20-.3,5.2,0,-Math.PI/2,4.4,1.7,f),Mp(h,-20+.3,5.2,0,Math.PI/2,4.4,1.7,f),s==="gym"){for(let y of[1,-1])Ia(h,{cx:0,cz:y*(Nt.HW+2.6),ry:y>0?0:Math.PI,len:26,rows:7,rowDepth:.72,rowHeight:.36,base:.42,density:c,roles:[B.WOOD,B.STAND_B],seatRole:B.WOOD,wallRole:B.WALL_B},l,u);ql(d,-6,-(Nt.HW+1.35),Math.PI,B.BANNER_HOME),ql(d,6,-(Nt.HW+1.35),Math.PI,B.BANNER_AWAY)}else{for(let y of[1,-1])h.box(B.WOOD,26,2.4,.9,0,1.2,y*(14.5-.6));for(let y=0;y<2;y++){let S=2+y*4;h.box(B.METAL,1.4,.06,.45,S,.7,-(Nt.HW+1.6)),h.box(B.METAL,1.4,.06,.45,S,.35,-(Nt.HW+1.6));for(let M=0;M<5;M++)h.sphere(B.BALL,.12,S-.52+M*.26,.85,-(Nt.HW+1.6),{ws:8,hs:6}),h.sphere(B.BALL,.12,S-.52+M*.26,.5,-(Nt.HW+1.6),{ws:8,hs:6})}for(let y=0;y<6;y++)h.cone(B.CONE,.12,.3,10,-6+y*1.2,.15,Nt.HW+1.2)}}else{_p(h,30,25,22,{windows:0,lamps:[6,4],dado:3}),$b(h,e,x,Nt.HL+2.3,Nt.HW+2.2,7.5);let y={rows:12,rowDepth:.85,rowHeight:.45,base:1.2,density:c,roles:[B.STAND_A,B.STAND_C],seatRole:B.SEAT};for(let A of[1,-1])Ia(h,{...y,cx:0,cz:A*(Nt.HW+4.4),ry:A>0?0:Math.PI,len:34},l,u);for(let A of[1,-1])Ia(h,{...y,cx:A*(Nt.HL+4.8),cz:0,ry:A>0?Math.PI/2:-Math.PI/2,len:24},l,u);let S={...y,rows:10,base:7.4,z0:11,tier:1,density:.85*c,roles:[B.STAND_B,B.STAND_C],wallRole:B.WALL_B};for(let A of[1,-1])Ia(h,{...S,cx:0,cz:A*(Nt.HW+4.4),ry:A>0?0:Math.PI,len:44},l,u);for(let A of[1,-1])Ia(h,{...S,cx:A*(Nt.HL+4.8),cz:0,ry:A>0?Math.PI/2:-Math.PI/2,len:32},l,u);let M=new ls(h,0,Nt.HW+1.5,0);for(let A=0;A<26;A++){let P=-12.5+A;M.box(B.CHAIR,.5,.45,.5,P,.22,0),l()<.75*c&&(yp(M,P,.45,0,l,!0,i==="high"),u.people++)}ql(d,-6,-(Nt.HW+1.6),Math.PI,B.BANNER_HOME),ql(d,6,-(Nt.HW+1.6),Math.PI,B.BANNER_AWAY),Wb(d,e,0,-(Nt.HW+1.9),["COURTSIDE",n.toUpperCase(),r.toUpperCase()]);let R=12.5,b=6.4,T=3.6;h.box(B.METAL,b+.6,T+.8,b+.6,0,R,0),h.box(B.BANNER_HOME,b+.8,.4,b+.8,0,R+T/2+.55,0),h.box(B.METAL,3,1.4,3,0,R-T/2-1,0);for(let[A,P,N]of[[0,b/2+.31,0],[0,-b/2-.31,Math.PI],[b/2+.31,0,Math.PI/2],[-b/2-.31,0,-Math.PI/2]])f.push({kind:"score",x:A,y:R,z:P,ry:N+Math.PI,w:b,h:T});for(let[A,P]of[[-3,-3],[3,-3],[3,3],[-3,3]])h.line(A,R+T/2+.75,P,A*2,22,P*2);for(let A=0;A<6;A++)bp(h,-12.5+A*5,17,25-.4,Math.PI,2,3.4,A%2?B.BANNER_HOME:B.GOLD,e,A%2?n.toUpperCase().slice(0,12):"CHAMPIONS")}let m=Math.round(Ns[s].crowd*c);if(m>0&&u.seats.length){let p=u.seats,v=p.reduce((y,S)=>y+S.w,0),E=Math.min(1,m/v);for(let y of p)l()<y.w*E&&(yp(y.f,y.lx,y.y,y.lz,l,y.seated,i==="high"&&y.row<5),u.people++)}return g.people=u.people,g.solid=h.buildSolid(),g.edges=h.buildEdges(),g.casterSolid=d.buildSolid(),g.casterEdges=d.buildEdges(),g.screens=f,g.edgeCount=h.edgeCount,g.vertCount=h.vcount,g}var Vt={PELVIS:0,TORSO:1,HEAD:2,UARM_L:3,UARM_R:4,FARM_L:5,FARM_R:6,THIGH_L:7,THIGH_R:8,SHIN_L:9,SHIN_R:10,BOOT_L:11,BOOT_R:12},Lr=13,je=1.1,Tu=1.07,yi={thigh:.44*je,shin:.43*je,ankle:.08*je,upper:.29*je*Tu,fore:.27*je*Tu,hipW:.095*je,shoulderW:.19*je,torsoH:.5*je,waist:.07*je,neck:.58*je,shoulderY:.45*je},Xb=new Gt().makeScale(je,je,je),qb=new Gt().makeScale(je,je*Tu,je),pe=(s,t,e,i=0,n=0,r=0,a=1,o=1,l=1)=>Xb.clone().multiply(gi.mat(s,t,e,i,n,r,a,o,l)),Ds=(s,t,e,i=0,n=0,r=0,a=1,o=1,l=1)=>qb.clone().multiply(gi.mat(s,t,e,i,n,r,a,o,l)),Kl={high:{body:16,limb:11,head:[16,12],small:[8,6],joint:[11,8],sole:11,laces:!0},medium:{body:10,limb:8,head:[12,9],small:[6,4],joint:[7,5],sole:7,laces:!0},low:{body:8,limb:6,head:[10,7],small:[5,4],joint:[6,4],sole:6,laces:!1}},Ir=[[0,.165,.112,0],[.1,.176,.118,.004],[.22,.198,.126,.01],[.34,.222,.132,.012],[.44,.232,.122,.002],[.5,.198,.106,-.004],[.545,.1,.07,0]],Yb=[[-.13,.162,.118,0],[-.03,.178,.126,.002],[.08,.17,.118,0]],Kb=[[.04,.176,.124,0],[.085,.174,.122,0]],Zb=[[-.34,.094,.096,.004],[-.15,.1,.102,.004],[-.02,.098,.1,.002],[.03,.097,.099,0]],Jb=[[-.455,.045,.047,.004],[-.4,.05,.053,.004],[-.3,.056,.058,.004],[-.14,.064,.069,.008],[0,.066,.067,.004]],jb=[[-.43,.038,.04,.002],[-.3,.044,.046,0],[-.14,.054,.06,-.009],[-.04,.05,.054,-.003],[0,.046,.05,0]],Qb=[[-.44,.042,.044,.002],[-.34,.046,.048,0]],t_=[[-.27,.04,.04,0],[-.14,.05,.052,0],[-.03,.058,.058,0],[.02,.056,.056,0]],e_=[[-.255,.03,.027,0],[-.08,.043,.042,0],[0,.04,.041,0]],i_=[[-.02,.064,.064,0],[.012,.063,.063,0]],n_=[[-.062,.034,.05,.03],[-.045,.047,.062,.03],[.02,.052,.058,.033],[.1,.056,.042,.047],[.17,.05,.03,.058],[.212,.03,.02,.066]],s_=[[-.066,.04,.012,.082],[-.04,.051,.012,.083],[.1,.06,.012,.083],[.175,.055,.012,.083],[.218,.033,.011,.081]],r_=[B.HAIR_1,B.HAIR_2,B.HAIR_1],a_=[B.SKIN_1,B.SKIN_2,B.SKIN_3],Eu=["crop","afro","buzz","headband","braids","bald"];function Rp(s){let t=s.team;return{shirt:t===0?B.JERSEY_0:B.JERSEY_1,shorts:t===0?B.SHORTS_0:B.SHORTS_1,trim:t===0?B.TRIM_0:B.TRIM_1,num:t===0?B.NUM_0:B.NUM_1,skin:s.isHuman?B.SKIN_H:a_[s.id*7%3],hair:s.isHuman?B.HAIR_H:r_[s.id*5%3],shoe:s.isHuman?B.SHOE_H:B.SHOE}}function Ap(s,t,e,i){let n=s.positions,r=new Array(n.length/3),a=(t-1)*e*2;for(let o=0;o<n.length/9;o++){let l=o<a?i(Math.floor(o%(2*e)/2),Math.floor(o/(2*e))):i(-1,-1);r[o*3]=r[o*3+1]=r[o*3+2]=l}return r}function Yl(s,t,e){let i=0;for(;i<Ir.length-2&&Ir[i+1][0]<s;)i++;let n=Ir[i],r=Ir[i+1],a=Math.min(1,Math.max(0,(s-n[0])/(r[0]-n[0]))),o=n[1]+(r[1]-n[1])*a,l=n[2]+(r[2]-n[2])*a,c=n[3]+(r[3]-n[3])*a,h=Math.min(.97,Math.abs(t)/o),d=l*Math.sqrt(1-h*h)*(e?-1:1);return{z:c+d,ry:Math.atan2(t/(o*o),d/(l*l))}}function o_(s,t,e,i,n){let[r,a]=i.head,[o,l]=i.small;s.add(Li(.113,r,a),pe(0,.14,-.004,0,0,0,.93,1.03,1),t.skin,e),s.add(Li(.083,Math.round(r*.75),Math.round(a*.75)),pe(0,.078,.022,0,0,0,.97,.86,1),t.skin,e);for(let h of[-1,1])s.add(Li(.027,o,l),pe(h*.106,.125,-.004,0,0,0,.45,1.15,.8),t.skin,e),s.add(Li(.0135,o,l),pe(h*.041,.142,.101,0,0,0,1.25,1,.55),B.EYE,{...e,noEdges:!0}),s.add(ks(.04,.01,.012),pe(h*.041,.166,.1,0,0,-h*.12),t.hair,{...e,creaseOnly:!0});s.add(Ra(.019,.042,6),pe(0,.118,.11,Math.PI/2+.25),t.skin,e),s.add(ks(.036,.005,.006),pe(0,.071,.103),B.EYE,{...e,noEdges:!0});let c=(h,d,u,f=.145,g=-.012)=>s.add(Li(h,r,Math.max(4,Math.round(a*.5)),Math.PI*2,Math.PI*d),pe(0,f,g,u),t.hair,e);switch(n){case"buzz":c(.1165,.37,-.2);break;case"bald":break;case"afro":s.add(Li(.14,r,a),pe(0,.19,-.03,0,0,0,1.05,.82,1.02),t.hair,e);break;case"headband":c(.119,.42,-.25),s.add(xi("band",[[.155,.112,.118,-.004],[.19,.108,.114,-.006]],i.limb,{caps:[!1,!1]}),pe(0,0,0),B.BAND,e);break;case"braids":c(.118,.44,-.25);for(let h=-3;h<=3;h++)s.add(Aa(.012,.012,.2,5),pe(h*.03,.2,-.02,.15,0,0,1,1,1),t.hair,{...e,creaseOnly:!0});break;default:c(.12,.43,-.25)}}function Zl(s,t,e,i,n,r){let[a,o]=r.small;s.add(Li(.064,r.limb,Math.round(r.limb*.7)),Ds(0,-.005,0),t.skin,e),s.add(xi("armhole",i_,r.limb,{caps:[!1,!1]}),Ds(0,0,0,0,0,n*.35),t.trim,e),s.add(xi("upper",t_,r.limb),Ds(0,0,0),t.skin,e),s.add(Li(.041,r.joint[0],r.joint[1]),Ds(0,0,0),t.skin,{...i,noEdges:!0}),s.add(xi("fore",e_,r.limb),Ds(0,0,0),t.skin,i),s.add(Li(.05,a+2,o+1),Ds(0,-.29,.004,0,0,0,.74,1.15,.5),t.skin,i),s.add(Li(.021,a,o),Ds(-n*.018,-.27,.03,.3,0,0,.9,1.5,.9),t.skin,i)}function l_(s,t,e,i,n,r){let a=Rp(t),o=p=>({part:e+p}),l=n.body,c=Ir.length;s.add(xi("pelvis",Yb,n.body),pe(0,0,0),a.shorts,o(Vt.PELVIS)),s.add(xi("waistband",Kb,n.body,{caps:[!1,!1]}),pe(0,0,0),a.trim,o(Vt.PELVIS));let h=xi("torso",Ir,n.body),d=p=>{let v=(p+.5)/l;return Math.abs(v-.25)<.045||Math.abs(v-.75)<.045},u=r&&r.pattern==="stripes"?Ap(h,c,l,p=>p>=0&&p%2===1?a.trim:a.shirt):Ap(h,c,l,(p,v)=>p>=0&&d(p)&&v<5?a.trim:a.shirt);s.add(h,pe(0,0,0),a.shirt,{...o(Vt.TORSO),roles:u}),s.add(xi("collar",[[.505,.09,.07,.004],[.548,.078,.06,.002]],n.body,{caps:[!1,!1]}),pe(0,0,0),a.trim,o(Vt.TORSO)),s.add(Aa(.05,.056,.12,n.limb),pe(0,.575,0),a.skin,o(Vt.TORSO));let f=String(t.number??0),g=f.length>1?.13:.17;for(let p=0;p<f.length;p++){let v=(p-(f.length-1)/2)*g*.95,E=Yl(.27,v,!0);s.add(Rr(g,.22),pe(v,.27,E.z-.005,0,E.ry,0),a.num,{...o(Vt.TORSO),uvRect:i.digit(+f[p]),noEdges:!0});let y=Yl(.26,v*.7,!1);s.add(Rr(g*.7,.15),pe(v*.7,.26,y.z+.005,0,y.ry,0),a.num,{...o(Vt.TORSO),uvRect:i.digit(+f[p]),noEdges:!0})}let x=(t.name||"").split(" ").pop().toUpperCase().slice(0,10);if(x){let p=Yl(.43,0,!0);s.add(Rr(.26,.045),pe(0,.43,p.z-.006,0,p.ry,0),a.num,{...o(Vt.TORSO),uvRect:i.word(x),noEdges:!0})}if(r&&r.word){let p=Yl(.385,0,!1);s.add(Rr(.28,.06),pe(0,.385,p.z+.006,0,p.ry,0),a.num,{...o(Vt.TORSO),uvRect:i.word(r.word),noEdges:!0})}let m=t.isHuman?Eu[t.look&&t.look.style||0]:Eu[(t.id*5+(t.number||0)*3)%Eu.length];o_(s,a,o(Vt.HEAD),n,m),Zl(s,a,o(Vt.UARM_L),o(Vt.FARM_L),1,n),Zl(s,a,o(Vt.UARM_R),o(Vt.FARM_R),-1,n);for(let[p,v,E,y]of[[Vt.THIGH_L,Vt.SHIN_L,Vt.BOOT_L,1],[Vt.THIGH_R,Vt.SHIN_R,Vt.BOOT_R,-1]])if(s.add(xi("shortsleg",Zb,n.limb,{caps:[!1,!1]}),pe(0,0,0),a.shorts,o(p)),s.add(ks(.016,.33,.03),pe(y*.097,-.16,0),a.trim,{...o(p),creaseOnly:!0}),s.add(xi("thigh",Jb,n.limb),pe(0,0,0),a.skin,o(p)),s.add(Li(.047,n.joint[0],n.joint[1]),pe(0,-.005,.006),a.skin,{...o(v),noEdges:!0}),s.add(xi("calf",jb,n.limb),pe(0,0,0),a.skin,o(v)),s.add(xi("sock",Qb,n.limb,{caps:[!1,!1]}),pe(0,0,0),B.SOCK,o(v)),s.add(xi("shoe",n_,n.limb,{axis:"z"}),pe(0,0,0),a.shoe,o(E)),s.add(xi("sole",s_,n.sole,{axis:"z"}),pe(0,0,0),B.SOLE,{...o(E),creaseOnly:!0}),n.laces){for(let S=0;S<3;S++)s.add(ks(.036,.004,.008),pe(0,-.002-S*.008,.03+S*.03,-.25),B.SOLE,{...o(E),noEdges:!0});s.add(ks(.004,.02,.09),pe(y*.053,-.045,.05,-.12),B.SOLE,{...o(E),noEdges:!0})}}function Cp(s,t){let e=Cr("bball",()=>new ws(Et,3),70);s.add(e,new Gt,B.BALL,{part:t});let i=Et*1.004,n=40,r=a=>{let o=a(0);for(let l=1;l<=n;l++){let c=a(l/n*Math.PI*2);s.line(o[0],o[1],o[2],c[0],c[1],c[2],t),o=c}};r(a=>[Math.cos(a)*i,0,Math.sin(a)*i]),r(a=>[0,Math.cos(a)*i,Math.sin(a)*i]);for(let a of[1,-1])r(l=>[a*Math.cos(.92)*i,Math.sin(.92)*Math.cos(l)*i,Math.sin(.92)*Math.sin(l)*i])}var Jl=class s{constructor(t,e,i={}){this.players=t,this.rows=t.length*Lr+1,this.ballRow=t.length*Lr;let n=Math.max(1,this.rows);this.data=new Float32Array(16*n),this.texture=new Kn(this.data,4,n,mi,pi),this.texture.minFilter=Ne,this.texture.magFilter=Ne,this.texture.needsUpdate=!0,Ot.uParts.value=this.texture;let r=new gi({parts:!0,atlas:!0}),a=Kl[i.quality]||Kl.high,o=i.kits||[];t.forEach((l,c)=>l_(r,l,c*Lr,e,a,o[l.team])),Cp(r,this.ballRow),this.solidGeo=r.buildSolid(),this.edgeGeo=r.buildEdges(),this.mesh=new ce(this.solidGeo,s.solidMaterial()),this.mesh.frustumCulled=!1,this.mesh.castShadow=!0,this.mesh.receiveShadow=!0,this.mesh.customDepthMaterial=s.depthMaterial(),this.edges=new ce(this.edgeGeo,s.edgeMaterial()),this.edges.frustumCulled=!1,this.edges.renderOrder=1;for(let l=0;l<this.rows;l++)this.setIdentity(l)}static solidMaterial(){return s._sm||(s._sm=Tr({parts:!0,atlas:!0}))}static edgeMaterial(){return s._em||(s._em=Ls({parts:!0,widthScale:.75}))}static depthMaterial(){return s._dm||(s._dm=dp())}setIdentity(t){let e=t*16;this.data.fill(0,e,e+16),this.data[e]=this.data[e+5]=this.data[e+10]=this.data[e+15]=1}setMatrix(t,e){this.data.set(e.elements,t*16)}hide(t){let e=t*16;this.data.fill(0,e,e+16),this.data[e]=this.data[e+5]=this.data[e+10]=1e-4,this.data[e+13]=-50,this.data[e+15]=1}commit(){this.texture.needsUpdate=!0}dispose(){this.solidGeo.dispose(),this.edgeGeo.dispose(),this.texture.dispose()}},Vi={UARM_L:0,UARM_R:1,FARM_L:2,FARM_R:3,BALL:4},La=class{constructor(t,e={}){this.rows=5,this.data=new Float32Array(16*this.rows),this.texture=new Kn(this.data,4,this.rows,mi,pi),this.texture.minFilter=Ne,this.texture.magFilter=Ne;let i=new gi({parts:!0,atlas:!0}),n=Kl[e.quality]||Kl.high,r=Rp(t);Zl(i,r,{part:Vi.UARM_L},{part:Vi.FARM_L},1,n),Zl(i,r,{part:Vi.UARM_R},{part:Vi.FARM_R},-1,n),Cp(i,Vi.BALL),this.solidGeo=i.buildSolid(),this.edgeGeo=i.buildEdges();let a=Tr({parts:!0,atlas:!0});a.uniforms.uParts={value:this.texture};let o=Ls({parts:!0,widthScale:.8});o.uniforms.uParts={value:this.texture},this.mesh=new ce(this.solidGeo,a),this.edges=new ce(this.edgeGeo,o),this.mesh.frustumCulled=!1,this.edges.frustumCulled=!1,this.edges.renderOrder=1,this.scene=new ys,this.scene.add(this.mesh,this.edges),this.materials=[a,o];for(let l=0;l<this.rows;l++)this.hide(l)}setMatrix(t,e){this.data.set(e.elements,t*16)}hide(t){let e=t*16;this.data.fill(0,e,e+16),this.data[e]=this.data[e+5]=this.data[e+10]=1e-4,this.data[e+13]=-50,this.data[e+15]=1}commit(){this.texture.needsUpdate=!0}dispose(){this.solidGeo.dispose(),this.edgeGeo.dispose(),this.texture.dispose();for(let t of this.materials)t.dispose()}};var Me=class s{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return this.x=t,this.y=e,this.z=i,this}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}clone(){return new s(this.x,this.y,this.z)}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}addScaled(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}scale(t){return this.x*=t,this.y*=t,this.z*=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}len(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}lenSq(){return this.x*this.x+this.y*this.y+this.z*this.z}lenXZ(){return Math.sqrt(this.x*this.x+this.z*this.z)}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}dotXZ(t){return this.x*t.x+this.z*t.z}dist(t){let e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return Math.sqrt(e*e+i*i+n*n)}distXZ(t){let e=this.x-t.x,i=this.z-t.z;return Math.sqrt(e*e+i*i)}normalize(){let t=this.len();return t>1e-9&&(this.x/=t,this.y/=t,this.z/=t),this}flatNormalize(){this.y=0;let t=Math.sqrt(this.x*this.x+this.z*this.z);return t>1e-9&&(this.x/=t,this.z/=t),this}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}isFinite(){return Number.isFinite(this.x)&&Number.isFinite(this.y)&&Number.isFinite(this.z)}},_t=(s,t,e)=>s<t?t:s>e?e:s;var Pp=Math.PI*2;function Ip(s){return s=(s+Math.PI)%Pp,s<0&&(s+=Pp),s-Math.PI}var sn=(s,t)=>Ip(t-s),$t=(s,t)=>Math.atan2(s,t);function Au(s,t,e){let i=sn(s,t);return Math.abs(i)<=e?t:Ip(s+Math.sign(i)*e)}function Os(s,t,e,i,n,r){let a=n-e,o=r-i,l=a*a+o*o,c=l>1e-9?((s-e)*a+(t-i)*o)/l:0;c=_t(c,0,1);let h=e+a*c,d=i+o*c,u=s-h,f=t-d;return{d:Math.sqrt(u*u+f*f),t:c}}function Ru(s){return s<1.5?1.05+s*.18:s<5?1.32+(s-1.5)*.42:2.79+(s-5)*.28}function Lp(s){return _t(.68/s,.18,.6)}var c_=1;function h_(s=60){return{shooting:s,handling:s,speed:s,defense:s,passing:s,vertical:s}}var ve={EYE:1.9,SHOULDER:1.6,REACH:2.36,HOLD_Y:1.12,RADIUS:.3},jl=class{constructor(t={}){this.id=c_++,this.team=t.team??0,this.slot=t.slot??0,this.name=t.name||"Player",this.number=t.number??7,this.isHuman=!!t.isHuman,this.archetype=t.archetype||"wing",this.attrs=Object.assign(h_(60),t.attrs||{}),this.look=t.look||null,this.pos=new Me,this.prevPos=new Me,this.vel=new Me,this.vy=0,this.yaw=0,this.prevYaw=0,this.desired=new Me,this.sprint=!1,this.faceYaw=null,this.stance=!1,this.stanceW=0,this.handsUp=!1,this.stamina=1,this.gait=0,this.prevGait=0,this.jumpH=0,this.landT=-10,this.action=null,this.dribble=null,this.hand="R",this.noCatchUntil=0,this.stealReadyAt=0,this.offBalanceUntil=0,this.bumpUntil=0,this.celebrateUntil=0,this.requestUntil=0,this.requestReadyAt=0,this.beatenUntil=0,this.ai={state:"idle",target:new Me,think:0,mark:null,spot:null,wait:0}}get speed(){return Math.sqrt(this.vel.x*this.vel.x+this.vel.z*this.vel.z)}get airborne(){return this.pos.y>.001||this.vy>0}jogSpeed(){return 4.2+(this.attrs.speed-50)*.014}sprintSpeed(){let t=this.stamina<.35?(.35-this.stamina)/.35:0;return(6.2+(this.attrs.speed-50)*.028)*(1-.14*t)}stanceSpeed(){return 3.5+(this.attrs.defense-50)*.012+(this.attrs.speed-50)*.006}maxSpeed(t,e){if(this.stance)return this.stanceSpeed();let i=t&&this.stamina>.02?this.sprintSpeed():this.jogSpeed();return e&&(i*=t?.88+(this.attrs.handling-50)*.0012:.94),i}jumpHeight(){return .5+this.attrs.vertical/99*.42}forwardX(){return Math.sin(this.yaw)}forwardZ(){return Math.cos(this.yaw)}};function Cu(s){s.action=null,s.dribble=null,s.vel.set(0,0,0),s.desired.set(0,0,0),s.vy=0,s.pos.y=0,s.stance=!1,s.handsUp=!1,s.offBalanceUntil=0,s.celebrateUntil=0,s.requestUntil=0,s.beatenUntil=0,s.prevPos.copy(s.pos),s.prevYaw=s.yaw}function rn(s,t,e){if(s.airborne)return!1;let i=e??s.jumpHeight();return s.vy=Math.sqrt(2*De*i),s.jumpH=i,s.vel.scale(.85),!0}function kp(s,t,e,i=!1){if(s.prevPos.copy(s.pos),s.prevYaw=s.yaw,s.prevGait=s.gait,s.airborne){s.vy-=De*t,s.pos.x+=s.vel.x*t,s.pos.z+=s.vel.z*t,s.pos.y+=s.vy*t,s.pos.y<=0&&(s.pos.y=0,s.vy=0,s.landT=e,s.vel.scale(.45));let M=s.faceYaw??s.yaw;s.yaw=Au(s.yaw,M,6*t);return}let n=1/0;e<s.offBalanceUntil&&(n=1.6),e<s.bumpUntil&&(n=Math.min(n,2.4)),e-s.landT<.12&&(n=Math.min(n,1));let r=s.action;r&&r.lockMove&&(n=Math.min(n,r.lockMove));let a=s.desired,o=a.x,l=a.z,c=Math.sqrt(o*o+l*l),h=Math.min(s.maxSpeed(s.sprint,i),n);if(c>.1){let M=Math.abs(sn(s.yaw,$t(o,l))),R=s.stance?M>2.2?.85:1:M>2.2?.66:M>1.1?.86:1;h*=R}c>h&&(o*=h/c,l*=h/c,c=h);let d=s.vel.x,u=s.vel.z,f=o-d,g=l-u,x=Math.sqrt(f*f+g*g),m=(s.stance?17:12)+s.attrs.speed*.05,v=(o*d+l*u<d*d+u*u-.01?22:m)*t;x>v&&(f*=v/x,g*=v/x),s.vel.x+=f,s.vel.z+=g,s.vel.y=0,s.pos.x+=s.vel.x*t,s.pos.z+=s.vel.z*t,s.pos.y=0;let E=s.faceYaw,y=s.speed;E==null&&(E=y>.4?$t(s.vel.x,s.vel.z):s.yaw);let S=(s.isHuman?16:9)*t;s.yaw=Au(s.yaw,E,S),s.sprint&&y>s.jogSpeed()*1.03?s.stamina-=.06*t:y<2.2?s.stamina+=.06*t:s.stamina+=.02*t,s.stamina=_t(s.stamina,0,1),y>.05&&(s.gait+=y*t/Ru(y)),s.stanceW+=((s.stance?1:0)-s.stanceW)*Math.min(1,t*10)}function Np(s,t,e){let i=s.length;for(let n=0;n<i;n++){let r=s[n];for(let a=n+1;a<i;a++){let o=s[a],l=o.pos.x-r.pos.x,c=o.pos.z-r.pos.z,h=l*l+c*c,d=r.isHuman||o.isHuman?.7:.62;if(h<d*d&&h>1e-8){let u=Math.sqrt(h),f=d-u,g=l/u,x=c/u,m=1,p=1;r===e&&o.stance?(m=1.6,p=.4,r.bumpUntil=t+.25):o===e&&r.stance&&(p=1.6,m=.4,o.bumpUntil=t+.25);let v=m+p;r.pos.x-=g*f*(m/v),r.pos.z-=x*f*(m/v),o.pos.x+=g*f*(p/v),o.pos.z+=x*f*(p/v)}else h<=1e-8&&(o.pos.x+=.05)}}}function Dp(s,t=!1){s.pos.x=_t(s.pos.x,t?-14.6:-1.5,14.6),s.pos.z=_t(s.pos.z,-8.3,8.3)}var Pu=new k(0,1,0),Re=Array.from({length:24},()=>new k),cs=new Si,ki=(s,t,e)=>s+(t-s)*e,an=(s,t,e)=>s<t?t:s>e?e:s,kr=s=>(s=an(s,0,1),s*s*(3-2*s));function u_(s,t,e){let i=t-s;for(;i>Math.PI;)i-=Math.PI*2;for(;i<-Math.PI;)i+=Math.PI*2;return s+i*e}function d_(s){return s-Math.floor(s)}var te=()=>new k,Iu={x:te(),y:te(),z:te()},Ql={d:te(),bend:te(),r:te(),t:te()},Ee={pelvis:te(),waist:te(),neck:te(),fwd:te(),side:te(),hip:te(),ankT:te(),knee:te(),ankle:te(),pole:te(),back:te(),sh:te(),tgt:te(),off:te(),elbow:te(),hand:te(),pole2:te()},Op=1.03;function tc(s,t,e,i){let n=Iu.y.subVectors(t,e);n.lengthSq()<1e-8&&n.set(0,1,0),n.normalize();let r=Iu.z.copy(i).addScaledVector(n,-i.dot(n));r.lengthSq()<1e-6&&(r.set(0,0,1).addScaledVector(n,-n.z),r.lengthSq()<1e-6&&r.set(1,0,0)),r.normalize();let a=Iu.x.crossVectors(n,r);return s.makeBasis(a,n,r),s.setPosition(t),s}function Up(s,t,e,i,n,r,a){let o=Ql.r.copy(s),l=Ql.t.copy(t),c=Ql.d.subVectors(l,o),h=c.length();h<1e-4?(c.set(0,-1,0),h=1e-4):c.divideScalar(h),h=an(h,Math.abs(e-i)+.02,e+i-.002),a.copy(o).addScaledVector(c,h);let d=an((e*e+h*h-i*i)/(2*e*h),-1,1),u=Math.sqrt(1-d*d),f=Ql.bend.copy(n).addScaledVector(c,-n.dot(c));f.lengthSq()<1e-6&&f.set(0,0,1),f.normalize(),r.copy(o).addScaledVector(c,e*d).addScaledVector(f,e*u)}var ec=class{constructor(){this.pos=te(),this.plant=te(),this.from=te(),this.swing=!1,this.step=null,this.out=te()}},ic=class{constructor(t){this.p=t,this.feet=[new ec,new ec],this.ready=!1,this.lastRoot=te(),this.lean=0,this.headYaw=0,this.headPitch=0,this.m=Array.from({length:13},()=>new Gt),this.root=te(),this.yaw=0,this.hands=[te(),te()],this.shoulders=[te(),te()],this.handW=[0,0],this.prevHand=[te(),te()],this.wTarget=[te(),te()],this.reachW=0,this.stance=0}reset(){this.ready=!1}update(t){let e=this.p,i=t.match,n=Math.min(t.dt,.05),r=t.now,a=t.alpha,o=i.ball,l=e.action,c=ki(e.prevPos.y,e.pos.y,a),h=this.root.set(ki(e.prevPos.x,e.pos.x,a),0,ki(e.prevPos.z,e.pos.z,a)),d=this.yaw=u_(e.prevYaw,e.yaw,a),u=Re[0].set(Math.sin(d),0,Math.cos(d)),f=Re[1].set(Math.cos(d),0,-Math.sin(d)),g=e.vel.x,x=e.vel.z,m=Math.hypot(g,x),p=an(m/7,0,1),v=c>.01;this.stance=ki(this.stance,e.stanceW,1-Math.exp(-n*12));let E=this.stance,y=.12+.11*E;if(!this.ready||this.lastRoot.distanceTo(h)>2.5){this.ready=!0;for(let rt=0;rt<2;rt++){let I=this.feet[rt];I.pos.copy(h).addScaledVector(f,rt===0?y:-y),I.plant.copy(I.pos),I.swing=!1,I.step=null}this.prevHand[0].set(0,-9,0),this.prevHand[1].set(0,-9,0)}this.lastRoot.copy(h);let S=ki(e.prevGait,e.gait,a),M=Ru(Math.max(m,.6)),R=Lp(M),b=m>.01?g/m:u.x,T=m>.01?x/m:u.z;for(let rt=0;rt<2;rt++){let I=this.feet[rt],Y=rt===0?1:-1,at=f.x*y*Y,yt=f.z*y*Y;if(v){let ot=.12*Math.sin(Math.min(1,e.vy>0?.5:1)*Math.PI);I.pos.set(h.x+at*.8+u.x*(rt===0?.06:-.04),c+.04+ot*(rt===0?1:.6),h.z+yt*.8+u.z*(rt===0?.06:-.04)),I.plant.set(I.pos.x,0,I.pos.z),I.swing=!1,I.step=null}else if(m>.35){I.step=null;let ot=d_(S-(rt===0?0:.5));if(ot<R){I.swing&&(I.swing=!1,I.plant.set(I.pos.x,0,I.pos.z));let Ct=h.x+at,ye=h.z+yt;Math.hypot(I.plant.x-Ct,I.plant.z-ye)>.95&&I.plant.set(Ct+b*.2,0,ye+T*.2),I.pos.copy(I.plant)}else{I.swing||(I.swing=!0,I.from.set(I.pos.x,0,I.pos.z));let Ct=(ot-R)/(1-R),ye=(1-ot)*M/Math.max(m,.5),Wt=h.x+g*ye+b*R*M*.5+at,ee=h.z+x*ye+T*R*M*.5+yt,me=kr(Ct);I.pos.set(ki(I.from.x,Wt,me),(.09+m*.035)*(1-.6*E)*Math.sin(Math.PI*Math.pow(Ct,.75)),ki(I.from.z,ee,me))}}else{let ot=h.x+at+u.x*(rt===0?.04:-.04),Ct=h.z+yt+u.z*(rt===0?.04:-.04);I.swing&&(I.swing=!1,I.step={fx:I.pos.x,fz:I.pos.z,t:0,dur:.13});let ye=this.feet[1-rt];if(I.step){I.step.t+=n;let Wt=an(I.step.t/I.step.dur,0,1),ee=kr(Wt);I.pos.set(ki(I.step.fx,ot,ee),.07*Math.sin(Math.PI*Wt),ki(I.step.fz,Ct,ee)),Wt>=1&&(I.step=null,I.plant.set(ot,0,Ct))}else Math.hypot(I.plant.x-ot,I.plant.z-Ct)>.2&&!ye.step?I.step={fx:I.plant.x,fz:I.plant.z,t:0,dur:.15}:I.pos.copy(I.plant)}I.out.copy(I.pos)}let A=Op-.05*p+.018*p*Math.cos(S*Math.PI*4)-.2*E+c,P=r-e.landT;P>=0&&P<.22&&(A-=.13*Math.sin(P/.22*Math.PI)),v&&(A=c+Op-.04);let N=.05+.14*p+.24*E+(e.sprint?.04:0),H=.14*p*Math.sin(S*Math.PI*2)*(1-E),L=Math.sin(S*Math.PI*2),V=(.08+.3*p)*(1-E),K=Re[2].set(.05,-.55+.18*p,-L*V),Z=Re[3].set(-.05,-.55+.18*p,L*V);E>.01&&(K.lerp(Re[10].set(.42,-.15,.3),E),Z.lerp(Re[11].set(-.42,-.3,.3),E));let j=[null,null],X=t.ball,et=o.owner===e&&(o.state==="held"||o.state==="dribble"),nt=(rt,I,Y)=>Y.copy(I).addScaledVector(f,rt);if(et&&o.state==="dribble"&&e.dribble){let rt=e.dribble,Y=(rt.t<rt.td?rt.from:rt.to)==="L"?0:1,at=c+(rt.t<rt.td?rt.a[2]:rt.c[2])+Et+.03,yt=an(X.y+Et+.025,at-.26,at+.02);j[Y]=Re[12].set(X.x-u.x*.03,yt,X.z-u.z*.03);let ot=f_(i,e),Ct=Y===0?Z:K;ot&&ot.d<1.8?Ct.set(Y===0?-.2:.2,-.22,.32):Ct.set(Y===0?-.1:.1,-.5,.12+L*.08),N+=.06}else if(et){let rt=l&&l.type==="shot"&&!l.released?l:null,I=X.y>c+1.7;rt&&(rt.kind==="layup"||rt.kind==="dunk"&&I)?(j[1]=Re[12].copy(X).addScaledVector(u,-.05).addScaledVector(Pu,-Et-.02),rt.kind==="dunk"?j[0]=nt(Et+.03,X,Re[13]):K.set(.25,-.35,.15)):rt&&I?(j[1]=Re[12].copy(X).addScaledVector(u,-.1).addScaledVector(f,-.025).addScaledVector(Pu,-.075),j[0]=nt(Et+.028,X,Re[13]).addScaledVector(u,-.02)):(j[0]=nt(Et+.026,X,Re[12]).addScaledVector(u,-.035),j[1]=nt(-(Et+.026),X,Re[13]).addScaledVector(u,-.035))}else if(l&&l.type==="shot"&&l.released){let rt=l.t-l.rt;if(l.kind==="dunk"&&v){let I=(h.x>=0?1:-1)*F.X,Y=I-h.x,at=F.Z-h.z,yt=Math.hypot(Y,at)||1,ot=I-Y/yt*F.R,Ct=F.Z-at/yt*F.R;j[0]=Re[12].set(ot,F.Y+.02,Ct).addScaledVector(f,.14),j[1]=Re[13].set(ot,F.Y+.02,Ct).addScaledVector(f,-.14)}else if(rt<.55){let I=1-kr((rt-.35)/.2),Y=(this.p.shotSide??1)*F.X-h.x,at=F.Z-h.z,yt=Math.hypot(Y,at)||1,ot=c+ve.SHOULDER;j[1]=Re[12].set(h.x+Y/yt*.38-f.x*.12,ot+.58,h.z+at/yt*.38-f.z*.12),j[0]=Re[13].set(h.x+Y/yt*.25+f.x*.2,ot+.38,h.z+at/yt*.25+f.z*.2),this.handW[0]=Math.min(this.handW[0],I+.001),this.handW[1]=Math.min(this.handW[1],I+.001),I<.02&&(j[0]=j[1]=null)}}else if(l&&l.type==="pass"&&l.released){let rt=(l.t-l.rt)/.3,I=l.target,Y=I.pos.x-h.x,at=I.pos.z-h.z,yt=Math.hypot(Y,at)||1,ot=1-kr((rt-.5)/.5),Ct=c+(l.kind==="bounce"?1:1.3);j[0]=Re[12].set(h.x+Y/yt*.6+f.x*.13,Ct,h.z+at/yt*.6+f.z*.13),j[1]=Re[13].set(h.x+Y/yt*.6-f.x*.13,Ct,h.z+at/yt*.6-f.z*.13),this.handW[0]=Math.min(this.handW[0],ot+.001),this.handW[1]=Math.min(this.handW[1],ot+.001)}else if(l&&l.type==="steal"){let rt=l.t,I=rt<.11?kr(rt/.11):1-kr((rt-.16)/.18),Y=Re[6].set(Math.sin(l.dir),0,Math.cos(l.dir)),at=l.hand==="L"?0:1;j[at]=Re[12].copy(h).addScaledVector(Y,.3+.48*I).addScaledVector(f,at===0?.12:-.12),j[at].y=c+ki(1.15,.8,I),N+=.18*I,A-=.06*I}else if(e.handsUp||l&&l.type==="jump"||v&&!et){let rt=t.local,I=c+ve.REACH-(rt?.16:.04),Y=rt?.42:.16;j[0]=Re[12].copy(h).addScaledVector(u,Y).addScaledVector(f,.18),j[0].y=I,j[1]=Re[13].copy(h).addScaledVector(u,Y).addScaledVector(f,-.18),j[1].y=v?I:I-.3}else if(r<e.celebrateUntil){let rt=r*7+e.id;K.set(.22,.6+.07*Math.sin(rt),.05),Z.set(-.22,.6+.07*Math.cos(rt),.05)}if(!et&&o.state==="free"&&!(l&&(l.type==="steal"||l.type==="shot"&&l.released||l.type==="pass"&&l.released))){let rt=X.x-h.x,I=X.z-h.z,Y=Math.hypot(rt,I);if((o.pass&&o.pass.target===e||Y<1.4&&X.y<c+ve.REACH+.3&&X.y>c+.3&&!(o.shot&&!o.shot.rim&&!o.shot.board&&!o.shot.done))&&Y<2.2){let yt=an(1-(Y-.5)/1.6,0,1);j[0]=nt(Et+.03,X,Re[14]),j[1]=nt(-(Et+.03),X,Re[15]),this.reachW=Math.max(this.reachW*.9,yt),N+=.08*yt}}for(let rt=0;rt<2;rt++){let I=j[rt]?1:0,Y=I?et?30:16:9;this.handW[rt]+=(I-this.handW[rt])*(1-Math.exp(-n*Y)),j[rt]&&this.wTarget[rt].copy(j[rt]),et&&j[rt]&&(this.handW[rt]=Math.max(this.handW[rt],.85))}let Lt=X.x-h.x,At=X.z-h.z,oe=Math.atan2(Lt,At)-d;for(;oe>Math.PI;)oe-=Math.PI*2;for(;oe<-Math.PI;)oe+=Math.PI*2;oe=an(oe,-1.1,1.1),this.headYaw=ki(this.headYaw,oe,1-Math.exp(-n*8));let ne=Math.hypot(Lt,At);return this.headPitch=ki(this.headPitch,an(Math.atan2(c+1.9-X.y,ne)*.6,-.5,.5),1-Math.exp(-n*6)),this.lean=ki(this.lean,N,1-Math.exp(-n*10)),this.poseUpright(h,d,A,this.lean,H,K,Z,t.local),this.m}poseUpright(t,e,i,n,r,a,o,l){let c=this.m,h=Ee.pelvis.set(t.x,i,t.z),d=Ee.fwd.set(Math.sin(e),0,Math.cos(e)),u=Ee.side.set(Math.cos(e),0,-Math.sin(e));l&&h.addScaledVector(d,-.03),cs.set(0,e-r*.4,0,"YXZ"),c[Vt.PELVIS].makeRotationFromEuler(cs).setPosition(h);let f=c[Vt.PELVIS],g=Ee.waist.set(0,yi.waist,0).applyMatrix4(f);cs.set(n,e+r,0,"YXZ"),c[Vt.TORSO].makeRotationFromEuler(cs).setPosition(g);let x=c[Vt.TORSO],m=Ee.neck.set(0,yi.neck,0).applyMatrix4(x);cs.set(this.headPitch-n*.5,e+this.headYaw,0,"YXZ"),c[Vt.HEAD].makeRotationFromEuler(cs).setPosition(m);for(let v=0;v<2;v++){let E=Ee.hip.set(v===0?yi.hipW:-yi.hipW,-.02,0).applyMatrix4(f),y=this.feet[v].out,S=Ee.ankT.set(y.x,y.y+yi.ankle,y.z),M=Ee.pole.copy(d).addScaledVector(Pu,.1);Up(E,S,yi.thigh,yi.shin,M,Ee.knee,Ee.ankle),tc(c[v===0?Vt.THIGH_L:Vt.THIGH_R],E,Ee.knee,d),tc(c[v===0?Vt.SHIN_L:Vt.SHIN_R],Ee.knee,Ee.ankle,d);let R=an((Ee.ankle.y-yi.ankle-(t.y||0))*1.2,0,.6)*(this.feet[v].swing?1:0);cs.set(R,e,0,"YXZ"),c[v===0?Vt.BOOT_L:Vt.BOOT_R].makeRotationFromEuler(cs).setPosition(Ee.ankle)}let p=Ee.back.set(-d.x,-.6,-d.z);for(let v=0;v<2;v++){let E=v===0?1:-1,y=Ee.sh.set(E*yi.shoulderW,yi.shoulderY,0).applyMatrix4(x),S=Ee.tgt.copy(v===0?a:o).add(Ee.off.set(E*yi.shoulderW,yi.shoulderY,0)).applyMatrix4(x),M=this.handW[v];M>.001&&S.lerp(this.wTarget[v],M);let R=an((S.y-y.y)/.6,0,1)*.07;y.y+=R;let b=Ee.pole2.copy(p).addScaledVector(u,E*.55);Up(y,S,yi.upper,yi.fore,b,Ee.elbow,Ee.hand),tc(c[v===0?Vt.UARM_L:Vt.UARM_R],y,Ee.elbow,d),tc(c[v===0?Vt.FARM_L:Vt.FARM_R],Ee.elbow,Ee.hand,d),this.hands[v].copy(Ee.hand),this.shoulders[v].copy(y)}}};function f_(s,t){let e=null,i=1e9;for(let n of s.players){if(n.team===t.team)continue;let r=Math.hypot(n.pos.x-t.pos.x,n.pos.z-t.pos.z);r<i&&(i=r,e=n)}return e?{q:e,d:i}:null}var nc=1024,sc=1024,rc=class{constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=nc,this.canvas.height=sc,this.ctx=this.canvas.getContext("2d"),this.texture=new Ms(this.canvas),this.texture.anisotropy=4,this.words=new Map,this.reset()}reset(){let t=this.ctx;t.clearRect(0,0,nc,sc),t.fillStyle="#fff",t.textAlign="center",t.textBaseline="middle",t.font='bold 88px "Arial Black", Arial, Helvetica, sans-serif';for(let e=0;e<10;e++)t.fillText(String(e),e*64+32,52);this.words.clear(),this.slot=0,this.texture.needsUpdate=!0}rect(t,e,i,n){return[t/nc,1-(e+n)/sc,(t+i)/nc,1-e/sc]}digit(t){return this.rect(t*64+6,4,52,96)}word(t){if(this.words.has(t))return this.words.get(t);let e=this.slot%2,i=Math.floor(this.slot/2);if(i>13)return this.rect(0,0,1,1);this.slot++;let n=e*512,r=112+i*64,a=this.ctx;a.save(),a.clearRect(n,r,512,64),a.fillStyle="#fff",a.textAlign="center",a.textBaseline="middle";let o=46;for(a.font=`bold ${o}px "Arial Black", Arial, Helvetica, sans-serif`;a.measureText(t).width>496&&o>14;)o-=2,a.font=`bold ${o}px "Arial Black", Arial, Helvetica, sans-serif`;a.fillText(t,n+256,r+33),a.restore();let l=this.rect(n+2,r+2,508,60);return this.words.set(t,l),this.texture.needsUpdate=!0,l}},ac=class{constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=512,this.canvas.height=288,this.ctx=this.canvas.getContext("2d"),this.texture=new Ms(this.canvas),this.key=""}update(t,e,i,n,r,a,o,l=!1,c=""){let h=`${t}|${e}|${i}|${n}|${r}|${a}|${o}|${l}|${c}`;if(h===this.key)return;this.key=h;let d=this.ctx,u=o==="neo";if(d.fillStyle=u?"#111":"#f6f5ef",d.fillRect(0,0,512,288),d.strokeStyle=u?"#ffd23f":"#222",d.lineWidth=u?10:4,d.strokeRect(8,8,496,272),d.textAlign="center",d.textBaseline="middle",d.font='bold 40px "Arial Black", Arial, sans-serif',d.fillStyle=u?"#fff":"#161616",d.fillText(t,120,50),d.fillText(e,392,50),d.font='bold 96px "Arial Black", Arial, sans-serif',d.fillStyle=u?"#ff7a1a":"#161616",d.fillText(String(i[0]),120,140),d.fillText(String(i[1]),392,140),d.font='bold 54px "Arial Black", Arial, sans-serif',d.fillStyle=u?"#3ee0ff":"#333",d.fillText(l?"FINAL":n,256,132),c&&!l&&(d.font='bold 30px "Arial Black", Arial, sans-serif',d.fillStyle=u?"#ffd23f":"#161616",d.fillText(c,256,74)),a===0||a===1){d.fillStyle=u?"#ffd23f":"#161616",d.beginPath();let f=a===0?210:302,g=a===0?-1:1;d.moveTo(f+g*22,200),d.lineTo(f,186),d.lineTo(f,214),d.closePath(),d.fill()}d.font='bold 50px "Arial Black", Arial, sans-serif',d.fillStyle=u?"#ff3d6e":"#7a1010",d.fillText(l?"":r,256,222),d.font="bold 20px Arial, sans-serif",d.fillStyle=u?"#aaa":"#666",d.fillText("SHOT",256,258),this.texture.needsUpdate=!0}},oc=class{constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=128,this.canvas.height=80,this.ctx=this.canvas.getContext("2d"),this.texture=new Ms(this.canvas),this.key=""}update(t,e){let i=`${t}|${e}`;if(i===this.key)return;this.key=i;let n=this.ctx,r=e==="neo";n.fillStyle=r?"#0c0c0c":"#f3f2ec",n.fillRect(0,0,128,80),n.strokeStyle=r?"#000":"#222",n.lineWidth=6,n.strokeRect(3,3,122,74),n.textAlign="center",n.textBaseline="middle",n.font='bold 60px "Arial Black", Arial, sans-serif',n.fillStyle=r?"#ff3d3d":"#8a1a1a",n.fillText(t,64,43),this.texture.needsUpdate=!0}};var lc=new Gt,Fp=new Ge,p_=new k,rE=new k,Bp=new Si,cc=class{constructor(t=20){let e=new Ui(1,1);e.rotateX(-Math.PI/2),this.alpha=new wi(new Float32Array(t),1),e.setAttribute("aAlpha",this.alpha),this.mesh=new pr(e,pp(),t),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2,this.max=t,this.count=0}begin(){this.count=0}add(t,e,i,n){this.count>=this.max||(lc.makeScale(i,1,i).setPosition(t,.018,e),this.mesh.setMatrixAt(this.count,lc),this.alpha.setX(this.count,n),this.count++)}end(){this.mesh.count=this.count,this.mesh.instanceMatrix.needsUpdate=!0,this.alpha.needsUpdate=!0}},hc=class{constructor(){this.group=new kn;let t=new Es(.46,.58,40);t.rotateX(-Math.PI/2),this.ring=new ce(t,Ar(B.MARKER,.85)),this.ring.renderOrder=3,this.ring.visible=!1,this.def=new ce(t,Ar(B.MARKER_DEF,.6)),this.def.renderOrder=3,this.def.visible=!1;let e=new Ss(.16,.34,4);e.rotateX(Math.PI),this.ack=new ce(e,Ar(B.MARKER,1)),this.ack.visible=!1;let i=new Es(.18,.28,24);i.rotateX(-Math.PI/2),this.incoming=new ce(i,Ar(B.MARKER,.6)),this.incoming.visible=!1;let n=new Es(.55,.72,40);n.rotateX(-Math.PI/2),this.spotMat=Ar(B.GOLD,.9),this.spots=Array.from({length:6},()=>{let r=new ce(n,this.spotMat);return r.visible=!1,r.renderOrder=3,this.group.add(r),r}),this.group.add(this.ring,this.def,this.ack,this.incoming)}showRing(t,e,i){this.ring.visible=!0;let n=1+.06*Math.sin(i*8);this.ring.position.set(t,.03,e),this.ring.scale.set(n,1,n)}showDef(t,e){this.def.visible=!0,this.def.position.set(t,.025,e)}showAck(t,e,i,n){this.ack.visible=!0,this.ack.position.set(t,e+.1*Math.sin(n*10),i),this.ack.rotation.y=n*3}showIncoming(t,e){this.incoming.visible=!0,this.incoming.position.set(t,.03,e)}showSpot(t,e,i,n){let r=this.spots[t];if(!r)return;r.visible=!0,r.position.set(e,.022,i);let a=1+.05*Math.sin(n*5+t);r.scale.set(a,1,a)}hideAll(){this.ring.visible=!1,this.def.visible=!1,this.ack.visible=!1,this.incoming.visible=!1;for(let t of this.spots)t.visible=!1}},uc=class{constructor(t=180){let e=new oa(.16,0);this.mat=new _s({color:16777215}),this.mesh=new pr(e,this.mat,t),this.mesh.instanceMatrix.setUsage($h),this.mesh.frustumCulled=!1,this.max=t,this.parts=Array.from({length:t},()=>({alive:!1,p:new k,v:new k,r:new k,w:new k,life:0,s:1})),this.col=new Yt;for(let i=0;i<t;i++)this.mesh.setColorAt(i,this.col.set(1,1,1));this.mesh.count=0,this.active=0}spawn(t,e,i,n,r,a=6,o=Math.random){let l=0;for(let c of this.parts){if(l>=n)break;if(c.alive)continue;c.alive=!0,c.p.set(t+(o()-.5)*2,e+o()*1.5,i+(o()-.5)*2);let h=o()*Math.PI*2,d=4+o()*6;c.v.set(Math.cos(h)*a*o(),d,Math.sin(h)*a*o()),c.r.set(o()*6,o()*6,o()*6),c.w.set((o()-.5)*12,(o()-.5)*12,(o()-.5)*12),c.life=1.6+o()*1.2,c.s=.6+o()*.9,c.role=r[Math.floor(o()*r.length)],l++}}update(t){let e=0;for(let i of this.parts){if(!i.alive)continue;if(i.life-=t,i.life<=0){i.alive=!1;continue}i.v.y-=9.8*t*.6,i.v.multiplyScalar(1-1.2*t),i.p.addScaledVector(i.v,t),i.p.y<.05&&(i.p.y=.05,i.v.set(0,0,0)),i.r.addScaledVector(i.w,t),Bp.set(i.r.x,i.r.y,i.r.z),Fp.setFromEuler(Bp);let n=i.s*Math.min(1,i.life*2);lc.compose(i.p,Fp,p_.set(n,n,n)),this.mesh.setMatrixAt(e,lc),this.mesh.setColorAt(e,Pe[i.role]),e++}this.mesh.count=e,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0),this.active=e}clear(){for(let t of this.parts)t.alive=!1;this.mesh.count=0}};Qt.enabled=!1;var m_=120,dc=(s,t,e)=>s<t?t:s>e?e:s,fc=class{constructor(t,e={}){this.canvas=t,this.quality=e.quality||"high",this.lite=!!e.lite;let i=new Bl({canvas:t,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!!e.preserve});i.outputColorSpace=vs,i.shadowMap.enabled=!0,i.shadowMap.type=Sh,i.shadowMap.autoUpdate=!1,this.renderer=i,this.scene=new ys,this.scene.fog=new ta(15921642,45,160),this.camera=new ri(70,16/9,.05,600),this.camera.rotation.order="YXZ";let n=new ua(16777215,1);n.position.set(-9,40,14),n.castShadow=!0;let r=n.shadow.camera;r.left=-24,r.right=24,r.top=18,r.bottom=-18,r.near=1,r.far=90,n.shadow.mapSize.set(2048,2048),n.shadow.bias=-6e-4,n.shadow.normalBias=.02,this.sun=n,this.scene.add(n,n.target),Ot.uLightDir.value.copy(n.position).normalize(),this.sky=new ce(new Ts(400,24,12),fp()),this.sky.renderOrder=-10,this.sky.frustumCulled=!1,this.scene.add(this.sky),this.atlas=new rc,Ot.uAtlas.value=this.atlas.texture,this.scoreTex=new ac,this.shotTex=new oc,this.screenMat=Mu(this.scoreTex.texture),this.shotMat=Mu(this.shotTex.texture),this.staticMat=Tr({crowd:!0,atlas:!0}),this.staticEdgeMat=Ls({crowd:!0}),this.casterMat=Tr({atlas:!0}),this.casterEdgeMat=Ls({}),this.netMat=Ls({net:!0,role:B.NET,widthScale:.6}),this.nets=new ce(Ep(),this.netMat),this.nets.frustumCulled=!1,this.scene.add(this.nets),this.netState={amp:0,t:9,x:0,y:0,z:0,dx:0,dz:0,count:0},this.blobs=new cc(16),this.markers=new hc,this.burst=new uc(220),this.scene.add(this.blobs.mesh,this.markers.group,this.burst.mesh),this.venueObjs=[],this.batch=null,this.vm=null,this.animators=[],this.match=null,this.style="classic",this.time=0,this.shake=0,this.ballPos=new k,this.ballQ=new Ge,this.ballM=new Gt,this.crowdLevel=0,this.localPlayer=null,this.firstPerson=!0,this.hideHead=!0,this.vmD=.3,this.vmBallUntil=0,this._rv=new Gt,this._t1=new Gt,this._t2=new Gt,this._q=new Ge,this._ax=new k,this._mm=new Gt,this.resize()}setQuality(t){this.quality=t;let e=window.devicePixelRatio||1,i=t==="low"?Math.min(1,e)*.75:Math.min(t==="medium"?1.25:2,e);this.lite&&(i=Math.min(i,1.5)),this.renderer.setPixelRatio(i*(this.resScale||1));let n=t==="high"?2048:1024;this.sun.shadow.mapSize.x!==n&&(this.sun.shadow.mapSize.set(n,n),this.sun.shadow.map&&(this.sun.shadow.map.dispose(),this.sun.shadow.map=null)),this.resize()}setResolutionScale(t){Math.abs(t-(this.resScale||1))<.01||(this.resScale=t,this.setQuality(this.quality))}resize(){let t=this.canvas.clientWidth||window.innerWidth,e=this.canvas.clientHeight||window.innerHeight;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix();let i=this.renderer.getPixelRatio();Ot.uResolution.value.set(t*i,e*i),this.pixelRatio=i,this.applyLineWidth()}applyLineWidth(){let t=Gl[this.style],e=this.pixelRatio||1;Ot.uLineWidth.value=t.lineWidth*e,Ot.uMinWidth.value=Math.min(t.lineWidth,1.1)*e;let i=t.name==="neo";Ot.uTaper.value=i?10:30,Ot.uTaperMin.value=i?.25:.4,Ot.uDetailDist.value=i?30:42,Ot.uCreaseDist.value=i?14:20}setStyle(t){let e=lp(t);this.style=e.name,Ot.uToon.value=e.toon,Ot.uShadowAmt.value=e.shadow,this.renderer.shadowMap.autoUpdate=e.shadow>0,this.renderer.shadowMap.needsUpdate=e.shadow>0,this.scene.fog.color.set(e.fog),this.scene.fog.near=e.fogNear,this.scene.fog.far=e.fogFar,this.blobShowPlayers=e.blobs,this.applyLineWidth(),this.match&&this.updateScoreboard(!0),document.documentElement.dataset.style=e.name}setVenue(t,e={}){let i=`${t}|${e.homeName}|${e.awayName}|${this.quality}`;if(this.venueKey===i)return;this.venueKey=i;for(let c of this.venueObjs)this.scene.remove(c),c.geometry.dispose();this.venueObjs=[];let n=Tp(t,{atlas:this.atlas,quality:this.quality,homeName:e.homeName||"HOME",awayName:e.awayName||"AWAY",seed:e.seed||7,crowd:this.lite?.6:1});this.venue=n;let r=new ce(n.solid,this.staticMat);r.receiveShadow=!0;let a=new ce(n.edges,this.staticEdgeMat);a.frustumCulled=!1;let o=new ce(n.casterSolid,this.casterMat);o.castShadow=!0,o.receiveShadow=!0;let l=new ce(n.casterEdges,this.casterEdgeMat);l.frustumCulled=!1,this.venueObjs.push(r,a,o,l);for(let c of n.screens){let h=new ce(new Ui(c.w,c.h),c.kind==="shot"?this.shotMat:this.screenMat);h.position.set(c.x,c.y,c.z),h.rotation.y=c.ry+Math.PI,h.translateZ(c.kind==="shot"?.01:.06),this.venueObjs.push(h)}for(let c of this.venueObjs)this.scene.add(c);this.renderer.shadowMap.needsUpdate=!0}setMatch(t,e){this.match=t,e&&cp(e.kits,e.human,e.court),this.kits=e&&e.kits?e.kits:null,this.rebuildCharacters(),this.burst.clear(),this.netState.amp=0,this.netState.t=9,this.updateScoreboard(!0)}rebuildCharacters(){this.batch&&(this.scene.remove(this.batch.mesh,this.batch.edges),this.batch.dispose()),this.vm&&(this.vm.dispose(),this.vm=null),this.batch=new Jl(this.match.players,this.atlas,{kits:this.kits,quality:this.quality}),this.scene.add(this.batch.mesh,this.batch.edges),this.animators=this.match.players.map(t=>new ic(t)),this.localPlayer&&(this.vm=new La(this.localPlayer,{quality:this.quality}))}setLocal(t){this.localPlayer=t,this.firstPerson=!!t,this.vm&&(this.vm.dispose(),this.vm=null),t&&this.match&&(this.vm=new La(t,{quality:this.quality}))}updateScoreboard(t){let e=this.match;if(!e)return;t&&(this.scoreTex.key="",this.shotTex.key="");let i=e.phase==="live"||e.phase==="check"||e.phase==="inbound";this.scoreTex.update(e.teams[0].short,e.teams[1].short,e.scoreline,e.rules?e.displayClock:"--:--",e.shotClockOn?e.displayShot:"",i?e.offense:-1,this.style,e.phase==="over",e.full?e.periodLabel:""),this.shotTex.update(e.shotClockOn&&e.phase!=="over"?e.displayShot:"",this.style)}render(t,e,i,n={}){let r=this.match;this.time+=e,Ot.uTime.value=this.time,this.crowdLevel=Math.max(n.crowd??0,this.crowdLevel-e*.35),Ot.uCrowd.value=this.crowdLevel,this.updateCamera(i,e,t);let a=!1;if(r&&this.batch){let l=r.time-(1-t)*.008333333333333333,c=r.ball;this.ballPos.set(c.prevPos.x+(c.pos.x-c.prevPos.x)*t,c.prevPos.y+(c.pos.y-c.prevPos.y)*t,c.prevPos.z+(c.pos.z-c.prevPos.z)*t);let h=this._qa||(this._qa=new Ge),d=this._qb||(this._qb=new Ge);h.set(c.prevQ[0],c.prevQ[1],c.prevQ[2],c.prevQ[3]),d.set(c.q[0],c.q[1],c.q[2],c.q[3]),this.ballQ.slerpQuaternions(h,d,t),this.ballM.compose(this.ballPos,this.ballQ,this._one||(this._one=new k(1,1,1))),this.batch.setMatrix(this.batch.ballRow,this.ballM);let u={match:r,alpha:t,dt:e,now:l,ball:this.ballPos,local:!1};this.blobs.begin();let f=this.firstPerson&&i.mode==="fp"?this.localPlayer:null;for(let x=0;x<this.animators.length;x++){let m=this.animators[x],p=m.p;u.local=p===f;let v=m.update(u),E=x*Lr;for(let y=0;y<Lr;y++)this.batch.setMatrix(E+y,v[y]);if(u.local&&this.hideHead){for(let y of[Vt.HEAD,Vt.TORSO,Vt.UARM_L,Vt.UARM_R,Vt.FARM_L,Vt.FARM_R])this.batch.hide(E+y);a=this.updateViewModel(m,v,i,e,l)}this.blobShowPlayers&&this.blobs.add(m.root.x,m.root.z,.95,.2)}a&&this.vmBall&&this.batch.hide(this.batch.ballRow);let g=Math.max(0,this.ballPos.y-Et);this.blobs.add(this.ballPos.x,this.ballPos.z,.36+g*.1,.42/(1+g*.8)),this.blobs.end(),this.batch.commit(),this.updateNets(e),this.updateScoreboard(!1)}if(this.burst.update(e),this.noDraw)return;let o=this.renderer;o.render(this.scene,this.camera),a&&this.vm&&(o.autoClear=!1,o.clearDepth(),o.render(this.vm.scene,this.camera),o.autoClear=!0)}updateViewModel(t,e,i,n,r){let a=this.vm,o=t.p,l=this.match;if(!a)return!1;let c=l.ball,h=o.action,d=c.owner===o&&(c.state==="held"||c.state==="dribble"),u=dc((i.pitch+.85)/.6,0,1),f;h&&h.type==="shot"&&!h.released&&this.ballPos.y>o.pos.y+1.6?f=h.kind==="dunk"?0:.12:h&&h.type==="shot"&&h.released?f=h.t-h.rt<.5?.1:.6*u:h&&h.type==="pass"&&h.released?f=0:d?f=(c.state==="dribble"?.82:.78)*u:o.handsUp||o.airborne||h&&h.type==="jump"?f=-.2:h&&h.type==="steal"?f=.55*u:f=.62*u;let g=!d&&c.state==="free"&&c.lastTouch&&c.lastTouch.player===o&&l.time-c.lastTouch.t<.4&&(c.shot||c.pass);g&&(f=0,this.vmBallUntil=r+.05);let x=g?14:9;this.vmD+=(f-this.vmD)*(1-Math.exp(-n*x)),this.vmBall=d||g&&Math.abs(this.vmD)>.01;let m=this.camera.position;this._ax.setFromMatrixColumn(this.camera.matrixWorld,0).normalize(),this._q.setFromAxisAngle(this._ax,this.vmD),this._t1.makeTranslation(-m.x,-m.y,-m.z),this._t2.makeTranslation(m.x,m.y,m.z),this._rv.makeRotationFromQuaternion(this._q).premultiply(this._t2).multiply(this._t1),a.hide(Vi.UARM_L),a.hide(Vi.UARM_R);for(let[p,v]of[[Vi.FARM_L,Vt.FARM_L],[Vi.FARM_R,Vt.FARM_R]])a.setMatrix(p,this._mm.multiplyMatrices(this._rv,e[v]));return this.vmBall?a.setMatrix(Vi.BALL,this._mm.multiplyMatrices(this._rv,this.ballM)):a.hide(Vi.BALL),a.commit(),!0}updateNets(t){let e=this.match.ball.net,i=this.netState;if(e.count!==i.count){i.count=e.count,i.t=0,i.x=e.x,i.y=e.y,i.z=e.z,i.amp=Math.max(i.amp*.9,e.amp);let h=this.match.ball,d=Math.hypot(h.vel.x,h.vel.z)+.6;i.dx=h.vel.x/d*.05+(i.x>=0?.012:-.012),i.dz=h.vel.z/d*.05}else i.t+=t;let n=i.amp*Math.exp(-i.t*9),r=Math.sin(i.t*13)*Math.exp(-i.t*2.6)*Math.min(1,i.amp*1.6);i.t>4&&(i.amp=0);let[a,o,l,c]=i.x>=0?[Ot.uNetA,Ot.uNetDA,Ot.uNetB,Ot.uNetDB]:[Ot.uNetB,Ot.uNetDB,Ot.uNetA,Ot.uNetDA];a.value.set(i.x,i.y,i.z,n),o.value.set(i.dx*r,0,i.dz*r),l.value.set(0,-9,0,0),c.value.set(0,0,0)}updateCamera(t,e,i){let n=this.camera;if(t.fov){let r,a=Math.min(t.fov,m_);n.aspect<1?r=dc(Math.min(a,100),35,100):r=dc(2*Math.atan(Math.tan(a*Math.PI/360)/n.aspect)*180/Math.PI,35,100),Math.abs(r-n.fov)>.01&&(n.fov=r,n.updateProjectionMatrix())}if(t.mode==="fp"&&this.localPlayer&&this.match){let r=this.localPlayer,a=r.prevPos.x+(r.pos.x-r.prevPos.x)*i,o=r.prevPos.y+(r.pos.y-r.prevPos.y)*i,l=r.prevPos.z+(r.pos.z-r.prevPos.z)*i,c=(t.eye??1.9)+o;if(t.bob){let h=Math.min(1,r.speed/7);c+=Math.sin((r.prevGait+(r.gait-r.prevGait)*i)*Math.PI*4)*.014*h*t.bob}if(n.position.set(a+Math.sin(t.yaw)*.02,c,l+Math.cos(t.yaw)*.02),t.shake&&this.shake>0){let h=this.shake*t.shake;n.position.x+=(Math.random()-.5)*.02*h,n.position.y+=(Math.random()-.5)*.02*h}this.shake=Math.max(0,this.shake-e*4),n.rotation.set(t.pitch,t.yaw+Math.PI,t.roll||0,"YXZ")}else if(t.mode==="orbit"){let r=t.angle;n.position.set(Math.cos(r)*t.radius+(t.cx||0),t.height,Math.sin(r)*t.radius),n.lookAt((this._look||(this._look=new k)).set(t.cx||0,1.6,0))}else if(t.pos){let r=t.pos,a=t.look;n.position.set(r.x??r[0],r.y??r[1],r.z??r[2]),a?n.lookAt(a.x??a[0],a.y??a[1],a.z??a[2]):n.rotation.set(t.pitch||0,(t.yaw||0)+Math.PI,0,"YXZ")}n.updateMatrixWorld()}celebrate(t,e,i,n,r=1){let a=this.style==="neo"?[n===0?B.JERSEY_0:B.JERSEY_1,B.GOLD,B.MARKER,B.LINES,B.STAND_C]:[B.INK,B.LINES,n===0?B.JERSEY_0:B.JERSEY_1];this.burst.spawn(t,e,i,Math.round(60*r),a,5)}projectToScreen(t,e){let i=this.camera;if(e.copy(t).applyMatrix4(i.matrixWorldInverse),e.z>-.05){let n=e.x>=0?1:-1,r=dc(e.y/(Math.hypot(e.x,e.z)+.001),-.6,.6);return e.set(n*50,r*50,0)}return e.applyMatrix4(i.projectionMatrix)}renderPreview(t,e,i,n){let r=this.style,a=new ai(e,i,{samples:4}),o=Ot.uResolution.value.clone(),l=this.camera.aspect;this.setStyle(t),Ot.uResolution.value.set(e,i),Ot.uLineWidth.value=Gl[t].lineWidth,this.camera.aspect=e/i,this.camera.updateProjectionMatrix();let c=this.camera.position.clone(),h=this.camera.quaternion.clone();n&&(this.camera.position.set(n.pos[0],n.pos[1],n.pos[2]),this.camera.lookAt(new k(n.look[0],n.look[1],n.look[2])),this.camera.updateMatrixWorld()),this.renderer.shadowMap.needsUpdate=!0,this.renderer.setRenderTarget(a),this.renderer.render(this.scene,this.camera),!n&&this.vm&&this.firstPerson&&(this.renderer.autoClear=!1,this.renderer.clearDepth(),this.renderer.render(this.vm.scene,this.camera),this.renderer.autoClear=!0);let d=new Uint8Array(e*i*4);this.renderer.readRenderTargetPixels(a,0,0,e,i,d),this.renderer.setRenderTarget(null),a.dispose();let u=document.createElement("canvas");u.width=e,u.height=i;let f=u.getContext("2d"),g=f.createImageData(e,i);for(let x=0;x<i;x++)g.data.set(d.subarray((i-1-x)*e*4,(i-x)*e*4),x*e*4);return f.putImageData(g,0,0),this.setStyle(r),this.camera.position.copy(c),this.camera.quaternion.copy(h),Ot.uResolution.value.copy(o),this.applyLineWidth(),this.camera.aspect=l,this.camera.updateProjectionMatrix(),u.toDataURL("image/png")}stats(){let t=this.renderer.info;return{calls:t.render.calls,tris:t.render.triangles,people:this.venue?this.venue.people:0}}};function on(s){let t=s>>>0;return()=>(t=t*1664525+1013904223>>>0,t/2147483648-1)}function mc(s,t){let e=Math.exp(-2*Math.PI*t/44100),i=0;for(let n=0;n<s.length;n++)i=(1-e)*s[n]+e*i,s[n]=i}function Yp(s,t){let e=Math.exp(-2*Math.PI*t/44100),i=0,n=0;for(let r=0;r<s.length;r++){let a=s[r];i=e*(i+a-n),n=a,s[r]=i}}function Us(s,t,e){let i=2*Math.PI*t/44100,n=Math.sin(i)/(2*e),r=Math.cos(i),a=n,o=-n,l=1+n,c=-2*r,h=1-n,d=0,u=0,f=0,g=0;for(let x=0;x<s.length;x++){let m=s[x],p=(a*m+o*u-c*f-h*g)/l;u=d,d=m,g=f,f=p,s[x]=p}}function Qe(s,t=.9){let e=0;for(let i=0;i<s.length;i++)e=Math.max(e,Math.abs(s[i]));if(e>0)for(let i=0;i<s.length;i++)s[i]*=t/e;return s}function zp(s){let t=Math.floor(44100*s.reduce((n,[r,a])=>n+r+a,0)),e=new Float32Array(t),i=0;for(let[n,r]of s){let a=Math.floor(44100*n),o=0;for(let l=0;l<a;l++){let c=l/44100,h=2950+90*Math.sin(2*Math.PI*28*c)+40*Math.sin(2*Math.PI*7*c);o+=2*Math.PI*h/44100;let d=Math.min(1,c/.02)*Math.min(1,(n-c)/.04);e[i+l]=(Math.sin(o)*.7+Math.sin(o*2)*.12)*d}i+=a+Math.floor(44100*r)}return Qe(e,.55)}function g_(s,t=6){let e=Math.floor(44100*t),i=new Float32Array(e),n=on(s);for(let o=0;o<e;o++)i[o]=n();let r=new Float32Array(e);for(let[o,l,c]of[[420,1.2,1],[900,1.5,.8],[1800,2,.4],[260,.9,.7]]){let h=i.slice();Us(h,o,l);let d=n()*6;for(let u=0;u<e;u++)r[u]+=h[u]*c*(.75+.25*Math.sin(2*Math.PI*(u/e)*3+d))}let a=Math.floor(44100*.5);for(let o=0;o<a;o++){let l=o/a;r[o]=r[o]*l+r[e-a+o]*(1-l)}return Qe(r.subarray(0,e-a),.6)}function x_(s,t=3.2){let e=Math.floor(44100*t),i=new Float32Array(e),n=on(s);for(let a=0;a<e;a++)i[a]=n();let r=new Float32Array(e);for(let[a,o,l]of[[700,1.4,1],[1300,1.8,.7],[2500,2.2,.35],[380,1,.6]]){let c=i.slice();Us(c,a,o);for(let h=0;h<e;h++)r[h]+=c[h]*l}for(let a=0;a<e;a++){let o=a/44100;r[a]*=Math.min(1,o/.25)*Math.exp(-Math.max(0,o-1.2)*1.3)}return Qe(r,.85)}function Hp(s){let t=Math.floor(70560),e=new Float32Array(t),i=on(s);for(let r=0;r<t;r++)e[r]=i();let n=new Float32Array(t);for(let r=0;r<3;r++){let a=e.slice();Us(a,380+r*180,3);for(let o=0;o<t;o++)n[o]+=a[o]}for(let r=0;r<t;r++){let a=r/44100;n[r]*=Math.min(1,a/.15)*Math.exp(-a*1.6)*(1-.3*a/1.6)}return Qe(n,.7)}function Vp(s,t,e){let i=Math.floor(44100*t),n=new Float32Array(i);for(let r=0;r<i;r++){let a=r/44100;n[r]=Math.sin(2*Math.PI*s*a)*Math.exp(-a*30)*Math.min(1,a/.003)}return Qe(n,.5)}function Nr(s,t){let e=Math.floor(44100*t),i=new Float32Array(e);for(let[n,r,a,o,l]of s){let c=0,h=Math.floor(a*44100),d=Math.min(e,Math.floor((a+o)*44100));for(let u=h;u<d;u++){let f=(u-h)/44100,g=f/o;c+=(n+(r-n)*g)/44100;let x=Math.min(1,f/.004)*Math.exp(-g*4);i[u]+=(Math.sin(2*Math.PI*c)+.25*Math.sin(4*Math.PI*c))*x*l}}return Qe(i,.5)}function v_(s){let t=Math.floor(44100*s),e=new Float32Array(t),i=0,n=12345;for(let r=0;r<t;r++){n=n*1664525+1013904223>>>0;let a=r/t,o=.04+.5*Math.sin(Math.PI*a)**2;i+=(n/4294967296*2-1-i)*o,e[r]=i*Math.sin(Math.PI*a)}return Qe(e,.35)}function y_(s){let t=Math.floor(12348.000000000002),e=new Float32Array(t),i=0;for(let r=0;r<t;r++){let o=210-60*(r/44100);i+=o/44100,e[r]=i%1*2-1}let n=new Float32Array(t);for(let[r,a,o]of[[650,5,1],[1700,7,.6],[2600,8,.3]]){let l=e.slice();Us(l,r,a);for(let c=0;c<t;c++)n[c]+=l[c]*o}for(let r=0;r<t;r++){let a=r/44100;n[r]*=Math.min(1,a/.02)*Math.exp(-a*7)}return Qe(n,.6)}function Gp(s){let t=Math.floor(9702),e=new Float32Array(t),i=on(s),n=0,r=0;for(let a=0;a<t;a++){let o=a/44100,l=95+80*Math.exp(-o*60);n+=2*Math.PI*l/44100,r+=2*Math.PI*530/44100,e[a]=Math.sin(n)*Math.exp(-o*22)+.22*Math.sin(r)*Math.exp(-o*30)+i()*.35*Math.exp(-o*180)}return mc(e,4200),Qe(e,.95)}function Lu(s,t,e,i){let n=Math.floor(44100*i),r=new Float32Array(n),a=on(s),o=0;for(let l=0;l<n;l++){let c=l/44100,h=c/i,d=t+(e-t)*h+120*Math.sin(2*Math.PI*55*c);o+=2*Math.PI*d/44100;let u=Math.min(1,c/.012)*Math.pow(1-h,1.4);r[l]=(Math.sin(o)+.4*Math.sin(o*2.01)+.2*Math.sin(o*3.02))*u+a()*.05*u}return Yp(r,900),Qe(r,.5)}function b_(s){let t=Math.floor(30869.999999999996),e=new Float32Array(t),i=on(s),n=[[612,1],[1530,.7],[2410,.45],[3720,.3],[5100,.15]];for(let r=0;r<t;r++){let a=r/44100,o=0;for(let[l,c]of n)o+=Math.sin(2*Math.PI*l*a)*c*Math.exp(-a*(6+l/600));e[r]=o+i()*.5*Math.exp(-a*160)}return Qe(e,.75)}function Wp(s){let t=Math.floor(17640),e=new Float32Array(t),i=on(s),n=0;for(let r=0;r<t;r++){let a=r/44100;n+=2*Math.PI*(130+60*Math.exp(-a*40))/44100,e[r]=Math.sin(n)*Math.exp(-a*16)+i()*.45*Math.exp(-a*26)*(.6+.4*Math.sin(2*Math.PI*38*a))}return mc(e,2600),Qe(e,.8)}function __(s){let t=Math.floor(18522),e=new Float32Array(t),i=on(s);for(let n=0;n<t;n++){let r=n/44100;e[n]=i()*Math.min(1,r/.03)*Math.exp(-r*7)}return Us(e,2600,.9),Yp(e,700),Qe(e,.7)}function $p(s,t=1700){let e=Math.floor(3969),i=new Float32Array(e),n=on(s);for(let r=0;r<e;r++){let a=r/44100;i[r]=n()*Math.exp(-a*60)+Math.sin(2*Math.PI*240*a)*.4*Math.exp(-a*50)}return Us(i,t,.8),Qe(i,.8)}function M_(s){let t=Math.floor(44100*s),e=new Float32Array(t);for(let i=0;i<t;i++){let n=i/44100,r=Math.min(1,n/.02)*Math.min(1,(s-n)/.05),a=0;for(let o of[220,277,330])a+=n*o%1*2-1;e[i]=a*r*.33}return mc(e,2200),Qe(e,.6)}function Xp(s,t){let e=Math.floor(44100*t),i=new Float32Array(e),n=on(s);for(let r=0;r<e;r++){let a=r/44100,o=a/t;i[r]=n()*Math.sin(Math.PI*o)**2}return Us(i,900,.7),Qe(i,.35)}function qp(s){let t=Math.floor(2646),e=new Float32Array(t),i=on(s);for(let n=0;n<t;n++){let r=n/44100;e[n]=(Math.sin(2*Math.PI*85*r)*.8+i()*.3)*Math.exp(-r*55)}return mc(e,900),Qe(e,.5)}var pc=class{constructor(){this.ctx=null,this.buffers={},this.vol={master:.8,sfx:.9,crowd:.6},this.ready=!1,this.crowdLevel=.3,this.muted=!1}init(){if(this.ctx)return;let t=window.AudioContext||window.webkitAudioContext;if(!t)return;try{this.ctx=new t({latencyHint:"interactive"})}catch{return}let e=this.ctx;this.master=e.createGain(),this.sfx=e.createGain(),this.crowd=e.createGain(),this.sfx.connect(this.master),this.crowd.connect(this.master),this.master.connect(e.destination);let i={bounce:Gp(1),bounce2:Gp(21),squeak1:Lu(2,2300,3100,.14),squeak2:Lu(3,3300,2500,.18),squeak3:Lu(4,2700,3600,.1),step1:qp(5),step2:qp(25),rim:b_(6),board:Wp(7),net:__(8),catch:$p(9,1500),steal:$p(10,2300),block:Wp(31),release:Xp(11,.25),pass:Xp(12,.18),whistle:zp([[.32,0]]),whistleLong:zp([[.3,.12],[.3,.12],[.75,0]]),buzzer:M_(1.1),crowd:g_(13),cheer:x_(14),groan:Hp(15),ooh:Hp(16),ui:Vp(1400,.06,17),ack:Vp(1900,.09,18),shout:y_(19),uiHover:Nr([[2600,2400,0,.025,.5]],.03),uiClick:Nr([[900,520,0,.07,1]],.08),uiConfirm:Nr([[660,660,0,.09,.9],[990,990,.07,.16,1]],.25),uiError:Nr([[300,280,0,.1,1],[220,200,.1,.16,1]],.28),uiSwoosh:v_(.22),uiReward:Nr([[784,784,0,.1,.8],[988,988,.08,.1,.8],[1319,1319,.16,.3,1]],.48),perfect:Nr([[1047,1047,0,.08,.7],[1568,1568,.06,.18,.8]],.26)};for(let[n,r]of Object.entries(i)){let a=e.createBuffer(1,r.length,44100);a.copyToChannel(r,0),this.buffers[n]=a}this.applyVolumes(),this.ready=!0}resume(){this.ctx&&this.ctx.state!=="running"&&!this.muted&&this.ctx.resume().catch(()=>{})}suspend(){this.ctx&&this.ctx.state==="running"&&this.ctx.suspend().catch(()=>{})}setMuted(t){this.muted=t,t?this.suspend():this.resume()}setVolumes(t){Object.assign(this.vol,t),this.applyVolumes()}setPlatformMute(t){this.platformMute=!!t,this.applyVolumes()}applyVolumes(){this.ctx&&(this.master.gain.value=this.platformMute?0:this.vol.master,this.sfx.gain.value=this.vol.sfx,this.crowd.gain.value=this.vol.crowd)}play(t,e={}){if(!this.ready||this.ctx.state!=="running")return;let i=this.buffers[t];if(!i)return;let n=this.ctx,r=n.createBufferSource();r.buffer=i,e.rate&&(r.playbackRate.value=e.rate);let a=n.createGain();a.gain.value=e.gain??1;let o=a;if(e.pan&&n.createStereoPanner){let l=n.createStereoPanner();l.pan.value=Math.max(-1,Math.min(1,e.pan)),a.connect(l),o=l}return r.connect(a),o.connect(e.group==="crowd"?this.crowd:this.sfx),r.start(),r}startCrowd(t=.4){if(!this.ready)return;this.stopCrowd();let e=this.ctx;this.crowdSrc=e.createBufferSource(),this.crowdSrc.buffer=this.buffers.crowd,this.crowdSrc.loop=!0,this.crowdGain=e.createGain(),this.crowdGain.gain.value=0,this.crowdSrc.connect(this.crowdGain).connect(this.crowd),this.crowdSrc.start(),this.baseCrowd=t,this.setExcitement(0)}stopCrowd(){if(this.crowdSrc){try{this.crowdSrc.stop()}catch{}this.crowdSrc.disconnect(),this.crowdSrc=null}}setExcitement(t){if(!this.crowdGain)return;let e=this.baseCrowd*(.45+.9*Math.min(1,t));this.crowdGain.gain.setTargetAtTime(e,this.ctx.currentTime,.4)}};var Kp=[["W A S D","Move (relative to where you look)"],["Mouse","Look and aim"],["Shift","Sprint (a faster, lower dribble)"],["Left mouse","Shoot: hold to fill the meter, release in the green. On defence: hands up"],["Right mouse","Pass to the ringed teammate. Without the ball: call for it / defensive stance"],["Space","Jump to block or rebound (with the ball: pump fake)"],["E","Steal (poke at the ball; time it when the dribble is low)"],["Q","Crossover (switch the dribble hand with a quick burst)"],["C","Defensive stance (hold): quicker side to side"],["P","Pause"],["Tab","Free / capture the mouse cursor"]],Zp=[["Left thumb","Drag anywhere on the left side to move; push to the edge of the stick to sprint"],["Right thumb","Drag anywhere on the right side to look and aim"],["SHOOT","Hold to fill the meter, release in the green"],["PASS","Pass to the ringed teammate (CALL without the ball)"],["CROSS / FAKE","Crossover dribble / pump fake"],["STEAL \xB7 BLOCK \xB7 STANCE","Replace the attack buttons while the other team has the ball"],["II","Pause"]],gc=class{constructor(t){this.el=t,this.keys=new Set,this.lookX=0,this.lookY=0,this.buttons=0,this.locked=!1,this.lockSupported="requestPointerLock"in t,this.dragMode=!this.lockSupported,this.active=!1,this.listeners=[],this.onPause=null,this.onLockLost=null,this.onLockError=null,this.sensitivity=1,this.invertY=!1,this.lastLockExit=0,this.touchMode=!1,this.touch={active:!1,f:0,r:0,sprint:!1,stance:!1},this.lastTouchAt=-1e9,this.handlers={keydown:e=>this.keydown(e),keyup:e=>this.keyup(e),mousemove:e=>this.mousemove(e),mousedown:e=>this.mousedown(e),mouseup:e=>this.mouseup(e),contextmenu:e=>{this.active&&e.preventDefault()},plc:()=>this.lockChange(),ple:()=>{this.locked=!1,this.onLockError&&this.onLockError()},blur:()=>{this.keys.clear(),this.releaseAll()},touchSeen:e=>{(e.pointerType==="touch"||e.pointerType==="pen")&&(this.lastTouchAt=performance.now())}},window.addEventListener("pointerdown",this.handlers.touchSeen,!0),window.addEventListener("pointerup",this.handlers.touchSeen,!0),window.addEventListener("keydown",this.handlers.keydown),window.addEventListener("keyup",this.handlers.keyup),window.addEventListener("mousemove",this.handlers.mousemove),window.addEventListener("mousedown",this.handlers.mousedown),window.addEventListener("mouseup",this.handlers.mouseup),window.addEventListener("contextmenu",this.handlers.contextmenu),document.addEventListener("pointerlockchange",this.handlers.plc),document.addEventListener("pointerlockerror",this.handlers.ple),window.addEventListener("blur",this.handlers.blur)}on(t){return this.listeners.push(t),()=>{this.listeners=this.listeners.filter(e=>e!==t)}}emit(t,e){for(let i of this.listeners)i(t,e)}requestLock(){if(!this.lockSupported)return this.dragMode=!0,!1;try{let t=this.el.requestPointerLock();t&&t.catch&&t.catch(()=>{this.onLockError&&this.onLockError()})}catch{return this.dragMode=!0,!1}return!0}exitLock(){document.pointerLockElement&&document.exitPointerLock()}lockChange(){let t=this.locked;this.locked=document.pointerLockElement===this.el,this.locked&&(this.dragMode=!1,!t&&this.onLockGained&&this.onLockGained()),t&&!this.locked&&(this.lastLockExit=performance.now(),this.releaseAll(),this.active&&this.onLockLost&&this.onLockLost())}releaseAll(){this.buttons&1&&this.emit("shoot",!1),this.buttons&2&&this.emit("pass",!1),this.buttons=0,this.touch.active=!1,this.touch.f=0,this.touch.r=0,this.touch.sprint=!1,this.touch.stance=!1,this.onReleaseAll&&this.onReleaseAll()}fromTouch(t){return t.sourceCapabilities&&t.sourceCapabilities.firesTouchEvents||performance.now()-this.lastTouchAt<900}touchAction(t,e){if(this.active){if(t==="shoot"&&(e?this.buttons|=1:this.buttons&=-2),t==="pass"&&(e?this.buttons|=2:this.buttons&=-3),t==="stance"){this.touch.stance=e;return}!e&&(t==="steal"||t==="cross"||t==="jump")||this.emit(t,e)}}touchLook(t,e){this.active&&(this.lookX+=t,this.lookY+=e)}keydown(t){let e=t.code;if(this.active){if(e==="Tab"){t.preventDefault(),!t.repeat&&this.onToggleLock&&this.onToggleLock();return}["Space","ShiftLeft","ShiftRight","KeyW","KeyA","KeyS","KeyD","KeyQ","KeyE","KeyC","ControlLeft","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e)&&t.preventDefault(),!t.repeat&&(this.keys.add(e),e==="Space"?this.emit("jump",!0):e==="KeyE"?this.emit("steal",!0):e==="KeyQ"?this.emit("cross",!0):e==="KeyP"?this.onPause&&this.onPause():(e==="Enter"||e==="NumpadEnter")&&this.onSkip&&this.onSkip())}}keyup(t){this.keys.delete(t.code)}mousedown(t){!this.active||this.fromTouch(t)||!this.locked&&!this.dragMode||t.target!==this.el&&!this.locked||(t.button===0&&(this.buttons|=1,this.emit("shoot",!0)),t.button===2&&(this.buttons|=2,this.emit("pass",!0),t.preventDefault()))}mouseup(t){this.fromTouch(t)||(t.button===0&&this.buttons&1&&(this.buttons&=-2,this.emit("shoot",!1)),t.button===2&&this.buttons&2&&(this.buttons&=-3,this.emit("pass",!1)))}mousemove(t){!this.active||this.fromTouch(t)||(this.locked||this.dragMode&&t.buttons&7)&&(this.lookX+=t.movementX||0,this.lookY+=t.movementY||0)}axes(){let t=this.keys,e=(t.has("KeyW")?1:0)-(t.has("KeyS")?1:0),i=(t.has("KeyD")?1:0)-(t.has("KeyA")?1:0),n=t.has("ShiftLeft")||t.has("ShiftRight"),r=t.has("KeyC")||t.has("ControlLeft")||this.touch.stance,a=this.touch;return a.active&&(e=Math.max(-1,Math.min(1,e+a.f)),i=Math.max(-1,Math.min(1,i+a.r)),n=n||a.sprint),{f:e,r:i,sprint:n,stance:r}}consumeLook(t,e){let i=.0022*this.sensitivity;t.yaw-=this.lookX*i,t.pitch-=this.lookY*i*(this.invertY?-1:1);let n=this.keys,r=2.2*e*this.sensitivity;n.has("ArrowLeft")&&(t.yaw+=r),n.has("ArrowRight")&&(t.yaw-=r),n.has("ArrowUp")&&(t.pitch+=r*.6*(this.invertY?-1:1)),n.has("ArrowDown")&&(t.pitch-=r*.6*(this.invertY?-1:1)),this.lookX=0,this.lookY=0,t.pitch=Math.max(-1.3,Math.min(1.15,t.pitch))}get held(){return{lmb:!!(this.buttons&1),rmb:!!(this.buttons&2)}}};var S_=1.5/(Et*Et),ka=F.R+F.TUBE,Na=new Me,Fs=new Me,ku=new Me,Bs=new Me,Nu=new Me;function w_(s){let t=_t((F.Y-s)/F.NET_LEN,0,1);return F.R+(F.NET_R1-F.R)*t}function Jp(s,t,e){return e.set(s.y*t.z-s.z*t.y,s.z*t.x-s.x*t.z,s.x*t.y-s.y*t.x)}var Da=class{constructor(){this.pos=new Me(0,Et,0),this.prevPos=new Me(0,Et,0),this.vel=new Me,this.w=new Me,this.q=[0,0,0,1],this.prevQ=[0,0,0,1],this.state="dead",this.owner=null,this.shot=null,this.pass=null,this.lastTouch=null,this.ignore=null,this.ignoreUntil=0,this.net={count:0,x:0,y:0,z:0,vy:0,amp:0},this.scoredAt=-10,this.cb=null,this.quiet=!1,this.restT=0}copyFrom(t){return this.pos.copy(t.pos),this.vel.copy(t.vel),this.w.copy(t.w),this.state=t.state,this.scoredAt=t.scoredAt,this}setKinematic(t,e,i,n){n>0&&this.vel.set((t-this.pos.x)/n,(e-this.pos.y)/n,(i-this.pos.z)/n),this.pos.set(t,e,i)}release(t,e,i,n=0,r=0,a=0){this.state="free",this.owner=null,this.vel.set(t,e,i),this.w.set(n,r,a),this.restT=0}place(t,e,i){this.pos.set(t,e,i),this.prevPos.set(t,e,i),this.vel.set(0,0,0),this.w.set(0,0,0)}get speed(){return this.vel.len()}beginStep(){this.prevPos.copy(this.pos),this.prevQ[0]=this.q[0],this.prevQ[1]=this.q[1],this.prevQ[2]=this.q[2],this.prevQ[3]=this.q[3]}step(t,e,i){if(this.state==="free"){let n=this.vel.len(),r=_t(Math.ceil(n*t/.025),1,10),a=t/r;for(let o=0;o<r;o++)this.substep(a,e,i)}this.spin(t)}substep(t,e,i){let n=this.vel,r=this.pos,a=n.len(),o=On.AIR_DRAG*a;n.x-=n.x*o*t,n.z-=n.z*o*t,n.y-=(De+n.y*o)*t,this.w.scale(Math.exp(-.15*t));let l=r.y;r.addScaled(n,t);let c=r.x>=0?1:-1,h=c*F.X;if(l>=F.Y&&r.y<F.Y&&n.y<0){let d=(l-F.Y)/(l-r.y||1),u=this.prevX(d,t),f=this.prevZ(d,t);Math.hypot(u-h,f-F.Z)<F.R-.01&&e-this.scoredAt>1&&(this.scoredAt=e,this.scoredSide=c,this.cb&&!this.quiet&&this.cb.score(this,c))}this.collideFloor(t),this.collideRim(h),this.collideBoard(c),this.collideNet(t,h),i&&!this.quiet&&this.collidePlayers(i,e)}prevX(t,e){return this.pos.x-this.vel.x*e*(1-t)}prevZ(t,e){return this.pos.z-this.vel.z*e*(1-t)}contact(t,e,i,n,r){let a=this.vel;Na.set(t,e,i);let o=a.dot(Na);if(o>=0)return 0;ku.set(-t*Et,-e*Et,-i*Et),Jp(this.w,ku,Bs).add(a);let l=Bs.dot(Na);Bs.addScaled(Na,-l);let c=-(1+n)*o;a.addScaled(Na,c);let h=Bs.len();if(h>1e-6){let u=Math.min(.4*h,On.FRICTION*c);Nu.copy(Bs).scale(-u/h),a.add(Nu),Jp(ku,Nu,Bs),this.w.addScaled(Bs,S_)}let d=-o;return this.cb&&!this.quiet&&d>.25&&this.cb.hit(this,r,d),d}collideFloor(t){let e=this.pos,i=this.vel;if(!(e.y>=Et))if(e.y=Et,i.y<-.35)this.contact(0,1,0,On.FLOOR_E,"floor");else{i.y=0;let n=Math.hypot(i.x,i.z);if(n>1e-4){let r=Math.max(0,n-.35*t)/n;i.x*=r,i.z*=r}this.w.set(i.z/Et,this.w.y*.98,-i.x/Et)}}collideRim(t=F.X){let e=this.pos,i=e.x-t,n=e.z-F.Z;if(Math.abs(e.y-F.Y)>Et+.05)return;let r=Math.hypot(i,n);if(r>ka+Et+.05||r<ka-Et-.05)return;let a=r>1e-6?i/r:1,o=r>1e-6?n/r:0;Fs.set(t+a*ka,F.Y,F.Z+o*ka);let l=e.x-Fs.x,c=e.y-Fs.y,h=e.z-Fs.z,d=Math.hypot(l,c,h),u=Et+F.TUBE;d>=u||d<1e-6||(e.x=Fs.x+l/d*u,e.y=Fs.y+c/d*u,e.z=Fs.z+h/d*u,this.contact(l/d,c/d,h/d,On.RIM_E,"rim"))}collideBox(t,e,i,n,r,a,o,l,c=1){let h=this.pos;if(c<0){let v=-e;e=-t,t=v}let d=_t(h.x,t,e),u=_t(h.y,i,n),f=_t(h.z,r,a),g=h.x-d,x=h.y-u,m=h.z-f,p=Math.hypot(g,x,m);if(!(p>=Et)){if(p<1e-6){h.x=c>0?t-Et:e+Et,this.contact(-c,0,0,o,l);return}h.x=d+g/p*Et,h.y=u+x/p*Et,h.z=f+m/p*Et,this.contact(g/p,x/p,m/p,o,l)}}collideBoard(t=1){let e=this.pos;t*e.x<F.BOARD_X-.3||e.y<F.BOARD_Y0-.3||(this.collideBox(F.BOARD_X,F.BOARD_X+F.BOARD_T,F.BOARD_Y0,F.BOARD_Y0+F.BOARD_H,-F.BOARD_W/2,F.BOARD_W/2,On.BOARD_E,"board",t),this.collideBox(F.X+ka+.005,F.BOARD_X,F.Y-.05,F.Y+.005,-.07,.07,.4,"rim",t),this.collideBox(F.BOARD_X+F.BOARD_T,F.BOARD_X+1.4,F.BOARD_Y0+.2,F.BOARD_Y0+.55,-.12,.12,.3,"board",t))}collideNet(t,e=F.X){let i=this.pos,n=this.vel;if(i.y>F.Y-.02||i.y<F.Y-F.NET_LEN-.05)return;let r=i.x-e,a=i.z-F.Z,o=Math.hypot(r,a),l=w_(i.y);if(o>l+Et*.5)return;let c=o+Et*.55-l;if(c>0&&o>1e-4){let u=Math.min(1,c*60*t);i.x-=r/o*c*u,i.z-=a/o*c*u;let f=(n.x*r+n.z*a)/o;f>0&&(n.x-=r/o*f*.85,n.z-=a/o*f*.85)}let h=Math.exp(-5.5*t);n.x*=h,n.z*=h,n.y<-2.2&&(n.y*=Math.exp(-3.2*t));let d=this.net;d.x=i.x,d.y=i.y,d.z=i.z,d.vy=n.y,d.amp=Math.max(d.amp,Math.min(1,.25+Math.abs(n.y)*.12+Math.max(0,c)*6)),d.count++}collidePlayers(t,e){let i=this.pos;for(let n=0;n<t.length;n++){let r=t[n];if(r===this.ignore&&e<this.ignoreUntil)continue;let a=i.x-r.pos.x,o=i.z-r.pos.z,l=.26+Et;if(a*a+o*o>l*l)continue;let c=r.pos.y+.35,h=r.pos.y+1.6;if(i.y<c-Et||i.y>h+Et)continue;let d=_t(i.y,c,h),u=a,f=i.y-d,g=o,x=Math.hypot(u,f,g);if(x>=l||x<1e-6)continue;i.x=r.pos.x+u/x*l,i.y=d+f/x*l,i.z=r.pos.z+g/x*l,this.vel.x-=r.vel.x,this.vel.z-=r.vel.z;let m=this.contact(u/x,f/x,g/x,.35,"body");this.vel.x+=r.vel.x,this.vel.z+=r.vel.z,m>.5&&this.cb&&this.cb.body(this,r,m)}}spin(t){let e=this.w;if(this.state!=="free"){let E=this.vel;e.set(E.z/Et*.35,0,-E.x/Et*.35)}let i=e.len();if(i<1e-5)return;let n=i*t*.5,r=Math.sin(n)/i,a=e.x*r,o=e.y*r,l=e.z*r,c=Math.cos(n),[h,d,u,f]=this.q,g=c*h+a*f+o*u-l*d,x=c*d-a*u+o*f+l*h,m=c*u+a*d-o*h+l*f,p=c*f-a*h-o*d-l*u,v=Math.hypot(g,x,m,p)||1;this.q[0]=g/v,this.q[1]=x/v,this.q[2]=m/v,this.q[3]=p/v}},Dr=new Da;Dr.quiet=!0;function E_(s,t,e,i,n,r,a,o=1/240){let l=s,c=t,h=e,d=i,u=n,f=r,g=0,x=!1;for(let m=0;m<2400;m++){let p=Math.sqrt(d*d+u*u+f*f),v=On.AIR_DRAG*p;d-=d*v*o,f-=f*v*o,u-=(De+u*v)*o;let E=c;if(l+=d*o,c+=u*o,h+=f*o,g+=o,u<0&&(x=!0),x&&E>=a&&c<a){let y=(E-a)/(E-c),S=l-d*o*(1-y),M=h-f*o*(1-y);return{d:Math.hypot(S-s,M-e),t:g-o*(1-y),x:S,z:M}}if(c<0)return null}return null}function jp(s,t,e,i,n,r,a,o){let l=1.5,c=18,h=Math.cos(r),d=Math.sin(r);for(let u=0;u<26;u++){let f=(l+c)/2,g=E_(s,t,e,i*h*f,d*f,n*h*f,o);!g||g.d<a?l=f:c=f}return(l+c)/2}function Qp(s,t,e,i){Dr.copyFrom(s),Dr.state="free";let n=1/120,r=0;for(let a=0;a<t;a+=n)if(Dr.substep(n,0,null),r+=n,r>=e&&(r=0,i(a,Dr.pos,Dr.vel)===!1))return}var xc=(s,t)=>s.side?s.side(t.team):1,vc={jumper:1,three:1,layup:.8,ft:1.05,dunk:.5};function tm(s,t,e){let i=Math.sqrt(2*e/9.81);return Math.max(.05,s*vc[t]-i-.03)}function T_(s,t){return s.jumpHeight()+(t?.28:.12)>=1.02}function zs(s,t){if(s.phase==="ft")return"ft";let e=xc(s,t),i=Le(t.pos.x,t.pos.z,e),n=(t.vel.x*(e*F.X-t.pos.x)+t.vel.z*(F.Z-t.pos.z))/Math.max(.01,i);return i<2.3&&T_(t,n>1.6)&&(n>1.6||i<1.25)?"dunk":i<3.3?"layup":Un(t.pos.x,t.pos.z,e)?"three":"jumper"}var em={dunk:"DUNK",layup:"LAYUP",jumper:"JUMP SHOT",three:"3PT SHOT",ft:"FREE THROW"};function ln(s,t){let e=0,i=xc(s,t)*F.X-t.pos.x,n=F.Z-t.pos.z,r=Math.hypot(i,n)||1;for(let a of s.players){if(a.team===t.team)continue;let o=a.pos.x-t.pos.x,l=a.pos.z-t.pos.z,c=Math.hypot(o,l);if(c>2.6)continue;let h=(o*i+l*n)/(r*(c||1)),d=_t((2.6-c)/1.7,0,1)*_t(.35+.65*h,0,1);d*=a.handsUp||a.airborne?1:.65,(s.time<a.beatenUntil||s.time<a.offBalanceUntil)&&(d*=.35),d*=.72+.28*(a.attrs.defense/99),d>e&&(e=d)}return _t(e,0,1)}function Fn(s,t,e,i,n){let r=Le(t.pos.x,t.pos.z,xc(s,t)),a,o,l=t.attrs.shooting/99;return e==="layup"?(a=.5,o=.09+.05*(t.attrs.handling/99)):e==="ft"?(a=.62,o=.06+.05*l):e==="dunk"?(a=.5,o=.5):(a=.44+.4*_t((r-3)/5.5,0,1),o=.05+.055*l),o*=1-.5*i,o*=1-.35*_t(n,0,1),o*=1-.3*_t((.35-t.stamina)/.35,0,1),t.isHuman&&(o*=s.assist.window),{c:_t(a,.2,.9),w:Math.max(.022,o)}}function A_(s,t){let e=s-t.c,i=Math.abs(e);return i<=t.w*.45?{e,tier:"perfect",label:"PERFECT RELEASE"}:i<=t.w?{e,tier:"good",label:"GOOD RELEASE"}:i<=t.w+.12?{e,tier:e<0?"early":"late",label:e<0?"SLIGHTLY EARLY":"SLIGHTLY LATE"}:{e,tier:e<0?"early":"late",label:e<0?"WAY EARLY":"WAY LATE"}}function Du(s,t,e){let i=s.rng,n=e.kind,r=e.pos,a=t.attrs.shooting/99,o=A_(e.charge,e.spot),c=xc(s,t)*(F.X+.035),h=F.Z,d=Math.hypot(c-r.x,h-r.z),u=$t(c-r.x,h-r.z),g=(o.e-Math.sign(o.e)*Math.min(Math.abs(o.e),e.spot.w))*(n==="layup"?1.5:n==="ft"?.95:1.1),x=o.tier==="perfect"?.62:o.tier==="good"?.92:1,p=((n==="layup"?.02:n==="ft"?.012:.016)+.022*(1-a)+.014*e.pressure+.01*e.moving)*x,v=(.006+.012*(1-a)+.014*e.pressure+.006*e.moving)*x;g+=i.gauss()*p;let E=sn(u,e.aimYaw),y=n==="layup"?.6:.16,S=Math.abs(E)>y?(Math.abs(E)-y)*Math.sign(E)*.85:0,M=u+S+i.gauss()*v,R=Math.max(.3,d*(1+g)+i.gauss()*(n==="layup"?.035:.015)),b=Math.max(F.Y+(n==="layup"?.42:.55)+.1*d,r.y+.35),T=Math.sqrt(2*9.81*(b-r.y)),A=T/9.81+Math.sqrt(2*(b-F.Y)/9.81),P=Math.atan2(T,R/A),N=Math.sin(M),H=Math.cos(M),L=jp(r.x,r.y,r.z,N,H,P,R,F.Y),V=Math.cos(P),K=Math.sin(P);return{vx:N*V*L,vy:K*L,vz:H*V*L,grade:o,backspin:7+5*a,yaw:M}}function Ou(s,t,e,i,n=0){let r=s.attrs.shooting/99,a;return t==="dunk"?_t(.96*(1-.3*i),.3,.97):(t==="layup"?a=.78+.12*(s.attrs.handling/99):t==="ft"?a=.45+.42*r:a=.42+.4*r-.04*Math.max(0,e-3),_t(a*(1-.62*i)*(1-.3*n),.02,.95))}function im(s,t,e){return e==="ft"?1:e==="three"?3:2}var jt=(s,t,e,i)=>{let n=document.createElement(s);return t&&(n.className=t),i!=null&&(n.innerHTML=i),e&&e.appendChild(n),n},yc=class{constructor(t){this.root=jt("div","hud hidden",t),this.poss=jt("div","hud-poss",this.root),jt("div","hud-poss-label",this.poss,"YOU HAVE THE BALL"),this.hasBall=!1;let e=jt("div","hud-top",this.root);this.teamA=jt("span","hud-team",e),this.score=jt("span","hud-score",e,"0 - 0"),this.teamB=jt("span","hud-team",e);let i=jt("div","hud-clocks",this.root);this.period=jt("div","hud-period hidden",i,"Q1"),this.clock=jt("div","hud-clock",i,"5:00"),this.shot=jt("div","hud-shot",i,"14"),this.phase=jt("div","hud-phase",this.root);let n=jt("div","hud-player",this.root),r=jt("div","hud-prow",n);this.ptsEl=jt("div","hud-rating",r,"0"),jt("div","hud-rating-label",r,"PTS"),this.lineEl=jt("div","hud-line",n,"");let a=jt("div","hud-stamina",n);this.stamFill=jt("div","hud-stamina-fill",a),this.nameEl=jt("div","hud-name",n),this.cross=jt("div","hud-cross",this.root),this.meter=jt("div","hud-meter hidden",this.root),this.meterLabel=jt("div","hm-label",this.meter);let o=jt("div","hm-bar",this.meter);this.meterFill=jt("i","hm-fill",o),this.meterBand=jt("i","hm-band",o),this.meterPerfect=jt("i","hm-perfect",o),this.meterTick=jt("i","hm-tick",o),this.clear=jt("div","hud-clear hidden",this.root,"CLEAR IT \xB7 take it past the arc"),this.hint=jt("div","hud-hint",this.root),this.notes=jt("div","hud-notes",this.root),this.arrow=jt("div","hud-arrow hidden",this.root),this.banner=jt("div","hud-banner hidden",this.root),this.count=jt("div","hud-count hidden",this.root),this.countTitle=jt("div","c-title",this.count),this.countNum=jt("div","c-num",this.count),this.fade=jt("div","hud-fade",this.root),this.radar=jt("canvas","hud-radar",this.root),this.radar.width=200,this.radar.height=176,this.rctx=this.radar.getContext("2d"),this.v=new k,this.bannerUntil=0}show(t){this.root.classList.toggle("hidden",!t)}notify(t,e=""){let i=jt("div","hud-note "+e,this.notes,t);for(setTimeout(()=>i.classList.add("out"),1300),setTimeout(()=>i.remove(),1700);this.notes.children.length>3;)this.notes.firstChild.remove()}showBanner(t,e="",i=2200,n=""){this.banner.className="hud-banner "+n,this.banner.innerHTML=`<div class="b-main">${t}</div>${e?`<div class="b-sub">${e}</div>`:""}`,this.bannerUntil=performance.now()+i}showCountdown(t,e){t!=null&&(this.countTitle.textContent=t),this.count.classList.remove("hidden"),this.countNum.textContent=e,this.countNum.classList.toggle("go",e==="GO!"),this.countNum.classList.remove("pop"),this.countNum.offsetWidth,this.countNum.classList.add("pop")}endCountdown(){this.count.classList.add("hidden")}flashFade(){this.fade.classList.remove("on"),this.fade.offsetWidth,this.fade.classList.add("on")}update(t){let e=t.match,i=e.human;this.teamA.textContent=e.teams[0].short,this.teamB.textContent=e.teams[1].short,this.teamA.style.setProperty("--kit",t.kitA||"#c00"),this.teamB.style.setProperty("--kit",t.kitB||"#00c");let n=e.phase==="live"||e.phase==="check"||e.phase==="inbound";this.teamA.classList.toggle("poss",n&&e.offense===0&&e.rules),this.teamB.classList.toggle("poss",n&&e.offense===1&&e.rules);let r=!!e.full&&t.clockText==null;this.period.classList.toggle("hidden",!r),r&&(this.period.textContent=e.periodLabel);let a=e.full?5:6;this.teamA.classList.toggle("bonus",!!e.rules&&e.teams[1].fouls>=a-1&&e.phase!=="over"),this.teamB.classList.toggle("bonus",!!e.rules&&e.teams[0].fouls>=a-1&&e.phase!=="over");let o=`${e.teams[0].score} - ${e.teams[1].score}`;o!==this.score.textContent&&((this.score.textContent!=="0 - 0"||o!=="0 - 0")&&(this.score.classList.remove("bump"),this.score.offsetWidth,this.score.classList.add("bump")),this.score.textContent=o),this.clock.textContent=t.clockText??e.displayClock;let l=e.shotClockOn&&e.phase!=="over"&&t.clockText==null;if(this.shot.classList.toggle("hidden",!l),l&&(this.shot.textContent=e.displayShot,this.shot.classList.toggle("low",e.shotClock<=5&&e.phase==="live")),this.phase.textContent=t.phaseText||"",i){let h=e.stats.of(i);this.ptsEl.textContent=h.pts,this.lineEl.textContent=`FG ${h.fgm}/${h.fga} \xB7 3P ${h.tpm}/${h.tpa}${h.ast?` \xB7 AST ${h.ast}`:""}${h.stl?` \xB7 STL ${h.stl}`:""}`,this.stamFill.style.width=`${Math.round(i.stamina*100)}%`,this.stamFill.classList.toggle("low",i.stamina<.3),this.nameEl.textContent=`#${i.number} ${i.name}`}this.updateMeter(t),this.clear.classList.toggle("hidden",!(i&&e.mustClear===i.team&&e.ball.owner&&e.ball.owner.team===i.team&&e.phase==="live")),this.hint.textContent=t.hint||"";let c=!!i&&e.ball.owner===i&&(e.ball.state==="held"||e.ball.state==="dribble")&&(e.phase==="live"||e.phase==="check");c!==this.hasBall&&(this.hasBall=c,this.poss.classList.toggle("on",c)),this.banner.classList.toggle("hidden",performance.now()>this.bannerUntil),this.updateArrow(t),this.drawRadar(t)}updateMeter(t){let e=t.preview,i=!!e&&t.meter!==!1;if(this.meter.classList.toggle("hidden",!i),!i)return;let n=e.spot,r=a=>`${Math.round(Math.max(0,Math.min(1,a))*1e3)/10}%`;this.meterBand.style.bottom=r(n.c-n.w),this.meterBand.style.height=r(n.w*2),this.meterPerfect.style.bottom=r(n.c-n.w*.45),this.meterPerfect.style.height=r(n.w*.9),this.meterFill.style.height=r(e.charge||0),this.meter.classList.toggle("idle",!e.live&&!e.released),this.meter.classList.toggle("done",!!e.released),this.meterTick.style.bottom=r(e.charge||0),this.meterTick.style.display=e.released?"block":"none",this.meterLabel.textContent=e.released&&e.grade?e.grade.label:em[e.kind]||"",this.meter.dataset.tier=e.released&&e.grade?e.grade.tier:""}updateArrow(t){let e=t.match,i=e.ball.pos,n=t.view.projectToScreen(this.v.set(i.x,i.y,i.z),this.v);if(!(Math.abs(n.x)>.98||Math.abs(n.y)>.98)||t.noArrow||this.hasBall||e.phase==="over"){this.arrow.classList.add("hidden");return}let a=Math.atan2(n.y,n.x),o=.86,l=Math.min(o/Math.max(Math.abs(Math.cos(a)),.001),o/Math.max(Math.abs(Math.sin(a)),.001)),c=(Math.cos(a)*l*.5+.5)*100,h=(-Math.sin(a)*l*.5+.5)*100;this.arrow.classList.remove("hidden"),this.arrow.style.left=`${c}%`,this.arrow.style.top=`${h}%`,this.arrow.style.transform=`translate(-50%,-50%) rotate(${-a}rad)`}drawRadar(t){let e=t.match,i=this.rctx,n=e.human,r=!!e.full;r!==this.radarFull&&(this.radarFull=r,this.radar.width=r?124:200,this.radar.height=r?216:176,this.radar.classList.toggle("full",r));let a=this.radar.width,o=this.radar.height,l=r?7:10,c=r&&n?e.side(n.team):1,h=(a-l*2)/Nt.W,d=(o-l*2)/(r?Nt.L:Nt.HL),u=(p,v)=>[l+(Nt.HW+v*c)*h,l+(Nt.HL-p*c)*d];i.clearRect(0,0,a,o),i.fillStyle=t.style==="neo"?"rgba(236,159,60,0.92)":"rgba(150,110,60,0.88)",i.fillRect(0,0,a,o),i.strokeStyle="rgba(255,255,255,0.9)",i.lineWidth=1,i.strokeRect(l,l,a-l*2,o-l*2);let f=p=>{let v=(L,V)=>u(p*L*c,p*V*c),[E,y]=v(Nt.HL,-zt.KEY_HW),[S,M]=v(zt.FT_X,zt.KEY_HW);i.strokeStyle="rgba(255,255,255,0.9)",i.lineWidth=1,i.strokeRect(Math.min(E,S),Math.min(y,M),Math.abs(S-E),Math.abs(M-y));let[R,b]=v(F.X,0),[T]=v(0,-zt.THREE_Z),[A]=v(0,zt.THREE_Z),[,P]=v(zt.THREE_X,0),[,N]=v(Nt.HL,0),H=Math.asin(zt.THREE_Z/zt.THREE_R);i.beginPath(),i.moveTo(T,N),i.lineTo(T,P),p>0?i.arc(R,b,zt.THREE_R*h,Math.PI/2+H,Math.PI/2-H,!0):i.arc(R,b,zt.THREE_R*h,-Math.PI/2+H,-Math.PI/2-H,!0),i.lineTo(A,N),i.stroke(),i.beginPath(),i.arc(R,b,r?2.4:3,0,Math.PI*2),i.strokeStyle=p>0?"#ff6a1a":"rgba(255,255,255,0.7)",i.lineWidth=2,i.stroke()};if(f(1),r){f(-1);let[,p]=u(0,0);i.strokeStyle="rgba(255,255,255,0.9)",i.lineWidth=1,i.beginPath(),i.moveTo(l,p),i.lineTo(a-l,p),i.stroke(),i.beginPath(),i.arc(a/2,p,zt.CENTER_R*h,0,Math.PI*2),i.stroke()}let g=r?3.4:4.2;for(let p of e.players){if(p===n)continue;let[v,E]=u(p.pos.x,p.pos.z);i.fillStyle=p.team===0?t.kitA:t.kitB,i.strokeStyle="#111",i.lineWidth=1.2,i.beginPath(),i.arc(v,E,g,0,Math.PI*2),i.fill(),i.stroke()}if(n){let[p,v]=u(n.pos.x,n.pos.z),E=t.camYaw,y=Math.cos(E)*c,S=-Math.sin(E)*c;i.fillStyle="#ffc61a",i.beginPath(),i.moveTo(p+y*10,v+S*10),i.lineTo(p-S*6-y*4,v+y*6-S*4),i.lineTo(p+S*6-y*4,v-y*6-S*4),i.closePath(),i.fill(),i.strokeStyle="#070b1d",i.lineWidth=2,i.stroke()}let[x,m]=u(e.ball.pos.x,e.ball.pos.z);i.fillStyle="#ff7a1a",i.strokeStyle="#000",i.lineWidth=1.5,i.beginPath(),i.arc(x,m,3.2,0,Math.PI*2),i.fill(),i.stroke()}};var Hs=(s,t,e,i)=>{let n=document.createElement(s);return t&&(n.className=t),i!=null&&(n.innerHTML=i),e&&e.appendChild(n),n};var nm=["d","c","b","a"],R_={attack:{a:["shoot","SHOOT"],b:["pass","PASS"],c:["cross","CROSS"],d:["jump","FAKE"]},offball:{a:[null,""],b:["pass","CALL"],c:["jump","JUMP"],d:[null,""]},defend:{a:["steal","STEAL"],b:["stance","STANCE"],c:["jump","BLOCK"],d:["shoot","HANDS"]},free:{a:[null,""],b:[null,""],c:[null,""],d:[null,""]}},bc=class{constructor(t,e){this.app=t,this.input=t.input;let i=this.root=Hs("div","touch hidden",e);this.zone=Hs("div","tc-zone",i),this.stick=Hs("div","tc-stick idle",i),this.knob=Hs("div","tc-knob",this.stick),this.btn={};for(let o of nm)this.btn[o]=Hs("button",`tc-btn tc-${o}`,i),this.btn[o].dataset.k=o;this.pauseBtn=Hs("button","tc-pause",i,"<i></i><i></i>"),this.pauseBtn.setAttribute("aria-label","Pause"),Hs("div","tc-rotate",i,"Turn your phone sideways for a wider view"),this.ptrs=new Map,this.stickId=null,this.layout="attack",this.visible=!1,this.applyLayout();let n=o=>this.onDown(o),r=o=>this.onMove(o),a=o=>this.onUp(o);i.addEventListener("pointerdown",n),i.addEventListener("pointermove",r),i.addEventListener("pointerup",a),i.addEventListener("pointercancel",a),i.addEventListener("lostpointercapture",a),i.addEventListener("contextmenu",o=>o.preventDefault()),this.input.onReleaseAll=()=>this.reset()}setVisible(t){t!==this.visible&&(this.visible=t,this.root.classList.toggle("hidden",!t),t||this.reset())}reset(){for(let[,e]of this.ptrs)e.kind==="btn"&&this.btn[e.k].classList.remove("down");for(let[,e]of this.ptrs)e.kind==="btn"&&e.type&&this.input.touchAction(e.type,!1);this.ptrs.clear(),this.stickId=null;let t=this.input.touch;t.active=!1,t.f=0,t.r=0,t.sprint=!1,this.stick.classList.add("idle"),this.stick.classList.remove("sprint"),this.stick.style.left="",this.stick.style.top="",this.knob.style.transform=""}update(t){let e=t.match,i=t.human;if(!i)return;let n=e.ball,r=n.owner,a;e.phase==="ft"?a=e.ft&&e.ft.shooter===i?"attack":"free":r===i?a="attack":r&&r.team!==i.team||!r&&e.offense!==i.team&&e.rules?a="defend":a="offball",a!==this.layout&&(this.layout=a,this.applyLayout()),a==="defend"&&this.btn.a.classList.toggle("cool",e.time<i.stealReadyAt)}applyLayout(){let t=R_[this.layout];for(let e of nm){let[i,n]=t[e],r=this.btn[e];r.textContent=n,r.dataset.type=i||"",r.classList.toggle("off",!i),r.classList.remove("cool")}}radius(){return Math.max(46,Math.min(72,Math.min(innerWidth,innerHeight)*.14))}onDown(t){if(t.pointerType==="mouse")return;t.preventDefault();let e=t.target;try{e.setPointerCapture(t.pointerId)}catch{}if(e===this.pauseBtn){this.ptrs.set(t.pointerId,{kind:"pause"});return}let i=e.classList.contains("tc-btn")?e.dataset.k:null;if(i){let n=this.btn[i].dataset.type;if(!n)return;this.ptrs.set(t.pointerId,{kind:"btn",k:i,type:n,x:t.clientX,y:t.clientY}),this.btn[i].classList.add("down"),this.input.touchAction(n,!0);return}if(t.clientX<innerWidth*.42&&this.stickId==null){this.stickId=t.pointerId;let n={kind:"stick",ox:t.clientX,oy:t.clientY};this.ptrs.set(t.pointerId,n),this.stick.classList.remove("idle"),this.placeStick(n),this.moveStick(n,t.clientX,t.clientY)}else this.ptrs.set(t.pointerId,{kind:"look",x:t.clientX,y:t.clientY})}onMove(t){let e=this.ptrs.get(t.pointerId);if(e){if(t.preventDefault(),e.kind==="stick")this.moveStick(e,t.clientX,t.clientY);else if(e.kind==="look"||e.kind==="btn"&&(e.type==="shoot"||e.type==="pass")){let i=e.kind==="look"?1.35:.9;this.input.touchLook((t.clientX-e.x)*i,(t.clientY-e.y)*i),e.x=t.clientX,e.y=t.clientY}}}onUp(t){let e=this.ptrs.get(t.pointerId);if(e){if(this.ptrs.delete(t.pointerId),e.kind==="pause"){t.type==="pointerup"&&this.app.pause();return}if(e.kind==="btn"){this.btn[e.k].classList.remove("down"),this.input.touchAction(e.type,!1);return}if(e.kind==="stick"){this.stickId=null;let i=this.input.touch;i.active=!1,i.f=0,i.r=0,i.sprint=!1,this.stick.classList.add("idle"),this.stick.classList.remove("sprint"),this.stick.style.left="",this.stick.style.top="",this.knob.style.transform=""}}}placeStick(t){this.stick.style.left=`${t.ox}px`,this.stick.style.top=`${t.oy}px`}moveStick(t,e,i){let n=this.radius(),r=e-t.ox,a=i-t.oy,o=Math.hypot(r,a),l=n*1.25;o>l&&(t.ox+=r/o*(o-l),t.oy+=a/o*(o-l),r=e-t.ox,a=i-t.oy,o=l,this.placeStick(t));let c=Math.min(1,o/n),h=.12,d=c<h?0:(c-h)/(1-h),u=this.input.touch;u.active=!0,u.f=o>0?-a/o*d:0,u.r=o>0?r/o*d:0,u.sprint=o/n>.92,this.stick.classList.toggle("sprint",u.sprint);let f=Math.min(o,n)/(o||1);this.knob.style.transform=`translate(${r*f}px, ${a*f}px)`}};var cn=class{constructor(t=1){this.s=t>>>0||1}next(){let t=(this.s+=1831565813)>>>0;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}range(t,e){return t+(e-t)*this.next()}int(t,e){return Math.floor(this.range(t,e+1))}chance(t){return this.next()<t}pick(t){return t[Math.floor(this.next()*t.length)%t.length]}gauss(){return(this.next()+this.next()+this.next()+this.next()-2)*1.732}};function Vs(s){let t=2166136261;for(let e=0;e<s.length;e++)t^=s.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}var _c=class{constructor(){this.handlers=new Map,this.log=[],this.nextId=1,this.maxLog=4e3}on(t,e){return this.handlers.has(t)||this.handlers.set(t,[]),this.handlers.get(t).push(e),()=>{let i=this.handlers.get(t),n=i.indexOf(e);n>=0&&i.splice(n,1)}}emit(t,e){let i=Object.assign({id:this.nextId++,type:t},e);this.log.push(i),this.log.length>this.maxLog&&this.log.splice(0,this.log.length-this.maxLog);let n=this.handlers.get(t);if(n)for(let a=0;a<n.length;a++)n[a](i);let r=this.handlers.get("*");if(r)for(let a=0;a<r.length;a++)r[a](i);return i}};var Uu=On.FLOOR_E;function C_(s,t){let e=l=>{let c=(-l+Math.sqrt(l*l+2*De*s))/De,h=Uu*(l+De*c),d=h*h-2*De*s;if(d<0)return null;let u=(h-Math.sqrt(d))/De;return{td:c,tu:u,vd:l,vu:h,T:c+u}},i=Math.sqrt(2*De*s)/Uu,n=Math.sqrt(Math.max(0,i*i-2*De*s))+.001,r=e(n);if(!r||r.T<=t)return r||{td:t*.4,tu:t*.6,vd:n,vu:0,T:t};let a=n,o=20;for(let l=0;l<28;l++){let c=(a+o)/2,h=e(c);h&&h.T>t?a=c:o=c}return e((a+o)/2)}var rm=s=>s==="L"?1:-1;function sm(s,t,e,i){return[rm(t)*(.3-.05*e),.34+.3*e+.04*i,.86-.2*i+.06*e]}function En(s,t,e={}){s.hand=t,s.dribble={t:0,T:.5,td:.2,tu:.3,from:t,to:t,crossQueued:!1,a:[0,.4,.86],b:[0,.5,Et],c:[0,.4,.86],cross:!1,low:0,count:0},Fu(s,e.low||0,e.fromPos||(s.holdLocal?[...s.holdLocal]:null))}function Fu(s,t=0,e=null){let i=s.dribble,n=Math.hypot(s.vel.x,s.vel.z),r=_t(n/6.5,0,1);i.low+=(t-i.low)*.6;let a=i.crossQueued;i.crossQueued=!1,i.cross=a,i.from=i.to,i.to=a?i.from==="L"?"R":"L":i.from,s.hand=i.to;let o=e||(i.count>0?[...i.c]:sm(s,i.from,r,i.low)),l=sm(s,i.to,r,i.low),c=rm(i.from),h=a?0:c*(.33-.04*r),d=(o[1]+l[1])/2+.06+.22*r;i.a=o,i.c=l,i.b=[h,d,Et];let u=.56-.17*r-.08*i.low;a&&(u*=.82),u*=1-(s.attrs.handling-60)*.0015;let f=Math.max(.3,Math.min(o[2],l[2])-Et),g=C_(f,u);i.T=g.T,i.td=g.td*(o[2]-Et)/f,i.tu=g.T-i.td,i.vd=g.vd,i.t=0,i.count++}function Bu(s,t){let e=s.dribble,i=e.t;if(i<e.td){let n=i/e.td,r=e.a[2]-Et,a=e.a[2]-(e.vd*i+.5*De*i*i)*(r/Math.max(.01,e.vd*e.td+.5*De*e.td*e.td));t[0]=e.a[0]+(e.b[0]-e.a[0])*n,t[1]=e.a[1]+(e.b[1]-e.a[1])*n,t[2]=Math.max(Et,a)}else{let n=i-e.td,r=_t(n/e.tu,0,1),a=e.vd+De*e.td,o=Uu*a,l=e.c[2]-Et,c=o*n-.5*De*n*n,h=o*e.tu-.5*De*e.tu*e.tu,d=Et+c*(l/Math.max(.01,h));t[0]=e.b[0]+(e.c[0]-e.b[0])*r,t[1]=e.b[1]+(e.c[1]-e.b[1])*r,t[2]=Math.max(Et,d)}return t}function Mc(s,t,e,i=s.pos.x,n=s.pos.z,r=s.yaw){let a=Math.sin(r),o=Math.cos(r),l=Math.cos(r),c=-Math.sin(r);return e.x=i+l*t[0]+a*t[1],e.z=n+c*t[0]+o*t[1],e.y=t[2],e}function zu(s,t,e,i){let n=t-s.pos.x,r=i-s.pos.z,a=Math.sin(s.yaw),o=Math.cos(s.yaw),l=Math.cos(s.yaw),c=-Math.sin(s.yaw);return[n*l+r*c,n*a+r*o,e]}var Ke={chest:[0,.36,1.2],gather:[0,.32,1.28],pass:[0,.6,1.3],set:[-.1,.22,ve.EYE+.24],release:[-.1,.36,ve.EYE+.42],layup:[-.14,.42,ve.REACH-.05],ft:[-.08,.24,ve.EYE+.18]},am={set:[-.17,.44,ve.EYE+.14],ft:[-.15,.44,ve.EYE+.1],layup:[-.12,.52,ve.REACH-.12]};function Gi(s,t){return s.ball.owner===t&&(s.ball.state==="held"||s.ball.state==="dribble")}function Wi(s,t){let e=t.action;return e&&!(e.type==="jump"&&!Gi(s,t))?!1:s.time>=t.offBalanceUntil||Gi(s,t)}function Vu(s,t){s.ball.state==="dribble"&&s.ball.owner===t&&(t.gatherPending=!0)}function Tn(s,t){let e=s.ball;e.state="held",e.owner=t,t.dribble=null,t.gatherPending=!1,t.holdLocal=zu(t,e.pos.x,e.pos.y-t.pos.y,e.pos.z)}function P_(s,t,e){let i=t.action,n=(r,a,o)=>(o=_t(o,0,1),e[0]=r[0]+(a[0]-r[0])*o,e[1]=r[1]+(a[1]-r[1])*o,e[2]=r[2]+(a[2]-r[2])*o,e);if(!i)return n(Ke.chest,Ke.chest,0);if(i.type==="shot"){if(i.tg==null)return n(Ke.gather,Ke.gather,0);let r=(i.t-i.tg)/(i.kind==="ft"?.35:.24),a=t.isHuman?{...Ke,...am}:Ke;if(i.kind==="layup")return n(Ke.gather,a.layup,(i.t-i.tg)/.42);if(i.kind==="dunk"){let o=s.side(t.team),l=zu(t,o*(F.X-.05),0,F.Z),c=[_t(l[0],-.25,.25),_t(l[1],.15,.55),ve.REACH+.18];return n(Ke.gather,c,(i.t-i.tg)/.3)}return n(Ke.gather,i.kind==="ft"?a.ft:a.set,r)}return i.type==="pass"?i.tg==null?n(Ke.chest,Ke.chest,0):n(Ke.chest,i.kind==="bounce"?[0,.55,1]:Ke.pass,(i.t-i.tg)/i.push):i.type==="fake"?n(Ke.chest,Ke.set,Math.sin(_t(i.t/.42,0,1)*Math.PI)*.85):n(Ke.chest,Ke.chest,0)}var Oa=[0,0,0],Sc=new Me;function Ua(s,t,e){let i=s.ball;P_(s,t,Oa);let n=t.holdLocal||(t.holdLocal=[...Oa]),r=1-Math.exp(-e*26);n[0]+=(Oa[0]-n[0])*r,n[1]+=(Oa[1]-n[1])*r,n[2]+=(Oa[2]-n[2])*r,Mc(t,n,Sc),i.setKinematic(Sc.x,Sc.y+t.pos.y,Sc.z,e)}function hs(s,t,e={}){if(!Gi(s,t)||!Wi(s,t))return!1;let i=e.kind||zs(s,t),n=ln(s,t),r=_t(t.speed/6,0,1),a=Fn(s,t,i,n,i==="layup"||i==="dunk"?0:r);return t.action={type:"shot",kind:i,t:0,t0:s.time,tg:s.ball.state==="held"?0:null,charging:!!e.charging,charge:0,relCharge:null,releaseCharge:e.releaseCharge??a.c,aimYaw:e.aimYaw??$t(s.side(t.team)*F.X-t.pos.x,F.Z-t.pos.z),spot:a,pressure:n,moving:r,value:im(s,t,i),released:!1,jumped:!1,lockMove:i==="layup"||i==="dunk"?void 0:3,from:{x:t.pos.x,z:t.pos.z}},Vu(s,t),s.events.emit("shotStart",{player:t,kind:i,t:s.time}),!0}function Gu(s,t){s.type!=="shot"||!s.charging||(s.charging=!1,s.relCharge=_t((t-s.t0)/vc[s.kind],0,1))}function I_(s,t,e,i){let n=s.ball,r=s.time;if(e.t+=i,!e.released){if(n.owner!==t){t.action=null;return}if(e.charge=_t((r-e.t0)/vc[e.kind],0,1),e.tg==null)if(n.state==="held")e.tg=e.t;else if(e.t>.45)Tn(s,t),e.tg=e.t;else return;let a=e.t-e.tg,o=s.side(t.team)*F.X-t.pos.x,l=F.Z-t.pos.z,c=Math.hypot(o,l)||1;if((e.ai||e.under)&&(e.aimYaw=$t(o,l)),!e.jumped)if(e.kind==="jumper"||e.kind==="three"){let d=t.jumpHeight()*.62;a>.05&&e.t>=tm(e.spot.c,e.kind,d)&&(rn(t,r,d),e.jumped=!0)}else if(e.kind==="layup"){let d=s.side(t.team);if(e.under==null&&(e.under=c<1.45||d*t.pos.x>d*F.X-.2),e.under){let u=d*(F.X-1.15)-t.pos.x,f=_t(t.pos.z,-.6,.6)-t.pos.z,g=Math.hypot(u,f)||1;if(t.desired.set(u/g*Math.min(5,g*8),0,f/g*Math.min(5,g*8)),t.faceYaw=$t(o,l),a>.2){rn(t,r,t.jumpHeight()*.8);let x=Math.min(4.5,g/.3);t.vel.set(u/g*x,0,f/g*x),e.jumped=!0}}else if(t.desired.set(o/c*4,0,l/c*4),t.faceYaw=$t(o,l),a>.2){rn(t,r,t.jumpHeight()*.8);let u=Math.min(3,Math.max(0,c-.7)/.55);t.vel.set(o/c*u,0,l/c*u),e.jumped=!0}}else if(e.kind==="dunk"){if(t.faceYaw=$t(o,l),a>.06){let d=F.Y+.3-ve.REACH;rn(t,r,Math.max(d,t.jumpHeight()));let u=Math.sqrt(2*Math.max(d,.5)/De),f=Math.max(0,c-.55),g=Math.min(5.5,f/u);t.vel.set(o/c*g,0,l/c*g),e.jumped=!0,e.apexT=e.t+u}}else e.jumped=!0;let h=!1;if(e.kind==="dunk")h=e.jumped&&e.t>=(e.apexT??9)-.04;else if(t.isHuman&&!e.ai){let d=e.kind==="ft"?.3:e.kind==="layup"?e.under?.5:.32:.16;e.charge>=1&&e.charging&&(e.charging=!1,e.relCharge=1),h=!e.charging&&a>=d,e.jumped&&e.kind!=="ft"&&t.vy<0&&t.pos.y<.1&&a>.25&&(e.charging&&(e.charging=!1,e.relCharge=e.charge),h=!0)}else{let d=e.kind==="ft"?.3:e.kind==="layup"?e.under?.5:.32:.16;h=a>=d&&e.charge>=e.releaseCharge,e.jumped&&e.kind!=="ft"&&t.vy<0&&t.pos.y<.1&&a>.25&&(h=!0),h&&(e.relCharge=e.charge)}h&&L_(s,t,e);return}e.t-e.rt>.45&&!t.airborne&&(t.action=null)}function L_(s,t,e){let i=s.ball,n=s.time;e.released=!0,e.rt=e.t,t.shotSide=s.side(t.team);let r=e.relCharge??e.charge,a=s.side(t.team)*F.X-i.pos.x,o=F.Z-i.pos.z;if(e.kind==="dunk"&&Math.hypot(a,o)<.5&&i.pos.y>F.Y+.08){let l=Math.max(.05,(i.pos.y-F.Y+.12)/5.5);i.release(a/l,-5.5,o/l,0,0,0),e.gradeInfo={tier:"perfect",label:"DUNK"}}else if(e.kind==="dunk"){let l=Du(s,t,{kind:"layup",charge:.5,spot:{c:.5,w:.2},pressure:e.pressure,moving:0,aimYaw:$t(a,o),pos:i.pos});i.release(l.vx,l.vy,l.vz,0,0,0),e.kind="layup",e.gradeInfo=l.grade}else{let l=Du(s,t,{kind:e.kind,charge:r,spot:e.spot,pressure:e.pressure,moving:e.moving,aimYaw:e.aimYaw,pos:i.pos}),c=Math.cos(l.yaw),h=-Math.sin(l.yaw);i.release(l.vx,l.vy,l.vz,c*l.backspin,0,h*l.backspin),e.gradeInfo=l.grade}i.ignore=t,i.ignoreUntil=n+.35,t.noCatchUntil=n+vi.SHOT_LOCK,i.lastTouch={player:t,team:t.team,t:n},i.shot={shooter:t,team:t.team,side:s.side(t.team),kind:e.kind,value:e.value,t:n,rim:!1,board:!1,blocked:!1,from:{...e.from},foul:null,grade:e.gradeInfo,charge:r,spot:e.spot},i.pass=null,s.events.emit("shot",{player:t,kind:e.kind,value:e.value,grade:e.gradeInfo,pressure:e.pressure,t:n})}function wc(s,t,e,i){let n=0,r=null,a=Math.hypot(e-t.pos.x,i-t.pos.z);for(let o of s.players){if(o.team===t.team)continue;let l=Os(o.pos.x,o.pos.z,t.pos.x,t.pos.z,e,i),c=l.t*a;if(c<.35||c>a+.3)continue;let h=_t((1.15-l.d)/.9,0,1);h>n&&(n=h,r=o)}return{risk:n,who:r}}function Or(s,t,e,i={}){if(!e||!Gi(s,t)||!Wi(s,t))return!1;let n=wc(s,t,e.pos.x,e.pos.z),r=Math.hypot(e.pos.x-t.pos.x,e.pos.z-t.pos.z),a=i.kind||(n.risk>.35&&r>2.5?"bounce":r>9?"lob":"chest");return t.action={type:"pass",target:e,kind:a,t:0,tg:s.ball.state==="held"?0:null,push:a==="bounce"?.13:.11,released:!1,lockMove:2.5},t.faceYaw=$t(e.pos.x-t.pos.x,e.pos.z-t.pos.z),Vu(s,t),!0}function k_(s,t,e,i){let n=s.ball;if(e.t+=i,!e.released){if(n.owner!==t){t.action=null;return}if(e.tg==null)if(n.state==="held")e.tg=e.t;else if(e.t>.4)Tn(s,t),e.tg=e.t;else return;e.t-e.tg>=e.push&&N_(s,t,e);return}e.t-e.rt>.3&&(t.action=null)}function N_(s,t,e){let i=s.ball,n=s.time,r=s.rng,a=e.target;e.released=!0,e.rt=e.t;let o=t.attrs.passing/99,l=i.pos,c=a.pos.x,h=a.pos.z,d=e.kind==="bounce"?7.6+o*1.5:e.kind==="lob"?7.6+o*1.2:9.2+o*2.4,u=0;for(let b=0;b<3;b++)u=Math.hypot(c-l.x,h-l.z)/d,c=a.pos.x+a.vel.x*u*.85,h=a.pos.z+a.vel.z*u*.85;let f=ln(s,t),g=(.012+.04*(1-o)+.03*f)*(t.isHuman?s.assist.passErr:1),x=c-l.x,m=h-l.z,p=Math.hypot(x,m)||1,v=$t(x,m)+r.gauss()*g,E=Math.sin(v),y=Math.cos(v),S,M,R;if(e.kind==="bounce"){let T=p*.6/d;M=(Et-l.y+.5*De*T*T)/T,S=E*d,R=y*d}else{let b=a.pos.y+(e.kind==="lob"?1.55:1.25),T=p/d,A=1+.012*d*T*.5;M=(b-l.y+.5*De*T*T)/T,S=E*d*A,R=y*d*A}S*=1+r.gauss()*g*.5,R*=1+r.gauss()*g*.5,i.release(S,M,R,0,0,0),i.ignore=t,i.ignoreUntil=n+.2,t.noCatchUntil=n+vi.PASS_LOCK,i.lastTouch={player:t,team:t.team,t:n},i.pass={passer:t,target:a,team:t.team,t:n,kind:e.kind,tried:new Set},i.shot=null,s.events.emit("pass",{player:t,target:a,kind:e.kind,t:n})}function Ec(s,t){let e=s.time;if(e<t.stealReadyAt||t.action||Gi(s,t))return!1;let i=s.ball,n=null;i.owner&&i.owner.team!==t.team&&i.owner.pos.distXZ(t.pos)<vi.STEAL_RANGE+.3&&(n=i.owner);let r=n?$t(i.pos.x-t.pos.x,i.pos.z-t.pos.z):t.yaw;return t.action={type:"steal",t:0,target:n,dir:r,resolved:!1,lockMove:2.2,hand:sn(t.yaw,r)>0?"L":"R"},t.stealReadyAt=e+vi.STEAL_COOLDOWN,s.events.emit("stealTry",{player:t,t:e}),!0}function D_(s,t,e,i){e.t+=i,!e.resolved&&e.t>=.11&&(e.resolved=!0,O_(s,t,e)),e.t>=.34&&(t.action=null)}function O_(s,t,e){let i=s.ball,n=s.time,r=s.rng,a=Math.sin(e.dir),o=Math.cos(e.dir),l=t.pos.x+a*.72,c=t.pos.z+o*.72,h=i.owner;if(h&&h.team!==t.team&&(i.state==="dribble"||i.state==="held")){let d=Math.hypot(i.pos.x-l,i.pos.z-c);if(d>.95||i.pos.y>2.2){Hu(s,t,.32);return}let u=Os(h.pos.x,h.pos.z,t.pos.x,t.pos.z,i.pos.x,i.pos.z),f=u.t>.05&&u.t<.95&&u.d<.24,g;i.state==="dribble"?g=i.pos.y<.7?1:.55:g=h.action&&h.action.type==="shot"&&h.action.tg==null?.7:.22;let x=(t.attrs.defense-h.attrs.handling)/99,m=_t(.16+.42*g+.35*x,.04,.82)*_t(1.25-d*.5,.4,1);if(f&&(m*=.22),t.isHuman?m*=s.assist.steal:h.isHuman&&(m*=s.assist.stealVsHuman),r.next()<m){let v=(l-h.pos.x)*1.4+(t.pos.x-h.pos.x)*.6+r.gauss()*.5,E=(c-h.pos.z)*1.4+(t.pos.z-h.pos.z)*.6+r.gauss()*.5;h.action&&(h.action.type==="shot"||h.action.type==="pass")&&!h.action.released&&(h.action=null),h.dribble=null,i.release(v,.6,E),i.lastTouch={player:t,team:t.team,t:n},i.ignore=h,i.ignoreUntil=n+.3,h.noCatchUntil=n+.35,s.pendingSteal={player:t,victim:h,t:n},s.events.emit("poke",{player:t,victim:h,t:n});return}let p=f?t.isHuman?.4:.5:.07;if(r.next()<p*(t.isHuman?1:s.assist.aiFoul)){s.foul(t,h,"reach");return}Hu(s,t,.42);return}if(i.state==="free"&&i.pass&&i.pass.team!==t.team&&Math.hypot(i.pos.x-l,i.pos.z-c)<1.1&&i.pos.y<2.3){if(r.next()<.75){s.gainBall(t,"interception");return}i.vel.scale(.3),i.vel.y=1,i.pass=null,i.lastTouch={player:t,team:t.team,t:n},s.events.emit("deflect",{player:t,t:n});return}Hu(s,t,.25)}function Hu(s,t,e){t.offBalanceUntil=s.time+e,s.events.emit("stealMiss",{player:t,t:s.time})}function Fa(s,t){return t.airborne||t.action||Gi(s,t)||!rn(t,s.time)?!1:(t.action={type:"jump",t:0},s.events.emit("jump",{player:t,t:s.time}),!0)}function U_(s,t,e,i){e.t+=i,e.t>.1&&!t.airborne&&(t.action=null)}function om(s,t){let e=Math.sin(s.yaw),i=Math.cos(s.yaw);return t.set(s.pos.x+e*.22,s.pos.y+ve.REACH-.06,s.pos.z+i*.22)}function Tc(s,t){return!Gi(s,t)||!Wi(s,t)?!1:(t.action={type:"fake",t:0,tg:null,lockMove:.8,bit:!1},Vu(s,t),!0)}function F_(s,t,e,i){let n=s.ball;if(n.owner!==t){t.action=null;return}if(n.state==="held"){if(e.t+=i,!e.bit&&e.t>.12){e.bit=!0,s.events.emit("fake",{player:t,t:s.time});for(let r of s.players){if(r.team===t.team||r.isHuman||r.airborne||r.pos.distXZ(t.pos)>2.4)continue;let o=_t(.62-r.attrs.defense/230,.1,.6)*s.aiParams[r.team].bite;s.rng.next()<o&&(rn(r,s.time,r.jumpHeight()*.9),r.action={type:"jump",t:0},r.beatenUntil=s.time+.75,s.events.emit("bite",{player:r,by:t,t:s.time}))}}e.t>=.42&&(t.action=null)}}function Ac(s,t){let e=s.ball;return e.owner!==t?!1:e.state==="held"&&!t.action&&!t.airborne?(En(t,t.hand==="L"?"R":"L",{}),e.state="dribble",!0):e.state!=="dribble"||!t.dribble||t.dribble.crossQueued||t.dribble.cross?!1:(t.dribble.crossQueued=!0,!0)}function lm(s,t){let i=t.dribble.to==="L"?1:-1,n=Math.cos(t.yaw),r=-Math.sin(t.yaw),a=1.3+t.attrs.handling*.008;t.vel.x+=n*i*a,t.vel.z+=r*i*a,s.events.emit("cross",{player:t,t:s.time});for(let o of s.players){if(o.team===t.team||o.isHuman||o.pos.distXZ(t.pos)>1.9)continue;let c=_t(.3+(t.attrs.handling-o.attrs.defense)/160,.06,.62)*s.aiParams[o.team].bite;s.rng.next()<c&&(o.beatenUntil=s.time+.55,s.events.emit("ankles",{player:o,by:t,t:s.time}))}}function cm(s,t,e){let i=t.action;if(i)switch(i.type){case"shot":I_(s,t,i,e);break;case"pass":k_(s,t,i,e);break;case"steal":D_(s,t,i,e);break;case"jump":U_(s,t,i,e);break;case"fake":F_(s,t,i,e);break;case"celebrate":i.t+=e,i.t>i.dur&&(t.action=null);break;default:i.t=(i.t||0)+e,i.t>2&&(t.action=null)}}var Wu=["pts","fgm","fga","tpm","tpa","ftm","fta","oreb","dreb","ast","stl","blk","tov","pf","pass","pcmp"],Rc=class{constructor(t){this.m=t,this.p=new Map;for(let e of t.players)this.p.set(e,Object.fromEntries(Wu.map(i=>[i,0])));this.poss=[0,0],t.events.on("pass",e=>this.add(e.player,"pass"))}add(t,e,i=1){let n=this.p.get(t);n&&e in n&&(n[e]+=i)}of(t){return this.p.get(t)}update(t){let e=this.m;e.phase==="live"&&(this.poss[e.offense]+=t)}gameScore(t){let e=this.of(t);return e.pts+.4*e.fgm-.6*e.fga-.4*(e.fta-e.ftm)+.7*e.oreb+.35*e.dreb+e.stl+.7*e.ast+.7*e.blk-.4*e.pf-e.tov}grade(t){let e=this.gameScore(t),i=[[14,"A+"],[10,"A"],[7.5,"A-"],[5.5,"B+"],[4,"B"],[2.5,"B-"],[1.2,"C+"],[.2,"C"],[-1,"C-"],[-2.5,"D"],[-1/0,"F"]];for(let[n,r]of i)if(e>=n)return r;return"F"}team(t){let e=Object.fromEntries(Wu.map(i=>[i,0]));for(let i of this.m.teams[t].players){let n=this.of(i);for(let r of Wu)e[r]+=n[r]}return e}report(t){let e=this.m,i=this.of(t),n=(l,c)=>c?Math.round(l/c*100):null,r=this.poss[0]+this.poss[1]||1,a=null,o=-1e9;for(let l of e.players){let c=this.gameScore(l)+(l.team===e.winner?2:0);c>o&&(o=c,a=l)}return{score:e.scoreline,stats:{...i,fgPct:n(i.fgm,i.fga),tpPct:n(i.tpm,i.tpa),ftPct:n(i.ftm,i.fta),reb:i.oreb+i.dreb},grade:this.grade(t),gameScore:this.gameScore(t),possession:[Math.round(this.poss[0]/r*100),Math.round(this.poss[1]/r*100)],teams:[this.team(0),this.team(1)],mvp:a}}};var B_=Object.entries(fe),Cc=class{constructor(t){this.m=t,this.marks=new Map,this.reb=null,this.rebAt=-1,this.markTeam=-1}assignMarks(t,e){let i=this.m,n=i.teams[t].players,r=i.teams[1-t].players,a=new Map,o=new Set(n),l=new Set(r),c=i.human;if(i.full)for(let h of r){let d=n.find(u=>u.slot===h.slot&&o.has(u));d&&(a.set(h,d),o.delete(d),l.delete(h))}else c&&c.team!==t&&e&&o.has(e)&&(a.set(c,e),o.delete(e),l.delete(c));for(;l.size&&o.size;){let h=null,d=1e9;for(let u of l)for(let f of o){let g=u.pos.distXZ(f.pos)+Math.abs(u.slot-f.slot)*.01;g<d&&(d=g,h=[u,f])}a.set(h[0],h[1]),l.delete(h[0]),o.delete(h[1])}for(let h of r)a.has(h)||a.set(h,n[0]);this.marks=a,this.markTeam=t;for(let h of r){let d=a.get(h);h.ai.obs=new Me(d.pos.x,0,d.pos.z)}return a}markOf(t){return this.marks.get(t)||null}defenderOf(t){for(let[e,i]of this.marks)if(i===t)return e;return null}pressureLow(t){let e=0;for(let i of this.m.players){if(i.team===t.team)continue;let n=i.pos.distXZ(t.pos);n<2&&(e=Math.max(e,_t((2-n)/1.1,0,1)))}return e}update(t){let e=this.m;V_(e);let i=e.phase;(i==="live"||i==="inbound")&&e.offense!==this.markTeam&&this.assignMarks(e.offense,e.ball.owner),i==="live"&&e.time-this.rebAt>.12&&this.predictRebound();for(let n of e.players){if(n.isHuman)continue;if(n.handsUp=!1,n.stance=!1,n.faceYaw=null,n.sprint=!1,i==="ft"){this.ftShooter(n),n.desired.set(0,0,0);continue}if(i==="check"||i==="intro"||i==="over"||i==="tip"||i==="break"){n.desired.set(0,0,0),i==="over"&&e.winner!==n.team&&(n.faceYaw=n.yaw),i==="tip"&&e.ball.state==="free"&&this.face(n,e.ball.pos.x,e.ball.pos.z);continue}if(i==="scored"||i==="dead"){this.drift(n,t);continue}if(!e.rules){this.practice(n,t);continue}let r=e.ball;if(i==="inbound"){this.inbound(n,t);continue}r.owner===n?this.handler(n,t):n.team===e.offense?this.offBall(n,t):this.defend(n,t)}}moveTo(t,e,i,n,r=!1){let a=e-t.pos.x,o=i-t.pos.z,l=Math.hypot(a,o);if(l<.12)return t.desired.set(0,0,0),l;let c=Math.min(n,l*3.2);return t.desired.set(a/l*c,0,o/l*c),t.sprint=r,l}face(t,e,i){t.faceYaw=$t(e-t.pos.x,i-t.pos.z)}clampTarget(t,e=-1){let i=this.m;if(i.full){if(t.x=_t(t.x,-Nt.HL+.6,Nt.HL-.6),e===i.offense&&i.frontcourt){let n=i.side(e);n*t.x<.9&&(t.x=n*.9)}}else t.x=_t(t.x,.9,Nt.HL-.6);return t.z=_t(t.z,-Nt.HW+.5,Nt.HW-.5),t}inBackcourt(t){return this.m.full&&!this.m.frontcourt&&t===this.m.offense}decide(t,e){let i=this.m;if(i.time<t.ai.think)return!1;let n=i.aiParams[t.team].react;return t.ai.think=i.time+e*(.75+i.rng.next()*.5)+n*.4,!0}handler(t,e){let i=this.m,n=i.ball,r=t.ai;if(t.action&&t.action.type!=="jump")return;if(t.airborne){t.desired.set(0,0,0);return}let a=i.side(t.team),o=a*F.X,l=Le(t.pos.x,t.pos.z,a);if((r.caughtAt==null||r.holder!==i.possessions)&&(r.caughtAt=i.time,r.holder=i.possessions,r.mode=null),this.decide(t,.26)&&this.chooseHandlerPlay(t,l),t.action&&t.action.type!=="jump")return;let c=r.target,h=t.jogSpeed(),d=!1;if(r.mode==="drive"){if(c.set(a*(F.X-.9),0,F.Z+_t(t.pos.z*.25,-.6,.6)),d=!0,h=t.sprintSpeed(),l<2.4&&Wi(i,t)){this.shoot(t);return}}else r.mode==="clear"?(d=this.closestDefender(t).d>2.2,h=d?t.sprintSpeed():t.jogSpeed()):r.mode==="bring"?(d=this.closestDefender(t).d>4&&t.stamina>.3,h=d?t.sprintSpeed():t.jogSpeed()):r.mode==="hold"&&c.set(t.pos.x,0,t.pos.z);if(this.clampTarget(c,t.team),Math.hypot(c.x-t.pos.x,c.z-t.pos.z)>.3&&n.state==="held"&&!t.action){let f=this.closestDefender(t),g="R";f.q&&(g=(f.q.pos.x-t.pos.x)*Math.cos(t.yaw)-(f.q.pos.z-t.pos.z)*Math.sin(t.yaw)>0?"R":"L"),En(t,g,{}),n.state="dribble"}if(n.state==="held"){t.desired.set(0,0,0),this.face(t,o,F.Z);return}this.moveTo(t,c.x,c.z,h,d),r.mode==="drive"||r.mode==="clear"||r.mode==="bring"?t.faceYaw=null:this.face(t,o,F.Z)}chooseHandlerPlay(t,e){let i=this.m,n=i.ball,r=t.ai,a=i.rng,o=i.aiParams[t.team],l=i.side(t.team),c=l*F.X,h=i.time-r.caughtAt,d=this.inBackcourt(t.team);if(i.mustClear===t.team){r.mode="clear";let b=Math.atan2(t.pos.z-F.Z,t.pos.x-F.X),T=7.5,A=F.X+Math.cos(b)*T,P=F.Z+Math.sin(b)*T;A>11.5&&(A=9,P=Math.sign(t.pos.z||1)*5.6),r.target.set(A,0,P),Un(A,P)||r.target.set(fe.top[0],0,fe.top[1]);return}let u=zs(i,t),f=ln(i,t),g=_t(t.speed/6,0,1),x=d&&e>9?0:Ou(t,u,e,f,u==="layup"||u==="dunk"?0:g)*o.shot,m=u==="three"?3:2,p=1.05-(i.shotClock<4?.6:i.shotClock<7?.22:0)-(u==="dunk"||u==="layup"?.2:u==="jumper"?.12:0)+(u==="three"&&i.shotClock>5?.15:0);h<.2&&u!=="layup"&&u!=="dunk"&&(p+=.08),i.full&&u==="three"&&i.shotClock>9&&(p+=.12);let v=x*m,y=this.laneToRim(t)>.42&&e>2.6&&e<(i.full?15:99)?1.25*(.55+.45*(t.attrs.speed+t.attrs.handling)/198)*(.55+.45*o.aggression):0,S=null,M=0;for(let b of i.teams[t.team].players){if(b===t||b.airborne)continue;let T=i.localX(t.team,b.pos.x);if(i.full&&i.frontcourt&&T<.4)continue;let A=Le(b.pos.x,b.pos.z,l),P=A<3.3?"layup":Un(b.pos.x,b.pos.z,l)?"three":"jumper",N=Math.min(1,ln(i,b)*1.15+.08),H=A>10?.01:Ou(b,P,A,N)*(P==="three"?3:2),L=wc(i,t,b.pos.x,b.pos.z),V=Math.hypot(b.pos.x-t.pos.x,b.pos.z-t.pos.z),K=H*(1-L.risk*.9)*.93*(V>14?.7:1);d&&b.attrs.handling>t.attrs.handling+8&&L.risk<.3&&V<13&&this.closestDefender(b).d>2&&(K=Math.max(K,.86+(b.attrs.handling-t.attrs.handling)/120)),b.isHuman&&(K*=b.requestUntil>i.time?1.6:1.15),r.lastPassTo===b&&i.time-r.lastPassAt<2&&(K*=.85),K>M&&(M=K,S=b)}if(S&&M>Math.max(v*1.08,.8)&&h>.12&&Wi(i,t)&&i.shotClock>1.2){Or(i,t,S),t.ai.lastPassTo=S,t.ai.lastPassAt=i.time;return}if(i.mustClear==null&&(v>=p||i.shotClock<1.6&&!d)&&Wi(i,t)){this.shoot(t);return}if(y>Math.max(v,M)&&a.next()<.85){r.mode="drive";return}if(d){if(r.mode!=="bring"||a.next()<.15){r.mode="bring";let b=a.pick(["top","slotL","slotR","wingL","wingR"]),[T,A]=Xl(b,l);r.target.set(T+a.gauss()*.5,0,A+a.gauss()*.5)}return}let R=this.closestDefender(t);if(n.state==="dribble"&&R.d<1.5&&a.next()<.3*o.aggression)Ac(i,t);else if(R.d<2&&e<7.5&&n.state==="held"&&a.next()<.12){Tc(i,t);return}if(a.next()<.45||r.mode!=="probe"){r.mode="probe";let b=a.pick(["top","wingL","wingR","slotL","slotR","elbowL","elbowR"]),[T,A]=Xl(b,l);r.target.set(T+a.gauss()*.4,0,A+a.gauss()*.4)}}shoot(t){let e=this.m,i=e.aiParams[t.team],n=zs(e,t),r=ln(e,t),a=Fn(e,t,n,r,_t(t.speed/6,0,1)),o=(.038+.06*(1-t.attrs.shooting/99))*i.timing*(1+.6*r),l=_t(a.c+e.rng.gauss()*o,.15,1);(n==="jumper"||n==="three")&&t.desired.set(0,0,0),hs(e,t,{kind:n,releaseCharge:l}),t.action&&(t.action.ai=!0)}laneToRim(t){let e=this.m,i=e.hoopX(t.team),n=e.side(t.team),r=1;for(let a of e.players){if(a.team===t.team)continue;let o=Os(a.pos.x,a.pos.z,t.pos.x,t.pos.z,i-n*.6,F.Z);if(o.t<.05||o.t>.8)continue;let l=_t((1.2-o.d)/.9,0,1)*(e.time<a.beatenUntil||e.time<a.offBalanceUntil||a.airborne?.2:1);r=Math.min(r,1-l)}return r}closestDefender(t){let e=null,i=1e9;for(let n of this.m.players){if(n.team===t.team)continue;let r=n.pos.distXZ(t.pos);r<i&&(i=r,e=n)}return{q:e,d:i}}offBall(t,e){let i=this.m,n=i.ball,r=t.ai,a=i.rng;if(t.action&&t.action.type==="shot"||this.rebounding(t))return;let o=i.side(t.team);if(n.pass&&n.pass.target===t&&n.state==="free"){let u=z_(n,t);this.moveTo(t,u.x,u.z,u.far?t.sprintSpeed():t.jogSpeed(),u.far),this.face(t,n.pos.x,n.pos.z);return}let l=n.owner;if(this.decide(t,.6)){let u=this.defenderOf(t),f=u?u.pos.distXZ(t.pos):9,g=u&&(i.time<u.beatenUntil||f>2.6&&Le(u.pos.x,u.pos.z,o)>Le(t.pos.x,t.pos.z,o)-.5),x=!i.full||Le(t.pos.x,t.pos.z,o)<13;r.mode!=="cut"&&g&&x&&a.next()<.55&&l?(r.mode="cut",r.cutUntil=i.time+2.2,r.target.set(o*(F.X-1.1),0,_t(t.pos.z*.2,-.9,.9))):(r.mode!=="cut"||i.time>r.cutUntil)&&(r.mode="space",this.pickSpot(t)),this.closestDefender(t).d>2.3&&l&&l.team===t.team&&(t.requestUntil=i.time+.8)}let c=this.clampTarget(r.target,t.team),h=Math.hypot(c.x-t.pos.x,c.z-t.pos.z)>6&&t.stamina>.25,d=r.mode==="cut"||i.full&&h;this.moveTo(t,c.x,c.z,d?t.sprintSpeed():t.jogSpeed(),d),n.owner&&!d&&this.face(t,n.pos.x,n.pos.z)}pickSpot(t){let e=this.m,i=e.ball,n=e.side(t.team),r=null,a=-1e9;for(let[o,l]of B_){if((o==="postL"||o==="postR")&&t.archetype!=="big"&&t.archetype!=="forward")continue;let c=l[0]*n,h=l[1]*n,d=Math.hypot(c-i.pos.x,h-i.pos.z),u=-Math.abs(Math.min(d,9)-5.5)*.6-Math.hypot(c-t.pos.x,h-t.pos.z)*.25;for(let g of e.teams[t.team].players){if(g===t)continue;let x=g.ai.mode==="space"||g.ai.mode==="cut"?g.ai.target:g.pos,m=Math.hypot(c-x.x,h-x.z);m<3.2&&(u-=(3.2-m)*2.5)}let f=Un(c,h,n);t.archetype==="shooter"&&f&&(u+=.8),(t.archetype==="big"||t.archetype==="forward")&&!f&&(u+=t.archetype==="big"?.6:.3),u+=e.rng.next()*.5,u>a&&(a=u,r=[c,h])}t.ai.target.set(r[0]+e.rng.gauss()*.3,0,r[1]+e.rng.gauss()*.3)}defend(t,e){let i=this.m,n=i.ball,r=t.ai,a=i.aiParams[t.team],o=i.rng;if(t.action&&(t.action.type==="steal"||t.action.type==="jump")&&t.airborne&&(t.handsUp=!0),this.rebounding(t))return;let l=i.side(i.offense),c=l*F.X,h=this.markOf(t)||i.teams[i.offense].players[0];r.obs||(r.obs=new Me(h.pos.x,0,h.pos.z));let d=a.react+(i.time<t.beatenUntil?.55:0),u=1-Math.exp(-e/Math.max(.02,d));r.obs.x+=(h.pos.x+h.vel.x*.12-r.obs.x)*u,r.obs.z+=(h.pos.z+h.vel.z*.12-r.obs.z)*u;let f=n.owner===h,g=c-r.obs.x,x=F.Z-r.obs.z,m=Math.hypot(g,x)||1,p,v,E=n.owner&&n.owner.team!==t.team?n.owner:null,y=!1;if(E&&!f&&Le(E.pos.x,E.pos.z,l)<4.6){let A=this.defenderOf(E);if((!A||Le(A.pos.x,A.pos.z,l)>Le(E.pos.x,E.pos.z,l)+.2||i.time<A.beatenUntil)&&this.isNearestHelper(t,E)){y=!0;let N=c-E.pos.x,H=F.Z-E.pos.z,L=Math.hypot(N,H)||1;p=E.pos.x+N/L*1,v=E.pos.z+H/L*1}}if(!y)if(f){let A=_t(1.3-.3*a.aggression-(Le(r.obs.x,r.obs.z,l)<4?.15:0),.9,1.3)+(this.inBackcourt(i.offense)?.9:0);p=r.obs.x+g/m*A,v=r.obs.z+x/m*A}else{let A=n.pos.z*h.pos.z<0?.42:.28,P=_t(m*A,1.1,3.4);p=r.obs.x+g/m*P,v=r.obs.z+x/m*P,p+=(n.pos.x-p)*.12,v+=(n.pos.z-v)*.12}if(i.full){let A=f?-4.5:-.8;l*p<A&&(p=l*A)}let S=Math.hypot(p-t.pos.x,v-t.pos.z),M=i.full&&l*t.pos.x<l*h.pos.x-1;t.stance=(f||y)&&S<2.2&&!t.airborne;let R=S>2.4||M&&S>1;this.moveTo(t,p,v,R?t.sprintSpeed():t.jogSpeed()*1.1,R),f||y?this.face(t,(E||h).pos.x,(E||h).pos.z):(!R||S<5)&&this.face(t,(n.pos.x+h.pos.x)/2,(n.pos.z+h.pos.z)/2);let b=E||(f?h:null),T=b&&b.action&&b.action.type==="shot"?b.action:null;if(T&&!T.released){let A=t.pos.distXZ(b.pos);if(A<2.6){t.handsUp=!0,this.moveTo(t,b.pos.x+(c-b.pos.x)*.12,b.pos.z+(F.Z-b.pos.z)*.12,t.sprintSpeed(),!0);let P=Le(b.pos.x,b.pos.z,l)<3;if(!t.airborne&&!t.action&&!r.blockTried&&T.kind!=="ft"&&(T.jumped||P)&&A<(P?1.9:1.25)){r.blockTried=!0;let N=(P?.6:.3)*a.contest*(.45+.55*(t.attrs.vertical+t.attrs.defense)/198);o.next()<N&&H_(()=>Fa(i,t),i,t,P?.02:.07)}}}else r.blockTried=!1;if(f&&!t.action&&n.state==="dribble"&&i.time>=t.stealReadyAt&&!this.inBackcourt(i.offense)&&this.decide(t,.32)&&t.pos.distXZ(h.pos)<1.35&&n.pos.y<.75){let P=Os(h.pos.x,h.pos.z,t.pos.x,t.pos.z,n.pos.x,n.pos.z),N=P.t>.05&&P.t<.95&&P.d<.25,H=_t(1.25-(h.attrs.handling-t.attrs.defense)/80,.45,1.4),L=(N?.04:i.full?.13:.2)*a.aggression*(.5+t.attrs.defense/99)*(i.full?H:1);o.next()<L&&Ec(i,t)}if(n.pass&&n.pass.team!==t.team&&n.state==="free"&&!t.action){let A=Os(t.pos.x,t.pos.z,n.pos.x,n.pos.z,n.pos.x+n.vel.x*.6,n.pos.z+n.vel.z*.6);A.d<1.6&&this.moveTo(t,n.pos.x+n.vel.x*A.t*.6,n.pos.z+n.vel.z*A.t*.6,t.sprintSpeed(),!0)}}isNearestHelper(t,e){let i=this.m,n=this.defenderOf(e),r=null,a=1e9;for(let o of i.teams[t.team].players){if(o===n||o.isHuman)continue;let l=o.pos.distXZ(e.pos);l<a&&(a=l,r=o)}return r===t&&a<4.5}inbound(t,e){let i=this.m,n=i.inb,r=i.ball;if(!n){t.desired.set(0,0,0);return}let a=i.side(n.team);if(t===n.inbounder){if(t.desired.set(0,0,0),this.face(t,0,0),r.owner!==t||t.action||i.phaseT<(n.kind==="baseline"?1:.7)||!this.decide(t,.22))return;let o=null,l=-1e9;for(let c of i.teams[t.team].players){if(c===t)continue;let h=c.pos.distXZ(t.pos);if(h<1.8||h>13)continue;let d=this.closestDefender(c).d,u=wc(i,t,c.pos.x,c.pos.z),f=Math.min(d,4)-u.risk*4-h*.08+c.attrs.handling/60;c.isHuman&&(f+=c.requestUntil>i.time?3:.6),f>l&&(l=f,o=c)}o&&(l>2.2||i.phaseT>3.2)&&Or(i,t,o);return}if(t.team===n.team){let o=this.inboundReceiver(n);if(t===o){let h=n.x,d=n.z,u,f;n.kind==="baseline"?(u=h-Math.sign(h)*3.6,f=_t(d*.5+(d>=0?1.4:-1.4),-5,5)):(u=h-a*1.6,f=d-Math.sign(d)*3.4),this.moveTo(t,u,f,t.jogSpeed()),this.face(t,h,d),t.requestUntil=i.time+.5;return}(this.decide(t,.8)||t.ai.mode!=="space")&&(t.ai.mode="space",this.pickSpot(t));let l=this.clampTarget(t.ai.target),c=Math.hypot(l.x-t.pos.x,l.z-t.pos.z)>6;this.moveTo(t,l.x,l.z,c?t.sprintSpeed():t.jogSpeed(),c);return}this.defend(t,e)}inboundReceiver(t){let e=this.m,i=e.teams[t.team].players,n=i.find(o=>o.isHuman&&o!==t.inbounder);if(n&&n.requestUntil>e.time)return n;if(t.recv&&t.recv!==t.inbounder&&!(t.recv.isHuman&&t.recv.requestUntil<e.time-3))return t.recv;let r=null,a=-1e9;for(let o of i){if(o===t.inbounder||o.isHuman)continue;let l=o.attrs.handling-o.pos.distXZ(t.inbounder.pos)*2;l>a&&(a=l,r=o)}return t.recv=r||n,t.recv}predictRebound(){let t=this.m,e=t.ball;if(this.rebAt=t.time,this.reb=null,e.state!=="free"||e.pass)return;let i=null;Qp(e,2.2,1/30,(n,r,a)=>a.y<0&&r.y<2.7||r.y<Et+.05?(i={x:r.x,y:r.y,z:r.z,t:n},!1):!0),i||(i={x:e.pos.x,y:e.pos.y,z:e.pos.z,t:.5}),this.reb=i}rebounding(t){let e=this.m,i=e.ball;if(i.state!=="free"||i.pass||!this.reb)return!1;let n=i.shot,r=this.reb,a=t.team,o=e.teams[a].players.filter(m=>!m.isHuman||!0);o.sort((m,p)=>Math.hypot(m.pos.x-r.x,m.pos.z-r.z)-Math.hypot(p.pos.x-r.x,p.pos.z-r.z));let l=o.indexOf(t),c=n&&!n.done&&!n.rim&&!n.board,h=e.full?n&&n.side!=null?n.side:e.side(e.offense):1;if(e.full&&!n&&l>0&&Math.hypot(r.x-t.pos.x,r.z-t.pos.z)>6)return!1;if(c&&a!==n.team){let m=this.markOf(t);if(m){let p=h*F.X-m.pos.x,v=F.Z-m.pos.z,E=Math.hypot(p,v)||1,y=m.pos.x+p/E*.7,S=m.pos.z+v/E*.7;return this.moveTo(t,y,S,t.jogSpeed()),this.face(t,i.pos.x,i.pos.z),t.handsUp=t.pos.distXZ(n.shooter.pos)<2,!0}}if(l>1&&!(c&&a===n.team&&l===2)){if(a===e.offense){let[m,p]=Xl("top",h),v=e.full&&(t.archetype==="guard"||t.archetype==="shooter")?h*3.5:m+h*1;return this.moveTo(t,v,p,t.jogSpeed()),this.face(t,i.pos.x,i.pos.z),!0}return!1}let d=Math.max(0,r.t-.15),u=r.x,f=r.z,g=this.moveTo(t,u,f,t.sprintSpeed(),!0);this.face(t,i.pos.x,i.pos.z);let x=Math.hypot(i.pos.x-t.pos.x,i.pos.z-t.pos.z);return!t.airborne&&!t.action&&i.vel.y<1&&i.pos.y>ve.REACH-.1&&i.pos.y<ve.REACH+t.jumpHeight()+.2&&x<1&&(!n||n.rim||n.board||n.done)&&(rn(t,e.time,t.jumpHeight()*.9),t.action={type:"jump",t:0}),t.airborne&&(t.handsUp=!0),!0}drift(t,e){let i=this.m;if(i.time<t.celebrateUntil){t.desired.set(0,0,0);return}if(i.full){this.transition(t);return}let n=_t(t.pos.x-.6,3,12),r=t.pos.z*.9;this.moveTo(t,n,r,1.4)}transition(t){let e=this.m,i=e.next;if(!i||i.type!=="inbound"){t.desired.set(0,0,0);return}if(i.inbounder===t){this.moveTo(t,i.x,i.z,t.sprintSpeed(),!0);return}let n=e.side(i.team);if(t.team===i.team){let r=_t(t.pos.x+n*2.5,-Nt.HL+2,Nt.HL-2);this.moveTo(t,r,t.pos.z*.9,t.jogSpeed()*.7)}else{let r=n*_t(n*t.pos.x+3,2,9),a=t.pos.z*.8;this.moveTo(t,r,a,t.jogSpeed())}}ftShooter(t){let e=this.m,i=e.ft;if(!(!i||i.shooter!==t||i.released||t.action)&&e.phaseT>1.1&&e.ball.owner===t&&e.ball.state==="held"){let n=e.aiParams[t.team],r=Fn(e,t,"ft",0,0),a=(.04+.06*(1-t.attrs.shooting/99))*n.timing;hs(e,t,{kind:"ft",releaseCharge:_t(r.c+e.rng.gauss()*a,.2,1)}),t.action&&(t.action.ai=!0)}}practice(t,e){let i=this.m,n=i.ball;if(t.drill){t.drill(t,e);return}if(n.owner===t){n.state==="held"&&!t.action&&i.human&&i.time-(t.gainT??0)>.55&&Wi(i,t)&&Gi(i,t)&&Or(i,t,i.human),t.desired.set(0,0,0),i.human&&this.face(t,i.human.pos.x,i.human.pos.z);return}if(n.owner==null&&n.state==="free"&&!n.pass){let a=this.reb||{x:n.pos.x,z:n.pos.z};this.moveTo(t,a.x,a.z,t.sprintSpeed(),!0);return}let r=t.ai.home||(t.ai.home=new Me(F.X-1.6,0,0));this.moveTo(t,r.x,r.z,t.jogSpeed()),i.human&&this.face(t,i.human.pos.x,i.human.pos.z)}};function z_(s,t){let e=s.vel.y,i=s.pos.y,n=t.pos.y+1.4,r=.12,a=e*e+2*9.81*(i-n);a>0&&(r=Math.max(.05,(e+Math.sqrt(a))/9.81)),s.pass&&s.pass.kind==="bounce"&&(r=Math.min(r,.25));let o=s.pos.x+s.vel.x*r,l=s.pos.z+s.vel.z*r;return{x:o,z:l,t:r,far:Math.hypot(o-t.pos.x,l-t.pos.z)>1.5}}function H_(s,t,e,i){e.ai.pending={fn:s,at:t.time+i}}function V_(s){for(let t of s.players){let e=t.ai.pending;e&&s.time>=e.at&&(t.ai.pending=null,e.fn())}}var Gs={rookie:{label:"Rookie",window:1.4,steal:1.3,stealVsHuman:.45,passErr:.6,aiFoul:.75,catchR:1.1,ai:{react:.34,shot:.8,aggression:.55,bite:1.3,timing:1.6,intercept:.55,contest:.7}},pro:{label:"Pro",window:1,steal:1,stealVsHuman:.7,passErr:1,aiFoul:1,catchR:1,ai:{react:.22,shot:1,aggression:.85,bite:1,timing:1,intercept:.85,contest:1}},allstar:{label:"All-Star",window:.8,steal:.85,stealVsHuman:.95,passErr:1.1,aiFoul:1,catchR:.95,ai:{react:.14,shot:1.12,aggression:1,bite:.7,timing:.7,intercept:1.05,contest:1.1}}},G_={react:.2,shot:1,aggression:.85,bite:.9,timing:.9,intercept:.9,contest:1},hm=new Me,Pc=new Me,Ic=[0,0,0],Lc=class{constructor(t){this.cfg=t,this.rules=t.rules!==!1,this.rng=new cn(t.seed||1),this.events=new _c,this.difficulty=Gs[t.difficulty]||Gs.pro,this.assist=this.difficulty,this.ball=new Da,this.players=[],this.teams=t.teams.map((i,n)=>({...i,index:n,score:0,fouls:0,players:[]}));let e=null;this.teams.forEach((i,n)=>{i.roster.forEach((r,a)=>{let o=new jl({...r,team:n,slot:a});this.players.push(o),i.players.push(o),o.isHuman&&(e=o)})}),this.human=e,this.humanTeam=e?e.team:-1,this.aiParams=this.teams.map((i,n)=>n===this.humanTeam?G_:this.difficulty.ai),this.time=0,this.phase="intro",this.phaseT=0,this.full=t.court==="full",this.dirs=this.full?[1,-1]:[1,1],this.period=1,this.quarterLen=t.quarter||180,this.otLen=t.ot||Math.max(60,this.quarterLen/2),this.clockLen=this.full?this.quarterLen:t.clock||300,this.clock=this.clockLen,this.target=this.full?1/0:t.target||21,this.shotLen=this.full?zi.SHOT_CLOCK:vi.SHOT_CLOCK,this.shotClock=this.shotLen,this.shotClockOn=this.rules&&t.shotClock!==!1,this.frontcourt=!1,this.backcourtT=0,this.inb=null,this.inbPending=!1,this.tip=null,this.arrow=null,this.offense=0,this.mustClear=null,this.overtime=!1,this.possessions=0,this.checker=null,this.next=null,this.ft=null,this.pendingSteal=null,this.lastPass=null,this.skipRequested=!1,this.winner=null,this.stats=new Rc(this),this.ai=new Cc(this),this.humanCtl=null,this.ball.cb={score:(i,n)=>this.onBasket(n),hit:(i,n,r)=>this.onBallHit(n,r),body:(i,n,r)=>this.events.emit("deflect",{player:n,speed:r,t:this.time})}}side(t){return this.dirs[t]??1}hoopX(t){return this.side(t)*F.X}teamAttacking(t){return this.dirs[0]===t?0:this.dirs[1]===t?1:this.offense}localX(t,e){return this.side(t)*e}get periodLabel(){if(!this.full)return this.overtime?"OT":"";let t=zi.QUARTERS;return this.period<=t?`Q${this.period}`:this.period===t+1?"OT":`OT${this.period-t}`}get inOvertime(){return this.full?this.period>zi.QUARTERS:this.overtime}isOpp(t){return this.human&&t.team!==this.human.team}teamOf(t){return this.teams[t]}get scoreline(){return[this.teams[0].score,this.teams[1].score]}get displayClock(){if(this.overtime&&!this.full)return"OT";let t=Math.max(0,this.clock);if(t<10)return t.toFixed(1);let e=Math.ceil(t);return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}get displayShot(){return String(Math.max(0,Math.ceil(this.shotClock)))}requestSkip(){this.skipRequested=!0}setPhase(t){this.phase=t,this.phaseT=0,this.skipRequested=!1}place(t,e,i,n){Cu(t),t.pos.set(e,0,i),t.prevPos.copy(t.pos),t.yaw=t.prevYaw=n??$t(this.hoopX(t.team)-e,F.Z-i),t.gait=t.prevGait=0}start(t){let e=t??(this.rng.next()<.5?0:1);if(this.events.emit("tipoff",{team:e,t:this.time}),!this.rules){this.setPhase("live");return}if(this.full){this.startTip();return}this.startCheck(e,!0)}jumperOf(t){let e=null,i=-1;for(let n of this.teams[t].players){let r=n.attrs.vertical+(n.archetype==="big"?30:n.archetype==="forward"?12:0)-(n.isHuman&&n.archetype!=="big"?100:0);r>i&&(i=r,e=n)}return e}startTip(){this.setPhase("tip");let t=this.jumperOf(0),e=this.jumperOf(1);this.tip={jumpers:[t,e],t:0,tossed:!1,won:null},this.offense=0;for(let n of[0,1]){let r=this.side(n),a=n===0?t:e;this.place(a,-r*.42,0,$t(r,0));let o=[[2.2,2.2],[-2.4,-3.6],[2.6,-2.6],[-7,.8]],l=0;for(let c of this.teams[n].players){if(c===a)continue;let[h,d]=o[l++%o.length];this.place(c,r*h,r*d,$t(-r*h,-r*d))}}let i=this.ball;i.owner=null,i.shot=null,i.pass=null,i.ignore=null,i.state="dead",i.place(0,1.9,0),this.events.emit("snap",{t:this.time}),this.events.emit("tip",{jumpers:[t,e],t:this.time})}updateTip(t){let e=this.tip,i=this.ball;if(e){if(e.t+=t,!e.tossed){if(e.t>(this.human?1.6:.8)){e.tossed=!0,e.tossT=this.time,i.state="free",i.release(0,6.4,0),i.lastTouch=null,this.events.emit("toss",{t:this.time});for(let n of e.jumpers){if(n.isHuman)continue;let r=2.36+n.jumpHeight(),a=6.4/9.81+Math.sqrt(Math.max(0,2*(2.09+1.9-r))/9.81),o=Math.sqrt(2*n.jumpHeight()/9.81);n.ai.tipJumpAt=this.time+a-o+this.rng.gauss()*.07*this.aiParams[n.team].timing}}return}for(let n of e.jumpers)!n.isHuman&&n.ai.tipJumpAt!=null&&this.time>=n.ai.tipJumpAt&&!n.airborne&&(n.ai.tipJumpAt=null,rn(n,this.time),n.action={type:"jump",t:0},this.events.emit("jump",{player:n,t:this.time}));if(i.vel.y<.5){let n=null,r=-1;for(let a of e.jumpers){let o=a.pos.y+2.36+.1,l=Math.hypot(i.pos.x-a.pos.x,i.pos.z-a.pos.z);if(i.pos.y<=o+.06&&i.pos.y>o-.45&&l<.75){let c=o+this.rng.next()*.04;c>r&&(r=c,n=a)}}if(n){this.tapTo(n);return}}i.pos.y<1.6&&i.vel.y<0&&(this.tip=null,this.goLiveLoose(null))}}tapTo(t){let e=this.ball,i=this.side(t.team),n=null,r=1e9;for(let u of this.teams[t.team].players){if(u===t)continue;let f=u.pos.distXZ(t.pos)+(this.localX(t.team,u.pos.x)>.5?1.5:0)+this.rng.next()*1.2;f<r&&(r=f,n=u)}let a=n?n.pos.x:-i*3,o=n?n.pos.z:0,l=a-e.pos.x,c=o-e.pos.z,h=Math.hypot(l,c)||1,d=Math.min(6.5,h/.55);e.state="free",e.vel.set(l/h*d,.8,c/h*d),e.lastTouch={player:t,team:t.team,t:this.time},this.tip=null,this.events.emit("tapped",{player:t,to:n,t:this.time}),this.goLiveLoose(t.team)}goLiveLoose(t){this.offense=t??this.offense,this.shotClock=this.shotLen,this.frontcourt=!1,this.backcourtT=0,this.tipLoose=!0,this.setPhase("live"),this.events.emit("live",{team:this.offense,t:this.time})}sidelineSpot(t,e){return{x:_t(t,-Nt.HL+1.2,Nt.HL-1.2),z:(e>=0?1:-1)*(Nt.HW+.4),kind:"sideline"}}baselineSpot(t,e=1.5){let i=Math.abs(e)<1.4?e>=0?1.5:-1.5:_t(e,-Nt.HW+.8,Nt.HW-.8);return{x:t*(Nt.HL+.45),z:i,kind:"baseline"}}outSpot(t,e){return Math.abs(t)>=Nt.HL-.05&&Math.abs(e)<Nt.HW-.4?this.baselineSpot(t>=0?1:-1,e):this.sidelineSpot(t,e)}inboundNext(t,e,i={}){return{type:"inbound",team:t,x:e.x,z:e.z,kind:e.kind,...i}}pickInbounder(t,e,i){let n=null,r=1e9,a=this.teams[t].players;for(let o of a){if(o.isHuman&&a.length>1)continue;let l=Math.hypot(o.pos.x-e,o.pos.z-i);l<r&&(r=l,n=o)}return n}startInbound(t,e,i,n="sideline",r={}){let a=t!==this.offense||r.newPoss;this.setPhase("inbound"),a?(this.possessions++,this.shotClock=this.shotLen,this.frontcourt=!1,this.backcourtT=0,this.lastPass=null):this.localX(t,e)>0&&(this.shotClock=Math.max(this.shotClock,zi.OREB_CLOCK)),this.offense=t,this.mustClear=null;let o=r.inbounder&&r.inbounder.team===t&&!r.inbounder.isHuman?r.inbounder:this.pickInbounder(t,e,i);Cu(o),o.pos.set(e,0,i),o.yaw=$t(-e*(n==="baseline"?1:.15),-i*(n==="baseline"?.2:1)),o.prevYaw=o.yaw,this.inb={team:t,x:e,z:i,kind:n,inbounder:o,t:0,released:!1};let l=this.ball;l.shot=null,l.pass=null,l.ignore=null,l.owner=o,l.pos.set(o.pos.x+Math.sin(o.yaw)*.36,ve.HOLD_Y,o.pos.z+Math.cos(o.yaw)*.36),l.prevPos.copy(l.pos),l.vel.set(0,0,0),l.w.set(0,0,0),Tn(this,o),l.state="held",r.snap&&this.events.emit("snap",{t:this.time}),this.events.emit("inbound",{team:t,player:o,kind:n,newPoss:a,t:this.time})}updateInbound(t){let e=this.inb,i=this.ball;if(!e)return;e.t+=t;let n=e.inbounder;if(i.state==="free"&&i.pass&&i.pass.passer===n){e.released=!0,this.inb=null,this.inbPending=!0,this.setPhase("live"),this.events.emit("live",{team:this.offense,t:this.time});return}if(i.owner!==n){this.inb=null,this.setPhase("live");return}e.t>zi.INBOUND&&!(n.action&&n.action.type==="pass")&&(this.events.emit("fiveSeconds",{team:e.team,t:this.time}),this.turnover(e.team,"fiveSec",n,{x:e.x,z:e.z,kind:e.kind}))}endOfPeriod(){if(this.phase==="over"||this.phase==="break")return;this.events.emit("buzzer",{t:this.time});let[t,e]=this.scoreline;if(this.period>=zi.QUARTERS&&t!==e){this.finish();return}let i=this.ball;if(i.owner){let n=i.owner;n.action&&n.action.type!=="jump"&&(n.action=null),n.dribble=null}i.state!=="free"&&(i.state="free",i.owner=null,i.vel.scale(.3)),i.shot=null,i.pass=null,this.inb=null,this.inbPending=!1,this.ft=null;for(let n of this.players)n.action&&n.action.type!=="jump"&&(n.action=null),n.stance=!1,n.handsUp=!1;this.events.emit("periodEnd",{period:this.period,half:this.period===2,ot:this.period>=zi.QUARTERS,t:this.time}),this.setPhase("break"),this.next={type:"period"}}startPeriod(){this.period++;let t=this.period>zi.QUARTERS;if(this.clockLen=t?this.otLen:this.quarterLen,this.clock=this.clockLen,!t)for(let n of this.teams)n.fouls=0;this.period===3&&(this.dirs=[-this.dirs[0],-this.dirs[1]]);let e=this.arrow??0;this.arrow=1-e,this.events.emit("periodStart",{period:this.period,ot:t,team:e,label:this.periodLabel,t:this.time}),this.placeFormation(e);let i={x:0,z:Nt.HW+.4,kind:"centre"};this.startInbound(e,i.x,i.z,"centre",{newPoss:!0,inbounder:this.formationInbounder,snap:!0})}placeFormation(t){let e=this.side(t),i=this.teams[t].players,n=this.teams[1-t].players,r=this.pickInbounder(t,0,Nt.HW);this.formationInbounder=r;let a=[[-2.2,4.4],[3,3.6],[6.6,-1.2],[3.4,-4.2],[8.5,3.6]],o=0,l=[...i.filter(h=>h.isHuman),...i.filter(h=>!h.isHuman&&h!==r)];for(let h of l){let[d,u]=a[o++%a.length];this.place(h,e*d,u,$t(0-e*d,Nt.HW-u))}this.place(r,0,Nt.HW+.4);let c=this.ai.assignMarks(t,r);for(let h of n){let d=c.get(h)||i[0],u=e*F.X-d.pos.x,f=-d.pos.z,g=Math.hypot(u,f)||1,x=d===r?2.6:1.6;this.place(h,d.pos.x+u/g*x,_t(d.pos.z+f/g*x,-Nt.HW+.5,Nt.HW-.5),$t(-u,-f))}}startCheck(t,e=!1){this.setPhase("check"),this.offense=t,this.mustClear=null,this.shotClock=vi.SHOT_CLOCK,this.possessions++;let i=this.teams[t].players,n=this.teams[1-t].players,r=this.human,a=r&&r.team===t?r:i[(this.possessions>>1)%i.length];this.checker=a;let o=i.filter(f=>f!==a),[l,c]=fe.top;this.place(a,l,c);let h=[fe.wingL,fe.wingR];o.forEach((f,g)=>this.place(f,h[g%2][0]+(this.rng.next()-.5)*.6,h[g%2][1]));let d=this.ai.assignMarks(t,a);for(let f of n){let g=d.get(f)||a,x=g===a?1.8:2.6,m=F.X-g.pos.x,p=F.Z-g.pos.z,v=Math.hypot(m,p)||1;this.place(f,g.pos.x+m/v*x,g.pos.z+p/v*x,$t(-m,-p))}let u=this.ball;u.shot=null,u.pass=null,u.ignore=null,u.owner=a,u.pos.set(a.pos.x+Math.sin(a.yaw)*.36,ve.HOLD_Y,a.pos.z+Math.cos(a.yaw)*.36),u.prevPos.copy(u.pos),u.vel.set(0,0,0),u.w.set(0,0,0),Tn(this,a),u.state="held",this.events.emit("snap",{t:this.time}),this.events.emit("check",{team:t,player:a,first:e,t:this.time})}goLive(){this.setPhase("live"),this.events.emit("live",{team:this.offense,t:this.time})}whistle(t,e,i={}){if(this.phase==="over")return;this.setPhase("dead"),this.next=e;let n=this.ball;if(n.owner){let r=n.owner;r.action&&r.action.type!=="jump"&&(r.action=null),r.dribble=null}n.state!=="free"&&(n.state="free",n.owner=null,n.vel.scale(.3)),n.shot=null,n.pass=null,this.events.emit("whistle",{reason:t,t:this.time,...i})}turnover(t,e,i=null,n=null){if(i&&this.stats.add(i,"tov"),this.events.emit("turnover",{team:t,reason:e,player:i,t:this.time}),this.full){let r=this.ball,a=n||this.sidelineSpot(r.pos.x,r.pos.z);this.whistle(e,this.inboundNext(1-t,a),{team:t});return}this.whistle(e,{type:"check",team:1-t},{team:t})}foul(t,e,i){if(this.phase!=="live"||!this.rules)return;let n=this.teams[t.team];if(n.fouls++,this.stats.add(t,"pf"),this.events.emit("foul",{player:t,victim:e,kind:i,t:this.time,teamFouls:n.fouls}),i==="shooting")return;let r=n.fouls>=(this.full?zi.BONUS_FOULS:vi.BONUS_FOULS),a=this.full?this.inboundNext(e.team,this.sidelineSpot(e.pos.x,e.pos.z)):{type:"check",team:e.team};this.whistle("foul",r?{type:"ft",shooter:e,n:2}:a,{foul:!0,bonus:r})}step(t){this.time+=t,this.phaseT+=t;let e=this.ball;e.beginStep();let i=this.time,n=this.phase==="live",r=this.phase==="check"||this.phase==="ft"||this.phase==="intro"||this.phase==="over"||this.phase==="tip"||this.phase==="break",a=this.phase==="inbound"&&this.inb?this.inb.inbounder:null;this.humanCtl&&this.humanCtl.update(t),this.ai.update(t);for(let o of this.players)cm(this,o,t);for(let o of this.players)(r||o===a)&&(o.desired.set(0,0,0),o.sprint=!1,o.airborne||o.vel.set(0,0,0)),kp(o,t,i,e.owner===o);Np(this.players,i,e.owner),a&&this.inb&&(a.pos.x=this.inb.x,a.pos.z=this.inb.z);for(let o of this.players)Dp(o,this.full);e.owner&&(e.state==="held"||e.state==="dribble")?this.updateCarried(e.owner,t):e.state==="free"&&e.step(t,i,this.players),e.net.amp>0&&(e.net.amp=Math.max(0,e.net.amp-t*.5)),n&&(this.updatePossession(),this.checkBlocks(),this.checkShootingFouls(),this.rulesLive(t)),this.updatePhase(t),this.stats.update(t)}updateCarried(t,e){let i=this.ball;if(i.state==="dribble"){let n=t.dribble;if(!n||t.airborne){Tn(this,t),Ua(this,t,e);return}let r=n.t;if(n.t+=e,r<n.td&&n.t>=n.td&&this.events.emit("bounce",{player:t,x:i.pos.x,z:i.pos.z,dribble:!0,t:this.time}),t.gatherPending){Bu(t,Ic);let a=n.t>=n.td;if(Ic[2]>.58&&(a||n.t<n.td*.35)){Tn(this,t),Ua(this,t,e);return}}if(n.t>=n.T){if(t.gatherPending){Tn(this,t),Ua(this,t,e);return}Fu(t,this.ai.pressureLow(t)),n.cross&&lm(this,t)}Bu(t,Ic),Mc(t,Ic,Pc),i.setKinematic(Pc.x,Pc.y+t.pos.y,Pc.z,e);return}Ua(this,t,e)}gainBall(t,e){let i=this.ball,n=this.time,r=this.offense,a=i.shot,o=i.pass,l=i.lastTouch;t.action&&t.action.type!=="jump"&&t.action.type!=="celebrate"&&(t.action=null),Tn(this,t),i.owner=t,i.state="held",i.shot=null,i.pass=null,i.lastTouch={player:t,team:t.team,t:n},t.gainT=n,this.inbPending=!1,this.tipLoose=!1,this.full&&this.arrow==null&&(this.arrow=1-t.team),a&&!a.done&&this.resolveMiss(a),a&&(this.stats.add(t,t.team===a.team?"oreb":"dreb"),this.events.emit("rebound",{player:t,offensive:t.team===a.team,t:n})),o&&(o.team===t.team&&o.passer!==t?(this.stats.add(o.passer,"pcmp"),this.lastPass={passer:o.passer,receiver:t,t:n}):o.team!==t.team&&(this.stats.add(t,"stl"),this.stats.add(o.passer,"tov"),this.events.emit("interception",{player:t,victim:o.passer,t:n}))),this.pendingSteal&&n-this.pendingSteal.t<2&&t.team===this.pendingSteal.player.team&&(this.stats.add(this.pendingSteal.player,"stl"),this.stats.add(this.pendingSteal.victim,"tov"),this.events.emit("steal",{player:this.pendingSteal.player,victim:this.pendingSteal.victim,t:n})),this.pendingSteal=null,t.team!==r?(this.offense=t.team,this.shotClock=this.shotLen,this.lastPass=null,this.rules&&this.phase==="live"&&!this.full&&(this.mustClear=Un(t.pos.x,t.pos.z)?null:t.team),this.frontcourt=!1,this.backcourtT=0,this.possessions++,this.events.emit("possession",{team:t.team,player:t,how:e,t:n})):(a&&(a.rim||a.board)&&(this.shotClock=this.full?Math.max(this.shotClock,zi.OREB_CLOCK):vi.SHOT_CLOCK),(a||l&&l.team!==t.team)&&(this.frontcourt=!1,this.backcourtT=0)),this.full&&this.localX(t.team,t.pos.x)>.12&&(this.frontcourt=!0),this.events.emit("gain",{player:t,how:e,t:n})}updatePossession(){let t=this.ball,e=this.time;if(t.state!=="free")return;let i=t.shot,n=t.pass;if(i&&!i.rim&&!i.board&&!i.blocked&&!i.done&&t.pos.y>2)return;let a=null,o=1e9;for(let l of this.players){if(e<l.noCatchUntil||l.action&&l.action.type==="shot"&&!l.action.released)continue;let c=t.pos.x-l.pos.x,h=t.pos.z-l.pos.z,d=Math.hypot(c,h),u=l.pos.y+ve.REACH+.12;if(t.pos.y>u||t.pos.y<l.pos.y-.2)continue;let f=l.isHuman?vi.HUMAN_PICKUP_R*this.assist.catchR:vi.PICKUP_R;if(n&&n.target===l&&(f=Math.max(f,.9)),t.pos.y>l.pos.y+2&&(f*=.75),!(d>f||Math.hypot(t.vel.x-l.vel.x,t.vel.y,t.vel.z-l.vel.z)>14)){if(n&&n.team!==l.team&&!l.isHuman){if(n.tried.has(l))continue;n.tried.add(l);let x=_t(.3+l.attrs.defense/260,.2,.75)*this.aiParams[l.team].intercept*(e<l.beatenUntil?.3:1)*_t(1.25-d/f,.35,1);if(this.rng.next()>x){d<.45&&(t.vel.x*=.55,t.vel.z*=.55,t.vel.y=Math.abs(t.vel.y)*.3+.5,t.pass=null,t.lastTouch={player:l,team:l.team,t:e},this.events.emit("deflect",{player:l,t:e}));continue}}(d<o-1e-6||Math.abs(d-o)<=1e-6&&a&&l.id<a.id)&&(a=l,o=d)}}a&&this.gainBall(a,n?n.team===a.team?"catch":"interception":i?"rebound":"loose")}checkBlocks(){let t=this.ball,e=this.time;for(let i of this.players){if(i.team===this.offense||!i.airborne&&!i.handsUp||(om(i,hm),hm.dist(t.pos)>.32))continue;let r=t.shot&&!t.owner?t.shot:t.owner&&t.owner.action;if(!r||r.tried&&r.tried.has(i))continue;(r.tried||(r.tried=new Set)).add(i);let a=(i.attrs.vertical+i.attrs.defense)/198,o=t.pos.x>=0?1:-1,l=Le(t.pos.x,t.pos.z,o)<2.6,c=i.isHuman?.3+.25*a:(.08+.24*a)*(l?1.3:.75)*this.aiParams[i.team].contest;if(i.airborne&&i.vy<-1.5&&(c*=.35),this.rng.next()>c)continue;let h=t.owner;if(h&&h.team!==i.team&&h.action&&h.action.type==="shot"&&!h.action.released&&t.pos.y>1.95){if(h.action.blockedBy)continue;let u=t.pos.x-i.pos.x,f=t.pos.z-i.pos.z,g=Math.hypot(u,f)||1;h.action=null,h.dribble=null,t.release(u/g*3+this.rng.gauss()*.8,-1.5,f/g*3+this.rng.gauss()*.8),t.lastTouch={player:i,team:i.team,t:e},t.ignore=h,t.ignoreUntil=e+.4,h.noCatchUntil=e+.4,t.shot={shooter:h,team:h.team,kind:"blocked",value:0,t:e,rim:!1,board:!1,blocked:!0,done:!0},this.stats.add(i,"blk"),this.stats.add(h,"fga"),this.events.emit("block",{player:i,victim:h,t:e});return}let d=t.shot;if(d&&!d.blocked&&!d.rim&&!d.board&&t.state==="free"&&e-d.t<1.2&&d.team!==i.team){if(t.vel.y<0&&t.pos.y>F.Y&&Le(t.pos.x,t.pos.z,o)<1.6){this.events.emit("goaltend",{player:i,t:e}),d.goaltend=!0,this.awardBasket(d,!0);return}d.blocked=!0,d.done=!0;let u=Math.sin(i.yaw),f=Math.cos(i.yaw);t.vel.set(u*3.2-t.vel.x*.15+this.rng.gauss()*.7,-1.2-this.rng.next()*.5,f*3.2-t.vel.z*.15+this.rng.gauss()*.7),t.lastTouch={player:i,team:i.team,t:e},this.stats.add(i,"blk"),this.events.emit("block",{player:i,victim:d.shooter,t:e});return}}}checkShootingFouls(){for(let t of this.players){let e=t.action;if(!(!e||e.type!=="shot"||e.fouledBy||e.kind==="ft")&&!(e.released&&this.time-(e.t0+e.rt)>.15))for(let i of this.players){if(i.team===t.team)continue;let n=i.pos.distXZ(t.pos);if(n>.8)continue;let r=i.vel.x-t.vel.x,a=i.vel.z-t.vel.z,o=-(r*(i.pos.x-t.pos.x)+a*(i.pos.z-t.pos.z))/(n||1);if(!(i.airborne||o>1.2||i.handsUp&&n<.7))continue;e.fouledBy=i;let l=e.kind==="layup"||e.kind==="dunk",c=(i.isHuman?.42:.24*this.assist.aiFoul)*(i.airborne?1.25:1)*(l?1.3:.6)*(n<.6?1.2:1);this.rng.next()<c&&(e.foul=i,e.released&&this.ball.shot&&this.ball.shot.shooter===t&&(this.ball.shot.foul=i),this.foul(i,t,"shooting"))}}}onBallHit(t,e){let i=this.ball,n=i.shot,r=this.time;n&&!n.done&&(t==="rim"&&(n.rim=!0),t==="board"&&(n.board=!0),t==="floor"&&this.resolveMiss(n)),this.events.emit("hit",{kind:t,speed:e,x:i.pos.x,y:i.pos.y,z:i.pos.z,t:r})}onBasket(t=1){let e=this.ball,i=e.shot;if(this.full&&i&&i.side!=null&&i.side!==t&&(i=null),this.phase==="ft"&&this.ft){this.teams[this.ft.shooter.team].score+=1,this.stats.add(this.ft.shooter,"ftm"),this.stats.add(this.ft.shooter,"pts",1),i&&(i.done=!0),this.ft.made=!0,this.events.emit("basket",{team:this.ft.shooter.team,value:1,player:this.ft.shooter,kind:"ft",t:this.time,pos:e.pos.clone()});return}if(this.phase!=="live"){this.events.emit("swish",{t:this.time});return}if(i&&!i.done){this.awardBasket(i,!1);return}if(!i){let n=e.lastTouch,r=this.full?this.teamAttacking(t):this.offense,a=n&&n.team===r?n.player:null;e.shot&&(e.shot.done=!0),this.awardBasket({shooter:a,team:r,side:t,kind:"tip",value:2,t:this.time,foul:null},!1)}}awardBasket(t,e){let i=this.ball,n=this.time;t.done=!0;let r=t.team;if(this.rules&&this.mustClear===r&&t.kind!=="ft"){this.events.emit("notCleared",{team:r,t:n}),t.shooter&&this.stats.add(t.shooter,"fga"),this.turnover(r,"notCleared",t.shooter);return}let a=t.kind==="tip"?2:t.value;this.teams[r].score+=a,t.shooter&&(this.stats.add(t.shooter,"pts",a),t.kind==="ft"?this.stats.add(t.shooter,"ftm"):t.kind!=="tip"&&(this.stats.add(t.shooter,"fga"),this.stats.add(t.shooter,"fgm"),a===3&&(this.stats.add(t.shooter,"tpa"),this.stats.add(t.shooter,"tpm"))));let o=null,l=this.lastPass;if(l&&t.shooter&&l.receiver===t.shooter&&n-l.t<6&&t.t-l.t<4.5&&(o=l.passer,this.stats.add(o,"ast")),this.lastPass=null,this.events.emit("basket",{team:r,value:a,player:t.shooter,assist:o,kind:t.kind,goaltend:e,grade:t.grade,t:n,pos:i.pos.clone(),andOne:!!t.foul}),t.shooter&&(t.shooter.celebrateUntil=n+1.4),i.shot=null,!!this.rules){if(t.foul){this.setPhase("scored"),this.next={type:"ft",shooter:t.shooter,n:1};return}if(this.setPhase("scored"),this.full){let c=this.baselineSpot(t.side??this.side(r),i.pos.z);this.next=this.inboundNext(1-r,c,{inbounder:this.pickInbounder(1-r,c.x,c.z)});return}this.next={type:"check",team:1-r},(this.teams[r].score>=this.target||this.overtime)&&(this.next={type:"over"})}}resolveMiss(t){if(!t.done){if(t.done=!0,t.kind==="ft"){this.ft&&this.phase==="ft"&&(this.ft.missed=!0),this.events.emit("miss",{player:t.shooter,ft:!0,t:this.time});return}t.kind!=="blocked"&&t.kind!=="tip"&&(this.stats.add(t.shooter,"fga"),t.value===3&&this.stats.add(t.shooter,"tpa")),this.events.emit("miss",{player:t.shooter,airball:!t.rim&&!t.board,t:this.time}),t.foul&&this.phase==="live"?this.whistle("shootingFoul",{type:"ft",shooter:t.shooter,n:t.value},{foul:!0}):!t.rim&&!t.board&&this.shotClock<=0&&this.phase==="live"&&this.turnover(t.team,"shotClock")}}rulesLive(t){let e=this.ball,i=this.time;if(!this.rules)return;this.mustClear!=null&&e.owner&&e.owner.team===this.mustClear&&Un(e.owner.pos.x,e.owner.pos.z)&&(this.mustClear=null,this.events.emit("cleared",{team:e.owner.team,t:i}));let n=this.full;if(e.state==="free"&&e.pos.y<Et+.03&&!wu(e.pos.x,e.pos.z,-Et*.5,n)){let a=e.lastTouch;if(e.shot&&!e.shot.done&&this.resolveMiss(e.shot),this.phase==="live"){this.turnover(a?a.team:1-this.offense,"out",null,n?this.outSpot(e.pos.x,e.pos.z):null);return}}if(e.state==="free"&&((n?Math.abs(e.pos.x)>15.5:e.pos.x>15.5||e.pos.x<-2)||Math.abs(e.pos.z)>9.5)){let a=e.lastTouch;this.turnover(a?a.team:1-this.offense,"out",null,n?this.outSpot(e.pos.x,e.pos.z):null);return}let r=e.owner;if(r&&!r.airborne&&!wu(r.pos.x,r.pos.z,-.12,n)){this.turnover(r.team,"out",r,n?this.outSpot(r.pos.x,r.pos.z):null);return}if(!(this.inbPending||this.tipLoose)){if(n&&r&&r.team===this.offense&&!r.airborne){let a=this.localX(r.team,r.pos.x);if(this.frontcourt){if(a<-.12){this.events.emit("backcourt",{team:r.team,t:i}),this.turnover(r.team,"backcourt",r);return}}else if(a>.12)this.frontcourt=!0,this.events.emit("frontcourt",{team:r.team,t:i});else if(this.backcourtT+=t,this.backcourtT>=zi.BACKCOURT){this.events.emit("eightSeconds",{team:r.team,t:i}),this.turnover(r.team,"eightSec",r);return}}if(this.shotClockOn){let a=e.shot&&(!e.shot.done||e.shot.rim||e.shot.board);if(a||(this.shotClock-=t),this.shotClock<=0&&!a){this.shotClock=0,this.events.emit("shotClockViolation",{team:this.offense,t:i}),this.turnover(this.offense,"shotClock",r);return}}if(!this.overtime&&(this.clock-=t,this.clock<=0)){if(this.clock=0,e.shot&&!e.shot.done)return;this.endOfRegulation()}}}endOfRegulation(){if(this.full){this.endOfPeriod();return}if(this.phase==="over")return;this.events.emit("buzzer",{t:this.time});let[t,e]=this.scoreline;if(t===e){this.overtime=!0,this.events.emit("overtime",{t:this.time}),this.whistle("overtime",{type:"check",team:this.rng.next()<.5?0:1});return}this.finish()}finish(){let[t,e]=this.scoreline;this.winner=t>e?0:e>t?1:-1,this.setPhase("over"),this.ball.shot=null;for(let i of this.players)i.action=null,i.stance=!1,i.handsUp=!1;for(let i of this.players)i.team===this.winner&&(i.celebrateUntil=this.time+6);this.events.emit("final",{winner:this.winner,score:this.scoreline,t:this.time})}updatePhase(t){let e=this.phase,i=this.phaseT;if(e!=="intro"){if(e==="tip"){this.updateTip(t);return}if(e==="inbound"){this.updateInbound(t);return}if(e==="break"){let n=this.period===2?4:2.6;(i>n||this.skipRequested&&i>.8)&&this.afterDead();return}if(e==="check"){let n=this.checker&&this.checker.isHuman?i>.6&&this.checkerReady:!1;(i>(this.checker&&this.checker.isHuman?6:1.4)||n)&&(this.checkerReady=!1,this.goLive());return}if(e==="scored"||e==="dead"){(i>(e==="scored"?1.9:1.35)||this.skipRequested&&i>.5)&&this.afterDead();return}e==="ft"&&this.updateFT(),e==="live"&&this.rules&&!this.overtime&&this.clock<=0&&!(this.ball.shot&&!this.ball.shot.done)&&this.endOfRegulation()}}afterDead(){let t=this.next;if(this.next=null,this.full){if(t&&t.type==="over"){this.finish();return}if(t&&t.type==="period"){this.startPeriod();return}if(t&&t.type==="ft"){this.startFreeThrows(t.shooter,t.n);return}if(this.rules&&this.clock<=0){this.endOfPeriod();return}let e=t||this.inboundNext(1-this.offense,this.sidelineSpot(this.ball.pos.x,this.ball.pos.z));this.startInbound(e.team,e.x,e.z,e.kind,{inbounder:e.inbounder});return}if(!t||t.type==="check"){if(this.rules&&!this.overtime&&this.clock<=0){this.endOfRegulation();return}this.startCheck(t?t.team:1-this.offense)}else t.type==="ft"?this.startFreeThrows(t.shooter,t.n):t.type==="over"&&this.finish()}startFreeThrows(t,e){this.setPhase("ft"),this.offense=t.team,this.mustClear=null,this.ft={shooter:t,left:e,total:e,made:!1,missed:!1,released:!1,wait:0},this.placeFT(),this.events.emit("ftStart",{player:t,n:e,t:this.time})}placeFT(){let t=this.ft.shooter,e=this.side(t.team),i=e*F.X;this.place(t,e*(zt.FT_X-.32),0);let n=[1.1,2,2.9],r=this.teams[1-t.team].players,a=this.teams[t.team].players.filter(d=>d!==t),o=[[-7.6,.6],[-6.4,-4.4],[-6.4,4.4],[-8.4,-2.2],[-8.4,2.2]],l=0,c=d=>{let[u,f]=o[l++%o.length],g=i+e*u,x=e*f;this.place(d,g,x,$t(i-g,-x))};r.forEach((d,u)=>{if(u>=3){c(d);return}let f=i-e*n[u===2?1:0],g=(u%2?-1:1)*(zt.KEY_HW+.35);this.place(d,f,g,$t(i-f,-g*.3))}),a.forEach((d,u)=>{if(u>=2){c(d);return}let f=i-e*n[1+(u===1?1:0)],g=(u%2?1:-1)*(zt.KEY_HW+.35);this.place(d,f,g,$t(i-f,-g*.3))});let h=this.ball;h.shot=null,h.pass=null,h.owner=t,h.state="held",h.pos.set(t.pos.x+e*.36,ve.HOLD_Y,t.pos.z),h.prevPos.copy(h.pos),Tn(this,t),this.ft.released=!1,this.ft.made=!1,this.ft.missed=!1,this.ft.wait=0,this.events.emit("snap",{t:this.time})}updateFT(){let t=this.ft,e=this.ball;if(!t)return;let i=t.shooter;if(!t.released){e.shot&&e.shot.shooter===i&&e.state==="free"&&(t.released=!0,t.left--,this.stats.add(i,"fta"),t.left<=0&&(this.setPhase("live"),this.ftLast={shooter:i},this.shotClock=this.shotLen,this.frontcourt=!0,this.backcourtT=0,this.ball.shot.kind="ft",this.ball.shot.value=1,this.mustClear=null,this.ftLastShot=e.shot));return}t.wait+=1/120,(t.made||t.missed||t.wait>2.4)&&(e.shot&&(e.shot.done=!0),t.missed=!t.made,t.wait>.9&&this.placeFT())}};var kc=class{constructor(t,e){this.m=t,this.p=e,this.input={moveF:0,moveR:0,sprint:!1,yaw:0,pitch:0,lmb:!1,rmb:!1,stance:!1},this.buffer=[],this.passTarget=null,this.targetVisible=!1,this.preview=null,this.lastAction=null}press(t){this.buffer.push({type:t,t:this.m.time})}release(t){this.buffer.push({type:t+"Up",t:this.m.time})}update(t){let e=this.m,i=this.p,n=e.time,r=e.ball,a=this.input,o=a.yaw,l=Math.sin(o),c=Math.cos(o),h=-Math.cos(o),d=Math.sin(o),u=l*a.moveF+h*a.moveR,f=c*a.moveF+d*a.moveR,g=Math.hypot(u,f);g>1&&(u/=g,f/=g);let x=Gi(e,i),m=r.owner&&r.owner.team!==i.team;i.stance=!x&&!i.airborne&&(a.stance||a.rmb&&!!m)&&(e.phase==="live"||e.phase==="inbound"),i.handsUp=!x&&a.lmb&&e.phase==="live",i.sprint=a.sprint&&g>.1&&!i.stance;let p=i.maxSpeed(i.sprint,x);i.desired.set(u*p,0,f*p),i.faceYaw=o,x&&r.state==="held"&&!i.action&&!i.airborne&&g>.2&&e.phase==="live"&&(En(i,i.hand||"R",{}),r.state="dribble");let v=r.owner&&r.owner.team===i.team;if(x||e.phase==="check"&&e.checker===i?(this.passTarget=W_(e,i,o,this.passTarget),this.targetVisible=!!this.passTarget):(this.targetVisible=!1,v||(this.passTarget=null)),x||e.phase==="ft"&&e.ft&&e.ft.shooter===i){let M=zs(e,i),R=i.action;R&&R.type==="shot"?this.preview={kind:R.kind,spot:R.spot,charge:R.charging?R.charge:R.relCharge??R.charge,live:!R.released,released:R.released,grade:R.gradeInfo}:this.preview={kind:M,spot:Fn(e,i,M,ln(e,i),M==="layup"||M==="dunk"?0:_t(i.speed/6,0,1)),charge:0,live:!1}}else{let M=i.action;this.preview=M&&M.type==="shot"&&M.released&&M.t-M.rt<.8?{kind:M.kind,spot:M.spot,charge:M.relCharge??M.charge,live:!1,released:!0,grade:M.gradeInfo}:null}let E=i.action;E&&E.type==="shot"&&!E.released&&(E.aimYaw=o);let y=e.phase;if(y==="tip"){let M=e.tip;for(let R of this.buffer)R.type==="jump"&&M&&M.jumpers.includes(i)&&!i.airborne&&!i.action&&Fa(e,i);this.buffer.length=0;return}if(y==="inbound"){for(let M of this.buffer)M.type==="pass"&&!x&&e.offense===i.team&&this.requestPass();this.buffer.length=0;return}if(y==="scored"||y==="dead"||y==="over"||y==="break"){for(let M of this.buffer)M.type.endsWith("Up")||e.requestSkip();this.buffer.length=0;return}if(y==="check"){e.checker===i&&(g>.2||this.buffer.some(M=>!M.type.endsWith("Up")))&&(e.checkerReady=!0),this.buffer=this.buffer.filter(M=>n-M.t<vi.INPUT_BUFFER&&!M.type.endsWith("Up")&&M.type!=="jump");return}if(y==="ft"){let M=e.ft;for(let R of this.buffer)M&&M.shooter===i&&R.type==="shoot"&&!i.action&&!M.released&&r.owner===i&&hs(e,i,{kind:"ft",charging:a.lmb,aimYaw:o}),R.type==="shootUp"&&i.action&&i.action.type==="shot"&&Gu(i.action,n);this.buffer.length=0;return}if(y!=="live"){this.buffer.length=0;return}let S=[];for(let M of this.buffer)this.handle(M)||n-M.t<(M.type==="steal"?.3:vi.INPUT_BUFFER)&&!M.type.endsWith("Up")&&S.push(M);this.buffer=S}handle(t){let e=this.m,i=this.p,n=e.time,r=this.input,a=e.ball,o=Gi(e,i),l=i.action;switch(t.type){case"shootUp":return l&&l.type==="shot"&&l.charging&&Gu(l,n),!0;case"shoot":return o?Wi(e,i)?(hs(e,i,{charging:r.lmb,aimYaw:r.yaw}),this.lastAction={kind:"shot",t:n},!0):!1:!0;case"pass":return o?Wi(e,i)?(this.passTarget&&(Or(e,i,this.passTarget),this.lastAction={kind:"pass",t:n}),!0):!1:(a.owner&&a.owner.team===i.team?this.requestPass():a.pass&&a.pass.team===i.team&&this.requestPass(),!0);case"jump":return o?Wi(e,i)?(Tc(e,i),!0):!1:i.airborne?!0:l&&l.type!=="jump"?!1:(Fa(e,i),!0);case"steal":return o?!0:l||n<i.stealReadyAt?!1:(Ec(e,i),this.lastAction={kind:"steal",t:n},!0);case"cross":return o&&Ac(e,i),!0;default:return!0}}requestPass(){let t=this.m,e=this.p,i=t.time;i<e.requestReadyAt||(e.requestUntil=i+2.2,e.requestReadyAt=i+1,t.events.emit("request",{player:e,t:i}))}};function W_(s,t,e,i){let n=null,r=1e9;for(let a of s.teams[t.team].players){if(a===t)continue;let o=Math.abs(sn(e,$t(a.pos.x-t.pos.x,a.pos.z-t.pos.z))),l=a.pos.distXZ(t.pos),c=o+l*.015+(o>.85?1:0);a===i&&(c-=.18),c<r&&(r=c,n=a)}return n}var um=12,Ba=class{constructor(t,e){this.app=t,this.cfg=e,this.view=t.view,this.audio=t.audio,this.hud=t.hud,this.input=t.input,this.match=new Lc(e.match);let i=this.match;this.human=i.human,this.human&&(this.ctl=new kc(i,this.human),i.humanCtl=this.ctl);let n=i.full;this.cam={mode:this.human?"fp":"orbit",yaw:Math.PI/2,pitch:-.1,eye:ve.EYE,fov:t.settings.fov,bob:t.settings.bob?1:0,shake:t.settings.shake?1:0,angle:.9,radius:n?14.5:11.5,height:n?6.4:5.6,cx:n?0:8.5},this.acc=0,this.paused=!1,this.ended=!1,this.excite=0,this.unsubs=[],this.kitA=e.colours?e.colours.kits[0].jersey:"#c00",this.kitB=e.colours?e.colours.kits[1].jersey:"#00c",this.sq=new Map,this.view.setVenue(e.venue||"gym",e.venueOpts||{}),this.view.setLocal(this.human),this.view.setMatch(i,e.colours),this.hookEvents(),this.human&&this.unsubs.push(this.input.on((r,a)=>{this.paused||!this.ctl||(a?this.ctl.press(r):this.ctl.release(r))})),e.practice&&e.practice.attach(this)}start(){let t=this.match;this.cfg.practice?this.cfg.practice.start(this):t.start(this.cfg.firstTeam),this.human&&(this.cam.yaw=this.human.yaw);let e=(Ns[this.cfg.venue]||Ns.gym).loud;this.cfg.mode!=="menu"&&this.audio.startCrowd(.2+e*.8)}hookEvents(){let t=this.match,e=t.events,i=this.audio,n=this.view,r=this.hud,a=(u,f)=>this.unsubs.push(e.on(u,f)),o=this.cfg.mode==="menu",l=!!this.cfg.practice,c=()=>this.human,h=(u,f=1)=>{if(o)return{gain:0};let g=n.camera.position,x=u.x-g.x,m=u.z-g.z,p=Math.hypot(x,m),v=this.cam.yaw,E=-Math.cos(v)*x+Math.sin(v)*m;return{gain:f/(1+p*.09),pan:E/(p+3)}},d=u=>t.teams[u].short;a("bounce",u=>i.play(Math.random()<.5?"bounce":"bounce2",{...h({x:u.x,z:u.z},u.player===c()?.75:.9),rate:.95+Math.random()*.1})),a("hit",u=>{u.kind==="floor"&&u.speed>.8?i.play("bounce",{...h(u,Math.min(1,u.speed/6)),rate:.9+Math.random()*.15}):u.kind==="rim"?(i.play("rim",{...h(u,Math.min(1,.3+u.speed/6)),rate:.95+Math.random()*.1}),u.speed>1.5&&(this.excite=Math.max(this.excite,.7))):u.kind==="board"?i.play("board",h(u,Math.min(1,.3+u.speed/7))):u.kind==="body"&&i.play("catch",h(u,.4))}),a("shot",u=>{i.play("release",h(u.player.pos,.6)),u.player===c()&&(n.shake=.4,u.grade&&u.kind!=="dunk"&&(r.notify(u.grade.label,u.grade.tier==="perfect"?"good":u.grade.tier==="good"?"":"bad"),u.grade.tier==="perfect"&&i.play("perfect",{gain:.45}))),this.excite=Math.max(this.excite,.6)}),a("pass",u=>i.play("pass",h(u.player.pos,.6))),a("gain",u=>i.play("catch",h(u.player.pos,u.player===c()?.55:.7))),a("stealTry",u=>i.play("steal",{...h(u.player.pos,.25),rate:1.2})),a("poke",u=>{i.play("steal",h(u.player.pos,1)),u.player===c()&&r.notify("POKED LOOSE!","good"),u.victim===c()&&r.notify("STRIPPED","bad")}),a("steal",u=>{o||i.play("ooh",{group:"crowd",gain:.5}),u.player===c()&&r.showBanner("STEAL!","",1300,"mine")}),a("interception",u=>{u.player===c()?r.showBanner("PICKED OFF!","",1300,"mine"):u.victim===c()&&r.notify("INTERCEPTED","bad")}),a("stealMiss",u=>{u.player===c()&&r.notify("REACHED \xB7 OFF BALANCE","bad")}),a("block",u=>{i.play("block",h(u.player.pos,1)),o||i.play("ooh",{group:"crowd",gain:.8}),this.excite=1,u.player===c()?r.showBanner("BLOCKED!","Get out of here!",1500,"mine"):u.victim===c()&&r.notify("BLOCKED","bad")}),a("cross",u=>i.play(["squeak1","squeak2","squeak3"][Math.floor(Math.random()*3)],h(u.player.pos,.7))),a("ankles",u=>{o||i.play("ooh",{group:"crowd",gain:.45}),u.by===c()&&r.notify("DEFENDER BEATEN","good")}),a("bite",u=>{u.by===c()&&r.notify("BIT ON THE FAKE","good")}),a("fake",u=>i.play("squeak3",h(u.player.pos,.4))),a("jump",u=>i.play("squeak2",{...h(u.player.pos,.3),rate:1.2})),a("request",()=>i.play("shout",{gain:.5})),a("rebound",u=>{u.player===c()&&r.notify(u.offensive?"OFFENSIVE BOARD":"REBOUND","good")}),a("miss",u=>{!o&&!l&&u.airball&&(i.play("groan",{group:"crowd",gain:.6}),u.player===c()&&r.notify("AIR BALL","bad"))}),a("swish",()=>i.play("net",{gain:.5})),a("basket",u=>{if(i.play("net",h(u.pos,1)),o)return;let f=u.team===0;i.play(f?"cheer":"groan",{group:"crowd",gain:f?1:.55}),this.excite=1,n.crowdLevel=f?1:.4,n.celebrate(u.pos.x,3,u.pos.z,u.team,u.kind==="dunk"?1.2:.7);let g=u.player===c(),x=u.kind==="dunk"?"SLAM DUNK!":u.goaltend?"GOALTENDING":u.kind==="ft"?"FREE THROW":u.value===3?"THREE!":u.kind==="layup"?"LAYUP":u.kind==="tip"?"PUT-BACK":"BUCKET";if(l){g&&r.notify(`+${u.value} ${x}`,"good");return}let m=u.player?`${u.player.name}${u.assist?` \xB7 assist ${u.assist.name}`:""}`:"";r.showBanner(g?x:`+${u.value}`,`${d(0)} ${t.scoreline[0]} - ${t.scoreline[1]} ${d(1)}${m?` \xB7 ${m}`:""}${u.andOne?" \xB7 AND ONE!":""}`,2e3,g?"mine":u.team===(c()?c().team:0)?"good":""),u.assist===c()&&r.notify("ASSIST","good")}),a("whistle",u=>{if(o)return;u.reason==="shotClock"?i.play("buzzer",{gain:.6}):i.play("whistle",{gain:.8});let f={out:"OUT OF BOUNDS",shotClock:"SHOT CLOCK",foul:u.bonus?"FOUL \xB7 BONUS":"FOUL",shootingFoul:"SHOOTING FOUL",notCleared:"NOT CLEARED",overtime:"OVERTIME",eightSec:"8 SECONDS",backcourt:"BACKCOURT",fiveSec:"5 SECONDS"}[u.reason]||"";f&&u.reason!=="overtime"&&r.showBanner(f,u.team!=null?`${d(1-u.team)} ball`:"",1500)}),a("tip",u=>{if(o)return;let f=c()&&u.jumpers.includes(c());r.showBanner("TIP-OFF",f?"Jump (Space) as the ball comes down":`${t.teams[0].name} v ${t.teams[1].name}`,1900)}),a("toss",()=>{o||i.play("whistle",{gain:.5,rate:1.1})}),a("tapped",u=>{!o&&u.player===c()&&r.notify("WON THE TIP","good")}),a("inbound",u=>{o||l||u.kind!=="baseline"&&r.notify(`${d(u.team)} BALL`,"")}),a("periodEnd",u=>{if(o)return;let[f,g]=t.scoreline,x=u.half?"HALFTIME":u.ot?t.period>4?"END OF OVERTIME":"END OF REGULATION":`END OF Q${u.period}`;r.showBanner(x,`${d(0)} ${f} - ${g} ${d(1)}${u.half?" \xB7 teams switch ends":u.ot?" \xB7 tied: overtime":""}`,u.half?3600:2400),i.play("cheer",{group:"crowd",gain:.5})}),a("periodStart",u=>{if(o)return;let f=["","1ST QUARTER","2ND QUARTER","3RD QUARTER","4TH QUARTER"];r.showBanner(u.ot?u.label==="OT"?"OVERTIME":u.label:f[u.period]||u.label,`${t.teams[u.team].name} ball`,1800)}),a("eightSeconds",u=>{!o&&c()&&u.team===c().team&&r.notify("GET IT OVER HALF COURT IN 8 SECONDS","bad")}),a("backcourt",u=>{!o&&c()&&u.team===c().team&&r.notify("NO GOING BACK OVER HALF COURT","bad")}),a("notCleared",u=>{!o&&c()&&u.team===c().team&&r.notify("NO BASKET \xB7 CLEAR IT FIRST","bad")}),a("foul",u=>{o||(u.player===c()?r.notify(`FOUL ON YOU (${u.kind==="reach"?"REACH-IN":u.kind==="shooting"?"ON THE SHOT":"BLOCKING"})`,"bad"):u.victim===c()&&r.notify("FOULED","good"),u.kind==="shooting"&&i.play("whistle",{gain:.8}))}),a("ftStart",u=>{o||r.showBanner("FREE THROW",`${u.player.name} \xB7 ${u.n} shot${u.n>1?"s":""}`,1500)}),a("check",u=>{o||(u.first?r.showBanner("CHECK BALL",`${t.teams[u.team].name} ball`,1700):l||r.notify(`${d(u.team)} BALL \xB7 CHECK`,""))}),a("snap",()=>{o||(r.flashFade(),this.human&&(this.cam.yaw=this.human.yaw,this.cam.pitch=-.1))}),a("cleared",u=>{c()&&u.team===c().team&&r.notify("CLEARED","")}),a("buzzer",()=>{o||i.play("buzzer",{gain:.8})}),a("overtime",()=>{o||r.showBanner("OVERTIME","Next basket wins",2400)}),a("final",()=>{if(o)return;i.play("buzzer",{gain:.9});let[u,f]=t.scoreline,g=this.human&&(this.human.team===0?u>f:f>u);if(r.showBanner(g?"YOU WIN!":"FINAL",`${d(0)} ${u} - ${f} ${d(1)}`,3200,g?"mine":""),g){i.play("cheer",{group:"crowd",gain:1}),n.crowdLevel=1;let x=t.hoopX(this.human.team),m=Math.sign(x);for(let p=0;p<3;p++)setTimeout(()=>n.celebrate(x-m*(4-Math.random()*4),3,(Math.random()-.5)*8,this.human.team,1.2),p*450)}})}frame(t){let e=this.match;if(!this.paused&&!this.ended){if(this.human&&this.ctl){let l=this.input.axes();this.input.consumeLook(this.cam,t);let c=this.ctl.input;c.moveF=l.f,c.moveR=l.r,c.sprint=l.sprint,c.stance=l.stance,c.yaw=this.cam.yaw,c.pitch=this.cam.pitch;let h=this.input.held;c.lmb=h.lmb,c.rmb=h.rmb}this.acc+=Math.min(t,.1)*(this.cfg.timeScale||1);let o=0;for(;this.acc>=Pr&&o<um;)e.step(Pr),this.acc-=Pr,o++,this.cfg.practice&&this.cfg.practice.step(this,Pr);o>=um&&(this.acc=0),this.sneakerSounds(t),e.phase==="over"&&!this.ended&&e.phaseT>(this.cfg.mode==="menu"?0:3.2)&&(this.ended=!0,this.cfg.onEnd&&this.cfg.onEnd(this))}let i=this.paused?1:this.acc/Pr,n=e.ball.pos,r=Math.max(0,1-Le(n.x,n.z,n.x>=0?1:-1)/7);if(this.excite=Math.max(r*.4,this.excite-t*.3),this.cfg.mode!=="menu"&&this.audio.setExcitement(this.excite),this.human){let o=this.human,l=ve.EYE-.24*o.stanceW,c=e.time-o.landT;c>=0&&c<.25&&(l-=.09*Math.sin(c/.25*Math.PI)),this.cam.eye+=(l-this.cam.eye)*(1-Math.exp(-t*14))}else if(this.cam.angle+=t*.04,e.full){let o=Math.max(-7,Math.min(7,e.ball.pos.x*.55));this.cam.cx+=(o-this.cam.cx)*(1-Math.exp(-t*.5))}this.cam.fov=this.app.settings.fov,this.cam.bob=this.app.settings.bob?1:0,this.cam.shake=this.app.settings.shake?1:0;let a=this.app.debugCam?{mode:"free",pos:this.app.debugCam.pos,look:this.app.debugCam.look,fov:this.app.debugCam.fov||this.cam.fov}:this.cam;this.view.render(i,t,a,{crowd:this.excite*.5}),this.updateMarkers(),this.cfg.practice&&this.cfg.practice.frame(this,t),this.cfg.mode!=="menu"&&this.hud.update(this.hudState())}sneakerSounds(t){if(this.cfg.mode==="menu"||t<=0)return;let e=this.match,i=this.view.camera.position;for(let n of e.players){let r=this.sq.get(n)||{vx:0,vz:0,t:0,g:0},a=(n.vel.x-r.vx)/t,o=(n.vel.z-r.vz)/t,l=Math.hypot(a,o),c=Math.hypot(n.pos.x-i.x,n.pos.z-i.z);l>14&&n.speed>2.2&&e.time-r.t>.45&&!n.airborne&&c<14&&(r.t=e.time,this.audio.play(["squeak1","squeak2","squeak3"][Math.floor(Math.random()*3)],{gain:.5/(1+c*.15),rate:.9+Math.random()*.25}));let h=Math.floor(n.gait*2);h!==r.g&&!n.airborne&&c<9&&n.speed>.8&&this.audio.play(h%2?"step1":"step2",{gain:(n===this.human?.18:.3)/(1+c*.3),rate:.9+Math.random()*.2}),r.g=h,r.vx=n.vel.x,r.vz=n.vel.z,this.sq.set(n,r)}}updateMarkers(){let t=this.view.markers,e=this.match;if(t.hideAll(),!this.ctl||this.cfg.mode==="menu")return;let i=this.human,n=this.ctl.passTarget;if(n&&this.ctl.targetVisible&&e.teams[i.team].players.length>1&&t.showRing(n.pos.x,n.pos.z,e.time),e.rules&&e.offense!==i.team&&(e.phase==="live"||e.phase==="check"||e.phase==="inbound")){let a=e.ai.markOf(i);a&&t.showDef(a.pos.x,a.pos.z)}let r=e.ball;r.pass&&r.pass.target===i&&r.state==="free"&&t.showIncoming(r.pos.x+r.vel.x*.25,r.pos.z+r.vel.z*.25),this.cfg.practice&&this.cfg.practice.markers(this,t)}hudState(){let t=this.match,e=this.human,i="",n=this.input.touchMode;if(e){let a=t.ball,o=a.owner===e;t.phase==="tip"?i=t.tip&&t.tip.jumpers.includes(e)?n?"Tap JUMP as the ball comes down":"Space: jump for the tip as the ball comes down":"Tip-off":t.phase==="inbound"?i=t.offense===e.team?n?"Get open \xB7 CALL for the throw-in":"Get open \xB7 RMB calls for the throw-in":"Find your man (red ring)":t.phase==="break"?i=n?"Tap any button to continue":"Press any action to continue":t.phase==="check"&&t.checker===e?i=n?"Move or tap a button to check the ball in":"Move or press any button to check the ball in":t.phase==="ft"?i=t.ft&&t.ft.shooter===e?n?"Hold SHOOT, release in the green":"Hold left mouse, release in the green":"Free throw":t.phase==="scored"||t.phase==="dead"?i=n?"Tap any button to skip":"Press any action to skip":n?i="":o?i="LMB shoot \xB7 RMB pass \xB7 Q crossover \xB7 Space fake":a.owner&&a.owner.team!==e.team?i=a.owner.pos.distXZ(e.pos)<2.2?"E steal \xB7 C stance \xB7 Space block":"Stay between your man and the rim \xB7 C stance":a.owner&&a.owner.team===e.team?i=e.requestUntil>t.time?"Ball called for":"RMB call for the ball":a.state==="free"&&a.shot&&(i="Space jump for the rebound"),t.full&&t.phase==="live"&&a.owner&&a.owner.team===e.team&&!t.frontcourt&&t.backcourtT>4&&(i=`Over half court: ${Math.max(0,8-t.backcourtT).toFixed(0)} s`)}this.cfg.practice&&this.cfg.practice.hint&&(i=this.cfg.practice.hint(this)??i);let r="";return t.full?t.phase==="tip"?r="TIP-OFF":t.phase==="inbound"?r="THROW-IN":t.phase==="ft"&&t.ft?r=`FREE THROW ${t.ft.total-t.ft.left+(t.ft.released?0:1)}/${t.ft.total}`:t.phase==="break"?r=t.period===2?"HALFTIME":`END OF ${t.periodLabel}`:t.phase==="over"?r="FINAL":r=`TEAM FOULS ${t.teams[0].fouls} - ${t.teams[1].fouls}`:t.phase==="check"?r="CHECK BALL":t.phase==="ft"&&t.ft?r=`FREE THROW ${t.ft.total-t.ft.left+(t.ft.released?0:1)}/${t.ft.total}`:t.overtime?r="OVERTIME \xB7 NEXT BASKET WINS":t.phase==="over"?r="FINAL":t.rules&&(r=`FIRST TO ${t.target}`),this.cfg.practice&&this.cfg.practice.phaseText&&(r=this.cfg.practice.phaseText(this)),{match:t,camera:this.view.camera,view:this.view,camYaw:this.cam.yaw,style:this.view.style,kitA:this.kitA,kitB:this.kitB,hint:i,phaseText:r,preview:this.ctl?this.ctl.preview:null,meter:this.app.settings.meter!==!1,clockText:this.cfg.practice&&this.cfg.practice.clockText?this.cfg.practice.clockText(this):void 0,noArrow:this.cfg.noArrow}}setPaused(t){this.paused=t,this.ctl&&t&&(this.ctl.buffer.length=0)}dispose(){for(let t of this.unsubs)t();this.unsubs=[],this.cfg.practice&&this.cfg.practice.dispose(this),this.audio.stopCrowd(),this.view.markers.hideAll()}};var dm=null,fm="localStorage",Nc=["courtside.career","courtside.profile","courtside.records","courtside.settings.v1","courtside.style","courtside.tutorial"],$u=()=>dm||globalThis.localStorage,bi={get kind(){return fm},getItem(s){return $u().getItem(s)},setItem(s,t){$u().setItem(s,String(t))},removeItem(s){$u().removeItem(s)}};function Xu(s,t){dm=s,fm=t}var qu="courtside.settings.v1",mm="courtside.style",Yu=70,Ku=120,gm=3,pm=2.25,Dc={rev:gm,sensitivity:1,invertY:!1,fov:100,master:.8,sfx:.9,crowd:.6,difficulty:"pro",bob:!0,shake:!0,quality:"high",gameLength:"normal",meter:!0,quarterLength:"short",teamSize:5,touch:"auto"};function xm(){try{return!!bi.getItem(qu)}catch{return!1}}function vm(s=!1){let t=()=>({...Dc,...s?{sensitivity:pm}:{}});try{let e=bi.getItem(qu);if(!e)return t();let i={...Dc,...JSON.parse(e)};return(i.rev||1)<2&&i.fov===85&&(i.fov=Dc.fov),(i.rev||1)<3&&s&&i.sensitivity===1&&(i.sensitivity=pm),i.rev=gm,i.fov=Math.min(Ku,Math.max(Yu,Number(i.fov)||Dc.fov)),i}catch{return t()}}function ym(s){try{return bi.setItem(qu,JSON.stringify(s)),!0}catch{return!1}}function bm(){try{let s=bi.getItem(mm);return s==="neo"||s==="classic"?s:"classic"}catch{return"classic"}}function _m(s){try{bi.setItem(mm,s)}catch{}}var li={guard:{id:"guard",name:"Floor General",pos:"PG",desc:"Quick, slick handles, sharp passing.",attrs:{shooting:72,handling:90,speed:88,defense:62,passing:90,vertical:60}},shooter:{id:"shooter",name:"Sharpshooter",pos:"SG",desc:"Deadly from deep. Wider sweet spot.",attrs:{shooting:92,handling:74,speed:76,defense:60,passing:70,vertical:62}},slasher:{id:"slasher",name:"Slasher",pos:"SF",desc:"Attacks the rim and finishes above it.",attrs:{shooting:66,handling:80,speed:84,defense:70,passing:64,vertical:88}},forward:{id:"forward",name:"Two-Way Forward",pos:"PF",desc:"Defends, rebounds and hits the mid-range.",attrs:{shooting:74,handling:64,speed:72,defense:82,passing:66,vertical:78}},big:{id:"big",name:"Rim Protector",pos:"C",desc:"Blocks, rebounds and powerful dunks.",attrs:{shooting:52,handling:56,speed:64,defense:90,passing:62,vertical:82}}},ci=[{id:"harbor",name:"Harbor Hawks",short:"HAW",colors:["#e63946","#ffffff","#1d3557"],strength:70},{id:"mesa",name:"Mesa Comets",short:"MES",colors:["#f4a261","#264653","#ffffff"],strength:66},{id:"northside",name:"Northside Owls",short:"NOR",colors:["#2a9d8f","#ffffff","#0b3c49"],strength:72},{id:"river",name:"Riverside Rockets",short:"RIV",colors:["#3a86ff","#ffbe0b","#ffffff"],strength:74},{id:"summit",name:"Summit Lions",short:"SUM",colors:["#8338ec","#ffd60a","#ffffff"],strength:78},{id:"bayview",name:"Bayview Sharks",short:"BAY",colors:["#06a77d","#052f5f","#ffffff"],strength:68},{id:"ember",name:"Ember City Flames",short:"EMB",colors:["#ff6b00","#141414","#ffffff"],strength:82},{id:"glacier",name:"Glacier Wolves",short:"GLA",colors:["#9ad1d4","#1d3557","#ffffff"],strength:76}],$i=s=>ci.find(t=>t.id===s)||ci[0],$_=["Jalen","Marcus","Theo","Andre","Kofi","Luca","Mateo","Darius","Ezra","Isaiah","Niko","Omar","Rafa","Tariq","Wes","Yusuf","Zane","Bo","Cal","Dev","Femi","Hugo","Ike","Jun","Kai","Leon","Milo","Nate","Otis","Quinn","Remy","Sol"],X_=["Okafor","Reyes","Lindqvist","Brooks","Mensah","Novak","Castillo","Hale","Ivers","Adeyemi","Petrov","Sato","Moreau","Kowalski","Ferreira","Grant","Haddad","Jensen","Kim","Lowe","Mbeki","Ortega","Park","Quist","Rossi","Sterling","Tanaka","Underwood","Vance","Whitaker","Young","Zhou"],Mm=["#f3d2b3","#e0b48c","#c68b5e","#a26a43","#7b4b2c","#4f2f1c"],Sm=["#111111","#3b2a1e","#7a4a24","#c58b3a","#e8d18a","#b23a1d"],wm=["#111111","#f5f5f5","#ffc61a","#2fd4ff","#ff4d5e","#33d36c"],us={SKIN:Mm,HAIR:Sm,SHOES:wm},Oc=["guard","shooter","slasher","forward","big"],q_={1:["slasher"],2:["guard","big"],3:["guard","slasher","big"],4:["guard","shooter","slasher","big"],5:Oc};function Y_(s,t=3){let e=new cn(Vs(s.id)+17),i=new Set,n=[],r=q_[t]||Oc;for(let o=0;o<t;o++){let l;do l=`${e.pick($_)} ${e.pick(X_)}`;while(i.has(l));i.add(l);let c=li[r[o%r.length]],h=s.strength-75,d=Object.fromEntries(Object.entries(c.attrs).map(([u,f])=>[u,Math.max(35,Math.min(97,Math.round(f+h+e.range(-5,5))))]));n.push({name:l,number:[0,1,3,4,5,7,8,10,11,12,13,15,21,23,24,30,33,34][e.int(0,17)]+0,archetype:c.id,attrs:d,look:{skin:e.pick(Mm),hair:e.pick(Sm),shoes:e.pick(wm),style:e.int(0,5)}})}let a=new Set;for(let o of n){for(;a.has(o.number);)o.number=(o.number+7)%56;a.add(o.number)}return n}function Em(){return{name:"You",number:23,archetype:"slasher",look:{skin:"#c68b5e",hair:"#111111",shoes:"#ffc61a",style:0}}}function Zu(s){let t=li[s.archetype]||li.slasher;return{name:s.name||"You",number:s.number??23,archetype:t.id,attrs:{...s.attrs||t.attrs},look:{...s.look},isHuman:!0}}function Xi(s,t,e=null){let n=Y_(s,t).slice(0,t);if(e){let r=Zu(e),a=0;if(t>=4){let l=Oc.indexOf(r.archetype),c=9;n.forEach((h,d)=>{let u=Math.abs(Oc.indexOf(h.archetype)-l);u<c&&(c=u,a=d)})}n=n.map((l,c)=>c===a?r:l);let o=new Set([r.number]);for(let l of n)if(l!==r){for(;o.has(l.number);)l.number=(l.number+7)%56;o.add(l.number)}}return{name:s.name,short:s.short,id:s.id,colors:s.colors,roster:n}}var K_={play:'<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/>',gear:'<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.6M12 18.6v2.6M21.2 12h-2.6M5.4 12H2.8M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8M18.5 18.5l-1.8-1.8M7.3 7.3 5.5 5.5"/><circle cx="12" cy="12" r="6.6"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9.4 9.3a2.7 2.7 0 1 1 3.9 2.4c-.8.4-1.3 1-1.3 1.9v.6"/><circle cx="12" cy="17.2" r=".9" fill="currentColor"/>',whistle:'<path d="M3 11.5h9.5a5.5 5.5 0 1 1-5.4 6.5H5a2 2 0 0 1-2-2z"/><path d="M12.5 11.5 18 6M15 4.5l1.5 1.5"/><circle cx="12.6" cy="16.5" r="1.6"/>',ball:'<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M6.2 5.2c3 2.6 3 11 0 13.6M17.8 5.2c-3 2.6-3 11 0 13.6"/>',cone:'<path d="M9.5 4h5l4 14h-13z"/><path d="M4 20h16M8 12h8"/>',trophy:'<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v3M8 20h8l-1-3H9z"/>',star:'<path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z" fill="currentColor"/>',back:'<path d="M15 5l-7 7 7 7"/>',left:'<path d="M15 5l-7 7 7 7"/>',right:'<path d="M9 5l7 7-7 7"/>',home:'<path d="M4 11 12 4l8 7v9h-5v-6H9v6H4z"/>',pause:'<path d="M8 5v14M16 5v14" stroke-width="3.4"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',chart:'<path d="M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-3"/>',swap:'<path d="M4 8h14l-3-3M20 16H6l3 3"/>',eye:'<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',check:'<path d="M4.5 12.5l5 5 10-11"/>',close:'<path d="M6 6l12 12M18 6 6 18"/>',brush:'<path d="M14.5 4.5 19.5 9.5 11 18l-5-5zM6 13l-2 7 7-2"/>',mail:'<path d="M3.5 6.5h17v11h-17z"/><path d="m3.5 7 8.5 6.5L20.5 7"/>',up:'<path d="M12 19V5M5.5 11.5 12 5l6.5 6.5"/>',list:'<path d="M8 6h12M8 12h12M8 18h12"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/>',forward:'<path d="M5 5.5v13l7-6.5zM12 5.5v13l7-6.5z" fill="currentColor" stroke="none"/>'};function Ut(s,t=22){return`<svg class="ico" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${K_[s]||""}</svg>`}var Tm=1,Ws=10,Be={3:{tier:3,name:"City League",short:"CITY",venue:"gym",salary:40,minRep:0,need:6},2:{tier:2,name:"National League",short:"NAT",venue:"gym",salary:260,minRep:18,need:6.6},1:{tier:1,name:"Premier League",short:"PREM",venue:"arena",salary:1800,minRep:48,need:7.2}},Ju=s=>ci.find(t=>t.id===s),Bn=[...["ember","summit","glacier","river","northside","harbor"].map(s=>({...Ju(s),tier:1})),{...Ju("bayview"),tier:2},{...Ju("mesa"),tier:2},{id:"copperton",name:"Copperton Miners",short:"COP",colors:["#b5651d","#1b1b1b","#ffffff"],strength:65,tier:2},{id:"lakeshore",name:"Lakeshore Herons",short:"LAK",colors:["#5fa8d3","#ffffff","#1b4965"],strength:64,tier:2},{id:"ironbridge",name:"Ironbridge Bulls",short:"IRO",colors:["#6c757d","#e63946","#ffffff"],strength:63,tier:2},{id:"pinecrest",name:"Pinecrest Foxes",short:"PIN",colors:["#2d6a4f","#ff9f1c","#ffffff"],strength:62,tier:2},{id:"dockside",name:"Dockside Gulls",short:"DOC",colors:["#f1faee","#457b9d","#1d3557"],strength:60,tier:3},{id:"westgate",name:"Westgate Rangers",short:"WES",colors:["#d62828","#fcbf49","#ffffff"],strength:58,tier:3},{id:"maple",name:"Maple Street Ravens",short:"MAP",colors:["#3d348b","#f7b801","#ffffff"],strength:57,tier:3},{id:"oldtown",name:"Old Town Badgers",short:"OLD",colors:["#7f5539","#ede0d4","#1b1b1b"],strength:55,tier:3},{id:"sunset",name:"Sunset Park Coyotes",short:"SUN",colors:["#f77f00","#003049","#ffffff"],strength:54,tier:3},{id:"railyard",name:"Railyard Bison",short:"RAI",colors:["#495057","#90be6d","#ffffff"],strength:52,tier:3}],ti=s=>Bn.find(t=>t.id===s)||Bn[Bn.length-1],za=s=>Bn.filter(t=>t.tier===s);function Ur(s){return Math.round(os.reduce((t,e)=>t+(s[e]||0),0)/os.length)}function ju(s){return s>=90?4:s>=80?3:s>=68?2:1}function Qu(s){let t=li[s]||li.slasher;return Object.fromEntries(os.map(e=>[e,Math.max(40,Math.round(t.attrs[e]-22))]))}function Z_(s,t,e){let r=4.75+(s.pts+.4*s.fgm-.7*(s.fga-s.fgm)-.4*(s.fta-s.ftm)+.7*s.oreb+.35*s.dreb+s.stl+.7*s.ast+.7*s.blk-.4*s.pf-s.tov)*8/Math.max(4,t)*.17+(e?.45:-.15);return Math.round(Math.max(1,Math.min(10,r))*10)/10}function td(s,t){let e=s-(t.strength+3);return e>=10?"Franchise star":e>=3?"Starter":e>=-6?"Rotation player":"Prospect"}function J_(s,t){let e=[...s];for(let r=e.length-1;r>0;r--){let a=Math.floor(t.next()*(r+1));[e[r],e[a]]=[e[a],e[r]]}let i=e.length,n=[];for(let r=0;r<i-1;r++){let a=[];for(let o=0;o<i/2;o++){let l=e[o],c=e[i-1-o];a.push(r%2===0?[l,c]:[c,l])}n.push(a),e.splice(1,0,e.pop())}return[...n,...n.map(r=>r.map(([a,o])=>[o,a]))]}function Am(){let s={};for(let t of Bn)s[t.id]={w:0,l:0,pf:0,pa:0};return s}function Rm({player:s,clubId:t,difficulty:e="pro",quarterLength:i="short",seed:n}){let r=n??(Date.now()&16777215)+1,a=ti(t),o={v:Tm,seed:r,created:Date.now(),difficulty:e,quarterLength:i,player:{name:s.name||"You",number:s.number??23,archetype:s.archetype||"slasher",look:{...s.look},attrs:s.attrs?{...s.attrs}:Qu(s.archetype),age:19},season:1,round:0,clubId:a.id,contract:{years:1,salary:ed(a,5)},rep:5,points:2,earnings:0,interest:{},offers:[],offerSeq:1,news:[],log:[],history:[],totals:{gp:0,pts:0,reb:0,ast:0,stl:0,blk:0,fgm:0,fga:0,tpm:0,tpa:0,wins:0},tables:Am(),fixtures:{},results:{},seasonOver:!1};return Cm(o),hn(o,`Signed for ${a.name} (${Be[a.tier].name}). Show them what you can do.`),o}function Cm(s){let t=new cn(Vs(`season${s.season}`)^s.seed);for(let e of[1,2,3])s.fixtures[e]=J_(za(e).map(i=>i.id),t),s.results[e]=[];s.tables=Am(),s.round=0,s.log=[],s.seasonOver=!1}function ed(s,t){let e=Be[s.tier];return Math.round(e.salary*(.7+t/120)*(.85+(s.strength-50)/140))*1e3}function hn(s,t,e=""){s.news.unshift({text:t,kind:e,season:s.season,round:s.round}),s.news.length>40&&(s.news.length=40)}var un=s=>ti(s.clubId);function Ha(s){if(s.seasonOver)return null;let t=un(s),i=(s.fixtures[t.tier][s.round]||[]).find(([r,a])=>r===t.id||a===t.id);if(!i)return null;let n=i[0]===t.id;return{round:s.round,home:n,opp:ti(n?i[1]:i[0]),homeId:i[0],awayId:i[1]}}function Uc(s,t){return za(t).map(e=>({club:e,...s.tables[e.id]})).sort((e,i)=>i.w-e.w||i.pf-i.pa-(e.pf-e.pa)||i.pf-e.pf)}function id(s){let t=s.log.filter(r=>!r.sim||r.line),e=t.length||1,i=r=>t.reduce((a,o)=>a+(o.line&&o.line[r]||0),0),n=s.log.length?s.log.reduce((r,a)=>r+a.rating,0)/s.log.length:0;return{gp:s.log.length,ppg:i("pts")/e,rpg:i("reb")/e,apg:i("ast")/e,rating:Math.round(n*10)/10,wins:s.log.filter(r=>r.won).length}}function Pm(s,t,e,i){let n=i/120,r=42*n,a=(t.strength-e.strength)*.55*n+1.5*n,o=Math.round(r+a/2+s.gauss()*6*Math.sqrt(n)),l=Math.round(r-a/2+s.gauss()*6*Math.sqrt(n));return o===l&&(s.next()<.5+a/40?o+=2:l+=2),[Math.max(8,o),Math.max(8,l)]}function Im(s,t,e,i,n){let r=s.tables[t],a=s.tables[e];r.pf+=i,r.pa+=n,a.pf+=n,a.pa+=i,i>n?(r.w++,a.l++):(a.w++,r.l++)}function j_(s,t,e){let i=new cn(Vs(`r${s.season}.${s.round}`)^s.seed);for(let n of[1,2,3]){let r=[];for(let[a,o]of s.fixtures[n][s.round]||[]){if(e&&a===e.homeId&&o===e.awayId){r.push({h:a,a:o,hs:e.hs,as:e.as,mine:!0});continue}let[l,c]=Pm(i,ti(a),ti(o),t);Im(s,a,o,l,c),r.push({h:a,a:o,hs:l,as:c})}s.results[n][s.round]=r}}function nd(s,t,e){let i=Ha(s);if(!i)return null;let n=un(s),r=Be[n.tier],a=t.my>t.their,o=t.rating??Z_(t.line,t.minutes,a),l=i.home?t.my:t.their,c=i.home?t.their:t.my;Im(s,i.homeId,i.awayId,l,c),j_(s,e,{homeId:i.homeId,awayId:i.awayId,hs:l,as:c});let h=t.line?{pts:t.line.pts,reb:(t.line.oreb||0)+(t.line.dreb||0),ast:t.line.ast,stl:t.line.stl,blk:t.line.blk,fgm:t.line.fgm,fga:t.line.fga,tpm:t.line.tpm,tpa:t.line.tpa}:null;s.log.push({round:s.round,opp:i.opp.id,home:i.home,my:t.my,their:t.their,won:a,rating:o,line:h,sim:!!t.sim});let d=s.totals;if(d.gp++,a&&d.wins++,h)for(let y of["pts","reb","ast","stl","blk","fgm","fga","tpm","tpa"])d[y]+=h[y]||0;let u=t.sim?.5:1,f=Math.max(1,Math.round((1+o/2.6+(a?.5:0))*u));s.points+=f;let g=n.tier===1?1.5:n.tier===2?1.25:1,x=Math.round(((o-6.1)*2.6*g+(a?.6:0))*u*10)/10;s.rep=Math.max(0,Math.min(100,Math.round((s.rep+x)*10)/10));let m=[],p=[];for(let y of Bn){if(y.id===n.id||!(y.tier<n.tier||y.tier===n.tier&&y.strength>n.strength+3))continue;let M=Be[y.tier];if(s.rep<M.minRep||n.tier-y.tier>1&&s.rep<Be[y.tier].minRep+20)continue;let R=M.need+(y.strength-70)/25,b=s.interest[y.id]||0,T=b+(o-R)*9*u+(a?3:0)-2;if(T=Math.max(0,Math.min(120,T)),s.interest[y.id]=Math.round(T),b<40&&T>=40&&m.push(`${y.name} scouts were watching.`),T>=100&&!s.offers.some(A=>A.clubId===y.id)){let A=Lm(s,y);s.offers.push(A),p.push(A),s.interest[y.id]=70}}s.earnings+=Math.round(s.contract.salary/Ws);let v=s.offers.filter(y=>s.round>=y.expires);s.offers=s.offers.filter(y=>s.round<y.expires);for(let y of v)hn(s,`The offer from ${ti(y.clubId).name} expired.`);for(let y of m)hn(s,y,"scout");for(let y of p)hn(s,`OFFER: ${ti(y.clubId).name} want to sign you.`,"offer");let E={rating:o,won:a,pts:f,repDelta:x,rep:s.rep,newOffers:p,notes:m,opp:i.opp,my:t.my,their:t.their,season:s.season,round:s.round+1,sim:!!t.sim};return hn(s,`${a?"W":"L"} ${t.my}-${t.their} ${i.home?"v":"@"} ${i.opp.name} \xB7 rating ${o.toFixed(1)}`,a?"win":"loss"),s.round++,s.round>=Ws&&(s.seasonOver=!0,s.seasonClubId=s.clubId),E}function Lm(s,t){let e=new cn(Vs(`${t.id}.${s.season}.${s.round}`)^s.seed),i=1+Math.floor(e.next()*3);return{id:s.offerSeq++,clubId:t.id,years:i,salary:ed(t,s.rep),expires:s.round+3,season:s.season}}function km(s,t){let e=Ha(s);if(!e)return null;let i=un(s),n=new cn(Vs(`sim${s.season}.${s.round}`)^s.seed),r=Ur(s.player.attrs),[a,o]=Pm(n,e.home?i:e.opp,e.home?e.opp:i,t),l=e.home?a:o,c=e.home?o:a,h=Math.round(Math.max(3,Math.min(9,5.7+(r-i.strength)/12+n.gauss()*.7+(l>c?.3:-.1)))*10)/10,d=t/120,u={pts:Math.max(0,Math.round((4+(h-5)*2.2)*d+n.gauss()*1.5)),oreb:0,dreb:Math.max(0,Math.round(1.5*d+n.gauss())),ast:Math.max(0,Math.round(1.2*d+n.gauss())),stl:Math.max(0,Math.round(n.next()*1.4)),blk:Math.max(0,Math.round(n.next()*1.1))};return u.fgm=Math.round(u.pts/2.3),u.fga=Math.max(u.fgm,Math.round(u.fgm*2.1)),u.tpm=0,u.tpa=0,nd(s,{my:l,their:c,line:u,rating:h,sim:!0},t)}function Nm(s,t){let e=s.offers.find(r=>r.id===t);if(!e)return!1;let i=un(s),n=ti(e.clubId);return s.clubId=n.id,s.contract={years:e.years,salary:e.salary,fresh:!!s.seasonOver},s.offers=s.offers.filter(r=>r.clubId!==n.id&&ti(r.clubId).tier<=n.tier&&r.clubId!==i.id),s.interest[n.id]=0,hn(s,`TRANSFER: you left ${i.name} for ${n.name} (${Be[n.tier].name}, ${e.years} season${e.years>1?"s":""}).`,"offer"),!0}function Dm(s,t){let e=s.offers.find(i=>i.id===t);return e?(s.offers=s.offers.filter(i=>i.id!==t),s.interest[e.clubId]=Math.min(s.interest[e.clubId]||0,45),hn(s,`You turned down ${ti(e.clubId).name}.`),!0):!1}function Om(s,t){let e=s.player.attrs[t];if(e==null||e>=99)return!1;let i=ju(e);return s.points<i?!1:(s.points-=i,s.player.attrs[t]=e+1,!0)}function sd(s){let t=ti(s.seasonClubId||s.clubId),i=Uc(s,t.tier).findIndex(o=>o.club.id===t.id)+1,n=id(s),r=[];i===1&&r.push(`${Be[t.tier].name} champions`),n.rating>=7.8?r.push("League MVP"):n.rating>=7&&r.push("All-League team");let a=[1,2,3].map(o=>({tier:o,club:Uc(s,o)[0].club}));return{season:s.season,club:t,pos:i,av:n,awards:r,champions:a}}function Um(s){let t=sd(s);s.history.push({season:s.season,clubId:t.club.id,tier:t.club.tier,pos:t.pos,gp:t.av.gp,ppg:Math.round(t.av.ppg*10)/10,rating:t.av.rating,awards:t.awards}),t.awards.length&&hn(s,`Season ${s.season}: ${t.awards.join(", ")}!`,"win"),s.rep=Math.min(100,s.rep+t.awards.length*4+(t.pos===1?3:0));let e=s.player;if(e.age++,e.age<=24&&(s.points+=4),e.age>=31)for(let n of["speed","vertical"])e.attrs[n]=Math.max(40,e.attrs[n]-1);s.contract.fresh?delete s.contract.fresh:s.contract.years--,s.seasonClubId=null;let i=un(s);s.contract.years<=0&&(s.contract={years:2,salary:ed(i,s.rep)},hn(s,`${i.name} extended your contract (2 seasons).`)),s.offers=[],s.season++,Cm(s);for(let n of Bn){if(n.id===s.clubId||(s.interest[n.id]||0)<70||s.rep<Be[n.tier].minRep)continue;let r=Lm(s,n);s.offers.push(r),s.interest[n.id]=50,hn(s,`OFFER: ${n.name} want to sign you for next season.`,"offer")}return hn(s,`Season ${s.season} begins.`),t}function Fm(s){return!!(s&&s.v===Tm&&s.player&&s.player.attrs&&s.clubId&&s.fixtures&&s.tables)}var re=s=>String(s).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Q_=["Crop","Afro","Buzz","Headband","Braids","Bald"],Fc=s=>s>=1e6?`$${(s/1e6).toFixed(1)}M`:`$${Math.round(s/1e3)}k`,rd=s=>`${s}${s%10===1&&s%100!==11?"st":s%10===2&&s%100!==12?"nd":s%10===3&&s%100!==13?"rd":"th"}`,Bm=s=>s>=7.5?"hi":s<5.5?"lo":"",Bc=class{constructor(t){this.s=t,this.app=t.app,this.draft=null,this.tab="table",this.lg=null}get c(){return this.app.career}clubName(){return this.c?un(this.c).name:""}quarter(){return(Hi[this.c.quarterLength]||Hi.short).quarter}create(){let t=this.s,e=this.app;if(t.current="careerNew",!this.draft){let c=e.profile;this.draft={name:c.name&&c.name!=="You"?c.name:"Rookie",number:c.number??23,archetype:c.archetype||"slasher",look:{...c.look},clubId:za(3)[0].id,difficulty:e.settings.difficulty||"pro",quarterLength:"short"}}let i=this.draft,n=Qu(i.archetype),r=(c,h,d)=>`<div class="swatches" data-sw="${c}">${h.map(u=>`<button class="sw ${u===d?"on":""}" data-c="${u}" style="background:${u}" aria-label="${u}"></button>`).join("")}</div>`,a=os.map(c=>`<div class="attr" style="grid-template-columns:110px 1fr 36px"><span>${Ca[c]}</span><div class="bar"><i style="width:${n[c]}%"></i></div><b>${n[c]}</b></div>`).join(""),o=za(3).map(c=>`<button class="card pick choice ${c.id===i.clubId?"on":""}" data-club="${c.id}"><span class="club-chip">${hi(c,34)} ${re(c.name)}</span><span>Team rating ${c.strength}</span></button>`).join(""),l=t.show(`<div class="panel wide"><div class="h-title">New Career</div>
      <p class="lead">Create your player and start in the City League. Every game you play gets a match rating: it earns skill points, builds your reputation and gets bigger clubs' scouts interested. Play well and they will sign you.</p>
      <div class="grid2">
        <div>
          <div class="h-sec">Name &amp; number</div>
          ${e.platform.lockedName?`<div class="field" style="display:flex;align-items:center">${re(e.platform.lockedName)}</div><div class="small muted" style="margin-top:4px">Your CrazyGames name</div>`:`<input class="field" id="cname" maxlength="16" value="${re(i.name)}" placeholder="Your name">`}
          <div class="stepper" style="margin-top:var(--s3)"><button class="btn sm icon" data-act="numDown" aria-label="Lower number">${Ut("minus",18)}</button><span class="pv">#${i.number}</span><button class="btn sm icon" data-act="numUp" aria-label="Higher number">${Ut("plus",18)}</button></div>
          <div class="h-sec">Look</div>
          <div class="set"><span class="lab">Skin</span>${r("skin",us.SKIN,i.look.skin)}</div>
          <div class="set"><span class="lab">Hair</span>${r("hair",us.HAIR,i.look.hair)}</div>
          <div class="set"><span class="lab">Style</span>${t.seg("style",Q_.map((c,h)=>[h,c]),i.look.style||0)}</div>
          <div class="set"><span class="lab">Shoes</span>${r("shoes",us.SHOES,i.look.shoes)}</div>
        </div>
        <div>
          <div class="h-sec">Position</div>
          <div class="choices">${Object.values(li).map(c=>`<button class="card pick choice ${c.id===i.archetype?"on":""}" data-arch="${c.id}"><b>${c.name} \xB7 ${c.pos}</b><span>${c.desc}</span></button>`).join("")}</div>
          <div class="h-sec">Starting ratings \xB7 overall ${Ur(n)}</div>
          ${a}
        </div>
      </div>
      <div class="h-sec">Your first club</div>
      <div class="club-grid">${o}</div>
      <div class="set" style="margin-top:var(--s4)"><span class="lab">Difficulty</span>${t.seg("difficulty",Object.entries(Gs).map(([c,h])=>[c,h.label]),i.difficulty)}</div>
      <div class="set"><span class="lab">Quarters</span>${t.seg("quarterLength",Object.entries(Hi).map(([c,h])=>[c,h.label]),i.quarterLength)}</div>
      <div class="small muted" style="margin-top:6px">Career games are full court, 5v5. Seasons have ${Ws} rounds; you can simulate a game you don't want to play (it counts for less).</div>
      <div class="actions"><button class="btn primary lg" data-act="start">${Ut("play")} Start career</button><button class="btn ghost" data-act="back">Back</button></div></div>`,{numDown:()=>{i.number=(i.number+99)%100,this.create()},numUp:()=>{i.number=(i.number+1)%100,this.create()},start:()=>{e.platform.lockedName&&(i.name=e.platform.lockedName),e.career=Rm({player:i,clubId:i.clubId,difficulty:i.difficulty,quarterLength:i.quarterLength}),this.draft=null,e.saveCareer(),this.tab="table",this.lg=null,this.hub(),t.sfx("uiReward",.4)},back:()=>{this.draft=null,t.mainMenu()}});l.querySelector("#cname")?.addEventListener("input",c=>{i.name=c.target.value.trim().slice(0,16)||"Rookie"}),l.querySelectorAll("[data-arch]").forEach(c=>c.addEventListener("click",()=>{i.archetype=c.dataset.arch,t.sfx("uiClick"),this.create()})),l.querySelectorAll("[data-club]").forEach(c=>c.addEventListener("click",()=>{i.clubId=c.dataset.club,t.sfx("uiClick"),this.create()})),l.querySelectorAll("[data-sw]").forEach(c=>c.querySelectorAll(".sw").forEach(h=>h.addEventListener("click",()=>{i.look[c.dataset.sw]=h.dataset.c,c.querySelectorAll(".sw").forEach(d=>d.classList.toggle("on",d===h)),t.sfx("uiClick",.3)}))),t.bindChoices(l,(c,h)=>{c==="style"?i.look.style=Number(h):i[c]=h})}hub(t){let e=this.s,i=this.app,n=this.c;if(!n){this.create();return}t&&(this.tab=t),e.current="career",i.hud.show(!1);let r=un(n),a=Be[r.tier],o=n.player,l=Ur(o.attrs),c=li[o.archetype]||li.slasher,h=Ha(n),d=n.log.slice(-5).map(m=>`<span class="${Bm(m.rating)}" title="${m.won?"W":"L"} ${m.my}-${m.their}">${m.rating.toFixed(1)}</span>`).join(""),u;if(h){let m=h.home?r:h.opp,p=h.home?h.opp:r,v=Be[m.tier].venue==="arena"?"City Arena":"Neighborhood Gym";u=`<div class="comp">${re(a.name)} \xB7 Season ${n.season} \xB7 Round ${h.round+1}/${Ws}</div>
        <div class="fixture"><div class="side">${hi(m,72)}${re(m.name)}</div><div class="v">VS</div><div class="side">${hi(p,72)}${re(p.name)}</div></div>
        <div class="venue">${h.home?"Home":"Away"} \xB7 ${re(v)} \xB7 ${re(td(l,r))}</div>
        <div class="actions mid" style="margin-top:0"><button class="btn xl primary" data-act="play">${Ut("play",30)} Play</button></div>
        <div class="actions mid" style="margin-top:var(--s2)"><button class="btn sm ghost" data-act="sim">${Ut("forward",16)} Simulate game</button></div>`}else{let m=sd(n);u=`<div class="comp">Season ${n.season} complete</div>
        <div class="result-word ${m.pos===1?"win":""}" style="font-size:48px">${rd(m.pos)} place</div>
        <div class="venue" style="margin-top:var(--s2)">${re(m.club.name)} \xB7 ${m.av.wins}-${m.av.gp-m.av.wins} in your games \xB7 average rating ${m.av.rating.toFixed(1)}</div>
        ${m.awards.length?`<div class="trophies" style="justify-content:center;margin-bottom:var(--s3)">${m.awards.map(p=>`<span class="badge gold">${Ut("trophy",14)} ${re(p)}</span>`).join("")}</div>`:""}
        <div class="actions mid" style="margin-top:0"><button class="btn xl primary" data-act="season">${Ut("play",30)} Season ${n.season+1}</button></div>`}let f=n.offers.length,g=[["table","Table","list"],["games","Games","chart"],["offers",`Offers${f?` (${f})`:""}`,"mail"],["train",`Training${n.points?` (${n.points})`:""}`,"up"],["stats","Stats","star"],["news","News","whistle"]],x=e.show(`
      <div class="topbar">
        <div class="who">${hi(r,56)}<div><h1>${re(o.name)}</h1><div class="sub">#${o.number} \xB7 ${re(c.name)} (${c.pos}) \xB7 age ${o.age} \xB7 ${re(r.name)} \xB7 ${re(a.name)}</div></div></div>
        <div class="lvl" title="Overall rating and reputation"><div class="ring">${l}</div><div><div class="small muted" style="font-weight:800;letter-spacing:1px">REPUTATION ${Math.round(n.rep)}</div><div class="bar gold"><i style="width:${Math.round(n.rep)}%"></i></div></div></div>
        ${f?`<button class="badge gold pulse" data-act="offersTab" style="cursor:pointer">${Ut("mail",14)} ${f} offer${f>1?"s":""}</button>`:""}
        ${n.points?`<button class="badge cyan" data-act="trainTab" style="cursor:pointer">${Ut("up",14)} ${n.points} skill point${n.points>1?"s":""}</button>`:""}
      </div>
      <div class="hub-main">
        <div class="panel next">${u}${d?`<div class="h-sec" style="margin-top:var(--s4)">Last games \xB7 rating</div><div class="form-dots" style="justify-content:center">${d}</div>`:""}</div>
        <div class="panel tabs-panel">
          <div class="tabs">${g.map(([m,p,v])=>`<button class="tab ${m===this.tab?"on":""}" data-tab="${m}">${Ut(v,16)} ${p}</button>`).join("")}</div>
          <div class="tab-body">${this.tabBody(this.tab)}</div>
        </div>
      </div>
      <div class="row" style="justify-content:space-between;flex-wrap:wrap">
        <button class="btn ghost" data-act="menu">${Ut("home",18)} Main menu</button>
        <span class="small muted">Contract: ${n.contract.years} season${n.contract.years===1?"":"s"} \xB7 ${Fc(n.contract.salary)} a season \xB7 career earnings ${Fc(n.earnings)}</span>
        <span class="retire"><button class="btn sm ghost" data-act="retire">Retire</button></span>
      </div>`,{play:()=>this.play(),sim:()=>this.simulate(),season:()=>this.seasonEnd(),offersTab:()=>this.hub("offers"),trainTab:()=>this.hub("train"),menu:()=>e.mainMenu(),retire:m=>{m.closest(".retire").innerHTML='<span class="small" style="font-weight:800">End this career?</span> <button class="btn sm" data-yes>Yes, retire</button> <button class="btn sm ghost" data-no>No</button>';let p=x.querySelector(".retire");p.querySelector("[data-yes]").addEventListener("click",()=>{i.career=null,i.saveCareer(),e.sfx("uiConfirm"),e.mainMenu()}),p.querySelector("[data-no]").addEventListener("click",()=>{e.sfx("uiClick"),this.hub()})}},"screen hub");x.querySelectorAll(".tab").forEach(m=>m.addEventListener("click",()=>{e.sfx("uiClick",.3),this.hub(m.dataset.tab)})),this.bindTab(x)}tabBody(t){let e=this.c,i=this.s,n=un(e);if(t==="table"){let r=this.lg||n.tier,a=Uc(e,r).map((o,l)=>`<tr class="${o.club.id===n.id?"me":""}"><td class="n">${l+1}</td><td><span class="club-chip">${hi(o.club,22)} ${re(o.club.name)}</span></td><td class="n">${o.w}</td><td class="n">${o.l}</td><td class="n">${o.pf-o.pa>0?"+":""}${o.pf-o.pa}</td></tr>`).join("");return`${i.seg("lg",[[3,"City"],[2,"National"],[1,"Premier"]],r)}
        <table class="t" style="margin-top:var(--s3)"><thead><tr><th class="n">#</th><th>${re(Be[r].name)}</th><th class="n">W</th><th class="n">L</th><th class="n">+/-</th></tr></thead><tbody>${a}</tbody></table>`}if(t==="games")return e.log.length?`<table class="t"><thead><tr><th class="n">Rd</th><th>Opponent</th><th>Result</th><th class="n">PTS</th><th class="n">Rating</th></tr></thead><tbody>${[...e.log].reverse().map(a=>{let o=ti(a.opp);return`<tr><td class="n">${a.round+1}</td><td><span class="club-chip">${a.home?"v":"@"} ${hi(o,20)} ${re(o.name)}</span></td><td><b style="color:${a.won?"var(--success)":"var(--danger)"}">${a.won?"W":"L"}</b> ${a.my}-${a.their}</td><td class="n">${a.line?a.line.pts:"-"}</td><td class="n"><b>${a.rating.toFixed(1)}</b>${a.sim?' <span class="small muted">sim</span>':""}</td></tr>`}).join("")}</tbody></table>`:'<p class="small muted">No games yet this season.</p>';if(t==="offers"){let r=e.offers.map(c=>{let h=ti(c.clubId);return`<div class="card offer"><div class="row">${hi(h,52)}<div style="flex:1;min-width:0"><b class="club-chip">${re(h.name)}</b><div class="small muted" style="margin-top:4px">${re(Be[h.tier].name)} \xB7 team rating ${h.strength}</div>
          <div class="small" style="margin-top:6px;font-weight:800">${c.years} season${c.years>1?"s":""} \xB7 ${Fc(c.salary)} a season \xB7 ${re(td(Ur(e.player.attrs),h))}</div>
          <div class="small muted">Expires after round ${Math.min(Ws,c.expires)}</div></div></div>
          <div class="actions" style="margin-top:var(--s3)"><button class="btn primary sm" data-accept="${c.id}">${Ut("check",16)} Sign</button><button class="btn ghost sm" data-decline="${c.id}">Decline</button></div></div>`}).join(""),a=Bn.filter(c=>(e.interest[c.id]||0)>5&&c.id!==n.id).sort((c,h)=>(e.interest[h.id]||0)-(e.interest[c.id]||0)).slice(0,4),o=a.length?`<div class="h-sec">Scouting interest</div>${a.map(c=>`<div class="attr" style="grid-template-columns:minmax(0,1.4fr) 1fr 36px"><span class="club-chip">${hi(c,22)} ${re(c.name)}</span><div class="bar gold"><i style="width:${Math.min(100,e.interest[c.id])}%"></i></div><b>${Math.min(100,e.interest[c.id])}</b></div>`).join("")}`:"",l=n.tier>1?`Clubs in the ${Be[n.tier-1].name} start watching from reputation ${Be[n.tier-1].minRep} (you have ${Math.round(e.rep)}).`:"You are in the Premier League: the strongest clubs still want stars.";return`${r||`<p class="small muted">No offers yet. Scouts from bigger clubs watch your games: match ratings above about ${Be[Math.max(1,n.tier-1)].need.toFixed(1)} get them interested. ${l}</p>`}${o}`}if(t==="train"){let r=os.map(a=>{let o=e.player.attrs[a],l=ju(o);return`<div class="attr"><span>${Ca[a]}</span><div class="bar ${o>=85?"good":""}"><i style="width:${o}%"></i></div><b>${o}</b><button class="btn sm" data-train="${a}" ${e.points<l||o>=99?"disabled":""} title="Costs ${l} point${l>1?"s":""}">+</button></div>`}).join("");return`<div class="row" style="justify-content:space-between"><span class="badge cyan">${e.points} skill point${e.points===1?"":"s"}</span><span class="small muted">Overall ${Ur(e.player.attrs)} \xB7 higher ratings cost more</span></div>${r}
        <div class="small muted" style="margin-top:var(--s2)">Shooting widens the green, Ball handling speeds the dribble and beats steals, Speed is your pace, Defense wins steals and blocks, Passing makes passes sharper, Vertical is your jump.</div>`}if(t==="stats"){let r=id(e),a=e.totals,o=(c,h)=>`<div class="mini"><b>${c}</b><span>${h}</span></div>`,l=e.history.map(c=>{let h=ti(c.clubId);return`<tr><td class="n">${c.season}</td><td><span class="club-chip">${hi(h,20)} ${re(h.short)}</span></td><td class="n">${rd(c.pos)}</td><td class="n">${c.ppg.toFixed(1)}</td><td class="n">${c.rating.toFixed(1)}</td><td>${c.awards.map(d=>`<span class="badge gold" style="font-size:10px">${re(d)}</span>`).join(" ")}</td></tr>`}).join("");return`<div class="h-sec">Season ${e.season}</div>
        <div class="mini-stats">${o(r.gp,"Games")}${o(r.ppg.toFixed(1),"Points")}${o(r.rpg.toFixed(1),"Rebounds")}${o(r.apg.toFixed(1),"Assists")}${o(r.rating?r.rating.toFixed(1):"-","Avg rating")}${o(`${r.wins}-${r.gp-r.wins}`,"Record")}</div>
        <div class="h-sec">Career</div>
        <div class="mini-stats">${o(a.gp,"Games")}${o(a.pts,"Points")}${o(a.fga?`${Math.round(a.fgm/a.fga*100)}%`:"-","FG%")}${o(a.reb+"/"+a.ast,"Reb / Ast")}</div>
        ${l?`<table class="t" style="margin-top:var(--s3)"><thead><tr><th class="n">Season</th><th>Club</th><th class="n">Pos</th><th class="n">PPG</th><th class="n">Rtg</th><th>Awards</th></tr></thead><tbody>${l}</tbody></table>`:""}`}return`<div class="timeline" style="max-height:340px">${e.news.map(r=>`<div>${r.kind==="offer"?Ut("mail",14)+" ":r.kind==="scout"?Ut("eye",14)+" ":""}<b class="small muted">S${r.season} R${Math.min(Ws,r.round+1)}</b> ${re(r.text)}</div>`).join("")}</div>`}bindTab(t){let e=this.c,i=this.s,n=this.app;i.bindChoices(t,(r,a)=>{r==="lg"&&(this.lg=Number(a),this.hub("table"))}),t.querySelectorAll("[data-train]").forEach(r=>r.addEventListener("click",()=>{Om(e,r.dataset.train)?(n.saveCareer(),i.sfx("uiReward",.25),this.hub("train")):i.sfx("uiError",.3)})),t.querySelectorAll("[data-accept]").forEach(r=>r.addEventListener("click",()=>{let a=e.offers.find(l=>l.id===Number(r.dataset.accept));if(!a)return;let o=ti(a.clubId);Nm(e,a.id)&&(n.saveCareer(),i.sfx("uiReward",.45),this.lg=null,this.hub("table"),i.toast(`Welcome to ${o.name}!`,"good"))})),t.querySelectorAll("[data-decline]").forEach(r=>r.addEventListener("click",()=>{Dm(e,Number(r.dataset.decline))&&(n.saveCareer(),i.sfx("uiClick"),this.hub("offers"))}))}play(){let t=this.c,e=this.app,i=Ha(t);if(!i)return;let n=un(t),r=i.home?n:i.opp,a=i.home?i.opp:n;e.startGame({format:"full",size:5,career:!0,homeTeam:r,awayTeam:a,humanSide:i.home?0:1,player:{...t.player,attrs:{...t.player.attrs}},difficulty:t.difficulty,length:t.quarterLength,venue:Be[r.tier].venue,title:`${Be[n.tier].name} \xB7 Season ${t.season} \xB7 Round ${i.round+1}`})}simulate(){let t=this.c,e=km(t,this.quarter());this.app.saveCareer(),e&&this.report(e,null)}result(t){let e=this.app,i=this.c;if(e.input.active=!1,e.input.exitLock(),e.hud.show(!1),!i){this.s.mainMenu();return}let n=t.match,r=n.human;if(!t.careerSum){let a=(n.quarterLen*4+Math.max(0,n.period-4)*n.otLen)/60;t.careerSum=nd(i,{my:n.teams[r.team].score,their:n.teams[1-r.team].score,line:n.stats.of(r),minutes:a},n.quarterLen),e.saveCareer();let o=e.records;o.games++,o.points+=n.stats.of(r).pts,t.careerSum&&t.careerSum.won?(o.wins++,e.platform.happytime()):o.losses++,e.saveRecords()}this.report(t.careerSum,t)}report(t,e){let i=this.s,n=this.c,r=this.app;if(i.current="careerResult",!t){this.hub();return}let a=un(n),o=e?e.match.stats.of(e.match.human):null,l=(f,g)=>`<div class="mini"><b>${f}</b><span>${g}</span></div>`,c=t.newOffers.map(f=>{let g=ti(f.clubId);return`<div class="tip"><b>${Ut("mail",14)} Offer from ${re(g.name)}</b>${re(Be[g.tier].name)} \xB7 ${f.years} season${f.years>1?"s":""} \xB7 ${Fc(f.salary)} a season</div>`}).join(""),h=t.notes.map(f=>`<div class="tip"><b>${Ut("eye",14)} Scouts</b>${re(f)}</div>`).join(""),d=(t.opp,a),u=i.show(`<div class="panel result report">
      <div class="small muted r-title" style="font-weight:800;text-transform:uppercase;letter-spacing:1px">Season ${t.season} \xB7 Round ${t.round}${t.sim?" \xB7 simulated":""}</div>
      <div class="result-word ${t.won?"win":"loss"}">${t.won?"Win!":"Defeat"}</div>
      <div class="scoreline"><div class="side">${hi(d,52)}${re(d.short)}</div><div class="sc">${t.my} - ${t.their}</div><div class="side">${hi(t.opp,52)}${re(t.opp.short)}</div></div>
      <div class="rating-hero"><span class="lab">Match rating</span><span class="num ${Bm(t.rating)}">${t.rating.toFixed(1)}</span></div>
      ${o?`<div class="key-stats">${l(o.pts,"Points")}${l(`${o.fgm}/${o.fga}`,"Field goals")}${l(`${o.oreb+o.dreb}/${o.ast}`,"Reb / Ast")}</div>`:""}
      <div class="trophies" style="justify-content:center;margin:var(--s2) 0">
        <span class="badge cyan">${Ut("up",14)} +${t.pts} skill point${t.pts>1?"s":""}</span>
        <span class="badge ${t.repDelta>=0?"good":"bad"}">Reputation ${t.repDelta>=0?"+":""}${t.repDelta.toFixed(1)} (${Math.round(t.rep)})</span>
      </div>
      ${c||h?`<div class="tips" style="text-align:left">${c}${h}</div>`:""}
      <div class="actions mid">
        <button class="btn primary lg" data-act="go">${Ut("play")} ${n.seasonOver?"Season review":"Continue"}</button>
        ${e?`<button class="btn ghost sm" data-act="box">${Ut("chart",16)} Box score</button>`:""}
      </div>
      <div class="more" hidden></div>
    </div>`,{go:()=>{e&&r.endSession(),this.hub(t.newOffers.length?"offers":n.points>=3?"train":"table")},box:f=>{let g=u.querySelector(".more");if(g.hidden&&!g.innerHTML){let x=e.match,m=x.human,p=v=>{let E=x.stats.of(v);return`<tr class="${v===m?"me":""}"><td>${re(x.teams[v.team].short)}</td><td>#${v.number} ${re(v.name)}</td><td>${E.pts}</td><td>${E.fgm}/${E.fga}</td><td>${E.tpm}/${E.tpa}</td><td>${E.oreb+E.dreb}</td><td>${E.ast}</td><td>${E.stl}</td><td>${E.blk}</td><td>${E.tov}</td></tr>`};g.innerHTML=`<table class="box"><thead><tr><th></th><th>Player</th><th>PTS</th><th>FG</th><th>3PT</th><th>REB</th><th>AST</th><th>STL</th><th>BLK</th><th>TO</th></tr></thead><tbody>${x.players.map(p).join("")}</tbody></table>`}g.hidden=!g.hidden,f.innerHTML=`${Ut("chart",16)} ${g.hidden?"Box score":"Hide"}`}});i.sfx(t.won?"uiReward":"uiConfirm",.4)}seasonEnd(){let t=this.s,e=this.c,i=this.app;t.current="careerSeason";let n=Um(e);i.saveCareer();let r=n.champions.map(a=>`<div class="tip"><b class="club-chip">${hi(a.club,22)} ${re(a.club.name)}</b>${re(Be[a.tier].name)} champions</div>`).join("");t.show(`<div class="panel result"><div class="small muted" style="font-weight:800;text-transform:uppercase;letter-spacing:1px">Season ${n.season} review</div>
      <div class="result-word ${n.pos===1?"win":""}">${rd(n.pos)} place</div>
      <div class="scorers" style="margin:var(--s2) 0">${re(n.club.name)} \xB7 ${re(Be[n.club.tier].name)}</div>
      <div class="key-stats"><div class="mini"><b>${n.av.gp}</b><span>Games</span></div><div class="mini"><b>${n.av.ppg.toFixed(1)}</b><span>Points</span></div><div class="mini"><b>${n.av.rating.toFixed(1)}</b><span>Avg rating</span></div></div>
      ${n.awards.length?`<div class="trophies" style="justify-content:center;margin-bottom:var(--s3)">${n.awards.map(a=>`<span class="badge gold">${Ut("trophy",14)} ${re(a)}</span>`).join("")}</div>`:""}
      <div class="tips" style="text-align:left">${r}</div>
      ${e.offers.length?`<div class="small" style="margin-top:var(--s3);font-weight:800;color:var(--primary)">${e.offers.length} club${e.offers.length>1?"s want":" wants"} to sign you for next season.</div>`:""}
      <div class="actions mid"><button class="btn primary lg" data-act="go">${Ut("play")} Season ${e.season}</button></div></div>`,{go:()=>this.hub(e.offers.length?"offers":"table")}),t.sfx("uiReward",.4)}};var Oe=s=>String(s).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),t1=`<svg class="logo-ball" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46" fill="#ff7a1a" stroke="#070b1d" stroke-width="6"/>
  <path d="M50 4v92M4 50h92" stroke="#070b1d" stroke-width="5" fill="none"/>
  <path d="M20 13c14 12 14 62 0 74M80 13c-14 12-14 62 0 74" stroke="#070b1d" stroke-width="5" fill="none"/></svg>`,e1=["Crop","Afro","Buzz","Headband","Braids","Bald"];function hi(s,t=48){let[e,i]=s.colors;return`<svg class="crest" width="${t}" height="${t}" viewBox="0 0 48 48" aria-hidden="true"><path d="M24 3 42 9v14c0 11-8 19-18 22C14 42 6 34 6 23V9z" fill="${e}" stroke="#070b1d" stroke-width="3"/>
    <path d="M6 23h36" stroke="${i}" stroke-width="3"/><circle cx="24" cy="23" r="9" fill="${i}" stroke="#070b1d" stroke-width="2.5"/>
    <text x="24" y="27.5" text-anchor="middle" font-family="Arial Black, Arial" font-weight="900" font-size="12" fill="${e}">${Oe(s.short[0])}</text></svg>`}var zc=class{constructor(t){this.app=t,this.root=document.createElement("div"),this.root.className="screens",t.uiRoot.appendChild(this.root),this.current=null,this.lastShown=null,this.setup={format:"3v3",home:"harbor",away:"mesa",venue:"arena"},this.career=new Bc(this);let e=null,i=0;this.root.addEventListener("pointerover",n=>{if(n.pointerType!=="mouse")return;let r=n.target.closest(".btn:not(:disabled), .card.pick, .tab, .opt, .sw");if(!r||r===e)return;e=r;let a=performance.now();a-i>60&&(i=a,this.sfx("uiHover",.12))})}sfx(t,e=.4){this.app.audio.play(t,{gain:e})}show(t,e={},i="screen center dim"){let n=this.current&&this.current===this.lastShown;this.lastShown=this.current,n||this.sfx("uiSwoosh",.18),this.root.innerHTML=`<div class="${i}">${t}</div>`;let r=this.root.firstChild;return n&&r.querySelectorAll(":scope > *").forEach(a=>{a.style.animation="none"}),r.querySelectorAll("[data-act]").forEach(a=>{let o=e[a.dataset.act];o&&a.addEventListener("click",l=>{l.preventDefault(),!a.disabled&&(this.sfx(a.classList.contains("primary")?"uiConfirm":"uiClick",a.classList.contains("primary")?.35:.4),o(a,l))})}),r}clear(){this.root.innerHTML="",this.current=null,this.lastShown=null}toast(t,e=!1,i=3200){let n=document.createElement("div");n.className="toast"+(e===!0?" bad":e==="good"?" good":""),n.textContent=t,this.app.uiRoot.appendChild(n),e===!0&&this.sfx("uiError",.35),setTimeout(()=>n.remove(),i)}seg(t,e,i){return`<div class="seg" data-key="${t}">${e.map(([n,r])=>`<button class="opt ${String(i)===String(n)?"on":""}" data-v="${n}">${r}</button>`).join("")}</div>`}bindChoices(t,e){t.querySelectorAll(".seg").forEach(i=>i.querySelectorAll(".opt").forEach(n=>n.addEventListener("click",()=>{i.querySelectorAll(".opt").forEach(a=>a.classList.remove("on")),n.classList.add("on"),this.sfx("uiClick",.35);let r=n.dataset.v;r==="true"?r=!0:r==="false"&&(r=!1),e(i.dataset.key,r,n)})))}slider(t,e,i,n,r,a){let o=(r-e)/(i-e)*100;return`<div class="slider"><input class="range" type="range" id="${t}" min="${e}" max="${i}" step="${n}" value="${r}" style="--p:${o}%"></div><span class="val" id="v-${t.slice(2)}">${a}</span>`}mainMenu(){this.current="menu";let t=this.app;t.hud.show(!1);let e=t.records,i=t.profile,n=li[i.archetype]||li.slasher,r=e.games?`${e.wins}-${e.losses} record`:"Two baskets, four quarters",a=t.settings.teamSize||5,o=t.career,l=o?`${Oe(o.player.name)} \xB7 ${Oe(this.career.clubName())}`:"Create your player";this.show(`
      <div class="menu-inner">
        <div class="menu-head">
          <div class="logo">${t1}<div class="logo-text">Court<em>side</em></div></div>
          <div class="tagline">First-person basketball. Your eyes. Your handles. Your shot.</div>
        </div>
        <div class="menu-actions col">
          <div class="menu-play"><button class="btn xl primary" data-act="play">${Ut("play",36)}<span class="stack">Play ${a}v${a}<small>Full court \xB7 ${Oe(r)}</small></span></button></div>
          <div class="menu-row">
            <button class="btn lg" data-act="career">${Ut("trophy")}<span class="stack">Career<small>${l}</small></span></button>
            <button class="btn lg" data-act="half">${Ut("user")}<span class="stack">Half Court<small>3x3 \xB7 1v1</small></span></button>
          </div>
          <div class="menu-row">
            <button class="btn" data-act="practice">${Ut("cone",20)} Practice</button>
            <button class="btn" data-act="player">${Ut("star",20)} My Player<small style="margin:0 0 0 6px">#${Oe(i.number)} ${Oe(n.name)}</small></button>
          </div>
          <div class="menu-icons">
            <button class="btn sm" data-act="settings">${Ut("gear",18)} Settings</button>
            <button class="btn sm" data-act="help">${Ut("help",18)} How to Play</button>
            <button class="btn sm" data-act="style">${Ut("brush",18)} Visual Style</button>
          </div>
        </div>
      </div>`,{play:()=>this.gameSetup("full"),half:()=>this.gameSetup(this.setup.half||"3v3"),career:()=>t.career?this.career.hub():this.career.create(),practice:()=>this.practiceMenu(),player:()=>this.myPlayer(),settings:()=>this.settings(),help:()=>this.howTo(),style:()=>this.styleMenu()},"screen menu")}gameSetup(t){this.current="setup";let e=this.app,i=this.setup,n=t==="full";i.format=t,n||(i.half=t),i.home===i.away&&(i.away=ci[(ci.findIndex(g=>g.id===i.home)+1)%ci.length].id);let r=g=>{let x=$i(i[g]);return`<div class="card team-pick">
        <div class="small muted" style="font-weight:800;text-transform:uppercase;letter-spacing:1px">${g==="home"?"Your team":"Opponent"}</div>
        ${hi(x,72)}
        <div class="tp-name">${Oe(x.name)}</div>
        <div class="tp-tier">Team rating ${x.strength}</div>
        <div class="row"><button class="btn sm icon" data-act="${g}Prev" aria-label="Previous">${Ut("left",18)}</button><button class="btn sm icon" data-act="${g}Next" aria-label="Next">${Ut("right",18)}</button></div>
      </div>`},a=(g,x)=>{let m=ci.findIndex(p=>p.id===i[g]);do m=(m+x+ci.length)%ci.length;while(ci[m].id===i[g==="home"?"away":"home"]);i[g]=ci[m].id,this.gameSetup(t)},o=as[e.settings.gameLength]||as.normal,l=e.settings.teamSize||5,c=n?"Full Court":"Half Court",h=n?"Two baskets, four quarters. 24-second shot clock, 8 seconds to get it over half court, throw-ins after baskets. Teams switch ends at half time.":t==="1v1"?"You against their best player. Half court, make your own shots.":"Half court, FIBA 3x3 style: check ball, clear it after a steal or rebound, 14-second shot clock.",d=n?`<div class="set"><span class="lab">Players</span>${this.seg("teamSize",[[5,"5v5"],[4,"4v4"],[3,"3v3"]],l)}</div>
         <div class="set"><span class="lab">Quarters</span>${this.seg("quarterLength",Object.entries(Hi).map(([g,x])=>[g,x.label]),e.settings.quarterLength)}</div>`:`<div class="set"><span class="lab">Format</span>${this.seg("format",[["3v3","3v3"],["1v1","1v1"]],t)}</div>
         <div class="set"><span class="lab">Game</span>${this.seg("gameLength",Object.entries(as).map(([g,x])=>[g,x.label]),e.settings.gameLength)}</div>`,u=n?"Higher score after four quarters wins; a tie goes to overtime. Inside the arc 2, outside 3.":`${t==="1v1"?`1v1 is played to ${Math.min(11,o.target)}.`:`First to ${o.target} or the higher score at the buzzer.`} Inside the arc 2, outside 3.`,f=this.show(`<div class="panel wide"><div class="h-title">${c}</div>
      <p class="lead">${h}</p>
      <div class="vs">${r("home")}<div class="vs-mid">VS</div>${r("away")}</div>
      <div class="set"><span class="lab">Venue</span>${this.seg("venue",[["arena",Ns.arena.name],["gym",Ns.gym.name]],i.venue)}</div>
      <div class="set"><span class="lab">Difficulty</span>${this.seg("difficulty",Object.entries(Gs).map(([g,x])=>[g,x.label]),e.settings.difficulty)}</div>
      ${d}
      <div class="small muted" style="margin-top:6px">${u}</div>
      <div class="actions"><button class="btn primary lg" data-act="go">${Ut("play")} Tip off</button><button class="btn ghost" data-act="back">Back</button></div></div>`,{homePrev:()=>a("home",-1),homeNext:()=>a("home",1),awayPrev:()=>a("away",-1),awayNext:()=>a("away",1),go:()=>e.startGame({format:i.format,home:i.home,away:i.away,venue:i.venue}),back:()=>this.mainMenu()});this.bindChoices(f,(g,x)=>{if(g==="venue"){i.venue=x;return}if(g==="format"){this.gameSetup(x);return}e.settings[g]=g==="teamSize"?Number(x):x,e.applySettings(),e.commitSettings(),g==="teamSize"&&this.gameSetup(t)})}myPlayer(){this.current="player";let t=this.app,e=t.profile,i=li[e.archetype]||li.slasher,n=(o,l,c)=>`<div class="swatches" data-sw="${o}">${l.map(h=>`<button class="sw ${h===c?"on":""}" data-c="${h}" style="background:${h}" aria-label="${h}"></button>`).join("")}</div>`,r=Object.entries(i.attrs).map(([o,l])=>`<div class="attr" style="grid-template-columns:110px 1fr 36px"><span>${Ca[o]}</span><div class="bar ${l>=85?"good":""}"><i style="width:${l}%"></i></div><b>${l}</b></div>`).join(""),a=this.show(`<div class="panel wide"><div class="h-title">My Player</div>
      <div class="grid2">
        <div>
          <div class="h-sec">Name &amp; number</div>
          ${t.platform.lockedName?`<div class="field" style="display:flex;align-items:center">${Oe(t.platform.lockedName)}</div><div class="small muted" style="margin-top:4px">Your CrazyGames name</div>`:`<input class="field" id="pname" maxlength="16" value="${Oe(e.name)}" placeholder="Your name">`}
          <div class="stepper" style="margin-top:var(--s3)"><button class="btn sm icon" data-act="numDown" aria-label="Lower number">${Ut("minus",18)}</button><span class="pv">#${e.number}</span><button class="btn sm icon" data-act="numUp" aria-label="Higher number">${Ut("plus",18)}</button></div>
          <div class="h-sec">Look</div>
          <div class="set"><span class="lab">Skin</span>${n("skin",us.SKIN,e.look.skin)}</div>
          <div class="set"><span class="lab">Hair</span>${n("hair",us.HAIR,e.look.hair)}</div>
          <div class="set"><span class="lab">Style</span>${this.seg("style",e1.map((o,l)=>[l,o]),e.look.style||0)}</div>
          <div class="set"><span class="lab">Shoes</span>${n("shoes",us.SHOES,e.look.shoes)}</div>
        </div>
        <div>
          <div class="h-sec">Play style</div>
          <div class="choices">${Object.values(li).map(o=>`<button class="card pick choice ${o.id===i.id?"on":""}" data-arch="${o.id}"><b>${o.name} \xB7 ${o.pos}</b><span>${o.desc}</span></button>`).join("")}</div>
          <div class="h-sec">Attributes</div>
          ${r}
        </div>
      </div>
      <div class="actions"><button class="btn primary lg" data-act="done">Done</button></div></div>`,{numDown:()=>{e.number=(e.number+99)%100,this.myPlayer()},numUp:()=>{e.number=(e.number+1)%100,this.myPlayer()},done:()=>{t.saveProfile(),this.mainMenu()}});a.querySelector("#pname")?.addEventListener("input",o=>{e.name=o.target.value.trim().slice(0,16)||"You"}),a.querySelectorAll("[data-arch]").forEach(o=>o.addEventListener("click",()=>{e.archetype=o.dataset.arch,this.sfx("uiClick"),t.saveProfile(),this.myPlayer()})),a.querySelectorAll("[data-sw]").forEach(o=>o.querySelectorAll(".sw").forEach(l=>l.addEventListener("click",()=>{e.look[o.dataset.sw]=l.dataset.c,o.querySelectorAll(".sw").forEach(c=>c.classList.toggle("on",c===l)),this.sfx("uiClick",.3)}))),this.bindChoices(a,(o,l)=>{o==="style"&&(e.look.style=Number(l))})}practiceMenu(){this.current="practice";let t=this.app,e=t.records,i=(n,r,a,o,l="")=>`<button class="card pick choice" data-act="${n}" style="min-height:120px">${Ut(r,28)}<b>${a} ${l}</b><span>${o}</span></button>`;this.show(`<div class="panel mid"><div class="h-title">Practice</div>
      <div class="choices" style="grid-template-columns:repeat(auto-fill,minmax(180px,1fr))">
        ${i("tutorial","help","Tutorial","The basics in two minutes: look, dribble, shoot, finish at the rim, pass and steal.")}
        ${i("drills","whistle","Practice Court","Coach Mo walks you through dribbling, crossovers, shooting, layups and dunks, passing, stance, steals and blocks.",e.practiceDone?'<span class="badge good">done</span>':'<span class="badge gold pulse">start here</span>')}
        ${i("shootout","trophy","Shootout","60 seconds to score as much as you can. The gold hot spot doubles a make.",e.bestShootout?`<span class="badge cyan">best ${e.bestShootout}</span>`:"")}
        ${i("free","ball","Free Shootaround","No clock. Find your range; a rebounder feeds you.")}
      </div>
      <div class="actions"><button class="btn ghost" data-act="back">Back</button></div></div>`,{tutorial:()=>t.startPractice("tutorial"),drills:()=>t.startPractice("drills"),shootout:()=>t.startPractice("shootout"),free:()=>t.startPractice("free"),back:()=>this.mainMenu()})}ready(t){let e=this.app;e.input.active=!1,e.input.exitLock(),e.hud.show(!1),this.current="ready";let i=t.cfg.practice.summary();i.completed&&e.platform.happytime();let n=Hi[e.settings.quarterLength]||Hi.short,r=e.input.touchMode;this.show(`<div class="panel ready">
      <div class="ready-done">${i.completed?`${Ut("check",18)} Tutorial complete \xB7 ${i.done}/${i.total}`:"Tutorial skipped"}</div>
      <div class="go-big">Are you ready?</div>
      <div class="ready-sub">Your first game: 5 against 5, full court.<br>Harbor Hawks v Mesa Comets \xB7 ${Oe(n.label)}</div>
      <button class="btn xl primary" data-act="go">${Ut("play",32)} Play 5v5</button>
      <div class="small muted" style="margin-top:var(--s3)">${r?"Tap II to pause":"P pauses \xB7 the menu has everything else"}</div>
    </div>`,{go:()=>e.startFirstGame()},"screen center dim"),this.sfx("uiReward",.4)}refresh(){this.current==="menu"?this.mainMenu():this.current==="player"?this.myPlayer():this.current==="career"&&this.careerHub()}practiceResult(t){let e=this.app;e.input.active=!1,e.input.exitLock(),e.hud.show(!1),this.current="presult";let i=t.cfg.practice.summary(),n="",r="Nice work!";if(i.kind==="drills")e.records.practiceDone=!0,r=i.done===i.total?"Drills done!":"Session over",n=`<div class="stars">${Array.from({length:i.total},(a,o)=>`<i class="${o<i.stars?"":"off"}" style="animation-delay:${o*.07}s">\u2605</i>`).join("")}</div>
        <div class="small muted" style="margin:6px 0 var(--s3)">${i.done}/${i.total} drills completed \xB7 a star for each under par</div>
        <div class="tips">${i.rows.map(a=>`<div class="tip"><b>${a.done?a.star?"\u2605 ":"\u2713 ":"\u2013 "}${Oe(a.say)}</b>${a.done?`${a.t.toFixed(1)} s`:"skipped"}</div>`).join("")}</div>`;else{let a=e.records.bestShootout||0,o=i.kind==="shootout"&&i.points>a;o&&(e.records.bestShootout=i.points),r=i.kind==="shootout"?o?"New best!":"Time!":"Good session",n=`<div class="rating-hero"><span class="lab">${i.kind==="shootout"?"Points":"Made"}</span><span class="num ${o?"hi":""}">${i.kind==="shootout"?i.points:i.made}</span></div>
        <div class="key-stats"><div class="mini"><b>${i.made}/${i.att}</b><span>Made</span></div><div class="mini"><b>${i.att?Math.round(i.made/i.att*100):0}%</b><span>Accuracy</span></div><div class="mini"><b>${e.records.bestShootout||0}</b><span>Best</span></div></div>`}e.saveRecords(),this.show(`<div class="panel result"><div class="small muted" style="font-weight:800;text-transform:uppercase;letter-spacing:1px">${Oe(i.title)}</div>
      <div class="result-word win">${r}</div>${n}
      <div class="actions mid"><button class="btn primary lg" data-act="again">${Ut("play")} Again</button><button class="btn" data-act="practice">Practice</button><button class="btn ghost" data-act="menu">Main menu</button></div></div>`,{again:()=>{let a=i.kind;e.endSession(),e.startPractice(a)},practice:()=>{e.endSession(),this.practiceMenu()},menu:()=>{e.endSession(),this.mainMenu()}}),this.sfx("uiReward",.4)}careerHub(t){this.career.hub(t)}careerResult(t){this.career.result(t)}result(t){let e=this.app;e.input.active=!1,e.input.exitLock(),e.hud.show(!1),this.current="result";let i=t.match,n=i.human,r=i.stats.report(n),a=r.stats,o=r.score[n.team],l=r.score[1-n.team],c=o>l?"win":o<l?"loss":"draw";if(!t.committed){t.committed=!0;let p=e.records;p.games++,p.points+=a.pts,c==="win"?(p.wins++,e.platform.happytime()):c==="loss"&&p.losses++,e.saveRecords()}let h={win:"You win!",loss:"Defeat",draw:"Draw"}[c],d=$i(i.teams[0].id),u=$i(i.teams[1].id),f=(p,v)=>`<div class="mini"><b>${p}</b><span>${v}</span></div>`,g=p=>p==null?"-":`${p}%`,x=p=>{let v=i.stats.of(p);return`<tr class="${p===n?"me":""}"><td>${Oe(i.teams[p.team].short)}</td><td>#${p.number} ${Oe(p.name)}</td><td>${v.pts}</td><td>${v.fgm}/${v.fga}</td><td>${v.tpm}/${v.tpa}</td><td>${v.oreb+v.dreb}</td><td>${v.ast}</td><td>${v.stl}</td><td>${v.blk}</td><td>${v.tov}</td></tr>`},m=this.show(`
      <div class="panel result report">
        <div class="small muted r-title" style="font-weight:800;text-transform:uppercase;letter-spacing:1px">${Oe(t.cfg.title||"Final")}</div>
        <div class="result-word ${c}">${h}</div>
        <div class="r-cols">
          <div class="r-match">
            <div class="scoreline"><div class="side">${hi(d,56)}${Oe(i.teams[0].name)}</div><div class="sc">${r.score[0]} - ${r.score[1]}</div><div class="side">${hi(u,56)}${Oe(i.teams[1].name)}</div></div>
            <div class="scorers">Player of the game: ${r.mvp?Oe(r.mvp.name):"-"}${i.inOvertime?" \xB7 overtime":""}</div>
          </div>
          <div class="r-you">
            <div class="rating-hero"><span class="lab">Your grade</span><span class="num ${/^A/.test(r.grade)?"hi":/^[DF]/.test(r.grade)?"lo":""}" id="r-num">${r.grade}</span></div>
            <div class="key-stats">${f(a.pts,"Points")}${f(`${a.fgm}/${a.fga}`,"Field goals")}${f(a.ast+a.stl+a.blk,"AST+STL+BLK")}</div>
          </div>
        </div>
        <div class="actions mid">
          <button class="btn primary lg" data-act="again">${Ut("play")} Rematch</button>
          <button class="btn" data-act="change">Change teams</button>
          <button class="btn ghost" data-act="menu">Main menu</button>
          <button class="btn ghost sm" data-act="more">${Ut("chart",16)} Box score</button>
        </div>
        <div class="more" hidden>
          <div class="mini-stats">${f(g(a.fgPct),"FG%")}${f(`${a.tpm}/${a.tpa}`,"3PT")}${f(`${a.ftm}/${a.fta}`,"FT")}${f(a.reb,"Rebounds")}${f(a.ast,"Assists")}${f(a.stl,"Steals")}${f(a.blk,"Blocks")}${f(a.tov,"Turnovers")}</div>
          <table class="box"><thead><tr><th></th><th>Player</th><th>PTS</th><th>FG</th><th>3PT</th><th>REB</th><th>AST</th><th>STL</th><th>BLK</th><th>TO</th></tr></thead><tbody>${i.players.map(x).join("")}</tbody></table>
          <div class="small muted" style="margin-top:6px;text-align:center">Possession ${r.possession[0]}% - ${r.possession[1]}% \xB7 Fouls ${r.teams[0].pf} - ${r.teams[1].pf}</div>
        </div>
      </div>`,{more:p=>{let v=m.querySelector(".more");v.hidden=!v.hidden,p.innerHTML=`${Ut("chart",16)} ${v.hidden?"Box score":"Hide"}`,v.hidden||v.scrollIntoView({behavior:"smooth",block:"nearest"})},again:()=>{e.endSession(),e.startGame(e.lastGame||{})},change:()=>{let p=(e.lastGame||{}).format||"full";e.endSession(),this.gameSetup(p)},menu:()=>{e.endSession(),this.mainMenu()}});this.sfx(c==="win"?"uiReward":"uiConfirm",.4)}styleMenu(t=!1,e=null){this.current=t?"pauseSub":"style";let i=this.app,n={};try{let a=i.session?null:{pos:[6.5,2.4,5.6],look:[12.4,2.6,0]};for(let o of["classic","neo"])n[o]=i.view.renderPreview(o,480,270,a)}catch{n={}}let r=(a,o,l)=>`<div class="card pick preview ${i.style===a?"on":""}" data-act="pick" data-s="${a}">${n[a]?`<img src="${n[a]}" alt="${o}">`:""}<h3>${o}</h3><div class="small" style="color:var(--text2);font-weight:600">${l}</div></div>`;this.show(`<div class="panel wide"><div class="h-title">Visual Style</div>
      <div class="previews">${r("classic","Classic","Ink drawing: pale colours, thin black lines.")}${r("neo","Neobrutalist","Bold colours, thick outlines, hard shadows.")}</div>
      <div class="actions"><button class="btn primary" data-act="back">Done</button></div></div>`,{pick:a=>{i.setStyle(a.dataset.s),this.styleMenu(t,e)},back:()=>{i.commitSettings(),e?e():t?this.pauseMenu():this.mainMenu()}})}settings(t=!1,e="game"){this.current=t?"pauseSub":"settings";let i=this.app,n=i.settings,r=(h,d)=>`<div class="tab-body" data-body="${h}" ${h===e?"":"hidden"}>${d}</div>`,a=(h,d)=>`<div class="set"><span class="lab">${h}</span>${d}</div>`,o=h=>this.seg(h,[[!0,"On"],[!1,"Off"]],n[h]),l=this.show(`<div class="panel mid"><div class="h-title">Settings</div>
      <div class="tabs">${[["game","Game"],["controls","Controls"],["video","Video"],["audio","Audio"]].map(([h,d])=>`<button class="tab ${h===e?"on":""}" data-tab="${h}">${d}</button>`).join("")}</div>
      ${r("game",`${a("Difficulty",this.seg("difficulty",Object.entries(Gs).map(([h,d])=>[h,d.label]),n.difficulty))}
        <div class="small muted" style="margin:-4px 0 6px">Rookie: a wider green on the meter, slower opponents. All-Star: they read your passes and close out hard.</div>
        ${a("Quarters",this.seg("quarterLength",Object.entries(Hi).map(([h,d])=>[h,d.label]),n.quarterLength))}
        ${a("Players",this.seg("teamSize",[[5,"5v5"],[4,"4v4"],[3,"3v3"]],n.teamSize))}
        ${a("Half court game",this.seg("gameLength",Object.entries(as).map(([h,d])=>[h,d.label]),n.gameLength))}
        ${a("Shot meter",o("meter"))}`)}
      ${r("controls",`${a("Look speed",this.slider("s-sens",.2,3,.05,n.sensitivity,n.sensitivity.toFixed(2)))}
        ${a("Invert Y",this.seg("invertY",[[!1,"Off"],[!0,"On"]],n.invertY))}
        ${a("Touch controls",this.seg("touch",[["auto","Auto"],["on","On"],["off","Off"]],n.touch))}`)}
      ${r("video",`${a("Style",`<div class="row">${this.seg("style",[["classic","Classic"],["neo","Neo"]],i.style)}<button class="btn sm icon" data-act="preview" title="Preview" aria-label="Preview styles">${Ut("eye",18)}</button></div>`)}
        ${a("Quality",this.seg("quality",[["low","Low"],["medium","Medium"],["high","High"]],n.quality))}
        ${a("Field of view",this.slider("s-fov",Yu,Ku,1,n.fov,`${n.fov}\xB0`))}
        ${a("View bob",o("bob"))}
        ${a("Camera shake",o("shake"))}`)}
      ${r("audio",`${a("Master",this.slider("s-master",0,1,.05,n.master,Fr(n.master)))}
        ${a("Effects",this.slider("s-sfx",0,1,.05,n.sfx,Fr(n.sfx)))}
        ${a("Crowd",this.slider("s-crowd",0,1,.05,n.crowd,Fr(n.crowd)))}`)}
      <div class="actions"><button class="btn primary lg" data-act="back">Done</button></div></div>`,{back:()=>{i.applySettings(),i.commitSettings(),t?this.pauseMenu():this.mainMenu()},preview:()=>{i.applySettings(),this.styleMenu(t,()=>this.settings(t,"video"))}});l.querySelectorAll(".tab").forEach(h=>h.addEventListener("click",()=>{e=h.dataset.tab,l.querySelectorAll(".tab").forEach(d=>d.classList.toggle("on",d===h)),l.querySelectorAll(".tab-body").forEach(d=>{d.hidden=d.dataset.body!==e}),this.sfx("uiClick",.3)}));let c=(h,d,u)=>{let f=l.querySelector(`#${h}`);f.addEventListener("input",()=>{n[d]=parseFloat(f.value),f.style.setProperty("--p",`${(n[d]-+f.min)/(+f.max-+f.min)*100}%`),l.querySelector(`#v-${h.slice(2)}`).textContent=u(n[d]),i.applySettings()})};c("s-sens","sensitivity",h=>h.toFixed(2)),c("s-fov","fov",h=>`${h}\xB0`),c("s-master","master",Fr),c("s-sfx","sfx",Fr),c("s-crowd","crowd",Fr),this.bindChoices(l,(h,d)=>{if(h==="style"){i.setStyle(d);return}n[h]=h==="teamSize"?Number(d):d,i.applySettings(),["difficulty","gameLength","quarterLength","teamSize"].includes(h)&&i.session&&this.toast("Applies from the next game.")})}howTo(t=!1){this.current=t?"pauseSub":"help";let e=this.app.input.touchMode,i=a=>`<div class="keys">${a.map(([o,l])=>`<div class="key"><span class="kc">${Oe(o)}</span><span>${Oe(l.split(" (")[0])}</span></div>`).join("")}</div>`,n=(a,o)=>`<div class="tip"><b>${a}</b>${o}</div>`,r=this.show(`<div class="panel wide"><div class="h-title">How to Play</div>
      <div class="tabs"><button class="tab ${e?"":"on"}" data-tab="kb">Keyboard &amp; mouse</button><button class="tab ${e?"on":""}" data-tab="touch">Touch</button></div>
      <div class="tab-body" data-body="kb" ${e?"hidden":""}>${i(Kp)}</div>
      <div class="tab-body" data-body="touch" ${e?"":"hidden"}>${i(Zp)}</div>
      <div class="h-sec">Tips</div>
      <div class="tips">
        ${n("The meter","Hold shoot. Let go in the green: it sits higher the further out you are. Early is short, late is long.")}
        ${n("Get open","Contested and on-the-move shots shrink the green. Pump fake (Space) and crossovers (Q) buy space.")}
        ${n("Attack the rim","Sprint at the basket and shoot near it: a layup, or a dunk if you have the bounce.")}
        ${n("Defence","Stay between your man (red ring) and the rim in a stance (C). Steal (E) when the dribble is low and on your side; reaching across the body is a foul.")}
      </div>
      <div class="h-sec">Full court</div>
      <div class="tips">
        ${n("Two baskets","Each team attacks one basket and defends the other; teams switch ends at half time. The radar always shows the basket you attack at the top.")}
        ${n("Clocks","Four quarters. 24-second shot clock (14 after an offensive rebound off the rim). 8 seconds to bring the ball over half court; once over, going back is a backcourt violation.")}
        ${n("Throw-ins","After a basket the other team inbounds from the baseline, after a whistle from the sideline; 5 seconds to get it in. Call for it (RMB) to get the ball.")}
        ${n("Fouls","Shooting fouls give free throws (and one if it goes in). From a team's 5th foul of a quarter every foul is two shots (a red bar on the scoreboard).")}
      </div>
      <div class="h-sec">Half court</div>
      <div class="tips">
        ${n("3x3 rules","Check ball at the top after a basket or a whistle. 14-second shot clock, reset when a shot hits the rim.")}
        ${n("Clear it","After a steal or a defensive rebound, take the ball beyond the arc before you score.")}
        ${n("Scoring","Two inside the arc, three outside, one per free throw. First to the target score, or ahead at the buzzer; a tie goes to sudden death.")}
      </div>
      <div class="small muted" style="margin-top:var(--s4)">Rendering: three.js (MIT). All teams and players are fictional; all art and sound are generated by the game.</div>
      <div class="actions"><button class="btn primary" data-act="back">Got it</button></div></div>`,{back:()=>t?this.pauseMenu():this.mainMenu()});r.querySelectorAll(".tab").forEach(a=>a.addEventListener("click",()=>{r.querySelectorAll(".tab").forEach(o=>o.classList.toggle("on",o===a)),r.querySelectorAll(".tab-body").forEach(o=>{o.hidden=o.dataset.body!==a.dataset.tab}),this.sfx("uiClick",.3)}))}pauseMenu(){this.current="pause";let t=this.app,e=t.session,i=e&&e.cfg.practice,n=e&&e.cfg.career,r=i&&i.kind==="tutorial";this.show(`<div class="panel narrow center-t"><div class="h-title">Paused</div>
      <div class="col">
        <button class="btn primary lg block" data-act="resume">${Ut("play")} Resume</button>
        <div class="grid2" style="gap:var(--s2)">
          <button class="btn sm" data-act="settings">${Ut("gear",18)} Settings</button>
          <button class="btn sm" data-act="controls">${Ut("help",18)} Controls</button>
          <button class="btn sm" data-act="style">${Ut("brush",18)} Visual Style</button>
          ${i?`<button class="btn sm" data-act="finish">${Ut("check",18)} ${r?"Skip tutorial":"Finish"}</button>`:`<button class="btn sm" data-act="stats">${Ut("chart",18)} Box Score</button>`}
        </div>
        <button class="btn ghost block" data-act="exit">${r?"Exit to Main Menu":i?"Exit to Practice":n?"Exit to Career":"Exit to Main Menu"}</button>
      </div>
      ${i?"":`<div class="small muted" style="margin-top:var(--s3)">${n?"Leaving abandons this game: it will not count, and you can play it again.":"Leaving ends this game."}</div>`}</div>`,{resume:()=>t.resume(),controls:()=>this.howTo(!0),settings:()=>this.settings(!0),style:()=>this.styleMenu(!0),stats:()=>this.liveStats(),finish:()=>{i&&(r?i.skipAll():i.finish(),t.unpause())},exit:()=>{r&&!i.done&&i.end(!1),t.endSession(),r?this.mainMenu():i?this.practiceMenu():n?this.careerHub():this.mainMenu()}})}liveStats(){this.current="pauseSub";let t=this.app.session.match,e=t.human,i=t.stats.report(e),n=i.stats,r=(a,o)=>`<div class="mini"><b>${a}</b><span>${o}</span></div>`;this.show(`<div class="panel narrow center-t"><div class="h-title">Box Score</div>
      <div class="scoreline" style="margin-top:0"><div class="side">${Oe(t.teams[0].short)}</div><div class="sc">${i.score[0]} - ${i.score[1]}</div><div class="side">${Oe(t.teams[1].short)}</div></div>
      <div class="rating-hero"><span class="lab">Your grade so far</span><span class="num">${i.grade}</span></div>
      <div class="mini-stats">${r(n.pts,"Points")}${r(`${n.fgm}/${n.fga}`,"FG")}${r(`${n.tpm}/${n.tpa}`,"3PT")}${r(n.ast,"Assists")}${r(n.reb,"Rebounds")}${r(n.stl,"Steals")}${r(n.blk,"Blocks")}${r(n.tov,"Turnovers")}</div>
      <div class="small muted" style="margin-top:var(--s3)">${t.full?`${t.periodLabel} \xB7 `:""}${t.displayClock} left \xB7 team fouls ${t.teams[0].fouls} - ${t.teams[1].fouls}</div>
      <div class="actions mid"><button class="btn primary" data-act="back">Back</button></div></div>`,{back:()=>this.pauseMenu()})}clickToPlay(t={}){this.current="click";let e=this.app.session;if(t.resume){let l=t.retry?"Click once more to capture the mouse":"Click or press Tab \xB7 P opens the menu",c=t.retry>=2?'<div class="actions mid"><button class="btn sm ghost" data-act="drag">Play with drag-to-look</button></div>':"";this.show(`<div class="panel narrow go-card"><div class="go-big">Click to continue</div><div class="go-sub">${l}</div>${c}</div>`,{drag:(h,d)=>{d.stopPropagation(),this.app.input.dragMode=!0,this.app.resume()}},"screen center dim"),this.root.firstChild.addEventListener("click",h=>{h.target.closest("[data-act]")||(this.sfx("uiConfirm",.3),this.app.resume())},{once:!0});return}let i=!this.seenControls;this.seenControls=!0;let n=e&&e.cfg.title?`<div class="small muted" style="font-weight:800;text-transform:uppercase;letter-spacing:1px">${Oe(e.cfg.title)}</div>`:"",r=this.app.input.touchMode,o=`<div class="keys" style="margin-top:var(--s4);text-align:left">${(r?[["Left thumb","Move"],["Right thumb","Look"],["SHOOT","Hold & release"],["PASS","To the ring"],["CROSS","Crossover"],["STEAL","On defence"],["II","Pause"]]:[["WASD","Move"],["Mouse","Look"],["Shift","Sprint"],["Left click","Shoot (hold)"],["Right click","Pass"],["Q","Crossover"],["E","Steal"],["Space","Jump / fake"],["C","Stance"],["P","Pause"]]).map(([l,c])=>`<div class="key"><span class="kc">${l}</span><span>${c}</span></div>`).join("")}</div>`;this.show(`<div class="panel mid go-card">${n}<div class="go-big">${r?"Tap to play":"Click to play"}</div>
      ${i?o:`<div class="go-sub">${r?"Left thumb move \xB7 right thumb look":"WASD move \xB7 mouse look \xB7 P pause"}</div>`}</div>`,{},"screen center dim"),this.root.firstChild.addEventListener("click",()=>{this.sfx("uiConfirm",.3),this.app.resume()},{once:!0})}};function Fr(s){return`${Math.round(s*100)}%`}var Ni=(s,t,e,i)=>{let n=document.createElement(s);return t&&(n.className=t),i!=null&&(n.innerHTML=i),e&&e.appendChild(n),n},Br=class{constructor(t,e,i,n={}){this.root=Ni("div","coach hidden",t),this.skipWord=n.skipWord||"Skip drill",this.showStars=n.stars!==!1;let r=Ni("div","coach-main",this.root),a=Ni("div","coach-txt",r);this.sayEl=Ni("div","coach-say",a),this.hintEl=Ni("div","coach-hint",a),this.skip=Ni("button","coach-skip",r,this.skipWord),this.skip.addEventListener("click",l=>{l.preventDefault(),i()}),this.skip.addEventListener("pointerdown",l=>l.stopPropagation());let o=Ni("div","coach-foot",this.root);this.dots=Ni("span","coach-dots",o);for(let l=0;l<e;l++)Ni("i","",this.dots);this.starsEl=Ni("span","coach-stars",o,this.showStars?"\u2605 0":""),this.bar=Ni("div","coach-bar",this.root),this.barFill=Ni("i","",this.bar),this.arrow=Ni("div","tut-arrow hidden",t),this.last={}}pointAt(t){let e=t&&(Math.abs(t.x)>.92||Math.abs(t.y)>.92);if(this.arrow.classList.toggle("hidden",!e),!e)return;let i=Math.atan2(t.y,t.x),n=.8,r=Math.min(n/Math.max(Math.abs(Math.cos(i)),.001),n/Math.max(Math.abs(Math.sin(i)),.001));this.arrow.style.left=`${(Math.cos(i)*r*.5+.5)*100}%`,this.arrow.style.top=`${(-Math.sin(i)*r*.5+.5)*100}%`,this.arrow.style.setProperty("--rot",`${-i}rad`)}show(t){this.root.classList.toggle("hidden",!t)}dispose(){this.root.remove(),this.arrow.remove()}update(t){let e=this.last;t.say!==e.say&&(this.sayEl.textContent=t.say,this.sayEl.classList.remove("pop"),this.sayEl.offsetWidth,this.sayEl.classList.add("pop")),t.hint!==e.hint&&(this.hintEl.textContent=t.hint||"",this.hintEl.classList.toggle("empty",!t.hint)),(t.index!==e.index||t.doneCount!==e.doneCount)&&[...this.dots.children].forEach((i,n)=>{i.className=n<t.doneCount?"done":n===t.index?"now":""}),t.stars!==e.stars&&this.showStars&&(this.starsEl.textContent=`\u2605 ${t.stars}`),t.step!==e.step&&(this.starsEl.textContent=t.step||""),t.keyboard!==e.keyboard&&(this.skip.textContent=t.keyboard?`${this.skipWord} (Enter)`:this.skipWord),this.root.classList.toggle("ok",!!t.ok),this.barFill.style.width=`${Math.round(Math.max(0,Math.min(1,t.frac))*100)}%`,this.last={...t}}};var ad=(s,t)=>({x:s,z:t});function i1(s,t){let e=Xi($i("harbor"),1),i={...e.roster[0],name:"Jojo Rebounds",number:11,archetype:"guard",attrs:{shooting:70,handling:70,speed:80,defense:60,passing:92,vertical:60}},n=[{...e,name:"You",short:"YOU",roster:[Zu(s),i]}],r=Xi($i("summit"),1),a={...r.roster[0],name:"Big Barry",number:50,archetype:"big",attrs:{shooting:70,handling:62,speed:58,defense:70,passing:60,vertical:66}};return n.push({...r,name:"Practice",short:"PRC",roster:t?[a]:[a]}),n}var Hr=class{constructor(t){this.app=t,this.t=0,this.made=0,this.att=0,this.points=0,this.done=!1}matchConfig(t){return{seed:77,rules:!1,difficulty:this.app.settings.difficulty,teams:i1(t,!0)}}attach(t){this.s=t;let e=t.match;this.human=e.human,this.reb=e.teams[0].players[1],this.dummy=e.teams[1].players[0],this.unsub=[e.events.on("shot",i=>{i.player===this.human&&i.kind!=="ft"&&this.att++}),e.events.on("basket",i=>this.onBasket(i))]}start(t){let e=t.match;e.setPhase("live"),e.offense=0,this.parkDummy(),e.place(this.human,F.X-6.5,.5),e.place(this.reb,F.X-1.6,-1.2),e.gainBall(this.human,"practice"),e.events.emit("snap",{t:e.time})}parkDummy(){this.s.match.place(this.dummy,2.2,-6.9,0),this.dummy.drill=e=>{e.desired.set(0,0,0),e.faceYaw=Math.PI/2}}onBasket(t){t.player===this.human&&(this.made++,this.points+=t.value)}step(){}frame(){}markers(){}dispose(){for(let t of this.unsub||[])t();this.card&&this.card.dispose()}finish(){let t=this.s.match;this.done=!0,t.setPhase("over"),t.phaseT=3.1,this.card&&(this.card.pointAt(null),this.card.show(!1))}},zr=[{id:"dribble",say:"Dribble around",hint:{kb:"Move with WASD while you have the ball",touch:"Move with the left stick"},par:8,limit:30},{id:"cross",say:"Crossover twice",hint:{kb:"Press Q to switch hands",touch:"Tap CROSS"},par:8,limit:30},{id:"jumper",say:"Hit a jump shot from the gold spot",hint:{kb:"Hold left mouse, release in the green",touch:"Hold SHOOT, release in the green"},par:20,limit:50},{id:"three",say:"Now a three from the gold spot",hint:{kb:"Further out: the green sits higher on the meter",touch:"Further out: the green sits higher"},par:25,limit:55},{id:"layup",say:"Drive and finish at the rim",hint:{kb:"Sprint (Shift) at the rim, then shoot: layup or dunk",touch:"Push the stick to sprint, then SHOOT near the rim"},par:12,limit:40},{id:"pass",say:"Pass to Jojo and get it back",hint:{kb:"Look at Jojo, right mouse to pass",touch:"Look at Jojo, tap PASS"},par:10,limit:35},{id:"stance",say:"Stay in front of Barry",hint:{kb:"Hold C for the stance, slide with A/D",touch:"Hold STANCE and slide"},par:10,limit:30},{id:"steal",say:"Steal the ball from Barry",hint:{kb:"Press E when the dribble is low and on your side",touch:"Tap STEAL when the dribble is low"},par:15,limit:40},{id:"block",say:"Block (or contest) Barry's shot",hint:{kb:"Space to jump with him as he rises",touch:"Tap BLOCK as he rises"},par:15,limit:40}],od=class extends Hr{constructor(t){super(t),this.title="Practice Court",this.idx=0,this.stars=0,this.results=[]}attach(t){super.attach(t);let e=t.match;this.card=new Br(this.app.uiRoot,zr.length,()=>this.skip(t)),this.card.show(!0),this.unsub.push(e.events.on("cross",i=>{i.player===this.human&&this.count++}),e.events.on("pass",i=>{i.player===this.human&&(this.passed=!0)}),e.events.on("gain",i=>{i.player===this.human&&this.passed&&this.count++}),e.events.on("poke",i=>{i.player===this.human&&this.count++}),e.events.on("block",i=>{i.player===this.human&&(this.count+=2)}),e.events.on("bounce",i=>{i.player===this.human&&this.human.speed>1.5&&this.dribbles++}))}start(t){super.start(t),this.begin(0)}begin(t){let e=this.s.match;if(this.idx=t,this.t=0,this.count=0,this.passed=!1,this.dribbles=0,this.inFront=0,this.resetAt=0,this.drill=zr[t],!this.drill){this.finish();return}let i=this.drill.id;if(this.spot=i==="jumper"?ad(fe.elbowL[0],fe.elbowL[1]):i==="three"?ad(fe.wingR[0],fe.wingR[1]):null,this.parkDummy(),e.place(this.reb,F.X-1.6,-1.6),i==="stance"||i==="steal"||i==="block")e.place(this.human,F.X-4.2,0,$t(-1,0)),this.setupDummy(i);else{let n=this.spot||ad(F.X-7,1.5);e.place(this.human,n.x-.6,n.z*.9),e.gainBall(this.human,"practice")}e.events.emit("snap",{t:e.time}),this.s.hud.notify(this.drill.say.toUpperCase(),"")}setupDummy(t){let e=this.s.match,i=this.dummy;e.place(i,F.X-6.8,0,$t(1,0)),e.gainBall(i,"practice");let n=1,r=0;if(t==="block"){i.drill=(a,o)=>{if(r+=o,a.desired.set(0,0,0),a.faceYaw=$t(F.X-a.pos.x,F.Z-a.pos.z),e.ball.owner===a&&e.ball.state==="held"&&!a.action&&r>2.2){r=0;let l=Fn(e,a,"jumper",ln(e,a),0);hs(e,a,{kind:"jumper",releaseCharge:l.c}),a.action&&(a.action.ai=!0)}};return}i.drill=(a,o)=>{e.ball.owner===a&&e.ball.state==="held"&&!a.action&&(En(a,"R",{}),e.ball.state="dribble"),r+=o,Math.abs(a.pos.z)>2.6&&(n=-Math.sign(a.pos.z));let l=t==="stance"?2.4:1.4;a.desired.set(Math.sin(r*.9)*.6,0,n*l),a.faceYaw=$t(F.X-a.pos.x,F.Z-a.pos.z)}}skip(t){this.done||(this.results[this.idx]={done:!1,t:this.t},this.begin(this.idx+1))}complete(){let t={done:!0,t:this.t,star:this.t<=this.drill.par};this.results[this.idx]=t,t.star&&this.stars++,this.app.audio.play("uiReward",{gain:.4}),this.s.hud.notify(t.star?"\u2605 NICE! UNDER PAR":"DONE!","good"),this.begin(this.idx+1)}onBasket(t){if(super.onBasket(t),t.player!==this.human||!this.drill)return;let e=this.drill.id;e==="jumper"&&t.kind!=="layup"&&t.kind!=="dunk"&&this.count++,e==="three"&&t.value===3&&this.count++,e==="layup"&&(t.kind==="layup"||t.kind==="dunk")&&this.count++}step(t,e){if(this.done||!this.drill)return;let i=t.match,n=this.human,r=this.dummy,a=this.drill.id;this.t+=e;let o=!1;if(a==="dribble")o=this.dribbles>=6;else if(a==="cross")o=this.count>=2;else if(a==="jumper"||a==="three"||a==="layup"||a==="pass")o=this.count>=1;else if(a==="stance"){let l=Le(n.pos.x,n.pos.z)<Le(r.pos.x,r.pos.z)-.3,c=n.pos.distXZ(r.pos)<1.9;l&&c&&n.stance&&(this.inFront+=e),o=this.inFront>=4}else if(a==="steal")o=this.count>=1;else if(a==="block"){o=this.count>=2;let l=r.action;l&&l.type==="shot"&&l.released&&!this.contested&&n.pos.distXZ(r.pos)<1.8&&(n.airborne||n.handsUp)&&(this.contested=!0,this.count++,t.hud.notify("CONTESTED","good")),l||(this.contested=!1)}if(o){this.complete();return}if(this.t>this.drill.limit){this.s.hud.notify("MOVING ON",""),this.skip(t);return}(a==="steal"||a==="block"||a==="stance")&&i.ball.owner!==r&&!(i.ball.shot&&!i.ball.shot.done&&!i.ball.shot.rim)?(this.resetAt+=e,this.resetAt>1.4&&(this.resetAt=0,i.place(r,r.pos.x,r.pos.z,$t(1,0)),i.gainBall(r,"practice"))):this.resetAt=0}frame(t){if(!this.card||!this.drill)return;let e=this.app.input.touchMode;this.card.update({index:this.idx,doneCount:this.idx,say:this.drill.say,hint:e?this.drill.hint.touch:this.drill.hint.kb,stars:this.stars,frac:1-this.t/this.drill.limit,keyboard:!e});let i=this.spot?{x:this.spot.x,y:.5,z:this.spot.z}:this.drill.id==="layup"?{x:F.X,y:F.Y,z:0}:this.drill.id==="pass"?this.reb.pos:["stance","steal","block"].includes(this.drill.id)?this.dummy.pos:null;if(i){let n=t.view.projectToScreen(t.view._pt||(t.view._pt=t.view.camera.position.clone()).set(i.x,i.y??1,i.z),t.view._pt2||(t.view._pt2=t.view.camera.position.clone()));this.card.pointAt(n)}else this.card.pointAt(null)}markers(t,e){this.spot&&e.showSpot(0,this.spot.x,this.spot.z,t.match.time)}hint(){return""}phaseText(){return`PRACTICE COURT \xB7 DRILL ${Math.min(zr.length,this.idx+1)}/${zr.length}`}clockText(){return`\u2605 ${this.stars}`}summary(){let t=this.results.filter(e=>e&&e.done).length;return{kind:"drills",title:"Practice Court",stars:this.stars,total:zr.length,done:t,rows:zr.map((e,i)=>({say:e.say,...this.results[i]||{done:!1}}))}}},Hc=[fe.cornerL,fe.wingL,fe.top,fe.wingR,fe.cornerR,fe.elbowL,fe.elbowR],Vc=class extends Hr{constructor(t,e=!0){super(t),this.timed=e,this.title=e?"Shootout":"Free Shootaround",this.len=60,this.hot=2}start(t){super.start(t),this.timed&&this.s.hud.showBanner("60 SECONDS","Hit the gold spot for double points",1800)}onBasket(t){if(t.player!==this.human)return;this.made++;let e=t.value,i=this.lastShotFrom;if(i&&this.timed){let n=Hc[this.hot];Math.hypot(i.x-n[0],i.z-n[1])<1&&(e*=2,this.s.hud.notify(`HOT SPOT \xD72 \xB7 +${e}`,"good"),this.hot=(this.hot+1+Math.floor(Math.random()*(Hc.length-1)))%Hc.length)}this.points+=e}attach(t){super.attach(t),this.unsub.push(t.match.events.on("shotStart",e=>{e.player===this.human&&(this.lastShotFrom={x:e.player.pos.x,z:e.player.pos.z})}))}step(t,e){if(!this.done&&(this.t+=e,this.timed&&this.t>=this.len)){let i=t.match;if(i.ball.shot&&!i.ball.shot.done&&i.ball.state==="free")return;t.audio.play("buzzer",{gain:.8}),this.finish()}}markers(t,e){if(!this.timed)return;let i=Hc[this.hot];e.showSpot(0,i[0],i[1],t.match.time)}hint(){return null}phaseText(){return this.timed?`SHOOTOUT \xB7 ${this.points} PTS \xB7 ${this.made}/${this.att}`:`SHOOTAROUND \xB7 ${this.made}/${this.att}`}clockText(){if(!this.timed)return`${this.made}/${this.att}`;let t=Math.max(0,this.len-this.t);return t<10?t.toFixed(1):`0:${String(Math.ceil(t)).padStart(2,"0")}`}summary(){return{kind:this.timed?"shootout":"free",title:this.title,points:this.points,made:this.made,att:this.att}}};function zm(s,t){return s==="shootout"?new Vc(t,!0):s==="free"?new Vc(t,!1):new od(t)}var Gm="courtside.tutorial";function Wm(){try{return!!bi.getItem(Gm)}catch{return!1}}function n1(s){try{bi.setItem(Gm,s)}catch{}}var $s=[{id:"look",say:"Turn to the basket",kb:"Move the mouse (follow the arrow)",touch:"Drag on the right side (follow the arrow)",cap:15},{id:"dribble",say:"Dribble to the gold circle",kb:"W A S D to move",touch:"Move with your left thumb",cap:18},{id:"shoot",say:"Shoot! Let go in the green",kb:"Hold left click, release in the green",touch:"Hold SHOOT, release in the green",cap:30},{id:"layup",say:"Sprint to the rim and score",kb:"Hold Shift to sprint, click near the rim",touch:"Push the stick all the way, SHOOT near the rim",cap:25},{id:"pass",say:"Pass to Jojo",kb:"Look at him, right click",touch:"Look at him, tap PASS",cap:18},{id:"steal",say:"Steal the ball from Barry",kb:"Get close, press E",touch:"Get close, tap STEAL",cap:25}],Hm=["NICE!","GREAT!","SWEET!","PERFECT!","EASY!","CLEAN!"],Vm=(s,t)=>({x:s,z:t}),Gc=class extends Hr{constructor(t){super(t),this.kind="tutorial",this.title="Tutorial",this.idx=-1,this.doneSteps=0,this.results=[],this.gap=0,this.total=0}attach(t){super.attach(t);let e=t.match;this.card=new Br(this.app.uiRoot,$s.length,()=>this.skipAll(),{skipWord:"Skip tutorial",stars:!1}),this.card.show(!0),this.unsub.push(e.events.on("pass",i=>{i.player===this.human&&(this.passed=!0)}),e.events.on("gain",i=>{i.player===this.human&&this.passed&&this.cur&&this.cur.id==="pass"&&this.count++}),e.events.on("poke",i=>{i.player===this.human&&this.count++}),e.events.on("shot",i=>{i.player===this.human&&this.tries++}))}start(t){super.start(t),t.hud.showBanner("WELCOME TO COURTSIDE","A quick warm-up, then your first game",2400,"mine"),this.begin(0)}begin(t){let e=this.s.match;if(this.idx=t,this.t=0,this.count=0,this.tries=0,this.passed=!1,this.hold=0,this.gap=0,this.resetAt=0,this.cur=$s[t],!this.cur){this.end(!0);return}let i=this.cur.id;this.spot=null,this.reb.ai.home=null,this.parkDummy(),e.place(this.reb,F.X-1.6,-1.6),i==="look"?(e.place(this.human,F.X-6.2,.6,$t(-.3,1)),e.gainBall(this.human,"practice")):i==="dribble"?(this.spot=Vm(fe.elbowR[0],fe.elbowR[1]),e.place(this.human,F.X-8.2,-1.4),e.gainBall(this.human,"practice")):i==="shoot"?(this.spot=Vm(fe.elbowR[0],fe.elbowR[1]),Math.hypot(this.human.pos.x-this.spot.x,this.human.pos.z-this.spot.z)>1.2&&e.place(this.human,this.spot.x,this.spot.z),e.ball.owner!==this.human&&e.gainBall(this.human,"practice")):i==="layup"?(e.place(this.human,F.X-7.6,0),e.gainBall(this.human,"practice")):i==="pass"?(e.place(this.reb,fe.wingL[0],fe.wingL[1]),this.reb.ai.home={x:fe.wingL[0],z:fe.wingL[1]},e.place(this.human,F.X-7,1.2),e.gainBall(this.human,"practice")):i==="steal"&&(e.place(this.human,F.X-4.4,0,$t(-1,0)),this.setupDribbler()),e.events.emit("snap",{t:e.time})}setupDribbler(){let t=this.s.match,e=this.dummy;t.place(e,F.X-6.6,0,$t(1,0)),t.gainBall(e,"practice");let i=1,n=0;e.drill=(r,a)=>{t.ball.owner===r&&t.ball.state==="held"&&!r.action&&(En(r,"R",{}),t.ball.state="dribble"),n+=a,Math.abs(r.pos.z)>2.2&&(i=-Math.sign(r.pos.z)),r.desired.set(Math.sin(n*.8)*.4,0,i*1.1),r.faceYaw=$t(F.X-r.pos.x,F.Z-r.pos.z)}}complete(t=!0){this.results[this.idx]={done:t,t:this.t},t&&this.doneSteps++,this.app.audio.play(t?"uiReward":"uiClick",{gain:.4}),this.okText=t?Hm[this.idx%Hm.length]:"MOVING ON",this.gap=1e-4}skip(){this.skipAll()}skipAll(){this.done||this.end(!1)}end(t){this.completed=t,n1(t?"done":"skipped"),this.finish()}onBasket(t){if(super.onBasket(t),t.player!==this.human||!this.cur)return;let e=this.cur.id;e==="shoot"&&t.kind!=="layup"&&t.kind!=="dunk"&&this.count++,e==="layup"&&(t.kind==="layup"||t.kind==="dunk")&&this.count++}step(t,e){if(this.done||!this.cur)return;let i=t.match,n=this.human,r=this.cur.id;if(this.total+=e,this.gap>0){this.gap+=e,this.gap>.9&&(this.okText=null,this.begin(this.idx+1));return}this.t+=e;let a=!1;if(r==="look"){let l=Math.abs(sn(n.yaw,$t(F.X-n.pos.x,F.Z-n.pos.z)));this.hold=l<.2?this.hold+e:0,a=this.hold>.25}else r==="dribble"?a=Math.hypot(n.pos.x-this.spot.x,n.pos.z-this.spot.z)<1&&i.ball.owner===n:(r==="shoot"||r==="layup"||r==="pass"||r==="steal")&&(a=this.count>=1);if(a){this.complete(!0);return}if(r==="shoot"&&this.tries>=4&&!(i.ball.shot&&!i.ball.shot.done)||r==="layup"&&this.tries>=3&&!(i.ball.shot&&!i.ball.shot.done)||this.t>this.cur.cap){this.complete(!1);return}r==="steal"&&i.ball.owner!==this.dummy?(this.resetAt+=e,this.resetAt>1.4&&(this.resetAt=0,i.place(this.dummy,this.dummy.pos.x,this.dummy.pos.z,$t(1,0)),i.gainBall(this.dummy,"practice"))):this.resetAt=0}frame(t){if(!this.card||!this.cur)return;let e=this.app.input.touchMode,i=this.gap>0;this.card.update({index:this.idx,doneCount:this.idx+(i?1:0),say:i?this.okText:this.cur.say,hint:i?"":e?this.cur.touch:this.cur.kb,frac:1-this.t/this.cur.cap,keyboard:!e,step:`${Math.min($s.length,this.idx+1)} / ${$s.length}`,ok:i});let n=this.cur.id,r=this.spot?{x:this.spot.x,y:.5,z:this.spot.z}:n==="look"||n==="layup"?{x:F.X,y:F.Y,z:0}:n==="pass"?{x:this.reb.pos.x,y:1.4,z:this.reb.pos.z}:n==="steal"?{x:this.dummy.pos.x,y:1,z:this.dummy.pos.z}:null;if(r&&!i){let a=t.view.projectToScreen(t.view._pt||(t.view._pt=t.view.camera.position.clone()).set(r.x,r.y,r.z),t.view._pt2||(t.view._pt2=t.view.camera.position.clone()));this.card.pointAt(a)}else this.card.pointAt(null)}markers(t,e){this.spot&&this.cur&&this.cur.id==="dribble"&&e.showSpot(0,this.spot.x,this.spot.z,t.match.time)}hint(){return""}phaseText(){return"TUTORIAL"}clockText(){return`${Math.min($s.length,Math.max(1,this.idx+1))}/${$s.length}`}summary(){return{kind:"tutorial",title:"Tutorial",completed:!!this.completed,done:this.doneSteps,total:$s.length}}};var s1=3e4,$m="courtside.copiedToDataModule",r1="Rookie",An={sdk:null,env:"none",saves:"localStorage",playing:!1,muted:!1,muteListeners:[],user:null,nameListeners:[],get active(){return!!this.sdk},get lockedName(){return this.sdk?this.user&&this.user.username||r1:null},onName(s){this.nameListeners.push(s)},async init(s=()=>{}){let t=window.CrazyGames&&window.CrazyGames.SDK;if(!t)return this;let e=setTimeout(()=>s("Connecting to CrazyGames\u2026"),1500),i;try{i=Promise.resolve(t.init());let n;await Promise.race([i,new Promise((r,a)=>{n=setTimeout(()=>a(new Error("SDK init timed out")),s1)})]),clearTimeout(n)}catch(n){return clearTimeout(e),console.warn("[Courtside] CrazyGames SDK not ready, starting without it:",n&&n.message),this.env="disabled",i&&n&&/timed out/.test(n.message)&&i.then(()=>this.attachLate(t)).catch(()=>{}),this}return clearTimeout(e),this.env=t.environment||"disabled",this.env!=="local"&&this.env!=="crazygames"?this:(this.sdk=t,this.useDataModule(t.data),await this.setup(t),this)},async setup(s){try{this.muted=!!(s.game.settings&&s.game.settings.muteAudio),s.game.addSettingsChangeListener(t=>{this.muted=!!(t&&t.muteAudio),this.notifyMute()})}catch{}try{if(s.user&&s.user.isUserAccountAvailable!==!1){let t;this.user=await Promise.race([s.user.getUser(),new Promise(e=>{t=setTimeout(()=>e(null),4e3)})])||null,clearTimeout(t),s.user.addAuthListener&&s.user.addAuthListener(e=>{this.user=e||null;for(let i of this.nameListeners)i(this.lockedName)})}}catch{this.user=null}},async attachLate(s){let t;try{t=s.environment}catch{return}if(!(t!=="local"&&t!=="crazygames"||this.sdk)){console.info("[Courtside] CrazyGames SDK ready (late), connecting it"),this.env=t,this.sdk=s;try{let e=s.data;if(!Nc.some(n=>e.getItem(n)!=null)){for(let n of Nc){let r=window.localStorage.getItem(n);r!=null&&e.setItem(n,r)}Xu(e,"crazygames"),this.saves="crazygames"}}catch{}this.loadingStart(),this.loadingStop(),this.playing=!1,await this.setup(s),this.notifyMute();for(let e of this.nameListeners)e(this.lockedName)}},useDataModule(s){try{if(!s)throw new Error("no data module");s.getItem("courtside.probe")}catch(t){console.warn("[Courtside] CrazyGames data module unavailable, saving to localStorage:",t&&t.message);return}try{let t=window.localStorage;if(!t.getItem($m)){for(let e of Nc){let i=t.getItem(e);i!=null&&s.getItem(e)==null&&s.setItem(e,i)}t.setItem($m,"1")}}catch{}Xu(s,"crazygames"),this.saves="crazygames"},call(s){if(this.sdk)try{return s(this.sdk)}catch(t){console.warn("[Courtside] CrazyGames SDK call failed:",t&&t.message)}},loadingStart(){this.call(s=>s.game.loadingStart())},loadingStop(){this.call(s=>s.game.loadingStop())},setGameplay(s){s=!!s,s!==this.playing&&(this.playing=s,this.call(t=>s?t.game.gameplayStart():t.game.gameplayStop()))},happytime(){this.call(s=>s.game.happytime())},onMute(s){this.muteListeners.push(s),s(this.muted)},notifyMute(){for(let s of this.muteListeners)s(this.muted)}};var ld="courtside.profile",Xm="courtside.records",cd="courtside.career",hd=class{constructor(){let t=document.createElement("style");t.textContent=_d,document.head.appendChild(t),this.params=new URLSearchParams(location.search),this.coarse=!!(window.matchMedia&&matchMedia("(pointer: coarse)").matches),this.phone=this.coarse&&Math.min(screen.width||innerWidth,screen.height||innerHeight)<540,this.settings=vm(this.coarse),this.coarse&&!xm()&&(this.settings.quality="medium"),this.canvas=document.getElementById("game"),this.uiRoot=document.getElementById("ui"),this.view=new fc(this.canvas,{quality:this.settings.quality,preserve:this.params.has("preserve"),lite:this.coarse||this.params.has("lite")}),this.view.setQuality(this.settings.quality),this.style=this.params.get("style")||bm(),this.view.setStyle(this.style),this.audio=new pc,this.audio.setVolumes({master:this.settings.master,sfx:this.settings.sfx,crowd:this.settings.crowd}),this.input=new gc(this.canvas),this.input.sensitivity=this.settings.sensitivity,this.input.invertY=this.settings.invertY,this.hud=new yc(this.uiRoot),this.touch=new bc(this,this.uiRoot),this.setTouchMode(this.settings.touch==="on"||this.settings.touch!=="off"&&this.coarse),window.addEventListener("pointerdown",n=>{this.settings.touch==="auto"&&(n.pointerType==="touch"&&!this.input.touchMode?this.setTouchMode(!0):n.pointerType==="mouse"&&this.input.touchMode&&!this.input.fromTouch(n)&&this.setTouchMode(!1))},!0),this.profile=this.loadJSON(ld,Em()),this.records=this.loadJSON(Xm,{wins:0,losses:0,games:0,bestShootout:0,practiceDone:!1,points:0}),this.career=this.loadCareer(),this.platform=An,this.syncPlayerName(),An.onName(()=>{this.syncPlayerName(),!this.session&&this.screens&&["menu","player","career"].includes(this.screens.current)&&this.screens.refresh()}),this.screens=new zc(this),this.session=null,this.menuSession=null,this.paused=!1,this.last=performance.now(),this.fpsCap=Number(this.params.get("fps")||0),this.frameAcc=0,this.adapt={on:this.params.has("adapt")||!navigator.webdriver&&!this.fpsCap,ema:1/60,scale:1,floor:.5,low:0,high:0,check:null},this.input.onPause=()=>this.togglePause(),this.input.onToggleLock=()=>this.toggleLock(),this.input.onSkip=()=>{this.session&&this.session.cfg.practice&&!this.paused&&this.session.cfg.practice.skip&&this.session.cfg.practice.skip(this.session)},this.canvas.addEventListener("click",()=>{this.session&&!this.paused&&this.input.active&&!this.input.touchMode&&!this.input.locked&&!this.input.dragMode&&this.input.requestLock()}),this.input.onLockLost=()=>{this.session&&!this.paused&&this.pause(document.hasFocus()?"lock":"blur")},this.input.onLockGained=()=>{this.lockFails=0,this.session&&this.awaitingLock&&this.unpause()},this.input.onLockError=()=>{this.session&&this.awaitingLock&&this.lockFailed()},document.addEventListener("visibilitychange",()=>{document.hidden?this.onBlur():this.onFocus()}),window.addEventListener("blur",()=>this.onBlur()),window.addEventListener("focus",()=>this.onFocus()),window.addEventListener("resize",()=>this.view.resize());let e=()=>{this.audio.init(),(!this.paused||!this.session)&&this.audio.resume()};for(let n of["pointerdown","pointerup","touchend","click","keydown"])window.addEventListener(n,e,{capture:!0});document.addEventListener("gesturestart",n=>n.preventDefault()),document.addEventListener("contextmenu",n=>{n.target.closest&&n.target.closest("input")||n.preventDefault()}),An.onMute(n=>this.audio.setPlatformMute(n)),document.getElementById("boot")?.remove();let i=this.params.get("auto");this.firstRun=!i&&!Wm()&&(!navigator.webdriver||this.params.has("tutorial")),this.firstRun?this.startPractice("tutorial",{first:!0}):(this.startMenuBackground(),this.screens.mainMenu()),requestAnimationFrame(n=>this.loop(n)),window.__cs=this,this.debugStep=n=>{let r=this.session||this.menuSession;for(let a=0;a<n;a++)r.match.step(1/120),r.cfg.practice&&r.cfg.practice.step(r,1/120)},i&&setTimeout(()=>this.autostart(i),50)}syncPlayerName(){let t=An.lockedName;t&&(this.profile.name!==t&&(this.profile.name=t,this.saveJSON(ld,this.profile)),this.career&&this.career.player.name!==t&&(this.career.player.name=t,this.saveCareer()))}loadJSON(t,e){try{let i=bi.getItem(t);return i?{...e,...JSON.parse(i)}:{...e}}catch{return{...e}}}saveJSON(t,e){try{return bi.setItem(t,JSON.stringify(e)),!0}catch{return!1}}saveProfile(){this.saveJSON(ld,this.profile)||this.screens.toast("Your player could not be saved (storage unavailable).",!0)}saveRecords(){this.saveJSON(Xm,this.records)}loadCareer(){try{let t=bi.getItem(cd),e=t?JSON.parse(t):null;return Fm(e)?e:null}catch{return null}}saveCareer(){try{this.career?bi.setItem(cd,JSON.stringify(this.career)):bi.removeItem(cd)}catch{this.screens.toast("Your career could not be saved (storage unavailable).",!0)}}autostart(t){let e=this.params,i=n=>e.get(n)?Number(e.get(n)):void 0;t==="quick"||t==="full"?this.startGame({format:"full",size:i("size"),home:e.get("home")||"harbor",away:e.get("away")||"mesa",venue:e.get("venue")||"arena",live:e.has("live"),quarter:i("quarter")}):t==="half"||t==="3v3"||t==="1v1"?this.startGame({format:t==="1v1"?"1v1":"3v3",home:e.get("home")||"harbor",away:e.get("away")||"mesa",venue:e.get("venue")||(t==="1v1"?"gym":"arena"),live:e.has("live"),clock:i("clock"),target:i("target")}):t.startsWith("practice")?this.startPractice(t.split(":")[1]||"drills",{live:e.has("live")}):t==="tutorial"?this.startPractice("tutorial",{live:e.has("live")}):t==="career"&&this.career&&this.screens.careerHub()}loop(t){requestAnimationFrame(a=>this.loop(a));let e=(t-this.last)/1e3;this.adaptResolution(e);let i=this.fpsCap||(this.coarse&&!this.session?30:0);if(i){if(this.frameAcc+=e,this.last=t,this.frameAcc<1/i-.002)return;e=this.frameAcc,this.frameAcc=0}else this.last=t;e=Math.min(e,.1);let n=this.session||this.menuSession;n&&n.frame(this.paused&&this.session?0:e),this.updateLockHint();let r=!!(this.session&&this.session.human&&!this.paused&&!this.session.ended);this.touch.setVisible(this.input.touchMode&&r),this.touch.visible&&this.touch.update(this.session),An.setGameplay(!!this.session&&!this.session.ended&&!this.paused&&!document.hidden),this.onFrame&&this.onFrame(e)}updateLockHint(){let t=!!(this.session&&!this.paused&&!this.session.ended&&this.session.human&&this.input.active&&!this.input.touchMode&&!this.input.locked&&!this.input.dragMode);!this.lockHint&&t&&(this.lockHint=document.createElement("div"),this.lockHint.className="tut-click",this.lockHint.innerHTML="Click to take control<small>the mouse looks and aims</small>",this.uiRoot.appendChild(this.lockHint)),this.lockHint&&(this.lockHint.hidden=!t);let e=!!(this.session&&!this.paused&&!this.session.ended&&this.session.human&&this.input.active&&!this.input.touchMode&&!this.input.locked&&this.input.dragMode);!this.dragHint&&e&&(this.dragHint=document.createElement("div"),this.dragHint.className="drag-hint",this.dragHint.textContent="Drag to look \xB7 Tab captures the cursor",this.uiRoot.appendChild(this.dragHint)),this.dragHint&&(this.dragHint.hidden=!e)}adaptResolution(t){let e=this.adapt;if(!e.on||t<=0||t>.5)return;if(!!!(this.session&&!this.paused&&!document.hidden)){e.low=0,e.high=0,e.check=null;return}if(e.ema+=(t-e.ema)*.06,e.floorT=(e.floorT||0)+t,e.floor>.5&&e.floorT>30&&(e.floor=.5),e.check){e.check.t+=t,e.check.t>2&&(e.ema>e.check.before*.92&&(e.floor=e.check.prev,e.floorT=0,e.scale=e.check.prev,this.view.setResolutionScale(e.scale)),e.check=null);return}if(e.ema>1/42?(e.low+=t,e.high=0):e.ema<1/56?(e.high+=t,e.low=0):(e.low=0,e.high=0),e.low>1.5&&e.scale>e.floor+.01){let n=e.scale;e.scale=Math.max(e.floor,e.scale*.85),this.view.setResolutionScale(e.scale),e.check={before:e.ema,prev:n,t:0},e.low=0}else e.high>6&&e.scale<1&&(e.scale=Math.min(1,e.scale*1.12),this.view.setResolutionScale(e.scale),e.high=0)}setTouchMode(t){this.input.touchMode=t,document.documentElement.dataset.touch=t?"1":"0",t||this.touch.setVisible(!1)}tryFullscreen(){if(!this.input.touchMode||document.fullscreenElement||this.params.has("nofs")||An.active)return;let t=document.documentElement;try{let e=t.requestFullscreen&&t.requestFullscreen({navigationUI:"hide"});e&&e.then&&e.then(()=>{try{let i=screen.orientation&&screen.orientation.lock&&screen.orientation.lock("landscape");i&&i.catch&&i.catch(()=>{})}catch{}}).catch(()=>{})}catch{}}startMenuBackground(){if(this.menuSession)return;let t=ci[3],e=ci[6],i=Wl(t,e);i[0].word=t.short,i[1].word=e.short;let n={mode:"menu",venue:this.phone?"gym":"arena",venueOpts:{homeName:t.name,awayName:e.name},colours:{kits:i,human:this.profile.look,court:t.colors[0]},match:{court:"full",seed:99,quarter:1e5,difficulty:"pro",teams:[Xi(t,5),Xi(e,5)]}};this.menuSession=new Ba(this,n),this.menuSession.start()}stopMenuBackground(){this.menuSession&&(this.menuSession.dispose(),this.menuSession=null)}gameConfig(t){let e=t.format||"full",i=t.homeTeam||$i(t.home),n=t.awayTeam||$i(t.away),r=Wl(i,n);r[0].word=i.short,r[1].word=n.short;let a=this.params.get("seed")?Number(this.params.get("seed")):(Date.now()&65535)+1,o=t.player||this.profile,l=t.difficulty||this.settings.difficulty;if(e==="full"){let u=Math.max(3,Math.min(5,Number(t.size||this.settings.teamSize)||5)),f=Hi[t.length||this.settings.quarterLength]||Hi.short;return{kits:r,home:i,away:n,size:u,match:{court:"full",seed:a,quarter:t.quarter||f.quarter,ot:f.ot,difficulty:l,teams:t.humanSide===1?[Xi(i,u),Xi(n,u,o)]:[Xi(i,u,o),Xi(n,u)]}}}let c=e==="1v1"?1:3,h=as[t.length||this.settings.gameLength]||as.normal,d=t.target||(e==="1v1"?Math.min(11,h.target):h.target);return{kits:r,home:i,away:n,size:c,match:{seed:a,clock:t.clock||h.clock,target:d,difficulty:l,teams:[Xi(i,c,o),Xi(n,c)]}}}startSession(t){return this.stopMenuBackground(),this.session&&this.session.dispose(),this.screens.clear(),this.session=new Ba(this,t),this.hud.show(!0),this.hud.root.classList.toggle("practice",!!t.practice),this.hud.root.classList.toggle("tut",!!(t.practice&&t.practice.kind==="tutorial")),this.session.start(),this.input.active=!0,t.live?(this.paused=!1,this.session.setPaused(!1),this.session):(this.paused=!0,this.session.setPaused(!0),this.screens.clickToPlay(),this.session)}endSession(t={}){this.session&&this.session.dispose(),this.session=null,this.paused=!1,this.input.active=!1,t.next||this.input.exitLock(),this.hud.show(!1),t.next||this.startMenuBackground()}startFirstGame(){this.endSession({next:!0}),this.startGame({format:"full",size:5,home:"harbor",away:"mesa",venue:"arena"}),this.resume()}startGame(t){t.career||(this.lastGame=t);let e=this.gameConfig(t),i=t.format||"full",n=i==="full"?`${e.size}v${e.size} Full Court`:i==="1v1"?"1v1 Challenge":"3v3 Half Court";return this.startSession({mode:t.career?"career":i==="full"?"quick":i,live:t.live,career:t.career,venue:t.venue||(i==="1v1"?"gym":"arena"),venueOpts:{homeName:e.home.name,awayName:e.away.name},title:t.title||`${n} \xB7 ${e.home.name} v ${e.away.name}`,colours:{kits:e.kits,human:(t.player||this.profile).look,court:e.home.colors[0]},match:e.match,firstTeam:t.firstTeam,onEnd:r=>t.career?this.screens.careerResult(r):this.screens.result(r)})}startPractice(t,e={}){let i=t==="tutorial"?new Gc(this):zm(t,this);e.first&&(i.first=!0);let n=$i("harbor"),r=$i("summit"),a=Wl(n,r);return a[0].word="PRACTICE",this.startSession({mode:"practice",live:e.live,venue:"practice",venueOpts:{homeName:"Practice",awayName:""},title:i.title,colours:{kits:a,human:this.profile.look,court:"#3a86ff"},match:i.matchConfig(this.profile),practice:i,onEnd:o=>t==="tutorial"?this.screens.ready(o):this.screens.practiceResult(o)})}togglePause(){if(!(!this.session||this.session.ended)){if(this.paused&&this.screens.current==="click"){this.screens.pauseMenu();return}this.paused?this.resume():this.pause()}}pause(t="user"){!this.session||this.session.ended||(this.paused=!0,this.session.setPaused(!0),this.input.releaseAll(),this.touch.setVisible(!1),this.input.exitLock(),this.audio.suspend(),t==="lock"?this.screens.clickToPlay({resume:!0}):this.screens.pauseMenu())}resume(){if(this.session){if(this.input.active=!0,this.input.touchMode){this.tryFullscreen(),this.unpause();return}if(this.input.locked){this.unpause();return}if(this.input.dragMode){this.unpause();return}this.screens.clear(),this.awaitingLock=!0,this.requestLockSoon()}}requestLockSoon(){clearTimeout(this.lockDelay),clearTimeout(this.lockTimer);let t=Math.max(0,this.input.lastLockExit+1150-performance.now()),e=()=>{if(!this.input.requestLock()){this.awaitingLock=!1,this.input.dragMode=!0,this.unpause();return}this.lockTimer=setTimeout(()=>{this.awaitingLock&&!this.input.locked&&this.lockFailed()},1500)};t>0?this.lockDelay=setTimeout(e,t):e()}lockFailed(){if(this.awaitingLock=!1,clearTimeout(this.lockTimer),this.lockFails=(this.lockFails||0)+1,window.top!==window&&this.session){this.input.dragMode=!0,this.unpause();return}this.session&&this.paused&&this.screens.clickToPlay({resume:!0,retry:this.lockFails})}toggleLock(){if(!(!this.session||this.session.ended||this.input.touchMode)){if(this.input.locked){this.pause("lock");return}if(this.input.dragMode=!1,this.paused){this.resume();return}this.awaitingLock=!1,this.requestLockSoon()}}unpause(){this.awaitingLock=!1,this.commitSettings(),this.screens.clear(),this.paused=!1,this.session&&this.session.setPaused(!1),this.audio.resume()}onBlur(){this.audio.setMuted(!0),this.session&&!this.paused&&!this.session.ended&&this.pause("blur")}onFocus(){this.audio.setMuted(!1),this.paused&&this.audio.suspend()}applySettings(){let t=this.settings,e=t.touch==="on"||t.touch!=="off"&&(this.coarse||this.input.touchMode);if(e!==this.input.touchMode&&this.setTouchMode(e),this.input.sensitivity=t.sensitivity,this.input.invertY=t.invertY,this.audio.setVolumes({master:t.master,sfx:t.sfx,crowd:t.crowd}),this.view.quality!==t.quality){this.view.setQuality(t.quality),this.view.venueKey=null;let i=this.session||this.menuSession;i&&this.view.setVenue(i.cfg.venue,i.cfg.venueOpts||{}),this.view.match&&this.view.rebuildCharacters()}this.settingsDirty=!0}setStyle(t){this.style=t,this.view.setStyle(t),this.styleDirty=!0}commitSettings(){this.settingsDirty&&(this.settingsDirty=!1,ym(this.settings)||this.screens.toast("Settings could not be saved (storage unavailable).",!0)),this.styleDirty&&(this.styleDirty=!1,_m(this.style))}};async function qm(){window.__csBooting=!0;let s=e=>{let i=document.getElementById("boot");i&&(i.textContent=e)},t=e=>s("Courtside could not start: "+(e&&(e.message||e.reason&&e.reason.message||e.reason)||"unknown error"));window.addEventListener("error",t),window.addEventListener("unhandledrejection",t);try{await An.init(s)}catch(e){console.warn("[Courtside] platform init failed:",e)}An.loadingStart(),s("Loading\u2026");try{new hd}catch(e){console.error(e),s("Courtside could not start: "+e.message+" (a browser with WebGL2 is required).")}window.removeEventListener("error",t),window.removeEventListener("unhandledrejection",t),An.loadingStop()}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",qm):qm();})();
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
