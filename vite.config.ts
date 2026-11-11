import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync } from 'fs';
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

/**
 * robots.txt — всегда; sitemap.xml и llms.txt (оглавление для ИИ-поисковиков) — только когда задан адрес сайта:
 * SITE_URL=https://… npx vite build. Домен не выдумываем, см. STRATEGY.md, разделы 3–4.
 */
function seoFilesPlugin(): Plugin {
  return {
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
      const site = (process.env.SITE_URL ?? '').replace(/\/+$/, '');
      const registry = readFileSync(path.resolve(__dirname, 'landings/registry.ts'), 'utf-8');
      const pages = [...registry.matchAll(/slug: '([^']*)',\s*title: '([^']*)'/g)]
        .map(([, slug, title]) => ({ slug, title }))
        .concat(ROLE_IDS.map(r => ({ slug: `manager-${r}`, title: `proji — ${ROLE_TITLES[r]}` })))
        .filter(p => !HIDDEN_SLUGS.includes(p.slug));
      const robots = ['User-agent: *', 'Allow: /', ...HIDDEN_SLUGS.map(s => `Disallow: /${s}/`)];
      if (site) robots.push('', `Sitemap: ${site}/sitemap.xml`);
      const NL = '\n';
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join(NL) + NL });
      if (!site) return;
      const url = (slug: string) => `${site}/${slug}`;
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
        ...pages.map(p => `- [${p.title}](${url(p.slug)})`),
      ];
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: llms.join(NL) + NL });
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
