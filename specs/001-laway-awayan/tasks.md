# Tasks: Laway-awayan

## Phase 1 - SDD docs

- [x] Write spec.md: user stories, functional requirements, key entities,
      and non-goals (explicitly ruling out the sibling's penalty mechanic,
      syllable rule, and two-tier card structure).
- [x] Write plan.md: technical context, data model, ported-vs-changed
      rules engine, and UI direction.
- [x] Write this task list.

## Phase 2 - Deck

- [x] Author `cards.js`: 9 new categories (Big Mouth Basics, Filipino Eats,
      Star Power, Screen Time, Wild Kingdom, Sports & Games, Internet Famous,
      Places to Go, Everyday Chaos) — none reused from `fluffy-Neanderthal` —
      every phrase one or two words, ~23-24 cards per category (~210 total).
- [x] Card-shape guard: every entry hand-checked at 1-2 words; no category
      left empty.

## Phase 3 - Rules engine (`app.js`)

- [x] Ported team setup, chip pickers, category checklist, turn queue,
      deck build/shuffle/discard-recycle, and used-phrase `localStorage`
      tracking from `fluffy-Neanderthal/app.js` (storage key prefix
      changed to `laway.` so the two games never collide in the same
      browser).
- [x] Replaced the two-tier top/phrase card handling with a single
      `handleGotIt()` scoring by word count (1 or 2) via `wordCount()`,
      plus `handleSkip()`.
- [x] Deleted the clubbed mechanic entirely: no `ACTION_POINTS`/`clubbed`
      entry, no `handleClubbed()`, no club-flash state, DOM hooks, or CSS
      animations — confirmed via a live DOM query for any club-related
      element (see Phase 5).
- [x] Round-end log toggles between only two states (got/skip) and
      recomputes score live on adjustment (`adjustLogEntry`).
- [x] Countdown timer ends the turn at zero; unresolved on-screen card
      logs as a skip, reviewable/fixable in the round-end log.
- [x] Final scoreboard with correct tie handling; "Play again" returns to
      setup with teams/settings intact.

## Phase 4 - UI

- [x] `index.html`: Setup, Handoff, Play, Round End, Final screens with
      this game's own copy (no caveman/club language).
- [x] `style.css`: new silent-disco palette (hot pink / electric cyan /
      neon yellow on near-black) and layout, restyled chip/card/scoreboard
      components carried over structurally from the sibling.
- [x] Hero image + page icon: the `image-gen` skill's Codex backend was
      returning a hard server-side error on every retry (unrelated to
      prompt content — a model-version mismatch), so this fell back to a
      hand-authored original SVG lips icon (`assets/lips-logo.svg`); the
      Setup screen's CSS radial-gradient already carries the theme without
      needing a hero photo. See plan.md Changelog v1.

## Phase 5 - Validation

- [x] Local static server smoke test: `index.html`, `app.js`, `cards.js`,
      `style.css`, and the SVG icon all serve 200.
- [x] Live Playwright run through a full multi-turn game: setup (9
      categories rendered with live counts) -> team rename -> handoff
      (correct team/color) -> play (word-count-correct scoring on 3x Got
      it + 1x Skip, confirmed zero club-related DOM elements and exactly 2
      action buttons) -> timer-driven turn end -> round-end log with a
      live-recomputing toggle -> second team's turn -> final scoreboard
      with the correct winner -> Play Again preserving the renamed team.
      No automated test suite for this project, matching the sibling's own
      convention.

## Phase 6 - Ship

- [x] README with how-to-play and SDD links.
- [x] Commit and push to `main`; verify `laway-awayan.gondoit.work` serves
      the new content after GitHub Pages picks it up.
