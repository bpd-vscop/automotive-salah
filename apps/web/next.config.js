/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'yourdomain.com',
      'www.key4.com',
      'img1.wsimg.com',
      'i.postimg.cc',
      'i.ebayimg.com',
      'm.media-amazon.com'
    ],
  },
  transpilePackages: ['@automotive/ui'],
}

module.exports = nextConfig