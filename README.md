# AILT9004 — AI prototypes for language teaching

Small, working examples of AI tools for language classrooms, built for the HKU course *AILT9004 Interactive AI Applications in Language Teaching and Learning* (Prof. Chin-Hsi Lin). They are minimum viable prototypes: run them, read them, change them, rebuild them.

Everything here works from **Hong Kong without a VPN** and uses **free** services. No programming background is assumed.

| # | Prototype | What it is | Built with | Status |
|---|---|---|---|---|
| 1 | [**Speaking Pal**](01-speaking-pal/) | Voice conversation partner (English / Putonghua / Cantonese) with gentle tips | One HTML file + browser speech + OpenRouter free models | ✅ [play](https://chinhsi.github.io/ailt9004-ai-prototypes/01-speaking-pal/speaking-pal.html) |
| 2 | Essay Grader | Rubric-based scoring and feedback inside Google Sheets | Google Sheets + Apps Script + OpenRouter | coming |
| 3 | Lesson Pack Agent | One command turns any text into a 5-file lesson pack | OpenCode CLI + two plain-text rule files | coming |
| 4 | [**Irony Mirror 反諷鏡**](04-irony-mirror/) | One word, two faces: sincere vs ironic, with captions, pictures, a discussion scaffold and a *Spot the irony* game | One HTML file + OpenRouter free models + a free image URL service (Pollinations) | ✅ [play](https://chinhsi.github.io/ailt9004-ai-prototypes/04-irony-mirror/irony-mirror.html) |
| 5 | [**Picture Talk 看圖說話**](05-picture-talk/) | A game: the AI hides a sentence, draws it, you describe the picture, the AI marks content and gives one tip; streaks and best score | One HTML file + OpenRouter free models + Pollinations + browser speech (optional) | ✅ [play](https://chinhsi.github.io/ailt9004-ai-prototypes/05-picture-talk/picture-talk.html) |
| 6 | [**认字乐园 Hanzi Game**](06-hanzi-game/) | Phone-first Chinese character game: six question types, spaced repetition (five boxes), real recorded voice, parent page — built by a coding assistant from a one-page teacher note | Vite + TypeScript + tests (source private; brief, build story and live game here) | ✅ [play](https://chinhsi.github.io/hanzi-game-pages/) |
| 7 | [**字靈冒險 Hanzi Quest**](07-hanzi-quest/) | Chinese word battles: rotating listening/pinyin questions, whole-word audio, skills, monster rewards and character levels; browser-local progress | Static HTML/CSS/JavaScript + packaged audio; no key or live AI service | ✅ [play](https://chinhsi.github.io/ailt9004-ai-prototypes/07-hanzi-quest/) |
| 8 | [**PIRLS Question Generator 閱讀理解出題器**](08-pirls-questions/) | Paste a reading passage, get a question set built to the four PIRLS comprehension processes: marks, answer keys, scoring guides, two teacher lines per item (why this process, why *not* the neighbouring one), a coverage panel, and printable student sheet / answer key. A second tab tells you what questions *you* wrote actually measure | One HTML file + OpenRouter free models; interface in English or 繁體中文 | ✅ [open](https://chinhsi.github.io/ailt9004-ai-prototypes/08-pirls-questions/pirls-questions.html) |

## Try Irony Mirror now (no download)

**Open <https://chinhsi.github.io/ailt9004-ai-prototypes/04-irony-mirror/irony-mirror.html>**, paste your OpenRouter key in Settings, click a word. Pictures come from a free public image service and take 15–45 s each. Details, limits and classroom use: [04-irony-mirror/README.md](04-irony-mirror/README.md).

**Picture Talk:** <https://chinhsi.github.io/ailt9004-ai-prototypes/05-picture-talk/picture-talk.html> — same keys; choose language, level and theme, press Start. [05-picture-talk/README.md](05-picture-talk/README.md).

**Hanzi Game:** <https://chinhsi.github.io/hanzi-game-pages/> — no key needed; read [06-hanzi-game/README.md](06-hanzi-game/README.md) for the brief that built it.

## For teachers writing a reading test

**PIRLS Question Generator:** <https://chinhsi.github.io/ailt9004-ai-prototypes/08-pirls-questions/pirls-questions.html> — paste a passage (or load one of the four samples), paste your free OpenRouter key in Settings, and generate a whole question set to the PIRLS 2021 design. Read the coverage panel before the items: it counts the labels *the model gave its own items*, it does not verify them. Shared with MEDD8934 Week 4. [08-pirls-questions/README.md](08-pirls-questions/README.md).

## Try Speaking Pal now (no download)

**Open <https://chinhsi.github.io/ailt9004-ai-prototypes/01-speaking-pal/speaking-pal.html> in Chrome or Edge.**

You need one free key: go to <https://openrouter.ai/keys>, sign in with Google or GitHub, click *Create key*, copy it, and paste it into the page's Settings. The key stays in your own browser. Details and classroom notes: [01-speaking-pal/README.md](01-speaking-pal/README.md).

## Using an AI assistant to set things up

If you ask an AI assistant (OpenCode, ChatGPT, Claude, Gemini, Copilot…) to help you install or modify these prototypes, point it at [`AGENTS.md`](AGENTS.md). It tells the assistant exactly what to install on your computer, what not to install, and how to check that everything works.

## Safety and ethics

- Never paste real student names, class numbers, photos or grades into any of these tools. Free models may use inputs for training.
- Keys are passwords: never commit them, share them, or upload a file containing them. Nothing in this repository contains a key.
- Every output is a draft. The teacher decides.

## License

MIT — reuse and adapt freely; attribution appreciated.
