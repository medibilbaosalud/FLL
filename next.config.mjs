import fs from 'node:fs';
import path from 'node:path';

const existing = {
  "experimental": {
    "appDir": true
  },
  "images": {
    "remotePatterns": []
  },
  "reactStrictMode": true
};
const existingRedirects = undefined;

const appRouteExists = (() => {
  const cwd = process.cwd();
  return fs.existsSync(path.join(cwd, 'app', 'app', 'page.tsx')) || fs.existsSync(path.join(cwd, 'pages', 'app.tsx'));
})();

const config = {
  ...existing,
  async redirects() {
    const base = Array.isArray(existingRedirects)
      ? existingRedirects
      : typeof existingRedirects === 'function'
      ? await existingRedirects()
      : [];
    if (!appRouteExists) {
      return base;
    }
    const has = base.some((route) => route.source === '/' && route.destination === '/app');
    return has ? base : [...base, { source: '/', destination: '/app', permanent: false }];
  },
};

export default config;
