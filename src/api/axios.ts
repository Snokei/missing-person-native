import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // 1. Fetch the combined auth string
    const authString = await AsyncStorage.getItem('auth');

    const publicRoutes = ['/users/login'];
    const isPublicRoute = publicRoutes.some((route) => config.url?.includes(route));

    if (!isPublicRoute && authString && config.headers) {
      try {
        // 2. Parse the object and extract the token
        const { token } = JSON.parse(authString);

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {
        console.error('Failed to parse auth token', e);
      }
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<any>) => {
    return Promise.reject(error);
  }
);

export default api;
