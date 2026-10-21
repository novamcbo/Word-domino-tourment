// Pure serpentine layout. Logical tile order is never changed by display direction.
export function snakeLayout(chain,limit=240){
 const short=24,long=48,gap=2,rowGap=76,items=[];let row=0,cursor=0,dir=1,last=null;const links=[];
 for(let i=0;i<chain.length;i++){
  const t=chain[i],double=t[0]===t[1],length=double?short:long;
  if(cursor+length>limit&&cursor>0){
   const edge=dir===1?limit:0;
   const bendX=edge+dir*28,bendY=row*rowGap+rowGap/2;
   const angle=double?0:90;
   const w=double?long:short,h=double?short:long;
   const entry={x:bendX,y:bendY-h/2},exit={x:bendX,y:bendY+h/2};
   if(last)links.push(`M ${last.x} ${last.y} H ${bendX} V ${entry.y}`);
   items.push({i,t,x:bendX,y:bendY,w,h,angle,entry,exit,bend:true});
   last=exit;row++;dir*=-1;cursor=0;continue;
  }
  const x=dir===1?cursor+length/2:limit-cursor-length/2,y=row*rowGap;
  const entry={x:x-dir*length/2,y},exit={x:x+dir*length/2,y};
  if(last)links.push(last.y===y?`M ${last.x} ${last.y} L ${entry.x} ${entry.y}`:`M ${last.x} ${last.y} V ${y} H ${entry.x}`);
  items.push({i,t,x,y,w:length,h:double?long:short,angle:double?90:dir===1?0:180,entry,exit,bend:false});last=exit;cursor+=length+gap;
 }
 if(!items.length)return {items,links,viewBox:'-1 -1 2 2'};
 const minX=Math.min(...items.map(p=>p.x-p.w/2))-14,maxX=Math.max(...items.map(p=>p.x+p.w/2))+14;
 const minY=Math.min(...items.map(p=>p.y-p.h/2))-18,maxY=Math.max(...items.map(p=>p.y+p.h/2))+18;
 return {items,links,viewBox:`${minX} ${minY} ${maxX-minX} ${maxY-minY}`};
}
const patterns={0:[],1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]};
function face(n,offset){return patterns[n].map(p=>`<circle cx="${offset+5+(p%3)*6}" cy="${-6+Math.floor(p/3)*6}" r="2.1" fill="#173d32"/>`).join('');}
export function snakeSVG(chain,width=240){const layout=snakeLayout(chain,width);return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${layout.viewBox}" role="img" aria-label="Cadena de dominó en serpiente"><g fill="none" stroke="#d3c8a1" stroke-width="2.5" stroke-linejoin="round">${layout.links.map(d=>`<path d="${d}"/>`).join('')}</g>${layout.items.map(p=>`<g transform="translate(${p.x} ${p.y}) rotate(${p.angle})"><title>${p.t[0]}-${p.t[1]}</title><rect x="-24" y="-12" width="48" height="24" rx="3" fill="#fff9e8" stroke="#bdb89e" stroke-width=".8"/><path d="M 0 -9 V 9" stroke="#bbb6a2" stroke-width=".7"/>${face(p.t[0],-23)}${face(p.t[1],1)}</g>`).join('')}</svg>`;}
