/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'upload.wikimedia.org', 'i.scdn.co', 'avatars.yandex.net', 'i.ytimg.com'],
  },
}

module.exports = nextConfig
