// Career screens: create your player, the career hub (next game, league tables,
// results, offers, training, stats, news), the post-game report with the match rating
// and scouting news, and the end-of-season summary. Built with the same arcade design
// system as the other screens (First Touch's hub layout: top bar, match card, tabs).
import { ARCHETYPES, LOOK_OPTIONS } from '../game/teams.js';
import { ATTRS, ATTR_LABELS, FULL_LENGTHS } from '../sim/constants.js';
import { DIFFICULTY } from '../sim/match.js';
import {
  LEAGUES, CLUBS, SEASON_ROUNDS, clubById, clubsIn, currentClub, nextFixture, table, overall, trainCost,
  startingAttrs, newCareer, finishGame, simulateGame, acceptOffer, declineOffer, train, seasonSummary,
  startNextSeason, seasonAverages, roleFor,
} from '../game/career.js';
import { crestSVG } from './screens.js';
import { icon } from './icons.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const HAIR_NAMES = ['Crop', 'Afro', 'Buzz', 'Headband', 'Braids', 'Bald'];
const money = (v) => (v >= 1e6 ? `$${(v / 1e6).toFixed(1)}M` : `$${Math.round(v / 1000)}k`);
const ord = (n) => `${n}${n % 10 === 1 && n % 100 !== 11 ? 'st' : n % 10 === 2 && n % 100 !== 12 ? 'nd' : n % 10 === 3 && n % 100 !== 13 ? 'rd' : 'th'}`;
const ratingClass = (r) => (r >= 7.5 ? 'hi' : r < 5.5 ? 'lo' : '');

export class CareerScreens {
  constructor(screens) {
    this.s = screens;
    this.app = screens.app;
    this.draft = null;
    this.tab = 'table';
    this.lg = null;
  }
  get c() { return this.app.career; }
  clubName() { return this.c ? currentClub(this.c).name : ''; }
  quarter() { return (FULL_LENGTHS[this.c.quarterLength] || FULL_LENGTHS.short).quarter; }

  // ------------------------------------------------------------ new career
  create() {
    const s = this.s, app = this.app;
    s.current = 'careerNew';
    if (!this.draft) {
      const pr = app.profile;
      this.draft = { name: pr.name && pr.name !== 'You' ? pr.name : 'Rookie', number: pr.number ?? 23, archetype: pr.archetype || 'slasher', look: { ...pr.look }, clubId: clubsIn(3)[0].id, difficulty: app.settings.difficulty || 'pro', quarterLength: 'short' };
    }
    const d = this.draft;
    const attrs = startingAttrs(d.archetype);
    const sw = (key, list, v) => `<div class="swatches" data-sw="${key}">${list.map((c) => `<button class="sw ${c === v ? 'on' : ''}" data-c="${c}" style="background:${c}" aria-label="${c}"></button>`).join('')}</div>`;
    const bars = ATTRS.map((k) => `<div class="attr" style="grid-template-columns:110px 1fr 36px"><span>${ATTR_LABELS[k]}</span><div class="bar"><i style="width:${attrs[k]}%"></i></div><b>${attrs[k]}</b></div>`).join('');
    const clubs = clubsIn(3).map((c) => `<button class="card pick choice ${c.id === d.clubId ? 'on' : ''}" data-club="${c.id}"><span class="club-chip">${crestSVG(c, 34)} ${esc(c.name)}</span><span>Team rating ${c.strength}</span></button>`).join('');
    const el = s.show(`<div class="panel wide"><div class="h-title">New Career</div>
      <p class="lead">Create your player and start in the City League. Every game you play gets a match rating: it earns skill points, builds your reputation and gets bigger clubs' scouts interested. Play well and they will sign you.</p>
      <div class="grid2">
        <div>
          <div class="h-sec">Name &amp; number</div>
          <input class="field" id="cname" maxlength="16" value="${esc(d.name)}" placeholder="Your name">
          <div class="stepper" style="margin-top:var(--s3)"><button class="btn sm icon" data-act="numDown" aria-label="Lower number">${icon('minus', 18)}</button><span class="pv">#${d.number}</span><button class="btn sm icon" data-act="numUp" aria-label="Higher number">${icon('plus', 18)}</button></div>
          <div class="h-sec">Look</div>
          <div class="set"><span class="lab">Skin</span>${sw('skin', LOOK_OPTIONS.SKIN, d.look.skin)}</div>
          <div class="set"><span class="lab">Hair</span>${sw('hair', LOOK_OPTIONS.HAIR, d.look.hair)}</div>
          <div class="set"><span class="lab">Style</span>${s.seg('style', HAIR_NAMES.map((n, i) => [i, n]), d.look.style || 0)}</div>
          <div class="set"><span class="lab">Shoes</span>${sw('shoes', LOOK_OPTIONS.SHOES, d.look.shoes)}</div>
        </div>
        <div>
          <div class="h-sec">Position</div>
          <div class="choices">${Object.values(ARCHETYPES).map((a) => `<button class="card pick choice ${a.id === d.archetype ? 'on' : ''}" data-arch="${a.id}"><b>${a.name} · ${a.pos}</b><span>${a.desc}</span></button>`).join('')}</div>
          <div class="h-sec">Starting ratings · overall ${overall(attrs)}</div>
          ${bars}
        </div>
      </div>
      <div class="h-sec">Your first club</div>
      <div class="club-grid">${clubs}</div>
      <div class="set" style="margin-top:var(--s4)"><span class="lab">Difficulty</span>${s.seg('difficulty', Object.entries(DIFFICULTY).map(([k, x]) => [k, x.label]), d.difficulty)}</div>
      <div class="set"><span class="lab">Quarters</span>${s.seg('quarterLength', Object.entries(FULL_LENGTHS).map(([k, g]) => [k, g.label]), d.quarterLength)}</div>
      <div class="small muted" style="margin-top:6px">Career games are full court, 5v5. Seasons have ${SEASON_ROUNDS} rounds; you can simulate a game you don't want to play (it counts for less).</div>
      <div class="actions"><button class="btn primary lg" data-act="start">${icon('play')} Start career</button><button class="btn ghost" data-act="back">Back</button></div></div>`, {
      numDown: () => { d.number = (d.number + 99) % 100; this.create(); },
      numUp: () => { d.number = (d.number + 1) % 100; this.create(); },
      start: () => {
        app.career = newCareer({ player: d, clubId: d.clubId, difficulty: d.difficulty, quarterLength: d.quarterLength });
        this.draft = null;
        app.saveCareer();
        this.tab = 'table'; this.lg = null;
        this.hub();
        s.sfx('uiReward', 0.4);
      },
      back: () => { this.draft = null; s.mainMenu(); },
    });
    el.querySelector('#cname').addEventListener('input', (e) => { d.name = e.target.value.trim().slice(0, 16) || 'Rookie'; });
    el.querySelectorAll('[data-arch]').forEach((b) => b.addEventListener('click', () => { d.archetype = b.dataset.arch; s.sfx('uiClick'); this.create(); }));
    el.querySelectorAll('[data-club]').forEach((b) => b.addEventListener('click', () => { d.clubId = b.dataset.club; s.sfx('uiClick'); this.create(); }));
    el.querySelectorAll('[data-sw]').forEach((g) => g.querySelectorAll('.sw').forEach((b) => b.addEventListener('click', () => {
      d.look[g.dataset.sw] = b.dataset.c;
      g.querySelectorAll('.sw').forEach((x) => x.classList.toggle('on', x === b));
      s.sfx('uiClick', 0.3);
    })));
    s.bindChoices(el, (key, v) => { if (key === 'style') d.look.style = Number(v); else d[key] = v; });
  }

  // ------------------------------------------------------------ hub
  hub(tab) {
    const s = this.s, app = this.app, c = this.c;
    if (!c) { this.create(); return; }
    if (tab) this.tab = tab;
    s.current = 'career';
    app.hud.show(false);
    const club = currentClub(c), L = LEAGUES[club.tier];
    const p = c.player, ovr = overall(p.attrs), arch = ARCHETYPES[p.archetype] || ARCHETYPES.slasher;
    const fx = nextFixture(c);
    const form = c.log.slice(-5).map((g) => `<span class="${ratingClass(g.rating)}" title="${g.won ? 'W' : 'L'} ${g.my}-${g.their}">${g.rating.toFixed(1)}</span>`).join('');
    let next;
    if (fx) {
      const home = fx.home ? club : fx.opp, away = fx.home ? fx.opp : club;
      const venue = LEAGUES[home.tier].venue === 'arena' ? 'City Arena' : 'Neighborhood Gym';
      next = `<div class="comp">${esc(L.name)} · Season ${c.season} · Round ${fx.round + 1}/${SEASON_ROUNDS}</div>
        <div class="fixture"><div class="side">${crestSVG(home, 72)}${esc(home.name)}</div><div class="v">VS</div><div class="side">${crestSVG(away, 72)}${esc(away.name)}</div></div>
        <div class="venue">${fx.home ? 'Home' : 'Away'} · ${esc(venue)} · ${esc(roleFor(ovr, club))}</div>
        <div class="actions mid" style="margin-top:0"><button class="btn xl primary" data-act="play">${icon('play', 30)} Play</button></div>
        <div class="actions mid" style="margin-top:var(--s2)"><button class="btn sm ghost" data-act="sim">${icon('forward', 16)} Simulate game</button></div>`;
    } else {
      const sum = seasonSummary(c);
      next = `<div class="comp">Season ${c.season} complete</div>
        <div class="result-word ${sum.pos === 1 ? 'win' : ''}" style="font-size:48px">${ord(sum.pos)} place</div>
        <div class="venue" style="margin-top:var(--s2)">${esc(sum.club.name)} · ${sum.av.wins}-${sum.av.gp - sum.av.wins} in your games · average rating ${sum.av.rating.toFixed(1)}</div>
        ${sum.awards.length ? `<div class="trophies" style="justify-content:center;margin-bottom:var(--s3)">${sum.awards.map((a) => `<span class="badge gold">${icon('trophy', 14)} ${esc(a)}</span>`).join('')}</div>` : ''}
        <div class="actions mid" style="margin-top:0"><button class="btn xl primary" data-act="season">${icon('play', 30)} Season ${c.season + 1}</button></div>`;
    }
    const offers = c.offers.length;
    const tabs = [['table', 'Table', 'list'], ['games', 'Games', 'chart'], ['offers', `Offers${offers ? ` (${offers})` : ''}`, 'mail'], ['train', `Training${c.points ? ` (${c.points})` : ''}`, 'up'], ['stats', 'Stats', 'star'], ['news', 'News', 'whistle']];
    const el = s.show(`
      <div class="topbar">
        <div class="who">${crestSVG(club, 56)}<div><h1>${esc(p.name)}</h1><div class="sub">#${p.number} · ${esc(arch.name)} (${arch.pos}) · age ${p.age} · ${esc(club.name)} · ${esc(L.name)}</div></div></div>
        <div class="lvl" title="Overall rating and reputation"><div class="ring">${ovr}</div><div><div class="small muted" style="font-weight:800;letter-spacing:1px">REPUTATION ${Math.round(c.rep)}</div><div class="bar gold"><i style="width:${Math.round(c.rep)}%"></i></div></div></div>
        ${offers ? `<button class="badge gold pulse" data-act="offersTab" style="cursor:pointer">${icon('mail', 14)} ${offers} offer${offers > 1 ? 's' : ''}</button>` : ''}
        ${c.points ? `<button class="badge cyan" data-act="trainTab" style="cursor:pointer">${icon('up', 14)} ${c.points} skill point${c.points > 1 ? 's' : ''}</button>` : ''}
      </div>
      <div class="hub-main">
        <div class="panel next">${next}${form ? `<div class="h-sec" style="margin-top:var(--s4)">Last games · rating</div><div class="form-dots" style="justify-content:center">${form}</div>` : ''}</div>
        <div class="panel tabs-panel">
          <div class="tabs">${tabs.map(([k, l, ic]) => `<button class="tab ${k === this.tab ? 'on' : ''}" data-tab="${k}">${icon(ic, 16)} ${l}</button>`).join('')}</div>
          <div class="tab-body">${this.tabBody(this.tab)}</div>
        </div>
      </div>
      <div class="row" style="justify-content:space-between;flex-wrap:wrap">
        <button class="btn ghost" data-act="menu">${icon('home', 18)} Main menu</button>
        <span class="small muted">Contract: ${c.contract.years} season${c.contract.years === 1 ? '' : 's'} · ${money(c.contract.salary)} a season · career earnings ${money(c.earnings)}</span>
        <span class="retire"><button class="btn sm ghost" data-act="retire">Retire</button></span>
      </div>`, {
      play: () => this.play(),
      sim: () => this.simulate(),
      season: () => this.seasonEnd(),
      offersTab: () => this.hub('offers'),
      trainTab: () => this.hub('train'),
      menu: () => s.mainMenu(),
      retire: (b) => {
        b.closest('.retire').innerHTML = '<span class="small" style="font-weight:800">End this career?</span> <button class="btn sm" data-yes>Yes, retire</button> <button class="btn sm ghost" data-no>No</button>';
        const box = el.querySelector('.retire');
        box.querySelector('[data-yes]').addEventListener('click', () => { app.career = null; app.saveCareer(); s.sfx('uiConfirm'); s.mainMenu(); });
        box.querySelector('[data-no]').addEventListener('click', () => { s.sfx('uiClick'); this.hub(); });
      },
    }, 'screen hub');
    el.querySelectorAll('.tab').forEach((t) => t.addEventListener('click', () => { s.sfx('uiClick', 0.3); this.hub(t.dataset.tab); }));
    this.bindTab(el);
  }

  tabBody(tab) {
    const c = this.c, s = this.s;
    const club = currentClub(c);
    if (tab === 'table') {
      const tier = this.lg || club.tier;
      const rows = table(c, tier).map((r, i) => `<tr class="${r.club.id === club.id ? 'me' : ''}"><td class="n">${i + 1}</td><td><span class="club-chip">${crestSVG(r.club, 22)} ${esc(r.club.name)}</span></td><td class="n">${r.w}</td><td class="n">${r.l}</td><td class="n">${r.pf - r.pa > 0 ? '+' : ''}${r.pf - r.pa}</td></tr>`).join('');
      return `${s.seg('lg', [[3, 'City'], [2, 'National'], [1, 'Premier']], tier)}
        <table class="t" style="margin-top:var(--s3)"><thead><tr><th class="n">#</th><th>${esc(LEAGUES[tier].name)}</th><th class="n">W</th><th class="n">L</th><th class="n">+/-</th></tr></thead><tbody>${rows}</tbody></table>`;
    }
    if (tab === 'games') {
      if (!c.log.length) return '<p class="small muted">No games yet this season.</p>';
      const rows = [...c.log].reverse().map((g) => {
        const o = clubById(g.opp);
        return `<tr><td class="n">${g.round + 1}</td><td><span class="club-chip">${g.home ? 'v' : '@'} ${crestSVG(o, 20)} ${esc(o.name)}</span></td><td><b style="color:${g.won ? 'var(--success)' : 'var(--danger)'}">${g.won ? 'W' : 'L'}</b> ${g.my}-${g.their}</td><td class="n">${g.line ? g.line.pts : '-'}</td><td class="n"><b>${g.rating.toFixed(1)}</b>${g.sim ? ' <span class="small muted">sim</span>' : ''}</td></tr>`;
      }).join('');
      return `<table class="t"><thead><tr><th class="n">Rd</th><th>Opponent</th><th>Result</th><th class="n">PTS</th><th class="n">Rating</th></tr></thead><tbody>${rows}</tbody></table>`;
    }
    if (tab === 'offers') {
      const offers = c.offers.map((o) => {
        const oc = clubById(o.clubId);
        return `<div class="card offer"><div class="row">${crestSVG(oc, 52)}<div style="flex:1;min-width:0"><b class="club-chip">${esc(oc.name)}</b><div class="small muted" style="margin-top:4px">${esc(LEAGUES[oc.tier].name)} · team rating ${oc.strength}</div>
          <div class="small" style="margin-top:6px;font-weight:800">${o.years} season${o.years > 1 ? 's' : ''} · ${money(o.salary)} a season · ${esc(roleFor(overall(c.player.attrs), oc))}</div>
          <div class="small muted">Expires after round ${Math.min(SEASON_ROUNDS, o.expires)}</div></div></div>
          <div class="actions" style="margin-top:var(--s3)"><button class="btn primary sm" data-accept="${o.id}">${icon('check', 16)} Sign</button><button class="btn ghost sm" data-decline="${o.id}">Decline</button></div></div>`;
      }).join('');
      const watching = CLUBS.filter((x) => (c.interest[x.id] || 0) > 5 && x.id !== club.id).sort((a, b) => (c.interest[b.id] || 0) - (c.interest[a.id] || 0)).slice(0, 4);
      const scouts = watching.length
        ? `<div class="h-sec">Scouting interest</div>${watching.map((x) => `<div class="attr" style="grid-template-columns:minmax(0,1.4fr) 1fr 36px"><span class="club-chip">${crestSVG(x, 22)} ${esc(x.name)}</span><div class="bar gold"><i style="width:${Math.min(100, c.interest[x.id])}%"></i></div><b>${Math.min(100, c.interest[x.id])}</b></div>`).join('')}`
        : '';
      const next = club.tier > 1 ? `Clubs in the ${LEAGUES[club.tier - 1].name} start watching from reputation ${LEAGUES[club.tier - 1].minRep} (you have ${Math.round(c.rep)}).` : 'You are in the Premier League: the strongest clubs still want stars.';
      return `${offers || `<p class="small muted">No offers yet. Scouts from bigger clubs watch your games: match ratings above about ${LEAGUES[Math.max(1, club.tier - 1)].need.toFixed(1)} get them interested. ${next}</p>`}${scouts}`;
    }
    if (tab === 'train') {
      const rows = ATTRS.map((k) => {
        const v = c.player.attrs[k], cost = trainCost(v);
        return `<div class="attr"><span>${ATTR_LABELS[k]}</span><div class="bar ${v >= 85 ? 'good' : ''}"><i style="width:${v}%"></i></div><b>${v}</b><button class="btn sm" data-train="${k}" ${c.points < cost || v >= 99 ? 'disabled' : ''} title="Costs ${cost} point${cost > 1 ? 's' : ''}">+</button></div>`;
      }).join('');
      return `<div class="row" style="justify-content:space-between"><span class="badge cyan">${c.points} skill point${c.points === 1 ? '' : 's'}</span><span class="small muted">Overall ${overall(c.player.attrs)} · higher ratings cost more</span></div>${rows}
        <div class="small muted" style="margin-top:var(--s2)">Shooting widens the green, Ball handling speeds the dribble and beats steals, Speed is your pace, Defense wins steals and blocks, Passing makes passes sharper, Vertical is your jump.</div>`;
    }
    if (tab === 'stats') {
      const av = seasonAverages(c), T = c.totals;
      const mini = (v, l) => `<div class="mini"><b>${v}</b><span>${l}</span></div>`;
      const hist = c.history.map((h) => { const hc = clubById(h.clubId); return `<tr><td class="n">${h.season}</td><td><span class="club-chip">${crestSVG(hc, 20)} ${esc(hc.short)}</span></td><td class="n">${ord(h.pos)}</td><td class="n">${h.ppg.toFixed(1)}</td><td class="n">${h.rating.toFixed(1)}</td><td>${h.awards.map((a) => `<span class="badge gold" style="font-size:10px">${esc(a)}</span>`).join(' ')}</td></tr>`; }).join('');
      return `<div class="h-sec">Season ${c.season}</div>
        <div class="mini-stats">${mini(av.gp, 'Games')}${mini(av.ppg.toFixed(1), 'Points')}${mini(av.rpg.toFixed(1), 'Rebounds')}${mini(av.apg.toFixed(1), 'Assists')}${mini(av.rating ? av.rating.toFixed(1) : '-', 'Avg rating')}${mini(`${av.wins}-${av.gp - av.wins}`, 'Record')}</div>
        <div class="h-sec">Career</div>
        <div class="mini-stats">${mini(T.gp, 'Games')}${mini(T.pts, 'Points')}${mini(T.fga ? `${Math.round((T.fgm / T.fga) * 100)}%` : '-', 'FG%')}${mini(T.reb + '/' + T.ast, 'Reb / Ast')}</div>
        ${hist ? `<table class="t" style="margin-top:var(--s3)"><thead><tr><th class="n">Season</th><th>Club</th><th class="n">Pos</th><th class="n">PPG</th><th class="n">Rtg</th><th>Awards</th></tr></thead><tbody>${hist}</tbody></table>` : ''}`;
    }
    // news
    return `<div class="timeline" style="max-height:340px">${c.news.map((n) => `<div>${n.kind === 'offer' ? icon('mail', 14) + ' ' : n.kind === 'scout' ? icon('eye', 14) + ' ' : ''}<b class="small muted">S${n.season} R${Math.min(SEASON_ROUNDS, n.round + 1)}</b> ${esc(n.text)}</div>`).join('')}</div>`;
  }

  bindTab(el) {
    const c = this.c, s = this.s, app = this.app;
    s.bindChoices(el, (key, v) => { if (key === 'lg') { this.lg = Number(v); this.hub('table'); } });
    el.querySelectorAll('[data-train]').forEach((b) => b.addEventListener('click', () => {
      if (train(c, b.dataset.train)) { app.saveCareer(); s.sfx('uiReward', 0.25); this.hub('train'); } else s.sfx('uiError', 0.3);
    }));
    el.querySelectorAll('[data-accept]').forEach((b) => b.addEventListener('click', () => {
      const o = c.offers.find((x) => x.id === Number(b.dataset.accept));
      if (!o) return;
      const to = clubById(o.clubId);
      if (acceptOffer(c, o.id)) {
        app.saveCareer();
        s.sfx('uiReward', 0.45);
        this.lg = null;
        this.hub('table');
        s.toast(`Welcome to ${to.name}!`, 'good');
      }
    }));
    el.querySelectorAll('[data-decline]').forEach((b) => b.addEventListener('click', () => {
      if (declineOffer(c, Number(b.dataset.decline))) { app.saveCareer(); s.sfx('uiClick'); this.hub('offers'); }
    }));
  }

  // ------------------------------------------------------------ games
  play() {
    const c = this.c, app = this.app;
    const fx = nextFixture(c);
    if (!fx) return;
    const club = currentClub(c);
    const home = fx.home ? club : fx.opp, away = fx.home ? fx.opp : club;
    app.startGame({
      format: 'full', size: 5, career: true,
      homeTeam: home, awayTeam: away, humanSide: fx.home ? 0 : 1,
      player: { ...c.player, attrs: { ...c.player.attrs } },
      difficulty: c.difficulty, length: c.quarterLength,
      venue: LEAGUES[home.tier].venue,
      title: `${LEAGUES[club.tier].name} · Season ${c.season} · Round ${fx.round + 1}`,
    });
  }

  simulate() {
    const c = this.c;
    const sum = simulateGame(c, this.quarter());
    this.app.saveCareer();
    if (sum) this.report(sum, null);
  }

  // after a played career game
  result(session) {
    const app = this.app, c = this.c;
    app.input.active = false;
    app.input.exitLock();
    app.hud.show(false);
    if (!c) { this.s.mainMenu(); return; }
    const m = session.match, h = m.human;
    if (!session.careerSum) {
      const minutes = (m.quarterLen * 4 + Math.max(0, m.period - 4) * m.otLen) / 60;
      session.careerSum = finishGame(c, { my: m.teams[h.team].score, their: m.teams[1 - h.team].score, line: m.stats.of(h), minutes }, m.quarterLen);
      app.saveCareer();
      const r = app.records;
      r.games++; r.points += m.stats.of(h).pts;
      if (session.careerSum && session.careerSum.won) r.wins++; else r.losses++;
      app.saveRecords();
    }
    this.report(session.careerSum, session);
  }

  report(sum, session) {
    const s = this.s, c = this.c, app = this.app;
    s.current = 'careerResult';
    if (!sum) { this.hub(); return; }
    const club = currentClub(c);
    const st = session ? session.match.stats.of(session.match.human) : null;
    const mini = (v, l) => `<div class="mini"><b>${v}</b><span>${l}</span></div>`;
    const offerLines = sum.newOffers.map((o) => { const oc = clubById(o.clubId); return `<div class="tip"><b>${icon('mail', 14)} Offer from ${esc(oc.name)}</b>${esc(LEAGUES[oc.tier].name)} · ${o.years} season${o.years > 1 ? 's' : ''} · ${money(o.salary)} a season</div>`; }).join('');
    const notes = sum.notes.map((n) => `<div class="tip"><b>${icon('eye', 14)} Scouts</b>${esc(n)}</div>`).join('');
    const myClub = sum.opp ? club : club;
    const el = s.show(`<div class="panel result report">
      <div class="small muted r-title" style="font-weight:800;text-transform:uppercase;letter-spacing:1px">Season ${sum.season} · Round ${sum.round}${sum.sim ? ' · simulated' : ''}</div>
      <div class="result-word ${sum.won ? 'win' : 'loss'}">${sum.won ? 'Win!' : 'Defeat'}</div>
      <div class="scoreline"><div class="side">${crestSVG(myClub, 52)}${esc(myClub.short)}</div><div class="sc">${sum.my} - ${sum.their}</div><div class="side">${crestSVG(sum.opp, 52)}${esc(sum.opp.short)}</div></div>
      <div class="rating-hero"><span class="lab">Match rating</span><span class="num ${ratingClass(sum.rating)}">${sum.rating.toFixed(1)}</span></div>
      ${st ? `<div class="key-stats">${mini(st.pts, 'Points')}${mini(`${st.fgm}/${st.fga}`, 'Field goals')}${mini(`${st.oreb + st.dreb}/${st.ast}`, 'Reb / Ast')}</div>` : ''}
      <div class="trophies" style="justify-content:center;margin:var(--s2) 0">
        <span class="badge cyan">${icon('up', 14)} +${sum.pts} skill point${sum.pts > 1 ? 's' : ''}</span>
        <span class="badge ${sum.repDelta >= 0 ? 'good' : 'bad'}">Reputation ${sum.repDelta >= 0 ? '+' : ''}${sum.repDelta.toFixed(1)} (${Math.round(sum.rep)})</span>
      </div>
      ${offerLines || notes ? `<div class="tips" style="text-align:left">${offerLines}${notes}</div>` : ''}
      <div class="actions mid">
        <button class="btn primary lg" data-act="go">${icon('play')} ${c.seasonOver ? 'Season review' : 'Continue'}</button>
        ${session ? `<button class="btn ghost sm" data-act="box">${icon('chart', 16)} Box score</button>` : ''}
      </div>
      <div class="more" hidden></div>
    </div>`, {
      go: () => { if (session) app.endSession(); this.hub(sum.newOffers.length ? 'offers' : c.points >= 3 ? 'train' : 'table'); },
      box: (b) => {
        const box = el.querySelector('.more');
        if (box.hidden && !box.innerHTML) {
          const m = session.match, h = m.human;
          const row = (p) => { const x = m.stats.of(p); return `<tr class="${p === h ? 'me' : ''}"><td>${esc(m.teams[p.team].short)}</td><td>#${p.number} ${esc(p.name)}</td><td>${x.pts}</td><td>${x.fgm}/${x.fga}</td><td>${x.tpm}/${x.tpa}</td><td>${x.oreb + x.dreb}</td><td>${x.ast}</td><td>${x.stl}</td><td>${x.blk}</td><td>${x.tov}</td></tr>`; };
          box.innerHTML = `<table class="box"><thead><tr><th></th><th>Player</th><th>PTS</th><th>FG</th><th>3PT</th><th>REB</th><th>AST</th><th>STL</th><th>BLK</th><th>TO</th></tr></thead><tbody>${m.players.map(row).join('')}</tbody></table>`;
        }
        box.hidden = !box.hidden;
        b.innerHTML = `${icon('chart', 16)} ${box.hidden ? 'Box score' : 'Hide'}`;
      },
    });
    s.sfx(sum.won ? 'uiReward' : 'uiConfirm', 0.4);
  }

  // ------------------------------------------------------------ season end
  seasonEnd() {
    const s = this.s, c = this.c, app = this.app;
    s.current = 'careerSeason';
    const sum = startNextSeason(c);
    app.saveCareer();
    const champs = sum.champions.map((x) => `<div class="tip"><b class="club-chip">${crestSVG(x.club, 22)} ${esc(x.club.name)}</b>${esc(LEAGUES[x.tier].name)} champions</div>`).join('');
    s.show(`<div class="panel result"><div class="small muted" style="font-weight:800;text-transform:uppercase;letter-spacing:1px">Season ${sum.season} review</div>
      <div class="result-word ${sum.pos === 1 ? 'win' : ''}">${ord(sum.pos)} place</div>
      <div class="scorers" style="margin:var(--s2) 0">${esc(sum.club.name)} · ${esc(LEAGUES[sum.club.tier].name)}</div>
      <div class="key-stats"><div class="mini"><b>${sum.av.gp}</b><span>Games</span></div><div class="mini"><b>${sum.av.ppg.toFixed(1)}</b><span>Points</span></div><div class="mini"><b>${sum.av.rating.toFixed(1)}</b><span>Avg rating</span></div></div>
      ${sum.awards.length ? `<div class="trophies" style="justify-content:center;margin-bottom:var(--s3)">${sum.awards.map((a) => `<span class="badge gold">${icon('trophy', 14)} ${esc(a)}</span>`).join('')}</div>` : ''}
      <div class="tips" style="text-align:left">${champs}</div>
      ${c.offers.length ? `<div class="small" style="margin-top:var(--s3);font-weight:800;color:var(--primary)">${c.offers.length} club${c.offers.length > 1 ? 's want' : ' wants'} to sign you for next season.</div>` : ''}
      <div class="actions mid"><button class="btn primary lg" data-act="go">${icon('play')} Season ${c.season}</button></div></div>`, {
      go: () => this.hub(c.offers.length ? 'offers' : 'table'),
    });
    s.sfx('uiReward', 0.4);
  }
}
