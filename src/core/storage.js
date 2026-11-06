// Where the game keeps everything it saves (career, its backup, settings, visual style,
// tutorial flag). By default that is the browser's localStorage. On CrazyGames the
// platform layer switches it to the SDK's data module, which has the same API: it keeps
// a guest's data in the browser and a logged-in player's data in their CrazyGames
// account, synced across devices.
//
// Like localStorage, the calls may throw (storage blocked, quota or data limit reached);
// callers already handle that.
let backend = null;
let kind = 'localStorage';

export const SAVE_KEYS = ['courtside.settings.v1', 'courtside.style', 'courtside.profile', 'courtside.records'];

const store = () => backend || globalThis.localStorage;

export const storage = {
  get kind() { return kind; },
  getItem(key) { return store().getItem(key); },
  setItem(key, value) { store().setItem(key, String(value)); },
  removeItem(key) { store().removeItem(key); },
};

export function useStorage(b, name) { backend = b; kind = name; }
