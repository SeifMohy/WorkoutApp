/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'www.w3.org',
      'lh3.googleusercontent.com',
      'picsum.photos',
      'www.youtube.com',
      "artimg.gympik.com",
      "media.istockphoto.com",
      "img.freepik.com"
    ],
  },
}
module.exports = nextConfig