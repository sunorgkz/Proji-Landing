import { mkdirSync, readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import {
  patchToStaticSsr,
  patchViteSpa,
  patchViteRouterBasename,
} from './patch-lovable-static.mjs';

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

function collectAssetNamesFromText(text) {
  const names = new Set();
  for (const m of text.matchAll(/\/assets\/([A-Za-z0-9._-]+)/g)) {
    names.add(m[1]);
  }
  return names;
}

function collectAssetNames(dir, html) {
  const names = collectAssetNamesFromText(html);
  const assetsDir = join(dir, 'assets');
  if (existsSync(assetsDir)) {
    for (const file of readdirSync(assetsDir)) {
      if (file.endsWith('.js') || file.endsWith('.css')) {
        for (const name of collectAssetNamesFromText(readFileSync(join(assetsDir, file), 'utf8'))) {
          names.add(name);
        }
      }
    }
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

function patchViteAssetBasenames(assetsDir, slug) {
  for (const file of readdirSync(assetsDir)) {
    if (!file.endsWith('.js')) continue;
    const path = join(assetsDir, file);
    writeFileSync(path, patchViteRouterBasename(readFileSync(path, 'utf8'), slug));
  }
}

export async function setupLovableLanding({ sourceUrl, slug, interactive = false }) {
  const baseUrl = sourceUrl.replace(/\/$/, '');
  const prefix = `/${slug}`;
  const dir = join(import.meta.dirname, '..', 'public', slug);
  const assetsDir = join(dir, 'assets');
  mkdirSync(assetsDir, { recursive: true });

  const htmlRaw = await fetch(`${baseUrl}/`).then((r) => r.text());
  let pending = collectAssetNamesFromText(htmlRaw);
  const downloaded = new Set();

  while (pending.length > 0) {
    const batch = pending.filter((name) => !downloaded.has(name));
    if (batch.length === 0) break;
    for (const name of batch) {
      await download(`${baseUrl}/assets/${name}`, join(assetsDir, name));
      downloaded.add(name);
      console.log(`  downloaded assets/${name}`);
    }
    pending = collectAssetNames(dir, htmlRaw).filter((name) => !downloaded.has(name));
  }

  let html = rewritePaths(htmlRaw, prefix);
  html = applyEmailFix(html);
  writeFileSync(join(dir, 'index.html'), html);

  rewriteAssetFiles(assetsDir, prefix);

  const finalHtml = readFileSync(join(dir, 'index.html'), 'utf8');
  if (finalHtml.includes('$tsr-stream-barrier')) {
    writeFileSync(join(dir, 'index.html'), patchToStaticSsr(finalHtml, slug));
    console.log('  applied static SSR patch (no hydration)');
  } else if (finalHtml.includes('id="root"') && !finalHtml.includes('<!--$-->')) {
    writeFileSync(join(dir, 'index.html'), patchViteSpa(finalHtml, slug));
    patchViteAssetBasenames(assetsDir, slug);
    console.log('  applied Vite SPA patch (basename routing)');
  }

  console.log(`Setup complete: ${slug} (${downloaded.size} assets, ${interactive ? 'interactive' : 'static'})`);
}

const configs = [
  // os-engine removed: rebuilt as native React landing (landings/os_engine/)
  { sourceUrl: 'https://digital-team-builders.lovable.app', slug: 'digital-team', interactive: true },
  { sourceUrl: 'https://knowledge-vault-synth.lovable.app', slug: 'knowledge-vault', interactive: true },
  { sourceUrl: 'https://core-mind-vault.lovable.app', slug: 'knowledge-twin', interactive: true },
  { sourceUrl: 'https://proji-insight-hub.lovable.app', slug: 'insight-hub', interactive: true },
  { sourceUrl: 'https://proji-context-flow.lovable.app', slug: 'context-flow', interactive: true },
  { sourceUrl: 'https://proji-flow-forge.lovable.app', slug: 'flow-forge', interactive: true },
  { sourceUrl: 'https://team-ai-collab.lovable.app', slug: 'team-ai-collab', interactive: true },
  { sourceUrl: 'https://pro-ai-council.lovable.app', slug: 'pro-ai-council', interactive: true },
];

const isMain = process.argv[1]?.endsWith('setup-lovable-landing.mjs');

if (isMain) {
  const only = process.argv[2];
  const selected = only ? configs.filter((c) => c.slug === only) : configs;
  for (const config of selected) {
    console.log(`\nSetting up ${config.slug}...`);
    await setupLovableLanding(config);
  }
}
