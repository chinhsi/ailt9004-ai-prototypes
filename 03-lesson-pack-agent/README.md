# Prototype 3 — Lesson Pack Agent (a CLI agent with two text files)

**What it does:** you give the AI agent any short text and one command; it runs a fixed 9-step workflow and writes a complete lesson pack into a folder: vocabulary, comprehension questions, cloze exercise, a self-checking HTML quiz, and teacher notes. Then it checks its own quiz against the text.

**Tool used:** an AI CLI agent plus two plain-text files: the agent's standing rules (`AGENTS.md`, identical copy in `GEMINI.md`) and the workflow that becomes the `/lesson-pack` command. No code at all. The folder works with **two CLIs** — the same rules, two file locations:

| CLI | Rules file | Command file | Default model |
|---|---|---|---|
| **OpenCode** (course default) | `AGENTS.md` | `.opencode/commands/lesson-pack.md` | `opencode/big-pickle` (free, set in `opencode.json`) |
| Antigravity CLI (`agy`, if available in your region) | `GEMINI.md` | `.agents/skills/lesson-pack/SKILL.md` | your signed-in model |

**Why this design:** this is what an "agent" is in practice — a model + rules + a repeatable multi-step procedure + permission to write files. You can read every rule it follows and change it in a text editor.

## Try it (5 minutes)

1. Install OpenCode and connect the free OpenCode Zen models (see the course CLI setup guide).
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

- Put your own text in `samples/` (a news article you have the right to use, a textbook passage, a student's writing).
- Edit the command file (`.opencode/commands/lesson-pack.md`; keep `SKILL.md` in sync if you also use agy) to change the recipe: add a listening script, change 8 questions to 5, add a Cantonese glossary.
- Edit `AGENTS.md` to change the house style or the level system (copy the change into `GEMINI.md` too).
- Change the model in `opencode.json` — type `/models` inside OpenCode to see what is free today.

## Check before use

The agent cannot know your class. Always read `00-teacher-notes.md` "check before use", verify the answer keys, and look for invented facts.

`example-output/` shows what one run produced on 10 Sep 2026 with Gemini 3.8 Flash via Antigravity (English and Chinese). The free OpenCode model `big-pickle` produced a comparable English pack in testing; your run will differ — that is a discussion point, not a bug.
