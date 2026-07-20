import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/:path*',
      },
      {
        source: '/health',
        destination: 'http://127.0.0.1:8000/health',
      },
      {
        source: '/metrics',
        destination: 'http://127.0.0.1:8000/metrics',
      }
    ]
  }
};

export default nextConfig;
