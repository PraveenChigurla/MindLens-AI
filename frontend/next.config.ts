import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_BASE_URL || 'http://127.0.0.1:8000'}/:path*`,
      },
      {
        source: '/health',
        destination: `${process.env.API_BASE_URL || 'http://127.0.0.1:8000'}/health`,
      },
      {
        source: '/metrics',
        destination: `${process.env.API_BASE_URL || 'http://127.0.0.1:8000'}/metrics`,
      }
    ]
  }
};

export default nextConfig;
