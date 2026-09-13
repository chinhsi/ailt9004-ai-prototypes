# Build a character (or word) game yourself — a starter note for OpenCode

This prototype is bigger than the single-file ones, so what you give the assistant is a *note*, not a technical list. Open OpenCode in an empty folder (it will need Node.js installed — the assistant can tell you how) and paste something like this, changing the learner and the list:

```
Build a phone-first web game that teaches a 7-year-old to read Chinese characters. Keep it simple: a plain web page (no framework), no server, progress saved in the browser. Big buttons, big characters; works on a phone and a laptop.

The character list is data/chars.json (I will give you a list grouped by grade / unit / lesson). Hard rule: when the current lesson is N, ONLY characters from earlier lessons and lesson N may appear anywhere on screen — including wrong options and sentence cards. Write an automatic test for this rule, and a data check that fails if a sentence or word uses an unlearned character.

Question types for the first version, all using only the list: (1) hear a character, pick it from four; (2) match character to pinyin (memory pairs); (3) rebuild a short sentence from shuffled character cards; (4) fill the missing character in a two-character word. Add "build the character from its parts" only if you can find open decomposition data.

Learning engine: a round is 10 items — new characters from today's lesson first, then characters due for review. Spaced repetition = a simple five-box Leitner system: right moves up a box, wrong goes to box 0; boxes are due after 0, 1, 2, 4, 8 days.

Sound: record every character, word and sentence in advance with a free natural voice (edge-tts) and ship the clips with the game; use the phone's built-in voice only as a fallback. Store clips on the phone after the first visit.

No punishment for wrong answers, only retry; clear positive feedback for right ones. A parent page listing every character's box and right/wrong counts, with a reset button. No login, no ads, no external links.

Save a snapshot (commit) after each playable step. Add a small automatic test for each question type.
```

Then play it on your phone and tell the assistant what you saw ("the end of single characters is cut off", "the same character appeared three times in a row", "no sound on my iPhone"). Ask it to add one test for each bug it fixes. Ask a second assistant to review the whole thing and list problems. Finally ask the builder: "Which sentence of my note did you find hardest to follow, and why?"

For an English word list: drop the "parts" questions, choose an English voice, and replace pinyin with a picture or a short definition.
