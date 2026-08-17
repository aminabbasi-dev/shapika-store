// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      // ... بقیه
    ],
    // غیرفعال کردن کامل بهینه‌سازی تصاویر
    unoptimized: true,
  },
  // اضافه کردن headers برای رفع CORS
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