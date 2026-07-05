import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const SHIM = `<script id="team-ai-path-shim">(function(){var B="/team-ai";function m(p){if(p===B||p===B+"/"||p===B+"/index.html")return"/";if(p.indexOf(B+"/")===0){var s=p.slice(B.length)||"/";return s==="/index.html"?"/":s||"/";}return p;}try{var d=Object.getOwnPropertyDescriptor(Location.prototype,"pathname");if(d&&d.get){var g=d.get.bind(window.location);Object.defineProperty(window.location,"pathname",{get:function(){return m(g());},configurable:true});}}catch(e){}})();</script>`;

const dir = join(import.meta.dirname, '..', 'public', 'team-ai');
const htmlPath = join(dir, 'index.html');
let html = readFileSync(htmlPath, 'utf8');

html = html.replace(/"\/assets\//g, '"/team-ai/assets/');
html = html.replace(/'\/assets\//g, "'/team-ai/assets/");
html = html.replace(/import\("\/assets\//g, 'import("/team-ai/assets/');

if (!html.includes('team-ai-path-shim')) {
  html = html.replace('<head>', `<head>${SHIM}`);
}

writeFileSync(htmlPath, html);

for (const file of ['assets/index-DxEo_2Ts.js', 'assets/routes-uGzS16kD.js']) {
  const jsPath = join(dir, file);
  let js = readFileSync(jsPath, 'utf8');
  if (js.includes('/assets/')) {
    js = js.replace(/"\/assets\//g, '"/team-ai/assets/');
    js = js.replace(/'\/assets\//g, "'/team-ai/assets/");
    writeFileSync(jsPath, js);
  }
}

console.log('team-ai router shim applied');
