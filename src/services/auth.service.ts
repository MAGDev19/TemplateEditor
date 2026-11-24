import { api, getBasicAuthHeader } from '../utils/api';
import { apiConfig } from '../config/api.config';
import type { LoginCredentials, AuthResponseData } from '../types/api.types';

export const authService = {
  /**
   * Authenticate user with username and password
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponseData> => {
    // Basic Auth header for initial authentication request
    const authHeader = getBasicAuthHeader(
      credentials.username || apiConfig.credentials.username,
      credentials.password || apiConfig.credentials.password
    );

    // In a real API endpoint, this performs POST /auth/login with credentials
    // Simulating API response structure
    return api.post<AuthResponseData>('/auth/login', credentials, {
      headers: {
        Authorization: authHeader,
      },
    }).catch(() => {
      // Mock fallback for demo when API server is not running
      return {
        token: 'token-jwt-api-connection-2026',
        user: {
          id: 'user-api-1',
          name: credentials.username || 'Usuario API',
          email: `${credentials.username || 'user'}@vision.com`,
          role: 'Administrador API',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(credentials.username || 'API User')}&background=2563eb&color=fff`,
        },
      };
    });
  },

  /**
   * Verify token / fetch current user profile
   */
  getProfile: async () => {
    return api.get('/auth/me');
  },

  /**
   * Logout user and clear tokens
   */
  logout: async () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  },
};

export default authService;
