/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["images.unsplash.com", "api.dicebear.com"],
  },
  // Enable RTL support
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "ar",
    localeDetection: false,
  },
};

module.exports = nextConfig;
