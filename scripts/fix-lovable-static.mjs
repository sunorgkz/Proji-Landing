import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const STYLE =
  '<style id="proji-static-fix">section.opacity-0.translate-y-6,.opacity-0.translate-y-6{opacity:1!important;transform:none!important}</style>';

function fixHtml(filePath, assetPrefix) {
  let html = readFileSync(filePath, 'utf8');

  if (!html.includes('proji-static-fix')) {
    html = html.replace('<head>', `<head>${STYLE}`);
  }

  html = html.replace(/<script defer src="\/~flock.js"[^>]*><\/script>/g, '');
  html = html.replace(/<script defer src="\/__l5e\/events.js"[^>]*><\/script>/g, '');
  html = html.replace(
    new RegExp(`<script type="module" async="">import\\("${assetPrefix.replace(/\//g, '\\/')}[^"]+"\\)<\\/script>`, 'g'),
    '',
  );
  html = html.replace(/<script class="\$tsr" id="\$tsr-stream-barrier">[\s\S]*?<\/script>/g, '');

  writeFileSync(filePath, html);
  console.log(`Fixed ${filePath}`);
}

const publicDir = join(import.meta.dirname, '..', 'public');
fixHtml(join(publicDir, 'crm', 'index.html'), '/crm/assets/');
