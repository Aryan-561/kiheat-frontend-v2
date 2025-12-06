
const env = {
    DOMAIN_URL: process.env.DOMAIN_URL as string
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