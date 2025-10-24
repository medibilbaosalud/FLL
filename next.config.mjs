/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  webpack(webpackConfig) {
    const nextConfig = webpackConfig;
    nextConfig.module = nextConfig.module || {};
    nextConfig.module.rules = nextConfig.module.rules || [];

    const hasGeojsonRule = nextConfig.module.rules.some((rule) => {
      if (!rule || typeof rule !== 'object') return false;
      const { test } = rule;
      if (test instanceof RegExp) return test.test('file.geojson');
      if (Array.isArray(test)) {
        return test.some((entry) => entry instanceof RegExp && entry.test('file.geojson'));
      }
      return false;
    });

    if (!hasGeojsonRule) {
      nextConfig.module.rules.push({
        test: /\.geojson$/i,
        type: 'json',
        parser: { parse: JSON.parse },
      });
    }

    return nextConfig;
  },
};

export default config;
