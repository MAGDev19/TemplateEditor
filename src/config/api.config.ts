export const apiConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 15000,
  authType: (import.meta.env.VITE_API_AUTH_TYPE || 'basic') as 'basic' | 'bearer',
  credentials: {
    username: import.meta.env.VITE_API_USERNAME || 'admin_user',
    password: import.meta.env.VITE_API_PASSWORD || 'default_password',
  },
};

export default apiConfig;
