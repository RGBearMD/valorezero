// Legge content/*.json e genera public/js/content.js (solo le voci modificate e valide).
const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..'),DIR=ROOT+'/content',OUT=ROOT+'/public/js/content.js';
const nums=s=>(s.match(/\d[\d.,]*/g)||[]).map(x=>x.replace(/[.,]+$/,'')).sort().join('|');
const map={},rep={applicati:0,bloccati:[],};
(fs.existsSync(DIR)?fs.readdirSync(DIR).filter(f=>f.endsWith('.json')):[]).forEach(f=>{
  const j=JSON.parse(fs.readFileSync(path.join(DIR,f),'utf8'));
  (j.voci||[]).forEach(v=>{
    if(typeof v.text!=='string'||!v.id)return;
    const t=v.text.trim(),o=(v.orig||'').trim();
    if(!t||t===o)return;
    if(!v.cifre_ok&&nums(t)!==nums(o)){rep.bloccati.push(f+' ['+v.ctx+'] modifica ai numeri senza autorizzazione: ignorata');return}
    map[v.id]=t;rep.applicati++;
  });
});
fs.mkdirSync(path.dirname(OUT),{recursive:true});
fs.writeFileSync(OUT,'window.VZC='+JSON.stringify(map)+';\n');
console.log('testi modificati applicati:',rep.applicati,'| ignorati per numeri:',rep.bloccati.length);
rep.bloccati.forEach(x=>console.log('  !',x));
if(rep.bloccati.length&&process.env.STRICT)process.exit(1);
