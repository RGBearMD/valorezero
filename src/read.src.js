(function(){var K='vz-lettura',root=document.documentElement,S={fs:0,hc:0,ls:0,hl:0};
try{var v=JSON.parse(localStorage.getItem(K)||'{}');['fs','hc','ls','hl'].forEach(function(k){if(typeof v[k]==='number')S[k]=v[k]})}catch(e){}
S.fs=Math.min(2,Math.max(0,S.fs|0));
function apply(){S.fs?root.setAttribute('data-fs',S.fs):root.removeAttribute('data-fs');S.hc?root.setAttribute('data-hc','1'):root.removeAttribute('data-hc');S.ls?root.setAttribute('data-ls','1'):root.removeAttribute('data-ls');S.hl?root.setAttribute('data-hl','1'):root.removeAttribute('data-hl')}
apply();
window.vzRead={s:S,set:function(k,x){S[k]=x;apply();try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}}};
})();
