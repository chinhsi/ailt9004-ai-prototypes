# Build Irony Mirror yourself — prompt for OpenCode

Open a terminal in an empty folder, run `opencode`, and paste:

```
Create a single self-contained file irony-mirror.html for a language classroom in Hong Kong: the user types ONE word or value (e.g. 孝順, honesty) and the page shows its "two faces" — the value done sincerely, and the irony (what people say vs what they do).

Requirements:
- Settings panel: API key (password field, saved in localStorage), base URL (default https://openrouter.ai/api/v1), comma-separated model list (default "inclusionai/ling-3.0-flash-fin:free, nvidia/nemotron-3-super-120b-a12b:free"), output language (Traditional Chinese written / Cantonese colloquial / English), learner level, picture style text.
- Send ONE request to {baseUrl}/chat/completions (OpenAI-compatible, Bearer key) with a system prompt that asks for a JSON object: word, sincere (one-sentence meaning), ironic (one witty redefinition, max 40 characters, in the spirit of 錢鍾書 / Oscar Wilde), sceneA {caption, imagePrompt}, sceneB {caption, imagePrompt} where B is a visible contradiction between words and actions, ironyType (verbal/situational/dramatic), gap (one sentence), questions (3), modelSentence, safetyNote. Tell the model: sharp but kind; mock behaviours, never people or groups; no stereotypes (ethnic, national, religious, gender, sexuality, disability, body, class) and no jokes about death, grief, illness, poverty, family break-up or academic failure. imagePrompt must be English and say "no text in image".
- Parse the JSON leniently (strip code fences). If the API returns 429/502/503/404, wait 1.5 s and retry once, then try the next model; on 402/403 skip that model for the session. Validate the JSON fields and fill in anything missing rather than crashing.
- Show two cards side by side (Face A, Face B) with caption and picture. Pictures come from Pollinations: set the img src to https://image.pollinations.ai/prompt/{URL-encoded prompt + style}?width=768&height=512&seed=N&model=flux . Queue the two pictures 15 seconds apart because anonymous use is rate-limited. Add "New picture" (new seed) and "Copy prompt" buttons.
- Below: the gap, the irony type, the three questions, the model sentence, and a textarea where the student writes their own ironic sentence.
- Draw a simple card as inline SVG (word large, ironic line under a red rule, irony type small) and a button that downloads it as PNG via canvas.
- Add a "Game" tab: a list of words; for each word show the two pictures in random order WITHOUT labels or captions; the student clicks the ironic one (score +1), then the captions appear, the student writes the gap in one sentence, then a Reveal button shows the AI's gap. End screen with score.
- Add a "Teacher" tab with the system prompt in a textarea (editable, saved in localStorage, reset button).
- Cache the last results in localStorage so re-showing a word costs no API call.
- Plain CSS, no external libraries, works from file://. Show errors near the input.
Keep it under 600 lines and comment the main functions.
```

Then test it with 孝順 and with an English word. Ask the agent: "The second picture does not look ironic — rewrite the imagePrompt instructions so the contradiction is visible without words." Finally ask: "Who could be hurt by this tool, and what in the prompt prevents it?"
