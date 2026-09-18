# 07 — 字靈冒險 Hanzi Quest

The public version uses an original bright monster-collecting RPG presentation: explore a route, meet wild 字靈, build a 字靈圖鑑, and grow a companion through Chinese practice. Its creatures, scene art, names, interface, and story are original and are not affiliated with or copied from a commercial game franchise.

A Chinese vocabulary battle game for heritage-language learners. Read, listen, choose an answer, earn energy, defeat friendly fantasy monsters, and level up.

**Play:** <https://chinhsi.github.io/ailt9004-ai-prototypes/07-hanzi-quest/>

## Start playing

Nothing to install and no API key required. Open the link, press **切換關卡**, select a Grade 1 or Grade 2 unit and lesson, then press **開始冒險**. Audio is prepared when a chapter opens. The parent settings let you choose Traditional or Simplified Chinese, two to four answer options, and the practice mode.

The default rotates:

1. Hear a complete word and select its written form.
2. See a word and select its pinyin, including tone contrasts.
3. See pinyin and select the matching word.

Sound-based choices match both character count and syllable count, so answer length cannot give the answer away. The separate meaning mode uses a picture/English gloss for the original curated items and automatically becomes a pinyin-choice question for shared-library entries without a separate gloss.

Wrong answers lead to correction and a later revisit. Correct answers charge attack and healing skills. The learning bag contains consumable elimination, word-clue and guided-pass cards. Four choices become two; two-choice questions never spend an elimination card. Guided passes require viewing the word before confirming; assisted words return later and the assisted answer does not count as independent recall. A free meaning or pinyin hint remains available. Each monster has a victory screen: a first attempt awards 40 XP then 60 XP, with one level per 100 XP. Repeating the same lesson pays 60% on the second run and 30% afterwards; saved monster reward claims also count to prevent restarting the first wave for full rewards. Level-up restores up to 25 HP and strengthens the brush: normal attack starts at 25, grows by 2 per level and caps at 45; the energy attack starts at 40 and caps at 70. Monster levels rise slowly with lesson position and every four hero levels, with an easier first wave and capped HP (100–150). All lessons remain available. XP is saved when awarded; vocabulary results and chapter stars are saved at chapter completion.

Every battle includes eight current-lesson items, plus two earlier review items when available (80/20 before correction retries). Replaying a lesson advances to its next group of eight, and automated coverage tests require every item in the complete lesson library to appear without omissions. Earlier difficult or not-yet-familiar review items take priority. Defeating monsters early never removes unfinished practice. A correct final practice answer finishes the remaining monster if necessary, so a difficult battle does not create an endless extra drill. Finishing the whole lesson awards one learning card, up to nine of each kind. New and migrated players start with two of each; item consumption saves immediately.

## Privacy

- No names, student accounts, microphone, camera, tracking scripts, ads, or learning-data upload.
- XP, settings, stars, and word progress are stored in this browser's localStorage. Shared devices share progress; this is not an individual student record system.
- Storage is scoped to the website origin, not a security boundary between numbered folders. Other pages on the same origin could technically access it. Do not store confidential student information here.
- Fonts, scripts, illustrations, and the default voice files are served from this site. The app does not call a live AI or speech-generation service while playing.
- Optional device text-to-speech may use the browser or operating system's own network speech provider.
- GitHub Pages is public and its hosting infrastructure may record connection information such as IP addresses. “No app tracking” does not mean the host keeps no logs. See [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).
- Links to curriculum sources are opened only when clicked and suppress the referrer header.
- This public folder contains no credentials, private deployment IDs, local filesystem paths, user profiles, learning records, or development logs. The original private project's Git history is not included.

## Curriculum and assets

The game uses the same complete character-and-word library as 認字樂園: 672 unique characters plus 570 words across 33 Grade 1–2 lessons (1,242 practice items total). The picker exposes all three units in each grade. A battle remains short by rotating through eight current-lesson items per replay. The original 112 item IDs remain stable so existing browser progress still has meaning.

Lesson order and character scope follow the public Grade 1 and Grade 2 character lists. The 570-word practice list is independently assembled from already introduced characters; stories, questions and illustrations are original. This is an independent supplementary game, not an official textbook product or a reproduction of textbook exercises. Check the mapping against the edition used by the learner.

- [Grade 1 character scope](https://www.heritagechinese.com/static/common/pdf/01-shengzi.pdf)
- [Grade 2 character scope](https://www.heritagechinese.com/static/common/pdf/02-shengzi.pdf)

Illustrations are original AI-generated game assets, not textbook artwork. All 1,242 character/word recordings and four instruction recordings are pre-generated AI-synthesized Mandarin (Xiaoxiao), not human recordings. Multi-character words are recorded as complete phrases; syllables are not concatenated. Teachers should listen for pronunciation, neutral tones, polyphonic characters and regional preferences before classroom use.

## Adapt or host it

Copy this entire folder, including `assets/`, to a static web host. No server application or build step is required. Opening `index.html` directly also allows play; chapter preloading may be restricted under `file://`, so a website is preferable.

- `shared-vocabulary.js`: the complete shared 672-character and 570-word library, with stable IDs, lesson mapping, pinyin and traditional/simplified forms.
- `curriculum.js`: groups the shared library into 33 lessons and preserves the original chapter identities.
- `engine.js`: questions, learning records, combat, XP and levels.
- `app.js`: interface, voice selection and local progress.
- `recorded-speech.js`: whole-word audio playback and preloading.
- `style.css`: layout and animation, including reduced-motion support.
- `assets/`: illustrations and prerecorded audio.

Changing a word's text requires a matching complete-word audio file. Keep existing IDs stable if you want saved progress to remain meaningful. Do not add student data, API keys, or generated logs to this public repository.
