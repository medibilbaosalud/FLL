#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const ROOT_CANDIDATES = [".", "web"];

function resolveRoot() {
  for (const candidate of ROOT_CANDIDATES) {
    const full = path.resolve(candidate);
    if (fs.existsSync(path.join(full, "package.json"))) {
      return full;
    }
  }
  throw new Error("Ez da package.json fitxategirik aurkitu . edo web direktoriodan");
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function ensureFile(root, filePath, content, changes, label) {
  if (!fs.existsSync(filePath)) {
    ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, content, "utf8");
    changes.push(`${label} sortu da (${path.relative(root, filePath)})`);
  }
}

function prependFlags(root, filePath, changes) {
  if (!fs.existsSync(filePath)) {
    return;
  }
  let original = fs.readFileSync(filePath, "utf8");
  const dynamicRegex = /export const dynamic\s*=\s*['\"]force-dynamic['\"]/;
  const revalidateRegex = /export const revalidate\s*=\s*0/;
  const fetchCacheRegex = /export const fetchCache\s*=\s*['\"]force-no-store['\"]/;

  const needsDynamic = !dynamicRegex.test(original);
  const needsRevalidate = !revalidateRegex.test(original);
  const needsFetchCache = !fetchCacheRegex.test(original);

  if (!needsDynamic && !needsRevalidate && !needsFetchCache) {
    return;
  }

  let useClientPrefix = "";
  let body = original;
  const useClientMatch = body.match(/^\s*['\"]use client['\"];?\s*/);
  if (useClientMatch) {
    useClientPrefix = useClientMatch[0];
    body = body.slice(useClientPrefix.length);
  }

  const insertLines = [];
  if (needsDynamic) insertLines.push("export const dynamic = 'force-dynamic';");
  if (needsRevalidate) insertLines.push("export const revalidate = 0;");
  if (needsFetchCache) insertLines.push("export const fetchCache = 'force-no-store';");

  const insertion = insertLines.join("\n") + "\n\n";
  const updated = `${useClientPrefix}${insertion}${body.replace(/^\s+/, "")}`;
  fs.writeFileSync(filePath, updated, "utf8");
  changes.push(`SSR banderak gehitu dira (${path.relative(root, filePath)})`);
}

function updatePackageJson(root, changes) {
  const pkgPath = path.join(root, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  pkg.scripts = pkg.scripts || {};
  const desiredScripts = {
    dev: "next dev",
    build: "next build",
    start: "next start",
    typecheck: "tsc --noEmit",
    "fix:routes": "node scripts/ensure-routes.mjs",
  };
  let modified = false;
  for (const [key, value] of Object.entries(desiredScripts)) {
    if (pkg.scripts[key] !== value) {
      pkg.scripts[key] = value;
      modified = true;
    }
  }
  if (modified) {
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");
    changes.push("package.json eguneratua (Next scriptak eta fix:routes)");
  }
}

function ensureConfig(root, changes) {
  const configPath = path.join(root, "next.config.mjs");
  if (!fs.existsSync(configPath)) {
    const minimal = `/** @type {import('next').NextConfig} */\nconst config = {\n  reactStrictMode: true,\n};\nexport default config;\n`;
    fs.writeFileSync(configPath, minimal, "utf8");
    changes.push("next.config.mjs sortu da");
    return;
  }

  let source = fs.readFileSync(configPath, "utf8");
  const withoutOutput = source.replace(/\n?\s*output\s*:\s*['\"]export['\"],?/g, "");
  if (withoutOutput !== source) {
    fs.writeFileSync(configPath, withoutOutput, "utf8");
    source = withoutOutput;
    changes.push("next.config.mjs -> output: 'export' kenduta");
  }
}

const root = resolveRoot();
const changes = [];

const appDir = path.join(root, "app");
const pagesDir = path.join(root, "pages");
const hasAppRouter = fs.existsSync(appDir);
const hasPagesRouter = fs.existsSync(pagesDir);

if (!hasAppRouter && !hasPagesRouter) {
  ensureDir(appDir);
}

const homeAppPath = path.join(appDir, "page.tsx");
const homePagesPath = path.join(pagesDir, "index.tsx");

if (hasAppRouter || !hasPagesRouter) {
  const homeContent = "export const dynamic = 'force-dynamic';\nexport const revalidate = 0;\nexport default function Home(){return(<main style={{padding:24}}><h1>ArchéoSense</h1><a href=\"/app\">→ Ireki aplikazioa</a></main>);}\n";
  ensureFile(root, homeAppPath, homeContent, changes, "Hasiera orria");
  prependFlags(root, homeAppPath, changes);
} else {
  const homeContentPages = "export default function Home(){return(<main style={{padding:24}}><h1>ArchéoSense</h1><a href=\"/app\">→ Ireki aplikazioa</a></main>);}\n";
  ensureFile(root, homePagesPath, homeContentPages, changes, "Hasiera orria");
}

if (hasAppRouter || !hasPagesRouter) {
  const layoutPath = path.join(appDir, "layout.tsx");
  const layoutContent = "import type { ReactNode } from 'react';\nexport const metadata = { title: 'ArchéoSense', description: 'Hasiera' };\nexport default function RootLayout({children}:{children:ReactNode}){return(<html lang=\"eu\"><body style={{fontFamily:'system-ui,sans-serif'}}>{children}</body></html>);}\n";
  ensureFile(root, layoutPath, layoutContent, changes, "Layout orokorra");
}

const appPageAppRouter = path.join(appDir, "app", "page.tsx");
const appPagePagesRouterIndex = path.join(pagesDir, "app", "index.tsx");

const appPageContent = "export const dynamic = 'force-dynamic';\nexport const revalidate = 0;\nexport const fetchCache = 'force-no-store';\nexport default function AppShell(){return(<main style={{padding:24}}><h1>ArchéoSense aplikazioa</h1><p>Mapa eta kudeaketa atalera bideratzen.</p></main>);}\n";

if (hasAppRouter || !hasPagesRouter) {
  ensureFile(root, appPageAppRouter, appPageContent, changes, "app/ orria");
  prependFlags(root, appPageAppRouter, changes);
} else {
  const appPagesContent = "export default function AppShell(){return(<main style={{padding:24}}><h1>ArchéoSense aplikazioa</h1><p>Mapa eta kudeaketa atalera bideratzen.</p></main>);}\n";
  ensureFile(root, appPagePagesRouterIndex, appPagesContent, changes, "pages/app/ indexa");
}

const dynamicTargets = [
  homeAppPath,
  path.join(appDir, "app", "page.tsx"),
  path.join(appDir, "reports", "page.tsx"),
  path.join(appDir, "scenario", "page.tsx"),
  path.join(appDir, "settings", "page.tsx"),
  path.join(appDir, "triage", "page.tsx"),
];
dynamicTargets.forEach((target) => prependFlags(root, target, changes));

ensureConfig(root, changes);
updatePackageJson(root, changes);

console.log(`Root hautatua: ${root}`);
if (changes.length === 0) {
  console.log("Ez da aldaketarik behar izan; konfigurazioa osorik dago.");
} else {
  console.log("Egin diren aldaketak:");
  for (const change of changes) {
    console.log(` - ${change}`);
  }
}
console.log("\nGogoratu: Vercel-en proiektua `web/` azpidirektorioan badago, Root Directory ezarri `web`-en.");
