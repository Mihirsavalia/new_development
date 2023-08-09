/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        base_url: process.env.base_url,
        select_url:process.env.select_url
    }
}

module.exports = nextConfig
