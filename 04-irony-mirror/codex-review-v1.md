OpenAI Codex v0.153.4
--------
workdir: /Users/chinhsi/Google Drive/HKU/Courses/2026 09/AILT9004/Materials/Prototypes/04-irony-mirror
model: gpt-5.5
provider: openai
approval: never
sandbox: read-only
reasoning effort: medium
reasoning summaries: none
session id: 01a0944a-78e2-7331-a2dd-644bdbba3f3a
--------
user
You are reviewing irony-mirror.html, a single-file teaching prototype for a Hong Kong teacher-education course (students are language teachers with no programming background). It must stay one self-contained HTML file with no build step, working from file:// and GitHub Pages. Text comes from any OpenAI-compatible /chat/completions endpoint (OpenRouter free models by default); pictures come from Pollinations (gen.pollinations.ai with a Bearer key via fetch->blob, or the anonymous image.pollinations.ai URL as fallback, ~1 request per 15 s per IP). Also read README.md and BUILD-IT-YOURSELF.md in this folder. Review critically: (1) Bugs and edge cases in the JavaScript (state handling across tabs, cache, game rounds, timers, blob URLs, localStorage failures, JSON parsing, XSS via model output injected into innerHTML or the SVG card, print window). (2) Robustness against flaky free APIs (429/402/403/401, malformed JSON, missing fields such as questions or sceneB). (3) Classroom usability: is anything confusing for a non-technical teacher; are error messages actionable. (4) Pedagogy and ethics of the default prompt: could it produce hurtful content, is the safety framing adequate, is the irony scaffold sound for Secondary 3-4 Chinese/English classes. (5) README accuracy against the code. Output in English markdown: a short overall verdict, then a prioritized Top-10 list with line references and concrete fixes. Be specific; quote the code.
codex
I’ll review this in code-review mode and cross-check the docs against the actual single-file behavior. I’m going to read the HTML plus the two docs first, then trace the risk areas you named with line references.
exec
/bin/zsh -lc 'wc -l irony-mirror.html README.md BUILD-IT-YOURSELF.md' in /Users/chinhsi/Google Drive/HKU/Courses/2026 09/AILT9004/Materials/Prototypes/04-irony-mirror
exec
/bin/zsh -lc "sed -n '1,220p' README.md" in /Users/chinhsi/Google Drive/HKU/Courses/2026 09/AILT9004/Materials/Prototypes/04-irony-mirror
 succeeded in 0ms:
     540 irony-mirror.html
      37 README.md
      22 BUILD-IT-YOURSELF.md
     599 total

 succeeded in 0ms:
# Prototype 4 — Irony Mirror 反諷鏡 (one HTML file that also makes pictures)

**What it does:** type one word or value — 孝順, honesty, 環保, punctuality — and the page shows its **two faces**: Face A, the value done sincerely; Face B, the irony, where what people *say* and what they *do* don't match. Each face gets a caption, a picture, and the page names the **gap** (verbal / situational / dramatic irony), asks three discussion questions, gives one model sentence, and leaves a box for the student to write their own ironic sentence. A **Game** tab turns it into *Spot the irony*: pairs pick the ironic picture and write the gap in one sentence. A **Teacher** tab shows the prompt that does all of this — that prompt *is* the lesson plan.

**Where it comes from:** Prof. Lin's earlier web app *Chinnovation* had a 漢語新解 ("new take on a Chinese word") feature: a word went to a server, a workflow called an image service, and a satirical card came back minutes later. In 2025 that needed a login system, a database, credits and a third-party automation. In 2026 the same idea fits in **one HTML file** because (a) any OpenAI-compatible text API can write the irony and the image prompts, and (b) an image model can be called with **a plain URL** — no server in between. The card itself is drawn by the browser (SVG), so it costs nothing and never fails.

**Tool used:** one HTML file (≈530 lines). Text: any OpenAI-compatible API, by default OpenRouter's free models (work from Hong Kong). Pictures: [Pollinations.ai](https://pollinations.ai), an image service addressed by URL — the picture *is* a URL. With a free Pollinations key (sign up with GitHub or Google at <https://enter.pollinations.ai>) you get a weekly allowance that covers hundreds of small pictures on open models such as `zimage` and `flux`, no watermark, and even GPT-Image-2.5 if you buy credit; without a key the page falls back to the old anonymous endpoint (watermark, one picture at a time per network). No server, no install, no framework.

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
- **Irony can hurt.** The prompt forbids real people and ethnic, religious, gender or disability targets, and asks the model to mock *behaviours, not groups*; a *Teacher note* appears when a word may be sensitive (family, money, illness). Read it before you show the class. You are the editor.
- Free text models may use your prompts for training; free models are weaker in Cantonese than in written Chinese or English. Choose the *Premium* preset if you have credit.
- Hong Kong reachability of Pollinations has not yet been tested from the HKU network without a VPN (OpenRouter has). If pictures never load on campus, use *Copy prompt* → the Gemini app (free in Hong Kong since March 2026).

## Build it yourself with the CLI

Open OpenCode in an empty folder and paste the prompt in `BUILD-IT-YOURSELF.md`. Then compare: did the agent's version name the irony type? Did it remember the rate limit? Did it think about who gets mocked?

exec
/bin/zsh -lc "sed -n '1,260p' BUILD-IT-YOURSELF.md" in /Users/chinhsi/Google Drive/HKU/Courses/2026 09/AILT9004/Materials/Prototypes/04-irony-mirror
 succeeded in 0ms:
# Build Irony Mirror yourself — prompt for OpenCode

Open a terminal in an empty folder, run `opencode`, and paste:

```
Create a single self-contained file irony-mirror.html for a language classroom in Hong Kong: the user types ONE word or value (e.g. 孝順, honesty) and the page shows its "two faces" — the value done sincerely, and the irony (what people say vs what they do).

Requirements:
- Settings panel: API key (password field, saved in localStorage), base URL (default https://openrouter.ai/api/v1), comma-separated model list (default "inclusionai/ling-3.0-flash-fin:free, nvidia/nemotron-3-super-120b-a12b:free"), output language (Traditional Chinese written / Cantonese colloquial / English), learner level, picture style text.
- Send ONE request to {baseUrl}/chat/completions (OpenAI-compatible, Bearer key) with a system prompt that asks for a JSON object: word, sincere (one-sentence meaning), ironic (one witty redefinition, max 40 characters, in the spirit of 錢鍾書 / Oscar Wilde), sceneA {caption, imagePrompt}, sceneB {caption, imagePrompt} where B is a visible contradiction between words and actions, ironyType (verbal/situational/dramatic), gap (one sentence), questions (3), modelSentence, safetyNote. Tell the model: no real people, no ethnic/religious/gender/disability targets — mock behaviours, not groups. imagePrompt must be English and say "no text in image".
- Parse the JSON leniently (strip code fences). If the API returns 429/502/503, wait 1.5 s and retry once, then try the next model.
- Show two cards side by side (Face A, Face B) with caption and picture. Pictures come from Pollinations: set the img src to https://image.pollinations.ai/prompt/{URL-encoded prompt + style}?width=768&height=512&seed=N&model=flux . Queue the two pictures 15 seconds apart because anonymous use is rate-limited. Add "New picture" (new seed) and "Copy prompt" buttons.
- Below: the gap, the irony type, the three questions, the model sentence, and a textarea where the student writes their own ironic sentence.
- Draw a simple card as inline SVG (word large, ironic line under a red rule, irony type small) and a button that downloads it as PNG via canvas.
- Add a "Game" tab: a list of words; for each word show the two pictures in random order WITHOUT labels; the student clicks the ironic one (score +1), writes the gap in one sentence, then a Reveal button shows the AI's gap. End screen with score.
- Add a "Teacher" tab with the system prompt in a textarea (editable, saved in localStorage, reset button).
- Cache the last results in localStorage so re-showing a word costs no API call.
- Plain CSS, no external libraries, works from file://. Show errors near the input.
Keep it under 500 lines and comment the main functions.
```

Then test it with 孝順 and with an English word. Ask the agent: "The second picture does not look ironic — rewrite the imagePrompt instructions so the contradiction is visible without words." Finally ask: "Who could be hurt by this tool, and what in the prompt prevents it?"

exec
/bin/zsh -lc 'rg --files' in /Users/chinhsi/Google Drive/HKU/Courses/2026 09/AILT9004/Materials/Prototypes/04-irony-mirror
 succeeded in 0ms:
BUILD-IT-YOURSELF.md
codex-review-v1.md
README.md
irony-mirror.html
example-output/punctuality.json
example-output/card-孝順.png
example-output/README.md
example-output/screenshot-explore.png
example-output/誠實.json
example-output/孝順.json

codex
I’ve got the docs. The README makes fairly specific claims about provider options, key handling, rate limits, and safety notes, so I’ll now map those claims to the actual functions and UI paths in the HTML.
exec
/bin/zsh -lc "nl -ba irony-mirror.html | sed -n '181,360p'" in /Users/chinhsi/Google Drive/HKU/Courses/2026 09/AILT9004/Materials/Prototypes/04-irony-mirror
exec
/bin/zsh -lc "nl -ba irony-mirror.html | sed -n '361,560p'" in /Users/chinhsi/Google Drive/HKU/Courses/2026 09/AILT9004/Materials/Prototypes/04-irony-mirror
exec
/bin/zsh -lc "nl -ba irony-mirror.html | sed -n '1,180p'" in /Users/chinhsi/Google Drive/HKU/Courses/2026 09/AILT9004/Materials/Prototypes/04-irony-mirror
 succeeded in 0ms:
   361	    const url = await pictureURL(prompt, seed);
   362	    if (!url) return;
   363	    const img = new Image();
   364	    img.alt = prompt;
   365	    img.onload = () => { el.textContent = ''; el.appendChild(img); };
   366	    img.onerror = () => { el.textContent = 'The picture service is busy (anonymous use allows one picture at a time per network). Wait, press "New picture", get a free key in Settings, or copy the prompt into another tool.'; };
   367	    img.src = url;
   368	  } catch (e) { el.textContent = 'Picture failed: ' + e.message; }
   369	}
   370	
   371	// ---------- explore ----------
   372	const EXAMPLES = ['孝順', '誠實', '環保', '友誼', '勤奮', '禮貌', 'honesty', 'punctuality', 'teamwork', 'generosity'];
   373	$('chips').innerHTML = EXAMPLES.map(w => `<button>${w}</button>`).join('');
   374	$('chips').addEventListener('click', e => { if (e.target.tagName === 'BUTTON') { $('word').value = e.target.textContent; mirror(); } });
   375	$('go').addEventListener('click', mirror);
   376	$('word').addEventListener('keydown', e => { if (e.key === 'Enter') mirror(); });
   377	let current = null, seeds = { A: 1, B: 2 };
   378	const cache = JSON.parse(load('cache', '{}'));
   379	function remember(word, obj) { cache[word] = obj; const keys = Object.keys(cache); while (keys.length > 12) delete cache[keys.shift()]; store('cache', JSON.stringify(cache)); renderHist(); }
   380	function renderHist() {
   381	  const k = Object.keys(cache);
   382	  $('hist').innerHTML = k.length ? 'Recent (no API call): ' + k.map(w => `<button class="ghost" data-w="${w}">${w}</button>`).join('') : '';
   383	}
   384	$('hist').addEventListener('click', e => { const w = e.target.dataset.w; if (w) { $('word').value = w; render(cache[w]); } });
   385	renderHist();
   386	
   387	async function mirror() {
   388	  const word = $('word').value.trim();
   389	  if (!word) return;
   390	  $('go').disabled = true; $('status').className = 'status';
   391	  try {
   392	    const obj = cache[word] || await callAI(word, $('status'));
   393	    remember(word, obj);
   394	    $('status').textContent = '';
   395	    render(obj);
   396	  } catch (e) { $('status').className = 'status err'; $('status').textContent = e.message; }
   397	  $('go').disabled = false;
   398	}
   399	function render(o) {
   400	  current = o; seeds = { A: Math.floor(Math.random() * 1e6), B: Math.floor(Math.random() * 1e6) };
   401	  $('result').classList.remove('hidden');
   402	  $('defA').textContent = o.sincere || ''; $('capA').textContent = o.sceneA.caption || '';
   403	  $('defB').textContent = '「' + (o.ironic || '') + '」'; $('capB').textContent = o.sceneB.caption || '';
   404	  $('ironyType').textContent = (o.ironyType || '') + ' irony';
   405	  $('gapText').textContent = o.gap || '';
   406	  $('questions').innerHTML = (o.questions || []).map(q => `<li>${esc(q)}</li>`).join('');
   407	  $('modelSentence').textContent = o.modelSentence || '';
   408	  $('student').value = '';
   409	  $('safety').classList.toggle('hidden', !o.safetyNote); $('safety').textContent = o.safetyNote ? 'Teacher note: ' + o.safetyNote : '';
   410	  drawCard(o);
   411	  showPicture($('picA'), o.sceneA.imagePrompt, seeds.A);
   412	  showPicture($('picB'), o.sceneB.imagePrompt, seeds.B);
   413	  window.scrollTo({ top: $('result').offsetTop - 10, behavior: 'smooth' });
   414	}
   415	document.querySelectorAll('[data-copy]').forEach(b => b.addEventListener('click', () => {
   416	  if (!current) return; const p = current['scene' + b.dataset.copy].imagePrompt + ', ' + $('style').value;
   417	  navigator.clipboard.writeText(p).then(() => { b.textContent = 'Copied'; setTimeout(() => b.textContent = 'Copy prompt', 1500); });
   418	}));
   419	document.querySelectorAll('[data-regen]').forEach(b => b.addEventListener('click', () => {
   420	  if (!current) return; const s = b.dataset.regen; seeds[s] = Math.floor(Math.random() * 1e6);
   421	  showPicture($('pic' + s), current['scene' + s].imagePrompt, seeds[s]);
   422	}));
   423	const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
   424	
   425	// ---------- the card: drawn by the browser, in the spirit of 漢語新解 ----------
   426	function wrap(text, max) {   // crude wrap: CJK by characters, Latin by words
   427	  const cjk = /[　-鿿＀-￯]/.test(text);
   428	  if (cjk) { const out = []; for (let i = 0; i < text.length; i += max) out.push(text.slice(i, i + max)); return out; }
   429	  const out = []; let line = '';
   430	  for (const w of text.split(/\s+/)) { if ((line + ' ' + w).trim().length > max * 2) { out.push(line.trim()); line = w; } else line += ' ' + w; }
   431	  if (line.trim()) out.push(line.trim());
   432	  return out;
   433	}
   434	function drawCard(o) {
   435	  const lines = wrap(o.ironic || '', 12);
   436	  const W = 420, top = 150, lh = 34, H = Math.max(360, top + lines.length * lh + 120);
   437	  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="'Noto Serif CJK TC','Songti TC','PingFang HK','Microsoft JhengHei',serif">
   438	  <rect width="${W}" height="${H}" fill="#faf6ee"/>
   439	  <rect x="14" y="14" width="${W - 28}" height="${H - 28}" fill="none" stroke="#1f2a24" stroke-width="1.5"/>
   440	  <text x="${W / 2}" y="52" text-anchor="middle" font-size="13" letter-spacing="4" fill="#6b7570">反諷鏡 · IRONY MIRROR</text>
   441	  <text x="${W / 2}" y="112" text-anchor="middle" font-size="44" font-weight="700" fill="#1f2a24">${esc(o.word)}</text>
   442	  <line x1="60" y1="130" x2="${W - 60}" y2="130" stroke="#b3402f" stroke-width="2"/>
   443	  ${lines.map((l, i) => `<text x="${W / 2}" y="${top + 30 + i * lh}" text-anchor="middle" font-size="24" fill="#1f2a24">${esc(l)}</text>`).join('')}
   444	  <text x="${W / 2}" y="${H - 62}" text-anchor="middle" font-size="13" fill="#6b7570">${esc((o.ironyType || '') + ' irony')}</text>
   445	  <text x="${W / 2}" y="${H - 40}" text-anchor="middle" font-size="12" fill="#b3402f">${esc((o.gap || '').slice(0, 40))}</text>
   446	</svg>`;
   447	  $('card').innerHTML = svg;
   448	}
   449	$('dlCard').addEventListener('click', () => {
   450	  const svg = $('card').querySelector('svg'); if (!svg) return;
   451	  const xml = new XMLSerializer().serializeToString(svg);
   452	  const img = new Image();
   453	  img.onload = () => {
   454	    const c = document.createElement('canvas'); c.width = svg.width.baseVal.value * 2; c.height = svg.height.baseVal.value * 2;
   455	    const ctx = c.getContext('2d'); ctx.scale(2, 2); ctx.drawImage(img, 0, 0);
   456	    const a = document.createElement('a'); a.download = 'irony-' + (current ? current.word : 'card') + '.png'; a.href = c.toDataURL('image/png'); a.click();
   457	  };
   458	  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml);
   459	});
   460	$('dlJson').addEventListener('click', () => {
   461	  if (!current) return;
   462	  const a = document.createElement('a'); a.download = 'irony-' + current.word + '.json';
   463	  a.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(current, null, 2)); a.click();
   464	});
   465	$('printSheet').addEventListener('click', () => {
   466	  if (!current) return; const o = current;
   467	  const w = window.open('', '_blank');
   468	  w.document.write(`<html><head><meta charset="utf-8"><title>Irony Mirror – ${esc(o.word)}</title><style>body{font-family:serif;max-width:700px;margin:30px auto;line-height:1.6}h1{font-size:28px}.box{border:1px solid #999;padding:10px;margin:10px 0;min-height:60px}small{color:#666}</style></head><body>
   469	  <h1>${esc(o.word)} <small>· Irony Mirror worksheet</small></h1>
   470	  <p><b>Face A:</b> ${esc(o.sceneA.caption)}</p><p><b>Face B:</b> ${esc(o.sceneB.caption)}</p>
   471	  <p>1. Describe what is happening in each picture.</p><div class="box"></div>
   472	  <p>2. What is the gap between what is said and what is done?</p><div class="box"></div>
   473	  <p>3. Write one sentence using irony about ${esc(o.word)}.</p><div class="box"></div>
   474	  <p>4. Discuss: ${(o.questions || []).map(esc).join(' / ')}</p>
   475	  <p><small>Model answer (teacher): ${esc(o.gap)} · ${esc(o.modelSentence)}</small></p></body></html>`);
   476	  w.document.close(); w.print();
   477	});
   478	
   479	// ---------- game: spot the irony ----------
   480	let G = null, tick = null;
   481	$('startGame').addEventListener('click', async () => {
   482	  const words = $('gameWords').value.split(/[,，]/).map(w => w.trim()).filter(Boolean);
   483	  if (!words.length) return;
   484	  G = { words, i: 0, score: 0, picked: null, data: null };
   485	  $('roundTotal').textContent = words.length; $('score').textContent = 0;
   486	  $('gameEnd').classList.add('hidden'); $('gameRound').classList.remove('hidden');
   487	  await playRound();
   488	});
   489	async function playRound() {
   490	  const word = G.words[G.i];
   491	  $('roundNo').textContent = G.i + 1; $('gameWord').textContent = word;
   492	  $('gameVerdict').textContent = ''; $('gameGap').value = ''; $('gameReveal').classList.add('hidden'); $('nextRound').classList.add('hidden'); $('reveal').disabled = false;
   493	  document.querySelectorAll('.choice').forEach(c => { c.classList.remove('picked', 'wrong'); });
   494	  $('gstatus').className = 'status';
   495	  try {
   496	    G.data = cache[word] || await callAI(word, $('gstatus'));
   497	    remember(word, G.data);
   498	  } catch (e) { $('gstatus').className = 'status err'; $('gstatus').textContent = e.message; return; }
   499	  $('gstatus').textContent = '';
   500	  G.ironicSide = Math.random() < 0.5 ? 'L' : 'R'; G.picked = null;
   501	  const A = G.data.sceneA, B = G.data.sceneB;
   502	  const left = G.ironicSide === 'L' ? B : A, right = G.ironicSide === 'L' ? A : B;
   503	  $('gcapL').textContent = left.caption; $('gcapR').textContent = right.caption;
   504	  showPicture($('gpicL'), left.imagePrompt, Math.floor(Math.random() * 1e6));
   505	  showPicture($('gpicR'), right.imagePrompt, Math.floor(Math.random() * 1e6));
   506	  clearInterval(tick);
   507	  if ($('timerOn').checked) {
   508	    let t = 30; $('timer').classList.remove('hidden'); $('timeLeft').textContent = t;
   509	    tick = setInterval(() => { t--; $('timeLeft').textContent = t; if (t <= 0) { clearInterval(tick); if (G.picked === null) judge(null); } }, 1000);
   510	  } else $('timer').classList.add('hidden');
   511	}
   512	document.querySelectorAll('.choice').forEach(c => c.addEventListener('click', () => { if (G && G.picked === null && G.data) judge(c.dataset.side); }));
   513	function judge(side) {
   514	  G.picked = side || 'none'; clearInterval(tick);
   515	  const right = side === G.ironicSide;
   516	  if (right) G.score++;
   517	  $('score').textContent = G.score;
   518	  document.querySelectorAll('.choice').forEach(c => { if (c.dataset.side === G.ironicSide) c.classList.add('picked'); else if (c.dataset.side === side) c.classList.add('wrong'); });
   519	  $('gameVerdict').textContent = side ? (right ? 'Yes — that is the irony. Now say why:' : 'Not that one. The irony is the highlighted picture. Say what the gap is:') : 'Time is up. The irony is the highlighted picture. Say what the gap is:';
   520	}
   521	$('reveal').addEventListener('click', () => {
   522	  if (!G || !G.data) return;
   523	  const o = G.data;
   524	  $('gameReveal').innerHTML = `<p><b>The AI's gap:</b> ${esc(o.gap)} <span class="tag">${esc(o.ironyType)} irony</span></p><p><b>Your sentence:</b> ${esc($('gameGap').value || '—')}</p><p><b>Ironic redefinition:</b> 「${esc(o.ironic)}」</p><p class="hint">Do you agree with the AI? People decide what counts as irony, not the score.</p>`;
   525	  $('gameReveal').classList.remove('hidden'); $('reveal').disabled = true; $('nextRound').classList.remove('hidden');
   526	});
   527	$('nextRound').addEventListener('click', async () => {
   528	  G.i++;
   529	  if (G.i >= G.words.length) {
   530	    $('gameRound').classList.add('hidden');
   531	    const best = Math.max(G.score, +load('best', 0)); store('best', best);
   532	    $('gameEnd').innerHTML = `<h3 style="margin:0 0 6px">Finished: ${G.score} / ${G.words.length} pictures spotted</h3><p>Best on this computer: ${best}. Spotting is the easy part; the sentences you wrote are the real work. Read them aloud.</p>`;
   533	    $('gameEnd').classList.remove('hidden');
   534	    return;
   535	  }
   536	  await playRound();
   537	});
   538	</script>
   539	</body>
   540	</html>

 succeeded in 0ms:
   181	      <label><input type="checkbox" id="timerOn"> 30-second timer</label>
   182	      <button class="act" id="startGame">Start</button>
   183	    </div>
   184	    <div class="status" id="gstatus"></div>
   185	  </div>
   186	  <div id="gameRound" class="hidden">
   187	    <div class="panel gamebar">
   188	      <span>Round <b id="roundNo">1</b>/<span id="roundTotal">6</span></span>
   189	      <span>Word: <b id="gameWord"></b></span>
   190	      <span class="score">Score <span id="score">0</span></span>
   191	      <span id="timer" class="hidden">⏱ <span id="timeLeft">30</span>s</span>
   192	    </div>
   193	    <p style="margin:0 0 10px; font-size:15px">Which picture is the <b>irony</b>: the one where what people <i>say</i> and what they <i>do</i> don't match? Click it.</p>
   194	    <div class="pair" id="gamePair">
   195	      <div class="face choice" data-side="L"><div class="label">Picture 1</div><div class="pic" id="gpicL">picture</div><div class="body"><p class="cap" id="gcapL"></p></div></div>
   196	      <div class="face choice" data-side="R"><div class="label">Picture 2</div><div class="pic" id="gpicR">picture</div><div class="body"><p class="cap" id="gcapR"></p></div></div>
   197	    </div>
   198	    <div class="panel" id="gameAnswer" style="margin-top:14px">
   199	      <p id="gameVerdict" style="font-weight:600; margin:0 0 6px"></p>
   200	      <label style="font-size:14px">In one sentence, what is the gap? (說的 vs 做的)</label>
   201	      <textarea class="wide" id="gameGap"></textarea>
   202	      <div style="display:flex; gap:8px; margin-top:6px; flex-wrap:wrap"><button class="act" id="reveal">Reveal the AI's answer</button><button class="act hidden" id="nextRound">Next word</button></div>
   203	      <div id="gameReveal" class="hidden" style="margin-top:8px"></div>
   204	    </div>
   205	  </div>
   206	  <div id="gameEnd" class="panel hidden"></div>
   207	</section>
   208	
   209	<!-- ============ Teacher ============ -->
   210	<section id="tab-teacher" class="hidden">
   211	  <div class="panel">
   212	    <h3 style="margin:0 0 6px">The prompt is the lesson plan</h3>
   213	    <p class="hint" style="margin-bottom:8px">Everything the AI does comes from this text. Change the tone (gentler for Primary), the number of questions, the irony types, or the image style. The words <code>{lang}</code> and <code>{level}</code> are filled from Settings. Blank = default.</p>
   214	    <textarea id="promptBox" class="wide"></textarea>
   215	    <div style="display:flex; gap:8px; margin-top:6px; flex-wrap:wrap"><button class="ghost" id="savePrompt">Save</button><button class="ghost" id="resetPrompt">Reset to default</button><span class="hint" id="promptStatus"></span></div>
   216	  </div>
   217	  <div class="panel">
   218	    <h3 style="margin:0 0 6px">How to use it in class (10–15 minutes)</h3>
   219	    <ol style="line-height:1.6; margin:0; padding-left:20px">
   220	      <li>Explore: show one word (e.g. 孝順). Ask the class to describe Face A and Face B before reading the captions.</li>
   221	      <li>Name the gap: what is said vs what is done. Point at the irony type tag.</li>
   222	      <li>Students write one ironic sentence (box under the questions); read three aloud.</li>
   223	      <li>Game: 6 words, pairs pick the ironic picture and write the gap in one sentence. Score is only for the picking; the sentence is judged by people.</li>
   224	      <li>Ethics minute: who decided what counts as "ironic"? Whose scenes got drawn? (The AI drew a Hong Kong flat because the prompt said so — change it and see.)</li>
   225	    </ol>
   226	  </div>
   227	</section>
   228	
   229	</main>
   230	<footer>Irony Mirror · AILT9004 prototype 4 · descended from Chinnovation's 漢語新解 · text: any OpenAI-compatible API · pictures: Pollinations.ai</footer>
   231	
   232	<script>
   233	const $ = id => document.getElementById(id);
   234	const store = (k, v) => { try { localStorage.setItem('im_' + k, v); } catch (e) {} };
   235	const load = (k, d) => { try { return localStorage.getItem('im_' + k) ?? d; } catch (e) { return d; } };
   236	
   237	// ---------- default prompt (the lesson plan) ----------
   238	const DEFAULT_PROMPT = `You are "Irony Mirror", a witty but humane writing coach for language classrooms in Hong Kong. The teacher gives you ONE word or value (e.g. 孝順, honesty, punctuality).
   239	Output language for every text field except imagePrompt: {lang}. Learner level: {level}.
   240	Produce a JSON object with exactly these keys:
   241	{
   242	 "word": the word as given,
   243	 "sincere": one-sentence sincere dictionary-style meaning,
   244	 "ironic": ONE biting, witty redefinition in the spirit of 錢鍾書 / 王朔 / Oscar Wilde: say the opposite of what is expected and expose the gap between what people SAY and what they DO. Max 40 characters (or 20 English words). No real people; no ethnic, religious, gender or disability targets; mock behaviours, not groups.
   245	 "sceneA": {"caption": one short sentence describing the value done sincerely by ordinary people, "imagePrompt": an English prompt for an image generator: one concrete everyday scene, two or three people at most, clear actions, no text in the image},
   246	 "sceneB": {"caption": one short sentence describing the ironic scene where words claim the value and actions show the opposite, "imagePrompt": English prompt for the SAME setting and people as sceneA, but now the claim is visible as a symbol (a glowing heart icon on a phone, a medal, a banner, a thumbs-up) while the action in the foreground shows the opposite; describe exactly two figures, their body language and where each is looking, so the contradiction is visible without words; no text in the image},
   247	 "ironyType": "verbal" | "situational" | "dramatic",
   248	 "gap": one sentence naming the contradiction (what is said vs what is done, surface vs reality),
   249	 "questions": [3 short discussion questions suited to the level],
   250	 "modelSentence": one example sentence a learner could write using irony about this word,
   251	 "safetyNote": "" or a one-line note for the teacher if the word could hurt someone in the room
   252	}
   253	Output ONLY the JSON object. No code fences, no commentary.`;
   254	
   255	// ---------- settings persistence ----------
   256	['apiKey', 'baseUrl', 'model', 'lang', 'level', 'imgProvider', 'pollKey', 'pollModel', 'imgBase', 'imgKey', 'imgModel', 'style', 'gameWords'].forEach(id => {
   257	  const v = load(id, null); if (v !== null) $(id).value = v;
   258	  $(id).addEventListener('change', () => store(id, $(id).value));
   259	});
   260	$('preset').addEventListener('change', () => {
   261	  if ($('preset').value === 'custom') return;
   262	  const [b, m] = $('preset').value.split('|'); $('baseUrl').value = b; $('model').value = m; store('baseUrl', b); store('model', m);
   263	});
   264	function providerRows() { const p = $('imgProvider').value; $('imgRow').classList.toggle('hidden', p !== 'openai'); $('pollRow').classList.toggle('hidden', p !== 'pollinations-key'); }
   265	$('imgProvider').addEventListener('change', providerRows); providerRows();
   266	$('toggleSettings').addEventListener('click', () => $('settings').classList.toggle('hidden'));
   267	if (!$('apiKey').value) $('settings').classList.remove('hidden');
   268	
   269	// ---------- tabs ----------
   270	document.querySelectorAll('.tabs button[data-tab]').forEach(b => b.addEventListener('click', () => {
   271	  document.querySelectorAll('.tabs button[data-tab]').forEach(x => x.classList.toggle('on', x === b));
   272	  ['explore', 'game', 'teacher'].forEach(t => $('tab-' + t).classList.toggle('hidden', t !== b.dataset.tab));
   273	}));
   274	
   275	// ---------- teacher prompt ----------
   276	$('promptBox').value = load('prompt', '') || DEFAULT_PROMPT;
   277	$('savePrompt').addEventListener('click', () => { store('prompt', $('promptBox').value.trim()); $('promptStatus').textContent = 'Saved in this browser.'; });
   278	$('resetPrompt').addEventListener('click', () => { $('promptBox').value = DEFAULT_PROMPT; store('prompt', ''); $('promptStatus').textContent = 'Back to default.'; });
   279	function systemPrompt() {
   280	  return (load('prompt', '') || DEFAULT_PROMPT).replace('{lang}', $('lang').value).replace('{level}', $('level').value);
   281	}
   282	
   283	// ---------- the AI call: any OpenAI-compatible /chat/completions ----------
   284	const unpaid = new Set();
   285	async function callAI(word, statusEl) {
   286	  const key = $('apiKey').value.trim();
   287	  if (!key) throw new Error('Please paste your API key in Settings (free key: openrouter.ai/keys).');
   288	  const base = $('baseUrl').value.trim().replace(/\/+$/, '');
   289	  const models = $('model').value.split(',').map(m => m.trim()).filter(Boolean);
   290	  let lastErr = null;
   291	  for (const model of models) {
   292	    if (unpaid.has(model)) continue;
   293	    for (let attempt = 0; attempt < 2; attempt++) {
   294	      statusEl.textContent = 'Thinking with ' + model + '…';
   295	      const body = { model, temperature: 0.9, messages: [{ role: 'system', content: systemPrompt() }, { role: 'user', content: 'Word: ' + word }] };
   296	      let r, data;
   297	      try {
   298	        r = await fetch(base + '/chat/completions', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key, 'X-Title': 'Irony Mirror (AILT9004)' }, body: JSON.stringify(body) });
   299	        data = await r.json().catch(() => ({}));
   300	      } catch (e) { lastErr = new Error('Network error: ' + e.message); break; }
   301	      if (r.ok && data.choices && data.choices[0]) {
   302	        const c = data.choices[0].message.content;
   303	        const text = Array.isArray(c) ? c.map(p => p.text || '').join('') : (c || '');
   304	        const parsed = parseJSON(text);
   305	        if (parsed) return parsed;
   306	        lastErr = new Error('The model did not return valid JSON; trying again.');
   307	        continue;
   308	      }
   309	      lastErr = new Error((data.error && (data.error.message || data.error)) ? (data.error.message || JSON.stringify(data.error)) : 'HTTP ' + r.status);
   310	      const msg = lastErr.message;
   311	      if (r.status === 402 || /credit|insufficient|payment/i.test(msg)) { unpaid.add(model); break; }
   312	      if (r.status === 403 || /region|billing address|not have access|not available in/i.test(msg)) { unpaid.add(model); break; }
   313	      if (![429, 502, 503, 404].includes(r.status)) throw lastErr;
   314	      await new Promise(res => setTimeout(res, 1500));
   315	    }
   316	  }
   317	  throw lastErr || new Error('No model available.');
   318	}
   319	function parseJSON(text) {
   320	  let t = text.trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
   321	  const a = t.indexOf('{'), b = t.lastIndexOf('}');
   322	  if (a < 0 || b < 0) return null;
   323	  try { const o = JSON.parse(t.slice(a, b + 1)); return (o && o.sceneA && o.sceneB) ? o : null; } catch (e) { return null; }
   324	}
   325	
   326	// ---------- pictures ----------
   327	// Pollinations: a plain URL is the whole API.
   328	//  - with a free key: GET https://gen.pollinations.ai/image/{prompt}?model=…  (Authorization: Bearer pk_…) -> we fetch it and show the blob
   329	//  - anonymous:       GET https://image.pollinations.ai/prompt/{prompt}?…       (one queued picture per IP, ~15 s apart, watermark)
   330	let lastPoll = 0;
   331	async function pictureURL(prompt, seed) {
   332	  const p = $('imgProvider').value;
   333	  const full = $('style').value + '. ' + prompt;
   334	  if (p === 'none') return null;
   335	  const pollKey = $('pollKey').value.trim();
   336	  if (p === 'pollinations-key' && pollKey) {
   337	    const key = pollKey;
   338	    const url = 'https://gen.pollinations.ai/image/' + encodeURIComponent(full) + '?width=768&height=512&model=' + encodeURIComponent($('pollModel').value) + '&seed=' + seed + '&safe=true';
   339	    const r = await fetch(url, { headers: { 'Authorization': 'Bearer ' + key } });
   340	    if (!r.ok) { const j = await r.json().catch(() => ({})); throw new Error((j.error && j.error.message) || ('HTTP ' + r.status)); }
   341	    return URL.createObjectURL(await r.blob());
   342	  }
   343	  if (p === 'pollinations' || p === 'pollinations-key') {   // anonymous (also the fallback when no Pollinations key is given)
   344	    const wait = Math.max(0, lastPoll + 15500 - Date.now());
   345	    lastPoll = Date.now() + wait;
   346	    await new Promise(r => setTimeout(r, wait));
   347	    return 'https://image.pollinations.ai/prompt/' + encodeURIComponent(full) + '?width=768&height=512&nologo=true&model=flux&seed=' + seed;
   348	  }
   349	  // Any OpenAI-compatible images endpoint (e.g. a school server, or a provider that allows your account)
   350	  const base = $('imgBase').value.trim().replace(/\/+$/, '');
   351	  const r = await fetch(base + '/images/generations', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + $('imgKey').value.trim() },
   352	    body: JSON.stringify({ model: $('imgModel').value.trim() || 'gpt-image-1', prompt: full, n: 1, size: '1536x1024' }) });
   353	  const data = await r.json().catch(() => ({}));
   354	  if (!r.ok) throw new Error((data.error && data.error.message) || 'HTTP ' + r.status);
   355	  const d = data.data && data.data[0];
   356	  return d.url || ('data:image/png;base64,' + d.b64_json);
   357	}
   358	async function showPicture(el, prompt, seed) {
   359	  el.textContent = $('imgProvider').value === 'none' ? 'Pictures are off (Settings). Copy the prompt into any image tool.' : 'Drawing… (about 15–45 s)';
   360	  try {

 succeeded in 0ms:
     1	<!DOCTYPE html>
     2	<html lang="en">
     3	<head>
     4	<meta charset="utf-8">
     5	<meta name="viewport" content="width=device-width, initial-scale=1">
     6	<title>Irony Mirror 反諷鏡</title>
     7	<style>
     8	  :root { --ink:#1f2a24; --cream:#faf6ee; --green:#3E724F; --coral:#b3402f; --muted:#6b7570; --card:#ffffff; --line:#e2dccd; --sand:#f4f1e8; }
     9	  * { box-sizing: border-box; }
    10	  body { margin:0; font-family: -apple-system, "Segoe UI", Roboto, "Noto Sans", "PingFang HK", "Microsoft JhengHei", sans-serif; background:var(--cream); color:var(--ink); }
    11	  header { background:var(--green); color:#fff; padding:12px 20px; display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap; }
    12	  header h1 { font-size:20px; margin:0; font-weight:600; }
    13	  header h1 small { font-weight:400; opacity:.8; font-size:13px; margin-left:8px; }
    14	  header .tabs button, header #toggleSettings { background:rgba(255,255,255,.15); color:#fff; border:0; border-radius:6px; padding:6px 12px; cursor:pointer; font-weight:600; }
    15	  header .tabs button.on { background:#fff; color:var(--green); }
    16	  main { max-width:980px; margin:0 auto; padding:16px; }
    17	  .panel { background:var(--card); border:1px solid var(--line); border-radius:10px; padding:14px 16px; margin-bottom:14px; }
    18	  .hidden { display:none !important; }
    19	  .row { display:grid; grid-template-columns: 170px 1fr; gap:8px 12px; align-items:center; margin-bottom:8px; }
    20	  .row label { font-size:14px; color:var(--muted); }
    21	  .row input, .row select, .row textarea { width:100%; padding:7px 9px; border:1px solid var(--line); border-radius:6px; font-size:14px; font-family:inherit; }
    22	  .hint { font-size:12px; color:var(--muted); margin:4px 0 0; line-height:1.4; }
    23	  .ask { display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
    24	  .ask input { flex:1; min-width:200px; padding:10px 12px; border:1px solid var(--line); border-radius:8px; font-size:17px; }
    25	  button.act { background:var(--green); color:#fff; border:0; border-radius:8px; padding:10px 16px; font-size:15px; cursor:pointer; }
    26	  button.act:disabled { opacity:.5; cursor:default; }
    27	  button.ghost { background:var(--sand); color:var(--ink); border:1px solid var(--line); border-radius:6px; padding:5px 10px; font-size:13px; cursor:pointer; }
    28	  .chips { display:flex; gap:6px; flex-wrap:wrap; margin-top:8px; }
    29	  .chips button { background:var(--sand); border:1px solid var(--line); border-radius:14px; padding:4px 10px; font-size:13px; cursor:pointer; }
    30	  .status { font-size:13px; color:var(--muted); margin-top:8px; min-height:18px; }
    31	  .status.err { color:var(--coral); }
    32	  .pair { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
    33	  @media (max-width:700px) { .pair { grid-template-columns:1fr; } .row { grid-template-columns:1fr; } }
    34	  .face { border:1px solid var(--line); border-radius:10px; overflow:hidden; background:#fff; display:flex; flex-direction:column; }
    35	  .face .label { padding:8px 12px; font-size:12px; letter-spacing:1px; font-weight:700; text-transform:uppercase; }
    36	  .face.sincere .label { background:#e5efe8; color:var(--green); }
    37	  .face.ironic .label { background:#f6e3df; color:var(--coral); }
    38	  .face .pic { position:relative; background:var(--sand); aspect-ratio:3/2; display:flex; align-items:center; justify-content:center; color:var(--muted); font-size:13px; text-align:center; padding:10px; }
    39	  .face .pic img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
    40	  .face .body { padding:12px 14px; }
    41	  .face .def { font-size:17px; line-height:1.5; margin:0 0 8px; }
    42	  .face .cap { font-size:14px; color:var(--muted); margin:0 0 8px; line-height:1.45; }
    43	  .face .tools { display:flex; gap:6px; flex-wrap:wrap; }
    44	  .gap { border-left:5px solid var(--green); }
    45	  .gap h3 { margin:0 0 6px; font-size:15px; }
    46	  .gap p, .gap li { line-height:1.5; margin:4px 0; }
    47	  .tag { display:inline-block; background:var(--sand); border-radius:10px; padding:2px 8px; font-size:12px; color:var(--muted); margin-left:6px; }
    48	  .safety { background:#fff6e5; border:1px solid #f0d9a8; border-radius:8px; padding:8px 12px; font-size:13px; }
    49	  #cardWrap { text-align:center; }
    50	  #cardWrap svg { max-width:100%; height:auto; border:1px solid var(--line); border-radius:8px; }
    51	  /* game */
    52	  .gamebar { display:flex; gap:10px; align-items:center; flex-wrap:wrap; font-size:14px; }
    53	  .gamebar .score { font-weight:700; color:var(--green); font-size:16px; }
    54	  .choice { cursor:pointer; border:3px solid transparent; }
    55	  .choice:hover { border-color:#cfd9d2; }
    56	  .choice.picked { border-color:var(--green); }
    57	  .choice.wrong { border-color:var(--coral); }
    58	  .choice .label { background:var(--sand); color:var(--muted); }
    59	  textarea.wide { width:100%; min-height:70px; padding:8px; border:1px solid var(--line); border-radius:6px; font-size:14px; font-family:inherit; }
    60	  #promptBox { min-height:260px; font-family: ui-monospace, Menlo, monospace; font-size:12.5px; line-height:1.4; }
    61	  footer { text-align:center; font-size:12px; color:var(--muted); padding:16px; }
    62	  .hist { display:flex; gap:6px; flex-wrap:wrap; align-items:center; font-size:13px; color:var(--muted); }
    63	</style>
    64	</head>
    65	<body>
    66	<header>
    67	  <h1>Irony Mirror <small>反諷鏡 · one word, two faces</small></h1>
    68	  <div class="tabs">
    69	    <button data-tab="explore" class="on">Explore</button>
    70	    <button data-tab="game">Game: Spot the irony</button>
    71	    <button data-tab="teacher">Teacher</button>
    72	    <button id="toggleSettings">Settings</button>
    73	  </div>
    74	</header>
    75	<main>
    76	
    77	<!-- ============ Settings ============ -->
    78	<section id="settings" class="panel hidden">
    79	  <div class="row"><label>Model preset</label>
    80	    <select id="preset">
    81	      <option value="https://openrouter.ai/api/v1|inclusionai/ling-3.0-flash-fin:free, nvidia/nemotron-3-super-120b-a12b:free, nex-agi/nex-n2.5-pro:free">OpenRouter (free models, works in Hong Kong)</option>
    82	      <option value="https://openrouter.ai/api/v1|qwen/qwen3-max, moonshotai/kimi-k2.6, deepseek/deepseek-v4">OpenRouter Premium (needs credit; better Chinese)</option>
    83	      <option value="custom">Custom (any OpenAI-compatible endpoint)</option>
    84	    </select></div>
    85	  <div class="row"><label>API key</label><input id="apiKey" type="password" placeholder="paste your key from openrouter.ai/keys"></div>
    86	  <div class="row"><label>Base URL</label><input id="baseUrl" value="https://openrouter.ai/api/v1"></div>
    87	  <div class="row"><label>Model(s)</label><input id="model" value="inclusionai/ling-3.0-flash-fin:free, nvidia/nemotron-3-super-120b-a12b:free, nex-agi/nex-n2.5-pro:free"></div>
    88	  <div class="row"><label>Output language</label>
    89	    <select id="lang">
    90	      <option value="Traditional Chinese written standard Chinese 書面語 as in Hong Kong textbooks — NOT Cantonese colloquial: never use 嘅 係 喺 緊 嗰 冇 咗 啲 佢 乜 點解 邊度; use 的 是 在 正在 那 沒有 了 些 他/她 什麼 為什麼 哪裏">Chinese 中文（書面語）</option>
    91	      <option value="Cantonese colloquial written Chinese 粵語口語 (Hong Kong), using 嘅 係 喺 緊 佢 naturally">Cantonese 粵語（口語）</option>
    92	      <option value="English">English</option>
    93	    </select></div>
    94	  <div class="row"><label>Learner level</label>
    95	    <select id="level">
    96	      <option>Primary 5–6 (age 10–12)</option>
    97	      <option selected>Secondary 3–4 (age 14–16)</option>
    98	      <option>Secondary 5–6 (age 16–18)</option>
    99	      <option>University / adult</option>
   100	    </select></div>
   101	  <div class="row"><label>Image provider</label>
   102	    <select id="imgProvider">
   103	      <option value="pollinations-key">Pollinations with a free key (recommended: better pictures, no watermark, no queue)</option>
   104	      <option value="pollinations">Pollinations anonymous (no key; one picture at a time per network, watermark)</option>
   105	      <option value="openai">Any OpenAI-compatible /images/generations endpoint</option>
   106	      <option value="none">No pictures — text and card only</option>
   107	    </select></div>
   108	  <div class="row" id="pollRow"><label>Pollinations key / model</label>
   109	    <div style="display:flex; gap:6px; flex-wrap:wrap"><input id="pollKey" type="password" placeholder="pk_… from enter.pollinations.ai/keys (free sign-up)" style="flex:2">
   110	      <select id="pollModel" style="flex:1; padding:7px; border:1px solid var(--line); border-radius:6px">
   111	        <option value="zimage">zimage (fast, free tier)</option>
   112	        <option value="flux">flux (free tier)</option>
   113	        <option value="klein">flux-2-klein (free tier)</option>
   114	        <option value="gptimage">gpt-image-1-mini</option>
   115	        <option value="openai/gpt-image-2.5-flare">gpt-image-2.5-flare (paid pollen)</option>
   116	        <option value="nanobanana2">gemini-3.1-flash-image (paid pollen)</option>
   117	      </select></div></div>
   118	  <div class="row hidden" id="imgRow"><label>Images base URL / key / model</label>
   119	    <div style="display:flex; gap:6px; flex-wrap:wrap"><input id="imgBase" placeholder="https://your-server/v1" style="flex:2"><input id="imgKey" type="password" placeholder="key" style="flex:1"><input id="imgModel" placeholder="model id" style="flex:1"></div></div>
   120	  <div class="row"><label>Picture style</label><input id="style" value="warm watercolor illustration, soft ink outlines, muted colours, everyday Hong Kong setting, no text or letters anywhere"></div>
   121	  <p class="hint">Your keys are stored only in this browser (localStorage). Never share the file with a key typed in. Free OpenRouter models: 50 requests a day, and your prompts may be used for training, so never type real names. Pictures come from Pollinations.ai. With a free key (sign up at enter.pollinations.ai with GitHub or Google, create a <i>publishable</i> key) you get a weekly allowance that covers hundreds of small pictures, better models and no watermark. Without a key the old anonymous endpoint still works, but only one picture at a time per network address and with a watermark. If pictures fail, use <b>Copy prompt</b> and paste it into any image tool you have (for example the Gemini app).</p>
   122	</section>
   123	
   124	<!-- ============ Explore ============ -->
   125	<section id="tab-explore">
   126	  <div class="panel">
   127	    <div class="ask">
   128	      <input id="word" placeholder="Type one word or value, e.g. 孝順 · honesty · 環保" maxlength="20">
   129	      <button class="act" id="go">Mirror it</button>
   130	    </div>
   131	    <div class="chips" id="chips"></div>
   132	    <div class="status" id="status"></div>
   133	    <div class="hist" id="hist"></div>
   134	  </div>
   135	
   136	  <div id="result" class="hidden">
   137	    <div class="pair">
   138	      <div class="face sincere">
   139	        <div class="label">Face A · as it should be 正面</div>
   140	        <div class="pic" id="picA">picture</div>
   141	        <div class="body"><p class="def" id="defA"></p><p class="cap" id="capA"></p>
   142	          <div class="tools"><button class="ghost" data-copy="A">Copy prompt</button><button class="ghost" data-regen="A">New picture</button></div></div>
   143	      </div>
   144	      <div class="face ironic">
   145	        <div class="label">Face B · the irony 反諷</div>
   146	        <div class="pic" id="picB">picture</div>
   147	        <div class="body"><p class="def" id="defB"></p><p class="cap" id="capB"></p>
   148	          <div class="tools"><button class="ghost" data-copy="B">Copy prompt</button><button class="ghost" data-regen="B">New picture</button></div></div>
   149	      </div>
   150	    </div>
   151	
   152	    <div class="panel gap" style="margin-top:14px">
   153	      <h3>The gap 落差 <span class="tag" id="ironyType"></span></h3>
   154	      <p id="gapText"></p>
   155	      <h3 style="margin-top:10px">Talk about it</h3>
   156	      <ol id="questions"></ol>
   157	      <h3>Now you write one 試寫一句反諷</h3>
   158	      <p id="modelSentence" style="font-style:italic"></p>
   159	      <textarea class="wide" id="student" placeholder="Write your own ironic sentence about this word…"></textarea>
   160	      <div id="safety" class="safety hidden"></div>
   161	    </div>
   162	
   163	    <div class="panel" id="cardWrap">
   164	      <div id="card"></div>
   165	      <div style="margin-top:8px; display:flex; gap:8px; justify-content:center; flex-wrap:wrap">
   166	        <button class="ghost" id="dlCard">Download card (PNG)</button>
   167	        <button class="ghost" id="dlJson">Save result (JSON)</button>
   168	        <button class="ghost" id="printSheet">Print worksheet</button>
   169	      </div>
   170	      <p class="hint">The card is drawn by your browser (SVG), so it costs nothing and never fails. The pictures above are the new part: an image model reads the prompt the AI wrote.</p>
   171	    </div>
   172	  </div>
   173	</section>
   174	
   175	<!-- ============ Game ============ -->
   176	<section id="tab-game" class="hidden">
   177	  <div class="panel">
   178	    <div class="gamebar">
   179	      <label>Words (comma-separated):</label>
   180	      <input id="gameWords" style="flex:1; min-width:220px; padding:7px; border:1px solid var(--line); border-radius:6px" value="孝順, 誠實, 環保, 友誼, 勤奮, 禮貌">

exec
/bin/zsh -lc 'rg -n "innerHTML|localStorage|JSON|URL.createObjectURL|setTimeout|setInterval|pollinations|print|svg|download|cache|sceneB|questions|game|teacher|sanitize|escape" irony-mirror.html README.md BUILD-IT-YOURSELF.md' in /Users/chinhsi/Google Drive/HKU/Courses/2026 09/AILT9004/Materials/Prototypes/04-irony-mirror
 succeeded in 0ms:
BUILD-IT-YOURSELF.md:9:- Settings panel: API key (password field, saved in localStorage), base URL (default https://openrouter.ai/api/v1), comma-separated model list (default "inclusionai/ling-3.0-flash-fin:free, nvidia/nemotron-3-super-120b-a12b:free"), output language (Traditional Chinese written / Cantonese colloquial / English), learner level, picture style text.
BUILD-IT-YOURSELF.md:10:- Send ONE request to {baseUrl}/chat/completions (OpenAI-compatible, Bearer key) with a system prompt that asks for a JSON object: word, sincere (one-sentence meaning), ironic (one witty redefinition, max 40 characters, in the spirit of 錢鍾書 / Oscar Wilde), sceneA {caption, imagePrompt}, sceneB {caption, imagePrompt} where B is a visible contradiction between words and actions, ironyType (verbal/situational/dramatic), gap (one sentence), questions (3), modelSentence, safetyNote. Tell the model: no real people, no ethnic/religious/gender/disability targets — mock behaviours, not groups. imagePrompt must be English and say "no text in image".
BUILD-IT-YOURSELF.md:11:- Parse the JSON leniently (strip code fences). If the API returns 429/502/503, wait 1.5 s and retry once, then try the next model.
BUILD-IT-YOURSELF.md:12:- Show two cards side by side (Face A, Face B) with caption and picture. Pictures come from Pollinations: set the img src to https://image.pollinations.ai/prompt/{URL-encoded prompt + style}?width=768&height=512&seed=N&model=flux . Queue the two pictures 15 seconds apart because anonymous use is rate-limited. Add "New picture" (new seed) and "Copy prompt" buttons.
BUILD-IT-YOURSELF.md:13:- Below: the gap, the irony type, the three questions, the model sentence, and a textarea where the student writes their own ironic sentence.
BUILD-IT-YOURSELF.md:14:- Draw a simple card as inline SVG (word large, ironic line under a red rule, irony type small) and a button that downloads it as PNG via canvas.
BUILD-IT-YOURSELF.md:16:- Add a "Teacher" tab with the system prompt in a textarea (editable, saved in localStorage, reset button).
BUILD-IT-YOURSELF.md:17:- Cache the last results in localStorage so re-showing a word costs no API call.
README.md:3:**What it does:** type one word or value — 孝順, honesty, 環保, punctuality — and the page shows its **two faces**: Face A, the value done sincerely; Face B, the irony, where what people *say* and what they *do* don't match. Each face gets a caption, a picture, and the page names the **gap** (verbal / situational / dramatic irony), asks three discussion questions, gives one model sentence, and leaves a box for the student to write their own ironic sentence. A **Game** tab turns it into *Spot the irony*: pairs pick the ironic picture and write the gap in one sentence. A **Teacher** tab shows the prompt that does all of this — that prompt *is* the lesson plan.
README.md:7:**Tool used:** one HTML file (≈530 lines). Text: any OpenAI-compatible API, by default OpenRouter's free models (work from Hong Kong). Pictures: [Pollinations.ai](https://pollinations.ai), an image service addressed by URL — the picture *is* a URL. With a free Pollinations key (sign up with GitHub or Google at <https://enter.pollinations.ai>) you get a weekly allowance that covers hundreds of small pictures on open models such as `zimage` and `flux`, no watermark, and even GPT-Image-2.5 if you buy credit; without a key the page falls back to the old anonymous endpoint (watermark, one picture at a time per network). No server, no install, no framework.
README.md:13:3. Paste the key in **Settings**. Choose the output language (written Chinese, Cantonese, or English) and the learner level. Optional but recommended: a free Pollinations key (<https://enter.pollinations.ai/keys> → create a *front-end / publishable* key) in the *Pollinations key* box — pictures then come faster, cleaner and without a shared queue.
README.md:17:The key is saved only inside your browser (localStorage). The file itself never contains a key.
README.md:21:- **Teacher tab** → edit the prompt. Gentler tone for Primary? Five questions instead of three? Only situational irony? Change the text, press *Save*, mirror a word again.
irony-mirror.html:50:  #cardWrap svg { max-width:100%; height:auto; border:1px solid var(--line); border-radius:8px; }
irony-mirror.html:51:  /* game */
irony-mirror.html:52:  .gamebar { display:flex; gap:10px; align-items:center; flex-wrap:wrap; font-size:14px; }
irony-mirror.html:53:  .gamebar .score { font-weight:700; color:var(--green); font-size:16px; }
irony-mirror.html:70:    <button data-tab="game">Game: Spot the irony</button>
irony-mirror.html:71:    <button data-tab="teacher">Teacher</button>
irony-mirror.html:103:      <option value="pollinations-key">Pollinations with a free key (recommended: better pictures, no watermark, no queue)</option>
irony-mirror.html:104:      <option value="pollinations">Pollinations anonymous (no key; one picture at a time per network, watermark)</option>
irony-mirror.html:109:    <div style="display:flex; gap:6px; flex-wrap:wrap"><input id="pollKey" type="password" placeholder="pk_… from enter.pollinations.ai/keys (free sign-up)" style="flex:2">
irony-mirror.html:121:  <p class="hint">Your keys are stored only in this browser (localStorage). Never share the file with a key typed in. Free OpenRouter models: 50 requests a day, and your prompts may be used for training, so never type real names. Pictures come from Pollinations.ai. With a free key (sign up at enter.pollinations.ai with GitHub or Google, create a <i>publishable</i> key) you get a weekly allowance that covers hundreds of small pictures, better models and no watermark. Without a key the old anonymous endpoint still works, but only one picture at a time per network address and with a watermark. If pictures fail, use <b>Copy prompt</b> and paste it into any image tool you have (for example the Gemini app).</p>
irony-mirror.html:156:      <ol id="questions"></ol>
irony-mirror.html:167:        <button class="ghost" id="dlJson">Save result (JSON)</button>
irony-mirror.html:168:        <button class="ghost" id="printSheet">Print worksheet</button>
irony-mirror.html:176:<section id="tab-game" class="hidden">
irony-mirror.html:178:    <div class="gamebar">
irony-mirror.html:180:      <input id="gameWords" style="flex:1; min-width:220px; padding:7px; border:1px solid var(--line); border-radius:6px" value="孝順, 誠實, 環保, 友誼, 勤奮, 禮貌">
irony-mirror.html:186:  <div id="gameRound" class="hidden">
irony-mirror.html:187:    <div class="panel gamebar">
irony-mirror.html:189:      <span>Word: <b id="gameWord"></b></span>
irony-mirror.html:194:    <div class="pair" id="gamePair">
irony-mirror.html:198:    <div class="panel" id="gameAnswer" style="margin-top:14px">
irony-mirror.html:199:      <p id="gameVerdict" style="font-weight:600; margin:0 0 6px"></p>
irony-mirror.html:201:      <textarea class="wide" id="gameGap"></textarea>
irony-mirror.html:203:      <div id="gameReveal" class="hidden" style="margin-top:8px"></div>
irony-mirror.html:206:  <div id="gameEnd" class="panel hidden"></div>
irony-mirror.html:210:<section id="tab-teacher" class="hidden">
irony-mirror.html:213:    <p class="hint" style="margin-bottom:8px">Everything the AI does comes from this text. Change the tone (gentler for Primary), the number of questions, the irony types, or the image style. The words <code>{lang}</code> and <code>{level}</code> are filled from Settings. Blank = default.</p>
irony-mirror.html:222:      <li>Students write one ironic sentence (box under the questions); read three aloud.</li>
irony-mirror.html:234:const store = (k, v) => { try { localStorage.setItem('im_' + k, v); } catch (e) {} };
irony-mirror.html:235:const load = (k, d) => { try { return localStorage.getItem('im_' + k) ?? d; } catch (e) { return d; } };
irony-mirror.html:238:const DEFAULT_PROMPT = `You are "Irony Mirror", a witty but humane writing coach for language classrooms in Hong Kong. The teacher gives you ONE word or value (e.g. 孝順, honesty, punctuality).
irony-mirror.html:240:Produce a JSON object with exactly these keys:
irony-mirror.html:246: "sceneB": {"caption": one short sentence describing the ironic scene where words claim the value and actions show the opposite, "imagePrompt": English prompt for the SAME setting and people as sceneA, but now the claim is visible as a symbol (a glowing heart icon on a phone, a medal, a banner, a thumbs-up) while the action in the foreground shows the opposite; describe exactly two figures, their body language and where each is looking, so the contradiction is visible without words; no text in the image},
irony-mirror.html:249: "questions": [3 short discussion questions suited to the level],
irony-mirror.html:251: "safetyNote": "" or a one-line note for the teacher if the word could hurt someone in the room
irony-mirror.html:253:Output ONLY the JSON object. No code fences, no commentary.`;
irony-mirror.html:256:['apiKey', 'baseUrl', 'model', 'lang', 'level', 'imgProvider', 'pollKey', 'pollModel', 'imgBase', 'imgKey', 'imgModel', 'style', 'gameWords'].forEach(id => {
irony-mirror.html:264:function providerRows() { const p = $('imgProvider').value; $('imgRow').classList.toggle('hidden', p !== 'openai'); $('pollRow').classList.toggle('hidden', p !== 'pollinations-key'); }
irony-mirror.html:272:  ['explore', 'game', 'teacher'].forEach(t => $('tab-' + t).classList.toggle('hidden', t !== b.dataset.tab));
irony-mirror.html:275:// ---------- teacher prompt ----------
irony-mirror.html:298:        r = await fetch(base + '/chat/completions', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key, 'X-Title': 'Irony Mirror (AILT9004)' }, body: JSON.stringify(body) });
irony-mirror.html:304:        const parsed = parseJSON(text);
irony-mirror.html:306:        lastErr = new Error('The model did not return valid JSON; trying again.');
irony-mirror.html:309:      lastErr = new Error((data.error && (data.error.message || data.error)) ? (data.error.message || JSON.stringify(data.error)) : 'HTTP ' + r.status);
irony-mirror.html:314:      await new Promise(res => setTimeout(res, 1500));
irony-mirror.html:319:function parseJSON(text) {
irony-mirror.html:323:  try { const o = JSON.parse(t.slice(a, b + 1)); return (o && o.sceneA && o.sceneB) ? o : null; } catch (e) { return null; }
irony-mirror.html:328://  - with a free key: GET https://gen.pollinations.ai/image/{prompt}?model=…  (Authorization: Bearer pk_…) -> we fetch it and show the blob
irony-mirror.html:329://  - anonymous:       GET https://image.pollinations.ai/prompt/{prompt}?…       (one queued picture per IP, ~15 s apart, watermark)
irony-mirror.html:336:  if (p === 'pollinations-key' && pollKey) {
irony-mirror.html:338:    const url = 'https://gen.pollinations.ai/image/' + encodeURIComponent(full) + '?width=768&height=512&model=' + encodeURIComponent($('pollModel').value) + '&seed=' + seed + '&safe=true';
irony-mirror.html:341:    return URL.createObjectURL(await r.blob());
irony-mirror.html:343:  if (p === 'pollinations' || p === 'pollinations-key') {   // anonymous (also the fallback when no Pollinations key is given)
irony-mirror.html:346:    await new Promise(r => setTimeout(r, wait));
irony-mirror.html:347:    return 'https://image.pollinations.ai/prompt/' + encodeURIComponent(full) + '?width=768&height=512&nologo=true&model=flux&seed=' + seed;
irony-mirror.html:352:    body: JSON.stringify({ model: $('imgModel').value.trim() || 'gpt-image-1', prompt: full, n: 1, size: '1536x1024' }) });
irony-mirror.html:373:$('chips').innerHTML = EXAMPLES.map(w => `<button>${w}</button>`).join('');
irony-mirror.html:378:const cache = JSON.parse(load('cache', '{}'));
irony-mirror.html:379:function remember(word, obj) { cache[word] = obj; const keys = Object.keys(cache); while (keys.length > 12) delete cache[keys.shift()]; store('cache', JSON.stringify(cache)); renderHist(); }
irony-mirror.html:381:  const k = Object.keys(cache);
irony-mirror.html:382:  $('hist').innerHTML = k.length ? 'Recent (no API call): ' + k.map(w => `<button class="ghost" data-w="${w}">${w}</button>`).join('') : '';
irony-mirror.html:384:$('hist').addEventListener('click', e => { const w = e.target.dataset.w; if (w) { $('word').value = w; render(cache[w]); } });
irony-mirror.html:392:    const obj = cache[word] || await callAI(word, $('status'));
irony-mirror.html:403:  $('defB').textContent = '「' + (o.ironic || '') + '」'; $('capB').textContent = o.sceneB.caption || '';
irony-mirror.html:406:  $('questions').innerHTML = (o.questions || []).map(q => `<li>${esc(q)}</li>`).join('');
irony-mirror.html:412:  showPicture($('picB'), o.sceneB.imagePrompt, seeds.B);
irony-mirror.html:417:  navigator.clipboard.writeText(p).then(() => { b.textContent = 'Copied'; setTimeout(() => b.textContent = 'Copy prompt', 1500); });
irony-mirror.html:437:  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="'Noto Serif CJK TC','Songti TC','PingFang HK','Microsoft JhengHei',serif">
irony-mirror.html:446:</svg>`;
irony-mirror.html:447:  $('card').innerHTML = svg;
irony-mirror.html:450:  const svg = $('card').querySelector('svg'); if (!svg) return;
irony-mirror.html:451:  const xml = new XMLSerializer().serializeToString(svg);
irony-mirror.html:454:    const c = document.createElement('canvas'); c.width = svg.width.baseVal.value * 2; c.height = svg.height.baseVal.value * 2;
irony-mirror.html:456:    const a = document.createElement('a'); a.download = 'irony-' + (current ? current.word : 'card') + '.png'; a.href = c.toDataURL('image/png'); a.click();
irony-mirror.html:458:  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml);
irony-mirror.html:462:  const a = document.createElement('a'); a.download = 'irony-' + current.word + '.json';
irony-mirror.html:463:  a.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(current, null, 2)); a.click();
irony-mirror.html:465:$('printSheet').addEventListener('click', () => {
irony-mirror.html:470:  <p><b>Face A:</b> ${esc(o.sceneA.caption)}</p><p><b>Face B:</b> ${esc(o.sceneB.caption)}</p>
irony-mirror.html:474:  <p>4. Discuss: ${(o.questions || []).map(esc).join(' / ')}</p>
irony-mirror.html:475:  <p><small>Model answer (teacher): ${esc(o.gap)} · ${esc(o.modelSentence)}</small></p></body></html>`);
irony-mirror.html:476:  w.document.close(); w.print();
irony-mirror.html:479:// ---------- game: spot the irony ----------
irony-mirror.html:482:  const words = $('gameWords').value.split(/[,，]/).map(w => w.trim()).filter(Boolean);
irony-mirror.html:486:  $('gameEnd').classList.add('hidden'); $('gameRound').classList.remove('hidden');
irony-mirror.html:491:  $('roundNo').textContent = G.i + 1; $('gameWord').textContent = word;
irony-mirror.html:492:  $('gameVerdict').textContent = ''; $('gameGap').value = ''; $('gameReveal').classList.add('hidden'); $('nextRound').classList.add('hidden'); $('reveal').disabled = false;
irony-mirror.html:496:    G.data = cache[word] || await callAI(word, $('gstatus'));
irony-mirror.html:501:  const A = G.data.sceneA, B = G.data.sceneB;
irony-mirror.html:509:    tick = setInterval(() => { t--; $('timeLeft').textContent = t; if (t <= 0) { clearInterval(tick); if (G.picked === null) judge(null); } }, 1000);
irony-mirror.html:519:  $('gameVerdict').textContent = side ? (right ? 'Yes — that is the irony. Now say why:' : 'Not that one. The irony is the highlighted picture. Say what the gap is:') : 'Time is up. The irony is the highlighted picture. Say what the gap is:';
irony-mirror.html:524:  $('gameReveal').innerHTML = `<p><b>The AI's gap:</b> ${esc(o.gap)} <span class="tag">${esc(o.ironyType)} irony</span></p><p><b>Your sentence:</b> ${esc($('gameGap').value || '—')}</p><p><b>Ironic redefinition:</b> 「${esc(o.ironic)}」</p><p class="hint">Do you agree with the AI? People decide what counts as irony, not the score.</p>`;
irony-mirror.html:525:  $('gameReveal').classList.remove('hidden'); $('reveal').disabled = true; $('nextRound').classList.remove('hidden');
irony-mirror.html:530:    $('gameRound').classList.add('hidden');
irony-mirror.html:532:    $('gameEnd').innerHTML = `<h3 style="margin:0 0 6px">Finished: ${G.score} / ${G.words.length} pictures spotted</h3><p>Best on this computer: ${best}. Spotting is the easy part; the sentences you wrote are the real work. Read them aloud.</p>`;
irony-mirror.html:533:    $('gameEnd').classList.remove('hidden');

codex
A few themes are emerging: the basic rendering is sensibly escaped in the main lesson view, but the cache/history path and async image loading are much shakier. I’m also seeing a docs/code mismatch around the “fallback” story for keyed Pollinations and a few places where malformed API responses can crash the page instead of becoming teachable errors.
exec
/bin/zsh -lc "nl -ba codex-review-v1.md | sed -n '1,240p'" in /Users/chinhsi/Google Drive/HKU/Courses/2026 09/AILT9004/Materials/Prototypes/04-irony-mirror
 succeeded in 0ms:
     1	OpenAI Codex v0.153.4
     2	--------
     3	workdir: /Users/chinhsi/Google Drive/HKU/Courses/2026 09/AILT9004/Materials/Prototypes/04-irony-mirror
     4	model: gpt-5.5
     5	provider: openai
     6	approval: never
     7	sandbox: read-only
     8	reasoning effort: medium
     9	reasoning summaries: none
    10	session id: 01a0944a-78e2-7331-a2dd-644bdbba3f3a
    11	--------
    12	user
    13	You are reviewing irony-mirror.html, a single-file teaching prototype for a Hong Kong teacher-education course (students are language teachers with no programming background). It must stay one self-contained HTML file with no build step, working from file:// and GitHub Pages. Text comes from any OpenAI-compatible /chat/completions endpoint (OpenRouter free models by default); pictures come from Pollinations (gen.pollinations.ai with a Bearer key via fetch->blob, or the anonymous image.pollinations.ai URL as fallback, ~1 request per 15 s per IP). Also read README.md and BUILD-IT-YOURSELF.md in this folder. Review critically: (1) Bugs and edge cases in the JavaScript (state handling across tabs, cache, game rounds, timers, blob URLs, localStorage failures, JSON parsing, XSS via model output injected into innerHTML or the SVG card, print window). (2) Robustness against flaky free APIs (429/402/403/401, malformed JSON, missing fields such as questions or sceneB). (3) Classroom usability: is anything confusing for a non-technical teacher; are error messages actionable. (4) Pedagogy and ethics of the default prompt: could it produce hurtful content, is the safety framing adequate, is the irony scaffold sound for Secondary 3-4 Chinese/English classes. (5) README accuracy against the code. Output in English markdown: a short overall verdict, then a prioritized Top-10 list with line references and concrete fixes. Be specific; quote the code.
    14	codex
    15	I’ll review this in code-review mode and cross-check the docs against the actual single-file behavior. I’m going to read the HTML plus the two docs first, then trace the risk areas you named with line references.
    16	exec
    17	/bin/zsh -lc 'wc -l irony-mirror.html README.md BUILD-IT-YOURSELF.md' in /Users/chinhsi/Google Drive/HKU/Courses/2026 09/AILT9004/Materials/Prototypes/04-irony-mirror
    18	exec
    19	/bin/zsh -lc "sed -n '1,220p' README.md" in /Users/chinhsi/Google Drive/HKU/Courses/2026 09/AILT9004/Materials/Prototypes/04-irony-mirror
    20	 succeeded in 0ms:
    21	     540 irony-mirror.html
    22	      37 README.md
    23	      22 BUILD-IT-YOURSELF.md
    24	     599 total
    25	
    26	 succeeded in 0ms:
    27	# Prototype 4 — Irony Mirror 反諷鏡 (one HTML file that also makes pictures)
    28	
    29	**What it does:** type one word or value — 孝順, honesty, 環保, punctuality — and the page shows its **two faces**: Face A, the value done sincerely; Face B, the irony, where what people *say* and what they *do* don't match. Each face gets a caption, a picture, and the page names the **gap** (verbal / situational / dramatic irony), asks three discussion questions, gives one model sentence, and leaves a box for the student to write their own ironic sentence. A **Game** tab turns it into *Spot the irony*: pairs pick the ironic picture and write the gap in one sentence. A **Teacher** tab shows the prompt that does all of this — that prompt *is* the lesson plan.
    30	
    31	**Where it comes from:** Prof. Lin's earlier web app *Chinnovation* had a 漢語新解 ("new take on a Chinese word") feature: a word went to a server, a workflow called an image service, and a satirical card came back minutes later. In 2025 that needed a login system, a database, credits and a third-party automation. In 2026 the same idea fits in **one HTML file** because (a) any OpenAI-compatible text API can write the irony and the image prompts, and (b) an image model can be called with **a plain URL** — no server in between. The card itself is drawn by the browser (SVG), so it costs nothing and never fails.
    32	
    33	**Tool used:** one HTML file (≈530 lines). Text: any OpenAI-compatible API, by default OpenRouter's free models (work from Hong Kong). Pictures: [Pollinations.ai](https://pollinations.ai), an image service addressed by URL — the picture *is* a URL. With a free Pollinations key (sign up with GitHub or Google at <https://enter.pollinations.ai>) you get a weekly allowance that covers hundreds of small pictures on open models such as `zimage` and `flux`, no watermark, and even GPT-Image-2.5 if you buy credit; without a key the page falls back to the old anonymous endpoint (watermark, one picture at a time per network). No server, no install, no framework.
    34	
    35	## Try it (3 minutes)
    36	
    37	1. Get a free OpenRouter key: <https://openrouter.ai/keys> → sign in with Google or GitHub → **Create key** → copy it (free models: 50 requests a day, no card).
    38	2. Open `irony-mirror.html` in any modern browser (or the hosted copy: <https://chinhsi.github.io/ailt9004-ai-prototypes/04-irony-mirror/irony-mirror.html>).
    39	3. Paste the key in **Settings**. Choose the output language (written Chinese, Cantonese, or English) and the learner level. Optional but recommended: a free Pollinations key (<https://enter.pollinations.ai/keys> → create a *front-end / publishable* key) in the *Pollinations key* box — pictures then come faster, cleaner and without a shared queue.
    40	4. Click a word chip (孝順 …) or type your own and press **Mirror it**. Text arrives in a few seconds; pictures take 15–45 seconds each (the free image service serves anonymous users one picture at a time).
    41	5. Read Face A and Face B before reading the captions. Then read *The gap*. Then write.
    42	
    43	The key is saved only inside your browser (localStorage). The file itself never contains a key.
    44	
    45	## Make it yours
    46	
    47	- **Teacher tab** → edit the prompt. Gentler tone for Primary? Five questions instead of three? Only situational irony? Change the text, press *Save*, mirror a word again.
    48	- **Settings → Picture style**: swap "warm watercolor illustration" for "editorial cartoon" or "Hong Kong comic style". The style is appended to every image prompt.
    49	- **Game words**: paste your own list, e.g. the values in this term's Chinese reader, or English character traits for an English class.
    50	- **Pictures off**: set *Image provider* to *No pictures* and use the SVG card only — that is the 2025 experience, and a good "before/after" for students.
    51	- **Your own image server**: *Image provider → OpenAI-compatible* takes any `/images/generations` endpoint (a school server, or a provider your account can use).
    52	
    53	## Known limits (good discussion material)
    54	
    55	- **The image model does not understand irony.** The text model writes a scene with a clear visual contradiction, but the free image model often draws two people smiling. Ask students: *is Face B actually ironic? What would you change in the prompt?* Press *New picture* (new seed) or *Copy prompt* and paste into a stronger image tool. The gap between what the text AI *wrote* and what the image AI *drew* is itself a lesson about AI.
    56	- **Free picture service, public prompts.** Without a key, Pollinations serves one picture at a time per network address (a whole classroom on the school Wi-Fi shares that queue), adds a small watermark, and prompts may appear in its public feed. A free key removes the queue and the watermark. Either way, never put a real person's name or a student's details into a word.
    57	- **Irony can hurt.** The prompt forbids real people and ethnic, religious, gender or disability targets, and asks the model to mock *behaviours, not groups*; a *Teacher note* appears when a word may be sensitive (family, money, illness). Read it before you show the class. You are the editor.
    58	- Free text models may use your prompts for training; free models are weaker in Cantonese than in written Chinese or English. Choose the *Premium* preset if you have credit.
    59	- Hong Kong reachability of Pollinations has not yet been tested from the HKU network without a VPN (OpenRouter has). If pictures never load on campus, use *Copy prompt* → the Gemini app (free in Hong Kong since March 2026).
    60	
    61	## Build it yourself with the CLI
    62	
    63	Open OpenCode in an empty folder and paste the prompt in `BUILD-IT-YOURSELF.md`. Then compare: did the agent's version name the irony type? Did it remember the rate limit? Did it think about who gets mocked?
    64	
    65	exec
    66	/bin/zsh -lc "sed -n '1,260p' BUILD-IT-YOURSELF.md" in /Users/chinhsi/Google Drive/HKU/Courses/2026 09/AILT9004/Materials/Prototypes/04-irony-mirror
    67	 succeeded in 0ms:
    68	# Build Irony Mirror yourself — prompt for OpenCode
    69	
    70	Open a terminal in an empty folder, run `opencode`, and paste:
    71	
    72	```
    73	Create a single self-contained file irony-mirror.html for a language classroom in Hong Kong: the user types ONE word or value (e.g. 孝順, honesty) and the page shows its "two faces" — the value done sincerely, and the irony (what people say vs what they do).
    74	
    75	Requirements:
    76	- Settings panel: API key (password field, saved in localStorage), base URL (default https://openrouter.ai/api/v1), comma-separated model list (default "inclusionai/ling-3.0-flash-fin:free, nvidia/nemotron-3-super-120b-a12b:free"), output language (Traditional Chinese written / Cantonese colloquial / English), learner level, picture style text.
    77	- Send ONE request to {baseUrl}/chat/completions (OpenAI-compatible, Bearer key) with a system prompt that asks for a JSON object: word, sincere (one-sentence meaning), ironic (one witty redefinition, max 40 characters, in the spirit of 錢鍾書 / Oscar Wilde), sceneA {caption, imagePrompt}, sceneB {caption, imagePrompt} where B is a visible contradiction between words and actions, ironyType (verbal/situational/dramatic), gap (one sentence), questions (3), modelSentence, safetyNote. Tell the model: no real people, no ethnic/religious/gender/disability targets — mock behaviours, not groups. imagePrompt must be English and say "no text in image".
    78	- Parse the JSON leniently (strip code fences). If the API returns 429/502/503, wait 1.5 s and retry once, then try the next model.
    79	- Show two cards side by side (Face A, Face B) with caption and picture. Pictures come from Pollinations: set the img src to https://image.pollinations.ai/prompt/{URL-encoded prompt + style}?width=768&height=512&seed=N&model=flux . Queue the two pictures 15 seconds apart because anonymous use is rate-limited. Add "New picture" (new seed) and "Copy prompt" buttons.
    80	- Below: the gap, the irony type, the three questions, the model sentence, and a textarea where the student writes their own ironic sentence.
    81	- Draw a simple card as inline SVG (word large, ironic line under a red rule, irony type small) and a button that downloads it as PNG via canvas.
    82	- Add a "Game" tab: a list of words; for each word show the two pictures in random order WITHOUT labels; the student clicks the ironic one (score +1), writes the gap in one sentence, then a Reveal button shows the AI's gap. End screen with score.
    83	- Add a "Teacher" tab with the system prompt in a textarea (editable, saved in localStorage, reset button).
    84	- Cache the last results in localStorage so re-showing a word costs no API call.
    85	- Plain CSS, no external libraries, works from file://. Show errors near the input.
    86	Keep it under 500 lines and comment the main functions.
    87	```
    88	
    89	Then test it with 孝順 and with an English word. Ask the agent: "The second picture does not look ironic — rewrite the imagePrompt instructions so the contradiction is visible without words." Finally ask: "Who could be hurt by this tool, and what in the prompt prevents it?"
    90	
    91	exec
    92	/bin/zsh -lc 'rg --files' in /Users/chinhsi/Google Drive/HKU/Courses/2026 09/AILT9004/Materials/Prototypes/04-irony-mirror
    93	 succeeded in 0ms:
    94	BUILD-IT-YOURSELF.md
    95	codex-review-v1.md
    96	README.md
    97	irony-mirror.html
    98	example-output/punctuality.json
    99	example-output/card-孝順.png
   100	example-output/README.md
   101	example-output/screenshot-explore.png
   102	example-output/誠實.json
   103	example-output/孝順.json
   104	
   105	codex
   106	I’ve got the docs. The README makes fairly specific claims about provider options, key handling, rate limits, and safety notes, so I’ll now map those claims to the actual functions and UI paths in the HTML.
   107	exec
   108	/bin/zsh -lc "nl -ba irony-mirror.html | sed -n '181,360p'" in /Users/chinhsi/Google Drive/HKU/Courses/2026 09/AILT9004/Materials/Prototypes/04-irony-mirror
   109	exec
   110	/bin/zsh -lc "nl -ba irony-mirror.html | sed -n '361,560p'" in /Users/chinhsi/Google Drive/HKU/Courses/2026 09/AILT9004/Materials/Prototypes/04-irony-mirror
   111	exec
   112	/bin/zsh -lc "nl -ba irony-mirror.html | sed -n '1,180p'" in /Users/chinhsi/Google Drive/HKU/Courses/2026 09/AILT9004/Materials/Prototypes/04-irony-mirror
   113	 succeeded in 0ms:
   114	   361	    const url = await pictureURL(prompt, seed);
   115	   362	    if (!url) return;
   116	   363	    const img = new Image();
   117	   364	    img.alt = prompt;
   118	   365	    img.onload = () => { el.textContent = ''; el.appendChild(img); };
   119	   366	    img.onerror = () => { el.textContent = 'The picture service is busy (anonymous use allows one picture at a time per network). Wait, press "New picture", get a free key in Settings, or copy the prompt into another tool.'; };
   120	   367	    img.src = url;
   121	   368	  } catch (e) { el.textContent = 'Picture failed: ' + e.message; }
   122	   369	}
   123	   370	
   124	   371	// ---------- explore ----------
   125	   372	const EXAMPLES = ['孝順', '誠實', '環保', '友誼', '勤奮', '禮貌', 'honesty', 'punctuality', 'teamwork', 'generosity'];
   126	   373	$('chips').innerHTML = EXAMPLES.map(w => `<button>${w}</button>`).join('');
   127	   374	$('chips').addEventListener('click', e => { if (e.target.tagName === 'BUTTON') { $('word').value = e.target.textContent; mirror(); } });
   128	   375	$('go').addEventListener('click', mirror);
   129	   376	$('word').addEventListener('keydown', e => { if (e.key === 'Enter') mirror(); });
   130	   377	let current = null, seeds = { A: 1, B: 2 };
   131	   378	const cache = JSON.parse(load('cache', '{}'));
   132	   379	function remember(word, obj) { cache[word] = obj; const keys = Object.keys(cache); while (keys.length > 12) delete cache[keys.shift()]; store('cache', JSON.stringify(cache)); renderHist(); }
   133	   380	function renderHist() {
   134	   381	  const k = Object.keys(cache);
   135	   382	  $('hist').innerHTML = k.length ? 'Recent (no API call): ' + k.map(w => `<button class="ghost" data-w="${w}">${w}</button>`).join('') : '';
   136	   383	}
   137	   384	$('hist').addEventListener('click', e => { const w = e.target.dataset.w; if (w) { $('word').value = w; render(cache[w]); } });
   138	   385	renderHist();
   139	   386	
   140	   387	async function mirror() {
   141	   388	  const word = $('word').value.trim();
   142	   389	  if (!word) return;
   143	   390	  $('go').disabled = true; $('status').className = 'status';
   144	   391	  try {
   145	   392	    const obj = cache[word] || await callAI(word, $('status'));
   146	   393	    remember(word, obj);
   147	   394	    $('status').textContent = '';
   148	   395	    render(obj);
   149	   396	  } catch (e) { $('status').className = 'status err'; $('status').textContent = e.message; }
   150	   397	  $('go').disabled = false;
   151	   398	}
   152	   399	function render(o) {
   153	   400	  current = o; seeds = { A: Math.floor(Math.random() * 1e6), B: Math.floor(Math.random() * 1e6) };
   154	   401	  $('result').classList.remove('hidden');
   155	   402	  $('defA').textContent = o.sincere || ''; $('capA').textContent = o.sceneA.caption || '';
   156	   403	  $('defB').textContent = '「' + (o.ironic || '') + '」'; $('capB').textContent = o.sceneB.caption || '';
   157	   404	  $('ironyType').textContent = (o.ironyType || '') + ' irony';
   158	   405	  $('gapText').textContent = o.gap || '';
   159	   406	  $('questions').innerHTML = (o.questions || []).map(q => `<li>${esc(q)}</li>`).join('');
   160	   407	  $('modelSentence').textContent = o.modelSentence || '';
   161	   408	  $('student').value = '';
   162	   409	  $('safety').classList.toggle('hidden', !o.safetyNote); $('safety').textContent = o.safetyNote ? 'Teacher note: ' + o.safetyNote : '';
   163	   410	  drawCard(o);
   164	   411	  showPicture($('picA'), o.sceneA.imagePrompt, seeds.A);
   165	   412	  showPicture($('picB'), o.sceneB.imagePrompt, seeds.B);
   166	   413	  window.scrollTo({ top: $('result').offsetTop - 10, behavior: 'smooth' });
   167	   414	}
   168	   415	document.querySelectorAll('[data-copy]').forEach(b => b.addEventListener('click', () => {
   169	   416	  if (!current) return; const p = current['scene' + b.dataset.copy].imagePrompt + ', ' + $('style').value;
   170	   417	  navigator.clipboard.writeText(p).then(() => { b.textContent = 'Copied'; setTimeout(() => b.textContent = 'Copy prompt', 1500); });
   171	   418	}));
   172	   419	document.querySelectorAll('[data-regen]').forEach(b => b.addEventListener('click', () => {
   173	   420	  if (!current) return; const s = b.dataset.regen; seeds[s] = Math.floor(Math.random() * 1e6);
   174	   421	  showPicture($('pic' + s), current['scene' + s].imagePrompt, seeds[s]);
   175	   422	}));
   176	   423	const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
   177	   424	
   178	   425	// ---------- the card: drawn by the browser, in the spirit of 漢語新解 ----------
   179	   426	function wrap(text, max) {   // crude wrap: CJK by characters, Latin by words
   180	   427	  const cjk = /[　-鿿＀-￯]/.test(text);
   181	   428	  if (cjk) { const out = []; for (let i = 0; i < text.length; i += max) out.push(text.slice(i, i + max)); return out; }
   182	   429	  const out = []; let line = '';
   183	   430	  for (const w of text.split(/\s+/)) { if ((line + ' ' + w).trim().length > max * 2) { out.push(line.trim()); line = w; } else line += ' ' + w; }
   184	   431	  if (line.trim()) out.push(line.trim());
   185	   432	  return out;
   186	   433	}
   187	   434	function drawCard(o) {
   188	   435	  const lines = wrap(o.ironic || '', 12);
   189	   436	  const W = 420, top = 150, lh = 34, H = Math.max(360, top + lines.length * lh + 120);
   190	   437	  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="'Noto Serif CJK TC','Songti TC','PingFang HK','Microsoft JhengHei',serif">
   191	   438	  <rect width="${W}" height="${H}" fill="#faf6ee"/>
   192	   439	  <rect x="14" y="14" width="${W - 28}" height="${H - 28}" fill="none" stroke="#1f2a24" stroke-width="1.5"/>
   193	   440	  <text x="${W / 2}" y="52" text-anchor="middle" font-size="13" letter-spacing="4" fill="#6b7570">反諷鏡 · IRONY MIRROR</text>
   194	   441	  <text x="${W / 2}" y="112" text-anchor="middle" font-size="44" font-weight="700" fill="#1f2a24">${esc(o.word)}</text>
   195	   442	  <line x1="60" y1="130" x2="${W - 60}" y2="130" stroke="#b3402f" stroke-width="2"/>
   196	   443	  ${lines.map((l, i) => `<text x="${W / 2}" y="${top + 30 + i * lh}" text-anchor="middle" font-size="24" fill="#1f2a24">${esc(l)}</text>`).join('')}
   197	   444	  <text x="${W / 2}" y="${H - 62}" text-anchor="middle" font-size="13" fill="#6b7570">${esc((o.ironyType || '') + ' irony')}</text>
   198	   445	  <text x="${W / 2}" y="${H - 40}" text-anchor="middle" font-size="12" fill="#b3402f">${esc((o.gap || '').slice(0, 40))}</text>
   199	   446	</svg>`;
   200	   447	  $('card').innerHTML = svg;
   201	   448	}
   202	   449	$('dlCard').addEventListener('click', () => {
   203	   450	  const svg = $('card').querySelector('svg'); if (!svg) return;
   204	   451	  const xml = new XMLSerializer().serializeToString(svg);
   205	   452	  const img = new Image();
   206	   453	  img.onload = () => {
   207	   454	    const c = document.createElement('canvas'); c.width = svg.width.baseVal.value * 2; c.height = svg.height.baseVal.value * 2;
   208	   455	    const ctx = c.getContext('2d'); ctx.scale(2, 2); ctx.drawImage(img, 0, 0);
   209	   456	    const a = document.createElement('a'); a.download = 'irony-' + (current ? current.word : 'card') + '.png'; a.href = c.toDataURL('image/png'); a.click();
   210	   457	  };
   211	   458	  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml);
   212	   459	});
   213	   460	$('dlJson').addEventListener('click', () => {
   214	   461	  if (!current) return;
   215	   462	  const a = document.createElement('a'); a.download = 'irony-' + current.word + '.json';
   216	   463	  a.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(current, null, 2)); a.click();
   217	   464	});
   218	   465	$('printSheet').addEventListener('click', () => {
   219	   466	  if (!current) return; const o = current;
   220	   467	  const w = window.open('', '_blank');
   221	   468	  w.document.write(`<html><head><meta charset="utf-8"><title>Irony Mirror – ${esc(o.word)}</title><style>body{font-family:serif;max-width:700px;margin:30px auto;line-height:1.6}h1{font-size:28px}.box{border:1px solid #999;padding:10px;margin:10px 0;min-height:60px}small{color:#666}</style></head><body>
   222	   469	  <h1>${esc(o.word)} <small>· Irony Mirror worksheet</small></h1>
   223	   470	  <p><b>Face A:</b> ${esc(o.sceneA.caption)}</p><p><b>Face B:</b> ${esc(o.sceneB.caption)}</p>
   224	   471	  <p>1. Describe what is happening in each picture.</p><div class="box"></div>
   225	   472	  <p>2. What is the gap between what is said and what is done?</p><div class="box"></div>
   226	   473	  <p>3. Write one sentence using irony about ${esc(o.word)}.</p><div class="box"></div>
   227	   474	  <p>4. Discuss: ${(o.questions || []).map(esc).join(' / ')}</p>
   228	   475	  <p><small>Model answer (teacher): ${esc(o.gap)} · ${esc(o.modelSentence)}</small></p></body></html>`);
   229	   476	  w.document.close(); w.print();
   230	   477	});
   231	   478	
   232	   479	// ---------- game: spot the irony ----------
   233	   480	let G = null, tick = null;
   234	   481	$('startGame').addEventListener('click', async () => {
   235	   482	  const words = $('gameWords').value.split(/[,，]/).map(w => w.trim()).filter(Boolean);
   236	   483	  if (!words.length) return;
   237	   484	  G = { words, i: 0, score: 0, picked: null, data: null };
   238	   485	  $('roundTotal').textContent = words.length; $('score').textContent = 0;
   239	   486	  $('gameEnd').classList.add('hidden'); $('gameRound').classList.remove('hidden');
   240	   487	  await playRound();

exec
/bin/zsh -lc "sed -n '1,220p' example-output/README.md" in /Users/chinhsi/Google Drive/HKU/Courses/2026 09/AILT9004/Materials/Prototypes/04-irony-mirror
exec
/bin/zsh -lc 'find example-output -maxdepth 2 -type f -print' in /Users/chinhsi/Google Drive/HKU/Courses/2026 09/AILT9004/Materials/Prototypes/04-irony-mirror
 succeeded in 0ms:
# Example output (no key needed to look)

- `孝順.json`, `誠實.json` — what the free model (`big-pickle` via OpenCode, same prompt) returned; `punctuality.json` — an English word with Chinese output. Load any of them by pasting the word into the page after the JSON is in the browser cache, or just read them.
- `card-孝順.png` — the SVG card the browser draws (no image model involved).
- `screenshot-explore.png` — the Explore tab with two anonymous Pollinations pictures (note the watermark, and that Face B does not really show the irony — discussion material).

Generated 2026-09-12 during development; the ironic lines are the model's, not the teacher's.

 succeeded in 0ms:
example-output/孝順.json
example-output/誠實.json
example-output/screenshot-explore.png
example-output/README.md
example-output/card-孝順.png
example-output/punctuality.json

exec
/bin/zsh -lc "for f in example-output/*.json; do printf '%s\\n' \""'$f"; sed -n '"'1,160p' \""'$f"; done' in /Users/chinhsi/Google Drive/HKU/Courses/2026 09/AILT9004/Materials/Prototypes/04-irony-mirror
 succeeded in 0ms:
example-output/punctuality.json
{"word": "punctuality", "sincere": "守時是尊重他人時間、凡事依約依時完成的美德。", "ironic": "把自己遲到說成全世界都早到的藝術。", "sceneA": {"caption": "她準時到達約定的茶餐廳，朋友已在等她，大家談笑開懷。", "imagePrompt": "Warm watercolor of a Hong Kong cha chaan teng: a smiling secondary-school girl arriving on time, waving at a friend already seated at a table with two cups of milk tea, soft morning light, busy street outside, no text in image."}, "sceneB": {"caption": "媽媽催她快出門，她一邊說「知道啦我會準時」，一邊繼續慢慢執袋出post。", "imagePrompt": "Warm watercolor of a Hong Kong home: a mother by the door pointing at the clock anxiously, while her daughter sits on the sofa smiling at a phone, posting on social media, school bag still half-open and loose, no text in image."}, "ironyType": "situational", "gap": "說的是「我會準時」，做的是遲到也不在乎。", "questions": ["為何我們常常嘴上說守時，實際卻總要遲到十五分鐘？", "遲到者口中的「準時」，和等待者心中的「準時」，是不是兩個世界？", "如果有一天全香港的人都遲到，準時算不算一種不禮貌？"], "modelSentence": "她誇口自己最守時，結果連自己的生日都遲到，還說蛋糕不新鮮。", "safetyNote": ""}
example-output/孝順.json
{"word": "孝順", "sincere": "孝順是真心尊敬和照顧父母，在言行上體貼他們的需要與感受。", "ironic": "孝順是父母健在時身在他鄉，出殯時哭得最大聲。", "sceneA": {"caption": "放學後陪母親食一碗雲吞麵，聽她講當日小事。", "imagePrompt": "A Hong Kong cha chaan teng in the evening, a teenage girl and her mother sit at a small table sharing one bowl of wonton noodles, the girl gently passes a spoon to her mother, warm fluorescent light, intimate and caring mood, no text."}, "sceneB": {"caption": "同一餐館，女孩對着母親低頭滑手機，座位隔開三尺。", "imagePrompt": "Same Hong Kong cha chaan teng setting, two figures at the same small table: the mother sits close and leans to speak, while the teenage girl holds a phone glowing with a bright red heart icon, turned away and scrolling, body angled away from the mother, the mother looks at the girl expectantly, no other diners visible, no text."}, "ironyType": "situational", "gap": "孝順常被掛在嘴邊，真正做到的時刻卻被手機螢幕隔開。", "questions": ["你認為花時間陪伴父母，和給他們零用錢或禮物，哪一樣比較算孝順？", "在社交媒體上公開說「要孝順父母」，和實際在家裏的行為，為甚麼會有差別？", "如果發現自己或朋友「口講孝順、行為相反」，你會用甚麼方法提醒而不傷感情？"], "modelSentence": "他每逢清明節都在社交媒體上寫「孝感動天」，卻連母親生日那天也不記得回家吃飯。", "safetyNote": ""}example-output/誠實.json
{"word": "誠實", "sincere": "誠實是言行一致、不欺不瞞，說出來的和做出來的一樣。", "ironic": "誠實：一種因為說謊技巧太差，才不得不誠實的品質。", "sceneA": {"caption": "學生買完東西，把店員多找的錢一分不少地還回去。", "imagePrompt": "A small Hong Kong neighbourhood grocery store at dusk, a teenage student in school uniform standing at the counter holding out a handful of extra coins toward the adult shop owner, who nods with a warm approving smile, bright warm light, everyday realistic scene, no text in the image"}, "sceneB": {"caption": "店裏掛着「童叟無欺」的招牌，店主收起多找的錢，若無其事。", "imagePrompt": "The same small grocery store from the same angle, two figures: the adult shop owner holding a phone that glows with a bright heart icon while his other hand pulls a stack of coins toward himself on the counter, his face turned toward the screen and away from the customer; the teenage student staring at the owner's hand with a puzzled, betrayed expression, both figures' body language showing the contradiction between the glowing claim and the hidden action, no text in the image"}, "ironyType": "situational", "gap": "店主掛着「誠實」的招牌讚美誠實，收銀時卻把多找的錢悄悄據為己有——說出來的榮耀，做出來的是貪。", "questions": ["你覺得在甚麼情況下說謊是可以接受的？同學抄功課、報錯測驗分數，是同一回事嗎？", "文中店主一面強調誠實一面收膨脹的錢，你認為人會「明知虛偽卻照做」嗎？為甚麼？", "如果誠實會令朋友難堪或令自己吃虧，你還會選擇誠實嗎？試舉一個生活例子。"], "modelSentence": "他拍心口說自己一生誠實，說這句話時，手正忙著把找回的零錢收進口袋。", "safetyNote": ""}
