# Build the Essay Grader yourself — prompt for OpenCode

Open a terminal in an empty folder, run `opencode`, and paste:

```
Create a Google Apps Script file named Code.gs for a Google Sheet that grades student essays with an OpenAI-compatible chat API (default base URL https://openrouter.ai/api/v1, model nvidia/nemotron-3-super-120b-a12b:free).

Requirements:
- Sheet "Essays": column A student code, B essay text; the script writes C scores by criterion, D total, E feedback for the student, F a note for the teacher, G timestamp.
- Sheet "Rubric": column A holds the rubric text.
- A custom menu "AI Grader" with: set API key (stored with PropertiesService, never in the sheet), create sample sheets (3 sample essays: 2 English, 1 Chinese, plus a 3-criterion rubric out of 21), grade selected rows, grade all ungraded rows.
- Call {BASE_URL}/chat/completions with UrlFetchApp and a Bearer key; ask the model for a JSON object {scores:[{criterion,score,max,reason}], total, feedback, teacher_note} and parse it leniently (strip code fences).
- Feedback must be in the same language as the essay: 3 bullets (1 strength, 2 improvements quoting the student's words).
- Sleep 4 seconds between calls and retry on 429/503 with a fallback model. Handle errors by writing them into column G.
- Keep it under 150 lines and comment each function in one sentence.
Then write a README.md with setup steps a teacher with no coding background can follow.
```

Then check: does it store the key safely? Does it use only the rubric's criteria? Does it explain the scores? Fix what is missing by talking to the agent.
