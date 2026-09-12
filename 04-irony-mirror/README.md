# Prototype 4 — Irony Mirror 反諷鏡 (one HTML file that also makes pictures)

**What it does:** type one word or value — 孝順, honesty, 環保, punctuality — and the page shows its **two faces**: Face A, the value done sincerely; Face B, the irony, where what people *say* and what they *do* don't match. Each face gets a caption, a picture, and the page names the **gap** (verbal / situational / dramatic irony), asks three discussion questions, gives one model sentence, and leaves a box for the student to write their own ironic sentence. A **Game** tab turns it into *Spot the irony*: pairs pick the ironic picture and write the gap in one sentence. A **Teacher** tab shows the prompt that does all of this — that prompt *is* the lesson plan.

**Where it comes from:** Prof. Lin's earlier web app *Chinnovation* had a 漢語新解 ("new take on a Chinese word") feature: a word went to a server, a workflow called an image service, and a satirical card came back minutes later. In 2025 that needed a login system, a database, credits and a third-party automation. In 2026 the same idea fits in **one HTML file** because (a) any OpenAI-compatible text API can write the irony and the image prompts, and (b) an image model can be called with **a plain URL** — no server in between. The card itself is drawn by the browser (SVG), so it costs nothing and never fails.

**Tool used:** one HTML file (≈530 lines). Text: any OpenAI-compatible API, by default OpenRouter's free models (work from Hong Kong). Pictures: [Pollinations.ai](https://pollinations.ai), an image service addressed by URL — the picture *is* a URL. With a free Pollinations key (sign up with GitHub or Google at <https://enter.pollinations.ai>) you get a weekly allowance that covers hundreds of small pictures on open models such as `zimage` and `flux`, no watermark, and even GPT-Image-2.5 if you buy credit; without a key, or if the key is rejected, the page falls back to the old anonymous endpoint (watermark, one picture at a time per network) and tells you. No server, no install, no framework.

## Try it (3 minutes)

1. Get a free OpenRouter key: <https://openrouter.ai/keys> → sign in with Google or GitHub → **Create key** → copy it (free models: 50 requests a day, no card).
2. Open `irony-mirror.html` in any modern browser (or the hosted copy: <https://chinhsi.github.io/ailt9004-ai-prototypes/04-irony-mirror/irony-mirror.html>).
3. Paste the key in **Settings**. Choose the output language (written Chinese, Cantonese, or English) and the learner level. Optional but recommended: a free Pollinations key (<https://enter.pollinations.ai/keys> → create a *front-end / publishable* key) in the *Pollinations key* box — pictures then come faster, cleaner and without a shared queue.
4. Click a word chip (孝順 …) or type your own and press **Mirror it**. Text arrives in a few seconds; pictures take 15–45 seconds each (the free image service serves anonymous users one picture at a time).
5. Read Face A and Face B before reading the captions. Then read *The gap*. Then write.

The key is saved only inside your browser (localStorage). The file itself never contains a key.

## Make it yours

- **Teacher tab** → edit the prompt. Gentler tone for Primary? Five questions instead of three? Only situational irony? Change the text, press *Save*, mirror a word again.
- **Settings → Picture style**: swap "warm watercolor illustration" for "editorial cartoon" or "Hong Kong comic style". The style is appended to every image prompt.
- **Game words**: paste your own list, e.g. the values in this term's Chinese reader, or English character traits for an English class.
- **Pictures off**: set *Image provider* to *No pictures* and use the SVG card only — that is the 2025 experience, and a good "before/after" for students.
- **Your own image server**: *Image provider → OpenAI-compatible* takes any `/images/generations` endpoint (a school server, or a provider your account can use).

## Known limits (good discussion material)

- **The image model does not understand irony.** The text model writes a scene with a clear visual contradiction, but the free image model often draws two people smiling. Ask students: *is Face B actually ironic? What would you change in the prompt?* Press *New picture* (new seed) or *Copy prompt* and paste into a stronger image tool. The gap between what the text AI *wrote* and what the image AI *drew* is itself a lesson about AI.
- **Free picture service, public prompts.** Without a key, Pollinations serves one picture at a time per network address (a whole classroom on the school Wi-Fi shares that queue), adds a small watermark, and prompts may appear in its public feed. A free key removes the queue and the watermark. Either way, never put a real person's name or a student's details into a word.
- **Irony can hurt.** The prompt asks for *sharp but kind* lines that mock behaviours, never people or groups, and bans stereotypes (ethnic, national, religious, gender, sexuality, disability, body, class) and jokes about death, grief, illness, poverty, family break-up or academic failure. A *Teacher note* appears at the top of the result when a word may still be sensitive. Read the line before you project it. You are the editor — the model is a free one and will sometimes cross the line anyway.
- Free text models may use your prompts for training; free models are weaker in Cantonese than in written Chinese or English. Choose the *Premium* preset if you have credit.
- Hong Kong reachability of Pollinations has not yet been tested from the HKU network without a VPN (OpenRouter has). If pictures never load on campus, use *Copy prompt* → the Gemini app (free in Hong Kong since March 2026).

## Build it yourself with the CLI

Open OpenCode in an empty folder and paste the prompt in `BUILD-IT-YOURSELF.md`. Then compare: did the agent's version name the irony type? Did it remember the rate limit? Did it think about who gets mocked?
