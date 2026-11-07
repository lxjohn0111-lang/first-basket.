// Fictional teams, player archetypes and rosters. Everything here is original.
import { hashString, Rng } from '../sim/rng.js';

export const ARCHETYPES = {
  guard: { id: 'guard', name: 'Floor General', pos: 'PG', desc: 'Quick, slick handles, sharp passing.', attrs: { shooting: 72, handling: 90, speed: 88, defense: 62, passing: 90, vertical: 60 } },
  shooter: { id: 'shooter', name: 'Sharpshooter', pos: 'SG', desc: 'Deadly from deep. Wider sweet spot.', attrs: { shooting: 92, handling: 74, speed: 76, defense: 60, passing: 70, vertical: 62 } },
  slasher: { id: 'slasher', name: 'Slasher', pos: 'SF', desc: 'Attacks the rim and finishes above it.', attrs: { shooting: 66, handling: 80, speed: 84, defense: 70, passing: 64, vertical: 88 } },
  forward: { id: 'forward', name: 'Two-Way Forward', pos: 'PF', desc: 'Defends, rebounds and hits the mid-range.', attrs: { shooting: 74, handling: 64, speed: 72, defense: 82, passing: 66, vertical: 78 } },
  big: { id: 'big', name: 'Rim Protector', pos: 'C', desc: 'Blocks, rebounds and powerful dunks.', attrs: { shooting: 52, handling: 56, speed: 64, defense: 90, passing: 62, vertical: 82 } },
};

export const TEAMS = [
  { id: 'harbor', name: 'Harbor Hawks', short: 'HAW', colors: ['#e63946', '#ffffff', '#1d3557'], strength: 70 },
  { id: 'mesa', name: 'Mesa Comets', short: 'MES', colors: ['#f4a261', '#264653', '#ffffff'], strength: 66 },
  { id: 'northside', name: 'Northside Owls', short: 'NOR', colors: ['#2a9d8f', '#ffffff', '#0b3c49'], strength: 72 },
  { id: 'river', name: 'Riverside Rockets', short: 'RIV', colors: ['#3a86ff', '#ffbe0b', '#ffffff'], strength: 74 },
  { id: 'summit', name: 'Summit Lions', short: 'SUM', colors: ['#8338ec', '#ffd60a', '#ffffff'], strength: 78 },
  { id: 'bayview', name: 'Bayview Sharks', short: 'BAY', colors: ['#06a77d', '#052f5f', '#ffffff'], strength: 68 },
  { id: 'ember', name: 'Ember City Flames', short: 'EMB', colors: ['#ff6b00', '#141414', '#ffffff'], strength: 82 },
  { id: 'glacier', name: 'Glacier Wolves', short: 'GLA', colors: ['#9ad1d4', '#1d3557', '#ffffff'], strength: 76 },
];
export const teamById = (id) => TEAMS.find((t) => t.id === id) || TEAMS[0];

const FIRST = ['Jalen', 'Marcus', 'Theo', 'Andre', 'Kofi', 'Luca', 'Mateo', 'Darius', 'Ezra', 'Isaiah', 'Niko', 'Omar', 'Rafa', 'Tariq', 'Wes', 'Yusuf', 'Zane', 'Bo', 'Cal', 'Dev', 'Femi', 'Hugo', 'Ike', 'Jun', 'Kai', 'Leon', 'Milo', 'Nate', 'Otis', 'Quinn', 'Remy', 'Sol'];
const LAST = ['Okafor', 'Reyes', 'Lindqvist', 'Brooks', 'Mensah', 'Novak', 'Castillo', 'Hale', 'Ivers', 'Adeyemi', 'Petrov', 'Sato', 'Moreau', 'Kowalski', 'Ferreira', 'Grant', 'Haddad', 'Jensen', 'Kim', 'Lowe', 'Mbeki', 'Ortega', 'Park', 'Quist', 'Rossi', 'Sterling', 'Tanaka', 'Underwood', 'Vance', 'Whitaker', 'Young', 'Zhou'];
const SKIN = ['#f3d2b3', '#e0b48c', '#c68b5e', '#a26a43', '#7b4b2c', '#4f2f1c'];
const HAIR = ['#111111', '#3b2a1e', '#7a4a24', '#c58b3a', '#e8d18a', '#b23a1d'];
const SHOES = ['#111111', '#f5f5f5', '#ffc61a', '#2fd4ff', '#ff4d5e', '#33d36c'];
export const LOOK_OPTIONS = { SKIN, HAIR, SHOES };

// positions in roster (slot) order: PG, SG, SF, PF, C
const ORDER = ['guard', 'shooter', 'slasher', 'forward', 'big'];
const LINEUPS = { 1: ['slasher'], 2: ['guard', 'big'], 3: ['guard', 'slasher', 'big'], 4: ['guard', 'shooter', 'slasher', 'big'], 5: ORDER };

// generated players for a team (one roster per team, stable across games); slot k plays
// the same position on every team, so full-court matchups pair like with like
export function roster(team, n = 3) {
  const r = new Rng(hashString(team.id) + 17);
  const used = new Set();
  const out = [];
  const arch = LINEUPS[n] || ORDER;
  for (let i = 0; i < n; i++) {
    let name;
    do { name = `${r.pick(FIRST)} ${r.pick(LAST)}`; } while (used.has(name));
    used.add(name);
    const a = ARCHETYPES[arch[i % arch.length]];
    const shift = team.strength - 75;
    const attrs = Object.fromEntries(Object.entries(a.attrs).map(([k, v]) => [k, Math.max(35, Math.min(97, Math.round(v + shift + r.range(-5, 5))))]));
    out.push({
      name, number: [0, 1, 3, 4, 5, 7, 8, 10, 11, 12, 13, 15, 21, 23, 24, 30, 33, 34][r.int(0, 17)] + (i === 1 ? 0 : 0),
      archetype: a.id, attrs,
      look: { skin: r.pick(SKIN), hair: r.pick(HAIR), shoes: r.pick(SHOES), style: r.int(0, 5) },
    });
  }
  // unique numbers
  const seen = new Set();
  for (const p of out) { while (seen.has(p.number)) p.number = (p.number + 7) % 56; seen.add(p.number); }
  return out;
}

export function defaultPlayer() {
  return { name: 'You', number: 23, archetype: 'slasher', look: { skin: '#c68b5e', hair: '#111111', shoes: '#ffc61a', style: 0 } };
}

// the human's player card -> a roster entry (a career player brings their own ratings)
export function humanEntry(pc) {
  const a = ARCHETYPES[pc.archetype] || ARCHETYPES.slasher;
  return { name: pc.name || 'You', number: pc.number ?? 23, archetype: a.id, attrs: { ...(pc.attrs || a.attrs) }, look: { ...pc.look }, isHuman: true };
}

// a team for a game. Half court (up to 3): the human replaces the first generated
// player. Full court: the human takes the place of the player at their position.
export function teamConfig(team, size, human = null) {
  const r = roster(team, size);
  let players = r.slice(0, size);
  if (human) {
    const me = humanEntry(human);
    let slot = 0;
    if (size >= 4) {
      const want = ORDER.indexOf(me.archetype);
      let bd = 9;
      players.forEach((p, i) => { const d = Math.abs(ORDER.indexOf(p.archetype) - want); if (d < bd) { bd = d; slot = i; } });
    }
    players = players.map((p, i) => (i === slot ? me : p));
    // nobody else wears the human's number
    const taken = new Set([me.number]);
    for (const p of players) { if (p === me) continue; while (taken.has(p.number)) p.number = (p.number + 7) % 56; taken.add(p.number); }
  }
  return { name: team.name, short: team.short, id: team.id, colors: team.colors, roster: players };
}

export { ORDER };
