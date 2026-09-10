# Prototype 1 — Speaking Pal (one HTML file)

**What it does:** a voice conversation partner. Choose a language (English, Putonghua or Cantonese), a level and a scenario; press **Talk** and speak. Pal replies in character (voice + text) and keeps the conversation going. Language mistakes are not corrected mid-conversation; instead a one-line **Tip** appears under each reply, so fluency practice is not interrupted.

**Tool used:** one plain HTML file (≈200 lines) that runs in the browser. Speech-to-text and text-to-speech come free with Chrome/Edge (Web Speech API); the "brain" is any OpenAI-compatible AI API — by default OpenRouter's free models, which work from Hong Kong. No server, no install, no framework.

**Why this design:** it is the smallest thing that is still a real speaking tool. Everything a teacher would want to change — persona, level, scenario, correction policy — is in one `buildSystemPrompt()` text block near the bottom of the file.

## Try it (3 minutes)

1. Get a free OpenRouter key: <https://openrouter.ai/keys> → sign in with Google or GitHub → **Create key** → copy it (free models: 50 requests a day, no card).
2. Double-click `speaking-pal.html` to open it in **Chrome or Edge** (Safari has no speech recognition).
3. Paste the key, pick a language and level, choose a scenario preset (cha chaan teng, directions at Central MTR, job interview, hotel check-in in London, clinic appointment, shop complaint…) or type your own, then press **Start conversation**.
4. Press **Talk**, speak, and wait. Or type in the box if you have no microphone.

The key is saved only inside your browser (localStorage). Do not upload the file anywhere with a key typed into it — the file itself never contains the key.

## Make it yours

Open the file in any text editor (Notepad, TextEdit, VS Code) and change:

- the scenario presets (`id="scenarioPreset"`) or the default (`id="scenario"`),
- the level labels (`id="level"`),
- the persona and correction rules in `buildSystemPrompt()` — e.g. "correct every mistake immediately" for an accuracy-focused version, or "you are a job interviewer" for a Secondary 6 mock interview,
- `temperature` (0.8 = lively; 0.3 = predictable),
- the model list in Settings — any `:free` model on OpenRouter, or switch Provider to *Custom* and point it at another OpenAI-compatible endpoint (a school server, a paid provider, a local model).

Reload the page after saving.

## Known limits (good discussion material)

- Speech recognition is done by the browser (Chrome/Edge send audio to Google's speech service; Safari has none). Cantonese (`yue-Hant-HK`, Google's code for spoken Cantonese; `zh-HK` gives worse results) is noticeably weaker than English: speak one clear sentence after the button turns red, then pause. The box shows what it heard, and the chat prints "Heard: …" so you can judge. Reflect: whose accents does it hear well? (Week 2, Case 3.)
- If the mic never starts, check the address bar for a blocked-microphone icon and allow it; a page opened from a file (file://) asks every time.
- Text-to-speech voices come from your browser/computer, and quality varies a lot. Settings → **Voice** lists what you have; the page auto-picks the best. Most natural Cantonese: **Microsoft Edge** ("HiuGaai/HiuMaan/WanLung Online (Natural)"), then a "Google 粤語" voice in Chrome. On a Mac the built-in *Sinji* voice sounds robotic — install its Premium version in System Settings → Accessibility → Spoken Content → System Voice → Manage Voices → 中文（香港）.
- Free models may use your prompts for training. Do not put student names or personal details in the conversation.
- If the first model is busy or rate-limited (HTTP 429/503) the page silently retries and then falls back to the next model in the list.
- Free open models are weaker than the big commercial ones at Cantonese. `google/gemma-4-31b-it:free` is better at Cantonese but often rate-limited; add it at the front of the model list when you want to try it. Avoid `openrouter/free` (auto-router): it can route to a safety-classifier model.

## Build it yourself with the CLI

Open OpenCode in an empty folder and paste the prompt in `BUILD-IT-YOURSELF.md`. Compare the agent's version with this one: what did it add, what did it miss?
