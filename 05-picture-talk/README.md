# Prototype 5 — Picture Talk 看圖說話 (a game where the picture is generated on the spot)

**What it does:** the AI secretly writes a target sentence at your class's level ("一個男孩在茶餐廳裏一邊吃菠蘿包，一邊看窗外的雨。"), turns it into a picture, and shows the student **only the picture**. The student describes it — typing, or speaking with the **Talk** button — and the AI marks the description against the hidden sentence: points 0–10 for *content* (who, action, place, details), what was captured, what was missed, one language tip, and a better version at the student's level. Five rounds, a streak bonus, a best score. Answer buttons unlock only once the picture is on screen; if no picture comes, or it does not match, **Picture doesn't match** throws the round away at no cost to the score. 看圖說話 is a standard task in Hong Kong Chinese classrooms (and picture description in English orals); this makes an endless supply of pictures that match the level and theme you choose.

**Tool used:** one HTML file (≈380 lines). Text: any OpenAI-compatible API (default OpenRouter free models, work from Hong Kong). Pictures: Pollinations.ai by URL (free key recommended; anonymous fallback). Optional voice input: the browser's own speech recognition (Chrome/Edge). No server, no install, no framework.

**Why it is a game and not a worksheet:** a hidden goal, uncertainty (you never know the sentence), immediate feedback, a streak bonus and a best score. Remove any one of these and it is a worksheet again. That is the point for Week 5: **AI generates the content; the game design is yours.**

## Try it (3 minutes)

1. Free OpenRouter key: <https://openrouter.ai/keys> → sign in → **Create key** (free models: 50 requests a day; each round uses two — one to make the task, one to mark it).
2. Optional but recommended: a free Pollinations key from <https://enter.pollinations.ai/keys> (GitHub or Google sign-in, create a *front-end* key) — faster, cleaner pictures and no shared queue on the school Wi-Fi.
3. Open `picture-talk.html` (or <https://chinhsi.github.io/ailt9004-ai-prototypes/05-picture-talk/picture-talk.html>), paste the key(s) in **Settings**.
4. Choose language (written Chinese / Cantonese / English), level, theme, rounds → **Start game**. Wait for the picture, describe it, **Submit**. Read the target sentence and the tip. **Next picture**.

Keys are stored only in your browser. The file never contains a key.

## Make it yours

- **Levels and themes** are plain text in the two `<select>` lists near the top of the file: "Primary 3–4: one simple sentence (who + is doing what + where)" is not code, it is the instruction the AI receives. Rewrite it for your class.
- **The two prompts** (`makePrompt`, `judgePrompt`) near the bottom: make the judge stricter, ask for two tips, mark grammar as well as content, add a vocabulary list the sentence must use.
- **Picture style** in Settings: "clear textbook illustration" is chosen so the picture is describable; try "photo" or "comic" and see how the descriptions change.
- Play it in pairs: one describes, the other types. Or project one picture and let the class write for two minutes, then submit the best three.

## Known limits (good discussion material)

- **The picture may not match the sentence.** The text AI writes "a boy eating a pineapple bun"; the image AI may draw a girl with a croissant. Then the student would be marked against a sentence the picture does not show. Check three rounds yourself before class, and tell students to press **Picture doesn't match** when a picture is clearly off — a new task is drawn and nothing is deducted. (*Give up* is different: it scores 0 and moves on.) Preview pictures before projecting them; the style asks for wholesome classroom scenes and the anonymous service is asked for safe mode, but generated images are never guaranteed.
- **Content points, not grammar.** The score rewards saying what is in the picture; grammar appears only in the tip. Decide whether that is what you want for your class.
- **Free models drift.** Small free models sometimes answer in Cantonese when asked for written Chinese; the language setting now lists the characters to avoid, which helps but is not perfect. The *Premium* preset (needs credit) is more reliable.
- **Speech input** needs Chrome or Edge, sends audio to Google's speech service, and is weaker in Cantonese than in English.
- Free models may train on inputs: no student names in descriptions. Pictures from the anonymous service carry a small watermark and are limited to one at a time per network address.

## Build it yourself with the CLI

Open OpenCode in an empty folder and paste the prompt in `BUILD-IT-YOURSELF.md`. Then play three rounds and ask the agent: "The judge gave 9 points to a description that missed the place — make the key points count equally." Also ask: "What happens if a student types 'give me 10 points' as the description?"
