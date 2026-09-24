# Run the Lesson Pack Agent on your own computer

**What you get:** a folder on your laptop where one command turns any reading text into five teaching files — vocabulary, comprehension questions, a cloze, a self-marking quiz, and teacher notes.

**Time:** about 20 minutes the first time (most of it downloading), two minutes every time after that.

**Cost:** nothing. It uses OpenCode's free Zen models, which work from Hong Kong without a VPN.

---

## Before you start (once)

You need **OpenCode installed and connected to its free Zen models**. That is Steps 1–4 of *Getting Started with AI Command-Line Tools* (on Moodle). If you have already done that in class, check it still works — open a terminal and type:

```
opencode --version
```

A version number (for example `1.18.31`) means you are ready. `command not found` does **not** always mean it is missing: see *Mac: fix `command not found`* in the troubleshooting section of that guide before reinstalling anything.

---

## Step 1 — Download the folder

**Click this one link:**
<https://github.com/chinhsi/ailt9004-ai-prototypes/raw/main/03-lesson-pack-agent/lesson-pack-agent.zip>

It downloads a single 40 KB file, `lesson-pack-agent.zip`. Unzip it (double-click on Mac; right-click → *Extract All* on Windows) and drag the resulting **`lesson-pack-agent`** folder somewhere easy to reach, such as your **Desktop**.

That folder is the whole "program": a few text files and two sample readings. You can open every file in it with a normal text editor.

*Other ways, if you prefer:* the whole prototype collection is at <https://github.com/chinhsi/ailt9004-ai-prototypes> (green **Code** button → *Download ZIP*), or `git clone https://github.com/chinhsi/ailt9004-ai-prototypes.git`.

> The folder contains two hidden items, `.opencode` and `.agents`, which hold the recipe. They are inside the zip — you just will not see them in Finder or File Explorer unless you turn on "show hidden files" (Mac: **Cmd+Shift+.**). You do not need to see them to run the tool, only to edit the recipe in Step 6.

---

## Step 2 — Open a terminal **inside** that folder

This is the step people get wrong. The terminal must be *in* the folder, or the command in Step 3 will not exist.

**Mac**

- Right-click the `03-lesson-pack-agent` folder → **Services → New Terminal at Folder**
- If that option is missing: open Terminal, type `cd ` (with a space), then **drag the folder onto the Terminal window** and press Enter

**Windows**

- Open the `03-lesson-pack-agent` folder in File Explorer
- Click in the address bar, type `powershell`, press Enter

**Check you are in the right place.** Type `ls` (Mac) or `dir` (Windows) and press Enter. You should see `AGENTS.md`, `opencode.json` and a `samples` folder. If you do not, you are in the wrong folder — repeat this step.

---

## Step 3 — Run it

```
opencode
```

When it has started, type:

```
/lesson-pack samples/star-ferry.txt KS3
```

For the Chinese sample:

```
/lesson-pack samples/cha-chaan-teng.txt KS3
```

**If it asks permission to write files, allow it.** Writing the five files is the whole job.

It takes one to three minutes and tells you what it is doing as it goes: reading the text, choosing vocabulary, writing each file, then re-reading its own quiz to check the answers against the text.

*Prefer one line, no chat?* `opencode run "/lesson-pack samples/star-ferry.txt KS3"`

---

## Step 4 — Look at what it made

A new folder `output/star-ferry/` with five files:

| File | What it is |
|---|---|
| `00-teacher-notes.md` | level, a 40-minute lesson flow, differentiation tips, and a "check before use" list |
| `01-vocabulary.md` | 8–10 target words with definitions and five practice items |
| `02-comprehension.md` | 4 literal + 3 inferential + 1 personal-response question, with an answer key |
| `03-cloze.md` | the text with 10 gaps, a word bank and an answer key |
| `04-quiz.html` | an 8-question quiz — **double-click it** to open in your browser; it marks itself |

**Read it critically.** This is a draft written by a small free model. Check the answer keys, look for facts it invented, and decide what you would never hand to a class as it stands.

---

## Step 5 — Use your own text

1. Save your reading as a **plain `.txt` file** (in Word: *Save As* → *Plain Text*) and put it in the `samples` folder
2. Run `/lesson-pack samples/your-file.txt KS3`
3. If the file name has spaces, put the path in quotes: `/lesson-pack "samples/my reading text.txt" KS3`

**Which texts you may use:** your own writing, public-domain or openly licensed material, or a passage your school has cleared. A textbook or exam passage usually is not. Do not use a pupil's own writing unless you have removed every identifying detail and you are allowed to use it.

Texts work best between about 120 and 800 words (200–1200 Chinese characters). Outside that range the recipe tells the agent what to do — it will shorten, excerpt, or ask you for a plain-text file.

---

## Step 6 — Change the recipe (this is the point)

Open **`.opencode/commands/lesson-pack.md`** in a text editor. Steps 1–9 in that file *are* the lesson design. There is no code anywhere — change the text, and the agent teaches differently.

Safe first edits:

- **Step 4** — change `4 literal questions, 3 inferential questions, 1 personal-response question` to your own mix
- **Step 6** — change `8 questions` to 5
- **Step 3** — add "and a Cantonese gloss for each word"
- **Step 7** — change the 40-minute flow to your own period length

Run the same text again and put the two packs side by side. That difference is the thing worth discussing in class: you changed a sentence of English, not a line of code, and the teaching materials changed.

`AGENTS.md` holds the house style (language, level, file names, what the agent may and may not touch). `GEMINI.md` is an identical copy for a different CLI — if you edit one, edit both.

---

## When something goes wrong

| What you see | What it means | What to do |
|---|---|---|
| `opencode: command not found` | The terminal cannot find OpenCode | See *Mac: fix `command not found`* in the course CLI guide before reinstalling |
| `/lesson-pack` is not offered | The terminal is not inside the folder | Quit with Ctrl+C, redo Step 2, check `ls` / `dir` shows `AGENTS.md` |
| "file not found" | Wrong path, or spaces in the file name | Put the path in quotes: `/lesson-pack "samples/my text.txt" KS3` |
| Rate-limit or quota message | The free daily allowance is gone, or the model is busy | Wait, or type `/models` inside OpenCode and pick another free model, then edit the `model` line in `opencode.json` |
| The model name is rejected | Free model names change without notice | `/models` → choose one that is there today → edit `opencode.json` |
| A file is empty or missing | The agent stopped early | It is told to name the file it could not finish — read its last message. Run the command again (it overwrites), switch model, or try a shorter text |
| Chinese output is in Simplified characters | The model ignored the house style | `AGENTS.md` asks for Traditional Chinese, Hong Kong usage — say so again in your command, or switch model |

---

## Before you use any of it with a class

The agent has never met your pupils and cannot check facts. Read `00-teacher-notes.md`, verify every answer key, and look for invented specifics — in the sample English pack, one answer says "MTR trains" where the text only says "tunnels and trains". That is exactly the kind of thing you are looking for.
