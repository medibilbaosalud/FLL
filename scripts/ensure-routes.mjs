import { promises as fs } from "node:fs";
import path from "node:path";

const CANDIDATES = [".", "web"];

async function pathExists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

async function detectRoot() {
  for (const candidate of CANDIDATES) {
    const full = path.resolve(process.cwd(), candidate);
    if (await pathExists(path.join(full, "package.json"))) {
      return full;
    }
  }
  throw new Error("Ezin izan da Next.js proiektuaren erroa aurkitu (. edo web/).\nMesedez egiaztatu package.json fitxategia non dagoen.");
}

async function ensureFlags(filePath) {
  if (!(await pathExists(filePath))) return false;
  let content = await fs.readFile(filePath, "utf8");
  let updated = false;

  const entries = [
    { line: "export const fetchCache = 'force-no-store';", regex: /export\s+const\s+fetchCache\s*=\s*['\"]force-no-store['\"];?/ },
    { line: "export const revalidate = 0;", regex: /export\s+const\s+revalidate\s*=\s*0;?/ },
    { line: "export const dynamic = 'force-dynamic';", regex: /export\s+const\s+dynamic\s*=\s*['\"]force-dynamic['\"];?/ },
  ];

  for (const entry of entries) {
    if (!entry.regex.test(content)) {
      content = `${entry.line}\n${content}`;
      updated = true;
    }
  }

  if (updated) {
    await fs.writeFile(filePath, content, "utf8");
  }
  return updated;
}

async function ensureFile(filePath, contents) {
  if (await pathExists(filePath)) {
    return false;
  }
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, contents, "utf8");
  return true;
}

async function updateNextConfig(root, changes) {
  const configPath = path.join(root, "next.config.mjs");
  const template = `import path from "node:path";\nimport { fileURLToPath } from "node:url";\n\nconst moduleDir = path.dirname(fileURLToPath(import.meta.url));\n\nfunction hasGeojsonRule(rules = []) {\n  return rules.some((rule) => {\n    if (!rule || typeof rule !== "object") return false;\n    const { test } = rule;\n    if (test instanceof RegExp) return test.test("file.geojson");\n    if (Array.isArray(test)) {\n      return test.some((entry) => entry instanceof RegExp && entry.test("file.geojson"));\n    }\n    return false;\n  });\n}\n\n/** @type {import('next').NextConfig} */\nconst config = {\n  reactStrictMode: true,\n  webpack(webpackConfig) {\n    const configRef = webpackConfig;\n    configRef.resolve = configRef.resolve || {};\n    configRef.resolve.alias = {\n      ...(configRef.resolve.alias || {}),\n      "@": path.resolve(moduleDir),\n    };\n\n    configRef.module = configRef.module || {};\n    configRef.module.rules = configRef.module.rules || [];\n\n    if (!hasGeojsonRule(configRef.module.rules)) {\n      configRef.module.rules.push({\n        test: /\\.geojson$/i,\n        type: "json",\n        parser: { parse: JSON.parse },\n      });\n    }\n\n    return configRef;\n  },\n};\n\nexport default config;\n`;
  const exists = await pathExists(configPath);
  const current = exists ? await fs.readFile(configPath, "utf8") : "";
  if (current.trim() !== template.trim()) {
    await fs.writeFile(configPath, template, "utf8");
    changes.push(exists ? "eguneratuta next.config.mjs" : "sortu next.config.mjs");
  }
  return { created: !exists, changes };
}

async function ensurePackageScripts(root) {
  const pkgPath = path.join(root, "package.json");
  const pkg = JSON.parse(await fs.readFile(pkgPath, "utf8"));
  pkg.scripts = pkg.scripts || {};
  const desired = {
    dev: "next dev",
    build: "next build",
    start: "next start",
    typecheck: "tsc --noEmit",
    routes: "node scripts/print-routes.mjs",
    "fix:routes": "node scripts/ensure-routes.mjs",
  };
  for (const [key, value] of Object.entries(desired)) {
    if (!pkg.scripts[key] || pkg.scripts[key] === "node scripts/ensure-routes.mjs") {
      pkg.scripts[key] = value;
    }
  }
  await fs.writeFile(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf8");
}

async function main() {
  const root = await detectRoot();
  const actions = [];
  const appDir = path.join(root, "app");
  const pagesDir = path.join(root, "pages");
  const hasAppRouter = await pathExists(appDir);
  const hasPagesRouter = await pathExists(pagesDir);

  if (!hasAppRouter && !hasPagesRouter) {
    await fs.mkdir(appDir, { recursive: true });
  }

  const useAppRouter = hasAppRouter || !hasPagesRouter;

  if (useAppRouter) {
    const layoutCreated = await ensureFile(
      path.join(appDir, "layout.tsx"),
      "export const metadata = { title: 'ArchéoSense', description: 'Hasiera' };\nexport default function RootLayout({ children }) {\n  return (<html lang=\"eu\"><body style={{ fontFamily: 'system-ui, sans-serif' }}>{children}</body></html>);\n}\n",
    );
    if (layoutCreated) actions.push("sortu app/layout.tsx");

    const homeCreated = await ensureFile(
      path.join(appDir, "page.tsx"),
      "export const dynamic='force-dynamic';\nexport const revalidate=0;\nexport default function Home(){return(<main style={{padding:24}}><h1>ArchéoSense</h1><a href=\"/app\">→ Ireki aplikazioa</a></main>);}\n",
    );
    if (homeCreated) actions.push("sortu app/page.tsx");

    const appHomeCreated = await ensureFile(
      path.join(appDir, "app", "page.tsx"),
      "export const dynamic='force-dynamic';\nexport const revalidate=0;\nexport const fetchCache='force-no-store';\nexport default function AppHome(){return(<section style={{padding:24}}><h2>ArchéoSense aplikazioa</h2><p>Orrialde sinplea 404 arazoak saihesteko.</p></section>);}\n",
    );
    if (appHomeCreated) actions.push("sortu app/app/page.tsx");

    const dynamicTargets = [
      path.join(appDir, "page.tsx"),
      path.join(appDir, "app", "page.tsx"),
      path.join(appDir, "reports", "page.tsx"),
      path.join(appDir, "scenario", "page.tsx"),
      path.join(appDir, "settings", "page.tsx"),
      path.join(appDir, "triage", "page.tsx"),
      path.join(appDir, "app", "reports", "page.tsx"),
      path.join(appDir, "app", "scenario", "page.tsx"),
      path.join(appDir, "app", "settings", "page.tsx"),
      path.join(appDir, "app", "triage", "page.tsx"),
    ];

    for (const target of dynamicTargets) {
      if (await ensureFlags(target)) {
        actions.push(`eguneratuta flag dinamikoak: ${path.relative(root, target)}`);
      }
    }
  } else {
    const homeCreated = await ensureFile(
      path.join(pagesDir, "index.tsx"),
      "export default function Home(){return(<main style={{padding:24}}><h1>ArchéoSense</h1><a href=\"/app\">→ Ireki aplikazioa</a></main>);}\n",
    );
    if (homeCreated) actions.push("sortu pages/index.tsx");

    const appCreated = await ensureFile(
      path.join(pagesDir, "app", "index.tsx"),
      "export default function AppHome(){return(<main style={{padding:24}}><h1>ArchéoSense aplikazioa</h1></main>);}\n",
    );
    if (appCreated) actions.push("sortu pages/app/index.tsx");
  }

  const configChanges = [];
  await updateNextConfig(root, configChanges);
  if (configChanges.length > 0) {
    actions.push(...configChanges);
  }

  const middlewareCreated = await ensureFile(
    path.join(root, "middleware.ts"),
    "import type { NextRequest } from 'next/server';\nimport { NextResponse } from 'next/server';\n\nexport function middleware(req: NextRequest) {\n  const url = req.nextUrl.clone();\n  if (url.pathname === '/') {\n    url.pathname = '/app';\n    return NextResponse.rewrite(url);\n  }\n  return NextResponse.next();\n}\n\nexport const config = { matcher: ['/'] };\n",
  );
  if (middlewareCreated) {
    actions.push("sortu middleware.ts");
  }

  const healthCreated = await ensureFile(
    path.join(root, "app", "api", "health", "route.ts"),
    "import { NextResponse } from 'next/server';\n\nexport async function GET() {\n  return NextResponse.json({ ok: true, ts: Date.now() });\n}\n",
  );
  if (healthCreated) {
    actions.push("sortu app/api/health/route.ts");
  }

  await ensurePackageScripts(root);

  console.log("\n✅ Amaituta. Proiektuaren erroa:", root);
  if (actions.length) {
    console.log("Egindako aldaketak:");
    actions.forEach((action) => console.log(" -", action));
  } else {
    console.log("Ez da aldaketarik behar izan; egitura osorik zegoen.");
  }
  console.log("\nHurrengo pausoak:");
  console.log(" pnpm run routes   # Next-ek ikusitako ibilbideak zerrendatzeko");
  console.log(" pnpm build        # build osoa");
}

await main().catch((error) => {
  console.error("❌ Scriptak huts egin du:", error.message);
  process.exitCode = 1;
});
