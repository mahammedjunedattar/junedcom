/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for additional checks
  reactStrictMode: true,

  // Set the base path for your application (if needed)
  basePath: '',

  // Set the asset prefix for your static assets (if needed)
  assetPrefix: '',

  // Increase the timeout for static page generation (default is 30 seconds)
  staticPageGenerationTimeout: 60, // Set this to an appropriate value (e.g., 60 seconds)

  // Enable Incremental Static Regeneration (ISR) with revalidate
  // You can configure this in your page component directly (see ISR example below)

  // Add any other custom configurations if needed
  images: {
    domains: ['example.com'], // Add your image domains if using Next.js Image component
  },

  // Add custom headers or redirects if needed
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Custom-Header',
            value: 'my-custom-header-value',
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ];
  },

  // Other configuration options...
};

module.exports = nextConfig;
