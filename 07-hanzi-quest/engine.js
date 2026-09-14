(function(root){
const MODES=['listen','meaning','pinyin','read'];
const MIXED_MODES=['listen','pinyin','read'];
const syllables=w=>w.pinyin.trim().split(/\s+/).length;
const sameLength=(a,b)=>Array.from(a.traditional).length===Array.from(b.traditional).length&&syllables(a)===syllables(b);
function toneChoices(word){const marks=['̄','́','̌','̀'];const decomposed=word.pinyin.normalize('NFD');const mark=marks.find(m=>decomposed.includes(m));if(!mark)return [];return marks.filter(m=>m!==mark).map((m,i)=>({...word,id:word.id+'-tone-'+i,pinyin:decomposed.replace(mark,m).normalize('NFC')}));}
function shuffle(arr,random=Math.random){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function freshProgress(){return{version:1,xp:0,chapters:{},words:{},sessions:0,settings:{script:'traditional',mode:'mixed',questionVersion:2,options:2,rate:1,voice:'neural-xiaoxiao-v1',speechVersion:1,sound:true}};}
function sanitizeProgress(value){const p=freshProgress();if(!value||typeof value!=='object')return p;
 if(value.settings){const s=value.settings;if(['traditional','simplified'].includes(s.script))p.settings.script=s.script;if([...MODES,'mixed'].includes(s.mode))p.settings.mode=s.mode;if([2,3,4].includes(s.options))p.settings.options=s.options;if([.7,.85,1].includes(s.rate))p.settings.rate=s.rate;if(typeof s.voice==='string')p.settings.voice=s.voice;if(typeof s.sound==='boolean')p.settings.sound=s.sound;if(s.speechVersion!==1){p.settings.voice='neural-xiaoxiao-v1';p.settings.rate=1;}p.settings.speechVersion=1;if(s.questionVersion!==2&&s.mode==='listen')p.settings.mode='mixed';p.settings.questionVersion=2;}
 p.xp=Number.isSafeInteger(value.xp)&&value.xp>=0?Math.min(value.xp,1000000000):0;
 p.sessions=Number.isSafeInteger(value.sessions)&&value.sessions>=0?value.sessions:0;
 for(const [k,v]of Object.entries(value.chapters||{})){if(!['__proto__','constructor','prototype'].includes(k)&&v&&typeof v==='object')p.chapters[k]={wins:Math.max(0,Number(v.wins)||0),stars:Math.min(3,Math.max(0,Number(v.stars)||0))};}
 for(const [k,v]of Object.entries(value.words||{})){if(['__proto__','constructor','prototype'].includes(k)||!v||typeof v!=='object')continue;const entry={seen:Math.max(0,Number(v.seen)||0),mistakes:Math.max(0,Number(v.mistakes)||0),modes:{}};for(const m of MODES){const x=v.modes?.[m];if(x)entry.modes[m]={independent:Math.max(0,Number(x.independent)||0),sessions:Array.isArray(x.sessions)?x.sessions.filter(s=>typeof s==='string').slice(-30):[]};}p.words[k]=entry;}return p;}
class Battle{
 constructor(chapter,settings={},progress=freshProgress(),random=Math.random){if(!chapter?.words?.length)throw Error('Unknown chapter');this.chapter=chapter;this.settings={...freshProgress().settings,...settings};this.progress=progress;this.random=random;this.sessionId=Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,9);this.heroHp=100;this.enemyHp=100;this.wave=1;this.energy=0;this.phase='answer';this.turn=0;this.correct=0;this.mistakes=0;this.rescues=0;this.hints=0;this.done=false;this.recorded=false;this.defeated=false;this.rewardedWaves=new Set();this.reward=null;this.earnedXp=0;this.retryIds=new Set();this.results=[];this.queue=shuffle(chapter.words,random);this.nextQuestion();}
 get word(){return this.question.word;}
 nextQuestion(){if(this.done)return;let word=this.queue.shift();if(!word){if(this.defeated){this.phase='won';this.done=true;return;}word=this.chapter.words[this.turn%this.chapter.words.length];}
 this.turn++;const mode=this.settings.mode==='mixed'?MIXED_MODES[(this.turn-1)%MIXED_MODES.length]:this.settings.mode;
 const field=mode==='pinyin'?'pinyin':mode==='meaning'?'meaning':this.settings.script;
 const seen=new Set([word[field]]);
 const bank=this.chapter.reviewWords||this.chapter.words;
 const candidates=shuffle(bank.filter(w=>w.id!==word.id&&(mode==='meaning'||sameLength(w,word))&&(!['listen','read'].includes(mode)||w.pinyin!==word.pinyin)),this.random);
 // Include a close tone contrast in pinyin questions; all distractors keep the same syllable count.
 const pool=mode==='pinyin'?[...shuffle(toneChoices(word),this.random),...candidates]:candidates;
 const distractors=pool.filter(w=>{if(seen.has(w[field]))return false;seen.add(w[field]);return true;}).slice(0,this.settings.options-1);
 if(!distractors.length)throw Error('Not enough same-length distractors for '+word.id);
 this.question={word,mode,options:shuffle([word,...distractors],this.random),eliminated:[],assisted:false,wrongId:null};this.phase='answer';this.lastEvent=null;
 }
 answer(id){if(!['answer','correction'].includes(this.phase)||!this.question.options.some(w=>w.id===id)||this.question.eliminated.includes(id))return{type:'ignored'};
 const q=this.question,wasCorrection=this.phase==='correction';
 if(id!==q.word.id){if(wasCorrection)return{type:'try-again'};this.mistakes++;this.heroHp=Math.max(0,this.heroHp-15);q.wrongId=id;q.assisted=true;this.phase='correction';this.results.push({wordId:q.word.id,mode:q.mode,independent:false,mistake:true});
 // Revisit the missed word after up to two other words; never build an endless retry queue.
 if(!this.retryIds.has(q.word.id)){this.retryIds.add(q.word.id);this.queue.splice(Math.min(2,this.queue.length),0,q.word);}
 let rescue=false;if(this.heroHp===0){this.heroHp=55;this.rescues++;rescue=true;}
 this.lastEvent={type:'wrong',rescue};return this.lastEvent;}
 if(!wasCorrection){this.correct++;this.results.push({wordId:q.word.id,mode:q.mode,independent:!q.assisted,mistake:false});}
 this.energy=Math.min(6,this.energy+(wasCorrection?1:2));this.damage(wasCorrection?15:25);this.phase='resolved';this.lastEvent={type:wasCorrection?'corrected':'correct',damage:wasCorrection?15:25};if(this.enemyHp===0&&!this.defeated)this.beginReward('advance');return this.lastEvent;
 }
 damage(amount){if(this.defeated)return;this.enemyHp=Math.max(0,this.enemyHp-amount);}
 useSkill(skill){if(this.phase!=='answer')return{type:'ignored'};const cost=skill==='hint'?2:3;if(!['fire','heal','hint'].includes(skill)||this.energy<cost)return{type:'unavailable'};if(skill==='heal'&&this.heroHp===100)return{type:'full-health'};if(skill==='fire'&&(this.defeated||this.enemyHp===0))return{type:'unavailable'};if(skill==='hint'&&this.question.assisted)return{type:'unavailable'};
 this.energy-=cost;if(skill==='heal'){this.heroHp=Math.min(100,this.heroHp+35);return{type:'heal'};}if(skill==='hint'){this.question.assisted=true;this.hints++;const wrong=this.question.options.filter(w=>w.id!==this.word.id);this.question.eliminated=wrong.slice(0,1).map(w=>w.id);return{type:'hint'};}
 this.damage(40);if(this.enemyHp===0)this.beginReward('question');return{type:'fire'};
 }
 beginReward(resume){if(this.enemyHp!==0||this.rewardedWaves.has(this.wave))return false;this.rewardedWaves.add(this.wave);const amount=this.wave===1?40:60;const before=experience(this.progress);this.progress.xp=(this.progress.xp||0)+amount;this.earnedXp+=amount;const after=experience(this.progress);const healed=after.level>before.level?Math.min(25,100-this.heroHp):0;this.heroHp+=healed;this.reward={wave:this.wave,amount,before,after,healed,resume};this.phase='reward';return true;}
 continueReward(){if(this.phase!=='reward')return false;const resume=this.reward.resume;this.reward=null;if(resume==='advance'){this.phase='resolved';return this.advance();}if(this.wave===1){this.wave=2;this.enemyHp=100;}else this.defeated=true;this.phase='answer';return true;}
 freeHint(){if(this.phase!=='answer'||this.question.assisted)return false;this.question.assisted=true;this.hints++;return true;}
 advance(){if(this.phase!=='resolved')return false;if(this.enemyHp===0&&!this.defeated){if(this.wave===1){this.wave=2;this.enemyHp=100;}else this.defeated=true;}
 // Fireballs can shorten combat, but any queued correction must still be revisited.
 if(this.defeated){this.queue=this.queue.filter(w=>this.retryIds.has(w.id));}
 if(this.defeated&&!this.queue.length){this.done=true;this.phase='won';return true;}this.nextQuestion();return true;}
 finish(){if(!this.done||this.recorded)return null;this.recorded=true;const p=this.progress;p.sessions++;const stars=this.mistakes===0?3:this.mistakes<=2?2:1;const prior=p.chapters[this.chapter.id]||{wins:0,stars:0};p.chapters[this.chapter.id]={wins:prior.wins+1,stars:Math.max(prior.stars,stars)};
 for(const result of this.results){const w=p.words[result.wordId]||(p.words[result.wordId]={seen:0,mistakes:0,modes:{}});w.seen++;if(result.mistake)w.mistakes++;if(result.independent){const mode=w.modes[result.mode]||(w.modes[result.mode]={independent:0,sessions:[]});mode.independent++;if(!mode.sessions.includes(this.sessionId))mode.sessions.push(this.sessionId);}}
 return{stars,xp:this.earnedXp,level:experience(p).level,correct:this.correct,mistakes:this.mistakes,rescues:this.rescues,words:[...new Set(this.results.map(r=>r.wordId))],review:[...new Set(this.results.filter(r=>r.mistake||!r.independent).map(r=>r.wordId))]};}
}
function experience(p){const xp=p.xp||0;return{xp,level:Math.floor(xp/100)+1,current:xp%100,needed:100};}
function mastered(entry){return !!entry&&Object.values(entry.modes||{}).some(m=>new Set(m.sessions).size>=2);}
const api={Battle,shuffle,freshProgress,sanitizeProgress,mastered,MODES,MIXED_MODES,sameLength,toneChoices,experience};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.QuestEngine=api;
})(typeof window!=='undefined'?window:globalThis);
