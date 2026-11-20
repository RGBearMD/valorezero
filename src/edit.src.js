/* Strato dei testi modificabili da CMS.
   - vzEditables(root): elenca i blocchi di testo "semplici" (titoli, paragrafi, voci di elenco) con id = hash del testo originale.
   - Se window.VZC contiene un testo per quell'id, il blocco viene sostituito (Markdown minimo: **grassetto**, *corsivo*, [link](url)).
   - Con ?nocontent nell'indirizzo non si applica nulla (serve all'estrazione dei testi originali). */
(function(){
  var SEL='h1,h2,h3,h4,p,li,dt,dd,summary,figcaption,blockquote';
  var SKIP='table,svg,.big,.hov,.hov-t,.gsw,.ag-lv,.ag-cnt,.ag-ct,.ag-tl,.ag-nb,.gauge,.glab,[data-v],script,style,nav,button,.avviso,.ag-cal,.ag-fil';
  var INLINE={STRONG:1,B:1,EM:1,I:1,A:1,BR:1};
  function hash(s){var h1=0xdeadbeef,h2=0x41c6ce57;for(var i=0,c;i<s.length;i++){c=s.charCodeAt(i);h1=Math.imul(h1^c,2654435761);h2=Math.imul(h2^c,1597334677)}
    h1=Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);h2=Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);
    return (h2>>>0).toString(16).padStart(8,'0')+(h1>>>0).toString(16).padStart(8,'0')}
  function norm(s){return s.replace(/\s+/g,' ').trim()}
  function simple(el){
    if(!el.textContent||norm(el.textContent).length<2)return false;
    if(el.closest(SKIP)||el.querySelector(SKIP))return false;
    var ok=true;
    (function w(n){for(var c=n.firstChild;c;c=c.nextSibling){
      if(c.nodeType===3)continue;
      if(c.nodeType!==1||!INLINE[c.tagName]){ok=false;return}
      if(c.tagName==='A'&&!c.getAttribute('href')){ok=false;return}
      w(c);if(!ok)return}})(el);
    return ok;
  }
  function esc(s){return s.replace(/([\\*_\[\]])/g,'\\$1')}
  function toMd(el){
    var o='';
    (function w(n){for(var c=n.firstChild;c;c=c.nextSibling){
      if(c.nodeType===3){o+=esc(c.nodeValue.replace(/\s+/g,' '));continue}
      var t=c.tagName;
      if(t==='BR'){o+='\n';continue}
      if(t==='STRONG'||t==='B'){o+='**';w(c);o+='**'}
      else if(t==='EM'||t==='I'){o+='*';w(c);o+='*'}
      else if(t==='A'){o+='[';w(c);o+='](' +c.getAttribute('href')+')'}
    }})(el);
    return o.replace(/\*\*\s*\*\*/g,'').trim();
  }
  function h(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
  function toHtml(md){
    var out='',i=0,n=md.length;
    function inline(end){
      var s='';
      while(i<n){
        var ch=md[i];
        if(end&&md.substr(i,end.length)===end){return s}
        if(ch==='\\'&&i+1<n){s+=h(md[i+1]);i+=2;continue}
        if(ch==='\n'){s+='<br>';i++;continue}
        if(ch==='*'&&md[i+1]==='*'){i+=2;s+='<strong>'+inline('**')+'</strong>';i+=2;continue}
        if(ch==='*'||ch==='_'){i++;s+='<em>'+inline(ch)+'</em>';i++;continue}
        if(ch==='['){
          var save=i;i++;var t=inline(']');
          if(md[i]===']'&&md[i+1]==='('){
            var j=md.indexOf(')',i+2);
            if(j>0){var u=md.slice(i+2,j).trim();i=j+1;
              var ext=/^https?:/.test(u);
              s+='<a href="'+h(u).replace(/"/g,'&quot;')+'"'+(ext?' target="_blank" rel="noopener"':'')+'>'+t+'</a>';continue}
          }
          i=save;s+='[';i++;continue;
        }
        s+=h(ch);i++;
      }
      return s;
    }
    out=inline('');
    return out;
  }
  function list(root){
    var res=[];
    [].forEach.call((root||document).querySelectorAll(SEL),function(el){
      if(!simple(el))return;
      if(el.querySelector(SEL))return;
      var id=hash(norm(el.textContent));
      res.push({el:el,id:id,md:toMd(el)});
    });
    return res;
  }
  function ctxOf(el){
    var t=el.tagName.toLowerCase(),sc=el.closest('.ag-sc'),hd=null,p=el;
    if(sc){var n=sc.querySelector('.ag-n');hd=n?norm(n.textContent):null}
    if(!hd){
      var secs=[].slice.call(document.querySelectorAll('#app h1,#app h2,#app h3'));
      for(var k=secs.length-1;k>=0;k--){if(secs[k]!==el&&(secs[k].compareDocumentPosition(el)&4)){hd=norm(secs[k].textContent);break}}
    }
    return (hd?hd.slice(0,48)+' › ':'')+t;
  }
  window.vzEditables=function(root){return list(root).map(function(x){return {id:x.id,md:x.md,ctx:ctxOf(x.el)}})};
  var busy=false,done=typeof WeakSet==='function'?new WeakSet():null;
  function apply(root){
    var C=window.VZC;if(!C||/[?&]nocontent/.test(location.search))return;
    busy=true;
    try{list(root).forEach(function(x){
      var t=C[x.id];if(typeof t!=='string'||t===x.md)return;
      if(done&&done.has(x.el))return;
      x.el.innerHTML=toHtml(t);if(done)done.add(x.el);
    })}finally{busy=false}
  }
  window.vzApply=apply;
  function start(){
    var app=document.getElementById('app');if(!app)return;
    var mo=new MutationObserver(function(){if(busy)return;mo.disconnect();apply(app);mo.observe(app,{childList:true,subtree:true})});
    mo.observe(app,{childList:true,subtree:true});
    apply(app);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
