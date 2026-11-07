// Career mode checks: schedules, match ratings (calibrated on real full-court AI games),
// skill points and training, reputation, scouts and offers, transfers between leagues,
// the end of a season, and saving/loading.
import { Match } from '../src/sim/match.js';
import { teamConfig } from '../src/game/teams.js';
import { DT } from '../src/sim/constants.js';
import {
  newCareer, nextFixture, finishGame, simulateGame, acceptOffer, train, trainCost, startNextSeason, table, overall,
  matchRating, validCareer, clubsIn, clubById, currentClub, SEASON_ROUNDS, CLUBS,
} from '../src/game/career.js';

let fails = 0;
const ok = (c, msg) => { console.log(`${c ? 'ok  ' : 'FAIL'} ${msg}`); if (!c) fails++; };
const player = { name: 'Test', number: 9, archetype: 'guard', look: { skin: '#c68b5e', hair: '#111', shoes: '#fff', style: 0 } };

// 1. schedules: every club plays once a round, five home games
{
  const c = newCareer({ player, clubId: 'dockside', seed: 7 });
  let good = true;
  for (const tier of [1, 2, 3]) {
    const ids = clubsIn(tier).map((x) => x.id);
    const fx = c.fixtures[tier];
    if (fx.length !== SEASON_ROUNDS) good = false;
    for (const r of fx) { const seen = r.flat(); if (new Set(seen).size !== ids.length) good = false; }
    for (const id of ids) { const home = fx.flat().filter(([h]) => h === id).length; if (home !== 5) good = false; }
    // each pair meets twice, once at each end
    for (const a of ids) for (const b of ids) if (a !== b && fx.flat().filter(([h, w]) => h === a && w === b).length !== 1) good = false;
  }
  ok(good, 'double round robin: 10 rounds, everyone once a round, five home games, each pair home and away');
  ok(overall(c.player.attrs) < 62 && overall(c.player.attrs) > 45, `a new player starts modest (overall ${overall(c.player.attrs)})`);
}

// 2. match ratings from real full-court games: an average player is about 6, the best about 8
{
  const ratings = [];
  for (let g = 0; g < 3; g++) {
    const A = clubsIn(3)[g], B = clubsIn(3)[g + 3];
    const m = new Match({ court: 'full', quarter: 120, seed: 77 + g, difficulty: 'pro', teams: [teamConfig(A, 5), teamConfig(B, 5)] });
    m.start();
    while (m.phase !== 'over' && m.time < 1500) m.step(DT);
    const minutes = (m.quarterLen * 4 + Math.max(0, m.period - 4) * m.otLen) / 60;
    for (const p of m.players) ratings.push(matchRating(m.stats.of(p), minutes, m.winner === p.team));
  }
  ratings.sort((a, b) => a - b);
  const mean = ratings.reduce((a, x) => a + x, 0) / ratings.length;
  const top = ratings[ratings.length - 1], low = ratings[0];
  console.log(`     ratings: mean ${mean.toFixed(2)}  low ${low}  top ${top}  median ${ratings[ratings.length >> 1]}`);
  ok(mean > 5.4 && mean < 6.8, `average match rating is about 6 (${mean.toFixed(2)})`);
  ok(top >= 7.3 && low <= 5.5, 'good and bad games are told apart');
}

// 3. a strong season: a bigger club in your league comes in first, the next league up by
// the end of it; signing moves you there (mid-season: straight into their next game)
{
  const great = { pts: 18, fgm: 7, fga: 11, tpm: 2, tpa: 4, ftm: 2, fta: 2, oreb: 1, dreb: 4, ast: 4, stl: 2, blk: 1, tov: 1, pf: 1 };
  const good = { pts: 9, fgm: 4, fga: 8, tpm: 1, tpa: 3, ftm: 0, fta: 0, oreb: 1, dreb: 2, ast: 2, stl: 1, blk: 0, tov: 1, pf: 1 };
  const c = newCareer({ player, clubId: 'railyard', seed: 11 });
  const offers = [];
  for (let r = 0; r < SEASON_ROUNDS; r++) {
    const sum = finishGame(c, { my: 50, their: 40, line: great, minutes: 8 }, 120);
    for (const o of sum.newOffers) offers.push({ round: r + 1, o });
  }
  const first = offers[0], t2 = offers.find((x) => clubById(x.o.clubId).tier === 2);
  ok(!!first && first.round >= 3, `great games bring an offer (round ${first && first.round}, ${first && clubById(first.o.clubId).name})`);
  ok(!!t2, `a National League club makes an offer during the season (round ${t2 && t2.round}, ${t2 && clubById(t2.o.clubId).name})`);
  ok(c.points > 40, `skill points were earned (${c.points})`);
  const before = c.player.attrs.shooting, pts = c.points, cost = trainCost(before);
  ok(train(c, 'shooting') && c.player.attrs.shooting === before + 1 && c.points === pts - cost, 'training spends points on an attribute');
  // in the summer: sign with a National League club, start the next season there
  const summer = c.offers.find((o) => clubById(o.clubId).tier === 2) || (startNextSeason(c), c.offers.find((o) => clubById(o.clubId).tier === 2));
  if (summer) {
    const to = clubById(summer.clubId);
    acceptOffer(c, summer.id);
    if (c.seasonOver) startNextSeason(c);
    const fx = nextFixture(c);
    ok(currentClub(c).id === to.id && fx && (fx.homeId === to.id || fx.awayId === to.id) && c.contract.years === summer.years, `next season with ${to.name} in the National League (${c.contract.years}-season contract)`);
  } else ok(false, 'a National League offer to sign');

  // mid-season: an ordinary good player gets a same-league offer later, and moves on the spot
  const d = newCareer({ player, clubId: 'railyard', seed: 21 });
  let mid = null;
  for (let r = 0; r < SEASON_ROUNDS && !mid; r++) {
    const sum = finishGame(d, { my: 46, their: 44, line: good, minutes: 8 }, 120);
    if (sum.newOffers.length) mid = { round: r + 1, o: sum.newOffers[0], rating: sum.rating };
  }
  console.log(`     a good player (rating ${mid ? mid.rating : '-'}): first offer in round ${mid ? mid.round : '-'}`);
  if (mid && !d.seasonOver) {
    const to = clubById(mid.o.clubId), round = d.round;
    ok(acceptOffer(d, mid.o.id) && currentClub(d).id === to.id, `a mid-season transfer to ${to.name}`);
    const fx = nextFixture(d);
    ok(fx && fx.round === round && (fx.homeId === to.id || fx.awayId === to.id), "the next game is the new club's game in that round");
  }
}

// 4. poor games: no offers, reputation falls
{
  const c = newCareer({ player, clubId: 'westgate', seed: 12 });
  const poor = { pts: 2, fgm: 1, fga: 8, tpm: 0, tpa: 3, ftm: 0, fta: 2, oreb: 0, dreb: 1, ast: 0, stl: 0, blk: 0, tov: 3, pf: 3 };
  let offers = 0;
  for (let r = 0; r < SEASON_ROUNDS; r++) offers += finishGame(c, { my: 30, their: 45, line: poor, minutes: 8 }, 120).newOffers.length;
  ok(offers === 0 && c.rep < 5, `bad games: no offers, reputation ${c.rep}`);
  ok(c.seasonOver && !nextFixture(c), 'after ten rounds the season is over');
  const tb = table(c, 3);
  ok(tb.reduce((a, r) => a + r.w + r.l, 0) === SEASON_ROUNDS * 6, 'every club played ten games');
  // 5. the next season
  const sum = startNextSeason(c);
  ok(sum.pos >= 1 && c.season === 2 && c.round === 0 && c.history.length === 1 && c.player.age === 20, `season review (${sum.pos}th place) and a new season`);
  ok(table(c, 3).every((r) => r.w === 0 && r.l === 0), 'tables start again');
}

// 6. simulated games, and a save that loads back
{
  const c = newCareer({ player, clubId: 'maple', seed: 13 });
  const sum = simulateGame(c, 120);
  ok(sum && sum.sim && c.round === 1 && c.log.length === 1, `a simulated game counts (rating ${sum && sum.rating})`);
  const back = JSON.parse(JSON.stringify(c));
  ok(validCareer(back) && nextFixture(back).round === 1, 'a saved career loads back');
  ok(!validCareer({ v: 0 }) && !validCareer(null), 'broken saves are rejected');
}

// 7. all clubs are distinct and fictional-looking (ids and short names unique)
ok(new Set(CLUBS.map((x) => x.id)).size === CLUBS.length && new Set(CLUBS.map((x) => x.short)).size === CLUBS.length, '18 clubs with unique ids and short names');

console.log(fails ? `${fails} FAILED` : 'all career checks passed');
process.exit(fails ? 1 : 0);
