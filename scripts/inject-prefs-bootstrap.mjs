/**
 * Inject proji prefs bootstrap into every public/<slug>/index.html
 * without re-freezing SSR (preserves interactive theme/lang toggles).
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'fs';
import { join } from 'path';
import { injectPrefsBootstrap } from './patch-lovable-static.mjs';

const root = join(import.meta.dirname, '..', 'public');

for (const slug of readdirSync(root)) {
  const dir = join(root, slug);
  if (!statSync(dir).isDirectory()) continue;
  const file = join(dir, 'index.html');
  if (!existsSync(file)) continue;
  const before = readFileSync(file, 'utf8');
  const after = injectPrefsBootstrap(before);
  if (after !== before) {
    writeFileSync(file, after);
    console.log('injected prefs ->', slug);
  } else {
    console.log('unchanged', slug);
  }
}
