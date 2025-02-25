/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'img.youtube.com' }],
  },
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
