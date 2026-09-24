# Prototype 3 — Lesson Pack Agent (a CLI agent with no code in it)

## What it is for

**Give it one reading text. Get five files you can teach from tomorrow.**

You run one command on a `.txt` file; a minute or two later there is a new folder with a complete lesson pack in it. Nothing is printed in a chat window for you to copy out — these are real files, ready to print or upload.

| File | What is actually in it | From the worked example |
|---|---|---|
| `01-vocabulary.md` | 8–10 target words: part of speech, a definition at the pupils' level, **and the sentence where the word appears in the text**; then 5 practice items with an answer key | `**harbour** · n. · a sheltered area of water next to land where ships and boats can stay safely.` *Sentence:* "Every day, thousands of people cross Victoria Harbour…" |
| `02-comprehension.md` | 8 questions in three bands — 4 literal, 3 inferential, 1 personal response — with an answer key (the personal one marked "open") | Literal: "In what year did the Star Ferry begin carrying passengers?" · Inferential: "Why were people in 1898 more dependent on the ferry than commuters are today?" |
| `03-cloze.md` | The text with 10 numbered gaps, a word bank, and an answer key. Gaps are chosen so the word can be recovered from context or grammar | |
| `04-quiz.html` | An 8-question multiple-choice quiz as one HTML file. **Double-click it: it runs in a browser, one question at a time, and marks itself.** No server, no account, no internet needed | |
| `00-teacher-notes.md` | The level it aimed at and why, a **40-minute lesson flow as a timed table** naming which file to use in each phase, one differentiation tip for weaker and one for stronger pupils, and a "check before use" list | "00–10 min · Pre-reading & Vocabulary · … · `01-vocabulary.md`" |

One run, in full:

```
/lesson-pack samples/star-ferry.txt KS3

output/star-ferry/
├── 00-teacher-notes.md
├── 01-vocabulary.md
├── 02-comprehension.md
├── 03-cloze.md
└── 04-quiz.html
```

`example-output/` in this folder holds two complete packs — one English, one Chinese — so you can see the real thing before installing anything.

## Why this rather than asking a chatbot

1. **It hands you files, not a conversation.** A folder you can print, upload to Moodle, or give to a colleague — not five things to copy out of a chat window and reformat.
2. **It follows the same recipe every time.** Twenty texts across a term come out in the same format, the same question mix, the same level conventions. A chat window cannot promise that, because your prompt is a little different each time.
3. **It checks its own work.** Step 8 of the recipe makes it re-read the quiz and the comprehension answers against the source text and fix anything the text does not support.
4. **Your house style lives in a file you own.** Language and level conventions in `AGENTS.md`, the teaching recipe in `.opencode/commands/lesson-pack.md`. Edit a sentence there and every future pack changes — that is the whole demonstration: the prompt *is* the program.

## What it cannot do

- **It has never met your class.** The level is its guess; vocabulary load and cultural references still need your eyes.
- **It invents specifics.** In the English example, one answer says "MTR trains" where the text only says "tunnels and trains". Check every answer key.
- **It is a small free model.** The cloze and the quiz are usually the weakest parts — the quiz leans on literal recall unless you push it in the recipe.
- **Markdown and one HTML file only.** No Word, no PowerPoint, no images, no audio.
- **Not for pupils' own writing** (personal data), and textbook passages usually may not be sent to an external service.

**Tool used:** an AI CLI agent plus plain-text files, no code at all: the standing rules (`AGENTS.md`, with a byte-identical copy in `GEMINI.md` for the other CLI), the recipe that becomes the `/lesson-pack` command (`.opencode/commands/lesson-pack.md`, with the identical recipe in `.agents/skills/lesson-pack/SKILL.md` for agy — only the first line differs, because the two CLIs receive the arguments differently), and one line of model setting in `opencode.json`. Five files, all readable.

**Why this design:** this is what an "agent" is in practice — a model + rules + a repeatable multi-step procedure + permission to write files. You can read every rule it follows and change it in a text editor. The folder works with **two CLIs** — the same rules, two file locations:

| CLI | Rules file | Command file | Default model |
|---|---|---|---|
| **OpenCode** (course default) | `AGENTS.md` | `.opencode/commands/lesson-pack.md` | `opencode/big-pickle` (free, set in `opencode.json`) |
| Antigravity CLI (`agy`, if available in your region) | `GEMINI.md` | `.agents/skills/lesson-pack/SKILL.md` | your signed-in model |

> **Just want to run it?** Download [`lesson-pack-agent.zip`](https://github.com/chinhsi/ailt9004-ai-prototypes/raw/main/03-lesson-pack-agent/lesson-pack-agent.zip) (just this folder, 40 KB) and follow [`RUN-IT-YOURSELF.md`](RUN-IT-YOURSELF.md), which is inside it.

## Try it (5 minutes)

1. Install OpenCode and connect its free Zen models. Course students: *Getting Started with AI Command-Line Tools* on Moodle. Everyone else: install from <https://opencode.ai> (Mac/Linux `curl -fsSL https://opencode.ai/install | bash`; Windows: see their site), then run `opencode auth login` and choose **Zen** — free, no credit card, and reachable from Hong Kong without a VPN.
2. Download this folder and open a terminal inside it:
   - Mac: right-click the folder → **New Terminal at Folder** (or `cd` into it)
   - Windows: type `cmd` in the folder's address bar
3. Run `opencode`.
4. Type: `/lesson-pack samples/star-ferry.txt KS3` (or `samples/cha-chaan-teng.txt` for a Chinese pack).
5. Open `output/star-ferry/` — five files. Double-click `04-quiz.html` to try the quiz.

One-line version (no chat):

```
opencode run "/lesson-pack samples/star-ferry.txt KS3"
```

Antigravity CLI users: run `agy` in the folder and type the same `/lesson-pack …` command (headless: `agy -p "/lesson-pack samples/star-ferry.txt KS3" --add-dir . --mode accept-edits`).

## Make it yours

- Put your own text in `samples/` as a plain `.txt` file — **something you may send to an external AI service**: your own writing, public-domain or openly licensed material, or a passage your school has cleared. A textbook or exam passage usually is not. Be careful with pupils' own writing: it carries personal data. Remove names, school, class number and any identifying detail first, make sure you are allowed to use it, and the agent will work with the anonymised text — the rules file tells it to check with you if a text looks like identifiable pupil work.
- **Edit the recipe — this is the exercise.** Open `.opencode/commands/lesson-pack.md`: steps 1–9 *are* the lesson design. Safe first edits: step 4, change `4 literal questions, 3 inferential questions` to your own mix; step 6, change `8 questions` to 5; step 3, add "and a Cantonese gloss for each word"; step 7, change the 40-minute flow to your period length. Run it again on the same text and put the two packs side by side — that difference is the whole point.
- If you also use agy, copy your change into `.agents/skills/lesson-pack/SKILL.md`: the two files hold the same recipe for two CLIs, and nothing keeps them in sync but you.
- Edit `AGENTS.md` to change the house style or the level system (copy the change into `GEMINI.md` too).
- Change the model in `opencode.json` — type `/models` inside OpenCode to see what is free today.

## When it goes wrong

| What you see | What it means | What to do |
|---|---|---|
| `opencode: command not found` | OpenCode is not installed, or the terminal was open before you installed it | Close the terminal, open a new one, try again; if it persists, reinstall from <https://opencode.ai> |
| `/lesson-pack` is not offered | You are not in this folder | The terminal must be *inside* the downloaded folder — check with `ls` (Mac) or `dir` (Windows): you should see `AGENTS.md` and `samples/` |
| "file not found" | Wrong path, or spaces in the file name | Put the path in quotes: `/lesson-pack "samples/my reading text.txt" KS3` |
| Rate-limit / quota message, or the agent stops after two or three files | The free model's daily allowance is gone, or the model is busy | Wait, or type `/models` inside OpenCode and pick another free model, then edit `opencode.json`. Re-run the command: it overwrites the half-finished pack |
| The model in `opencode.json` is rejected | Free model names change without notice | `/models` → choose one that is there today → edit the `model` line in `opencode.json` |
| A file is empty or missing | The agent stopped early — usually the free quota, a busy model, or a long source text that made the HTML run out of room | Read what the agent said before it stopped; it is told to name the file it could not finish. Run the command again (it overwrites). If the same file keeps failing, switch model with `/models`, or try a shorter text |

## Check before use

The agent cannot know your class. Always read `00-teacher-notes.md` "check before use", verify the answer keys, and look for invented facts.

`example-output/` shows what one run produced on 10 Sep 2026 with Gemini 3.8 Flash via Antigravity (English and Chinese). Your run will differ — that is a discussion point, not a bug.

Read the examples critically; they are a demonstration, not classroom-ready material. In the English pack, one inferential answer says "MTR trains" where the source text only says "tunnels and trains" — a small invented specific, and exactly the kind of thing the "check before use" list is for. In the Chinese pack, one practice sentence and one part-of-speech label would need a teacher's edit before class.
