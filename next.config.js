/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'resizer.otstatic.com',
            port: '',
            pathname: '/v2/photos/**',
          },
          {
            protocol: 'https',
            hostname: 'images.otstatic.com',
            port: '',
            pathname: '/prod1/**',
          },
        ],
      },
}

module.exports = nextConfig
