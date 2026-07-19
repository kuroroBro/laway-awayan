# Implementation Plan: Laway-awayan

## Technical Context

| Area | Choice | Notes |
| --- | --- | --- |
| Runtime | Vanilla HTML/CSS/JS, no framework | Matches `fluffy-Neanderthal` exactly — no build step, no bundler. |
| State | Single in-memory `state` object in `app.js`, no networking | Single shared device passed hand-to-hand; there is no multi-device sync to design for. |
| Persistence | `localStorage`, namespaced key prefix | Used-card history only, scoped per browser/device (see US-7). |
| Tests | None (matches the sibling's own convention) | Verified instead via live Playwright interaction runs against each screen before shipping — see Validation. |
| Deploy | Push to `main`, GitHub Pages via `CNAME` | Same as this portfolio's other repos; `laway-awayan.gondoit.work` already points here. |

## File Structure

```text
index.html          screens: Setup, Handoff, Play, Round End, Final
style.css            silent-disco visual theme (see UI section)
cards.js              the deck: CATEGORIES -> array of { phrase } cards
app.js                 all game logic + DOM wiring, single IIFE (mirrors fluffy-Neanderthal/app.js)
assets/               original hand-authored SVG logo (see Changelog v1 —
                       the image-gen skill's Codex backend was unavailable
                       at build time; the setup screen's CSS gradient
                       already carries the "silent disco" look on its own)
specs/001-...          this SDD spec, plan, tasks
LICENSE, CNAME, README.md
```

## Data Model

Each card in `cards.js` is:

```js
{ phrase: "Banana" }        // 1 word -> worth 1 point
{ phrase: "Ice Cream" }     // 2 words -> worth 2 points
```

Points are never stored on the card itself — `phrase.trim().split(/\s+/).length`
derives the point value at score time, so authoring a card is just picking
the words; nothing else to keep in sync. A card is rejected at deck-build
time (dev-time assertion, not a user-facing error) if it has zero or more
than two words, guarding `FR-3` structurally rather than trusting every
entry to have been typed correctly.

`CATEGORIES` is a plain object, `{ [categoryName]: Card[] }`, exactly
mirroring `fluffy-Neanderthal/cards.js`'s `DECK` shape minus the `top`
field (no two-tier structure here — see spec.md's Non-goals).

## Rules Engine (within `app.js`)

Ported near-verbatim from `fluffy-Neanderthal/app.js`, which already
implements everything this game needs *except* the parts explicitly being
removed:

- Team setup (`makeTeam`, `renderTeamList`, add/remove, `MIN_TEAMS`/`MAX_TEAMS`).
- Round-length and turns-per-team chip pickers.
- Category checkboxes with live card counts.
- Turn queue construction (`turnsPerTeam` rounds through every team in
  order) and `currentTurnTeam()`.
- Deck building from selected categories, Fisher-Yates shuffle, a
  discard pile that reshuffles back into the draw pile when exhausted
  (avoiding immediately re-showing the just-seen card on that reshuffle).
- `usedPhrases` tracked in `localStorage`, filtered out of future deck
  builds, with a confirm-to-reset prompt when a selected category's pool
  is fully exhausted.
- Countdown timer via `setInterval`, ending the turn at zero.
- Round-end log with tap-to-toggle call adjustment, live score recompute.
- Final scoreboard with tie detection.

What's removed or changed from the sibling's engine:

- **`ACTION_POINTS`/`ACTION_ICONS` shrink to two entries**: `{ got: <word
  count>, skip: 0 }` — no `clubbed` entry, no penalty branch anywhere.
  `handleClubbed()`, `flashClub()`, and the club-flash DOM/CSS are deleted
  outright, not just hidden.
- **Card shape loses the `top`/`phrase` split.** `renderCard()` shows one
  `phrase` field; `handleTopWord()` is deleted; the sibling's `handleFullPhrase()`
  becomes this game's single `handleGotIt()`, scoring
  `phrase.trim().split(/\s+/).length` points (1 or 2) instead of a fixed
  `+3`.
- **Round log's per-entry toggle only cycles two states** (`got`/`skip`),
  not three — the log UI's action-icon row loses its third button.

## Networking

None. This is a deliberate architectural difference from every other game
in this portfolio except `fluffy-Neanderthal`: one physical device is
handed from team to team, so there is no room code, no PeerJS, no
Host/Display split, and no "who broadcasts what" concern — the entire
state lives in one `app.js` closure on one page.

## UI

A **new, distinct visual identity** from the sibling's stone-age caveman
theme — a "silent disco" party look: deep near-black background with hot
pink / electric cyan / neon yellow accents (replacing the sibling's warm
browns/oranges), a big expressive open-mouth motif standing in for the
sibling's bone/club iconography, and a "sound-off" visual cue (a muted
speaker glyph) reinforcing that the mouther makes no sound. Same structural
screen flow as the sibling (Setup -> Handoff -> Play -> Round End -> Final)
so every interaction pattern (chip pickers, category checklist, mini
scoreboard, tap-to-adjust log) is proven, just restyled and re-copywritten
for this game. The wordmark uses a hand-authored SVG lips icon (see
Changelog v1 for why this is hand-drawn rather than image-gen'd); the
Setup screen's atmosphere comes entirely from the CSS radial-gradient
background (no hero photo needed for the look to land).

## Validation

- Manual static smoke test from a local HTTP server: setup renders with
  live card counts, handoff names the right team and color, a card scores
  the right point value per word count on "Got it," "Skip" never changes
  score, the timer ends the turn at zero, the round-end log's toggle
  recomputes score live, the final screen picks the right winner (including
  a tie), and "Play again" returns to setup with teams intact.
- Live two-pass Playwright run driving the whole game loop end to end
  (multiple turns across teams) before shipping, since there is no
  automated test suite for this sibling-style project (matching its own
  convention) — see tasks.md for what was actually run.

## Changelog

- **v1** (2026-07-19): Initial build. The plan called for `image-gen`-skill
  hero art plus a matching icon; the local Codex backend it depends on was
  returning a hard server-side model error (`gpt-5.6-sol` requiring a
  newer Codex CLI) on every retry, unrelated to the prompt content. Rather
  than block the build on a tooling outage, fell back to a hand-authored
  SVG lips icon (`assets/lips-logo.svg`) for the wordmark and dropped the
  planned hero photo entirely — the existing CSS radial-gradient
  background already carries the "silent disco" neon look on its own, so
  no visual gap resulted. Revisit generating real hero art once the
  Codex/image-gen path is working again; nothing else in the build depends
  on it.
