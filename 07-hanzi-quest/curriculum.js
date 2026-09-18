/* Complete shared character and word library, grouped into short replayable lessons. */
(function(root){
const V=typeof module!=='undefined'&&module.exports?require('./shared-vocabulary.js'):root.SharedHanziVocabulary;
const lessonRows=[
 [1,1,'眼睛','眼睛'],[1,1,'耳朵','耳朵'],[1,1,'手','手'],[1,1,'蘿蔔','萝卜'],[1,1,'花生','花生'],[1,1,'一去二三里','一去二三里'],[1,1,'算一算','算一算'],
 [1,2,'雨','雨'],[1,2,'鏡子','镜子'],[1,2,'袋鼠','袋鼠'],[1,2,'畫','画'],[1,2,'小蝌蚪','小蝌蚪'],[1,2,'彎彎的月亮','弯弯的月亮'],[1,2,'一頭牛','一头牛'],
 [1,3,'小山羊','小山羊'],[1,3,'種魚','种鱼'],[1,3,'落葉','落叶'],[1,3,'下雪的時候','下雪的时候'],[1,3,'烏鴉喝水','乌鸦喝水'],[1,3,'小猴子下山','小猴子下山'],
 [2,1,'撈月亮','捞月亮'],[2,1,'白菜的故事','白菜的故事'],[2,1,'小貓釣魚','小猫钓鱼'],[2,1,'狐狸和烏鴉','狐狸和乌鸦'],
 [2,2,'一粒種子','一粒种子'],[2,2,'謎語','谜语'],[2,2,'美麗的公雞','美丽的公鸡'],[2,2,'埋蛇的孩子','埋蛇的孩子'],[2,2,'駱駝和羊','骆驼和羊'],
 [2,3,'小弟和小貓','小弟和小猫'],[2,3,'小壁虎借尾巴','小壁虎借尾巴'],[2,3,'植物媽媽有辦法','植物妈妈有办法'],[2,3,'鐵棒磨成針','铁棒磨成针']
];
const legacy={
 '1-1-1':['eyes','尋找森林的光','翠光森林','把明亮的字找回來，點亮森林裡的小燈。','👁','1'],
 '1-1-2':['ears','聽見山谷的祕密','回聲山谷','小龍把方向弄混了。用字詞幫牠找到路。','♪','2'],
 '1-1-3':['hands','小小毛筆的力量','巧手石橋','帶著你的毛筆，喚醒石橋上的字靈。','✋','3–4'],
 '1-1-4':['radish','彩色花園的訪客','彩光花園','花園的顏色躲起來了，一起把它們找回來。','✿','5'],
 '1-1-5':['peanut','花生屋的好朋友','花生小屋','森林裡的小伙伴，準備了一份小小的驚喜。','⌂','6'],
 '1-1-6':['village','通往雲上的小路','雲上小村','沿著山路數一數，找到雲上的村莊。','☁','7'],
 '1-1-7':['count','字靈之森的約定','星光樹屋','和小龍一起守護字靈之森。','✦','8'],
 '1-2-1':['rain','找回天空的雨滴','雨滴小徑','聽清楚天氣的字，讓森林重新喝到水。','☂','1'],
 '1-2-2':['mirror','鏡子裡的笑臉','明鏡湖畔','幫小龍讀懂鏡子裡的表情。','◇','2'],
 '1-2-3':['kangaroo','袋鼠的神奇口袋','口袋草原','找出袋鼠口袋裡藏著的字詞。','☆','3'],
 '1-2-4':['painting','畫裡的春天','春色畫橋','讀一讀遠近與聲音，打開春天的畫。','✿','4'],
 '1-2-5':['tadpole','小蝌蚪的變身','青蛙池塘','認出身體與衣服的字，陪小蝌蚪長大。','≈','5–6'],
 '1-2-6':['moon','月亮上的小船','月光星河','在星空中認字，找到彎彎的小船。','☾','7'],
 '1-2-7':['cow','草地上的動物朋友','百草牧場','認識動物與數量，完成這個單元的冒險。','♧','8']
};
const lessonNumber={};
const chapters=lessonRows.map((row,index)=>{
 const [grade,unit,title,simpleTitle]=row,keyBase=`${grade}-${unit}`,lesson=(lessonNumber[keyBase]||0)+1;lessonNumber[keyBase]=lesson;
 const key=`${grade}-${unit}-${lesson}`,meta=legacy[key]||[`g${grade}-u${unit}-l${lesson}`,`第 ${lesson} 課的字靈試煉`,`第 ${unit} 單元秘境`,`每次練習 8 個本課字詞，重玩會輪換未練內容。`,'✦',''];
 const words=V.items.filter(w=>w.grade===grade&&w.unit===unit&&w.lesson===lesson);
 return{id:meta[0],grade,unit,book:unit,lesson,title,simpleTitle,story:meta[1],place:meta[2],description:meta[3],icon:meta[4],weeks:meta[5],alias:key==='1-2-6'?'小小的船':'',number:index+1,practiceSize:8,words};
});
chapters.forEach((c,i)=>{c.reviewWords=chapters.slice(0,i).flatMap(ch=>ch.words);});
const curriculum={chapters,words:V.items,counts:V.counts,sources:V.sources,version:3};
if(typeof module!=='undefined'&&module.exports)module.exports=curriculum;else root.Curriculum=curriculum;
})(typeof window!=='undefined'?window:globalThis);
