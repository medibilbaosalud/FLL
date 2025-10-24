import { spawn } from "node:child_process";
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
  throw new Error("Ezin izan da Next.js proiektuaren erroa aurkitu (. edo web/).");
}

async function resolveNextBin(root) {
  const localBin = path.join(root, "node_modules", ".bin", process.platform === "win32" ? "next.cmd" : "next");
  if (await pathExists(localBin)) {
    return localBin;
  }
  return null;
}

function runBuild(bin, root) {
  if (!bin) {
    throw Object.assign(new Error("Ez da Next.js binariorik aurkitu. Exekutatu lehenik 'pnpm install' edo zure paket-kudeatzailearekin instalazioa."), {
      code: "NEXT_BIN_MISSING",
    });
  }
  return new Promise((resolve, reject) => {
    const child = spawn(bin, ["build"], { cwd: root, stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      const text = chunk.toString();
      stdout += text;
      process.stdout.write(text);
    });

    child.stderr.on("data", (chunk) => {
      const text = chunk.toString();
      stderr += text;
      process.stderr.write(text);
    });

    child.on("error", (err) => reject(err));
    child.on("close", (code) => {
      if (code !== 0) {
        const error = new Error(`next build exited with status ${code}`);
        error.stdout = stdout;
        error.stderr = stderr;
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

function parseRoutes(output) {
  const lines = output.split(/\r?\n/);
  const routeLines = lines.filter((line) => /\s[○●λ]/.test(` ${line}`) || line.trim().startsWith("○") || line.trim().startsWith("●") || line.trim().startsWith("λ"));
  return routeLines.map((line) => line.trim());
}

async function main() {
  const root = await detectRoot();
  console.log("📍 Erroa:", root);
  const nextBin = await resolveNextBin(root);
  try {
    const output = await runBuild(nextBin, root);
    const routes = parseRoutes(output);
    console.log("\n📋 Next-ek aurkitutako ibilbideak:");
    if (routes.length === 0) {
      console.log(" (Ez da ibilbiderik aurkitu; egiaztatu home eta /app existitzen direla)");
    } else {
      routes.forEach((line) => console.log(" -", line));
    }
  } catch (error) {
    if (error.code === "NEXT_BIN_MISSING") {
      console.error("❌", error.message);
      console.error("   (Oharra: script honek ez du sare bidezko npx deskargarik egiten)");
      process.exitCode = 1;
      return;
    }
    console.error("❌ Ezin izan da build-a osatu:", error.message);
    if (error.stdout) {
      const routes = parseRoutes(error.stdout);
      if (routes.length) {
        console.log("\nBuild-a huts egin arren, hurrengo ibilbideak agertu dira:");
        routes.forEach((line) => console.log(" -", line));
      }
    }
    process.exitCode = 1;
  }
}

await main();
