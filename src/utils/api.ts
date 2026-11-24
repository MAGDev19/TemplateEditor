import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { apiConfig } from '../config/api.config';
import { showErrorAlert } from './sweetalert';

// Encodes username and password for Basic Authentication Header
export const getBasicAuthHeader = (username = apiConfig.credentials.username, password = apiConfig.credentials.password): string => {
  const credentials = `${username}:${password}`;
  // btoa is native browser Base64 encoding
  return `Basic ${btoa(credentials)}`;
};

const apiClient: AxiosInstance = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request Interceptor: Injects Authentication Headers (Basic Auth or Bearer Token)
apiClient.interceptors.request.use(
  (config) => {
    // 1. Check for stored Bearer token
    const token = localStorage.getItem('auth_token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (apiConfig.authType === 'basic' && config.headers) {
      // 2. Fallback to Basic Authentication (Username & Password from env config)
      config.headers.Authorization = getBasicAuthHeader();
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Centralized Error Interception & Handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const status = error.response?.status;
    const errorMessage = error.response?.data?.message || error.message || 'Error de conexión con el servidor';

    if (status === 401) {
      // Session expired or invalid credentials
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      showErrorAlert('Sesión Expirada', errorMessage);
    } else if (status === 403) {
      showErrorAlert('Acceso Denegado', errorMessage);
    } else if (status >= 500) {
      showErrorAlert('Error de Servidor', errorMessage);
    }

    return Promise.reject(error);
  }
);

// Standardized Helper Wrappers
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, config).then((res) => res.data),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.post<T>(url, data, config).then((res) => res.data),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.put<T>(url, data, config).then((res) => res.data),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.patch<T>(url, data, config).then((res) => res.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T>(url, config).then((res) => res.data),
};

export default apiClient;
