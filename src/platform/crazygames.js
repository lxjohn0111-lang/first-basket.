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

const INIT_TIMEOUT = 10000;
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

  async init() {
    const CG = window.CrazyGames && window.CrazyGames.SDK;
    if (!CG) return this;
    try {
      let timer;
      await Promise.race([CG.init(), new Promise((_, rej) => { timer = setTimeout(() => rej(new Error('SDK init timed out')), INIT_TIMEOUT); })]);
      clearTimeout(timer);
    } catch (e) {
      console.warn('[Courtside] CrazyGames SDK unavailable, playing without it:', e && e.message);
      this.env = 'disabled';
      return this;
    }
    this.env = CG.environment || 'disabled';
    // on other domains the SDK is "disabled" and every call would throw
    if (this.env !== 'local' && this.env !== 'crazygames') return this;
    this.sdk = CG;
    this.useDataModule(CG.data);
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
    return this;
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
