// filepath: automotive-salah/apps/admin/next.config.js
/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },

  images: {
    domains: [
      "localhost",

      "yourdomain.com",

      "www.key4.com",

      "img1.wsimg.com",

      "i.postimg.cc",
    ],
  },

  basePath: "",

  async redirects() {
    return [
      {
        source: "/",

        destination: "/login",

        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
