import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const PREFS_BOOTSTRAP = `<script id="proji-prefs-sync">(function(){try{var TK=["proji.theme","proji-theme","proji_theme","theme","main-landing-theme","chrome_extension_theme","secondbrain-theme"];var LK=["proji.lang","proji-lang","proji_lang","lang","chrome_extension_lang","secondbrain-lang"];function r(a){for(var i=0;i<a.length;i++){var v=localStorage.getItem(a[i]);if(v)return v}return null}function w(a,v){for(var i=0;i<a.length;i++)try{localStorage.setItem(a[i],v)}catch(e){}}var t=r(TK)||"dark";if(t!=="light"&&t!=="dark"&&t!=="system")t="dark";w(TK,t);var resolved=t==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):t;document.documentElement.classList.toggle("dark",resolved==="dark");document.documentElement.dataset.theme=resolved;document.documentElement.style.colorScheme=resolved;var l=r(LK)||"ru";w(LK,l);document.documentElement.lang=l;document.documentElement.dir=l==="ar"?"rtl":"ltr"}catch(e){}})();</script>`;

const STATIC_STYLE = `<style id="proji-static-fix">
html,body{opacity:1!important;visibility:visible!important}
.opacity-0,section.opacity-0,.reveal:not(.visible),[class*="opacity-0"]{opacity:1!important;transform:none!important;visibility:visible!important}
section.opacity-0.translate-y-6,.opacity-0.translate-y-6,.anim-fade-up{opacity:1!important;transform:none!important;animation:none!important}
[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important;visibility:visible!important}
#lovable-badge{display:none!important;visibility:hidden!important;pointer-events:none!important}
</style>`;

/** Inject shared theme/lang bootstrap so static landings inherit prefs from other pages. */
export function injectPrefsBootstrap(html) {
  html = html.replace(/<script id="proji-prefs-sync">[\s\S]*?<\/script>/g, '');
  if (html.includes('<head>')) {
    return html.replace('<head>', `<head>${PREFS_BOOTSTRAP}`);
  }
  if (html.includes('<head ')) {
    return html.replace(/<head([^>]*)>/, `<head$1>${PREFS_BOOTSTRAP}`);
  }
  return PREFS_BOOTSTRAP + html;
}

/** Framer Motion SSR leaves inline opacity:0; strip so static pages render without JS. */
function stripMotionInlineStyles(html) {
  return html
    .replace(/\sstyle="opacity:0;transform:translateY\([^"]*\)"/g, '')
    .replace(/;opacity:0;transform:translateY\([^)]*\)/g, '')
    .replace(/opacity:0;transform:translateY\([^)]*\);/g, '');
}

const TANSTACK_SLUGS = [
  'crm',
  'insight-hub',
  'context-flow',
  'team-ai-collab',
  'pro-ai-council',
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

/**
 * Remove Lovable "Edit with" floating badge from exported HTML.
 * Tempered quantifiers ((?:(?!<\/tag>)[\s\S])*?) keep each match inside a single
 * element; unbounded [\s\S]*? used to swallow the whole <body> on some exports.
 */
export function stripLovableBadge(html) {
  html = html.replace(
    /<aside(?:(?!<\/aside>)[\s\S])*?\bid="lovable-badge"(?:(?!<\/aside>)[\s\S])*?<\/aside>/gi,
    '',
  );
  html = html.replace(
    /<script>(?:(?!<\/script>)[\s\S])*?lovable-badge(?:(?!<\/script>)[\s\S])*?<\/script>/gi,
    '',
  );
  return html;
}

/** Vite SPA subpath: path-shim fails in Chrome; set React Router basename in bundle. */
export function patchViteRouterBasename(jsContent, slug) {
  const base = `/${slug}`;
  if (jsContent.includes(`basename:"${base}"`) || jsContent.includes(`basename:'${base}'`)) {
    return jsContent;
  }
  let next = jsContent.replace(/jsx\(Hee,\{children:/g, `jsx(Hee,{basename:"${base}",children:`);
  if (next === jsContent) {
    next = jsContent.replace(
      /createBrowserRouter\((\[[\s\S]*?\]),(\{[^}]*)\}/,
      (match, routes, opts) => {
        if (opts.includes('basename')) return match;
        const trimmed = opts.trim().endsWith('{') ? opts.slice(0, -1) + `{basename:"${base}",` : `{basename:"${base}",${opts.slice(1)}`;
        return `createBrowserRouter(${routes},${trimmed}`;
      },
    );
  }
  return next;
}

/** Freeze SSR HTML: remove TanStack hydration scripts that cause white screen on subpaths. */
export function patchToStaticSsr(html, slug) {
  html = stripAnalytics(html);
  html = stripLovableBadge(html);
  html = stripMotionInlineStyles(html);
  html = html.replace(/<style id="proji-static-fix">[\s\S]*?<\/style>/g, '');
  if (!html.includes('proji-static-fix')) {
    html = html.replace('<head>', `<head>${STATIC_STYLE}`);
  }
  html = injectPrefsBootstrap(html);
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

/** Vite SPA (empty #root): keep client bundle; basename patch handles subfolder routing. */
export function patchViteSpa(html, slug) {
  html = stripAnalytics(html);
  html = stripLovableBadge(html);
  html = html.replace(/<script id="[^"]*-path-shim">[\s\S]*?<\/script>/g, '');
  if (!html.includes('proji-static-fix')) {
    html = html.replace('<head>', `<head>${STATIC_STYLE}`);
  }
  html = injectPrefsBootstrap(html);
  return html;
}

function patchViteAssets(slug) {
  const assetsDir = join(root, slug, 'assets');
  if (!existsSync(assetsDir)) return;
  for (const file of readdirSync(assetsDir)) {
    if (!file.endsWith('.js')) continue;
    const path = join(assetsDir, file);
    const next = patchViteRouterBasename(readFileSync(path, 'utf8'), slug);
    writeFileSync(path, next);
  }
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

  const viteSpas = [];
  for (const slug of viteSpas.filter((s) => !only || s === only)) {
    const file = join(root, slug, 'index.html');
    if (!existsSync(file)) continue;
    writeFileSync(file, patchViteSpa(readFileSync(file, 'utf8'), slug));
    patchViteAssets(slug);
    console.log(`patched ${slug} -> vite SPA`);
  }

  // Plain static HTML (platform, sunnet) — only inject prefs sync
  const plain = ['platform', 'sunnet'];
  for (const slug of plain.filter((s) => !only || s === only)) {
    const file = join(root, slug, 'index.html');
    if (!existsSync(file)) continue;
    writeFileSync(file, injectPrefsBootstrap(readFileSync(file, 'utf8')));
    console.log(`patched ${slug} -> prefs bootstrap`);
  }
}
