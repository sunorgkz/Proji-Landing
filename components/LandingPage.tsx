import React, { Suspense, useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getLanding } from '../landings/registry';
import { applyLandingPageBg, LANDING_PAGE_BG } from '../lib/landingPageBg';
import { getTheme, resolveTheme, syncPrefsFromStorage } from '../lib/projiPrefs';
import { isStaticPublicLanding, staticPublicPath } from '../lib/staticPublicLandings';
import { NotFound } from './NotFound';

const PageLoader = ({ background }: { background: string }) => (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background,
    }}
  >
    <div
      style={{
        width: 32,
        height: 32,
        border: '2px solid rgba(120,160,255,.2)',
        borderTopColor: '#60A5FA',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

interface LandingPageProps {
  /** Empty string for the root landing at / */
  slug?: string;
}

export const LandingPage: React.FC<LandingPageProps> = ({ slug: slugProp }) => {
  const { slug: slugParam } = useParams<{ slug: string }>();
  const slug = slugProp ?? slugParam ?? '';

  const entry = getLanding(slug);
  const resolved = resolveTheme(getTheme());
  const pageBg = LANDING_PAGE_BG[slug]
    ? (resolved === 'light' ? LANDING_PAGE_BG[slug].light : LANDING_PAGE_BG[slug].dark)
    : (resolved === 'light' ? '#f8fafc' : '#0f172a');
  const isStaticPublic = isStaticPublicLanding(slug);

  useLayoutEffect(() => {
    syncPrefsFromStorage();
    applyLandingPageBg(slug);
  }, [slug]);

  useLayoutEffect(() => {
    if (!entry || !isStaticPublic) return;
    window.location.replace(staticPublicPath(slug));
  }, [entry, isStaticPublic, slug]);

  useEffect(() => {
    document.title = entry?.title ?? 'Proji';
  }, [entry]);

  if (!entry) {
    return <NotFound />;
  }

  if (isStaticPublic) {
    return <PageLoader background={pageBg} />;
  }

  const Component = entry.component;

  return (
    <Suspense fallback={<PageLoader background={pageBg} />}>
      <Component />
    </Suspense>
  );
};
