/* Selected practice words composed from the public Grade 1 Unit 1 character scope.
   This is not the complete textbook word list. Stories and question design are original. */
(function(root){
const raw=[
['eyes','眼睛','眼睛','尋找森林的光','翠光森林','把明亮的字找回來，點亮森林裡的小燈。','👁',[
 ['眼睛','眼睛','yǎn jing','eyes','👀'],['上','上','shàng','up','⬆️'],['下','下','xià','down','⬇️'],['中間','中间','zhōng jiān','middle','↔️'],['嘴','嘴','zuǐ','mouth','👄'],['鼻子','鼻子','bí zi','nose','👃'],['葡萄','葡萄','pú tao','grapes','🍇'],['黑','黑','hēi','black','⚫']]],
['ears','耳朵','耳朵','聽見山谷的祕密','回聲山谷','小龍把方向弄混了。用字詞幫牠找到路。','♪',[
 ['耳朵','耳朵','ěr duo','ears','👂'],['左','左','zuǒ','left','⬅️'],['右','右','yòu','right','➡️'],['山','山','shān','mountain','⛰️'],['兩','两','liǎng','two','✌️'],['看','看','kàn','look','👀'],['前','前','qián','front',''],['後','后','hòu','behind','']]],
['hands','手','手','小小毛筆的力量','巧手石橋','帶著你的毛筆，喚醒石橋上的字靈。','✋',[
 ['手','手','shǒu','hand','✋'],['腳','脚','jiǎo','foot','🦶'],['頭','头','tóu','head',''],['朋友','朋友','péng you','friend','🤝'],['你','你','nǐ','you',''],['我','我','wǒ','I / me',''],['大','大','dà','big',''],['小','小','xiǎo','small','']]],
['radish','蘿蔔','萝卜','彩色花園的訪客','彩光花園','花園的顏色躲起來了，一起把它們找回來。','✿',[
 ['蘿蔔','萝卜','luó bo','radish',''],['紅','红','hóng','red','🔴'],['綠','绿','lǜ','green','🟢'],['黃','黄','huáng','yellow','🟡'],['藍','蓝','lán','blue','🔵'],['公雞','公鸡','gōng jī','rooster','🐓'],['尾巴','尾巴','wěi ba','tail',''],['地','地','dì','ground','']]],
['peanut','花生','花生','花生屋的好朋友','花生小屋','森林裡的小伙伴，準備了一份小小的驚喜。','⌂',[
 ['花生','花生','huā shēng','peanut','🥜'],['花','花','huā','flower','🌸'],['白','白','bái','white','⚪'],['坐','坐','zuò','sit','🪑'],['立','立','lì','stand',''],['走','走','zǒu','walk','🚶'],['睡','睡','shuì','sleep','💤'],['裡面','里面','lǐ miàn','inside','']]],
['village','一去二三里','一去二三里','通往雲上的小路','雲上小村','沿著山路數一數，找到雲上的村莊。','☁',[
 ['一','一','yī','one','1️⃣'],['二','二','èr','two','2️⃣'],['三','三','sān','three','3️⃣'],['四','四','sì','four','4️⃣'],['六','六','liù','six','6️⃣'],['門','门','mén','door','🚪'],['樹','树','shù','tree','🌳'],['路','路','lù','road','']]],
['count','算一算','算一算','字靈之森的約定','星光樹屋','最後一個小冒險！和小龍一起守護字靈之森。','✦',[
 ['鳥','鸟','niǎo','bird','🐦'],['飛','飞','fēi','fly',''],['加','加','jiā','add','➕'],['減','减','jiǎn','subtract','➖'],['幾','几','jǐ','how many',''],['多','多','duō','many',''],['少','少','shǎo','few',''],['算','算','suàn','calculate','🧮']]]
];
const chapters=raw.map((r,i)=>({id:r[0],title:r[1],simpleTitle:r[2],story:r[3],place:r[4],description:r[5],icon:r[6],number:i+1,words:r[7].map((w,j)=>({id:r[0]+'-'+j,traditional:w[0],simplified:w[1],pinyin:w[2],meaning:w[3],emoji:w[4]}))}));
chapters.forEach((c,i)=>{c.reviewWords=chapters.slice(0,i+1).flatMap(ch=>ch.words);});
const curriculum={chapters,words:chapters.flatMap(c=>c.words),source:'https://mlpchinese.com/static/common/pdf/01-shengzi.pdf',version:1};
if(typeof module!=='undefined'&&module.exports)module.exports=curriculum;else root.Curriculum=curriculum;
})(typeof window!=='undefined'?window:globalThis);
