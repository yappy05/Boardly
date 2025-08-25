// shared/api/http-client.ts
import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';

const baseURL = 'http://localhost:3000';

export const http = axios.create({
    baseURL,
    withCredentials: true,
});

// Request interceptor
http.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor - ОБРАБОТКА ОШИБОК
http.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as (AxiosRequestConfig & { _retry?: boolean }) | undefined;

        // Обработка 401 ошибки (refresh token logic)
        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { data } = await axios.post<{ accessToken: string }>(
                    `${baseURL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );

                localStorage.setItem('accessToken', data.accessToken);
                originalRequest.headers = {
                    ...originalRequest.headers,
                    Authorization: `Bearer ${data.accessToken}`,
                };
                return http(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        // ЦЕНТРАЛИЗОВАННАЯ ОБРАБОТКА ВСЕХ ОШИБОК
        const message = getErrorMessage(error);
        const customError = new Error(message);

        // Добавляем дополнительную информацию
        (customError as any).status = error.response?.status;
        (customError as any).code = error.code;

        return Promise.reject(customError);
    }
);

// Функция для получения читаемого сообщения об ошибке
function getErrorMessage(error: AxiosError): string {
    // Серверная ошибка с message
    if (error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
        return String(error.response.data.message);
    }

    // Стандартные HTTP ошибки
    if (error.response?.status) {
        switch (error.response.status) {
            case 400: return 'Bad Request';
            case 401: return 'Unauthorized';
            case 403: return 'Forbidden';
            case 404: return 'Not Found';
            case 500: return 'Internal Server Error';
            default: return `HTTP Error ${error.response.status}`;
        }
    }

    // Network errors
    if (error.code === 'NETWORK_ERROR') {
        return 'Network error. Please check your connection.';
    }

    // Timeout
    if (error.code === 'ECONNABORTED') {
        return 'Request timeout. Please try again.';
    }

    // Default
    return error.message || 'Unknown error occurred';
}