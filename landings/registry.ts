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
    slug: 'services',
    title: 'Proji — Сервисы и продукты',
    component: lazy(() => import('./services/ServicesLanding')),
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
    title: 'Proji AI | Мозг компании',
    component: lazy(() => import('./platform/PlatformLanding')),
  },
  {
    slug: 'crm',
    title: 'PROJI — Умный учёт клиентов',
    component: lazy(() => import('./crm/CrmLanding')),
  },
  {
    slug: 'team-ai',
    title: 'proGPT — Командный ИИ для совместной работы',
    component: lazy(() => import('./team_ai/TeamAiLanding')),
  },
  {
    slug: 'os-engine',
    title: 'PROJI — Операционная система для бизнеса',
    component: lazy(() => import('./os_engine/OsEngineLanding')),
  },
  {
    slug: 'digital-team',
    title: 'PROJI AI — Цифровые сотрудники для вашего бизнеса',
    component: lazy(() => import('./digital_team/DigitalTeamLanding')),
  },
  {
    slug: 'ai-agents',
    title: 'PROJI — AI-агенты для бизнеса',
    component: lazy(() => import('./ai_agents/AiAgentsLanding')),
  },
  {
    slug: 'knowledge-vault',
    title: 'Proji — Интеллектуальная система поддержки решений',
    component: lazy(() => import('./knowledge_vault/KnowledgeVaultLanding')),
  },
  {
    slug: 'knowledge-twin',
    title: 'PROJI — Цифровой двойник знаний компании',
    component: lazy(() => import('./knowledge_twin/KnowledgeTwinLanding')),
  },
  {
    slug: 'insight-hub',
    title: 'Proji — Корпоративная экосистема фокуса',
    component: lazy(() => import('./insight_hub/InsightHubLanding')),
  },
  {
    slug: 'context-flow',
    title: 'Proji — Умная память переписок',
    component: lazy(() => import('./context_flow/ContextFlowLanding')),
  },
  {
    slug: 'flow-forge',
    title: 'Proji — Фоновый AI-продюсер',
    component: lazy(() => import('./flow_forge/FlowForgeLanding')),
  },
  {
    slug: 'team-ai-collab',
    title: 'proGPT — Совместное пространство с ИИ для команд',
    component: lazy(() => import('./team_ai_collab/TeamAiCollabLanding')),
  },
  {
    slug: 'pro-ai-council',
    title: 'proGPT — Совет из лучших AI для вашей работы',
    component: lazy(() => import('./pro_ai_council/ProAiCouncilLanding')),
  },
  {
    slug: 'talent-manager',
    title: 'PROJI — Эволюция найма талантов',
    component: lazy(() => import('./talent_manager/TalentManagerLanding')),
  },
  {
    slug: 'antigravity',
    title: 'Бизнес в космосе — Антигравити',
    component: lazy(() => import('./antigravity/AntigravityLanding')),
  },
];

const bySlug = new Map(landings.map(entry => [entry.slug, entry]));

export function getLanding(slug: string): LandingEntry | undefined {
  return bySlug.get(slug);
}

export function getAllSlugs(): string[] {
  return landings.filter(e => e.slug !== '').map(e => e.slug);
}
