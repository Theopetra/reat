/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["stxnft.mypinata.cloud", "images.gamma.io", "cdn.discordapp.com"],
  },
};

module.exports = nextConfig;
