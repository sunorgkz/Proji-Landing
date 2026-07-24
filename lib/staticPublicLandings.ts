/** Lovable landings served as static HTML from public/<slug>/ — no React iframe shell. */
export const STATIC_PUBLIC_LANDINGS = new Set([
  'sunnet',
  'platform',
  'crm',
  'team-ai',
  'digital-team',
  'knowledge-vault',
  'knowledge-twin',
  'insight-hub',
  'context-flow',
  'flow-forge',
  'team-ai-collab',
  'pro-ai-council',
]);

export function isStaticPublicLanding(slug: string): boolean {
  return STATIC_PUBLIC_LANDINGS.has(slug);
}

export function staticPublicPath(slug: string): string {
  return `/${slug}/index.html`;
}
