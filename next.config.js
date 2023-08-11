/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    api_url: process.env.api_url,
    api_profile: process.env.api_profile,
    API_URL: process.env.API_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    REDIRECT_URI: process.env.REDIRECT_URI,
    QUICKBOOKS_CLIENT_ID: process.env.QUICKBOOKS_CLIENT_ID,
    QUICKBOOKS_CLIENT_SECRET: process.env.QUICKBOOKS_CLIENT_SECRET,
    QUICKBOOKS_REDIRECT_URI: process.env.QUICKBOOKS_REDIRECT_URI,
    base_url: process.env.base_url,
  },
  images: {
    domains: ['https://nextpqap.azurewebsites.net']
  },
  // output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
