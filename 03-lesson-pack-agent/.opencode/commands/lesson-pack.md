---
description: Turn a short text file into a 5-file lesson pack (vocabulary, comprehension, cloze, HTML quiz, teacher notes)
---

The user's arguments: $ARGUMENTS

They are `<path-to-text-file> [key stage, e.g. "KS3"]`. If no file path is given, ask for one and stop.

**This file is the recipe. Everything below is the lesson design — change it and the agent teaches differently.**

Follow these steps in order and report each step in one line as you go. Use file tools only (read / write / list); do not run terminal commands.

1. **Read** the text file. Detect its language and length. Choose a `<slug>` for the output folder (short, lowercase, hyphens).
2. **Analyse**: decide the target level (use the key stage the user gave, otherwise infer it and say so in the teacher notes). Pick 8–10 target vocabulary items that are (a) in the text and (b) useful at this level.
3. **Write `output/<slug>/01-vocabulary.md`**: the target words in house style, plus 5 sentence-completion practice items with an answer key.
4. **Write `output/<slug>/02-comprehension.md`**: 4 literal questions, 3 inferential questions, 1 personal-response question. Every answer must be supported by the text — do not add specifics the text does not contain. Answer key at the end (mark the personal-response item "open").
5. **Write `output/<slug>/03-cloze.md`**: the original text with 10 numbered gaps (target vocabulary plus useful function words), a word bank, and an answer key. A gap must be recoverable from context or grammar; if it is not, choose another word.
6. **Write `output/<slug>/04-quiz.html`**: a self-contained multiple-choice quiz (8 questions, 4 options each) that shows one question at a time and a final score. No external scripts or styles. At least 3 questions must need information from more than one sentence — not only literal recall.
7. **Write `output/<slug>/00-teacher-notes.md`**: level and rationale, a suggested 40-minute lesson flow using the four files, differentiation tips (one for weaker, one for stronger students), and a "check before use" list (facts, cultural references, difficulty). No answer key in this file.
8. **Verify**: re-read `04-quiz.html` and `02-comprehension.md` with your file-reading tool (no shell commands) and confirm every correct answer is supported by the source text. Fix anything that is not.
9. **Finish** with a 5-line summary for the teacher: slug, level, the target words, one caution, and which file you would edit first.

**When the text does not fit the recipe**

- Shorter than about 120 words / 200 characters: say so, then write fewer items (for example 5 vocabulary items and 5 quiz questions) rather than inventing content.
- Longer than about 800 words / 1200 characters: use the first section that makes a coherent whole, and say in the teacher notes which part you used.
- Mixed languages: use the language of the majority of the text, and keep the other language's words as vocabulary items only if the text teaches them.
- Not a plain-text file (PDF, Word, image): stop and ask the teacher to paste the text into a `.txt` file. Do not guess the content.
