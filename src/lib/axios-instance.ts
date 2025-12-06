import env from '@/lib/env';
import axios from 'axios';

const baseURL = `${env.KIHEAT_BACKEND_URL}/api/v2`;

const axiosInstance = axios.create({
    baseURL,
    timeout:  10000,
    withCredentials: true,
});

export default axiosInstance;

