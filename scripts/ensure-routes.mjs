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
  throw new Error(
    "Ezin izan da Next.js proiektuaren erroa aurkitu (. edo web/).\nMesedez egiaztatu package.json fitxategia non dagoen."
  );
}

async function ensureFile(filePath, contents) {
  if (await pathExists(filePath)) {
    return false;
  }
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, contents, "utf8");
  return true;
}

async function ensureFlags(filePath) {
  if (!(await pathExists(filePath))) return false;
  let content = await fs.readFile(filePath, "utf8");
  let updated = false;
  const entries = [
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

async function ensureRedirectHome(filePath) {
  if (!(await pathExists(filePath))) {
    await ensureFile(
      filePath,
      "import { redirect } from 'next/navigation';\n\nexport const dynamic = 'force-dynamic';\nexport const revalidate = 0;\n\nexport default function Home() {\n  redirect('/app');\n}\n"
    );
    return "sortu app/page.tsx";
  }
  let content = await fs.readFile(filePath, "utf8");
  let changed = false;
  if (!/redirect\(['\"]\/app['\"]\)/.test(content)) {
    content = "import { redirect } from 'next/navigation';\n\nexport const dynamic = 'force-dynamic';\nexport const revalidate = 0;\n\nexport default function Home() {\n  redirect('/app');\n}\n";
    changed = true;
  } else if (!/import\s+\{\s*redirect\s*\}/.test(content)) {
    content = `import { redirect } from 'next/navigation';\n${content}`;
    changed = true;
  }
  if (changed) {
    await fs.writeFile(filePath, content, "utf8");
    return "eguneratuta app/page.tsx (redirect)";
  }
  return null;
}

async function updateNextConfig(root, actions) {
  const configPath = path.join(root, "next.config.mjs");
  const template = `/** @type {import('next').NextConfig} */\nconst config = {\n  reactStrictMode: true,\n  webpack(webpackConfig) {\n    const nextConfig = webpackConfig;\n    nextConfig.module = nextConfig.module || {};\n    nextConfig.module.rules = nextConfig.module.rules || [];\n\n    const hasGeojsonRule = nextConfig.module.rules.some((rule) => {\n      if (!rule || typeof rule !== 'object') return false;\n      const { test } = rule;\n      if (test instanceof RegExp) return test.test('file.geojson');\n      if (Array.isArray(test)) {\n        return test.some((entry) => entry instanceof RegExp && entry.test('file.geojson'));\n      }\n      return false;\n    });\n\n    if (!hasGeojsonRule) {\n      nextConfig.module.rules.push({\n        test: /\\.geojson$/i,\n        type: 'json',\n        parser: { parse: JSON.parse },\n      });\n    }\n\n    return nextConfig;\n  },\n};\n\nexport default config;\n`;
  const exists = await pathExists(configPath);
  const current = exists ? await fs.readFile(configPath, "utf8") : "";
  if (current.trim() !== template.trim()) {
    await fs.writeFile(configPath, template, "utf8");
    actions.push(exists ? "eguneratuta next.config.mjs" : "sortu next.config.mjs");
  }
}

async function removeMiddleware(root, actions) {
  const candidates = ["middleware.ts", "middleware.js"];
  for (const candidate of candidates) {
    const full = path.join(root, candidate);
    if (await pathExists(full)) {
      const disabled = `${full}.disabled`;
      await fs.rename(full, disabled).catch(async (error) => {
        if (error.code === "EEXIST") {
          await fs.unlink(full);
          return;
        }
        throw error;
      });
      actions.push(`mugitu ${candidate} → ${path.basename(disabled)}`);
    }
  }
}

async function ensurePackageScripts(root) {
  const pkgPath = path.join(root, "package.json");
  const pkg = JSON.parse(await fs.readFile(pkgPath, "utf8"));
  pkg.scripts = pkg.scripts || {};
  const desired = {
    dev: "next dev",
    build: "next build",
    start: "next start",
    routes: "node scripts/print-routes.mjs",
    "fix:routes": "node scripts/ensure-routes.mjs",
  };
  for (const [key, value] of Object.entries(desired)) {
    if (!pkg.scripts[key]) {
      pkg.scripts[key] = value;
    }
  }
  await fs.writeFile(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf8");
}

async function main() {
  const root = await detectRoot();
  const actions = [];
  const appDir = path.join(root, "app");
  const hasAppRouter = await pathExists(appDir);

  if (!hasAppRouter) {
    await fs.mkdir(appDir, { recursive: true });
  }

  const layoutCreated = await ensureFile(
    path.join(appDir, "layout.tsx"),
    "export const metadata = { title: 'ArchéoSense', description: 'Hasiera' };\nexport default function RootLayout({ children }) {\n  return (<html lang=\"eu\"><body style={{ fontFamily: 'system-ui, sans-serif' }}>{children}</body></html>);\n}\n"
  );
  if (layoutCreated) actions.push("sortu app/layout.tsx");

  const redirectAction = await ensureRedirectHome(path.join(appDir, "page.tsx"));
  if (redirectAction) actions.push(redirectAction);

  const appHomeCreated = await ensureFile(
    path.join(appDir, "app", "page.tsx"),
    "export const dynamic='force-dynamic';\nexport const revalidate=0;\nexport default function AppHome(){return(<main style={{padding:24}}><h2>ArchéoSense aplikazioa</h2><p>Dashboard hasiera sinplea.</p></main>);}\n"
  );
  if (appHomeCreated) actions.push("sortu app/app/page.tsx");

  const dynamicTargets = [
    path.join(appDir, "app", "page.tsx"),
    path.join(appDir, "reports", "page.tsx"),
    path.join(appDir, "scenario", "page.tsx"),
    path.join(appDir, "settings", "page.tsx"),
    path.join(appDir, "triage", "page.tsx"),
  ];

  for (const target of dynamicTargets) {
    if (await ensureFlags(target)) {
      actions.push(`eguneratuta flag dinamikoak: ${path.relative(root, target)}`);
    }
  }

  await removeMiddleware(root, actions);
  await updateNextConfig(root, actions);

  const healthCreated = await ensureFile(
    path.join(appDir, "api", "health", "route.ts"),
    "import { NextResponse } from 'next/server';\n\nexport async function GET() {\n  return NextResponse.json({ ok: true, ts: Date.now() });\n}\n"
  );
  if (healthCreated) actions.push("sortu app/api/health/route.ts");

  await ensurePackageScripts(root);

  console.log("\n✅ Amaituta. Proiektuaren erroa:", root);
  if (actions.length) {
    console.log("Egindako aldaketak:");
    actions.forEach((action) => console.log(" -", action));
  } else {
    console.log("Ez da aldaketarik behar izan; egitura prest zegoen.");
  }
  console.log("\nHurrengo pausoak:");
  console.log(" pnpm run routes   # Next-ek ikusitako ibilbideak zerrendatzeko");
  console.log(" pnpm build        # build osoa");
}

await main().catch((error) => {
  console.error("❌ Scriptak huts egin du:", error.message);
  process.exitCode = 1;
});
