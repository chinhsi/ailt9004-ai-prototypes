# How 认字乐园 was built: one evening, one brief, ten commits

*Teacher's notes for AILT9004 Week 5 (and MEDD8934 Week 3, where the Leitner box is the example of personalisation "by data").*

## Timeline (13 Sep 2026, Hong Kong time)

| Time | Commit | What happened |
|---|---|---|
| 00:23 | init: hanzi game brief | The teacher's brief (`BRIEF.md`) is the first and only thing in the repository. |
| 00:28, 00:34 | data: 马立平 grade 2, grade 1 character lists | The agent extracts the character lists from the publisher's PDFs into JSON, grouped by unit and lesson. The brief is updated: "character list decided". |
| 00:41 | AGENTS.md: game-type roadmap | Eleven game types listed; the teacher picks four that need no new data (1 listen-and-find, 4 build-from-components, 8 memory pairs, 10 sentence order). |
| 00:46 | MVP: four game types + Leitner + parent page + tests | First playable version: 10 rounds, stars, progress, parent page, vitest smoke tests. |
| 00:57 | The progressive rule as a hard constraint | "Only learned characters may appear" becomes one function all games draw from, a data checker, and a test. TTS fix: single characters were being cut off. |
| 01:03 | Game type 5: same-component hunt | Added because the component data was already there (character families such as 青 → 请 睛 蜻 情). |
| 01:23 | Codex review: 14 findings, 13 fixed, 7 new tests | A second agent reviews the code; fixes include recursive component matching, input locks so double taps do not count twice, sentence-game threshold, iOS speech gesture handling, saved-data validation. |
| 01:25–01:26 | Pages deployment | Build output pushed to a public repository; source stays private because of the PDFs. Live at chinhsi.github.io/hanzi-game-pages. |

About one hour from brief to a reviewed, deployed game. The teacher's contribution: the brief, two decisions (character list; which four game types first), and the rule.

## What to point at in class

- **The brief is the product.** Compare `BRIEF.md` with the running game: nearly every sentence is visible somewhere. The sentences that became *tests* were followed most exactly.
- **A pedagogical rule can be a unit test.** "Never show a character the child has not learned" is a teaching decision; in the code it is `learned()` + `check-data.mjs` + one test. Ask students: what rule in *your* teaching could be written this way?
- **The learner model is five boxes.** Leitner is decades old and needs no AI at all. The AI here wrote the game; the adaptivity is plain arithmetic on the child's history. (MEDD8934 W3: personalisation by data can be this simple — and this transparent: the parent page *is* the learner model.)
- **Two agents, not one.** The build agent and the review agent found different things. The review caught double-tap scoring and an iOS audio rule the builder could not know without a phone.
- **What is still untested:** whether a seven-year-old plays it twice. Everything above is engineering; that is the research.

## Honest list

- Not yet played by the child at the time of writing; TTS on iOS Safari unverified in the wild.
- 25 % of characters lack a clean component split and skip two game types.
- Sentences are home-made and only machine-checked for vocabulary.
- Simplified characters and pinyin only, because that is the child's curriculum; a Hong Kong class would need traditional characters and a different list — the architecture does not care, the data does.
