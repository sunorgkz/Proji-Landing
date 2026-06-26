import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      background: '#f8fafc',
      color: '#0f172a',
      fontFamily: 'system-ui, sans-serif',
    }}
  >
    <div style={{ textAlign: 'center', maxWidth: 420 }}>
      <p style={{ fontSize: '4rem', fontWeight: 700, margin: '0 0 1rem', color: '#64748b' }}>404</p>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0 0 0.5rem' }}>Страница не найдена</h1>
      <p style={{ color: '#64748b', margin: '0 0 2rem' }}>
        Такого лендинга пока нет на landing.proji.kz
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          background: '#0f172a',
          color: '#fff',
          textDecoration: 'none',
          fontWeight: 500,
        }}
      >
        На главную
      </Link>
    </div>
  </div>
);
