// Prepares the static build output for GitHub Pages.
// Run after `GH_PAGES=true vite build` (see package.json "build:static").
//
// GitHub Pages serves plain files: it needs index.html at the site root and
// falls back to 404.html for any unknown path, which is how client-side
// routing handles deep links. TanStack Start's SPA shell is written as
// _shell.html, so we copy it to both entry points and disable Jekyll.
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const candidates = [".output/public", "dist/client"];
const publicDir = candidates.find((dir) => existsSync(join(dir, "_shell.html")));

if (!publicDir) {
  console.error(
    `No SPA shell found. Looked for _shell.html in: ${candidates.join(", ")}. Run "bun run build:static" first.`,
  );
  process.exit(1);
}

const shell = join(publicDir, "_shell.html");
copyFileSync(shell, join(publicDir, "index.html"));
copyFileSync(shell, join(publicDir, "404.html"));
writeFileSync(join(publicDir, ".nojekyll"), "");
console.log(`GitHub Pages files ready in ${publicDir}/ (index.html, 404.html, .nojekyll)`);
