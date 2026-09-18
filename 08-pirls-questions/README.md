# Prototype 8 — PIRLS Question Generator 閱讀理解出題器 (item writing you can argue with)

**What it does:** you paste a reading passage, choose the grade and the language, and the tool writes a whole question set to the **PIRLS 2021** design — the four comprehension processes in their official proportions (20 / 30 / 30 / 20), multiple-choice and constructed-response items mixed as PIRLS mixes them, marks, answer keys, scoring guides (full / partial / no credit), and for every item one line saying **why it belongs to that process**. A coverage panel shows what you actually got against what you asked for, so a set that quietly collapsed into ten retrieval questions is visible in one glance. Two print buttons give you a **student sheet** (title, name line, total marks, passage, questions, answer lines — no answers, no process labels) and an **answer key** (everything, passage removed).

The second tab, **Check my own question**, is the reverse move: paste questions *you* wrote, and the tool says which process each one really measures (not the one you hoped for), whether a reader could answer it from this passage at all, what is wrong with it, a repaired version, and a version one process higher. Interface and questions both work in **English, 繁體中文 and 简体中文**; the 中/English button in the header switches the whole interface.

**Tool used:** one HTML file (≈660 lines). Any OpenAI-compatible API (default: OpenRouter free models, which work from Hong Kong). No server, no install, no framework, works from `file://`.

**Why this one matters for the course:** an AI will happily label a literal retrieval question "evaluate and critique". The generator is built so you can catch it — the process label, the *why* line and the coverage panel exist to be disagreed with. Assessment literacy here is not "can the AI write items" but **"can you defend this item's level and its mark scheme in front of a panel."**

- **MEDD8934 Week 4 (AI in Language Assessment):** validity and reliability with a real artefact. Generate a set, then mark up the ones whose process label is wrong, and argue the mark scheme for a 3-mark item.
- **AILT9004 (Weeks 5–6):** the framework *is* the prompt. Open the Teacher tab, read what the tool has been told about a good item, change one rule, regenerate, and compare the two sets.

## Try it (3 minutes)

1. Free OpenRouter key: <https://openrouter.ai/keys> → sign in → **Create key** (free models: 50 requests a day; one question set = one request).
2. Open `pirls-questions.html` in Chrome or Edge, paste the key in **Settings**.
3. Load a sample passage (EN informational / EN literary / 中文說明文 / 中文記敘文) or paste your own, 150–800 words or 300–1200 characters.
4. Set grade, number of items, format mix → **Generate question set**. Read the coverage panel first, then the items.
5. Try the other tab: paste two of your own questions and see what the tool says they measure.

The key is stored only in your browser (localStorage). The file never contains a key.

## The four processes (what the tool is aiming at)

| Process | PIRLS weight | The reader has to… |
|---|---|---|
| 1. Focus on and retrieve explicitly stated information 提取明示訊息 | 20% | find something stated in one place |
| 2. Make straightforward inferences 直接推論 | 30% | join two nearby facts, an obvious cause, a referent |
| 3. Interpret and integrate ideas and information 詮釋整合 | 30% | use the whole text: theme, character change, comparison |
| 4. Evaluate and critique content and textual elements 評價批判 | 20% | judge word choice, structure, evidence, stance, text features |

MC items are worth 1 mark; CR items 1, 2 or 3 marks. The *Process weights* menu also offers an even split and a higher-order split (10 / 20 / 35 / 35) — useful for showing a class how the shape of a paper changes what it measures.

## Make it yours

- **Teacher tab → Generator prompt.** Everything the tool knows about item quality is in that text: no yes/no stems, no "all of the above", distractors drawn from the passage, a 3-mark item must require three distinct text-based points. Add your own school's rules (for example: "every CR item must ask pupils to quote"), regenerate, compare. This is the exercise, not a settings screen.
- **Teacher tab → Checker prompt.** Add the faults you keep seeing in your own department's papers to the `issues` list.
- **Sample passages** are in the `SAMPLES` object near the top of the script — replace them with your own textbook units so the tool opens ready for your class.
- Both prompts are in English because free models follow English instructions more reliably; the *questions* follow the language you pick. Reset both to default with one button.

## Known limits (good discussion material)

- **The process labels are claims, not facts.** Process 3 and 4 are where models cheat: a process 2 item arrives wearing a "4" badge. That is exactly what the *why* line is for — read it, and if it does not survive one question from you, the label is wrong.
- **Nothing here is validated.** Real PIRLS items are trialled on hundreds of pupils and double-marked. Do not report a pupil's "PIRLS level" from this tool; use it to build classroom items and to train your own eye.
- **The passage is the ceiling.** A thin passage cannot support a process 4 item, and the model will invent one anyway. Choose passages with a stance, a structure or a text feature (heading, caption, diagram) if you want real higher-order items.
- **Free models are weaker in Chinese.** Check 繁/簡 consistency and written-Chinese slips into Cantonese colloquial before printing. The *Premium* preset (needs credit) is more reliable for Chinese.
- **Mark schemes drift.** A "2-mark" scoring guide sometimes describes three points. Fix it in the printed key; treat it as an item-moderation exercise.
- Free models may train on what you send: use published passages, and keep pupils' names and answers out of it.

## Build it yourself with the CLI

Open OpenCode in an empty folder and paste the prompt in `BUILD-IT-YOURSELF.md`. Then generate one set and ask the agent: "Item 7 is labelled process 4 but can be answered from one sentence — tighten the prompt so that cannot happen." Also ask: "What stops a pupil's pasted answer from being read as an instruction?"

## 中文速讀

貼上課文 → 選年級、題目語言、題數 → 產生整份題目：四個 PIRLS 層次按 20/30/30/20 分布，附題型、分數、答案、評分指引，以及每題「為何屬於這個層次」一句。上方有層次分布面板，可即時看出是否全部塌成提取題。可分別列印**學生卷**（不含答案與層次標示）與**答案卷**。第二個分頁可檢核你自己寫的題目：它實際測的是哪一層、能否憑課文作答、毛病在哪、修訂版、以及提升一層的版本。介面與題目皆支援英文／繁體／簡體；標題列的「中文／English」按鈕切換整個介面。教師分頁可直接改提示語——那段文字就是這個工具對「好題目」的全部認識。
