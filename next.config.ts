import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'img.youtube.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    qualities: [25, 50, 75, 100],
  },
};

export default nextConfig;