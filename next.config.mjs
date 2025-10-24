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
const existingRedirectFunction = null;
const existingRedirectArray = [{"source":"/","destination":"/app","permanent":false}];

const appRouteExists = (() => {
  const cwd = process.cwd();
  const variants = ['.tsx', '.ts', '.jsx', '.js'];
  const appAppDir = path.join(cwd, 'app', 'app');
  const pagesDir = path.join(cwd, 'pages');
  const hasApp = variants.some((ext) => fs.existsSync(path.join(appAppDir, 'page' + ext)));
  const hasPagesDirect = variants.some((ext) => fs.existsSync(path.join(pagesDir, 'app' + ext)));
  const hasPagesIndex = variants.some((ext) => fs.existsSync(path.join(pagesDir, 'app', 'index' + ext)));
  return hasApp || hasPagesDirect || hasPagesIndex;
})();

const config = {
  ...existing,
  async redirects() {
    const base = [];
    if (Array.isArray(existingRedirectArray)) {
      base.push(...existingRedirectArray);
    }
    if (typeof existingRedirectFunction === 'function') {
      const original = await existingRedirectFunction();
      if (Array.isArray(original)) {
        base.push(...original);
      }
    }
    const sanitized = base.filter((route) => !(route?.source === '/' && route?.destination === '/app' && !appRouteExists));
    if (appRouteExists) {
      const has = sanitized.some((route) => route.source === '/' && route.destination === '/app');
      if (!has) {
        sanitized.push({ source: '/', destination: '/app', permanent: false });
      }
    }
    return sanitized;
  },
};

export default config;
