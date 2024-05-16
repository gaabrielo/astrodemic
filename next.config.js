/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/dash',
        destination: '/dash/maps',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
