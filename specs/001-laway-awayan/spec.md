# Feature Specification: Laway-awayan

**Feature branch**: `001-laway-awayan`
**Status**: Draft
**Created**: 2026-07-19

## Overview

Laway-awayan is a party game of silent lip-reading: one player (the
**mouther**) privately sees a short word or two-word phrase on their own
phone, then mouths it to their team **completely silently — no sound at
all** — while the team races the clock to read their lips and shout the
right guess. Everyone else at the table can watch and heckle; only the
mouther's team's guesses count.

It reuses the proven single-device, pass-the-phone architecture from the
sibling game `fluffy-Neanderthal` ("Poetry for Neanderthals") — team setup,
round timer, turn queue, card deck with category selection, round-end
review log, final scoreboard — but is not a re-skin of that game's content
or rules:

- No syllable constraint. The mouther isn't *speaking* short words; they're
  *silently mouthing* a clue, so there is nothing to enforce about word
  length in what they say.
- No "clubbed" penalty mechanic. Poetry for Neanderthals penalizes a
  clue-giver for breaking the one-syllable rule (-1 point, a "CLUBBED!"
  flash). Laway-awayan drops the penalty entirely — scoring is
  purely positive (a correct guess, or a skip that costs nothing).
- Every card is a single clue phrase capped at **one or two words** (not
  Poetry for Neanderthals' two-tier "top word" + "full phrase" card
  structure) — lip-reading a full sentence silently is nearly impossible,
  but one or two words is genuinely readable.
- All-new categories, all-new card content, and a distinct visual identity
  (a vibrant "silent disco" theme, not the sibling's stone-age look).

This is a free, ad-free, static site — no backend, no build step, no
account system, deployed to GitHub Pages.

## User Stories

### US-1: Set up teams
As the host, I want to name 2-6 teams before playing, so everyone knows
whose turn it is and how the score is tracking.

Acceptance criteria:
- The game starts with 2 default teams; the host can add up to 6 and
  remove down to 2, each with an editable name and an assigned color.
- Duplicate team names are automatically disambiguated when the game
  starts (matching name gets a `(2)`, `(3)`, ... suffix).
- A "Reset" control clears teams, settings, and this device's used-card
  history back to defaults.

### US-2: Configure the round
As the host, I want to choose how long each turn lasts, how many turns per
team, and which word categories are in play, so the game fits the group.

Acceptance criteria:
- Round length is selectable from a fixed set of chip options (e.g. 30s,
  60s, 90s, 120s), defaulting to 60s.
- Turns per team is selectable from a fixed set (e.g. 1, 3, 5), defaulting
  to 3.
- Every category can be toggled on/off independently; at least one must be
  selected to start. Each category shows its live card count.
- Starting requires at least 2 teams and at least one selected category.

### US-3: Hand off between turns
As a player, I want a clear "pass the phone" moment before each turn, so
the right person ends up holding the device.

Acceptance criteria:
- Between turns, a handoff screen names the team up next (in that team's
  color) and shows the live scoreboard.
- The handoff screen makes clear who should take the phone (the next
  mouther) and that everyone else should watch their lips, not the screen.
- Play begins only once that team taps "We're ready."

### US-4: Mouth the clue, guess the clue
As the mouther, I want to see one short clue at a time and mark whether my
team got it, so the turn keeps moving without any manual scorekeeping.

Acceptance criteria:
- Each drawn card shows its category and a clue phrase of **one or two
  words only** — nothing longer.
- The mouther has exactly two actions per card: **Got it!** (the team
  guessed correctly) and **Skip** (move on, no points either way — this is
  the only way to move past a card the team can't get; there is no
  penalty action of any kind).
- A correct guess scores the card's point value (see US-6) and immediately
  deals the next card; a skip deals the next card with no score change.
- The turn ends the instant the shared timer hits zero, whichever card is
  showing at that moment is logged as unresolved (treated as a skip) so
  the review step in US-5 can still fix it if the team actually got it
  right at the buzzer.
- No card is repeated within a single game session's turn queue while
  cards remain in the selected categories' unseen pool.

### US-5: Review and adjust the turn
As a team, we want a chance to fix a bad call after time's up, so a missed
tap doesn't cost real points.

Acceptance criteria:
- After each turn, a summary states how many points that team just
  scored and lists every card seen this turn with the call that was made.
- Tapping a card's log entry toggles it between "Got it" and "Skip" and
  live-adjusts that team's score accordingly. There is no third
  (penalty) option to toggle to.
- The running scoreboard is visible on this screen before advancing.

### US-6: Score and win
As a group, we want a fair scoring scheme and a clear winner at the end.

Acceptance criteria:
- Every correctly-guessed clue scores a flat 1 point, whether it was one
  word or two — no penalty mechanic, no per-word weighting.
- After the last turn in the queue, the team(s) with the highest score
  win; a tie is shown as a tie, not broken arbitrarily.
- "Play again" returns to the setup screen with the same teams and
  settings still in place, ready to start a fresh game.

### US-7: Don't repeat cards on the same device
As a returning player, I want fresh clues each time we play on this
device, so repeat games don't reuse the exact same cards.

Acceptance criteria:
- Every card shown in a game is recorded in this device's local storage
  and excluded from future decks built on this device, scoped per
  category.
- If every card in the currently-selected categories has already been
  used, starting a game asks whether to reset just those categories'
  history before dealing a fresh shuffle.
- This is a per-device convenience, not cross-device sync — there is no
  account system.

## Functional Requirements

- **FR-1** Static site only: plain HTML/CSS/JS, no backend, no build step,
  no bundler — matches the sibling `fluffy-Neanderthal`'s architecture.
- **FR-2** Single shared device, passed hand-to-hand between turns — no
  peer-to-peer networking, no multi-device sync (unlike this portfolio's
  other, WebRTC-based party games).
- **FR-3** Every card's clue text is one or two words, enforced by how the
  deck is authored (`cards.js`), not by runtime validation.
- **FR-4** No ads, no analytics, no tracking, no accounts.
- **FR-5** No penalty scoring action anywhere in the UI or rules — only
  "Got it" (positive) and "Skip" (neutral) exist as turn actions.

## Key Entities

- **Card**: `category`, `phrase` (1-2 words), flat `points` value of 1.
- **Team**: `id`, `name`, `color`, `score`.
- **Category**: a named list of Cards, independently toggleable in setup.
- **Turn**: the active team, the shuffled per-turn card sequence seen, and
  the log of Got-it/Skip calls made (adjustable after the fact).

## Non-goals

- No syllable, rhyme, or pronunciation constraints of any kind.
- No penalty/foul mechanic (explicitly dropped from the sibling game).
- No two-tier card structure (single clue phrase only, not a "top word"
  plus "full phrase" pair).
- No peer-to-peer/multi-device play — one shared device only.
- No clue phrase longer than two words.
