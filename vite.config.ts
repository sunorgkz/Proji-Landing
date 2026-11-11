import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { ROLE_IDS, ROLE_TITLES } from './landings/manager/roles';

const STATIC_LANDING_SLUGS = [
  'sunnet',
  'platform',
  'crm',
  'team-ai',
  'digital-team',
  'knowledge-vault',
  'knowledge-twin',
  'insight-hub',
  'context-flow',
  'flow-forge',
  'team-ai-collab',
  'pro-ai-council',
];

function staticLandingDevPlugin(): Plugin {
  return {
    name: 'static-landing-dev',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const [pathname, search = ''] = (req.url ?? '').split('?');
        for (const slug of STATIC_LANDING_SLUGS) {
          if (pathname === `/${slug}` || pathname === `/${slug}/`) {
            req.url = `/${slug}/index.html${search ? `?${search}` : ''}`;
            break;
          }
        }
        next();
      });
    },
  };
}

/* Сайты proGPT остаются по прямому адресу, но поиск туда не ведёт. */
const HIDDEN_SLUGS = ['team-ai', 'team-ai-collab', 'pro-ai-council'];

const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* страницы из registry.ts: адрес, заголовок и описание (первое desc: '…' в файле лендинга, это русский текст) */
function readPages() {
  const registry = readFileSync(path.resolve(__dirname, 'landings/registry.ts'), 'utf-8');
  const descOf = (file: string) => {
    const f = path.resolve(__dirname, 'landings', `${file}.tsx`);
    return existsSync(f) ? readFileSync(f, 'utf-8').match(/desc: '([^']*)'/)?.[1] : undefined;
  };
  return [...registry.matchAll(/slug: '([^']*)',\s*title: '([^']*)',\s*component: lazy\(\(\) => import\('\.\/([^']+)'\)\)/g)]
    .map(([, slug, title, file]) => ({ slug, title, desc: descOf(file) }))
    .concat(ROLE_IDS.map(r => ({ slug: `manager-${r}`, title: `proji — ${ROLE_TITLES[r]}`, desc: undefined })))
    .filter(p => !HIDDEN_SLUGS.includes(p.slug));
}

/**
 * SEO при сборке (STRATEGY.md, разделы 3–4):
 * - robots.txt — всегда;
 * - свой HTML для каждого React-лендинга (dist/<slug>/index.html): заголовок, описание, превью для мессенджеров
 *   и текст h1 + описание внутри #root, чтобы поисковик без JS видел, о чём страница;
 * - sitemap.xml, llms.txt, canonical и hreflang — для https://landing.proji.org; другой адрес: SITE_URL=https://… npm run build,
 *   пустой SITE_URL= отключает их.
 */
function seoFilesPlugin(): Plugin {
  const site = (process.env.SITE_URL ?? 'https://landing.proji.org').replace(/\/+$/, '');
  const url = (slug: string) => `${site}/${slug}`;
  const NL = '\n';
  return {
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
      const pages = readPages();
      const robots = ['User-agent: *', 'Allow: /', ...HIDDEN_SLUGS.map(s => `Disallow: /${s}/`)];
      if (site) robots.push('', `Sitemap: ${site}/sitemap.xml`);
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join(NL) + NL });
      if (!site) return;
      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...pages.map(p => `  <url><loc>${url(p.slug)}</loc></url>`),
        '</urlset>',
      ];
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap.join(NL) + NL });
      const llms = [
        '# Proji',
        '',
        '> Платформа для задач, проектов, сотрудников и документов с ИИ-помощником Proji AI. Регистрация: https://proji.org/register',
        '',
        '## Страницы',
        '',
        ...pages.map(p => `- [${p.title}](${url(p.slug)})${p.desc ? `: ${p.desc}` : ''}`),
      ];
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: llms.join(NL) + NL });
    },
    writeBundle(opts, bundle) {
      const html = bundle['index.html'];
      if (!html || html.type !== 'asset' || !opts.dir) return;
      const base = String(html.source);
      const setMeta = (out: string, attr: string, value: string) =>
        out.replace(new RegExp(`(<meta ${attr} content=")[^"]*`), `$1${esc(value)}`);
      for (const p of readPages()) {
        if (!p.slug || STATIC_LANDING_SLUGS.includes(p.slug)) continue;
        let out = base.replace(/<title>[^<]*<\/title>/, `<title>${esc(p.title)}</title>`);
        out = setMeta(out, 'property="og:title"', p.title);
        if (p.desc) {
          out = setMeta(out, 'name="description"', p.desc);
          out = setMeta(out, 'property="og:description"', p.desc);
        }
        if (site) {
          const alt = ['ru', 'kk', 'en', 'ar'].map(l => `<link rel="alternate" hreflang="${l}" href="${url(p.slug)}?lang=${l}" />`);
          out = out.replace('</head>', `<link rel="canonical" href="${url(p.slug)}" />${alt.join('')}<link rel="alternate" hreflang="x-default" href="${url(p.slug)}" /></head>`);
        }
        out = out.replace('<div id="root"></div>', `<div id="root"><h1>${esc(p.title)}</h1>${p.desc ? `<p>${esc(p.desc)}</p>` : ''}</div>`);
        const dir = path.join(opts.dir, p.slug);
        mkdirSync(dir, { recursive: true });
        writeFileSync(path.join(dir, 'index.html'), out);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), staticLandingDevPlugin(), seoFilesPlugin()],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  preview: {
    port: 3000,
    host: '0.0.0.0',
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      '@sb': path.resolve(__dirname, 'landings/secondbrain'),
    },
  },
});
