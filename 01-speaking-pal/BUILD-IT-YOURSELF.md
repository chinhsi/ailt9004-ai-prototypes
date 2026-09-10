# Build Speaking Pal yourself — prompt for OpenCode

Open a terminal in an empty folder, run `opencode`, and paste:

```
Create a single self-contained file speaking-pal.html: a voice conversation partner for language learners in Hong Kong.

Requirements:
- Settings panel: API key (password field, saved in localStorage), base URL (default https://openrouter.ai/api/v1), practice language (English en-US, Putonghua zh-CN, Cantonese zh-HK), learner level (3 options), free-text scenario, model name (default "nvidia/nemotron-3-super-120b-a12b:free").
- A "Talk" button using the browser's SpeechRecognition (webkitSpeechRecognition fallback) in the chosen language; also a text box for typing.
- Send the conversation history to {baseUrl}/chat/completions (OpenAI-compatible, Bearer key) with a system message that keeps the AI in character, in the target language, 1–3 short sentences, always ending with a question.
- Ask for a JSON object {"reply": string, "tip": string} and parse it leniently (strip code fences). The reply is the in-character message; the tip is ONE short encouraging language tip (or praise) shown in small text under the reply.
- Read replies aloud with speechSynthesis in the chosen language (checkbox to turn off).
- If the API returns 429 or 503, wait 1.5 s and retry once, then try the next model in a comma-separated list.
- Plain CSS, no external libraries, works from file://. Show errors in the chat area.
Keep it under 250 lines and comment the main functions.
```

Then test it. Ask the agent to fix anything that does not work ("the Talk button does nothing in Safari — show a message instead"). Finally ask: "Explain to me, line by line, what buildSystemPrompt does."
