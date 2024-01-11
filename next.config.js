/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/m3ter-head/:seed",
        destination: "/api/m3ter-head",
      },
    ];
  },
};
module.exports = nextConfig;
