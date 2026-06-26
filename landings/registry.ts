import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

export interface LandingEntry {
  /** URL path segment, e.g. "primer" → /primer */
  slug: string;
  title: string;
  component: LazyExoticComponent<ComponentType>;
}

/**
 * Registry of all landings on landing.proji.kz
 *
 * Each landing is fully isolated — own styles, theme, fonts.
 * Do NOT add global styles to index.html that affect all pages.
 *
 * To add a new Lovable landing:
 * 1. Copy its files into landings/<slug>/
 * 2. Scope all styles to a root class (e.g. .my-landing-root), never body/html
 * 3. Export a default React component; import styles only inside that component
 * 4. Add an entry below with the matching slug
 */
export const landings: LandingEntry[] = [
  {
    slug: '',
    title: 'Proji | ИИ решает 80% рутины',
    component: lazy(() => import('./main/MainLanding')),
  },
  {
    slug: 'proji_knowledge',
    title: 'proji studio — AI-рекомендатель корпоративных знаний',
    component: lazy(() => import('./proji_knowledge/ProjiKnowledgeLanding')),
  },
  {
    slug: 'secondbrain',
    title: 'proji — AI с абсолютной памятью для ваших проектов',
    component: lazy(() => import('./secondbrain/SecondBrainLanding')),
  },
];

const bySlug = new Map(landings.map(entry => [entry.slug, entry]));

export function getLanding(slug: string): LandingEntry | undefined {
  return bySlug.get(slug);
}

export function getAllSlugs(): string[] {
  return landings.filter(e => e.slug !== '').map(e => e.slug);
}
