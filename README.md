# Courtside — First-Person Basketball

A first-person 3D basketball game for the browser. You play one player and see every possession through their eyes: your hands on the ball, the dribble at your side, the rim over the ball at your set point, the defender sliding in front of you.

- **Full-court games (the default)**: two baskets, 5v5 (or 4v4 / 3v3), four quarters, a jump ball to start, throw-ins, 24-second shot clock, 8 seconds to cross half court, backcourt violations, team fouls and the bonus, teams switching ends at half time, overtime.
- **Career**: create your own player, start in the City League and play your club's games. Every game gets a match rating; it earns skill points to train with, builds your reputation, and gets the scouts of bigger clubs interested. Their offers take you up through the National League to the Premier League.
- **Half Court** (a separate mode): 3v3 and 1v1 in the FIBA 3x3 style: check ball at the top, "clear it" after a steal or defensive rebound, 14-second shot clock, sudden-death overtime.
- **Practice**: Coach Mo's Practice Court (nine guided drills with stars), a 60-second Shootout with a moving hot spot, and a Free Shootaround.
- Two venues (City Arena, Neighborhood Gym) plus a Practice Gym; two live-switchable visual styles (Classic ink drawing / Neobrutalist).
- Everything is built at load time from primitives; every sound is synthesised. No external art or audio files.

Courtside is built on the engine and design language of **First Touch** (the author's first-person football game, `lxjohn0111-lang/football-life`). The reusable parts were *copied* into this repository and adapted; the First Touch repository itself was only read (see "Relationship to First Touch" below).

## First visit

A new player goes straight into a two-minute interactive **tutorial** on the practice court, not the menu. It has six short steps: look at the basket, dribble to the gold circle, a jump shot, a finish at the rim, a pass, and a steal. Each step shows one line saying what to do and one line with the control for the device (keyboard and mouse, or touch). Every step has a time limit after which the coach moves on. Skip (Enter) ends it at any time. Then the game asks **"Are you ready?"**, and its button starts a 5v5 full-court game. Later visits open the main menu; the tutorial can be replayed from Practice.

## Launching

```sh
npm install        # installs esbuild (the only dev dependency)
npm run build      # writes dist/game.js (three.js is bundled from vendor/three)
node server.js     # http://localhost:8080
```

`index.html` loads the prebuilt `dist/game.js` as a classic script, so it also runs by double-clicking `index.html`. A browser with WebGL2 is required.

**Phones and tablets.** Touch controls appear by themselves. The game is lighter on touch devices:
- medium quality by default;
- a thinner crowd;
- at most 1.5 device pixels per CSS pixel;
- the menus' background game runs at 30 fps (and in the gym on phones), while play runs at the screen's rate;
- the render resolution steps down by itself if frames get slow.

The HUD, radar and every screen (the career hub included) fit a phone in landscape.

## CrazyGames

`npm run crazygames` writes `crazygames/upload/` (`index.html` with the CrazyGames HTML5 SDK v3, and `game.js`) and `crazygames/courtside-crazygames.zip` (upload this). On CrazyGames:
- progress is saved through the SDK's data module (career, My Player, records, settings, style, tutorial), so it follows logged-in players across devices;
- gameplayStart and gameplayStop follow real play, and a win or a finished tutorial is a happytime;
- the platform's mute silences the game;
- the player's name is the CrazyGames username (or "Rookie" for a guest).

No ads are requested. Anywhere else (no SDK, other domains) the game saves to localStorage as before. The gameplay videos are in `crazygames/video/` (`npm run video`). Portal fields and checks: `crazygames/SUBMISSION.md`.

## Controls

| Input | With the ball | Without the ball / on defence |
| --- | --- | --- |
| W A S D | Move (relative to where you look); moving starts the dribble | Move |
| Mouse | Look and aim | Look |
| Shift | Sprint (a faster, lower dribble) | Sprint |
| Left mouse | **Shoot**: hold to fill the meter, release in the green | Hands up (contest) |
| Right mouse | **Pass** to the ringed teammate | Call for the ball (or the throw-in) / defensive stance (hold) |
| Space | Pump fake | **Jump**: block, rebound, or the opening tip |
| E | — | **Steal** |
| Q | **Crossover** (switch hands with a burst) | — |
| C | — | Defensive stance (hold): quicker side to side |
| P / Tab / Enter | Pause / free or capture the cursor / skip a drill | |

Touch screens get a floating move stick, drag-to-look, and contextual buttons (SHOOT · PASS · CROSS · FAKE with the ball; STEAL · STANCE · BLOCK · HANDS on defence; CALL · JUMP off the ball).

## Game modes

**Quick match (full court).** The main menu's big button. Pick two teams, the venue, the difficulty, 5v5 / 4v4 / 3v3 and the quarter length (4 × 2, 3 or 5 minutes of game clock; the clock stops on dead balls). You play the player at your position in your team's line-up (point guard, shooting guard, small forward, power forward or centre, from your play style in My Player).

**Career.** *New career*: name, number, look, position, your first club (one of six City League clubs), difficulty and quarter length. You start at about overall 55. Three leagues of six fictional clubs (City League, National League, Premier League) play a ten-round season (everyone home and away). Each round you play your club's game (full court, 5v5; you can also simulate it, which counts for less), and every other game in every league is simulated from the clubs' strength, so all three tables are live.
- *Match rating* (1-10, 6 is a solid game): from your box score per minute (points, efficiency, rebounds, assists, steals, blocks, turnovers, fouls) and the result. Calibrated on full-court AI games (an average player rates about 6).
- *Skill points* from every game (more for a good one) are spent in Training on your six attributes; higher ratings cost more points.
- *Reputation* (0-100) moves with your ratings (more in a higher league). *Scouts*: clubs in your league with a stronger team, and clubs one league up once your reputation is high enough, raise their interest after good games. When it is high enough a club makes an **offer** (one to three seasons, a salary): sign and you join them at once, in their league, carrying on with their next game; offers run out after three rounds. Clubs that are still keen make offers in the summer.
- *Season end*: your position, awards (champions, All-League team, MVP), every league's champion; you are a year older, contracts run down and are extended, and the next season starts.
- The career is saved in the browser after every step (`courtside.career`). Leaving a career game from the pause menu abandons it (it doesn't count).

**Half court.** The FIBA 3x3-style 3v3, or 1v1 against the other team's best player.

## How the game plays

**Shooting.** Pressing shoot gathers the ball (from the dribble as soon as it is back in reach), raises it to the set point and jumps; the jump is timed so its peak meets the meter's **sweet spot**. The sweet spot sits higher on the meter the further out you are (more power), and narrows under defensive pressure, when moving, when tired, or with a weaker shooting rating. Releasing inside it gives the right power; early comes up short, late goes long. The release then only sets a launch velocity (solved for a ~45° entry arc): from there the ball is pure physics against the rim, backboard and net. Measured with `tests/shooting.mjs` (uncontested, rating 75): perfect release ~90% from 5 m and ~72% from three; 0.12 off the sweet spot drops those to ~35% and ~20%. Layups and dunks are contextual near the rim (dunks need the bounce and usually a run-up).

**Dribbling.** Each bounce is solved like a real one: the hand pushes the ball down, it falls under gravity, bounces off the hardwood with its restitution and rises back into the same or the other hand, with the push speed chosen so the cycle lasts the period your speed calls for (quicker and lower when sprinting or pressured). The cycle lives in your moving frame, so the ball carries your velocity. The animator puts the dribbling hand on top of the ball whenever the ball is near the top of the bounce, so hand and ball cannot drift apart; a steal releases the ball with exactly the velocity it had on screen.

**Passing** picks the teammate you look at (the ring). It is a chest pass, a **bounce pass** when a defender is in the lane, or a lob over distance; the receiver is led. Defenders can read and intercept passes, and a steal swipe through a passing lane can pick one off.

**Defence.** Hold the stance (C) to slide side to side. **Steal (E)** succeeds on timing and position: the ball is exposed when the dribble is low and on your side; reaching across the dribbler's body is rarely clean and often a foul. A missed swipe leaves you off balance for a moment. **Blocks** need your hands in the ball's path on the way up — a late jump rarely blocks; hitting the ball on its way down over the rim is goaltending. Your man has a red ring.

**Full-court rules (FIBA style).** A jump ball at centre court starts the game (the team that doesn't win it gets the alternating-possession arrow, and inbounds at the centre line to start the other quarters and overtime). After a basket the other team inbounds from behind the baseline; after a turnover, violation or foul, from the nearest sideline (or baseline); 5 seconds to get it in, and the clocks only start when the ball is touched on the court. 24-second shot clock (14 after an offensive rebound off the rim). 8 seconds to get the ball over half court, and once over, going back is a backcourt violation (unless the defence knocked it there, or after a shot). Team fouls count per quarter: from a team's 5th, every foul is two free throws. Teams switch ends at half time. A tie after four quarters goes to overtime periods.

**Half-court rules (3x3).** Check ball at the top after every basket or whistle (the clock waits). After a steal or a defensive rebound the new offence must take the ball beyond the arc before a basket counts. 14-second shot clock, reset when a shot hits the rim. Shooting fouls give two or three free throws (and one if it goes in); from the 6th team foul every foul is two shots. Out of bounds on the sidelines, baseline and half-court line. First to the target score (11 or 21) or the higher score at the buzzer; a tie at the buzzer goes to "next basket wins".

**AI.** Man-to-man defence with a reaction lag set by the difficulty, sagging help and rotations on drives, closeouts, contests and block attempts timed with the shooter, pokes at exposed dribbles, and bites on fakes and crossovers. On offence the ball handler weighs the expected points of a shot, a drive and every pass (lanes and defenders included); off-ball players space to real spots, cut when their defender loses them and call for the ball. Rebounds use the ball's predicted flight: defenders box out, the nearest players go for it. On the full court the same logic runs in the attack frame of the team with the ball (its basket mirrored onto one end): the ball is brought up (pushed when the defence isn't back, or an outlet pass to the best ball handler after a rebound), off-ball players run the floor to their spots and leak out on breaks, defenders sprint back and pick up around half court, matchups are by position, and throw-ins go to a receiver who comes to meet the ball. Difficulty (Rookie / Pro / All-Star) only changes the opposing team; your teammates always play at full sharpness.

**Players.** Choose a play style in My Player — Floor General (PG), Sharpshooter (SG), Slasher (SF), Two-Way Forward (PF) or Rim Protector (C) — with six attributes (shooting, ball handling, speed, defence, passing, vertical) that set the sweet-spot width, dribble speed, movement, steal and block chances, pass accuracy and jump height. All teams and players are fictional.

## Relationship to First Touch (reference project)

First Touch was cloned read-only to `/home/user/lxjohn0111-lang/football-life` and inspected; nothing was written there. Its 113 files were checksummed before work began and again at the end: identical, `git status` clean, and its HEAD matches GitHub. Courtside lives in this separate repository.

**What the reference analysis found and Courtside keeps:**
- *Visual identity:* an "ink drawing" world — every primitive gets GPU-computed silhouette and crease lines, Classic (pale, near-unlit paper with thin black ink) and Neobrutalist (saturated toon colours, 3 px outlines, hard shadows) styles that recolour shared palette roles live. Courtside reuses the shaders, geometry builder, palette system and blob shadows, with new roles for hardwood, paint, rims, glass and nets.
- *Characters:* smooth lofted bodies merged into one mesh posed from a float texture, faces with eyes/brows/nose, varied hair, kit numbers on the back. Courtside's players are ~2 m tall in tank tops with front and back numbers and names, long shorts and high-top sneakers.
- *Animation:* procedural, feet planted from the gait phase, two-bone IK, actions with an explicit contact moment. Kept, with basketball poses whose hand targets come from the simulated ball.
- *Camera:* first person at the eyes, head and torso hidden, subtle bob and shake, horizontal FOV setting. Courtside adds a view-model pass so hands and ball sit in view (see below).
- *UI:* one arcade design system (navy/yellow tokens, 3 px dark borders, "depth" shadows, rounded display type), the menu over a live AI game, contextual hints, punchy notifications, a radar, possession glow, pause/settings/how-to structure. Kept as-is in its tokens; every screen's content is basketball.
- *Feel:* a fixed 120 Hz simulation independent of rendering, quick acceleration and stops, buffered inputs, honest physics with only launch-time assistance. Kept.

**Copied and adapted from First Touch:** `vendor/three` (three.js r186, MIT), the build tool and static server, `render/shaders.js`, `render/geometry.js`, `render/effects.js`, `render/atlas.js`, `sim/vec.js`, `sim/rng.js`, `sim/events.js`, `core/input.js`, `core/settings.js`, `core/storage.js`, `ui/styles.css`, `ui/icons.js`, `ui/coach.js`, `ui/touch.js`, `audio/audio.js`, plus the structure of `main.js`, `view.js`, `characters.js`, `anim.js`, `venues.js`, `hud.js`, `screens.js` and the session. No First Touch assets (it has none — everything there is generated) and no football-specific systems were reused: the ball, dribble, shooting, passing, defence, AI, match rules and practice modes are new.

## The first-person view model

Geometry alone doesn't put a dribble in view: from the eyes of a 2 m player the ball is ~65° below the horizon. Courtside draws the local player's forearms, hands and the ball in their hands in a second, depth-cleared pass, rotated about the eye by a pitch offset: lifted ~45° for the dribble and hold (the top of each bounce comes into the bottom of the frame), raised slightly at the jump-shot set point (the ball sits over the shooting-side eye with the rim clear below it), and blended to zero as the ball leaves the hands so it hands over to its real trajectory without a jump. The offset fades as you look down (then the real hands are in view). The simulation is never affected; AI players interact with the true ball position.

## Tests

```sh
npm test                          # headless: everything below in one run
node tests/physics.mjs            # bounce, rim, basket detection, dribble sync, shot solver, clear rule, shot clock, FTs
node tests/full.mjs 3 5 pro 120   # full-court AI games: tip-off, four quarters, both baskets, ends switched at
                                  # half time, throw-in times, points = box score, stall detection
node tests/human.mjs 2 full pro   # full-court games with a scripted player on the real controls (both ends)
node tests/career.mjs             # schedules, rating calibration on real games, training, scouts/offers,
                                  # mid-season and summer transfers, season end, save/load
node tests/sim.mjs 6 3v3 pro      # half-court AI vs AI
node tests/human.mjs 4 3v3 pro    # half-court games with the scripted player
node tests/shooting.mjs 75        # make rates by distance and release timing
```

Browser checks (Playwright with Chromium, `node server.js` running; screenshots in `tests/out/`): `tests/tutorial.mjs` (the first visit played through with the real controls, "Are you ready?" into a 5v5 game, Skip, a second visit, a phone), `tests/crazygames.mjs` (the CrazyGames build with a stand-in SDK: data-module saves and reloads, gameplay events, happytime, mute, the locked name, no ads, a slow SDK that is connected late, a missing game.js explained on the loading screen, the localStorage fallbacks; run `npm run crazygames` first), `tests/crazygames-real.mjs` (the same build with the real SDK from sdk.crazygames.com, inside an emulated CrazyGames page and on another host), `tests/flow.mjs` (every menu; a full-court game from the tip-off to the result and box score; pause/settings/style/how-to; My Player persistence; half-court 1v1; a career from player creation through the hub tabs, training, a played game to its report, a simulated game and retiring; the Practice Court drills and the Shootout; failing on any page error), `tests/shots.mjs` (menu and first-person views in both styles), `tests/mobile.mjs` (phone emulation: touch controls and compact HUD).

## Known simplifications

- No substitutions or timeouts: the same players play the whole game (stamina recovers when jogging), and nobody fouls out. Jump balls happen only at the start (no held balls); the arrow decides the other periods.
- Full-court games use a real-time quarter clock that stops on dead balls; quarters are short (2-5 minutes), so scores are lower than in a 40-minute game.
- Career: the other clubs' rosters don't change between seasons and there is no promotion or relegation of clubs; simulated games use the clubs' strength, not a play-by-play.
- Moving with the ball always dribbles, so there is no travelling or double-dribble call; a pump fake doesn't end your dribble.
- Fouls: reach-ins, shooting fouls (including and-ones) and the bonus are modelled; charges/blocking fouls and loose-ball fouls are not.
- Spectators react through sound and animation only. Audio is synthesised and intentionally simple.
- The first-person view model is a presentation layer: during an opponent's poke at your dribble, their hand targets the true ball, which is drawn slightly offset in your view.
- Browser testing here used software rendering (SwiftShader), so frame-rate numbers were not measured on a real GPU. The arena is the heaviest scene (~360k triangles, ~1700 spectators on High); Medium and Low quality and the adaptive resolution reduce it.
