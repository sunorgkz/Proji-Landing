import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const STATIC_STYLE = `<style id="proji-static-fix">
html,body{opacity:1!important;visibility:visible!important}
.opacity-0,section.opacity-0,.reveal:not(.visible),[class*="opacity-0"]{opacity:1!important;transform:none!important;visibility:visible!important}
section.opacity-0.translate-y-6,.opacity-0.translate-y-6,.anim-fade-up{opacity:1!important;transform:none!important;animation:none!important}
</style>`;

const TANSTACK_SLUGS = [
  'insight-hub',
  'context-flow',
  'team-ai-collab',
  'pro-ai-council',
  'os-engine',
  'digital-team',
  'knowledge-vault',
  'knowledge-twin',
  'flow-forge',
  'team-ai',
];

function stripAnalytics(html) {
  return html
    .replace(/<script defer src="\/~flock.js"[^>]*><\/script>/g, '')
    .replace(/<script defer src="\/__l5e\/events.js"[^>]*><\/script>/g, '');
}

/** Freeze SSR HTML: remove TanStack hydration scripts that cause white screen on subpaths. */
export function patchToStaticSsr(html, slug) {
  html = stripAnalytics(html);
  html = html.replace(/<style id="proji-static-fix">[\s\S]*?<\/style>/g, '');
  if (!html.includes('proji-static-fix')) {
    html = html.replace('<head>', `<head>${STATIC_STYLE}`);
  }
  html = html.replace(/<script id="[^"]*-path-shim">[\s\S]*?<\/script>/g, '');
  html = html.replace(/<script class="\$tsr" id="\$tsr-stream-barrier">[\s\S]*?<\/script>/g, '');
  html = html.replace(/<script type="module"[^>]*>[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<link rel="modulepreload"[^>]*>/g, '');
  html = html.replace(
    /<script>\(function\([^)]*\)\{[\s\S]*?document\.currentScript\.remove\(\)<\/script>/g,
    '',
  );
  html = html.replace(
    /<script>\(function\(a,f\)\{[\s\S]*?document\.currentScript\.remove\(\)<\/script>/g,
    '',
  );
  return html;
}

/** Vite SPA (empty #root): keep client bundle; path shim handles subfolder routing. */
export function patchViteSpa(html) {
  return stripAnalytics(html);
}

const root = join(import.meta.dirname, '..', 'public');
const isMain = process.argv[1]?.endsWith('patch-lovable-static.mjs');

if (isMain) {
  const only = process.argv[2];

  for (const slug of TANSTACK_SLUGS.filter((s) => !only || s === only)) {
    const file = join(root, slug, 'index.html');
    if (!existsSync(file)) {
      console.log(`skip ${slug}: no index.html`);
      continue;
    }
    const next = patchToStaticSsr(readFileSync(file, 'utf8'), slug);
    writeFileSync(file, next);
    console.log(`patched ${slug} -> static SSR`);
  }

  const tm = join(root, 'talent-manager', 'index.html');
  if (existsSync(tm) && (!only || only === 'talent-manager')) {
    writeFileSync(tm, patchViteSpa(readFileSync(tm, 'utf8')));
    console.log('patched talent-manager -> vite SPA');
  }
}
