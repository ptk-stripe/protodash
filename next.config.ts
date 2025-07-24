import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  /* config options here */
  experimental: {
    viewTransition: true
  },
};

export default nextConfig;
