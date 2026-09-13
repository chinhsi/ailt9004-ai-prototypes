# How 认字乐园 was built: one day, one note, thirty small steps

*Teacher's notes for AILT9004 Week 5. Written for readers who do not code.*

## First, four words you will meet

- **Repository (repo):** the folder where a program and its history live, usually on GitHub.
- **Commit:** a saved snapshot of that folder with a one-line note saying what changed. Thirty commits = thirty saved steps.
- **Test:** a small automatic check that runs every time the program changes and shouts if something that used to work is now broken.
- **Review:** a second assistant reads the whole program cold and lists what could go wrong.

## The day (13 Sep 2026, Hong Kong time)

| Time | What happened |
|---|---|
| 00:23 | The teacher's one-page note is saved as the first commit. Nothing else exists yet. |
| 00:28–00:34 | The assistant reads the textbook's character lists (PDFs) and turns them into a list the game can use, lesson by lesson. |
| 00:41 | Eleven possible question types are listed. The teacher picks four that need no extra material and says the rest can wait. |
| 00:46 | **First playable game**: four question types, the five-box memory system, stars, a parent page, and a first set of tests. Twenty-three minutes after the note. |
| 00:57 | The teacher's strict rule ("only characters already taught may appear") becomes an automatic check plus a test. |
| 01:03 | A fifth question type (part hunt) is added because the material for it was already there. |
| 01:23 | **First review**: 14 problems found, 13 fixed — for example, a fast double tap used to count as two answers. Seven new tests. |
| 01:25 | The game goes online. |
| 01:30–02:02 | The teacher tries it on an iPhone: the built-in voice is poor and sometimes reads the wrong thing. Decision: record every character, word and sentence in advance with a free, natural Microsoft voice (829 clips, later 1,400) and keep the phone's voice only as a fallback. |
| 03:49–06:38 | The long stretch: making sound play reliably on every phone. Each browser breaks in a different way (iPhone needs a tap before any sound; one browser never says "finished"; another never says "ready"). Solutions: play through a more reliable audio route, store the clips on the phone after the first visit, and a "watchdog" that notices within three seconds when a sound did not start and tries another way. A script listens to all 829 clips with a speech recogniser to make sure none is silent. |
| 08:59 | A sixth question type: fill the missing character in a word, using a new list of 570 words that only use taught characters. |
| 09:14 | **Second review**: 10 problems, all fixed, six more tests — mostly about sound: the game now waits for the voice to finish before moving on, and there is one clear "stop everything" point. |
| 09:16 | Version 0.14 online. |

## What to point at in class

- **The note is the product.** Put `BRIEF.md` next to the running game: almost every sentence is visible somewhere. The sentences that became automatic checks were followed most exactly.
- **A teaching rule can be a test.** "Never show a character the child has not learned" is a pedagogical decision. In the game it is one line of logic plus one automatic check. Ask: what rule in *your* teaching could be written that clearly?
- **The "adaptive" part is five boxes.** No AI decides what the child sees next; a forty-year-old flashcard method does, and the parent can see it. Good question for MEDD8934 Week 3: when does personalisation *need* to be opaque?
- **Sound was the hard part, not the game.** Twenty-three minutes to a playable game; seven hours to make a phone reliably say 池. The expensive part of school software is rarely the clever part.
- **Two assistants beat one.** The reviewer caught the double-tap bug and an iPhone sound rule the builder could not know without a phone in hand.
- **Still untested:** whether a seven-year-old plays it twice. Everything above is engineering; that is the research.

## Honest list

- Not yet played by the child at the time of writing.
- 25 % of characters have no clean two-part split and skip two question types.
- Sentences and words are home-made and only machine-checked for vocabulary.
- Simplified characters and pinyin only; the code does not care, the list does.
