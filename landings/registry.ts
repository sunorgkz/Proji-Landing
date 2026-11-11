import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import { ROLE_IDS, ROLE_TITLES } from './manager/roles';

export interface LandingEntry {
  /** URL path segment, e.g. "primer" → /primer */
  slug: string;
  title: string;
  component: LazyExoticComponent<ComponentType>;
}

/**
 * Registry of all landings on landing.proji.org
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
  {
    slug: 'alt',
    title: 'Proji — руководитель видит всё, команда знает, что делать',
    component: lazy(() => import('./linear_alt/LinearAltLanding')),
  },
  {
    slug: 'board',
    title: 'Proji — руководитель видит всё, команда знает, что делать',
    component: lazy(() => import('./board/BoardLanding')),
  },
  {
    slug: 'agents',
    title: 'Proji — AI-агенты в одной команде с людьми',
    component: lazy(() => import('./agents/AgentsLanding')),
  },
  {
    slug: 'why',
    title: 'proji — хватит спрашивать «ну что там?»',
    component: lazy(() => import('./why/WhyLanding')),
  },
  {
    slug: 'hire',
    title: 'proji — возьмите меня на работу',
    component: lazy(() => import('./hire/HireLanding')),
  },
  {
    slug: 'ask',
    title: 'proji ai — спросите свою компанию',
    component: lazy(() => import('./ai/AskLanding')),
  },
  {
    slug: 'morning',
    title: 'proji ai — что горит и успеем ли',
    component: lazy(() => import('./ai/MorningLanding')),
  },
  {
    slug: 'phrase',
    title: 'proji ai — поставьте задачу фразой',
    component: lazy(() => import('./ai/PhraseLanding')),
  },
  {
    slug: 'vs',
    title: 'proji — таблица и чаты или Proji: честное сравнение',
    component: lazy(() => import('./kit/VsLanding')),
  },
  {
    slug: 'quiz',
    title: 'proji — тест: теряются ли задачи в вашей команде',
    component: lazy(() => import('./kit/QuizLanding')),
  },
  {
    slug: 'calc',
    title: 'proji — калькулятор: сколько часов уходит на «ну что там?»',
    component: lazy(() => import('./kit/CalcLanding')),
  },
  {
    slug: 'faq',
    title: 'proji — вопросы и ответы о Proji и Proji AI',
    component: lazy(() => import('./kit/FaqLanding')),
  },
  {
    slug: 'guide',
    title: 'Как перестать терять задачи в рабочих чатах: гайд для руководителя',
    component: lazy(() => import('./kit/GuideLanding')),
  },
  {
    slug: 'start',
    title: 'proji — первые 5 минут с Proji AI',
    component: lazy(() => import('./kit/StartLanding')),
  },
  {
    slug: 'safe',
    title: 'proji — что видит и чего не видит Proji AI',
    component: lazy(() => import('./kit/SafeLanding')),
  },
  {
    slug: 'go',
    title: 'proji — задачи из чатов больше не теряются',
    component: lazy(() => import('./kit/GoLanding')),
  },
  {
    slug: 'glossary',
    title: 'proji — словарь: ИИ и управление задачами простыми словами',
    component: lazy(() => import('./kit/GlossaryLanding')),
  },
  {
    slug: 'tour',
    title: 'proji — тур: спросите Proji AI о своей команде',
    component: lazy(() => import('./kit/TourLanding')),
  },
  {
    slug: 'privacy',
    title: 'proji — политика конфиденциальности',
    component: lazy(() => import('./privacy/PrivacyLanding')),
  },
  {
    slug: 'home',
    title: 'proji — руководитель видит всё, команда знает, что делать',
    component: lazy(() => import('./home/HomeLanding')),
  },
  ...ROLE_IDS.map(role => ({
    slug: `manager-${role}`,
    title: `proji — ${ROLE_TITLES[role]}`,
    component: lazy(() => import('./manager/ManagerLanding').then(m => ({ default: m.roleLanding(role) }))),
  })),
];

const bySlug = new Map(landings.map(entry => [entry.slug, entry]));

export function getLanding(slug: string): LandingEntry | undefined {
  return bySlug.get(slug);
}

export function getAllSlugs(): string[] {
  return landings.filter(e => e.slug !== '').map(e => e.slug);
}
