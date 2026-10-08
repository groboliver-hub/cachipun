import {stats} from './engine.js';
export function duelStats(state){
 const [a,b]=state.players, alias=id=>id===a?'oliver':'valentina',real=id=>id==='oliver'?a:b;
 const s=stats({matches:state.matches.filter(m=>m.status==='resolved').map(m=>({...m,date:m.resolvedOn||m.date,winner:alias(m.winner),rounds:m.rounds.map(r=>({oliver:r[a],valentina:r[b]}))}))});
 return {users:{[a]:s.users.oliver,[b]:s.users.valentina},owners:Object.fromEntries(Object.entries(s.owners).map(([n,id])=>[n,real(id)])),record:{...s.record,owner:s.record.owner?real(s.record.owner):null},commemoratives:s.commemoratives.map(m=>({...m,owner:real(m.owner)}))};
}
export function currentDate(state){
 const finished=state.matches.find(m=>m.resolvedOn===state.today);
 if(finished)return finished.date;
 return state.matches.filter(m=>m.status==='open'&&m.date<=state.today&&(m.rounds.length||m.bet||Object.values(m.submitted).some(Boolean))).sort((a,b)=>a.date.localeCompare(b.date))[0]?.date||state.today;
}
export function emptyMatch(date,duelId){return {date,duelId,rounds:[],submitted:{},winner:null,status:'open',bet:null}}
