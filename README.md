# Laway-awayan 👄

Mouth it. No sound. Read the lips.

A free, ad-free party game of silent lip-reading, played from a single
shared phone. One player — the **mouther** — privately sees a one- or
two-word clue and mouths it to their team completely silently, no sound at
all. Everyone else watches their lips and shouts guesses before the clock
runs out.

## How to play

1. **Set up your teams** — 2 to 6 teams, each with an editable name and a
   color. Pick a turn length (30–120s), turns per team, and which word
   piles are in play.
2. **Pass the phone** to the next team's mouther on the handoff screen.
3. **Mouth the clue** — one word or two words, never more. No sound, no
   whispering, no mouthing exaggerated syllables — just silently shape the
   words with your mouth while your team watches closely.
4. Tap **Got it!** the instant your team shouts the right answer (one-word
   clues are worth 1 point, two-word clues are worth 2), or **Skip** to
   move on. There is no penalty for anything — this game only scores
   forward.
5. When the timer runs out, review the turn: tap any card in the list to
   flip it between Got it / Skip if a call was missed in the moment.
6. After every team's turns are up, the highest score wins (ties are shown
   as ties). **Play again** keeps your teams and settings for a rematch.

## Local development

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

No build step, no dependencies, no backend. There is no automated test
suite for this project (matching the sibling `fluffy-Neanderthal`'s own
convention) — changes are verified with a live Playwright pass through the
full game loop before shipping; see `specs/001-laway-awayan/plan.md`'s
Validation section for what was actually run.

## Design docs (SDD)

This project was built spec-first. See
[`specs/001-laway-awayan/`](specs/001-laway-awayan/):
[spec.md](specs/001-laway-awayan/spec.md),
[plan.md](specs/001-laway-awayan/plan.md), and
[tasks.md](specs/001-laway-awayan/tasks.md).
