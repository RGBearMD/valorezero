(function(){
  var K='vz-tema',root=document.documentElement,btn=document.getElementById('thm'),tx=document.getElementById('thmt');
  var modes=['auto','light','dark'],lab={auto:'Auto',light:'Chiaro',dark:'Scuro'},cur='auto';
  try{var v=localStorage.getItem(K);if(v==='light'||v==='dark')cur=v}catch(e){}
  function apply(){
    if(cur==='auto')root.removeAttribute('data-theme');else root.setAttribute('data-theme',cur);
    if(tx)tx.textContent=lab[cur];
    if(btn)btn.setAttribute('aria-label','Tema del sito: '+lab[cur].toLowerCase()+'. Premi per cambiare (automatico, chiaro, scuro)');
  }
  apply();
  if(btn)btn.addEventListener('click',function(){
    cur=modes[(modes.indexOf(cur)+1)%3];apply();
    try{if(cur==='auto')localStorage.removeItem(K);else localStorage.setItem(K,cur)}catch(e){}
  });
})();
