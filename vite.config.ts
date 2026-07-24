import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

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

export default defineConfig({
  plugins: [react(), tailwindcss(), staticLandingDevPlugin()],
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
