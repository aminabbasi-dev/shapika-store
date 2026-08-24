// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/shapika/**",
      },
      {
        protocol: "https",
        hostname: "kaboompics.com",
        pathname: "/download/**",
      },
    ],
    // ✅ فعال کردن بهینه‌سازی با کیفیت‌های مجاز
    qualities: [75, 85, 90],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;