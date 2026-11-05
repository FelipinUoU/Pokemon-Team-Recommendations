// Script de build da pasta mobile/www para empacotamento no Capacitor Android
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mobileDir = path.resolve(__dirname, '..');
const rootDir = path.resolve(mobileDir, '..');
const wwwDir = path.join(mobileDir, 'www');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

console.log('1. Limpando e criando estrutura www/...');
fs.rmSync(wwwDir, { recursive: true, force: true });
ensureDir(path.join(wwwDir, 'css', 'fonts'));
ensureDir(path.join(wwwDir, 'js'));
ensureDir(path.join(wwwDir, 'vendor'));

console.log('2. Copiando HTML, CSS e ícone...');
copyFile(path.join(mobileDir, 'src', 'index.html'), path.join(wwwDir, 'index.html'));
copyFile(path.join(mobileDir, 'src', 'fonts.css'), path.join(wwwDir, 'css', 'fonts.css'));
copyFile(path.join(mobileDir, 'src', 'mobile.css'), path.join(wwwDir, 'css', 'mobile.css'));
copyFile(path.join(rootDir, 'css', 'styles.css'), path.join(wwwDir, 'css', 'styles.css'));
copyFile(path.join(rootDir, 'favicon.svg'), path.join(wwwDir, 'favicon.svg'));

console.log('3. Compilando Tailwind CSS offline...');
execSync(
  `npx tailwindcss -c "${path.join(mobileDir, 'tailwind.config.js')}" -i "${path.join(mobileDir, 'src', 'tailwind.input.css')}" -o "${path.join(wwwDir, 'css', 'tailwind.css')}" --minify`,
  { cwd: mobileDir, stdio: 'inherit' }
);

console.log('4. Copiando fontes offline (Inter, Plus Jakarta Sans, JetBrains Mono, Material Symbols)...');
const fontFiles = [
  ['@fontsource/inter/files/inter-latin-400-normal.woff2', 'inter-latin-400-normal.woff2'],
  ['@fontsource/inter/files/inter-latin-500-normal.woff2', 'inter-latin-500-normal.woff2'],
  ['@fontsource/inter/files/inter-latin-600-normal.woff2', 'inter-latin-600-normal.woff2'],
  ['@fontsource/inter/files/inter-latin-700-normal.woff2', 'inter-latin-700-normal.woff2'],
  ['@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2', 'jetbrains-mono-latin-500-normal.woff2'],
  ['@fontsource/jetbrains-mono/files/jetbrains-mono-latin-600-normal.woff2', 'jetbrains-mono-latin-600-normal.woff2'],
  ['@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2', 'jetbrains-mono-latin-700-normal.woff2'],
  ['@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-600-normal.woff2', 'plus-jakarta-sans-latin-600-normal.woff2'],
  ['@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-700-normal.woff2', 'plus-jakarta-sans-latin-700-normal.woff2'],
  ['@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-800-normal.woff2', 'plus-jakarta-sans-latin-800-normal.woff2'],
  ['material-symbols/material-symbols-outlined.woff2', 'material-symbols-outlined.woff2']
];
for (const [relSrc, destName] of fontFiles) {
  copyFile(
    path.join(mobileDir, 'node_modules', relSrc),
    path.join(wwwDir, 'css', 'fonts', destName)
  );
}

console.log('5. Copiando scripts do motor e da aplicação...');
for (const jsFile of ['data-types-games.js', 'data-pokemon.js', 'data-pokedex-full.js', 'engine.js', 'app.js']) {
  copyFile(path.join(rootDir, 'js', jsFile), path.join(wwwDir, 'js', jsFile));
}
copyFile(path.join(mobileDir, 'src', 'mobile.js'), path.join(wwwDir, 'js', 'mobile.js'));

console.log('6. Copiando bundles do Capacitor...');
copyFile(path.join(mobileDir, 'node_modules', '@capacitor', 'core', 'dist', 'capacitor.js'), path.join(wwwDir, 'vendor', 'capacitor.js'));
for (const plugin of ['app', 'filesystem', 'share', 'status-bar', 'splash-screen']) {
  copyFile(
    path.join(mobileDir, 'node_modules', '@capacitor', plugin, 'dist', 'plugin.js'),
    path.join(wwwDir, 'vendor', `${plugin}.js`)
  );
}

console.log('✓ Build de mobile/www concluído com sucesso!');
