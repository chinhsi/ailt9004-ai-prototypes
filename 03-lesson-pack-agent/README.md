# Prototype 3 — Lesson Pack Agent (a CLI agent with two text files)

**What it does:** you give the AI agent any short text and one command; it runs a fixed 9-step workflow and writes a complete lesson pack into a folder: vocabulary, comprehension questions, cloze exercise, a self-checking HTML quiz, and teacher notes. Then it checks its own quiz against the text.

**Tool used:** an AI CLI agent plus plain-text files, no code at all: the standing rules (`AGENTS.md`, with a byte-identical copy in `GEMINI.md` for the other CLI), the recipe that becomes the `/lesson-pack` command (`.opencode/commands/lesson-pack.md`, and the same recipe as `.agents/skills/lesson-pack/SKILL.md` for agy), and one line of model setting in `opencode.json`. Five files, all readable. The folder works with **two CLIs** — the same rules, two file locations:

| CLI | Rules file | Command file | Default model |
|---|---|---|---|
| **OpenCode** (course default) | `AGENTS.md` | `.opencode/commands/lesson-pack.md` | `opencode/big-pickle` (free, set in `opencode.json`) |
| Antigravity CLI (`agy`, if available in your region) | `GEMINI.md` | `.agents/skills/lesson-pack/SKILL.md` | your signed-in model |

**Why this design:** this is what an "agent" is in practice — a model + rules + a repeatable multi-step procedure + permission to write files. You can read every rule it follows and change it in a text editor.

## Try it (5 minutes)

1. Install OpenCode and connect the free OpenCode Zen models — *Getting Started with AI Command-Line Tools* on Moodle, or <https://opencode.ai> (install, then `opencode auth login` and choose Zen).
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

- Put your own text in `samples/` as a plain `.txt` file — **something you may send to an external AI service**: your own writing, public-domain or openly licensed material, or a passage your school has cleared. A textbook or exam passage usually is not. Never use a pupil's own writing here: it carries personal data, and the rules file tells the agent to stop if it sees it.
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
| Five files, but one is empty or missing | The agent stopped early | Run the command again; if it keeps failing on the same file, shorten the source text |

## Check before use

The agent cannot know your class. Always read `00-teacher-notes.md` "check before use", verify the answer keys, and look for invented facts.

`example-output/` shows what one run produced on 10 Sep 2026 with Gemini 3.8 Flash via Antigravity (English and Chinese). Your run will differ — that is a discussion point, not a bug.

Read the examples critically; they are a demonstration, not classroom-ready material. In the English pack, one inferential answer says "MTR trains" where the source text only says "tunnels and trains" — a small invented specific, and exactly the kind of thing the "check before use" list is for. In the Chinese pack, one practice sentence and one part-of-speech label would need a teacher's edit before class.
