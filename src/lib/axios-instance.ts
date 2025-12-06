import env from '@/lib/env';
import axios from 'axios';

const isServer = typeof window === 'undefined';
const baseURL = isServer ? `${env.DOMAIN_URL}/api/v2` : "http://localhost:3000/api/v2";

const axiosInstance = axios.create({
    baseURL,
    timeout: 10000,
    withCredentials: true,
});

export default axiosInstance;

