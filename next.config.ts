import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Vercel's image CDN converts and caches hero assets as AVIF/WebP at the right size.
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    qualities: [75, 88],
  },
};

export default nextConfig;
