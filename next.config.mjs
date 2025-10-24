import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const moduleDir = path.dirname(fileURLToPath(import.meta.url));

function hasAppRoute() {
  const candidates = [
    ['app', 'app', 'page.tsx'],
    ['pages', 'app', 'index.tsx'],
    ['pages', 'app.tsx'],
  ];
  return candidates.some((segments) => fs.existsSync(path.join(moduleDir, ...segments)));
}

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: { appDir: true },
  async redirects() {
    const base = [];
    if (hasAppRoute()) {
      const exists = base.some((r) => r.source === '/' && r.destination === '/app');
      if (!exists) {
        base.push({ source: '/', destination: '/app', permanent: false });
      }
    }
    return base;
  },
  images: { remotePatterns: [] },
  webpack(webpackConfig) {
    webpackConfig.resolve = webpackConfig.resolve || {};
    webpackConfig.resolve.alias = {
      ...(webpackConfig.resolve.alias || {}),
      '@': path.resolve(moduleDir),
    };

    webpackConfig.module = webpackConfig.module || {};
    webpackConfig.module.rules = webpackConfig.module.rules || [];
    const hasGeojsonRule = (webpackConfig.module.rules || []).some((rule) => {
      if (!rule || typeof rule !== 'object') return false;
      if (rule.test instanceof RegExp) return rule.test('file.geojson');
      if (Array.isArray(rule.test)) {
        return rule.test.some((entry) => entry instanceof RegExp && entry.test('file.geojson'));
      }
      return false;
    });

    if (!hasGeojsonRule) {
      webpackConfig.module.rules.push({
        test: /\.geojson$/i,
        type: 'json',
        parser: { parse: JSON.parse },
      });
    }

    return webpackConfig;
  },
};

export default config;
