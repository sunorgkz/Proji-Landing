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
    slug: 'knowledge',
    title: 'proji studio — AI-рекомендатель корпоративных знаний',
    component: lazy(() => import('./proji_knowledge/ProjiKnowledgeLanding')),
  },
  {
    slug: 'secondbrain',
    title: 'proji — AI с абсолютной памятью для ваших проектов',
    component: lazy(() => import('./secondbrain/SecondBrainLanding')),
  },
  {
    slug: 'chrome-extension',
    title: 'proji chrome extension — живёт в каждой вкладке',
    component: lazy(() => import('./chrome_extension/ChromeExtensionLanding')),
  },
  {
    slug: 'sunnet',
    title: 'Proji | Организационный Интеллект',
    component: lazy(() => import('./sunnet/SunnetLanding')),
  },
  {
    slug: 'platform',
    title: 'Proji AI | Organizational Intelligence Platform',
    component: lazy(() => import('./platform/PlatformLanding')),
  },
  {
    slug: 'crm',
    title: 'PROJI — AI Sales Operating System',
    component: lazy(() => import('./crm/CrmLanding')),
  },
  {
    slug: 'team-ai',
    title: 'proGPT — Team AI collaboration platform',
    component: lazy(() => import('./team_ai/TeamAiLanding')),
  },
  {
    slug: 'os-engine',
    title: 'PROJI — AI Operating System for Business',
    component: lazy(() => import('./os_engine/OsEngineLanding')),
  },
  {
    slug: 'digital-team',
    title: 'PROJI AI — Цифровые сотрудники для вашего бизнеса',
    component: lazy(() => import('./digital_team/DigitalTeamLanding')),
  },
  {
    slug: 'knowledge-vault',
    title: 'Proji — Intelligent decision support system',
    component: lazy(() => import('./knowledge_vault/KnowledgeVaultLanding')),
  },
  {
    slug: 'knowledge-twin',
    title: 'PROJI Knowledge Twin — Digital memory for your company',
    component: lazy(() => import('./knowledge_twin/KnowledgeTwinLanding')),
  },
  {
    slug: 'insight-hub',
    title: 'Proji — Корпоративная экосистема фокуса',
    component: lazy(() => import('./insight_hub/InsightHubLanding')),
  },
];

const bySlug = new Map(landings.map(entry => [entry.slug, entry]));

export function getLanding(slug: string): LandingEntry | undefined {
  return bySlug.get(slug);
}

export function getAllSlugs(): string[] {
  return landings.filter(e => e.slug !== '').map(e => e.slug);
}
