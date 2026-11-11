import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { catalogGroups, CORE_SLUGS } from '../landings/catalog';

const COMPANY = {
  legal: 'ИП «SUNNET», ИИН 911211301246, г. Актобе, район Алматы',
  phone: '+7 776 600 66 36',
  phoneHref: 'tel:+77766006636',
  email: 'sund.serik@gmail.com',
};

const timeNow = () =>
  new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Aqtobe' }).format(new Date());

export const MainFooter: React.FC = () => {
  const [time, setTime] = useState(timeNow);
  useEffect(() => {
    const id = window.setInterval(() => setTime(timeNow()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const core = catalogGroups
    .flatMap(g => g.items)
    .filter(p => (CORE_SLUGS as readonly string[]).includes(p.slug));

  return (
    <footer className="ph-footer">
      <div className="ph-footer-grid">
        <div className="ph-ft ph-ft-statement">
          <p>ИИ-платформа нового поколения. Автоматизируйте рутину, фокусируйтесь на главном.</p>
          <p className="ph-ft-legal">
            © Proji. Все права защищены. {COMPANY.legal}. Фото Актобе:{' '}
            <a href="https://commons.wikimedia.org/wiki/File:Aktobe_Reservoir.jpg">Esetok, CC BY-SA 4.0</a>,{' '}
            <a href="https://commons.wikimedia.org/wiki/File:Aktobe_(Kazakhstan),_satellite_image_2017-09-07.jpg">ESA, CC BY-SA 3.0</a>,{' '}
            <a href="https://commons.wikimedia.org/wiki/File:Aktobe_19_century_(01).jpg">общественное достояние</a>, Wikimedia Commons.
          </p>
        </div>
        <nav className="ph-ft ph-ft-nav" aria-label="Навигация">
          <span className="ph-ft-label">Разделы</span>
          <ul>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/services">Все продукты</Link></li>
            <li><Link to="/tariffs">Тарифы</Link></li>
            <li><a href="/privacy">Политика конфиденциальности</a></li>
            <li><a href="/legal/publichnaya-oferta.pdf">Условия использования (публичная оферта)</a></li>
          </ul>
        </nav>
        <div className="ph-ft ph-ft-products">
          <span className="ph-ft-label">Продукты</span>
          <ul>
            {core.map(p => (
              <li key={p.slug}><Link to={`/${p.slug}`}>{p.name}</Link></li>
            ))}
          </ul>
        </div>
        <div className="ph-ft ph-ft-time">
          <span className="ph-ft-label">Актобе, Казахстан</span>
          <strong>{time}</strong>
        </div>
        <div className="ph-ft ph-ft-mail">
          <span className="ph-ft-label">Напишите нам</span>
          <div>
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            <br />
            <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
          </div>
        </div>
        <div className="ph-ft ph-ft-wordmark" aria-hidden>Proji</div>
      </div>
    </footer>
  );
};
