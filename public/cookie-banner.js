/*
 * Полоска согласия на cookie — одна на все страницы landing.proji.org: React-лендинги и статичные (public/<slug>/).
 * Выбор хранится в localStorage под ключом proji.cookie-consent: он общий для всего сайта,
 * поэтому, нажав «Принять» или «Только необходимые» на одной странице, посетитель больше не видит полоску ни на одной.
 * После выбора шлём событие proji:consent: analytics.ts включает Amplitude только при значении «all».
 * Что собирается и куда — /privacy, разделы 3 и 5.
 */
(function () {
  var KEY = 'proji.cookie-consent';
  var TEXT = {
    ru: ['Cookie для статистики.', 'Принять', 'Только необходимые', 'Подробнее'],
    kk: ['Статистика үшін cookie.', 'Қабылдау', 'Тек қажеттілері', 'Толығырақ'],
    en: ['Cookies for analytics.', 'Accept', 'Necessary only', 'Details'],
    ar: ['ملفات تعريف الارتباط للتحليلات.', 'قبول', 'الضرورية فقط', 'التفاصيل'],
  };
  var CSS =
    '.pj-cookie{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;gap:4px 16px;' +
    'padding:5px max(12px,calc((100vw - 1200px)/2));background:rgb(4 12 31/.94);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);' +
    'border-top:1px solid rgb(255 255 255/.12);color:#f2f7ff;font:400 12px/1.3 Inter,system-ui,sans-serif}' +
    '.pj-cookie p{margin:0;flex:0 1 auto;max-width:760px}.pj-cookie a{color:#5eecc4;text-decoration:underline;text-underline-offset:3px}' +
    '.pj-cookie div{display:flex;gap:6px;flex:none}' +
    '.pj-cookie button{min-height:26px;padding:0 12px;border-radius:999px;border:1px solid rgb(255 255 255/.28);background:transparent;color:#f2f7ff;font:600 12px/1 Inter,system-ui,sans-serif;cursor:pointer}' +
    '.pj-cookie button.is-yes{border-color:transparent;background:rgb(255 255 255/.16)}' +
    '.pj-cookie button:hover{background:rgb(255 255 255/.24)}' +
    '.pj-cookie button:focus-visible,.pj-cookie a:focus-visible{outline:2px solid #5eecc4;outline-offset:2px}' +
    '@media (max-width:600px){.pj-cookie{padding:4px 10px;gap:6px;justify-content:space-between;font-size:11px}.pj-cookie p{flex:1 1 auto}.pj-cookie div{gap:4px}.pj-cookie button{min-height:28px;padding:0 8px;font-size:11px}}';

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function show() {
    if (read() === 'all' || read() === 'necessary' || document.querySelector('.pj-cookie')) return;
    var lang = new URLSearchParams(location.search).get('lang');
    try { lang = lang || localStorage.getItem('proji.lang'); } catch (e) {}
    var t = TEXT[lang] || TEXT.ru;
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);
    var bar = document.createElement('div');
    bar.className = 'pj-cookie';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Cookie');
    bar.lang = lang && TEXT[lang] ? lang : 'ru';
    bar.dir = lang === 'ar' ? 'rtl' : 'ltr';
    var p = document.createElement('p');
    p.textContent = t[0] + ' ';
    var a = document.createElement('a');
    a.href = '/privacy';
    a.textContent = t[3];
    p.appendChild(a);
    var box = document.createElement('div');
    [['all', t[1], 'is-yes'], ['necessary', t[2], '']].forEach(function (b) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = b[1];
      if (b[2]) btn.className = b[2];
      btn.onclick = function () {
        try { localStorage.setItem(KEY, b[0]); } catch (e) {}
        bar.remove();
        window.dispatchEvent(new CustomEvent('proji:consent', { detail: b[0] }));
      };
      box.appendChild(btn);
    });
    bar.appendChild(p);
    bar.appendChild(box);
    document.body.appendChild(bar);
  }
  /* выбор, сделанный в другой вкладке, сразу убирает полоску и здесь */
  window.addEventListener('storage', function (e) {
    if (e.key !== KEY || !e.newValue) return;
    var bar = document.querySelector('.pj-cookie');
    if (bar) bar.remove();
    window.dispatchEvent(new CustomEvent('proji:consent', { detail: e.newValue }));
  });
  if (document.body) show();
  else document.addEventListener('DOMContentLoaded', show);
})();
