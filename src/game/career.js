// Career mode: you create a player and play their games, one season after another.
// Three leagues of six fictional clubs (City League -> National League -> Premier
// League). Every round all leagues play: your club's game is played by you (or
// simulated), the rest are simulated from team strength. Each game you play gets a
// match rating (from the box score); it earns skill points to train your attributes,
// builds your reputation, and makes scouts of bigger clubs take notice. When a club's
// interest is high enough it makes an offer (a contract for one to three seasons):
// accept it and you join them straight away, in their league.
//
// Pure data + logic: no DOM. Saved as one JSON object by the app.
import { Rng, hashString } from '../sim/rng.js';
import { ATTRS } from '../sim/constants.js';
import { TEAMS, ARCHETYPES } from './teams.js';

export const CAREER_VERSION = 1;
export const SEASON_ROUNDS = 10;

export const LEAGUES = {
  3: { tier: 3, name: 'City League', short: 'CITY', venue: 'gym', salary: 40, minRep: 0, need: 6.0 },
  2: { tier: 2, name: 'National League', short: 'NAT', venue: 'gym', salary: 260, minRep: 18, need: 6.6 },
  1: { tier: 1, name: 'Premier League', short: 'PREM', venue: 'arena', salary: 1800, minRep: 48, need: 7.2 },
};

const t = (id) => TEAMS.find((x) => x.id === id);
// all clubs are fictional; the Premier League uses the quick-match teams
export const CLUBS = [
  ...['ember', 'summit', 'glacier', 'river', 'northside', 'harbor'].map((id) => ({ ...t(id), tier: 1 })),
  { ...t('bayview'), tier: 2 },
  { ...t('mesa'), tier: 2 },
  { id: 'copperton', name: 'Copperton Miners', short: 'COP', colors: ['#b5651d', '#1b1b1b', '#ffffff'], strength: 65, tier: 2 },
  { id: 'lakeshore', name: 'Lakeshore Herons', short: 'LAK', colors: ['#5fa8d3', '#ffffff', '#1b4965'], strength: 64, tier: 2 },
  { id: 'ironbridge', name: 'Ironbridge Bulls', short: 'IRO', colors: ['#6c757d', '#e63946', '#ffffff'], strength: 63, tier: 2 },
  { id: 'pinecrest', name: 'Pinecrest Foxes', short: 'PIN', colors: ['#2d6a4f', '#ff9f1c', '#ffffff'], strength: 62, tier: 2 },
  { id: 'dockside', name: 'Dockside Gulls', short: 'DOC', colors: ['#f1faee', '#457b9d', '#1d3557'], strength: 60, tier: 3 },
  { id: 'westgate', name: 'Westgate Rangers', short: 'WES', colors: ['#d62828', '#fcbf49', '#ffffff'], strength: 58, tier: 3 },
  { id: 'maple', name: 'Maple Street Ravens', short: 'MAP', colors: ['#3d348b', '#f7b801', '#ffffff'], strength: 57, tier: 3 },
  { id: 'oldtown', name: 'Old Town Badgers', short: 'OLD', colors: ['#7f5539', '#ede0d4', '#1b1b1b'], strength: 55, tier: 3 },
  { id: 'sunset', name: 'Sunset Park Coyotes', short: 'SUN', colors: ['#f77f00', '#003049', '#ffffff'], strength: 54, tier: 3 },
  { id: 'railyard', name: 'Railyard Bison', short: 'RAI', colors: ['#495057', '#90be6d', '#ffffff'], strength: 52, tier: 3 },
];
export const clubById = (id) => CLUBS.find((c) => c.id === id) || CLUBS[CLUBS.length - 1];
export const clubsIn = (tier) => CLUBS.filter((c) => c.tier === tier);

// ------------------------------------------------------------------ ratings
export function overall(attrs) {
  return Math.round(ATTRS.reduce((a, k) => a + (attrs[k] || 0), 0) / ATTRS.length);
}
// the cost of the next point in an attribute
export function trainCost(v) { return v >= 90 ? 4 : v >= 80 ? 3 : v >= 68 ? 2 : 1; }

// a starting player: the play style's profile, well below its peak
export function startingAttrs(archetype) {
  const a = ARCHETYPES[archetype] || ARCHETYPES.slasher;
  return Object.fromEntries(ATTRS.map((k) => [k, Math.max(40, Math.round(a.attrs[k] - 22))]));
}

// a game's box score -> a 1-10 match rating (6 is a solid game)
// stats: the player's line; minutes: real minutes played (game clock); won: bool
export function matchRating(stats, minutes, won) {
  const gs = stats.pts + 0.4 * stats.fgm - 0.7 * (stats.fga - stats.fgm) - 0.4 * (stats.fta - stats.ftm) + 0.7 * stats.oreb + 0.35 * stats.dreb + stats.stl + 0.7 * stats.ast + 0.7 * stats.blk - 0.4 * stats.pf - stats.tov;
  const per8 = (gs * 8) / Math.max(4, minutes);
  const r = 4.75 + per8 * 0.17 + (won ? 0.45 : -0.15);
  return Math.round(Math.max(1, Math.min(10, r)) * 10) / 10;
}

export function roleFor(ovr, club) {
  const d = ovr - (club.strength + 3);
  if (d >= 10) return 'Franchise star';
  if (d >= 3) return 'Starter';
  if (d >= -6) return 'Rotation player';
  return 'Prospect';
}

// ------------------------------------------------------------------ setup
// circle-method round robin for six clubs, then the same rounds with home and away swapped
function fixturesFor(ids, rng) {
  const a = [...ids];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng.next() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  const n = a.length, rounds = [];
  for (let r = 0; r < n - 1; r++) {
    const games = [];
    for (let i = 0; i < n / 2; i++) {
      const h = a[i], w = a[n - 1 - i];
      games.push(r % 2 === 0 ? [h, w] : [w, h]);
    }
    rounds.push(games);
    a.splice(1, 0, a.pop());
  }
  return [...rounds, ...rounds.map((g) => g.map(([h, w]) => [w, h]))];
}

function freshTables() {
  const t2 = {};
  for (const c of CLUBS) t2[c.id] = { w: 0, l: 0, pf: 0, pa: 0 };
  return t2;
}

export function newCareer({ player, clubId, difficulty = 'pro', quarterLength = 'short', seed }) {
  const s = seed ?? ((Date.now() & 0xffffff) + 1);
  const club = clubById(clubId);
  const c = {
    v: CAREER_VERSION, seed: s, created: Date.now(),
    difficulty, quarterLength,
    player: {
      name: player.name || 'You', number: player.number ?? 23, archetype: player.archetype || 'slasher',
      look: { ...player.look }, attrs: player.attrs ? { ...player.attrs } : startingAttrs(player.archetype), age: 19,
    },
    season: 1, round: 0,
    clubId: club.id,
    contract: { years: 1, salary: contractSalary(club, 5) },
    rep: 5, points: 2, earnings: 0,
    interest: {}, offers: [], offerSeq: 1,
    news: [],
    log: [],            // this season's games: { round, opp, home, my, their, won, rating, line, sim }
    history: [],        // finished seasons
    totals: { gp: 0, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, fgm: 0, fga: 0, tpm: 0, tpa: 0, wins: 0 },
    tables: freshTables(),
    fixtures: {},
    results: {},
    seasonOver: false,
  };
  makeSeason(c);
  addNews(c, `Signed for ${club.name} (${LEAGUES[club.tier].name}). Show them what you can do.`);
  return c;
}

function makeSeason(c) {
  const rng = new Rng(hashString(`season${c.season}`) ^ c.seed);
  for (const tier of [1, 2, 3]) { c.fixtures[tier] = fixturesFor(clubsIn(tier).map((x) => x.id), rng); c.results[tier] = []; }
  c.tables = freshTables();
  c.round = 0;
  c.log = [];
  c.seasonOver = false;
}

export function contractSalary(club, rep) {
  const L = LEAGUES[club.tier];
  return Math.round(L.salary * (0.7 + rep / 120) * (0.85 + (club.strength - 50) / 140)) * 1000;
}

function addNews(c, text, kind = '') {
  c.news.unshift({ text, kind, season: c.season, round: c.round });
  if (c.news.length > 40) c.news.length = 40;
}

// ------------------------------------------------------------------ queries
export const currentClub = (c) => clubById(c.clubId);
export const leagueOf = (c) => LEAGUES[currentClub(c).tier];

// this round's game for the player's club
export function nextFixture(c) {
  if (c.seasonOver) return null;
  const club = currentClub(c);
  const games = c.fixtures[club.tier][c.round] || [];
  const g = games.find(([h, a]) => h === club.id || a === club.id);
  if (!g) return null;
  const home = g[0] === club.id;
  return { round: c.round, home, opp: clubById(home ? g[1] : g[0]), homeId: g[0], awayId: g[1] };
}

// the league table, best first (wins, then point difference)
export function table(c, tier) {
  return clubsIn(tier).map((x) => ({ club: x, ...c.tables[x.id] }))
    .sort((a, b) => b.w - a.w || (b.pf - b.pa) - (a.pf - a.pa) || b.pf - a.pf);
}

export function seasonAverages(c) {
  const g = c.log.filter((x) => !x.sim || x.line);
  const n = g.length || 1;
  const sum = (k) => g.reduce((a, x) => a + (x.line ? x.line[k] || 0 : 0), 0);
  const rated = c.log.length ? c.log.reduce((a, x) => a + x.rating, 0) / c.log.length : 0;
  return { gp: c.log.length, ppg: sum('pts') / n, rpg: sum('reb') / n, apg: sum('ast') / n, rating: Math.round(rated * 10) / 10, wins: c.log.filter((x) => x.won).length };
}

// ------------------------------------------------------------------ simulation
// a simulated score for a game between two clubs (scaled to the quarter length)
function simScore(rng, home, away, quarter) {
  const k = quarter / 120;
  const base = 42 * k;
  const margin = (home.strength - away.strength) * 0.55 * k + 1.5 * k;
  let hs = Math.round(base + margin / 2 + rng.gauss() * 6 * Math.sqrt(k));
  let as = Math.round(base - margin / 2 + rng.gauss() * 6 * Math.sqrt(k));
  if (hs === as) { if (rng.next() < 0.5 + margin / 40) hs += 2; else as += 2; }
  return [Math.max(8, hs), Math.max(8, as)];
}

function record(c, homeId, awayId, hs, as) {
  const H = c.tables[homeId], A = c.tables[awayId];
  H.pf += hs; H.pa += as; A.pf += as; A.pa += hs;
  if (hs > as) { H.w++; A.l++; } else { A.w++; H.l++; }
}

// every other game of this round, in every league
function playRestOfRound(c, quarter, mine) {
  const rng = new Rng(hashString(`r${c.season}.${c.round}`) ^ c.seed);
  for (const tier of [1, 2, 3]) {
    const res = [];
    for (const [h, a] of c.fixtures[tier][c.round] || []) {
      if (mine && h === mine.homeId && a === mine.awayId) { res.push({ h, a, hs: mine.hs, as: mine.as, mine: true }); continue; }
      const [hs, as] = simScore(rng, clubById(h), clubById(a), quarter);
      record(c, h, a, hs, as);
      res.push({ h, a, hs, as });
    }
    c.results[tier][c.round] = res;
  }
}

// ------------------------------------------------------------------ after a game
// result: { my, their, line (box score of the player), minutes, sim }
// returns a summary for the result screen
export function finishGame(c, result, quarter) {
  const fx = nextFixture(c);
  if (!fx) return null;
  const club = currentClub(c), L = LEAGUES[club.tier];
  const won = result.my > result.their;
  const rating = result.rating ?? matchRating(result.line, result.minutes, won);
  const hs = fx.home ? result.my : result.their, as = fx.home ? result.their : result.my;
  record(c, fx.homeId, fx.awayId, hs, as);
  playRestOfRound(c, quarter, { homeId: fx.homeId, awayId: fx.awayId, hs, as });
  const line = result.line ? { pts: result.line.pts, reb: (result.line.oreb || 0) + (result.line.dreb || 0), ast: result.line.ast, stl: result.line.stl, blk: result.line.blk, fgm: result.line.fgm, fga: result.line.fga, tpm: result.line.tpm, tpa: result.line.tpa } : null;
  c.log.push({ round: c.round, opp: fx.opp.id, home: fx.home, my: result.my, their: result.their, won, rating, line, sim: !!result.sim });
  const T = c.totals;
  T.gp++; if (won) T.wins++;
  if (line) for (const k of ['pts', 'reb', 'ast', 'stl', 'blk', 'fgm', 'fga', 'tpm', 'tpa']) T[k] += line[k] || 0;

  // skill points and reputation: a simulated game counts for less
  const simK = result.sim ? 0.5 : 1;
  const pts = Math.max(1, Math.round((1 + rating / 2.6 + (won ? 0.5 : 0)) * simK));
  c.points += pts;
  const tierK = club.tier === 1 ? 1.5 : club.tier === 2 ? 1.25 : 1;
  const repDelta = Math.round(((rating - 6.1) * 2.6 * tierK + (won ? 0.6 : 0)) * simK * 10) / 10;
  c.rep = Math.max(0, Math.min(100, Math.round((c.rep + repDelta) * 10) / 10));

  // scouts: clubs above yours watch; good games raise their interest
  const notes = [];
  const newOffers = [];
  for (const o of CLUBS) {
    if (o.id === club.id) continue;
    const better = o.tier < club.tier || (o.tier === club.tier && o.strength > club.strength + 3);
    if (!better) continue;
    const OL = LEAGUES[o.tier];
    if (c.rep < OL.minRep) continue;
    // two leagues up is a long shot until your reputation is big
    if (club.tier - o.tier > 1 && c.rep < LEAGUES[o.tier].minRep + 20) continue;
    const need = OL.need + (o.strength - 70) / 25;
    const before = c.interest[o.id] || 0;
    let after = before + (rating - need) * 9 * simK + (won ? 3 : 0) - 2;
    after = Math.max(0, Math.min(120, after));
    c.interest[o.id] = Math.round(after);
    if (before < 40 && after >= 40) notes.push(`${o.name} scouts were watching.`);
    if (after >= 100 && !c.offers.some((x) => x.clubId === o.id)) {
      const off = makeOffer(c, o);
      c.offers.push(off);
      newOffers.push(off);
      c.interest[o.id] = 70;
    }
  }
  c.earnings += Math.round(c.contract.salary / SEASON_ROUNDS);
  // offers run out after three rounds
  const expired = c.offers.filter((x) => c.round >= x.expires);
  c.offers = c.offers.filter((x) => c.round < x.expires);
  for (const x of expired) addNews(c, `The offer from ${clubById(x.clubId).name} expired.`);
  for (const n of notes) addNews(c, n, 'scout');
  for (const x of newOffers) addNews(c, `OFFER: ${clubById(x.clubId).name} want to sign you.`, 'offer');
  const summary = {
    rating, won, pts, repDelta, rep: c.rep, newOffers, notes, opp: fx.opp, my: result.my, their: result.their,
    season: c.season, round: c.round + 1, sim: !!result.sim,
  };
  addNews(c, `${won ? 'W' : 'L'} ${result.my}-${result.their} ${fx.home ? 'v' : '@'} ${fx.opp.name} · rating ${rating.toFixed(1)}`, won ? 'win' : 'loss');
  c.round++;
  if (c.round >= SEASON_ROUNDS) { c.seasonOver = true; c.seasonClubId = c.clubId; }
  return summary;
}

function makeOffer(c, club) {
  const rng = new Rng(hashString(`${club.id}.${c.season}.${c.round}`) ^ c.seed);
  const years = 1 + Math.floor(rng.next() * 3);
  return { id: c.offerSeq++, clubId: club.id, years, salary: contractSalary(club, c.rep), expires: c.round + 3, season: c.season };
}

// a game you skip: an estimated performance from your rating against the club's
export function simulateGame(c, quarter) {
  const fx = nextFixture(c);
  if (!fx) return null;
  const club = currentClub(c);
  const rng = new Rng(hashString(`sim${c.season}.${c.round}`) ^ c.seed);
  const ovr = overall(c.player.attrs);
  const [hs, as] = simScore(rng, fx.home ? club : fx.opp, fx.home ? fx.opp : club, quarter);
  const my = fx.home ? hs : as, their = fx.home ? as : hs;
  const rating = Math.round(Math.max(3, Math.min(9, 5.7 + (ovr - club.strength) / 12 + rng.gauss() * 0.7 + (my > their ? 0.3 : -0.1))) * 10) / 10;
  const k = quarter / 120;
  const line = { pts: Math.max(0, Math.round((4 + (rating - 5) * 2.2) * k + rng.gauss() * 1.5)), oreb: 0, dreb: Math.max(0, Math.round(1.5 * k + rng.gauss())), ast: Math.max(0, Math.round(1.2 * k + rng.gauss())), stl: Math.max(0, Math.round(rng.next() * 1.4)), blk: Math.max(0, Math.round(rng.next() * 1.1)) };
  line.fgm = Math.round(line.pts / 2.3); line.fga = Math.max(line.fgm, Math.round(line.fgm * 2.1)); line.tpm = 0; line.tpa = 0;
  return finishGame(c, { my, their, line, rating, sim: true }, quarter);
}

// ------------------------------------------------------------------ offers and training
export function acceptOffer(c, id) {
  const o = c.offers.find((x) => x.id === id);
  if (!o) return false;
  const from = currentClub(c), to = clubById(o.clubId);
  c.clubId = to.id;
  // signed in the summer: the contract starts with next season
  c.contract = { years: o.years, salary: o.salary, fresh: !!c.seasonOver };
  c.offers = c.offers.filter((x) => x.clubId !== to.id && clubById(x.clubId).tier <= to.tier && x.clubId !== from.id);
  c.interest[to.id] = 0;
  addNews(c, `TRANSFER: you left ${from.name} for ${to.name} (${LEAGUES[to.tier].name}, ${o.years} season${o.years > 1 ? 's' : ''}).`, 'offer');
  return true;
}

export function declineOffer(c, id) {
  const o = c.offers.find((x) => x.id === id);
  if (!o) return false;
  c.offers = c.offers.filter((x) => x.id !== id);
  c.interest[o.clubId] = Math.min(c.interest[o.clubId] || 0, 45);
  addNews(c, `You turned down ${clubById(o.clubId).name}.`);
  return true;
}

export function train(c, attr) {
  const v = c.player.attrs[attr];
  if (v == null || v >= 99) return false;
  const cost = trainCost(v);
  if (c.points < cost) return false;
  c.points -= cost;
  c.player.attrs[attr] = v + 1;
  return true;
}

// ------------------------------------------------------------------ season end
export function seasonSummary(c) {
  const club = clubById(c.seasonClubId || c.clubId);
  const tb = table(c, club.tier);
  const pos = tb.findIndex((r) => r.club.id === club.id) + 1;
  const av = seasonAverages(c);
  const awards = [];
  if (pos === 1) awards.push(`${LEAGUES[club.tier].name} champions`);
  if (av.rating >= 7.8) awards.push('League MVP');
  else if (av.rating >= 7.0) awards.push('All-League team');
  const champions = [1, 2, 3].map((tier) => ({ tier, club: table(c, tier)[0].club }));
  return { season: c.season, club, pos, av, awards, champions };
}

// close the season: history, aging, contracts, end-of-season offers; then a new season
export function startNextSeason(c) {
  const sum = seasonSummary(c);
  c.history.push({ season: c.season, clubId: sum.club.id, tier: sum.club.tier, pos: sum.pos, gp: sum.av.gp, ppg: Math.round(sum.av.ppg * 10) / 10, rating: sum.av.rating, awards: sum.awards });
  if (sum.awards.length) addNews(c, `Season ${c.season}: ${sum.awards.join(', ')}!`, 'win');
  c.rep = Math.min(100, c.rep + sum.awards.length * 4 + (sum.pos === 1 ? 3 : 0));
  // a little natural growth while young, a little decline later
  const p = c.player;
  p.age++;
  if (p.age <= 24) c.points += 4;
  if (p.age >= 31) for (const k of ['speed', 'vertical']) p.attrs[k] = Math.max(40, p.attrs[k] - 1);
  if (c.contract.fresh) delete c.contract.fresh; else c.contract.years--;
  c.seasonClubId = null;
  const club = currentClub(c);
  if (c.contract.years <= 0) {
    c.contract = { years: 2, salary: contractSalary(club, c.rep) };
    addNews(c, `${club.name} extended your contract (2 seasons).`);
  }
  c.offers = [];
  c.season++;
  makeSeason(c);
  // clubs that were keen make offers in the summer
  for (const o of CLUBS) {
    if (o.id === c.clubId || (c.interest[o.id] || 0) < 70) continue;
    if (c.rep < LEAGUES[o.tier].minRep) continue;
    const off = makeOffer(c, o);
    c.offers.push(off);
    c.interest[o.id] = 50;
    addNews(c, `OFFER: ${o.name} want to sign you for next season.`, 'offer');
  }
  addNews(c, `Season ${c.season} begins.`);
  return sum;
}

// a saved career, checked (older or broken saves are dropped)
export function validCareer(c) {
  return !!(c && c.v === CAREER_VERSION && c.player && c.player.attrs && c.clubId && c.fixtures && c.tables);
}
