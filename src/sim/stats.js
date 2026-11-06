// Box score from the match's own events and rule decisions (never from button presses):
// points, field goals, threes, free throws, rebounds, assists, steals, blocks,
// turnovers, fouls and passes, plus possession time per team and a game grade.
const KEYS = ['pts', 'fgm', 'fga', 'tpm', 'tpa', 'ftm', 'fta', 'oreb', 'dreb', 'ast', 'stl', 'blk', 'tov', 'pf', 'pass', 'pcmp'];

export class Stats {
  constructor(m) {
    this.m = m;
    this.p = new Map();
    for (const pl of m.players) this.p.set(pl, Object.fromEntries(KEYS.map((k) => [k, 0])));
    this.poss = [0, 0];
    m.events.on('pass', (e) => this.add(e.player, 'pass'));
  }
  add(pl, k, v = 1) { const s = this.p.get(pl); if (s && k in s) s[k] += v; }
  of(pl) { return this.p.get(pl); }
  update(dt) {
    const m = this.m;
    if (m.phase === 'live') this.poss[m.offense] += dt;
  }

  // a single-number game score turned into a letter grade
  gameScore(pl) {
    const s = this.of(pl);
    return s.pts + 0.4 * s.fgm - 0.6 * s.fga - 0.4 * (s.fta - s.ftm) + 0.7 * s.oreb + 0.35 * s.dreb + s.stl + 0.7 * s.ast + 0.7 * s.blk - 0.4 * s.pf - s.tov;
  }
  grade(pl) {
    const g = this.gameScore(pl);
    const scale = [[14, 'A+'], [10, 'A'], [7.5, 'A-'], [5.5, 'B+'], [4, 'B'], [2.5, 'B-'], [1.2, 'C+'], [0.2, 'C'], [-1, 'C-'], [-2.5, 'D'], [-Infinity, 'F']];
    for (const [v, l] of scale) if (g >= v) return l;
    return 'F';
  }

  team(t) {
    const tot = Object.fromEntries(KEYS.map((k) => [k, 0]));
    for (const pl of this.m.teams[t].players) { const s = this.of(pl); for (const k of KEYS) tot[k] += s[k]; }
    return tot;
  }

  report(pl) {
    const m = this.m;
    const s = this.of(pl);
    const pct = (a, b) => (b ? Math.round((a / b) * 100) : null);
    const tp = this.poss[0] + this.poss[1] || 1;
    // player of the game: the best game score on the winning side (or overall on a tie)
    let mvp = null, best = -1e9;
    for (const q of m.players) {
      const g = this.gameScore(q) + (q.team === m.winner ? 2 : 0);
      if (g > best) { best = g; mvp = q; }
    }
    return {
      score: m.scoreline, stats: { ...s, fgPct: pct(s.fgm, s.fga), tpPct: pct(s.tpm, s.tpa), ftPct: pct(s.ftm, s.fta), reb: s.oreb + s.dreb },
      grade: this.grade(pl), gameScore: this.gameScore(pl),
      possession: [Math.round((this.poss[0] / tp) * 100), Math.round((this.poss[1] / tp) * 100)],
      teams: [this.team(0), this.team(1)], mvp,
    };
  }
}
