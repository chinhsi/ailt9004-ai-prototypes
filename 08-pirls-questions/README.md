# Prototype 8 — Reading Question Generator 閱讀理解出題器 (item writing you can argue with)

**Two frameworks in one page:** PIRLS 2021 (four comprehension processes) for English or Chinese passages, and **祝新華 六層次閱讀能力** (six levels) — the framework Hong Kong Chinese-language teachers actually use. The picker at the top of the settings swaps the levels, the weights, the text-type menu, the teacher's reference table and both prompts.

**What it does:** you paste a reading passage, choose the framework, the grade and the language, and the tool writes a whole question set to that design. Under **PIRLS 2021** — the four comprehension processes in their official proportions (20 / 30 / 30 / 20), multiple-choice and constructed-response items in a mix you choose, marks, answer keys, scoring guides (full / partial / no credit), and for every item two lines for the teacher: **why it belongs to that process**, and **why it is not the neighbouring process** — the boundary stated in terms of this passage ("the answer is not in any single sentence: paragraph 2 and the ending are both needed"). The second line is the one that makes a mislabelled item hard to disguise. A coverage panel shows what you actually got against what you asked for, so a set that quietly collapsed into ten retrieval questions is visible in one glance — but it counts the labels *the model gave its own items*, it does not verify them. Items whose parts do not add up (an MC item without four options, an answer that matches no option, a 3-mark item whose stem never says how many points, a missing scoring guide) carry a red flag on the card. Two print buttons give you a **student sheet** (title, name line, total marks, passage, questions, answer lines — no answers, no process labels) and an **answer key** (everything, passage removed).

The second tab, **Check my own question**, is the reverse move: paste questions *you* wrote, and the tool says which process each one really measures (not the one you hoped for), whether a reader could answer it from this passage at all, what is wrong with it, a repaired version, and a version one process higher. The **interface** is English or 繁體中文 (the 中/English button switches all of it); the **questions** can be written in English, 繁體中文 or 简体中文, independently of the interface.

**Tool used:** one HTML file (≈760 lines). Any OpenAI-compatible API (default: OpenRouter free models, which work from Hong Kong). No server, no install, no framework, works from `file://`.

**Why this one matters for the course:** an AI will happily label a literal retrieval question "evaluate and critique". The generator is built so you can catch it — the process label, the *why* line and the coverage panel exist to be disagreed with. Assessment literacy here is not "can the AI write items" but **"can you defend this item's level and its mark scheme in front of a panel."**

- **MEDD8934 Week 4 (AI in Language Assessment):** validity and reliability with a real artefact. Generate a set, then mark up the ones whose process label is wrong, and argue the mark scheme for a 3-mark item.
- **AILT9004 (Weeks 5–6):** the framework *is* the prompt. Open the Teacher tab, read what the tool has been told about a good item, change one rule, regenerate, and compare the two sets.

## Try it (3 minutes)

1. Free OpenRouter key: <https://openrouter.ai/keys> → sign in → **Create key** (free models: 50 requests a day; **one question set = one request**, and so is one click of *Check my own question*, however many questions you paste)). The free preset now starts with `qwen/qwen3.8-27b:free` — free, good in Chinese, and a 1M context so a long passage plus a full question set fits.
2. Optional, if the free models keep answering *service temporarily overloaded*: add a few dollars of credit and pick one of the two paid presets. They deliberately contain no GPT, Claude or Gemini — those services are not open to Hong Kong accounts, and the point of these prototypes is what a teacher here can actually run. **Strongest Chinese:** `qwen/qwen3.8-max-0902` → `moonshotai/kimi-k3` → `z-ai/glm-5.3`, roughly **US$0.02 per question set**. **Low cost:** `deepseek/deepseek-v4-pro-0813` → `minimax/minimax-m3` → `z-ai/glm-5.3`, **under US$0.01**. Either way a few dollars lasts a term.
3. Open `pirls-questions.html` in Chrome or Edge, paste the key in **Settings**.
4. Load a sample passage (EN informational / EN literary / 中文說明文 / 中文記敘文) or paste your own, 150–800 words or 300–1200 characters.
5. Pick the framework, then set grade, number of items and format mix → **Generate question set**. Read the coverage panel first, then the items.
6. Try the other tab: paste two of your own questions and see what the tool says they measure.

The key is stored only in your browser (localStorage). The file never contains a key.

## 祝新華 六層次閱讀能力（中文科）

| 層次 | 這一層要學生做甚麼 | 測卷常見比重 |
|---|---|---|
| 1 複述 | 認讀原文、抄錄詞句、指出顯性的事實 | 低層次，5 分 |
| 2 解釋 | 用自己的話解釋詞語、句子的表層意義 | 低層次，5 分 |
| 3 重整 | 理清內容關係、從多處撮取信息、概括段意或全篇、辨識表達技巧 | 高層次，10 分 |
| 4 伸展 | 推斷深層意義、篇外信息、隱含的觀點態度與主旨 | 高層次，10 分 |
| 5 評鑑 | 評說人物與思想內容、鑒賞語言與表達技巧 | 高層次，10 分 |
| 6 創意 | 提出新方法或新見解、靈活運用所讀信息解決問題（仍扣住篇章） | 高層次，10 分 |

第 1、2 層為低層次，第 3 至 6 層為高層次。表中分數是此系統常用的 50 分測卷設計（複述、解釋各 5 分，其餘四層各 10 分），工具據此把題數配成 10 / 10 / 20 / 20 / 20 / 20，另備「六層平均」與「高層次為主」兩組。選了這個框架，兩段提示語都會換成中文版（老師本來就用中文說這套術語），閱讀目的選單也換成文體（記敘／說明／議論／抒情描寫）。

出處：祝新華（2008）。六層次閱讀能力系統及其在評估與教學領域中的運用。《小學語文》，(4)，4–7。課堂提問的實驗研究見鐘竹梅、廖先、祝新華（2017），該研究也是「老師不刻意調整時，提問多半停在第 1、2 層」這個說法的依據。

## The four PIRLS processes (what the tool is aiming at)

| Process | PIRLS weight | The reader has to… |
|---|---|---|
| 1. Focus on and retrieve explicitly stated information 提取明示訊息 | 20% | find something stated in one place |
| 2. Make straightforward inferences 直接推論 | 30% | join two nearby facts, an obvious cause, a referent |
| 3. Interpret and integrate ideas and information 詮釋整合 | 30% | use the whole text: theme, character change, comparison |
| 4. Evaluate and critique content and textual elements 評價批判 | 20% | judge word choice, structure, evidence, stance, text features |

MC items are worth 1 mark; CR items 1, 2 or 3 marks. PIRLS uses both formats; the *Item format mix* menu here is your choice, not an official PIRLS blueprint. The *Process weights* menu also offers an even split and a higher-order split (10 / 20 / 35 / 35) — useful for showing a class how the shape of a paper changes what it measures.

## Make it yours

- **Teacher tab → Generator prompt.** Everything the tool knows about item quality is in that text: no yes/no stems, no "all of the above", distractors drawn from the passage, a 3-mark item must require three distinct text-based points. Add your own school's rules (for example: "every CR item must ask pupils to quote"), regenerate, compare. This is the exercise, not a settings screen.
- **Teacher tab → Checker prompt.** Add the faults you keep seeing in your own department's papers to the `issues` list.
- **Sample passages** are in the `SAMPLES` object near the top of the script — replace them with your own textbook units so the tool opens ready for your class.
- Both prompts are in English because free models follow English instructions more reliably; the *questions* follow the language you pick. Reset both to default with one button.

## Known limits (good discussion material)

- **The coverage panel counts claims, not verified classifications.** The percentages tell you what the model *said* it wrote. The only check on that is you, reading the *why* line.
- **The process labels are claims, not facts.** Process 3 and 4 are where models cheat: a process 2 item arrives wearing a "4" badge. That is what the two teacher lines are for. Read the *why not* line first: a real process 3 item can say exactly what a process 2 reader would miss; a mislabelled one falls back on "it needs deeper thinking".
- **Nothing here is validated.** Real PIRLS items are trialled on hundreds of pupils and double-marked. Do not report a pupil's "PIRLS level" from this tool; use it to build classroom items and to train your own eye.
- **The passage is the ceiling.** A thin passage cannot support a process 4 item, and the model will invent one anyway. Choose passages with a stance, a structure or a text feature (heading, caption, diagram) if you want real higher-order items.
- **Free models are weaker in Chinese.** Check 繁/簡 consistency and written-Chinese slips into Cantonese colloquial before printing. The *Premium* preset (needs credit) is more reliable for Chinese.
- **Mark schemes drift.** A "2-mark" scoring guide sometimes describes three points. Fix it in the printed key; treat it as an item-moderation exercise.
- Free models may train on what you send: use published passages, and keep pupils' names and answers out of it.
- **When a model says "service temporarily overloaded"** it is the free tier queueing, not a fault in your passage. The page retries once, then tries the next model in the list; if all of them fail it says so and tells you to wait a minute or reorder the models. Model names change: if one disappears, replace it in Settings with any other model your endpoint offers.

## Build it yourself with the CLI

Open OpenCode in an empty folder and paste the prompt in `BUILD-IT-YOURSELF.md`. Then generate one set and ask the agent: "Item 7 is labelled process 4 but can be answered from one sentence — tighten the prompt so that cannot happen." Also ask: "What stops a pupil's pasted answer from being read as an instruction?"

## 中文速讀

貼上課文 → **選框架**（PIRLS 2021 四層次／祝新華六層次閱讀能力）→ 選年級、題目語言、題數 → 產生整份題目：層次按所選比重分布，附題型、分數、答案、評分指引，以及每題兩行給老師的話——「為何屬於這個層次」與「**為什麼不是第 X 層**」（界線要指向課文的具體地方，這行最能戳破貼錯的標籤）。上方層次分布面板顯示拿到 vs 要求，**但它統計的是模型自己貼的標籤，不代表已驗證**。題目本身有紅旗自檢：選項不是四個、標為開放題卻附選項、答案對不上選項、2–3 分題沒說要答幾點或缺評分指引。可分別列印**學生卷**（不含答案、層次標示與紅旗）與**答案卷**。第二分頁檢核你自己寫的題目：實際測哪一層、能否憑課文作答、毛病、修訂版、提升一層的版本。**介面只有英文與繁體中文**（標題列一鍵切換）；**題目語言**另選英文／繁體／簡體，切到祝新華時會自動預設繁體中文。教師分頁可直接改提示語——祝新華那兩段是中文寫的，PIRLS 那兩段是英文。
