import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Create axios instance
export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    const token = 'your-token-here'; // Replace with actual token retrieval logic
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle common errors
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized - handle token refresh or redirect to login
          console.error('Unauthorized access');
          break;
        case 403:
          // Forbidden
          console.error('Forbidden access');
          break;
        case 404:
          // Not found
          console.error('Resource not found');
          break;
        case 500:
          // Server error
          console.error('Server error');
          break;
        default:
          console.error('An error occurred:', error.message);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.message);
    } else {
      // Something happened in setting up the request
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;