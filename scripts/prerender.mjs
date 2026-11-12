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

const dump = (chrome, url, budget = 8000) =>
  new Promise(resolve => {
    execFile(
      chrome,
      ['--headless=new', '--disable-gpu', '--no-sandbox', '--no-first-run', `--virtual-time-budget=${budget}`, '--dump-dom', url],
      { maxBuffer: 32 * 1024 * 1024, timeout: 60000 },
      (err, out) => resolve(err ? '' : out),
    );
  });

/* содержимое #root из готовой страницы; классы «ждём JS» убираем, чтобы без скрипта всё было видно */
const rootHtml = page => {
  /* полоска cookie добавляется в конец body скриптом public/cookie-banner.js: убираем её до разбора */
  const dom = page.replace(/<div class="pj-cookie"[\s\S]*?<\/div><\/div>/, '');
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
  const save = (slug, html) => {
    const file = path.join(DIST, slug, 'index.html');
    writeFileSync(file, readFileSync(file, 'utf-8').replace(STUB, () => `<div id="root">${html}</div>`));
    done++;
  };
  const url = slug => `http://localhost:${PORT}/${slug}?lang=ru`;
  const failed = [];
  for (let i = 0; i < slugs.length; i += 3) {
    await Promise.all(
      slugs.slice(i, i + 3).map(async slug => {
        const html = rootHtml(await dump(chrome, url(slug)));
        if (html.length < 500) failed.push(slug);
        else save(slug, html);
      }),
    );
  }
  /* тяжёлые страницы не успевают при параллельной загрузке: по одной и с большим запасом времени */
  for (const slug of failed) {
    const html = rootHtml(await dump(chrome, url(slug), 20000));
    if (html.length < 500) console.warn(`[prerender] /${slug}: пусто, оставляю заглушку`);
    else save(slug, html);
  }
  console.log(`[prerender] готово: ${done} из ${slugs.length}`);
} finally {
  stop();
}
