/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    remotePatterns: []
  },
  reactStrictMode: true
};

module.exports = nextConfig;
