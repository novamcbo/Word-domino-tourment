import assert from 'node:assert/strict';import {snakeLayout,snakeSVG} from './dist/layout.mjs';
const deck=[];for(let a=0;a<=6;a++)for(let b=a;b<=6;b++)deck.push([a,b]);
for(let run=0;run<250;run++){
 const chain=[...deck];for(let i=27;i>0;i--){const j=Math.floor(Math.random()*(i+1));[chain[i],chain[j]]=[chain[j],chain[i]];}
 for(const width of [192,288]){const l=snakeLayout(chain,width);assert.equal(l.items.length,28);const [x,y,w,h]=l.viewBox.split(' ').map(Number);
 for(const p of l.items){assert.ok(p.x-p.w/2>=x&&p.x+p.w/2<=x+w);assert.ok(p.y-p.h/2>=y&&p.y+p.h/2<=y+h);}
 for(let i=0;i<28;i++)for(let j=i+1;j<28;j++){const a=l.items[i],b=l.items[j];const dx=Math.abs(a.x-b.x)-(a.w+b.w)/2,dy=Math.abs(a.y-b.y)-(a.h+b.h)/2;assert.ok(dx>=0||dy>=0,`overlap ${i},${j}`);if(j===i+1)assert.ok((dx===0&&dy<0)||(dy===0&&dx<0),`not touching ${i},${j}`);}
 assert.ok(l.items.some(p=>p.bend));assert.ok(!snakeSVG(chain,width).includes('<path d="M ' + ' '));}
}console.log('PASS: 500 shuffled full-chain layouts, all consecutive tiles touch, no overlaps.');
