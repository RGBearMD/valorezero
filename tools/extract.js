// Estrae i testi modificabili di ogni pagina in content/<pagina>.json e rigenera admin/config.yml.
// Uso: npm run build && npm run extract   (da rifare solo quando cambiano i testi nel codice)
const { chromium } = require('playwright'); const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..'),DIST=ROOT+'/dist/',CD=ROOT+'/content/';
(async()=>{
  const b=await chromium.launch(); const p0=await b.newPage();
  await p0.goto('file://'+DIST+'index.html?nocontent'); await p0.waitForTimeout(300);
  const ROUTES=await p0.evaluate(()=>vzAll()), VD=await p0.evaluate(()=>vzData()); await p0.close();
  const visits=[]; // [slug, titolo, url]
  ROUTES.forEach(([r,f])=>{
    const g=VD.groups.find(x=>x.id===r);
    if(g&&g.items&&g.items.length>1) g.items.forEach(it=>visits.push([f.replace('.html',''),f,f+'?nocontent#'+it.id]));
    else visits.push([f.replace('.html',''),f,f+'?nocontent']);
  });
  const seen=new Set(), pages={};
  for(const [slug,f,url] of visits){
    const p=await b.newPage({viewport:{width:1100,height:900}});
    await p.goto('file://'+DIST+url); await p.waitForTimeout(350);
    const ent=await p.evaluate(()=>({t:document.querySelector('#app h1')?.textContent.replace(/\s+/g,' ').trim()||document.title,e:window.vzEditables(document.getElementById('app'))}));
    await p.close();
    const pg=pages[slug]=pages[slug]||{slug,titolo:ent.t,voci:[]};
    ent.e.forEach(x=>{ if(seen.has(x.id))return; seen.add(x.id); pg.voci.push({id:x.id,ctx:(/\d/.test(x.md)?'⚠ contiene numeri · ':'')+x.ctx,orig:x.md}); });
  }
  await b.close();
  fs.mkdirSync(CD,{recursive:true});
  const files=[]; let tot=0,nuove=0,orfane=0;
  for(const slug of Object.keys(pages)){
    const pg=pages[slug]; if(!pg.voci.length)continue;
    const fp=CD+slug+'.json'; let old={voci:[],orfane:[]};
    if(fs.existsSync(fp))old=JSON.parse(fs.readFileSync(fp,'utf8'));
    const om={}; (old.voci||[]).forEach(v=>om[v.id]=v);
    const ids=new Set(pg.voci.map(v=>v.id));
    const voci=pg.voci.map(v=>{const o=om[v.id]; if(!o)nuove++; return {id:v.id,ctx:v.ctx,orig:v.orig,text:o&&typeof o.text==='string'?o.text:v.orig,cifre_ok:!!(o&&o.cifre_ok)}});
    const orf=(old.orfane||[]).concat((old.voci||[]).filter(v=>!ids.has(v.id)&&v.text!==v.orig)); orfane+=orf.length;
    fs.writeFileSync(fp,JSON.stringify({titolo:pg.titolo,voci,orfane:orf},null,1)+'\n');
    files.push([slug,pg.titolo]); tot+=voci.length;
  }
  // config del CMS
  const y=s=>JSON.stringify(s);
  let cfg=fs.readFileSync(__dirname+'/config.head.yml','utf8');
  files.forEach(([slug,t])=>{cfg+=`      - name: ${y(slug)}
        label: ${y(t)}
        file: ${y('content/'+slug+'.json')}
        fields:
          - label: Testi della pagina
            name: voci
            widget: list
            allow_add: false
            allow_remove: false
            allow_reorder: false
            summary: "{{fields.ctx}} — {{fields.text}}"
            fields:
              - { label: Dove compare, name: ctx, widget: string, required: false, hint: "Sezione della pagina e tipo di blocco. Non modificare." }
              - { label: Testo, name: text, widget: markdown, buttons: [bold, italic, link], modes: [rich_text], editor_components: [] }
              - { label: "Autorizzo la modifica dei numeri in questo testo", name: cifre_ok, widget: boolean, default: false, required: false, hint: "Di norma lasciare spento: i numeri vengono dai dati verificati." }
              - { label: Id, name: id, widget: hidden }
              - { label: Originale, name: orig, widget: hidden }
`});
  fs.writeFileSync(ROOT+'/admin/config.yml',cfg);
  console.log('pagine con testi:',files.length,'| voci:',tot,'| nuove:',nuove,'| orfane:',orfane);
})();
