import fs from 'fs';
import path from 'path';

const root = path.resolve(import.meta.dirname, '..');

const BUNDLED_SLUGS = [
  'crm',
  'digital-team',
  'knowledge-twin',
  'knowledge-vault',
  'team-ai',
  'team-ai-collab',
  'insight-hub',
  'context-flow',
  'flow-forge',
  'pro-ai-council',
];

function walk(dir, exts, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory() && !['node_modules', 'dist', '.git'].includes(e.name)) {
      walk(p, exts, out);
    } else if (exts.some((x) => e.name.endsWith(x))) {
      out.push(p);
    }
  }
  return out;
}

function scanBundle(slug) {
  const dir = path.join(root, 'public', slug, 'assets');
  if (!fs.existsSync(dir)) return null;
  let hash = 0;
  let mailto = 0;
  let wame = 0;
  let submit = 0;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js'))) {
    const t = fs.readFileSync(path.join(dir, f), 'utf8');
    hash += (t.match(/href:"#"/g) ?? []).length;
    mailto += (t.match(/mailto:/g) ?? []).length;
    wame += (t.match(/wa\.me/g) ?? []).length;
    submit += (t.match(/submitDemo|demo-request|formsubmit/i) ?? []).length;
  }
  return { hash, mailto, wame, submit };
}

const bundleStats = Object.fromEntries(
  BUNDLED_SLUGS.map((s) => [s, scanBundle(s)]).filter(([, v]) => v)
);

console.log(JSON.stringify(bundleStats, null, 2));
