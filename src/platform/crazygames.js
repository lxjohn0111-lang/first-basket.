// CrazyGames HTML5 SDK v3 integration (adapted from First Touch's platform layer).
// The CrazyGames build's index.html loads https://sdk.crazygames.com/crazygames-sdk-v3.js
// before the game; every other build (double-clicked index.html, the test server, the
// hosted page) has no SDK and runs exactly as before, saving to localStorage.
//
// What it does on CrazyGames:
// - progress is saved through the SDK's data module: the career, My Player, records,
//   settings, visual style and the tutorial flag (guests: kept in the browser by the SDK;
//   logged-in players: their CrazyGames account, synced across devices). Saves made
//   earlier in this browser's localStorage are copied over once.
// - loadingStart / loadingStop around start-up; gameplayStart / gameplayStop while a
//   game, a drill or the tutorial is actually being played; happytime on a win and when
//   the tutorial is finished.
// - the platform's mute setting silences the game.
// - no fullscreen requests of our own (the platform has its own fullscreen button).
// - the player's name is locked: a logged-in player plays under their CrazyGames
//   username, a guest under the game's default name; nobody types their own.
// No ads are requested.
import { useStorage, SAVE_KEYS } from '../core/storage.js';

// CrazyGames' own init waits up to 7 s for the page, 5 s for the account, 10 s for a cloud
// save, then loads its ads library: give it time
const INIT_TIMEOUT = 30000;
const MOVED_FLAG = 'courtside.copiedToDataModule';
export const GUEST_NAME = 'Rookie';

export const platform = {
  sdk: null, // the SDK, once initialised in a usable environment
  env: 'none', // 'none' (no SDK on the page), 'disabled' (other domain), 'local', 'crazygames'
  saves: 'localStorage',
  playing: false,
  muted: false,
  muteListeners: [],
  user: null, // the CrazyGames account ({ username, ... }) or null for a guest
  nameListeners: [],

  get active() { return !!this.sdk; },
  // on CrazyGames the player's name can't be chosen: the account's username, or the
  // guest name; null elsewhere (the name is typed in)
  get lockedName() { return this.sdk ? (this.user && this.user.username) || GUEST_NAME : null; },
  onName(fn) { this.nameListeners.push(fn); },

  // status(text): a line for the loading screen while the SDK gets ready
  async init(status = () => {}) {
    const CG = window.CrazyGames && window.CrazyGames.SDK;
    if (!CG) return this;
    // On CrazyGames the SDK's init talks to the page around the game, loads the player's
    // account and cloud save and the ads library, which can take a while on a slow
    // connection. Wait for it (saying so after a moment); if it still isn't ready after
    // INIT_TIMEOUT, start without it and connect it as soon as it is (attachLate).
    const said = setTimeout(() => status('Connecting to CrazyGames\u2026'), 1500);
    let initP;
    try {
      initP = Promise.resolve(CG.init());
      let timer;
      await Promise.race([initP, new Promise((_, rej) => { timer = setTimeout(() => rej(new Error('SDK init timed out')), INIT_TIMEOUT); })]);
      clearTimeout(timer);
    } catch (e) {
      clearTimeout(said);
      console.warn('[Courtside] CrazyGames SDK not ready, starting without it:', e && e.message);
      this.env = 'disabled';
      if (initP && e && /timed out/.test(e.message)) initP.then(() => this.attachLate(CG)).catch(() => {});
      return this;
    }
    clearTimeout(said);
    this.env = CG.environment || 'disabled';
    // on other domains the SDK is "disabled" and every call would throw
    if (this.env !== 'local' && this.env !== 'crazygames') return this;
    this.sdk = CG;
    this.useDataModule(CG.data);
    await this.setup(CG);
    return this;
  },

  // mute setting and the account, once the SDK is ready
  async setup(CG) {
    try {
      this.muted = !!(CG.game.settings && CG.game.settings.muteAudio);
      CG.game.addSettingsChangeListener((s) => { this.muted = !!(s && s.muteAudio); this.notifyMute(); });
    } catch (e) { /* settings not available: never muted by the platform */ }
    try {
      if (CG.user && CG.user.isUserAccountAvailable !== false) {
        let timer;
        this.user = (await Promise.race([CG.user.getUser(), new Promise((res) => { timer = setTimeout(() => res(null), 4000); })])) || null;
        clearTimeout(timer);
        if (CG.user.addAuthListener) {
          CG.user.addAuthListener((u) => {
            this.user = u || null;
            for (const f of this.nameListeners) f(this.lockedName);
          });
        }
      }
    } catch (e) { this.user = null; }
  },

  // the SDK became ready after the game had already started without it
  async attachLate(CG) {
    let env;
    try { env = CG.environment; } catch (e) { return; }
    if (env !== 'local' && env !== 'crazygames' || this.sdk) return;
    console.info('[Courtside] CrazyGames SDK ready (late), connecting it');
    this.env = env;
    this.sdk = CG;
    // saves: only switch to the data module when it holds nothing of ours yet (this
    // session's saves are copied in); otherwise keep this session on localStorage
    try {
      const data = CG.data;
      const has = SAVE_KEYS.some((k) => data.getItem(k) != null);
      if (!has) {
        for (const k of SAVE_KEYS) { const v = window.localStorage.getItem(k); if (v != null) data.setItem(k, v); }
        useStorage(data, 'crazygames');
        this.saves = 'crazygames';
      }
    } catch (e) { /* data module off or localStorage blocked: keep saving as before */ }
    this.loadingStart();
    this.loadingStop();
    this.playing = false; // the next frame tells the SDK whether a game is being played
    await this.setup(CG);
    this.notifyMute();
    for (const f of this.nameListeners) f(this.lockedName);
  },

  // saves through the data module when it is enabled for the game ("Progress Save" in
  // the submission); if it isn't, the SDK throws and the game keeps using localStorage
  useDataModule(data) {
    try {
      if (!data) throw new Error('no data module');
      data.getItem('courtside.probe');
    } catch (e) {
      console.warn('[Courtside] CrazyGames data module unavailable, saving to localStorage:', e && e.message);
      return;
    }
    // a one-time copy of anything saved in this browser before the data module was used
    try {
      const ls = window.localStorage;
      if (!ls.getItem(MOVED_FLAG)) {
        for (const k of SAVE_KEYS) {
          const local = ls.getItem(k);
          if (local != null && data.getItem(k) == null) data.setItem(k, local);
        }
        ls.setItem(MOVED_FLAG, '1');
      }
    } catch (e) { /* localStorage blocked or data limit: nothing to copy */ }
    useStorage(data, 'crazygames');
    this.saves = 'crazygames';
  },

  call(fn) { if (this.sdk) { try { return fn(this.sdk); } catch (e) { console.warn('[Courtside] CrazyGames SDK call failed:', e && e.message); } } return undefined; },

  loadingStart() { this.call((s) => s.game.loadingStart()); },
  loadingStop() { this.call((s) => s.game.loadingStop()); },
  // called every frame with whether the player is playing; the SDK hears the changes
  setGameplay(on) {
    on = !!on;
    if (on === this.playing) return;
    this.playing = on;
    this.call((s) => (on ? s.game.gameplayStart() : s.game.gameplayStop()));
  },
  happytime() { this.call((s) => s.game.happytime()); },

  // fn(muted): told now and whenever the platform mute changes
  onMute(fn) { this.muteListeners.push(fn); fn(this.muted); },
  notifyMute() { for (const f of this.muteListeners) f(this.muted); },
};
