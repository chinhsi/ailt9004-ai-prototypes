> **The teacher's note, exactly as it stands in the private source repository on 13 Sep 2026** (there it is called `AGENTS.md`, the file a coding assistant reads first). Kept in the original Chinese. It has grown during the day: the top is the original brief, the bottom is the running progress log the assistant keeps. Lines about servers, ports and chat channels are part of the real document; they are the teacher's own setup and are not needed to reproduce the game.

# Hanzi Game — 7 歲小孩認字遊戲

PI（Dr. Lin）要給 7 歲小孩做一個學習認字（中文漢字）的遊戲。這個 repo 是遊戲的家，由 Hermes 主導開發。
操作介面：Discord channel **#hanzi-game**（與 #bishop / #td-game 完全分離，不要把這裡的工作混進 r20 或塔防）。

## 技術選型（除非 PI 改主意，照這個走）

- **純前端網頁遊戲**：Vite + TypeScript，畫面用 Phaser 3 或純 DOM/CSS（先問 PI 偏好，沒回覆就用 Phaser，和 td-game 經驗共用）。無後端；進度存 localStorage。
- **手機/平板優先**，大按鈕、大字、可觸控；桌機也要能玩。
- 中文字用系統字型 + 注音/拼音可切換（PI 決定）；語音：**預先合成音檔**（`tools/gen-audio.py`，edge-tts 免費微軟神經語音 zh-CN-XiaoxiaoNeural，輸出 `public/audio/<sha1>.mp3` + manifest.json；venv `.venv-tts`）。新增字/句子/部件名後要重跑一次（已存在的會跳過）。瀏覽器 speechSynthesis 只是備援。PI 09-13 反映 iOS 內建語音太差且會亂念，所以改這條路。
- 素材先用簡單幾何圖形或免費 emoji/圖示，**玩法與學習效果優先於美術**。

## 設計原則（7 歲兒童）

- **漸進式鐵則（PI 2026-09-13）**：做第 N 課時，畫面上只能出現「一年級全部 + 本年級第 1..N 課」的字；絕不出現後面課的字。舊課的字要多用，尤其相關的（同部件、同課文）。實作：`srs.learned()` 是唯一的字池，所有題型只能從它抽；句子檔由 `tools/check-data.mjs` 驗；`tests/games.test.ts` 有「只出現已學的字」測試。唯一豁免：拼字工坊裡目標字自己的部件（構字零件，不算生詞）。

- 一局 3–5 分鐘，能隨時停。
- 每次只教少量字（3–5 個新字 + 複習舊字），間隔重複（簡易 Leitner 盒子即可）。
- 錯了不罰、只重來；答對有明顯正向回饋（音效、動畫、星星）。
- **字表已定：馬立平中文（簡體）**。小孩目前學二年級，`data/mlp_g2.json` 是主要教學字表（380 字，依單元/課文分）；`data/mlp_g1.json`（305 字）當複習池，也用來出「部件相關」題（例如同部首、同聲旁的字放一起比較）。原始 PDF 在 `data/`。全部用簡體。
- 不放任何外部連結、廣告、登入。

## 題型 roadmap（PI 2026-09-13 拍板）

**第一波（現在做）— 只用現有字表 + 課文句子，零圖零人工資料：**
1. **聽音找字**：TTS 唸一個字，畫面 4 個字選一個；干擾項從同課或形近字挑。
4. **拼字工坊（部件）**：給部件（如「氵＋也」）拖成字；同堂可把泥/池/洞/河/游 這類同形旁的字放一起讓小孩歸納。需要每字拆解表 → 抓開源 IDS 拆字資料，對 mlp_g1+g2 的 685 字篩出一份 `data/ids.json`。
8. **字卡翻翻樂**：翻牌配對「字 ↔ 拼音」（或字 ↔ 字音 TTS）。零額外資料。
10. **句子排序**：課文一句話打散成字卡，拖回順序。資料 = 課文句子，需從馬立平課文整理 `data/sentences.json`（先人工放每課 2–3 句）。

**之後再談（需人工建資料或圖）：** 3 看詞選字填空、6 偏旁換一換字族（請→清→晴→情→蜻）、9 連連看造詞、5 找同部首、7 打地鼠換皮、2 看字選圖（emoji 只夠一年級具體名詞）、11 跟讀辨識（不建議）。

## MVP 範圍（第一個可玩版本）

1. 首頁選「今天的字」→ 進入一輪遊戲（10 題，混合題型 1/4/8/10）。
2. 結束畫面顯示星星數與學會的字。
3. 進度保存（哪些字答對過幾次），下次自動安排複習（簡易 Leitner）。
4. 家長頁（PI）：看每個字的掌握狀況、可增刪字表。

獎勵殼保持簡單：每天 10 題、集星星；別把獎勵系統做太深。

## 開發約定

- dev server：`npm run dev -- --host 0.0.0.0 --port 8091`（8080/8787 是 SimProf、8090 是 td-game，別碰）。
- 每完成一個可玩的里程碑就 `git commit`。
- 正式網址（GitHub Pages，HTTPS，手機隨時能玩）：**https://chinhsi.github.io/hanzi-game-pages/**。每次改完跑 `npm run deploy`（build 後 force-push dist 到公開 repo `chinhsi/hanzi-game-pages`）。源碼 repo `chinhsi/hanzi-game` 維持私有，因為 `data/` 有馬立平 PDF；公開 repo 只有 build 產物。
- VPS dev server http://<VPS_IP>:8091 只給開發中即時看。
- 不要動這台機器上的其他服務（r20、postgres、traefik、SimProf、td-game）。

## 目前進度

- [x] repo 建立（2026-09-13，Claude Code 建）
- [x] 字表：馬立平一、二年級簡體（2026-09-13）
- [ ] 和 PI 確認：注音或拼音、Phaser 或 DOM
- [x] 專案 scaffold（Vite + TS + 純 DOM，2026-09-13，Claude Code）；`npm test` 是 vitest+jsdom 煙霧測試
- [x] 資料：`data/chars.json`（672 字，拼音 + IDS 拆解 503 字，由 `npm run data` 重建）、`data/sentences.json`（66 句自編，非原文）
- [x] 第一波四題型 1/4/8/10 + Leitner 進度（localStorage）+ 結束畫面 + 家長頁
- [x] 題型 3 填空（`src/games/fill.ts`）：詞表 `data/words.json` 570 詞（2-4 字，只用字表字，g/u/l=解鎖課；來源 `tools/words-src.txt`，改完重跑產生腳本段落在 git log）；語氣詞（咦呢啊唉哇呀）無詞不出此題
- [x] 題型 5 找同部件（`src/games/family.ts`，含字族如青→请睛蜻情；部件名表 NAMES；跳過 一丿十八人大 這類無意義部件）。已知限制：IDS 非二元拆解的字（ids=null）若含該部件不會被當正解，可能出現在負項
- [x] dev server 以 `systemctl --user` 的 `hanzi-game.service` 常駐 8091
- [x] Codex（gpt-5.6-astra）review 14 條，修 13 條（09-13）：家族改用遞迴部件 `comps`、部件不出後面課生詞、聽音找字/拼字/排句子加鎖、排句子只在有含目標字句子時出、翻翻樂拼音不重複+配錯記錯、todaySet 補滿 10、TTS 沒在講就直接念保 iOS 手勢、settings/progress 驗證。保留：干擾部件可為非生詞零件（如 艮），因和 氵 同性質
- [x] 音訊層（`src/tts.ts`）已踩過的坑，改動前必讀：WebKit 自然播完 onended 可能不觸發（用音長保底）；Firefox resume() promise 可能不回（400ms 逾時走 <audio>）；音檔按需抓太慢（SW 永久快取 + 首頁預抓本課全部）；看門狗 3 秒未起播自我修復。驗證工具：`node tools/browser-probe.mjs <chromium|webkit|firefox>`（需 dev server :8091）、`node tools/sw-probe.mjs`
- [x] Codex review #2（v0.13→v0.14，預設 model sol）：10 條全修。音訊層現在的契約：`stop()` 是唯一作廢點（gen++）；pump 有 token，recover() 換掉現任；<audio> 的 play() 拒絕不算起播（看門狗會抓）；`say()/sayAll()` 回 promise，遊戲用 `thenDone()` 等念完再進下一題（上限 5-8 秒）；音檔檔名含 voice/rate/ENC 版本（改合成參數要升 `ENC`），SW 快取名 `hanzi-audio-v2`（改音檔內容要升）；`tests/tts.test.ts` 6 個狀態機測試
- [ ] PI 試玩回饋（手機實測 TTS 是否出聲：iOS Safari 需先點過畫面）
- [ ] 待決：注音要不要加、Phaser 化
