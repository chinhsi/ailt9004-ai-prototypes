# Prototype 6 — 认字乐园 Hanzi Game: a real game, built from a one-page note

*Written for readers who do not code. Every technical word is explained the first time it appears.*

## What it is

A small phone game that teaches a seven-year-old to read Chinese characters. The child picks today's lesson, presses *Start*, and gets ten quick questions. The characters come from the 马立平中文 grade 1–2 course (672 characters), so the game always matches what the child is learning at school.

**Play it now, no login, no key:** <https://chinhsi.github.io/hanzi-game-pages/> (on an iPhone, tap the screen once before the first sound).

There are six kinds of question. The game mixes them:

| Kind | What the child does |
|---|---|
| 听音找字 Listen and find | Hears a character read aloud, taps the right one out of four |
| 看词选字 Fill the word | Sees 蜻＿ , hears "蜻蜓", picks the missing character |
| 拼字工坊 Build it | Puts a character together from its parts: 氵 ＋ 也 → 池 |
| 找部件 Part hunt | Taps every character in a grid that contains the same part (氵, 扌, 艹 …) |
| 翻翻乐 Memory pairs | Turns over cards to match a character with its pinyin |
| 排句子 Sentence order | Puts a short sentence back in order from shuffled character cards |

Wrong answers are never punished, only retried. Right answers get stars. A **parent page** shows, for every character, how well the child knows it.

## Three ideas inside it that matter for teachers

**1. The game remembers, and decides what to show next.** Each character sits in one of five "boxes". Get it right, it moves up a box and comes back later (after 1, 2, 4, then 8 days). Get it wrong, it drops to box 0 and comes back tomorrow. This old paper-flashcard method is called the *Leitner system*. It is the whole "adaptive" engine of the game, it needs no AI at all, and the parent page shows the boxes — so the way the game is judging the child is visible to the parent. (In MEDD8934 Week 3 terms: personalisation *by data*, but transparent.)

**2. A teaching rule that the game is not allowed to break.** The teacher wrote one strict sentence: *when the child is on lesson N, only characters from lesson N and earlier may ever appear on screen — not even as wrong options.* The person who built the game turned that sentence into a check that runs automatically every time the game is changed. If anyone later adds a sentence that uses a character the child has not learned, the check fails and the change is refused. A rule you can write this clearly is a rule the software will keep.

**3. Real voices, stored on the phone.** The first version used the phone's built-in voice. On iPhone it sounded bad and sometimes read the wrong thing. So every character, word and sentence (about 1,400 short sound clips) was recorded in advance using a free, natural-sounding Microsoft voice, and the game saves the clips on the phone the first time it runs, so it plays them instantly even with poor Wi-Fi. If a sound ever fails to start, the game notices within three seconds and tries another way; there is also a "声音卡住？点我" (sound stuck? tap me) button.

## How it was made (short version; the long version is in HOW-IT-WAS-BUILT.md)

The teacher did not write the program. The teacher wrote a one-page note — who the learner is, what the rules are, which question types to build first, what is out of scope (`BRIEF.md`). A coding assistant (Claude Code) built the game from that note; a second assistant (Codex) read the finished code and listed problems; the first one fixed them. The teacher's part was the note, a few decisions along the way, and testing it on a real phone. From the note to a playable game took about one hour; the sound problems on iPhone took most of the rest of the day.

## Try it in class (10 minutes)

1. Open the game on your phone. Choose 一年级 第1单元 lesson 1. Play ten rounds. Which kinds of question appear? Which characters come back?
2. Open the parent page. The characters listed there, with their boxes, *are* the game's opinion of the child.
3. Read `BRIEF.md`. Mark the sentences that are **rules** (could a machine check them?) and the sentences that are **taste** (big buttons, no punishment). Which kind did the builder follow more exactly?
4. Write a one-page note of your own for a game for your learners: one strict rule, a ranked list of question types, one sentence about how the game should remember the learner. That note is a Task 2 starting point.

## Make it yours

You cannot edit this one in a text editor the way you can edit the single-file prototypes; it has to be rebuilt after each change. The way in is the Week 4 way: write a note like `BRIEF.md`, open OpenCode in an empty folder, and ask for the same kind of game. For an English or Cantonese class you would change the character list, drop the "parts" questions, and choose a different voice. `BUILD-IT-YOURSELF.md` has a starter note.

## What it cannot do yet (good discussion material)

- About a quarter of the 672 characters cannot be split cleanly into two parts, so they never appear in the two "parts" questions.
- The 66 sentences and 570 words were written for the game, not copied from the textbook, and the automatic check only confirms that every character in them has been taught, not that they sound natural. A teacher should read them.
- Ten questions a day and some stars: the reward is deliberately simple. Whether a seven-year-old asks to play again is the real test, and it had not been run when this was written.
- Simplified characters and pinyin only, because that is the child's course. A Hong Kong class would need traditional characters and a different list; the game does not care which list it is given.
