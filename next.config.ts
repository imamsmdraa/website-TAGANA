import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/TAGANA_WEB' : '',
  assetPrefix: isProd ? '/TAGANA_WEB/' : '',
};

export default nextConfig;
