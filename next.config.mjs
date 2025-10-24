import path from "node:path";
import { fileURLToPath } from "node:url";

const moduleDir = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: { appDir: true },
  images: { remotePatterns: [] },
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
      "@": path.resolve(moduleDir),
    };

    return webpackConfig;
  },
};

export default config;
