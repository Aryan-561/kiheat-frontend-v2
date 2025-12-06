
const env = {
   DOMAIN_URL: process.env.NEXT_PUBLIC_DOMAIN_URL!,
  KIHEAT_BACKEND_URL: process.env.NEXT_PUBLIC_KIHEAT_BACKEND_URL!,
}

const isServer = typeof window === 'undefined';

for (const [key, value] of Object.entries(env)) {
    if (!value) {
        if (isServer) {
            console.error(`Missing environment variable: ${key}`);
            throw new Error(`Missing environment variable: ${key}`);
        } else {
            console.warn(`Skipping missing env var on client: ${key}`);
        }
    }
}

export default env