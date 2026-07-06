import { mkdirSync, readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { patchToStaticSsr, patchViteSpa } from './patch-lovable-static.mjs';

const STATIC_STYLE =
  '<style id="proji-static-fix">section.opacity-0.translate-y-6,.opacity-0.translate-y-6,.reveal:not(.visible){opacity:1!important;transform:none!important}</style>';

function routerShim(slug) {
  const base = `/${slug}`;
  return `<script id="${slug}-path-shim">(function(){var B="${base}";function m(p){if(p===B||p===B+"/"||p===B+"/index.html")return"/";if(p.indexOf(B+"/")===0){var s=p.slice(B.length)||"/";return s==="/index.html"?"/":s||"/";}return p;}try{var d=Object.getOwnPropertyDescriptor(Location.prototype,"pathname");if(d&&d.get){var g=d.get.bind(window.location);Object.defineProperty(window.location,"pathname",{get:function(){return m(g());},configurable:true});}}catch(e){}})();</script>`;
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

function rewritePaths(content, prefix) {
  return content
    .replace(/"\/assets\//g, `"${prefix}/assets/`)
    .replace(/'\/assets\//g, `'${prefix}/assets/`)
    .replace(/url\(\/assets\//g, `url(${prefix}/assets/`)
    .replace(/import\("\/assets\//g, `import("${prefix}/assets/`);
}

function applyEmailFix(html) {
  return html
    .replace(/mailto:hello@proji\.app/gi, 'mailto:sund.serik@gmail.com')
    .replace(/hello@proji\.app/gi, 'sund.serik@gmail.com');
}

function stripAnalytics(html) {
  return html
    .replace(/<script defer src="\/~flock.js"[^>]*><\/script>/g, '')
    .replace(/<script defer src="\/__l5e\/events.js"[^>]*><\/script>/g, '');
}

function applyStaticFix(html, assetPrefix) {
  html = stripAnalytics(html);
  html = html.replace(/<style id="proji-static-fix">[\s\S]*?<\/style>/g, '');
  if (!html.includes('proji-static-fix')) {
    html = html.replace('<head>', `<head>${STATIC_STYLE}`);
  }
  html = html.replace(
    new RegExp(`<script type="module" async="">import\\("${assetPrefix.replace(/\//g, '\\/')}[^"]+"\\)<\\/script>`, 'g'),
    '',
  );
  html = html.replace(/<script class="\$tsr" id="\$tsr-stream-barrier">[\s\S]*?<\/script>/g, '');
  return html;
}

function applyInteractiveFix(html, slug) {
  html = stripAnalytics(html);
  html = html.replace(/<style id="proji-static-fix">[\s\S]*?<\/style>/g, '');
  const shim = routerShim(slug);
  if (!html.includes(`${slug}-path-shim`)) {
    html = html.replace('<head>', `<head>${shim}`);
  }
  return html;
}

function collectAssetNames(html) {
  const names = new Set();
  for (const m of html.matchAll(/\/assets\/([A-Za-z0-9._-]+)/g)) {
    names.add(m[1]);
  }
  return [...names];
}

function rewriteAssetFiles(assetsDir, prefix) {
  for (const file of readdirSync(assetsDir)) {
    const path = join(assetsDir, file);
    if (file.endsWith('.js') || file.endsWith('.css')) {
      let content = readFileSync(path, 'utf8');
      const next = rewritePaths(content, prefix);
      if (next !== content) writeFileSync(path, next);
    }
  }
}

export async function setupLovableLanding({ sourceUrl, slug, interactive = false }) {
  const baseUrl = sourceUrl.replace(/\/$/, '');
  const prefix = `/${slug}`;
  const dir = join(import.meta.dirname, '..', 'public', slug);
  const assetsDir = join(dir, 'assets');
  mkdirSync(assetsDir, { recursive: true });

  const htmlRaw = await fetch(`${baseUrl}/`).then(r => r.text());
  const assetNames = collectAssetNames(htmlRaw);

  for (const name of assetNames) {
    await download(`${baseUrl}/assets/${name}`, join(assetsDir, name));
    console.log(`  downloaded assets/${name}`);
  }

  let html = rewritePaths(htmlRaw, prefix);
  html = applyEmailFix(html);
  html = interactive
    ? applyInteractiveFix(html, slug)
    : applyStaticFix(html, `${prefix}/assets/`);
  writeFileSync(join(dir, 'index.html'), html);

  rewriteAssetFiles(assetsDir, prefix);

  const finalHtml = readFileSync(join(dir, 'index.html'), 'utf8');
  if (finalHtml.includes('$tsr-stream-barrier')) {
    writeFileSync(join(dir, 'index.html'), patchToStaticSsr(finalHtml, slug));
    console.log(`  applied static SSR patch (no hydration)`);
  } else if (finalHtml.includes('id="root"') && !finalHtml.includes('<!--$-->')) {
    writeFileSync(join(dir, 'index.html'), patchViteSpa(finalHtml));
    console.log(`  applied Vite SPA patch`);
  }

  console.log(`Setup complete: ${slug} (${assetNames.length} assets, ${interactive ? 'interactive' : 'static'})`);
}

const configs = [
  { sourceUrl: 'https://proji-os-engine.lovable.app', slug: 'os-engine', interactive: true },
  { sourceUrl: 'https://digital-team-builders.lovable.app', slug: 'digital-team', interactive: true },
  { sourceUrl: 'https://knowledge-vault-synth.lovable.app', slug: 'knowledge-vault', interactive: true },
  { sourceUrl: 'https://core-mind-vault.lovable.app', slug: 'knowledge-twin', interactive: true },
  { sourceUrl: 'https://proji-insight-hub.lovable.app', slug: 'insight-hub', interactive: true },
  { sourceUrl: 'https://proji-context-flow.lovable.app', slug: 'context-flow', interactive: true },
  { sourceUrl: 'https://proji-flow-forge.lovable.app', slug: 'flow-forge', interactive: true },
  { sourceUrl: 'https://team-ai-collab.lovable.app', slug: 'team-ai-collab', interactive: true },
  { sourceUrl: 'https://pro-ai-council.lovable.app', slug: 'pro-ai-council', interactive: true },
  { sourceUrl: 'https://talent-manager.lovable.app', slug: 'talent-manager', interactive: true },
];

const isMain = process.argv[1]?.endsWith('setup-lovable-landing.mjs');

if (isMain) {
  const only = process.argv[2];
  const selected = only ? configs.filter(c => c.slug === only) : configs;
  for (const config of selected) {
    console.log(`\nSetting up ${config.slug}...`);
    await setupLovableLanding(config);
  }
}
