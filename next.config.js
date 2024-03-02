/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'images.unsplash.com' },
      { hostname: 'img.kwcdn.com' },
      { hostname: 'projektkrank.s3.eu-north-1.amazonaws.com' },
      { hostname: 'lh3.googleusercontent.com' },
      { hostname: 'i.discogs.com' },
      { hostname: 'upload.wikimedia.org' },
      { hostname: 'images.thalia.media' },
      { hostname: 'i.ebayimg.com' },
      { hostname: 'media.boohoo.com' },
      { hostname: 'shop.2pac.com' },
      { hostname: 'i.etsystatic.com' },
      { hostname: 'i.postimg.cc' },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
