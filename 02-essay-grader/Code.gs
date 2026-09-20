/**
 * AI Essay Grader — Google Sheets + any OpenAI-compatible AI API (MVP for AILT9004)
 * ------------------------------------------------------------
 * Sheets used:
 *   "Essays": A = Student code (pseudonym!), B = Essay text,
 *             C = Scores by criterion, D = Total, E = Feedback for student,
 *             F = Note for teacher, G = Graded at
 *   "Rubric": column A holds the rubric text (one criterion per row, or one big cell)
 *
 * Setup: Extensions > Apps Script > paste this file > save > reload the sheet.
 * Then use the "AI Grader" menu.
 */

const BASE_URL = 'https://openrouter.ai/api/v1';                       // OpenRouter works from Hong Kong; any OpenAI-compatible endpoint works
const MODELS = ['qwen/qwen3.8-27b:free', 'inclusionai/ling-3.0-flash-fin:free', 'nvidia/nemotron-3-super-120b-a12b:free', 'nex-agi/nex-n2.5-pro:free'];
// Premium option (needs credit on your OpenRouter account; unpaid models are skipped automatically):
// const MODELS = ['qwen/qwen3.8-max-0902', 'moonshotai/kimi-k3', 'z-ai/glm-5.3'];   // (Hong Kong-billed accounts cannot use OpenAI/Anthropic/Google models on OpenRouter)    // tried in order; a busy or rate-limited model falls through to the next
const SECONDS_BETWEEN_CALLS = 4;            // be polite to free tiers

function onOpen() {
  SpreadsheetApp.getUi().createMenu('AI Grader')
    .addItem('1. Set API key', 'setApiKey')
    .addItem('2. Create sample sheets', 'createSampleSheets')
    .addSeparator()
    .addItem('Grade selected rows', 'gradeSelected')
    .addItem('Grade all ungraded rows', 'gradeAll')
    .addToUi();
}

function setApiKey() {
  const ui = SpreadsheetApp.getUi();
  const res = ui.prompt('API key', 'Paste your key from openrouter.ai/keys (stored privately in your account, never in the sheet):', ui.ButtonSet.OK_CANCEL);
  if (res.getSelectedButton() !== ui.Button.OK) return;
  PropertiesService.getUserProperties().setProperty('AI_API_KEY', res.getResponseText().trim());
  ui.alert('Key saved.');
}

function getApiKey() {
  const k = PropertiesService.getUserProperties().getProperty('AI_API_KEY');
  if (!k) throw new Error('No API key. Use AI Grader > 1. Set API key.');
  return k;
}

function getRubric() {
  const sh = SpreadsheetApp.getActive().getSheetByName('Rubric');
  if (!sh) throw new Error('No sheet named "Rubric". Use AI Grader > 2. Create sample sheets.');
  return sh.getRange(1, 1, sh.getLastRow(), 1).getValues().map(r => r[0]).filter(String).join('\n');
}

// ---------- the AI call ----------
function gradeEssay(rubric, essay) {
  const system = [
    'You are an experienced Hong Kong language teacher marking a student essay with a rubric.',
    'Score each rubric criterion strictly and consistently. Justify scores with evidence from the essay.',
    'Write the feedback FOR THE STUDENT in the same language as the essay: 3 short bullet points (one strength, two concrete things to improve, quoting the student\'s own words).',
    'Write a one-line NOTE FOR THE TEACHER: anything a human must check (off-topic, possible copying/AI-written, under-length, sensitive content), or "None".',
    'Do not invent criteria that are not in the rubric.',
    'Output ONLY a JSON object (no code fences, no extra text) with this shape:',
    '{"scores":[{"criterion":"...","score":0,"max":0,"reason":"..."}],"total":0,"feedback":"...","teacher_note":"..."}'
  ].join('\n');
  const messages = [
    { role: 'system', content: system },
    { role: 'user', content: 'RUBRIC:\n' + rubric + '\n\nESSAY:\n' + essay }
  ];
  let lastErr = null;
  for (const model of MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      const resp = UrlFetchApp.fetch(BASE_URL + '/chat/completions', {
        method: 'post', contentType: 'application/json', muteHttpExceptions: true,
        headers: { Authorization: 'Bearer ' + getApiKey(), 'X-Title': 'AI Essay Grader (AILT9004)' },
        payload: JSON.stringify({ model: model, temperature: 0.2, messages: messages })
      });
      const code = resp.getResponseCode();
      let data = {}; try { data = JSON.parse(resp.getContentText()); } catch (e) {}
      if (code === 200 && data.choices && data.choices[0]) return parseJson(data.choices[0].message.content);
      lastErr = new Error(data.error ? (data.error.message || JSON.stringify(data.error)) : 'HTTP ' + code);
      if (code === 402 || code === 403) break;                     // no credit, or model blocked for this region: skip to next model
      if ([429, 502, 503, 404].indexOf(code) < 0) throw lastErr;   // real error: stop
      Utilities.sleep(2000);                                       // busy: wait and retry, then next model
    }
  }
  throw lastErr;
}

// Lenient JSON extraction: models sometimes wrap JSON in ``` fences or add a sentence.
function parseJson(text) {
  try { return JSON.parse(text); } catch (e) {}
  const m = String(text).match(/\{[\s\S]*\}/);
  if (m) return JSON.parse(m[0]);
  throw new Error('Model did not return JSON: ' + String(text).slice(0, 80));
}

// ---------- sheet plumbing ----------
function gradeRows(rowNumbers) {
  const ss = SpreadsheetApp.getActive();
  const sh = ss.getSheetByName('Essays');
  if (!sh) throw new Error('No sheet named "Essays". Use AI Grader > 2. Create sample sheets.');
  const rubric = getRubric();
  let done = 0;
  rowNumbers.forEach((r, i) => {
    if (r < 2) return;                                    // skip header
    const essay = String(sh.getRange(r, 2).getValue()).trim();
    if (!essay) return;
    if (i > 0) Utilities.sleep(SECONDS_BETWEEN_CALLS * 1000);
    sh.getRange(r, 7).setValue('grading…'); SpreadsheetApp.flush();
    try {
      const g = gradeEssay(rubric, essay);
      const scoreText = g.scores.map(s => s.criterion + ' ' + s.score + '/' + s.max + ' — ' + s.reason).join('\n');
      sh.getRange(r, 3, 1, 5).setValues([[scoreText, g.total, g.feedback, g.teacher_note, new Date()]]);
      done++;
    } catch (e) {
      sh.getRange(r, 7).setValue('ERROR: ' + e.message);
    }
    SpreadsheetApp.flush();
  });
  return done;
}

function gradeSelected() {
  const range = SpreadsheetApp.getActiveRange();
  const rows = [];
  for (let r = range.getRow(); r < range.getRow() + range.getNumRows(); r++) rows.push(r);
  const n = gradeRows(rows);
  SpreadsheetApp.getUi().alert('Graded ' + n + ' essay(s). Now READ them — the AI drafts, you decide.');
}

function gradeAll() {
  const sh = SpreadsheetApp.getActive().getSheetByName('Essays');
  const rows = [];
  for (let r = 2; r <= sh.getLastRow(); r++) {
    if (String(sh.getRange(r, 2).getValue()).trim() && !sh.getRange(r, 4).getValue()) rows.push(r);
  }
  const n = gradeRows(rows);
  SpreadsheetApp.getUi().alert('Graded ' + n + ' essay(s). Now READ them — the AI drafts, you decide.');
}

// ---------- sample data ----------
function createSampleSheets() {
  const ss = SpreadsheetApp.getActive();
  let e = ss.getSheetByName('Essays') || ss.insertSheet('Essays');
  let r = ss.getSheetByName('Rubric') || ss.insertSheet('Rubric');
  e.clear(); r.clear();
  e.getRange(1, 1, 1, 7).setValues([['Student code', 'Essay', 'Scores by criterion', 'Total', 'Feedback for student', 'Note for teacher', 'Graded at']]).setFontWeight('bold');
  e.setColumnWidth(2, 420); e.setColumnWidth(3, 320); e.setColumnWidth(5, 360); e.setColumnWidth(6, 220);
  e.getRange(2, 1, SAMPLE_ESSAYS.length, 2).setValues(SAMPLE_ESSAYS).setWrap(true).setVerticalAlignment('top');
  r.getRange(1, 1, SAMPLE_RUBRIC.length, 1).setValues(SAMPLE_RUBRIC.map(x => [x])).setWrap(true);
  r.setColumnWidth(1, 700);
  SpreadsheetApp.getUi().alert('Sample sheets created. Select rows 2–4 on "Essays", then AI Grader > Grade selected rows.');
}

const SAMPLE_RUBRIC = [
  'Task: Write about 150 words on the topic "Should Hong Kong secondary schools ban mobile phones during school hours?" (English) OR 「我最難忘的一次旅行」(Chinese, about 200 characters).',
  'Criterion 1 — Content (0–7): relevance to the topic; ideas are developed with reasons or examples; a clear personal position (where the task asks for one).',
  'Criterion 2 — Language (0–7): accuracy of grammar, vocabulary and spelling/characters; range of sentence patterns; errors do not block understanding.',
  'Criterion 3 — Organization (0–7): clear opening, body and closing; logical order; use of linking words/連接詞; paragraphing.',
  'Total = 21. Band guide: 18–21 excellent, 14–17 good, 10–13 adequate, below 10 needs substantial improvement.'
];

const SAMPLE_ESSAYS = [
  ['S01', 'In my opinion, Hong Kong secondary school should ban mobile phone during school hours. First, many students are addicted to play games and watch short video. When the teacher is teaching, they cannot concentrate and their result become worse. Second, mobile phone can cause bullying. Some students take photo of other students and post it on social media without asking, it is very hurtful. Some people say phone is useful for learning, for example we can search information. However, the school already have computers and iPad in the classroom, so we do not need phone. In conclusion, I think banning mobile phone is good for students because they can focus in the lesson and have a better relationship with classmate.'],
  ['S02', 'Mobile phone is very important in our life. I dont think school should ban it. Because student need to contact parents. If there is emergency they can call. Also phone have many app for learning like dictionary. Ban is not good. Some student use phone in bad way but not all student. Teacher can tell them dont use in lesson. My school allow phone and I think it is ok. So I disagree to ban mobile phone.'],
  ['S03', '我最難忘的一次旅行是去年暑假和家人去台灣。那天早上我們很早就起床，因為飛機是八點起飛的。到了台北，我們先去了夜市，那裏有很多小吃，我吃了臭豆腐和珍珠奶茶，雖然臭豆腐很臭，但是味道很好吃。第二天我們去了九份，那裏的風景非常漂亮，我拍了很多照片。可是下午突然下大雨，我們沒有帶雨傘，全身都濕了，媽媽一邊笑一邊罵我們。這次旅行讓我學會了出門要看天氣預報，也讓我和家人的關係變得更親密。我希望明年可以再去。']
];
