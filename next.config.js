/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  
  // Add security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Rewrites for serving static files
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/stablefields-tracker.html',
      },
      {
        source: '/app',
        destination: '/stablefields-tracker.html',
      },
      {
        source: '/tracker',
        destination: '/stablefields-tracker.html',
      },
      {
        source: '/test',
        destination: '/zed-api-test-enhanced.html',
      },
      {
        source: '/status',
        destination: '/api-status.html',
      },
      {
        source: '/legacy',
        destination: '/archive/legacy-tracker.html',
      },
    ];
  },
};

module.exports = nextConfig;