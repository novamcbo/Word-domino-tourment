// Place rectangles edge-to-edge. At corners, matching half-faces touch sideways.
export function snakeLayout(chain,limit=240){
 const items=[];let direction=1,descending=false,rowY=0;
 for(let i=0;i<chain.length;i++){
  const t=chain[i],double=t[0]===t[1];let vertical=descending,x,y;
  let w=vertical?(double?48:24):(double?24:48),h=vertical?(double?24:48):(double?48:24);
  const prev=items.at(-1);
  if(!prev){x=w/2;y=0;}
  else if(descending){
   const outputY=prev.y+(prev.t[0]===prev.t[1]?0:12);
   if(outputY-rowY>=72){
    descending=false;vertical=false;direction*=-1;rowY=outputY;
    w=double?24:48;h=double?48:24;
    x=prev.x+direction*(prev.w/2+w/2);y=rowY;
   }else{x=prev.x;y=prev.y+prev.h/2+h/2;}
  }else{
   x=prev.x+direction*(prev.w/2+w/2);y=rowY;
   if((direction===1&&x+w/2>limit)||(direction===-1&&x-w/2<0)){
    descending=true;vertical=true;w=double?48:24;h=double?24:48;
    x=prev.x+direction*(prev.w/2+w/2);y=rowY+(double?0:12);
   }
  }
  const angle=vertical?(double?0:90):(double?90:direction===1?0:180);
  items.push({i,t,x,y,w,h,angle,bend:vertical});
 }
 if(!items.length)return {items,viewBox:'0 0 96 72'};
 const x=Math.min(...items.map(p=>p.x-p.w/2))-8,y=Math.min(...items.map(p=>p.y-p.h/2))-8;
 const right=Math.max(...items.map(p=>p.x+p.w/2))+8,bottom=Math.max(...items.map(p=>p.y+p.h/2))+8;
 return {items,viewBox:`${x} ${y} ${right-x} ${bottom-y}`};
}
const patterns={0:[],1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]};
function face(n,offset){return patterns[n].map(p=>`<circle cx="${offset+5+(p%3)*6}" cy="${-6+Math.floor(p/3)*6}" r="2.35" fill="#10261f"/>`).join('');}
export function snakeSVG(chain,width=240){const layout=snakeLayout(chain,width);return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${layout.viewBox}" role="img" aria-label="Cadena de dominó en serpiente">${layout.items.map(p=>`<g transform="translate(${p.x} ${p.y}) rotate(${p.angle})"><title>${p.t[0]}-${p.t[1]}</title><rect x="-24" y="-12" width="48" height="24" rx="1.8" fill="#fff8e7" stroke="#887e65" stroke-width=".8"/><path d="M 0 -9 V 9" stroke="#a3987d" stroke-width=".7"/>${face(p.t[0],-23)}${face(p.t[1],1)}</g>`).join('')}</svg>`;}
