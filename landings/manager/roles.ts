/** Список лендингов про цифровых менеджеров. Отдельно от текстов, чтобы registry.ts оставался лёгким. */

export const ROLE_IDS = ['coo', 'pm', 'marketing', 'finance', 'logistics', 'construction', 'sales', 'hr', 'legal', 'production'] as const;
export type RoleId = (typeof ROLE_IDS)[number];

export const ROLE_TITLES: Record<RoleId, string> = {
  coo: 'Цифровой операционный директор',
  pm: 'Цифровой проектный менеджер',
  marketing: 'Цифровой менеджер по маркетингу',
  finance: 'Цифровой менеджер по финансам',
  logistics: 'Цифровой менеджер по логистике',
  construction: 'Цифровой менеджер по строительству',
  sales: 'Цифровой менеджер по продажам',
  hr: 'Цифровой менеджер по персоналу',
  legal: 'Цифровой юрист-координатор',
  production: 'Цифровой менеджер производства',
};

export interface RoleCopy {
  name: string;
  short: string;
  sub: string;
  signals: [string, number, string][];
  story: { signal: string; analysis: string; person: string; agent: string; doc: string; done: string };
  team: { people: [string, string]; agents: [string, string] };
  qa: [string, string][];
}

export interface ManagerUi {
  nav: [string, string, string];
  cta: string;
  caps: string[];
  note: string;
  signalsH: string;
  signalsX: string;
  storyH: string;
  storyX: string;
  steps: string[];
  confirm: string;
  confirmed: string;
  teamH: string;
  teamX: string;
  you: string;
  people: string;
  agents: string;
  askH: string;
  safeH: string;
  safe: [string, string][];
  othersH: string;
  endH: string;
}
