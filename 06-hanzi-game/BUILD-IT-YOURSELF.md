# Build a character (or word) game yourself — prompt for OpenCode

This one is bigger than the single-file prototypes, so the prompt is a *brief*, not a spec. Open OpenCode in an empty folder and paste something like this, changing the learner and the list:

```
Build a phone-first web game that teaches a 7-year-old to read Chinese characters. Vite + TypeScript, plain DOM (no framework), no backend, progress in localStorage, speech via the browser's speechSynthesis (zh-CN). Big buttons, big characters, works on a phone and a laptop.

The character list is data/chars.json (I will give you a list grouped by grade / unit / lesson). Hard rule: when the current lesson is N, ONLY characters from earlier lessons and lesson N may appear anywhere on screen — including distractors and sentence cards. Write a test for this rule and a data checker that fails if a sentence uses an unlearned character.

Game types for the first version, all using only the list: (1) hear a character, pick it from four; (2) match character to pinyin (memory pairs); (3) rebuild a short sentence from shuffled character cards. Add a component-building game only if you can find open IDS decomposition data.

Learning engine: a round is 10 items — new characters from today's lesson first, then characters that are due for review. Spaced repetition = a simple Leitner box (0–4): right moves up, wrong goes to 0; boxes are due after 0, 1, 2, 4, 8 days.

No punishment for wrong answers, only retry; clear positive feedback for right answers. A parent page listing every character's box and right/wrong counts, with a reset button. No login, no ads, no external links.

Commit after each playable milestone. Add a vitest smoke test per game type.
```

Then play it on your phone and send the agent what you saw ("the sound cuts off the end of single characters", "the same character appeared three times in a row"). Ask it to add one test for each bug it fixes. Finally ask: "Which sentence of my brief did you find hardest to follow, and why?"

For an English word list: drop the component games, set the voice to `en-GB`, and replace pinyin with a picture or a definition.
