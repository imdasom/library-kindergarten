/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
