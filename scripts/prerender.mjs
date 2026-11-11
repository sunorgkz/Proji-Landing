/**
 * Пре-рендер после `vite build` (STRATEGY.md, раздел 3): открывает каждый React-лендинг в Chrome без окна
 * и кладёт готовый текст страницы в dist/<slug>/index.html. Поисковик без JS видит всю страницу,
 * а в браузере React просто рисует её заново поверх.
 * Работает только со страницами, для которых vite.config.ts уже создал свой index.html (заглушка <div id="root"><h1>).
 * Нет Chrome — пропускаем с предупреждением, сборка не падает. Путь к Chrome можно задать в CHROME_PATH.
 */
import { spawn, execFile } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
const PORT = 4179;
const STUB = /<div id="root"><h1>[\s\S]*?<\/div>/;

const findChrome = () => {
  const list = [
    process.env.CHROME_PATH,
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ];
  return list.find(p => p && existsSync(p));
};

const dump = (chrome, url) =>
  new Promise(resolve => {
    execFile(
      chrome,
      ['--headless=new', '--disable-gpu', '--no-sandbox', '--no-first-run', '--virtual-time-budget=8000', '--dump-dom', url],
      { maxBuffer: 32 * 1024 * 1024, timeout: 60000 },
      (err, out) => resolve(err ? '' : out),
    );
  });

/* содержимое #root из готовой страницы; классы «ждём JS» убираем, чтобы без скрипта всё было видно */
const rootHtml = dom => {
  const open = dom.indexOf('<div id="root"');
  const end = dom.lastIndexOf('</div>', dom.indexOf('</body>'));
  if (open < 0 || end < 0) return '';
  const inner = dom.slice(dom.indexOf('>', open) + 1, end);
  return inner.replace(/class="([^"]*)"/g, (_, c) => `class="${c.split(/\s+/).filter(x => x !== 'js' && x !== 'is-ready').join(' ')}"`);
};

const chrome = findChrome();
if (!chrome) {
  console.warn('[prerender] Chrome не найден, пропускаю (задайте CHROME_PATH)');
  process.exit(0);
}

const slugs = readdirSync(DIST, { withFileTypes: true })
  .filter(d => d.isDirectory() && existsSync(path.join(DIST, d.name, 'index.html')))
  .map(d => d.name)
  .filter(s => STUB.test(readFileSync(path.join(DIST, s, 'index.html'), 'utf-8')));

const server = spawn(`npx vite preview --port ${PORT} --strictPort`, { shell: true, stdio: 'ignore' });
const stop = () => {
  if (process.platform === 'win32') spawn('taskkill', ['/pid', String(server.pid), '/T', '/F'], { stdio: 'ignore' });
  else server.kill();
};

try {
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(`http://localhost:${PORT}/`)).ok) break;
    } catch {
      /* сервер ещё поднимается */
    }
    await new Promise(r => setTimeout(r, 500));
  }
  let done = 0;
  for (let i = 0; i < slugs.length; i += 4) {
    await Promise.all(
      slugs.slice(i, i + 4).map(async slug => {
        const url = `http://localhost:${PORT}/${slug}?lang=ru`;
        let html = rootHtml(await dump(chrome, url));
        if (html.length < 500) html = rootHtml(await dump(chrome, url)); /* медленная загрузка: вторая попытка */
        if (html.length < 500) return console.warn(`[prerender] /${slug}: пусто, оставляю заглушку`);
        const file = path.join(DIST, slug, 'index.html');
        writeFileSync(file, readFileSync(file, 'utf-8').replace(STUB, () => `<div id="root">${html}</div>`));
        done++;
      }),
    );
  }
  console.log(`[prerender] готово: ${done} из ${slugs.length}`);
} finally {
  stop();
}
