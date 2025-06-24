import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        hostname: 'via.placeholder.com'
      },
      {
        protocol: 'https',
        hostname: 'fe4pzzl18g.ufs.sh'
      }
    ]
  }
};

export default nextConfig;
