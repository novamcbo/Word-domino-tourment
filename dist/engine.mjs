export const sum=h=>h.reduce((s,t)=>s+t[0]+t[1],0);
export function create(mode='teams',target=100,scores=[0,0,0,0],round=1){const deck=[];for(let a=0;a<7;a++)for(let b=a;b<7;b++)deck.push([a,b]);for(let i=27;i>0;i--){const j=Math.floor(Math.random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]];}const hands=[0,1,2,3].map(i=>deck.slice(i*7,i*7+7));return {hands,chain:[],turn:hands.findIndex(h=>h.some(t=>t[0]===6&&t[1]===6)),passes:0,over:false,mode,target,scores:[...scores],round,log:[],result:null};}
export function options(s,p=s.turn){if(s.over)return [];const out=[];s.hands[p].forEach((t,i)=>{if(!s.chain.length){if(t[0]===6&&t[1]===6)out.push({i,side:'right'});return;}const l=s.chain[0][0],r=s.chain.at(-1)[1];if(t.includes(l))out.push({i,side:'left'});if(t.includes(r))out.push({i,side:'right'});});return out;}
function finish(s,w,blocked){if(s.over)return;const points=s.hands.map(sum);let award=0;if(blocked){if(s.mode==='teams'){const a=points[0]+points[2],b=points[1]+points[3];w=a===b?null:a<b?0:1;}else{const min=Math.min(...points);const winners=points.map((v,i)=>v===min?i:null).filter(v=>v!==null);w=winners.length===1?winners[0]:null;}}
if(w!==null){if(s.mode==='teams'){w%=2;award=points.filter((_,i)=>i%2!==w).reduce((a,b)=>a+b,0);}else award=points.reduce((a,b,i)=>a+(i===w?0:b),0);s.scores[w]+=award;}s.over=true;s.result={winner:w,award,blocked,points,match:w!==null&&s.scores[w]>=s.target};}
export function play(s,move){if(!options(s).some(o=>o.i===move.i&&o.side===move.side))return false;const p=s.turn,t=s.hands[p].splice(move.i,1)[0];let oriented=[...t];if(s.chain.length){if(move.side==='left'){if(oriented[1]!==s.chain[0][0])oriented.reverse();}else if(oriented[0]!==s.chain.at(-1)[1])oriented.reverse();}if(move.side==='left')s.chain.unshift(oriented);else s.chain.push(oriented);s.log.unshift({p,text:`${t[0]} · ${t[1]}`});s.passes=0;if(!s.hands[p].length)finish(s,p,false);else {s.turn=(p+1)%4;settleBlocked(s);}return true;}
export function pass(s){if(s.over||options(s).length)return false;s.log.unshift({p:s.turn,text:'Pasó'});s.passes++;if(s.passes===4)finish(s,null,true);else {s.turn=(s.turn+1)%4;settleBlocked(s);}return true;}
export function best(s){const opts=options(s);return opts.sort((a,b)=>{const score=o=>{const t=s.hands[s.turn][o.i];return t[0]+t[1]+(t[0]===t[1]?3:0)+s.hands[s.turn].filter(x=>x.includes(t[0])||x.includes(t[1])).length*.4;};return score(b)-score(a);})[0];}

// Check every hand: a blocked human turn alone is not a blocked game.
export function settleBlocked(s){
 if(s.over||!s.chain.length||s.hands.some(h=>!h.length))return false;
 if(s.hands.every((_,p)=>options(s,p).length===0)){finish(s,null,true);return true;}
 return false;
}
