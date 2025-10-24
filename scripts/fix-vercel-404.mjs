#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

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

async function ensureNextConfig() {
  const configPath = path.join(absoluteRoot, "next.config.mjs");
  const legacyPath = path.join(absoluteRoot, "next.config.js");

  if (fs.existsSync(legacyPath)) {
    console.warn("[fix-vercel-404] next.config.js atzeman da; next.config.mjs gainidatziko da eta output:'export' ezabatuko da.");
  }

  const template = `import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const variants = [".tsx", ".ts", ".jsx", ".js"];

function hasAppWorkspaceRoute() {
  const cwd = process.cwd();
  const appAppDir = path.join(cwd, "app", "app");
  const pagesDir = path.join(cwd, "pages");
  const hasAppRouteInApp = variants.some((ext) => fs.existsSync(path.join(appAppDir, "page" + ext)));
  const hasAppRouteInPages =
    variants.some((ext) => fs.existsSync(path.join(pagesDir, "app" + ext))) ||
    variants.some((ext) => fs.existsSync(path.join(pagesDir, "app", "index" + ext)));
  return hasAppRouteInApp || hasAppRouteInPages;
}

const appRouteExists = hasAppWorkspaceRoute();

const moduleDir = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: { appDir: true },
  images: { remotePatterns: [] },
  async redirects() {
    if (!appRouteExists) {
      return [];
    }
    return [{ source: "/", destination: "/app", permanent: false }];
  },
  webpack(webpackConfig) {
    const hasGeojsonRule = webpackConfig.module?.rules?.some((rule) => {
      if (!rule || typeof rule !== "object") return false;
      const test = rule.test;
      if (test instanceof RegExp) {
        return test.test("example.geojson");
      }
      if (Array.isArray(test)) {
        return test.some((entry) => entry instanceof RegExp && entry.test("example.geojson"));
      }
      return false;
    });

    if (!hasGeojsonRule) {
      webpackConfig.module = webpackConfig.module || {};
      webpackConfig.module.rules = webpackConfig.module.rules || [];
      webpackConfig.module.rules.push({
        test: /\\.geojson$/i,
        type: "json",
        parser: { parse: JSON.parse },
      });
    }

    webpackConfig.resolve = webpackConfig.resolve || {};
    webpackConfig.resolve.alias = {
      ...(webpackConfig.resolve.alias || {}),
      "@": path.resolve(moduleDir),
    };

    return webpackConfig;
  },
};

export default config;
`;

  await fsp.writeFile(configPath, template, "utf8");
  console.log("[fix-vercel-404] \u2705 next.config.mjs eguneratu da (output: 'export' gabe).");
}

(async () => {
  await ensurePackageScripts();
  await ensureAppHome();
  await ensureNextConfig();

  console.log("\n[fix-vercel-404] Laburpena");
  console.log(" - Scripts eguneratu dira (badagoen neurrian).");
  console.log(" - Hasiera orria eta layout-a balidatu dira.");
  console.log(" - next.config.mjs prest dago eta redirect baldintzazkoa da.");
  console.log("\n[Siguientes pasos]");
  console.log(" - pnpm run fix:vercel");
  console.log(" - pnpm dev");
  console.log(" - pnpm build && pnpm start");
})();
