/* Fixed whole-word MP3s. Preload chapter audio and reuse players; no live synthesis. */
(function(root){
function createPlayer({AudioClass,fetchAudio=typeof fetch==='function'?fetch.bind(globalThis):null,urlAPI=typeof URL!=='undefined'?URL:null,onEnded=()=>{},onLoading=()=>{},onPlaying=()=>{}}){
 let active=null,generation=0;
 const clips=new Map();
 function entry(url){if(!clips.has(url)){const audio=new AudioClass();audio.preload='auto';clips.set(url,{audio,loaded:false,pending:null,blobURL:null});}return clips.get(url);}
 function setBufferedSource(clip){if(clip.blobURL&&clip.audio.src!==clip.blobURL){clip.audio.src=clip.blobURL;clip.audio.load?.();}}
 async function warm(url){const clip=entry(url);if(clip.loaded)return true;if(clip.pending)return clip.pending;
 clip.pending=(async()=>{try{if(fetchAudio&&urlAPI?.createObjectURL){const controller=typeof AbortController!=='undefined'?new AbortController():null;const timer=controller?setTimeout(()=>controller.abort(),10000):null;let blob;try{const response=await fetchAudio(url,{cache:'force-cache',signal:controller?.signal});if(!response.ok)throw Error('Audio unavailable');const type=response.headers?.get?.('content-type')||'';if(type.includes('text/html'))throw Error('Expected audio, got a login page');blob=await response.blob();if(blob.size===0)throw Error('Empty audio');}finally{if(timer)clearTimeout(timer);}clip.blobURL=urlAPI.createObjectURL(blob);clip.loaded=true;if(active!==clip)setBufferedSource(clip);}else{clip.audio.load?.();}return clip.loaded;}catch{return false;}finally{clip.pending=null;}})();return clip.pending;
 }
 const player={
 stop(){generation++;if(active){active.audio.pause();active.audio.onended=null;active.audio.onerror=null;active.audio.onplaying=null;active.audio.onwaiting=null;active=null;}},
 async preload(urls){const queue=[...new Set(urls)];let cursor=0;let loaded=0;async function worker(){while(cursor<queue.length){const url=queue[cursor++];if(await warm(url))loaded++;}}await Promise.all(Array.from({length:Math.min(3,queue.length)},worker));return{loaded,total:queue.length};},
 play(url,rate,onError=()=>{}){this.stop();const ticket=generation,clip=entry(url),audio=clip.audio;setBufferedSource(clip);if(!audio.src)audio.src=url;if(audio.error)audio.load?.();active=clip;try{audio.currentTime=0;}catch{}audio.playbackRate=rate;audio.preservesPitch=true;let failed=false;
 const fail=()=>{if(generation!==ticket||failed)return;failed=true;audio.pause();active=null;onError();};audio.onended=()=>{if(generation===ticket){active=null;onEnded();}};audio.onerror=fail;audio.onplaying=()=>{if(generation===ticket)onPlaying(url);};audio.onwaiting=()=>{if(generation===ticket)onLoading(url);};onLoading(url);
 // Start directly in the tap handler: do not await fetch and lose mobile playback permission.
 try{Promise.resolve(audio.play()).catch(fail);}catch{fail();}return true;}
 };return player;
}
const api={createPlayer};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.RecordedSpeech=api;
})(typeof window!=='undefined'?window:globalThis);
