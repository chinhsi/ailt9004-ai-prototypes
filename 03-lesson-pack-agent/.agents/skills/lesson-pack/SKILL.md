---
name: lesson-pack
description: Turn a short text (given as a file path after the command) into a 5-file lesson pack — vocabulary, comprehension questions, cloze exercise, self-checking HTML quiz, teacher notes.
---

The user runs `/lesson-pack <path-to-text-file> [key stage, e.g. "KS3"]`. If no file path is given, ask for one and stop.

Follow these steps in order and report each step in one line as you go. Use file tools only (read/write/list); do not run terminal commands.

1. **Read** the text file. Detect its language and length. Choose a `<slug>` for the output folder.
2. **Analyse**: decide the target level (use the key stage the user gave, otherwise infer). Pick 8–10 target vocabulary items that are (a) in the text and (b) useful at this level.
3. **Write `output/<slug>/01-vocabulary.md`**: the target words in house style, plus 5 sentence-completion practice items with an answer key.
4. **Write `output/<slug>/02-comprehension.md`**: 4 literal questions, 3 inferential questions, 1 personal-response question. Answer key at the end (mark the personal-response item "open").
5. **Write `output/<slug>/03-cloze.md`**: the original text with 10 gaps (numbered, targeting the vocabulary and useful function words), a word bank, and an answer key.
6. **Write `output/<slug>/04-quiz.html`**: a self-contained multiple-choice quiz (8 questions mixing vocabulary and comprehension, 4 options each) that shows one question at a time and a final score. No external scripts or styles.
7. **Write `output/<slug>/00-teacher-notes.md`**: level and rationale, suggested 40-minute lesson flow using the four files, differentiation tips (one for weaker, one for stronger students), and a "check before use" list (things the teacher should verify: facts, cultural references, difficulty).
8. **Verify**: re-read `04-quiz.html` with your file-reading tool (no shell commands) and confirm every correct answer is supported by the text. Fix any problem you find.
9. **Finish** with a 5-line summary for the teacher: slug, level, the target words, and one caution.
