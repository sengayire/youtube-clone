/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATA_SOURCE_URL: process.env.DATA_SOURCE_URL,
  },
};

export default nextConfig;
