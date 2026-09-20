# Prototype 2 — AI Essay Grader (Google Sheets + Apps Script)

**What it does:** you paste student essays into a Google Sheet, click a menu, and an AI model scores each essay against *your* rubric, writes 3-bullet feedback for the student, and flags anything a human must check. Nothing to install — it runs inside Google Sheets.

**Tool used:** Google Sheets + Google Apps Script (a built-in JavaScript editor) + a free AI API (OpenRouter by default; any OpenAI-compatible endpoint works).

**Why this design:** teachers already live in spreadsheets. The rubric is a plain-text cell you control, and every score comes with a reason — so the tool *drafts*, and the teacher *decides*.

## Try it (10 minutes)

1. Get a free OpenRouter key: <https://openrouter.ai/keys> → sign in with Google or GitHub → **Create key** → copy it (free models: 50 requests a day, no card).
2. Create a new Google Sheet (sheets.new).
3. **Extensions → Apps Script**. Delete the default code, paste the whole of `Code.gs`, press **Save** (disk icon).
4. Go back to the sheet and **reload the page**. A new menu **AI Grader** appears (Google will ask you to authorise the script the first time — choose your account → Advanced → Go to project → Allow).
5. **AI Grader → 1. Set API key** → paste your key.
6. **AI Grader → 2. Create sample sheets** → you get an `Essays` sheet with 3 sample essays (2 English, 1 Chinese) and a `Rubric` sheet.
7. On `Essays`, select rows 2–4 → **AI Grader → Grade selected rows**. Wait ~30 seconds (there is a short pause between essays to be polite to the free tier).
8. Read columns C–F. Then edit the rubric on the `Rubric` sheet, clear columns C–G, and grade again — watch the scores move.

## Make it yours

- Replace the rubric text with your own (one criterion per row). The AI only uses criteria that are in the rubric.
- Change the feedback language or length in the `system` text inside `gradeEssay()`.
- `BASE_URL` and `MODELS` at the top of the file pick the provider and models; any `:free` model on OpenRouter works, and a school could point `BASE_URL` at its own approved server.

## Ethics checklist (Week 2 applies here!)

- Use **pseudonyms** (S01, S02…) in column A — never real names, class numbers or photos.
- Free models may use your prompts for training. For real student work, use a paid key or an approved school platform (change `BASE_URL`).
- AI scores are a **first draft**. Read every one before it reaches a student; keep the "Note for teacher" column in your workflow.

## Build it yourself with the CLI

Open OpenCode in an empty folder and paste the prompt in `BUILD-IT-YOURSELF.md`. Compare what the agent produces with this version.
