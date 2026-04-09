/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@condoflow/types', '@condoflow/utils', '@condoflow/ui'],
  experimental: {
    typedRoutes: false,
  },
};

module.exports = nextConfig;
