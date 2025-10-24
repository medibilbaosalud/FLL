import path from "node:path";
import { fileURLToPath } from "node:url";

const moduleDir = path.dirname(fileURLToPath(import.meta.url));

function hasGeojsonRule(rules = []) {
  return rules.some((rule) => {
    if (!rule || typeof rule !== "object") return false;
    const { test } = rule;
    if (test instanceof RegExp) return test.test("file.geojson");
    if (Array.isArray(test)) {
      return test.some((entry) => entry instanceof RegExp && entry.test("file.geojson"));
    }
    return false;
  });
}

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  webpack(webpackConfig) {
    const configRef = webpackConfig;
    configRef.resolve = configRef.resolve || {};
    configRef.resolve.alias = {
      ...(configRef.resolve.alias || {}),
      "@": path.resolve(moduleDir),
    };

    configRef.module = configRef.module || {};
    configRef.module.rules = configRef.module.rules || [];

    if (!hasGeojsonRule(configRef.module.rules)) {
      configRef.module.rules.push({
        test: /\.geojson$/i,
        type: "json",
        parser: { parse: JSON.parse },
      });
    }

    return configRef;
  },
};

export default config;
