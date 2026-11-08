// A stand-in for https://sdk.crazygames.com/crazygames-sdk-v3.js used by
// tests/crazygames.mjs (the real SDK isn't reachable from the test environment), adapted
// from First Touch's. It has the v3 surface the game uses and records every call in
// window.__cg.calls.
// Query options: ?cgenv=local|crazygames|disabled (default crazygames),
// ?cgdata=off (data module not enabled: its calls throw), ?cguser=<name> (logged in as
// that CrazyGames user; a guest otherwise), ?muteAudio=true.
// window.__cg.login(name) / logout() / setMute(m) change things during the session.
(() => {
  const q = new URLSearchParams(location.search);
  const env = q.get('cgenv') || 'crazygames';
  const calls = [];
  const rec = (name, arg) => { calls.push(arg === undefined ? name : `${name}:${arg}`); };
  const disabled = () => { throw new Error('CrazySDK is disabled on this domain'); };
  // the "cloud": kept in localStorage under a prefix so it survives reloads in the test
  const P = 'cgcloud:';
  const data = {
    getItem(k) { if (q.get('cgdata') === 'off') throw new Error('Data module is not enabled'); rec('data.getItem', k); return localStorage.getItem(P + k); },
    setItem(k, v) { if (q.get('cgdata') === 'off') throw new Error('Data module is not enabled'); rec('data.setItem', k); localStorage.setItem(P + k, String(v)); },
    removeItem(k) { rec('data.removeItem', k); localStorage.removeItem(P + k); },
    clear() { for (const k of Object.keys(localStorage)) if (k.startsWith(P)) localStorage.removeItem(k); },
  };
  const settingsListeners = [];
  const authListeners = [];
  let user = q.get('cguser') ? { username: q.get('cguser'), profilePictureUrl: '' } : null;
  const guard = (o) => new Proxy(o, { get: (t, p) => (env === 'disabled' && typeof t[p] === 'function' ? disabled : t[p]) });
  window.__cg = {
    calls,
    setMute(m) { SDK.game.settings.muteAudio = m; for (const f of settingsListeners) f({ muteAudio: m, disableChat: false }); },
    login(name) { user = { username: name, profilePictureUrl: '' }; for (const f of authListeners) f(user); },
    logout() { user = null; for (const f of authListeners) f(null); },
  };
  const SDK = {
    environment: 'uninitialized',
    async init() { rec('init'); await new Promise((r) => setTimeout(r, 30)); SDK.environment = env; },
    data: guard(data),
    user: guard({
      isUserAccountAvailable: true,
      async getUser() { rec('getUser'); await new Promise((r) => setTimeout(r, 10)); return user; },
      addAuthListener(f) { authListeners.push(f); },
      removeAuthListener(f) { const i = authListeners.indexOf(f); if (i >= 0) authListeners.splice(i, 1); },
    }),
    game: guard({
      settings: { muteAudio: q.get('muteAudio') === 'true', disableChat: false },
      loadingStart() { rec('loadingStart'); },
      loadingStop() { rec('loadingStop'); },
      gameplayStart() { rec('gameplayStart'); },
      gameplayStop() { rec('gameplayStop'); },
      happytime() { rec('happytime'); },
      addSettingsChangeListener(f) { settingsListeners.push(f); },
    }),
    ad: guard({
      requestAd(type) { rec('requestAd', type); },
      hasAdblock() { return Promise.resolve(false); },
    }),
    banner: guard({
      requestBanner({ id }) { rec('requestBanner', id); return Promise.resolve(); },
      clearBanner(id) { rec('clearBanner', id); },
      clearAllBanners() { rec('clearAllBanners'); },
    }),
  };
  window.CrazyGames = { SDK };
})();
