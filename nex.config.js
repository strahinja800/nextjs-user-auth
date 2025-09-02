/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ova opcija je ključna.
  // Govori Next.js-u da obavezno obradi 'next-auth' paket kroz svoj kompajler.
  // Ovo rešava sve one duboke probleme sa modulima koje smo imali.
  transpilePackages: ['next-auth'],
};

module.exports = nextConfig;