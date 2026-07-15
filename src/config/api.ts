// In dev, requests go through the Vite proxy (see vite.config.ts) so the browser
// treats them as same-origin — the backend does not send CORS headers.
export const API_BASE_URL = import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE_URL || 'https://h2iy23zjkq.us-east-1.awsapprunner.com';
