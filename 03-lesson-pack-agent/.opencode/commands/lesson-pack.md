---
description: Turn a short text file into a 5-file lesson pack (vocabulary, comprehension, cloze, HTML quiz, teacher notes)
---

The user's arguments: $ARGUMENTS

They are `<path-to-text-file> [key stage, e.g. "KS3"]`. If no file path is given, ask for one and stop.

**This file is the recipe. Everything below is the lesson design — change it and the agent teaches differently.**

Follow these steps in order. Use file tools only (read / write / list); do not run terminal commands. Finishing the files matters more than narrating: a few words per step is enough.

1. **Read** the text file. Detect its language and length. Choose a `<slug>` for the output folder (short, lowercase, hyphens).
2. **Analyse**: decide the target level (use the key stage the user gave, otherwise infer it and say so in the teacher notes). Pick 8–10 target vocabulary items that are (a) in the text and (b) useful at this level.
3. **Write `output/<slug>/01-vocabulary.md`**: the target words in house style, plus 5 sentence-completion practice items with an answer key. For Chinese, label the part of speech with school grammar terms (名詞／動詞／形容詞／副詞／量詞／連接詞); if the item is a set phrase or a fixed expression rather than a single part of speech, label it 固定用語 instead of forcing one.
4. **Write `output/<slug>/02-comprehension.md`**: 4 literal questions, 3 inferential questions, 1 personal-response question. Every answer must be supported by the text — do not add specifics the text does not contain. Answer key at the end (mark the personal-response item "open").
5. **Write `output/<slug>/03-cloze.md`**: the original text with 10 numbered gaps (target vocabulary plus useful function words), a word bank, and an answer key. A gap must be recoverable from context or grammar; if it is not, choose another word.
6. **Write `output/<slug>/04-quiz.html`**: a self-contained multiple-choice quiz (8 questions, 4 options each) that shows one question at a time and a final score. No external scripts or styles. At least 3 questions must need information from more than one sentence — not only literal recall.
7. **Write `output/<slug>/00-teacher-notes.md`**: level and rationale, a suggested 40-minute lesson flow using the four files, differentiation tips (one for weaker, one for stronger students), and a "check before use" list (facts, cultural references, difficulty). No answer key in this file.
8. **Verify**: re-read `04-quiz.html` and `02-comprehension.md` with your file-reading tool (no shell commands) and confirm every correct answer is supported by the source text. Fix anything that is not.
9. **Finish** with a 5-line summary for the teacher: slug, level, the target words, one caution, and which file you would edit first.

**When the text does not fit the recipe**

- Shorter than about 120 words / 200 characters: **still write all five files**, but with fewer items (for example 5 vocabulary items, 5 comprehension questions, 5 gaps, 5 quiz questions). Say in the teacher notes that the text was short. Never invent content to reach a number.
- Longer than about 800 words / 1200 characters: use an excerpt of roughly the first 600 words / 900 characters, ending at a paragraph break (never mid-paragraph), and quote the first and last few words of that excerpt in the teacher notes so the teacher knows exactly what was used. Still write all five files.
- Mixed languages: count the characters of each language and work in whichever has more. Words from the other language belong in the vocabulary list only when the text itself explains or defines them; ordinary code-switching (common in Hong Kong writing) is not a vocabulary item.
- Not a plain-text file (PDF, Word, image): stop and ask the teacher to paste the text into a `.txt` file. Do not guess the content.
