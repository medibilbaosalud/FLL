#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const { promises: fsp } = fs;

const roots = [".", "web"];
let projectRoot = null;
for (const candidate of roots) {
  if (fs.existsSync(path.join(candidate, "package.json"))) {
    projectRoot = candidate;
    break;
  }
}

if (!projectRoot) {
  console.error("[fix-vercel-404] Ez da package.json aurkitu . edo web direktorioetan.");
  process.exit(1);
}

const absoluteRoot = path.resolve(projectRoot);
console.log(`[fix-vercel-404] Erro proiektua: ${projectRoot}`);

const fileVariants = [".tsx", ".ts", ".jsx", ".js"];

function hasVariant(dir, baseName) {
  return fileVariants.some((extension) => fs.existsSync(path.join(dir, `${baseName}${extension}`)));
}

async function ensurePackageScripts() {
  const pkgPath = path.join(absoluteRoot, "package.json");
  const raw = await fsp.readFile(pkgPath, "utf8");
  const pkg = JSON.parse(raw);
  pkg.scripts = pkg.scripts ?? {};
  const scripts = pkg.scripts;
  let changed = false;

  const ensureScript = (name, command) => {
    if (!scripts[name]) {
      console.log(`[fix-vercel-404] \u2705 gehitzen '${name}' script-a (${command}).`);
      scripts[name] = command;
      changed = true;
    }
  };

  ensureScript("dev", "next dev");
  ensureScript("build", "next build");
  ensureScript("start", "next start");

  const fixCommand = "node scripts/fix-vercel-404.mjs";
  if (scripts["fix:vercel"] !== fixCommand) {
    console.log("[fix-vercel-404] \u2705 eguneratzen 'fix:vercel' script-a.");
    scripts["fix:vercel"] = fixCommand;
    changed = true;
  }

  if (changed) {
    await fsp.writeFile(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf8");
  }
}

async function ensureAppHome() {
  const appDir = path.join(absoluteRoot, "app");
  const pagesDir = path.join(absoluteRoot, "pages");
  const hasAppDir = fs.existsSync(appDir);
  const hasPagesDir = fs.existsSync(pagesDir);

  if (hasAppDir) {
    await fsp.mkdir(appDir, { recursive: true });
    const layoutPath = path.join(appDir, "layout.tsx");
    if (!hasVariant(appDir, "layout")) {
      console.log("[fix-vercel-404] \u2705 sortzen app/layout.tsx default bat.");
      const layoutContent = `export const metadata = { title: "ArchéoSense", description: "Hasiera" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang=\"eu\">
      <body style={{ fontFamily: 'system-ui, sans-serif' }}>{children}</body>
    </html>
  );
}
`;
      await fsp.writeFile(layoutPath, layoutContent, "utf8");
    }

    const homePath = path.join(appDir, "page.tsx");
    if (!hasVariant(appDir, "page")) {
      console.log("[fix-vercel-404] \u2705 sortzen app/page.tsx hasiera sinplearekin.");
      const homeContent = `export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>ArchéoSense</h1>
      <p>Ongi etorri — hasiera orria.</p>
      <a href=\"/app\">→ Ireki aplikazioa</a>
    </main>
  );
}
`;
      await fsp.writeFile(homePath, homeContent, "utf8");
    }
  } else if (hasPagesDir) {
    await fsp.mkdir(pagesDir, { recursive: true });
    const indexPath = path.join(pagesDir, "index.tsx");
    if (!hasVariant(pagesDir, "index")) {
      console.log("[fix-vercel-404] \u2705 sortzen pages/index.tsx hasiera sinplearekin.");
      const indexContent = `export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>ArchéoSense</h1>
      <p>Ongi etorri — hasiera orria.</p>
      <a href=\"/app\">→ Ireki aplikazioa</a>
    </main>
  );
}
`;
      await fsp.writeFile(indexPath, indexContent, "utf8");
    }
  } else {
    console.log("[fix-vercel-404] \u2139\ufe0f Ez da app/ edo pages/ karpetarik aurkitu; ez da hasiera sortu.");
  }
}

function detectAppRoute() {
  const appAppDir = path.join(absoluteRoot, "app", "app");
  const pagesDir = path.join(absoluteRoot, "pages");
  const hasAppRouteInApp = hasVariant(appAppDir, "page");
  const hasAppRouteInPages = hasVariant(pagesDir, "app") || hasVariant(path.join(pagesDir, "app"), "index");
  return hasAppRouteInApp || hasAppRouteInPages;
}

async function ensureNextConfig({ addRedirect }) {
  const configPath = path.join(absoluteRoot, "next.config.mjs");
  const legacyPath = path.join(absoluteRoot, "next.config.js");
  const require = createRequire(import.meta.url);

  let existingConfig = {};
  if (fs.existsSync(configPath)) {
    try {
      const imported = await import(pathToFileURL(configPath));
      existingConfig = imported.default ?? imported;
    } catch (error) {
      console.warn("[fix-vercel-404] Ezin izan da dagoen next.config.mjs kargatu, konfigurazio huts bat erabiliko da.");
    }
  } else if (fs.existsSync(legacyPath)) {
    try {
      existingConfig = require(path.join(absoluteRoot, "next.config.js"));
      console.log("[fix-vercel-404] \u2705 aurkitutako next.config.js irakurri da.");
    } catch (error) {
      console.warn("[fix-vercel-404] Ezin izan da next.config.js kargatu, konfigurazio huts bat erabiliko da.");
    }
  }

  const { redirects, ...rest } = existingConfig || {};
  const baselineConfig = {
    experimental: { appDir: true },
    images: { remotePatterns: [] },
    reactStrictMode: true
  };
  const mergedRest = {
    ...baselineConfig,
    ...rest,
    experimental: { ...baselineConfig.experimental, ...(rest?.experimental ?? {}) },
    images: { ...baselineConfig.images, ...(rest?.images ?? {}) }
  };
  const serialized = JSON.stringify(mergedRest, null, 2);
  let redirectsArray = Array.isArray(redirects) ? redirects : [];
  if (typeof redirects === "function") {
    try {
      const result = await redirects();
      if (Array.isArray(result)) {
        redirectsArray = result;
      } else {
        console.warn("[fix-vercel-404] Oharra: redirects() funtzioak ez du array bat itzuli; ez da berrerabili.");
      }
    } catch (error) {
      console.warn("[fix-vercel-404] Oharra: ezin izan da jatorrizko redirects funtzioa exekutatu.");
    }
  }
  const redirectsArrayLiteral = JSON.stringify(redirectsArray ?? []);

const template = `import fs from 'node:fs';
import path from 'node:path';

const existing = ${serialized || "{}"};
const existingRedirectFunction = null;
const existingRedirectArray = ${redirectsArrayLiteral};

const appRouteExists = (() => {
  const cwd = process.cwd();
  const variants = ['.tsx', '.ts', '.jsx', '.js'];
  const appAppDir = path.join(cwd, 'app', 'app');
  const pagesDir = path.join(cwd, 'pages');
  const hasApp = variants.some((ext) => fs.existsSync(path.join(appAppDir, 'page' + ext)));
  const hasPagesDirect = variants.some((ext) => fs.existsSync(path.join(pagesDir, 'app' + ext)));
  const hasPagesIndex = variants.some((ext) => fs.existsSync(path.join(pagesDir, 'app', 'index' + ext)));
  return hasApp || hasPagesDirect || hasPagesIndex;
})();

const config = {
  ...existing,
  async redirects() {
    const base = [];
    if (Array.isArray(existingRedirectArray)) {
      base.push(...existingRedirectArray);
    }
    if (typeof existingRedirectFunction === 'function') {
      const original = await existingRedirectFunction();
      if (Array.isArray(original)) {
        base.push(...original);
      }
    }
    const sanitized = base.filter((route) => !(route?.source === '/' && route?.destination === '/app' && !${addRedirect ? "appRouteExists" : "false"}));
    if (${addRedirect ? "appRouteExists" : "false"}) {
      const has = sanitized.some((route) => route.source === '/' && route.destination === '/app');
      if (!has) {
        sanitized.push({ source: '/', destination: '/app', permanent: false });
      }
    }
    return sanitized;
  },
  webpack(config) {
    const hasGeojsonRule = config.module?.rules?.some((rule) => {
      if (!rule || typeof rule !== 'object') return false;
      const test = rule.test;
      if (!test) return false;
      if (test instanceof RegExp) {
        return test.test('file.geojson');
      }
      if (Array.isArray(test)) {
        return test.some((entry) => entry instanceof RegExp && entry.test('file.geojson'));
      }
      return false;
    });

    if (!hasGeojsonRule) {
      config.module.rules.push({
        test: /\\.geojson$/i,
        type: 'json',
      });
    }

    return config;
  },
};

export default config;
`;

  await fsp.writeFile(configPath, template, "utf8");
  if (fs.existsSync(legacyPath)) {
    console.log("[fix-vercel-404] \u2139\ufe0f next.config.mjs sortu da; kontuan izan next.config.js zaharkituta gera daitekeela.");
  } else {
    console.log("[fix-vercel-404] \u2705 next.config.mjs eguneratu da.");
  }
}

(async () => {
  await ensurePackageScripts();
  await ensureAppHome();
  const redirectNeeded = detectAppRoute();
  await ensureNextConfig({ addRedirect: redirectNeeded });

  console.log("\n[fix-vercel-404] Laburpena");
  console.log(" - Scripts eguneratu dira (badagoen neurrian).");
  console.log(" - Hasiera orria eta layout-a balidatu dira.");
  console.log(" - next.config.mjs prest dago eta redirect baldintzazkoa da.");
  console.log("\n[Siguientes pasos]");
  console.log(" - pnpm run fix:vercel");
  console.log(" - pnpm dev");
  console.log(" - pnpm build && pnpm start");
})();
