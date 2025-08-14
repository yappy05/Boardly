import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';

const baseURL = 'http://localhost:3000';

export const http = axios.create({
    baseURL,
    withCredentials: true,
});

// Подставляем accessToken в каждый запрос
http.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
    }
    return config;
});

http.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as (AxiosRequestConfig & { _retry?: boolean }) | undefined;

        if (!originalRequest || error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            const { data } = await axios.post<{ accessToken: string; refreshToken: string }>(
                `${baseURL}/auth/refresh`,
                {},
                { withCredentials: true }
            );

            // сохраняем новые токены
            localStorage.setItem('accessToken', data.accessToken);
            // если вы реально храните refreshToken на клиенте (не рекомендуется) — раскомментируйте:
            // localStorage.setItem('refreshToken', data.refreshToken);

            // повторяем исходный запрос с новым accessToken
            originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${data.accessToken}`,
            };
            console.log('accessToken updated!')
            return http(originalRequest);
        } catch (refreshError) {
            localStorage.removeItem('accessToken');
            // localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            return Promise.reject(refreshError);
        }
    }
);