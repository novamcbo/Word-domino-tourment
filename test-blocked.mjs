import assert from 'node:assert/strict';import{play,pass,settleBlocked,options}from'./dist/engine.mjs';
const fixture=()=>({hands:[[[0,0],[0,5],[1,4],[2,5],[4,4],[6,6]],[[0,2],[1,1],[1,5],[3,3],[5,5]],[[0,3],[1,2],[2,2],[3,4]],[[0,4],[1,3],[2,4],[3,5]]],chain:[[6,0],[0,1],[1,6],[6,2],[2,3],[3,6],[6,4],[4,5],[5,6]],turn:0,passes:0,over:false,mode:'teams',target:100,scores:[10,20,0,0],round:3,log:[],result:null});
const s=fixture();assert.equal(settleBlocked(s),false);assert.ok(play(s,{i:5,side:'right'}));assert.ok(s.over);assert.ok(s.result.blocked);assert.deepEqual(s.result.points,[25,26,17,22]);assert.equal(s.result.winner,0);assert.equal(s.result.award,48);assert.deepEqual(s.scores,[58,20,0,0]);assert.equal(settleBlocked(s),false);assert.deepEqual(s.scores,[58,20,0,0]);
const resumed=fixture();resumed.hands[0].pop();resumed.chain.push([6,6]);assert.ok(settleBlocked(resumed));assert.equal(resumed.result.award,48);
const skipped=fixture();skipped.turn=1;assert.equal(options(skipped).length,0);assert.equal(settleBlocked(skipped),false);assert.ok(pass(skipped));assert.equal(skipped.turn,2);assert.equal(skipped.over,false);
const tie=fixture();tie.hands=[[[0,1]],[[0,2]],[[2,3]],[[1,3]]];assert.ok(settleBlocked(tie));assert.equal(tie.result.winner,null);assert.equal(tie.result.award,0);assert.deepEqual(tie.scores,[10,20,0,0]);
const solo=fixture();solo.mode='solo';solo.hands[0].pop();assert.ok(settleBlocked(solo));assert.equal(solo.result.winner,2);assert.equal(solo.result.award,73);
const match=fixture();match.scores[0]=60;play(match,{i:5,side:'right'});assert.equal(match.result.match,true);assert.equal(match.scores[0],108);
console.log('PASS: immediate block, 42 vs 48 team pips, award once, restore, single pass, tie, individual and match win.');
