/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['imagedelivery.net','cdn.sanity.io','app.gjerrigknark.com','gjerrigknark.com']
  }
}

module.exports = nextConfig
