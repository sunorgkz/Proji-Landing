import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { resetDocumentShell } from '../lib/resetDocumentShell';

const REDIRECT_SECONDS = 5;

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  useLayoutEffect(() => {
    resetDocumentShell();
    document.title = '404 — Proji';
    document.documentElement.style.background = '#030712';
    document.body.style.background = '#030712';
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.background = '';
      document.body.style.background = '';
      document.body.style.margin = '';
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const tick = window.setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          window.clearInterval(tick);
          navigate('/', { replace: true });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(tick);
  }, [navigate]);

  return (
    <div className="not-found-page">
      <div className="not-found-glow not-found-glow--left" aria-hidden="true" />
      <div className="not-found-glow not-found-glow--right" aria-hidden="true" />
      <div className="not-found-grid" aria-hidden="true" />

      <main className="not-found-card">
        <Link to="/" className="not-found-logo" aria-label="Proji — на главную">
          proji
        </Link>

        <p className="not-found-code">404</p>
        <h1 className="not-found-title">Страница не найдена</h1>
        <p className="not-found-text">
          Такого лендинга нет на landing.proji.org.
          <br />
          Перенаправим на главную через{' '}
          <span className="not-found-count">{secondsLeft}</span> сек.
        </p>

        <Link to="/" className="not-found-btn">
          На главную сейчас
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 12h14M13 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Ubuntu:wght@700&display=swap');

        .not-found-page {
          position: relative;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          overflow: hidden;
          background: #030712;
          color: #f8fafc;
          font-family: 'Inter', system-ui, sans-serif;
        }

        .not-found-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(148, 163, 184, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.06) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(circle at center, black 20%, transparent 75%);
        }

        .not-found-glow {
          position: absolute;
          width: 28rem;
          height: 28rem;
          border-radius: 9999px;
          filter: blur(80px);
          opacity: 0.45;
          animation: not-found-float 8s ease-in-out infinite;
        }

        .not-found-glow--left {
          top: -6rem;
          left: -4rem;
          background: #0ea5e9;
        }

        .not-found-glow--right {
          right: -6rem;
          bottom: -4rem;
          background: #6366f1;
          animation-delay: -3s;
        }

        .not-found-card {
          position: relative;
          z-index: 1;
          width: min(100%, 28rem);
          padding: 2.5rem 2rem;
          text-align: center;
          border-radius: 1.5rem;
          border: 1px solid rgba(148, 163, 184, 0.14);
          background: rgba(15, 23, 42, 0.72);
          backdrop-filter: blur(20px);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.03) inset,
            0 24px 80px rgba(0, 0, 0, 0.45);
        }

        .not-found-logo {
          display: inline-block;
          margin-bottom: 2rem;
          font-family: 'Ubuntu', system-ui, sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          text-transform: lowercase;
          text-decoration: none;
          background: linear-gradient(135deg, #93c5fd 0%, #38bdf8 45%, #e2e8f0 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .not-found-code {
          margin: 0 0 0.75rem;
          font-size: clamp(4.5rem, 18vw, 6.5rem);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.06em;
          background: linear-gradient(180deg, #f8fafc 0%, #64748b 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .not-found-title {
          margin: 0 0 0.75rem;
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: -0.02em;
        }

        .not-found-text {
          margin: 0 0 1.75rem;
          font-size: 0.95rem;
          line-height: 1.6;
          color: #94a3b8;
        }

        .not-found-count {
          display: inline-block;
          min-width: 1.25rem;
          font-variant-numeric: tabular-nums;
          font-weight: 700;
          color: #38bdf8;
        }

        .not-found-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.85rem 1.5rem;
          border-radius: 9999px;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 600;
          color: #030712;
          background: linear-gradient(135deg, #7dd3fc 0%, #38bdf8 50%, #0ea5e9 100%);
          box-shadow: 0 12px 32px rgba(14, 165, 233, 0.35);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .not-found-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 16px 40px rgba(14, 165, 233, 0.45);
        }

        @keyframes not-found-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(12px, -18px) scale(1.05); }
        }
      `}</style>
    </div>
  );
};
