# Prototype 6 — 认字乐园 Hanzi Game (a character-learning game built from a one-page brief)

**What it is:** a phone-first game that teaches a seven-year-old to read Chinese characters, built for a real seven-year-old learner in the teacher's family. Pick today's lesson (the 马立平中文 grade 1–2 character list, 672 characters), press *Start*, and play ten rounds drawn from five game types:

| # | Game | What the child does | Data it needs |
|---|---|---|---|
| 1 | 听音找字 Listen and find | Hears a character (browser text-to-speech), taps one of four | the character list |
| 4 | 拼字工坊 Build the character | Assembles a character from its components (氵＋也 → 池) | a component breakdown for each character (open IDS data) |
| 5 | 找部件 Same-component hunt | Picks every character in a 3×3 grid that contains 氵 / 扌 / 艹 … | the same breakdown, recursively |
| 8 | 翻翻乐 Memory pairs | Matches character ↔ pinyin cards | the character list |
| 10 | 排句子 Sentence order | Rebuilds a short sentence from shuffled character cards | 66 short sentences written for the game |

Progress lives in the browser (a five-box **Leitner** spaced-repetition schedule: right → up a box, wrong → back to box 0; boxes come due after 0, 1, 2, 4, 8 days). A **parent page** shows every character's box and right/wrong counts. No login, no server, no ads.

**Play it:** <https://chinhsi.github.io/hanzi-game-pages/> (works on any phone; on iPhone tap the screen once before the first sound). It is in simplified Chinese with pinyin because that is the child's curriculum.

**Tool used:** Vite + TypeScript, plain DOM, ~330 lines of game code plus data-building scripts and a test suite (vitest). Built and deployed by a coding agent (Claude Code, then reviewed by Codex) from the brief in `BRIEF.md`, in about one hour on 13 Sep 2026 — see `HOW-IT-WAS-BUILT.md`. The source repository is private because it contains the publisher's PDF character lists; the public site is the built game only.

## Why this one is in the course

Prototypes 1, 4 and 5 are single HTML files. This one is the next step up: a *real* small project with a build step, data pipeline and tests — and it was still made without the teacher writing code. What the teacher wrote was the **brief** (`BRIEF.md`): who the learner is, what the rules are, what is out of scope. Three things in that brief did most of the work:

1. **A pedagogical rule stated as a hard constraint.** "When teaching lesson N, only characters from grade 1 and lessons 1..N may ever appear on screen" (漸進式鐵則). The agent turned it into one function that every game must draw from, a data checker, and a test called *only learned characters appear*. A rule you can test is a rule the agent will keep.
2. **A roadmap the teacher ranked.** Eleven game types were listed; the teacher chose four that need no new data, and said which ideas were *later*. The agent built exactly those four, then one more that only needed the existing component data.
3. **Learner-model design in one line.** "Small batches, spaced repetition, a simple Leitner box is enough." That line is the whole adaptive engine — and it is *by data* (Week 3 in MEDD8934): the game decides what to show next from the child's history, not from a prompt.

## Try it in class (10 minutes)

1. Open the site on your phone. Choose 二年级 第1单元 lesson 1. Play ten rounds. Notice which game types appear and which characters come back.
2. Open the parent page. Which characters are in box 0? That is the learner model, made visible.
3. Read `BRIEF.md`. Underline every sentence that became a *rule* the agent could test. Then underline every sentence that is *taste* (big buttons, no punishment). Which kind did the agent follow more faithfully?
4. Write a brief of your own for a game for your learners: one hard constraint, one ranked list of game types, one line about the learner model. That brief is a Task 2 starting point.

## Make it yours

You cannot edit this one in a text editor and reload — it has a build step. The route is the one from Week 4: write a brief like `BRIEF.md`, open OpenCode in an empty folder, and ask for the same architecture (Vite + TypeScript, plain DOM, localStorage, browser TTS, a JSON character list the teacher can edit). For an English or Cantonese class, change the list, the TTS language code (`zh-CN` → `en-GB` / `zh-HK`) and drop the component games. `BUILD-IT-YOURSELF.md` has a starter prompt.

## Known limits (good discussion material)

- Component data comes from an open IDS (ideographic description) table; about a quarter of the 672 characters have no clean two-part split, so they never appear in the component games.
- Browser text-to-speech quality varies; on some phones the Mandarin voice is poor or missing. The game says so on the home screen.
- The sentences were written for the game, not taken from the textbook, and are checked only for "uses learned characters", not for naturalness. A teacher should read them.
- Ten rounds a day and stars — the reward loop is deliberately shallow. Whether a seven-year-old comes back is the real test, and it has not been run yet (see HOW-IT-WAS-BUILT).
