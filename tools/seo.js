const fs=require('fs'),path=require('path');
const D=path.resolve(__dirname,'..','dist')+'/',B=process.env.SITE_URL||'https://valorezero.rgbear.it/';
const m=JSON.parse(fs.readFileSync(D+'meta.json','utf8'));
fs.writeFileSync(D+'sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+m.map(e=>`  <url><loc>${B+(e.file==='index.html'?'':e.file)}</loc></url>\n`).join('')+'</urlset>\n');
fs.writeFileSync(D+'robots.txt','User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: '+B+'sitemap.xml\n');
fs.unlinkSync(D+'meta.json');
console.log('sitemap e robots scritti:',m.length,'pagine');
