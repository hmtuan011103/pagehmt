// services/axios-config.js
import axios from 'axios';
import CryptoJS from 'crypto-js';

const API_KEY = import.meta.env.VITE_API_KEY;
const IS_PRODUCTION = import.meta.env.PROD;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Always include API key
        config.headers['X-API-Key'] = API_KEY;

        // Add timestamp and signature in production
        if (IS_PRODUCTION) {
            const timestamp = Date.now().toString();
            const url = new URL(config.baseURL + config.url);
            const path = url.pathname;

            const signature = CryptoJS.HmacSHA256(
                timestamp + path,
                API_KEY
            ).toString(CryptoJS.enc.Hex);


            config.headers['X-Timestamp'] = timestamp;
            config.headers['X-Signature'] = signature;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response) {
            const errorMessage = error.response.data.error || 'Có lỗi xảy ra';

            switch (error.response.status) {
                case 401:
                    console.error('API Key không hợp lệ:', errorMessage);
                    break;
                case 403:
                    console.error('Không có quyền truy cập:', errorMessage);
                    break;
                case 429:
                    console.error('Quá nhiều yêu cầu:', errorMessage);
                    const retryAfter = error.response.data.retry_after;
                    if (retryAfter) {
                        console.info(`Thử lại sau ${retryAfter} giây`);
                    }
                    break;
                default:
                    console.error('Lỗi:', errorMessage);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;