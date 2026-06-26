import React, { Suspense, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getLanding } from '../landings/registry';
import { NotFound } from './NotFound';

const PageLoader = () => (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fff',
    }}
  >
    <div
      style={{
        width: 32,
        height: 32,
        border: '2px solid #e2e8f0',
        borderTopColor: '#64748b',
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

  useEffect(() => {
    document.title = entry?.title ?? 'Proji';
  }, [entry]);

  if (!entry) {
    return <NotFound />;
  }

  const Component = entry.component;

  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
};
