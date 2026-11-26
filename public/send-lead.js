/*
 * Отправка заявок со статичных страниц (public/<slug>/) на почту: тот же сервис и тот же получатель,
 * что у форм на React-лендингах (lib/submitDemoRequest.ts). Вызывается из скрипта страницы:
 * projiSendLead(форма, 'slug', {поля}) → Promise<true | false>. «Спасибо» страница показывает только при true.
 */
(function () {
  var EMAIL = 'sund.serik@gmail.com';
  var FAIL = {
    ru: 'Не получилось отправить. Попробуйте ещё раз или напишите на ',
    kk: 'Жіберу мүмкін болмады. Қайталап көріңіз немесе мына поштаға жазыңыз: ',
    en: 'Could not send. Please try again or write to ',
    ar: 'تعذّر الإرسال. حاول مرة أخرى أو راسلنا على ',
  };

  window.projiSendLead = function (form, page, fields) {
    if (form.dataset.sending) return Promise.resolve(false);
    form.dataset.sending = '1';
    var old = form.querySelector('.pj-send-error');
    if (old) old.remove();
    var button = form.querySelector('[type="submit"]');
    if (button) button.disabled = true;

    var body = Object.assign({}, fields, { _subject: 'Заявка с лендинга /' + page, _template: 'table', _captcha: 'false' });
    return fetch('https://formsubmit.co/ajax/' + EMAIL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    })
      .then(function (res) {
        if (!res.ok) throw new Error('FormSubmit failed');
        return res.json();
      })
      .then(function (data) {
        if (String(data.success) === 'false') throw new Error('FormSubmit rejected');
        return true;
      })
      .catch(function () {
        var lang = (document.documentElement.lang || 'ru').slice(0, 2).replace('kz', 'kk');
        var p = document.createElement('p');
        p.className = 'pj-send-error';
        p.setAttribute('role', 'alert');
        p.style.cssText = 'margin:0;font-size:14px;color:#f87171';
        p.textContent = (FAIL[lang] || FAIL.ru) + EMAIL;
        form.appendChild(p);
        return false;
      })
      .finally(function () {
        delete form.dataset.sending;
        if (button) button.disabled = false;
      });
  };
})();
