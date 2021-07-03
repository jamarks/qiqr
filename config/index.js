const dev = process.env.NEXT_PUBLIC_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://qrme-89s5tmqhn-jamarks.vercel.app';