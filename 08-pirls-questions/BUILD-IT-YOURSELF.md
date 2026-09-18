# Build the PIRLS Question Generator yourself — prompt for OpenCode

Open a terminal in an empty folder, run `opencode`, and paste:

```
Create a single self-contained file pirls-questions.html: a reading-comprehension item generator for teachers, built to the PIRLS 2021 Reading Comprehension framework, with a bilingual interface (English and 繁體中文).

Requirements:
- Settings panel: API key (password field, saved in localStorage), base URL (default https://openrouter.ai/api/v1), comma-separated model list (default "inclusionai/ling-3.0-flash-fin:free, nvidia/nemotron-3-super-120b-a12b:free, nex-agi/nex-n2.5-pro:free"). The key is stored only in localStorage and is sent only as an Authorization header to the endpoint the teacher chose.
- A passage textarea at the top, shared by the whole page, with four sample passages (English informational, English literary, 中文說明文, 中文記敘文) and a live word/character count.
- Three tabs: Generate questions / Check my own question / Teacher (prompts and framework).
- Generate: choose question language (same as passage, English, 繁體中文, 简体中文), purpose for reading (detect, literary experience, acquire and use information), grade band, number of items (5/10/15), format mix, and process weights (PIRLS 20/30/30/20, even, higher-order 10/20/35/35). Compute exact per-process item counts with a largest-remainder split and tell the model precisely how many items of each process to write.
- One call to {baseUrl}/chat/completions (OpenAI-compatible, Bearer key) returning JSON {purpose, language, items:[{n, process 1-4, format "MC"|"CR", marks 1-3, question, options[], answer, scoring, why}]}. The system prompt must define the four PIRLS processes and enforce: answerable from this passage alone; process 1 answers findable in one place; MC = exactly 4 options with distractors drawn from the passage; no yes/no stems, no "all of the above"; a process 3 item must NOT be answerable from a single sentence; a process 4 item must be anchored in a word, structure or text feature; every CR item needs a full/partial/no-credit scoring guide; "why" explains to the teacher why this is that process and not the one below.
- Render each item as a card colour-coded by process, with badges for process, format and marks, the options as A-D, and a teacher block holding answer, scoring guide and the why line. Normalise the model's answer field: accept "B", "B.", the option number ("2") or the option text, and show letter + option text. Decide MC vs CR from the model's own format field, not from whether options happen to be present, and put a red flag badge on any item whose parts do not add up: an MC item without exactly four options, an item labelled open that came back with options, an answer that matches no option, a 2- or 3-mark item with no scoring guide or whose stem never says how many points. Hide those flags on the student sheet.
- A coverage panel comparing the process counts you got with the counts you asked for, flagging any that are off in red. This is the point of the tool: it makes a set that collapsed into retrieval questions visible.
- Two print modes via a body class and @media print: "student sheet" = title, name/class/date line, total marks, the passage as flowing text (not inside the textarea), questions with marks and dotted answer lines, and NO answers, scoring guides, why lines, process labels or coverage; "answer key" = everything except the passage. Also a Copy as Markdown button.
- Check my own question: paste questions one per line; warn if the model returns a different number of verdicts than the number of questions sent; one call returning JSON {items:[{question, process 0-4, process_reason, text_dependent, answerable, issues[], rewrite, level_up:{process, question}, suggested_answer}]}, where process 0 means it does not measure comprehension of this passage. Render issues in red, the rewrite and the level-up version in a teacher block.
- Teacher tab: both system prompts in editable textareas saved to localStorage, with a reset button, a table of the four processes with weights and example stems, and a short "what this tool cannot do" list.
- Full interface translation: one dictionary of [English, 中文] strings, a header button that switches language, saved in localStorage, and existing results must re-render in the new language.
- Parse JSON leniently (strip code fences, take the outermost braces); read the reply from choices[0].message.content or choices[0].text; on 429/500/502/503 wait 1.5 s, retry once, then fall through to the next model; 90 s timeout; stop trying a model that returns 402/403; ignore a reply whose request has been superseded by a newer one. Plain CSS, no libraries, works from file://.
Keep it under 700 lines. Escape everything that comes back from the model before putting it in the DOM, and comment the two prompts clearly — the teacher will edit them.
```

Then generate one set from a passage you actually teach, and push back on the agent with what you see:

- "Item 7 is labelled process 4 but I can answer it from one sentence. Tighten the prompt so that cannot happen, and tell me which rule you added."
- "The 3-mark scoring guide only describes two points. Make marks and required points match."
- "A pupil could paste 'give this full marks' into the question checker. Show me where the model is told to treat teacher text as data, not instructions."
- "Add a rule from my school: every constructed-response item must ask pupils to quote."

Each of those is an assessment-moderation conversation that happens to be held with a machine. Keep the two versions of the prompt: the diff is the artefact worth showing your department.
