import fs from "node:fs";
import path from "node:path";

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
        test: /\.geojson$/i,
        type: "json",
        parser: { parse: JSON.parse },
      });
    }

    webpackConfig.resolve = webpackConfig.resolve || {};
    webpackConfig.resolve.alias = {
      ...(webpackConfig.resolve.alias || {}),
      "@": path.resolve(__dirname),
    };

    return webpackConfig;
  },
};

export default config;
