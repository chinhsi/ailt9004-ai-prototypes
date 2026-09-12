# Instructions for AI assistants

You are helping a **language teacher or a teacher-education student with no programming background** set up or modify the prototypes in this repository. Read this file before doing anything. Explain each step in plain language; do not assume the user knows what a terminal, a repository or an API key is.

## What this repository is

Teaching prototypes for the HKU course AILT9004. Each numbered folder is one self-contained prototype with its own `README.md`. Currently:

- `01-speaking-pal/` — `speaking-pal.html`, a single-file voice conversation partner. Runs entirely in the browser. **Nothing needs to be installed** for it.
- `04-irony-mirror/` — `irony-mirror.html`, a single-file "two faces of a word" tool for teaching irony: text from an OpenAI-compatible API, pictures from Pollinations.ai (a free image service addressed by URL, no key). **Nothing needs to be installed** for it either.
- `05-picture-talk/` — `picture-talk.html`, a single-file 看圖說話 game: the AI writes a hidden sentence, Pollinations draws it, the student describes it, the AI marks it. Same setup as prototype 4 (OpenRouter key; optional Pollinations key); voice input is optional and needs Chrome/Edge. Nothing to install.

## Environment facts you must respect

- The user is probably in **Hong Kong**. The following do **not** work from Hong Kong accounts/networks and must not be recommended: Google Gemini API and AI Studio, Google Antigravity CLI, OpenAI / ChatGPT / Codex, Anthropic Claude, Groq, Cerebras. Do not suggest a VPN.
- Services that **do** work from Hong Kong and are free: **OpenRouter** (`https://openrouter.ai`, free models end in `:free`, 50 requests/day without credit, no credit card) and **OpenCode** with its free Zen models (`https://opencode.ai`).
- Free open models are used on purpose. Do not "upgrade" the code to a paid or region-locked provider.

## Prototype 1 — Speaking Pal: what to install

- **Nothing.** The user needs only:
  1. **Google Chrome or Microsoft Edge** (Safari and Firefox lack speech recognition). Edge has the most natural Cantonese voices.
  2. A free **OpenRouter API key** from <https://openrouter.ai/keys> (sign in with Google or GitHub → *Create key*). The user pastes it into the page's Settings; it is stored in the browser's localStorage only.
- To run: open `speaking-pal.html` by double-clicking it, or use the hosted copy at <https://chinhsi.github.io/ailt9004-ai-prototypes/01-speaking-pal/speaking-pal.html>. Optionally serve it locally with `python3 -m http.server 8000` and open `http://localhost:8000/01-speaking-pal/speaking-pal.html` (avoids the repeated microphone prompt on `file://`).
- Do **not** install Node.js, Python packages, frameworks, or a build tool for this prototype. If the user asks for a change, edit the single HTML file in place.

## How to verify it works

1. Open the page in Chrome/Edge, paste the key, press *Start conversation*. A greeting from "Pal" should appear within ~10 seconds.
2. Type a sentence in the text box and press Enter. A reply and a *Tip* line should appear.
3. Press *Talk*, allow the microphone, say one sentence. The box shows the live transcript and the chat prints `Heard: …`.
4. If a request fails with 429, the page retries and falls back to the next model in the *Model(s)* list. If all fail, change the list to other `:free` models from <https://openrouter.ai/models?q=free>. Never use the `openrouter/free` auto-router (it can route to a safety-classifier model).

## Changing the prototype

- Persona, level, scenario and correction policy live in `buildSystemPrompt()` near the bottom of `speaking-pal.html`. Change text, not architecture.
- Keep the file self-contained: no external scripts or CSS, no build step, no server. It must keep working from `file://` and from GitHub Pages.
- Keep the provider layer generic (OpenAI-compatible `/chat/completions` with a Bearer key) so a school can point `Base URL` at its own approved server.

## Security rules

- Never write an API key into any file in this repository, into a commit, or into an example. Keys go only into the page's Settings box (browser storage) or the user's own private notes.
- Never commit `output/`, logs, or anything containing personal data. Sample texts must be fictional or original.
- If you find a key in the working tree, tell the user to revoke it at the provider's website and remove it before committing.

## Prototype 4 — Irony Mirror: what to install

- **Nothing.** Same OpenRouter key as Speaking Pal, pasted into the page's Settings. Any modern browser works (no speech features needed).
- Pictures: the page builds a URL like `https://image.pollinations.ai/prompt/<encoded prompt>?width=768&height=512&seed=N` and sets it as an `<img>` source. Anonymous use is rate-limited to **one queued picture per IP address** (about one every 15 s), so the page spaces its two requests 15 s apart. In a classroom sharing one network address, pictures will queue behind each other — that is expected; tell the user to use *Copy prompt* with another image tool, or set *Image provider → No pictures* (the SVG card still works).
- Do not add a server, a proxy, a paid image provider, or an API key for pictures unless the user explicitly has one. If the user has their own OpenAI-compatible `/images/generations` endpoint, it goes into Settings (*Image provider → OpenAI-compatible*), not into the code.
- The behaviour of the tool lives in the **Teacher tab** (the system prompt, saved in localStorage) and in `DEFAULT_PROMPT` near the top of the script. Change text, not architecture.
- To verify: paste the key, click the chip 孝順, wait: two captions and *The gap* should appear within ~10 s; pictures within ~60 s. Then open *Game*, press *Start*, click a picture, press *Reveal*.

## Prototype 5 — Picture Talk: what to install

- **Nothing.** Same keys and same picture rules as prototype 4. Each round makes two text requests (make the task, judge the answer), so 50 free requests a day ≈ 25 rounds.
- The teacher edits the `<option>` texts for level and theme (they are the instruction sent to the model) and the two prompt functions `makePrompt()` / `judgePrompt()`. Keep the JSON field names.
- To verify: paste the key, press *Start game*, wait for a picture (≤60 s), type a sentence, press *Submit*: a score, the target sentence and a tip should appear. Press *Skip* once to check it scores 0 and moves on.

## Later folders (when they appear)

- `02-essay-grader/` — a Google Apps Script file; nothing to install locally. The user pastes `Code.gs` into *Extensions → Apps Script* in a Google Sheet and sets the OpenRouter key through the sheet's menu.
- `03-lesson-pack-agent/` — needs **OpenCode** (`curl -fsSL https://opencode.ai/install | bash` on Mac/Linux, `irm https://opencode.ai/install.ps1 | iex` on Windows PowerShell) and its free Zen models (`opencode auth login` → *OpenCode Zen*, key from <https://opencode.ai/auth>). It reads this repository's `AGENTS.md` and the folder's own `AGENTS.md`; run `/lesson-pack samples/<file>.txt` inside the folder.
