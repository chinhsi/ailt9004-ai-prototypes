# Build Picture Talk yourself — prompt for OpenCode

Open a terminal in an empty folder, run `opencode`, and paste:

```
Create a single self-contained file picture-talk.html: a 看圖說話 (picture description) game for language learners in Hong Kong.

Requirements:
- Settings panel: API key (password field, saved in localStorage), base URL (default https://openrouter.ai/api/v1), comma-separated model list (default "inclusionai/ling-3.0-flash-fin:free, nvidia/nemotron-3-super-120b-a12b:free"), optional Pollinations key, picture style text.
- Setup: language (written Chinese / Cantonese / English), level (4 options written as plain instructions, e.g. "Primary 3–4: one simple sentence (who + is doing what + where)"), theme (6 Hong Kong everyday themes), number of rounds.
- Each round: call {baseUrl}/chat/completions (OpenAI-compatible, Bearer key) with a system prompt asking for JSON {target, keyPoints[], imagePrompt}: a hidden target sentence at that level and theme, 3–5 key content points, and an English image prompt that shows exactly the target and nothing contradicting it, no text in the image.
- Show ONLY the picture: img src = https://image.pollinations.ai/prompt/{URL-encoded style + imagePrompt}?width=768&height=512&seed=N (if a Pollinations key is given, fetch https://gen.pollinations.ai/image/... with Authorization: Bearer and show the blob). Space anonymous requests 15 s apart.
- The student types a description (textarea) or uses the browser's SpeechRecognition (Chrome/Edge; Cantonese code yue-Hant-HK) with a Talk button. Submit sends a second request: system prompt = a kind, precise teacher marking CONTENT only 0–10 against the hidden target and key points (grammar goes in the tip), returning JSON {points, got, missed, tip, better}.
- Show points, the target sentence, what was captured, what was missed, one tip, a better version. Skip = 0 points. Streak bonus: +2 after every three rounds scoring 7 or more. End screen: total, best score in localStorage, a table of all targets vs what the student wrote, a Copy button.
- Parse JSON leniently (strip code fences); on 429/502/503 wait 1.5 s, retry once, then try the next model. Plain CSS, no libraries, works from file://.
Keep it under 350 lines and comment the two prompts clearly — the teacher will edit them.
```

Then play three rounds. Ask the agent to fix what you notice ("the picture shows two people but the target says one — tell the image prompt to state the number of people"). Finally ask: "What would I change to mark grammar as well as content?"
