import apiClient from './axios-config';
import { useToast } from 'vue-toastification';

const toast = useToast();

export const createApiService = (resource) => ({
    async get(id) {
        try {
            const response = await apiClient.get(`/${resource}/${id}`);
            return response.data;
        } catch (error) {
            toast.error('Không thể lấy dữ liệu');
            throw error;
        }
    },

    async list(params) {
        try {
            const response = await apiClient.get(`/${resource}`, { params });
            return response.data;
        } catch (error) {
            toast.error('Không thể lấy danh sách dữ liệu');
            throw error;
        }
    },

    async postDetail(params, enteredOTP) {
        try {
            const response = await apiClient.post(`/${resource}/${params}`, {
                password: enteredOTP
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
});