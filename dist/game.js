/* Courtside - bundled game. three.js is MIT licensed (see vendor/three/LICENSE). */
(()=>{var md=`/* Courtside interface: First Touch's arcade design system, carried over unchanged in
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
`;var Bd=0,vh=1,zd=2;var yh=0,ca=1,Hd=2,gr=3,xn=0,Je=1,Ui=2,vn=0,xr=1,bh=2,_h=3,Mh=4,Vd=5;var Ts=100,Gd=101,Wd=102,$d=103,Xd=104,qd=200,Yd=201,Kd=202,Zd=203,Sh=204,wh=205,Jd=206,jd=207,Qd=208,tf=209,ef=210,nf=211,sf=212,rf=213,af=214,lo=0,co=1,ho=2,or=3,uo=4,fo=5,po=6,mo=7,Eh=0,of=1,lf=2,ji=0,Th=1,Ah=2,Rh=3,Ch=4,Ph=5,Ih=6,Lh=7;var Nh=300,Qn=301,As=302,Go=303,Wo=304,ha=306,go=1e3,dn=1001,xo=1002,Le=1003,cf=1004;var ua=1005;var Ze=1006,$o=1007;var ts=1008;var wi=1009,Dh=1010,kh=1011,vr=1012,Xo=1013,Qi=1014,pi=1015,tn=1016,qo=1017,Yo=1018,yr=1020,Oh=35902,Uh=35899,Fh=1021,Bh=1022,mi=1023,fn=1026,es=1027,Ko=1028,Zo=1029,is=1030,Jo=1031;var jo=1033,da=33776,fa=33777,pa=33778,ma=33779,Qo=35840,tl=35841,el=35842,il=35843,nl=36196,sl=37492,rl=37496,al=37488,ol=37489,ga=37490,ll=37491,cl=37808,hl=37809,ul=37810,dl=37811,fl=37812,pl=37813,ml=37814,gl=37815,xl=37816,vl=37817,yl=37818,bl=37819,_l=37820,Ml=37821,Sl=36492,wl=36494,El=36495,Tl=36283,Al=36284,xa=36285,Rl=36286;var $r=2300,vo=2301,ao=2302,uh=2303,dh=2400,fh=2401,ph=2402;var hf=3200;var zh=0,uf=1,Ln="",Ai="srgb",xs="srgb-linear",Xr="linear",de="srgb";var oo=7680;var df=519,ff=512,pf=513,mf=514,Cl=515,gf=516,xf=517,Pl=518,vf=519,yf=35044,Hh=35048;var Vh="300 es",Ji=2e3,lr=2001;function Wm(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function $m(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function qr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function bf(){let s=qr("canvas");return s.style.display="block",s}var gd={},cr=null;function Gh(...s){let t="THREE."+s.shift();cr?cr("log",t,...s):console.log(t,...s)}function _f(s){let t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Ut(...s){s=_f(s);let t="THREE."+s.shift();if(cr)cr("warn",t,...s);else{let e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function Bt(...s){s=_f(s);let t="THREE."+s.shift();if(cr)cr("error",t,...s);else{let e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function gs(...s){let t=s.join(" ");t in gd||(gd[t]=!0,Ut(...s))}function Mf(s,t,e){return new Promise(function(i,n){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:n();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}var Sf={[lo]:co,[ho]:po,[uo]:mo,[or]:fo,[co]:lo,[po]:ho,[mo]:uo,[fo]:or},pn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let n=i[t];if(n!==void 0){let r=n.indexOf(e);r!==-1&&n.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let n=i.slice(0);for(let r=0,a=n.length;r<a;r++)n[r].call(this,t);t.target=null}}},ni=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Vc=Math.PI/180,yo=180/Math.PI;function va(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ni[s&255]+ni[s>>8&255]+ni[s>>16&255]+ni[s>>24&255]+"-"+ni[t&255]+ni[t>>8&255]+"-"+ni[t>>16&15|64]+ni[t>>24&255]+"-"+ni[e&63|128]+ni[e>>8&255]+"-"+ni[e>>16&255]+ni[e>>24&255]+ni[i&255]+ni[i>>8&255]+ni[i>>16&255]+ni[i>>24&255]).toLowerCase()}function se(s,t,e){return Math.max(t,Math.min(e,s))}function Xm(s,t){return(s%t+t)%t}function Gc(s,t,e){return(1-e)*s+e*t}function Fr(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function _i(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Yh=class Yh{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6],this.y=n[1]*e+n[4]*i+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=se(this.x,t.x,e.x),this.y=se(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=se(this.x,t,e),this.y=se(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(se(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(se(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),n=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*n+t.x,this.y=r*n+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Yh.prototype.isVector2=!0;var Xt=Yh,Ge=class{constructor(t=0,e=0,i=0,n=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=n}static slerpFlat(t,e,i,n,r,a,o){let c=i[n+0],l=i[n+1],h=i[n+2],d=i[n+3],u=r[a+0],f=r[a+1],g=r[a+2],x=r[a+3];if(d!==x||c!==u||l!==f||h!==g){let m=c*u+l*f+h*g+d*x;m<0&&(u=-u,f=-f,g=-g,x=-x,m=-m);let p=1-o;if(m<.9995){let v=Math.acos(m),S=Math.sin(v);p=Math.sin(p*v)/S,o=Math.sin(o*v)/S,c=c*p+u*o,l=l*p+f*o,h=h*p+g*o,d=d*p+x*o}else{c=c*p+u*o,l=l*p+f*o,h=h*p+g*o,d=d*p+x*o;let v=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=v,l*=v,h*=v,d*=v}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,n,r,a){let o=i[n],c=i[n+1],l=i[n+2],h=i[n+3],d=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+h*d+c*f-l*u,t[e+1]=c*g+h*u+l*d-o*f,t[e+2]=l*g+h*f+o*u-c*d,t[e+3]=h*g-o*d-c*u-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,n){return this._x=t,this._y=e,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,n=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(n/2),d=o(r/2),u=c(i/2),f=c(n/2),g=c(r/2);switch(a){case"XYZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"YZX":this._x=u*h*d+l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d-u*f*g;break;case"XZY":this._x=u*h*d-l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d+u*f*g;break;default:Ut("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,n=Math.sin(i);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],n=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],d=e[10],u=i+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(a-n)*f}else if(i>o&&i>d){let f=2*Math.sqrt(1+i-o-d);this._w=(h-c)/f,this._x=.25*f,this._y=(n+a)/f,this._z=(r+l)/f}else if(o>d){let f=2*Math.sqrt(1+o-i-d);this._w=(r-l)/f,this._x=(n+a)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+d-i-o);this._w=(a-n)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(se(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let n=Math.min(1,e/i);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,n=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=i*h+a*o+n*l-r*c,this._y=n*h+a*c+r*o-i*l,this._z=r*h+a*l+i*c-n*o,this._w=a*h-i*o-n*c-r*l,this._onChangeCallback(),this}slerp(t,e){let i=t._x,n=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,n=-n,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+i*e,this._y=this._y*c+n*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+i*e,this._y=this._y*c+n*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(n*Math.sin(t),n*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Kh=class Kh{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(xd.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(xd.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*n,this.y=r[1]*e+r[4]*i+r[7]*n,this.z=r[2]*e+r[5]*i+r[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,n=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*n+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*n+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*n+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,n=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*n-o*i),h=2*(o*e-r*n),d=2*(r*i-a*e);return this.x=e+c*l+a*d-o*h,this.y=i+c*h+o*l-r*d,this.z=n+c*d+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*n,this.y=r[1]*e+r[5]*i+r[9]*n,this.z=r[2]*e+r[6]*i+r[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=se(this.x,t.x,e.x),this.y=se(this.y,t.y,e.y),this.z=se(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=se(this.x,t,e),this.y=se(this.y,t,e),this.z=se(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(se(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,n=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=n*c-r*o,this.y=r*a-i*c,this.z=i*o-n*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Wc.copy(this).projectOnVector(t),this.sub(Wc)}reflect(t){return this.sub(Wc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(se(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return e*e+i*i+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let n=Math.sin(e)*t;return this.x=n*Math.sin(i),this.y=Math.cos(e)*t,this.z=n*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Kh.prototype.isVector3=!0;var N=Kh,Wc=new N,xd=new Ge,Zh=class Zh{constructor(t,e,i,n,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,a,o,c,l)}set(t,e,i,n,r,a,o,c,l){let h=this.elements;return h[0]=t,h[1]=n,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=i,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,n=e.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],h=i[4],d=i[7],u=i[2],f=i[5],g=i[8],x=n[0],m=n[3],p=n[6],v=n[1],S=n[4],y=n[7],E=n[2],M=n[5],A=n[8];return r[0]=a*x+o*v+c*E,r[3]=a*m+o*S+c*M,r[6]=a*p+o*y+c*A,r[1]=l*x+h*v+d*E,r[4]=l*m+h*S+d*M,r[7]=l*p+h*y+d*A,r[2]=u*x+f*v+g*E,r[5]=u*m+f*S+g*M,r[8]=u*p+f*y+g*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-i*r*h+i*o*c+n*r*l-n*a*c}invert(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],d=h*a-o*l,u=o*c-h*r,f=l*r-a*c,g=e*d+i*u+n*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=d*x,t[1]=(n*l-h*i)*x,t[2]=(o*i-n*a)*x,t[3]=u*x,t[4]=(h*e-n*c)*x,t[5]=(n*r-o*e)*x,t[6]=f*x,t[7]=(i*c-l*e)*x,t[8]=(a*e-i*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,n,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+t,-n*l,n*c,-n*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return gs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply($c.makeScale(t,e)),this}rotate(t){return gs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply($c.makeRotation(-t)),this}translate(t,e){return gs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply($c.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let n=0;n<9;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Zh.prototype.isMatrix3=!0;var Ht=Zh,$c=new Ht,vd=new Ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),yd=new Ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function qm(){let s={enabled:!0,workingColorSpace:xs,spaces:{},convert:function(n,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===de&&(n.r=In(n.r),n.g=In(n.g),n.b=In(n.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(n.applyMatrix3(this.spaces[r].toXYZ),n.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===de&&(n.r=ar(n.r),n.g=ar(n.g),n.b=ar(n.b))),n},workingToColorSpace:function(n,r){return this.convert(n,this.workingColorSpace,r)},colorSpaceToWorking:function(n,r){return this.convert(n,r,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Ln?Xr:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,r=this.workingColorSpace){return n.fromArray(this.spaces[r].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,r,a){return n.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,r){return gs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(n,r)},toWorkingColorSpace:function(n,r){return gs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(n,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return s.define({[xs]:{primaries:t,whitePoint:i,transfer:Xr,toXYZ:vd,fromXYZ:yd,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ai},outputColorSpaceConfig:{drawingBufferColorSpace:Ai}},[Ai]:{primaries:t,whitePoint:i,transfer:de,toXYZ:vd,fromXYZ:yd,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ai}}}),s}var jt=qm();function In(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ar(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Xs,bo=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Xs===void 0&&(Xs=qr("canvas")),Xs.width=t.width,Xs.height=t.height;let n=Xs.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),i=Xs}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=qr("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let n=i.getImageData(0,0,t.width,t.height),r=n.data;for(let a=0;a<r.length;a++)r[a]=In(r[a]/255)*255;return i.putImageData(n,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(In(e[i]/255)*255):e[i]=In(e[i]);return{data:e,width:t.width,height:t.height}}else return Ut("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Ym=0,hr=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Ym++}),this.uuid=va(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let a=0,o=n.length;a<o;a++)n[a].isDataTexture?r.push(Xc(n[a].image)):r.push(Xc(n[a]))}else r=Xc(n);i.url=r}return e||(t.images[this.uuid]=i),i}};function Xc(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?bo.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Ut("Texture: Unable to serialize Texture."),{})}var Km=0,qc=new N,di=class s extends pn{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,i=dn,n=dn,r=Ze,a=ts,o=mi,c=wi,l=s.DEFAULT_ANISOTROPY,h=Ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Km++}),this.uuid=va(),this.name="",this.source=new hr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Xt(0,0),this.repeat=new Xt(1,1),this.center=new Xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(qc).x}get height(){return this.source.getSize(qc).y}get depth(){return this.source.getSize(qc).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){Ut(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let n=this[e];if(n===void 0){Ut(`Texture.setValues(): property '${e}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Nh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case go:t.x=t.x-Math.floor(t.x);break;case dn:t.x=t.x<0?0:1;break;case xo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case go:t.y=t.y-Math.floor(t.y);break;case dn:t.y=t.y<0?0:1;break;case xo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};di.DEFAULT_IMAGE=null;di.DEFAULT_MAPPING=Nh;di.DEFAULT_ANISOTROPY=1;var Jh=class Jh{constructor(t=0,e=0,i=0,n=1){this.x=t,this.y=e,this.z=i,this.w=n}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,n=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*n+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*n+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*n+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*n+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,n,r,c=t.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],g=c[9],x=c[2],m=c[6],p=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let S=(l+1)/2,y=(f+1)/2,E=(p+1)/2,M=(h+u)/4,A=(d+x)/4,b=(g+m)/4;return S>y&&S>E?S<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(S),n=M/i,r=A/i):y>E?y<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(y),i=M/n,r=b/n):E<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(E),i=A/r,n=b/r),this.set(i,n,r,e),this}let v=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(d-x)/v,this.z=(u-h)/v,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=se(this.x,t.x,e.x),this.y=se(this.y,t.y,e.y),this.z=se(this.z,t.z,e.z),this.w=se(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=se(this.x,t,e),this.y=se(this.y,t,e),this.z=se(this.z,t,e),this.w=se(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(se(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Jh.prototype.isVector4=!0;var be=Jh,_o=class extends pn{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ze,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new be(0,0,t,e),this.scissorTest=!1,this.viewport=new be(0,0,t,e),this.textures=[];let n={width:t,height:e,depth:i.depth},r=new di(n),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Ze,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let n=0,r=this.textures.length;n<r;n++)this.textures[n].image.width=t,this.textures[n].image.height=e,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let n=Object.assign({},t.textures[e].image);this.textures[e].source=new hr(n)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},ai=class extends _o{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},Yr=class extends di{constructor(t=null,e=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Le,this.minFilter=Le,this.wrapR=dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Mo=class extends di{constructor(t=null,e=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Le,this.minFilter=Le,this.wrapR=dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Vo=class Vo{constructor(t,e,i,n,r,a,o,c,l,h,d,u,f,g,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,a,o,c,l,h,d,u,f,g,x,m)}set(t,e,i,n,r,a,o,c,l,h,d,u,f,g,x,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=n,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Vo().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,n=1/qs.setFromMatrixColumn(t,0).length(),r=1/qs.setFromMatrixColumn(t,1).length(),a=1/qs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*n,e[1]=i[1]*n,e[2]=i[2]*n,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,n=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(n),l=Math.sin(n),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=a*h,f=a*d,g=o*h,x=o*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=f+g*l,e[5]=u-x*l,e[9]=-o*c,e[2]=x-u*l,e[6]=g+f*l,e[10]=a*c}else if(t.order==="YXZ"){let u=c*h,f=c*d,g=l*h,x=l*d;e[0]=u+x*o,e[4]=g*o-f,e[8]=a*l,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=x+u*o,e[10]=a*c}else if(t.order==="ZXY"){let u=c*h,f=c*d,g=l*h,x=l*d;e[0]=u-x*o,e[4]=-a*d,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=x-u*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){let u=a*h,f=a*d,g=o*h,x=o*d;e[0]=c*h,e[4]=g*l-f,e[8]=u*l+x,e[1]=c*d,e[5]=x*l+u,e[9]=f*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){let u=a*c,f=a*l,g=o*c,x=o*l;e[0]=c*h,e[4]=x-u*d,e[8]=g*d+f,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=f*d+g,e[10]=u-x*d}else if(t.order==="XZY"){let u=a*c,f=a*l,g=o*c,x=o*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=u*d+x,e[5]=a*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=o*h,e[10]=x*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Zm,t,Jm)}lookAt(t,e,i){let n=this.elements;return Ei.subVectors(t,e),Ei.lengthSq()===0&&(Ei.z=1),Ei.normalize(),Hn.crossVectors(i,Ei),Hn.lengthSq()===0&&(Math.abs(i.z)===1?Ei.x+=1e-4:Ei.z+=1e-4,Ei.normalize(),Hn.crossVectors(i,Ei)),Hn.normalize(),za.crossVectors(Ei,Hn),n[0]=Hn.x,n[4]=za.x,n[8]=Ei.x,n[1]=Hn.y,n[5]=za.y,n[9]=Ei.y,n[2]=Hn.z,n[6]=za.z,n[10]=Ei.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,n=e.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],h=i[1],d=i[5],u=i[9],f=i[13],g=i[2],x=i[6],m=i[10],p=i[14],v=i[3],S=i[7],y=i[11],E=i[15],M=n[0],A=n[4],b=n[8],T=n[12],R=n[1],P=n[5],D=n[9],H=n[13],L=n[2],V=n[6],K=n[10],Z=n[14],j=n[3],X=n[7],et=n[11],nt=n[15];return r[0]=a*M+o*R+c*L+l*j,r[4]=a*A+o*P+c*V+l*X,r[8]=a*b+o*D+c*K+l*et,r[12]=a*T+o*H+c*Z+l*nt,r[1]=h*M+d*R+u*L+f*j,r[5]=h*A+d*P+u*V+f*X,r[9]=h*b+d*D+u*K+f*et,r[13]=h*T+d*H+u*Z+f*nt,r[2]=g*M+x*R+m*L+p*j,r[6]=g*A+x*P+m*V+p*X,r[10]=g*b+x*D+m*K+p*et,r[14]=g*T+x*H+m*Z+p*nt,r[3]=v*M+S*R+y*L+E*j,r[7]=v*A+S*P+y*V+E*X,r[11]=v*b+S*D+y*K+E*et,r[15]=v*T+S*H+y*Z+E*nt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],n=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],x=t[7],m=t[11],p=t[15],v=c*f-l*u,S=o*f-l*d,y=o*u-c*d,E=a*f-l*h,M=a*u-c*h,A=a*d-o*h;return e*(x*v-m*S+p*y)-i*(g*v-m*E+p*M)+n*(g*S-x*E+p*A)-r*(g*y-x*M+m*A)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],n=t[8],r=t[1],a=t[5],o=t[9],c=t[2],l=t[6],h=t[10];return e*(a*h-o*l)-i*(r*h-o*c)+n*(r*l-a*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],x=t[13],m=t[14],p=t[15],v=e*o-i*a,S=e*c-n*a,y=e*l-r*a,E=i*c-n*o,M=i*l-r*o,A=n*l-r*c,b=h*x-d*g,T=h*m-u*g,R=h*p-f*g,P=d*m-u*x,D=d*p-f*x,H=u*p-f*m,L=v*H-S*D+y*P+E*R-M*T+A*b;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let V=1/L;return t[0]=(o*H-c*D+l*P)*V,t[1]=(n*D-i*H-r*P)*V,t[2]=(x*A-m*M+p*E)*V,t[3]=(u*M-d*A-f*E)*V,t[4]=(c*R-a*H-l*T)*V,t[5]=(e*H-n*R+r*T)*V,t[6]=(m*y-g*A-p*S)*V,t[7]=(h*A-u*y+f*S)*V,t[8]=(a*D-o*R+l*b)*V,t[9]=(i*R-e*D-r*b)*V,t[10]=(g*M-x*y+p*v)*V,t[11]=(d*y-h*M-f*v)*V,t[12]=(o*T-a*P-c*b)*V,t[13]=(e*P-i*T+n*b)*V,t[14]=(x*S-g*E-m*v)*V,t[15]=(h*E-d*S+u*v)*V,this}scale(t){let e=this.elements,i=t.x,n=t.y,r=t.z;return e[0]*=i,e[4]*=n,e[8]*=r,e[1]*=i,e[5]*=n,e[9]*=r,e[2]*=i,e[6]*=n,e[10]*=r,e[3]*=i,e[7]*=n,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,n))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),n=Math.sin(e),r=1-i,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+i,l*o-n*c,l*c+n*o,0,l*o+n*c,h*o+i,h*c-n*a,0,l*c-n*o,h*c+n*a,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,n,r,a){return this.set(1,i,r,0,t,1,a,0,e,n,1,0,0,0,0,1),this}compose(t,e,i){let n=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,d=o+o,u=r*l,f=r*h,g=r*d,x=a*h,m=a*d,p=o*d,v=c*l,S=c*h,y=c*d,E=i.x,M=i.y,A=i.z;return n[0]=(1-(x+p))*E,n[1]=(f+y)*E,n[2]=(g-S)*E,n[3]=0,n[4]=(f-y)*M,n[5]=(1-(u+p))*M,n[6]=(m+v)*M,n[7]=0,n[8]=(g+S)*A,n[9]=(m-v)*A,n[10]=(1-(u+x))*A,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,i){let n=this.elements;t.x=n[12],t.y=n[13],t.z=n[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let a=qs.set(n[0],n[1],n[2]).length(),o=qs.set(n[4],n[5],n[6]).length(),c=qs.set(n[8],n[9],n[10]).length();r<0&&(a=-a),qi.copy(this);let l=1/a,h=1/o,d=1/c;return qi.elements[0]*=l,qi.elements[1]*=l,qi.elements[2]*=l,qi.elements[4]*=h,qi.elements[5]*=h,qi.elements[6]*=h,qi.elements[8]*=d,qi.elements[9]*=d,qi.elements[10]*=d,e.setFromRotationMatrix(qi),i.x=a,i.y=o,i.z=c,this}makePerspective(t,e,i,n,r,a,o=Ji,c=!1){let l=this.elements,h=2*r/(e-t),d=2*r/(i-n),u=(e+t)/(e-t),f=(i+n)/(i-n),g,x;if(c)g=r/(a-r),x=a*r/(a-r);else if(o===Ji)g=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===lr)g=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,n,r,a,o=Ji,c=!1){let l=this.elements,h=2/(e-t),d=2/(i-n),u=-(e+t)/(e-t),f=-(i+n)/(i-n),g,x;if(c)g=1/(a-r),x=a/(a-r);else if(o===Ji)g=-2/(a-r),x=-(a+r)/(a-r);else if(o===lr)g=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let n=0;n<16;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};Vo.prototype.isMatrix4=!0;var Gt=Vo,qs=new N,qi=new Gt,Zm=new N(0,0,0),Jm=new N(1,1,1),Hn=new N,za=new N,Ei=new N,bd=new Gt,_d=new Ge,Mi=class s{constructor(t=0,e=0,i=0,n=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=n}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,n=this._order){return this._x=t,this._y=e,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let n=t.elements,r=n[0],a=n[4],o=n[8],c=n[1],l=n[5],h=n[9],d=n[2],u=n[6],f=n[10];switch(e){case"XYZ":this._y=Math.asin(se(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-se(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(se(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-se(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(se(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-se(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ut("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return bd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(bd,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return _d.setFromEuler(this),this.setFromQuaternion(_d,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Mi.DEFAULT_ORDER="XYZ";var Kr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},jm=0,Md=new N,Ys=new Ge,En=new Gt,Ha=new N,Br=new N,Qm=new N,t0=new Ge,Sd=new N(1,0,0),wd=new N(0,1,0),Ed=new N(0,0,1),Td={type:"added"},e0={type:"removed"},Ks={type:"childadded",child:null},Yc={type:"childremoved",child:null},fi=class s extends pn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jm++}),this.uuid=va(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new N,e=new Mi,i=new Ge,n=new N(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new Gt},normalMatrix:{value:new Ht}}),this.matrix=new Gt,this.matrixWorld=new Gt,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Kr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ys.setFromAxisAngle(t,e),this.quaternion.multiply(Ys),this}rotateOnWorldAxis(t,e){return Ys.setFromAxisAngle(t,e),this.quaternion.premultiply(Ys),this}rotateX(t){return this.rotateOnAxis(Sd,t)}rotateY(t){return this.rotateOnAxis(wd,t)}rotateZ(t){return this.rotateOnAxis(Ed,t)}translateOnAxis(t,e){return Md.copy(t).applyQuaternion(this.quaternion),this.position.add(Md.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Sd,t)}translateY(t){return this.translateOnAxis(wd,t)}translateZ(t){return this.translateOnAxis(Ed,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(En.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Ha.copy(t):Ha.set(t,e,i);let n=this.parent;this.updateWorldMatrix(!0,!1),Br.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?En.lookAt(Br,Ha,this.up):En.lookAt(Ha,Br,this.up),this.quaternion.setFromRotationMatrix(En),n&&(En.extractRotation(n.matrixWorld),Ys.setFromRotationMatrix(En),this.quaternion.premultiply(Ys.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Bt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Td),Ks.child=t,this.dispatchEvent(Ks),Ks.child=null):Bt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(e0),Yc.child=t,this.dispatchEvent(Yc),Yc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),En.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),En.multiply(t.parent.matrixWorld)),t.applyMatrix4(En),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Td),Ks.child=t,this.dispatchEvent(Ks),Ks.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,n=this.children.length;i<n;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Br,t,Qm),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Br,t0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,n=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*n,r[13]+=i-r[1]*e-r[5]*i-r[9]*n,r[14]+=n-r[2]*e-r[6]*i-r[10]*n}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let n={};n.uuid=this.uuid,n.type=this.type,n.name=this.name,n.castShadow=this.castShadow,n.receiveShadow=this.receiveShadow,n.visible=this.visible,n.frustumCulled=this.frustumCulled,n.renderOrder=this.renderOrder,n.static=this.static,n.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.pivot!==null&&(n.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(n.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(n.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(t),n.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));n.material=o}else n.material=r(t.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];n.animations.push(r(t.animations,c))}}if(e){let o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=n,i;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let n=t.children[i];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};fi.DEFAULT_UP=new N(0,1,0);fi.DEFAULT_MATRIX_AUTO_UPDATE=!0;fi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Pn=class extends fi{constructor(){super(),this.isGroup=!0,this.type="Group"}},i0={type:"move"},ur=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let n=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,i),p=this._getHandJoint(l,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&u>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(n=e.getPose(t.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(i0)))}return o!==null&&(o.visible=n!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Pn;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},wf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vn={h:0,s:0,l:0},Va={h:0,s:0,l:0};function Kc(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var qt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let n=t;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ai){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,n=jt.workingColorSpace){return this.r=t,this.g=e,this.b=i,jt.colorSpaceToWorking(this,n),this}setHSL(t,e,i,n=jt.workingColorSpace){if(t=Xm(t,1),e=se(e,0,1),i=se(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=Kc(a,r,t+1/3),this.g=Kc(a,r,t),this.b=Kc(a,r,t-1/3)}return jt.colorSpaceToWorking(this,n),this}setStyle(t,e=Ai){function i(r){r!==void 0&&parseFloat(r)<1&&Ut("Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=n[1],o=n[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ut("Color: Unknown color model "+t)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=n[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Ut("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ai){let i=wf[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Ut("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=In(t.r),this.g=In(t.g),this.b=In(t.b),this}copyLinearToSRGB(t){return this.r=ar(t.r),this.g=ar(t.g),this.b=ar(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ai){return jt.workingToColorSpace(si.copy(this),t),Math.round(se(si.r*255,0,255))*65536+Math.round(se(si.g*255,0,255))*256+Math.round(se(si.b*255,0,255))}getHexString(t=Ai){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.workingToColorSpace(si.copy(this),e);let i=si.r,n=si.g,r=si.b,a=Math.max(i,n,r),o=Math.min(i,n,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case i:c=(n-r)/d+(n<r?6:0);break;case n:c=(r-i)/d+2;break;case r:c=(i-n)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=jt.workingColorSpace){return jt.workingToColorSpace(si.copy(this),e),t.r=si.r,t.g=si.g,t.b=si.b,t}getStyle(t=Ai){jt.workingToColorSpace(si.copy(this),t);let e=si.r,i=si.g,n=si.b;return t!==Ai?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(t,e,i){return this.getHSL(Vn),this.setHSL(Vn.h+t,Vn.s+e,Vn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Vn),t.getHSL(Va);let i=Gc(Vn.h,Va.h,e),n=Gc(Vn.s,Va.s,e),r=Gc(Vn.l,Va.l,e);return this.setHSL(i,n,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,n=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*n,this.g=r[1]*e+r[4]*i+r[7]*n,this.b=r[2]*e+r[5]*i+r[8]*n,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},si=new qt;qt.NAMES=wf;var Zr=class s{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new qt(t),this.near=e,this.far=i}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},vs=class extends fi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Mi,this.environmentIntensity=1,this.environmentRotation=new Mi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Yi=new N,Tn=new N,Zc=new N,An=new N,Zs=new N,Js=new N,Ad=new N,Jc=new N,jc=new N,Qc=new N,th=new be,eh=new be,ih=new be,Xn=class s{constructor(t=new N,e=new N,i=new N){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,n){n.subVectors(i,e),Yi.subVectors(t,e),n.cross(Yi);let r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(t,e,i,n,r){Yi.subVectors(n,e),Tn.subVectors(i,e),Zc.subVectors(t,e);let a=Yi.dot(Yi),o=Yi.dot(Tn),c=Yi.dot(Zc),l=Tn.dot(Tn),h=Tn.dot(Zc),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(l*c-o*h)*u,g=(a*h-o*c)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,i,n){return this.getBarycoord(t,e,i,n,An)===null?!1:An.x>=0&&An.y>=0&&An.x+An.y<=1}static getInterpolation(t,e,i,n,r,a,o,c){return this.getBarycoord(t,e,i,n,An)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,An.x),c.addScaledVector(a,An.y),c.addScaledVector(o,An.z),c)}static getInterpolatedAttribute(t,e,i,n,r,a){return th.setScalar(0),eh.setScalar(0),ih.setScalar(0),th.fromBufferAttribute(t,e),eh.fromBufferAttribute(t,i),ih.fromBufferAttribute(t,n),a.setScalar(0),a.addScaledVector(th,r.x),a.addScaledVector(eh,r.y),a.addScaledVector(ih,r.z),a}static isFrontFacing(t,e,i,n){return Yi.subVectors(i,e),Tn.subVectors(t,e),Yi.cross(Tn).dot(n)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,n){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[n]),this}setFromAttributeAndIndices(t,e,i,n){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Yi.subVectors(this.c,this.b),Tn.subVectors(this.a,this.b),Yi.cross(Tn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,n,r){return s.getInterpolation(t,this.a,this.b,this.c,e,i,n,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,n=this.b,r=this.c,a,o;Zs.subVectors(n,i),Js.subVectors(r,i),Jc.subVectors(t,i);let c=Zs.dot(Jc),l=Js.dot(Jc);if(c<=0&&l<=0)return e.copy(i);jc.subVectors(t,n);let h=Zs.dot(jc),d=Js.dot(jc);if(h>=0&&d<=h)return e.copy(n);let u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(i).addScaledVector(Zs,a);Qc.subVectors(t,r);let f=Zs.dot(Qc),g=Js.dot(Qc);if(g>=0&&f<=g)return e.copy(r);let x=f*l-c*g;if(x<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(i).addScaledVector(Js,o);let m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return Ad.subVectors(r,n),o=(d-h)/(d-h+(f-g)),e.copy(n).addScaledVector(Ad,o);let p=1/(m+x+u);return a=x*p,o=u*p,e.copy(i).addScaledVector(Zs,a).addScaledVector(Js,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},mn=class{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Ki.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Ki.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=Ki.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Ki):Ki.fromBufferAttribute(r,a),Ki.applyMatrix4(t.matrixWorld),this.expandByPoint(Ki);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ga.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ga.copy(i.boundingBox)),Ga.applyMatrix4(t.matrixWorld),this.union(Ga)}let n=t.children;for(let r=0,a=n.length;r<a;r++)this.expandByObject(n[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ki),Ki.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(zr),Wa.subVectors(this.max,zr),js.subVectors(t.a,zr),Qs.subVectors(t.b,zr),tr.subVectors(t.c,zr),Gn.subVectors(Qs,js),Wn.subVectors(tr,Qs),ds.subVectors(js,tr);let e=[0,-Gn.z,Gn.y,0,-Wn.z,Wn.y,0,-ds.z,ds.y,Gn.z,0,-Gn.x,Wn.z,0,-Wn.x,ds.z,0,-ds.x,-Gn.y,Gn.x,0,-Wn.y,Wn.x,0,-ds.y,ds.x,0];return!nh(e,js,Qs,tr,Wa)||(e=[1,0,0,0,1,0,0,0,1],!nh(e,js,Qs,tr,Wa))?!1:($a.crossVectors(Gn,Wn),e=[$a.x,$a.y,$a.z],nh(e,js,Qs,tr,Wa))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ki).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ki).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Rn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Rn=[new N,new N,new N,new N,new N,new N,new N,new N],Ki=new N,Ga=new mn,js=new N,Qs=new N,tr=new N,Gn=new N,Wn=new N,ds=new N,zr=new N,Wa=new N,$a=new N,fs=new N;function nh(s,t,e,i,n){for(let r=0,a=s.length-3;r<=a;r+=3){fs.fromArray(s,r);let o=n.x*Math.abs(fs.x)+n.y*Math.abs(fs.y)+n.z*Math.abs(fs.z),c=t.dot(fs),l=e.dot(fs),h=i.dot(fs);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var Ve=new N,Xa=new Xt,n0=0,Ri=class extends pn{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:n0++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=yf,this.updateRanges=[],this.gpuType=pi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[t+n]=e.array[i+n];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Xa.fromBufferAttribute(this,e),Xa.applyMatrix3(t),this.setXY(e,Xa.x,Xa.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix3(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix4(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.applyNormalMatrix(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.transformDirection(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Fr(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=_i(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Fr(e,this.array)),e}setX(t,e){return this.normalized&&(e=_i(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Fr(e,this.array)),e}setY(t,e){return this.normalized&&(e=_i(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Fr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=_i(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Fr(e,this.array)),e}setW(t,e){return this.normalized&&(e=_i(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=_i(e,this.array),i=_i(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,n){return t*=this.itemSize,this.normalized&&(e=_i(e,this.array),i=_i(i,this.array),n=_i(n,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this}setXYZW(t,e,i,n,r){return t*=this.itemSize,this.normalized&&(e=_i(e,this.array),i=_i(i,this.array),n=_i(n,this.array),r=_i(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var Jr=class extends Ri{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var jr=class extends Ri{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var Zt=class extends Ri{constructor(t,e,i){super(new Float32Array(t),e,i)}},s0=new mn,Hr=new N,sh=new N,gn=class{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):s0.setFromPoints(t).getCenter(i);let n=0;for(let r=0,a=t.length;r<a;r++)n=Math.max(n,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(n),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Hr.subVectors(t,this.center);let e=Hr.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),n=(i-this.radius)*.5;this.center.addScaledVector(Hr,n/i),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(sh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Hr.copy(t.center).add(sh)),this.expandByPoint(Hr.copy(t.center).sub(sh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},r0=0,ki=new Gt,rh=new fi,er=new N,Ti=new mn,Vr=new mn,Ye=new N,We=class s extends pn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:r0++}),this.uuid=va(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Wm(t)?jr:Jr)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Ht().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return ki.makeRotationFromQuaternion(t),this.applyMatrix4(ki),this}rotateX(t){return ki.makeRotationX(t),this.applyMatrix4(ki),this}rotateY(t){return ki.makeRotationY(t),this.applyMatrix4(ki),this}rotateZ(t){return ki.makeRotationZ(t),this.applyMatrix4(ki),this}translate(t,e,i){return ki.makeTranslation(t,e,i),this.applyMatrix4(ki),this}scale(t,e,i){return ki.makeScale(t,e,i),this.applyMatrix4(ki),this}lookAt(t){return rh.lookAt(t),rh.updateMatrix(),this.applyMatrix4(rh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(er).negate(),this.translate(er.x,er.y,er.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let n=0,r=t.length;n<r;n++){let a=t[n];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Zt(i,3))}else{let i=Math.min(t.length,e.count);for(let n=0;n<i;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&Ut("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new mn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Bt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,n=e.length;i<n;i++){let r=e[i];Ti.setFromBufferAttribute(r),this.morphTargetsRelative?(Ye.addVectors(this.boundingBox.min,Ti.min),this.boundingBox.expandByPoint(Ye),Ye.addVectors(this.boundingBox.max,Ti.max),this.boundingBox.expandByPoint(Ye)):(this.boundingBox.expandByPoint(Ti.min),this.boundingBox.expandByPoint(Ti.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Bt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Bt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){let i=this.boundingSphere.center;if(Ti.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Vr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ye.addVectors(Ti.min,Vr.min),Ti.expandByPoint(Ye),Ye.addVectors(Ti.max,Vr.max),Ti.expandByPoint(Ye)):(Ti.expandByPoint(Vr.min),Ti.expandByPoint(Vr.max))}Ti.getCenter(i);let n=0;for(let r=0,a=t.count;r<a;r++)Ye.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(Ye));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Ye.fromBufferAttribute(o,l),c&&(er.fromBufferAttribute(t,l),Ye.add(er)),n=Math.max(n,i.distanceToSquared(Ye))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&Bt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Bt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,n=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Ri(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let b=0;b<i.count;b++)o[b]=new N,c[b]=new N;let l=new N,h=new N,d=new N,u=new Xt,f=new Xt,g=new Xt,x=new N,m=new N;function p(b,T,R){l.fromBufferAttribute(i,b),h.fromBufferAttribute(i,T),d.fromBufferAttribute(i,R),u.fromBufferAttribute(r,b),f.fromBufferAttribute(r,T),g.fromBufferAttribute(r,R),h.sub(l),d.sub(l),f.sub(u),g.sub(u);let P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(P),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),o[b].add(x),o[T].add(x),o[R].add(x),c[b].add(m),c[T].add(m),c[R].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let b=0,T=v.length;b<T;++b){let R=v[b],P=R.start,D=R.count;for(let H=P,L=P+D;H<L;H+=3)p(t.getX(H+0),t.getX(H+1),t.getX(H+2))}let S=new N,y=new N,E=new N,M=new N;function A(b){E.fromBufferAttribute(n,b),M.copy(E);let T=o[b];S.copy(T),S.sub(E.multiplyScalar(E.dot(T))).normalize(),y.crossVectors(M,T);let P=y.dot(c[b])<0?-1:1;a.setXYZW(b,S.x,S.y,S.z,P)}for(let b=0,T=v.length;b<T;++b){let R=v[b],P=R.start,D=R.count;for(let H=P,L=P+D;H<L;H+=3)A(t.getX(H+0)),A(t.getX(H+1)),A(t.getX(H+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new Ri(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);let n=new N,r=new N,a=new N,o=new N,c=new N,l=new N,h=new N,d=new N;if(t)for(let u=0,f=t.count;u<f;u+=3){let g=t.getX(u+0),x=t.getX(u+1),m=t.getX(u+2);n.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,m),h.subVectors(a,r),d.subVectors(n,r),h.cross(d),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,x),l.fromBufferAttribute(i,m),o.add(h),c.add(h),l.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,f=e.count;u<f;u+=3)n.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(n,r),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ye.fromBufferAttribute(t,e),Ye.normalize(),t.setXYZ(e,Ye.x,Ye.y,Ye.z)}toNonIndexed(){function t(o,c){let l=o.array,h=o.itemSize,d=o.normalized,u=new l.constructor(c.length*h),f=0,g=0;for(let x=0,m=c.length;x<m;x++){o.isInterleavedBufferAttribute?f=c[x]*o.data.stride+o.offset:f=c[x]*h;for(let p=0;p<h;p++)u[g++]=l[f++]}return new Ri(u,h,d)}if(this.index===null)return Ut("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,i=this.index.array,n=this.attributes;for(let o in n){let c=n[o],l=t(c,i);e.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,d=l.length;h<d;h++){let u=l[h],f=t(u,i);c.push(f)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let c in i){let l=i[c];t.data.attributes[c]=l.toJSON(t.data)}let n={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){let f=l[d];h.push(f.toJSON(t.data))}h.length>0&&(n[c]=h,r=!0)}r&&(t.data.morphAttributes=n,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let n=t.attributes;for(let l in n){let h=n[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],d=r[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let l=0,h=a.length;l<h;l++){let d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var ah=new N,a0=new N,o0=new Ht,Zi=class{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,n){return this.normal.set(t,e,i),this.constant=n,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let n=ah.subVectors(i,e).cross(a0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(n,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let n=t.delta(ah),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(n,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||o0.getNormalMatrix(t),n=this.coplanarPoint(ah).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},l0=0,ys=class extends pn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:l0++}),this.uuid=va(),this.name="",this.type="Material",this.blending=xr,this.side=xn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Sh,this.blendDst=wh,this.blendEquation=Ts,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qt(0,0,0),this.blendAlpha=0,this.depthFunc=or,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=df,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=oo,this.stencilZFail=oo,this.stencilZPass=oo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){Ut(`Material: parameter '${e}' has value of undefined.`);continue}let n=this[e];if(n===void 0){Ut(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector2&&i&&i.isVector2||n&&n.isEuler&&i&&i.isEuler||n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(e){let r=n(t.textures),a=n(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new qt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new Zi().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Xt().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Xt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let n=e.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Cn=new N,oh=new N,qa=new N,Ya=new N,So=class{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Cn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Cn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Cn.copy(this.origin).addScaledVector(this.direction,e),Cn.distanceToSquared(t))}distanceSqToSegment(t,e,i,n){oh.copy(t).add(e).multiplyScalar(.5),qa.copy(e).sub(t).normalize(),Ya.copy(this.origin).sub(oh);let r=t.distanceTo(e)*.5,a=-this.direction.dot(qa),o=Ya.dot(this.direction),c=-Ya.dot(qa),l=Ya.lengthSq(),h=Math.abs(1-a*a),d,u,f,g;if(h>0)if(d=a*c-o,u=a*o-c,g=r*h,d>=0)if(u>=-g)if(u<=g){let x=1/h;d*=x,u*=x,f=d*(d+a*u+2*o)+u*(a*d+u+2*c)+l}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-r,-c),r),f=u*(u+2*c)+l):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),n&&n.copy(oh).addScaledVector(qa,u),f}intersectSphere(t,e){if(t.radius<0)return null;Cn.subVectors(t.center,this.origin);let i=Cn.dot(this.direction),n=Cn.dot(Cn)-i*i,r=t.radius*t.radius;if(n>r)return null;let a=Math.sqrt(r-n),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,n,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(i=(t.min.x-u.x)*l,n=(t.max.x-u.x)*l):(i=(t.max.x-u.x)*l,n=(t.min.x-u.x)*l),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),i>a||r>n||((r>i||isNaN(i))&&(i=r),(a<n||isNaN(n))&&(n=a),d>=0?(o=(t.min.z-u.z)*d,c=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,c=(t.min.z-u.z)*d),i>c||o>n)||((o>i||i!==i)&&(i=o),(c<n||n!==n)&&(n=c),n<0)?null:this.at(i>=0?i:n,e)}intersectsBox(t){return this.intersectBox(t,Cn)!==null}intersectTriangle(t,e,i,n,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,d=t.x-a.x,u=t.y-a.y,f=t.z-a.z,g=e.x-a.x,x=e.y-a.y,m=e.z-a.z,p=i.x-a.x,v=i.y-a.y,S=i.z-a.z,y=Math.abs(c),E=Math.abs(l),M=Math.abs(h),A,b,T,R,P,D,H,L,V,K,Z,j;if(y>=E&&y>=M?(T=c,D=d,V=g,j=p,c>=0?(A=l,b=h,R=u,P=f,H=x,L=m,K=v,Z=S):(A=h,b=l,R=f,P=u,H=m,L=x,K=S,Z=v)):E>=M?(T=l,D=u,V=x,j=v,l>=0?(A=h,b=c,R=f,P=d,H=m,L=g,K=S,Z=p):(A=c,b=h,R=d,P=f,H=g,L=m,K=p,Z=S)):(T=h,D=f,V=m,j=S,h>=0?(A=c,b=l,R=d,P=u,H=g,L=x,K=p,Z=v):(A=l,b=c,R=u,P=d,H=x,L=g,K=v,Z=p)),T===0)return null;let X=A/T,et=b/T,nt=1/T,Lt=R-X*D,At=P-et*D,oe=H-X*V,ie=L-et*V,rt=K-X*j,I=Z-et*j,Y=rt*ie-I*oe,at=Lt*I-At*rt,yt=oe*At-ie*Lt;if(n){if(Y<0||at<0||yt<0)return null}else if((Y<0||at<0||yt<0)&&(Y>0||at>0||yt>0))return null;let ot=Y+at+yt;if(ot===0)return null;let Ct=nt*(Y*D+at*V+yt*j);return(ot>0?Ct<0:Ct>0)?null:this.at(Ct/ot,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},bs=class extends ys{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mi,this.combine=Eh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Rd=new Gt,ps=new So,Ka=new gn,Cd=new N,Za=new N,Ja=new N,ja=new N,lh=new N,Qa=new N,Pd=new N,to=new N,ce=class extends fi{constructor(t=new We,e=new bs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){let o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(n,t);let o=this.morphTargetInfluences;if(r&&o){Qa.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],d=r[c];h!==0&&(lh.fromBufferAttribute(d,t),a?Qa.addScaledVector(lh,h):Qa.addScaledVector(lh.sub(e),h))}e.add(Qa)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ka.copy(i.boundingSphere),Ka.applyMatrix4(r),ps.copy(t.ray).recast(t.near),!(Ka.containsPoint(ps.origin)===!1&&(ps.intersectSphere(Ka,Cd)===null||ps.origin.distanceToSquared(Cd)>(t.far-t.near)**2))&&(Rd.copy(r).invert(),ps.copy(t.ray).applyMatrix4(Rd),!(i.boundingBox!==null&&ps.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,ps)))}_computeIntersections(t,e,i){let n,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){let m=u[g],p=a[m.materialIndex],v=Math.max(m.start,f.start),S=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let y=v,E=S;y<E;y+=3){let M=o.getX(y),A=o.getX(y+1),b=o.getX(y+2);n=eo(this,p,t,i,l,h,d,M,A,b),n&&(n.faceIndex=Math.floor(y/3),n.face.materialIndex=m.materialIndex,e.push(n))}}else{let g=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let v=o.getX(m),S=o.getX(m+1),y=o.getX(m+2);n=eo(this,a,t,i,l,h,d,v,S,y),n&&(n.faceIndex=Math.floor(m/3),e.push(n))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){let m=u[g],p=a[m.materialIndex],v=Math.max(m.start,f.start),S=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let y=v,E=S;y<E;y+=3){let M=y,A=y+1,b=y+2;n=eo(this,p,t,i,l,h,d,M,A,b),n&&(n.faceIndex=Math.floor(y/3),n.face.materialIndex=m.materialIndex,e.push(n))}}else{let g=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let v=m,S=m+1,y=m+2;n=eo(this,a,t,i,l,h,d,v,S,y),n&&(n.faceIndex=Math.floor(m/3),e.push(n))}}}};function c0(s,t,e,i,n,r,a,o){let c;if(t.side===Je?c=i.intersectTriangle(a,r,n,!0,o):c=i.intersectTriangle(n,r,a,t.side===xn,o),c===null)return null;to.copy(o),to.applyMatrix4(s.matrixWorld);let l=e.ray.origin.distanceTo(to);return l<e.near||l>e.far?null:{distance:l,point:to.clone(),object:s}}function eo(s,t,e,i,n,r,a,o,c,l){s.getVertexPosition(o,Za),s.getVertexPosition(c,Ja),s.getVertexPosition(l,ja);let h=c0(s,t,e,i,Za,Ja,ja,Pd);if(h){let d=new N;Xn.getBarycoord(Pd,Za,Ja,ja,d),n&&(h.uv=Xn.getInterpolatedAttribute(n,o,c,l,d,new Xt)),r&&(h.uv1=Xn.getInterpolatedAttribute(r,o,c,l,d,new Xt)),a&&(h.normal=Xn.getInterpolatedAttribute(a,o,c,l,d,new N),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:c,c:l,normal:new N,materialIndex:0};Xn.getNormal(Za,Ja,ja,u.normal),h.face=u,h.barycoord=d}return h}var qn=class extends di{constructor(t=null,e=1,i=1,n,r,a,o,c,l=Le,h=Le,d,u){super(null,a,o,c,l,h,n,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Si=class extends Ri{constructor(t,e,i,n=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},ir=new Gt,Id=new Gt,io=[],Ld=new mn,h0=new Gt,Gr=new ce,Wr=new gn,dr=class extends ce{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Si(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,h0)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new mn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,ir),Ld.copy(t.boundingBox).applyMatrix4(ir),this.boundingBox.union(Ld)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new gn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,ir),Wr.copy(t.boundingSphere).applyMatrix4(ir),this.boundingSphere.union(Wr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let i=e.morphTargetInfluences,n=this.morphTexture.source.data.data,r=i.length+1,a=t*r+1;for(let o=0;o<i.length;o++)i[o]=n[a+o]}raycast(t,e){let i=this.matrixWorld,n=this.count;if(Gr.geometry=this.geometry,Gr.material=this.material,Gr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Wr.copy(this.boundingSphere),Wr.applyMatrix4(i),t.ray.intersectsSphere(Wr)!==!1))for(let r=0;r<n;r++){this.getMatrixAt(r,ir),Id.multiplyMatrices(i,ir),Gr.matrixWorld=Id,Gr.raycast(t,io);for(let a=0,o=io.length;a<o;a++){let c=io[a];c.instanceId=r,c.object=this,e.push(c)}io.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Si(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let i=e.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new qn(new Float32Array(n*this.count),n,this.count,Ko,pi));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<i.length;l++)a+=i[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=n*t;return r[c]=o,r.set(i,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ms=new gn,u0=new Xt(.5,.5),no=new N,fr=class{constructor(t=new Zi,e=new Zi,i=new Zi,n=new Zi,r=new Zi,a=new Zi){this.planes=[t,e,i,n,r,a]}set(t,e,i,n,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(n),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Ji,i=!1){let n=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],x=r[9],m=r[10],p=r[11],v=r[12],S=r[13],y=r[14],E=r[15];if(n[0].setComponents(l-a,f-h,p-g,E-v).normalize(),n[1].setComponents(l+a,f+h,p+g,E+v).normalize(),n[2].setComponents(l+o,f+d,p+x,E+S).normalize(),n[3].setComponents(l-o,f-d,p-x,E-S).normalize(),i)n[4].setComponents(c,u,m,y).normalize(),n[5].setComponents(l-c,f-u,p-m,E-y).normalize();else if(n[4].setComponents(l-c,f-u,p-m,E-y).normalize(),e===Ji)n[5].setComponents(l+c,f+u,p+m,E+y).normalize();else if(e===lr)n[5].setComponents(c,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ms.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ms.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ms)}intersectsSprite(t){ms.center.set(0,0,0);let e=u0.distanceTo(t.center);return ms.radius=.7071067811865476+e,ms.applyMatrix4(t.matrixWorld),this.intersectsSphere(ms)}intersectsSphere(t){let e=this.planes,i=t.center,n=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let n=e[i];if(no.x=n.normal.x>0?t.max.x:t.min.x,no.y=n.normal.y>0?t.max.y:t.min.y,no.z=n.normal.z>0?t.max.z:t.min.z,n.distanceToPoint(no)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Qr=class extends di{constructor(t=[],e=Qn,i,n,r,a,o,c,l,h){super(t,e,i,n,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},_s=class extends di{constructor(t,e,i,n,r,a,o,c,l){super(t,e,i,n,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Yn=class extends di{constructor(t,e,i=Qi,n,r,a,o=Le,c=Le,l,h=fn,d=1){if(h!==fn&&h!==es)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,n,r,a,o,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new hr(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},wo=class extends Yn{constructor(t,e=Qi,i=Qn,n,r,a=Le,o=Le,c,l=fn){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,i,n,r,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},ta=class extends di{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Kn=class s extends We{constructor(t=1,e=1,i=1,n=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:n,heightSegments:r,depthSegments:a};let o=this;n=Math.floor(n),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],d=[],u=0,f=0;g("z","y","x",-1,-1,i,e,t,a,r,0),g("z","y","x",1,-1,i,e,-t,a,r,1),g("x","z","y",1,1,t,i,e,n,a,2),g("x","z","y",1,-1,t,i,-e,n,a,3),g("x","y","z",1,-1,t,e,i,n,r,4),g("x","y","z",-1,-1,t,e,-i,n,r,5),this.setIndex(c),this.setAttribute("position",new Zt(l,3)),this.setAttribute("normal",new Zt(h,3)),this.setAttribute("uv",new Zt(d,2));function g(x,m,p,v,S,y,E,M,A,b,T){let R=y/A,P=E/b,D=y/2,H=E/2,L=M/2,V=A+1,K=b+1,Z=0,j=0,X=new N;for(let et=0;et<K;et++){let nt=et*P-H;for(let Lt=0;Lt<V;Lt++){let At=Lt*R-D;X[x]=At*v,X[m]=nt*S,X[p]=L,l.push(X.x,X.y,X.z),X[x]=0,X[m]=0,X[p]=M>0?1:-1,h.push(X.x,X.y,X.z),d.push(Lt/A),d.push(1-et/b),Z+=1}}for(let et=0;et<b;et++)for(let nt=0;nt<A;nt++){let Lt=u+nt+V*et,At=u+nt+V*(et+1),oe=u+(nt+1)+V*(et+1),ie=u+(nt+1)+V*et;c.push(Lt,At,ie),c.push(At,oe,ie),j+=6}o.addGroup(f,j,T),f+=j,u+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var ea=class s extends We{constructor(t=1,e=32,i=0,n=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:n},e=Math.max(3,e);let r=[],a=[],o=[],c=[],l=new N,h=new Xt;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){let f=i+d/e*n;l.x=t*Math.cos(f),l.y=t*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,c.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Zt(a,3)),this.setAttribute("normal",new Zt(o,3)),this.setAttribute("uv",new Zt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.segments,t.thetaStart,t.thetaLength)}},pr=class s extends We{constructor(t=1,e=1,i=1,n=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:n,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;n=Math.floor(n),r=Math.floor(r);let h=[],d=[],u=[],f=[],g=0,x=[],m=i/2,p=0;v(),a===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new Zt(d,3)),this.setAttribute("normal",new Zt(u,3)),this.setAttribute("uv",new Zt(f,2));function v(){let y=new N,E=new N,M=0,A=(e-t)/i;for(let b=0;b<=r;b++){let T=[],R=b/r,P=R*(e-t)+t;for(let D=0;D<=n;D++){let H=D/n,L=H*c+o,V=Math.sin(L),K=Math.cos(L);E.x=P*V,E.y=-R*i+m,E.z=P*K,d.push(E.x,E.y,E.z),y.set(V,A,K).normalize(),u.push(y.x,y.y,y.z),f.push(H,1-R),T.push(g++)}x.push(T)}for(let b=0;b<n;b++)for(let T=0;T<r;T++){let R=x[T][b],P=x[T+1][b],D=x[T+1][b+1],H=x[T][b+1];(t>0||T!==0)&&(h.push(R,P,H),M+=3),(e>0||T!==r-1)&&(h.push(P,D,H),M+=3)}l.addGroup(p,M,0),p+=M}function S(y){let E=g,M=new Xt,A=new N,b=0,T=y===!0?t:e,R=y===!0?1:-1;for(let D=1;D<=n;D++)d.push(0,m*R,0),u.push(0,R,0),f.push(.5,.5),g++;let P=g;for(let D=0;D<=n;D++){let L=D/n*c+o,V=Math.cos(L),K=Math.sin(L);A.x=T*K,A.y=m*R,A.z=T*V,d.push(A.x,A.y,A.z),u.push(0,R,0),M.x=V*.5+.5,M.y=K*.5*R+.5,f.push(M.x,M.y),g++}for(let D=0;D<n;D++){let H=E+D,L=P+D;y===!0?h.push(L,L+1,H):h.push(L+1,L,H),b+=3}l.addGroup(p,b,y===!0?1:2),p+=b}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ms=class s extends pr{constructor(t=1,e=1,i=32,n=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,i,n,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:n,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new s(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ia=class s extends We{constructor(t=[],e=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:n};let r=[],a=[];o(n),l(i),h(),this.setAttribute("position",new Zt(r,3)),this.setAttribute("normal",new Zt(r.slice(),3)),this.setAttribute("uv",new Zt(a,2)),n===0?this.computeVertexNormals():this.normalizeNormals();function o(v){let S=new N,y=new N,E=new N;for(let M=0;M<e.length;M+=3)f(e[M+0],S),f(e[M+1],y),f(e[M+2],E),c(S,y,E,v)}function c(v,S,y,E){let M=E+1,A=[];for(let b=0;b<=M;b++){A[b]=[];let T=v.clone().lerp(y,b/M),R=S.clone().lerp(y,b/M),P=M-b;for(let D=0;D<=P;D++)D===0&&b===M?A[b][D]=T:A[b][D]=T.clone().lerp(R,D/P)}for(let b=0;b<M;b++)for(let T=0;T<2*(M-b)-1;T++){let R=Math.floor(T/2);T%2===0?(u(A[b][R+1]),u(A[b+1][R]),u(A[b][R])):(u(A[b][R+1]),u(A[b+1][R+1]),u(A[b+1][R]))}}function l(v){let S=new N;for(let y=0;y<r.length;y+=3)S.x=r[y+0],S.y=r[y+1],S.z=r[y+2],S.normalize().multiplyScalar(v),r[y+0]=S.x,r[y+1]=S.y,r[y+2]=S.z}function h(){let v=new N;for(let S=0;S<r.length;S+=3){v.x=r[S+0],v.y=r[S+1],v.z=r[S+2];let y=m(v)/2/Math.PI+.5,E=p(v)/Math.PI+.5;a.push(y,1-E)}g(),d()}function d(){for(let v=0;v<a.length;v+=6){let S=a[v+0],y=a[v+2],E=a[v+4],M=Math.max(S,y,E),A=Math.min(S,y,E);M>.9&&A<.1&&(S<.2&&(a[v+0]+=1),y<.2&&(a[v+2]+=1),E<.2&&(a[v+4]+=1))}}function u(v){r.push(v.x,v.y,v.z)}function f(v,S){let y=v*3;S.x=t[y+0],S.y=t[y+1],S.z=t[y+2]}function g(){let v=new N,S=new N,y=new N,E=new N,M=new Xt,A=new Xt,b=new Xt;for(let T=0,R=0;T<r.length;T+=9,R+=6){v.set(r[T+0],r[T+1],r[T+2]),S.set(r[T+3],r[T+4],r[T+5]),y.set(r[T+6],r[T+7],r[T+8]),M.set(a[R+0],a[R+1]),A.set(a[R+2],a[R+3]),b.set(a[R+4],a[R+5]),E.copy(v).add(S).add(y).divideScalar(3);let P=m(E);x(M,R+0,v,P),x(A,R+2,S,P),x(b,R+4,y,P)}}function x(v,S,y,E){E<0&&v.x===1&&(a[S]=v.x-1),y.x===0&&y.z===0&&(a[S]=E/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.vertices,t.indices,t.radius,t.detail)}};var Ss=class s extends ia{constructor(t=1,e=0){let i=(1+Math.sqrt(5))/2,n=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(n,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}};var Oi=class s extends We{constructor(t=1,e=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:n};let r=t/2,a=e/2,o=Math.floor(i),c=Math.floor(n),l=o+1,h=c+1,d=t/o,u=e/c,f=[],g=[],x=[],m=[];for(let p=0;p<h;p++){let v=p*u-a;for(let S=0;S<l;S++){let y=S*d-r;g.push(y,-v,0),x.push(0,0,1),m.push(S/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<o;v++){let S=v+l*p,y=v+l*(p+1),E=v+1+l*(p+1),M=v+1+l*p;f.push(S,y,M),f.push(y,E,M)}this.setIndex(f),this.setAttribute("position",new Zt(g,3)),this.setAttribute("normal",new Zt(x,3)),this.setAttribute("uv",new Zt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}},ws=class s extends We{constructor(t=.5,e=1,i=32,n=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:n,thetaStart:r,thetaLength:a},i=Math.max(3,i),n=Math.max(1,n);let o=[],c=[],l=[],h=[],d=t,u=(e-t)/n,f=new N,g=new Xt;for(let x=0;x<=n;x++){for(let m=0;m<=i;m++){let p=r+m/i*a;f.x=d*Math.cos(p),f.y=d*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}d+=u}for(let x=0;x<n;x++){let m=x*(i+1);for(let p=0;p<i;p++){let v=p+m,S=v,y=v+i+1,E=v+i+2,M=v+1;o.push(S,y,M),o.push(y,E,M)}}this.setIndex(o),this.setAttribute("position",new Zt(c,3)),this.setAttribute("normal",new Zt(l,3)),this.setAttribute("uv",new Zt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var Es=class s extends We{constructor(t=1,e=32,i=16,n=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:n,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let c=Math.min(a+o,Math.PI),l=0,h=[],d=new N,u=new N,f=[],g=[],x=[],m=[];for(let p=0;p<=i;p++){let v=[],S=p/i,y=a+S*o,E=t*Math.cos(y),M=Math.sqrt(t*t-E*E),A=0;p===0&&a===0?A=.5/e:p===i&&c===Math.PI&&(A=-.5/e);for(let b=0;b<=e;b++){let T=b/e,R=n+T*r;d.x=-M*Math.cos(R),d.y=E,d.z=M*Math.sin(R),g.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),m.push(T+A,1-S),v.push(l++)}h.push(v)}for(let p=0;p<i;p++)for(let v=0;v<e;v++){let S=h[p][v+1],y=h[p][v],E=h[p+1][v],M=h[p+1][v+1];(p!==0||a>0)&&f.push(S,y,M),(p!==i-1||c<Math.PI)&&f.push(y,E,M)}this.setIndex(f),this.setAttribute("position",new Zt(g,3)),this.setAttribute("normal",new Zt(x,3)),this.setAttribute("uv",new Zt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},na=class s extends ia{constructor(t=1,e=0){let i=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],n=[2,1,0,0,3,2,1,3,0,2,3,1];super(i,n,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}},sa=class s extends We{constructor(t=1,e=.4,i=12,n=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:n,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),n=Math.floor(n);let c=[],l=[],h=[],d=[],u=new N,f=new N,g=new N;for(let x=0;x<=i;x++){let m=a+x/i*o;for(let p=0;p<=n;p++){let v=p/n*r;f.x=(t+e*Math.cos(m))*Math.cos(v),f.y=(t+e*Math.cos(m))*Math.sin(v),f.z=e*Math.sin(m),l.push(f.x,f.y,f.z),u.x=t*Math.cos(v),u.y=t*Math.sin(v),g.subVectors(f,u).normalize(),h.push(g.x,g.y,g.z),d.push(p/n),d.push(x/i)}}for(let x=1;x<=i;x++)for(let m=1;m<=n;m++){let p=(n+1)*x+m-1,v=(n+1)*(x-1)+m-1,S=(n+1)*(x-1)+m,y=(n+1)*x+m;c.push(p,v,y),c.push(v,S,y)}this.setIndex(c),this.setAttribute("position",new Zt(l,3)),this.setAttribute("normal",new Zt(h,3)),this.setAttribute("uv",new Zt(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function Rs(s){let t={};for(let e in s){t[e]={};for(let i in s[e]){let n=s[e][i];if(Nd(n))n.isRenderTargetTexture?(Ut("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=n.clone();else if(Array.isArray(n))if(Nd(n[0])){let r=[];for(let a=0,o=n.length;a<o;a++)r[a]=n[a].clone();t[e][i]=r}else t[e][i]=n.slice();else t[e][i]=n}}return t}function oi(s){let t={};for(let e=0;e<s.length;e++){let i=Rs(s[e]);for(let n in i)t[n]=i[n]}return t}function Nd(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function d0(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Wh(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}var ya={clone:Rs,merge:oi},f0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,p0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Oe=class extends ys{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=f0,this.fragmentShader=p0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Rs(t.uniforms),this.uniformsGroups=d0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let n in this.uniforms){let a=this.uniforms[n].value;a&&a.isTexture?e.uniforms[n]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[n]={type:"m4",value:a.toArray()}:e.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let n=t.uniforms[i];switch(this.uniforms[i]={},n.type){case"t":this.uniforms[i].value=e[n.value]||null;break;case"c":this.uniforms[i].value=new qt().setHex(n.value);break;case"v2":this.uniforms[i].value=new Xt().fromArray(n.value);break;case"v3":this.uniforms[i].value=new N().fromArray(n.value);break;case"v4":this.uniforms[i].value=new be().fromArray(n.value);break;case"m3":this.uniforms[i].value=new Ht().fromArray(n.value);break;case"m4":this.uniforms[i].value=new Gt().fromArray(n.value);break;default:this.uniforms[i].value=n.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Eo=class extends Oe{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var To=class extends ys{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=hf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ao=class extends ys{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function nr(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function ch(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}var Zn=class{constructor(t,e,i,n){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=n!==void 0?n:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,n=e[i],r=e[i-1];i:{t:{let a;e:{n:if(!(t<n)){for(let o=i+2;;){if(n===void 0){if(t<r)break n;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=n,n=e[++i],t<n)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let c=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(n=r,r=e[--i-1],t>=r)break t}a=i,i=0;break e}break i}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(n=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,n)}return this.interpolate_(i,r,t,n)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,n=this.valueSize,r=t*n;for(let a=0;a!==n;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ro=class extends Zn{constructor(t,e,i,n){super(t,e,i,n),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:dh,endingEnd:dh}}intervalChanged_(t,e,i){let n=this.parameterPositions,r=t-2,a=t+1,o=n[r],c=n[a];if(o===void 0)switch(this.getSettings_().endingStart){case fh:r=t,o=2*e-i;break;case ph:r=n.length-2,o=e+n[r]-n[r+1];break;default:r=t,o=i}if(c===void 0)switch(this.getSettings_().endingEnd){case fh:a=t,c=2*i-e;break;case ph:a=1,c=i+n[1]-n[0];break;default:a=t-1,c=e}let l=(i-e)*.5,h=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(i-e)/(n-e),x=g*g,m=x*g,p=-u*m+2*u*x-u*g,v=(1+u)*m+(-1.5-2*u)*x+(-.5+u)*g+1,S=(-1-f)*m+(1.5+f)*x+.5*g,y=f*m-f*x;for(let E=0;E!==o;++E)r[E]=p*a[h+E]+v*a[l+E]+S*a[c+E]+y*a[d+E];return r}},Co=class extends Zn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=(i-e)/(n-e),d=1-h;for(let u=0;u!==o;++u)r[u]=a[l+u]*d+a[c+u]*h;return r}},Po=class extends Zn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t){return this.copySampleValue_(t-1)}},Io=class extends Zn{interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let g=(i-e)/(n-e),x=1-g;for(let m=0;m!==o;++m)r[m]=a[l+m]*x+a[c+m]*g;return r}let u=o*2,f=t-1;for(let g=0;g!==o;++g){let x=a[l+g],m=a[c+g],p=f*u+g*2,v=d[p],S=d[p+1],y=t*u+g*2,E=h[y],M=h[y+1],A=g0(i,e,v,E,n);r[g]=Ef(A,x,S,M,m)}return r}};function Ef(s,t,e,i,n){let r=1-s;return r*r*r*t+3*r*r*s*e+3*r*s*s*i+s*s*s*n}function m0(s,t,e,i,n){let r=1-s;return 3*r*r*(e-t)+6*r*s*(i-e)+3*s*s*(n-i)}function g0(s,t,e,i,n){let r=(s-t)/(n-t);for(let a=0;a<8;a++){let o=Ef(r,t,e,i,n)-s;if(Math.abs(o)<1e-10)break;let c=m0(r,t,e,i,n);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var Ci=class{constructor(t,e,i,n){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=nr(e,this.TimeBufferType),this.values=nr(i,this.ValueBufferType),this.setInterpolation(n||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:nr(t.times,Array),values:nr(t.values,Array)};let n=t.getInterpolation();n!==t.DefaultInterpolation&&(i.interpolation=n),ch(t.settings)&&(i.settings={inTangents:nr(t.settings.inTangents,Array),outTangents:nr(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Po(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Co(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ro(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Io(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case $r:e=this.InterpolantFactoryMethodDiscrete;break;case vo:e=this.InterpolantFactoryMethodLinear;break;case ao:e=this.InterpolantFactoryMethodSmooth;break;case uh:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ut("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return $r;case this.InterpolantFactoryMethodLinear:return vo;case this.InterpolantFactoryMethodSmooth:return ao;case this.InterpolantFactoryMethodBezier:return uh}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,n=e.length;i!==n;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,n=e.length;i!==n;++i)e[i]*=t;ch(this.settings)&&(Dd(this.settings.inTangents,t),Dd(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,n=i.length,r=0,a=n-1;for(;r!==n&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==n){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Bt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,n=this.values,r=i.length;r===0&&(Bt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let c=i[o];if(typeof c=="number"&&isNaN(c)){Bt("KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){Bt("KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(n!==void 0&&$m(n))for(let o=0,c=n.length;o!==c;++o){let l=n[o];if(isNaN(l)){Bt("KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),n=this.getInterpolation()===ao,r=t.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=t[o],h=t[o+1];if(l!==h&&(o!==1||l!==t[0]))if(n)c=!0;else{let d=o*i,u=d-i,f=d+i;for(let g=0;g!==i;++g){let x=e[d+g];if(x!==e[u+g]||x!==e[f+g]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];let d=o*i,u=a*i;for(let f=0;f!==i;++f)e[u+f]=e[d+f]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,c=a*i,l=0;l!==i;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,n=new i(this.name,t,e);return n.createInterpolant=this.createInterpolant,ch(this.settings)&&(n.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),n}};function Dd(s,t){for(let e=0,i=s.length;e!==i;e+=2)s[e]*=t}Ci.prototype.ValueTypeName="";Ci.prototype.TimeBufferType=Float32Array;Ci.prototype.ValueBufferType=Float32Array;Ci.prototype.DefaultInterpolation=vo;var Jn=class extends Ci{constructor(t,e,i){super(t,e,i)}};Jn.prototype.ValueTypeName="bool";Jn.prototype.ValueBufferType=Array;Jn.prototype.DefaultInterpolation=$r;Jn.prototype.InterpolantFactoryMethodLinear=void 0;Jn.prototype.InterpolantFactoryMethodSmooth=void 0;var Lo=class extends Ci{constructor(t,e,i,n){super(t,e,i,n)}};Lo.prototype.ValueTypeName="color";var No=class extends Ci{constructor(t,e,i,n){super(t,e,i,n)}};No.prototype.ValueTypeName="number";var Do=class extends Zn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(i-e)/(n-e),l=t*o;for(let h=l+o;l!==h;l+=4)Ge.slerpFlat(r,0,a,l-o,a,l,c);return r}},ra=class extends Ci{constructor(t,e,i,n){super(t,e,i,n)}InterpolantFactoryMethodLinear(t){return new Do(this.times,this.values,this.getValueSize(),t)}};ra.prototype.ValueTypeName="quaternion";ra.prototype.InterpolantFactoryMethodSmooth=void 0;var jn=class extends Ci{constructor(t,e,i){super(t,e,i)}};jn.prototype.ValueTypeName="string";jn.prototype.ValueBufferType=Array;jn.prototype.DefaultInterpolation=$r;jn.prototype.InterpolantFactoryMethodLinear=void 0;jn.prototype.InterpolantFactoryMethodSmooth=void 0;var ko=class extends Ci{constructor(t,e,i,n){super(t,e,i,n)}};ko.prototype.ValueTypeName="vector";var Oo=class{constructor(t,e,i){let n=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&n.onStart!==void 0&&n.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,n.onProgress!==void 0&&n.onProgress(h,a,o),a===o&&(r=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(h){n.onError!==void 0&&n.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){let d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=l.length;d<u;d+=2){let f=l[d],g=l[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Tf=new Oo,Uo=class{constructor(t){this.manager=t!==void 0?t:Tf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(n,r){i.load(t,n,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Uo.DEFAULT_MATERIAL_NAME="__DEFAULT";var Fo=class extends fi{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new qt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}};var hh=new Gt,kd=new N,Od=new N,Bo=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Xt(512,512),this.mapType=wi,this.map=null,this.mapPass=null,this.matrix=new Gt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fr,this._frameExtents=new Xt(1,1),this._viewportCount=1,this._viewports=[new be(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;kd.setFromMatrixPosition(t.matrixWorld),e.position.copy(kd),Od.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Od),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,n){hh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(hh,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=n?n.z/r.x:1,o=n?n.w/r.y:1,c=n?n.x/r.x:0,l=n?n.y/r.y:0;t.coordinateSystem===lr||t.reversedDepth?e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),e.multiply(hh)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},so=new N,ro=new Ge,un=new N,aa=class extends fi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Gt,this.projectionMatrix=new Gt,this.projectionMatrixInverse=new Gt,this.coordinateSystem=Ji,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(so,ro,un),un.x===1&&un.y===1&&un.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(so,ro,un.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(so,ro,un),un.x===1&&un.y===1&&un.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(so,ro,un.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},$n=new N,Ud=new Xt,Fd=new Xt,ri=class extends aa{constructor(t=50,e=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=yo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Vc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return yo*2*Math.atan(Math.tan(Vc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){$n.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set($n.x,$n.y).multiplyScalar(-t/$n.z),$n.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set($n.x,$n.y).multiplyScalar(-t/$n.z)}getViewSize(t,e){return this.getViewBounds(t,Ud,Fd),e.subVectors(Fd,Ud)}setViewOffset(t,e,i,n,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Vc*.5*this.fov)/this.zoom,i=2*e,n=this.aspect*i,r=-.5*n,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*n/c,e-=a.offsetY*i/l,n*=a.width/c,i*=a.height/l}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var mr=class extends aa{constructor(t=-1,e=1,i=1,n=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=n,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,n,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2,r=i-t,a=i+t,o=n+e,c=n-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},mh=class extends Bo{constructor(){super(new mr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},oa=class extends Fo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(fi.DEFAULT_UP),this.updateMatrix(),this.target=new fi,this.shadow=new mh}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var la=class extends We{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){let t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}};var sr=-90,rr=1,zo=class extends fi{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let n=new ri(sr,rr,t,e);n.layers=this.layers,this.add(n);let r=new ri(sr,rr,t,e);r.layers=this.layers,this.add(r);let a=new ri(sr,rr,t,e);a.layers=this.layers,this.add(a);let o=new ri(sr,rr,t,e);o.layers=this.layers,this.add(o);let c=new ri(sr,rr,t,e);c.layers=this.layers,this.add(c);let l=new ri(sr,rr,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,n,r,a,o,c]=e;for(let l of e)this.remove(l);if(t===Ji)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===lr)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(i,4,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},Ho=class extends ri{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var $h="\\[\\]\\.:\\/",x0=new RegExp("["+$h+"]","g"),Xh="[^"+$h+"]",v0="[^"+$h.replace("\\.","")+"]",y0=/((?:WC+[\/:])*)/.source.replace("WC",Xh),b0=/(WCOD+)?/.source.replace("WCOD",v0),_0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Xh),M0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Xh),S0=new RegExp("^"+y0+b0+_0+M0+"$"),w0=["material","materials","bones","map"],gh=class{constructor(t,e,i){let n=i||Te.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,n)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,n=this._bindings[i];n!==void 0&&n.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let n=this._targetGroup.nCachedObjects_,r=i.length;n!==r;++n)i[n].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},Te=class s{constructor(t,e,i){this.path=e,this.parsedPath=i||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,i):new s(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(x0,"")}static parseTrackName(t){let e=S0.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},n=i.nodeName&&i.nodeName.lastIndexOf(".");if(n!==void 0&&n!==-1){let r=i.nodeName.substring(n+1);w0.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,n),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let c=i(o.children);if(c)return c}return null},n=i(t.children);if(n)return n}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)t[e++]=i[n]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,n=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Ut("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=e.objectIndex;switch(i){case"materials":if(!t.material){Bt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Bt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Bt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Bt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Bt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Bt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(l!==void 0){if(t[l]===void 0){Bt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let a=t[n];if(a===void 0){let l=e.nodeName;Bt("PropertyBinding: Trying to update property for track: "+l+"."+n+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(n==="morphTargetInfluences"){if(!t.geometry){Bt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Bt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=n;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Te.Composite=gh;Te.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Te.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Te.prototype.GetterByBindingType=[Te.prototype._getValue_direct,Te.prototype._getValue_array,Te.prototype._getValue_arrayElement,Te.prototype._getValue_toArray];Te.prototype.SetterByBindingTypeAndVersioning=[[Te.prototype._setValue_direct,Te.prototype._setValue_direct_setNeedsUpdate,Te.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_array,Te.prototype._setValue_array_setNeedsUpdate,Te.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_arrayElement,Te.prototype._setValue_arrayElement_setNeedsUpdate,Te.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_fromArray,Te.prototype._setValue_fromArray_setNeedsUpdate,Te.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Y_=new Float32Array(1);var jh=class jh{constructor(t,e,i,n){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,n)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,n){let r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=n,this}};jh.prototype.isMatrix2=!0;var xh=jh;function qh(s,t,e,i){let n=E0(i);switch(e){case Fh:return s*t;case Ko:return s*t/n.components*n.byteLength;case Zo:return s*t/n.components*n.byteLength;case is:return s*t*2/n.components*n.byteLength;case Jo:return s*t*2/n.components*n.byteLength;case Bh:return s*t*3/n.components*n.byteLength;case mi:return s*t*4/n.components*n.byteLength;case jo:return s*t*4/n.components*n.byteLength;case da:case fa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case pa:case ma:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case tl:case il:return Math.max(s,16)*Math.max(t,8)/4;case Qo:case el:return Math.max(s,8)*Math.max(t,8)/2;case nl:case sl:case al:case ol:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case rl:case ga:case ll:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case cl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case hl:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case ul:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case dl:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case fl:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case pl:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case ml:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case gl:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case xl:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case vl:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case yl:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case bl:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case _l:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Ml:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Sl:case wl:case El:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Tl:case Al:return Math.ceil(s/4)*Math.ceil(t/4)*8;case xa:case Rl:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function E0(s){switch(s){case wi:case Dh:return{byteLength:1,components:1};case vr:case kh:case tn:return{byteLength:2,components:1};case qo:case Yo:return{byteLength:2,components:4};case Qi:case Xo:case pi:return{byteLength:4,components:1};case Oh:case Uh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ut("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Yf(){let s=null,t=!1,e=null,i=null;function n(r,a){i=s.requestAnimationFrame(n),e(r,a)}return{start:function(){t!==!0&&e!==null&&s!==null&&(i=s.requestAnimationFrame(n),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function A0(s){let t=new WeakMap;function e(o,c){let l=o.array,h=o.usage,d=l.byteLength,u=s.createBuffer();s.bindBuffer(c,u),s.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=s.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=s.SHORT;else if(l instanceof Uint32Array)f=s.UNSIGNED_INT;else if(l instanceof Int32Array)f=s.INT;else if(l instanceof Int8Array)f=s.BYTE;else if(l instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,c,l){let h=c.array,d=c.updateRanges;if(s.bindBuffer(l,o),d.length===0)s.bufferSubData(l,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){let g=d[u],x=d[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,d[u]=x)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){let x=d[f];s.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=t.get(o);c&&(s.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:n,remove:r,update:a}}var R0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,C0=`#ifdef USE_ALPHAHASH
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
#endif`,P0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,I0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,L0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,N0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,D0=`#ifdef USE_AOMAP
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
#endif`,k0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,O0=`#ifdef USE_BATCHING
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
#endif`,U0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,F0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,B0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,z0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,H0=`#ifdef USE_IRIDESCENCE
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
#endif`,V0=`#ifdef USE_BUMPMAP
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
#endif`,G0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,W0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,X0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,q0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Y0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,K0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Z0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,J0=`#define PI 3.141592653589793
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
} // validated`,j0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Q0=`vec3 transformedNormal = objectNormal;
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
#endif`,tg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,eg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ig=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ng=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,sg="gl_FragColor = linearToOutputTexel( gl_FragColor );",rg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ag=`#ifdef USE_ENVMAP
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
#endif`,og=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,lg=`#ifdef USE_ENVMAP
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
#endif`,cg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hg=`#ifdef USE_ENVMAP
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
#endif`,ug=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,dg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,pg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,mg=`#ifdef USE_GRADIENTMAP
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
}`,gg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,xg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,yg=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,bg=`#ifdef USE_ENVMAP
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
#endif`,_g=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Mg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Sg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,wg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Eg=`PhysicalMaterial material;
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
#endif`,Tg=`uniform sampler2D dfgLUT;
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
}`,Ag=`
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
#endif`,Rg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Cg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Pg=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Ig=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Lg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ng=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,kg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Og=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ug=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Fg=`#if defined( USE_POINTS_UV )
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
#endif`,Bg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,zg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Vg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Gg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wg=`#ifdef USE_MORPHTARGETS
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
#endif`,$g=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,qg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Yg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Jg=`#ifdef USE_NORMALMAP
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
#endif`,jg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Qg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,tx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ex=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ix=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,nx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,sx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,rx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ax=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ox=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ux=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,dx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,fx=`float getShadowMask() {
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
}`,px=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mx=`#ifdef USE_SKINNING
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
#endif`,gx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,xx=`#ifdef USE_SKINNING
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
#endif`,vx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,bx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,_x=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Mx=`#ifdef USE_TRANSMISSION
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
#endif`,Sx=`#ifdef USE_TRANSMISSION
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
#endif`,wx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ex=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ax=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Rx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Cx=`uniform sampler2D t2D;
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
}`,Px=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ix=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Lx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Nx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dx=`#include <common>
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
}`,kx=`#if DEPTH_PACKING == 3200
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
}`,Ox=`#define DISTANCE
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
}`,Ux=`#define DISTANCE
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
}`,Fx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Bx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zx=`uniform float scale;
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
}`,Hx=`uniform vec3 diffuse;
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
}`,Vx=`#include <common>
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
}`,Gx=`uniform vec3 diffuse;
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
}`,Wx=`#define LAMBERT
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
}`,$x=`#define LAMBERT
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
}`,Xx=`#define MATCAP
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
}`,qx=`#define MATCAP
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
}`,Yx=`#define NORMAL
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
}`,Kx=`#define NORMAL
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
}`,Zx=`#define PHONG
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
}`,Jx=`#define PHONG
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
}`,jx=`#define STANDARD
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
}`,Qx=`#define STANDARD
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
}`,tv=`#define TOON
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
}`,ev=`#define TOON
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
}`,iv=`uniform float size;
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
}`,nv=`uniform vec3 diffuse;
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
}`,sv=`#include <common>
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
}`,rv=`uniform vec3 color;
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
}`,av=`uniform float rotation;
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
}`,ov=`uniform vec3 diffuse;
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
}`,Kt={alphahash_fragment:R0,alphahash_pars_fragment:C0,alphamap_fragment:P0,alphamap_pars_fragment:I0,alphatest_fragment:L0,alphatest_pars_fragment:N0,aomap_fragment:D0,aomap_pars_fragment:k0,batching_pars_vertex:O0,batching_vertex:U0,begin_vertex:F0,beginnormal_vertex:B0,bsdfs:z0,iridescence_fragment:H0,bumpmap_pars_fragment:V0,clipping_planes_fragment:G0,clipping_planes_pars_fragment:W0,clipping_planes_pars_vertex:$0,clipping_planes_vertex:X0,color_fragment:q0,color_pars_fragment:Y0,color_pars_vertex:K0,color_vertex:Z0,common:J0,cube_uv_reflection_fragment:j0,defaultnormal_vertex:Q0,displacementmap_pars_vertex:tg,displacementmap_vertex:eg,emissivemap_fragment:ig,emissivemap_pars_fragment:ng,colorspace_fragment:sg,colorspace_pars_fragment:rg,envmap_fragment:ag,envmap_common_pars_fragment:og,envmap_pars_fragment:lg,envmap_pars_vertex:cg,envmap_physical_pars_fragment:bg,envmap_vertex:hg,fog_vertex:ug,fog_pars_vertex:dg,fog_fragment:fg,fog_pars_fragment:pg,gradientmap_pars_fragment:mg,lightmap_pars_fragment:gg,lights_lambert_fragment:xg,lights_lambert_pars_fragment:vg,lights_pars_begin:yg,lights_toon_fragment:_g,lights_toon_pars_fragment:Mg,lights_phong_fragment:Sg,lights_phong_pars_fragment:wg,lights_physical_fragment:Eg,lights_physical_pars_fragment:Tg,lights_fragment_begin:Ag,lights_fragment_maps:Rg,lights_fragment_end:Cg,lightprobes_pars_fragment:Pg,logdepthbuf_fragment:Ig,logdepthbuf_pars_fragment:Lg,logdepthbuf_pars_vertex:Ng,logdepthbuf_vertex:Dg,map_fragment:kg,map_pars_fragment:Og,map_particle_fragment:Ug,map_particle_pars_fragment:Fg,metalnessmap_fragment:Bg,metalnessmap_pars_fragment:zg,morphinstance_vertex:Hg,morphcolor_vertex:Vg,morphnormal_vertex:Gg,morphtarget_pars_vertex:Wg,morphtarget_vertex:$g,normal_fragment_begin:Xg,normal_fragment_maps:qg,normal_pars_fragment:Yg,normal_pars_vertex:Kg,normal_vertex:Zg,normalmap_pars_fragment:Jg,clearcoat_normal_fragment_begin:jg,clearcoat_normal_fragment_maps:Qg,clearcoat_pars_fragment:tx,iridescence_pars_fragment:ex,opaque_fragment:ix,packing:nx,premultiplied_alpha_fragment:sx,project_vertex:rx,dithering_fragment:ax,dithering_pars_fragment:ox,roughnessmap_fragment:lx,roughnessmap_pars_fragment:cx,shadowmap_pars_fragment:hx,shadowmap_pars_vertex:ux,shadowmap_vertex:dx,shadowmask_pars_fragment:fx,skinbase_vertex:px,skinning_pars_vertex:mx,skinning_vertex:gx,skinnormal_vertex:xx,specularmap_fragment:vx,specularmap_pars_fragment:yx,tonemapping_fragment:bx,tonemapping_pars_fragment:_x,transmission_fragment:Mx,transmission_pars_fragment:Sx,uv_pars_fragment:wx,uv_pars_vertex:Ex,uv_vertex:Tx,worldpos_vertex:Ax,background_vert:Rx,background_frag:Cx,backgroundCube_vert:Px,backgroundCube_frag:Ix,cube_vert:Lx,cube_frag:Nx,depth_vert:Dx,depth_frag:kx,distance_vert:Ox,distance_frag:Ux,equirect_vert:Fx,equirect_frag:Bx,linedashed_vert:zx,linedashed_frag:Hx,meshbasic_vert:Vx,meshbasic_frag:Gx,meshlambert_vert:Wx,meshlambert_frag:$x,meshmatcap_vert:Xx,meshmatcap_frag:qx,meshnormal_vert:Yx,meshnormal_frag:Kx,meshphong_vert:Zx,meshphong_frag:Jx,meshphysical_vert:jx,meshphysical_frag:Qx,meshtoon_vert:tv,meshtoon_frag:ev,points_vert:iv,points_frag:nv,shadow_vert:sv,shadow_frag:rv,sprite_vert:av,sprite_frag:ov},ct={common:{diffuse:{value:new qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new Xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new N},probesMax:{value:new N},probesResolution:{value:new N}},points:{diffuse:{value:new qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new qt(16777215)},opacity:{value:1},center:{value:new Xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},bn={basic:{uniforms:oi([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.fog]),vertexShader:Kt.meshbasic_vert,fragmentShader:Kt.meshbasic_frag},lambert:{uniforms:oi([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new qt(0)},envMapIntensity:{value:1}}]),vertexShader:Kt.meshlambert_vert,fragmentShader:Kt.meshlambert_frag},phong:{uniforms:oi([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new qt(0)},specular:{value:new qt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Kt.meshphong_vert,fragmentShader:Kt.meshphong_frag},standard:{uniforms:oi([ct.common,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.roughnessmap,ct.metalnessmap,ct.fog,ct.lights,{emissive:{value:new qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag},toon:{uniforms:oi([ct.common,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.gradientmap,ct.fog,ct.lights,{emissive:{value:new qt(0)}}]),vertexShader:Kt.meshtoon_vert,fragmentShader:Kt.meshtoon_frag},matcap:{uniforms:oi([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,{matcap:{value:null}}]),vertexShader:Kt.meshmatcap_vert,fragmentShader:Kt.meshmatcap_frag},points:{uniforms:oi([ct.points,ct.fog]),vertexShader:Kt.points_vert,fragmentShader:Kt.points_frag},dashed:{uniforms:oi([ct.common,ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Kt.linedashed_vert,fragmentShader:Kt.linedashed_frag},depth:{uniforms:oi([ct.common,ct.displacementmap]),vertexShader:Kt.depth_vert,fragmentShader:Kt.depth_frag},normal:{uniforms:oi([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,{opacity:{value:1}}]),vertexShader:Kt.meshnormal_vert,fragmentShader:Kt.meshnormal_frag},sprite:{uniforms:oi([ct.sprite,ct.fog]),vertexShader:Kt.sprite_vert,fragmentShader:Kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Kt.background_vert,fragmentShader:Kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht}},vertexShader:Kt.backgroundCube_vert,fragmentShader:Kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Kt.cube_vert,fragmentShader:Kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Kt.equirect_vert,fragmentShader:Kt.equirect_frag},distance:{uniforms:oi([ct.common,ct.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Kt.distance_vert,fragmentShader:Kt.distance_frag},shadow:{uniforms:oi([ct.lights,ct.fog,{color:{value:new qt(0)},opacity:{value:1}}]),vertexShader:Kt.shadow_vert,fragmentShader:Kt.shadow_frag}};bn.physical={uniforms:oi([bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new Xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new Xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new qt(0)},specularColor:{value:new qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new Xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag};var Il={r:0,b:0,g:0},lv=new Gt,Kf=new Ht;Kf.set(-1,0,0,0,1,0,0,0,1);function cv(s,t,e,i,n,r){let a=new qt(0),o=n===!0?0:1,c,l,h=null,d=0,u=null;function f(v){let S=v.isScene===!0?v.background:null;if(S&&S.isTexture){let y=v.backgroundBlurriness>0;S=t.get(S,y)}return S}function g(v){let S=!1,y=f(v);y===null?m(a,o):y&&y.isColor&&(m(y,1),S=!0);let E=s.xr.getEnvironmentBlendMode();E==="additive"?e.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||S)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function x(v,S){let y=f(S);y&&(y.isCubeTexture||y.mapping===ha)?(l===void 0&&(l=new ce(new Kn(1,1,1),new Oe({name:"BackgroundCubeMaterial",uniforms:Rs(bn.backgroundCube.uniforms),vertexShader:bn.backgroundCube.vertexShader,fragmentShader:bn.backgroundCube.fragmentShader,side:Je,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(E,M,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(lv.makeRotationFromEuler(S.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Kf),l.material.toneMapped=jt.getTransfer(y.colorSpace)!==de,(h!==y||d!==y.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=y,d=y.version,u=s.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new ce(new Oi(2,2),new Oe({name:"BackgroundMaterial",uniforms:Rs(bn.background.uniforms),vertexShader:bn.background.vertexShader,fragmentShader:bn.background.fragmentShader,side:xn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=jt.getTransfer(y.colorSpace)!==de,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=y,d=y.version,u=s.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function m(v,S){v.getRGB(Il,Wh(s)),e.buffers.color.setClear(Il.r,Il.g,Il.b,S,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,S=1){a.set(v),o=S,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,m(a,o)},render:g,addToRenderList:x,dispose:p}}function hv(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),i={},n=u(null),r=n,a=!1;function o(P,D,H,L,V){let K=!1,Z=d(P,L,H,D);r!==Z&&(r=Z,l(r.object)),K=f(P,L,H,V),K&&g(P,L,H,V),V!==null&&t.update(V,s.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,y(P,D,H,L),V!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function c(){return s.createVertexArray()}function l(P){return s.bindVertexArray(P)}function h(P){return s.deleteVertexArray(P)}function d(P,D,H,L){let V=L.wireframe===!0,K=i[D.id];K===void 0&&(K={},i[D.id]=K);let Z=P.isInstancedMesh===!0?P.id:0,j=K[Z];j===void 0&&(j={},K[Z]=j);let X=j[H.id];X===void 0&&(X={},j[H.id]=X);let et=X[V];return et===void 0&&(et=u(c()),X[V]=et),et}function u(P){let D=[],H=[],L=[];for(let V=0;V<e;V++)D[V]=0,H[V]=0,L[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:H,attributeDivisors:L,object:P,attributes:{},index:null}}function f(P,D,H,L){let V=r.attributes,K=D.attributes,Z=0,j=H.getAttributes();for(let X in j)if(j[X].location>=0){let nt=V[X],Lt=K[X];if(Lt===void 0&&(X==="instanceMatrix"&&P.instanceMatrix&&(Lt=P.instanceMatrix),X==="instanceColor"&&P.instanceColor&&(Lt=P.instanceColor)),nt===void 0||nt.attribute!==Lt||Lt&&nt.data!==Lt.data)return!0;Z++}return r.attributesNum!==Z||r.index!==L}function g(P,D,H,L){let V={},K=D.attributes,Z=0,j=H.getAttributes();for(let X in j)if(j[X].location>=0){let nt=K[X];nt===void 0&&(X==="instanceMatrix"&&P.instanceMatrix&&(nt=P.instanceMatrix),X==="instanceColor"&&P.instanceColor&&(nt=P.instanceColor));let Lt={};Lt.attribute=nt,nt&&nt.data&&(Lt.data=nt.data),V[X]=Lt,Z++}r.attributes=V,r.attributesNum=Z,r.index=L}function x(){let P=r.newAttributes;for(let D=0,H=P.length;D<H;D++)P[D]=0}function m(P){p(P,0)}function p(P,D){let H=r.newAttributes,L=r.enabledAttributes,V=r.attributeDivisors;H[P]=1,L[P]===0&&(s.enableVertexAttribArray(P),L[P]=1),V[P]!==D&&(s.vertexAttribDivisor(P,D),V[P]=D)}function v(){let P=r.newAttributes,D=r.enabledAttributes;for(let H=0,L=D.length;H<L;H++)D[H]!==P[H]&&(s.disableVertexAttribArray(H),D[H]=0)}function S(P,D,H,L,V,K,Z){Z===!0?s.vertexAttribIPointer(P,D,H,V,K):s.vertexAttribPointer(P,D,H,L,V,K)}function y(P,D,H,L){x();let V=L.attributes,K=H.getAttributes(),Z=D.defaultAttributeValues;for(let j in K){let X=K[j];if(X.location>=0){let et=V[j];if(et===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(et=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(et=P.instanceColor)),et!==void 0){let nt=et.normalized,Lt=et.itemSize,At=t.get(et);if(At===void 0)continue;let oe=At.buffer,ie=At.type,rt=At.bytesPerElement,I=ie===s.INT||ie===s.UNSIGNED_INT||et.gpuType===Xo;if(et.isInterleavedBufferAttribute){let Y=et.data,at=Y.stride,yt=et.offset;if(Y.isInstancedInterleavedBuffer){for(let ot=0;ot<X.locationSize;ot++)p(X.location+ot,Y.meshPerAttribute);P.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let ot=0;ot<X.locationSize;ot++)m(X.location+ot);s.bindBuffer(s.ARRAY_BUFFER,oe);for(let ot=0;ot<X.locationSize;ot++)S(X.location+ot,Lt/X.locationSize,ie,nt,at*rt,(yt+Lt/X.locationSize*ot)*rt,I)}else{if(et.isInstancedBufferAttribute){for(let Y=0;Y<X.locationSize;Y++)p(X.location+Y,et.meshPerAttribute);P.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let Y=0;Y<X.locationSize;Y++)m(X.location+Y);s.bindBuffer(s.ARRAY_BUFFER,oe);for(let Y=0;Y<X.locationSize;Y++)S(X.location+Y,Lt/X.locationSize,ie,nt,Lt*rt,Lt/X.locationSize*Y*rt,I)}}else if(Z!==void 0){let nt=Z[j];if(nt!==void 0)switch(nt.length){case 2:s.vertexAttrib2fv(X.location,nt);break;case 3:s.vertexAttrib3fv(X.location,nt);break;case 4:s.vertexAttrib4fv(X.location,nt);break;default:s.vertexAttrib1fv(X.location,nt)}}}}v()}function E(){T();for(let P in i){let D=i[P];for(let H in D){let L=D[H];for(let V in L){let K=L[V];for(let Z in K)h(K[Z].object),delete K[Z];delete L[V]}}delete i[P]}}function M(P){if(i[P.id]===void 0)return;let D=i[P.id];for(let H in D){let L=D[H];for(let V in L){let K=L[V];for(let Z in K)h(K[Z].object),delete K[Z];delete L[V]}}delete i[P.id]}function A(P){for(let D in i){let H=i[D];for(let L in H){let V=H[L];if(V[P.id]===void 0)continue;let K=V[P.id];for(let Z in K)h(K[Z].object),delete K[Z];delete V[P.id]}}}function b(P){for(let D in i){let H=i[D],L=P.isInstancedMesh===!0?P.id:0,V=H[L];if(V!==void 0){for(let K in V){let Z=V[K];for(let j in Z)h(Z[j].object),delete Z[j];delete V[K]}delete H[L],Object.keys(H).length===0&&delete i[D]}}}function T(){R(),a=!0,r!==n&&(r=n,l(r.object))}function R(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:T,resetDefaultState:R,dispose:E,releaseStatesOfGeometry:M,releaseStatesOfObject:b,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:m,disableUnusedAttributes:v}}function uv(s,t,e){let i;function n(c){i=c}function r(c,l){s.drawArrays(i,c,l),e.update(l,i,1)}function a(c,l,h){h!==0&&(s.drawArraysInstanced(i,c,l,h),e.update(l,i,h))}function o(c,l,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,h);let u=0;for(let f=0;f<h;f++)u+=l[f];e.update(u,i,1)}this.setMode=n,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function dv(s,t,e,i){let n;function r(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(A){return!(A!==mi&&i.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){let b=A===tn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==wi&&A!==pi&&!b&&i.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function c(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(Ut("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Ut("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),v=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),S=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),E=s.getParameter(s.MAX_SAMPLES),M=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:v,maxVaryings:S,maxFragmentUniforms:y,maxSamples:E,samples:M}}function fv(s){let t=this,e=null,i=0,n=!1,r=!1,a=new Zi,o=new Ht,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||i!==0||n;return n=u,i=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,p=s.get(d);if(!n||g===null||g.length===0||r&&!m)r?h(null):l();else{let v=r?0:i,S=v*4,y=p.clippingState||null;c.value=y,y=h(g,u,S,f);for(let E=0;E!==S;++E)y[E]=e[E];p.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(d,u,f,g){let x=d!==null?d.length:0,m=null;if(x!==0){if(m=c.value,g!==!0||m===null){let p=f+x*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,y=f;S!==x;++S,y+=4)a.copy(d[S]).applyMatrix4(v,o),a.normal.toArray(m,y),m[y+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}var _r=4,pv=6,mv=20,gv=256,ba=new mr,Af=new qt,Qh=null,tu=0,eu=0,iu=!1,xv=new N,Cs=new N,Nl=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,n=100,r={}){let{size:a=256,position:o=xv}=r;Qh=this._renderer.getRenderTarget(),tu=this._renderer.getActiveCubeFace(),eu=this._renderer.getActiveMipmapLevel(),iu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,n,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Qh,tu,eu),this._renderer.xr.enabled=iu,t.scissorTest=!1,br(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Qn||t.mapping===As?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Qh=this._renderer.getRenderTarget(),tu=this._renderer.getActiveCubeFace(),eu=this._renderer.getActiveMipmapLevel(),iu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Ze,minFilter:Ze,generateMipmaps:!1,type:tn,format:mi,colorSpace:xs,depthBuffer:!1},n=Rf(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rf(t,e,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=vv(r)),this._blurMaterial=bv(r,t,e),this._ggxMaterial=yv(r,t,e)}return n}_compileMaterial(t){let e=new ce(new We,t);this._renderer.compile(e,ba)}_sceneToCubeUV(t,e,i,n,r){let c=new ri(90,1,e,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Af),d.toneMapping=ji,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(n),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ce(new Kn,new bs({name:"PMREM.Background",side:Je,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,m=x.material,p=!1,v=t.background;v?v.isColor&&(m.color.copy(v),t.background=null,p=!0):(m.color.copy(Af),p=!0);for(let S=0;S<6;S++){let y=S%3;y===0?(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[S],r.y,r.z)):y===1?(c.up.set(0,0,l[S]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[S],r.z)):(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[S]));let E=this._cubeSize;br(n,y*E,S>2?E:0,E,E),d.setRenderTarget(n),p&&d.render(x,c),d.render(t,c)}d.toneMapping=f,d.autoClear=u,t.background=v}_textureToCubeUV(t,e){let i=this._renderer,n=t.mapping===Qn||t.mapping===As;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cf());let r=n?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let c=this._cubeSize;br(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(a,ba)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let n=this._lodMeshes.length;for(let r=1;r<n;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){let n=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let c=a.uniforms,l=i/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(l*l-h*h),u=l*1.25,f=d*u,{_lodMax:g}=this,x=this._sizeLods[i],m=3*x*(i>g-_r?i-g+_r:0),p=4*(this._cubeSize-x);c.envMap.value=t.texture,c.roughness.value=f,c.mipInt.value=g-e,br(r,m,p,3*x,2*x),n.setRenderTarget(r),n.render(o,ba),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-i,br(t,m,p,3*x,2*x),n.setRenderTarget(t),n.render(o,ba)}_blur(t,e,i,n){let r=this._pingPongRenderTarget,a=Math.min(n,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,i,a),this._blurPass(r,t,i,i,a)}_blurPass(t,e,i,n,r){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[n];c.material=o;let l=o.uniforms;l.envMap.value=t.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-i;let h=this._sizeLods[n],d=3*h*(n>this._lodMax-_r?n-this._lodMax+_r:0),u=4*(this._cubeSize-h);br(e,d,u,3*h,2*h),a.setRenderTarget(e),a.render(c,ba)}};function vv(s){let t=[],e=[],i=s,n=s-_r+1+pv;for(let r=0;r<n;r++){let a=Math.pow(2,i);t.push(a);let o=1/(a-2),c=-o,l=1+o,h=[c,c,l,c,l,l,c,c,l,l,c,l],d=6,u=6,f=3,g=new Float32Array(f*u*d),x=new Float32Array(f*u*d);for(let p=0;p<d;p++){let v=p%3*2/3-1,S=p>2?0:-1,y=[v,S,0,v+2/3,S,0,v+2/3,S+1,0,v,S,0,v+2/3,S+1,0,v,S+1,0];g.set(y,f*u*p);for(let E=0;E<u;E++){let M=h[E*2]*2-1,A=h[E*2+1]*2-1;p===0?Cs.set(1,A,M):p===1?Cs.set(-M,1,-A):p===2?Cs.set(-M,A,1):p===3?Cs.set(-1,A,-M):p===4?Cs.set(-M,-1,A):Cs.set(M,A,-1),Cs.toArray(x,(p*u+E)*f)}}let m=new We;m.setAttribute("position",new Ri(g,f)),m.setAttribute("outputDirection",new Ri(x,f)),e.push(new ce(m,null)),i>_r&&i--}return{lodMeshes:e,sizeLods:t}}function Rf(s,t,e){let i=new ai(s,t,e);return i.texture.mapping=ha,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function br(s,t,e,i,n){s.viewport.set(t,e,i,n),s.scissor.set(t,e,i,n)}function yv(s,t,e){return new Oe({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:gv,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ol(),fragmentShader:`

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
		`,blending:vn,depthTest:!1,depthWrite:!1})}function bv(s,t,e){return new Oe({name:"SphericalGaussianBlur",defines:{SAMPLES:mv,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ol(),fragmentShader:`

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
		`,blending:vn,depthTest:!1,depthWrite:!1})}function Cf(){return new Oe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ol(),fragmentShader:`

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
		`,blending:vn,depthTest:!1,depthWrite:!1})}function Pf(){return new Oe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ol(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:vn,depthTest:!1,depthWrite:!1})}function Ol(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Dl=class extends ai{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},n=[i,i,i,i,i,i];this.texture=new Qr(n),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},n=new Kn(5,5,5),r=new Oe({name:"CubemapFromEquirect",uniforms:Rs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Je,blending:vn});r.uniforms.tEquirect.value=e;let a=new ce(n,r),o=e.minFilter;return e.minFilter===ts&&(e.minFilter=Ze),new zo(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,n=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,n);t.setRenderTarget(r)}};function _v(s){let t=new WeakMap,e=new WeakMap,i=null;function n(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===Go||f===Wo)if(t.has(u)){let g=t.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let x=new Dl(g.height);return x.fromEquirectangularTexture(s,u),t.set(u,x),u.addEventListener("dispose",l),o(x.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let f=u.mapping,g=f===Go||f===Wo,x=f===Qn||f===As;if(g||x){let m=e.get(u),p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return i===null&&(i=new Nl(s)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{let v=u.image;return g&&v&&v.height>0||x&&v&&c(v)?(i===null&&(i=new Nl(s)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,f){return f===Go?u.mapping=Qn:f===Wo&&(u.mapping=As),u}function c(u){let f=0,g=6;for(let x=0;x<g;x++)u[x]!==void 0&&f++;return f===g}function l(u){let f=u.target;f.removeEventListener("dispose",l);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function d(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:n,dispose:d}}function Mv(s){let t={};function e(i){if(t[i]!==void 0)return t[i];let n=s.getExtension(i);return t[i]=n,n}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let n=e(i);return n===null&&gs("WebGLRenderer: "+i+" extension not supported."),n}}}function Sv(s,t,e,i){let n={},r=new WeakMap;function a(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete n[u.id];let f=r.get(u);f&&(t.remove(f),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return n[u.id]===!0||(u.addEventListener("dispose",a),n[u.id]=!0,e.memory.geometries++),u}function c(d){let u=d.attributes;for(let f in u)t.update(u[f],s.ARRAY_BUFFER)}function l(d){let u=[],f=d.index,g=d.attributes.position,x=0;if(g===void 0)return;if(f!==null){let v=f.array;x=f.version;for(let S=0,y=v.length;S<y;S+=3){let E=v[S+0],M=v[S+1],A=v[S+2];u.push(E,M,M,A,A,E)}}else{let v=g.array;x=g.version;for(let S=0,y=v.length/3-1;S<y;S+=3){let E=S+0,M=S+1,A=S+2;u.push(E,M,M,A,A,E)}}let m=new(g.count>=65535?jr:Jr)(u,1);m.version=x;let p=r.get(d);p&&t.remove(p),r.set(d,m)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function wv(s,t,e){let i;function n(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,u){s.drawElements(i,u,r,d*a),e.update(u,i,1)}function l(d,u,f){f!==0&&(s.drawElementsInstanced(i,u,r,d*a,f),e.update(u,i,f))}function h(d,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,d,0,f);let x=0;for(let m=0;m<f;m++)x+=u[m];e.update(x,i,1)}this.setMode=n,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function Ev(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:Bt("WebGLInfo: Unknown draw mode:",a);break}}function n(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:n,update:i}}function Tv(s,t,e){let i=new WeakMap,n=new be;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=i.get(o);if(u===void 0||u.count!==d){let T=function(){A.dispose(),i.delete(o),o.removeEventListener("dispose",T)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],S=0;f===!0&&(S=1),g===!0&&(S=2),x===!0&&(S=3);let y=o.attributes.position.count*S,E=1;y>t.maxTextureSize&&(E=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let M=new Float32Array(y*E*4*d),A=new Yr(M,y,E,d);A.type=pi,A.needsUpdate=!0;let b=S*4;for(let R=0;R<d;R++){let P=m[R],D=p[R],H=v[R],L=y*E*4*R;for(let V=0;V<P.count;V++){let K=V*b;f===!0&&(n.fromBufferAttribute(P,V),M[L+K+0]=n.x,M[L+K+1]=n.y,M[L+K+2]=n.z,M[L+K+3]=0),g===!0&&(n.fromBufferAttribute(D,V),M[L+K+4]=n.x,M[L+K+5]=n.y,M[L+K+6]=n.z,M[L+K+7]=0),x===!0&&(n.fromBufferAttribute(H,V),M[L+K+8]=n.x,M[L+K+9]=n.y,M[L+K+10]=n.z,M[L+K+11]=H.itemSize===4?n.w:1)}}u={count:d,texture:A,size:new Xt(y,E)},i.set(o,u),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let f=0;for(let x=0;x<l.length;x++)f+=l[x];let g=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(s,"morphTargetBaseInfluence",g),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function Av(s,t,e,i,n){let r=new WeakMap;function a(l){let h=n.render.frame,d=l.geometry,u=t.get(l,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let f=l.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),i.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var Rv={[Th]:"LINEAR_TONE_MAPPING",[Ah]:"REINHARD_TONE_MAPPING",[Rh]:"CINEON_TONE_MAPPING",[Ch]:"ACES_FILMIC_TONE_MAPPING",[Ih]:"AGX_TONE_MAPPING",[Lh]:"NEUTRAL_TONE_MAPPING",[Ph]:"CUSTOM_TONE_MAPPING"};function Cv(s,t,e,i,n,r){let a=new ai(t,e,{type:s,depthBuffer:n,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new We;l.setAttribute("position",new Zt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Zt([0,2,0,0,2,0],2));let h=new Eo({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new ce(l,h),u=new mr(-1,1,1,-1,0,1),f=null,g=null,x=!1,m,p=null,v=[],S=!1;this.setSize=function(y,E){a.setSize(y,E),o!==null&&o.setSize(y,E),c!==null&&c.setSize(y,E);for(let M=0;M<v.length;M++){let A=v[M];A.setSize&&A.setSize(y,E)}},this.setEffects=function(y){v=y,S=v.length>0&&v[0].isRenderPass===!0;let E=a.width,M=a.height;v.length>0&&o===null&&(o=new ai(E,M,{type:tn,depthBuffer:!1,stencilBuffer:!1}),c=new ai(E,M,{type:tn,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<v.length;A++){let b=v[A];b.setSize&&b.setSize(E,M)}},this.begin=function(y,E){if(x||y.toneMapping===ji&&v.length===0)return!1;if(p=E,E!==null){let M=E.width,A=E.height;(a.width!==M||a.height!==A)&&this.setSize(M,A)}return S===!1&&y.setRenderTarget(a),m=y.toneMapping,y.toneMapping=ji,!0},this.hasRenderPass=function(){return S},this.end=function(y,E){y.toneMapping=m,x=!0;let M=a,A=o;for(let b=0;b<v.length;b++){let T=v[b];T.enabled!==!1&&(T.render(y,A,M,E),T.needsSwap!==!1&&(M=A,A=A===o?c:o))}if(f!==y.outputColorSpace||g!==y.toneMapping){f=y.outputColorSpace,g=y.toneMapping,h.defines={},jt.getTransfer(f)===de&&(h.defines.SRGB_TRANSFER="");let b=Rv[g];b&&(h.defines[b]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=M.texture,y.setRenderTarget(p),y.render(d,u),p=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}var Zf=new di,ru=new Yn(1,1),Jf=new Yr,jf=new Mo,Qf=new Qr,If=[],Lf=[],Nf=new Float32Array(16),Df=new Float32Array(9),kf=new Float32Array(4);function Sr(s,t,e){let i=s[0];if(i<=0||i>0)return s;let n=t*e,r=If[n];if(r===void 0&&(r=new Float32Array(n),If[n]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function $e(s,t){if(s.length!==t.length)return!1;for(let e=0,i=s.length;e<i;e++)if(s[e]!==t[e])return!1;return!0}function Xe(s,t){for(let e=0,i=t.length;e<i;e++)s[e]=t[e]}function Ul(s,t){let e=Lf[t];e===void 0&&(e=new Int32Array(t),Lf[t]=e);for(let i=0;i!==t;++i)e[i]=s.allocateTextureUnit();return e}function Pv(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Iv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if($e(e,t))return;s.uniform2fv(this.addr,t),Xe(e,t)}}function Lv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if($e(e,t))return;s.uniform3fv(this.addr,t),Xe(e,t)}}function Nv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if($e(e,t))return;s.uniform4fv(this.addr,t),Xe(e,t)}}function Dv(s,t){let e=this.cache,i=t.elements;if(i===void 0){if($e(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Xe(e,t)}else{if($e(e,i))return;kf.set(i),s.uniformMatrix2fv(this.addr,!1,kf),Xe(e,i)}}function kv(s,t){let e=this.cache,i=t.elements;if(i===void 0){if($e(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Xe(e,t)}else{if($e(e,i))return;Df.set(i),s.uniformMatrix3fv(this.addr,!1,Df),Xe(e,i)}}function Ov(s,t){let e=this.cache,i=t.elements;if(i===void 0){if($e(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Xe(e,t)}else{if($e(e,i))return;Nf.set(i),s.uniformMatrix4fv(this.addr,!1,Nf),Xe(e,i)}}function Uv(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Fv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if($e(e,t))return;s.uniform2iv(this.addr,t),Xe(e,t)}}function Bv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if($e(e,t))return;s.uniform3iv(this.addr,t),Xe(e,t)}}function zv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if($e(e,t))return;s.uniform4iv(this.addr,t),Xe(e,t)}}function Hv(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Vv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if($e(e,t))return;s.uniform2uiv(this.addr,t),Xe(e,t)}}function Gv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if($e(e,t))return;s.uniform3uiv(this.addr,t),Xe(e,t)}}function Wv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if($e(e,t))return;s.uniform4uiv(this.addr,t),Xe(e,t)}}function $v(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);let r;this.type===s.SAMPLER_2D_SHADOW?(ru.compareFunction=e.isReversedDepthBuffer()?Pl:Cl,r=ru):r=Zf,e.setTexture2D(t||r,n)}function Xv(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture3D(t||jf,n)}function qv(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTextureCube(t||Qf,n)}function Yv(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture2DArray(t||Jf,n)}function Kv(s){switch(s){case 5126:return Pv;case 35664:return Iv;case 35665:return Lv;case 35666:return Nv;case 35674:return Dv;case 35675:return kv;case 35676:return Ov;case 5124:case 35670:return Uv;case 35667:case 35671:return Fv;case 35668:case 35672:return Bv;case 35669:case 35673:return zv;case 5125:return Hv;case 36294:return Vv;case 36295:return Gv;case 36296:return Wv;case 35678:case 36198:case 36298:case 36306:case 35682:return $v;case 35679:case 36299:case 36307:return Xv;case 35680:case 36300:case 36308:case 36293:return qv;case 36289:case 36303:case 36311:case 36292:return Yv}}function Zv(s,t){s.uniform1fv(this.addr,t)}function Jv(s,t){let e=Sr(t,this.size,2);s.uniform2fv(this.addr,e)}function jv(s,t){let e=Sr(t,this.size,3);s.uniform3fv(this.addr,e)}function Qv(s,t){let e=Sr(t,this.size,4);s.uniform4fv(this.addr,e)}function ty(s,t){let e=Sr(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function ey(s,t){let e=Sr(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function iy(s,t){let e=Sr(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function ny(s,t){s.uniform1iv(this.addr,t)}function sy(s,t){s.uniform2iv(this.addr,t)}function ry(s,t){s.uniform3iv(this.addr,t)}function ay(s,t){s.uniform4iv(this.addr,t)}function oy(s,t){s.uniform1uiv(this.addr,t)}function ly(s,t){s.uniform2uiv(this.addr,t)}function cy(s,t){s.uniform3uiv(this.addr,t)}function hy(s,t){s.uniform4uiv(this.addr,t)}function uy(s,t,e){let i=this.cache,n=t.length,r=Ul(e,n);$e(i,r)||(s.uniform1iv(this.addr,r),Xe(i,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=ru:a=Zf;for(let o=0;o!==n;++o)e.setTexture2D(t[o]||a,r[o])}function dy(s,t,e){let i=this.cache,n=t.length,r=Ul(e,n);$e(i,r)||(s.uniform1iv(this.addr,r),Xe(i,r));for(let a=0;a!==n;++a)e.setTexture3D(t[a]||jf,r[a])}function fy(s,t,e){let i=this.cache,n=t.length,r=Ul(e,n);$e(i,r)||(s.uniform1iv(this.addr,r),Xe(i,r));for(let a=0;a!==n;++a)e.setTextureCube(t[a]||Qf,r[a])}function py(s,t,e){let i=this.cache,n=t.length,r=Ul(e,n);$e(i,r)||(s.uniform1iv(this.addr,r),Xe(i,r));for(let a=0;a!==n;++a)e.setTexture2DArray(t[a]||Jf,r[a])}function my(s){switch(s){case 5126:return Zv;case 35664:return Jv;case 35665:return jv;case 35666:return Qv;case 35674:return ty;case 35675:return ey;case 35676:return iy;case 5124:case 35670:return ny;case 35667:case 35671:return sy;case 35668:case 35672:return ry;case 35669:case 35673:return ay;case 5125:return oy;case 36294:return ly;case 36295:return cy;case 36296:return hy;case 35678:case 36198:case 36298:case 36306:case 35682:return uy;case 35679:case 36299:case 36307:return dy;case 35680:case 36300:case 36308:case 36293:return fy;case 36289:case 36303:case 36311:case 36292:return py}}var au=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Kv(e.type)}},ou=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=my(e.type)}},lu=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let n=this.seq;for(let r=0,a=n.length;r!==a;++r){let o=n[r];o.setValue(t,e[o.id],i)}}},nu=/(\w+)(\])?(\[|\.)?/g;function Of(s,t){s.seq.push(t),s.map[t.id]=t}function gy(s,t,e){let i=s.name,n=i.length;for(nu.lastIndex=0;;){let r=nu.exec(i),a=nu.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===n){Of(e,l===void 0?new au(o,s,t):new ou(o,s,t));break}else{let d=e.map[o];d===void 0&&(d=new lu(o),Of(e,d)),e=d}}}var Mr=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);gy(o,c,this)}let n=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?n.push(a):r.push(a);n.length>0&&(this.seq=n.concat(r))}setValue(t,e,i,n){let r=this.map[e];r!==void 0&&r.setValue(t,i,n)}setOptional(t,e,i){let n=e[i];n!==void 0&&this.setValue(t,i,n)}static upload(t,e,i,n){for(let r=0,a=e.length;r!==a;++r){let o=e[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,n)}}static seqWithValue(t,e){let i=[];for(let n=0,r=t.length;n!==r;++n){let a=t[n];a.id in e&&i.push(a)}return i}};function Uf(s,t,e){let i=s.createShader(t);return s.shaderSource(i,e),s.compileShader(i),i}var xy=37297,vy=0;function yy(s,t){let e=s.split(`
`),i=[],n=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=n;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}var Ff=new Ht;function by(s){jt._getMatrix(Ff,jt.workingColorSpace,s);let t=`mat3( ${Ff.elements.map(e=>e.toFixed(4))} )`;switch(jt.getTransfer(s)){case Xr:return[t,"LinearTransferOETF"];case de:return[t,"sRGBTransferOETF"];default:return Ut("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Bf(s,t,e){let i=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+yy(s.getShaderSource(t),o)}else return r}function _y(s,t){let e=by(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var My={[Th]:"Linear",[Ah]:"Reinhard",[Rh]:"Cineon",[Ch]:"ACESFilmic",[Ih]:"AgX",[Lh]:"Neutral",[Ph]:"Custom"};function Sy(s,t){let e=My[t];return e===void 0?(Ut("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Ll=new N;function wy(){jt.getLuminanceCoefficients(Ll);let s=Ll.x.toFixed(4),t=Ll.y.toFixed(4),e=Ll.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ey(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ma).join(`
`)}function Ty(s){let t=[];for(let e in s){let i=s[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Ay(s,t){let e={},i=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){let r=s.getActiveAttrib(t,n),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function Ma(s){return s!==""}function zf(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Hf(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Ry=/^[ \t]*#include +<([\w\d./]+)>/gm;function cu(s){return s.replace(Ry,Py)}var Cy=new Map;function Py(s,t){let e=Kt[t];if(e===void 0){let i=Cy.get(t);if(i!==void 0)e=Kt[i],Ut('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return cu(e)}var Iy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vf(s){return s.replace(Iy,Ly)}function Ly(s,t,e,i){let n="";for(let r=parseInt(t);r<parseInt(e);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function Gf(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}var Ny={[ca]:"SHADOWMAP_TYPE_PCF",[gr]:"SHADOWMAP_TYPE_VSM"};function Dy(s){return Ny[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var ky={[Qn]:"ENVMAP_TYPE_CUBE",[As]:"ENVMAP_TYPE_CUBE",[ha]:"ENVMAP_TYPE_CUBE_UV"};function Oy(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":ky[s.envMapMode]||"ENVMAP_TYPE_CUBE"}var Uy={[As]:"ENVMAP_MODE_REFRACTION"};function Fy(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":Uy[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var By={[Eh]:"ENVMAP_BLENDING_MULTIPLY",[of]:"ENVMAP_BLENDING_MIX",[lf]:"ENVMAP_BLENDING_ADD"};function zy(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":By[s.combine]||"ENVMAP_BLENDING_NONE"}function Hy(s){let t=s.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Vy(s,t,e,i){let n=s.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,c=Dy(e),l=Oy(e),h=Fy(e),d=zy(e),u=Hy(e),f=Ey(e),g=Ty(r),x=n.createProgram(),m,p,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ma).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ma).join(`
`),p.length>0&&(p+=`
`)):(m=[Gf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ma).join(`
`),p=[Gf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ji?"#define TONE_MAPPING":"",e.toneMapping!==ji?Kt.tonemapping_pars_fragment:"",e.toneMapping!==ji?Sy("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Kt.colorspace_pars_fragment,_y("linearToOutputTexel",e.outputColorSpace),wy(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ma).join(`
`)),a=cu(a),a=zf(a,e),a=Hf(a,e),o=cu(o),o=zf(o,e),o=Hf(o,e),a=Vf(a),o=Vf(o),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Vh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Vh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let S=v+m+a,y=v+p+o,E=Uf(n,n.VERTEX_SHADER,S),M=Uf(n,n.FRAGMENT_SHADER,y);n.attachShader(x,E),n.attachShader(x,M),e.index0AttributeName!==void 0?n.bindAttribLocation(x,0,e.index0AttributeName):e.hasPositionAttribute===!0&&n.bindAttribLocation(x,0,"position"),n.linkProgram(x);function A(P){if(s.debug.checkShaderErrors){let D=n.getProgramInfoLog(x)||"",H=n.getShaderInfoLog(E)||"",L=n.getShaderInfoLog(M)||"",V=D.trim(),K=H.trim(),Z=L.trim(),j=!0,X=!0;if(n.getProgramParameter(x,n.LINK_STATUS)===!1)if(j=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,x,E,M);else{let et=Bf(n,E,"vertex"),nt=Bf(n,M,"fragment");Bt("WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(x,n.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+V+`
`+et+`
`+nt)}else V!==""?Ut("WebGLProgram: Program Info Log:",V):(K===""||Z==="")&&(X=!1);X&&(P.diagnostics={runnable:j,programLog:V,vertexShader:{log:K,prefix:m},fragmentShader:{log:Z,prefix:p}})}n.deleteShader(E),n.deleteShader(M),b=new Mr(n,x),T=Ay(n,x)}let b;this.getUniforms=function(){return b===void 0&&A(this),b};let T;this.getAttributes=function(){return T===void 0&&A(this),T};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=n.getProgramParameter(x,xy)),R},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=vy++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=E,this.fragmentShader=M,this}var Gy=0,hu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let n=this._getShaderCacheForMaterial(t);return n.has(e)===!1&&(n.add(e),e.usedTimes++),n.has(i)===!1&&(n.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new uu(t),e.set(t,i)),i}},uu=class{constructor(t){this.id=Gy++,this.code=t,this.usedTimes=0}};function Wy(s){return s===is||s===ga||s===xa}function $y(s,t,e,i,n,r){let a=new Kr,o=new hu,c=new Set,l=[],h=new Map,d=i.logarithmicDepthBuffer,u=i.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(b){return c.add(b),b===0?"uv":`uv${b}`}function x(b,T,R,P,D,H){let L=P.fog,V=D.geometry,K=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?P.environment:null,Z=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,j=t.get(b.envMap||K,Z),X=j&&j.mapping===ha?j.image.height:null,et=f[b.type];b.precision!==null&&(u=i.getMaxPrecision(b.precision),u!==b.precision&&Ut("WebGLProgram.getParameters:",b.precision,"not supported, using",u,"instead."));let nt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Lt=nt!==void 0?nt.length:0,At=0;V.morphAttributes.position!==void 0&&(At=1),V.morphAttributes.normal!==void 0&&(At=2),V.morphAttributes.color!==void 0&&(At=3);let oe,ie,rt,I;if(et){let Me=bn[et];oe=Me.vertexShader,ie=Me.fragmentShader}else{oe=b.vertexShader,ie=b.fragmentShader;let Me=o.getVertexShaderStage(b),he=o.getFragmentShaderStage(b);o.update(b,Me,he),rt=Me.id,I=he.id}let Y=s.getRenderTarget(),at=s.state.buffers.depth.getReversed(),yt=D.isInstancedMesh===!0,ot=D.isBatchedMesh===!0,Ct=!!b.map,ve=!!b.matcap,Wt=!!j,te=!!b.aoMap,pe=!!b.lightMap,ne=!!b.bumpMap&&b.wireframe===!1,Re=!!b.normalMap,qe=!!b.displacementMap,bi=!!b.emissiveMap,Ie=!!b.metalnessMap,ze=!!b.roughnessMap,U=b.anisotropy>0,ei=b.clearcoat>0,me=b.dispersion>0,C=b.retroreflectivity>0,_=b.iridescence>0,z=b.sheen>0,$=b.transmission>0,J=U&&!!b.anisotropyMap,lt=ei&&!!b.clearcoatMap,ht=ei&&!!b.clearcoatNormalMap,Q=ei&&!!b.clearcoatRoughnessMap,it=_&&!!b.iridescenceMap,ut=_&&!!b.iridescenceThicknessMap,Pt=z&&!!b.sheenColorMap,mt=z&&!!b.sheenRoughnessMap,dt=!!b.specularMap,It=!!b.specularColorMap,kt=!!b.specularIntensityMap,$t=$&&!!b.transmissionMap,O=$&&!!b.thicknessMap,ft=!!b.gradientMap,tt=!!b.alphaMap,pt=b.alphaTest>0,vt=!!b.alphaHash,st=!!b.extensions,Nt=ji;b.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(Nt=s.toneMapping);let Tt={shaderID:et,shaderType:b.type,shaderName:b.name,vertexShader:oe,fragmentShader:ie,defines:b.defines,customVertexShaderID:rt,customFragmentShaderID:I,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:u,batching:ot,batchingColor:ot&&D._colorsTexture!==null,instancing:yt,instancingColor:yt&&D.instanceColor!==null,instancingMorph:yt&&D.morphTexture!==null,outputColorSpace:Y===null?s.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:jt.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:Ct,matcap:ve,envMap:Wt,envMapMode:Wt&&j.mapping,envMapCubeUVHeight:X,aoMap:te,lightMap:pe,bumpMap:ne,normalMap:Re,displacementMap:qe,emissiveMap:bi,normalMapObjectSpace:Re&&b.normalMapType===uf,normalMapTangentSpace:Re&&b.normalMapType===zh,packedNormalMap:Re&&b.normalMapType===zh&&Wy(b.normalMap.format),metalnessMap:Ie,roughnessMap:ze,anisotropy:U,anisotropyMap:J,clearcoat:ei,clearcoatMap:lt,clearcoatNormalMap:ht,clearcoatRoughnessMap:Q,dispersion:me,retroreflection:C,iridescence:_,iridescenceMap:it,iridescenceThicknessMap:ut,sheen:z,sheenColorMap:Pt,sheenRoughnessMap:mt,specularMap:dt,specularColorMap:It,specularIntensityMap:kt,transmission:$,transmissionMap:$t,thicknessMap:O,gradientMap:ft,opaque:b.transparent===!1&&b.blending===xr&&b.alphaToCoverage===!1,alphaMap:tt,alphaTest:pt,alphaHash:vt,combine:b.combine,mapUv:Ct&&g(b.map.channel),aoMapUv:te&&g(b.aoMap.channel),lightMapUv:pe&&g(b.lightMap.channel),bumpMapUv:ne&&g(b.bumpMap.channel),normalMapUv:Re&&g(b.normalMap.channel),displacementMapUv:qe&&g(b.displacementMap.channel),emissiveMapUv:bi&&g(b.emissiveMap.channel),metalnessMapUv:Ie&&g(b.metalnessMap.channel),roughnessMapUv:ze&&g(b.roughnessMap.channel),anisotropyMapUv:J&&g(b.anisotropyMap.channel),clearcoatMapUv:lt&&g(b.clearcoatMap.channel),clearcoatNormalMapUv:ht&&g(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&g(b.clearcoatRoughnessMap.channel),iridescenceMapUv:it&&g(b.iridescenceMap.channel),iridescenceThicknessMapUv:ut&&g(b.iridescenceThicknessMap.channel),sheenColorMapUv:Pt&&g(b.sheenColorMap.channel),sheenRoughnessMapUv:mt&&g(b.sheenRoughnessMap.channel),specularMapUv:dt&&g(b.specularMap.channel),specularColorMapUv:It&&g(b.specularColorMap.channel),specularIntensityMapUv:kt&&g(b.specularIntensityMap.channel),transmissionMapUv:$t&&g(b.transmissionMap.channel),thicknessMapUv:O&&g(b.thicknessMap.channel),alphaMapUv:tt&&g(b.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Re||U),vertexNormals:!!V.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!V.attributes.uv&&(Ct||tt),fog:!!L,useFog:b.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||V.attributes.normal===void 0&&Re===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:at,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:V.attributes.position!==void 0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:Lt,morphTextureStride:At,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:H.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&R.length>0,shadowMapType:s.shadowMap.type,toneMapping:Nt,decodeVideoTexture:Ct&&b.map.isVideoTexture===!0&&jt.getTransfer(b.map.colorSpace)===de,decodeVideoTextureEmissive:bi&&b.emissiveMap.isVideoTexture===!0&&jt.getTransfer(b.emissiveMap.colorSpace)===de,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ui,flipSided:b.side===Je,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:st&&b.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(st&&b.extensions.multiDraw===!0||ot)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Tt.vertexUv1s=c.has(1),Tt.vertexUv2s=c.has(2),Tt.vertexUv3s=c.has(3),c.clear(),Tt}function m(b){let T=[];if(b.shaderID?T.push(b.shaderID):(T.push(b.customVertexShaderID),T.push(b.customFragmentShaderID)),b.defines!==void 0)for(let R in b.defines)T.push(R),T.push(b.defines[R]);return b.isRawShaderMaterial===!1&&(p(T,b),v(T,b),T.push(s.outputColorSpace)),T.push(b.customProgramCacheKey),T.join()}function p(b,T){b.push(T.precision),b.push(T.outputColorSpace),b.push(T.envMapMode),b.push(T.envMapCubeUVHeight),b.push(T.mapUv),b.push(T.alphaMapUv),b.push(T.lightMapUv),b.push(T.aoMapUv),b.push(T.bumpMapUv),b.push(T.normalMapUv),b.push(T.displacementMapUv),b.push(T.emissiveMapUv),b.push(T.metalnessMapUv),b.push(T.roughnessMapUv),b.push(T.anisotropyMapUv),b.push(T.clearcoatMapUv),b.push(T.clearcoatNormalMapUv),b.push(T.clearcoatRoughnessMapUv),b.push(T.iridescenceMapUv),b.push(T.iridescenceThicknessMapUv),b.push(T.sheenColorMapUv),b.push(T.sheenRoughnessMapUv),b.push(T.specularMapUv),b.push(T.specularColorMapUv),b.push(T.specularIntensityMapUv),b.push(T.transmissionMapUv),b.push(T.thicknessMapUv),b.push(T.combine),b.push(T.fogExp2),b.push(T.sizeAttenuation),b.push(T.morphTargetsCount),b.push(T.morphAttributeCount),b.push(T.numSunLights),b.push(T.numDirLights),b.push(T.numPointLights),b.push(T.numSpotLights),b.push(T.numSpotLightMaps),b.push(T.numHemiLights),b.push(T.numRectAreaLights),b.push(T.numSunLightShadows),b.push(T.numDirLightShadows),b.push(T.numPointLightShadows),b.push(T.numSpotLightShadows),b.push(T.numSpotLightShadowsWithMaps),b.push(T.numLightProbes),b.push(T.shadowMapType),b.push(T.toneMapping),b.push(T.numClippingPlanes),b.push(T.numClipIntersection),b.push(T.depthPacking)}function v(b,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.retroreflection&&a.enable(24),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),b.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),b.push(a.mask)}function S(b){let T=f[b.type],R;if(T){let P=bn[T];R=ya.clone(P.uniforms)}else R=b.uniforms;return R}function y(b,T){let R=h.get(T);return R!==void 0?++R.usedTimes:(R=new Vy(s,T,b,n),l.push(R),h.set(T,R)),R}function E(b){if(--b.usedTimes===0){let T=l.indexOf(b);l[T]=l[l.length-1],l.pop(),h.delete(b.cacheKey),b.destroy()}}function M(b){o.remove(b)}function A(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:S,acquireProgram:y,releaseProgram:E,releaseShaderCache:M,programs:l,dispose:A}}function Xy(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function i(a){s.delete(a)}function n(a,o,c){s.get(a)[o]=c}function r(){s=new WeakMap}return{has:t,get:e,remove:i,update:n,dispose:r}}function qy(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function Wf(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function $f(){let s=[],t=0,e=[],i=[],n=[];function r(){t=0,e.length=0,i.length=0,n.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,x,m,p){let v=s[t];return v===void 0?(v={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:x,renderOrder:u.renderOrder,z:m,group:p},s[t]=v):(v.id=u.id,v.object=u,v.geometry=f,v.material=g,v.materialVariant=a(u),v.groupOrder=x,v.renderOrder=u.renderOrder,v.z=m,v.group=p),t++,v}function c(u,f,g,x,m,p,v){v.reversedDepth===!0&&(m=-m);let S=o(u,f,g,x,m,p);g.transmission>0?i.push(S):g.transparent===!0?n.push(S):e.push(S)}function l(u,f,g,x,m,p){let v=o(u,f,g,x,m,p);g.transmission>0?i.unshift(v):g.transparent===!0?n.unshift(v):e.unshift(v)}function h(u,f){e.length>1&&e.sort(u||qy),i.length>1&&i.sort(f||Wf),n.length>1&&n.sort(f||Wf)}function d(){for(let u=t,f=s.length;u<f;u++){let g=s[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:i,transparent:n,init:r,push:c,unshift:l,finish:d,sort:h}}function Yy(){let s=new WeakMap;function t(i,n){let r=s.get(i),a;return r===void 0?(a=new $f,s.set(i,[a])):n>=r.length?(a=new $f,r.push(a)):a=r[n],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function Ky(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new N,color:new qt};break;case"SpotLight":e={position:new N,direction:new N,color:new qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new qt,groundColor:new qt};break;case"RectAreaLight":e={color:new qt,position:new N,halfWidth:new N,halfHeight:new N};break}return s[t.id]=e,e}}}function Zy(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var Jy=0;function jy(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Qy(s){let t=new Ky,e=Zy(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new N);let n=new N,r=new Gt,a=new Gt;function o(l){let h=0,d=0,u=0;for(let D=0;D<9;D++)i.probe[D].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,v=0,S=0,y=0,E=0,M=0,A=0,b=0,T=0,R=0;l.sort(jy);for(let D=0,H=l.length;D<H;D++){let L=l[D],V=L.color,K=L.intensity,Z=L.distance,j=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===is?j=L.shadow.map.texture:j=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=V.r*K,d+=V.g*K,u+=V.b*K;else if(L.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(L.sh.coefficients[X],K);R++}else if(L.isSunLight){let X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let et=L.shadow,nt=e.get(L);nt.shadowIntensity=et.intensity,nt.shadowBias=et.bias,nt.shadowNormalBias=et.normalBias,nt.shadowRadius=et.radius,nt.shadowMapSize.copy(et.mapSize).multiply(et.getFrameExtents()),i.sunShadow[g]=nt,i.sunShadowMap[g]=j;let Lt=et.getViewportCount();for(let At=0;At<Lt;At++)i.sunShadowMatrix[x+At]=et.getMatrix(At),i.sunShadowCascade[x+At]=et._cascadeData[At];x+=Lt,g++}i.sun[f]=X,f++}else if(L.isDirectionalLight){let X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let et=L.shadow,nt=e.get(L);nt.shadowIntensity=et.intensity,nt.shadowBias=et.bias,nt.shadowNormalBias=et.normalBias,nt.shadowRadius=et.radius,nt.shadowMapSize=et.mapSize,i.directionalShadow[m]=nt,i.directionalShadowMap[m]=j,i.directionalShadowMatrix[m]=L.shadow.matrix,E++}i.directional[m]=X,m++}else if(L.isSpotLight){let X=t.get(L);X.position.setFromMatrixPosition(L.matrixWorld),X.color.copy(V).multiplyScalar(K),X.distance=Z,X.coneCos=Math.cos(L.angle),X.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),X.decay=L.decay,i.spot[v]=X;let et=L.shadow;if(L.map&&(i.spotLightMap[b]=L.map,b++,et.updateMatrices(L),L.castShadow&&T++),i.spotLightMatrix[v]=et.matrix,L.castShadow){let nt=e.get(L);nt.shadowIntensity=et.intensity,nt.shadowBias=et.bias,nt.shadowNormalBias=et.normalBias,nt.shadowRadius=et.radius,nt.shadowMapSize=et.mapSize,i.spotShadow[v]=nt,i.spotShadowMap[v]=j,A++}v++}else if(L.isRectAreaLight){let X=t.get(L);X.color.copy(V).multiplyScalar(K),X.halfWidth.set(L.width*.5,0,0),X.halfHeight.set(0,L.height*.5,0),i.rectArea[S]=X,S++}else if(L.isPointLight){let X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),X.distance=L.distance,X.decay=L.decay,L.castShadow){let et=L.shadow,nt=e.get(L);nt.shadowIntensity=et.intensity,nt.shadowBias=et.bias,nt.shadowNormalBias=et.normalBias,nt.shadowRadius=et.radius,nt.shadowMapSize=et.mapSize,nt.shadowCameraNear=et.camera.near,nt.shadowCameraFar=et.camera.far,i.pointShadow[p]=nt,i.pointShadowMap[p]=j,i.pointShadowMatrix[p]=L.shadow.matrix,M++}i.point[p]=X,p++}else if(L.isHemisphereLight){let X=t.get(L);X.skyColor.copy(L.color).multiplyScalar(K),X.groundColor.copy(L.groundColor).multiplyScalar(K),i.hemi[y]=X,y++}}S>0&&(s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ct.LTC_FLOAT_1,i.rectAreaLTC2=ct.LTC_FLOAT_2):(i.rectAreaLTC1=ct.LTC_HALF_1,i.rectAreaLTC2=ct.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;let P=i.hash;(P.sunLength!==f||P.directionalLength!==m||P.pointLength!==p||P.spotLength!==v||P.rectAreaLength!==S||P.hemiLength!==y||P.numSunShadows!==g||P.numDirectionalShadows!==E||P.numPointShadows!==M||P.numSpotShadows!==A||P.numSpotMaps!==b||P.numLightProbes!==R)&&(i.sun.length=f,i.directional.length=m,i.spot.length=v,i.rectArea.length=S,i.point.length=p,i.hemi.length=y,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=x,i.sunShadowCascade.length=x,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.directionalShadowMatrix.length=E,i.pointShadow.length=M,i.pointShadowMap.length=M,i.pointShadowMatrix.length=M,i.spotShadow.length=A,i.spotShadowMap.length=A,i.spotLightMatrix.length=A+b-T,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=R,P.sunLength=f,P.directionalLength=m,P.pointLength=p,P.spotLength=v,P.rectAreaLength=S,P.hemiLength=y,P.numSunShadows=g,P.numDirectionalShadows=E,P.numPointShadows=M,P.numSpotShadows=A,P.numSpotMaps=b,P.numLightProbes=R,i.version=Jy++)}function c(l,h){let d=0,u=0,f=0,g=0,x=0,m=0,p=h.matrixWorldInverse;for(let v=0,S=l.length;v<S;v++){let y=l[v];if(y.isSunLight){let E=i.sun[d];E.direction.setFromMatrixPosition(y.matrixWorld),E.direction.transformDirection(p),d++}else if(y.isDirectionalLight){let E=i.directional[u];E.direction.setFromMatrixPosition(y.matrixWorld),n.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(n),E.direction.transformDirection(p),u++}else if(y.isSpotLight){let E=i.spot[g];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(p),E.direction.setFromMatrixPosition(y.matrixWorld),n.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(n),E.direction.transformDirection(p),g++}else if(y.isRectAreaLight){let E=i.rectArea[x];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(p),a.identity(),r.copy(y.matrixWorld),r.premultiply(p),a.extractRotation(r),E.halfWidth.set(y.width*.5,0,0),E.halfHeight.set(0,y.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),x++}else if(y.isPointLight){let E=i.point[f];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(p),f++}else if(y.isHemisphereLight){let E=i.hemi[m];E.direction.setFromMatrixPosition(y.matrixWorld),E.direction.transformDirection(p),m++}}}return{setup:o,setupView:c,state:i}}function Xf(s){let t=new Qy(s),e=[],i=[],n=[];function r(u){d.camera=u,e.length=0,i.length=0,n.length=0}function a(u){e.push(u)}function o(u){i.push(u)}function c(u){n.push(u)}function l(){t.setup(e)}function h(u){t.setupView(e,u)}let d={lightsArray:e,shadowsArray:i,lightProbeGridArray:n,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function tb(s){let t=new WeakMap;function e(n,r=0){let a=t.get(n),o;return a===void 0?(o=new Xf(s),t.set(n,[o])):r>=a.length?(o=new Xf(s),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}var eb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ib=`uniform sampler2D shadow_pass;
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
}`,nb=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],sb=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],qf=new Gt,_a=new N,su=new N;function rb(s,t,e){let i=new fr,n=new Xt,r=new Xt,a=new be,o=new To,c=new Ao,l={},h=e.maxTextureSize,d={[xn]:Je,[Je]:xn,[Ui]:Ui},u=new Oe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xt},radius:{value:4}},vertexShader:eb,fragmentShader:ib}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new We;g.setAttribute("position",new Ri(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new ce(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ca;let p=this.type;this.render=function(M,A,b){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;this.type===Hd&&(Ut("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ca);let T=s.getRenderTarget(),R=s.getActiveCubeFace(),P=s.getActiveMipmapLevel(),D=s.state;D.setBlending(vn),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);let H=p!==this.type;H&&A.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(V=>V.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,V=M.length;L<V;L++){let K=M[L],Z=K.shadow;if(Z===void 0){Ut("WebGLShadowMap:",K,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;n.copy(Z.mapSize);let j=Z.getFrameExtents();n.multiply(j),r.copy(Z.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(r.x=Math.floor(h/j.x),n.x=r.x*j.x,Z.mapSize.x=r.x),n.y>h&&(r.y=Math.floor(h/j.y),n.y=r.y*j.y,Z.mapSize.y=r.y));let X=s.state.buffers.depth.getReversed();if(Z.camera._reversedDepth=X,Z.map===null||H===!0){if(Z.map!==null&&(Z.map.depthTexture!==null&&(Z.map.depthTexture.dispose(),Z.map.depthTexture=null),Z.map.dispose()),this.type===gr){if(K.isPointLight){Ut("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Z.map=new ai(n.x,n.y,{format:is,type:tn,minFilter:Ze,magFilter:Ze,generateMipmaps:!1}),Z.map.texture.name=K.name+".shadowMap",Z.map.depthTexture=new Yn(n.x,n.y,pi),Z.map.depthTexture.name=K.name+".shadowMapDepth",Z.map.depthTexture.format=fn,Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Le,Z.map.depthTexture.magFilter=Le}else K.isPointLight?(Z.map=new Dl(n.x),Z.map.depthTexture=new wo(n.x,Qi)):(Z.map=new ai(n.x,n.y),Z.map.depthTexture=new Yn(n.x,n.y,Qi)),Z.map.depthTexture.name=K.name+".shadowMap",Z.map.depthTexture.format=fn,this.type===ca?(Z.map.depthTexture.compareFunction=X?Pl:Cl,Z.map.depthTexture.minFilter=Ze,Z.map.depthTexture.magFilter=Ze):(Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Le,Z.map.depthTexture.magFilter=Le);Z.camera.updateProjectionMatrix()}Z.map.isWebGLCubeRenderTarget!==!0&&(Z.map.width!==n.x||Z.map.height!==n.y)&&Z.map.setSize(n.x,n.y);let et=Z.map.isWebGLCubeRenderTarget?6:Z.getViewportCount();K.isPointLight!==!0&&Z.updateMatrices(K,b);for(let nt=0;nt<et;nt++){let Lt=Z.getCamera(nt);if(K.isPointLight){let At=Z.camera,oe=Z.matrix,ie=K.distance||At.far;ie!==At.far&&(At.far=ie,At.updateProjectionMatrix()),_a.setFromMatrixPosition(K.matrixWorld),At.position.copy(_a),su.copy(At.position),su.add(nb[nt]),At.up.copy(sb[nt]),At.lookAt(su),At.updateMatrixWorld(),oe.makeTranslation(-_a.x,-_a.y,-_a.z),qf.multiplyMatrices(At.projectionMatrix,At.matrixWorldInverse),Z._frustum.setFromProjectionMatrix(qf,At.coordinateSystem,At.reversedDepth)}if(Z.map.isWebGLCubeRenderTarget)s.setRenderTarget(Z.map,nt),s.clear();else{nt===0&&(s.setRenderTarget(Z.map),s.clear());let At=Z.getViewport(nt);a.set(r.x*At.x,r.y*At.y,r.x*At.z,r.y*At.w),D.viewport(a)}i=Z.getFrustum(nt),y(A,b,Lt,K,this.type)}Z.isPointLightShadow!==!0&&this.type===gr&&v(Z,b),Z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(T,R,P)};function v(M,A){let b=t.update(x);u.defines.VSM_SAMPLES!==M.blurSamples&&(u.defines.VSM_SAMPLES=M.blurSamples,f.defines.VSM_SAMPLES=M.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),M.mapPass===null?M.mapPass=new ai(n.x,n.y,{format:is,type:tn}):(M.mapPass.width!==M.map.width||M.mapPass.height!==M.map.height)&&M.mapPass.setSize(M.map.width,M.map.height),u.uniforms.shadow_pass.value=M.map.depthTexture,u.uniforms.resolution.value.set(M.map.width,M.map.height),u.uniforms.radius.value=M.radius,s.setRenderTarget(M.mapPass),s.clear(),s.renderBufferDirect(A,null,b,u,x,null),f.uniforms.shadow_pass.value=M.mapPass.texture,f.uniforms.resolution.value.set(M.map.width,M.map.height),f.uniforms.radius.value=M.radius,s.setRenderTarget(M.map),s.clear(),s.renderBufferDirect(A,null,b,f,x,null)}function S(M,A,b,T){let R=null,P=b.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(P!==void 0)R=P;else if(R=b.isPointLight===!0?c:o,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let D=R.uuid,H=A.uuid,L=l[D];L===void 0&&(L={},l[D]=L);let V=L[H];V===void 0&&(V=R.clone(),L[H]=V,A.addEventListener("dispose",E)),R=V}if(R.visible=A.visible,R.wireframe=A.wireframe,T===gr?R.side=A.shadowSide!==null?A.shadowSide:A.side:R.side=A.shadowSide!==null?A.shadowSide:d[A.side],R.alphaMap=A.alphaMap,R.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,R.map=A.map,R.clipShadows=A.clipShadows,R.clippingPlanes=A.clippingPlanes,R.clipIntersection=A.clipIntersection,R.displacementMap=A.displacementMap,R.displacementScale=A.displacementScale,R.displacementBias=A.displacementBias,R.wireframeLinewidth=A.wireframeLinewidth,R.linewidth=A.linewidth,b.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let D=s.properties.get(R);D.light=b}return R}function y(M,A,b,T,R){if(M.visible===!1)return;if(M.layers.test(A.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&R===gr)&&(!M.frustumCulled||M.intersectsFrustum(i))){M.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,M.matrixWorld);let H=t.update(M),L=M.material;if(Array.isArray(L)){let V=H.groups;for(let K=0,Z=V.length;K<Z;K++){let j=V[K],X=L[j.materialIndex];if(X&&X.visible){let et=S(M,X,T,R);M.onBeforeShadow(s,M,A,b,H,et,j),s.renderBufferDirect(b,null,H,et,M,j),M.onAfterShadow(s,M,A,b,H,et,j)}}}else if(L.visible){let V=S(M,L,T,R);M.onBeforeShadow(s,M,A,b,H,V,null),s.renderBufferDirect(b,null,H,V,M,null),M.onAfterShadow(s,M,A,b,H,V,null)}}let D=M.children;for(let H=0,L=D.length;H<L;H++)y(D[H],A,b,T,R)}function E(M){M.target.removeEventListener("dispose",E);for(let b in l){let T=l[b],R=M.target.uuid;R in T&&(T[R].dispose(),delete T[R])}}}function ab(s,t){function e(){let O=!1,ft=new be,tt=null,pt=new be(0,0,0,0);return{setMask:function(vt){tt!==vt&&!O&&(s.colorMask(vt,vt,vt,vt),tt=vt)},setLocked:function(vt){O=vt},setClear:function(vt,st,Nt,Tt,Me){Me===!0&&(vt*=Tt,st*=Tt,Nt*=Tt),ft.set(vt,st,Nt,Tt),pt.equals(ft)===!1&&(s.clearColor(vt,st,Nt,Tt),pt.copy(ft))},reset:function(){O=!1,tt=null,pt.set(-1,0,0,0)}}}function i(){let O=!1,ft=!1,tt=null,pt=null,vt=null;return{setReversed:function(st){if(ft!==st){let Nt=t.get("EXT_clip_control");st?Nt.clipControlEXT(Nt.LOWER_LEFT_EXT,Nt.ZERO_TO_ONE_EXT):Nt.clipControlEXT(Nt.LOWER_LEFT_EXT,Nt.NEGATIVE_ONE_TO_ONE_EXT),ft=st;let Tt=vt;vt=null,this.setClear(Tt)}},getReversed:function(){return ft},setTest:function(st){st?Y(s.DEPTH_TEST):at(s.DEPTH_TEST)},setMask:function(st){tt!==st&&!O&&(s.depthMask(st),tt=st)},setFunc:function(st){if(ft&&(st=Sf[st]),pt!==st){switch(st){case lo:s.depthFunc(s.NEVER);break;case co:s.depthFunc(s.ALWAYS);break;case ho:s.depthFunc(s.LESS);break;case or:s.depthFunc(s.LEQUAL);break;case uo:s.depthFunc(s.EQUAL);break;case fo:s.depthFunc(s.GEQUAL);break;case po:s.depthFunc(s.GREATER);break;case mo:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}pt=st}},setLocked:function(st){O=st},setClear:function(st){vt!==st&&(vt=st,ft&&(st=1-st),s.clearDepth(st))},reset:function(){O=!1,tt=null,pt=null,vt=null,ft=!1}}}function n(){let O=!1,ft=null,tt=null,pt=null,vt=null,st=null,Nt=null,Tt=null,Me=null;return{setTest:function(he){O||(he?Y(s.STENCIL_TEST):at(s.STENCIL_TEST))},setMask:function(he){ft!==he&&!O&&(s.stencilMask(he),ft=he)},setFunc:function(he,Xi,cn){(tt!==he||pt!==Xi||vt!==cn)&&(s.stencilFunc(he,Xi,cn),tt=he,pt=Xi,vt=cn)},setOp:function(he,Xi,cn){(st!==he||Nt!==Xi||Tt!==cn)&&(s.stencilOp(he,Xi,cn),st=he,Nt=Xi,Tt=cn)},setLocked:function(he){O=he},setClear:function(he){Me!==he&&(s.clearStencil(he),Me=he)},reset:function(){O=!1,ft=null,tt=null,pt=null,vt=null,st=null,Nt=null,Tt=null,Me=null}}}let r=new e,a=new i,o=new n,c=new WeakMap,l=new WeakMap,h={},d={},u={},f=new WeakMap,g=[],x=null,m=!1,p=null,v=null,S=null,y=null,E=null,M=null,A=null,b=new qt(0,0,0),T=0,R=!1,P=null,D=null,H=null,L=null,V=null,K=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Z=!1,j=0,X=s.getParameter(s.VERSION);X.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(X)[1]),Z=j>=1):X.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),Z=j>=2);let et=null,nt={},Lt=s.getParameter(s.SCISSOR_BOX),At=s.getParameter(s.VIEWPORT),oe=new be().fromArray(Lt),ie=new be().fromArray(At);function rt(O,ft,tt,pt){let vt=new Uint8Array(4),st=s.createTexture();s.bindTexture(O,st),s.texParameteri(O,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(O,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Nt=0;Nt<tt;Nt++)O===s.TEXTURE_3D||O===s.TEXTURE_2D_ARRAY?s.texImage3D(ft,0,s.RGBA,1,1,pt,0,s.RGBA,s.UNSIGNED_BYTE,vt):s.texImage2D(ft+Nt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,vt);return st}let I={};I[s.TEXTURE_2D]=rt(s.TEXTURE_2D,s.TEXTURE_2D,1),I[s.TEXTURE_CUBE_MAP]=rt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),I[s.TEXTURE_2D_ARRAY]=rt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),I[s.TEXTURE_3D]=rt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Y(s.DEPTH_TEST),a.setFunc(or),ne(!1),Re(vh),Y(s.CULL_FACE),te(vn);function Y(O){h[O]!==!0&&(s.enable(O),h[O]=!0)}function at(O){h[O]!==!1&&(s.disable(O),h[O]=!1)}function yt(O,ft){return u[O]!==ft?(s.bindFramebuffer(O,ft),u[O]=ft,O===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=ft),O===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=ft),!0):!1}function ot(O,ft){let tt=g,pt=!1;if(O){tt=f.get(ft),tt===void 0&&(tt=[],f.set(ft,tt));let vt=O.textures;if(tt.length!==vt.length||tt[0]!==s.COLOR_ATTACHMENT0){for(let st=0,Nt=vt.length;st<Nt;st++)tt[st]=s.COLOR_ATTACHMENT0+st;tt.length=vt.length,pt=!0}}else tt[0]!==s.BACK&&(tt[0]=s.BACK,pt=!0);pt&&s.drawBuffers(tt)}function Ct(O){return x!==O?(s.useProgram(O),x=O,!0):!1}let ve={[Ts]:s.FUNC_ADD,[Gd]:s.FUNC_SUBTRACT,[Wd]:s.FUNC_REVERSE_SUBTRACT};ve[$d]=s.MIN,ve[Xd]=s.MAX;let Wt={[qd]:s.ZERO,[Yd]:s.ONE,[Kd]:s.SRC_COLOR,[Sh]:s.SRC_ALPHA,[ef]:s.SRC_ALPHA_SATURATE,[Qd]:s.DST_COLOR,[Jd]:s.DST_ALPHA,[Zd]:s.ONE_MINUS_SRC_COLOR,[wh]:s.ONE_MINUS_SRC_ALPHA,[tf]:s.ONE_MINUS_DST_COLOR,[jd]:s.ONE_MINUS_DST_ALPHA,[nf]:s.CONSTANT_COLOR,[sf]:s.ONE_MINUS_CONSTANT_COLOR,[rf]:s.CONSTANT_ALPHA,[af]:s.ONE_MINUS_CONSTANT_ALPHA};function te(O,ft,tt,pt,vt,st,Nt,Tt,Me,he){if(O===vn){m===!0&&(at(s.BLEND),m=!1);return}if(m===!1&&(Y(s.BLEND),m=!0),O!==Vd){if(O!==p||he!==R){if((v!==Ts||E!==Ts)&&(s.blendEquation(s.FUNC_ADD),v=Ts,E=Ts),he)switch(O){case xr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case bh:s.blendFunc(s.ONE,s.ONE);break;case _h:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Mh:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Bt("WebGLState: Invalid blending: ",O);break}else switch(O){case xr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case bh:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case _h:Bt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Mh:Bt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Bt("WebGLState: Invalid blending: ",O);break}S=null,y=null,M=null,A=null,b.set(0,0,0),T=0,p=O,R=he}return}vt=vt||ft,st=st||tt,Nt=Nt||pt,(ft!==v||vt!==E)&&(s.blendEquationSeparate(ve[ft],ve[vt]),v=ft,E=vt),(tt!==S||pt!==y||st!==M||Nt!==A)&&(s.blendFuncSeparate(Wt[tt],Wt[pt],Wt[st],Wt[Nt]),S=tt,y=pt,M=st,A=Nt),(Tt.equals(b)===!1||Me!==T)&&(s.blendColor(Tt.r,Tt.g,Tt.b,Me),b.copy(Tt),T=Me),p=O,R=!1}function pe(O,ft){O.side===Ui?at(s.CULL_FACE):Y(s.CULL_FACE);let tt=O.side===Je;ft&&(tt=!tt),ne(tt),O.blending===xr&&O.transparent===!1?te(vn):te(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),a.setFunc(O.depthFunc),a.setTest(O.depthTest),a.setMask(O.depthWrite),r.setMask(O.colorWrite);let pt=O.stencilWrite;o.setTest(pt),pt&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),bi(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?Y(s.SAMPLE_ALPHA_TO_COVERAGE):at(s.SAMPLE_ALPHA_TO_COVERAGE)}function ne(O){P!==O&&(O?s.frontFace(s.CW):s.frontFace(s.CCW),P=O)}function Re(O){O!==Bd?(Y(s.CULL_FACE),O!==D&&(O===vh?s.cullFace(s.BACK):O===zd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):at(s.CULL_FACE),D=O}function qe(O){O!==H&&(Z&&s.lineWidth(O),H=O)}function bi(O,ft,tt){O?(Y(s.POLYGON_OFFSET_FILL),(L!==ft||V!==tt)&&(L=ft,V=tt,a.getReversed()&&(ft=-ft),s.polygonOffset(ft,tt))):at(s.POLYGON_OFFSET_FILL)}function Ie(O){O?Y(s.SCISSOR_TEST):at(s.SCISSOR_TEST)}function ze(O){O===void 0&&(O=s.TEXTURE0+K-1),et!==O&&(s.activeTexture(O),et=O)}function U(O,ft,tt){tt===void 0&&(et===null?tt=s.TEXTURE0+K-1:tt=et);let pt=nt[tt];pt===void 0&&(pt={type:void 0,texture:void 0},nt[tt]=pt),(pt.type!==O||pt.texture!==ft)&&(et!==tt&&(s.activeTexture(tt),et=tt),s.bindTexture(O,ft||I[O]),pt.type=O,pt.texture=ft)}function ei(){let O=nt[et];O!==void 0&&O.type!==void 0&&(s.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function me(){try{s.compressedTexImage2D(...arguments)}catch(O){Bt("WebGLState:",O)}}function C(){try{s.compressedTexImage3D(...arguments)}catch(O){Bt("WebGLState:",O)}}function _(){try{s.texSubImage2D(...arguments)}catch(O){Bt("WebGLState:",O)}}function z(){try{s.texSubImage3D(...arguments)}catch(O){Bt("WebGLState:",O)}}function $(){try{s.compressedTexSubImage2D(...arguments)}catch(O){Bt("WebGLState:",O)}}function J(){try{s.compressedTexSubImage3D(...arguments)}catch(O){Bt("WebGLState:",O)}}function lt(){try{s.texStorage2D(...arguments)}catch(O){Bt("WebGLState:",O)}}function ht(){try{s.texStorage3D(...arguments)}catch(O){Bt("WebGLState:",O)}}function Q(){try{s.texImage2D(...arguments)}catch(O){Bt("WebGLState:",O)}}function it(){try{s.texImage3D(...arguments)}catch(O){Bt("WebGLState:",O)}}function ut(O){return d[O]!==void 0?d[O]:s.getParameter(O)}function Pt(O,ft){d[O]!==ft&&(s.pixelStorei(O,ft),d[O]=ft)}function mt(O){oe.equals(O)===!1&&(s.scissor(O.x,O.y,O.z,O.w),oe.copy(O))}function dt(O){ie.equals(O)===!1&&(s.viewport(O.x,O.y,O.z,O.w),ie.copy(O))}function It(O,ft){let tt=l.get(ft);tt===void 0&&(tt=new WeakMap,l.set(ft,tt));let pt=tt.get(O);pt===void 0&&(pt=s.getUniformBlockIndex(ft,O.name),tt.set(O,pt))}function kt(O,ft){let pt=l.get(ft).get(O);c.get(ft)!==pt&&(s.uniformBlockBinding(ft,pt,O.__bindingPointIndex),c.set(ft,pt))}function $t(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},d={},et=null,nt={},u={},f=new WeakMap,g=[],x=null,m=!1,p=null,v=null,S=null,y=null,E=null,M=null,A=null,b=new qt(0,0,0),T=0,R=!1,P=null,D=null,H=null,L=null,V=null,oe.set(0,0,s.canvas.width,s.canvas.height),ie.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Y,disable:at,bindFramebuffer:yt,drawBuffers:ot,useProgram:Ct,setBlending:te,setMaterial:pe,setFlipSided:ne,setCullFace:Re,setLineWidth:qe,setPolygonOffset:bi,setScissorTest:Ie,activeTexture:ze,bindTexture:U,unbindTexture:ei,compressedTexImage2D:me,compressedTexImage3D:C,texImage2D:Q,texImage3D:it,pixelStorei:Pt,getParameter:ut,updateUBOMapping:It,uniformBlockBinding:kt,texStorage2D:lt,texStorage3D:ht,texSubImage2D:_,texSubImage3D:z,compressedTexSubImage2D:$,compressedTexSubImage3D:J,scissor:mt,viewport:dt,reset:$t}}function ob(s,t,e,i,n,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Xt,h=new WeakMap,d=new Set,u,f=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(C,_){return g?new OffscreenCanvas(C,_):qr("canvas")}function m(C,_,z){let $=1,J=me(C);if((J.width>z||J.height>z)&&($=z/Math.max(J.width,J.height)),$<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let lt=Math.floor($*J.width),ht=Math.floor($*J.height);u===void 0&&(u=x(lt,ht));let Q=_?x(lt,ht):u;return Q.width=lt,Q.height=ht,Q.getContext("2d").drawImage(C,0,0,lt,ht),Ut("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+lt+"x"+ht+")."),Q}else return"data"in C&&Ut("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),C;return C}function p(C){return C.generateMipmaps}function v(C){s.generateMipmap(C)}function S(C){return C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?s.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function y(C,_,z,$,J,lt=!1){if(C!==null){if(s[C]!==void 0)return s[C];Ut("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let ht;$&&(ht=t.get("EXT_texture_norm16"),ht||Ut("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=_;if(_===s.RED&&(z===s.FLOAT&&(Q=s.R32F),z===s.HALF_FLOAT&&(Q=s.R16F),z===s.UNSIGNED_BYTE&&(Q=s.R8),z===s.UNSIGNED_SHORT&&ht&&(Q=ht.R16_EXT),z===s.SHORT&&ht&&(Q=ht.R16_SNORM_EXT)),_===s.RED_INTEGER&&(z===s.UNSIGNED_BYTE&&(Q=s.R8UI),z===s.UNSIGNED_SHORT&&(Q=s.R16UI),z===s.UNSIGNED_INT&&(Q=s.R32UI),z===s.BYTE&&(Q=s.R8I),z===s.SHORT&&(Q=s.R16I),z===s.INT&&(Q=s.R32I)),_===s.RG&&(z===s.FLOAT&&(Q=s.RG32F),z===s.HALF_FLOAT&&(Q=s.RG16F),z===s.UNSIGNED_BYTE&&(Q=s.RG8),z===s.UNSIGNED_SHORT&&ht&&(Q=ht.RG16_EXT),z===s.SHORT&&ht&&(Q=ht.RG16_SNORM_EXT)),_===s.RG_INTEGER&&(z===s.UNSIGNED_BYTE&&(Q=s.RG8UI),z===s.UNSIGNED_SHORT&&(Q=s.RG16UI),z===s.UNSIGNED_INT&&(Q=s.RG32UI),z===s.BYTE&&(Q=s.RG8I),z===s.SHORT&&(Q=s.RG16I),z===s.INT&&(Q=s.RG32I)),_===s.RGB_INTEGER&&(z===s.UNSIGNED_BYTE&&(Q=s.RGB8UI),z===s.UNSIGNED_SHORT&&(Q=s.RGB16UI),z===s.UNSIGNED_INT&&(Q=s.RGB32UI),z===s.BYTE&&(Q=s.RGB8I),z===s.SHORT&&(Q=s.RGB16I),z===s.INT&&(Q=s.RGB32I)),_===s.RGBA_INTEGER&&(z===s.UNSIGNED_BYTE&&(Q=s.RGBA8UI),z===s.UNSIGNED_SHORT&&(Q=s.RGBA16UI),z===s.UNSIGNED_INT&&(Q=s.RGBA32UI),z===s.BYTE&&(Q=s.RGBA8I),z===s.SHORT&&(Q=s.RGBA16I),z===s.INT&&(Q=s.RGBA32I)),_===s.RGB&&(z===s.UNSIGNED_SHORT&&ht&&(Q=ht.RGB16_EXT),z===s.SHORT&&ht&&(Q=ht.RGB16_SNORM_EXT),z===s.UNSIGNED_INT_5_9_9_9_REV&&(Q=s.RGB9_E5),z===s.UNSIGNED_INT_10F_11F_11F_REV&&(Q=s.R11F_G11F_B10F)),_===s.RGBA){let it=lt?Xr:jt.getTransfer(J);z===s.FLOAT&&(Q=s.RGBA32F),z===s.HALF_FLOAT&&(Q=s.RGBA16F),z===s.UNSIGNED_BYTE&&(Q=it===de?s.SRGB8_ALPHA8:s.RGBA8),z===s.UNSIGNED_SHORT&&ht&&(Q=ht.RGBA16_EXT),z===s.SHORT&&ht&&(Q=ht.RGBA16_SNORM_EXT),z===s.UNSIGNED_SHORT_4_4_4_4&&(Q=s.RGBA4),z===s.UNSIGNED_SHORT_5_5_5_1&&(Q=s.RGB5_A1)}return(Q===s.R16F||Q===s.R32F||Q===s.RG16F||Q===s.RG32F||Q===s.RGBA16F||Q===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function E(C,_){let z;return C?_===null||_===Qi||_===yr?z=s.DEPTH24_STENCIL8:_===pi?z=s.DEPTH32F_STENCIL8:_===vr&&(z=s.DEPTH24_STENCIL8,Ut("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Qi||_===yr?z=s.DEPTH_COMPONENT24:_===pi?z=s.DEPTH_COMPONENT32F:_===vr&&(z=s.DEPTH_COMPONENT16),z}function M(C,_){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==Le&&C.minFilter!==Ze?Math.log2(Math.max(_.width,_.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?_.mipmaps.length:1}function A(C){let _=C.target;_.removeEventListener("dispose",A),T(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&d.delete(_)}function b(C){let _=C.target;_.removeEventListener("dispose",b),P(_)}function T(C){let _=i.get(C);if(_.__webglInit===void 0)return;let z=C.source,$=f.get(z);if($){let J=$[_.__cacheKey];J.usedTimes--,J.usedTimes===0&&R(C),Object.keys($).length===0&&f.delete(z)}i.remove(C)}function R(C){let _=i.get(C);s.deleteTexture(_.__webglTexture);let z=C.source,$=f.get(z);delete $[_.__cacheKey],a.memory.textures--}function P(C){let _=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(_.__webglFramebuffer[$]))for(let J=0;J<_.__webglFramebuffer[$].length;J++)s.deleteFramebuffer(_.__webglFramebuffer[$][J]);else s.deleteFramebuffer(_.__webglFramebuffer[$]);_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer[$])}else{if(Array.isArray(_.__webglFramebuffer))for(let $=0;$<_.__webglFramebuffer.length;$++)s.deleteFramebuffer(_.__webglFramebuffer[$]);else s.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&s.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let $=0;$<_.__webglColorRenderbuffer.length;$++)_.__webglColorRenderbuffer[$]&&s.deleteRenderbuffer(_.__webglColorRenderbuffer[$]);_.__webglDepthRenderbuffer&&s.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let z=C.textures;for(let $=0,J=z.length;$<J;$++){let lt=i.get(z[$]);lt.__webglTexture&&(s.deleteTexture(lt.__webglTexture),a.memory.textures--),i.remove(z[$])}i.remove(C)}let D=0;function H(){D=0}function L(){return D}function V(C){D=C}function K(){let C=D;return C>=n.maxTextures&&Ut("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+n.maxTextures),D+=1,C}function Z(C){let _=[];return _.push(C.wrapS),_.push(C.wrapT),_.push(C.wrapR||0),_.push(C.magFilter),_.push(C.minFilter),_.push(C.anisotropy),_.push(C.internalFormat),_.push(C.format),_.push(C.type),_.push(C.generateMipmaps),_.push(C.premultiplyAlpha),_.push(C.flipY),_.push(C.unpackAlignment),_.push(C.colorSpace),_.join()}function j(C,_){let z=i.get(C);if(C.isVideoTexture&&U(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&z.__version!==C.version){let $=C.image;if($===null)Ut("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)Ut("WebGLRenderer: Texture marked for update but image is incomplete");else{at(z,C,_);return}}else C.isExternalTexture&&(z.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,z.__webglTexture,s.TEXTURE0+_)}function X(C,_){let z=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){at(z,C,_);return}else C.isExternalTexture&&(z.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,z.__webglTexture,s.TEXTURE0+_)}function et(C,_){let z=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){at(z,C,_);return}e.bindTexture(s.TEXTURE_3D,z.__webglTexture,s.TEXTURE0+_)}function nt(C,_){let z=i.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&z.__version!==C.version){yt(z,C,_);return}e.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture,s.TEXTURE0+_)}let Lt={[go]:s.REPEAT,[dn]:s.CLAMP_TO_EDGE,[xo]:s.MIRRORED_REPEAT},At={[Le]:s.NEAREST,[cf]:s.NEAREST_MIPMAP_NEAREST,[ua]:s.NEAREST_MIPMAP_LINEAR,[Ze]:s.LINEAR,[$o]:s.LINEAR_MIPMAP_NEAREST,[ts]:s.LINEAR_MIPMAP_LINEAR},oe={[ff]:s.NEVER,[vf]:s.ALWAYS,[pf]:s.LESS,[Cl]:s.LEQUAL,[mf]:s.EQUAL,[Pl]:s.GEQUAL,[gf]:s.GREATER,[xf]:s.NOTEQUAL};function ie(C,_){if(_.type===pi&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===Ze||_.magFilter===$o||_.magFilter===ua||_.magFilter===ts||_.minFilter===Ze||_.minFilter===$o||_.minFilter===ua||_.minFilter===ts)&&Ut("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,Lt[_.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,Lt[_.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,Lt[_.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,At[_.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,At[_.minFilter]),_.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,oe[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Le||_.minFilter!==ua&&_.minFilter!==ts||_.type===pi&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){let z=t.get("EXT_texture_filter_anisotropic");s.texParameterf(C,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,n.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function rt(C,_){let z=!1;C.__webglInit===void 0&&(C.__webglInit=!0,_.addEventListener("dispose",A));let $=_.source,J=f.get($);J===void 0&&(J={},f.set($,J));let lt=Z(_);if(lt!==C.__cacheKey){J[lt]===void 0&&(J[lt]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,z=!0),J[lt].usedTimes++;let ht=J[C.__cacheKey];ht!==void 0&&(J[C.__cacheKey].usedTimes--,ht.usedTimes===0&&R(_)),C.__cacheKey=lt,C.__webglTexture=J[lt].texture}return z}function I(C,_,z){return Math.floor(Math.floor(C/z)/_)}function Y(C,_,z,$){let lt=C.updateRanges;if(lt.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,_.width,_.height,z,$,_.data);else{lt.sort((Pt,mt)=>Pt.start-mt.start);let ht=0;for(let Pt=1;Pt<lt.length;Pt++){let mt=lt[ht],dt=lt[Pt],It=mt.start+mt.count,kt=I(dt.start,_.width,4),$t=I(mt.start,_.width,4);dt.start<=It+1&&kt===$t&&I(dt.start+dt.count-1,_.width,4)===kt?mt.count=Math.max(mt.count,dt.start+dt.count-mt.start):(++ht,lt[ht]=dt)}lt.length=ht+1;let Q=e.getParameter(s.UNPACK_ROW_LENGTH),it=e.getParameter(s.UNPACK_SKIP_PIXELS),ut=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,_.width);for(let Pt=0,mt=lt.length;Pt<mt;Pt++){let dt=lt[Pt],It=Math.floor(dt.start/4),kt=Math.ceil(dt.count/4),$t=It%_.width,O=Math.floor(It/_.width),ft=kt,tt=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,$t),e.pixelStorei(s.UNPACK_SKIP_ROWS,O),e.texSubImage2D(s.TEXTURE_2D,0,$t,O,ft,tt,z,$,_.data)}C.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,Q),e.pixelStorei(s.UNPACK_SKIP_PIXELS,it),e.pixelStorei(s.UNPACK_SKIP_ROWS,ut)}}function at(C,_,z){let $=s.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&($=s.TEXTURE_2D_ARRAY),_.isData3DTexture&&($=s.TEXTURE_3D);let J=rt(C,_),lt=_.source;e.bindTexture($,C.__webglTexture,s.TEXTURE0+z);let ht=i.get(lt);if(lt.version!==ht.__version||J===!0){if(e.activeTexture(s.TEXTURE0+z),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let tt=jt.getPrimaries(jt.workingColorSpace),pt=_.colorSpace===Ln?null:jt.getPrimaries(_.colorSpace),vt=_.colorSpace===Ln||tt===pt?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt)}e.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment);let it=m(_.image,!1,n.maxTextureSize);it=ei(_,it);let ut=r.convert(_.format,_.colorSpace),Pt=r.convert(_.type),mt=y(_.internalFormat,ut,Pt,_.normalized,_.colorSpace,_.isVideoTexture);ie($,_);let dt,It=_.mipmaps,kt=_.isVideoTexture!==!0,$t=ht.__version===void 0||J===!0,O=lt.dataReady,ft=M(_,it);if(_.isDepthTexture)mt=E(_.format===es,_.type),$t&&(kt?e.texStorage2D(s.TEXTURE_2D,1,mt,it.width,it.height):e.texImage2D(s.TEXTURE_2D,0,mt,it.width,it.height,0,ut,Pt,null));else if(_.isDataTexture)if(It.length>0){kt&&$t&&e.texStorage2D(s.TEXTURE_2D,ft,mt,It[0].width,It[0].height);for(let tt=0,pt=It.length;tt<pt;tt++)dt=It[tt],kt?O&&e.texSubImage2D(s.TEXTURE_2D,tt,0,0,dt.width,dt.height,ut,Pt,dt.data):e.texImage2D(s.TEXTURE_2D,tt,mt,dt.width,dt.height,0,ut,Pt,dt.data);_.generateMipmaps=!1}else kt?($t&&e.texStorage2D(s.TEXTURE_2D,ft,mt,it.width,it.height),O&&Y(_,it,ut,Pt)):e.texImage2D(s.TEXTURE_2D,0,mt,it.width,it.height,0,ut,Pt,it.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){kt&&$t&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ft,mt,It[0].width,It[0].height,it.depth);for(let tt=0,pt=It.length;tt<pt;tt++)if(dt=It[tt],_.format!==mi)if(ut!==null)if(kt){if(O)if(_.layerUpdates.size>0){let vt=qh(dt.width,dt.height,_.format,_.type);for(let st of _.layerUpdates){let Nt=dt.data.subarray(st*vt/dt.data.BYTES_PER_ELEMENT,(st+1)*vt/dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,tt,0,0,st,dt.width,dt.height,1,ut,Nt)}}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,tt,0,0,0,dt.width,dt.height,it.depth,ut,dt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,tt,mt,dt.width,dt.height,it.depth,0,dt.data,0,0);else Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else kt?O&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,tt,0,0,0,dt.width,dt.height,it.depth,ut,Pt,dt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,tt,mt,dt.width,dt.height,it.depth,0,ut,Pt,dt.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{kt&&$t&&e.texStorage2D(s.TEXTURE_2D,ft,mt,It[0].width,It[0].height);for(let tt=0,pt=It.length;tt<pt;tt++)dt=It[tt],_.format!==mi?ut!==null?kt?O&&e.compressedTexSubImage2D(s.TEXTURE_2D,tt,0,0,dt.width,dt.height,ut,dt.data):e.compressedTexImage2D(s.TEXTURE_2D,tt,mt,dt.width,dt.height,0,dt.data):Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):kt?O&&e.texSubImage2D(s.TEXTURE_2D,tt,0,0,dt.width,dt.height,ut,Pt,dt.data):e.texImage2D(s.TEXTURE_2D,tt,mt,dt.width,dt.height,0,ut,Pt,dt.data)}else if(_.isDataArrayTexture)if(kt){if($t&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ft,mt,it.width,it.height,it.depth),O)if(_.layerUpdates.size>0){let tt=qh(it.width,it.height,_.format,_.type);for(let pt of _.layerUpdates){let vt=it.data.subarray(pt*tt/it.data.BYTES_PER_ELEMENT,(pt+1)*tt/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,pt,it.width,it.height,1,ut,Pt,vt)}_.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,ut,Pt,it.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,mt,it.width,it.height,it.depth,0,ut,Pt,it.data);else if(_.isData3DTexture)kt?($t&&e.texStorage3D(s.TEXTURE_3D,ft,mt,it.width,it.height,it.depth),O&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,ut,Pt,it.data)):e.texImage3D(s.TEXTURE_3D,0,mt,it.width,it.height,it.depth,0,ut,Pt,it.data);else if(_.isFramebufferTexture){if($t)if(kt)e.texStorage2D(s.TEXTURE_2D,ft,mt,it.width,it.height);else{let tt=it.width,pt=it.height;for(let vt=0;vt<ft;vt++)e.texImage2D(s.TEXTURE_2D,vt,mt,tt,pt,0,ut,Pt,null),tt>>=1,pt>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in s){let tt=s.canvas;if(tt.hasAttribute("layoutsubtree")||tt.setAttribute("layoutsubtree","true"),it.parentNode!==tt){tt.appendChild(it),d.add(_),tt.onpaint=pt=>{let vt=pt.changedElements;for(let st of d)vt.includes(st.image)&&(st.needsUpdate=!0)},tt.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,it);else{let vt=s.RGBA,st=s.RGBA,Nt=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,vt,st,Nt,it)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(It.length>0){if(kt&&$t){let tt=me(It[0]);e.texStorage2D(s.TEXTURE_2D,ft,mt,tt.width,tt.height)}for(let tt=0,pt=It.length;tt<pt;tt++)dt=It[tt],kt?O&&e.texSubImage2D(s.TEXTURE_2D,tt,0,0,ut,Pt,dt):e.texImage2D(s.TEXTURE_2D,tt,mt,ut,Pt,dt);_.generateMipmaps=!1}else if(kt){if($t){let tt=me(it);e.texStorage2D(s.TEXTURE_2D,ft,mt,tt.width,tt.height)}O&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,ut,Pt,it)}else e.texImage2D(s.TEXTURE_2D,0,mt,ut,Pt,it);p(_)&&v($),ht.__version=lt.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function yt(C,_,z){if(_.image.length!==6)return;let $=rt(C,_),J=_.source;e.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+z);let lt=i.get(J);if(J.version!==lt.__version||$===!0){e.activeTexture(s.TEXTURE0+z);let ht=jt.getPrimaries(jt.workingColorSpace),Q=_.colorSpace===Ln?null:jt.getPrimaries(_.colorSpace),it=_.colorSpace===Ln||ht===Q?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,it);let ut=_.isCompressedTexture||_.image[0].isCompressedTexture,Pt=_.image[0]&&_.image[0].isDataTexture,mt=[];for(let st=0;st<6;st++)!ut&&!Pt?mt[st]=m(_.image[st],!0,n.maxCubemapSize):mt[st]=Pt?_.image[st].image:_.image[st],mt[st]=ei(_,mt[st]);let dt=mt[0],It=r.convert(_.format,_.colorSpace),kt=r.convert(_.type),$t=y(_.internalFormat,It,kt,_.normalized,_.colorSpace),O=_.isVideoTexture!==!0,ft=lt.__version===void 0||$===!0,tt=J.dataReady,pt=M(_,dt);ie(s.TEXTURE_CUBE_MAP,_);let vt;if(ut){O&&ft&&e.texStorage2D(s.TEXTURE_CUBE_MAP,pt,$t,dt.width,dt.height);for(let st=0;st<6;st++){vt=mt[st].mipmaps;for(let Nt=0;Nt<vt.length;Nt++){let Tt=vt[Nt];_.format!==mi?It!==null?O?tt&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,Nt,0,0,Tt.width,Tt.height,It,Tt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,Nt,$t,Tt.width,Tt.height,0,Tt.data):Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?tt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,Nt,0,0,Tt.width,Tt.height,It,kt,Tt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,Nt,$t,Tt.width,Tt.height,0,It,kt,Tt.data)}}}else{if(vt=_.mipmaps,O&&ft){vt.length>0&&pt++;let st=me(mt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,pt,$t,st.width,st.height)}for(let st=0;st<6;st++)if(Pt){O?tt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,mt[st].width,mt[st].height,It,kt,mt[st].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,$t,mt[st].width,mt[st].height,0,It,kt,mt[st].data);for(let Nt=0;Nt<vt.length;Nt++){let Me=vt[Nt].image[st].image;O?tt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,Nt+1,0,0,Me.width,Me.height,It,kt,Me.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,Nt+1,$t,Me.width,Me.height,0,It,kt,Me.data)}}else{O?tt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,It,kt,mt[st]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,$t,It,kt,mt[st]);for(let Nt=0;Nt<vt.length;Nt++){let Tt=vt[Nt];O?tt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,Nt+1,0,0,It,kt,Tt.image[st]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,Nt+1,$t,It,kt,Tt.image[st])}}}p(_)&&v(s.TEXTURE_CUBE_MAP),lt.__version=J.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function ot(C,_,z,$,J,lt){let ht=r.convert(z.format,z.colorSpace),Q=r.convert(z.type),it=y(z.internalFormat,ht,Q,z.normalized,z.colorSpace),ut=i.get(_),Pt=i.get(z);if(Pt.__renderTarget=_,!ut.__hasExternalTextures){let mt=Math.max(1,_.width>>lt),dt=Math.max(1,_.height>>lt);J===s.TEXTURE_3D||J===s.TEXTURE_2D_ARRAY?e.texImage3D(J,lt,it,mt,dt,_.depth,0,ht,Q,null):e.texImage2D(J,lt,it,mt,dt,0,ht,Q,null)}e.bindFramebuffer(s.FRAMEBUFFER,C),ze(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,$,J,Pt.__webglTexture,0,Ie(_)):(J===s.TEXTURE_2D||J>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,$,J,Pt.__webglTexture,lt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function Ct(C,_,z){if(s.bindRenderbuffer(s.RENDERBUFFER,C),_.depthBuffer){let $=_.depthTexture,J=$&&$.isDepthTexture?$.type:null,lt=E(_.stencilBuffer,J),ht=_.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;ze(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ie(_),lt,_.width,_.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ie(_),lt,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,lt,_.width,_.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,ht,s.RENDERBUFFER,C)}else{let $=_.textures;for(let J=0;J<$.length;J++){let lt=$[J],ht=r.convert(lt.format,lt.colorSpace),Q=r.convert(lt.type),it=y(lt.internalFormat,ht,Q,lt.normalized,lt.colorSpace);ze(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ie(_),it,_.width,_.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ie(_),it,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,it,_.width,_.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ve(C,_,z){let $=_.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,C),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let J=i.get(_.depthTexture);if(J.__renderTarget=_,(!J.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),$){if(J.__webglInit===void 0&&(J.__webglInit=!0,_.depthTexture.addEventListener("dispose",A)),J.__webglTexture===void 0){J.__webglTexture=s.createTexture(),e.bindTexture(s.TEXTURE_CUBE_MAP,J.__webglTexture),ie(s.TEXTURE_CUBE_MAP,_.depthTexture);let ut=r.convert(_.depthTexture.format),Pt=r.convert(_.depthTexture.type),mt;_.depthTexture.format===fn?mt=s.DEPTH_COMPONENT24:_.depthTexture.format===es&&(mt=s.DEPTH24_STENCIL8);for(let dt=0;dt<6;dt++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,mt,_.width,_.height,0,ut,Pt,null)}}else j(_.depthTexture,0);let lt=J.__webglTexture,ht=Ie(_),Q=$?s.TEXTURE_CUBE_MAP_POSITIVE_X+z:s.TEXTURE_2D,it=_.depthTexture.format===es?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(_.depthTexture.format===fn)ze(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,it,Q,lt,0,ht):s.framebufferTexture2D(s.FRAMEBUFFER,it,Q,lt,0);else if(_.depthTexture.format===es)ze(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,it,Q,lt,0,ht):s.framebufferTexture2D(s.FRAMEBUFFER,it,Q,lt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Wt(C){let _=i.get(C),z=C.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==C.depthTexture){let $=C.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),$){let J=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,$.removeEventListener("dispose",J)};$.addEventListener("dispose",J),_.__depthDisposeCallback=J}_.__boundDepthTexture=$}if(C.depthTexture&&!_.__autoAllocateDepthBuffer)if(z)for(let $=0;$<6;$++)ve(_.__webglFramebuffer[$],C,$);else{let $=C.texture.mipmaps;$&&$.length>0?ve(_.__webglFramebuffer[0],C,0):ve(_.__webglFramebuffer,C,0)}else if(z){_.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[$]),_.__webglDepthbuffer[$]===void 0)_.__webglDepthbuffer[$]=s.createRenderbuffer(),Ct(_.__webglDepthbuffer[$],C,!1);else{let J=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,lt=_.__webglDepthbuffer[$];s.bindRenderbuffer(s.RENDERBUFFER,lt),s.framebufferRenderbuffer(s.FRAMEBUFFER,J,s.RENDERBUFFER,lt)}}else{let $=C.texture.mipmaps;if($&&$.length>0?e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=s.createRenderbuffer(),Ct(_.__webglDepthbuffer,C,!1);else{let J=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,lt=_.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,lt),s.framebufferRenderbuffer(s.FRAMEBUFFER,J,s.RENDERBUFFER,lt)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function te(C,_,z){let $=i.get(C);_!==void 0&&ot($.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),z!==void 0&&Wt(C)}function pe(C){let _=C.texture,z=i.get(C),$=i.get(_);C.addEventListener("dispose",b);let J=C.textures,lt=C.isWebGLCubeRenderTarget===!0,ht=J.length>1;if(ht||($.__webglTexture===void 0&&($.__webglTexture=s.createTexture()),$.__version=_.version,a.memory.textures++),lt){z.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(_.mipmaps&&_.mipmaps.length>0){z.__webglFramebuffer[Q]=[];for(let it=0;it<_.mipmaps.length;it++)z.__webglFramebuffer[Q][it]=s.createFramebuffer()}else z.__webglFramebuffer[Q]=s.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){z.__webglFramebuffer=[];for(let Q=0;Q<_.mipmaps.length;Q++)z.__webglFramebuffer[Q]=s.createFramebuffer()}else z.__webglFramebuffer=s.createFramebuffer();if(ht)for(let Q=0,it=J.length;Q<it;Q++){let ut=i.get(J[Q]);ut.__webglTexture===void 0&&(ut.__webglTexture=s.createTexture(),a.memory.textures++)}if(C.samples>0&&ze(C)===!1){z.__webglMultisampledFramebuffer=s.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let Q=0;Q<J.length;Q++){let it=J[Q];z.__webglColorRenderbuffer[Q]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,z.__webglColorRenderbuffer[Q]);let ut=r.convert(it.format,it.colorSpace),Pt=r.convert(it.type),mt=y(it.internalFormat,ut,Pt,it.normalized,it.colorSpace,C.isXRRenderTarget===!0),dt=Ie(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,dt,mt,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Q,s.RENDERBUFFER,z.__webglColorRenderbuffer[Q])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(z.__webglDepthRenderbuffer=s.createRenderbuffer(),Ct(z.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(lt){e.bindTexture(s.TEXTURE_CUBE_MAP,$.__webglTexture),ie(s.TEXTURE_CUBE_MAP,_);for(let Q=0;Q<6;Q++)if(_.mipmaps&&_.mipmaps.length>0)for(let it=0;it<_.mipmaps.length;it++)ot(z.__webglFramebuffer[Q][it],C,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,it);else ot(z.__webglFramebuffer[Q],C,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);p(_)&&v(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ht){for(let Q=0,it=J.length;Q<it;Q++){let ut=J[Q],Pt=i.get(ut),mt=s.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(mt=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(mt,Pt.__webglTexture),ie(mt,ut),ot(z.__webglFramebuffer,C,ut,s.COLOR_ATTACHMENT0+Q,mt,0),p(ut)&&v(mt)}e.unbindTexture()}else{let Q=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Q=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(Q,$.__webglTexture),ie(Q,_),_.mipmaps&&_.mipmaps.length>0)for(let it=0;it<_.mipmaps.length;it++)ot(z.__webglFramebuffer[it],C,_,s.COLOR_ATTACHMENT0,Q,it);else ot(z.__webglFramebuffer,C,_,s.COLOR_ATTACHMENT0,Q,0);p(_)&&v(Q),e.unbindTexture()}C.depthBuffer&&Wt(C)}function ne(C){let _=C.textures;for(let z=0,$=_.length;z<$;z++){let J=_[z];if(p(J)){let lt=S(C),ht=i.get(J).__webglTexture;e.bindTexture(lt,ht),v(lt),e.unbindTexture()}}}let Re=[],qe=[];function bi(C){if(C.samples>0){if(ze(C)===!1){let _=C.textures,z=C.width,$=C.height,J=s.COLOR_BUFFER_BIT,lt=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ht=i.get(C),Q=_.length>1;if(Q)for(let ut=0;ut<_.length;ut++)e.bindFramebuffer(s.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ut,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,ht.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ut,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,ht.__webglMultisampledFramebuffer);let it=C.texture.mipmaps;it&&it.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ht.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ht.__webglFramebuffer);for(let ut=0;ut<_.length;ut++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(J|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(J|=s.STENCIL_BUFFER_BIT)),Q){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,ht.__webglColorRenderbuffer[ut]);let Pt=i.get(_[ut]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Pt,0)}s.blitFramebuffer(0,0,z,$,0,0,z,$,J,s.NEAREST),c===!0&&(Re.length=0,qe.length=0,Re.push(s.COLOR_ATTACHMENT0+ut),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(Re.push(lt),qe.push(lt),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,qe)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Re))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Q)for(let ut=0;ut<_.length;ut++){e.bindFramebuffer(s.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ut,s.RENDERBUFFER,ht.__webglColorRenderbuffer[ut]);let Pt=i.get(_[ut]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,ht.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ut,s.TEXTURE_2D,Pt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ht.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&c){let _=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[_])}}}function Ie(C){return Math.min(n.maxSamples,C.samples)}function ze(C){let _=i.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function U(C){let _=a.render.frame;h.get(C)!==_&&(h.set(C,_),C.update())}function ei(C,_){let z=C.colorSpace,$=C.format,J=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||z!==xs&&z!==Ln&&(jt.getTransfer(z)===de?($!==mi||J!==wi)&&Ut("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Bt("WebGLTextures: Unsupported texture color space:",z)),_}function me(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=K,this.resetTextureUnits=H,this.getTextureUnits=L,this.setTextureUnits=V,this.setTexture2D=j,this.setTexture2DArray=X,this.setTexture3D=et,this.setTextureCube=nt,this.rebindTextures=te,this.setupRenderTarget=pe,this.updateRenderTargetMipmap=ne,this.updateMultisampleRenderTarget=bi,this.setupDepthRenderbuffer=Wt,this.setupFrameBufferTexture=ot,this.useMultisampledRTT=ze,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function lb(s,t){function e(i,n=Ln){let r,a=jt.getTransfer(n);if(i===wi)return s.UNSIGNED_BYTE;if(i===qo)return s.UNSIGNED_SHORT_4_4_4_4;if(i===Yo)return s.UNSIGNED_SHORT_5_5_5_1;if(i===Oh)return s.UNSIGNED_INT_5_9_9_9_REV;if(i===Uh)return s.UNSIGNED_INT_10F_11F_11F_REV;if(i===Dh)return s.BYTE;if(i===kh)return s.SHORT;if(i===vr)return s.UNSIGNED_SHORT;if(i===Xo)return s.INT;if(i===Qi)return s.UNSIGNED_INT;if(i===pi)return s.FLOAT;if(i===tn)return s.HALF_FLOAT;if(i===Fh)return s.ALPHA;if(i===Bh)return s.RGB;if(i===mi)return s.RGBA;if(i===fn)return s.DEPTH_COMPONENT;if(i===es)return s.DEPTH_STENCIL;if(i===Ko)return s.RED;if(i===Zo)return s.RED_INTEGER;if(i===is)return s.RG;if(i===Jo)return s.RG_INTEGER;if(i===jo)return s.RGBA_INTEGER;if(i===da||i===fa||i===pa||i===ma)if(a===de)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===da)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===fa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===pa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===da)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===fa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===pa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ma)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Qo||i===tl||i===el||i===il)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Qo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===tl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===el)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===il)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===nl||i===sl||i===rl||i===al||i===ol||i===ga||i===ll)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===nl||i===sl)return a===de?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===rl)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===al)return r.COMPRESSED_R11_EAC;if(i===ol)return r.COMPRESSED_SIGNED_R11_EAC;if(i===ga)return r.COMPRESSED_RG11_EAC;if(i===ll)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===cl||i===hl||i===ul||i===dl||i===fl||i===pl||i===ml||i===gl||i===xl||i===vl||i===yl||i===bl||i===_l||i===Ml)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===cl)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===hl)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ul)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===dl)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===fl)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===pl)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ml)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===gl)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===xl)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===vl)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===yl)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===bl)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===_l)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ml)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Sl||i===wl||i===El)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Sl)return a===de?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===wl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===El)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Tl||i===Al||i===xa||i===Rl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Tl)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Al)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===xa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Rl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===yr?s.UNSIGNED_INT_24_8:s[i]!==void 0?s[i]:null}return{convert:e}}var cb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,hb=`
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

}`,du=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new ta(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new Oe({vertexShader:cb,fragmentShader:hb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ce(new Oi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},fu=class extends pn{constructor(t,e){super();let i=this,n=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,g=null,x=typeof XRWebGLBinding<"u",m=new du,p={},v=e.getContextAttributes(),S=null,y=null,E=[],M=[],A=new Xt,b=null,T=null,R=new ri;R.viewport=new be;let P=new ri;P.viewport=new be;let D=[R,P],H=new Ho,L=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(I){let Y=E[I];return Y===void 0&&(Y=new ur,E[I]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(I){let Y=E[I];return Y===void 0&&(Y=new ur,E[I]=Y),Y.getGripSpace()},this.getHand=function(I){let Y=E[I];return Y===void 0&&(Y=new ur,E[I]=Y),Y.getHandSpace()};function K(I){let Y=M.indexOf(I.inputSource);if(Y===-1)return;let at=E[Y];at!==void 0&&(at.update(I.inputSource,I.frame,l||a),at.dispatchEvent({type:I.type,data:I.inputSource}))}function Z(){n.removeEventListener("select",K),n.removeEventListener("selectstart",K),n.removeEventListener("selectend",K),n.removeEventListener("squeeze",K),n.removeEventListener("squeezestart",K),n.removeEventListener("squeezeend",K),n.removeEventListener("end",Z),n.removeEventListener("inputsourceschange",j);for(let I=0;I<E.length;I++){let Y=M[I];Y!==null&&(M[I]=null,E[I].disconnect(Y))}L=null,V=null,m.reset();for(let I in p)delete p[I];if(t.setRenderTarget(S),f=null,u=null,d=null,n=null,y=null,rt.stop(),i.isPresenting=!1,t.setPixelRatio(b),t.setSize(A.width,A.height,!1),T!==null){let I=T.camera;I.fov=T.fov,I.zoom=T.zoom,I.updateProjectionMatrix(),T=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(I){r=I,i.isPresenting===!0&&Ut("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(I){o=I,i.isPresenting===!0&&Ut("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(I){l=I},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(n,e)),d},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(I){if(n=I,n!==null){if(S=t.getRenderTarget(),n.addEventListener("select",K),n.addEventListener("selectstart",K),n.addEventListener("selectend",K),n.addEventListener("squeeze",K),n.addEventListener("squeezestart",K),n.addEventListener("squeezeend",K),n.addEventListener("end",Z),n.addEventListener("inputsourceschange",j),v.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(A),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let at=null,yt=null,ot=null;v.depth&&(ot=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,at=v.stencil?es:fn,yt=v.stencil?yr:Qi);let Ct={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Ct),n.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),y=new ai(u.textureWidth,u.textureHeight,{format:mi,type:wi,depthTexture:new Yn(u.textureWidth,u.textureHeight,yt,void 0,void 0,void 0,void 0,void 0,void 0,at),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let at={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(n,e,at),n.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new ai(f.framebufferWidth,f.framebufferHeight,{format:mi,type:wi,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await n.requestReferenceSpace(o),rt.setContext(n),rt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function j(I){for(let Y=0;Y<I.removed.length;Y++){let at=I.removed[Y],yt=M.indexOf(at);yt>=0&&(M[yt]=null,E[yt].disconnect(at))}for(let Y=0;Y<I.added.length;Y++){let at=I.added[Y],yt=M.indexOf(at);if(yt===-1){for(let Ct=0;Ct<E.length;Ct++)if(Ct>=M.length){M.push(at),yt=Ct;break}else if(M[Ct]===null){M[Ct]=at,yt=Ct;break}if(yt===-1)break}let ot=E[yt];ot&&ot.connect(at)}}let X=new N,et=new N;function nt(I,Y,at){X.setFromMatrixPosition(Y.matrixWorld),et.setFromMatrixPosition(at.matrixWorld);let yt=X.distanceTo(et),ot=Y.projectionMatrix.elements,Ct=at.projectionMatrix.elements,ve=ot[14]/(ot[10]-1),Wt=ot[14]/(ot[10]+1),te=(ot[9]+1)/ot[5],pe=(ot[9]-1)/ot[5],ne=(ot[8]-1)/ot[0],Re=(Ct[8]+1)/Ct[0],qe=ve*ne,bi=ve*Re,Ie=yt/(-ne+Re),ze=Ie*-ne;if(Y.matrixWorld.decompose(I.position,I.quaternion,I.scale),I.translateX(ze),I.translateZ(Ie),I.matrixWorld.compose(I.position,I.quaternion,I.scale),I.matrixWorldInverse.copy(I.matrixWorld).invert(),ot[10]===-1)I.projectionMatrix.copy(Y.projectionMatrix),I.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{let U=ve+Ie,ei=Wt+Ie,me=qe-ze,C=bi+(yt-ze),_=te*Wt/ei*U,z=pe*Wt/ei*U;I.projectionMatrix.makePerspective(me,C,_,z,U,ei),I.projectionMatrixInverse.copy(I.projectionMatrix).invert()}}function Lt(I,Y){Y===null?I.matrixWorld.copy(I.matrix):I.matrixWorld.multiplyMatrices(Y.matrixWorld,I.matrix),I.matrixWorldInverse.copy(I.matrixWorld).invert()}this.updateCamera=function(I){if(n===null)return;let Y=I.near,at=I.far;m.texture!==null&&(m.depthNear>0&&(Y=m.depthNear),m.depthFar>0&&(at=m.depthFar)),H.near=P.near=R.near=Y,H.far=P.far=R.far=at,(L!==H.near||V!==H.far)&&(n.updateRenderState({depthNear:H.near,depthFar:H.far}),L=H.near,V=H.far),H.layers.mask=I.layers.mask|6,R.layers.mask=H.layers.mask&-5,P.layers.mask=H.layers.mask&-3;let yt=I.parent,ot=H.cameras;Lt(H,yt);for(let Ct=0;Ct<ot.length;Ct++)Lt(ot[Ct],yt);ot.length===2?nt(H,R,P):H.projectionMatrix.copy(R.projectionMatrix),T===null&&I.isPerspectiveCamera&&(T={camera:I,fov:I.fov,zoom:I.zoom}),At(I,H,yt)};function At(I,Y,at){at===null?I.matrix.copy(Y.matrixWorld):(I.matrix.copy(at.matrixWorld),I.matrix.invert(),I.matrix.multiply(Y.matrixWorld)),I.matrix.decompose(I.position,I.quaternion,I.scale),I.updateMatrixWorld(!0),I.projectionMatrix.copy(Y.projectionMatrix),I.projectionMatrixInverse.copy(Y.projectionMatrixInverse),I.isPerspectiveCamera&&(I.fov=yo*2*Math.atan(1/I.projectionMatrix.elements[5]),I.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(I){c=I,u!==null&&(u.fixedFoveation=I),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=I)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(H)},this.getCameraTexture=function(I){return p[I]};let oe=null;function ie(I,Y){if(h=Y.getViewerPose(l||a),g=Y,h!==null){let at=h.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let yt=!1;at.length!==H.cameras.length&&(H.cameras.length=0,yt=!0);for(let Wt=0;Wt<at.length;Wt++){let te=at[Wt],pe=null;if(f!==null)pe=f.getViewport(te);else{let Re=d.getViewSubImage(u,te);pe=Re.viewport,Wt===0&&(t.setRenderTargetTextures(y,Re.colorTexture,Re.depthStencilTexture),t.setRenderTarget(y))}let ne=D[Wt];ne===void 0&&(ne=new ri,ne.layers.enable(Wt),ne.viewport=new be,D[Wt]=ne),ne.matrix.fromArray(te.transform.matrix),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale),ne.projectionMatrix.fromArray(te.projectionMatrix),ne.projectionMatrixInverse.copy(ne.projectionMatrix).invert(),ne.viewport.set(pe.x,pe.y,pe.width,pe.height),Wt===0&&(H.matrix.copy(ne.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),yt===!0&&H.cameras.push(ne)}let ot=n.enabledFeatures;if(ot&&ot.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&x){d=i.getBinding();let Wt=d.getDepthInformation(at[0]);Wt&&Wt.isValid&&Wt.texture&&m.init(Wt,n.renderState)}if(ot&&ot.includes("camera-access")&&x){t.state.unbindTexture(),d=i.getBinding();for(let Wt=0;Wt<at.length;Wt++){let te=at[Wt].camera;if(te){let pe=p[te];pe||(pe=new ta,p[te]=pe);let ne=d.getCameraImage(te);pe.sourceTexture=ne}}}}for(let at=0;at<E.length;at++){let yt=M[at],ot=E[at];yt!==null&&ot!==void 0&&ot.update(yt,Y,l||a)}oe&&oe(I,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),g=null}let rt=new Yf;rt.setAnimationLoop(ie),this.setAnimationLoop=function(I){oe=I},this.dispose=function(){}}},ub=new Gt,tp=new Ht;tp.set(-1,0,0,0,1,0,0,0,1);function db(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Wh(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function n(m,p,v,S,y){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,v,S):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Je&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Je&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let v=t.get(p),S=v.envMap,y=v.envMapRotation;S&&(m.envMap.value=S,m.envMapRotation.value.setFromMatrix4(ub.makeRotationFromEuler(y)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(tp),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,v,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=S*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Je&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let v=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function fb(s,t,e,i){let n={},r={},a=[],o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,E){let M=E.program;i.uniformBlockBinding(y,M)}function l(y,E){let M=n[y.id];M===void 0&&(m(y),M=h(y),n[y.id]=M,y.addEventListener("dispose",v));let A=E.program;i.updateUBOMapping(y,A);let b=t.render.frame;r[y.id]!==b&&(u(y),r[y.id]=b)}function h(y){let E=d();y.__bindingPointIndex=E;let M=s.createBuffer(),A=y.__size,b=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,M),s.bufferData(s.UNIFORM_BUFFER,A,b),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,E,M),M}function d(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return Bt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){let E=n[y.id],M=y.uniforms,A=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,E);for(let b=0,T=M.length;b<T;b++){let R=M[b];if(Array.isArray(R))for(let P=0,D=R.length;P<D;P++)f(R[P],b,P,A);else f(R,b,0,A)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(y,E,M,A){if(x(y,E,M,A)===!0){let b=y.__offset,T=y.value;if(Array.isArray(T)){let R=0;for(let P=0;P<T.length;P++){let D=T[P],H=p(D);g(D,y.__data,R),typeof D!="number"&&typeof D!="boolean"&&!D.isMatrix3&&!ArrayBuffer.isView(D)&&(R+=H.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(T,y.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,b,y.__data)}}function g(y,E,M){typeof y=="number"||typeof y=="boolean"?E[0]=y:y.isMatrix3?(E[0]=y.elements[0],E[1]=y.elements[1],E[2]=y.elements[2],E[3]=0,E[4]=y.elements[3],E[5]=y.elements[4],E[6]=y.elements[5],E[7]=0,E[8]=y.elements[6],E[9]=y.elements[7],E[10]=y.elements[8],E[11]=0):ArrayBuffer.isView(y)?E.set(new y.constructor(y.buffer,y.byteOffset,E.length)):y.toArray(E,M)}function x(y,E,M,A){let b=y.value,T=E+"_"+M;if(A[T]===void 0)return typeof b=="number"||typeof b=="boolean"?A[T]=b:ArrayBuffer.isView(b)?A[T]=b.slice():A[T]=b.clone(),!0;{let R=A[T];if(typeof b=="number"||typeof b=="boolean"){if(R!==b)return A[T]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(R.equals(b)===!1)return R.copy(b),!0}}return!1}function m(y){let E=y.uniforms,M=0,A=16;for(let T=0,R=E.length;T<R;T++){let P=Array.isArray(E[T])?E[T]:[E[T]];for(let D=0,H=P.length;D<H;D++){let L=P[D],V=Array.isArray(L.value)?L.value:[L.value];for(let K=0,Z=V.length;K<Z;K++){let j=V[K],X=p(j),et=M%A,nt=et%X.boundary,Lt=et+nt;M+=nt,Lt!==0&&A-Lt<X.storage&&(M+=A-Lt),L.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=M,M+=X.storage}}}let b=M%A;return b>0&&(M+=A-b),y.__size=M,y.__cache={},this}function p(y){let E={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(E.boundary=4,E.storage=4):y.isVector2?(E.boundary=8,E.storage=8):y.isVector3||y.isColor?(E.boundary=16,E.storage=12):y.isVector4?(E.boundary=16,E.storage=16):y.isMatrix3?(E.boundary=48,E.storage=48):y.isMatrix4?(E.boundary=64,E.storage=64):y.isTexture?Ut("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(E.boundary=16,E.storage=y.byteLength):Ut("WebGLRenderer: Unsupported uniform value type.",y),E}function v(y){let E=y.target;E.removeEventListener("dispose",v);let M=a.indexOf(E.__bindingPointIndex);a.splice(M,1),s.deleteBuffer(n[E.id]),delete n[E.id],delete r[E.id]}function S(){for(let y in n)s.deleteBuffer(n[y]);a=[],n={},r={}}return{bind:c,update:l,dispose:S}}var pb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),yn=null;function mb(){return yn===null&&(yn=new qn(pb,16,16,is,tn),yn.name="DFG_LUT",yn.minFilter=Ze,yn.magFilter=Ze,yn.wrapS=dn,yn.wrapT=dn,yn.generateMipmaps=!1,yn.needsUpdate=!0),yn}var kl=class{constructor(t={}){let{canvas:e=bf(),context:i=null,depth:n=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=wi}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;let x=f,m=new Set([jo,Jo,Zo]),p=new Set([wi,Qi,vr,yr,qo,Yo]),v=new Uint32Array(4),S=new Int32Array(4),y=new N,E=null,M=null,A=[],b=[],T=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ji,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,P=!1,D=null,H=null,L=null,V=null;this._outputColorSpace=Ai;let K=0,Z=0,j=null,X=-1,et=null,nt=new be,Lt=new be,At=null,oe=new qt(0),ie=0,rt=e.width,I=e.height,Y=1,at=null,yt=null,ot=new be(0,0,rt,I),Ct=new be(0,0,rt,I),ve=!1,Wt=new fr,te=!1,pe=!1,ne=new Gt,Re=new N,qe=new be,bi={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ie=!1;function ze(){return j===null?Y:1}let U=i;function ei(w,k){return e.getContext(w,k)}let me,C,_,z,$,J,lt,ht,Q,it,ut,Pt,mt,dt,It,kt,$t,O,ft,tt,pt,vt,st;try{let w={alpha:!0,depth:n,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",Me,!1),e.addEventListener("webglcontextrestored",he,!1),e.addEventListener("webglcontextcreationerror",Xi,!1),U===null){let k="webgl2";if(U=ei(k,w),U===null)throw ei(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Nt()}catch(w){throw e.removeEventListener("webglcontextlost",Me,!1),e.removeEventListener("webglcontextrestored",he,!1),e.removeEventListener("webglcontextcreationerror",Xi,!1),Bt("WebGLRenderer: "+w.message),w}function Nt(){me=new Mv(U),me.init(),pt=new lb(U,me),C=new dv(U,me,t,pt),_=new ab(U,me),C.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),H=U.createFramebuffer(),L=U.createFramebuffer(),V=U.createFramebuffer(),z=new Ev(U),$=new Xy,J=new ob(U,me,_,$,C,pt,z),lt=new _v(R),ht=new A0(U),vt=new hv(U,ht),Q=new Sv(U,ht,z,vt),it=new Av(U,Q,ht,vt,z),O=new Tv(U,C,J),It=new fv($),ut=new $y(R,lt,me,C,vt,It),Pt=new db(R,$),mt=new Yy,dt=new tb(me),$t=new cv(R,lt,_,it,g,c),kt=new rb(R,it,C),st=new fb(U,z,C,_),ft=new uv(U,me,z),tt=new wv(U,me,z),z.programs=ut.programs,R.capabilities=C,R.extensions=me,R.properties=$,R.renderLists=mt,R.shadowMap=kt,R.state=_,R.info=z}x!==wi&&(T=new Cv(x,e.width,e.height,o,n,r));let Tt=new fu(R,U);this.xr=Tt,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let w=me.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=me.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(w){w!==void 0&&(Y=w,this.setSize(rt,I,!1))},this.getSize=function(w){return w.set(rt,I)},this.setSize=function(w,k,q=!0){if(Tt.isPresenting){Ut("WebGLRenderer: Can't change size while VR device is presenting.");return}rt=w,I=k,e.width=Math.floor(w*Y),e.height=Math.floor(k*Y),q===!0&&(e.style.width=w+"px",e.style.height=k+"px"),T!==null&&T.setSize(e.width,e.height),this.setViewport(0,0,w,k)},this.getDrawingBufferSize=function(w){return w.set(rt*Y,I*Y).floor()},this.setDrawingBufferSize=function(w,k,q){rt=w,I=k,Y=q,e.width=Math.floor(w*q),e.height=Math.floor(k*q),this.setViewport(0,0,w,k)},this.setEffects=function(w){if(x===wi){Bt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let k=0;k<w.length;k++)if(w[k].isOutputPass===!0){Ut("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(nt)},this.getViewport=function(w){return w.copy(ot)},this.setViewport=function(w,k,q,G){w.isVector4?ot.set(w.x,w.y,w.z,w.w):ot.set(w,k,q,G),_.viewport(nt.copy(ot).multiplyScalar(Y).round())},this.getScissor=function(w){return w.copy(Ct)},this.setScissor=function(w,k,q,G){w.isVector4?Ct.set(w.x,w.y,w.z,w.w):Ct.set(w,k,q,G),_.scissor(Lt.copy(Ct).multiplyScalar(Y).round())},this.getScissorTest=function(){return ve},this.setScissorTest=function(w){_.setScissorTest(ve=w)},this.setOpaqueSort=function(w){at=w},this.setTransparentSort=function(w){yt=w},this.getClearColor=function(w){return w.copy($t.getClearColor())},this.setClearColor=function(){$t.setClearColor(...arguments)},this.getClearAlpha=function(){return $t.getClearAlpha()},this.setClearAlpha=function(){$t.setClearAlpha(...arguments)},this.clear=function(w=!0,k=!0,q=!0){let G=0;if(w){let W=!1;if(j!==null){let xt=j.texture.format;W=m.has(xt)}if(W){let xt=j.texture.type,_t=p.has(xt),gt=$t.getClearColor(),St=$t.getClearAlpha(),Rt=gt.r,Yt=gt.g,ee=gt.b;_t?(v[0]=Rt,v[1]=Yt,v[2]=ee,v[3]=St,U.clearBufferuiv(U.COLOR,0,v)):(S[0]=Rt,S[1]=Yt,S[2]=ee,S[3]=St,U.clearBufferiv(U.COLOR,0,S))}else G|=U.COLOR_BUFFER_BIT}k&&(G|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(G|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&U.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),D=w},this.dispose=function(){e.removeEventListener("webglcontextlost",Me,!1),e.removeEventListener("webglcontextrestored",he,!1),e.removeEventListener("webglcontextcreationerror",Xi,!1),$t.dispose(),mt.dispose(),dt.dispose(),$.dispose(),lt.dispose(),it.dispose(),vt.dispose(),st.dispose(),ut.dispose(),Tt.dispose(),Tt.removeEventListener("sessionstart",ad),Tt.removeEventListener("sessionend",od),us.stop()};function Me(w){w.preventDefault(),Gh("WebGLRenderer: Context Lost."),P=!0}function he(){Gh("WebGLRenderer: Context Restored."),P=!1;let w=z.autoReset,k=kt.enabled,q=kt.autoUpdate,G=kt.needsUpdate,W=kt.type;Nt(),z.autoReset=w,kt.enabled=k,kt.autoUpdate=q,kt.needsUpdate=G,kt.type=W}function Xi(w){Bt("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function cn(w){let k=w.target;k.removeEventListener("dispose",cn),Om(k)}function Om(w){Um(w),$.remove(w)}function Um(w){let k=$.get(w).programs;k!==void 0&&(k.forEach(function(q){ut.releaseProgram(q)}),w.isShaderMaterial&&ut.releaseShaderCache(w))}this.renderBufferDirect=function(w,k,q,G,W,xt){k===null&&(k=bi);let _t=W.isMesh&&W.matrixWorld.determinantAffine()<0,gt=zm(w,k,q,G,W);_.setMaterial(G,_t);let St=q.index,Rt=1;if(G.wireframe===!0){if(St=Q.getWireframeAttribute(q),St===void 0)return;Rt=2}let Yt=q.drawRange,ee=q.attributes.position,wt=Yt.start*Rt,ue=(Yt.start+Yt.count)*Rt;xt!==null&&(wt=Math.max(wt,xt.start*Rt),ue=Math.min(ue,(xt.start+xt.count)*Rt)),St!==null?(wt=Math.max(wt,0),ue=Math.min(ue,St.count)):ee!=null&&(wt=Math.max(wt,0),ue=Math.min(ue,ee.count));let He=ue-wt;if(He<0||He===1/0)return;vt.setup(W,G,gt,q,St);let Ee,ye=ft;if(St!==null&&(Ee=ht.get(St),ye=tt,ye.setIndex(Ee)),W.isMesh)G.wireframe===!0?(_.setLineWidth(G.wireframeLinewidth*ze()),ye.setMode(U.LINES)):ye.setMode(U.TRIANGLES);else if(W.isLine){let ii=G.linewidth;ii===void 0&&(ii=1),_.setLineWidth(ii*ze()),W.isLineSegments?ye.setMode(U.LINES):W.isLineLoop?ye.setMode(U.LINE_LOOP):ye.setMode(U.LINE_STRIP)}else W.isPoints?ye.setMode(U.POINTS):W.isSprite&&ye.setMode(U.TRIANGLES);if(W.isBatchedMesh)if(me.get("WEBGL_multi_draw"))ye.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{let ii=W._multiDrawStarts,bt=W._multiDrawCounts,ui=W._multiDrawCount,le=St?ht.get(St).bytesPerElement:1,Di=$.get(G).currentProgram.getUniforms();for(let hn=0;hn<ui;hn++)Di.setValue(U,"_gl_DrawID",hn),ye.render(ii[hn]/le,bt[hn])}else if(W.isInstancedMesh)ye.renderInstances(wt,He,W.count);else if(q.isInstancedBufferGeometry){let ii=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,bt=Math.min(q.instanceCount,ii);ye.renderInstances(wt,He,bt)}else ye.render(wt,He)};function rd(w,k,q,G){D!==null&&w.isNodeMaterial&&D.setObject(G,w),te===!0&&It.setState(w,q,!1),w.transparent===!0&&w.side===Ui&&w.forceSinglePass===!1?(w.side=Je,w.needsUpdate=!0,Ba(w,k,G),w.side=xn,w.needsUpdate=!0,Ba(w,k,G),w.side=Ui):Ba(w,k,G)}this.compile=function(w,k,q=null){q===null&&(q=w),D!==null&&D.renderStart(w,k,q),M=dt.get(q),M.init(k),b.push(M),q.traverseVisible(function(W){W.isLight&&W.layers.test(k.layers)&&(M.pushLight(W),W.castShadow&&M.pushShadow(W))}),w!==q&&w.traverseVisible(function(W){W.isLight&&W.layers.test(k.layers)&&(M.pushLight(W),W.castShadow&&M.pushShadow(W))}),M.setupLights(),D!==null&&D.updateLights(M.state.lightsArray),pe=this.localClippingEnabled,te=It.init(this.clippingPlanes,pe),te===!0&&It.setGlobalState(this.clippingPlanes,k),D!==null&&kt.render(M.state.shadowsArray,q,k);let G=new Set;return w.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;let xt=W.material;if(xt)if(Array.isArray(xt))for(let _t=0;_t<xt.length;_t++){let gt=xt[_t];rd(gt,q,k,W),G.add(gt)}else rd(xt,q,k,W),G.add(xt)}),M=b.pop(),D!==null&&D.renderEnd(),G},this.compileAsync=function(w,k,q=null){let G=this.compile(w,k,q);return new Promise(W=>{function xt(){if(G.forEach(function(_t){let St=$.get(_t).currentProgram;(St===void 0||St.isReady())&&G.delete(_t)}),G.size===0){W(w);return}setTimeout(xt,10)}me.get("KHR_parallel_shader_compile")!==null?xt():setTimeout(xt,10)})};let zc=null;function Fm(w){zc&&zc(w)}function ad(){us.stop()}function od(){us.start()}let us=new Yf;us.setAnimationLoop(Fm),typeof self<"u"&&us.setContext(self),this.setAnimationLoop=function(w){zc=w,Tt.setAnimationLoop(w),w===null?us.stop():us.start()},Tt.addEventListener("sessionstart",ad),Tt.addEventListener("sessionend",od),this.render=function(w,k){if(k!==void 0&&k.isCamera!==!0){Bt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;D!==null&&D.renderStart(w,k);let q=Tt.enabled===!0&&Tt.isPresenting===!0,G=T!==null&&(j===null||q)&&T.begin(R,j);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Tt.enabled===!0&&Tt.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Tt.cameraAutoUpdate===!0&&Tt.updateCamera(k),k=Tt.getCamera()),w.isScene===!0&&w.onBeforeRender(R,w,k,j),M=dt.get(w,b.length),M.init(k),M.state.textureUnits=J.getTextureUnits(),b.push(M),ne.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Wt.setFromProjectionMatrix(ne,Ji,k.reversedDepth),pe=this.localClippingEnabled,te=It.init(this.clippingPlanes,pe),E=mt.get(w,A.length),E.init(),A.push(E),Tt.enabled===!0&&Tt.isPresenting===!0){let _t=R.xr.getDepthSensingMesh();_t!==null&&Hc(_t,k,-1/0,R.sortObjects)}Hc(w,k,0,R.sortObjects),E.finish(),D!==null&&D.updateLights(M.state.lightsArray),R.sortObjects===!0&&E.sort(at,yt),Ie=Tt.enabled===!1||Tt.isPresenting===!1||Tt.hasDepthSensing()===!1,Ie&&$t.addToRenderList(E,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),te===!0&&It.beginShadows();let W=M.state.shadowsArray;if(kt.render(W,w,k),te===!0&&It.endShadows(),(G&&T.hasRenderPass())===!1){let _t=E.opaque,gt=E.transmissive;if(M.setupLights(),k.isArrayCamera){let St=k.cameras;if(gt.length>0)for(let Rt=0,Yt=St.length;Rt<Yt;Rt++){let ee=St[Rt];cd(_t,gt,w,ee)}Ie&&$t.render(w);for(let Rt=0,Yt=St.length;Rt<Yt;Rt++){let ee=St[Rt];ld(E,w,ee,ee.viewport)}}else gt.length>0&&cd(_t,gt,w,k),Ie&&$t.render(w),ld(E,w,k)}j!==null&&Z===0&&(J.updateMultisampleRenderTarget(j),J.updateRenderTargetMipmap(j)),G&&T.end(R),w.isScene===!0&&w.onAfterRender(R,w,k),vt.resetDefaultState(),X=-1,et=null,b.pop(),b.length>0?(M=b[b.length-1],J.setTextureUnits(M.state.textureUnits),te===!0&&It.setGlobalState(R.clippingPlanes,M.state.camera)):M=null,A.pop(),A.length>0?E=A[A.length-1]:E=null,D!==null&&D.renderEnd()};function Hc(w,k,q,G){if(w.visible===!1)return;if(w.layers.test(k.layers)){if(w.isGroup)q=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(k);else if(w.isLightProbeGrid)M.pushLightProbeGrid(w);else if(w.isLight)M.pushLight(w),w.castShadow&&M.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(Wt)){G&&qe.setFromMatrixPosition(w.matrixWorld).applyMatrix4(ne);let _t=it.update(w),gt=w.material;gt.visible&&E.push(w,_t,gt,q,qe.z,null,k)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(Wt))){let _t=it.update(w),gt=w.material;if(G&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),qe.copy(w.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),qe.copy(_t.boundingSphere.center)),qe.applyMatrix4(w.matrixWorld).applyMatrix4(ne)),Array.isArray(gt)){let St=_t.groups;for(let Rt=0,Yt=St.length;Rt<Yt;Rt++){let ee=St[Rt],wt=gt[ee.materialIndex];wt&&wt.visible&&E.push(w,_t,wt,q,qe.z,ee,k)}}else gt.visible&&E.push(w,_t,gt,q,qe.z,null,k)}}let xt=w.children;for(let _t=0,gt=xt.length;_t<gt;_t++)Hc(xt[_t],k,q,G)}function ld(w,k,q,G){let{opaque:W,transmissive:xt,transparent:_t}=w;M.setupLightsView(q),te===!0&&It.setGlobalState(R.clippingPlanes,q),G&&_.viewport(nt.copy(G)),W.length>0&&Fa(W,k,q),xt.length>0&&Fa(xt,k,q),_t.length>0&&Fa(_t,k,q),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function cd(w,k,q,G){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[G.id]===void 0){let wt=me.has("EXT_color_buffer_half_float")||me.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[G.id]=new ai(1,1,{generateMipmaps:!0,type:wt?tn:wi,minFilter:ts,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:jt.workingColorSpace})}let xt=M.state.transmissionRenderTarget[G.id],_t=G.viewport||nt;xt.setSize(_t.z*R.transmissionResolutionScale,_t.w*R.transmissionResolutionScale);let gt=R.getRenderTarget(),St=R.getActiveCubeFace(),Rt=R.getActiveMipmapLevel();R.setRenderTarget(xt),R.getClearColor(oe),ie=R.getClearAlpha(),ie<1&&R.setClearColor(16777215,.5),R.clear(),Ie&&$t.render(q);let Yt=R.toneMapping;R.toneMapping=ji;let ee=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),M.setupLightsView(G),te===!0&&It.setGlobalState(R.clippingPlanes,G),Fa(w,q,G),J.updateMultisampleRenderTarget(xt),J.updateRenderTargetMipmap(xt),me.has("WEBGL_multisampled_render_to_texture")===!1){let wt=!1;for(let ue=0,He=k.length;ue<He;ue++){let Ee=k[ue],{object:ye,geometry:ii,material:bt,group:ui}=Ee;if(bt.side===Ui&&ye.layers.test(G.layers)){let le=bt.side;bt.side=Je,bt.needsUpdate=!0,hd(ye,q,G,ii,bt,ui),bt.side=le,bt.needsUpdate=!0,wt=!0}}wt===!0&&(J.updateMultisampleRenderTarget(xt),J.updateRenderTargetMipmap(xt))}R.setRenderTarget(gt,St,Rt),R.setClearColor(oe,ie),ee!==void 0&&(G.viewport=ee),R.toneMapping=Yt}function Fa(w,k,q){let G=k.isScene===!0?k.overrideMaterial:null;for(let W=0,xt=w.length;W<xt;W++){let _t=w[W],{object:gt,geometry:St,group:Rt}=_t,Yt=_t.material;Yt.allowOverride===!0&&G!==null&&(Yt=G),gt.layers.test(q.layers)&&hd(gt,k,q,St,Yt,Rt)}}function hd(w,k,q,G,W,xt){D!==null&&W.isNodeMaterial&&D.setObject(w,W),w.onBeforeRender(R,k,q,G,W,xt),w.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),W.onBeforeRender(R,k,q,G,w,xt),W.transparent===!0&&W.side===Ui&&W.forceSinglePass===!1?(W.side=Je,W.needsUpdate=!0,R.renderBufferDirect(q,k,G,W,w,xt),W.side=xn,W.needsUpdate=!0,R.renderBufferDirect(q,k,G,W,w,xt),W.side=Ui):R.renderBufferDirect(q,k,G,W,w,xt),w.onAfterRender(R,k,q,G,W,xt)}function Ba(w,k,q){k.isScene!==!0&&(k=bi);let G=$.get(w),W=M.state.lights,xt=M.state.shadowsArray,_t=W.state.version,gt=ut.getParameters(w,W.state,xt,k,q,M.state.lightProbeGridArray),St=ut.getProgramCacheKey(gt),Rt=G.programs;G.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?k.environment:null,G.fog=k.fog;let Yt=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;G.envMap=lt.get(w.envMap||G.environment,Yt),G.envMapRotation=G.environment!==null&&w.envMap===null?k.environmentRotation:w.envMapRotation,Rt===void 0&&(w.addEventListener("dispose",cn),Rt=new Map,G.programs=Rt);let ee=Rt.get(St);if(ee!==void 0){if(G.currentProgram===ee&&G.lightsStateVersion===_t)return dd(w,gt),ee}else gt.uniforms=ut.getUniforms(w),D!==null&&w.isNodeMaterial&&D.build(w,q,gt),w.onBeforeCompile(gt,R),ee=ut.acquireProgram(gt,St),Rt.set(St,ee),G.uniforms=gt.uniforms;let wt=G.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(wt.clippingPlanes=It.uniform),dd(w,gt),G.needsLights=Vm(w),G.lightsStateVersion=_t,G.needsLights&&(wt.ambientLightColor.value=W.state.ambient,wt.lightProbe.value=W.state.probe,wt.sunLights.value=W.state.sun,wt.sunLightShadows.value=W.state.sunShadow,wt.directionalLights.value=W.state.directional,wt.directionalLightShadows.value=W.state.directionalShadow,wt.spotLights.value=W.state.spot,wt.spotLightShadows.value=W.state.spotShadow,wt.rectAreaLights.value=W.state.rectArea,wt.ltc_1.value=W.state.rectAreaLTC1,wt.ltc_2.value=W.state.rectAreaLTC2,wt.pointLights.value=W.state.point,wt.pointLightShadows.value=W.state.pointShadow,wt.hemisphereLights.value=W.state.hemi,wt.sunShadowMatrix.value=W.state.sunShadowMatrix,wt.sunShadowCascade.value=W.state.sunShadowCascade,wt.directionalShadowMatrix.value=W.state.directionalShadowMatrix,wt.spotLightMatrix.value=W.state.spotLightMatrix,wt.spotLightMap.value=W.state.spotLightMap,wt.pointShadowMatrix.value=W.state.pointShadowMatrix),G.lightProbeGrid=M.state.lightProbeGridArray.length>0,G.currentProgram=ee,G.uniformsList=null,ee}function ud(w){if(w.uniformsList===null){let k=w.currentProgram.getUniforms();w.uniformsList=Mr.seqWithValue(k.seq,w.uniforms)}return w.uniformsList}function dd(w,k){let q=$.get(w);q.outputColorSpace=k.outputColorSpace,q.batching=k.batching,q.batchingColor=k.batchingColor,q.instancing=k.instancing,q.instancingColor=k.instancingColor,q.instancingMorph=k.instancingMorph,q.skinning=k.skinning,q.morphTargets=k.morphTargets,q.morphNormals=k.morphNormals,q.morphColors=k.morphColors,q.morphTargetsCount=k.morphTargetsCount,q.numClippingPlanes=k.numClippingPlanes,q.numIntersection=k.numClipIntersection,q.vertexAlphas=k.vertexAlphas,q.vertexTangents=k.vertexTangents,q.toneMapping=k.toneMapping}function Bm(w,k){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;y.setFromMatrixPosition(k.matrixWorld);for(let q=0,G=w.length;q<G;q++){let W=w[q];if(W.texture!==null&&W.boundingBox.containsPoint(y))return W}return null}function zm(w,k,q,G,W){k.isScene!==!0&&(k=bi),J.resetTextureUnits();let xt=k.fog,_t=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?k.environment:null,gt=j===null?R.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:jt.workingColorSpace,St=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Rt=lt.get(G.envMap||_t,St),Yt=G.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,ee=!!q.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),wt=!!q.morphAttributes.position,ue=!!q.morphAttributes.normal,He=!!q.morphAttributes.color,Ee=ji;G.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ee=R.toneMapping);let ye=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,ii=ye!==void 0?ye.length:0,bt=$.get(G),ui=M.state.lights;if(te===!0&&(pe===!0||w!==et)){let Se=w===et&&G.id===X;It.setState(G,w,Se)}let le=!1;G.version===bt.__version?(bt.needsLights&&bt.lightsStateVersion!==ui.state.version||bt.outputColorSpace!==gt||W.isBatchedMesh&&bt.batching===!1||!W.isBatchedMesh&&bt.batching===!0||W.isBatchedMesh&&bt.batchingColor===!0&&W._colorsTexture===null||W.isBatchedMesh&&bt.batchingColor===!1&&W._colorsTexture!==null||W.isInstancedMesh&&bt.instancing===!1||!W.isInstancedMesh&&bt.instancing===!0||W.isSkinnedMesh&&bt.skinning===!1||!W.isSkinnedMesh&&bt.skinning===!0||W.isInstancedMesh&&bt.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&bt.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&bt.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&bt.instancingMorph===!1&&W.morphTexture!==null||bt.envMap!==Rt||G.fog===!0&&bt.fog!==xt||bt.numClippingPlanes!==void 0&&(bt.numClippingPlanes!==It.numPlanes||bt.numIntersection!==It.numIntersection)||bt.vertexAlphas!==Yt||bt.vertexTangents!==ee||bt.morphTargets!==wt||bt.morphNormals!==ue||bt.morphColors!==He||bt.toneMapping!==Ee||bt.morphTargetsCount!==ii||!!bt.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(le=!0):(le=!0,bt.__version=G.version);let Di=bt.currentProgram;le===!0&&(Di=Ba(G,k,W),D&&G.isNodeMaterial&&D.onUpdateProgram(G,Di,bt));let hn=!1,Fn=!1,Ws=!1,ge=Di.getUniforms(),ke=bt.uniforms;if(_.useProgram(Di.program)&&(hn=!0,Fn=!0,Ws=!0),G.id!==X&&(X=G.id,Fn=!0),bt.needsLights){let Se=Bm(M.state.lightProbeGridArray,W);bt.lightProbeGrid!==Se&&(bt.lightProbeGrid=Se,Fn=!0)}if(hn||et!==w){_.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),ge.setValue(U,"projectionMatrix",w.projectionMatrix),ge.setValue(U,"viewMatrix",w.matrixWorldInverse);let zn=ge.map.cameraPosition;zn!==void 0&&zn.setValue(U,Re.setFromMatrixPosition(w.matrixWorld)),C.logarithmicDepthBuffer&&ge.setValue(U,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ge.setValue(U,"isOrthographic",w.isOrthographicCamera===!0),et!==w&&(et=w,Fn=!0,Ws=!0)}if(bt.needsLights&&(ui.state.sunShadowMap.length>0&&ge.setValue(U,"sunShadowMap",ui.state.sunShadowMap,J),ui.state.directionalShadowMap.length>0&&ge.setValue(U,"directionalShadowMap",ui.state.directionalShadowMap,J),ui.state.spotShadowMap.length>0&&ge.setValue(U,"spotShadowMap",ui.state.spotShadowMap,J),ui.state.pointShadowMap.length>0&&ge.setValue(U,"pointShadowMap",ui.state.pointShadowMap,J)),W.isSkinnedMesh){ge.setOptional(U,W,"bindMatrix"),ge.setOptional(U,W,"bindMatrixInverse");let Se=W.skeleton;Se&&(Se.boneTexture===null&&Se.computeBoneTexture(),ge.setValue(U,"boneTexture",Se.boneTexture,J))}W.isBatchedMesh&&(ge.setOptional(U,W,"batchingTexture"),ge.setValue(U,"batchingTexture",W._matricesTexture,J),ge.setOptional(U,W,"batchingIdTexture"),ge.setValue(U,"batchingIdTexture",W._indirectTexture,J),ge.setOptional(U,W,"batchingColorTexture"),W._colorsTexture!==null&&ge.setValue(U,"batchingColorTexture",W._colorsTexture,J));let Bn=q.morphAttributes;if((Bn.position!==void 0||Bn.normal!==void 0||Bn.color!==void 0)&&O.update(W,q,Di),(Fn||bt.receiveShadow!==W.receiveShadow)&&(bt.receiveShadow=W.receiveShadow,ge.setValue(U,"receiveShadow",W.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&k.environment!==null&&(ke.envMapIntensity.value=k.environmentIntensity),ke.dfgLUT!==void 0&&(ke.dfgLUT.value=mb()),Fn){if(ge.setValue(U,"toneMappingExposure",R.toneMappingExposure),bt.needsLights&&Hm(ke,Ws),xt&&G.fog===!0&&Pt.refreshFogUniforms(ke,xt),Pt.refreshMaterialUniforms(ke,G,Y,I,M.state.transmissionRenderTarget[w.id]),bt.needsLights&&bt.lightProbeGrid){let Se=bt.lightProbeGrid;ke.probesSH.value=Se.texture,ke.probesMin.value.copy(Se.boundingBox.min),ke.probesMax.value.copy(Se.boundingBox.max),ke.probesResolution.value.copy(Se.resolution)}Mr.upload(U,ud(bt),ke,J)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Mr.upload(U,ud(bt),ke,J),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ge.setValue(U,"center",W.center),ge.setValue(U,"modelViewMatrix",W.modelViewMatrix),ge.setValue(U,"normalMatrix",W.normalMatrix),ge.setValue(U,"modelMatrix",W.matrixWorld),G.uniformsGroups!==void 0){let Se=G.uniformsGroups;for(let zn=0,$s=Se.length;zn<$s;zn++){let pd=Se[zn];st.update(pd,Di),st.bind(pd,Di)}}return Di}function Hm(w,k){w.ambientLightColor.needsUpdate=k,w.lightProbe.needsUpdate=k,w.sunLights.needsUpdate=k,w.sunLightShadows.needsUpdate=k,w.directionalLights.needsUpdate=k,w.directionalLightShadows.needsUpdate=k,w.pointLights.needsUpdate=k,w.pointLightShadows.needsUpdate=k,w.spotLights.needsUpdate=k,w.spotLightShadows.needsUpdate=k,w.rectAreaLights.needsUpdate=k,w.hemisphereLights.needsUpdate=k}function Vm(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return Z},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(w,k,q){let G=$.get(w);G.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),$.get(w.texture).__webglTexture=k,$.get(w.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:q,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,k){let q=$.get(w);q.__webglFramebuffer=k,q.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(w,k=0,q=0){j=w,K=k,Z=q;let G=null,W=!1,xt=!1;if(w){let gt=$.get(w);if(gt.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(U.FRAMEBUFFER,gt.__webglFramebuffer),nt.copy(w.viewport),Lt.copy(w.scissor),At=w.scissorTest,_.viewport(nt),_.scissor(Lt),_.setScissorTest(At),X=-1;return}else if(gt.__webglFramebuffer===void 0)J.setupRenderTarget(w);else if(gt.__hasExternalTextures)J.rebindTextures(w,$.get(w.texture).__webglTexture,$.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let Yt=w.depthTexture;if(gt.__boundDepthTexture!==Yt){if(Yt!==null&&$.has(Yt)&&(w.width!==Yt.image.width||w.height!==Yt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");J.setupDepthRenderbuffer(w)}}let St=w.texture;(St.isData3DTexture||St.isDataArrayTexture||St.isCompressedArrayTexture)&&(xt=!0);let Rt=$.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Rt[k])?G=Rt[k][q]:G=Rt[k],W=!0):w.samples>0&&J.useMultisampledRTT(w)===!1?G=$.get(w).__webglMultisampledFramebuffer:Array.isArray(Rt)?G=Rt[q]:G=Rt,nt.copy(w.viewport),Lt.copy(w.scissor),At=w.scissorTest}else nt.copy(ot).multiplyScalar(Y).floor(),Lt.copy(Ct).multiplyScalar(Y).floor(),At=ve;if(q!==0&&(G=H),_.bindFramebuffer(U.FRAMEBUFFER,G)&&_.drawBuffers(w,G),_.viewport(nt),_.scissor(Lt),_.setScissorTest(At),W){let gt=$.get(w.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+k,gt.__webglTexture,q)}else if(xt){let gt=k;for(let St=0;St<w.textures.length;St++){let Rt=$.get(w.textures[St]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+St,Rt.__webglTexture,q,gt)}}else if(w!==null&&q!==0){let gt=$.get(w.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,gt.__webglTexture,q)}X=-1};function fd(w){let k=$.get(w);return(k.__readFormat!==w.format||k.__readType!==w.type)&&(k.__readFormat=w.format,k.__readType=w.type,k.__formatReadable=C.textureFormatReadable(w.format),k.__typeReadable=C.textureTypeReadable(w.type)),k}this.readRenderTargetPixels=function(w,k,q,G,W,xt,_t,gt=0){if(!(w&&w.isWebGLRenderTarget)){Bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let St=$.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&_t!==void 0&&(St=St[_t]),St){_.bindFramebuffer(U.FRAMEBUFFER,St);try{let Rt=w.textures[gt],Yt=Rt.format,ee=Rt.type;w.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+gt);let wt=fd(Rt);if(wt.__formatReadable===!1){Bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(wt.__typeReadable===!1){Bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=w.width-G&&q>=0&&q<=w.height-W&&U.readPixels(k,q,G,W,pt.convert(Yt),pt.convert(ee),xt)}finally{let Rt=j!==null?$.get(j).__webglFramebuffer:null;_.bindFramebuffer(U.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(w,k,q,G,W,xt,_t,gt=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let St=$.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&_t!==void 0&&(St=St[_t]),St)if(k>=0&&k<=w.width-G&&q>=0&&q<=w.height-W){_.bindFramebuffer(U.FRAMEBUFFER,St);let Rt=w.textures[gt],Yt=Rt.format,ee=Rt.type;w.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+gt);let wt=fd(Rt);if(wt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(wt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ue=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,ue),U.bufferData(U.PIXEL_PACK_BUFFER,xt.byteLength,U.STREAM_READ),U.readPixels(k,q,G,W,pt.convert(Yt),pt.convert(ee),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let He=j!==null?$.get(j).__webglFramebuffer:null;_.bindFramebuffer(U.FRAMEBUFFER,He);let Ee=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Mf(U,Ee,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,ue),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,xt),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(ue),U.deleteSync(Ee),xt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,k=null,q=0){let G=Math.pow(2,-q),W=Math.floor(w.image.width*G),xt=Math.floor(w.image.height*G),_t=k!==null?k.x:0,gt=k!==null?k.y:0;J.setTexture2D(w,0),U.copyTexSubImage2D(U.TEXTURE_2D,q,0,0,_t,gt,W,xt),_.unbindTexture()},this.copyTextureToTexture=function(w,k,q=null,G=null,W=0,xt=0){let _t,gt,St,Rt,Yt,ee,wt,ue,He,Ee=w.isCompressedTexture?w.mipmaps[xt]:w.image;if(q!==null)_t=q.max.x-q.min.x,gt=q.max.y-q.min.y,St=q.isBox3?q.max.z-q.min.z:1,Rt=q.min.x,Yt=q.min.y,ee=q.isBox3?q.min.z:0;else{let ke=Math.pow(2,-W);_t=Math.floor(Ee.width*ke),gt=Math.floor(Ee.height*ke),w.isDataArrayTexture?St=Ee.depth:w.isData3DTexture?St=Math.floor(Ee.depth*ke):St=1,Rt=0,Yt=0,ee=0}G!==null?(wt=G.x,ue=G.y,He=G.z):(wt=0,ue=0,He=0);let ye=pt.convert(k.format),ii=pt.convert(k.type),bt;k.isData3DTexture?(J.setTexture3D(k,0),bt=U.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(J.setTexture2DArray(k,0),bt=U.TEXTURE_2D_ARRAY):(J.setTexture2D(k,0),bt=U.TEXTURE_2D),_.activeTexture(U.TEXTURE0),_.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,k.flipY),_.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),_.pixelStorei(U.UNPACK_ALIGNMENT,k.unpackAlignment);let ui=_.getParameter(U.UNPACK_ROW_LENGTH),le=_.getParameter(U.UNPACK_IMAGE_HEIGHT),Di=_.getParameter(U.UNPACK_SKIP_PIXELS),hn=_.getParameter(U.UNPACK_SKIP_ROWS),Fn=_.getParameter(U.UNPACK_SKIP_IMAGES);_.pixelStorei(U.UNPACK_ROW_LENGTH,Ee.width),_.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Ee.height),_.pixelStorei(U.UNPACK_SKIP_PIXELS,Rt),_.pixelStorei(U.UNPACK_SKIP_ROWS,Yt),_.pixelStorei(U.UNPACK_SKIP_IMAGES,ee);let Ws=w.isDataArrayTexture||w.isData3DTexture,ge=k.isDataArrayTexture||k.isData3DTexture;if(w.isDepthTexture){let ke=$.get(w),Bn=$.get(k),Se=$.get(ke.__renderTarget),zn=$.get(Bn.__renderTarget);_.bindFramebuffer(U.READ_FRAMEBUFFER,Se.__webglFramebuffer),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,zn.__webglFramebuffer);for(let $s=0;$s<St;$s++)Ws&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,$.get(w).__webglTexture,W,ee+$s),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,$.get(k).__webglTexture,xt,He+$s)),U.blitFramebuffer(Rt,Yt,_t,gt,wt,ue,_t,gt,U.DEPTH_BUFFER_BIT,U.NEAREST);_.bindFramebuffer(U.READ_FRAMEBUFFER,null),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(W!==0||w.isRenderTargetTexture||$.has(w)){let ke=$.get(w),Bn=$.get(k);_.bindFramebuffer(U.READ_FRAMEBUFFER,L),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,V);for(let Se=0;Se<St;Se++)Ws?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ke.__webglTexture,W,ee+Se):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ke.__webglTexture,W),ge?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Bn.__webglTexture,xt,He+Se):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Bn.__webglTexture,xt),W!==0?U.blitFramebuffer(Rt,Yt,_t,gt,wt,ue,_t,gt,U.COLOR_BUFFER_BIT,U.NEAREST):ge?U.copyTexSubImage3D(bt,xt,wt,ue,He+Se,Rt,Yt,_t,gt):U.copyTexSubImage2D(bt,xt,wt,ue,Rt,Yt,_t,gt);_.bindFramebuffer(U.READ_FRAMEBUFFER,null),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else ge?w.isDataTexture||w.isData3DTexture?U.texSubImage3D(bt,xt,wt,ue,He,_t,gt,St,ye,ii,Ee.data):k.isCompressedArrayTexture?U.compressedTexSubImage3D(bt,xt,wt,ue,He,_t,gt,St,ye,Ee.data):U.texSubImage3D(bt,xt,wt,ue,He,_t,gt,St,ye,ii,Ee):w.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,xt,wt,ue,_t,gt,ye,ii,Ee.data):w.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,xt,wt,ue,Ee.width,Ee.height,ye,Ee.data):U.texSubImage2D(U.TEXTURE_2D,xt,wt,ue,_t,gt,ye,ii,Ee);_.pixelStorei(U.UNPACK_ROW_LENGTH,ui),_.pixelStorei(U.UNPACK_IMAGE_HEIGHT,le),_.pixelStorei(U.UNPACK_SKIP_PIXELS,Di),_.pixelStorei(U.UNPACK_SKIP_ROWS,hn),_.pixelStorei(U.UNPACK_SKIP_IMAGES,Fn),xt===0&&k.generateMipmaps&&U.generateMipmap(bt),_.unbindTexture()},this.initRenderTarget=function(w){$.get(w).__webglFramebuffer===void 0&&J.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?J.setTextureCube(w,0):w.isData3DTexture?J.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?J.setTexture2DArray(w,0):J.setTexture2D(w,0),_.unbindTexture()},this.resetState=function(){K=0,Z=0,j=null,_.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ji}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=jt._getUnpackColorSpace()}};var F={FLOOR_A:1,FLOOR_B:2,FLOOR_C:3,APRON:4,PAINT:5,LINES:6,CENTER:7,RIM:8,NET:9,GLASS:10,BOARD_FRAME:11,PAD:12,POLE:13,STAND_A:14,STAND_B:15,STAND_C:16,WALL_A:17,WALL_B:18,CEIL:19,CONCRETE:20,METAL:21,WOOD:22,SEAT:23,BANNER_HOME:24,BANNER_AWAY:25,BOARD_A:26,BOARD_B:27,SCREEN:28,LAMP:29,CROWD_1:30,CROWD_2:31,CROWD_3:32,CROWD_4:33,SKIN_1:34,SKIN_2:35,SKIN_3:36,SKIN_H:37,HAIR_1:38,HAIR_2:39,HAIR_H:40,SHOE:41,SHOE_H:42,SOLE:43,JERSEY_0:44,SHORTS_0:45,TRIM_0:46,NUM_0:47,JERSEY_1:48,SHORTS_1:49,TRIM_1:50,NUM_1:51,SOCK:52,BALL:53,BALL_SEAM:54,CONE:55,TARGET:56,CLOUD:57,SKY_TOP:58,SKY_BOTTOM:59,GOLD:60,EYE:61,INK:62,MARKER:63,WINDOW:64,DOOR:65,BRICK:66,PLANT:67,BAND:68,MARKER_DEF:69,CHAIR:70,TABLE:71},mu=72,Ce=Array.from({length:mu},()=>new qt(1,1,1));function pu(s){return new qt(s)}var gu={name:"classic",label:"Classic",bg:"#f2f1ea",fog:"#f2f1ea",fogNear:45,fogFar:160,ink:"#161616",lineWidth:1.2,toon:0,shadow:0,clouds:!1,blobs:!0,roles:{FLOOR_A:"#f3e7cf",FLOOR_B:"#efe1c5",FLOOR_C:"#f6ecd8",APRON:"#e6dccb",LINES:"#2b2b2b",RIM:"#f2b48c",NET:"#7a7a7a",GLASS:"#eef2f2",BOARD_FRAME:"#ffffff",PAD:"#e9e4dc",POLE:"#ecebe6",STAND_A:"#f6f6f2",STAND_B:"#ecebe5",STAND_C:"#e2e0d8",WALL_A:"#f7f6f1",WALL_B:"#efede6",CEIL:"#faf9f5",CONCRETE:"#efeee8",METAL:"#e8e8e6",WOOD:"#f1ebe0",SEAT:"#ebe8e0",BOARD_A:"#fbfbf8",BOARD_B:"#efefea",SCREEN:"#f7f7f4",LAMP:"#ffffff",CROWD_3:"#efefeb",CROWD_4:"#e3e2dc",SKIN_1:"#fbf6f0",SKIN_2:"#f3eadf",SKIN_3:"#e8dccd",HAIR_1:"#d9d4cc",HAIR_2:"#bdb7ae",SHOE:"#3a3a3a",SOLE:"#f4f4f0",SOCK:"#ffffff",BALL:"#f3c3a0",BALL_SEAM:"#1b1b1b",CONE:"#f2c9a0",TARGET:"#f0b8b0",CLOUD:"#ffffff",SKY_TOP:"#f4f3ee",SKY_BOTTOM:"#f2f1ea",GOLD:"#eadcaa",EYE:"#1b1b1b",INK:"#161616",MARKER:"#222222",MARKER_DEF:"#c8102e",WINDOW:"#e3eaee",DOOR:"#e6ddd0",BRICK:"#ece4d8",PLANT:"#d8e4cc",BAND:"#ffffff",CHAIR:"#e4e2dc",TABLE:"#f3f1ea"},kitMix:.42,kitSat:.75,skinMix:.55,paintMix:.72},gb={name:"neo",label:"Neobrutalist",bg:"#3b2f8f",fog:"#9d8cff",fogNear:70,fogFar:260,ink:"#000000",lineWidth:3,toon:1,shadow:1,clouds:!1,blobs:!1,roles:{FLOOR_A:"#f6b24f",FLOOR_B:"#ec9f3c",FLOOR_C:"#fbc46a",APRON:"#c96f2a",LINES:"#ffffff",RIM:"#ff5a1f",NET:"#ffffff",GLASS:"#8ff0ff",BOARD_FRAME:"#ffffff",PAD:"#3d9bff",POLE:"#ffffff",STAND_A:"#ff5c8a",STAND_B:"#ffd23f",STAND_C:"#3d9bff",WALL_A:"#7b4dff",WALL_B:"#5f37e0",CEIL:"#2e2470",CONCRETE:"#d9d2ff",METAL:"#b5b5c8",WOOD:"#ffb347",SEAT:"#ff3d6e",BOARD_A:"#ffffff",BOARD_B:"#ffe45c",SCREEN:"#141414",LAMP:"#fffbe0",CROWD_3:"#ffe45c",CROWD_4:"#b48cff",SKIN_1:"#ffd8b8",SKIN_2:"#d9a27a",SKIN_3:"#9a6440",HAIR_1:"#2b1d14",HAIR_2:"#f2c14e",SHOE:"#101010",SOLE:"#ffffff",SOCK:"#ffffff",BALL:"#ff7a1a",BALL_SEAM:"#101010",CONE:"#ff7a1a",TARGET:"#ff3d6e",CLOUD:"#ffffff",SKY_TOP:"#2a1f6e",SKY_BOTTOM:"#6c5ce7",GOLD:"#ffc81a",EYE:"#000000",INK:"#000000",MARKER:"#ff3dcf",MARKER_DEF:"#ff3d3d",WINDOW:"#3ee0ff",DOOR:"#ff5c8a",BRICK:"#ff8a4c",PLANT:"#1bbd57",BAND:"#ffffff",CHAIR:"#141414",TABLE:"#ffffff"},kitMix:0,kitSat:1.15,skinMix:0,paintMix:0},Bl={classic:gu,neo:gb},Ps={kits:[{jersey:"#c8102e",shorts:"#c8102e",trim:"#ffffff",number:"#ffffff"},{jersey:"#1d4ed8",shorts:"#1d4ed8",trim:"#ffffff",number:"#ffffff"}],human:{skin:"#e0b48c",hair:"#3b2a1e",shoes:"#ffc61a"},court:"#c8102e"},ep=gu;function Fi(s,t,e){let i=pu(s),n={};return i.getHSL(n),i.setHSL(n.h,Math.min(1,n.s*e),n.l),t>0&&i.lerp(new qt(1,1,1),t),i}function ip(s){let t=Bl[s]||gu;ep=t;for(let[e,i]of Object.entries(t.roles))Ce[F[e]].set(i);return sp(),t}function np(s,t,e){s&&(Ps.kits=s),t&&(Ps.human=t),e&&(Ps.court=e),sp()}function sp(){let s=ep,t=Ps.kits,e=s.kitMix,i=s.kitSat;for(let r=0;r<2;r++){let a=t[r],o=r===0?0:4;Ce[F.JERSEY_0+o].copy(Fi(a.jersey,e,i)),Ce[F.SHORTS_0+o].copy(Fi(a.shorts,e,i));let c=Fl(a.trim,a.jersey)<.3?Fl(a.jersey,"#ffffff")>.6?"#ffffff":"#141414":a.trim;Ce[F.TRIM_0+o].copy(Fi(c,e,i));let l=Ce[F.JERSEY_0+o],h=l.r*.3+l.g*.59+l.b*.11;Ce[F.NUM_0+o].set(h>.6?"#141414":"#ffffff")}Ce[F.BANNER_HOME].copy(Fi(t[0].jersey,e*.7,i)),Ce[F.BANNER_AWAY].copy(Fi(t[1].jersey,e*.7,i)),Ce[F.CROWD_1].copy(Fi(t[0].jersey,s.name==="classic"?.62:0,i)),Ce[F.CROWD_2].copy(Fi(t[1].jersey,s.name==="classic"?.62:0,i)),Ce[F.PAINT].copy(Fi(Ps.court,s.paintMix,i*.9)),Ce[F.CENTER].copy(Fi(Ps.court,s.paintMix*.8,i));let n=Ps.human;Ce[F.SKIN_H].copy(Fi(n.skin,s.skinMix,1)),Ce[F.HAIR_H].copy(Fi(n.hair,s.skinMix*.8,1)),Ce[F.SHOE_H].copy(Fi(n.shoes,s.name==="classic"?.2:0,1))}function Fl(s,t){let e=pu(s),i=pu(t);return Math.hypot(e.r-i.r,e.g-i.g,e.b-i.b)}function zl(s,t){let e={jersey:s.colors[0],shorts:s.colors[0],trim:s.colors[1],number:s.colors[1]},i={jersey:t.colors[0],shorts:t.colors[0],trim:t.colors[1],number:t.colors[1]};return Fl(e.jersey,i.jersey)<.55&&(i={jersey:t.colors[1],shorts:t.colors[1],trim:t.colors[0],number:t.colors[0]},Fl(e.jersey,i.jersey)<.55&&(i={jersey:"#f4f4f4",shorts:"#f4f4f4",trim:t.colors[0],number:"#111111"})),[e,i]}var Ot={uPalette:{value:Ce},uLightDir:{value:new N(-.45,.8,.38).normalize()},uToon:{value:0},uShadowAmt:{value:0},uLineWidth:{value:1.2},uMinWidth:{value:1},uTaper:{value:22},uTaperMin:{value:.3},uDetailDist:{value:50},uCreaseDist:{value:20},uResolution:{value:new Xt(1280,720)},uTime:{value:0},uCrowd:{value:0},uParts:{value:null},uAtlas:{value:null},uNetA:{value:new be(0,0,0,0)},uNetDA:{value:new N(1,0,0)},uNetB:{value:new be(0,0,0,0)},uNetDB:{value:new N(-1,0,0)}},xu=`
uniform highp sampler2D uParts;
mat4 partMatrix(float idx) {
  int row = int(idx + 0.5);
  return mat4(texelFetch(uParts, ivec2(0, row), 0), texelFetch(uParts, ivec2(1, row), 0),
              texelFetch(uParts, ivec2(2, row), 0), texelFetch(uParts, ivec2(3, row), 0));
}
`,rp=`
uniform float uTime;
uniform float uCrowd;
float crowdLift(vec2 bob) {
  float rate = 2.6 + fract(bob.x * 7.31) * 2.4 + uCrowd * 4.0;
  float s = sin(uTime * rate + bob.x * 6.2831);
  return bob.y * (0.035 * s + uCrowd * (0.18 + 0.2 * fract(bob.x * 3.7)) * max(0.0, s));
}
`,xb=`
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
`,vb=`
attribute float aRole;
#ifdef PARTS
attribute float aPart;
${xu}
#endif
#ifdef CROWD
attribute vec2 aBob;
${rp}
#endif
uniform vec3 uPalette[${mu}];
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
`,yb=`
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
`;function wr(s={}){let t={};s.parts&&(t.PARTS=""),s.crowd&&(t.CROWD=""),s.atlas&&(t.USE_ATLAS="");let e=ya.merge([ct.lights,ct.fog]);return Object.assign(e,{uPalette:Ot.uPalette,uLightDir:Ot.uLightDir,uToon:Ot.uToon,uShadowAmt:Ot.uShadowAmt,uParts:Ot.uParts,uAtlas:Ot.uAtlas,uTime:Ot.uTime,uCrowd:Ot.uCrowd}),new Oe({uniforms:e,defines:t,vertexShader:vb,fragmentShader:yb,lights:!0,fog:s.fog!==!1,side:s.doubleSided?Ui:xn,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1})}var bb=`
attribute vec3 iA;
attribute vec3 iB;
attribute vec3 iN1;
attribute vec3 iN2;
attribute vec2 iMeta;
#ifdef PARTS
${xu}
#endif
#ifdef CROWD
attribute vec2 iBob;
${rp}
#endif
#ifdef NET
${xb}
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
`,_b=`
uniform vec3 uColor;
uniform float uOpacity;
#include <common>
#include <fog_pars_fragment>
void main() {
  gl_FragColor = vec4(uColor, uOpacity);
  #include <fog_fragment>
}
`;function Is(s={}){let t={};s.parts&&(t.PARTS=""),s.crowd&&(t.CROWD=""),s.net&&(t.NET="");let e=ya.merge([ct.fog]);return Object.assign(e,{uLineWidth:Ot.uLineWidth,uMinWidth:Ot.uMinWidth,uTaper:Ot.uTaper,uTaperMin:Ot.uTaperMin,uDetailDist:Ot.uDetailDist,uCreaseDist:Ot.uCreaseDist,uResolution:Ot.uResolution,uParts:Ot.uParts,uTime:Ot.uTime,uCrowd:Ot.uCrowd,uNetA:Ot.uNetA,uNetDA:Ot.uNetDA,uNetB:Ot.uNetB,uNetDB:Ot.uNetDB,uColor:{value:Ce[s.role??F.INK]},uOpacity:{value:s.opacity??1},uWidthScale:{value:s.widthScale??1}}),new Oe({uniforms:e,defines:t,vertexShader:bb,fragmentShader:_b,fog:s.fog!==!1,transparent:(s.opacity??1)<1,depthWrite:(s.opacity??1)>=1})}function ap(){return new Oe({uniforms:{uParts:Ot.uParts},vertexShader:`${xu}
attribute float aPart;
void main(){ vec3 p = (partMatrix(aPart) * vec4(position,1.0)).xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0); }`,fragmentShader:"void main(){ gl_FragColor = vec4(1.0); }"})}function op(){return new Oe({uniforms:{uTop:{value:Ce[F.SKY_TOP]},uBottom:{value:Ce[F.SKY_BOTTOM]}},vertexShader:"varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform vec3 uTop; uniform vec3 uBottom; varying vec3 vDir; void main(){ float t = smoothstep(-0.02, 0.55, vDir.y); gl_FragColor = vec4(mix(uBottom, uTop, t), 1.0); }",side:Je,depthWrite:!1,fog:!1})}function lp(){return new Oe({uniforms:{uInk:{value:Ce[F.INK]}},vertexShader:"attribute float aAlpha; varying vec2 vP; varying float vA; void main(){ vP = position.xz * 2.0; vA = aAlpha; gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * vec4(position,1.0); }",fragmentShader:"uniform vec3 uInk; varying vec2 vP; varying float vA; void main(){ float d = length(vP); float a = (1.0 - smoothstep(0.35, 1.0, d)) * vA; if (a < 0.01) discard; gl_FragColor = vec4(uInk, a); }",transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})}function Er(s,t=1){return new Oe({uniforms:{uColor:{value:Ce[s]},uOpacity:{value:t}},vertexShader:"void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform vec3 uColor; uniform float uOpacity; void main(){ gl_FragColor = vec4(uColor, uOpacity); }",transparent:t<1,depthWrite:t>=1})}function vu(s){return new Oe({uniforms:{uMap:{value:s}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform sampler2D uMap; varying vec2 vUv; void main(){ gl_FragColor = vec4(texture2D(uMap, vUv).rgb, 1.0); }"})}var Pe=new Map;function ns(s,t,e=!0){let i=s.index?s.toNonIndexed():s,n=new Float32Array(i.attributes.position.array),r=new Float32Array(i.attributes.normal.array),a=i.attributes.uv?new Float32Array(i.attributes.uv.array):null,o=e?Mb(s,t):[];return{positions:n,normals:r,uvs:a,edges:o}}function Mb(s,t=32){let e=s.attributes.position,i=new Map,n=[],r=new Int32Array(e.count);for(let x=0;x<e.count;x++){let m=e.getX(x),p=e.getY(x),v=e.getZ(x),S=`${Math.round(m*1e4)},${Math.round(p*1e4)},${Math.round(v*1e4)}`,y=i.get(S);y===void 0&&(y=n.length,i.set(S,y),n.push([m,p,v])),r[x]=y}let a=s.index?s.index.array:null,o=a?a.length/3:e.count/3,c=new Map,l=n.length,h=new N,d=new N,u=new N;for(let x=0;x<o;x++){let m=r[a?a[x*3]:x*3],p=r[a?a[x*3+1]:x*3+1],v=r[a?a[x*3+2]:x*3+2];if(m===p||p===v||m===v)continue;let S=n[m],y=n[p],E=n[v];if(h.set(y[0]-S[0],y[1]-S[1],y[2]-S[2]),d.set(E[0]-S[0],E[1]-S[1],E[2]-S[2]),u.crossVectors(h,d),u.lengthSq()<1e-14)continue;u.normalize();let M=[u.x,u.y,u.z];for(let[A,b]of[[m,p],[p,v],[v,m]]){let T=Math.min(A,b),R=Math.max(A,b),P=T*l+R,D=c.get(P);D||(D={a:T,b:R,normals:[]},c.set(P,D)),D.normals.push(M)}}let f=Math.cos(t*Math.PI/180),g=[];for(let x of c.values()){let m=x.normals[0];if(x.normals.length===1){g.push({a:n[x.a],b:n[x.b],n1:m,n2:[0,0,0],crease:1});continue}let p=x.normals[1],v=m[0]*p[0]+m[1]*p[1]+m[2]*p[2];v>.9999||g.push({a:n[x.a],b:n[x.b],n1:m,n2:p,crease:v<f?1:0})}return g}function Ls(s,t,e){let i=`box:${s}:${t}:${e}`;return Pe.has(i)||Pe.set(i,ns(new Kn(s,t,e),30)),Pe.get(i)}function Sa(s,t,e,i=8,n=!1){let r=`cyl:${s}:${t}:${e}:${i}:${n}`;return Pe.has(r)||Pe.set(r,ns(new pr(s,t,e,i,1,n),i<=4?30:60)),Pe.get(r)}function Ii(s,t=12,e=8,i=Math.PI*2,n=Math.PI){let r=`sph:${s}:${t}:${e}:${i}:${n}`;return Pe.has(r)||Pe.set(r,ns(new Es(s,t,e,0,i,0,n),70)),Pe.get(r)}function wa(s,t,e=8){let i=`cone:${s}:${t}:${e}`;return Pe.has(i)||Pe.set(i,ns(new Ms(s,t,e),e<=4?30:60)),Pe.get(i)}function Sb(s,t,e=!1){let i=`plane:${s}:${t}:${e}`;if(!Pe.has(i)){let n=new Oi(s,t);n.rotateX(-Math.PI/2),Pe.set(i,ns(n,30,e))}return Pe.get(i)}function Tr(s,t){let e=`quad:${s}:${t}`;return Pe.has(e)||Pe.set(e,ns(new Oi(s,t),30,!1)),Pe.get(e)}function Ar(s,t,e=30,i=!0){return Pe.has(s)||Pe.set(s,ns(t(),e,i)),Pe.get(s)}function wb(s,t=12,e=[!0,!0]){let i=[],n=[],r=t+1;for(let[l,h,d,u=0]of s)for(let f=0;f<=t;f++){let g=f/t*Math.PI*2;i.push(Math.sin(g)*h,l,Math.cos(g)*d+u)}for(let l=0;l<s.length-1;l++)for(let h=0;h<t;h++){let d=l*r+h,u=d+1,f=d+r,g=f+1;n.push(d,u,f,u,g,f)}let a=(l,h)=>{let[d,u,f,g=0]=s[l];if(u<1e-5&&f<1e-5)return;let x=i.length/3;i.push(0,d,g);for(let m=0;m<=t;m++){let p=m/t*Math.PI*2;i.push(Math.sin(p)*u,d,Math.cos(p)*f+g)}for(let m=0;m<t;m++)h?n.push(x,x+1+m,x+2+m):n.push(x,x+2+m,x+1+m)};e[0]&&a(0,!1),e[1]&&a(s.length-1,!0);let o=new We;o.setAttribute("position",new Zt(i,3)),o.setIndex(n),o.computeVertexNormals();let c=o.attributes.normal;for(let l=0;l<s.length;l++){let h=l*r,d=l*r+t,u=c.getX(h)+c.getX(d),f=c.getY(h)+c.getY(d),g=c.getZ(h)+c.getZ(d),x=Math.hypot(u,f,g)||1;c.setXYZ(h,u/x,f/x,g/x),c.setXYZ(d,u/x,f/x,g/x)}return o}function xi(s,t,e=12,i={}){return Ar(`loft:${s}:${e}`,()=>{let n=wb(t,e,i.caps||[!0,!0]);return i.axis==="z"&&n.rotateX(Math.PI/2),n},i.crease??55)}function yu(s,t=1){let e=`ico:${s}:${t}`;return Pe.has(e)||Pe.set(e,ns(new Ss(s,t),70)),Pe.get(e)}var Sw=new Gt,Hl=new Ht,Pi=new N,cp=new Ge,hp=new Mi,Eb=new N,gi=class s{constructor(t={}){this.opts=t,this.pos=[],this.nor=[],this.role=[],this.part=[],this.bob=[],this.uv=[],this.eA=[],this.eB=[],this.eN1=[],this.eN2=[],this.eMeta=[],this.eBob=[],this.vcount=0,this.detail=!1}add(t,e,i,n={}){Hl.getNormalMatrix(e);let r=e.elements,a=t.positions,o=t.normals,c=n.part??-1,l=n.bob||null,h=n.uvRect||null,d=n.roleFn||null;for(let g=0;g<a.length;g+=3){let x=a[g],m=a[g+1],p=a[g+2];if(this.pos.push(r[0]*x+r[4]*m+r[8]*p+r[12],r[1]*x+r[5]*m+r[9]*p+r[13],r[2]*x+r[6]*m+r[10]*p+r[14]),Pi.set(o[g],o[g+1],o[g+2]).applyMatrix3(Hl).normalize(),this.nor.push(Pi.x,Pi.y,Pi.z),this.role.push(n.roles?n.roles[g/3]:d?d(g/3,x,m,p):i),this.opts.parts&&this.part.push(c),this.opts.bob&&this.bob.push(l?l[0]:0,l?l[1]:0),this.opts.atlas)if(h&&t.uvs){let v=g/3*2;this.uv.push(h[0]+t.uvs[v]*(h[2]-h[0]),h[1]+t.uvs[v+1]*(h[3]-h[1]))}else this.uv.push(-1,-1)}if(this.vcount+=a.length/3,n.noEdges||!t.edges.length)return this;let u=!!n.creaseOnly,f=n.detail??this.detail?2:0;for(let g of t.edges){if(u&&g.crease<.5)continue;let x=g.a,m=g.b;this.eA.push(r[0]*x[0]+r[4]*x[1]+r[8]*x[2]+r[12],r[1]*x[0]+r[5]*x[1]+r[9]*x[2]+r[13],r[2]*x[0]+r[6]*x[1]+r[10]*x[2]+r[14]),this.eB.push(r[0]*m[0]+r[4]*m[1]+r[8]*m[2]+r[12],r[1]*m[0]+r[5]*m[1]+r[9]*m[2]+r[13],r[2]*m[0]+r[6]*m[1]+r[10]*m[2]+r[14]),Pi.set(g.n1[0],g.n1[1],g.n1[2]).applyMatrix3(Hl).normalize(),this.eN1.push(Pi.x,Pi.y,Pi.z),g.n2[0]===0&&g.n2[1]===0&&g.n2[2]===0?this.eN2.push(0,0,0):(Pi.set(g.n2[0],g.n2[1],g.n2[2]).applyMatrix3(Hl).normalize(),this.eN2.push(Pi.x,Pi.y,Pi.z)),this.eMeta.push(c,g.crease+f),this.opts.bob&&this.eBob.push(l?l[0]:0,l?l[1]:0)}return this}line(t,e,i,n,r,a,o=-1){return this.eA.push(t,e,i),this.eB.push(n,r,a),this.eN1.push(0,1,0),this.eN2.push(0,0,0),this.eMeta.push(o,this.detail?3:1),this.opts.bob&&this.eBob.push(0,0),this}static mat(t,e,i,n=0,r=0,a=0,o=1,c=1,l=1){return hp.set(n,r,a,"YXZ"),cp.setFromEuler(hp),new Gt().compose(Pi.set(t,e,i).clone(),cp.clone(),Eb.set(o,c,l).clone())}box(t,e,i,n,r,a,o,c=0,l={}){return this.add(Ls(e,i,n),s.mat(r,a,o,l.rx||0,c,l.rz||0),t,l)}cyl(t,e,i,n,r,a,o,c,l={}){return this.add(Sa(e,i,n,r,l.open),s.mat(a,o,c,l.rx||0,l.ry||0,l.rz||0,l.sx||1,1,l.sz||1),t,l)}sphere(t,e,i,n,r,a={}){return this.add(Ii(e,a.ws||12,a.hs||8,a.phi,a.theta),s.mat(i,n,r,a.rx||0,a.ry||0,a.rz||0,a.sx||1,a.sy||1,a.sz||1),t,a)}cone(t,e,i,n,r,a,o,c={}){return this.add(wa(e,i,n),s.mat(r,a,o,c.rx||0,c.ry||0,c.rz||0,c.sx||1,c.sy||1,c.sz||1),t,c)}plane(t,e,i,n,r,a,o={}){return this.add(Sb(e,i,!!o.edges),s.mat(n,r,a,0,o.ry||0,0),t,{noEdges:!o.edges,...o})}quad(t,e,i,n,r,a,o=0,c={}){return this.add(Tr(e,i),s.mat(n,r,a,c.rx||0,o,0),t,{noEdges:!0,...c})}between(t,e,i,n,r,a,o,c,l=6,h={}){let d=a-i,u=o-n,f=c-r,g=Math.hypot(d,u,f),x=new Gt,m=new N(d,u,f).normalize(),p=new Ge().setFromUnitVectors(new N(0,1,0),m);return x.compose(new N((i+a)/2,(n+o)/2,(r+c)/2),p,new N(1,1,1)),this.add(Sa(e,e,g,l),x,t,h)}buildSolid(){let t=new We;return t.setAttribute("position",new Zt(this.pos,3)),t.setAttribute("normal",new Zt(this.nor,3)),t.setAttribute("aRole",new Zt(this.role,1)),this.opts.parts&&t.setAttribute("aPart",new Zt(this.part,1)),this.opts.bob&&t.setAttribute("aBob",new Zt(this.bob,2)),this.opts.atlas&&t.setAttribute("uv",new Zt(this.uv,2)),t.computeBoundingSphere(),t}buildEdges(){let t=new la,e=[-1,0,0,1,0,0,-1,1,0,1,1,0];t.setIndex([0,1,2,2,1,3]),t.setAttribute("position",new Zt(e,3));let i=this.eA.length/3;return t.setAttribute("iA",new Si(new Float32Array(this.eA),3)),t.setAttribute("iB",new Si(new Float32Array(this.eB),3)),t.setAttribute("iN1",new Si(new Float32Array(this.eN1),3)),t.setAttribute("iN2",new Si(new Float32Array(this.eN2),3)),t.setAttribute("iMeta",new Si(new Float32Array(this.eMeta),2)),this.opts.bob&&t.setAttribute("iBob",new Si(new Float32Array(this.eBob),2)),t.instanceCount=i,t.boundingSphere=new gn(new N,1e6),t}get edgeCount(){return this.eA.length/3}fine(t){let e=this.detail;this.detail=!0;try{t()}finally{this.detail=e}}};var Rr=.008333333333333333,Dt={L:28,W:15,HL:14,HW:7.5},B={X:14-1.575,Z:0,Y:3.05,R:.225,TUBE:.011,BOARD_X:14-1.2,BOARD_W:1.8,BOARD_H:1.05,BOARD_Y0:2.9,BOARD_T:.05,NET_LEN:.42,NET_R1:.15},zt={THREE_R:6.75,THREE_Z:6.6,KEY_HW:2.45,FT_X:14-5.8,FT_R:1.8,NC_R:1.25,CENTER_R:1.8};zt.THREE_X=B.X-Math.sqrt(zt.THREE_R*zt.THREE_R-zt.THREE_Z*zt.THREE_Z);var Et=.12,Ne=9.81,Nn={AIR_DRAG:.012,FLOOR_E:.8,RIM_E:.55,BOARD_E:.62,FRICTION:.35,SPIN_DAMP:.4},vi={SHOT_CLOCK:14,CHECK_DIST:5.2,PICKUP_R:.62,HUMAN_PICKUP_R:.78,STEAL_RANGE:1.25,STEAL_COOLDOWN:.75,PASS_LOCK:.3,SHOT_LOCK:.5,INPUT_BUFFER:.15,FT_DIST:.15,BONUS_FOULS:6},Bi={SHOT_CLOCK:24,OREB_CLOCK:14,BACKCOURT:8,INBOUND:5,BONUS_FOULS:5,QUARTERS:4},Mn={short:{quarter:120,ot:60,label:"4 \xD7 2 min"},normal:{quarter:180,ot:90,label:"4 \xD7 3 min"},long:{quarter:300,ot:120,label:"4 \xD7 5 min"}},ss={short:{clock:180,target:11,label:"3 min \xB7 to 11"},normal:{clock:300,target:21,label:"5 min \xB7 to 21"},long:{clock:480,target:21,label:"8 min \xB7 to 21"}},Ue={top:[B.X-7.4,0],wingL:[B.X-5.6,-4.9],wingR:[B.X-5.6,4.9],cornerL:[13,-6.95],cornerR:[13,6.95],elbowL:[zt.FT_X+.2,-2.3],elbowR:[zt.FT_X+.2,2.3],postL:[B.X-1.4,-2.6],postR:[B.X-1.4,2.6],slotL:[B.X-6.9,-2.6],slotR:[B.X-6.9,2.6]};function De(s,t,e=1){return Math.hypot(s-e*B.X,t-B.Z)}function Vl(s,t=1){let e=Ue[s];return[e[0]*t,e[1]*t]}function Dn(s,t,e=1){return s*=e,t*=e,Math.abs(t)>zt.THREE_Z?!0:s>zt.THREE_X?!1:Math.hypot(s-B.X,t-B.Z)>zt.THREE_R+.03}function bu(s,t,e=0,i=!1){return Math.abs(t)>=Dt.HW-e?!1:i?Math.abs(s)<Dt.HL-e:s>e&&s<Dt.HL-e}var rs=["shooting","handling","speed","defense","passing","vertical"],Ea={shooting:"Shooting",handling:"Ball handling",speed:"Speed",defense:"Defense",passing:"Passing",vertical:"Vertical"};var Ns={gym:{name:"Neighborhood Gym",crowd:220,loud:.5},arena:{name:"City Arena",crowd:1700,loud:1},practice:{name:"Practice Gym",crowd:0,loud:0}};function xp(s){let t=s>>>0||1;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}var vp=.05,Tb=.012;function en(s,t,e,i,n,r=F.LINES,a=vp,o=Tb){let c=i-t,l=n-e,h=Math.hypot(c,l);s.plane(r,a,h+a*.5,(t+i)/2,o,(e+n)/2,{ry:Math.atan2(c,l)})}function Ta(s,t,e,i,n,r,a=36,o=!1){for(let c=0;c<a;c++){if(o&&c%2)continue;let l=n+(r-n)*(c/a),h=n+(r-n)*((c+1)/a);en(s,t+Math.cos(l)*i,e+Math.sin(l)*i,t+Math.cos(h)*i,e+Math.sin(h)*i)}}var Ab=(s,t)=>Ar(`circle:${s}:${t}`,()=>{let e=new ea(s,t);return e.rotateX(-Math.PI/2),e},30,!1);function Rb(s,t,e,i,n,r,a=40){s.add(Ab(n,a),gi.mat(e,r,i),t,{noEdges:!0})}var as=class{constructor(t,e,i,n){this.b=t,this.cx=e,this.cz=i,this.ry=n,this.c=Math.cos(n),this.s=Math.sin(n)}w(t,e){return[this.cx+t*this.c+e*this.s,this.cz-t*this.s+e*this.c]}box(t,e,i,n,r,a,o,c={}){let[l,h]=this.w(r,o);this.b.box(t,e,i,n,l,a,h,this.ry+(c.ry||0),c)}cyl(t,e,i,n,r,a,o,c,l={}){let[h,d]=this.w(a,c);this.b.cyl(t,e,i,n,r,h,o,d,l)}quad(t,e,i,n,r,a,o={}){let[c,l]=this.w(n,a);this.b.quad(t,e,i,c,r,l,this.ry+Math.PI+(o.ry||0),o)}};function Cb(s,t={}){let e=Dt.HL,i=Dt.HW,n=xp(11),r=e+(t.apronX||3.2),a=i+(t.apronZ||2.6),o=.5;for(let l=-a;l<a-1e-6;l+=o){let h=-r-n()*3,d=Math.floor(n()*3);for(;h<r;){let u=2.4+n()*2.8,f=Math.max(-r,h),g=Math.min(r,h+u),x=Math.abs(l+o/2)<i&&!0,m=x?[F.FLOOR_A,F.FLOOR_B,F.FLOOR_C][d%3]:F.APRON;if(g>f)if(!x)s.plane(F.APRON,g-f,o,(f+g)/2,0,l+o/2);else{let p=Math.max(f,-e),v=Math.min(g,e);v>p&&s.plane(m,v-p,o,(p+v)/2,0,l+o/2),f<-e&&s.plane(F.APRON,Math.min(g,-e)-f,o,(f+Math.min(g,-e))/2,0,l+o/2),g>e&&s.plane(F.APRON,g-Math.max(f,e),o,(Math.max(f,e)+g)/2,0,l+o/2)}h+=u,d++}}let c=vp/2;en(s,-e,i-c,e,i-c),en(s,-e,-i+c,e,-i+c),en(s,e-c,-i,e-c,i),en(s,-e+c,-i,-e+c,i),en(s,0,-i,0,i),Ta(s,0,0,zt.CENTER_R,0,Math.PI*2,48),Rb(s,F.CENTER,0,0,1.2,.006),t.atlas&&s.quad(F.LINES,1.9,.42,0,.014,0,Math.PI/2,{rx:-Math.PI/2,uvRect:t.atlas.word(t.logo||"COURTSIDE")});for(let l of[1,-1]){let h=l*B.X,d=l*e,u=l*zt.FT_X;s.plane(F.PAINT,e-zt.FT_X,zt.KEY_HW*2,(d+u)/2,.005,0),en(s,d,zt.KEY_HW,u,zt.KEY_HW),en(s,d,-zt.KEY_HW,u,-zt.KEY_HW),en(s,u,-zt.KEY_HW,u,zt.KEY_HW);for(let p of[1.75,2.6,3.45,4.3])for(let v of[1,-1])en(s,d-l*p,v*zt.KEY_HW,d-l*p,v*(zt.KEY_HW+.12));let f=l>0?Math.PI/2:-Math.PI/2;Ta(s,u,0,zt.FT_R,f,f+Math.PI,20),Ta(s,u,0,zt.FT_R,f+Math.PI,f+Math.PI*2,20,!0),Ta(s,h,0,zt.NC_R,f,f+Math.PI,18);for(let p of[1,-1])en(s,d,p*zt.THREE_Z,l*zt.THREE_X,p*zt.THREE_Z);let g=Math.asin(zt.THREE_Z/zt.THREE_R),x=l>0?Math.PI-g:-g,m=l>0?Math.PI+g:g;Ta(s,h,0,zt.THREE_R,x,m,56)}}var Pb=()=>Ar("rim",()=>{let s=new sa(B.R+B.TUBE,B.TUBE*1.25,6,32);return s.rotateX(Math.PI/2),s},50);function up(s,t,e){let i=t*B.BOARD_X,n=B.BOARD_T,r=i+t*n,a=t*(Dt.HL+1.7);s.box(F.PAD,1.3,1.1,1.9,a+t*.3,.55,0),s.box(F.POLE,.3,3.1,.3,a,2.65,0),s.box(F.PAD,.36,1.8,.36,a,1.9,0),s.between(F.POLE,.1,a,3.25,0,r+t*.15,3.32,0,8),s.between(F.POLE,.06,a,2.35,0,r+t*.25,3.15,0,6),s.box(F.PAD,.5,.36,.3,r+t*.35,3.3,0);let o=B.BOARD_Y0+B.BOARD_H/2;s.box(F.GLASS,n,B.BOARD_H,B.BOARD_W,i+t*(n/2),o,0);let c=i-t*.006,l=.05;s.box(F.BOARD_FRAME,.012,l,B.BOARD_W,c,B.BOARD_Y0+B.BOARD_H-l/2,0,0,{noEdges:!0}),s.box(F.BOARD_FRAME,.012,l,B.BOARD_W,c,B.BOARD_Y0+l/2,0,0,{noEdges:!0});for(let u of[1,-1])s.box(F.BOARD_FRAME,.012,B.BOARD_H,l,c,o,u*(B.BOARD_W/2-l/2),0,{noEdges:!0});let h=B.Y+.02;s.box(F.BOARD_FRAME,.012,.05,.59,c,h+.45,0,0,{noEdges:!0}),s.box(F.BOARD_FRAME,.012,.05,.59,c,h,0,0,{noEdges:!0});for(let u of[1,-1])s.box(F.BOARD_FRAME,.012,.45,.05,c,h+.225,u*.27,0,{noEdges:!0});s.box(F.PAD,n+.04,.06,B.BOARD_W+.02,i+t*(n/2),B.BOARD_Y0-.02,0);let d=t*B.X;s.add(Pb(),gi.mat(d,B.Y,0),F.RIM),s.box(F.RIM,(B.BOARD_X-B.X-B.R)*1,.05,.14,t*(B.X+B.R+(B.BOARD_X-B.X-B.R)/2),B.Y-.02,0),s.box(F.METAL,.16,.36,.56,r-t*.04,B.BOARD_Y0+B.BOARD_H+.22,0),e.push({kind:"shot",x:i-t*.04-t*.08,y:B.BOARD_Y0+B.BOARD_H+.22,z:0,ry:t>0?-Math.PI/2:Math.PI/2,w:.5,h:.3})}function yp(){let s=new gi,t=12,e=5;for(let i of[1,-1]){let n=i*B.X,r=(a,o)=>{let c=a/(e-1),l=B.R+.004+(B.NET_R1-B.R)*c,h=(o+a%2*.5)/t*Math.PI*2;return[n+Math.cos(h)*l,B.Y-.01-B.NET_LEN*c,Math.sin(h)*l]};for(let a=0;a<e-1;a++)for(let o=0;o<t;o++){let c=r(a,o),l=r(a+1,o),h=r(a+1,a%2?o+1:o-1);s.line(c[0],c[1],c[2],l[0],l[1],l[2]),s.line(c[0],c[1],c[2],h[0],h[1],h[2])}}return s.buildEdges()}var dp=[F.CROWD_1,F.CROWD_1,F.CROWD_1,F.CROWD_2,F.CROWD_3,F.CROWD_4,F.CROWD_1,F.CROWD_3],Ib=[F.SKIN_1,F.SKIN_2,F.SKIN_3];function fp(s,t,e,i,n,r=!0,a=!0){let o=dp[Math.floor(n()*dp.length)],c=[n(),1],l=r?.46:.62,h=n()<.5?F.CROWD_1:F.CROWD_2;s.box(o,.42,l,.27,t,e+l/2,i,{bob:c});let[d,u]=s.w(t,i),f=Ib[Math.floor(n()*3)];if(s.b.add(yu(.135,0),gi.mat(d,e+l+.16,u,0,n()*6,0),f,{bob:c}),a){let x=n()<.16;for(let m of[-1,1])x?s.box(o,.1,.42,.11,t+m*.25,e+l+.18,i,{bob:c,rz:m*.25,detail:!0}):s.box(o,.1,l*.8,.12,t+m*.26,e+l*.56,i-.02,{bob:c,detail:!0})}let g=n();if(g<.14){let[x,m]=s.w(t,i);s.b.add(wa(.12,.2,6),gi.mat(x,e+l+.3,m),h,{bob:c,detail:!0})}else g<.24&&s.box(F.GOLD,.06,.5,.06,t+.2,e+l+.35,i-.1,{bob:c,detail:!0})}function Aa(s,t,e,i){let n=new as(s,t.cx,t.cz,t.ry),r=t.rows,a=t.rowDepth||.8,o=t.rowHeight||.4,c=t.base||.5,l=t.len,h=t.z0||0,d=t.roles||[F.STAND_A,F.STAND_B];n.box(t.wallRole||F.CONCRETE,l,c,.3,0,c/2,h-.15);let u=Math.max(2,Math.round(l/2.2));s.fine(()=>{for(let M=0;M<=u;M++)n.cyl(F.METAL,.03,.03,.9,5,-l/2+l*M/u,c+.45,h-.15);let[v,S]=n.w(-l/2,h-.15),[y,E]=n.w(l/2,h-.15);s.between(F.METAL,.035,v,c+.9,S,y,c+.9,E,6)});let f=Math.max(1,Math.round(l/11)),g=[];for(let v=1;v<f+1;v++)g.push(-l/2+l*v/(f+1));let x=1;for(let v=0;v<r;v++){let S=c+v*o,y=d[Math.floor(v/(t.band||2))%d.length],E=t.seatRole||d[(Math.floor(v/(t.band||2))+1)%d.length];n.box(y,l,o,a,0,S+o/2,h+a*(v+.5));let M=[-l/2,...g.flatMap(A=>[A-x/2,A+x/2]),l/2];if(s.fine(()=>{for(let A=0;A<M.length;A+=2){let b=M[A]+.1,T=M[A+1]-.1;T-b>.4&&n.box(E,T-b,.28,.07,(b+T)/2,S+o+.14,h+a*(v+1)-.1)}}),t.density>0){let A=Math.floor(l/.6);for(let b=0;b<A;b++){let T=-l/2+.3+b*.6+(e()-.5)*.1;g.some(R=>Math.abs(T-R)<x/2+.15)||i.seats.push({f:n,lx:T,y:S+o,lz:h+a*(v+.5)+.05,w:t.density,seated:!0,row:v+(t.tier||0)*20})}}}let m=c+r*o,p=h+a*r;n.box(t.wallRole||F.CONCRETE,l+.4,m+1.2,.3,0,(m+1.2)/2,p+.15);for(let v of[-1,1])n.box(t.wallRole||F.CONCRETE,.3,m+.5,p-h,v*(l/2+.15),(m+.5)/2,h+(p-h)/2);return{top:m,back:p}}function Gl(s,t,e,i,n){let r=new as(s,t,e,i);r.box(F.METAL,6,.08,.5,0,.45,0),s.fine(()=>{for(let a=0;a<8;a++){let o=-2.6+a*.75;r.box(n,.5,.08,.46,o,.5,0),r.box(n,.5,.5,.06,o,.78,.24,{rx:-.1})}});for(let a of[-2.8,2.8])r.box(F.METAL,.06,.45,.4,a,.22,0);for(let a=0;a<4;a++)r.box(F.BAND,.3,.03,.2,-2+a*1.3,.56,.05,{noEdges:!0})}function Lb(s,t,e,i,n){let r=new as(s,e,i,0);r.box(F.TABLE,8,.8,.8,0,.4,0),r.box(F.SCREEN,8.1,.5,.06,0,.45,-.42),n.forEach((a,o)=>r.quad(o%2?F.LAMP:F.GOLD,2.4,.32,-2.7+o*2.7,.45,-.46,{ry:Math.PI,uvRect:t.word(a)}));for(let a=0;a<5;a++)r.box(F.CHAIR,.5,.9,.5,-3+a*1.5,.45,.75)}function Nb(s,t,e,i,n,r=0){let a=0,o=(c,l,h,d,u)=>{let f=Math.abs(h-l),g=Math.max(1,Math.round(f/6)),x=f/g;for(let m=0;m<g;m++){let p=Math.min(l,h)+x*(m+.5),v=d?c:p,S=d?p:c;if(!d&&Math.abs(v)<r)continue;s.box(F.SCREEN,x-.08,.8,.2,v,.4,S,d?Math.PI/2:0);let y=.12,E=v+(d?-Math.sign(c)*y:0),M=S+(d?0:-Math.sign(c)*y);s.quad([F.LAMP,F.GOLD,F.BANNER_HOME][a%3],Math.min(x-.5,4.6),.5,E,.42,M,u,{uvRect:t.word(e[a++%e.length])})}};o(n,-i,i,!1,Math.PI),o(i,-n+.5,n-.5,!0,-Math.PI/2),o(-i,-n+.5,n-.5,!0,Math.PI/2)}function pp(s,t,e,i,n,r,a,o,c,l){let h=new as(s,t,i,n);h.box(o,r,a,.05,0,e,0),h.box(F.GOLD,r,.12,.07,0,e-a/2+.06,0),l&&h.quad(F.BAND,r*.85,a*.25,0,e+a*.15,-.04,{ry:Math.PI,uvRect:c.word(l)})}function mp(s,t,e,i,n={}){s.box(F.WALL_A,t*2+.4*2,i,.4,0,i/2,e+.4/2),s.box(F.WALL_A,t*2+.4*2,i,.4,0,i/2,-e-.4/2),s.box(F.WALL_B,.4,i,e*2,t+.4/2,i/2,0),s.box(F.WALL_B,.4,i,e*2,-t-.4/2,i/2,0),s.box(F.BRICK,t*2,n.dado||1.6,.06,0,(n.dado||1.6)/2,e-.03,0,{noEdges:!1}),s.box(F.BRICK,t*2,n.dado||1.6,.06,0,(n.dado||1.6)/2,-e+.03),s.box(F.BRICK,.06,n.dado||1.6,e*2,t-.03,(n.dado||1.6)/2,0),s.box(F.BRICK,.06,n.dado||1.6,e*2,-t+.03,(n.dado||1.6)/2,0),s.box(F.CEIL,t*2+.4*2,.3,e*2+.4*2,0,i+.15,0),n.windows&&s.fine(()=>{for(let c=0;c<n.windows;c++){let l=-t+t*2*(c+.5)/n.windows;for(let h of[1,-1])s.box(F.WINDOW,2.6,1.6,.08,l,i-1.6,h*(e-.02)),s.box(F.METAL,.06,1.6,.1,l,i-1.6,h*(e-.04)),s.box(F.METAL,2.6,.06,.1,l,i-1.6,h*(e-.04))}});let a=Math.round(t*2/4);s.fine(()=>{for(let c=0;c<=a;c++){let l=-t+t*2*c/a;s.between(F.METAL,.06,l,i-.05,-e,l,i-.05,e,5),s.between(F.METAL,.04,l,i-1,-e*.8,l,i-1,e*.8,5);for(let h=0;h<8;h++){let d=-e*.8+e*1.6*h/8,u=-e*.8+e*1.6*(h+1)/8;s.line(l,i-1,d,l,i-.05,u)}}});let o=n.lamps||[5,3];for(let c=0;c<o[0];c++)for(let l=0;l<o[1];l++){let h=-t*.7+t*1.4*c/Math.max(1,o[0]-1),d=-e*.55+e*1.1*l/Math.max(1,o[1]-1);s.cyl(F.METAL,.45,.7,.5,10,h,i-1.4,d),s.cyl(F.LAMP,.6,.6,.06,10,h,i-1.66,d),s.line(h,i-1.15,d,h,i-.05,d)}}function gp(s,t,e,i,n,r,a,o){let c=new as(s,t,i,n);c.box(F.METAL,r+.6,a+.6,.4,0,e,.25),c.box(F.BANNER_HOME,r+.7,.18,.45,0,e+a/2+.25,.25),o.push({kind:"score",x:t,y:e,z:i,ry:n,w:r,h:a})}function bp(s,t){let{atlas:e,quality:i="high",homeName:n="HOME",awayName:r="AWAY",seed:a=7}=t,o=xp(a*31+s.length),c=i==="low"?.35:i==="medium"?.65:1,l=new gi({bob:!0,atlas:!0}),h=new gi({atlas:!0}),d={seats:[],people:0},u=[],f={type:s};Cb(l,{atlas:e,logo:t.logo||"COURTSIDE"}),up(h,1,u),up(h,-1,u);let g=["COURTSIDE",n.toUpperCase(),"SHOT CLOCK 14",r.toUpperCase(),"DEFENSE!","FIRST PERSON HOOPS"];if(s==="gym"||s==="practice"){mp(l,20,14.5,9,{windows:6,lamps:[5,3],dado:1.8});for(let S of[1,-1])for(let y=-3;y<=3;y++)l.box(F.PAD,.12,1.8,1.9,S*(20-.1),.9,y*2.05);for(let S of[1,-1])for(let y=0;y<4;y++)pp(l,S*(20-.25),6.6,-4.5+y*3,S>0?-Math.PI/2:Math.PI/2,1.6,2.4,y%2?F.BANNER_HOME:F.BANNER_AWAY,e,y%2?n.toUpperCase().slice(0,12):"CHAMPIONS");if(gp(l,20-.3,5.2,0,-Math.PI/2,4.4,1.7,u),gp(l,-20+.3,5.2,0,Math.PI/2,4.4,1.7,u),s==="gym"){for(let S of[1,-1])Aa(l,{cx:0,cz:S*(Dt.HW+2.6),ry:S>0?0:Math.PI,len:26,rows:7,rowDepth:.72,rowHeight:.36,base:.42,density:c,roles:[F.WOOD,F.STAND_B],seatRole:F.WOOD,wallRole:F.WALL_B},o,d);Gl(h,-6,-(Dt.HW+1.35),Math.PI,F.BANNER_HOME),Gl(h,6,-(Dt.HW+1.35),Math.PI,F.BANNER_AWAY)}else{for(let S of[1,-1])l.box(F.WOOD,26,2.4,.9,0,1.2,S*(14.5-.6));for(let S=0;S<2;S++){let y=2+S*4;l.box(F.METAL,1.4,.06,.45,y,.7,-(Dt.HW+1.6)),l.box(F.METAL,1.4,.06,.45,y,.35,-(Dt.HW+1.6));for(let E=0;E<5;E++)l.sphere(F.BALL,.12,y-.52+E*.26,.85,-(Dt.HW+1.6),{ws:8,hs:6}),l.sphere(F.BALL,.12,y-.52+E*.26,.5,-(Dt.HW+1.6),{ws:8,hs:6})}for(let S=0;S<6;S++)l.cone(F.CONE,.12,.3,10,-6+S*1.2,.15,Dt.HW+1.2)}}else{mp(l,30,25,22,{windows:0,lamps:[6,4],dado:3}),Nb(l,e,g,Dt.HL+2.3,Dt.HW+2.2,7.5);let S={rows:12,rowDepth:.85,rowHeight:.45,base:1.2,density:c,roles:[F.STAND_A,F.STAND_C],seatRole:F.SEAT};for(let T of[1,-1])Aa(l,{...S,cx:0,cz:T*(Dt.HW+4.4),ry:T>0?0:Math.PI,len:34},o,d);for(let T of[1,-1])Aa(l,{...S,cx:T*(Dt.HL+4.8),cz:0,ry:T>0?Math.PI/2:-Math.PI/2,len:24},o,d);let y={...S,rows:10,base:7.4,z0:11,tier:1,density:.85*c,roles:[F.STAND_B,F.STAND_C],wallRole:F.WALL_B};for(let T of[1,-1])Aa(l,{...y,cx:0,cz:T*(Dt.HW+4.4),ry:T>0?0:Math.PI,len:44},o,d);for(let T of[1,-1])Aa(l,{...y,cx:T*(Dt.HL+4.8),cz:0,ry:T>0?Math.PI/2:-Math.PI/2,len:32},o,d);let E=new as(l,0,Dt.HW+1.5,0);for(let T=0;T<26;T++){let R=-12.5+T;E.box(F.CHAIR,.5,.45,.5,R,.22,0),o()<.75*c&&(fp(E,R,.45,0,o,!0,i==="high"),d.people++)}Gl(h,-6,-(Dt.HW+1.6),Math.PI,F.BANNER_HOME),Gl(h,6,-(Dt.HW+1.6),Math.PI,F.BANNER_AWAY),Lb(h,e,0,-(Dt.HW+1.9),["COURTSIDE",n.toUpperCase(),r.toUpperCase()]);let M=12.5,A=6.4,b=3.6;l.box(F.METAL,A+.6,b+.8,A+.6,0,M,0),l.box(F.BANNER_HOME,A+.8,.4,A+.8,0,M+b/2+.55,0),l.box(F.METAL,3,1.4,3,0,M-b/2-1,0);for(let[T,R,P]of[[0,A/2+.31,0],[0,-A/2-.31,Math.PI],[A/2+.31,0,Math.PI/2],[-A/2-.31,0,-Math.PI/2]])u.push({kind:"score",x:T,y:M,z:R,ry:P+Math.PI,w:A,h:b});for(let[T,R]of[[-3,-3],[3,-3],[3,3],[-3,3]])l.line(T,M+b/2+.75,R,T*2,22,R*2);for(let T=0;T<6;T++)pp(l,-12.5+T*5,17,25-.4,Math.PI,2,3.4,T%2?F.BANNER_HOME:F.GOLD,e,T%2?n.toUpperCase().slice(0,12):"CHAMPIONS")}let x=Math.round(Ns[s].crowd*c);if(x>0&&d.seats.length){let m=d.seats,p=m.reduce((S,y)=>S+y.w,0),v=Math.min(1,x/p);for(let S of m)o()<S.w*v&&(fp(S.f,S.lx,S.y,S.lz,o,S.seated,i==="high"&&S.row<5),d.people++)}return f.people=d.people,f.solid=l.buildSolid(),f.edges=l.buildEdges(),f.casterSolid=h.buildSolid(),f.casterEdges=h.buildEdges(),f.screens=u,f.edgeCount=l.edgeCount,f.vertCount=l.vcount,f}var Vt={PELVIS:0,TORSO:1,HEAD:2,UARM_L:3,UARM_R:4,FARM_L:5,FARM_R:6,THIGH_L:7,THIGH_R:8,SHIN_L:9,SHIN_R:10,BOOT_L:11,BOOT_R:12},Pr=13,je=1.1,Mu=1.07,yi={thigh:.44*je,shin:.43*je,ankle:.08*je,upper:.29*je*Mu,fore:.27*je*Mu,hipW:.095*je,shoulderW:.19*je,torsoH:.5*je,waist:.07*je,neck:.58*je,shoulderY:.45*je},Db=new Gt().makeScale(je,je,je),kb=new Gt().makeScale(je,je*Mu,je),fe=(s,t,e,i=0,n=0,r=0,a=1,o=1,c=1)=>Db.clone().multiply(gi.mat(s,t,e,i,n,r,a,o,c)),Ds=(s,t,e,i=0,n=0,r=0,a=1,o=1,c=1)=>kb.clone().multiply(gi.mat(s,t,e,i,n,r,a,o,c)),$l={high:{body:16,limb:11,head:[16,12],small:[8,6],joint:[11,8],sole:11,laces:!0},medium:{body:10,limb:8,head:[12,9],small:[6,4],joint:[7,5],sole:7,laces:!0},low:{body:8,limb:6,head:[10,7],small:[5,4],joint:[6,4],sole:6,laces:!1}},Cr=[[0,.165,.112,0],[.1,.176,.118,.004],[.22,.198,.126,.01],[.34,.222,.132,.012],[.44,.232,.122,.002],[.5,.198,.106,-.004],[.545,.1,.07,0]],Ob=[[-.13,.162,.118,0],[-.03,.178,.126,.002],[.08,.17,.118,0]],Ub=[[.04,.176,.124,0],[.085,.174,.122,0]],Fb=[[-.34,.094,.096,.004],[-.15,.1,.102,.004],[-.02,.098,.1,.002],[.03,.097,.099,0]],Bb=[[-.455,.045,.047,.004],[-.4,.05,.053,.004],[-.3,.056,.058,.004],[-.14,.064,.069,.008],[0,.066,.067,.004]],zb=[[-.43,.038,.04,.002],[-.3,.044,.046,0],[-.14,.054,.06,-.009],[-.04,.05,.054,-.003],[0,.046,.05,0]],Hb=[[-.44,.042,.044,.002],[-.34,.046,.048,0]],Vb=[[-.27,.04,.04,0],[-.14,.05,.052,0],[-.03,.058,.058,0],[.02,.056,.056,0]],Gb=[[-.255,.03,.027,0],[-.08,.043,.042,0],[0,.04,.041,0]],Wb=[[-.02,.064,.064,0],[.012,.063,.063,0]],$b=[[-.062,.034,.05,.03],[-.045,.047,.062,.03],[.02,.052,.058,.033],[.1,.056,.042,.047],[.17,.05,.03,.058],[.212,.03,.02,.066]],Xb=[[-.066,.04,.012,.082],[-.04,.051,.012,.083],[.1,.06,.012,.083],[.175,.055,.012,.083],[.218,.033,.011,.081]],qb=[F.HAIR_1,F.HAIR_2,F.HAIR_1],Yb=[F.SKIN_1,F.SKIN_2,F.SKIN_3],_u=["crop","afro","buzz","headband","braids","bald"];function Mp(s){let t=s.team;return{shirt:t===0?F.JERSEY_0:F.JERSEY_1,shorts:t===0?F.SHORTS_0:F.SHORTS_1,trim:t===0?F.TRIM_0:F.TRIM_1,num:t===0?F.NUM_0:F.NUM_1,skin:s.isHuman?F.SKIN_H:Yb[s.id*7%3],hair:s.isHuman?F.HAIR_H:qb[s.id*5%3],shoe:s.isHuman?F.SHOE_H:F.SHOE}}function _p(s,t,e,i){let n=s.positions,r=new Array(n.length/3),a=(t-1)*e*2;for(let o=0;o<n.length/9;o++){let c=o<a?i(Math.floor(o%(2*e)/2),Math.floor(o/(2*e))):i(-1,-1);r[o*3]=r[o*3+1]=r[o*3+2]=c}return r}function Wl(s,t,e){let i=0;for(;i<Cr.length-2&&Cr[i+1][0]<s;)i++;let n=Cr[i],r=Cr[i+1],a=Math.min(1,Math.max(0,(s-n[0])/(r[0]-n[0]))),o=n[1]+(r[1]-n[1])*a,c=n[2]+(r[2]-n[2])*a,l=n[3]+(r[3]-n[3])*a,h=Math.min(.97,Math.abs(t)/o),d=c*Math.sqrt(1-h*h)*(e?-1:1);return{z:l+d,ry:Math.atan2(t/(o*o),d/(c*c))}}function Kb(s,t,e,i,n){let[r,a]=i.head,[o,c]=i.small;s.add(Ii(.113,r,a),fe(0,.14,-.004,0,0,0,.93,1.03,1),t.skin,e),s.add(Ii(.083,Math.round(r*.75),Math.round(a*.75)),fe(0,.078,.022,0,0,0,.97,.86,1),t.skin,e);for(let h of[-1,1])s.add(Ii(.027,o,c),fe(h*.106,.125,-.004,0,0,0,.45,1.15,.8),t.skin,e),s.add(Ii(.0135,o,c),fe(h*.041,.142,.101,0,0,0,1.25,1,.55),F.EYE,{...e,noEdges:!0}),s.add(Ls(.04,.01,.012),fe(h*.041,.166,.1,0,0,-h*.12),t.hair,{...e,creaseOnly:!0});s.add(wa(.019,.042,6),fe(0,.118,.11,Math.PI/2+.25),t.skin,e),s.add(Ls(.036,.005,.006),fe(0,.071,.103),F.EYE,{...e,noEdges:!0});let l=(h,d,u,f=.145,g=-.012)=>s.add(Ii(h,r,Math.max(4,Math.round(a*.5)),Math.PI*2,Math.PI*d),fe(0,f,g,u),t.hair,e);switch(n){case"buzz":l(.1165,.37,-.2);break;case"bald":break;case"afro":s.add(Ii(.14,r,a),fe(0,.19,-.03,0,0,0,1.05,.82,1.02),t.hair,e);break;case"headband":l(.119,.42,-.25),s.add(xi("band",[[.155,.112,.118,-.004],[.19,.108,.114,-.006]],i.limb,{caps:[!1,!1]}),fe(0,0,0),F.BAND,e);break;case"braids":l(.118,.44,-.25);for(let h=-3;h<=3;h++)s.add(Sa(.012,.012,.2,5),fe(h*.03,.2,-.02,.15,0,0,1,1,1),t.hair,{...e,creaseOnly:!0});break;default:l(.12,.43,-.25)}}function Xl(s,t,e,i,n,r){let[a,o]=r.small;s.add(Ii(.064,r.limb,Math.round(r.limb*.7)),Ds(0,-.005,0),t.skin,e),s.add(xi("armhole",Wb,r.limb,{caps:[!1,!1]}),Ds(0,0,0,0,0,n*.35),t.trim,e),s.add(xi("upper",Vb,r.limb),Ds(0,0,0),t.skin,e),s.add(Ii(.041,r.joint[0],r.joint[1]),Ds(0,0,0),t.skin,{...i,noEdges:!0}),s.add(xi("fore",Gb,r.limb),Ds(0,0,0),t.skin,i),s.add(Ii(.05,a+2,o+1),Ds(0,-.29,.004,0,0,0,.74,1.15,.5),t.skin,i),s.add(Ii(.021,a,o),Ds(-n*.018,-.27,.03,.3,0,0,.9,1.5,.9),t.skin,i)}function Zb(s,t,e,i,n,r){let a=Mp(t),o=p=>({part:e+p}),c=n.body,l=Cr.length;s.add(xi("pelvis",Ob,n.body),fe(0,0,0),a.shorts,o(Vt.PELVIS)),s.add(xi("waistband",Ub,n.body,{caps:[!1,!1]}),fe(0,0,0),a.trim,o(Vt.PELVIS));let h=xi("torso",Cr,n.body),d=p=>{let v=(p+.5)/c;return Math.abs(v-.25)<.045||Math.abs(v-.75)<.045},u=r&&r.pattern==="stripes"?_p(h,l,c,p=>p>=0&&p%2===1?a.trim:a.shirt):_p(h,l,c,(p,v)=>p>=0&&d(p)&&v<5?a.trim:a.shirt);s.add(h,fe(0,0,0),a.shirt,{...o(Vt.TORSO),roles:u}),s.add(xi("collar",[[.505,.09,.07,.004],[.548,.078,.06,.002]],n.body,{caps:[!1,!1]}),fe(0,0,0),a.trim,o(Vt.TORSO)),s.add(Sa(.05,.056,.12,n.limb),fe(0,.575,0),a.skin,o(Vt.TORSO));let f=String(t.number??0),g=f.length>1?.13:.17;for(let p=0;p<f.length;p++){let v=(p-(f.length-1)/2)*g*.95,S=Wl(.27,v,!0);s.add(Tr(g,.22),fe(v,.27,S.z-.005,0,S.ry,0),a.num,{...o(Vt.TORSO),uvRect:i.digit(+f[p]),noEdges:!0});let y=Wl(.26,v*.7,!1);s.add(Tr(g*.7,.15),fe(v*.7,.26,y.z+.005,0,y.ry,0),a.num,{...o(Vt.TORSO),uvRect:i.digit(+f[p]),noEdges:!0})}let x=(t.name||"").split(" ").pop().toUpperCase().slice(0,10);if(x){let p=Wl(.43,0,!0);s.add(Tr(.26,.045),fe(0,.43,p.z-.006,0,p.ry,0),a.num,{...o(Vt.TORSO),uvRect:i.word(x),noEdges:!0})}if(r&&r.word){let p=Wl(.385,0,!1);s.add(Tr(.28,.06),fe(0,.385,p.z+.006,0,p.ry,0),a.num,{...o(Vt.TORSO),uvRect:i.word(r.word),noEdges:!0})}let m=t.isHuman?_u[t.look&&t.look.style||0]:_u[(t.id*5+(t.number||0)*3)%_u.length];Kb(s,a,o(Vt.HEAD),n,m),Xl(s,a,o(Vt.UARM_L),o(Vt.FARM_L),1,n),Xl(s,a,o(Vt.UARM_R),o(Vt.FARM_R),-1,n);for(let[p,v,S,y]of[[Vt.THIGH_L,Vt.SHIN_L,Vt.BOOT_L,1],[Vt.THIGH_R,Vt.SHIN_R,Vt.BOOT_R,-1]])if(s.add(xi("shortsleg",Fb,n.limb,{caps:[!1,!1]}),fe(0,0,0),a.shorts,o(p)),s.add(Ls(.016,.33,.03),fe(y*.097,-.16,0),a.trim,{...o(p),creaseOnly:!0}),s.add(xi("thigh",Bb,n.limb),fe(0,0,0),a.skin,o(p)),s.add(Ii(.047,n.joint[0],n.joint[1]),fe(0,-.005,.006),a.skin,{...o(v),noEdges:!0}),s.add(xi("calf",zb,n.limb),fe(0,0,0),a.skin,o(v)),s.add(xi("sock",Hb,n.limb,{caps:[!1,!1]}),fe(0,0,0),F.SOCK,o(v)),s.add(xi("shoe",$b,n.limb,{axis:"z"}),fe(0,0,0),a.shoe,o(S)),s.add(xi("sole",Xb,n.sole,{axis:"z"}),fe(0,0,0),F.SOLE,{...o(S),creaseOnly:!0}),n.laces){for(let E=0;E<3;E++)s.add(Ls(.036,.004,.008),fe(0,-.002-E*.008,.03+E*.03,-.25),F.SOLE,{...o(S),noEdges:!0});s.add(Ls(.004,.02,.09),fe(y*.053,-.045,.05,-.12),F.SOLE,{...o(S),noEdges:!0})}}function Sp(s,t){let e=Ar("bball",()=>new Ss(Et,3),70);s.add(e,new Gt,F.BALL,{part:t});let i=Et*1.004,n=40,r=a=>{let o=a(0);for(let c=1;c<=n;c++){let l=a(c/n*Math.PI*2);s.line(o[0],o[1],o[2],l[0],l[1],l[2],t),o=l}};r(a=>[Math.cos(a)*i,0,Math.sin(a)*i]),r(a=>[0,Math.cos(a)*i,Math.sin(a)*i]);for(let a of[1,-1])r(c=>[a*Math.cos(.92)*i,Math.sin(.92)*Math.cos(c)*i,Math.sin(.92)*Math.sin(c)*i])}var ql=class s{constructor(t,e,i={}){this.players=t,this.rows=t.length*Pr+1,this.ballRow=t.length*Pr;let n=Math.max(1,this.rows);this.data=new Float32Array(16*n),this.texture=new qn(this.data,4,n,mi,pi),this.texture.minFilter=Le,this.texture.magFilter=Le,this.texture.needsUpdate=!0,Ot.uParts.value=this.texture;let r=new gi({parts:!0,atlas:!0}),a=$l[i.quality]||$l.high,o=i.kits||[];t.forEach((c,l)=>Zb(r,c,l*Pr,e,a,o[c.team])),Sp(r,this.ballRow),this.solidGeo=r.buildSolid(),this.edgeGeo=r.buildEdges(),this.mesh=new ce(this.solidGeo,s.solidMaterial()),this.mesh.frustumCulled=!1,this.mesh.castShadow=!0,this.mesh.receiveShadow=!0,this.mesh.customDepthMaterial=s.depthMaterial(),this.edges=new ce(this.edgeGeo,s.edgeMaterial()),this.edges.frustumCulled=!1,this.edges.renderOrder=1;for(let c=0;c<this.rows;c++)this.setIdentity(c)}static solidMaterial(){return s._sm||(s._sm=wr({parts:!0,atlas:!0}))}static edgeMaterial(){return s._em||(s._em=Is({parts:!0,widthScale:.75}))}static depthMaterial(){return s._dm||(s._dm=ap())}setIdentity(t){let e=t*16;this.data.fill(0,e,e+16),this.data[e]=this.data[e+5]=this.data[e+10]=this.data[e+15]=1}setMatrix(t,e){this.data.set(e.elements,t*16)}hide(t){let e=t*16;this.data.fill(0,e,e+16),this.data[e]=this.data[e+5]=this.data[e+10]=1e-4,this.data[e+13]=-50,this.data[e+15]=1}commit(){this.texture.needsUpdate=!0}dispose(){this.solidGeo.dispose(),this.edgeGeo.dispose(),this.texture.dispose()}},zi={UARM_L:0,UARM_R:1,FARM_L:2,FARM_R:3,BALL:4},Ra=class{constructor(t,e={}){this.rows=5,this.data=new Float32Array(16*this.rows),this.texture=new qn(this.data,4,this.rows,mi,pi),this.texture.minFilter=Le,this.texture.magFilter=Le;let i=new gi({parts:!0,atlas:!0}),n=$l[e.quality]||$l.high,r=Mp(t);Xl(i,r,{part:zi.UARM_L},{part:zi.FARM_L},1,n),Xl(i,r,{part:zi.UARM_R},{part:zi.FARM_R},-1,n),Sp(i,zi.BALL),this.solidGeo=i.buildSolid(),this.edgeGeo=i.buildEdges();let a=wr({parts:!0,atlas:!0});a.uniforms.uParts={value:this.texture};let o=Is({parts:!0,widthScale:.8});o.uniforms.uParts={value:this.texture},this.mesh=new ce(this.solidGeo,a),this.edges=new ce(this.edgeGeo,o),this.mesh.frustumCulled=!1,this.edges.frustumCulled=!1,this.edges.renderOrder=1,this.scene=new vs,this.scene.add(this.mesh,this.edges),this.materials=[a,o];for(let c=0;c<this.rows;c++)this.hide(c)}setMatrix(t,e){this.data.set(e.elements,t*16)}hide(t){let e=t*16;this.data.fill(0,e,e+16),this.data[e]=this.data[e+5]=this.data[e+10]=1e-4,this.data[e+13]=-50,this.data[e+15]=1}commit(){this.texture.needsUpdate=!0}dispose(){this.solidGeo.dispose(),this.edgeGeo.dispose(),this.texture.dispose();for(let t of this.materials)t.dispose()}};var _e=class s{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return this.x=t,this.y=e,this.z=i,this}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}clone(){return new s(this.x,this.y,this.z)}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}addScaled(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}scale(t){return this.x*=t,this.y*=t,this.z*=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}len(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}lenSq(){return this.x*this.x+this.y*this.y+this.z*this.z}lenXZ(){return Math.sqrt(this.x*this.x+this.z*this.z)}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}dotXZ(t){return this.x*t.x+this.z*t.z}dist(t){let e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return Math.sqrt(e*e+i*i+n*n)}distXZ(t){let e=this.x-t.x,i=this.z-t.z;return Math.sqrt(e*e+i*i)}normalize(){let t=this.len();return t>1e-9&&(this.x/=t,this.y/=t,this.z/=t),this}flatNormalize(){this.y=0;let t=Math.sqrt(this.x*this.x+this.z*this.z);return t>1e-9&&(this.x/=t,this.z/=t),this}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}isFinite(){return Number.isFinite(this.x)&&Number.isFinite(this.y)&&Number.isFinite(this.z)}},Mt=(s,t,e)=>s<t?t:s>e?e:s;var wp=Math.PI*2;function Ep(s){return s=(s+Math.PI)%wp,s<0&&(s+=wp),s-Math.PI}var kn=(s,t)=>Ep(t-s),re=(s,t)=>Math.atan2(s,t);function Su(s,t,e){let i=kn(s,t);return Math.abs(i)<=e?t:Ep(s+Math.sign(i)*e)}function ks(s,t,e,i,n,r){let a=n-e,o=r-i,c=a*a+o*o,l=c>1e-9?((s-e)*a+(t-i)*o)/c:0;l=Mt(l,0,1);let h=e+a*l,d=i+o*l,u=s-h,f=t-d;return{d:Math.sqrt(u*u+f*f),t:l}}function wu(s){return s<1.5?1.05+s*.18:s<5?1.32+(s-1.5)*.42:2.79+(s-5)*.28}function Tp(s){return Mt(.68/s,.18,.6)}var Jb=1;function jb(s=60){return{shooting:s,handling:s,speed:s,defense:s,passing:s,vertical:s}}var xe={EYE:1.9,SHOULDER:1.6,REACH:2.36,HOLD_Y:1.12,RADIUS:.3},Yl=class{constructor(t={}){this.id=Jb++,this.team=t.team??0,this.slot=t.slot??0,this.name=t.name||"Player",this.number=t.number??7,this.isHuman=!!t.isHuman,this.archetype=t.archetype||"wing",this.attrs=Object.assign(jb(60),t.attrs||{}),this.look=t.look||null,this.pos=new _e,this.prevPos=new _e,this.vel=new _e,this.vy=0,this.yaw=0,this.prevYaw=0,this.desired=new _e,this.sprint=!1,this.faceYaw=null,this.stance=!1,this.stanceW=0,this.handsUp=!1,this.stamina=1,this.gait=0,this.prevGait=0,this.jumpH=0,this.landT=-10,this.action=null,this.dribble=null,this.hand="R",this.noCatchUntil=0,this.stealReadyAt=0,this.offBalanceUntil=0,this.bumpUntil=0,this.celebrateUntil=0,this.requestUntil=0,this.requestReadyAt=0,this.beatenUntil=0,this.ai={state:"idle",target:new _e,think:0,mark:null,spot:null,wait:0}}get speed(){return Math.sqrt(this.vel.x*this.vel.x+this.vel.z*this.vel.z)}get airborne(){return this.pos.y>.001||this.vy>0}jogSpeed(){return 4.2+(this.attrs.speed-50)*.014}sprintSpeed(){let t=this.stamina<.35?(.35-this.stamina)/.35:0;return(6.2+(this.attrs.speed-50)*.028)*(1-.14*t)}stanceSpeed(){return 3.5+(this.attrs.defense-50)*.012+(this.attrs.speed-50)*.006}maxSpeed(t,e){if(this.stance)return this.stanceSpeed();let i=t&&this.stamina>.02?this.sprintSpeed():this.jogSpeed();return e&&(i*=t?.88+(this.attrs.handling-50)*.0012:.94),i}jumpHeight(){return .5+this.attrs.vertical/99*.42}forwardX(){return Math.sin(this.yaw)}forwardZ(){return Math.cos(this.yaw)}};function Eu(s){s.action=null,s.dribble=null,s.vel.set(0,0,0),s.desired.set(0,0,0),s.vy=0,s.pos.y=0,s.stance=!1,s.handsUp=!1,s.offBalanceUntil=0,s.celebrateUntil=0,s.requestUntil=0,s.beatenUntil=0,s.prevPos.copy(s.pos),s.prevYaw=s.yaw}function Sn(s,t,e){if(s.airborne)return!1;let i=e??s.jumpHeight();return s.vy=Math.sqrt(2*Ne*i),s.jumpH=i,s.vel.scale(.85),!0}function Ap(s,t,e,i=!1){if(s.prevPos.copy(s.pos),s.prevYaw=s.yaw,s.prevGait=s.gait,s.airborne){s.vy-=Ne*t,s.pos.x+=s.vel.x*t,s.pos.z+=s.vel.z*t,s.pos.y+=s.vy*t,s.pos.y<=0&&(s.pos.y=0,s.vy=0,s.landT=e,s.vel.scale(.45));let M=s.faceYaw??s.yaw;s.yaw=Su(s.yaw,M,6*t);return}let n=1/0;e<s.offBalanceUntil&&(n=1.6),e<s.bumpUntil&&(n=Math.min(n,2.4)),e-s.landT<.12&&(n=Math.min(n,1));let r=s.action;r&&r.lockMove&&(n=Math.min(n,r.lockMove));let a=s.desired,o=a.x,c=a.z,l=Math.sqrt(o*o+c*c),h=Math.min(s.maxSpeed(s.sprint,i),n);if(l>.1){let M=Math.abs(kn(s.yaw,re(o,c))),A=s.stance?M>2.2?.85:1:M>2.2?.66:M>1.1?.86:1;h*=A}l>h&&(o*=h/l,c*=h/l,l=h);let d=s.vel.x,u=s.vel.z,f=o-d,g=c-u,x=Math.sqrt(f*f+g*g),m=(s.stance?17:12)+s.attrs.speed*.05,v=(o*d+c*u<d*d+u*u-.01?22:m)*t;x>v&&(f*=v/x,g*=v/x),s.vel.x+=f,s.vel.z+=g,s.vel.y=0,s.pos.x+=s.vel.x*t,s.pos.z+=s.vel.z*t,s.pos.y=0;let S=s.faceYaw,y=s.speed;S==null&&(S=y>.4?re(s.vel.x,s.vel.z):s.yaw);let E=(s.isHuman?16:9)*t;s.yaw=Su(s.yaw,S,E),s.sprint&&y>s.jogSpeed()*1.03?s.stamina-=.06*t:y<2.2?s.stamina+=.06*t:s.stamina+=.02*t,s.stamina=Mt(s.stamina,0,1),y>.05&&(s.gait+=y*t/wu(y)),s.stanceW+=((s.stance?1:0)-s.stanceW)*Math.min(1,t*10)}function Rp(s,t,e){let i=s.length;for(let n=0;n<i;n++){let r=s[n];for(let a=n+1;a<i;a++){let o=s[a],c=o.pos.x-r.pos.x,l=o.pos.z-r.pos.z,h=c*c+l*l,d=r.isHuman||o.isHuman?.7:.62;if(h<d*d&&h>1e-8){let u=Math.sqrt(h),f=d-u,g=c/u,x=l/u,m=1,p=1;r===e&&o.stance?(m=1.6,p=.4,r.bumpUntil=t+.25):o===e&&r.stance&&(p=1.6,m=.4,o.bumpUntil=t+.25);let v=m+p;r.pos.x-=g*f*(m/v),r.pos.z-=x*f*(m/v),o.pos.x+=g*f*(p/v),o.pos.z+=x*f*(p/v)}else h<=1e-8&&(o.pos.x+=.05)}}}function Cp(s,t=!1){s.pos.x=Mt(s.pos.x,t?-14.6:-1.5,14.6),s.pos.z=Mt(s.pos.z,-8.3,8.3)}var Tu=new N(0,1,0),Ae=Array.from({length:24},()=>new N),os=new Mi,Li=(s,t,e)=>s+(t-s)*e,nn=(s,t,e)=>s<t?t:s>e?e:s,Ir=s=>(s=nn(s,0,1),s*s*(3-2*s));function Qb(s,t,e){let i=t-s;for(;i>Math.PI;)i-=Math.PI*2;for(;i<-Math.PI;)i+=Math.PI*2;return s+i*e}function t_(s){return s-Math.floor(s)}var Qt=()=>new N,Au={x:Qt(),y:Qt(),z:Qt()},Kl={d:Qt(),bend:Qt(),r:Qt(),t:Qt()},we={pelvis:Qt(),waist:Qt(),neck:Qt(),fwd:Qt(),side:Qt(),hip:Qt(),ankT:Qt(),knee:Qt(),ankle:Qt(),pole:Qt(),back:Qt(),sh:Qt(),tgt:Qt(),off:Qt(),elbow:Qt(),hand:Qt(),pole2:Qt()},Pp=1.03;function Zl(s,t,e,i){let n=Au.y.subVectors(t,e);n.lengthSq()<1e-8&&n.set(0,1,0),n.normalize();let r=Au.z.copy(i).addScaledVector(n,-i.dot(n));r.lengthSq()<1e-6&&(r.set(0,0,1).addScaledVector(n,-n.z),r.lengthSq()<1e-6&&r.set(1,0,0)),r.normalize();let a=Au.x.crossVectors(n,r);return s.makeBasis(a,n,r),s.setPosition(t),s}function Ip(s,t,e,i,n,r,a){let o=Kl.r.copy(s),c=Kl.t.copy(t),l=Kl.d.subVectors(c,o),h=l.length();h<1e-4?(l.set(0,-1,0),h=1e-4):l.divideScalar(h),h=nn(h,Math.abs(e-i)+.02,e+i-.002),a.copy(o).addScaledVector(l,h);let d=nn((e*e+h*h-i*i)/(2*e*h),-1,1),u=Math.sqrt(1-d*d),f=Kl.bend.copy(n).addScaledVector(l,-n.dot(l));f.lengthSq()<1e-6&&f.set(0,0,1),f.normalize(),r.copy(o).addScaledVector(l,e*d).addScaledVector(f,e*u)}var Jl=class{constructor(){this.pos=Qt(),this.plant=Qt(),this.from=Qt(),this.swing=!1,this.step=null,this.out=Qt()}},jl=class{constructor(t){this.p=t,this.feet=[new Jl,new Jl],this.ready=!1,this.lastRoot=Qt(),this.lean=0,this.headYaw=0,this.headPitch=0,this.m=Array.from({length:13},()=>new Gt),this.root=Qt(),this.yaw=0,this.hands=[Qt(),Qt()],this.shoulders=[Qt(),Qt()],this.handW=[0,0],this.prevHand=[Qt(),Qt()],this.wTarget=[Qt(),Qt()],this.reachW=0,this.stance=0}reset(){this.ready=!1}update(t){let e=this.p,i=t.match,n=Math.min(t.dt,.05),r=t.now,a=t.alpha,o=i.ball,c=e.action,l=Li(e.prevPos.y,e.pos.y,a),h=this.root.set(Li(e.prevPos.x,e.pos.x,a),0,Li(e.prevPos.z,e.pos.z,a)),d=this.yaw=Qb(e.prevYaw,e.yaw,a),u=Ae[0].set(Math.sin(d),0,Math.cos(d)),f=Ae[1].set(Math.cos(d),0,-Math.sin(d)),g=e.vel.x,x=e.vel.z,m=Math.hypot(g,x),p=nn(m/7,0,1),v=l>.01;this.stance=Li(this.stance,e.stanceW,1-Math.exp(-n*12));let S=this.stance,y=.12+.11*S;if(!this.ready||this.lastRoot.distanceTo(h)>2.5){this.ready=!0;for(let rt=0;rt<2;rt++){let I=this.feet[rt];I.pos.copy(h).addScaledVector(f,rt===0?y:-y),I.plant.copy(I.pos),I.swing=!1,I.step=null}this.prevHand[0].set(0,-9,0),this.prevHand[1].set(0,-9,0)}this.lastRoot.copy(h);let E=Li(e.prevGait,e.gait,a),M=wu(Math.max(m,.6)),A=Tp(M),b=m>.01?g/m:u.x,T=m>.01?x/m:u.z;for(let rt=0;rt<2;rt++){let I=this.feet[rt],Y=rt===0?1:-1,at=f.x*y*Y,yt=f.z*y*Y;if(v){let ot=.12*Math.sin(Math.min(1,e.vy>0?.5:1)*Math.PI);I.pos.set(h.x+at*.8+u.x*(rt===0?.06:-.04),l+.04+ot*(rt===0?1:.6),h.z+yt*.8+u.z*(rt===0?.06:-.04)),I.plant.set(I.pos.x,0,I.pos.z),I.swing=!1,I.step=null}else if(m>.35){I.step=null;let ot=t_(E-(rt===0?0:.5));if(ot<A){I.swing&&(I.swing=!1,I.plant.set(I.pos.x,0,I.pos.z));let Ct=h.x+at,ve=h.z+yt;Math.hypot(I.plant.x-Ct,I.plant.z-ve)>.95&&I.plant.set(Ct+b*.2,0,ve+T*.2),I.pos.copy(I.plant)}else{I.swing||(I.swing=!0,I.from.set(I.pos.x,0,I.pos.z));let Ct=(ot-A)/(1-A),ve=(1-ot)*M/Math.max(m,.5),Wt=h.x+g*ve+b*A*M*.5+at,te=h.z+x*ve+T*A*M*.5+yt,pe=Ir(Ct);I.pos.set(Li(I.from.x,Wt,pe),(.09+m*.035)*(1-.6*S)*Math.sin(Math.PI*Math.pow(Ct,.75)),Li(I.from.z,te,pe))}}else{let ot=h.x+at+u.x*(rt===0?.04:-.04),Ct=h.z+yt+u.z*(rt===0?.04:-.04);I.swing&&(I.swing=!1,I.step={fx:I.pos.x,fz:I.pos.z,t:0,dur:.13});let ve=this.feet[1-rt];if(I.step){I.step.t+=n;let Wt=nn(I.step.t/I.step.dur,0,1),te=Ir(Wt);I.pos.set(Li(I.step.fx,ot,te),.07*Math.sin(Math.PI*Wt),Li(I.step.fz,Ct,te)),Wt>=1&&(I.step=null,I.plant.set(ot,0,Ct))}else Math.hypot(I.plant.x-ot,I.plant.z-Ct)>.2&&!ve.step?I.step={fx:I.plant.x,fz:I.plant.z,t:0,dur:.15}:I.pos.copy(I.plant)}I.out.copy(I.pos)}let R=Pp-.05*p+.018*p*Math.cos(E*Math.PI*4)-.2*S+l,P=r-e.landT;P>=0&&P<.22&&(R-=.13*Math.sin(P/.22*Math.PI)),v&&(R=l+Pp-.04);let D=.05+.14*p+.24*S+(e.sprint?.04:0),H=.14*p*Math.sin(E*Math.PI*2)*(1-S),L=Math.sin(E*Math.PI*2),V=(.08+.3*p)*(1-S),K=Ae[2].set(.05,-.55+.18*p,-L*V),Z=Ae[3].set(-.05,-.55+.18*p,L*V);S>.01&&(K.lerp(Ae[10].set(.42,-.15,.3),S),Z.lerp(Ae[11].set(-.42,-.3,.3),S));let j=[null,null],X=t.ball,et=o.owner===e&&(o.state==="held"||o.state==="dribble"),nt=(rt,I,Y)=>Y.copy(I).addScaledVector(f,rt);if(et&&o.state==="dribble"&&e.dribble){let rt=e.dribble,Y=(rt.t<rt.td?rt.from:rt.to)==="L"?0:1,at=l+(rt.t<rt.td?rt.a[2]:rt.c[2])+Et+.03,yt=nn(X.y+Et+.025,at-.26,at+.02);j[Y]=Ae[12].set(X.x-u.x*.03,yt,X.z-u.z*.03);let ot=e_(i,e),Ct=Y===0?Z:K;ot&&ot.d<1.8?Ct.set(Y===0?-.2:.2,-.22,.32):Ct.set(Y===0?-.1:.1,-.5,.12+L*.08),D+=.06}else if(et){let rt=c&&c.type==="shot"&&!c.released?c:null,I=X.y>l+1.7;rt&&(rt.kind==="layup"||rt.kind==="dunk"&&I)?(j[1]=Ae[12].copy(X).addScaledVector(u,-.05).addScaledVector(Tu,-Et-.02),rt.kind==="dunk"?j[0]=nt(Et+.03,X,Ae[13]):K.set(.25,-.35,.15)):rt&&I?(j[1]=Ae[12].copy(X).addScaledVector(u,-.1).addScaledVector(f,-.025).addScaledVector(Tu,-.075),j[0]=nt(Et+.028,X,Ae[13]).addScaledVector(u,-.02)):(j[0]=nt(Et+.026,X,Ae[12]).addScaledVector(u,-.035),j[1]=nt(-(Et+.026),X,Ae[13]).addScaledVector(u,-.035))}else if(c&&c.type==="shot"&&c.released){let rt=c.t-c.rt;if(c.kind==="dunk"&&v){let I=(h.x>=0?1:-1)*B.X,Y=I-h.x,at=B.Z-h.z,yt=Math.hypot(Y,at)||1,ot=I-Y/yt*B.R,Ct=B.Z-at/yt*B.R;j[0]=Ae[12].set(ot,B.Y+.02,Ct).addScaledVector(f,.14),j[1]=Ae[13].set(ot,B.Y+.02,Ct).addScaledVector(f,-.14)}else if(rt<.55){let I=1-Ir((rt-.35)/.2),Y=(this.p.shotSide??1)*B.X-h.x,at=B.Z-h.z,yt=Math.hypot(Y,at)||1,ot=l+xe.SHOULDER;j[1]=Ae[12].set(h.x+Y/yt*.38-f.x*.12,ot+.58,h.z+at/yt*.38-f.z*.12),j[0]=Ae[13].set(h.x+Y/yt*.25+f.x*.2,ot+.38,h.z+at/yt*.25+f.z*.2),this.handW[0]=Math.min(this.handW[0],I+.001),this.handW[1]=Math.min(this.handW[1],I+.001),I<.02&&(j[0]=j[1]=null)}}else if(c&&c.type==="pass"&&c.released){let rt=(c.t-c.rt)/.3,I=c.target,Y=I.pos.x-h.x,at=I.pos.z-h.z,yt=Math.hypot(Y,at)||1,ot=1-Ir((rt-.5)/.5),Ct=l+(c.kind==="bounce"?1:1.3);j[0]=Ae[12].set(h.x+Y/yt*.6+f.x*.13,Ct,h.z+at/yt*.6+f.z*.13),j[1]=Ae[13].set(h.x+Y/yt*.6-f.x*.13,Ct,h.z+at/yt*.6-f.z*.13),this.handW[0]=Math.min(this.handW[0],ot+.001),this.handW[1]=Math.min(this.handW[1],ot+.001)}else if(c&&c.type==="steal"){let rt=c.t,I=rt<.11?Ir(rt/.11):1-Ir((rt-.16)/.18),Y=Ae[6].set(Math.sin(c.dir),0,Math.cos(c.dir)),at=c.hand==="L"?0:1;j[at]=Ae[12].copy(h).addScaledVector(Y,.3+.48*I).addScaledVector(f,at===0?.12:-.12),j[at].y=l+Li(1.15,.8,I),D+=.18*I,R-=.06*I}else if(e.handsUp||c&&c.type==="jump"||v&&!et){let rt=t.local,I=l+xe.REACH-(rt?.16:.04),Y=rt?.42:.16;j[0]=Ae[12].copy(h).addScaledVector(u,Y).addScaledVector(f,.18),j[0].y=I,j[1]=Ae[13].copy(h).addScaledVector(u,Y).addScaledVector(f,-.18),j[1].y=v?I:I-.3}else if(r<e.celebrateUntil){let rt=r*7+e.id;K.set(.22,.6+.07*Math.sin(rt),.05),Z.set(-.22,.6+.07*Math.cos(rt),.05)}if(!et&&o.state==="free"&&!(c&&(c.type==="steal"||c.type==="shot"&&c.released||c.type==="pass"&&c.released))){let rt=X.x-h.x,I=X.z-h.z,Y=Math.hypot(rt,I);if((o.pass&&o.pass.target===e||Y<1.4&&X.y<l+xe.REACH+.3&&X.y>l+.3&&!(o.shot&&!o.shot.rim&&!o.shot.board&&!o.shot.done))&&Y<2.2){let yt=nn(1-(Y-.5)/1.6,0,1);j[0]=nt(Et+.03,X,Ae[14]),j[1]=nt(-(Et+.03),X,Ae[15]),this.reachW=Math.max(this.reachW*.9,yt),D+=.08*yt}}for(let rt=0;rt<2;rt++){let I=j[rt]?1:0,Y=I?et?30:16:9;this.handW[rt]+=(I-this.handW[rt])*(1-Math.exp(-n*Y)),j[rt]&&this.wTarget[rt].copy(j[rt]),et&&j[rt]&&(this.handW[rt]=Math.max(this.handW[rt],.85))}let Lt=X.x-h.x,At=X.z-h.z,oe=Math.atan2(Lt,At)-d;for(;oe>Math.PI;)oe-=Math.PI*2;for(;oe<-Math.PI;)oe+=Math.PI*2;oe=nn(oe,-1.1,1.1),this.headYaw=Li(this.headYaw,oe,1-Math.exp(-n*8));let ie=Math.hypot(Lt,At);return this.headPitch=Li(this.headPitch,nn(Math.atan2(l+1.9-X.y,ie)*.6,-.5,.5),1-Math.exp(-n*6)),this.lean=Li(this.lean,D,1-Math.exp(-n*10)),this.poseUpright(h,d,R,this.lean,H,K,Z,t.local),this.m}poseUpright(t,e,i,n,r,a,o,c){let l=this.m,h=we.pelvis.set(t.x,i,t.z),d=we.fwd.set(Math.sin(e),0,Math.cos(e)),u=we.side.set(Math.cos(e),0,-Math.sin(e));c&&h.addScaledVector(d,-.03),os.set(0,e-r*.4,0,"YXZ"),l[Vt.PELVIS].makeRotationFromEuler(os).setPosition(h);let f=l[Vt.PELVIS],g=we.waist.set(0,yi.waist,0).applyMatrix4(f);os.set(n,e+r,0,"YXZ"),l[Vt.TORSO].makeRotationFromEuler(os).setPosition(g);let x=l[Vt.TORSO],m=we.neck.set(0,yi.neck,0).applyMatrix4(x);os.set(this.headPitch-n*.5,e+this.headYaw,0,"YXZ"),l[Vt.HEAD].makeRotationFromEuler(os).setPosition(m);for(let v=0;v<2;v++){let S=we.hip.set(v===0?yi.hipW:-yi.hipW,-.02,0).applyMatrix4(f),y=this.feet[v].out,E=we.ankT.set(y.x,y.y+yi.ankle,y.z),M=we.pole.copy(d).addScaledVector(Tu,.1);Ip(S,E,yi.thigh,yi.shin,M,we.knee,we.ankle),Zl(l[v===0?Vt.THIGH_L:Vt.THIGH_R],S,we.knee,d),Zl(l[v===0?Vt.SHIN_L:Vt.SHIN_R],we.knee,we.ankle,d);let A=nn((we.ankle.y-yi.ankle-(t.y||0))*1.2,0,.6)*(this.feet[v].swing?1:0);os.set(A,e,0,"YXZ"),l[v===0?Vt.BOOT_L:Vt.BOOT_R].makeRotationFromEuler(os).setPosition(we.ankle)}let p=we.back.set(-d.x,-.6,-d.z);for(let v=0;v<2;v++){let S=v===0?1:-1,y=we.sh.set(S*yi.shoulderW,yi.shoulderY,0).applyMatrix4(x),E=we.tgt.copy(v===0?a:o).add(we.off.set(S*yi.shoulderW,yi.shoulderY,0)).applyMatrix4(x),M=this.handW[v];M>.001&&E.lerp(this.wTarget[v],M);let A=nn((E.y-y.y)/.6,0,1)*.07;y.y+=A;let b=we.pole2.copy(p).addScaledVector(u,S*.55);Ip(y,E,yi.upper,yi.fore,b,we.elbow,we.hand),Zl(l[v===0?Vt.UARM_L:Vt.UARM_R],y,we.elbow,d),Zl(l[v===0?Vt.FARM_L:Vt.FARM_R],we.elbow,we.hand,d),this.hands[v].copy(we.hand),this.shoulders[v].copy(y)}}};function e_(s,t){let e=null,i=1e9;for(let n of s.players){if(n.team===t.team)continue;let r=Math.hypot(n.pos.x-t.pos.x,n.pos.z-t.pos.z);r<i&&(i=r,e=n)}return e?{q:e,d:i}:null}var Ql=1024,tc=1024,ec=class{constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=Ql,this.canvas.height=tc,this.ctx=this.canvas.getContext("2d"),this.texture=new _s(this.canvas),this.texture.anisotropy=4,this.words=new Map,this.reset()}reset(){let t=this.ctx;t.clearRect(0,0,Ql,tc),t.fillStyle="#fff",t.textAlign="center",t.textBaseline="middle",t.font='bold 88px "Arial Black", Arial, Helvetica, sans-serif';for(let e=0;e<10;e++)t.fillText(String(e),e*64+32,52);this.words.clear(),this.slot=0,this.texture.needsUpdate=!0}rect(t,e,i,n){return[t/Ql,1-(e+n)/tc,(t+i)/Ql,1-e/tc]}digit(t){return this.rect(t*64+6,4,52,96)}word(t){if(this.words.has(t))return this.words.get(t);let e=this.slot%2,i=Math.floor(this.slot/2);if(i>13)return this.rect(0,0,1,1);this.slot++;let n=e*512,r=112+i*64,a=this.ctx;a.save(),a.clearRect(n,r,512,64),a.fillStyle="#fff",a.textAlign="center",a.textBaseline="middle";let o=46;for(a.font=`bold ${o}px "Arial Black", Arial, Helvetica, sans-serif`;a.measureText(t).width>496&&o>14;)o-=2,a.font=`bold ${o}px "Arial Black", Arial, Helvetica, sans-serif`;a.fillText(t,n+256,r+33),a.restore();let c=this.rect(n+2,r+2,508,60);return this.words.set(t,c),this.texture.needsUpdate=!0,c}},ic=class{constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=512,this.canvas.height=288,this.ctx=this.canvas.getContext("2d"),this.texture=new _s(this.canvas),this.key=""}update(t,e,i,n,r,a,o,c=!1,l=""){let h=`${t}|${e}|${i}|${n}|${r}|${a}|${o}|${c}|${l}`;if(h===this.key)return;this.key=h;let d=this.ctx,u=o==="neo";if(d.fillStyle=u?"#111":"#f6f5ef",d.fillRect(0,0,512,288),d.strokeStyle=u?"#ffd23f":"#222",d.lineWidth=u?10:4,d.strokeRect(8,8,496,272),d.textAlign="center",d.textBaseline="middle",d.font='bold 40px "Arial Black", Arial, sans-serif',d.fillStyle=u?"#fff":"#161616",d.fillText(t,120,50),d.fillText(e,392,50),d.font='bold 96px "Arial Black", Arial, sans-serif',d.fillStyle=u?"#ff7a1a":"#161616",d.fillText(String(i[0]),120,140),d.fillText(String(i[1]),392,140),d.font='bold 54px "Arial Black", Arial, sans-serif',d.fillStyle=u?"#3ee0ff":"#333",d.fillText(c?"FINAL":n,256,132),l&&!c&&(d.font='bold 30px "Arial Black", Arial, sans-serif',d.fillStyle=u?"#ffd23f":"#161616",d.fillText(l,256,74)),a===0||a===1){d.fillStyle=u?"#ffd23f":"#161616",d.beginPath();let f=a===0?210:302,g=a===0?-1:1;d.moveTo(f+g*22,200),d.lineTo(f,186),d.lineTo(f,214),d.closePath(),d.fill()}d.font='bold 50px "Arial Black", Arial, sans-serif',d.fillStyle=u?"#ff3d6e":"#7a1010",d.fillText(c?"":r,256,222),d.font="bold 20px Arial, sans-serif",d.fillStyle=u?"#aaa":"#666",d.fillText("SHOT",256,258),this.texture.needsUpdate=!0}},nc=class{constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=128,this.canvas.height=80,this.ctx=this.canvas.getContext("2d"),this.texture=new _s(this.canvas),this.key=""}update(t,e){let i=`${t}|${e}`;if(i===this.key)return;this.key=i;let n=this.ctx,r=e==="neo";n.fillStyle=r?"#0c0c0c":"#f3f2ec",n.fillRect(0,0,128,80),n.strokeStyle=r?"#000":"#222",n.lineWidth=6,n.strokeRect(3,3,122,74),n.textAlign="center",n.textBaseline="middle",n.font='bold 60px "Arial Black", Arial, sans-serif',n.fillStyle=r?"#ff3d3d":"#8a1a1a",n.fillText(t,64,43),this.texture.needsUpdate=!0}};var sc=new Gt,Lp=new Ge,i_=new N,Xw=new N,Np=new Mi,rc=class{constructor(t=20){let e=new Oi(1,1);e.rotateX(-Math.PI/2),this.alpha=new Si(new Float32Array(t),1),e.setAttribute("aAlpha",this.alpha),this.mesh=new dr(e,lp(),t),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2,this.max=t,this.count=0}begin(){this.count=0}add(t,e,i,n){this.count>=this.max||(sc.makeScale(i,1,i).setPosition(t,.018,e),this.mesh.setMatrixAt(this.count,sc),this.alpha.setX(this.count,n),this.count++)}end(){this.mesh.count=this.count,this.mesh.instanceMatrix.needsUpdate=!0,this.alpha.needsUpdate=!0}},ac=class{constructor(){this.group=new Pn;let t=new ws(.46,.58,40);t.rotateX(-Math.PI/2),this.ring=new ce(t,Er(F.MARKER,.85)),this.ring.renderOrder=3,this.ring.visible=!1,this.def=new ce(t,Er(F.MARKER_DEF,.6)),this.def.renderOrder=3,this.def.visible=!1;let e=new Ms(.16,.34,4);e.rotateX(Math.PI),this.ack=new ce(e,Er(F.MARKER,1)),this.ack.visible=!1;let i=new ws(.18,.28,24);i.rotateX(-Math.PI/2),this.incoming=new ce(i,Er(F.MARKER,.6)),this.incoming.visible=!1;let n=new ws(.55,.72,40);n.rotateX(-Math.PI/2),this.spotMat=Er(F.GOLD,.9),this.spots=Array.from({length:6},()=>{let r=new ce(n,this.spotMat);return r.visible=!1,r.renderOrder=3,this.group.add(r),r}),this.group.add(this.ring,this.def,this.ack,this.incoming)}showRing(t,e,i){this.ring.visible=!0;let n=1+.06*Math.sin(i*8);this.ring.position.set(t,.03,e),this.ring.scale.set(n,1,n)}showDef(t,e){this.def.visible=!0,this.def.position.set(t,.025,e)}showAck(t,e,i,n){this.ack.visible=!0,this.ack.position.set(t,e+.1*Math.sin(n*10),i),this.ack.rotation.y=n*3}showIncoming(t,e){this.incoming.visible=!0,this.incoming.position.set(t,.03,e)}showSpot(t,e,i,n){let r=this.spots[t];if(!r)return;r.visible=!0,r.position.set(e,.022,i);let a=1+.05*Math.sin(n*5+t);r.scale.set(a,1,a)}hideAll(){this.ring.visible=!1,this.def.visible=!1,this.ack.visible=!1,this.incoming.visible=!1;for(let t of this.spots)t.visible=!1}},oc=class{constructor(t=180){let e=new na(.16,0);this.mat=new bs({color:16777215}),this.mesh=new dr(e,this.mat,t),this.mesh.instanceMatrix.setUsage(Hh),this.mesh.frustumCulled=!1,this.max=t,this.parts=Array.from({length:t},()=>({alive:!1,p:new N,v:new N,r:new N,w:new N,life:0,s:1})),this.col=new qt;for(let i=0;i<t;i++)this.mesh.setColorAt(i,this.col.set(1,1,1));this.mesh.count=0,this.active=0}spawn(t,e,i,n,r,a=6,o=Math.random){let c=0;for(let l of this.parts){if(c>=n)break;if(l.alive)continue;l.alive=!0,l.p.set(t+(o()-.5)*2,e+o()*1.5,i+(o()-.5)*2);let h=o()*Math.PI*2,d=4+o()*6;l.v.set(Math.cos(h)*a*o(),d,Math.sin(h)*a*o()),l.r.set(o()*6,o()*6,o()*6),l.w.set((o()-.5)*12,(o()-.5)*12,(o()-.5)*12),l.life=1.6+o()*1.2,l.s=.6+o()*.9,l.role=r[Math.floor(o()*r.length)],c++}}update(t){let e=0;for(let i of this.parts){if(!i.alive)continue;if(i.life-=t,i.life<=0){i.alive=!1;continue}i.v.y-=9.8*t*.6,i.v.multiplyScalar(1-1.2*t),i.p.addScaledVector(i.v,t),i.p.y<.05&&(i.p.y=.05,i.v.set(0,0,0)),i.r.addScaledVector(i.w,t),Np.set(i.r.x,i.r.y,i.r.z),Lp.setFromEuler(Np);let n=i.s*Math.min(1,i.life*2);sc.compose(i.p,Lp,i_.set(n,n,n)),this.mesh.setMatrixAt(e,sc),this.mesh.setColorAt(e,Ce[i.role]),e++}this.mesh.count=e,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0),this.active=e}clear(){for(let t of this.parts)t.alive=!1;this.mesh.count=0}};jt.enabled=!1;var n_=120,lc=(s,t,e)=>s<t?t:s>e?e:s,cc=class{constructor(t,e={}){this.canvas=t,this.quality=e.quality||"high";let i=new kl({canvas:t,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!!e.preserve});i.outputColorSpace=xs,i.shadowMap.enabled=!0,i.shadowMap.type=yh,i.shadowMap.autoUpdate=!1,this.renderer=i,this.scene=new vs,this.scene.fog=new Zr(15921642,45,160),this.camera=new ri(70,16/9,.05,600),this.camera.rotation.order="YXZ";let n=new oa(16777215,1);n.position.set(-9,40,14),n.castShadow=!0;let r=n.shadow.camera;r.left=-24,r.right=24,r.top=18,r.bottom=-18,r.near=1,r.far=90,n.shadow.mapSize.set(2048,2048),n.shadow.bias=-6e-4,n.shadow.normalBias=.02,this.sun=n,this.scene.add(n,n.target),Ot.uLightDir.value.copy(n.position).normalize(),this.sky=new ce(new Es(400,24,12),op()),this.sky.renderOrder=-10,this.sky.frustumCulled=!1,this.scene.add(this.sky),this.atlas=new ec,Ot.uAtlas.value=this.atlas.texture,this.scoreTex=new ic,this.shotTex=new nc,this.screenMat=vu(this.scoreTex.texture),this.shotMat=vu(this.shotTex.texture),this.staticMat=wr({crowd:!0,atlas:!0}),this.staticEdgeMat=Is({crowd:!0}),this.casterMat=wr({atlas:!0}),this.casterEdgeMat=Is({}),this.netMat=Is({net:!0,role:F.NET,widthScale:.6}),this.nets=new ce(yp(),this.netMat),this.nets.frustumCulled=!1,this.scene.add(this.nets),this.netState={amp:0,t:9,x:0,y:0,z:0,dx:0,dz:0,count:0},this.blobs=new rc(16),this.markers=new ac,this.burst=new oc(220),this.scene.add(this.blobs.mesh,this.markers.group,this.burst.mesh),this.venueObjs=[],this.batch=null,this.vm=null,this.animators=[],this.match=null,this.style="classic",this.time=0,this.shake=0,this.ballPos=new N,this.ballQ=new Ge,this.ballM=new Gt,this.crowdLevel=0,this.localPlayer=null,this.firstPerson=!0,this.hideHead=!0,this.vmD=.3,this.vmBallUntil=0,this._rv=new Gt,this._t1=new Gt,this._t2=new Gt,this._q=new Ge,this._ax=new N,this._mm=new Gt,this.resize()}setQuality(t){this.quality=t;let e=window.devicePixelRatio||1,i=t==="low"?Math.min(1,e)*.75:Math.min(t==="medium"?1.25:2,e);this.renderer.setPixelRatio(i*(this.resScale||1));let n=t==="high"?2048:1024;this.sun.shadow.mapSize.x!==n&&(this.sun.shadow.mapSize.set(n,n),this.sun.shadow.map&&(this.sun.shadow.map.dispose(),this.sun.shadow.map=null)),this.resize()}setResolutionScale(t){Math.abs(t-(this.resScale||1))<.01||(this.resScale=t,this.setQuality(this.quality))}resize(){let t=this.canvas.clientWidth||window.innerWidth,e=this.canvas.clientHeight||window.innerHeight;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix();let i=this.renderer.getPixelRatio();Ot.uResolution.value.set(t*i,e*i),this.pixelRatio=i,this.applyLineWidth()}applyLineWidth(){let t=Bl[this.style],e=this.pixelRatio||1;Ot.uLineWidth.value=t.lineWidth*e,Ot.uMinWidth.value=Math.min(t.lineWidth,1.1)*e;let i=t.name==="neo";Ot.uTaper.value=i?10:30,Ot.uTaperMin.value=i?.25:.4,Ot.uDetailDist.value=i?30:42,Ot.uCreaseDist.value=i?14:20}setStyle(t){let e=ip(t);this.style=e.name,Ot.uToon.value=e.toon,Ot.uShadowAmt.value=e.shadow,this.renderer.shadowMap.autoUpdate=e.shadow>0,this.renderer.shadowMap.needsUpdate=e.shadow>0,this.scene.fog.color.set(e.fog),this.scene.fog.near=e.fogNear,this.scene.fog.far=e.fogFar,this.blobShowPlayers=e.blobs,this.applyLineWidth(),this.match&&this.updateScoreboard(!0),document.documentElement.dataset.style=e.name}setVenue(t,e={}){let i=`${t}|${e.homeName}|${e.awayName}|${this.quality}`;if(this.venueKey===i)return;this.venueKey=i;for(let l of this.venueObjs)this.scene.remove(l),l.geometry.dispose();this.venueObjs=[];let n=bp(t,{atlas:this.atlas,quality:this.quality,homeName:e.homeName||"HOME",awayName:e.awayName||"AWAY",seed:e.seed||7});this.venue=n;let r=new ce(n.solid,this.staticMat);r.receiveShadow=!0;let a=new ce(n.edges,this.staticEdgeMat);a.frustumCulled=!1;let o=new ce(n.casterSolid,this.casterMat);o.castShadow=!0,o.receiveShadow=!0;let c=new ce(n.casterEdges,this.casterEdgeMat);c.frustumCulled=!1,this.venueObjs.push(r,a,o,c);for(let l of n.screens){let h=new ce(new Oi(l.w,l.h),l.kind==="shot"?this.shotMat:this.screenMat);h.position.set(l.x,l.y,l.z),h.rotation.y=l.ry+Math.PI,h.translateZ(l.kind==="shot"?.01:.06),this.venueObjs.push(h)}for(let l of this.venueObjs)this.scene.add(l);this.renderer.shadowMap.needsUpdate=!0}setMatch(t,e){this.match=t,e&&np(e.kits,e.human,e.court),this.kits=e&&e.kits?e.kits:null,this.rebuildCharacters(),this.burst.clear(),this.netState.amp=0,this.netState.t=9,this.updateScoreboard(!0)}rebuildCharacters(){this.batch&&(this.scene.remove(this.batch.mesh,this.batch.edges),this.batch.dispose()),this.vm&&(this.vm.dispose(),this.vm=null),this.batch=new ql(this.match.players,this.atlas,{kits:this.kits,quality:this.quality}),this.scene.add(this.batch.mesh,this.batch.edges),this.animators=this.match.players.map(t=>new jl(t)),this.localPlayer&&(this.vm=new Ra(this.localPlayer,{quality:this.quality}))}setLocal(t){this.localPlayer=t,this.firstPerson=!!t,this.vm&&(this.vm.dispose(),this.vm=null),t&&this.match&&(this.vm=new Ra(t,{quality:this.quality}))}updateScoreboard(t){let e=this.match;if(!e)return;t&&(this.scoreTex.key="",this.shotTex.key="");let i=e.phase==="live"||e.phase==="check"||e.phase==="inbound";this.scoreTex.update(e.teams[0].short,e.teams[1].short,e.scoreline,e.rules?e.displayClock:"--:--",e.shotClockOn?e.displayShot:"",i?e.offense:-1,this.style,e.phase==="over",e.full?e.periodLabel:""),this.shotTex.update(e.shotClockOn&&e.phase!=="over"?e.displayShot:"",this.style)}render(t,e,i,n={}){let r=this.match;this.time+=e,Ot.uTime.value=this.time,this.crowdLevel=Math.max(n.crowd??0,this.crowdLevel-e*.35),Ot.uCrowd.value=this.crowdLevel,this.updateCamera(i,e,t);let a=!1;if(r&&this.batch){let c=r.time-(1-t)*.008333333333333333,l=r.ball;this.ballPos.set(l.prevPos.x+(l.pos.x-l.prevPos.x)*t,l.prevPos.y+(l.pos.y-l.prevPos.y)*t,l.prevPos.z+(l.pos.z-l.prevPos.z)*t);let h=this._qa||(this._qa=new Ge),d=this._qb||(this._qb=new Ge);h.set(l.prevQ[0],l.prevQ[1],l.prevQ[2],l.prevQ[3]),d.set(l.q[0],l.q[1],l.q[2],l.q[3]),this.ballQ.slerpQuaternions(h,d,t),this.ballM.compose(this.ballPos,this.ballQ,this._one||(this._one=new N(1,1,1))),this.batch.setMatrix(this.batch.ballRow,this.ballM);let u={match:r,alpha:t,dt:e,now:c,ball:this.ballPos,local:!1};this.blobs.begin();let f=this.firstPerson&&i.mode==="fp"?this.localPlayer:null;for(let x=0;x<this.animators.length;x++){let m=this.animators[x],p=m.p;u.local=p===f;let v=m.update(u),S=x*Pr;for(let y=0;y<Pr;y++)this.batch.setMatrix(S+y,v[y]);if(u.local&&this.hideHead){for(let y of[Vt.HEAD,Vt.TORSO,Vt.UARM_L,Vt.UARM_R,Vt.FARM_L,Vt.FARM_R])this.batch.hide(S+y);a=this.updateViewModel(m,v,i,e,c)}this.blobShowPlayers&&this.blobs.add(m.root.x,m.root.z,.95,.2)}a&&this.vmBall&&this.batch.hide(this.batch.ballRow);let g=Math.max(0,this.ballPos.y-Et);this.blobs.add(this.ballPos.x,this.ballPos.z,.36+g*.1,.42/(1+g*.8)),this.blobs.end(),this.batch.commit(),this.updateNets(e),this.updateScoreboard(!1)}if(this.burst.update(e),this.noDraw)return;let o=this.renderer;o.render(this.scene,this.camera),a&&this.vm&&(o.autoClear=!1,o.clearDepth(),o.render(this.vm.scene,this.camera),o.autoClear=!0)}updateViewModel(t,e,i,n,r){let a=this.vm,o=t.p,c=this.match;if(!a)return!1;let l=c.ball,h=o.action,d=l.owner===o&&(l.state==="held"||l.state==="dribble"),u=lc((i.pitch+.85)/.6,0,1),f;h&&h.type==="shot"&&!h.released&&this.ballPos.y>o.pos.y+1.6?f=h.kind==="dunk"?0:.12:h&&h.type==="shot"&&h.released?f=h.t-h.rt<.5?.1:.6*u:h&&h.type==="pass"&&h.released?f=0:d?f=(l.state==="dribble"?.82:.78)*u:o.handsUp||o.airborne||h&&h.type==="jump"?f=-.2:h&&h.type==="steal"?f=.55*u:f=.62*u;let g=!d&&l.state==="free"&&l.lastTouch&&l.lastTouch.player===o&&c.time-l.lastTouch.t<.4&&(l.shot||l.pass);g&&(f=0,this.vmBallUntil=r+.05);let x=g?14:9;this.vmD+=(f-this.vmD)*(1-Math.exp(-n*x)),this.vmBall=d||g&&Math.abs(this.vmD)>.01;let m=this.camera.position;this._ax.setFromMatrixColumn(this.camera.matrixWorld,0).normalize(),this._q.setFromAxisAngle(this._ax,this.vmD),this._t1.makeTranslation(-m.x,-m.y,-m.z),this._t2.makeTranslation(m.x,m.y,m.z),this._rv.makeRotationFromQuaternion(this._q).premultiply(this._t2).multiply(this._t1),a.hide(zi.UARM_L),a.hide(zi.UARM_R);for(let[p,v]of[[zi.FARM_L,Vt.FARM_L],[zi.FARM_R,Vt.FARM_R]])a.setMatrix(p,this._mm.multiplyMatrices(this._rv,e[v]));return this.vmBall?a.setMatrix(zi.BALL,this._mm.multiplyMatrices(this._rv,this.ballM)):a.hide(zi.BALL),a.commit(),!0}updateNets(t){let e=this.match.ball.net,i=this.netState;if(e.count!==i.count){i.count=e.count,i.t=0,i.x=e.x,i.y=e.y,i.z=e.z,i.amp=Math.max(i.amp*.9,e.amp);let h=this.match.ball,d=Math.hypot(h.vel.x,h.vel.z)+.6;i.dx=h.vel.x/d*.05+(i.x>=0?.012:-.012),i.dz=h.vel.z/d*.05}else i.t+=t;let n=i.amp*Math.exp(-i.t*9),r=Math.sin(i.t*13)*Math.exp(-i.t*2.6)*Math.min(1,i.amp*1.6);i.t>4&&(i.amp=0);let[a,o,c,l]=i.x>=0?[Ot.uNetA,Ot.uNetDA,Ot.uNetB,Ot.uNetDB]:[Ot.uNetB,Ot.uNetDB,Ot.uNetA,Ot.uNetDA];a.value.set(i.x,i.y,i.z,n),o.value.set(i.dx*r,0,i.dz*r),c.value.set(0,-9,0,0),l.value.set(0,0,0)}updateCamera(t,e,i){let n=this.camera;if(t.fov){let r,a=Math.min(t.fov,n_);n.aspect<1?r=lc(Math.min(a,100),35,100):r=lc(2*Math.atan(Math.tan(a*Math.PI/360)/n.aspect)*180/Math.PI,35,100),Math.abs(r-n.fov)>.01&&(n.fov=r,n.updateProjectionMatrix())}if(t.mode==="fp"&&this.localPlayer&&this.match){let r=this.localPlayer,a=r.prevPos.x+(r.pos.x-r.prevPos.x)*i,o=r.prevPos.y+(r.pos.y-r.prevPos.y)*i,c=r.prevPos.z+(r.pos.z-r.prevPos.z)*i,l=(t.eye??1.9)+o;if(t.bob){let h=Math.min(1,r.speed/7);l+=Math.sin((r.prevGait+(r.gait-r.prevGait)*i)*Math.PI*4)*.014*h*t.bob}if(n.position.set(a+Math.sin(t.yaw)*.02,l,c+Math.cos(t.yaw)*.02),t.shake&&this.shake>0){let h=this.shake*t.shake;n.position.x+=(Math.random()-.5)*.02*h,n.position.y+=(Math.random()-.5)*.02*h}this.shake=Math.max(0,this.shake-e*4),n.rotation.set(t.pitch,t.yaw+Math.PI,t.roll||0,"YXZ")}else if(t.mode==="orbit"){let r=t.angle;n.position.set(Math.cos(r)*t.radius+(t.cx||0),t.height,Math.sin(r)*t.radius),n.lookAt((this._look||(this._look=new N)).set(t.cx||0,1.6,0))}else if(t.pos){let r=t.pos,a=t.look;n.position.set(r.x??r[0],r.y??r[1],r.z??r[2]),a?n.lookAt(a.x??a[0],a.y??a[1],a.z??a[2]):n.rotation.set(t.pitch||0,(t.yaw||0)+Math.PI,0,"YXZ")}n.updateMatrixWorld()}celebrate(t,e,i,n,r=1){let a=this.style==="neo"?[n===0?F.JERSEY_0:F.JERSEY_1,F.GOLD,F.MARKER,F.LINES,F.STAND_C]:[F.INK,F.LINES,n===0?F.JERSEY_0:F.JERSEY_1];this.burst.spawn(t,e,i,Math.round(60*r),a,5)}projectToScreen(t,e){let i=this.camera;if(e.copy(t).applyMatrix4(i.matrixWorldInverse),e.z>-.05){let n=e.x>=0?1:-1,r=lc(e.y/(Math.hypot(e.x,e.z)+.001),-.6,.6);return e.set(n*50,r*50,0)}return e.applyMatrix4(i.projectionMatrix)}renderPreview(t,e,i,n){let r=this.style,a=new ai(e,i,{samples:4}),o=Ot.uResolution.value.clone(),c=this.camera.aspect;this.setStyle(t),Ot.uResolution.value.set(e,i),Ot.uLineWidth.value=Bl[t].lineWidth,this.camera.aspect=e/i,this.camera.updateProjectionMatrix();let l=this.camera.position.clone(),h=this.camera.quaternion.clone();n&&(this.camera.position.set(n.pos[0],n.pos[1],n.pos[2]),this.camera.lookAt(new N(n.look[0],n.look[1],n.look[2])),this.camera.updateMatrixWorld()),this.renderer.shadowMap.needsUpdate=!0,this.renderer.setRenderTarget(a),this.renderer.render(this.scene,this.camera),!n&&this.vm&&this.firstPerson&&(this.renderer.autoClear=!1,this.renderer.clearDepth(),this.renderer.render(this.vm.scene,this.camera),this.renderer.autoClear=!0);let d=new Uint8Array(e*i*4);this.renderer.readRenderTargetPixels(a,0,0,e,i,d),this.renderer.setRenderTarget(null),a.dispose();let u=document.createElement("canvas");u.width=e,u.height=i;let f=u.getContext("2d"),g=f.createImageData(e,i);for(let x=0;x<i;x++)g.data.set(d.subarray((i-1-x)*e*4,(i-x)*e*4),x*e*4);return f.putImageData(g,0,0),this.setStyle(r),this.camera.position.copy(l),this.camera.quaternion.copy(h),Ot.uResolution.value.copy(o),this.applyLineWidth(),this.camera.aspect=c,this.camera.updateProjectionMatrix(),u.toDataURL("image/png")}stats(){let t=this.renderer.info;return{calls:t.render.calls,tris:t.render.triangles,people:this.venue?this.venue.people:0}}};function sn(s){let t=s>>>0;return()=>(t=t*1664525+1013904223>>>0,t/2147483648-1)}function uc(s,t){let e=Math.exp(-2*Math.PI*t/44100),i=0;for(let n=0;n<s.length;n++)i=(1-e)*s[n]+e*i,s[n]=i}function Vp(s,t){let e=Math.exp(-2*Math.PI*t/44100),i=0,n=0;for(let r=0;r<s.length;r++){let a=s[r];i=e*(i+a-n),n=a,s[r]=i}}function Os(s,t,e){let i=2*Math.PI*t/44100,n=Math.sin(i)/(2*e),r=Math.cos(i),a=n,o=-n,c=1+n,l=-2*r,h=1-n,d=0,u=0,f=0,g=0;for(let x=0;x<s.length;x++){let m=s[x],p=(a*m+o*u-l*f-h*g)/c;u=d,d=m,g=f,f=p,s[x]=p}}function Qe(s,t=.9){let e=0;for(let i=0;i<s.length;i++)e=Math.max(e,Math.abs(s[i]));if(e>0)for(let i=0;i<s.length;i++)s[i]*=t/e;return s}function Dp(s){let t=Math.floor(44100*s.reduce((n,[r,a])=>n+r+a,0)),e=new Float32Array(t),i=0;for(let[n,r]of s){let a=Math.floor(44100*n),o=0;for(let c=0;c<a;c++){let l=c/44100,h=2950+90*Math.sin(2*Math.PI*28*l)+40*Math.sin(2*Math.PI*7*l);o+=2*Math.PI*h/44100;let d=Math.min(1,l/.02)*Math.min(1,(n-l)/.04);e[i+c]=(Math.sin(o)*.7+Math.sin(o*2)*.12)*d}i+=a+Math.floor(44100*r)}return Qe(e,.55)}function s_(s,t=6){let e=Math.floor(44100*t),i=new Float32Array(e),n=sn(s);for(let o=0;o<e;o++)i[o]=n();let r=new Float32Array(e);for(let[o,c,l]of[[420,1.2,1],[900,1.5,.8],[1800,2,.4],[260,.9,.7]]){let h=i.slice();Os(h,o,c);let d=n()*6;for(let u=0;u<e;u++)r[u]+=h[u]*l*(.75+.25*Math.sin(2*Math.PI*(u/e)*3+d))}let a=Math.floor(44100*.5);for(let o=0;o<a;o++){let c=o/a;r[o]=r[o]*c+r[e-a+o]*(1-c)}return Qe(r.subarray(0,e-a),.6)}function r_(s,t=3.2){let e=Math.floor(44100*t),i=new Float32Array(e),n=sn(s);for(let a=0;a<e;a++)i[a]=n();let r=new Float32Array(e);for(let[a,o,c]of[[700,1.4,1],[1300,1.8,.7],[2500,2.2,.35],[380,1,.6]]){let l=i.slice();Os(l,a,o);for(let h=0;h<e;h++)r[h]+=l[h]*c}for(let a=0;a<e;a++){let o=a/44100;r[a]*=Math.min(1,o/.25)*Math.exp(-Math.max(0,o-1.2)*1.3)}return Qe(r,.85)}function kp(s){let t=Math.floor(70560),e=new Float32Array(t),i=sn(s);for(let r=0;r<t;r++)e[r]=i();let n=new Float32Array(t);for(let r=0;r<3;r++){let a=e.slice();Os(a,380+r*180,3);for(let o=0;o<t;o++)n[o]+=a[o]}for(let r=0;r<t;r++){let a=r/44100;n[r]*=Math.min(1,a/.15)*Math.exp(-a*1.6)*(1-.3*a/1.6)}return Qe(n,.7)}function Op(s,t,e){let i=Math.floor(44100*t),n=new Float32Array(i);for(let r=0;r<i;r++){let a=r/44100;n[r]=Math.sin(2*Math.PI*s*a)*Math.exp(-a*30)*Math.min(1,a/.003)}return Qe(n,.5)}function Lr(s,t){let e=Math.floor(44100*t),i=new Float32Array(e);for(let[n,r,a,o,c]of s){let l=0,h=Math.floor(a*44100),d=Math.min(e,Math.floor((a+o)*44100));for(let u=h;u<d;u++){let f=(u-h)/44100,g=f/o;l+=(n+(r-n)*g)/44100;let x=Math.min(1,f/.004)*Math.exp(-g*4);i[u]+=(Math.sin(2*Math.PI*l)+.25*Math.sin(4*Math.PI*l))*x*c}}return Qe(i,.5)}function a_(s){let t=Math.floor(44100*s),e=new Float32Array(t),i=0,n=12345;for(let r=0;r<t;r++){n=n*1664525+1013904223>>>0;let a=r/t,o=.04+.5*Math.sin(Math.PI*a)**2;i+=(n/4294967296*2-1-i)*o,e[r]=i*Math.sin(Math.PI*a)}return Qe(e,.35)}function o_(s){let t=Math.floor(12348.000000000002),e=new Float32Array(t),i=0;for(let r=0;r<t;r++){let o=210-60*(r/44100);i+=o/44100,e[r]=i%1*2-1}let n=new Float32Array(t);for(let[r,a,o]of[[650,5,1],[1700,7,.6],[2600,8,.3]]){let c=e.slice();Os(c,r,a);for(let l=0;l<t;l++)n[l]+=c[l]*o}for(let r=0;r<t;r++){let a=r/44100;n[r]*=Math.min(1,a/.02)*Math.exp(-a*7)}return Qe(n,.6)}function Up(s){let t=Math.floor(9702),e=new Float32Array(t),i=sn(s),n=0,r=0;for(let a=0;a<t;a++){let o=a/44100,c=95+80*Math.exp(-o*60);n+=2*Math.PI*c/44100,r+=2*Math.PI*530/44100,e[a]=Math.sin(n)*Math.exp(-o*22)+.22*Math.sin(r)*Math.exp(-o*30)+i()*.35*Math.exp(-o*180)}return uc(e,4200),Qe(e,.95)}function Ru(s,t,e,i){let n=Math.floor(44100*i),r=new Float32Array(n),a=sn(s),o=0;for(let c=0;c<n;c++){let l=c/44100,h=l/i,d=t+(e-t)*h+120*Math.sin(2*Math.PI*55*l);o+=2*Math.PI*d/44100;let u=Math.min(1,l/.012)*Math.pow(1-h,1.4);r[c]=(Math.sin(o)+.4*Math.sin(o*2.01)+.2*Math.sin(o*3.02))*u+a()*.05*u}return Vp(r,900),Qe(r,.5)}function l_(s){let t=Math.floor(30869.999999999996),e=new Float32Array(t),i=sn(s),n=[[612,1],[1530,.7],[2410,.45],[3720,.3],[5100,.15]];for(let r=0;r<t;r++){let a=r/44100,o=0;for(let[c,l]of n)o+=Math.sin(2*Math.PI*c*a)*l*Math.exp(-a*(6+c/600));e[r]=o+i()*.5*Math.exp(-a*160)}return Qe(e,.75)}function Fp(s){let t=Math.floor(17640),e=new Float32Array(t),i=sn(s),n=0;for(let r=0;r<t;r++){let a=r/44100;n+=2*Math.PI*(130+60*Math.exp(-a*40))/44100,e[r]=Math.sin(n)*Math.exp(-a*16)+i()*.45*Math.exp(-a*26)*(.6+.4*Math.sin(2*Math.PI*38*a))}return uc(e,2600),Qe(e,.8)}function c_(s){let t=Math.floor(18522),e=new Float32Array(t),i=sn(s);for(let n=0;n<t;n++){let r=n/44100;e[n]=i()*Math.min(1,r/.03)*Math.exp(-r*7)}return Os(e,2600,.9),Vp(e,700),Qe(e,.7)}function Bp(s,t=1700){let e=Math.floor(3969),i=new Float32Array(e),n=sn(s);for(let r=0;r<e;r++){let a=r/44100;i[r]=n()*Math.exp(-a*60)+Math.sin(2*Math.PI*240*a)*.4*Math.exp(-a*50)}return Os(i,t,.8),Qe(i,.8)}function h_(s){let t=Math.floor(44100*s),e=new Float32Array(t);for(let i=0;i<t;i++){let n=i/44100,r=Math.min(1,n/.02)*Math.min(1,(s-n)/.05),a=0;for(let o of[220,277,330])a+=n*o%1*2-1;e[i]=a*r*.33}return uc(e,2200),Qe(e,.6)}function zp(s,t){let e=Math.floor(44100*t),i=new Float32Array(e),n=sn(s);for(let r=0;r<e;r++){let a=r/44100,o=a/t;i[r]=n()*Math.sin(Math.PI*o)**2}return Os(i,900,.7),Qe(i,.35)}function Hp(s){let t=Math.floor(2646),e=new Float32Array(t),i=sn(s);for(let n=0;n<t;n++){let r=n/44100;e[n]=(Math.sin(2*Math.PI*85*r)*.8+i()*.3)*Math.exp(-r*55)}return uc(e,900),Qe(e,.5)}var hc=class{constructor(){this.ctx=null,this.buffers={},this.vol={master:.8,sfx:.9,crowd:.6},this.ready=!1,this.crowdLevel=.3,this.muted=!1}init(){if(this.ctx)return;let t=window.AudioContext||window.webkitAudioContext;if(!t)return;try{this.ctx=new t({latencyHint:"interactive"})}catch{return}let e=this.ctx;this.master=e.createGain(),this.sfx=e.createGain(),this.crowd=e.createGain(),this.sfx.connect(this.master),this.crowd.connect(this.master),this.master.connect(e.destination);let i={bounce:Up(1),bounce2:Up(21),squeak1:Ru(2,2300,3100,.14),squeak2:Ru(3,3300,2500,.18),squeak3:Ru(4,2700,3600,.1),step1:Hp(5),step2:Hp(25),rim:l_(6),board:Fp(7),net:c_(8),catch:Bp(9,1500),steal:Bp(10,2300),block:Fp(31),release:zp(11,.25),pass:zp(12,.18),whistle:Dp([[.32,0]]),whistleLong:Dp([[.3,.12],[.3,.12],[.75,0]]),buzzer:h_(1.1),crowd:s_(13),cheer:r_(14),groan:kp(15),ooh:kp(16),ui:Op(1400,.06,17),ack:Op(1900,.09,18),shout:o_(19),uiHover:Lr([[2600,2400,0,.025,.5]],.03),uiClick:Lr([[900,520,0,.07,1]],.08),uiConfirm:Lr([[660,660,0,.09,.9],[990,990,.07,.16,1]],.25),uiError:Lr([[300,280,0,.1,1],[220,200,.1,.16,1]],.28),uiSwoosh:a_(.22),uiReward:Lr([[784,784,0,.1,.8],[988,988,.08,.1,.8],[1319,1319,.16,.3,1]],.48),perfect:Lr([[1047,1047,0,.08,.7],[1568,1568,.06,.18,.8]],.26)};for(let[n,r]of Object.entries(i)){let a=e.createBuffer(1,r.length,44100);a.copyToChannel(r,0),this.buffers[n]=a}this.applyVolumes(),this.ready=!0}resume(){this.ctx&&this.ctx.state!=="running"&&!this.muted&&this.ctx.resume().catch(()=>{})}suspend(){this.ctx&&this.ctx.state==="running"&&this.ctx.suspend().catch(()=>{})}setMuted(t){this.muted=t,t?this.suspend():this.resume()}setVolumes(t){Object.assign(this.vol,t),this.applyVolumes()}setPlatformMute(t){this.platformMute=!!t,this.applyVolumes()}applyVolumes(){this.ctx&&(this.master.gain.value=this.platformMute?0:this.vol.master,this.sfx.gain.value=this.vol.sfx,this.crowd.gain.value=this.vol.crowd)}play(t,e={}){if(!this.ready||this.ctx.state!=="running")return;let i=this.buffers[t];if(!i)return;let n=this.ctx,r=n.createBufferSource();r.buffer=i,e.rate&&(r.playbackRate.value=e.rate);let a=n.createGain();a.gain.value=e.gain??1;let o=a;if(e.pan&&n.createStereoPanner){let c=n.createStereoPanner();c.pan.value=Math.max(-1,Math.min(1,e.pan)),a.connect(c),o=c}return r.connect(a),o.connect(e.group==="crowd"?this.crowd:this.sfx),r.start(),r}startCrowd(t=.4){if(!this.ready)return;this.stopCrowd();let e=this.ctx;this.crowdSrc=e.createBufferSource(),this.crowdSrc.buffer=this.buffers.crowd,this.crowdSrc.loop=!0,this.crowdGain=e.createGain(),this.crowdGain.gain.value=0,this.crowdSrc.connect(this.crowdGain).connect(this.crowd),this.crowdSrc.start(),this.baseCrowd=t,this.setExcitement(0)}stopCrowd(){if(this.crowdSrc){try{this.crowdSrc.stop()}catch{}this.crowdSrc.disconnect(),this.crowdSrc=null}}setExcitement(t){if(!this.crowdGain)return;let e=this.baseCrowd*(.45+.9*Math.min(1,t));this.crowdGain.gain.setTargetAtTime(e,this.ctx.currentTime,.4)}};var Gp=[["W A S D","Move (relative to where you look)"],["Mouse","Look and aim"],["Shift","Sprint (a faster, lower dribble)"],["Left mouse","Shoot: hold to fill the meter, release in the green. On defence: hands up"],["Right mouse","Pass to the ringed teammate. Without the ball: call for it / defensive stance"],["Space","Jump to block or rebound (with the ball: pump fake)"],["E","Steal (poke at the ball; time it when the dribble is low)"],["Q","Crossover (switch the dribble hand with a quick burst)"],["C","Defensive stance (hold): quicker side to side"],["P","Pause"],["Tab","Free / capture the mouse cursor"]],Wp=[["Left thumb","Drag anywhere on the left side to move; push to the edge of the stick to sprint"],["Right thumb","Drag anywhere on the right side to look and aim"],["SHOOT","Hold to fill the meter, release in the green"],["PASS","Pass to the ringed teammate (CALL without the ball)"],["CROSS / FAKE","Crossover dribble / pump fake"],["STEAL \xB7 BLOCK \xB7 STANCE","Replace the attack buttons while the other team has the ball"],["II","Pause"]],dc=class{constructor(t){this.el=t,this.keys=new Set,this.lookX=0,this.lookY=0,this.buttons=0,this.locked=!1,this.lockSupported="requestPointerLock"in t,this.dragMode=!this.lockSupported,this.active=!1,this.listeners=[],this.onPause=null,this.onLockLost=null,this.onLockError=null,this.sensitivity=1,this.invertY=!1,this.lastLockExit=0,this.touchMode=!1,this.touch={active:!1,f:0,r:0,sprint:!1,stance:!1},this.lastTouchAt=-1e9,this.handlers={keydown:e=>this.keydown(e),keyup:e=>this.keyup(e),mousemove:e=>this.mousemove(e),mousedown:e=>this.mousedown(e),mouseup:e=>this.mouseup(e),contextmenu:e=>{this.active&&e.preventDefault()},plc:()=>this.lockChange(),ple:()=>{this.locked=!1,this.onLockError&&this.onLockError()},blur:()=>{this.keys.clear(),this.releaseAll()},touchSeen:e=>{(e.pointerType==="touch"||e.pointerType==="pen")&&(this.lastTouchAt=performance.now())}},window.addEventListener("pointerdown",this.handlers.touchSeen,!0),window.addEventListener("pointerup",this.handlers.touchSeen,!0),window.addEventListener("keydown",this.handlers.keydown),window.addEventListener("keyup",this.handlers.keyup),window.addEventListener("mousemove",this.handlers.mousemove),window.addEventListener("mousedown",this.handlers.mousedown),window.addEventListener("mouseup",this.handlers.mouseup),window.addEventListener("contextmenu",this.handlers.contextmenu),document.addEventListener("pointerlockchange",this.handlers.plc),document.addEventListener("pointerlockerror",this.handlers.ple),window.addEventListener("blur",this.handlers.blur)}on(t){return this.listeners.push(t),()=>{this.listeners=this.listeners.filter(e=>e!==t)}}emit(t,e){for(let i of this.listeners)i(t,e)}requestLock(){if(!this.lockSupported)return this.dragMode=!0,!1;try{let t=this.el.requestPointerLock();t&&t.catch&&t.catch(()=>{this.onLockError&&this.onLockError()})}catch{return this.dragMode=!0,!1}return!0}exitLock(){document.pointerLockElement&&document.exitPointerLock()}lockChange(){let t=this.locked;this.locked=document.pointerLockElement===this.el,this.locked&&(this.dragMode=!1,!t&&this.onLockGained&&this.onLockGained()),t&&!this.locked&&(this.lastLockExit=performance.now(),this.releaseAll(),this.active&&this.onLockLost&&this.onLockLost())}releaseAll(){this.buttons&1&&this.emit("shoot",!1),this.buttons&2&&this.emit("pass",!1),this.buttons=0,this.touch.active=!1,this.touch.f=0,this.touch.r=0,this.touch.sprint=!1,this.touch.stance=!1,this.onReleaseAll&&this.onReleaseAll()}fromTouch(t){return t.sourceCapabilities&&t.sourceCapabilities.firesTouchEvents||performance.now()-this.lastTouchAt<900}touchAction(t,e){if(this.active){if(t==="shoot"&&(e?this.buttons|=1:this.buttons&=-2),t==="pass"&&(e?this.buttons|=2:this.buttons&=-3),t==="stance"){this.touch.stance=e;return}!e&&(t==="steal"||t==="cross"||t==="jump")||this.emit(t,e)}}touchLook(t,e){this.active&&(this.lookX+=t,this.lookY+=e)}keydown(t){let e=t.code;if(this.active){if(e==="Tab"){t.preventDefault(),!t.repeat&&this.onToggleLock&&this.onToggleLock();return}["Space","ShiftLeft","ShiftRight","KeyW","KeyA","KeyS","KeyD","KeyQ","KeyE","KeyC","ControlLeft","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e)&&t.preventDefault(),!t.repeat&&(this.keys.add(e),e==="Space"?this.emit("jump",!0):e==="KeyE"?this.emit("steal",!0):e==="KeyQ"?this.emit("cross",!0):e==="KeyP"?this.onPause&&this.onPause():(e==="Enter"||e==="NumpadEnter")&&this.onSkip&&this.onSkip())}}keyup(t){this.keys.delete(t.code)}mousedown(t){!this.active||this.fromTouch(t)||!this.locked&&!this.dragMode||t.target!==this.el&&!this.locked||(t.button===0&&(this.buttons|=1,this.emit("shoot",!0)),t.button===2&&(this.buttons|=2,this.emit("pass",!0),t.preventDefault()))}mouseup(t){this.fromTouch(t)||(t.button===0&&this.buttons&1&&(this.buttons&=-2,this.emit("shoot",!1)),t.button===2&&this.buttons&2&&(this.buttons&=-3,this.emit("pass",!1)))}mousemove(t){!this.active||this.fromTouch(t)||(this.locked||this.dragMode&&t.buttons&7)&&(this.lookX+=t.movementX||0,this.lookY+=t.movementY||0)}axes(){let t=this.keys,e=(t.has("KeyW")?1:0)-(t.has("KeyS")?1:0),i=(t.has("KeyD")?1:0)-(t.has("KeyA")?1:0),n=t.has("ShiftLeft")||t.has("ShiftRight"),r=t.has("KeyC")||t.has("ControlLeft")||this.touch.stance,a=this.touch;return a.active&&(e=Math.max(-1,Math.min(1,e+a.f)),i=Math.max(-1,Math.min(1,i+a.r)),n=n||a.sprint),{f:e,r:i,sprint:n,stance:r}}consumeLook(t,e){let i=.0022*this.sensitivity;t.yaw-=this.lookX*i,t.pitch-=this.lookY*i*(this.invertY?-1:1);let n=this.keys,r=2.2*e*this.sensitivity;n.has("ArrowLeft")&&(t.yaw+=r),n.has("ArrowRight")&&(t.yaw-=r),n.has("ArrowUp")&&(t.pitch+=r*.6*(this.invertY?-1:1)),n.has("ArrowDown")&&(t.pitch-=r*.6*(this.invertY?-1:1)),this.lookX=0,this.lookY=0,t.pitch=Math.max(-1.3,Math.min(1.15,t.pitch))}get held(){return{lmb:!!(this.buttons&1),rmb:!!(this.buttons&2)}}};var u_=1.5/(Et*Et),Ca=B.R+B.TUBE,Pa=new _e,Us=new _e,Cu=new _e,Fs=new _e,Pu=new _e;function d_(s){let t=Mt((B.Y-s)/B.NET_LEN,0,1);return B.R+(B.NET_R1-B.R)*t}function $p(s,t,e){return e.set(s.y*t.z-s.z*t.y,s.z*t.x-s.x*t.z,s.x*t.y-s.y*t.x)}var Ia=class{constructor(){this.pos=new _e(0,Et,0),this.prevPos=new _e(0,Et,0),this.vel=new _e,this.w=new _e,this.q=[0,0,0,1],this.prevQ=[0,0,0,1],this.state="dead",this.owner=null,this.shot=null,this.pass=null,this.lastTouch=null,this.ignore=null,this.ignoreUntil=0,this.net={count:0,x:0,y:0,z:0,vy:0,amp:0},this.scoredAt=-10,this.cb=null,this.quiet=!1,this.restT=0}copyFrom(t){return this.pos.copy(t.pos),this.vel.copy(t.vel),this.w.copy(t.w),this.state=t.state,this.scoredAt=t.scoredAt,this}setKinematic(t,e,i,n){n>0&&this.vel.set((t-this.pos.x)/n,(e-this.pos.y)/n,(i-this.pos.z)/n),this.pos.set(t,e,i)}release(t,e,i,n=0,r=0,a=0){this.state="free",this.owner=null,this.vel.set(t,e,i),this.w.set(n,r,a),this.restT=0}place(t,e,i){this.pos.set(t,e,i),this.prevPos.set(t,e,i),this.vel.set(0,0,0),this.w.set(0,0,0)}get speed(){return this.vel.len()}beginStep(){this.prevPos.copy(this.pos),this.prevQ[0]=this.q[0],this.prevQ[1]=this.q[1],this.prevQ[2]=this.q[2],this.prevQ[3]=this.q[3]}step(t,e,i){if(this.state==="free"){let n=this.vel.len(),r=Mt(Math.ceil(n*t/.025),1,10),a=t/r;for(let o=0;o<r;o++)this.substep(a,e,i)}this.spin(t)}substep(t,e,i){let n=this.vel,r=this.pos,a=n.len(),o=Nn.AIR_DRAG*a;n.x-=n.x*o*t,n.z-=n.z*o*t,n.y-=(Ne+n.y*o)*t,this.w.scale(Math.exp(-.15*t));let c=r.y;r.addScaled(n,t);let l=r.x>=0?1:-1,h=l*B.X;if(c>=B.Y&&r.y<B.Y&&n.y<0){let d=(c-B.Y)/(c-r.y||1),u=this.prevX(d,t),f=this.prevZ(d,t);Math.hypot(u-h,f-B.Z)<B.R-.01&&e-this.scoredAt>1&&(this.scoredAt=e,this.scoredSide=l,this.cb&&!this.quiet&&this.cb.score(this,l))}this.collideFloor(t),this.collideRim(h),this.collideBoard(l),this.collideNet(t,h),i&&!this.quiet&&this.collidePlayers(i,e)}prevX(t,e){return this.pos.x-this.vel.x*e*(1-t)}prevZ(t,e){return this.pos.z-this.vel.z*e*(1-t)}contact(t,e,i,n,r){let a=this.vel;Pa.set(t,e,i);let o=a.dot(Pa);if(o>=0)return 0;Cu.set(-t*Et,-e*Et,-i*Et),$p(this.w,Cu,Fs).add(a);let c=Fs.dot(Pa);Fs.addScaled(Pa,-c);let l=-(1+n)*o;a.addScaled(Pa,l);let h=Fs.len();if(h>1e-6){let u=Math.min(.4*h,Nn.FRICTION*l);Pu.copy(Fs).scale(-u/h),a.add(Pu),$p(Cu,Pu,Fs),this.w.addScaled(Fs,u_)}let d=-o;return this.cb&&!this.quiet&&d>.25&&this.cb.hit(this,r,d),d}collideFloor(t){let e=this.pos,i=this.vel;if(!(e.y>=Et))if(e.y=Et,i.y<-.35)this.contact(0,1,0,Nn.FLOOR_E,"floor");else{i.y=0;let n=Math.hypot(i.x,i.z);if(n>1e-4){let r=Math.max(0,n-.35*t)/n;i.x*=r,i.z*=r}this.w.set(i.z/Et,this.w.y*.98,-i.x/Et)}}collideRim(t=B.X){let e=this.pos,i=e.x-t,n=e.z-B.Z;if(Math.abs(e.y-B.Y)>Et+.05)return;let r=Math.hypot(i,n);if(r>Ca+Et+.05||r<Ca-Et-.05)return;let a=r>1e-6?i/r:1,o=r>1e-6?n/r:0;Us.set(t+a*Ca,B.Y,B.Z+o*Ca);let c=e.x-Us.x,l=e.y-Us.y,h=e.z-Us.z,d=Math.hypot(c,l,h),u=Et+B.TUBE;d>=u||d<1e-6||(e.x=Us.x+c/d*u,e.y=Us.y+l/d*u,e.z=Us.z+h/d*u,this.contact(c/d,l/d,h/d,Nn.RIM_E,"rim"))}collideBox(t,e,i,n,r,a,o,c,l=1){let h=this.pos;if(l<0){let v=-e;e=-t,t=v}let d=Mt(h.x,t,e),u=Mt(h.y,i,n),f=Mt(h.z,r,a),g=h.x-d,x=h.y-u,m=h.z-f,p=Math.hypot(g,x,m);if(!(p>=Et)){if(p<1e-6){h.x=l>0?t-Et:e+Et,this.contact(-l,0,0,o,c);return}h.x=d+g/p*Et,h.y=u+x/p*Et,h.z=f+m/p*Et,this.contact(g/p,x/p,m/p,o,c)}}collideBoard(t=1){let e=this.pos;t*e.x<B.BOARD_X-.3||e.y<B.BOARD_Y0-.3||(this.collideBox(B.BOARD_X,B.BOARD_X+B.BOARD_T,B.BOARD_Y0,B.BOARD_Y0+B.BOARD_H,-B.BOARD_W/2,B.BOARD_W/2,Nn.BOARD_E,"board",t),this.collideBox(B.X+Ca+.005,B.BOARD_X,B.Y-.05,B.Y+.005,-.07,.07,.4,"rim",t),this.collideBox(B.BOARD_X+B.BOARD_T,B.BOARD_X+1.4,B.BOARD_Y0+.2,B.BOARD_Y0+.55,-.12,.12,.3,"board",t))}collideNet(t,e=B.X){let i=this.pos,n=this.vel;if(i.y>B.Y-.02||i.y<B.Y-B.NET_LEN-.05)return;let r=i.x-e,a=i.z-B.Z,o=Math.hypot(r,a),c=d_(i.y);if(o>c+Et*.5)return;let l=o+Et*.55-c;if(l>0&&o>1e-4){let u=Math.min(1,l*60*t);i.x-=r/o*l*u,i.z-=a/o*l*u;let f=(n.x*r+n.z*a)/o;f>0&&(n.x-=r/o*f*.85,n.z-=a/o*f*.85)}let h=Math.exp(-5.5*t);n.x*=h,n.z*=h,n.y<-2.2&&(n.y*=Math.exp(-3.2*t));let d=this.net;d.x=i.x,d.y=i.y,d.z=i.z,d.vy=n.y,d.amp=Math.max(d.amp,Math.min(1,.25+Math.abs(n.y)*.12+Math.max(0,l)*6)),d.count++}collidePlayers(t,e){let i=this.pos;for(let n=0;n<t.length;n++){let r=t[n];if(r===this.ignore&&e<this.ignoreUntil)continue;let a=i.x-r.pos.x,o=i.z-r.pos.z,c=.26+Et;if(a*a+o*o>c*c)continue;let l=r.pos.y+.35,h=r.pos.y+1.6;if(i.y<l-Et||i.y>h+Et)continue;let d=Mt(i.y,l,h),u=a,f=i.y-d,g=o,x=Math.hypot(u,f,g);if(x>=c||x<1e-6)continue;i.x=r.pos.x+u/x*c,i.y=d+f/x*c,i.z=r.pos.z+g/x*c,this.vel.x-=r.vel.x,this.vel.z-=r.vel.z;let m=this.contact(u/x,f/x,g/x,.35,"body");this.vel.x+=r.vel.x,this.vel.z+=r.vel.z,m>.5&&this.cb&&this.cb.body(this,r,m)}}spin(t){let e=this.w;if(this.state!=="free"){let S=this.vel;e.set(S.z/Et*.35,0,-S.x/Et*.35)}let i=e.len();if(i<1e-5)return;let n=i*t*.5,r=Math.sin(n)/i,a=e.x*r,o=e.y*r,c=e.z*r,l=Math.cos(n),[h,d,u,f]=this.q,g=l*h+a*f+o*u-c*d,x=l*d-a*u+o*f+c*h,m=l*u+a*d-o*h+c*f,p=l*f-a*h-o*d-c*u,v=Math.hypot(g,x,m,p)||1;this.q[0]=g/v,this.q[1]=x/v,this.q[2]=m/v,this.q[3]=p/v}},Nr=new Ia;Nr.quiet=!0;function f_(s,t,e,i,n,r,a,o=1/240){let c=s,l=t,h=e,d=i,u=n,f=r,g=0,x=!1;for(let m=0;m<2400;m++){let p=Math.sqrt(d*d+u*u+f*f),v=Nn.AIR_DRAG*p;d-=d*v*o,f-=f*v*o,u-=(Ne+u*v)*o;let S=l;if(c+=d*o,l+=u*o,h+=f*o,g+=o,u<0&&(x=!0),x&&S>=a&&l<a){let y=(S-a)/(S-l),E=c-d*o*(1-y),M=h-f*o*(1-y);return{d:Math.hypot(E-s,M-e),t:g-o*(1-y),x:E,z:M}}if(l<0)return null}return null}function Xp(s,t,e,i,n,r,a,o){let c=1.5,l=18,h=Math.cos(r),d=Math.sin(r);for(let u=0;u<26;u++){let f=(c+l)/2,g=f_(s,t,e,i*h*f,d*f,n*h*f,o);!g||g.d<a?c=f:l=f}return(c+l)/2}function qp(s,t,e,i){Nr.copyFrom(s),Nr.state="free";let n=1/120,r=0;for(let a=0;a<t;a+=n)if(Nr.substep(n,0,null),r+=n,r>=e&&(r=0,i(a,Nr.pos,Nr.vel)===!1))return}var fc=(s,t)=>s.side?s.side(t.team):1,pc={jumper:1,three:1,layup:.8,ft:1.05,dunk:.5};function Yp(s,t,e){let i=Math.sqrt(2*e/9.81);return Math.max(.05,s*pc[t]-i-.03)}function p_(s,t){return s.jumpHeight()+(t?.28:.12)>=1.02}function Bs(s,t){if(s.phase==="ft")return"ft";let e=fc(s,t),i=De(t.pos.x,t.pos.z,e),n=(t.vel.x*(e*B.X-t.pos.x)+t.vel.z*(B.Z-t.pos.z))/Math.max(.01,i);return i<2.3&&p_(t,n>1.6)&&(n>1.6||i<1.25)?"dunk":i<3.3?"layup":Dn(t.pos.x,t.pos.z,e)?"three":"jumper"}var Kp={dunk:"DUNK",layup:"LAYUP",jumper:"JUMP SHOT",three:"3PT SHOT",ft:"FREE THROW"};function rn(s,t){let e=0,i=fc(s,t)*B.X-t.pos.x,n=B.Z-t.pos.z,r=Math.hypot(i,n)||1;for(let a of s.players){if(a.team===t.team)continue;let o=a.pos.x-t.pos.x,c=a.pos.z-t.pos.z,l=Math.hypot(o,c);if(l>2.6)continue;let h=(o*i+c*n)/(r*(l||1)),d=Mt((2.6-l)/1.7,0,1)*Mt(.35+.65*h,0,1);d*=a.handsUp||a.airborne?1:.65,(s.time<a.beatenUntil||s.time<a.offBalanceUntil)&&(d*=.35),d*=.72+.28*(a.attrs.defense/99),d>e&&(e=d)}return Mt(e,0,1)}function On(s,t,e,i,n){let r=De(t.pos.x,t.pos.z,fc(s,t)),a,o,c=t.attrs.shooting/99;return e==="layup"?(a=.5,o=.09+.05*(t.attrs.handling/99)):e==="ft"?(a=.62,o=.06+.05*c):e==="dunk"?(a=.5,o=.5):(a=.44+.4*Mt((r-3)/5.5,0,1),o=.05+.055*c),o*=1-.5*i,o*=1-.35*Mt(n,0,1),o*=1-.3*Mt((.35-t.stamina)/.35,0,1),t.isHuman&&(o*=s.assist.window),{c:Mt(a,.2,.9),w:Math.max(.022,o)}}function m_(s,t){let e=s-t.c,i=Math.abs(e);return i<=t.w*.45?{e,tier:"perfect",label:"PERFECT RELEASE"}:i<=t.w?{e,tier:"good",label:"GOOD RELEASE"}:i<=t.w+.12?{e,tier:e<0?"early":"late",label:e<0?"SLIGHTLY EARLY":"SLIGHTLY LATE"}:{e,tier:e<0?"early":"late",label:e<0?"WAY EARLY":"WAY LATE"}}function Iu(s,t,e){let i=s.rng,n=e.kind,r=e.pos,a=t.attrs.shooting/99,o=m_(e.charge,e.spot),l=fc(s,t)*(B.X+.035),h=B.Z,d=Math.hypot(l-r.x,h-r.z),u=re(l-r.x,h-r.z),g=(o.e-Math.sign(o.e)*Math.min(Math.abs(o.e),e.spot.w))*(n==="layup"?1.5:n==="ft"?.95:1.1),x=o.tier==="perfect"?.62:o.tier==="good"?.92:1,p=((n==="layup"?.02:n==="ft"?.012:.016)+.022*(1-a)+.014*e.pressure+.01*e.moving)*x,v=(.006+.012*(1-a)+.014*e.pressure+.006*e.moving)*x;g+=i.gauss()*p;let S=kn(u,e.aimYaw),y=n==="layup"?.6:.16,E=Math.abs(S)>y?(Math.abs(S)-y)*Math.sign(S)*.85:0,M=u+E+i.gauss()*v,A=Math.max(.3,d*(1+g)+i.gauss()*(n==="layup"?.035:.015)),b=Math.max(B.Y+(n==="layup"?.42:.55)+.1*d,r.y+.35),T=Math.sqrt(2*9.81*(b-r.y)),R=T/9.81+Math.sqrt(2*(b-B.Y)/9.81),P=Math.atan2(T,A/R),D=Math.sin(M),H=Math.cos(M),L=Xp(r.x,r.y,r.z,D,H,P,A,B.Y),V=Math.cos(P),K=Math.sin(P);return{vx:D*V*L,vy:K*L,vz:H*V*L,grade:o,backspin:7+5*a,yaw:M}}function Lu(s,t,e,i,n=0){let r=s.attrs.shooting/99,a;return t==="dunk"?Mt(.96*(1-.3*i),.3,.97):(t==="layup"?a=.78+.12*(s.attrs.handling/99):t==="ft"?a=.45+.42*r:a=.42+.4*r-.04*Math.max(0,e-3),Mt(a*(1-.62*i)*(1-.3*n),.02,.95))}function Zp(s,t,e){return e==="ft"?1:e==="three"?3:2}var Jt=(s,t,e,i)=>{let n=document.createElement(s);return t&&(n.className=t),i!=null&&(n.innerHTML=i),e&&e.appendChild(n),n},mc=class{constructor(t){this.root=Jt("div","hud hidden",t),this.poss=Jt("div","hud-poss",this.root),Jt("div","hud-poss-label",this.poss,"YOU HAVE THE BALL"),this.hasBall=!1;let e=Jt("div","hud-top",this.root);this.teamA=Jt("span","hud-team",e),this.score=Jt("span","hud-score",e,"0 - 0"),this.teamB=Jt("span","hud-team",e);let i=Jt("div","hud-clocks",this.root);this.period=Jt("div","hud-period hidden",i,"Q1"),this.clock=Jt("div","hud-clock",i,"5:00"),this.shot=Jt("div","hud-shot",i,"14"),this.phase=Jt("div","hud-phase",this.root);let n=Jt("div","hud-player",this.root),r=Jt("div","hud-prow",n);this.ptsEl=Jt("div","hud-rating",r,"0"),Jt("div","hud-rating-label",r,"PTS"),this.lineEl=Jt("div","hud-line",n,"");let a=Jt("div","hud-stamina",n);this.stamFill=Jt("div","hud-stamina-fill",a),this.nameEl=Jt("div","hud-name",n),this.cross=Jt("div","hud-cross",this.root),this.meter=Jt("div","hud-meter hidden",this.root),this.meterLabel=Jt("div","hm-label",this.meter);let o=Jt("div","hm-bar",this.meter);this.meterFill=Jt("i","hm-fill",o),this.meterBand=Jt("i","hm-band",o),this.meterPerfect=Jt("i","hm-perfect",o),this.meterTick=Jt("i","hm-tick",o),this.clear=Jt("div","hud-clear hidden",this.root,"CLEAR IT \xB7 take it past the arc"),this.hint=Jt("div","hud-hint",this.root),this.notes=Jt("div","hud-notes",this.root),this.arrow=Jt("div","hud-arrow hidden",this.root),this.banner=Jt("div","hud-banner hidden",this.root),this.count=Jt("div","hud-count hidden",this.root),this.countTitle=Jt("div","c-title",this.count),this.countNum=Jt("div","c-num",this.count),this.fade=Jt("div","hud-fade",this.root),this.radar=Jt("canvas","hud-radar",this.root),this.radar.width=200,this.radar.height=176,this.rctx=this.radar.getContext("2d"),this.v=new N,this.bannerUntil=0}show(t){this.root.classList.toggle("hidden",!t)}notify(t,e=""){let i=Jt("div","hud-note "+e,this.notes,t);for(setTimeout(()=>i.classList.add("out"),1300),setTimeout(()=>i.remove(),1700);this.notes.children.length>3;)this.notes.firstChild.remove()}showBanner(t,e="",i=2200,n=""){this.banner.className="hud-banner "+n,this.banner.innerHTML=`<div class="b-main">${t}</div>${e?`<div class="b-sub">${e}</div>`:""}`,this.bannerUntil=performance.now()+i}showCountdown(t,e){t!=null&&(this.countTitle.textContent=t),this.count.classList.remove("hidden"),this.countNum.textContent=e,this.countNum.classList.toggle("go",e==="GO!"),this.countNum.classList.remove("pop"),this.countNum.offsetWidth,this.countNum.classList.add("pop")}endCountdown(){this.count.classList.add("hidden")}flashFade(){this.fade.classList.remove("on"),this.fade.offsetWidth,this.fade.classList.add("on")}update(t){let e=t.match,i=e.human;this.teamA.textContent=e.teams[0].short,this.teamB.textContent=e.teams[1].short,this.teamA.style.setProperty("--kit",t.kitA||"#c00"),this.teamB.style.setProperty("--kit",t.kitB||"#00c");let n=e.phase==="live"||e.phase==="check"||e.phase==="inbound";this.teamA.classList.toggle("poss",n&&e.offense===0&&e.rules),this.teamB.classList.toggle("poss",n&&e.offense===1&&e.rules);let r=!!e.full&&t.clockText==null;this.period.classList.toggle("hidden",!r),r&&(this.period.textContent=e.periodLabel);let a=e.full?5:6;this.teamA.classList.toggle("bonus",!!e.rules&&e.teams[1].fouls>=a-1&&e.phase!=="over"),this.teamB.classList.toggle("bonus",!!e.rules&&e.teams[0].fouls>=a-1&&e.phase!=="over");let o=`${e.teams[0].score} - ${e.teams[1].score}`;o!==this.score.textContent&&((this.score.textContent!=="0 - 0"||o!=="0 - 0")&&(this.score.classList.remove("bump"),this.score.offsetWidth,this.score.classList.add("bump")),this.score.textContent=o),this.clock.textContent=t.clockText??e.displayClock;let c=e.shotClockOn&&e.phase!=="over"&&t.clockText==null;if(this.shot.classList.toggle("hidden",!c),c&&(this.shot.textContent=e.displayShot,this.shot.classList.toggle("low",e.shotClock<=5&&e.phase==="live")),this.phase.textContent=t.phaseText||"",i){let h=e.stats.of(i);this.ptsEl.textContent=h.pts,this.lineEl.textContent=`FG ${h.fgm}/${h.fga} \xB7 3P ${h.tpm}/${h.tpa}${h.ast?` \xB7 AST ${h.ast}`:""}${h.stl?` \xB7 STL ${h.stl}`:""}`,this.stamFill.style.width=`${Math.round(i.stamina*100)}%`,this.stamFill.classList.toggle("low",i.stamina<.3),this.nameEl.textContent=`#${i.number} ${i.name}`}this.updateMeter(t),this.clear.classList.toggle("hidden",!(i&&e.mustClear===i.team&&e.ball.owner&&e.ball.owner.team===i.team&&e.phase==="live")),this.hint.textContent=t.hint||"";let l=!!i&&e.ball.owner===i&&(e.ball.state==="held"||e.ball.state==="dribble")&&(e.phase==="live"||e.phase==="check");l!==this.hasBall&&(this.hasBall=l,this.poss.classList.toggle("on",l)),this.banner.classList.toggle("hidden",performance.now()>this.bannerUntil),this.updateArrow(t),this.drawRadar(t)}updateMeter(t){let e=t.preview,i=!!e&&t.meter!==!1;if(this.meter.classList.toggle("hidden",!i),!i)return;let n=e.spot,r=a=>`${Math.round(Math.max(0,Math.min(1,a))*1e3)/10}%`;this.meterBand.style.bottom=r(n.c-n.w),this.meterBand.style.height=r(n.w*2),this.meterPerfect.style.bottom=r(n.c-n.w*.45),this.meterPerfect.style.height=r(n.w*.9),this.meterFill.style.height=r(e.charge||0),this.meter.classList.toggle("idle",!e.live&&!e.released),this.meter.classList.toggle("done",!!e.released),this.meterTick.style.bottom=r(e.charge||0),this.meterTick.style.display=e.released?"block":"none",this.meterLabel.textContent=e.released&&e.grade?e.grade.label:Kp[e.kind]||"",this.meter.dataset.tier=e.released&&e.grade?e.grade.tier:""}updateArrow(t){let e=t.match,i=e.ball.pos,n=t.view.projectToScreen(this.v.set(i.x,i.y,i.z),this.v);if(!(Math.abs(n.x)>.98||Math.abs(n.y)>.98)||t.noArrow||this.hasBall||e.phase==="over"){this.arrow.classList.add("hidden");return}let a=Math.atan2(n.y,n.x),o=.86,c=Math.min(o/Math.max(Math.abs(Math.cos(a)),.001),o/Math.max(Math.abs(Math.sin(a)),.001)),l=(Math.cos(a)*c*.5+.5)*100,h=(-Math.sin(a)*c*.5+.5)*100;this.arrow.classList.remove("hidden"),this.arrow.style.left=`${l}%`,this.arrow.style.top=`${h}%`,this.arrow.style.transform=`translate(-50%,-50%) rotate(${-a}rad)`}drawRadar(t){let e=t.match,i=this.rctx,n=e.human,r=!!e.full;r!==this.radarFull&&(this.radarFull=r,this.radar.width=r?124:200,this.radar.height=r?216:176,this.radar.classList.toggle("full",r));let a=this.radar.width,o=this.radar.height,c=r?7:10,l=r&&n?e.side(n.team):1,h=(a-c*2)/Dt.W,d=(o-c*2)/(r?Dt.L:Dt.HL),u=(p,v)=>[c+(Dt.HW+v*l)*h,c+(Dt.HL-p*l)*d];i.clearRect(0,0,a,o),i.fillStyle=t.style==="neo"?"rgba(236,159,60,0.92)":"rgba(150,110,60,0.88)",i.fillRect(0,0,a,o),i.strokeStyle="rgba(255,255,255,0.9)",i.lineWidth=1,i.strokeRect(c,c,a-c*2,o-c*2);let f=p=>{let v=(L,V)=>u(p*L*l,p*V*l),[S,y]=v(Dt.HL,-zt.KEY_HW),[E,M]=v(zt.FT_X,zt.KEY_HW);i.strokeStyle="rgba(255,255,255,0.9)",i.lineWidth=1,i.strokeRect(Math.min(S,E),Math.min(y,M),Math.abs(E-S),Math.abs(M-y));let[A,b]=v(B.X,0),[T]=v(0,-zt.THREE_Z),[R]=v(0,zt.THREE_Z),[,P]=v(zt.THREE_X,0),[,D]=v(Dt.HL,0),H=Math.asin(zt.THREE_Z/zt.THREE_R);i.beginPath(),i.moveTo(T,D),i.lineTo(T,P),p>0?i.arc(A,b,zt.THREE_R*h,Math.PI/2+H,Math.PI/2-H,!0):i.arc(A,b,zt.THREE_R*h,-Math.PI/2+H,-Math.PI/2-H,!0),i.lineTo(R,D),i.stroke(),i.beginPath(),i.arc(A,b,r?2.4:3,0,Math.PI*2),i.strokeStyle=p>0?"#ff6a1a":"rgba(255,255,255,0.7)",i.lineWidth=2,i.stroke()};if(f(1),r){f(-1);let[,p]=u(0,0);i.strokeStyle="rgba(255,255,255,0.9)",i.lineWidth=1,i.beginPath(),i.moveTo(c,p),i.lineTo(a-c,p),i.stroke(),i.beginPath(),i.arc(a/2,p,zt.CENTER_R*h,0,Math.PI*2),i.stroke()}let g=r?3.4:4.2;for(let p of e.players){if(p===n)continue;let[v,S]=u(p.pos.x,p.pos.z);i.fillStyle=p.team===0?t.kitA:t.kitB,i.strokeStyle="#111",i.lineWidth=1.2,i.beginPath(),i.arc(v,S,g,0,Math.PI*2),i.fill(),i.stroke()}if(n){let[p,v]=u(n.pos.x,n.pos.z),S=t.camYaw,y=Math.cos(S)*l,E=-Math.sin(S)*l;i.fillStyle="#ffc61a",i.beginPath(),i.moveTo(p+y*10,v+E*10),i.lineTo(p-E*6-y*4,v+y*6-E*4),i.lineTo(p+E*6-y*4,v-y*6-E*4),i.closePath(),i.fill(),i.strokeStyle="#070b1d",i.lineWidth=2,i.stroke()}let[x,m]=u(e.ball.pos.x,e.ball.pos.z);i.fillStyle="#ff7a1a",i.strokeStyle="#000",i.lineWidth=1.5,i.beginPath(),i.arc(x,m,3.2,0,Math.PI*2),i.fill(),i.stroke()}};var zs=(s,t,e,i)=>{let n=document.createElement(s);return t&&(n.className=t),i!=null&&(n.innerHTML=i),e&&e.appendChild(n),n};var Jp=["d","c","b","a"],g_={attack:{a:["shoot","SHOOT"],b:["pass","PASS"],c:["cross","CROSS"],d:["jump","FAKE"]},offball:{a:[null,""],b:["pass","CALL"],c:["jump","JUMP"],d:[null,""]},defend:{a:["steal","STEAL"],b:["stance","STANCE"],c:["jump","BLOCK"],d:["shoot","HANDS"]},free:{a:[null,""],b:[null,""],c:[null,""],d:[null,""]}},gc=class{constructor(t,e){this.app=t,this.input=t.input;let i=this.root=zs("div","touch hidden",e);this.zone=zs("div","tc-zone",i),this.stick=zs("div","tc-stick idle",i),this.knob=zs("div","tc-knob",this.stick),this.btn={};for(let o of Jp)this.btn[o]=zs("button",`tc-btn tc-${o}`,i),this.btn[o].dataset.k=o;this.pauseBtn=zs("button","tc-pause",i,"<i></i><i></i>"),this.pauseBtn.setAttribute("aria-label","Pause"),zs("div","tc-rotate",i,"Turn your phone sideways for a wider view"),this.ptrs=new Map,this.stickId=null,this.layout="attack",this.visible=!1,this.applyLayout();let n=o=>this.onDown(o),r=o=>this.onMove(o),a=o=>this.onUp(o);i.addEventListener("pointerdown",n),i.addEventListener("pointermove",r),i.addEventListener("pointerup",a),i.addEventListener("pointercancel",a),i.addEventListener("lostpointercapture",a),i.addEventListener("contextmenu",o=>o.preventDefault()),this.input.onReleaseAll=()=>this.reset()}setVisible(t){t!==this.visible&&(this.visible=t,this.root.classList.toggle("hidden",!t),t||this.reset())}reset(){for(let[,e]of this.ptrs)e.kind==="btn"&&this.btn[e.k].classList.remove("down");for(let[,e]of this.ptrs)e.kind==="btn"&&e.type&&this.input.touchAction(e.type,!1);this.ptrs.clear(),this.stickId=null;let t=this.input.touch;t.active=!1,t.f=0,t.r=0,t.sprint=!1,this.stick.classList.add("idle"),this.stick.classList.remove("sprint"),this.stick.style.left="",this.stick.style.top="",this.knob.style.transform=""}update(t){let e=t.match,i=t.human;if(!i)return;let n=e.ball,r=n.owner,a;e.phase==="ft"?a=e.ft&&e.ft.shooter===i?"attack":"free":r===i?a="attack":r&&r.team!==i.team||!r&&e.offense!==i.team&&e.rules?a="defend":a="offball",a!==this.layout&&(this.layout=a,this.applyLayout()),a==="defend"&&this.btn.a.classList.toggle("cool",e.time<i.stealReadyAt)}applyLayout(){let t=g_[this.layout];for(let e of Jp){let[i,n]=t[e],r=this.btn[e];r.textContent=n,r.dataset.type=i||"",r.classList.toggle("off",!i),r.classList.remove("cool")}}radius(){return Math.max(46,Math.min(72,Math.min(innerWidth,innerHeight)*.14))}onDown(t){if(t.pointerType==="mouse")return;t.preventDefault();let e=t.target;try{e.setPointerCapture(t.pointerId)}catch{}if(e===this.pauseBtn){this.ptrs.set(t.pointerId,{kind:"pause"});return}let i=e.classList.contains("tc-btn")?e.dataset.k:null;if(i){let n=this.btn[i].dataset.type;if(!n)return;this.ptrs.set(t.pointerId,{kind:"btn",k:i,type:n,x:t.clientX,y:t.clientY}),this.btn[i].classList.add("down"),this.input.touchAction(n,!0);return}if(t.clientX<innerWidth*.42&&this.stickId==null){this.stickId=t.pointerId;let n={kind:"stick",ox:t.clientX,oy:t.clientY};this.ptrs.set(t.pointerId,n),this.stick.classList.remove("idle"),this.placeStick(n),this.moveStick(n,t.clientX,t.clientY)}else this.ptrs.set(t.pointerId,{kind:"look",x:t.clientX,y:t.clientY})}onMove(t){let e=this.ptrs.get(t.pointerId);if(e){if(t.preventDefault(),e.kind==="stick")this.moveStick(e,t.clientX,t.clientY);else if(e.kind==="look"||e.kind==="btn"&&(e.type==="shoot"||e.type==="pass")){let i=e.kind==="look"?1.35:.9;this.input.touchLook((t.clientX-e.x)*i,(t.clientY-e.y)*i),e.x=t.clientX,e.y=t.clientY}}}onUp(t){let e=this.ptrs.get(t.pointerId);if(e){if(this.ptrs.delete(t.pointerId),e.kind==="pause"){t.type==="pointerup"&&this.app.pause();return}if(e.kind==="btn"){this.btn[e.k].classList.remove("down"),this.input.touchAction(e.type,!1);return}if(e.kind==="stick"){this.stickId=null;let i=this.input.touch;i.active=!1,i.f=0,i.r=0,i.sprint=!1,this.stick.classList.add("idle"),this.stick.classList.remove("sprint"),this.stick.style.left="",this.stick.style.top="",this.knob.style.transform=""}}}placeStick(t){this.stick.style.left=`${t.ox}px`,this.stick.style.top=`${t.oy}px`}moveStick(t,e,i){let n=this.radius(),r=e-t.ox,a=i-t.oy,o=Math.hypot(r,a),c=n*1.25;o>c&&(t.ox+=r/o*(o-c),t.oy+=a/o*(o-c),r=e-t.ox,a=i-t.oy,o=c,this.placeStick(t));let l=Math.min(1,o/n),h=.12,d=l<h?0:(l-h)/(1-h),u=this.input.touch;u.active=!0,u.f=o>0?-a/o*d:0,u.r=o>0?r/o*d:0,u.sprint=o/n>.92,this.stick.classList.toggle("sprint",u.sprint);let f=Math.min(o,n)/(o||1);this.knob.style.transform=`translate(${r*f}px, ${a*f}px)`}};var an=class{constructor(t=1){this.s=t>>>0||1}next(){let t=(this.s+=1831565813)>>>0;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}range(t,e){return t+(e-t)*this.next()}int(t,e){return Math.floor(this.range(t,e+1))}chance(t){return this.next()<t}pick(t){return t[Math.floor(this.next()*t.length)%t.length]}gauss(){return(this.next()+this.next()+this.next()+this.next()-2)*1.732}};function Hs(s){let t=2166136261;for(let e=0;e<s.length;e++)t^=s.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}var xc=class{constructor(){this.handlers=new Map,this.log=[],this.nextId=1,this.maxLog=4e3}on(t,e){return this.handlers.has(t)||this.handlers.set(t,[]),this.handlers.get(t).push(e),()=>{let i=this.handlers.get(t),n=i.indexOf(e);n>=0&&i.splice(n,1)}}emit(t,e){let i=Object.assign({id:this.nextId++,type:t},e);this.log.push(i),this.log.length>this.maxLog&&this.log.splice(0,this.log.length-this.maxLog);let n=this.handlers.get(t);if(n)for(let a=0;a<n.length;a++)n[a](i);let r=this.handlers.get("*");if(r)for(let a=0;a<r.length;a++)r[a](i);return i}};var Nu=Nn.FLOOR_E;function x_(s,t){let e=c=>{let l=(-c+Math.sqrt(c*c+2*Ne*s))/Ne,h=Nu*(c+Ne*l),d=h*h-2*Ne*s;if(d<0)return null;let u=(h-Math.sqrt(d))/Ne;return{td:l,tu:u,vd:c,vu:h,T:l+u}},i=Math.sqrt(2*Ne*s)/Nu,n=Math.sqrt(Math.max(0,i*i-2*Ne*s))+.001,r=e(n);if(!r||r.T<=t)return r||{td:t*.4,tu:t*.6,vd:n,vu:0,T:t};let a=n,o=20;for(let c=0;c<28;c++){let l=(a+o)/2,h=e(l);h&&h.T>t?a=l:o=l}return e((a+o)/2)}var Qp=s=>s==="L"?1:-1;function jp(s,t,e,i){return[Qp(t)*(.3-.05*e),.34+.3*e+.04*i,.86-.2*i+.06*e]}function ls(s,t,e={}){s.hand=t,s.dribble={t:0,T:.5,td:.2,tu:.3,from:t,to:t,crossQueued:!1,a:[0,.4,.86],b:[0,.5,Et],c:[0,.4,.86],cross:!1,low:0,count:0},Du(s,e.low||0,e.fromPos||(s.holdLocal?[...s.holdLocal]:null))}function Du(s,t=0,e=null){let i=s.dribble,n=Math.hypot(s.vel.x,s.vel.z),r=Mt(n/6.5,0,1);i.low+=(t-i.low)*.6;let a=i.crossQueued;i.crossQueued=!1,i.cross=a,i.from=i.to,i.to=a?i.from==="L"?"R":"L":i.from,s.hand=i.to;let o=e||(i.count>0?[...i.c]:jp(s,i.from,r,i.low)),c=jp(s,i.to,r,i.low),l=Qp(i.from),h=a?0:l*(.33-.04*r),d=(o[1]+c[1])/2+.06+.22*r;i.a=o,i.c=c,i.b=[h,d,Et];let u=.56-.17*r-.08*i.low;a&&(u*=.82),u*=1-(s.attrs.handling-60)*.0015;let f=Math.max(.3,Math.min(o[2],c[2])-Et),g=x_(f,u);i.T=g.T,i.td=g.td*(o[2]-Et)/f,i.tu=g.T-i.td,i.vd=g.vd,i.t=0,i.count++}function ku(s,t){let e=s.dribble,i=e.t;if(i<e.td){let n=i/e.td,r=e.a[2]-Et,a=e.a[2]-(e.vd*i+.5*Ne*i*i)*(r/Math.max(.01,e.vd*e.td+.5*Ne*e.td*e.td));t[0]=e.a[0]+(e.b[0]-e.a[0])*n,t[1]=e.a[1]+(e.b[1]-e.a[1])*n,t[2]=Math.max(Et,a)}else{let n=i-e.td,r=Mt(n/e.tu,0,1),a=e.vd+Ne*e.td,o=Nu*a,c=e.c[2]-Et,l=o*n-.5*Ne*n*n,h=o*e.tu-.5*Ne*e.tu*e.tu,d=Et+l*(c/Math.max(.01,h));t[0]=e.b[0]+(e.c[0]-e.b[0])*r,t[1]=e.b[1]+(e.c[1]-e.b[1])*r,t[2]=Math.max(Et,d)}return t}function vc(s,t,e,i=s.pos.x,n=s.pos.z,r=s.yaw){let a=Math.sin(r),o=Math.cos(r),c=Math.cos(r),l=-Math.sin(r);return e.x=i+c*t[0]+a*t[1],e.z=n+l*t[0]+o*t[1],e.y=t[2],e}function Ou(s,t,e,i){let n=t-s.pos.x,r=i-s.pos.z,a=Math.sin(s.yaw),o=Math.cos(s.yaw),c=Math.cos(s.yaw),l=-Math.sin(s.yaw);return[n*c+r*l,n*a+r*o,e]}var Ke={chest:[0,.36,1.2],gather:[0,.32,1.28],pass:[0,.6,1.3],set:[-.1,.22,xe.EYE+.24],release:[-.1,.36,xe.EYE+.42],layup:[-.14,.42,xe.REACH-.05],ft:[-.08,.24,xe.EYE+.18]},tm={set:[-.17,.44,xe.EYE+.14],ft:[-.15,.44,xe.EYE+.1],layup:[-.12,.52,xe.REACH-.12]};function Hi(s,t){return s.ball.owner===t&&(s.ball.state==="held"||s.ball.state==="dribble")}function Vi(s,t){let e=t.action;return e&&!(e.type==="jump"&&!Hi(s,t))?!1:s.time>=t.offBalanceUntil||Hi(s,t)}function Fu(s,t){s.ball.state==="dribble"&&s.ball.owner===t&&(t.gatherPending=!0)}function wn(s,t){let e=s.ball;e.state="held",e.owner=t,t.dribble=null,t.gatherPending=!1,t.holdLocal=Ou(t,e.pos.x,e.pos.y-t.pos.y,e.pos.z)}function v_(s,t,e){let i=t.action,n=(r,a,o)=>(o=Mt(o,0,1),e[0]=r[0]+(a[0]-r[0])*o,e[1]=r[1]+(a[1]-r[1])*o,e[2]=r[2]+(a[2]-r[2])*o,e);if(!i)return n(Ke.chest,Ke.chest,0);if(i.type==="shot"){if(i.tg==null)return n(Ke.gather,Ke.gather,0);let r=(i.t-i.tg)/(i.kind==="ft"?.35:.24),a=t.isHuman?{...Ke,...tm}:Ke;if(i.kind==="layup")return n(Ke.gather,a.layup,(i.t-i.tg)/.42);if(i.kind==="dunk"){let o=s.side(t.team),c=Ou(t,o*(B.X-.05),0,B.Z),l=[Mt(c[0],-.25,.25),Mt(c[1],.15,.55),xe.REACH+.18];return n(Ke.gather,l,(i.t-i.tg)/.3)}return n(Ke.gather,i.kind==="ft"?a.ft:a.set,r)}return i.type==="pass"?i.tg==null?n(Ke.chest,Ke.chest,0):n(Ke.chest,i.kind==="bounce"?[0,.55,1]:Ke.pass,(i.t-i.tg)/i.push):i.type==="fake"?n(Ke.chest,Ke.set,Math.sin(Mt(i.t/.42,0,1)*Math.PI)*.85):n(Ke.chest,Ke.chest,0)}var La=[0,0,0],yc=new _e;function Na(s,t,e){let i=s.ball;v_(s,t,La);let n=t.holdLocal||(t.holdLocal=[...La]),r=1-Math.exp(-e*26);n[0]+=(La[0]-n[0])*r,n[1]+=(La[1]-n[1])*r,n[2]+=(La[2]-n[2])*r,vc(t,n,yc),i.setKinematic(yc.x,yc.y+t.pos.y,yc.z,e)}function cs(s,t,e={}){if(!Hi(s,t)||!Vi(s,t))return!1;let i=e.kind||Bs(s,t),n=rn(s,t),r=Mt(t.speed/6,0,1),a=On(s,t,i,n,i==="layup"||i==="dunk"?0:r);return t.action={type:"shot",kind:i,t:0,t0:s.time,tg:s.ball.state==="held"?0:null,charging:!!e.charging,charge:0,relCharge:null,releaseCharge:e.releaseCharge??a.c,aimYaw:e.aimYaw??re(s.side(t.team)*B.X-t.pos.x,B.Z-t.pos.z),spot:a,pressure:n,moving:r,value:Zp(s,t,i),released:!1,jumped:!1,lockMove:i==="layup"||i==="dunk"?void 0:3,from:{x:t.pos.x,z:t.pos.z}},Fu(s,t),s.events.emit("shotStart",{player:t,kind:i,t:s.time}),!0}function Bu(s,t){s.type!=="shot"||!s.charging||(s.charging=!1,s.relCharge=Mt((t-s.t0)/pc[s.kind],0,1))}function y_(s,t,e,i){let n=s.ball,r=s.time;if(e.t+=i,!e.released){if(n.owner!==t){t.action=null;return}if(e.charge=Mt((r-e.t0)/pc[e.kind],0,1),e.tg==null)if(n.state==="held")e.tg=e.t;else if(e.t>.45)wn(s,t),e.tg=e.t;else return;let a=e.t-e.tg,o=s.side(t.team)*B.X-t.pos.x,c=B.Z-t.pos.z,l=Math.hypot(o,c)||1;if(e.ai&&(e.aimYaw=re(o,c)),!e.jumped)if(e.kind==="jumper"||e.kind==="three"){let d=t.jumpHeight()*.62;a>.05&&e.t>=Yp(e.spot.c,e.kind,d)&&(Sn(t,r,d),e.jumped=!0)}else if(e.kind==="layup"){if(t.desired.set(o/l*4,0,c/l*4),t.faceYaw=re(o,c),a>.2){Sn(t,r,t.jumpHeight()*.8);let d=Math.min(3,Math.max(0,l-.7)/.55);t.vel.set(o/l*d,0,c/l*d),e.jumped=!0}}else if(e.kind==="dunk"){if(t.faceYaw=re(o,c),a>.06){let d=B.Y+.3-xe.REACH;Sn(t,r,Math.max(d,t.jumpHeight()));let u=Math.sqrt(2*Math.max(d,.5)/Ne),f=Math.max(0,l-.55),g=Math.min(5.5,f/u);t.vel.set(o/l*g,0,c/l*g),e.jumped=!0,e.apexT=e.t+u}}else e.jumped=!0;let h=!1;if(e.kind==="dunk")h=e.jumped&&e.t>=(e.apexT??9)-.04;else if(t.isHuman&&!e.ai){let d=e.kind==="ft"?.3:e.kind==="layup"?.32:.16;e.charge>=1&&e.charging&&(e.charging=!1,e.relCharge=1),h=!e.charging&&a>=d,e.jumped&&e.kind!=="ft"&&t.vy<0&&t.pos.y<.1&&a>.25&&(e.charging&&(e.charging=!1,e.relCharge=e.charge),h=!0)}else{let d=e.kind==="ft"?.3:e.kind==="layup"?.32:.16;h=a>=d&&e.charge>=e.releaseCharge,e.jumped&&e.kind!=="ft"&&t.vy<0&&t.pos.y<.1&&a>.25&&(h=!0),h&&(e.relCharge=e.charge)}h&&b_(s,t,e);return}e.t-e.rt>.45&&!t.airborne&&(t.action=null)}function b_(s,t,e){let i=s.ball,n=s.time;e.released=!0,e.rt=e.t,t.shotSide=s.side(t.team);let r=e.relCharge??e.charge,a=s.side(t.team)*B.X-i.pos.x,o=B.Z-i.pos.z;if(e.kind==="dunk"&&Math.hypot(a,o)<.5&&i.pos.y>B.Y+.08)i.release(a*4,-5.5,o*4,0,0,0),e.gradeInfo={tier:"perfect",label:"DUNK"};else if(e.kind==="dunk"){let c=Iu(s,t,{kind:"layup",charge:.5,spot:{c:.5,w:.2},pressure:e.pressure,moving:0,aimYaw:re(a,o),pos:i.pos});i.release(c.vx,c.vy,c.vz,0,0,0),e.kind="layup",e.gradeInfo=c.grade}else{let c=Iu(s,t,{kind:e.kind,charge:r,spot:e.spot,pressure:e.pressure,moving:e.moving,aimYaw:e.aimYaw,pos:i.pos}),l=Math.cos(c.yaw),h=-Math.sin(c.yaw);i.release(c.vx,c.vy,c.vz,l*c.backspin,0,h*c.backspin),e.gradeInfo=c.grade}i.ignore=t,i.ignoreUntil=n+.35,t.noCatchUntil=n+vi.SHOT_LOCK,i.lastTouch={player:t,team:t.team,t:n},i.shot={shooter:t,team:t.team,side:s.side(t.team),kind:e.kind,value:e.value,t:n,rim:!1,board:!1,blocked:!1,from:{...e.from},foul:null,grade:e.gradeInfo,charge:r,spot:e.spot},i.pass=null,s.events.emit("shot",{player:t,kind:e.kind,value:e.value,grade:e.gradeInfo,pressure:e.pressure,t:n})}function bc(s,t,e,i){let n=0,r=null,a=Math.hypot(e-t.pos.x,i-t.pos.z);for(let o of s.players){if(o.team===t.team)continue;let c=ks(o.pos.x,o.pos.z,t.pos.x,t.pos.z,e,i),l=c.t*a;if(l<.35||l>a+.3)continue;let h=Mt((1.15-c.d)/.9,0,1);h>n&&(n=h,r=o)}return{risk:n,who:r}}function Dr(s,t,e,i={}){if(!e||!Hi(s,t)||!Vi(s,t))return!1;let n=bc(s,t,e.pos.x,e.pos.z),r=Math.hypot(e.pos.x-t.pos.x,e.pos.z-t.pos.z),a=i.kind||(n.risk>.35&&r>2.5?"bounce":r>9?"lob":"chest");return t.action={type:"pass",target:e,kind:a,t:0,tg:s.ball.state==="held"?0:null,push:a==="bounce"?.13:.11,released:!1,lockMove:2.5},t.faceYaw=re(e.pos.x-t.pos.x,e.pos.z-t.pos.z),Fu(s,t),!0}function __(s,t,e,i){let n=s.ball;if(e.t+=i,!e.released){if(n.owner!==t){t.action=null;return}if(e.tg==null)if(n.state==="held")e.tg=e.t;else if(e.t>.4)wn(s,t),e.tg=e.t;else return;e.t-e.tg>=e.push&&M_(s,t,e);return}e.t-e.rt>.3&&(t.action=null)}function M_(s,t,e){let i=s.ball,n=s.time,r=s.rng,a=e.target;e.released=!0,e.rt=e.t;let o=t.attrs.passing/99,c=i.pos,l=a.pos.x,h=a.pos.z,d=e.kind==="bounce"?7.6+o*1.5:e.kind==="lob"?7.6+o*1.2:9.2+o*2.4,u=0;for(let b=0;b<3;b++)u=Math.hypot(l-c.x,h-c.z)/d,l=a.pos.x+a.vel.x*u*.85,h=a.pos.z+a.vel.z*u*.85;let f=rn(s,t),g=(.012+.04*(1-o)+.03*f)*(t.isHuman?s.assist.passErr:1),x=l-c.x,m=h-c.z,p=Math.hypot(x,m)||1,v=re(x,m)+r.gauss()*g,S=Math.sin(v),y=Math.cos(v),E,M,A;if(e.kind==="bounce"){let T=p*.6/d;M=(Et-c.y+.5*Ne*T*T)/T,E=S*d,A=y*d}else{let b=a.pos.y+(e.kind==="lob"?1.55:1.25),T=p/d,R=1+.012*d*T*.5;M=(b-c.y+.5*Ne*T*T)/T,E=S*d*R,A=y*d*R}E*=1+r.gauss()*g*.5,A*=1+r.gauss()*g*.5,i.release(E,M,A,0,0,0),i.ignore=t,i.ignoreUntil=n+.2,t.noCatchUntil=n+vi.PASS_LOCK,i.lastTouch={player:t,team:t.team,t:n},i.pass={passer:t,target:a,team:t.team,t:n,kind:e.kind,tried:new Set},i.shot=null,s.events.emit("pass",{player:t,target:a,kind:e.kind,t:n})}function _c(s,t){let e=s.time;if(e<t.stealReadyAt||t.action||Hi(s,t))return!1;let i=s.ball,n=null;i.owner&&i.owner.team!==t.team&&i.owner.pos.distXZ(t.pos)<vi.STEAL_RANGE+.3&&(n=i.owner);let r=n?re(i.pos.x-t.pos.x,i.pos.z-t.pos.z):t.yaw;return t.action={type:"steal",t:0,target:n,dir:r,resolved:!1,lockMove:2.2,hand:kn(t.yaw,r)>0?"L":"R"},t.stealReadyAt=e+vi.STEAL_COOLDOWN,s.events.emit("stealTry",{player:t,t:e}),!0}function S_(s,t,e,i){e.t+=i,!e.resolved&&e.t>=.11&&(e.resolved=!0,w_(s,t,e)),e.t>=.34&&(t.action=null)}function w_(s,t,e){let i=s.ball,n=s.time,r=s.rng,a=Math.sin(e.dir),o=Math.cos(e.dir),c=t.pos.x+a*.72,l=t.pos.z+o*.72,h=i.owner;if(h&&h.team!==t.team&&(i.state==="dribble"||i.state==="held")){let d=Math.hypot(i.pos.x-c,i.pos.z-l);if(d>.95||i.pos.y>2.2){Uu(s,t,.32);return}let u=ks(h.pos.x,h.pos.z,t.pos.x,t.pos.z,i.pos.x,i.pos.z),f=u.t>.05&&u.t<.95&&u.d<.24,g;i.state==="dribble"?g=i.pos.y<.7?1:.55:g=h.action&&h.action.type==="shot"&&h.action.tg==null?.7:.22;let x=(t.attrs.defense-h.attrs.handling)/99,m=Mt(.16+.42*g+.35*x,.04,.82)*Mt(1.25-d*.5,.4,1);if(f&&(m*=.22),t.isHuman?m*=s.assist.steal:h.isHuman&&(m*=s.assist.stealVsHuman),r.next()<m){let v=(c-h.pos.x)*1.4+(t.pos.x-h.pos.x)*.6+r.gauss()*.5,S=(l-h.pos.z)*1.4+(t.pos.z-h.pos.z)*.6+r.gauss()*.5;h.action&&(h.action.type==="shot"||h.action.type==="pass")&&!h.action.released&&(h.action=null),h.dribble=null,i.release(v,.6,S),i.lastTouch={player:t,team:t.team,t:n},i.ignore=h,i.ignoreUntil=n+.3,h.noCatchUntil=n+.35,s.pendingSteal={player:t,victim:h,t:n},s.events.emit("poke",{player:t,victim:h,t:n});return}let p=f?t.isHuman?.4:.5:.07;if(r.next()<p*(t.isHuman?1:s.assist.aiFoul)){s.foul(t,h,"reach");return}Uu(s,t,.42);return}if(i.state==="free"&&i.pass&&i.pass.team!==t.team&&Math.hypot(i.pos.x-c,i.pos.z-l)<1.1&&i.pos.y<2.3){if(r.next()<.75){s.gainBall(t,"interception");return}i.vel.scale(.3),i.vel.y=1,i.pass=null,i.lastTouch={player:t,team:t.team,t:n},s.events.emit("deflect",{player:t,t:n});return}Uu(s,t,.25)}function Uu(s,t,e){t.offBalanceUntil=s.time+e,s.events.emit("stealMiss",{player:t,t:s.time})}function Da(s,t){return t.airborne||t.action||Hi(s,t)||!Sn(t,s.time)?!1:(t.action={type:"jump",t:0},s.events.emit("jump",{player:t,t:s.time}),!0)}function E_(s,t,e,i){e.t+=i,e.t>.1&&!t.airborne&&(t.action=null)}function em(s,t){let e=Math.sin(s.yaw),i=Math.cos(s.yaw);return t.set(s.pos.x+e*.22,s.pos.y+xe.REACH-.06,s.pos.z+i*.22)}function Mc(s,t){return!Hi(s,t)||!Vi(s,t)?!1:(t.action={type:"fake",t:0,tg:null,lockMove:.8,bit:!1},Fu(s,t),!0)}function T_(s,t,e,i){let n=s.ball;if(n.owner!==t){t.action=null;return}if(n.state==="held"){if(e.t+=i,!e.bit&&e.t>.12){e.bit=!0,s.events.emit("fake",{player:t,t:s.time});for(let r of s.players){if(r.team===t.team||r.isHuman||r.airborne||r.pos.distXZ(t.pos)>2.4)continue;let o=Mt(.62-r.attrs.defense/230,.1,.6)*s.aiParams[r.team].bite;s.rng.next()<o&&(Sn(r,s.time,r.jumpHeight()*.9),r.action={type:"jump",t:0},r.beatenUntil=s.time+.75,s.events.emit("bite",{player:r,by:t,t:s.time}))}}e.t>=.42&&(t.action=null)}}function Sc(s,t){let e=s.ball;return e.owner!==t?!1:e.state==="held"&&!t.action&&!t.airborne?(ls(t,t.hand==="L"?"R":"L",{}),e.state="dribble",!0):e.state!=="dribble"||!t.dribble||t.dribble.crossQueued||t.dribble.cross?!1:(t.dribble.crossQueued=!0,!0)}function im(s,t){let i=t.dribble.to==="L"?1:-1,n=Math.cos(t.yaw),r=-Math.sin(t.yaw),a=1.3+t.attrs.handling*.008;t.vel.x+=n*i*a,t.vel.z+=r*i*a,s.events.emit("cross",{player:t,t:s.time});for(let o of s.players){if(o.team===t.team||o.isHuman||o.pos.distXZ(t.pos)>1.9)continue;let l=Mt(.3+(t.attrs.handling-o.attrs.defense)/160,.06,.62)*s.aiParams[o.team].bite;s.rng.next()<l&&(o.beatenUntil=s.time+.55,s.events.emit("ankles",{player:o,by:t,t:s.time}))}}function nm(s,t,e){let i=t.action;if(i)switch(i.type){case"shot":y_(s,t,i,e);break;case"pass":__(s,t,i,e);break;case"steal":S_(s,t,i,e);break;case"jump":E_(s,t,i,e);break;case"fake":T_(s,t,i,e);break;case"celebrate":i.t+=e,i.t>i.dur&&(t.action=null);break;default:i.t=(i.t||0)+e,i.t>2&&(t.action=null)}}var zu=["pts","fgm","fga","tpm","tpa","ftm","fta","oreb","dreb","ast","stl","blk","tov","pf","pass","pcmp"],wc=class{constructor(t){this.m=t,this.p=new Map;for(let e of t.players)this.p.set(e,Object.fromEntries(zu.map(i=>[i,0])));this.poss=[0,0],t.events.on("pass",e=>this.add(e.player,"pass"))}add(t,e,i=1){let n=this.p.get(t);n&&e in n&&(n[e]+=i)}of(t){return this.p.get(t)}update(t){let e=this.m;e.phase==="live"&&(this.poss[e.offense]+=t)}gameScore(t){let e=this.of(t);return e.pts+.4*e.fgm-.6*e.fga-.4*(e.fta-e.ftm)+.7*e.oreb+.35*e.dreb+e.stl+.7*e.ast+.7*e.blk-.4*e.pf-e.tov}grade(t){let e=this.gameScore(t),i=[[14,"A+"],[10,"A"],[7.5,"A-"],[5.5,"B+"],[4,"B"],[2.5,"B-"],[1.2,"C+"],[.2,"C"],[-1,"C-"],[-2.5,"D"],[-1/0,"F"]];for(let[n,r]of i)if(e>=n)return r;return"F"}team(t){let e=Object.fromEntries(zu.map(i=>[i,0]));for(let i of this.m.teams[t].players){let n=this.of(i);for(let r of zu)e[r]+=n[r]}return e}report(t){let e=this.m,i=this.of(t),n=(c,l)=>l?Math.round(c/l*100):null,r=this.poss[0]+this.poss[1]||1,a=null,o=-1e9;for(let c of e.players){let l=this.gameScore(c)+(c.team===e.winner?2:0);l>o&&(o=l,a=c)}return{score:e.scoreline,stats:{...i,fgPct:n(i.fgm,i.fga),tpPct:n(i.tpm,i.tpa),ftPct:n(i.ftm,i.fta),reb:i.oreb+i.dreb},grade:this.grade(t),gameScore:this.gameScore(t),possession:[Math.round(this.poss[0]/r*100),Math.round(this.poss[1]/r*100)],teams:[this.team(0),this.team(1)],mvp:a}}};var A_=Object.entries(Ue),Ec=class{constructor(t){this.m=t,this.marks=new Map,this.reb=null,this.rebAt=-1,this.markTeam=-1}assignMarks(t,e){let i=this.m,n=i.teams[t].players,r=i.teams[1-t].players,a=new Map,o=new Set(n),c=new Set(r),l=i.human;if(i.full)for(let h of r){let d=n.find(u=>u.slot===h.slot&&o.has(u));d&&(a.set(h,d),o.delete(d),c.delete(h))}else l&&l.team!==t&&e&&o.has(e)&&(a.set(l,e),o.delete(e),c.delete(l));for(;c.size&&o.size;){let h=null,d=1e9;for(let u of c)for(let f of o){let g=u.pos.distXZ(f.pos)+Math.abs(u.slot-f.slot)*.01;g<d&&(d=g,h=[u,f])}a.set(h[0],h[1]),c.delete(h[0]),o.delete(h[1])}for(let h of r)a.has(h)||a.set(h,n[0]);this.marks=a,this.markTeam=t;for(let h of r){let d=a.get(h);h.ai.obs=new _e(d.pos.x,0,d.pos.z)}return a}markOf(t){return this.marks.get(t)||null}defenderOf(t){for(let[e,i]of this.marks)if(i===t)return e;return null}pressureLow(t){let e=0;for(let i of this.m.players){if(i.team===t.team)continue;let n=i.pos.distXZ(t.pos);n<2&&(e=Math.max(e,Mt((2-n)/1.1,0,1)))}return e}update(t){let e=this.m;P_(e);let i=e.phase;(i==="live"||i==="inbound")&&e.offense!==this.markTeam&&this.assignMarks(e.offense,e.ball.owner),i==="live"&&e.time-this.rebAt>.12&&this.predictRebound();for(let n of e.players){if(n.isHuman)continue;if(n.handsUp=!1,n.stance=!1,n.faceYaw=null,n.sprint=!1,i==="ft"){this.ftShooter(n),n.desired.set(0,0,0);continue}if(i==="check"||i==="intro"||i==="over"||i==="tip"||i==="break"){n.desired.set(0,0,0),i==="over"&&e.winner!==n.team&&(n.faceYaw=n.yaw),i==="tip"&&e.ball.state==="free"&&this.face(n,e.ball.pos.x,e.ball.pos.z);continue}if(i==="scored"||i==="dead"){this.drift(n,t);continue}if(!e.rules){this.practice(n,t);continue}let r=e.ball;if(i==="inbound"){this.inbound(n,t);continue}r.owner===n?this.handler(n,t):n.team===e.offense?this.offBall(n,t):this.defend(n,t)}}moveTo(t,e,i,n,r=!1){let a=e-t.pos.x,o=i-t.pos.z,c=Math.hypot(a,o);if(c<.12)return t.desired.set(0,0,0),c;let l=Math.min(n,c*3.2);return t.desired.set(a/c*l,0,o/c*l),t.sprint=r,c}face(t,e,i){t.faceYaw=re(e-t.pos.x,i-t.pos.z)}clampTarget(t,e=-1){let i=this.m;if(i.full){if(t.x=Mt(t.x,-Dt.HL+.6,Dt.HL-.6),e===i.offense&&i.frontcourt){let n=i.side(e);n*t.x<.9&&(t.x=n*.9)}}else t.x=Mt(t.x,.9,Dt.HL-.6);return t.z=Mt(t.z,-Dt.HW+.5,Dt.HW-.5),t}inBackcourt(t){return this.m.full&&!this.m.frontcourt&&t===this.m.offense}decide(t,e){let i=this.m;if(i.time<t.ai.think)return!1;let n=i.aiParams[t.team].react;return t.ai.think=i.time+e*(.75+i.rng.next()*.5)+n*.4,!0}handler(t,e){let i=this.m,n=i.ball,r=t.ai;if(t.action&&t.action.type!=="jump")return;if(t.airborne){t.desired.set(0,0,0);return}let a=i.side(t.team),o=a*B.X,c=De(t.pos.x,t.pos.z,a);if((r.caughtAt==null||r.holder!==i.possessions)&&(r.caughtAt=i.time,r.holder=i.possessions,r.mode=null),this.decide(t,.26)&&this.chooseHandlerPlay(t,c),t.action&&t.action.type!=="jump")return;let l=r.target,h=t.jogSpeed(),d=!1;if(r.mode==="drive"){if(l.set(a*(B.X-.9),0,B.Z+Mt(t.pos.z*.25,-.6,.6)),d=!0,h=t.sprintSpeed(),c<2.4&&Vi(i,t)){this.shoot(t);return}}else r.mode==="clear"?(d=this.closestDefender(t).d>2.2,h=d?t.sprintSpeed():t.jogSpeed()):r.mode==="bring"?(d=this.closestDefender(t).d>4&&t.stamina>.3,h=d?t.sprintSpeed():t.jogSpeed()):r.mode==="hold"&&l.set(t.pos.x,0,t.pos.z);if(this.clampTarget(l,t.team),Math.hypot(l.x-t.pos.x,l.z-t.pos.z)>.3&&n.state==="held"&&!t.action){let f=this.closestDefender(t),g="R";f.q&&(g=(f.q.pos.x-t.pos.x)*Math.cos(t.yaw)-(f.q.pos.z-t.pos.z)*Math.sin(t.yaw)>0?"R":"L"),ls(t,g,{}),n.state="dribble"}if(n.state==="held"){t.desired.set(0,0,0),this.face(t,o,B.Z);return}this.moveTo(t,l.x,l.z,h,d),r.mode==="drive"||r.mode==="clear"||r.mode==="bring"?t.faceYaw=null:this.face(t,o,B.Z)}chooseHandlerPlay(t,e){let i=this.m,n=i.ball,r=t.ai,a=i.rng,o=i.aiParams[t.team],c=i.side(t.team),l=c*B.X,h=i.time-r.caughtAt,d=this.inBackcourt(t.team);if(i.mustClear===t.team){r.mode="clear";let b=Math.atan2(t.pos.z-B.Z,t.pos.x-B.X),T=7.5,R=B.X+Math.cos(b)*T,P=B.Z+Math.sin(b)*T;R>11.5&&(R=9,P=Math.sign(t.pos.z||1)*5.6),r.target.set(R,0,P),Dn(R,P)||r.target.set(Ue.top[0],0,Ue.top[1]);return}let u=Bs(i,t),f=rn(i,t),g=Mt(t.speed/6,0,1),x=d&&e>9?0:Lu(t,u,e,f,u==="layup"||u==="dunk"?0:g)*o.shot,m=u==="three"?3:2,p=1.05-(i.shotClock<4?.6:i.shotClock<7?.22:0)-(u==="dunk"||u==="layup"?.2:u==="jumper"?.12:0)+(u==="three"&&i.shotClock>5?.15:0);h<.2&&u!=="layup"&&u!=="dunk"&&(p+=.08),i.full&&u==="three"&&i.shotClock>9&&(p+=.12);let v=x*m,y=this.laneToRim(t)>.42&&e>2.6&&e<(i.full?15:99)?1.25*(.55+.45*(t.attrs.speed+t.attrs.handling)/198)*(.55+.45*o.aggression):0,E=null,M=0;for(let b of i.teams[t.team].players){if(b===t||b.airborne)continue;let T=i.localX(t.team,b.pos.x);if(i.full&&i.frontcourt&&T<.4)continue;let R=De(b.pos.x,b.pos.z,c),P=R<3.3?"layup":Dn(b.pos.x,b.pos.z,c)?"three":"jumper",D=Math.min(1,rn(i,b)*1.15+.08),H=R>10?.01:Lu(b,P,R,D)*(P==="three"?3:2),L=bc(i,t,b.pos.x,b.pos.z),V=Math.hypot(b.pos.x-t.pos.x,b.pos.z-t.pos.z),K=H*(1-L.risk*.9)*.93*(V>14?.7:1);d&&b.attrs.handling>t.attrs.handling+8&&L.risk<.3&&V<13&&this.closestDefender(b).d>2&&(K=Math.max(K,.86+(b.attrs.handling-t.attrs.handling)/120)),b.isHuman&&(K*=b.requestUntil>i.time?1.6:1.15),r.lastPassTo===b&&i.time-r.lastPassAt<2&&(K*=.85),K>M&&(M=K,E=b)}if(E&&M>Math.max(v*1.08,.8)&&h>.12&&Vi(i,t)&&i.shotClock>1.2){Dr(i,t,E),t.ai.lastPassTo=E,t.ai.lastPassAt=i.time;return}if(i.mustClear==null&&(v>=p||i.shotClock<1.6&&!d)&&Vi(i,t)){this.shoot(t);return}if(y>Math.max(v,M)&&a.next()<.85){r.mode="drive";return}if(d){if(r.mode!=="bring"||a.next()<.15){r.mode="bring";let b=a.pick(["top","slotL","slotR","wingL","wingR"]),[T,R]=Vl(b,c);r.target.set(T+a.gauss()*.5,0,R+a.gauss()*.5)}return}let A=this.closestDefender(t);if(n.state==="dribble"&&A.d<1.5&&a.next()<.3*o.aggression)Sc(i,t);else if(A.d<2&&e<7.5&&n.state==="held"&&a.next()<.12){Mc(i,t);return}if(a.next()<.45||r.mode!=="probe"){r.mode="probe";let b=a.pick(["top","wingL","wingR","slotL","slotR","elbowL","elbowR"]),[T,R]=Vl(b,c);r.target.set(T+a.gauss()*.4,0,R+a.gauss()*.4)}}shoot(t){let e=this.m,i=e.aiParams[t.team],n=Bs(e,t),r=rn(e,t),a=On(e,t,n,r,Mt(t.speed/6,0,1)),o=(.038+.06*(1-t.attrs.shooting/99))*i.timing*(1+.6*r),c=Mt(a.c+e.rng.gauss()*o,.15,1);(n==="jumper"||n==="three")&&t.desired.set(0,0,0),cs(e,t,{kind:n,releaseCharge:c}),t.action&&(t.action.ai=!0)}laneToRim(t){let e=this.m,i=e.hoopX(t.team),n=e.side(t.team),r=1;for(let a of e.players){if(a.team===t.team)continue;let o=ks(a.pos.x,a.pos.z,t.pos.x,t.pos.z,i-n*.6,B.Z);if(o.t<.05||o.t>.8)continue;let c=Mt((1.2-o.d)/.9,0,1)*(e.time<a.beatenUntil||e.time<a.offBalanceUntil||a.airborne?.2:1);r=Math.min(r,1-c)}return r}closestDefender(t){let e=null,i=1e9;for(let n of this.m.players){if(n.team===t.team)continue;let r=n.pos.distXZ(t.pos);r<i&&(i=r,e=n)}return{q:e,d:i}}offBall(t,e){let i=this.m,n=i.ball,r=t.ai,a=i.rng;if(t.action&&t.action.type==="shot"||this.rebounding(t))return;let o=i.side(t.team);if(n.pass&&n.pass.target===t&&n.state==="free"){let u=R_(n,t);this.moveTo(t,u.x,u.z,u.far?t.sprintSpeed():t.jogSpeed(),u.far),this.face(t,n.pos.x,n.pos.z);return}let c=n.owner;if(this.decide(t,.6)){let u=this.defenderOf(t),f=u?u.pos.distXZ(t.pos):9,g=u&&(i.time<u.beatenUntil||f>2.6&&De(u.pos.x,u.pos.z,o)>De(t.pos.x,t.pos.z,o)-.5),x=!i.full||De(t.pos.x,t.pos.z,o)<13;r.mode!=="cut"&&g&&x&&a.next()<.55&&c?(r.mode="cut",r.cutUntil=i.time+2.2,r.target.set(o*(B.X-1.1),0,Mt(t.pos.z*.2,-.9,.9))):(r.mode!=="cut"||i.time>r.cutUntil)&&(r.mode="space",this.pickSpot(t)),this.closestDefender(t).d>2.3&&c&&c.team===t.team&&(t.requestUntil=i.time+.8)}let l=this.clampTarget(r.target,t.team),h=Math.hypot(l.x-t.pos.x,l.z-t.pos.z)>6&&t.stamina>.25,d=r.mode==="cut"||i.full&&h;this.moveTo(t,l.x,l.z,d?t.sprintSpeed():t.jogSpeed(),d),n.owner&&!d&&this.face(t,n.pos.x,n.pos.z)}pickSpot(t){let e=this.m,i=e.ball,n=e.side(t.team),r=null,a=-1e9;for(let[o,c]of A_){if((o==="postL"||o==="postR")&&t.archetype!=="big"&&t.archetype!=="forward")continue;let l=c[0]*n,h=c[1]*n,d=Math.hypot(l-i.pos.x,h-i.pos.z),u=-Math.abs(Math.min(d,9)-5.5)*.6-Math.hypot(l-t.pos.x,h-t.pos.z)*.25;for(let g of e.teams[t.team].players){if(g===t)continue;let x=g.ai.mode==="space"||g.ai.mode==="cut"?g.ai.target:g.pos,m=Math.hypot(l-x.x,h-x.z);m<3.2&&(u-=(3.2-m)*2.5)}let f=Dn(l,h,n);t.archetype==="shooter"&&f&&(u+=.8),(t.archetype==="big"||t.archetype==="forward")&&!f&&(u+=t.archetype==="big"?.6:.3),u+=e.rng.next()*.5,u>a&&(a=u,r=[l,h])}t.ai.target.set(r[0]+e.rng.gauss()*.3,0,r[1]+e.rng.gauss()*.3)}defend(t,e){let i=this.m,n=i.ball,r=t.ai,a=i.aiParams[t.team],o=i.rng;if(t.action&&(t.action.type==="steal"||t.action.type==="jump")&&t.airborne&&(t.handsUp=!0),this.rebounding(t))return;let c=i.side(i.offense),l=c*B.X,h=this.markOf(t)||i.teams[i.offense].players[0];r.obs||(r.obs=new _e(h.pos.x,0,h.pos.z));let d=a.react+(i.time<t.beatenUntil?.55:0),u=1-Math.exp(-e/Math.max(.02,d));r.obs.x+=(h.pos.x+h.vel.x*.12-r.obs.x)*u,r.obs.z+=(h.pos.z+h.vel.z*.12-r.obs.z)*u;let f=n.owner===h,g=l-r.obs.x,x=B.Z-r.obs.z,m=Math.hypot(g,x)||1,p,v,S=n.owner&&n.owner.team!==t.team?n.owner:null,y=!1;if(S&&!f&&De(S.pos.x,S.pos.z,c)<4.6){let R=this.defenderOf(S);if((!R||De(R.pos.x,R.pos.z,c)>De(S.pos.x,S.pos.z,c)+.2||i.time<R.beatenUntil)&&this.isNearestHelper(t,S)){y=!0;let D=l-S.pos.x,H=B.Z-S.pos.z,L=Math.hypot(D,H)||1;p=S.pos.x+D/L*1,v=S.pos.z+H/L*1}}if(!y)if(f){let R=Mt(1.3-.3*a.aggression-(De(r.obs.x,r.obs.z,c)<4?.15:0),.9,1.3)+(this.inBackcourt(i.offense)?.9:0);p=r.obs.x+g/m*R,v=r.obs.z+x/m*R}else{let R=n.pos.z*h.pos.z<0?.42:.28,P=Mt(m*R,1.1,3.4);p=r.obs.x+g/m*P,v=r.obs.z+x/m*P,p+=(n.pos.x-p)*.12,v+=(n.pos.z-v)*.12}if(i.full){let R=f?-4.5:-.8;c*p<R&&(p=c*R)}let E=Math.hypot(p-t.pos.x,v-t.pos.z),M=i.full&&c*t.pos.x<c*h.pos.x-1;t.stance=(f||y)&&E<2.2&&!t.airborne;let A=E>2.4||M&&E>1;this.moveTo(t,p,v,A?t.sprintSpeed():t.jogSpeed()*1.1,A),f||y?this.face(t,(S||h).pos.x,(S||h).pos.z):(!A||E<5)&&this.face(t,(n.pos.x+h.pos.x)/2,(n.pos.z+h.pos.z)/2);let b=S||(f?h:null),T=b&&b.action&&b.action.type==="shot"?b.action:null;if(T&&!T.released){let R=t.pos.distXZ(b.pos);if(R<2.6){t.handsUp=!0,this.moveTo(t,b.pos.x+(l-b.pos.x)*.12,b.pos.z+(B.Z-b.pos.z)*.12,t.sprintSpeed(),!0);let P=De(b.pos.x,b.pos.z,c)<3;if(!t.airborne&&!t.action&&!r.blockTried&&T.kind!=="ft"&&(T.jumped||P)&&R<(P?1.9:1.25)){r.blockTried=!0;let D=(P?.6:.3)*a.contest*(.45+.55*(t.attrs.vertical+t.attrs.defense)/198);o.next()<D&&C_(()=>Da(i,t),i,t,P?.02:.07)}}}else r.blockTried=!1;if(f&&!t.action&&n.state==="dribble"&&i.time>=t.stealReadyAt&&!this.inBackcourt(i.offense)&&this.decide(t,.32)&&t.pos.distXZ(h.pos)<1.35&&n.pos.y<.75){let P=ks(h.pos.x,h.pos.z,t.pos.x,t.pos.z,n.pos.x,n.pos.z),D=P.t>.05&&P.t<.95&&P.d<.25,H=Mt(1.25-(h.attrs.handling-t.attrs.defense)/80,.45,1.4),L=(D?.04:i.full?.13:.2)*a.aggression*(.5+t.attrs.defense/99)*(i.full?H:1);o.next()<L&&_c(i,t)}if(n.pass&&n.pass.team!==t.team&&n.state==="free"&&!t.action){let R=ks(t.pos.x,t.pos.z,n.pos.x,n.pos.z,n.pos.x+n.vel.x*.6,n.pos.z+n.vel.z*.6);R.d<1.6&&this.moveTo(t,n.pos.x+n.vel.x*R.t*.6,n.pos.z+n.vel.z*R.t*.6,t.sprintSpeed(),!0)}}isNearestHelper(t,e){let i=this.m,n=this.defenderOf(e),r=null,a=1e9;for(let o of i.teams[t.team].players){if(o===n||o.isHuman)continue;let c=o.pos.distXZ(e.pos);c<a&&(a=c,r=o)}return r===t&&a<4.5}inbound(t,e){let i=this.m,n=i.inb,r=i.ball;if(!n){t.desired.set(0,0,0);return}let a=i.side(n.team);if(t===n.inbounder){if(t.desired.set(0,0,0),this.face(t,0,0),r.owner!==t||t.action||i.phaseT<(n.kind==="baseline"?1:.7)||!this.decide(t,.22))return;let o=null,c=-1e9;for(let l of i.teams[t.team].players){if(l===t)continue;let h=l.pos.distXZ(t.pos);if(h<1.8||h>13)continue;let d=this.closestDefender(l).d,u=bc(i,t,l.pos.x,l.pos.z),f=Math.min(d,4)-u.risk*4-h*.08+l.attrs.handling/60;l.isHuman&&(f+=l.requestUntil>i.time?3:.6),f>c&&(c=f,o=l)}o&&(c>2.2||i.phaseT>3.2)&&Dr(i,t,o);return}if(t.team===n.team){let o=this.inboundReceiver(n);if(t===o){let h=n.x,d=n.z,u,f;n.kind==="baseline"?(u=h-Math.sign(h)*3.6,f=Mt(d*.5+(d>=0?1.4:-1.4),-5,5)):(u=h-a*1.6,f=d-Math.sign(d)*3.4),this.moveTo(t,u,f,t.jogSpeed()),this.face(t,h,d),t.requestUntil=i.time+.5;return}(this.decide(t,.8)||t.ai.mode!=="space")&&(t.ai.mode="space",this.pickSpot(t));let c=this.clampTarget(t.ai.target),l=Math.hypot(c.x-t.pos.x,c.z-t.pos.z)>6;this.moveTo(t,c.x,c.z,l?t.sprintSpeed():t.jogSpeed(),l);return}this.defend(t,e)}inboundReceiver(t){let e=this.m,i=e.teams[t.team].players,n=i.find(o=>o.isHuman&&o!==t.inbounder);if(n&&n.requestUntil>e.time)return n;if(t.recv&&t.recv!==t.inbounder&&!(t.recv.isHuman&&t.recv.requestUntil<e.time-3))return t.recv;let r=null,a=-1e9;for(let o of i){if(o===t.inbounder||o.isHuman)continue;let c=o.attrs.handling-o.pos.distXZ(t.inbounder.pos)*2;c>a&&(a=c,r=o)}return t.recv=r||n,t.recv}predictRebound(){let t=this.m,e=t.ball;if(this.rebAt=t.time,this.reb=null,e.state!=="free"||e.pass)return;let i=null;qp(e,2.2,1/30,(n,r,a)=>a.y<0&&r.y<2.7||r.y<Et+.05?(i={x:r.x,y:r.y,z:r.z,t:n},!1):!0),i||(i={x:e.pos.x,y:e.pos.y,z:e.pos.z,t:.5}),this.reb=i}rebounding(t){let e=this.m,i=e.ball;if(i.state!=="free"||i.pass||!this.reb)return!1;let n=i.shot,r=this.reb,a=t.team,o=e.teams[a].players.filter(m=>!m.isHuman||!0);o.sort((m,p)=>Math.hypot(m.pos.x-r.x,m.pos.z-r.z)-Math.hypot(p.pos.x-r.x,p.pos.z-r.z));let c=o.indexOf(t),l=n&&!n.done&&!n.rim&&!n.board,h=e.full?n&&n.side!=null?n.side:e.side(e.offense):1;if(e.full&&!n&&c>0&&Math.hypot(r.x-t.pos.x,r.z-t.pos.z)>6)return!1;if(l&&a!==n.team){let m=this.markOf(t);if(m){let p=h*B.X-m.pos.x,v=B.Z-m.pos.z,S=Math.hypot(p,v)||1,y=m.pos.x+p/S*.7,E=m.pos.z+v/S*.7;return this.moveTo(t,y,E,t.jogSpeed()),this.face(t,i.pos.x,i.pos.z),t.handsUp=t.pos.distXZ(n.shooter.pos)<2,!0}}if(c>1&&!(l&&a===n.team&&c===2)){if(a===e.offense){let[m,p]=Vl("top",h),v=e.full&&(t.archetype==="guard"||t.archetype==="shooter")?h*3.5:m+h*1;return this.moveTo(t,v,p,t.jogSpeed()),this.face(t,i.pos.x,i.pos.z),!0}return!1}let d=Math.max(0,r.t-.15),u=r.x,f=r.z,g=this.moveTo(t,u,f,t.sprintSpeed(),!0);this.face(t,i.pos.x,i.pos.z);let x=Math.hypot(i.pos.x-t.pos.x,i.pos.z-t.pos.z);return!t.airborne&&!t.action&&i.vel.y<1&&i.pos.y>xe.REACH-.1&&i.pos.y<xe.REACH+t.jumpHeight()+.2&&x<1&&(!n||n.rim||n.board||n.done)&&(Sn(t,e.time,t.jumpHeight()*.9),t.action={type:"jump",t:0}),t.airborne&&(t.handsUp=!0),!0}drift(t,e){let i=this.m;if(i.time<t.celebrateUntil){t.desired.set(0,0,0);return}if(i.full){this.transition(t);return}let n=Mt(t.pos.x-.6,3,12),r=t.pos.z*.9;this.moveTo(t,n,r,1.4)}transition(t){let e=this.m,i=e.next;if(!i||i.type!=="inbound"){t.desired.set(0,0,0);return}if(i.inbounder===t){this.moveTo(t,i.x,i.z,t.sprintSpeed(),!0);return}let n=e.side(i.team);if(t.team===i.team){let r=Mt(t.pos.x+n*2.5,-Dt.HL+2,Dt.HL-2);this.moveTo(t,r,t.pos.z*.9,t.jogSpeed()*.7)}else{let r=n*Mt(n*t.pos.x+3,2,9),a=t.pos.z*.8;this.moveTo(t,r,a,t.jogSpeed())}}ftShooter(t){let e=this.m,i=e.ft;if(!(!i||i.shooter!==t||i.released||t.action)&&e.phaseT>1.1&&e.ball.owner===t&&e.ball.state==="held"){let n=e.aiParams[t.team],r=On(e,t,"ft",0,0),a=(.04+.06*(1-t.attrs.shooting/99))*n.timing;cs(e,t,{kind:"ft",releaseCharge:Mt(r.c+e.rng.gauss()*a,.2,1)}),t.action&&(t.action.ai=!0)}}practice(t,e){let i=this.m,n=i.ball;if(t.drill){t.drill(t,e);return}if(n.owner===t){n.state==="held"&&!t.action&&i.human&&i.time-(t.gainT??0)>.55&&Vi(i,t)&&Hi(i,t)&&Dr(i,t,i.human),t.desired.set(0,0,0),i.human&&this.face(t,i.human.pos.x,i.human.pos.z);return}if(n.owner==null&&n.state==="free"&&!n.pass){let a=this.reb||{x:n.pos.x,z:n.pos.z};this.moveTo(t,a.x,a.z,t.sprintSpeed(),!0);return}let r=t.ai.home||(t.ai.home=new _e(B.X-1.6,0,0));this.moveTo(t,r.x,r.z,t.jogSpeed()),i.human&&this.face(t,i.human.pos.x,i.human.pos.z)}};function R_(s,t){let e=s.vel.y,i=s.pos.y,n=t.pos.y+1.4,r=.12,a=e*e+2*9.81*(i-n);a>0&&(r=Math.max(.05,(e+Math.sqrt(a))/9.81)),s.pass&&s.pass.kind==="bounce"&&(r=Math.min(r,.25));let o=s.pos.x+s.vel.x*r,c=s.pos.z+s.vel.z*r;return{x:o,z:c,t:r,far:Math.hypot(o-t.pos.x,c-t.pos.z)>1.5}}function C_(s,t,e,i){e.ai.pending={fn:s,at:t.time+i}}function P_(s){for(let t of s.players){let e=t.ai.pending;e&&s.time>=e.at&&(t.ai.pending=null,e.fn())}}var Vs={rookie:{label:"Rookie",window:1.4,steal:1.3,stealVsHuman:.45,passErr:.6,aiFoul:.75,catchR:1.1,ai:{react:.34,shot:.8,aggression:.55,bite:1.3,timing:1.6,intercept:.55,contest:.7}},pro:{label:"Pro",window:1,steal:1,stealVsHuman:.7,passErr:1,aiFoul:1,catchR:1,ai:{react:.22,shot:1,aggression:.85,bite:1,timing:1,intercept:.85,contest:1}},allstar:{label:"All-Star",window:.8,steal:.85,stealVsHuman:.95,passErr:1.1,aiFoul:1,catchR:.95,ai:{react:.14,shot:1.12,aggression:1,bite:.7,timing:.7,intercept:1.05,contest:1.1}}},I_={react:.2,shot:1,aggression:.85,bite:.9,timing:.9,intercept:.9,contest:1},sm=new _e,Tc=new _e,Ac=[0,0,0],Rc=class{constructor(t){this.cfg=t,this.rules=t.rules!==!1,this.rng=new an(t.seed||1),this.events=new xc,this.difficulty=Vs[t.difficulty]||Vs.pro,this.assist=this.difficulty,this.ball=new Ia,this.players=[],this.teams=t.teams.map((i,n)=>({...i,index:n,score:0,fouls:0,players:[]}));let e=null;this.teams.forEach((i,n)=>{i.roster.forEach((r,a)=>{let o=new Yl({...r,team:n,slot:a});this.players.push(o),i.players.push(o),o.isHuman&&(e=o)})}),this.human=e,this.humanTeam=e?e.team:-1,this.aiParams=this.teams.map((i,n)=>n===this.humanTeam?I_:this.difficulty.ai),this.time=0,this.phase="intro",this.phaseT=0,this.full=t.court==="full",this.dirs=this.full?[1,-1]:[1,1],this.period=1,this.quarterLen=t.quarter||180,this.otLen=t.ot||Math.max(60,this.quarterLen/2),this.clockLen=this.full?this.quarterLen:t.clock||300,this.clock=this.clockLen,this.target=this.full?1/0:t.target||21,this.shotLen=this.full?Bi.SHOT_CLOCK:vi.SHOT_CLOCK,this.shotClock=this.shotLen,this.shotClockOn=this.rules&&t.shotClock!==!1,this.frontcourt=!1,this.backcourtT=0,this.inb=null,this.inbPending=!1,this.tip=null,this.arrow=null,this.offense=0,this.mustClear=null,this.overtime=!1,this.possessions=0,this.checker=null,this.next=null,this.ft=null,this.pendingSteal=null,this.lastPass=null,this.skipRequested=!1,this.winner=null,this.stats=new wc(this),this.ai=new Ec(this),this.humanCtl=null,this.ball.cb={score:(i,n)=>this.onBasket(n),hit:(i,n,r)=>this.onBallHit(n,r),body:(i,n,r)=>this.events.emit("deflect",{player:n,speed:r,t:this.time})}}side(t){return this.dirs[t]??1}hoopX(t){return this.side(t)*B.X}teamAttacking(t){return this.dirs[0]===t?0:this.dirs[1]===t?1:this.offense}localX(t,e){return this.side(t)*e}get periodLabel(){if(!this.full)return this.overtime?"OT":"";let t=Bi.QUARTERS;return this.period<=t?`Q${this.period}`:this.period===t+1?"OT":`OT${this.period-t}`}get inOvertime(){return this.full?this.period>Bi.QUARTERS:this.overtime}isOpp(t){return this.human&&t.team!==this.human.team}teamOf(t){return this.teams[t]}get scoreline(){return[this.teams[0].score,this.teams[1].score]}get displayClock(){if(this.overtime&&!this.full)return"OT";let t=Math.max(0,this.clock);if(t<10)return t.toFixed(1);let e=Math.ceil(t);return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}get displayShot(){return String(Math.max(0,Math.ceil(this.shotClock)))}requestSkip(){this.skipRequested=!0}setPhase(t){this.phase=t,this.phaseT=0,this.skipRequested=!1}place(t,e,i,n){Eu(t),t.pos.set(e,0,i),t.prevPos.copy(t.pos),t.yaw=t.prevYaw=n??re(this.hoopX(t.team)-e,B.Z-i),t.gait=t.prevGait=0}start(t){let e=t??(this.rng.next()<.5?0:1);if(this.events.emit("tipoff",{team:e,t:this.time}),!this.rules){this.setPhase("live");return}if(this.full){this.startTip();return}this.startCheck(e,!0)}jumperOf(t){let e=null,i=-1;for(let n of this.teams[t].players){let r=n.attrs.vertical+(n.archetype==="big"?30:n.archetype==="forward"?12:0)-(n.isHuman&&n.archetype!=="big"?100:0);r>i&&(i=r,e=n)}return e}startTip(){this.setPhase("tip");let t=this.jumperOf(0),e=this.jumperOf(1);this.tip={jumpers:[t,e],t:0,tossed:!1,won:null},this.offense=0;for(let n of[0,1]){let r=this.side(n),a=n===0?t:e;this.place(a,-r*.42,0,re(r,0));let o=[[2.2,2.2],[-2.4,-3.6],[2.6,-2.6],[-7,.8]],c=0;for(let l of this.teams[n].players){if(l===a)continue;let[h,d]=o[c++%o.length];this.place(l,r*h,r*d,re(-r*h,-r*d))}}let i=this.ball;i.owner=null,i.shot=null,i.pass=null,i.ignore=null,i.state="dead",i.place(0,1.9,0),this.events.emit("snap",{t:this.time}),this.events.emit("tip",{jumpers:[t,e],t:this.time})}updateTip(t){let e=this.tip,i=this.ball;if(e){if(e.t+=t,!e.tossed){if(e.t>(this.human?1.6:.8)){e.tossed=!0,e.tossT=this.time,i.state="free",i.release(0,6.4,0),i.lastTouch=null,this.events.emit("toss",{t:this.time});for(let n of e.jumpers){if(n.isHuman)continue;let r=2.36+n.jumpHeight(),a=6.4/9.81+Math.sqrt(Math.max(0,2*(2.09+1.9-r))/9.81),o=Math.sqrt(2*n.jumpHeight()/9.81);n.ai.tipJumpAt=this.time+a-o+this.rng.gauss()*.07*this.aiParams[n.team].timing}}return}for(let n of e.jumpers)!n.isHuman&&n.ai.tipJumpAt!=null&&this.time>=n.ai.tipJumpAt&&!n.airborne&&(n.ai.tipJumpAt=null,Sn(n,this.time),n.action={type:"jump",t:0},this.events.emit("jump",{player:n,t:this.time}));if(i.vel.y<.5){let n=null,r=-1;for(let a of e.jumpers){let o=a.pos.y+2.36+.1,c=Math.hypot(i.pos.x-a.pos.x,i.pos.z-a.pos.z);if(i.pos.y<=o+.06&&i.pos.y>o-.45&&c<.75){let l=o+this.rng.next()*.04;l>r&&(r=l,n=a)}}if(n){this.tapTo(n);return}}i.pos.y<1.6&&i.vel.y<0&&(this.tip=null,this.goLiveLoose(null))}}tapTo(t){let e=this.ball,i=this.side(t.team),n=null,r=1e9;for(let u of this.teams[t.team].players){if(u===t)continue;let f=u.pos.distXZ(t.pos)+(this.localX(t.team,u.pos.x)>.5?1.5:0)+this.rng.next()*1.2;f<r&&(r=f,n=u)}let a=n?n.pos.x:-i*3,o=n?n.pos.z:0,c=a-e.pos.x,l=o-e.pos.z,h=Math.hypot(c,l)||1,d=Math.min(6.5,h/.55);e.state="free",e.vel.set(c/h*d,.8,l/h*d),e.lastTouch={player:t,team:t.team,t:this.time},this.tip=null,this.events.emit("tapped",{player:t,to:n,t:this.time}),this.goLiveLoose(t.team)}goLiveLoose(t){this.offense=t??this.offense,this.shotClock=this.shotLen,this.frontcourt=!1,this.backcourtT=0,this.tipLoose=!0,this.setPhase("live"),this.events.emit("live",{team:this.offense,t:this.time})}sidelineSpot(t,e){return{x:Mt(t,-Dt.HL+1.2,Dt.HL-1.2),z:(e>=0?1:-1)*(Dt.HW+.4),kind:"sideline"}}baselineSpot(t,e=1.5){let i=Math.abs(e)<1.4?e>=0?1.5:-1.5:Mt(e,-Dt.HW+.8,Dt.HW-.8);return{x:t*(Dt.HL+.45),z:i,kind:"baseline"}}outSpot(t,e){return Math.abs(t)>=Dt.HL-.05&&Math.abs(e)<Dt.HW-.4?this.baselineSpot(t>=0?1:-1,e):this.sidelineSpot(t,e)}inboundNext(t,e,i={}){return{type:"inbound",team:t,x:e.x,z:e.z,kind:e.kind,...i}}pickInbounder(t,e,i){let n=null,r=1e9,a=this.teams[t].players;for(let o of a){if(o.isHuman&&a.length>1)continue;let c=Math.hypot(o.pos.x-e,o.pos.z-i);c<r&&(r=c,n=o)}return n}startInbound(t,e,i,n="sideline",r={}){let a=t!==this.offense||r.newPoss;this.setPhase("inbound"),a?(this.possessions++,this.shotClock=this.shotLen,this.frontcourt=!1,this.backcourtT=0,this.lastPass=null):this.localX(t,e)>0&&(this.shotClock=Math.max(this.shotClock,Bi.OREB_CLOCK)),this.offense=t,this.mustClear=null;let o=r.inbounder&&r.inbounder.team===t&&!r.inbounder.isHuman?r.inbounder:this.pickInbounder(t,e,i);Eu(o),o.pos.set(e,0,i),o.yaw=re(-e*(n==="baseline"?1:.15),-i*(n==="baseline"?.2:1)),o.prevYaw=o.yaw,this.inb={team:t,x:e,z:i,kind:n,inbounder:o,t:0,released:!1};let c=this.ball;c.shot=null,c.pass=null,c.ignore=null,c.owner=o,c.pos.set(o.pos.x+Math.sin(o.yaw)*.36,xe.HOLD_Y,o.pos.z+Math.cos(o.yaw)*.36),c.prevPos.copy(c.pos),c.vel.set(0,0,0),c.w.set(0,0,0),wn(this,o),c.state="held",r.snap&&this.events.emit("snap",{t:this.time}),this.events.emit("inbound",{team:t,player:o,kind:n,newPoss:a,t:this.time})}updateInbound(t){let e=this.inb,i=this.ball;if(!e)return;e.t+=t;let n=e.inbounder;if(i.state==="free"&&i.pass&&i.pass.passer===n){e.released=!0,this.inb=null,this.inbPending=!0,this.setPhase("live"),this.events.emit("live",{team:this.offense,t:this.time});return}if(i.owner!==n){this.inb=null,this.setPhase("live");return}e.t>Bi.INBOUND&&!(n.action&&n.action.type==="pass")&&(this.events.emit("fiveSeconds",{team:e.team,t:this.time}),this.turnover(e.team,"fiveSec",n,{x:e.x,z:e.z,kind:e.kind}))}endOfPeriod(){if(this.phase==="over"||this.phase==="break")return;this.events.emit("buzzer",{t:this.time});let[t,e]=this.scoreline;if(this.period>=Bi.QUARTERS&&t!==e){this.finish();return}let i=this.ball;if(i.owner){let n=i.owner;n.action&&n.action.type!=="jump"&&(n.action=null),n.dribble=null}i.state!=="free"&&(i.state="free",i.owner=null,i.vel.scale(.3)),i.shot=null,i.pass=null,this.inb=null,this.inbPending=!1,this.ft=null;for(let n of this.players)n.action&&n.action.type!=="jump"&&(n.action=null),n.stance=!1,n.handsUp=!1;this.events.emit("periodEnd",{period:this.period,half:this.period===2,ot:this.period>=Bi.QUARTERS,t:this.time}),this.setPhase("break"),this.next={type:"period"}}startPeriod(){this.period++;let t=this.period>Bi.QUARTERS;if(this.clockLen=t?this.otLen:this.quarterLen,this.clock=this.clockLen,!t)for(let n of this.teams)n.fouls=0;this.period===3&&(this.dirs=[-this.dirs[0],-this.dirs[1]]);let e=this.arrow??0;this.arrow=1-e,this.events.emit("periodStart",{period:this.period,ot:t,team:e,label:this.periodLabel,t:this.time}),this.placeFormation(e);let i={x:0,z:Dt.HW+.4,kind:"centre"};this.startInbound(e,i.x,i.z,"centre",{newPoss:!0,inbounder:this.formationInbounder,snap:!0})}placeFormation(t){let e=this.side(t),i=this.teams[t].players,n=this.teams[1-t].players,r=this.pickInbounder(t,0,Dt.HW);this.formationInbounder=r;let a=[[-2.2,4.4],[3,3.6],[6.6,-1.2],[3.4,-4.2],[8.5,3.6]],o=0,c=[...i.filter(h=>h.isHuman),...i.filter(h=>!h.isHuman&&h!==r)];for(let h of c){let[d,u]=a[o++%a.length];this.place(h,e*d,u,re(0-e*d,Dt.HW-u))}this.place(r,0,Dt.HW+.4);let l=this.ai.assignMarks(t,r);for(let h of n){let d=l.get(h)||i[0],u=e*B.X-d.pos.x,f=-d.pos.z,g=Math.hypot(u,f)||1,x=d===r?2.6:1.6;this.place(h,d.pos.x+u/g*x,Mt(d.pos.z+f/g*x,-Dt.HW+.5,Dt.HW-.5),re(-u,-f))}}startCheck(t,e=!1){this.setPhase("check"),this.offense=t,this.mustClear=null,this.shotClock=vi.SHOT_CLOCK,this.possessions++;let i=this.teams[t].players,n=this.teams[1-t].players,r=this.human,a=r&&r.team===t?r:i[(this.possessions>>1)%i.length];this.checker=a;let o=i.filter(f=>f!==a),[c,l]=Ue.top;this.place(a,c,l);let h=[Ue.wingL,Ue.wingR];o.forEach((f,g)=>this.place(f,h[g%2][0]+(this.rng.next()-.5)*.6,h[g%2][1]));let d=this.ai.assignMarks(t,a);for(let f of n){let g=d.get(f)||a,x=g===a?1.8:2.6,m=B.X-g.pos.x,p=B.Z-g.pos.z,v=Math.hypot(m,p)||1;this.place(f,g.pos.x+m/v*x,g.pos.z+p/v*x,re(-m,-p))}let u=this.ball;u.shot=null,u.pass=null,u.ignore=null,u.owner=a,u.pos.set(a.pos.x+Math.sin(a.yaw)*.36,xe.HOLD_Y,a.pos.z+Math.cos(a.yaw)*.36),u.prevPos.copy(u.pos),u.vel.set(0,0,0),u.w.set(0,0,0),wn(this,a),u.state="held",this.events.emit("snap",{t:this.time}),this.events.emit("check",{team:t,player:a,first:e,t:this.time})}goLive(){this.setPhase("live"),this.events.emit("live",{team:this.offense,t:this.time})}whistle(t,e,i={}){if(this.phase==="over")return;this.setPhase("dead"),this.next=e;let n=this.ball;if(n.owner){let r=n.owner;r.action&&r.action.type!=="jump"&&(r.action=null),r.dribble=null}n.state!=="free"&&(n.state="free",n.owner=null,n.vel.scale(.3)),n.shot=null,n.pass=null,this.events.emit("whistle",{reason:t,t:this.time,...i})}turnover(t,e,i=null,n=null){if(i&&this.stats.add(i,"tov"),this.events.emit("turnover",{team:t,reason:e,player:i,t:this.time}),this.full){let r=this.ball,a=n||this.sidelineSpot(r.pos.x,r.pos.z);this.whistle(e,this.inboundNext(1-t,a),{team:t});return}this.whistle(e,{type:"check",team:1-t},{team:t})}foul(t,e,i){if(this.phase!=="live"||!this.rules)return;let n=this.teams[t.team];if(n.fouls++,this.stats.add(t,"pf"),this.events.emit("foul",{player:t,victim:e,kind:i,t:this.time,teamFouls:n.fouls}),i==="shooting")return;let r=n.fouls>=(this.full?Bi.BONUS_FOULS:vi.BONUS_FOULS),a=this.full?this.inboundNext(e.team,this.sidelineSpot(e.pos.x,e.pos.z)):{type:"check",team:e.team};this.whistle("foul",r?{type:"ft",shooter:e,n:2}:a,{foul:!0,bonus:r})}step(t){this.time+=t,this.phaseT+=t;let e=this.ball;e.beginStep();let i=this.time,n=this.phase==="live",r=this.phase==="check"||this.phase==="ft"||this.phase==="intro"||this.phase==="over"||this.phase==="tip"||this.phase==="break",a=this.phase==="inbound"&&this.inb?this.inb.inbounder:null;this.humanCtl&&this.humanCtl.update(t),this.ai.update(t);for(let o of this.players)nm(this,o,t);for(let o of this.players)(r||o===a)&&(o.desired.set(0,0,0),o.sprint=!1,o.airborne||o.vel.set(0,0,0)),Ap(o,t,i,e.owner===o);Rp(this.players,i,e.owner),a&&this.inb&&(a.pos.x=this.inb.x,a.pos.z=this.inb.z);for(let o of this.players)Cp(o,this.full);e.owner&&(e.state==="held"||e.state==="dribble")?this.updateCarried(e.owner,t):e.state==="free"&&e.step(t,i,this.players),e.net.amp>0&&(e.net.amp=Math.max(0,e.net.amp-t*.5)),n&&(this.updatePossession(),this.checkBlocks(),this.checkShootingFouls(),this.rulesLive(t)),this.updatePhase(t),this.stats.update(t)}updateCarried(t,e){let i=this.ball;if(i.state==="dribble"){let n=t.dribble;if(!n||t.airborne){wn(this,t),Na(this,t,e);return}let r=n.t;if(n.t+=e,r<n.td&&n.t>=n.td&&this.events.emit("bounce",{player:t,x:i.pos.x,z:i.pos.z,dribble:!0,t:this.time}),t.gatherPending){ku(t,Ac);let a=n.t>=n.td;if(Ac[2]>.58&&(a||n.t<n.td*.35)){wn(this,t),Na(this,t,e);return}}if(n.t>=n.T){if(t.gatherPending){wn(this,t),Na(this,t,e);return}Du(t,this.ai.pressureLow(t)),n.cross&&im(this,t)}ku(t,Ac),vc(t,Ac,Tc),i.setKinematic(Tc.x,Tc.y+t.pos.y,Tc.z,e);return}Na(this,t,e)}gainBall(t,e){let i=this.ball,n=this.time,r=this.offense,a=i.shot,o=i.pass,c=i.lastTouch;t.action&&t.action.type!=="jump"&&t.action.type!=="celebrate"&&(t.action=null),wn(this,t),i.owner=t,i.state="held",i.shot=null,i.pass=null,i.lastTouch={player:t,team:t.team,t:n},t.gainT=n,this.inbPending=!1,this.tipLoose=!1,this.full&&this.arrow==null&&(this.arrow=1-t.team),a&&!a.done&&this.resolveMiss(a),a&&(this.stats.add(t,t.team===a.team?"oreb":"dreb"),this.events.emit("rebound",{player:t,offensive:t.team===a.team,t:n})),o&&(o.team===t.team&&o.passer!==t?(this.stats.add(o.passer,"pcmp"),this.lastPass={passer:o.passer,receiver:t,t:n}):o.team!==t.team&&(this.stats.add(t,"stl"),this.stats.add(o.passer,"tov"),this.events.emit("interception",{player:t,victim:o.passer,t:n}))),this.pendingSteal&&n-this.pendingSteal.t<2&&t.team===this.pendingSteal.player.team&&(this.stats.add(this.pendingSteal.player,"stl"),this.stats.add(this.pendingSteal.victim,"tov"),this.events.emit("steal",{player:this.pendingSteal.player,victim:this.pendingSteal.victim,t:n})),this.pendingSteal=null,t.team!==r?(this.offense=t.team,this.shotClock=this.shotLen,this.lastPass=null,this.rules&&this.phase==="live"&&!this.full&&(this.mustClear=Dn(t.pos.x,t.pos.z)?null:t.team),this.frontcourt=!1,this.backcourtT=0,this.possessions++,this.events.emit("possession",{team:t.team,player:t,how:e,t:n})):(a&&(a.rim||a.board)&&(this.shotClock=this.full?Math.max(this.shotClock,Bi.OREB_CLOCK):vi.SHOT_CLOCK),(a||c&&c.team!==t.team)&&(this.frontcourt=!1,this.backcourtT=0)),this.full&&this.localX(t.team,t.pos.x)>.12&&(this.frontcourt=!0),this.events.emit("gain",{player:t,how:e,t:n})}updatePossession(){let t=this.ball,e=this.time;if(t.state!=="free")return;let i=t.shot,n=t.pass;if(i&&!i.rim&&!i.board&&!i.blocked&&!i.done&&t.pos.y>2)return;let a=null,o=1e9;for(let c of this.players){if(e<c.noCatchUntil||c.action&&c.action.type==="shot"&&!c.action.released)continue;let l=t.pos.x-c.pos.x,h=t.pos.z-c.pos.z,d=Math.hypot(l,h),u=c.pos.y+xe.REACH+.12;if(t.pos.y>u||t.pos.y<c.pos.y-.2)continue;let f=c.isHuman?vi.HUMAN_PICKUP_R*this.assist.catchR:vi.PICKUP_R;if(n&&n.target===c&&(f=Math.max(f,.9)),t.pos.y>c.pos.y+2&&(f*=.75),!(d>f||Math.hypot(t.vel.x-c.vel.x,t.vel.y,t.vel.z-c.vel.z)>14)){if(n&&n.team!==c.team&&!c.isHuman){if(n.tried.has(c))continue;n.tried.add(c);let x=Mt(.3+c.attrs.defense/260,.2,.75)*this.aiParams[c.team].intercept*(e<c.beatenUntil?.3:1)*Mt(1.25-d/f,.35,1);if(this.rng.next()>x){d<.45&&(t.vel.x*=.55,t.vel.z*=.55,t.vel.y=Math.abs(t.vel.y)*.3+.5,t.pass=null,t.lastTouch={player:c,team:c.team,t:e},this.events.emit("deflect",{player:c,t:e}));continue}}(d<o-1e-6||Math.abs(d-o)<=1e-6&&a&&c.id<a.id)&&(a=c,o=d)}}a&&this.gainBall(a,n?n.team===a.team?"catch":"interception":i?"rebound":"loose")}checkBlocks(){let t=this.ball,e=this.time;for(let i of this.players){if(i.team===this.offense||!i.airborne&&!i.handsUp||(em(i,sm),sm.dist(t.pos)>.32))continue;let r=t.shot&&!t.owner?t.shot:t.owner&&t.owner.action;if(!r||r.tried&&r.tried.has(i))continue;(r.tried||(r.tried=new Set)).add(i);let a=(i.attrs.vertical+i.attrs.defense)/198,o=t.pos.x>=0?1:-1,c=De(t.pos.x,t.pos.z,o)<2.6,l=i.isHuman?.3+.25*a:(.08+.24*a)*(c?1.3:.75)*this.aiParams[i.team].contest;if(i.airborne&&i.vy<-1.5&&(l*=.35),this.rng.next()>l)continue;let h=t.owner;if(h&&h.team!==i.team&&h.action&&h.action.type==="shot"&&!h.action.released&&t.pos.y>1.95){if(h.action.blockedBy)continue;let u=t.pos.x-i.pos.x,f=t.pos.z-i.pos.z,g=Math.hypot(u,f)||1;h.action=null,h.dribble=null,t.release(u/g*3+this.rng.gauss()*.8,-1.5,f/g*3+this.rng.gauss()*.8),t.lastTouch={player:i,team:i.team,t:e},t.ignore=h,t.ignoreUntil=e+.4,h.noCatchUntil=e+.4,t.shot={shooter:h,team:h.team,kind:"blocked",value:0,t:e,rim:!1,board:!1,blocked:!0,done:!0},this.stats.add(i,"blk"),this.stats.add(h,"fga"),this.events.emit("block",{player:i,victim:h,t:e});return}let d=t.shot;if(d&&!d.blocked&&!d.rim&&!d.board&&t.state==="free"&&e-d.t<1.2&&d.team!==i.team){if(t.vel.y<0&&t.pos.y>B.Y&&De(t.pos.x,t.pos.z,o)<1.6){this.events.emit("goaltend",{player:i,t:e}),d.goaltend=!0,this.awardBasket(d,!0);return}d.blocked=!0,d.done=!0;let u=Math.sin(i.yaw),f=Math.cos(i.yaw);t.vel.set(u*3.2-t.vel.x*.15+this.rng.gauss()*.7,-1.2-Math.random()*.5,f*3.2-t.vel.z*.15+this.rng.gauss()*.7),t.lastTouch={player:i,team:i.team,t:e},this.stats.add(i,"blk"),this.events.emit("block",{player:i,victim:d.shooter,t:e});return}}}checkShootingFouls(){for(let t of this.players){let e=t.action;if(!(!e||e.type!=="shot"||e.fouledBy||e.kind==="ft")&&!(e.released&&this.time-(e.t0+e.rt)>.15))for(let i of this.players){if(i.team===t.team)continue;let n=i.pos.distXZ(t.pos);if(n>.8)continue;let r=i.vel.x-t.vel.x,a=i.vel.z-t.vel.z,o=-(r*(i.pos.x-t.pos.x)+a*(i.pos.z-t.pos.z))/(n||1);if(!(i.airborne||o>1.2||i.handsUp&&n<.7))continue;e.fouledBy=i;let c=e.kind==="layup"||e.kind==="dunk",l=(i.isHuman?.42:.24*this.assist.aiFoul)*(i.airborne?1.25:1)*(c?1.3:.6)*(n<.6?1.2:1);this.rng.next()<l&&(e.foul=i,e.released&&this.ball.shot&&this.ball.shot.shooter===t&&(this.ball.shot.foul=i),this.foul(i,t,"shooting"))}}}onBallHit(t,e){let i=this.ball,n=i.shot,r=this.time;n&&!n.done&&(t==="rim"&&(n.rim=!0),t==="board"&&(n.board=!0),t==="floor"&&this.resolveMiss(n)),this.events.emit("hit",{kind:t,speed:e,x:i.pos.x,y:i.pos.y,z:i.pos.z,t:r})}onBasket(t=1){let e=this.ball,i=e.shot;if(this.full&&i&&i.side!=null&&i.side!==t&&(i=null),this.phase==="ft"&&this.ft){this.teams[this.ft.shooter.team].score+=1,this.stats.add(this.ft.shooter,"ftm"),this.stats.add(this.ft.shooter,"pts",1),i&&(i.done=!0),this.ft.made=!0,this.events.emit("basket",{team:this.ft.shooter.team,value:1,player:this.ft.shooter,kind:"ft",t:this.time,pos:e.pos.clone()});return}if(this.phase!=="live"){this.events.emit("swish",{t:this.time});return}if(i&&!i.done){this.awardBasket(i,!1);return}if(!i){let n=e.lastTouch,r=this.full?this.teamAttacking(t):this.offense,a=n&&n.team===r?n.player:null;e.shot&&(e.shot.done=!0),this.awardBasket({shooter:a,team:r,side:t,kind:"tip",value:2,t:this.time,foul:null},!1)}}awardBasket(t,e){let i=this.ball,n=this.time;t.done=!0;let r=t.team;if(this.rules&&this.mustClear===r&&t.kind!=="ft"){this.events.emit("notCleared",{team:r,t:n}),t.shooter&&this.stats.add(t.shooter,"fga"),this.turnover(r,"notCleared",t.shooter);return}let a=t.kind==="tip"?2:t.value;this.teams[r].score+=a,t.shooter&&(this.stats.add(t.shooter,"pts",a),t.kind==="ft"?this.stats.add(t.shooter,"ftm"):t.kind!=="tip"&&(this.stats.add(t.shooter,"fga"),this.stats.add(t.shooter,"fgm"),a===3&&(this.stats.add(t.shooter,"tpa"),this.stats.add(t.shooter,"tpm"))));let o=null,c=this.lastPass;if(c&&t.shooter&&c.receiver===t.shooter&&n-c.t<6&&t.t-c.t<4.5&&(o=c.passer,this.stats.add(o,"ast")),this.lastPass=null,this.events.emit("basket",{team:r,value:a,player:t.shooter,assist:o,kind:t.kind,goaltend:e,grade:t.grade,t:n,pos:i.pos.clone(),andOne:!!t.foul}),t.shooter&&(t.shooter.celebrateUntil=n+1.4),i.shot=null,t.foul){this.setPhase("scored"),this.next={type:"ft",shooter:t.shooter,n:1};return}if(this.setPhase("scored"),this.full){let l=this.baselineSpot(t.side??this.side(r),i.pos.z);this.next=this.inboundNext(1-r,l,{inbounder:this.pickInbounder(1-r,l.x,l.z)});return}this.next={type:"check",team:1-r},(this.teams[r].score>=this.target||this.overtime)&&(this.next={type:"over"})}resolveMiss(t){if(!t.done){if(t.done=!0,t.kind==="ft"){this.ft&&this.phase==="ft"&&(this.ft.missed=!0),this.events.emit("miss",{player:t.shooter,ft:!0,t:this.time});return}t.kind!=="blocked"&&t.kind!=="tip"&&(this.stats.add(t.shooter,"fga"),t.value===3&&this.stats.add(t.shooter,"tpa")),this.events.emit("miss",{player:t.shooter,airball:!t.rim&&!t.board,t:this.time}),t.foul&&this.phase==="live"?this.whistle("shootingFoul",{type:"ft",shooter:t.shooter,n:t.value},{foul:!0}):!t.rim&&!t.board&&this.shotClock<=0&&this.phase==="live"&&this.turnover(t.team,"shotClock")}}rulesLive(t){let e=this.ball,i=this.time;if(!this.rules)return;this.mustClear!=null&&e.owner&&e.owner.team===this.mustClear&&Dn(e.owner.pos.x,e.owner.pos.z)&&(this.mustClear=null,this.events.emit("cleared",{team:e.owner.team,t:i}));let n=this.full;if(e.state==="free"&&e.pos.y<Et+.03&&!bu(e.pos.x,e.pos.z,-Et*.5,n)){let a=e.lastTouch;if(e.shot&&!e.shot.done&&this.resolveMiss(e.shot),this.phase==="live"){this.turnover(a?a.team:1-this.offense,"out",null,n?this.outSpot(e.pos.x,e.pos.z):null);return}}if(e.state==="free"&&((n?Math.abs(e.pos.x)>15.5:e.pos.x>15.5||e.pos.x<-2)||Math.abs(e.pos.z)>9.5)){let a=e.lastTouch;this.turnover(a?a.team:1-this.offense,"out",null,n?this.outSpot(e.pos.x,e.pos.z):null);return}let r=e.owner;if(r&&!r.airborne&&!bu(r.pos.x,r.pos.z,-.12,n)){this.turnover(r.team,"out",r,n?this.outSpot(r.pos.x,r.pos.z):null);return}if(!(this.inbPending||this.tipLoose)){if(n&&r&&r.team===this.offense&&!r.airborne){let a=this.localX(r.team,r.pos.x);if(this.frontcourt){if(a<-.12){this.events.emit("backcourt",{team:r.team,t:i}),this.turnover(r.team,"backcourt",r);return}}else if(a>.12)this.frontcourt=!0,this.events.emit("frontcourt",{team:r.team,t:i});else if(this.backcourtT+=t,this.backcourtT>=Bi.BACKCOURT){this.events.emit("eightSeconds",{team:r.team,t:i}),this.turnover(r.team,"eightSec",r);return}}if(this.shotClockOn){let a=e.shot&&(!e.shot.done||e.shot.rim||e.shot.board);if(a||(this.shotClock-=t),this.shotClock<=0&&!a){this.shotClock=0,this.events.emit("shotClockViolation",{team:this.offense,t:i}),this.turnover(this.offense,"shotClock",r);return}}if(!this.overtime&&(this.clock-=t,this.clock<=0)){if(this.clock=0,e.shot&&!e.shot.done)return;this.endOfRegulation()}}}endOfRegulation(){if(this.full){this.endOfPeriod();return}if(this.phase==="over")return;this.events.emit("buzzer",{t:this.time});let[t,e]=this.scoreline;if(t===e){this.overtime=!0,this.events.emit("overtime",{t:this.time}),this.whistle("overtime",{type:"check",team:this.rng.next()<.5?0:1});return}this.finish()}finish(){let[t,e]=this.scoreline;this.winner=t>e?0:e>t?1:-1,this.setPhase("over"),this.ball.shot=null;for(let i of this.players)i.action=null,i.stance=!1,i.handsUp=!1;for(let i of this.players)i.team===this.winner&&(i.celebrateUntil=this.time+6);this.events.emit("final",{winner:this.winner,score:this.scoreline,t:this.time})}updatePhase(t){let e=this.phase,i=this.phaseT;if(e!=="intro"){if(e==="tip"){this.updateTip(t);return}if(e==="inbound"){this.updateInbound(t);return}if(e==="break"){let n=this.period===2?4:2.6;(i>n||this.skipRequested&&i>.8)&&this.afterDead();return}if(e==="check"){let n=this.checker&&this.checker.isHuman?i>.6&&this.checkerReady:!1;(i>(this.checker&&this.checker.isHuman?6:1.4)||n)&&(this.checkerReady=!1,this.goLive());return}if(e==="scored"||e==="dead"){(i>(e==="scored"?1.9:1.35)||this.skipRequested&&i>.5)&&this.afterDead();return}e==="ft"&&this.updateFT(),e==="live"&&this.rules&&!this.overtime&&this.clock<=0&&!(this.ball.shot&&!this.ball.shot.done)&&this.endOfRegulation()}}afterDead(){let t=this.next;if(this.next=null,this.full){if(t&&t.type==="over"){this.finish();return}if(t&&t.type==="period"){this.startPeriod();return}if(t&&t.type==="ft"){this.startFreeThrows(t.shooter,t.n);return}if(this.rules&&this.clock<=0){this.endOfPeriod();return}let e=t||this.inboundNext(1-this.offense,this.sidelineSpot(this.ball.pos.x,this.ball.pos.z));this.startInbound(e.team,e.x,e.z,e.kind,{inbounder:e.inbounder});return}if(!t||t.type==="check"){if(this.rules&&!this.overtime&&this.clock<=0){this.endOfRegulation();return}this.startCheck(t?t.team:1-this.offense)}else t.type==="ft"?this.startFreeThrows(t.shooter,t.n):t.type==="over"&&this.finish()}startFreeThrows(t,e){this.setPhase("ft"),this.offense=t.team,this.mustClear=null,this.ft={shooter:t,left:e,total:e,made:!1,missed:!1,released:!1,wait:0},this.placeFT(),this.events.emit("ftStart",{player:t,n:e,t:this.time})}placeFT(){let t=this.ft.shooter,e=this.side(t.team),i=e*B.X;this.place(t,e*(zt.FT_X-.32),0);let n=[1.1,2,2.9],r=this.teams[1-t.team].players,a=this.teams[t.team].players.filter(d=>d!==t),o=[[-7.6,.6],[-6.4,-4.4],[-6.4,4.4],[-8.4,-2.2],[-8.4,2.2]],c=0,l=d=>{let[u,f]=o[c++%o.length],g=i+e*u,x=e*f;this.place(d,g,x,re(i-g,-x))};r.forEach((d,u)=>{if(u>=3){l(d);return}let f=i-e*n[u===2?1:0],g=(u%2?-1:1)*(zt.KEY_HW+.35);this.place(d,f,g,re(i-f,-g*.3))}),a.forEach((d,u)=>{if(u>=2){l(d);return}let f=i-e*n[1+(u===1?1:0)],g=(u%2?1:-1)*(zt.KEY_HW+.35);this.place(d,f,g,re(i-f,-g*.3))});let h=this.ball;h.shot=null,h.pass=null,h.owner=t,h.state="held",h.pos.set(t.pos.x+e*.36,xe.HOLD_Y,t.pos.z),h.prevPos.copy(h.pos),wn(this,t),this.ft.released=!1,this.ft.made=!1,this.ft.missed=!1,this.ft.wait=0,this.events.emit("snap",{t:this.time})}updateFT(){let t=this.ft,e=this.ball;if(!t)return;let i=t.shooter;if(!t.released){e.shot&&e.shot.shooter===i&&e.state==="free"&&(t.released=!0,t.left--,this.stats.add(i,"fta"),t.left<=0&&(this.setPhase("live"),this.ftLast={shooter:i},this.shotClock=this.shotLen,this.frontcourt=!0,this.backcourtT=0,this.ball.shot.kind="ft",this.ball.shot.value=1,this.mustClear=null,this.ftLastShot=e.shot));return}t.wait+=1/120,(t.made||t.missed||t.wait>2.4)&&(e.shot&&(e.shot.done=!0),t.missed=!t.made,t.wait>.9&&this.placeFT())}};var Cc=class{constructor(t,e){this.m=t,this.p=e,this.input={moveF:0,moveR:0,sprint:!1,yaw:0,pitch:0,lmb:!1,rmb:!1,stance:!1},this.buffer=[],this.passTarget=null,this.targetVisible=!1,this.preview=null,this.lastAction=null}press(t){this.buffer.push({type:t,t:this.m.time})}release(t){this.buffer.push({type:t+"Up",t:this.m.time})}update(t){let e=this.m,i=this.p,n=e.time,r=e.ball,a=this.input,o=a.yaw,c=Math.sin(o),l=Math.cos(o),h=-Math.cos(o),d=Math.sin(o),u=c*a.moveF+h*a.moveR,f=l*a.moveF+d*a.moveR,g=Math.hypot(u,f);g>1&&(u/=g,f/=g);let x=Hi(e,i),m=r.owner&&r.owner.team!==i.team;i.stance=!x&&!i.airborne&&(a.stance||a.rmb&&!!m)&&(e.phase==="live"||e.phase==="inbound"),i.handsUp=!x&&a.lmb&&e.phase==="live",i.sprint=a.sprint&&g>.1&&!i.stance;let p=i.maxSpeed(i.sprint,x);i.desired.set(u*p,0,f*p),i.faceYaw=o,x&&r.state==="held"&&!i.action&&!i.airborne&&g>.2&&e.phase==="live"&&(ls(i,i.hand||"R",{}),r.state="dribble");let v=r.owner&&r.owner.team===i.team;if(x||e.phase==="check"&&e.checker===i?(this.passTarget=L_(e,i,o,this.passTarget),this.targetVisible=!!this.passTarget):(this.targetVisible=!1,v||(this.passTarget=null)),x||e.phase==="ft"&&e.ft&&e.ft.shooter===i){let M=Bs(e,i),A=i.action;A&&A.type==="shot"?this.preview={kind:A.kind,spot:A.spot,charge:A.charging?A.charge:A.relCharge??A.charge,live:!A.released,released:A.released,grade:A.gradeInfo}:this.preview={kind:M,spot:On(e,i,M,rn(e,i),M==="layup"||M==="dunk"?0:Mt(i.speed/6,0,1)),charge:0,live:!1}}else{let M=i.action;this.preview=M&&M.type==="shot"&&M.released&&M.t-M.rt<.8?{kind:M.kind,spot:M.spot,charge:M.relCharge??M.charge,live:!1,released:!0,grade:M.gradeInfo}:null}let S=i.action;S&&S.type==="shot"&&!S.released&&(S.aimYaw=o);let y=e.phase;if(y==="tip"){let M=e.tip;for(let A of this.buffer)A.type==="jump"&&M&&M.jumpers.includes(i)&&!i.airborne&&!i.action&&Da(e,i);this.buffer.length=0;return}if(y==="inbound"){for(let M of this.buffer)M.type==="pass"&&!x&&e.offense===i.team&&this.requestPass();this.buffer.length=0;return}if(y==="scored"||y==="dead"||y==="over"||y==="break"){for(let M of this.buffer)M.type.endsWith("Up")||e.requestSkip();this.buffer.length=0;return}if(y==="check"){e.checker===i&&(g>.2||this.buffer.some(M=>!M.type.endsWith("Up")))&&(e.checkerReady=!0),this.buffer=this.buffer.filter(M=>n-M.t<vi.INPUT_BUFFER&&!M.type.endsWith("Up")&&M.type!=="jump");return}if(y==="ft"){let M=e.ft;for(let A of this.buffer)M&&M.shooter===i&&A.type==="shoot"&&!i.action&&!M.released&&r.owner===i&&cs(e,i,{kind:"ft",charging:a.lmb,aimYaw:o}),A.type==="shootUp"&&i.action&&i.action.type==="shot"&&Bu(i.action,n);this.buffer.length=0;return}if(y!=="live"){this.buffer.length=0;return}let E=[];for(let M of this.buffer)this.handle(M)||n-M.t<(M.type==="steal"?.3:vi.INPUT_BUFFER)&&!M.type.endsWith("Up")&&E.push(M);this.buffer=E}handle(t){let e=this.m,i=this.p,n=e.time,r=this.input,a=e.ball,o=Hi(e,i),c=i.action;switch(t.type){case"shootUp":return c&&c.type==="shot"&&c.charging&&Bu(c,n),!0;case"shoot":return o?Vi(e,i)?(cs(e,i,{charging:r.lmb,aimYaw:r.yaw}),this.lastAction={kind:"shot",t:n},!0):!1:!0;case"pass":return o?Vi(e,i)?(this.passTarget&&(Dr(e,i,this.passTarget),this.lastAction={kind:"pass",t:n}),!0):!1:(a.owner&&a.owner.team===i.team?this.requestPass():a.pass&&a.pass.team===i.team&&this.requestPass(),!0);case"jump":return o?Vi(e,i)?(Mc(e,i),!0):!1:i.airborne?!0:c&&c.type!=="jump"?!1:(Da(e,i),!0);case"steal":return o?!0:c||n<i.stealReadyAt?!1:(_c(e,i),this.lastAction={kind:"steal",t:n},!0);case"cross":return o&&Sc(e,i),!0;default:return!0}}requestPass(){let t=this.m,e=this.p,i=t.time;i<e.requestReadyAt||(e.requestUntil=i+2.2,e.requestReadyAt=i+1,t.events.emit("request",{player:e,t:i}))}};function L_(s,t,e,i){let n=null,r=1e9;for(let a of s.teams[t.team].players){if(a===t)continue;let o=Math.abs(kn(e,re(a.pos.x-t.pos.x,a.pos.z-t.pos.z))),c=a.pos.distXZ(t.pos),l=o+c*.015+(o>.85?1:0);a===i&&(l-=.18),l<r&&(r=l,n=a)}return n}var rm=12,ka=class{constructor(t,e){this.app=t,this.cfg=e,this.view=t.view,this.audio=t.audio,this.hud=t.hud,this.input=t.input,this.match=new Rc(e.match);let i=this.match;this.human=i.human,this.human&&(this.ctl=new Cc(i,this.human),i.humanCtl=this.ctl);let n=i.full;this.cam={mode:this.human?"fp":"orbit",yaw:Math.PI/2,pitch:-.1,eye:xe.EYE,fov:t.settings.fov,bob:t.settings.bob?1:0,shake:t.settings.shake?1:0,angle:.9,radius:n?14.5:11.5,height:n?6.4:5.6,cx:n?0:8.5},this.acc=0,this.paused=!1,this.ended=!1,this.excite=0,this.unsubs=[],this.kitA=e.colours?e.colours.kits[0].jersey:"#c00",this.kitB=e.colours?e.colours.kits[1].jersey:"#00c",this.sq=new Map,this.view.setVenue(e.venue||"gym",e.venueOpts||{}),this.view.setLocal(this.human),this.view.setMatch(i,e.colours),this.hookEvents(),this.human&&this.unsubs.push(this.input.on((r,a)=>{this.paused||!this.ctl||(a?this.ctl.press(r):this.ctl.release(r))})),e.practice&&e.practice.attach(this)}start(){let t=this.match;this.cfg.practice?this.cfg.practice.start(this):t.start(this.cfg.firstTeam),this.human&&(this.cam.yaw=this.human.yaw);let e=(Ns[this.cfg.venue]||Ns.gym).loud;this.cfg.mode!=="menu"&&this.audio.startCrowd(.2+e*.8)}hookEvents(){let t=this.match,e=t.events,i=this.audio,n=this.view,r=this.hud,a=(u,f)=>this.unsubs.push(e.on(u,f)),o=this.cfg.mode==="menu",c=!!this.cfg.practice,l=()=>this.human,h=(u,f=1)=>{if(o)return{gain:0};let g=n.camera.position,x=u.x-g.x,m=u.z-g.z,p=Math.hypot(x,m),v=this.cam.yaw,S=-Math.cos(v)*x+Math.sin(v)*m;return{gain:f/(1+p*.09),pan:S/(p+3)}},d=u=>t.teams[u].short;a("bounce",u=>i.play(Math.random()<.5?"bounce":"bounce2",{...h({x:u.x,z:u.z},u.player===l()?.75:.9),rate:.95+Math.random()*.1})),a("hit",u=>{u.kind==="floor"&&u.speed>.8?i.play("bounce",{...h(u,Math.min(1,u.speed/6)),rate:.9+Math.random()*.15}):u.kind==="rim"?(i.play("rim",{...h(u,Math.min(1,.3+u.speed/6)),rate:.95+Math.random()*.1}),u.speed>1.5&&(this.excite=Math.max(this.excite,.7))):u.kind==="board"?i.play("board",h(u,Math.min(1,.3+u.speed/7))):u.kind==="body"&&i.play("catch",h(u,.4))}),a("shot",u=>{i.play("release",h(u.player.pos,.6)),u.player===l()&&(n.shake=.4,u.grade&&u.kind!=="dunk"&&(r.notify(u.grade.label,u.grade.tier==="perfect"?"good":u.grade.tier==="good"?"":"bad"),u.grade.tier==="perfect"&&i.play("perfect",{gain:.45}))),this.excite=Math.max(this.excite,.6)}),a("pass",u=>i.play("pass",h(u.player.pos,.6))),a("gain",u=>i.play("catch",h(u.player.pos,u.player===l()?.55:.7))),a("stealTry",u=>i.play("steal",{...h(u.player.pos,.25),rate:1.2})),a("poke",u=>{i.play("steal",h(u.player.pos,1)),u.player===l()&&r.notify("POKED LOOSE!","good"),u.victim===l()&&r.notify("STRIPPED","bad")}),a("steal",u=>{o||i.play("ooh",{group:"crowd",gain:.5}),u.player===l()&&r.showBanner("STEAL!","",1300,"mine")}),a("interception",u=>{u.player===l()?r.showBanner("PICKED OFF!","",1300,"mine"):u.victim===l()&&r.notify("INTERCEPTED","bad")}),a("stealMiss",u=>{u.player===l()&&r.notify("REACHED \xB7 OFF BALANCE","bad")}),a("block",u=>{i.play("block",h(u.player.pos,1)),o||i.play("ooh",{group:"crowd",gain:.8}),this.excite=1,u.player===l()?r.showBanner("BLOCKED!","Get out of here!",1500,"mine"):u.victim===l()&&r.notify("BLOCKED","bad")}),a("cross",u=>i.play(["squeak1","squeak2","squeak3"][Math.floor(Math.random()*3)],h(u.player.pos,.7))),a("ankles",u=>{o||i.play("ooh",{group:"crowd",gain:.45}),u.by===l()&&r.notify("DEFENDER BEATEN","good")}),a("bite",u=>{u.by===l()&&r.notify("BIT ON THE FAKE","good")}),a("fake",u=>i.play("squeak3",h(u.player.pos,.4))),a("jump",u=>i.play("squeak2",{...h(u.player.pos,.3),rate:1.2})),a("request",()=>i.play("shout",{gain:.5})),a("rebound",u=>{u.player===l()&&r.notify(u.offensive?"OFFENSIVE BOARD":"REBOUND","good")}),a("miss",u=>{!o&&!c&&u.airball&&(i.play("groan",{group:"crowd",gain:.6}),u.player===l()&&r.notify("AIR BALL","bad"))}),a("swish",()=>i.play("net",{gain:.5})),a("basket",u=>{if(i.play("net",h(u.pos,1)),o)return;let f=u.team===0;i.play(f?"cheer":"groan",{group:"crowd",gain:f?1:.55}),this.excite=1,n.crowdLevel=f?1:.4,n.celebrate(u.pos.x,3,u.pos.z,u.team,u.kind==="dunk"?1.2:.7);let g=u.player===l(),x=u.kind==="dunk"?"SLAM DUNK!":u.goaltend?"GOALTENDING":u.kind==="ft"?"FREE THROW":u.value===3?"THREE!":u.kind==="layup"?"LAYUP":u.kind==="tip"?"PUT-BACK":"BUCKET";if(c){g&&r.notify(`+${u.value} ${x}`,"good");return}let m=u.player?`${u.player.name}${u.assist?` \xB7 assist ${u.assist.name}`:""}`:"";r.showBanner(g?x:`+${u.value}`,`${d(0)} ${t.scoreline[0]} - ${t.scoreline[1]} ${d(1)}${m?` \xB7 ${m}`:""}${u.andOne?" \xB7 AND ONE!":""}`,2e3,g?"mine":u.team===(l()?l().team:0)?"good":""),u.assist===l()&&r.notify("ASSIST","good")}),a("whistle",u=>{if(o)return;u.reason==="shotClock"?i.play("buzzer",{gain:.6}):i.play("whistle",{gain:.8});let f={out:"OUT OF BOUNDS",shotClock:"SHOT CLOCK",foul:u.bonus?"FOUL \xB7 BONUS":"FOUL",shootingFoul:"SHOOTING FOUL",notCleared:"NOT CLEARED",overtime:"OVERTIME",eightSec:"8 SECONDS",backcourt:"BACKCOURT",fiveSec:"5 SECONDS"}[u.reason]||"";f&&u.reason!=="overtime"&&r.showBanner(f,u.team!=null?`${d(1-u.team)} ball`:"",1500)}),a("tip",u=>{if(o)return;let f=l()&&u.jumpers.includes(l());r.showBanner("TIP-OFF",f?"Jump (Space) as the ball comes down":`${t.teams[0].name} v ${t.teams[1].name}`,1900)}),a("toss",()=>{o||i.play("whistle",{gain:.5,rate:1.1})}),a("tapped",u=>{!o&&u.player===l()&&r.notify("WON THE TIP","good")}),a("inbound",u=>{o||c||u.kind!=="baseline"&&r.notify(`${d(u.team)} BALL`,"")}),a("periodEnd",u=>{if(o)return;let[f,g]=t.scoreline,x=u.half?"HALFTIME":u.ot?t.period>4?"END OF OVERTIME":"END OF REGULATION":`END OF Q${u.period}`;r.showBanner(x,`${d(0)} ${f} - ${g} ${d(1)}${u.half?" \xB7 teams switch ends":u.ot?" \xB7 tied: overtime":""}`,u.half?3600:2400),i.play("cheer",{group:"crowd",gain:.5})}),a("periodStart",u=>{if(o)return;let f=["","1ST QUARTER","2ND QUARTER","3RD QUARTER","4TH QUARTER"];r.showBanner(u.ot?u.label==="OT"?"OVERTIME":u.label:f[u.period]||u.label,`${t.teams[u.team].name} ball`,1800)}),a("eightSeconds",u=>{!o&&l()&&u.team===l().team&&r.notify("GET IT OVER HALF COURT IN 8 SECONDS","bad")}),a("backcourt",u=>{!o&&l()&&u.team===l().team&&r.notify("NO GOING BACK OVER HALF COURT","bad")}),a("notCleared",u=>{!o&&l()&&u.team===l().team&&r.notify("NO BASKET \xB7 CLEAR IT FIRST","bad")}),a("foul",u=>{o||(u.player===l()?r.notify(`FOUL ON YOU (${u.kind==="reach"?"REACH-IN":u.kind==="shooting"?"ON THE SHOT":"BLOCKING"})`,"bad"):u.victim===l()&&r.notify("FOULED","good"),u.kind==="shooting"&&i.play("whistle",{gain:.8}))}),a("ftStart",u=>{o||r.showBanner("FREE THROW",`${u.player.name} \xB7 ${u.n} shot${u.n>1?"s":""}`,1500)}),a("check",u=>{o||(u.first?r.showBanner("CHECK BALL",`${t.teams[u.team].name} ball`,1700):c||r.notify(`${d(u.team)} BALL \xB7 CHECK`,""))}),a("snap",()=>{o||(r.flashFade(),this.human&&(this.cam.yaw=this.human.yaw,this.cam.pitch=-.1))}),a("cleared",u=>{l()&&u.team===l().team&&r.notify("CLEARED","")}),a("buzzer",()=>{o||i.play("buzzer",{gain:.8})}),a("overtime",()=>{o||r.showBanner("OVERTIME","Next basket wins",2400)}),a("final",()=>{if(o)return;i.play("buzzer",{gain:.9});let[u,f]=t.scoreline,g=this.human&&(this.human.team===0?u>f:f>u);if(r.showBanner(g?"YOU WIN!":"FINAL",`${d(0)} ${u} - ${f} ${d(1)}`,3200,g?"mine":""),g){i.play("cheer",{group:"crowd",gain:1}),n.crowdLevel=1;let x=t.hoopX(this.human.team),m=Math.sign(x);for(let p=0;p<3;p++)setTimeout(()=>n.celebrate(x-m*(4-Math.random()*4),3,(Math.random()-.5)*8,this.human.team,1.2),p*450)}})}frame(t){let e=this.match;if(!this.paused&&!this.ended){if(this.human&&this.ctl){let c=this.input.axes();this.input.consumeLook(this.cam,t);let l=this.ctl.input;l.moveF=c.f,l.moveR=c.r,l.sprint=c.sprint,l.stance=c.stance,l.yaw=this.cam.yaw,l.pitch=this.cam.pitch;let h=this.input.held;l.lmb=h.lmb,l.rmb=h.rmb}this.acc+=Math.min(t,.1)*(this.cfg.timeScale||1);let o=0;for(;this.acc>=Rr&&o<rm;)e.step(Rr),this.acc-=Rr,o++,this.cfg.practice&&this.cfg.practice.step(this,Rr);o>=rm&&(this.acc=0),this.sneakerSounds(t),e.phase==="over"&&!this.ended&&e.phaseT>(this.cfg.mode==="menu"?0:3.2)&&(this.ended=!0,this.cfg.onEnd&&this.cfg.onEnd(this))}let i=this.paused?1:this.acc/Rr,n=e.ball.pos,r=Math.max(0,1-De(n.x,n.z,n.x>=0?1:-1)/7);if(this.excite=Math.max(r*.4,this.excite-t*.3),this.cfg.mode!=="menu"&&this.audio.setExcitement(this.excite),this.human){let o=this.human,c=xe.EYE-.24*o.stanceW,l=e.time-o.landT;l>=0&&l<.25&&(c-=.09*Math.sin(l/.25*Math.PI)),this.cam.eye+=(c-this.cam.eye)*(1-Math.exp(-t*14))}else if(this.cam.angle+=t*.04,e.full){let o=Math.max(-7,Math.min(7,e.ball.pos.x*.55));this.cam.cx+=(o-this.cam.cx)*(1-Math.exp(-t*.5))}this.cam.fov=this.app.settings.fov,this.cam.bob=this.app.settings.bob?1:0,this.cam.shake=this.app.settings.shake?1:0;let a=this.app.debugCam?{mode:"free",pos:this.app.debugCam.pos,look:this.app.debugCam.look,fov:this.app.debugCam.fov||this.cam.fov}:this.cam;this.view.render(i,t,a,{crowd:this.excite*.5}),this.updateMarkers(),this.cfg.practice&&this.cfg.practice.frame(this,t),this.cfg.mode!=="menu"&&this.hud.update(this.hudState())}sneakerSounds(t){if(this.cfg.mode==="menu"||t<=0)return;let e=this.match,i=this.view.camera.position;for(let n of e.players){let r=this.sq.get(n)||{vx:0,vz:0,t:0,g:0},a=(n.vel.x-r.vx)/t,o=(n.vel.z-r.vz)/t,c=Math.hypot(a,o),l=Math.hypot(n.pos.x-i.x,n.pos.z-i.z);c>14&&n.speed>2.2&&e.time-r.t>.45&&!n.airborne&&l<14&&(r.t=e.time,this.audio.play(["squeak1","squeak2","squeak3"][Math.floor(Math.random()*3)],{gain:.5/(1+l*.15),rate:.9+Math.random()*.25}));let h=Math.floor(n.gait*2);h!==r.g&&!n.airborne&&l<9&&n.speed>.8&&this.audio.play(h%2?"step1":"step2",{gain:(n===this.human?.18:.3)/(1+l*.3),rate:.9+Math.random()*.2}),r.g=h,r.vx=n.vel.x,r.vz=n.vel.z,this.sq.set(n,r)}}updateMarkers(){let t=this.view.markers,e=this.match;if(t.hideAll(),!this.ctl||this.cfg.mode==="menu")return;let i=this.human,n=this.ctl.passTarget;if(n&&this.ctl.targetVisible&&e.teams[i.team].players.length>1&&t.showRing(n.pos.x,n.pos.z,e.time),e.rules&&e.offense!==i.team&&(e.phase==="live"||e.phase==="check"||e.phase==="inbound")){let a=e.ai.markOf(i);a&&t.showDef(a.pos.x,a.pos.z)}let r=e.ball;r.pass&&r.pass.target===i&&r.state==="free"&&t.showIncoming(r.pos.x+r.vel.x*.25,r.pos.z+r.vel.z*.25),this.cfg.practice&&this.cfg.practice.markers(this,t)}hudState(){let t=this.match,e=this.human,i="",n=this.input.touchMode;if(e){let a=t.ball,o=a.owner===e;t.phase==="tip"?i=t.tip&&t.tip.jumpers.includes(e)?n?"Tap JUMP as the ball comes down":"Space: jump for the tip as the ball comes down":"Tip-off":t.phase==="inbound"?i=t.offense===e.team?n?"Get open \xB7 CALL for the throw-in":"Get open \xB7 RMB calls for the throw-in":"Find your man (red ring)":t.phase==="break"?i=n?"Tap any button to continue":"Press any action to continue":t.phase==="check"&&t.checker===e?i=n?"Move or tap a button to check the ball in":"Move or press any button to check the ball in":t.phase==="ft"?i=t.ft&&t.ft.shooter===e?n?"Hold SHOOT, release in the green":"Hold left mouse, release in the green":"Free throw":t.phase==="scored"||t.phase==="dead"?i=n?"Tap any button to skip":"Press any action to skip":n?i="":o?i="LMB shoot \xB7 RMB pass \xB7 Q crossover \xB7 Space fake":a.owner&&a.owner.team!==e.team?i=a.owner.pos.distXZ(e.pos)<2.2?"E steal \xB7 C stance \xB7 Space block":"Stay between your man and the rim \xB7 C stance":a.owner&&a.owner.team===e.team?i=e.requestUntil>t.time?"Ball called for":"RMB call for the ball":a.state==="free"&&a.shot&&(i="Space jump for the rebound"),t.full&&t.phase==="live"&&a.owner&&a.owner.team===e.team&&!t.frontcourt&&t.backcourtT>4&&(i=`Over half court: ${Math.max(0,8-t.backcourtT).toFixed(0)} s`)}this.cfg.practice&&this.cfg.practice.hint&&(i=this.cfg.practice.hint(this)??i);let r="";return t.full?t.phase==="tip"?r="TIP-OFF":t.phase==="inbound"?r="THROW-IN":t.phase==="ft"&&t.ft?r=`FREE THROW ${t.ft.total-t.ft.left+(t.ft.released?0:1)}/${t.ft.total}`:t.phase==="break"?r=t.period===2?"HALFTIME":`END OF ${t.periodLabel}`:t.phase==="over"?r="FINAL":r=`TEAM FOULS ${t.teams[0].fouls} - ${t.teams[1].fouls}`:t.phase==="check"?r="CHECK BALL":t.phase==="ft"&&t.ft?r=`FREE THROW ${t.ft.total-t.ft.left+(t.ft.released?0:1)}/${t.ft.total}`:t.overtime?r="OVERTIME \xB7 NEXT BASKET WINS":t.phase==="over"?r="FINAL":t.rules&&(r=`FIRST TO ${t.target}`),this.cfg.practice&&this.cfg.practice.phaseText&&(r=this.cfg.practice.phaseText(this)),{match:t,camera:this.view.camera,view:this.view,camYaw:this.cam.yaw,style:this.view.style,kitA:this.kitA,kitB:this.kitB,hint:i,phaseText:r,preview:this.ctl?this.ctl.preview:null,meter:this.app.settings.meter!==!1,clockText:this.cfg.practice&&this.cfg.practice.clockText?this.cfg.practice.clockText(this):void 0,noArrow:this.cfg.noArrow}}setPaused(t){this.paused=t,this.ctl&&t&&(this.ctl.buffer.length=0)}dispose(){for(let t of this.unsubs)t();this.unsubs=[],this.cfg.practice&&this.cfg.practice.dispose(this),this.audio.stopCrowd(),this.view.markers.hideAll()}};var N_=null,D_="localStorage";var Hu=()=>N_||globalThis.localStorage,Gi={get kind(){return D_},getItem(s){return Hu().getItem(s)},setItem(s,t){Hu().setItem(s,String(t))},removeItem(s){Hu().removeItem(s)}};var Vu="courtside.settings.v1",om="courtside.style",Gu=70,Wu=120,lm=3,am=2.25,Pc={rev:lm,sensitivity:1,invertY:!1,fov:100,master:.8,sfx:.9,crowd:.6,difficulty:"pro",bob:!0,shake:!0,quality:"high",gameLength:"normal",meter:!0,quarterLength:"short",teamSize:5,touch:"auto"};function cm(){try{return!!Gi.getItem(Vu)}catch{return!1}}function hm(s=!1){let t=()=>({...Pc,...s?{sensitivity:am}:{}});try{let e=Gi.getItem(Vu);if(!e)return t();let i={...Pc,...JSON.parse(e)};return(i.rev||1)<2&&i.fov===85&&(i.fov=Pc.fov),(i.rev||1)<3&&s&&i.sensitivity===1&&(i.sensitivity=am),i.rev=lm,i.fov=Math.min(Wu,Math.max(Gu,Number(i.fov)||Pc.fov)),i}catch{return t()}}function um(s){try{return Gi.setItem(Vu,JSON.stringify(s)),!0}catch{return!1}}function dm(){try{let s=Gi.getItem(om);return s==="neo"||s==="classic"?s:"classic"}catch{return"classic"}}function fm(s){try{Gi.setItem(om,s)}catch{}}var li={guard:{id:"guard",name:"Floor General",pos:"PG",desc:"Quick, slick handles, sharp passing.",attrs:{shooting:72,handling:90,speed:88,defense:62,passing:90,vertical:60}},shooter:{id:"shooter",name:"Sharpshooter",pos:"SG",desc:"Deadly from deep. Wider sweet spot.",attrs:{shooting:92,handling:74,speed:76,defense:60,passing:70,vertical:62}},slasher:{id:"slasher",name:"Slasher",pos:"SF",desc:"Attacks the rim and finishes above it.",attrs:{shooting:66,handling:80,speed:84,defense:70,passing:64,vertical:88}},forward:{id:"forward",name:"Two-Way Forward",pos:"PF",desc:"Defends, rebounds and hits the mid-range.",attrs:{shooting:74,handling:64,speed:72,defense:82,passing:66,vertical:78}},big:{id:"big",name:"Rim Protector",pos:"C",desc:"Blocks, rebounds and powerful dunks.",attrs:{shooting:52,handling:56,speed:64,defense:90,passing:62,vertical:82}}},ci=[{id:"harbor",name:"Harbor Hawks",short:"HAW",colors:["#e63946","#ffffff","#1d3557"],strength:70},{id:"mesa",name:"Mesa Comets",short:"MES",colors:["#f4a261","#264653","#ffffff"],strength:66},{id:"northside",name:"Northside Owls",short:"NOR",colors:["#2a9d8f","#ffffff","#0b3c49"],strength:72},{id:"river",name:"Riverside Rockets",short:"RIV",colors:["#3a86ff","#ffbe0b","#ffffff"],strength:74},{id:"summit",name:"Summit Lions",short:"SUM",colors:["#8338ec","#ffd60a","#ffffff"],strength:78},{id:"bayview",name:"Bayview Sharks",short:"BAY",colors:["#06a77d","#052f5f","#ffffff"],strength:68},{id:"ember",name:"Ember City Flames",short:"EMB",colors:["#ff6b00","#141414","#ffffff"],strength:82},{id:"glacier",name:"Glacier Wolves",short:"GLA",colors:["#9ad1d4","#1d3557","#ffffff"],strength:76}],Wi=s=>ci.find(t=>t.id===s)||ci[0],k_=["Jalen","Marcus","Theo","Andre","Kofi","Luca","Mateo","Darius","Ezra","Isaiah","Niko","Omar","Rafa","Tariq","Wes","Yusuf","Zane","Bo","Cal","Dev","Femi","Hugo","Ike","Jun","Kai","Leon","Milo","Nate","Otis","Quinn","Remy","Sol"],O_=["Okafor","Reyes","Lindqvist","Brooks","Mensah","Novak","Castillo","Hale","Ivers","Adeyemi","Petrov","Sato","Moreau","Kowalski","Ferreira","Grant","Haddad","Jensen","Kim","Lowe","Mbeki","Ortega","Park","Quist","Rossi","Sterling","Tanaka","Underwood","Vance","Whitaker","Young","Zhou"],pm=["#f3d2b3","#e0b48c","#c68b5e","#a26a43","#7b4b2c","#4f2f1c"],mm=["#111111","#3b2a1e","#7a4a24","#c58b3a","#e8d18a","#b23a1d"],gm=["#111111","#f5f5f5","#ffc61a","#2fd4ff","#ff4d5e","#33d36c"],hs={SKIN:pm,HAIR:mm,SHOES:gm},Ic=["guard","shooter","slasher","forward","big"],U_={1:["slasher"],2:["guard","big"],3:["guard","slasher","big"],4:["guard","shooter","slasher","big"],5:Ic};function F_(s,t=3){let e=new an(Hs(s.id)+17),i=new Set,n=[],r=U_[t]||Ic;for(let o=0;o<t;o++){let c;do c=`${e.pick(k_)} ${e.pick(O_)}`;while(i.has(c));i.add(c);let l=li[r[o%r.length]],h=s.strength-75,d=Object.fromEntries(Object.entries(l.attrs).map(([u,f])=>[u,Math.max(35,Math.min(97,Math.round(f+h+e.range(-5,5))))]));n.push({name:c,number:[0,1,3,4,5,7,8,10,11,12,13,15,21,23,24,30,33,34][e.int(0,17)]+0,archetype:l.id,attrs:d,look:{skin:e.pick(pm),hair:e.pick(mm),shoes:e.pick(gm),style:e.int(0,5)}})}let a=new Set;for(let o of n){for(;a.has(o.number);)o.number=(o.number+7)%56;a.add(o.number)}return n}function xm(){return{name:"You",number:23,archetype:"slasher",look:{skin:"#c68b5e",hair:"#111111",shoes:"#ffc61a",style:0}}}function $u(s){let t=li[s.archetype]||li.slasher;return{name:s.name||"You",number:s.number??23,archetype:t.id,attrs:{...s.attrs||t.attrs},look:{...s.look},isHuman:!0}}function $i(s,t,e=null){let n=F_(s,t).slice(0,t);if(e){let r=$u(e),a=0;if(t>=4){let c=Ic.indexOf(r.archetype),l=9;n.forEach((h,d)=>{let u=Math.abs(Ic.indexOf(h.archetype)-c);u<l&&(l=u,a=d)})}n=n.map((c,l)=>l===a?r:c);let o=new Set([r.number]);for(let c of n)if(c!==r){for(;o.has(c.number);)c.number=(c.number+7)%56;o.add(c.number)}}return{name:s.name,short:s.short,id:s.id,colors:s.colors,roster:n}}var B_={play:'<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/>',gear:'<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.6M12 18.6v2.6M21.2 12h-2.6M5.4 12H2.8M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8M18.5 18.5l-1.8-1.8M7.3 7.3 5.5 5.5"/><circle cx="12" cy="12" r="6.6"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9.4 9.3a2.7 2.7 0 1 1 3.9 2.4c-.8.4-1.3 1-1.3 1.9v.6"/><circle cx="12" cy="17.2" r=".9" fill="currentColor"/>',whistle:'<path d="M3 11.5h9.5a5.5 5.5 0 1 1-5.4 6.5H5a2 2 0 0 1-2-2z"/><path d="M12.5 11.5 18 6M15 4.5l1.5 1.5"/><circle cx="12.6" cy="16.5" r="1.6"/>',ball:'<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M6.2 5.2c3 2.6 3 11 0 13.6M17.8 5.2c-3 2.6-3 11 0 13.6"/>',cone:'<path d="M9.5 4h5l4 14h-13z"/><path d="M4 20h16M8 12h8"/>',trophy:'<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v3M8 20h8l-1-3H9z"/>',star:'<path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z" fill="currentColor"/>',back:'<path d="M15 5l-7 7 7 7"/>',left:'<path d="M15 5l-7 7 7 7"/>',right:'<path d="M9 5l7 7-7 7"/>',home:'<path d="M4 11 12 4l8 7v9h-5v-6H9v6H4z"/>',pause:'<path d="M8 5v14M16 5v14" stroke-width="3.4"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',chart:'<path d="M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-3"/>',swap:'<path d="M4 8h14l-3-3M20 16H6l3 3"/>',eye:'<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',check:'<path d="M4.5 12.5l5 5 10-11"/>',close:'<path d="M6 6l12 12M18 6 6 18"/>',brush:'<path d="M14.5 4.5 19.5 9.5 11 18l-5-5zM6 13l-2 7 7-2"/>',mail:'<path d="M3.5 6.5h17v11h-17z"/><path d="m3.5 7 8.5 6.5L20.5 7"/>',up:'<path d="M12 19V5M5.5 11.5 12 5l6.5 6.5"/>',list:'<path d="M8 6h12M8 12h12M8 18h12"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/>',forward:'<path d="M5 5.5v13l7-6.5zM12 5.5v13l7-6.5z" fill="currentColor" stroke="none"/>'};function Ft(s,t=22){return`<svg class="ico" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${B_[s]||""}</svg>`}var vm=1,Gs=10,Fe={3:{tier:3,name:"City League",short:"CITY",venue:"gym",salary:40,minRep:0,need:6},2:{tier:2,name:"National League",short:"NAT",venue:"gym",salary:260,minRep:18,need:6.6},1:{tier:1,name:"Premier League",short:"PREM",venue:"arena",salary:1800,minRep:48,need:7.2}},Xu=s=>ci.find(t=>t.id===s),Un=[...["ember","summit","glacier","river","northside","harbor"].map(s=>({...Xu(s),tier:1})),{...Xu("bayview"),tier:2},{...Xu("mesa"),tier:2},{id:"copperton",name:"Copperton Miners",short:"COP",colors:["#b5651d","#1b1b1b","#ffffff"],strength:65,tier:2},{id:"lakeshore",name:"Lakeshore Herons",short:"LAK",colors:["#5fa8d3","#ffffff","#1b4965"],strength:64,tier:2},{id:"ironbridge",name:"Ironbridge Bulls",short:"IRO",colors:["#6c757d","#e63946","#ffffff"],strength:63,tier:2},{id:"pinecrest",name:"Pinecrest Foxes",short:"PIN",colors:["#2d6a4f","#ff9f1c","#ffffff"],strength:62,tier:2},{id:"dockside",name:"Dockside Gulls",short:"DOC",colors:["#f1faee","#457b9d","#1d3557"],strength:60,tier:3},{id:"westgate",name:"Westgate Rangers",short:"WES",colors:["#d62828","#fcbf49","#ffffff"],strength:58,tier:3},{id:"maple",name:"Maple Street Ravens",short:"MAP",colors:["#3d348b","#f7b801","#ffffff"],strength:57,tier:3},{id:"oldtown",name:"Old Town Badgers",short:"OLD",colors:["#7f5539","#ede0d4","#1b1b1b"],strength:55,tier:3},{id:"sunset",name:"Sunset Park Coyotes",short:"SUN",colors:["#f77f00","#003049","#ffffff"],strength:54,tier:3},{id:"railyard",name:"Railyard Bison",short:"RAI",colors:["#495057","#90be6d","#ffffff"],strength:52,tier:3}],ti=s=>Un.find(t=>t.id===s)||Un[Un.length-1],Oa=s=>Un.filter(t=>t.tier===s);function kr(s){return Math.round(rs.reduce((t,e)=>t+(s[e]||0),0)/rs.length)}function qu(s){return s>=90?4:s>=80?3:s>=68?2:1}function Yu(s){let t=li[s]||li.slasher;return Object.fromEntries(rs.map(e=>[e,Math.max(40,Math.round(t.attrs[e]-22))]))}function z_(s,t,e){let r=4.75+(s.pts+.4*s.fgm-.7*(s.fga-s.fgm)-.4*(s.fta-s.ftm)+.7*s.oreb+.35*s.dreb+s.stl+.7*s.ast+.7*s.blk-.4*s.pf-s.tov)*8/Math.max(4,t)*.17+(e?.45:-.15);return Math.round(Math.max(1,Math.min(10,r))*10)/10}function Ku(s,t){let e=s-(t.strength+3);return e>=10?"Franchise star":e>=3?"Starter":e>=-6?"Rotation player":"Prospect"}function H_(s,t){let e=[...s];for(let r=e.length-1;r>0;r--){let a=Math.floor(t.next()*(r+1));[e[r],e[a]]=[e[a],e[r]]}let i=e.length,n=[];for(let r=0;r<i-1;r++){let a=[];for(let o=0;o<i/2;o++){let c=e[o],l=e[i-1-o];a.push(r%2===0?[c,l]:[l,c])}n.push(a),e.splice(1,0,e.pop())}return[...n,...n.map(r=>r.map(([a,o])=>[o,a]))]}function ym(){let s={};for(let t of Un)s[t.id]={w:0,l:0,pf:0,pa:0};return s}function bm({player:s,clubId:t,difficulty:e="pro",quarterLength:i="short",seed:n}){let r=n??(Date.now()&16777215)+1,a=ti(t),o={v:vm,seed:r,created:Date.now(),difficulty:e,quarterLength:i,player:{name:s.name||"You",number:s.number??23,archetype:s.archetype||"slasher",look:{...s.look},attrs:s.attrs?{...s.attrs}:Yu(s.archetype),age:19},season:1,round:0,clubId:a.id,contract:{years:1,salary:Zu(a,5)},rep:5,points:2,earnings:0,interest:{},offers:[],offerSeq:1,news:[],log:[],history:[],totals:{gp:0,pts:0,reb:0,ast:0,stl:0,blk:0,fgm:0,fga:0,tpm:0,tpa:0,wins:0},tables:ym(),fixtures:{},results:{},seasonOver:!1};return _m(o),on(o,`Signed for ${a.name} (${Fe[a.tier].name}). Show them what you can do.`),o}function _m(s){let t=new an(Hs(`season${s.season}`)^s.seed);for(let e of[1,2,3])s.fixtures[e]=H_(Oa(e).map(i=>i.id),t),s.results[e]=[];s.tables=ym(),s.round=0,s.log=[],s.seasonOver=!1}function Zu(s,t){let e=Fe[s.tier];return Math.round(e.salary*(.7+t/120)*(.85+(s.strength-50)/140))*1e3}function on(s,t,e=""){s.news.unshift({text:t,kind:e,season:s.season,round:s.round}),s.news.length>40&&(s.news.length=40)}var ln=s=>ti(s.clubId);function Ua(s){if(s.seasonOver)return null;let t=ln(s),i=(s.fixtures[t.tier][s.round]||[]).find(([r,a])=>r===t.id||a===t.id);if(!i)return null;let n=i[0]===t.id;return{round:s.round,home:n,opp:ti(n?i[1]:i[0]),homeId:i[0],awayId:i[1]}}function Lc(s,t){return Oa(t).map(e=>({club:e,...s.tables[e.id]})).sort((e,i)=>i.w-e.w||i.pf-i.pa-(e.pf-e.pa)||i.pf-e.pf)}function Ju(s){let t=s.log.filter(r=>!r.sim||r.line),e=t.length||1,i=r=>t.reduce((a,o)=>a+(o.line&&o.line[r]||0),0),n=s.log.length?s.log.reduce((r,a)=>r+a.rating,0)/s.log.length:0;return{gp:s.log.length,ppg:i("pts")/e,rpg:i("reb")/e,apg:i("ast")/e,rating:Math.round(n*10)/10,wins:s.log.filter(r=>r.won).length}}function Mm(s,t,e,i){let n=i/120,r=42*n,a=(t.strength-e.strength)*.55*n+1.5*n,o=Math.round(r+a/2+s.gauss()*6*Math.sqrt(n)),c=Math.round(r-a/2+s.gauss()*6*Math.sqrt(n));return o===c&&(s.next()<.5+a/40?o+=2:c+=2),[Math.max(8,o),Math.max(8,c)]}function Sm(s,t,e,i,n){let r=s.tables[t],a=s.tables[e];r.pf+=i,r.pa+=n,a.pf+=n,a.pa+=i,i>n?(r.w++,a.l++):(a.w++,r.l++)}function V_(s,t,e){let i=new an(Hs(`r${s.season}.${s.round}`)^s.seed);for(let n of[1,2,3]){let r=[];for(let[a,o]of s.fixtures[n][s.round]||[]){if(e&&a===e.homeId&&o===e.awayId){r.push({h:a,a:o,hs:e.hs,as:e.as,mine:!0});continue}let[c,l]=Mm(i,ti(a),ti(o),t);Sm(s,a,o,c,l),r.push({h:a,a:o,hs:c,as:l})}s.results[n][s.round]=r}}function ju(s,t,e){let i=Ua(s);if(!i)return null;let n=ln(s),r=Fe[n.tier],a=t.my>t.their,o=t.rating??z_(t.line,t.minutes,a),c=i.home?t.my:t.their,l=i.home?t.their:t.my;Sm(s,i.homeId,i.awayId,c,l),V_(s,e,{homeId:i.homeId,awayId:i.awayId,hs:c,as:l});let h=t.line?{pts:t.line.pts,reb:(t.line.oreb||0)+(t.line.dreb||0),ast:t.line.ast,stl:t.line.stl,blk:t.line.blk,fgm:t.line.fgm,fga:t.line.fga,tpm:t.line.tpm,tpa:t.line.tpa}:null;s.log.push({round:s.round,opp:i.opp.id,home:i.home,my:t.my,their:t.their,won:a,rating:o,line:h,sim:!!t.sim});let d=s.totals;if(d.gp++,a&&d.wins++,h)for(let y of["pts","reb","ast","stl","blk","fgm","fga","tpm","tpa"])d[y]+=h[y]||0;let u=t.sim?.5:1,f=Math.max(1,Math.round((1+o/2.6+(a?.5:0))*u));s.points+=f;let g=n.tier===1?1.5:n.tier===2?1.25:1,x=Math.round(((o-6.1)*2.6*g+(a?.6:0))*u*10)/10;s.rep=Math.max(0,Math.min(100,Math.round((s.rep+x)*10)/10));let m=[],p=[];for(let y of Un){if(y.id===n.id||!(y.tier<n.tier||y.tier===n.tier&&y.strength>n.strength+3))continue;let M=Fe[y.tier];if(s.rep<M.minRep||n.tier-y.tier>1&&s.rep<Fe[y.tier].minRep+20)continue;let A=M.need+(y.strength-70)/25,b=s.interest[y.id]||0,T=b+(o-A)*9*u+(a?3:0)-2;if(T=Math.max(0,Math.min(120,T)),s.interest[y.id]=Math.round(T),b<40&&T>=40&&m.push(`${y.name} scouts were watching.`),T>=100&&!s.offers.some(R=>R.clubId===y.id)){let R=wm(s,y);s.offers.push(R),p.push(R),s.interest[y.id]=70}}s.earnings+=Math.round(s.contract.salary/Gs);let v=s.offers.filter(y=>s.round>=y.expires);s.offers=s.offers.filter(y=>s.round<y.expires);for(let y of v)on(s,`The offer from ${ti(y.clubId).name} expired.`);for(let y of m)on(s,y,"scout");for(let y of p)on(s,`OFFER: ${ti(y.clubId).name} want to sign you.`,"offer");let S={rating:o,won:a,pts:f,repDelta:x,rep:s.rep,newOffers:p,notes:m,opp:i.opp,my:t.my,their:t.their,season:s.season,round:s.round+1,sim:!!t.sim};return on(s,`${a?"W":"L"} ${t.my}-${t.their} ${i.home?"v":"@"} ${i.opp.name} \xB7 rating ${o.toFixed(1)}`,a?"win":"loss"),s.round++,s.round>=Gs&&(s.seasonOver=!0,s.seasonClubId=s.clubId),S}function wm(s,t){let e=new an(Hs(`${t.id}.${s.season}.${s.round}`)^s.seed),i=1+Math.floor(e.next()*3);return{id:s.offerSeq++,clubId:t.id,years:i,salary:Zu(t,s.rep),expires:s.round+3,season:s.season}}function Em(s,t){let e=Ua(s);if(!e)return null;let i=ln(s),n=new an(Hs(`sim${s.season}.${s.round}`)^s.seed),r=kr(s.player.attrs),[a,o]=Mm(n,e.home?i:e.opp,e.home?e.opp:i,t),c=e.home?a:o,l=e.home?o:a,h=Math.round(Math.max(3,Math.min(9,5.7+(r-i.strength)/12+n.gauss()*.7+(c>l?.3:-.1)))*10)/10,d=t/120,u={pts:Math.max(0,Math.round((4+(h-5)*2.2)*d+n.gauss()*1.5)),oreb:0,dreb:Math.max(0,Math.round(1.5*d+n.gauss())),ast:Math.max(0,Math.round(1.2*d+n.gauss())),stl:Math.max(0,Math.round(n.next()*1.4)),blk:Math.max(0,Math.round(n.next()*1.1))};return u.fgm=Math.round(u.pts/2.3),u.fga=Math.max(u.fgm,Math.round(u.fgm*2.1)),u.tpm=0,u.tpa=0,ju(s,{my:c,their:l,line:u,rating:h,sim:!0},t)}function Tm(s,t){let e=s.offers.find(r=>r.id===t);if(!e)return!1;let i=ln(s),n=ti(e.clubId);return s.clubId=n.id,s.contract={years:e.years,salary:e.salary,fresh:!!s.seasonOver},s.offers=s.offers.filter(r=>r.clubId!==n.id&&ti(r.clubId).tier<=n.tier&&r.clubId!==i.id),s.interest[n.id]=0,on(s,`TRANSFER: you left ${i.name} for ${n.name} (${Fe[n.tier].name}, ${e.years} season${e.years>1?"s":""}).`,"offer"),!0}function Am(s,t){let e=s.offers.find(i=>i.id===t);return e?(s.offers=s.offers.filter(i=>i.id!==t),s.interest[e.clubId]=Math.min(s.interest[e.clubId]||0,45),on(s,`You turned down ${ti(e.clubId).name}.`),!0):!1}function Rm(s,t){let e=s.player.attrs[t];if(e==null||e>=99)return!1;let i=qu(e);return s.points<i?!1:(s.points-=i,s.player.attrs[t]=e+1,!0)}function Qu(s){let t=ti(s.seasonClubId||s.clubId),i=Lc(s,t.tier).findIndex(o=>o.club.id===t.id)+1,n=Ju(s),r=[];i===1&&r.push(`${Fe[t.tier].name} champions`),n.rating>=7.8?r.push("League MVP"):n.rating>=7&&r.push("All-League team");let a=[1,2,3].map(o=>({tier:o,club:Lc(s,o)[0].club}));return{season:s.season,club:t,pos:i,av:n,awards:r,champions:a}}function Cm(s){let t=Qu(s);s.history.push({season:s.season,clubId:t.club.id,tier:t.club.tier,pos:t.pos,gp:t.av.gp,ppg:Math.round(t.av.ppg*10)/10,rating:t.av.rating,awards:t.awards}),t.awards.length&&on(s,`Season ${s.season}: ${t.awards.join(", ")}!`,"win"),s.rep=Math.min(100,s.rep+t.awards.length*4+(t.pos===1?3:0));let e=s.player;if(e.age++,e.age<=24&&(s.points+=4),e.age>=31)for(let n of["speed","vertical"])e.attrs[n]=Math.max(40,e.attrs[n]-1);s.contract.fresh?delete s.contract.fresh:s.contract.years--,s.seasonClubId=null;let i=ln(s);s.contract.years<=0&&(s.contract={years:2,salary:Zu(i,s.rep)},on(s,`${i.name} extended your contract (2 seasons).`)),s.offers=[],s.season++,_m(s);for(let n of Un){if(n.id===s.clubId||(s.interest[n.id]||0)<70||s.rep<Fe[n.tier].minRep)continue;let r=wm(s,n);s.offers.push(r),s.interest[n.id]=50,on(s,`OFFER: ${n.name} want to sign you for next season.`,"offer")}return on(s,`Season ${s.season} begins.`),t}function Pm(s){return!!(s&&s.v===vm&&s.player&&s.player.attrs&&s.clubId&&s.fixtures&&s.tables)}var ae=s=>String(s).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),G_=["Crop","Afro","Buzz","Headband","Braids","Bald"],Nc=s=>s>=1e6?`$${(s/1e6).toFixed(1)}M`:`$${Math.round(s/1e3)}k`,td=s=>`${s}${s%10===1&&s%100!==11?"st":s%10===2&&s%100!==12?"nd":s%10===3&&s%100!==13?"rd":"th"}`,Im=s=>s>=7.5?"hi":s<5.5?"lo":"",Dc=class{constructor(t){this.s=t,this.app=t.app,this.draft=null,this.tab="table",this.lg=null}get c(){return this.app.career}clubName(){return this.c?ln(this.c).name:""}quarter(){return(Mn[this.c.quarterLength]||Mn.short).quarter}create(){let t=this.s,e=this.app;if(t.current="careerNew",!this.draft){let l=e.profile;this.draft={name:l.name&&l.name!=="You"?l.name:"Rookie",number:l.number??23,archetype:l.archetype||"slasher",look:{...l.look},clubId:Oa(3)[0].id,difficulty:e.settings.difficulty||"pro",quarterLength:"short"}}let i=this.draft,n=Yu(i.archetype),r=(l,h,d)=>`<div class="swatches" data-sw="${l}">${h.map(u=>`<button class="sw ${u===d?"on":""}" data-c="${u}" style="background:${u}" aria-label="${u}"></button>`).join("")}</div>`,a=rs.map(l=>`<div class="attr" style="grid-template-columns:110px 1fr 36px"><span>${Ea[l]}</span><div class="bar"><i style="width:${n[l]}%"></i></div><b>${n[l]}</b></div>`).join(""),o=Oa(3).map(l=>`<button class="card pick choice ${l.id===i.clubId?"on":""}" data-club="${l.id}"><span class="club-chip">${hi(l,34)} ${ae(l.name)}</span><span>Team rating ${l.strength}</span></button>`).join(""),c=t.show(`<div class="panel wide"><div class="h-title">New Career</div>
      <p class="lead">Create your player and start in the City League. Every game you play gets a match rating: it earns skill points, builds your reputation and gets bigger clubs' scouts interested. Play well and they will sign you.</p>
      <div class="grid2">
        <div>
          <div class="h-sec">Name &amp; number</div>
          <input class="field" id="cname" maxlength="16" value="${ae(i.name)}" placeholder="Your name">
          <div class="stepper" style="margin-top:var(--s3)"><button class="btn sm icon" data-act="numDown" aria-label="Lower number">${Ft("minus",18)}</button><span class="pv">#${i.number}</span><button class="btn sm icon" data-act="numUp" aria-label="Higher number">${Ft("plus",18)}</button></div>
          <div class="h-sec">Look</div>
          <div class="set"><span class="lab">Skin</span>${r("skin",hs.SKIN,i.look.skin)}</div>
          <div class="set"><span class="lab">Hair</span>${r("hair",hs.HAIR,i.look.hair)}</div>
          <div class="set"><span class="lab">Style</span>${t.seg("style",G_.map((l,h)=>[h,l]),i.look.style||0)}</div>
          <div class="set"><span class="lab">Shoes</span>${r("shoes",hs.SHOES,i.look.shoes)}</div>
        </div>
        <div>
          <div class="h-sec">Position</div>
          <div class="choices">${Object.values(li).map(l=>`<button class="card pick choice ${l.id===i.archetype?"on":""}" data-arch="${l.id}"><b>${l.name} \xB7 ${l.pos}</b><span>${l.desc}</span></button>`).join("")}</div>
          <div class="h-sec">Starting ratings \xB7 overall ${kr(n)}</div>
          ${a}
        </div>
      </div>
      <div class="h-sec">Your first club</div>
      <div class="club-grid">${o}</div>
      <div class="set" style="margin-top:var(--s4)"><span class="lab">Difficulty</span>${t.seg("difficulty",Object.entries(Vs).map(([l,h])=>[l,h.label]),i.difficulty)}</div>
      <div class="set"><span class="lab">Quarters</span>${t.seg("quarterLength",Object.entries(Mn).map(([l,h])=>[l,h.label]),i.quarterLength)}</div>
      <div class="small muted" style="margin-top:6px">Career games are full court, 5v5. Seasons have ${Gs} rounds; you can simulate a game you don't want to play (it counts for less).</div>
      <div class="actions"><button class="btn primary lg" data-act="start">${Ft("play")} Start career</button><button class="btn ghost" data-act="back">Back</button></div></div>`,{numDown:()=>{i.number=(i.number+99)%100,this.create()},numUp:()=>{i.number=(i.number+1)%100,this.create()},start:()=>{e.career=bm({player:i,clubId:i.clubId,difficulty:i.difficulty,quarterLength:i.quarterLength}),this.draft=null,e.saveCareer(),this.tab="table",this.lg=null,this.hub(),t.sfx("uiReward",.4)},back:()=>{this.draft=null,t.mainMenu()}});c.querySelector("#cname").addEventListener("input",l=>{i.name=l.target.value.trim().slice(0,16)||"Rookie"}),c.querySelectorAll("[data-arch]").forEach(l=>l.addEventListener("click",()=>{i.archetype=l.dataset.arch,t.sfx("uiClick"),this.create()})),c.querySelectorAll("[data-club]").forEach(l=>l.addEventListener("click",()=>{i.clubId=l.dataset.club,t.sfx("uiClick"),this.create()})),c.querySelectorAll("[data-sw]").forEach(l=>l.querySelectorAll(".sw").forEach(h=>h.addEventListener("click",()=>{i.look[l.dataset.sw]=h.dataset.c,l.querySelectorAll(".sw").forEach(d=>d.classList.toggle("on",d===h)),t.sfx("uiClick",.3)}))),t.bindChoices(c,(l,h)=>{l==="style"?i.look.style=Number(h):i[l]=h})}hub(t){let e=this.s,i=this.app,n=this.c;if(!n){this.create();return}t&&(this.tab=t),e.current="career",i.hud.show(!1);let r=ln(n),a=Fe[r.tier],o=n.player,c=kr(o.attrs),l=li[o.archetype]||li.slasher,h=Ua(n),d=n.log.slice(-5).map(m=>`<span class="${Im(m.rating)}" title="${m.won?"W":"L"} ${m.my}-${m.their}">${m.rating.toFixed(1)}</span>`).join(""),u;if(h){let m=h.home?r:h.opp,p=h.home?h.opp:r,v=Fe[m.tier].venue==="arena"?"City Arena":"Neighborhood Gym";u=`<div class="comp">${ae(a.name)} \xB7 Season ${n.season} \xB7 Round ${h.round+1}/${Gs}</div>
        <div class="fixture"><div class="side">${hi(m,72)}${ae(m.name)}</div><div class="v">VS</div><div class="side">${hi(p,72)}${ae(p.name)}</div></div>
        <div class="venue">${h.home?"Home":"Away"} \xB7 ${ae(v)} \xB7 ${ae(Ku(c,r))}</div>
        <div class="actions mid" style="margin-top:0"><button class="btn xl primary" data-act="play">${Ft("play",30)} Play</button></div>
        <div class="actions mid" style="margin-top:var(--s2)"><button class="btn sm ghost" data-act="sim">${Ft("forward",16)} Simulate game</button></div>`}else{let m=Qu(n);u=`<div class="comp">Season ${n.season} complete</div>
        <div class="result-word ${m.pos===1?"win":""}" style="font-size:48px">${td(m.pos)} place</div>
        <div class="venue" style="margin-top:var(--s2)">${ae(m.club.name)} \xB7 ${m.av.wins}-${m.av.gp-m.av.wins} in your games \xB7 average rating ${m.av.rating.toFixed(1)}</div>
        ${m.awards.length?`<div class="trophies" style="justify-content:center;margin-bottom:var(--s3)">${m.awards.map(p=>`<span class="badge gold">${Ft("trophy",14)} ${ae(p)}</span>`).join("")}</div>`:""}
        <div class="actions mid" style="margin-top:0"><button class="btn xl primary" data-act="season">${Ft("play",30)} Season ${n.season+1}</button></div>`}let f=n.offers.length,g=[["table","Table","list"],["games","Games","chart"],["offers",`Offers${f?` (${f})`:""}`,"mail"],["train",`Training${n.points?` (${n.points})`:""}`,"up"],["stats","Stats","star"],["news","News","whistle"]],x=e.show(`
      <div class="topbar">
        <div class="who">${hi(r,56)}<div><h1>${ae(o.name)}</h1><div class="sub">#${o.number} \xB7 ${ae(l.name)} (${l.pos}) \xB7 age ${o.age} \xB7 ${ae(r.name)} \xB7 ${ae(a.name)}</div></div></div>
        <div class="lvl" title="Overall rating and reputation"><div class="ring">${c}</div><div><div class="small muted" style="font-weight:800;letter-spacing:1px">REPUTATION ${Math.round(n.rep)}</div><div class="bar gold"><i style="width:${Math.round(n.rep)}%"></i></div></div></div>
        ${f?`<button class="badge gold pulse" data-act="offersTab" style="cursor:pointer">${Ft("mail",14)} ${f} offer${f>1?"s":""}</button>`:""}
        ${n.points?`<button class="badge cyan" data-act="trainTab" style="cursor:pointer">${Ft("up",14)} ${n.points} skill point${n.points>1?"s":""}</button>`:""}
      </div>
      <div class="hub-main">
        <div class="panel next">${u}${d?`<div class="h-sec" style="margin-top:var(--s4)">Last games \xB7 rating</div><div class="form-dots" style="justify-content:center">${d}</div>`:""}</div>
        <div class="panel tabs-panel">
          <div class="tabs">${g.map(([m,p,v])=>`<button class="tab ${m===this.tab?"on":""}" data-tab="${m}">${Ft(v,16)} ${p}</button>`).join("")}</div>
          <div class="tab-body">${this.tabBody(this.tab)}</div>
        </div>
      </div>
      <div class="row" style="justify-content:space-between;flex-wrap:wrap">
        <button class="btn ghost" data-act="menu">${Ft("home",18)} Main menu</button>
        <span class="small muted">Contract: ${n.contract.years} season${n.contract.years===1?"":"s"} \xB7 ${Nc(n.contract.salary)} a season \xB7 career earnings ${Nc(n.earnings)}</span>
        <span class="retire"><button class="btn sm ghost" data-act="retire">Retire</button></span>
      </div>`,{play:()=>this.play(),sim:()=>this.simulate(),season:()=>this.seasonEnd(),offersTab:()=>this.hub("offers"),trainTab:()=>this.hub("train"),menu:()=>e.mainMenu(),retire:m=>{m.closest(".retire").innerHTML='<span class="small" style="font-weight:800">End this career?</span> <button class="btn sm" data-yes>Yes, retire</button> <button class="btn sm ghost" data-no>No</button>';let p=x.querySelector(".retire");p.querySelector("[data-yes]").addEventListener("click",()=>{i.career=null,i.saveCareer(),e.sfx("uiConfirm"),e.mainMenu()}),p.querySelector("[data-no]").addEventListener("click",()=>{e.sfx("uiClick"),this.hub()})}},"screen hub");x.querySelectorAll(".tab").forEach(m=>m.addEventListener("click",()=>{e.sfx("uiClick",.3),this.hub(m.dataset.tab)})),this.bindTab(x)}tabBody(t){let e=this.c,i=this.s,n=ln(e);if(t==="table"){let r=this.lg||n.tier,a=Lc(e,r).map((o,c)=>`<tr class="${o.club.id===n.id?"me":""}"><td class="n">${c+1}</td><td><span class="club-chip">${hi(o.club,22)} ${ae(o.club.name)}</span></td><td class="n">${o.w}</td><td class="n">${o.l}</td><td class="n">${o.pf-o.pa>0?"+":""}${o.pf-o.pa}</td></tr>`).join("");return`${i.seg("lg",[[3,"City"],[2,"National"],[1,"Premier"]],r)}
        <table class="t" style="margin-top:var(--s3)"><thead><tr><th class="n">#</th><th>${ae(Fe[r].name)}</th><th class="n">W</th><th class="n">L</th><th class="n">+/-</th></tr></thead><tbody>${a}</tbody></table>`}if(t==="games")return e.log.length?`<table class="t"><thead><tr><th class="n">Rd</th><th>Opponent</th><th>Result</th><th class="n">PTS</th><th class="n">Rating</th></tr></thead><tbody>${[...e.log].reverse().map(a=>{let o=ti(a.opp);return`<tr><td class="n">${a.round+1}</td><td><span class="club-chip">${a.home?"v":"@"} ${hi(o,20)} ${ae(o.name)}</span></td><td><b style="color:${a.won?"var(--success)":"var(--danger)"}">${a.won?"W":"L"}</b> ${a.my}-${a.their}</td><td class="n">${a.line?a.line.pts:"-"}</td><td class="n"><b>${a.rating.toFixed(1)}</b>${a.sim?' <span class="small muted">sim</span>':""}</td></tr>`}).join("")}</tbody></table>`:'<p class="small muted">No games yet this season.</p>';if(t==="offers"){let r=e.offers.map(l=>{let h=ti(l.clubId);return`<div class="card offer"><div class="row">${hi(h,52)}<div style="flex:1;min-width:0"><b class="club-chip">${ae(h.name)}</b><div class="small muted" style="margin-top:4px">${ae(Fe[h.tier].name)} \xB7 team rating ${h.strength}</div>
          <div class="small" style="margin-top:6px;font-weight:800">${l.years} season${l.years>1?"s":""} \xB7 ${Nc(l.salary)} a season \xB7 ${ae(Ku(kr(e.player.attrs),h))}</div>
          <div class="small muted">Expires after round ${Math.min(Gs,l.expires)}</div></div></div>
          <div class="actions" style="margin-top:var(--s3)"><button class="btn primary sm" data-accept="${l.id}">${Ft("check",16)} Sign</button><button class="btn ghost sm" data-decline="${l.id}">Decline</button></div></div>`}).join(""),a=Un.filter(l=>(e.interest[l.id]||0)>5&&l.id!==n.id).sort((l,h)=>(e.interest[h.id]||0)-(e.interest[l.id]||0)).slice(0,4),o=a.length?`<div class="h-sec">Scouting interest</div>${a.map(l=>`<div class="attr" style="grid-template-columns:minmax(0,1.4fr) 1fr 36px"><span class="club-chip">${hi(l,22)} ${ae(l.name)}</span><div class="bar gold"><i style="width:${Math.min(100,e.interest[l.id])}%"></i></div><b>${Math.min(100,e.interest[l.id])}</b></div>`).join("")}`:"",c=n.tier>1?`Clubs in the ${Fe[n.tier-1].name} start watching from reputation ${Fe[n.tier-1].minRep} (you have ${Math.round(e.rep)}).`:"You are in the Premier League: the strongest clubs still want stars.";return`${r||`<p class="small muted">No offers yet. Scouts from bigger clubs watch your games: match ratings above about ${Fe[Math.max(1,n.tier-1)].need.toFixed(1)} get them interested. ${c}</p>`}${o}`}if(t==="train"){let r=rs.map(a=>{let o=e.player.attrs[a],c=qu(o);return`<div class="attr"><span>${Ea[a]}</span><div class="bar ${o>=85?"good":""}"><i style="width:${o}%"></i></div><b>${o}</b><button class="btn sm" data-train="${a}" ${e.points<c||o>=99?"disabled":""} title="Costs ${c} point${c>1?"s":""}">+</button></div>`}).join("");return`<div class="row" style="justify-content:space-between"><span class="badge cyan">${e.points} skill point${e.points===1?"":"s"}</span><span class="small muted">Overall ${kr(e.player.attrs)} \xB7 higher ratings cost more</span></div>${r}
        <div class="small muted" style="margin-top:var(--s2)">Shooting widens the green, Ball handling speeds the dribble and beats steals, Speed is your pace, Defense wins steals and blocks, Passing makes passes sharper, Vertical is your jump.</div>`}if(t==="stats"){let r=Ju(e),a=e.totals,o=(l,h)=>`<div class="mini"><b>${l}</b><span>${h}</span></div>`,c=e.history.map(l=>{let h=ti(l.clubId);return`<tr><td class="n">${l.season}</td><td><span class="club-chip">${hi(h,20)} ${ae(h.short)}</span></td><td class="n">${td(l.pos)}</td><td class="n">${l.ppg.toFixed(1)}</td><td class="n">${l.rating.toFixed(1)}</td><td>${l.awards.map(d=>`<span class="badge gold" style="font-size:10px">${ae(d)}</span>`).join(" ")}</td></tr>`}).join("");return`<div class="h-sec">Season ${e.season}</div>
        <div class="mini-stats">${o(r.gp,"Games")}${o(r.ppg.toFixed(1),"Points")}${o(r.rpg.toFixed(1),"Rebounds")}${o(r.apg.toFixed(1),"Assists")}${o(r.rating?r.rating.toFixed(1):"-","Avg rating")}${o(`${r.wins}-${r.gp-r.wins}`,"Record")}</div>
        <div class="h-sec">Career</div>
        <div class="mini-stats">${o(a.gp,"Games")}${o(a.pts,"Points")}${o(a.fga?`${Math.round(a.fgm/a.fga*100)}%`:"-","FG%")}${o(a.reb+"/"+a.ast,"Reb / Ast")}</div>
        ${c?`<table class="t" style="margin-top:var(--s3)"><thead><tr><th class="n">Season</th><th>Club</th><th class="n">Pos</th><th class="n">PPG</th><th class="n">Rtg</th><th>Awards</th></tr></thead><tbody>${c}</tbody></table>`:""}`}return`<div class="timeline" style="max-height:340px">${e.news.map(r=>`<div>${r.kind==="offer"?Ft("mail",14)+" ":r.kind==="scout"?Ft("eye",14)+" ":""}<b class="small muted">S${r.season} R${Math.min(Gs,r.round+1)}</b> ${ae(r.text)}</div>`).join("")}</div>`}bindTab(t){let e=this.c,i=this.s,n=this.app;i.bindChoices(t,(r,a)=>{r==="lg"&&(this.lg=Number(a),this.hub("table"))}),t.querySelectorAll("[data-train]").forEach(r=>r.addEventListener("click",()=>{Rm(e,r.dataset.train)?(n.saveCareer(),i.sfx("uiReward",.25),this.hub("train")):i.sfx("uiError",.3)})),t.querySelectorAll("[data-accept]").forEach(r=>r.addEventListener("click",()=>{let a=e.offers.find(c=>c.id===Number(r.dataset.accept));if(!a)return;let o=ti(a.clubId);Tm(e,a.id)&&(n.saveCareer(),i.sfx("uiReward",.45),this.lg=null,this.hub("table"),i.toast(`Welcome to ${o.name}!`,"good"))})),t.querySelectorAll("[data-decline]").forEach(r=>r.addEventListener("click",()=>{Am(e,Number(r.dataset.decline))&&(n.saveCareer(),i.sfx("uiClick"),this.hub("offers"))}))}play(){let t=this.c,e=this.app,i=Ua(t);if(!i)return;let n=ln(t),r=i.home?n:i.opp,a=i.home?i.opp:n;e.startGame({format:"full",size:5,career:!0,homeTeam:r,awayTeam:a,humanSide:i.home?0:1,player:{...t.player,attrs:{...t.player.attrs}},difficulty:t.difficulty,length:t.quarterLength,venue:Fe[r.tier].venue,title:`${Fe[n.tier].name} \xB7 Season ${t.season} \xB7 Round ${i.round+1}`})}simulate(){let t=this.c,e=Em(t,this.quarter());this.app.saveCareer(),e&&this.report(e,null)}result(t){let e=this.app,i=this.c;if(e.input.active=!1,e.input.exitLock(),e.hud.show(!1),!i){this.s.mainMenu();return}let n=t.match,r=n.human;if(!t.careerSum){let a=(n.quarterLen*4+Math.max(0,n.period-4)*n.otLen)/60;t.careerSum=ju(i,{my:n.teams[r.team].score,their:n.teams[1-r.team].score,line:n.stats.of(r),minutes:a},n.quarterLen),e.saveCareer();let o=e.records;o.games++,o.points+=n.stats.of(r).pts,t.careerSum&&t.careerSum.won?o.wins++:o.losses++,e.saveRecords()}this.report(t.careerSum,t)}report(t,e){let i=this.s,n=this.c,r=this.app;if(i.current="careerResult",!t){this.hub();return}let a=ln(n),o=e?e.match.stats.of(e.match.human):null,c=(f,g)=>`<div class="mini"><b>${f}</b><span>${g}</span></div>`,l=t.newOffers.map(f=>{let g=ti(f.clubId);return`<div class="tip"><b>${Ft("mail",14)} Offer from ${ae(g.name)}</b>${ae(Fe[g.tier].name)} \xB7 ${f.years} season${f.years>1?"s":""} \xB7 ${Nc(f.salary)} a season</div>`}).join(""),h=t.notes.map(f=>`<div class="tip"><b>${Ft("eye",14)} Scouts</b>${ae(f)}</div>`).join(""),d=(t.opp,a),u=i.show(`<div class="panel result report">
      <div class="small muted r-title" style="font-weight:800;text-transform:uppercase;letter-spacing:1px">Season ${t.season} \xB7 Round ${t.round}${t.sim?" \xB7 simulated":""}</div>
      <div class="result-word ${t.won?"win":"loss"}">${t.won?"Win!":"Defeat"}</div>
      <div class="scoreline"><div class="side">${hi(d,52)}${ae(d.short)}</div><div class="sc">${t.my} - ${t.their}</div><div class="side">${hi(t.opp,52)}${ae(t.opp.short)}</div></div>
      <div class="rating-hero"><span class="lab">Match rating</span><span class="num ${Im(t.rating)}">${t.rating.toFixed(1)}</span></div>
      ${o?`<div class="key-stats">${c(o.pts,"Points")}${c(`${o.fgm}/${o.fga}`,"Field goals")}${c(`${o.oreb+o.dreb}/${o.ast}`,"Reb / Ast")}</div>`:""}
      <div class="trophies" style="justify-content:center;margin:var(--s2) 0">
        <span class="badge cyan">${Ft("up",14)} +${t.pts} skill point${t.pts>1?"s":""}</span>
        <span class="badge ${t.repDelta>=0?"good":"bad"}">Reputation ${t.repDelta>=0?"+":""}${t.repDelta.toFixed(1)} (${Math.round(t.rep)})</span>
      </div>
      ${l||h?`<div class="tips" style="text-align:left">${l}${h}</div>`:""}
      <div class="actions mid">
        <button class="btn primary lg" data-act="go">${Ft("play")} ${n.seasonOver?"Season review":"Continue"}</button>
        ${e?`<button class="btn ghost sm" data-act="box">${Ft("chart",16)} Box score</button>`:""}
      </div>
      <div class="more" hidden></div>
    </div>`,{go:()=>{e&&r.endSession(),this.hub(t.newOffers.length?"offers":n.points>=3?"train":"table")},box:f=>{let g=u.querySelector(".more");if(g.hidden&&!g.innerHTML){let x=e.match,m=x.human,p=v=>{let S=x.stats.of(v);return`<tr class="${v===m?"me":""}"><td>${ae(x.teams[v.team].short)}</td><td>#${v.number} ${ae(v.name)}</td><td>${S.pts}</td><td>${S.fgm}/${S.fga}</td><td>${S.tpm}/${S.tpa}</td><td>${S.oreb+S.dreb}</td><td>${S.ast}</td><td>${S.stl}</td><td>${S.blk}</td><td>${S.tov}</td></tr>`};g.innerHTML=`<table class="box"><thead><tr><th></th><th>Player</th><th>PTS</th><th>FG</th><th>3PT</th><th>REB</th><th>AST</th><th>STL</th><th>BLK</th><th>TO</th></tr></thead><tbody>${x.players.map(p).join("")}</tbody></table>`}g.hidden=!g.hidden,f.innerHTML=`${Ft("chart",16)} ${g.hidden?"Box score":"Hide"}`}});i.sfx(t.won?"uiReward":"uiConfirm",.4)}seasonEnd(){let t=this.s,e=this.c,i=this.app;t.current="careerSeason";let n=Cm(e);i.saveCareer();let r=n.champions.map(a=>`<div class="tip"><b class="club-chip">${hi(a.club,22)} ${ae(a.club.name)}</b>${ae(Fe[a.tier].name)} champions</div>`).join("");t.show(`<div class="panel result"><div class="small muted" style="font-weight:800;text-transform:uppercase;letter-spacing:1px">Season ${n.season} review</div>
      <div class="result-word ${n.pos===1?"win":""}">${td(n.pos)} place</div>
      <div class="scorers" style="margin:var(--s2) 0">${ae(n.club.name)} \xB7 ${ae(Fe[n.club.tier].name)}</div>
      <div class="key-stats"><div class="mini"><b>${n.av.gp}</b><span>Games</span></div><div class="mini"><b>${n.av.ppg.toFixed(1)}</b><span>Points</span></div><div class="mini"><b>${n.av.rating.toFixed(1)}</b><span>Avg rating</span></div></div>
      ${n.awards.length?`<div class="trophies" style="justify-content:center;margin-bottom:var(--s3)">${n.awards.map(a=>`<span class="badge gold">${Ft("trophy",14)} ${ae(a)}</span>`).join("")}</div>`:""}
      <div class="tips" style="text-align:left">${r}</div>
      ${e.offers.length?`<div class="small" style="margin-top:var(--s3);font-weight:800;color:var(--primary)">${e.offers.length} club${e.offers.length>1?"s want":" wants"} to sign you for next season.</div>`:""}
      <div class="actions mid"><button class="btn primary lg" data-act="go">${Ft("play")} Season ${e.season}</button></div></div>`,{go:()=>this.hub(e.offers.length?"offers":"table")}),t.sfx("uiReward",.4)}};var Be=s=>String(s).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),W_=`<svg class="logo-ball" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46" fill="#ff7a1a" stroke="#070b1d" stroke-width="6"/>
  <path d="M50 4v92M4 50h92" stroke="#070b1d" stroke-width="5" fill="none"/>
  <path d="M20 13c14 12 14 62 0 74M80 13c-14 12-14 62 0 74" stroke="#070b1d" stroke-width="5" fill="none"/></svg>`,$_=["Crop","Afro","Buzz","Headband","Braids","Bald"];function hi(s,t=48){let[e,i]=s.colors;return`<svg class="crest" width="${t}" height="${t}" viewBox="0 0 48 48" aria-hidden="true"><path d="M24 3 42 9v14c0 11-8 19-18 22C14 42 6 34 6 23V9z" fill="${e}" stroke="#070b1d" stroke-width="3"/>
    <path d="M6 23h36" stroke="${i}" stroke-width="3"/><circle cx="24" cy="23" r="9" fill="${i}" stroke="#070b1d" stroke-width="2.5"/>
    <text x="24" y="27.5" text-anchor="middle" font-family="Arial Black, Arial" font-weight="900" font-size="12" fill="${e}">${Be(s.short[0])}</text></svg>`}var kc=class{constructor(t){this.app=t,this.root=document.createElement("div"),this.root.className="screens",t.uiRoot.appendChild(this.root),this.current=null,this.lastShown=null,this.setup={format:"3v3",home:"harbor",away:"mesa",venue:"arena"},this.career=new Dc(this);let e=null,i=0;this.root.addEventListener("pointerover",n=>{if(n.pointerType!=="mouse")return;let r=n.target.closest(".btn:not(:disabled), .card.pick, .tab, .opt, .sw");if(!r||r===e)return;e=r;let a=performance.now();a-i>60&&(i=a,this.sfx("uiHover",.12))})}sfx(t,e=.4){this.app.audio.play(t,{gain:e})}show(t,e={},i="screen center dim"){let n=this.current&&this.current===this.lastShown;this.lastShown=this.current,n||this.sfx("uiSwoosh",.18),this.root.innerHTML=`<div class="${i}">${t}</div>`;let r=this.root.firstChild;return n&&r.querySelectorAll(":scope > *").forEach(a=>{a.style.animation="none"}),r.querySelectorAll("[data-act]").forEach(a=>{let o=e[a.dataset.act];o&&a.addEventListener("click",c=>{c.preventDefault(),!a.disabled&&(this.sfx(a.classList.contains("primary")?"uiConfirm":"uiClick",a.classList.contains("primary")?.35:.4),o(a,c))})}),r}clear(){this.root.innerHTML="",this.current=null,this.lastShown=null}toast(t,e=!1,i=3200){let n=document.createElement("div");n.className="toast"+(e===!0?" bad":e==="good"?" good":""),n.textContent=t,this.app.uiRoot.appendChild(n),e===!0&&this.sfx("uiError",.35),setTimeout(()=>n.remove(),i)}seg(t,e,i){return`<div class="seg" data-key="${t}">${e.map(([n,r])=>`<button class="opt ${String(i)===String(n)?"on":""}" data-v="${n}">${r}</button>`).join("")}</div>`}bindChoices(t,e){t.querySelectorAll(".seg").forEach(i=>i.querySelectorAll(".opt").forEach(n=>n.addEventListener("click",()=>{i.querySelectorAll(".opt").forEach(a=>a.classList.remove("on")),n.classList.add("on"),this.sfx("uiClick",.35);let r=n.dataset.v;r==="true"?r=!0:r==="false"&&(r=!1),e(i.dataset.key,r,n)})))}slider(t,e,i,n,r,a){let o=(r-e)/(i-e)*100;return`<div class="slider"><input class="range" type="range" id="${t}" min="${e}" max="${i}" step="${n}" value="${r}" style="--p:${o}%"></div><span class="val" id="v-${t.slice(2)}">${a}</span>`}mainMenu(){this.current="menu";let t=this.app;t.hud.show(!1);let e=t.records,i=t.profile,n=li[i.archetype]||li.slasher,r=e.games?`${e.wins}-${e.losses} record`:"Two baskets, four quarters",a=t.settings.teamSize||5,o=t.career,c=o?`${Be(o.player.name)} \xB7 ${Be(this.career.clubName())}`:"Create your player";this.show(`
      <div class="menu-inner">
        <div class="menu-head">
          <div class="logo">${W_}<div class="logo-text">Court<em>side</em></div></div>
          <div class="tagline">First-person basketball. Your eyes. Your handles. Your shot.</div>
        </div>
        <div class="menu-actions col">
          <div class="menu-play"><button class="btn xl primary" data-act="play">${Ft("play",36)}<span class="stack">Play ${a}v${a}<small>Full court \xB7 ${Be(r)}</small></span></button></div>
          <div class="menu-row">
            <button class="btn lg" data-act="career">${Ft("trophy")}<span class="stack">Career<small>${c}</small></span></button>
            <button class="btn lg" data-act="half">${Ft("user")}<span class="stack">Half Court<small>3x3 \xB7 1v1</small></span></button>
          </div>
          <div class="menu-row">
            <button class="btn" data-act="practice">${Ft("cone",20)} Practice</button>
            <button class="btn" data-act="player">${Ft("star",20)} My Player<small style="margin:0 0 0 6px">#${Be(i.number)} ${Be(n.name)}</small></button>
          </div>
          <div class="menu-icons">
            <button class="btn sm" data-act="settings">${Ft("gear",18)} Settings</button>
            <button class="btn sm" data-act="help">${Ft("help",18)} How to Play</button>
            <button class="btn sm" data-act="style">${Ft("brush",18)} Visual Style</button>
          </div>
        </div>
      </div>`,{play:()=>this.gameSetup("full"),half:()=>this.gameSetup(this.setup.half||"3v3"),career:()=>t.career?this.career.hub():this.career.create(),practice:()=>this.practiceMenu(),player:()=>this.myPlayer(),settings:()=>this.settings(),help:()=>this.howTo(),style:()=>this.styleMenu()},"screen menu")}gameSetup(t){this.current="setup";let e=this.app,i=this.setup,n=t==="full";i.format=t,n||(i.half=t),i.home===i.away&&(i.away=ci[(ci.findIndex(g=>g.id===i.home)+1)%ci.length].id);let r=g=>{let x=Wi(i[g]);return`<div class="card team-pick">
        <div class="small muted" style="font-weight:800;text-transform:uppercase;letter-spacing:1px">${g==="home"?"Your team":"Opponent"}</div>
        ${hi(x,72)}
        <div class="tp-name">${Be(x.name)}</div>
        <div class="tp-tier">Team rating ${x.strength}</div>
        <div class="row"><button class="btn sm icon" data-act="${g}Prev" aria-label="Previous">${Ft("left",18)}</button><button class="btn sm icon" data-act="${g}Next" aria-label="Next">${Ft("right",18)}</button></div>
      </div>`},a=(g,x)=>{let m=ci.findIndex(p=>p.id===i[g]);do m=(m+x+ci.length)%ci.length;while(ci[m].id===i[g==="home"?"away":"home"]);i[g]=ci[m].id,this.gameSetup(t)},o=ss[e.settings.gameLength]||ss.normal,c=e.settings.teamSize||5,l=n?"Full Court":"Half Court",h=n?"Two baskets, four quarters. 24-second shot clock, 8 seconds to get it over half court, throw-ins after baskets. Teams switch ends at half time.":t==="1v1"?"You against their best player. Half court, make your own shots.":"Half court, FIBA 3x3 style: check ball, clear it after a steal or rebound, 14-second shot clock.",d=n?`<div class="set"><span class="lab">Players</span>${this.seg("teamSize",[[5,"5v5"],[4,"4v4"],[3,"3v3"]],c)}</div>
         <div class="set"><span class="lab">Quarters</span>${this.seg("quarterLength",Object.entries(Mn).map(([g,x])=>[g,x.label]),e.settings.quarterLength)}</div>`:`<div class="set"><span class="lab">Format</span>${this.seg("format",[["3v3","3v3"],["1v1","1v1"]],t)}</div>
         <div class="set"><span class="lab">Game</span>${this.seg("gameLength",Object.entries(ss).map(([g,x])=>[g,x.label]),e.settings.gameLength)}</div>`,u=n?"Higher score after four quarters wins; a tie goes to overtime. Inside the arc 2, outside 3.":`${t==="1v1"?`1v1 is played to ${Math.min(11,o.target)}.`:`First to ${o.target} or the higher score at the buzzer.`} Inside the arc 2, outside 3.`,f=this.show(`<div class="panel wide"><div class="h-title">${l}</div>
      <p class="lead">${h}</p>
      <div class="vs">${r("home")}<div class="vs-mid">VS</div>${r("away")}</div>
      <div class="set"><span class="lab">Venue</span>${this.seg("venue",[["arena",Ns.arena.name],["gym",Ns.gym.name]],i.venue)}</div>
      <div class="set"><span class="lab">Difficulty</span>${this.seg("difficulty",Object.entries(Vs).map(([g,x])=>[g,x.label]),e.settings.difficulty)}</div>
      ${d}
      <div class="small muted" style="margin-top:6px">${u}</div>
      <div class="actions"><button class="btn primary lg" data-act="go">${Ft("play")} Tip off</button><button class="btn ghost" data-act="back">Back</button></div></div>`,{homePrev:()=>a("home",-1),homeNext:()=>a("home",1),awayPrev:()=>a("away",-1),awayNext:()=>a("away",1),go:()=>e.startGame({format:i.format,home:i.home,away:i.away,venue:i.venue}),back:()=>this.mainMenu()});this.bindChoices(f,(g,x)=>{if(g==="venue"){i.venue=x;return}if(g==="format"){this.gameSetup(x);return}e.settings[g]=g==="teamSize"?Number(x):x,e.applySettings(),e.commitSettings(),g==="teamSize"&&this.gameSetup(t)})}myPlayer(){this.current="player";let t=this.app,e=t.profile,i=li[e.archetype]||li.slasher,n=(o,c,l)=>`<div class="swatches" data-sw="${o}">${c.map(h=>`<button class="sw ${h===l?"on":""}" data-c="${h}" style="background:${h}" aria-label="${h}"></button>`).join("")}</div>`,r=Object.entries(i.attrs).map(([o,c])=>`<div class="attr" style="grid-template-columns:110px 1fr 36px"><span>${Ea[o]}</span><div class="bar ${c>=85?"good":""}"><i style="width:${c}%"></i></div><b>${c}</b></div>`).join(""),a=this.show(`<div class="panel wide"><div class="h-title">My Player</div>
      <div class="grid2">
        <div>
          <div class="h-sec">Name &amp; number</div>
          <input class="field" id="pname" maxlength="16" value="${Be(e.name)}" placeholder="Your name">
          <div class="stepper" style="margin-top:var(--s3)"><button class="btn sm icon" data-act="numDown" aria-label="Lower number">${Ft("minus",18)}</button><span class="pv">#${e.number}</span><button class="btn sm icon" data-act="numUp" aria-label="Higher number">${Ft("plus",18)}</button></div>
          <div class="h-sec">Look</div>
          <div class="set"><span class="lab">Skin</span>${n("skin",hs.SKIN,e.look.skin)}</div>
          <div class="set"><span class="lab">Hair</span>${n("hair",hs.HAIR,e.look.hair)}</div>
          <div class="set"><span class="lab">Style</span>${this.seg("style",$_.map((o,c)=>[c,o]),e.look.style||0)}</div>
          <div class="set"><span class="lab">Shoes</span>${n("shoes",hs.SHOES,e.look.shoes)}</div>
        </div>
        <div>
          <div class="h-sec">Play style</div>
          <div class="choices">${Object.values(li).map(o=>`<button class="card pick choice ${o.id===i.id?"on":""}" data-arch="${o.id}"><b>${o.name} \xB7 ${o.pos}</b><span>${o.desc}</span></button>`).join("")}</div>
          <div class="h-sec">Attributes</div>
          ${r}
        </div>
      </div>
      <div class="actions"><button class="btn primary lg" data-act="done">Done</button></div></div>`,{numDown:()=>{e.number=(e.number+99)%100,this.myPlayer()},numUp:()=>{e.number=(e.number+1)%100,this.myPlayer()},done:()=>{t.saveProfile(),this.mainMenu()}});a.querySelector("#pname").addEventListener("input",o=>{e.name=o.target.value.trim().slice(0,16)||"You"}),a.querySelectorAll("[data-arch]").forEach(o=>o.addEventListener("click",()=>{e.archetype=o.dataset.arch,this.sfx("uiClick"),t.saveProfile(),this.myPlayer()})),a.querySelectorAll("[data-sw]").forEach(o=>o.querySelectorAll(".sw").forEach(c=>c.addEventListener("click",()=>{e.look[o.dataset.sw]=c.dataset.c,o.querySelectorAll(".sw").forEach(l=>l.classList.toggle("on",l===c)),this.sfx("uiClick",.3)}))),this.bindChoices(a,(o,c)=>{o==="style"&&(e.look.style=Number(c))})}practiceMenu(){this.current="practice";let t=this.app,e=t.records,i=(n,r,a,o,c="")=>`<button class="card pick choice" data-act="${n}" style="min-height:120px">${Ft(r,28)}<b>${a} ${c}</b><span>${o}</span></button>`;this.show(`<div class="panel mid"><div class="h-title">Practice</div>
      <div class="choices" style="grid-template-columns:repeat(auto-fill,minmax(180px,1fr))">
        ${i("drills","whistle","Practice Court","Coach Mo walks you through dribbling, crossovers, shooting, layups and dunks, passing, stance, steals and blocks.",e.practiceDone?'<span class="badge good">done</span>':'<span class="badge gold pulse">start here</span>')}
        ${i("shootout","trophy","Shootout","60 seconds to score as much as you can. The gold hot spot doubles a make.",e.bestShootout?`<span class="badge cyan">best ${e.bestShootout}</span>`:"")}
        ${i("free","ball","Free Shootaround","No clock. Find your range; a rebounder feeds you.")}
      </div>
      <div class="actions"><button class="btn ghost" data-act="back">Back</button></div></div>`,{drills:()=>t.startPractice("drills"),shootout:()=>t.startPractice("shootout"),free:()=>t.startPractice("free"),back:()=>this.mainMenu()})}practiceResult(t){let e=this.app;e.input.active=!1,e.input.exitLock(),e.hud.show(!1),this.current="presult";let i=t.cfg.practice.summary(),n="",r="Nice work!";if(i.kind==="drills")e.records.practiceDone=!0,r=i.done===i.total?"Drills done!":"Session over",n=`<div class="stars">${Array.from({length:i.total},(a,o)=>`<i class="${o<i.stars?"":"off"}" style="animation-delay:${o*.07}s">\u2605</i>`).join("")}</div>
        <div class="small muted" style="margin:6px 0 var(--s3)">${i.done}/${i.total} drills completed \xB7 a star for each under par</div>
        <div class="tips">${i.rows.map(a=>`<div class="tip"><b>${a.done?a.star?"\u2605 ":"\u2713 ":"\u2013 "}${Be(a.say)}</b>${a.done?`${a.t.toFixed(1)} s`:"skipped"}</div>`).join("")}</div>`;else{let a=e.records.bestShootout||0,o=i.kind==="shootout"&&i.points>a;o&&(e.records.bestShootout=i.points),r=i.kind==="shootout"?o?"New best!":"Time!":"Good session",n=`<div class="rating-hero"><span class="lab">${i.kind==="shootout"?"Points":"Made"}</span><span class="num ${o?"hi":""}">${i.kind==="shootout"?i.points:i.made}</span></div>
        <div class="key-stats"><div class="mini"><b>${i.made}/${i.att}</b><span>Made</span></div><div class="mini"><b>${i.att?Math.round(i.made/i.att*100):0}%</b><span>Accuracy</span></div><div class="mini"><b>${e.records.bestShootout||0}</b><span>Best</span></div></div>`}e.saveRecords(),this.show(`<div class="panel result"><div class="small muted" style="font-weight:800;text-transform:uppercase;letter-spacing:1px">${Be(i.title)}</div>
      <div class="result-word win">${r}</div>${n}
      <div class="actions mid"><button class="btn primary lg" data-act="again">${Ft("play")} Again</button><button class="btn" data-act="practice">Practice</button><button class="btn ghost" data-act="menu">Main menu</button></div></div>`,{again:()=>{let a=i.kind;e.endSession(),e.startPractice(a)},practice:()=>{e.endSession(),this.practiceMenu()},menu:()=>{e.endSession(),this.mainMenu()}}),this.sfx("uiReward",.4)}careerHub(t){this.career.hub(t)}careerResult(t){this.career.result(t)}result(t){let e=this.app;e.input.active=!1,e.input.exitLock(),e.hud.show(!1),this.current="result";let i=t.match,n=i.human,r=i.stats.report(n),a=r.stats,o=r.score[n.team],c=r.score[1-n.team],l=o>c?"win":o<c?"loss":"draw";if(!t.committed){t.committed=!0;let p=e.records;p.games++,p.points+=a.pts,l==="win"?p.wins++:l==="loss"&&p.losses++,e.saveRecords()}let h={win:"You win!",loss:"Defeat",draw:"Draw"}[l],d=Wi(i.teams[0].id),u=Wi(i.teams[1].id),f=(p,v)=>`<div class="mini"><b>${p}</b><span>${v}</span></div>`,g=p=>p==null?"-":`${p}%`,x=p=>{let v=i.stats.of(p);return`<tr class="${p===n?"me":""}"><td>${Be(i.teams[p.team].short)}</td><td>#${p.number} ${Be(p.name)}</td><td>${v.pts}</td><td>${v.fgm}/${v.fga}</td><td>${v.tpm}/${v.tpa}</td><td>${v.oreb+v.dreb}</td><td>${v.ast}</td><td>${v.stl}</td><td>${v.blk}</td><td>${v.tov}</td></tr>`},m=this.show(`
      <div class="panel result report">
        <div class="small muted r-title" style="font-weight:800;text-transform:uppercase;letter-spacing:1px">${Be(t.cfg.title||"Final")}</div>
        <div class="result-word ${l}">${h}</div>
        <div class="r-cols">
          <div class="r-match">
            <div class="scoreline"><div class="side">${hi(d,56)}${Be(i.teams[0].name)}</div><div class="sc">${r.score[0]} - ${r.score[1]}</div><div class="side">${hi(u,56)}${Be(i.teams[1].name)}</div></div>
            <div class="scorers">Player of the game: ${r.mvp?Be(r.mvp.name):"-"}${i.inOvertime?" \xB7 overtime":""}</div>
          </div>
          <div class="r-you">
            <div class="rating-hero"><span class="lab">Your grade</span><span class="num ${/^A/.test(r.grade)?"hi":/^[DF]/.test(r.grade)?"lo":""}" id="r-num">${r.grade}</span></div>
            <div class="key-stats">${f(a.pts,"Points")}${f(`${a.fgm}/${a.fga}`,"Field goals")}${f(a.ast+a.stl+a.blk,"AST+STL+BLK")}</div>
          </div>
        </div>
        <div class="actions mid">
          <button class="btn primary lg" data-act="again">${Ft("play")} Rematch</button>
          <button class="btn" data-act="change">Change teams</button>
          <button class="btn ghost" data-act="menu">Main menu</button>
          <button class="btn ghost sm" data-act="more">${Ft("chart",16)} Box score</button>
        </div>
        <div class="more" hidden>
          <div class="mini-stats">${f(g(a.fgPct),"FG%")}${f(`${a.tpm}/${a.tpa}`,"3PT")}${f(`${a.ftm}/${a.fta}`,"FT")}${f(a.reb,"Rebounds")}${f(a.ast,"Assists")}${f(a.stl,"Steals")}${f(a.blk,"Blocks")}${f(a.tov,"Turnovers")}</div>
          <table class="box"><thead><tr><th></th><th>Player</th><th>PTS</th><th>FG</th><th>3PT</th><th>REB</th><th>AST</th><th>STL</th><th>BLK</th><th>TO</th></tr></thead><tbody>${i.players.map(x).join("")}</tbody></table>
          <div class="small muted" style="margin-top:6px;text-align:center">Possession ${r.possession[0]}% - ${r.possession[1]}% \xB7 Fouls ${r.teams[0].pf} - ${r.teams[1].pf}</div>
        </div>
      </div>`,{more:p=>{let v=m.querySelector(".more");v.hidden=!v.hidden,p.innerHTML=`${Ft("chart",16)} ${v.hidden?"Box score":"Hide"}`,v.hidden||v.scrollIntoView({behavior:"smooth",block:"nearest"})},again:()=>{e.endSession(),e.startGame(e.lastGame||{})},change:()=>{let p=(e.lastGame||{}).format||"full";e.endSession(),this.gameSetup(p)},menu:()=>{e.endSession(),this.mainMenu()}});this.sfx(l==="win"?"uiReward":"uiConfirm",.4)}styleMenu(t=!1,e=null){this.current=t?"pauseSub":"style";let i=this.app,n={};try{let a=i.session?null:{pos:[6.5,2.4,5.6],look:[12.4,2.6,0]};for(let o of["classic","neo"])n[o]=i.view.renderPreview(o,480,270,a)}catch{n={}}let r=(a,o,c)=>`<div class="card pick preview ${i.style===a?"on":""}" data-act="pick" data-s="${a}">${n[a]?`<img src="${n[a]}" alt="${o}">`:""}<h3>${o}</h3><div class="small" style="color:var(--text2);font-weight:600">${c}</div></div>`;this.show(`<div class="panel wide"><div class="h-title">Visual Style</div>
      <div class="previews">${r("classic","Classic","Ink drawing: pale colours, thin black lines.")}${r("neo","Neobrutalist","Bold colours, thick outlines, hard shadows.")}</div>
      <div class="actions"><button class="btn primary" data-act="back">Done</button></div></div>`,{pick:a=>{i.setStyle(a.dataset.s),this.styleMenu(t,e)},back:()=>{i.commitSettings(),e?e():t?this.pauseMenu():this.mainMenu()}})}settings(t=!1,e="game"){this.current=t?"pauseSub":"settings";let i=this.app,n=i.settings,r=(h,d)=>`<div class="tab-body" data-body="${h}" ${h===e?"":"hidden"}>${d}</div>`,a=(h,d)=>`<div class="set"><span class="lab">${h}</span>${d}</div>`,o=h=>this.seg(h,[[!0,"On"],[!1,"Off"]],n[h]),c=this.show(`<div class="panel mid"><div class="h-title">Settings</div>
      <div class="tabs">${[["game","Game"],["controls","Controls"],["video","Video"],["audio","Audio"]].map(([h,d])=>`<button class="tab ${h===e?"on":""}" data-tab="${h}">${d}</button>`).join("")}</div>
      ${r("game",`${a("Difficulty",this.seg("difficulty",Object.entries(Vs).map(([h,d])=>[h,d.label]),n.difficulty))}
        <div class="small muted" style="margin:-4px 0 6px">Rookie: a wider green on the meter, slower opponents. All-Star: they read your passes and close out hard.</div>
        ${a("Quarters",this.seg("quarterLength",Object.entries(Mn).map(([h,d])=>[h,d.label]),n.quarterLength))}
        ${a("Players",this.seg("teamSize",[[5,"5v5"],[4,"4v4"],[3,"3v3"]],n.teamSize))}
        ${a("Half court game",this.seg("gameLength",Object.entries(ss).map(([h,d])=>[h,d.label]),n.gameLength))}
        ${a("Shot meter",o("meter"))}`)}
      ${r("controls",`${a("Look speed",this.slider("s-sens",.2,3,.05,n.sensitivity,n.sensitivity.toFixed(2)))}
        ${a("Invert Y",this.seg("invertY",[[!1,"Off"],[!0,"On"]],n.invertY))}
        ${a("Touch controls",this.seg("touch",[["auto","Auto"],["on","On"],["off","Off"]],n.touch))}`)}
      ${r("video",`${a("Style",`<div class="row">${this.seg("style",[["classic","Classic"],["neo","Neo"]],i.style)}<button class="btn sm icon" data-act="preview" title="Preview" aria-label="Preview styles">${Ft("eye",18)}</button></div>`)}
        ${a("Quality",this.seg("quality",[["low","Low"],["medium","Medium"],["high","High"]],n.quality))}
        ${a("Field of view",this.slider("s-fov",Gu,Wu,1,n.fov,`${n.fov}\xB0`))}
        ${a("View bob",o("bob"))}
        ${a("Camera shake",o("shake"))}`)}
      ${r("audio",`${a("Master",this.slider("s-master",0,1,.05,n.master,Or(n.master)))}
        ${a("Effects",this.slider("s-sfx",0,1,.05,n.sfx,Or(n.sfx)))}
        ${a("Crowd",this.slider("s-crowd",0,1,.05,n.crowd,Or(n.crowd)))}`)}
      <div class="actions"><button class="btn primary lg" data-act="back">Done</button></div></div>`,{back:()=>{i.applySettings(),i.commitSettings(),t?this.pauseMenu():this.mainMenu()},preview:()=>{i.applySettings(),this.styleMenu(t,()=>this.settings(t,"video"))}});c.querySelectorAll(".tab").forEach(h=>h.addEventListener("click",()=>{e=h.dataset.tab,c.querySelectorAll(".tab").forEach(d=>d.classList.toggle("on",d===h)),c.querySelectorAll(".tab-body").forEach(d=>{d.hidden=d.dataset.body!==e}),this.sfx("uiClick",.3)}));let l=(h,d,u)=>{let f=c.querySelector(`#${h}`);f.addEventListener("input",()=>{n[d]=parseFloat(f.value),f.style.setProperty("--p",`${(n[d]-+f.min)/(+f.max-+f.min)*100}%`),c.querySelector(`#v-${h.slice(2)}`).textContent=u(n[d]),i.applySettings()})};l("s-sens","sensitivity",h=>h.toFixed(2)),l("s-fov","fov",h=>`${h}\xB0`),l("s-master","master",Or),l("s-sfx","sfx",Or),l("s-crowd","crowd",Or),this.bindChoices(c,(h,d)=>{if(h==="style"){i.setStyle(d);return}n[h]=h==="teamSize"?Number(d):d,i.applySettings(),["difficulty","gameLength","quarterLength","teamSize"].includes(h)&&i.session&&this.toast("Applies from the next game.")})}howTo(t=!1){this.current=t?"pauseSub":"help";let e=this.app.input.touchMode,i=a=>`<div class="keys">${a.map(([o,c])=>`<div class="key"><span class="kc">${Be(o)}</span><span>${Be(c.split(" (")[0])}</span></div>`).join("")}</div>`,n=(a,o)=>`<div class="tip"><b>${a}</b>${o}</div>`,r=this.show(`<div class="panel wide"><div class="h-title">How to Play</div>
      <div class="tabs"><button class="tab ${e?"":"on"}" data-tab="kb">Keyboard &amp; mouse</button><button class="tab ${e?"on":""}" data-tab="touch">Touch</button></div>
      <div class="tab-body" data-body="kb" ${e?"hidden":""}>${i(Gp)}</div>
      <div class="tab-body" data-body="touch" ${e?"":"hidden"}>${i(Wp)}</div>
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
      <div class="actions"><button class="btn primary" data-act="back">Got it</button></div></div>`,{back:()=>t?this.pauseMenu():this.mainMenu()});r.querySelectorAll(".tab").forEach(a=>a.addEventListener("click",()=>{r.querySelectorAll(".tab").forEach(o=>o.classList.toggle("on",o===a)),r.querySelectorAll(".tab-body").forEach(o=>{o.hidden=o.dataset.body!==a.dataset.tab}),this.sfx("uiClick",.3)}))}pauseMenu(){this.current="pause";let t=this.app,e=t.session,i=e&&e.cfg.practice,n=e&&e.cfg.career;this.show(`<div class="panel narrow center-t"><div class="h-title">Paused</div>
      <div class="col">
        <button class="btn primary lg block" data-act="resume">${Ft("play")} Resume</button>
        <div class="grid2" style="gap:var(--s2)">
          <button class="btn sm" data-act="settings">${Ft("gear",18)} Settings</button>
          <button class="btn sm" data-act="controls">${Ft("help",18)} Controls</button>
          <button class="btn sm" data-act="style">${Ft("brush",18)} Visual Style</button>
          ${i?`<button class="btn sm" data-act="finish">${Ft("check",18)} Finish</button>`:`<button class="btn sm" data-act="stats">${Ft("chart",18)} Box Score</button>`}
        </div>
        <button class="btn ghost block" data-act="exit">${i?"Exit to Practice":n?"Exit to Career":"Exit to Main Menu"}</button>
      </div>
      ${i?"":`<div class="small muted" style="margin-top:var(--s3)">${n?"Leaving abandons this game: it will not count, and you can play it again.":"Leaving ends this game."}</div>`}</div>`,{resume:()=>t.resume(),controls:()=>this.howTo(!0),settings:()=>this.settings(!0),style:()=>this.styleMenu(!0),stats:()=>this.liveStats(),finish:()=>{i&&(i.finish(),t.unpause())},exit:()=>{t.endSession(),i?this.practiceMenu():n?this.careerHub():this.mainMenu()}})}liveStats(){this.current="pauseSub";let t=this.app.session.match,e=t.human,i=t.stats.report(e),n=i.stats,r=(a,o)=>`<div class="mini"><b>${a}</b><span>${o}</span></div>`;this.show(`<div class="panel narrow center-t"><div class="h-title">Box Score</div>
      <div class="scoreline" style="margin-top:0"><div class="side">${Be(t.teams[0].short)}</div><div class="sc">${i.score[0]} - ${i.score[1]}</div><div class="side">${Be(t.teams[1].short)}</div></div>
      <div class="rating-hero"><span class="lab">Your grade so far</span><span class="num">${i.grade}</span></div>
      <div class="mini-stats">${r(n.pts,"Points")}${r(`${n.fgm}/${n.fga}`,"FG")}${r(`${n.tpm}/${n.tpa}`,"3PT")}${r(n.ast,"Assists")}${r(n.reb,"Rebounds")}${r(n.stl,"Steals")}${r(n.blk,"Blocks")}${r(n.tov,"Turnovers")}</div>
      <div class="small muted" style="margin-top:var(--s3)">${t.full?`${t.periodLabel} \xB7 `:""}${t.displayClock} left \xB7 team fouls ${t.teams[0].fouls} - ${t.teams[1].fouls}</div>
      <div class="actions mid"><button class="btn primary" data-act="back">Back</button></div></div>`,{back:()=>this.pauseMenu()})}clickToPlay(t={}){this.current="click";let e=this.app.session;if(t.resume){let c=t.retry?"Click once more to capture the mouse":"Click or press Tab \xB7 P opens the menu",l=t.retry>=2?'<div class="actions mid"><button class="btn sm ghost" data-act="drag">Play with drag-to-look</button></div>':"";this.show(`<div class="panel narrow go-card"><div class="go-big">Click to continue</div><div class="go-sub">${c}</div>${l}</div>`,{drag:(h,d)=>{d.stopPropagation(),this.app.input.dragMode=!0,this.app.resume()}},"screen center dim"),this.root.firstChild.addEventListener("click",h=>{h.target.closest("[data-act]")||(this.sfx("uiConfirm",.3),this.app.resume())},{once:!0});return}let i=!this.seenControls;this.seenControls=!0;let n=e&&e.cfg.title?`<div class="small muted" style="font-weight:800;text-transform:uppercase;letter-spacing:1px">${Be(e.cfg.title)}</div>`:"",r=this.app.input.touchMode,o=`<div class="keys" style="margin-top:var(--s4);text-align:left">${(r?[["Left thumb","Move"],["Right thumb","Look"],["SHOOT","Hold & release"],["PASS","To the ring"],["CROSS","Crossover"],["STEAL","On defence"],["II","Pause"]]:[["WASD","Move"],["Mouse","Look"],["Shift","Sprint"],["Left click","Shoot (hold)"],["Right click","Pass"],["Q","Crossover"],["E","Steal"],["Space","Jump / fake"],["C","Stance"],["P","Pause"]]).map(([c,l])=>`<div class="key"><span class="kc">${c}</span><span>${l}</span></div>`).join("")}</div>`;this.show(`<div class="panel mid go-card">${n}<div class="go-big">${r?"Tap to play":"Click to play"}</div>
      ${i?o:`<div class="go-sub">${r?"Left thumb move \xB7 right thumb look":"WASD move \xB7 mouse look \xB7 P pause"}</div>`}</div>`,{},"screen center dim"),this.root.firstChild.addEventListener("click",()=>{this.sfx("uiConfirm",.3),this.app.resume()},{once:!0})}};function Or(s){return`${Math.round(s*100)}%`}var Ni=(s,t,e,i)=>{let n=document.createElement(s);return t&&(n.className=t),i!=null&&(n.innerHTML=i),e&&e.appendChild(n),n},Oc=class{constructor(t,e,i){this.root=Ni("div","coach hidden",t);let n=Ni("div","coach-main",this.root),r=Ni("div","coach-txt",n);this.sayEl=Ni("div","coach-say",r),this.hintEl=Ni("div","coach-hint",r),this.skip=Ni("button","coach-skip",n,"Skip drill"),this.skip.addEventListener("click",o=>{o.preventDefault(),i()}),this.skip.addEventListener("pointerdown",o=>o.stopPropagation());let a=Ni("div","coach-foot",this.root);this.dots=Ni("span","coach-dots",a);for(let o=0;o<e;o++)Ni("i","",this.dots);this.starsEl=Ni("span","coach-stars",a,"\u2605 0"),this.bar=Ni("div","coach-bar",this.root),this.barFill=Ni("i","",this.bar),this.arrow=Ni("div","tut-arrow hidden",t),this.last={}}pointAt(t){let e=t&&(Math.abs(t.x)>.92||Math.abs(t.y)>.92);if(this.arrow.classList.toggle("hidden",!e),!e)return;let i=Math.atan2(t.y,t.x),n=.8,r=Math.min(n/Math.max(Math.abs(Math.cos(i)),.001),n/Math.max(Math.abs(Math.sin(i)),.001));this.arrow.style.left=`${(Math.cos(i)*r*.5+.5)*100}%`,this.arrow.style.top=`${(-Math.sin(i)*r*.5+.5)*100}%`,this.arrow.style.setProperty("--rot",`${-i}rad`)}show(t){this.root.classList.toggle("hidden",!t)}dispose(){this.root.remove(),this.arrow.remove()}update(t){let e=this.last;t.say!==e.say&&(this.sayEl.textContent=t.say,this.sayEl.classList.remove("pop"),this.sayEl.offsetWidth,this.sayEl.classList.add("pop")),t.hint!==e.hint&&(this.hintEl.textContent=t.hint||"",this.hintEl.classList.toggle("empty",!t.hint)),(t.index!==e.index||t.doneCount!==e.doneCount)&&[...this.dots.children].forEach((i,n)=>{i.className=n<t.doneCount?"done":n===t.index?"now":""}),t.stars!==e.stars&&(this.starsEl.textContent=`\u2605 ${t.stars}`),t.keyboard!==e.keyboard&&(this.skip.textContent=t.keyboard?"Skip drill (Enter)":"Skip"),this.barFill.style.width=`${Math.round(Math.max(0,Math.min(1,t.frac))*100)}%`,this.last={...t}}};var ed=(s,t)=>({x:s,z:t});function X_(s,t){let e=$i(Wi("harbor"),1),i={...e.roster[0],name:"Jojo Rebounds",number:11,archetype:"guard",attrs:{shooting:70,handling:70,speed:80,defense:60,passing:92,vertical:60}},n=[{...e,name:"You",short:"YOU",roster:[$u(s),i]}],r=$i(Wi("summit"),1),a={...r.roster[0],name:"Big Barry",number:50,archetype:"big",attrs:{shooting:70,handling:62,speed:58,defense:70,passing:60,vertical:66}};return n.push({...r,name:"Practice",short:"PRC",roster:t?[a]:[a]}),n}var Fc=class{constructor(t){this.app=t,this.t=0,this.made=0,this.att=0,this.points=0,this.done=!1}matchConfig(t){return{seed:77,rules:!1,difficulty:this.app.settings.difficulty,teams:X_(t,!0)}}attach(t){this.s=t;let e=t.match;this.human=e.human,this.reb=e.teams[0].players[1],this.dummy=e.teams[1].players[0],this.unsub=[e.events.on("shot",i=>{i.player===this.human&&i.kind!=="ft"&&this.att++}),e.events.on("basket",i=>this.onBasket(i))]}start(t){let e=t.match;e.setPhase("live"),e.offense=0,this.parkDummy(),e.place(this.human,B.X-6.5,.5),e.place(this.reb,B.X-1.6,-1.2),e.gainBall(this.human,"practice"),e.events.emit("snap",{t:e.time})}parkDummy(){this.s.match.place(this.dummy,2.2,-6.9,0),this.dummy.drill=e=>{e.desired.set(0,0,0),e.faceYaw=Math.PI/2}}onBasket(t){t.player===this.human&&(this.made++,this.points+=t.value)}step(){}frame(){}markers(){}dispose(){for(let t of this.unsub||[])t();this.card&&this.card.dispose()}finish(){let t=this.s.match;this.done=!0,t.setPhase("over"),t.phaseT=3.1,this.card&&(this.card.pointAt(null),this.card.show(!1))}},Ur=[{id:"dribble",say:"Dribble around",hint:{kb:"Move with WASD while you have the ball",touch:"Move with the left stick"},par:8,limit:30},{id:"cross",say:"Crossover twice",hint:{kb:"Press Q to switch hands",touch:"Tap CROSS"},par:8,limit:30},{id:"jumper",say:"Hit a jump shot from the gold spot",hint:{kb:"Hold left mouse, release in the green",touch:"Hold SHOOT, release in the green"},par:20,limit:50},{id:"three",say:"Now a three from the gold spot",hint:{kb:"Further out: the green sits higher on the meter",touch:"Further out: the green sits higher"},par:25,limit:55},{id:"layup",say:"Drive and finish at the rim",hint:{kb:"Sprint (Shift) at the rim, then shoot: layup or dunk",touch:"Push the stick to sprint, then SHOOT near the rim"},par:12,limit:40},{id:"pass",say:"Pass to Jojo and get it back",hint:{kb:"Look at Jojo, right mouse to pass",touch:"Look at Jojo, tap PASS"},par:10,limit:35},{id:"stance",say:"Stay in front of Barry",hint:{kb:"Hold C for the stance, slide with A/D",touch:"Hold STANCE and slide"},par:10,limit:30},{id:"steal",say:"Steal the ball from Barry",hint:{kb:"Press E when the dribble is low and on your side",touch:"Tap STEAL when the dribble is low"},par:15,limit:40},{id:"block",say:"Block (or contest) Barry's shot",hint:{kb:"Space to jump with him as he rises",touch:"Tap BLOCK as he rises"},par:15,limit:40}],id=class extends Fc{constructor(t){super(t),this.title="Practice Court",this.idx=0,this.stars=0,this.results=[]}attach(t){super.attach(t);let e=t.match;this.card=new Oc(this.app.uiRoot,Ur.length,()=>this.skip(t)),this.card.show(!0),this.unsub.push(e.events.on("cross",i=>{i.player===this.human&&this.count++}),e.events.on("pass",i=>{i.player===this.human&&(this.passed=!0)}),e.events.on("gain",i=>{i.player===this.human&&this.passed&&this.count++}),e.events.on("poke",i=>{i.player===this.human&&this.count++}),e.events.on("block",i=>{i.player===this.human&&(this.count+=2)}),e.events.on("bounce",i=>{i.player===this.human&&this.human.speed>1.5&&this.dribbles++}))}start(t){super.start(t),this.begin(0)}begin(t){let e=this.s.match;if(this.idx=t,this.t=0,this.count=0,this.passed=!1,this.dribbles=0,this.inFront=0,this.resetAt=0,this.drill=Ur[t],!this.drill){this.finish();return}let i=this.drill.id;if(this.spot=i==="jumper"?ed(Ue.elbowL[0],Ue.elbowL[1]):i==="three"?ed(Ue.wingR[0],Ue.wingR[1]):null,this.parkDummy(),e.place(this.reb,B.X-1.6,-1.6),i==="stance"||i==="steal"||i==="block")e.place(this.human,B.X-4.2,0,re(-1,0)),this.setupDummy(i);else{let n=this.spot||ed(B.X-7,1.5);e.place(this.human,n.x-.6,n.z*.9),e.gainBall(this.human,"practice")}e.events.emit("snap",{t:e.time}),this.s.hud.notify(this.drill.say.toUpperCase(),"")}setupDummy(t){let e=this.s.match,i=this.dummy;e.place(i,B.X-6.8,0,re(1,0)),e.gainBall(i,"practice");let n=1,r=0;if(t==="block"){i.drill=(a,o)=>{if(r+=o,a.desired.set(0,0,0),a.faceYaw=re(B.X-a.pos.x,B.Z-a.pos.z),e.ball.owner===a&&e.ball.state==="held"&&!a.action&&r>2.2){r=0;let c=On(e,a,"jumper",rn(e,a),0);cs(e,a,{kind:"jumper",releaseCharge:c.c}),a.action&&(a.action.ai=!0)}};return}i.drill=(a,o)=>{e.ball.owner===a&&e.ball.state==="held"&&!a.action&&(ls(a,"R",{}),e.ball.state="dribble"),r+=o,Math.abs(a.pos.z)>2.6&&(n=-Math.sign(a.pos.z));let c=t==="stance"?2.4:1.4;a.desired.set(Math.sin(r*.9)*.6,0,n*c),a.faceYaw=re(B.X-a.pos.x,B.Z-a.pos.z)}}skip(t){this.done||(this.results[this.idx]={done:!1,t:this.t},this.begin(this.idx+1))}complete(){let t={done:!0,t:this.t,star:this.t<=this.drill.par};this.results[this.idx]=t,t.star&&this.stars++,this.app.audio.play("uiReward",{gain:.4}),this.s.hud.notify(t.star?"\u2605 NICE! UNDER PAR":"DONE!","good"),this.begin(this.idx+1)}onBasket(t){if(super.onBasket(t),t.player!==this.human||!this.drill)return;let e=this.drill.id;e==="jumper"&&t.kind!=="layup"&&t.kind!=="dunk"&&this.count++,e==="three"&&t.value===3&&this.count++,e==="layup"&&(t.kind==="layup"||t.kind==="dunk")&&this.count++}step(t,e){if(this.done||!this.drill)return;let i=t.match,n=this.human,r=this.dummy,a=this.drill.id;this.t+=e;let o=!1;if(a==="dribble")o=this.dribbles>=6;else if(a==="cross")o=this.count>=2;else if(a==="jumper"||a==="three"||a==="layup"||a==="pass")o=this.count>=1;else if(a==="stance"){let c=De(n.pos.x,n.pos.z)<De(r.pos.x,r.pos.z)-.3,l=n.pos.distXZ(r.pos)<1.9;c&&l&&n.stance&&(this.inFront+=e),o=this.inFront>=4}else if(a==="steal")o=this.count>=1;else if(a==="block"){o=this.count>=2;let c=r.action;c&&c.type==="shot"&&c.released&&!this.contested&&n.pos.distXZ(r.pos)<1.8&&(n.airborne||n.handsUp)&&(this.contested=!0,this.count++,t.hud.notify("CONTESTED","good")),c||(this.contested=!1)}if(o){this.complete();return}if(this.t>this.drill.limit){this.s.hud.notify("MOVING ON",""),this.skip(t);return}(a==="steal"||a==="block"||a==="stance")&&i.ball.owner!==r&&!(i.ball.shot&&!i.ball.shot.done&&!i.ball.shot.rim)?(this.resetAt+=e,this.resetAt>1.4&&(this.resetAt=0,i.place(r,r.pos.x,r.pos.z,re(1,0)),i.gainBall(r,"practice"))):this.resetAt=0}frame(t){if(!this.card||!this.drill)return;let e=this.app.input.touchMode;this.card.update({index:this.idx,doneCount:this.idx,say:this.drill.say,hint:e?this.drill.hint.touch:this.drill.hint.kb,stars:this.stars,frac:1-this.t/this.drill.limit,keyboard:!e});let i=this.spot?{x:this.spot.x,y:.5,z:this.spot.z}:this.drill.id==="layup"?{x:B.X,y:B.Y,z:0}:this.drill.id==="pass"?this.reb.pos:["stance","steal","block"].includes(this.drill.id)?this.dummy.pos:null;if(i){let n=t.view.projectToScreen(t.view._pt||(t.view._pt=t.view.camera.position.clone()).set(i.x,i.y??1,i.z),t.view._pt2||(t.view._pt2=t.view.camera.position.clone()));this.card.pointAt(n)}else this.card.pointAt(null)}markers(t,e){this.spot&&e.showSpot(0,this.spot.x,this.spot.z,t.match.time)}hint(){return""}phaseText(){return`PRACTICE COURT \xB7 DRILL ${Math.min(Ur.length,this.idx+1)}/${Ur.length}`}clockText(){return`\u2605 ${this.stars}`}summary(){let t=this.results.filter(e=>e&&e.done).length;return{kind:"drills",title:"Practice Court",stars:this.stars,total:Ur.length,done:t,rows:Ur.map((e,i)=>({say:e.say,...this.results[i]||{done:!1}}))}}},Uc=[Ue.cornerL,Ue.wingL,Ue.top,Ue.wingR,Ue.cornerR,Ue.elbowL,Ue.elbowR],Bc=class extends Fc{constructor(t,e=!0){super(t),this.timed=e,this.title=e?"Shootout":"Free Shootaround",this.len=60,this.hot=2}start(t){super.start(t),this.timed&&this.s.hud.showBanner("60 SECONDS","Hit the gold spot for double points",1800)}onBasket(t){if(t.player!==this.human)return;this.made++;let e=t.value,i=this.lastShotFrom;if(i&&this.timed){let n=Uc[this.hot];Math.hypot(i.x-n[0],i.z-n[1])<1&&(e*=2,this.s.hud.notify(`HOT SPOT \xD72 \xB7 +${e}`,"good"),this.hot=(this.hot+1+Math.floor(Math.random()*(Uc.length-1)))%Uc.length)}this.points+=e}attach(t){super.attach(t),this.unsub.push(t.match.events.on("shotStart",e=>{e.player===this.human&&(this.lastShotFrom={x:e.player.pos.x,z:e.player.pos.z})}))}step(t,e){if(!this.done&&(this.t+=e,this.timed&&this.t>=this.len)){let i=t.match;if(i.ball.shot&&!i.ball.shot.done&&i.ball.state==="free")return;t.audio.play("buzzer",{gain:.8}),this.finish()}}markers(t,e){if(!this.timed)return;let i=Uc[this.hot];e.showSpot(0,i[0],i[1],t.match.time)}hint(){return null}phaseText(){return this.timed?`SHOOTOUT \xB7 ${this.points} PTS \xB7 ${this.made}/${this.att}`:`SHOOTAROUND \xB7 ${this.made}/${this.att}`}clockText(){if(!this.timed)return`${this.made}/${this.att}`;let t=Math.max(0,this.len-this.t);return t<10?t.toFixed(1):`0:${String(Math.ceil(t)).padStart(2,"0")}`}summary(){return{kind:this.timed?"shootout":"free",title:this.title,points:this.points,made:this.made,att:this.att}}};function Lm(s,t){return s==="shootout"?new Bc(t,!0):s==="free"?new Bc(t,!1):new id(t)}var Nm="courtside.profile",Dm="courtside.records",nd="courtside.career",sd=class{constructor(){let t=document.createElement("style");t.textContent=md,document.head.appendChild(t),this.params=new URLSearchParams(location.search),this.coarse=!!(window.matchMedia&&matchMedia("(pointer: coarse)").matches),this.settings=hm(this.coarse),this.coarse&&!cm()&&(this.settings.quality="medium"),this.canvas=document.getElementById("game"),this.uiRoot=document.getElementById("ui"),this.view=new cc(this.canvas,{quality:this.settings.quality,preserve:this.params.has("preserve")}),this.view.setQuality(this.settings.quality),this.style=this.params.get("style")||dm(),this.view.setStyle(this.style),this.audio=new hc,this.audio.setVolumes({master:this.settings.master,sfx:this.settings.sfx,crowd:this.settings.crowd}),this.input=new dc(this.canvas),this.input.sensitivity=this.settings.sensitivity,this.input.invertY=this.settings.invertY,this.hud=new mc(this.uiRoot),this.touch=new gc(this,this.uiRoot),this.setTouchMode(this.settings.touch==="on"||this.settings.touch!=="off"&&this.coarse),window.addEventListener("pointerdown",n=>{this.settings.touch==="auto"&&(n.pointerType==="touch"&&!this.input.touchMode?this.setTouchMode(!0):n.pointerType==="mouse"&&this.input.touchMode&&!this.input.fromTouch(n)&&this.setTouchMode(!1))},!0),this.profile=this.loadJSON(Nm,xm()),this.records=this.loadJSON(Dm,{wins:0,losses:0,games:0,bestShootout:0,practiceDone:!1,points:0}),this.career=this.loadCareer(),this.screens=new kc(this),this.session=null,this.menuSession=null,this.paused=!1,this.last=performance.now(),this.fpsCap=Number(this.params.get("fps")||0),this.frameAcc=0,this.adapt={on:this.params.has("adapt")||!navigator.webdriver&&!this.fpsCap,ema:1/60,scale:1,floor:.5,low:0,high:0,check:null},this.input.onPause=()=>this.togglePause(),this.input.onToggleLock=()=>this.toggleLock(),this.input.onSkip=()=>{this.session&&this.session.cfg.practice&&!this.paused&&this.session.cfg.practice.skip&&this.session.cfg.practice.skip(this.session)},this.canvas.addEventListener("click",()=>{this.session&&!this.paused&&this.input.active&&!this.input.touchMode&&!this.input.locked&&!this.input.dragMode&&this.input.requestLock()}),this.input.onLockLost=()=>{this.session&&!this.paused&&this.pause(document.hasFocus()?"lock":"blur")},this.input.onLockGained=()=>{this.lockFails=0,this.session&&this.awaitingLock&&this.unpause()},this.input.onLockError=()=>{this.session&&this.awaitingLock&&this.lockFailed()},document.addEventListener("visibilitychange",()=>{document.hidden?this.onBlur():this.onFocus()}),window.addEventListener("blur",()=>this.onBlur()),window.addEventListener("focus",()=>this.onFocus()),window.addEventListener("resize",()=>this.view.resize());let e=()=>{this.audio.init(),(!this.paused||!this.session)&&this.audio.resume()};for(let n of["pointerdown","pointerup","touchend","click","keydown"])window.addEventListener(n,e,{capture:!0});document.addEventListener("gesturestart",n=>n.preventDefault()),document.addEventListener("contextmenu",n=>{n.target.closest&&n.target.closest("input")||n.preventDefault()}),document.getElementById("boot")?.remove(),this.startMenuBackground(),this.screens.mainMenu(),requestAnimationFrame(n=>this.loop(n)),window.__cs=this,this.debugStep=n=>{let r=this.session||this.menuSession;for(let a=0;a<n;a++)r.match.step(1/120),r.cfg.practice&&r.cfg.practice.step(r,1/120)};let i=this.params.get("auto");i&&setTimeout(()=>this.autostart(i),50)}loadJSON(t,e){try{let i=Gi.getItem(t);return i?{...e,...JSON.parse(i)}:{...e}}catch{return{...e}}}saveJSON(t,e){try{return Gi.setItem(t,JSON.stringify(e)),!0}catch{return!1}}saveProfile(){this.saveJSON(Nm,this.profile)||this.screens.toast("Your player could not be saved (storage unavailable).",!0)}saveRecords(){this.saveJSON(Dm,this.records)}loadCareer(){try{let t=Gi.getItem(nd),e=t?JSON.parse(t):null;return Pm(e)?e:null}catch{return null}}saveCareer(){try{this.career?Gi.setItem(nd,JSON.stringify(this.career)):Gi.removeItem(nd)}catch{this.screens.toast("Your career could not be saved (storage unavailable).",!0)}}autostart(t){let e=this.params,i=n=>e.get(n)?Number(e.get(n)):void 0;t==="quick"||t==="full"?this.startGame({format:"full",size:i("size"),home:e.get("home")||"harbor",away:e.get("away")||"mesa",venue:e.get("venue")||"arena",live:e.has("live"),quarter:i("quarter")}):t==="half"||t==="3v3"||t==="1v1"?this.startGame({format:t==="1v1"?"1v1":"3v3",home:e.get("home")||"harbor",away:e.get("away")||"mesa",venue:e.get("venue")||(t==="1v1"?"gym":"arena"),live:e.has("live"),clock:i("clock"),target:i("target")}):t.startsWith("practice")?this.startPractice(t.split(":")[1]||"drills",{live:e.has("live")}):t==="career"&&this.career&&this.screens.careerHub()}loop(t){requestAnimationFrame(r=>this.loop(r));let e=(t-this.last)/1e3;if(this.adaptResolution(e),this.fpsCap){if(this.frameAcc+=e,this.last=t,this.frameAcc<1/this.fpsCap)return;e=this.frameAcc,this.frameAcc=0}else this.last=t;e=Math.min(e,.1);let i=this.session||this.menuSession;i&&i.frame(this.paused&&this.session?0:e),this.updateLockHint();let n=!!(this.session&&this.session.human&&!this.paused&&!this.session.ended);this.touch.setVisible(this.input.touchMode&&n),this.touch.visible&&this.touch.update(this.session),this.onFrame&&this.onFrame(e)}updateLockHint(){let t=!!(this.session&&!this.paused&&!this.session.ended&&this.session.human&&this.input.active&&!this.input.touchMode&&!this.input.locked&&!this.input.dragMode);!this.lockHint&&t&&(this.lockHint=document.createElement("div"),this.lockHint.className="tut-click",this.lockHint.innerHTML="Click to take control<small>the mouse looks and aims</small>",this.uiRoot.appendChild(this.lockHint)),this.lockHint&&(this.lockHint.hidden=!t);let e=!!(this.session&&!this.paused&&!this.session.ended&&this.session.human&&this.input.active&&!this.input.touchMode&&!this.input.locked&&this.input.dragMode);!this.dragHint&&e&&(this.dragHint=document.createElement("div"),this.dragHint.className="drag-hint",this.dragHint.textContent="Drag to look \xB7 Tab captures the cursor",this.uiRoot.appendChild(this.dragHint)),this.dragHint&&(this.dragHint.hidden=!e)}adaptResolution(t){let e=this.adapt;if(!e.on||t<=0||t>.5)return;if(!!!(this.session&&!this.paused&&!document.hidden)){e.low=0,e.high=0,e.check=null;return}if(e.ema+=(t-e.ema)*.06,e.floorT=(e.floorT||0)+t,e.floor>.5&&e.floorT>30&&(e.floor=.5),e.check){e.check.t+=t,e.check.t>2&&(e.ema>e.check.before*.92&&(e.floor=e.check.prev,e.floorT=0,e.scale=e.check.prev,this.view.setResolutionScale(e.scale)),e.check=null);return}if(e.ema>1/42?(e.low+=t,e.high=0):e.ema<1/56?(e.high+=t,e.low=0):(e.low=0,e.high=0),e.low>1.5&&e.scale>e.floor+.01){let n=e.scale;e.scale=Math.max(e.floor,e.scale*.85),this.view.setResolutionScale(e.scale),e.check={before:e.ema,prev:n,t:0},e.low=0}else e.high>6&&e.scale<1&&(e.scale=Math.min(1,e.scale*1.12),this.view.setResolutionScale(e.scale),e.high=0)}setTouchMode(t){this.input.touchMode=t,document.documentElement.dataset.touch=t?"1":"0",t||this.touch.setVisible(!1)}tryFullscreen(){if(!this.input.touchMode||document.fullscreenElement||this.params.has("nofs"))return;let t=document.documentElement;try{let e=t.requestFullscreen&&t.requestFullscreen({navigationUI:"hide"});e&&e.then&&e.then(()=>{try{let i=screen.orientation&&screen.orientation.lock&&screen.orientation.lock("landscape");i&&i.catch&&i.catch(()=>{})}catch{}}).catch(()=>{})}catch{}}startMenuBackground(){if(this.menuSession)return;let t=ci[3],e=ci[6],i=zl(t,e);i[0].word=t.short,i[1].word=e.short;let n={mode:"menu",venue:"arena",venueOpts:{homeName:t.name,awayName:e.name},colours:{kits:i,human:this.profile.look,court:t.colors[0]},match:{court:"full",seed:99,quarter:1e5,difficulty:"pro",teams:[$i(t,5),$i(e,5)]}};this.menuSession=new ka(this,n),this.menuSession.start()}stopMenuBackground(){this.menuSession&&(this.menuSession.dispose(),this.menuSession=null)}gameConfig(t){let e=t.format||"full",i=t.homeTeam||Wi(t.home),n=t.awayTeam||Wi(t.away),r=zl(i,n);r[0].word=i.short,r[1].word=n.short;let a=this.params.get("seed")?Number(this.params.get("seed")):(Date.now()&65535)+1,o=t.player||this.profile,c=t.difficulty||this.settings.difficulty;if(e==="full"){let u=Math.max(3,Math.min(5,Number(t.size||this.settings.teamSize)||5)),f=Mn[t.length||this.settings.quarterLength]||Mn.short;return{kits:r,home:i,away:n,size:u,match:{court:"full",seed:a,quarter:t.quarter||f.quarter,ot:f.ot,difficulty:c,teams:t.humanSide===1?[$i(i,u),$i(n,u,o)]:[$i(i,u,o),$i(n,u)]}}}let l=e==="1v1"?1:3,h=ss[t.length||this.settings.gameLength]||ss.normal,d=t.target||(e==="1v1"?Math.min(11,h.target):h.target);return{kits:r,home:i,away:n,size:l,match:{seed:a,clock:t.clock||h.clock,target:d,difficulty:c,teams:[$i(i,l,o),$i(n,l)]}}}startSession(t){return this.stopMenuBackground(),this.session&&this.session.dispose(),this.screens.clear(),this.session=new ka(this,t),this.hud.show(!0),this.hud.root.classList.toggle("practice",!!t.practice),this.session.start(),this.input.active=!0,t.live?(this.paused=!1,this.session.setPaused(!1),this.session):(this.paused=!0,this.session.setPaused(!0),this.screens.clickToPlay(),this.session)}endSession(){this.session&&this.session.dispose(),this.session=null,this.paused=!1,this.input.active=!1,this.input.exitLock(),this.hud.show(!1),this.startMenuBackground()}startGame(t){t.career||(this.lastGame=t);let e=this.gameConfig(t),i=t.format||"full",n=i==="full"?`${e.size}v${e.size} Full Court`:i==="1v1"?"1v1 Challenge":"3v3 Half Court";return this.startSession({mode:t.career?"career":i==="full"?"quick":i,live:t.live,career:t.career,venue:t.venue||(i==="1v1"?"gym":"arena"),venueOpts:{homeName:e.home.name,awayName:e.away.name},title:t.title||`${n} \xB7 ${e.home.name} v ${e.away.name}`,colours:{kits:e.kits,human:(t.player||this.profile).look,court:e.home.colors[0]},match:e.match,firstTeam:t.firstTeam,onEnd:r=>t.career?this.screens.careerResult(r):this.screens.result(r)})}startPractice(t,e={}){let i=Lm(t,this),n=Wi("harbor"),r=Wi("summit"),a=zl(n,r);return a[0].word="PRACTICE",this.startSession({mode:"practice",live:e.live,venue:"practice",venueOpts:{homeName:"Practice",awayName:""},title:i.title,colours:{kits:a,human:this.profile.look,court:"#3a86ff"},match:i.matchConfig(this.profile),practice:i,onEnd:o=>this.screens.practiceResult(o)})}togglePause(){if(!(!this.session||this.session.ended)){if(this.paused&&this.screens.current==="click"){this.screens.pauseMenu();return}this.paused?this.resume():this.pause()}}pause(t="user"){!this.session||this.session.ended||(this.paused=!0,this.session.setPaused(!0),this.input.releaseAll(),this.touch.setVisible(!1),this.input.exitLock(),this.audio.suspend(),t==="lock"?this.screens.clickToPlay({resume:!0}):this.screens.pauseMenu())}resume(){if(this.session){if(this.input.active=!0,this.input.touchMode){this.tryFullscreen(),this.unpause();return}if(this.input.locked){this.unpause();return}if(this.input.dragMode){this.unpause();return}this.screens.clear(),this.awaitingLock=!0,this.requestLockSoon()}}requestLockSoon(){clearTimeout(this.lockDelay),clearTimeout(this.lockTimer);let t=Math.max(0,this.input.lastLockExit+1150-performance.now()),e=()=>{if(!this.input.requestLock()){this.awaitingLock=!1,this.input.dragMode=!0,this.unpause();return}this.lockTimer=setTimeout(()=>{this.awaitingLock&&!this.input.locked&&this.lockFailed()},1500)};t>0?this.lockDelay=setTimeout(e,t):e()}lockFailed(){if(this.awaitingLock=!1,clearTimeout(this.lockTimer),this.lockFails=(this.lockFails||0)+1,window.top!==window&&this.session){this.input.dragMode=!0,this.unpause();return}this.session&&this.paused&&this.screens.clickToPlay({resume:!0,retry:this.lockFails})}toggleLock(){if(!(!this.session||this.session.ended||this.input.touchMode)){if(this.input.locked){this.pause("lock");return}if(this.input.dragMode=!1,this.paused){this.resume();return}this.awaitingLock=!1,this.requestLockSoon()}}unpause(){this.awaitingLock=!1,this.commitSettings(),this.screens.clear(),this.paused=!1,this.session&&this.session.setPaused(!1),this.audio.resume()}onBlur(){this.audio.setMuted(!0),this.session&&!this.paused&&!this.session.ended&&this.pause("blur")}onFocus(){this.audio.setMuted(!1),this.paused&&this.audio.suspend()}applySettings(){let t=this.settings,e=t.touch==="on"||t.touch!=="off"&&(this.coarse||this.input.touchMode);if(e!==this.input.touchMode&&this.setTouchMode(e),this.input.sensitivity=t.sensitivity,this.input.invertY=t.invertY,this.audio.setVolumes({master:t.master,sfx:t.sfx,crowd:t.crowd}),this.view.quality!==t.quality){this.view.setQuality(t.quality),this.view.venueKey=null;let i=this.session||this.menuSession;i&&this.view.setVenue(i.cfg.venue,i.cfg.venueOpts||{}),this.view.match&&this.view.rebuildCharacters()}this.settingsDirty=!0}setStyle(t){this.style=t,this.view.setStyle(t),this.styleDirty=!0}commitSettings(){this.settingsDirty&&(this.settingsDirty=!1,um(this.settings)||this.screens.toast("Settings could not be saved (storage unavailable).",!0)),this.styleDirty&&(this.styleDirty=!1,fm(this.style))}};function km(){try{new sd}catch(s){console.error(s);let t=document.getElementById("boot");t&&(t.textContent="Courtside could not start: "+s.message+" (a browser with WebGL2 is required).")}}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",km):km();})();
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
