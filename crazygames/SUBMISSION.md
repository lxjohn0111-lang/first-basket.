# Courtside: CrazyGames submission

Everything needed to submit Courtside to CrazyGames (developer.crazygames.com).

| Path | What it is |
| --- | --- |
| `courtside-crazygames.zip` | **Upload this.** `index.html` and `game.js` at the zip's root. |
| `upload/` | The same two files unzipped, if you prefer to upload a folder or test locally. |
| `video/courtside-landscape.mp4` | Gameplay video, landscape 1920x1080, 15.6 s, H.264, no audio. |
| `video/courtside-portrait.mp4` | Gameplay video, portrait 1080x1920, 16 s, H.264, no audio. |

No cover images are included (not requested); the portal asks for them separately.

The videos are recorded from the game itself: a 5v5 full-court game seen through the player's eyes, played by the scripted test player through the real controls, ending on one of the player's baskets, with no interface on screen.

## Upload steps

1. Developer portal → **Submit game** → **HTML5**. Upload `courtside-crazygames.zip` (or the files in `upload/`). The entry file is `index.html`.
2. **Progress Save: turn it ON.** The game saves its progress through the SDK's data module (see below). With the toggle off the data module is disabled; the game then falls back to the browser's localStorage, so nothing breaks, but saves won't follow logged-in players across devices.
3. SDK: HTML5 SDK **v3** (already loaded by `index.html`). No ads are requested by this build.
4. Fill in the fields below, add the videos (and your covers), then check the game in the portal's preview/QA tool before submitting.

## Portal fields

**Title:** Courtside

**Short description:**
First-person basketball: every possession through your own eyes. Full-court 5v5, a career from the City League to the Premier League, and 3x3.

**Description:**
Play basketball through your own eyes. Your hands are on the ball, the dribble bounces at your side, and the rim sits over the ball at your set point. You are one player on the floor: get open, call for the ball, attack the rim, hit the three, and get back on defence.

Full-court 5v5 games with real rules: a tip-off, throw-ins, a 24-second shot clock, 8 seconds to cross half court, fouls and free throws, and the teams switching ends at half time. Shooting is skill-based: hold to fill the meter and let go in the green. Its sweet spot moves with your distance and shrinks under pressure.

Start a Career: create your player and begin in the City League. Every game gets a match rating that earns skill points and reputation, and good games bring scouts from bigger clubs. Sign their offers and climb to the Premier League.

- First-person basketball with real ball physics: rim, backboard and net
- Full court 5v5 (or 4v4 / 3v3), and FIBA 3x3-style half court and 1v1
- Career mode: three leagues, seasons, league tables, training, scouts, offers and transfers
- A two-minute interactive tutorial, a Practice Court with guided drills, and a Shootout
- Two visual styles: Classic ink drawing and bold Neobrutalist
- Plays on desktop and on phones and tablets with touch controls
- Progress is saved automatically

**Controls (desktop):**
- W A S D: move
- Mouse: look and aim (click the game to capture the mouse)
- Shift: sprint
- Left mouse: shoot (hold to fill the meter, release in the green); on defence: hands up
- Right mouse: pass to the ringed teammate; without the ball: call for it
- Space: pump fake with the ball; jump (block, rebound, tip-off) without it
- E: steal
- Q: crossover
- C: defensive stance (hold)
- P: pause
- Tab: free / capture the mouse cursor
- Enter: skip the tutorial

**Controls (mobile):**
- Left thumb: move (floating stick, push it to the edge to sprint)
- Right thumb: look and aim
- With the ball: SHOOT (hold, release in the green), PASS, CROSS, FAKE
- On defence: STEAL, STANCE, BLOCK, HANDS
- Without the ball: CALL, JUMP
- II: pause

**Category:** Sports. **Tags:** basketball, 3d, first person, sports, career, 5v5, mobile.

**Platforms and orientation:** desktop and mobile (phones and tablets). Best played in landscape; in portrait the game still works and shows a hint to turn the phone.

**Other answers:** single player, no multiplayer, no in-game purchases, no external links, no chat, no user-generated content. English only. Works without an account. All teams and players are fictional.

## First-time players

A new player goes straight into gameplay: the tutorial starts at once, with no menu in front of it. It has six short steps (look at the basket, dribble to the gold circle, shoot, finish at the rim, pass, steal). Each step shows one line saying what to do and one line with the control for the player's device. Every step has a time limit after which the coach moves on, so the tutorial never runs much past two minutes. **Skip tutorial** is on the coach card (and Enter, and the pause menu). When it ends, the game asks **"Are you ready?"**, and its one button starts a 5v5 full-court game. The tutorial can be replayed from Practice. Esc is never used by the game (browsers use it to free the mouse and leave fullscreen); **P** pauses.

## What the game does with the SDK

In `src/platform/crazygames.js`:

- `CrazyGames.SDK.init()` runs before the game starts, then `game.loadingStart()` and `game.loadingStop()` wrap the loading.
- **Saving:** every save goes through `SDK.data` (`getItem`, `setItem`, `removeItem`). Keys:
  - `courtside.career`: the career save, about 15-25 KB.
  - `courtside.profile`: My Player.
  - `courtside.records`: wins, losses and best scores.
  - `courtside.settings.v1`: settings.
  - `courtside.style`: the visual style.
  - `courtside.tutorial`: whether the tutorial was done or skipped.

  Saves made earlier in the same browser's localStorage are copied into the data module once.
- **When it saves:** only when something worth saving happens:
  - after each career step: creation, every game, training, signing an offer, the end of a season;
  - My Player when Done is pressed;
  - the settings and visual style once, on Done (never on every slider move).
- **Gameplay events:** `game.gameplayStart()` and `game.gameplayStop()` follow real play. They are on while a game, a drill or the tutorial is being played. They are off whenever play is paused (the pause menu, lost focus, the cursor freed with Esc or Tab), on result screens and in menus.
- `game.happytime()` when you win a game and when you finish the tutorial.
- **Player name** (`user.getUser()`, `user.addAuthListener()`): locked. A logged-in player plays under their CrazyGames username, updated if they log in or out during the session. A guest plays under the name "Rookie". My Player and the new-career screen show the name instead of a text field.
- **Audio:** the platform's mute setting (`game.settings.muteAudio` and its change listener) silences the game.
- **Fullscreen:** on CrazyGames the game doesn't request fullscreen itself (the platform has its own button). The browser context menu is disabled.
- **Ads:** none are requested. Midgame, rewarded and banner ads can be added later.
- **Without the SDK:** if it isn't there, fails to load, or is "disabled" (any other domain), the game runs normally without it and saves to localStorage.

## Checking it

- **Locally:** run `npm run crazygames`, then `node server.js`, and open `http://localhost:8080/crazygames/upload/index.html`. On localhost the SDK runs in its "local" environment.
- **Automated:**
  - `node tests/crazygames.mjs` drives the upload build with a stand-in SDK (`tests/fakes/crazygames-sdk.js`). It checks:
    - the SDK is initialised before loading;
    - saves go through the data module and come back after a reload, and the localStorage copy happens;
    - settings are saved on Done;
    - gameplay start and stop with play and pause;
    - happytime on a win;
    - platform mute;
    - the guest name and a login during the session;
    - the tutorial flag;
    - no ad requests;
    - the localStorage fallbacks (SDK disabled, data module off).
  - `node tests/tutorial.mjs` plays the whole first-run tutorial with the real controls. It also checks Skip, the "Are you ready?" button starting a 5v5 game, a second visit opening the menu, and a phone.
- **In the portal:** the real SDK could not be reached from the build environment, so do a final check in the portal's preview/QA tool. Check saving after a game and reloading, the tutorial on a first visit, and a phone in landscape.

## Rebuilding

```sh
npm run crazygames   # rebuilds dist/game.js, writes upload/ and the zip
npm run video -- --seconds 16 --width 1920 --height 1080 --render-width 1280 --render-height 720 --out crazygames/video/courtside-landscape.mp4
npm run video -- --seconds 16 --width 1080 --height 1920 --render-width 720 --render-height 1280 --out crazygames/video/courtside-portrait.mp4
```

The video tool needs Playwright with Chromium and ffmpeg (libx264).
