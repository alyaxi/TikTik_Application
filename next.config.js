/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  }
  images: {
    domains: ['cdn.dribbble.com',"lh3.googleusercontent.com"]
  }
}

module.exports = nextConfig
