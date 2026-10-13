(function(){
const f=n=>Math.round(n*10)/10,R=Math.PI/180,cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const PAL={classic:['#d6a21c','#b3151b','#2f7a3a'],scarlet:['#e3b53f','#d8262c','#7d1a1e'],forest:['#c9a227','#a8231f','#237a4a'],amber:['#e0a526','#d9531e','#3d6b3a'],berry:['#d6a21c','#9c1f4a','#2f7a58']};
function theme(st,pk){const [g,r,n]=PAL[pk],blk='#16100d',cr='#f4ead2';
 if(st==='black')return{bg:['#241a14','#0a0807'],flat:'#15100d',stem:g,leaf:pk==='forest'?[n,g,n,r]:pk==='scarlet'?[r,g,r,n]:[g,r,g,n],vein:'#6b4a08',berry:r,ring:g,hi:'#f6d98a',fr:g,rose:[g,blk,r,'#f6d98a']};
 if(st==='gold')return{bg:['#f0c75e','#c48c16'],flat:'#d9a52a',stem:blk,leaf:pk==='forest'?[n,blk,n,r]:[r,blk,r,n],vein:'#f6d98a',berry:r,ring:blk,hi:'#f6d98a',fr:blk,rose:[blk,'#f6d98a',r,'#f6d98a']};
 if(st==='red')return{bg:['#b3151b','#640c10'],flat:'#8f1519',stem:g,leaf:[cr,g,cr,n],vein:'#640c10',berry:cr,ring:g,hi:'#fff',fr:g,rose:[g,'#640c10',cr,g]};
 return{bg:['#f8f0d8','#e4d4a4'],flat:'#f1e6c8',stem:blk,leaf:[r,blk,g,n],vein:'#f8f0d8',berry:r,ring:blk,hi:'#f6d98a',fr:blk,rose:[blk,g,r,'#f8f0d8']}}
function mb(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const P=a=>a.map(q=>f(q[0])+' '+f(q[1])).join('L');
function curl(x,y,a0,L,k0,k1,sg,p){const n=Math.max(20,L/1.5|0),ds=L/n;let a=a0*R,lx=x,ly=y,la=a;const o=[[x,y,a]];for(let i=0;i<n;i++){const k=k0+(k1-k0)*Math.pow(i/n,p);a+=sg*k*ds;x+=Math.cos(a)*ds;y+=Math.sin(a)*ds;if(i===n-1||Math.hypot(x-lx,y-ly)>=7||Math.abs(a-la)>=.2){o.push([x,y,a]);lx=x;ly=y;la=a}}return o}
function taper(pts,w0,w1,c){const l=[],r=[],n=pts.length;for(let i=0;i<n;i++){const a=pts[Math.max(0,i-1)],b=pts[Math.min(n-1,i+1)];let dx=b[0]-a[0],dy=b[1]-a[1];const d=Math.hypot(dx,dy)||1;dx/=d;dy/=d;const w=(w0+(w1-w0)*i/(n-1))/2;l.push([pts[i][0]-dy*w,pts[i][1]+dx*w]);r.push([pts[i][0]+dy*w,pts[i][1]-dx*w])}
 return`<path d="M${P(l.concat(r.reverse()))}Z" fill="${c}"/><circle cx="${f(pts[0][0])}" cy="${f(pts[0][1])}" r="${f(w0/2)}" fill="${c}"/>`}
function leaf(x,y,ang,L,wd,c,v,bd,sh){sh=sh||.8;const a=ang*R,dx=Math.cos(a),dy=Math.sin(a),nx=-dy,ny=dx,l=[],r=[],m=[],n=9;for(let i=0;i<=n;i++){const t=i/n,w=wd*Math.sin(Math.PI*Math.pow(t,sh))*(1-.2*t),cx=x+dx*L*t+nx*bd*Math.sin(Math.PI*t)*L,cy=y+dy*L*t+ny*bd*Math.sin(Math.PI*t)*L;l.push([cx+nx*w,cy+ny*w]);r.push([cx-nx*w,cy-ny*w]);m.push([cx,cy])}
 return`<path d="M${P(l.concat(r.reverse()))}Z" fill="${c}"/><path d="M${P(m.slice(1,8))}" stroke="${v}" stroke-width="${f(Math.max(1.2,wd*.1))}" fill="none"/>`}
function berry(x,y,r,T){return`<circle cx="${f(x)}" cy="${f(y)}" r="${f(r+Math.max(2,r*.16))}" fill="${T.ring}"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${T.berry}"/><circle cx="${f(x-r*.32)}" cy="${f(y+r*.32)}" r="${f(r*.3)}" fill="${T.hi}"/>`}
function side(T,rnd,V){const J=(v,p)=>v*(1+(rnd()-.5)*2*p),lx=V.lush;let s='',k=Math.floor(rnd()*4);
 const nC=cl(2+Math.floor(lx/4)+(rnd()<.35?1:0),2,4);
 for(let i=0;i<nC;i++){const t=nC>1?i/(nC-1):0,y=J(55+t*195,.06),a0=J(5+t*68,.15),L=J(380-t*160,.1),k1=J(.13+t*.02,.18),pa=curl(0,y,a0,L,.0006+.0004*t,k1,-1,1.6+rnd());
  s+=taper(pa,15-4*t,3.5,T.stem);
  const nl=3+Math.floor(lx/4)+(rnd()<.4?1:0),lf=64-18*t;
  for(let j=0;j<nl;j++){const u=.14+.64*(j+rnd()*.5)/nl,q=pa[(u*(pa.length-1))|0];
   s+=leaf(q[0],q[1],q[2]/R+40+rnd()*28,lf*(1.1-u*.5)*J(1,.15),lf*(.24+rnd()*.12),T.leaf[k++%4],T.vein,(rnd()-.4)*.3,.6+rnd()*.5)}
  if(lx>4)for(let j=0;j<2;j++){const u=.35+.3*j+rnd()*.1,q=pa[(u*(pa.length-1))|0],d=20+rnd()*8;s+=berry(q[0]+Math.sin(q[2])*d,q[1]-Math.cos(q[2])*d,7+rnd()*4,T)}
  const e=pa[pa.length-1],ty=rnd();
  if(ty<.6)s+=berry(e[0],e[1],13+rnd()*5,T);
  else if(ty<.8)s+=leaf(e[0],e[1],e[2]/R,50,14,T.leaf[k++%4],T.vein,0,.8);
  else{s+=berry(e[0],e[1],11,T);s+=berry(e[0]+9,e[1]+16,8,T)}}
 const ng=2+(rnd()*3|0);for(let g=0;g<ng;g++)s+=taper(curl(10,6,12+g*(50/ng)+rnd()*10,J(100,.15),0,.02,-1,1.5),8,1,T.stem);return s}
function mid(T,rnd){const st=[];for(let i=0;i<=40;i++){const t=i/40;st.push([Math.sin(t*3)*5*(1-t),t*285])}
 let s=taper(st,17,9,T.stem);const v=rnd()*3|0;
 if(v===0){[[90,120,0],[62,80,2],[118,80,2]].forEach(l=>{s+=leaf(0,285,l[0],l[1],l[1]*.27,T.leaf[l[2]],T.vein,l[0]===90?0:(l[0]<90?-.1:.1))});[[-26,268],[26,268],[0,250]].forEach(b=>{s+=berry(b[0],b[1],17,T)})}
 else if(v===1){[[72,95],[108,95]].forEach(l=>{s+=leaf(0,262,l[0],l[1],24,T.leaf[2],T.vein,l[0]<90?-.1:.1,.8)});[[-20,296],[20,296],[0,322],[0,276]].forEach(b=>{s+=berry(b[0],b[1],15,T)})}
 else{[[60,95,1],[90,130,0],[120,95,1]].forEach(l=>{s+=leaf(0,282,l[0],l[1],l[1]*.25,T.leaf[l[2]],T.vein,0,.9)});s+=berry(0,300,13,T)}
 return s}
function sprig(ox,oy,rot,sc,sx,T,rnd,V){const a=side(T,rnd,V),b=mid(T,rnd),a2=V.sym?a:side(T,rnd,V);
 return`<g transform="translate(${f(ox)} ${f(oy)}) rotate(${f(-rot)})"><g transform="scale(${f(sx*sc)} ${f(-sc)})">${a}${b}</g><g transform="scale(${f(-sx*sc)} ${f(-sc)})">${a2}</g></g>`}
function gen(S){const {seed,comp,st,d,p,lush,sym}=S,rnd=mb(seed),T=theme(st,p),V={lush,sym},C=500,uid=[seed,comp,st,d,p,lush,sym?1:0].join('_');
 let body='',frame=true,defs=`<radialGradient id="g${uid}"><stop offset="0" stop-color="${T.bg[0]}"/><stop offset="1" stop-color="${T.bg[1]}"/></radialGradient>`,bg=`url(#g${uid})`;
 if(comp==='rose'){const N=d>5?6:5,sx=N===6?.78:.9;
  for(let k=0;k<N;k++){const an=90+k*360/N;body+=sprig(C+70*Math.cos(an*R),C-70*Math.sin(an*R),an-90,.78,sx,T,rnd,V)}
  for(let k=0;k<N;k++){const an=90+(k+.5)*360/N;
   if(d>=3)body+=sprig(C+185*Math.cos(an*R),C-185*Math.sin(an*R),an-90,.26,.9,T,rnd,V);
   if(d>=7)body+=sprig(C+335*Math.cos(an*R),C-335*Math.sin(an*R),an-90,.2,.9,T,rnd,V);
   if(d>=9)body+=sprig(C+420*Math.cos(an*R),C-420*Math.sin(an*R),an-90,.12,.9,T,rnd,V)}
  body+=`<circle cx="${C}" cy="${C}" r="66" fill="${T.rose[0]}"/><circle cx="${C}" cy="${C}" r="58" fill="${T.rose[1]}"/><circle cx="${C}" cy="${C}" r="47" fill="${T.rose[2]}"/><circle cx="${C}" cy="${C}" r="19" fill="${T.rose[3]}"/>`}
 else if(comp==='branch'){body+=sprig(C,905,0,1.38,1,T,rnd,V);
  if(d>=3)[[100,900,-45],[900,900,45],[100,100,-135],[900,100,135]].forEach(c=>{body+=sprig(c[0],c[1],c[2],.5,.85,T,rnd,V)});
  if(d>=6)[[130,660,-32],[870,660,32]].forEach(c=>{body+=sprig(c[0],c[1],c[2],.42,.85,T,rnd,V)});
  if(d>=8)[[70,480,-22],[930,480,22]].forEach(c=>{body+=sprig(c[0],c[1],c[2],.3,.85,T,rnd,V)})}
 else if(comp==='repeat'){frame=false;bg=T.flat;const cols=2+Math.floor(d/3),cw=1000/cols,sc=cw/414*.95,rows=Math.ceil(1000/cw)+1;
  defs+=`<g id="a${uid}">${sprig(0,0,0,sc,.9,T,rnd,V)}</g><g id="b${uid}">${sprig(0,0,0,sc,.9,T,rnd,V)}</g>`;
  for(let r=0;r<=rows;r++)for(let c=-1;c<=cols;c++){const x=c*cw+cw/2+(r%2)*cw/2,y=r*cw*.98+cw*.5;body+=`<use href="#${(r+c)%2?'a':'b'}${uid}" transform="translate(${f(x)} ${f(y)})"/>`}}
 else{const M=7+d*2,pl=[];for(let a=0;a<900&&pl.length<M;a++){const sc=.2+rnd()*.22,x=90+rnd()*820,y=90+rnd()*820;if(pl.every(q=>Math.hypot(q.x-x,q.y-y)>(q.sc+sc)*230))pl.push({x,y,sc,rot:rnd()*360})}
  pl.sort((a,b)=>a.sc-b.sc).forEach(q=>{body+=sprig(q.x,q.y,q.rot,q.sc,.9,T,rnd,V)})}
 const fr=frame?`<rect x="14" y="14" width="972" height="972" fill="none" stroke="${T.fr}" stroke-width="4"/><rect x="26" y="26" width="948" height="948" fill="none" stroke="${T.fr}" stroke-width="1.5"/>`:'';
 return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000"><defs>${defs}</defs><rect width="1000" height="1000" fill="${bg}"/>${fr}${body}</svg>`}

const $=id=>document.getElementById(id),pick=a=>a[Math.random()*a.length|0],ns=()=>(Math.random()*1e6)|0;
const S={seed:ns(),comp:'rose',st:'black',d:5,lush:5,p:'classic',sym:true},H=[];
const snap=()=>Object.assign({},S),TH=new Map(),thumb=h=>{const k=JSON.stringify(h);if(!TH.has(k)){if(TH.size>40)TH.clear();TH.set(k,gen(h))}return TH.get(k)};
function sync(){$('cp').value=S.comp;$('st').value=S.st;$('dn').value=S.d;$('dv').textContent=S.d;$('ls').value=S.lush;$('lv').textContent=S.lush;$('sy').checked=S.sym;$('sd').textContent=S.seed;document.querySelectorAll('.pals button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.p===S.p))}
function show(){$('out').innerHTML=gen(S);sync();$('var').innerHTML='';H.forEach(h=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Вариант '+h.seed);b.setAttribute('aria-pressed',JSON.stringify(h)===JSON.stringify(S));b.innerHTML=thumb(h);b.onclick=()=>{Object.assign(S,h);show()};$('var').appendChild(b)})}
function push(){const s=snap();H.splice(0,H.length,s,...H.filter(h=>h.seed!==s.seed||h.comp!==s.comp).slice(0,5))}
function upd(k,v){S[k]=v;const i=H.findIndex(h=>h.seed===S.seed);if(i>=0)H[i]=snap();show()}
$('go').onclick=()=>{S.seed=ns();push();show()};
$('rnd').onclick=()=>{Object.assign(S,{seed:ns(),comp:pick(['rose','branch','repeat','scatter']),st:pick(['black','gold','red','cream']),d:2+(Math.random()*9|0),lush:2+(Math.random()*9|0),p:pick(Object.keys(PAL)),sym:Math.random()<.7});push();show()};
$('cp').onchange=e=>upd('comp',e.target.value);
$('st').onchange=e=>upd('st',e.target.value);
$('dn').oninput=e=>upd('d',+e.target.value);
$('ls').oninput=e=>upd('lush',+e.target.value);
$('sy').onchange=e=>upd('sym',e.target.checked);
document.querySelectorAll('.pals button').forEach(b=>b.onclick=()=>upd('p',b.dataset.p));
push();show();

const say=t=>{$('msg').textContent=t};
function dlFile(name,data,type){const u=URL.createObjectURL(data instanceof Blob?data:new Blob([data],{type}));const a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1500)}
$('dsvg').onclick=()=>dlFile('hohloma-'+S.seed+'.svg',gen(S),'image/svg+xml');
$('dpng').onclick=()=>{const im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=c.height=2000;c.getContext('2d').drawImage(im,0,0,2000,2000);c.toBlob(b=>b?dlFile('hohloma-'+S.seed+'.png',b):say('Не удалось создать PNG.'),'image/png')};im.onerror=()=>say('Не удалось создать PNG.');im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(gen(S))};
})();
