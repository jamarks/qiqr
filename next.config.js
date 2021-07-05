module.exports = {
  env: {
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
    NEXT_PUBLIC_VERCEL_URL:process.env.NEXT_PUBLIC_VERCEL_URL
    
  },
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com','media-exp3.licdn.com'],
  },
}
