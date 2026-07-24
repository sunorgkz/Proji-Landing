import fs from 'fs';
import path from 'path';

const root = path.resolve(import.meta.dirname, '..');

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

const issues = [];
const files = walk(root, ['.tsx', '.ts', '.html']).filter(
  (f) => !f.includes(`${path.sep}secondbrain${path.sep}components${path.sep}ui${path.sep}`)
);

for (const f of files) {
  const rel = path.relative(root, f).replace(/\\/g, '/');
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  lines.forEach((line, i) => {
    if (/href=["']#["']/.test(line) || /href=\{["']#["']\}/.test(line)) {
      issues.push({ file: rel, line: i + 1, type: 'dead-href-hash', ctx: line.trim().slice(0, 140) });
    }
  });
}

for (const f of walk(path.join(root, 'public'), ['.js'])) {
  const rel = path.relative(root, f).replace(/\\/g, '/');
  const text = fs.readFileSync(f, 'utf8');
  const count = (text.match(/href:"#"/g) || []).length;
  if (count) {
    issues.push({ file: rel, line: '-', type: 'dead-href-hash-bundle', ctx: `${count} occurrence(s)` });
  }
}

console.log(JSON.stringify(issues, null, 2));
console.error('TOTAL', issues.length);
