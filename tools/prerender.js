const { chromium } = require('playwright'); const fs=require('fs');
const ROOT=require('path').resolve(__dirname,'..'); const SITE=ROOT+'/dist/', BASE=process.env.SITE_URL||'https://valorezero.rgbear.it/';
const body0=fs.readFileSync(ROOT+'/src/body.html','utf8'), sprite=fs.readFileSync(ROOT+'/src/sprite.html','utf8');
const esc=s=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
function page(route,title,desc,file,inner,ld){
  const url=BASE+(file==='index.html'?'':file);
  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website"><meta property="og:locale" content="it_IT"><meta property="og:site_name" content="Valore Zer0">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${url}">
<meta property="og:image" content="${BASE}img/logo-b.png"><meta name="twitter:card" content="summary">
<link rel="icon" type="image/png" sizes="96x96" href="img/favicon-96.png">
<link rel="apple-touch-icon" href="img/apple-touch-icon.png">
<link rel="stylesheet" href="css/styles.css">
<script src="js/read.js"></script>
${ld?'<script type="application/ld+json">'+JSON.stringify(ld)+'</script>\n':''}</head>
<body data-route="${route}">
${inner}
<script src="js/theme.js"></script>
<script src="js/content.js"></script>
<script src="js/edit.js"></script>
<script src="js/app.js"></script>
</body>
</html>
`;}
(async()=>{
 // pagina di partenza vuota per ottenere l'elenco delle rotte
 fs.writeFileSync(SITE+'index.html',page('','Valore Zer0','x','index.html',sprite+body0));
 const b=await chromium.launch(); const p0=await b.newPage();
 await p0.goto('file://'+SITE+'index.html'); await p0.waitForTimeout(300);
 const ROUTES=await p0.evaluate(()=>vzAll()); const VD=await p0.evaluate(()=>vzData()); await p0.close();
 const GM={}; VD.groups.forEach(g=>GM[g.id]=g);
 const files=new Set(); ROUTES.forEach(r=>{ if(files.has(r[1])) throw new Error('duplicato '+r[1]); files.add(r[1]); });
 // 1° passaggio: tutte le pagine con corpo vuoto
 ROUTES.forEach(([r,f])=>fs.writeFileSync(SITE+f,page(r,'Valore Zer0','x',f,sprite+body0)));
 const meta=[];
 for(const [r,f] of ROUTES){
   const p=await b.newPage({viewport:{width:1100,height:900}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
   await p.goto('file://'+SITE+f); await p.waitForTimeout(350);
   const o=await p.evaluate(()=>{
     const t=document.title;
     let d='';const ps=[...document.querySelectorAll('#app p')];
     for(const q of ps){const x=q.textContent.replace(/\s+/g,' ').trim();if(x.length>=70&&!/^Contenuto sensibile/.test(x)){d=x;break}}
     if(d.length>158){d=d.slice(0,158);d=d.slice(0,d.lastIndexOf(' '))+'…'}
     const clone=document.body.cloneNode(true);
     clone.querySelectorAll('script').forEach(s=>s.remove());
     const clk=clone.querySelector('#clk'); if(clk)clk.textContent='00:00:00';
     return {t,d,html:clone.innerHTML};
   });
   let desc=o.d, title=o.t, ld=null;
   const gm=GM[r];
   if(gm){desc=gm.desc;
     if(r!=='altri'&&gm.items.length){ld={'@context':'https://schema.org','@type':'Dataset',name:gm.title,description:gm.desc,url:BASE+f,inLanguage:'it',isAccessibleForFree:true,creator:{'@type':'Organization',name:'Valore Zer0',url:BASE},isBasedOn:VD.ISTAT_URL,spatialCoverage:'Italia',temporalCoverage:gm.items[0].unit==='kg'?String(gm.items[0].year):'2025-08/2026-07',variableMeasured:gm.items.map(x=>({'@type':'PropertyValue',name:x.name,value:x.n,unitText:x.unit==='kg'?'chilogrammi':'animali (12 mesi)'}))}}}
   if(r==='')desc='Quanti animali allevati in Italia vengono uccisi: contatori in tempo reale su dati ISTAT, con fonti e limiti dichiarati.';
   if(r==='prezzo-della-tradizione')desc='Dalla nascita alla macellazione: scopri il percorso degli agnelli destinati alla carne delle tradizioni natalizie italiane.';
   fs.writeFileSync(SITE+f,page(r,title,desc,f,o.html.trim(),ld));
   meta.push({route:r,file:f,title,desc,errs}); await p.close();
 }
 await b.close();
 fs.writeFileSync(SITE+'meta.json',JSON.stringify(meta,null,1));
 const bad=meta.filter(m=>m.errs.length||!m.desc);
 console.log('pagine',meta.length,'con errori/senza descrizione',bad.length,JSON.stringify(bad.slice(0,5)));
})();
