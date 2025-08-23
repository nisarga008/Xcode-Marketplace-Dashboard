export function getBaseUrl() {
  if (typeof window !== 'undefined') return '';
  const url = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${process.env.PORT ?? 3000}`;
  return url;
}