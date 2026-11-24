import { api } from '@/utils/api';
import type { User, CreateUserInput } from '../types/users.types';
import { INITIAL_MOCK_USERS } from '@/mocks/handlers';

let fallbackUsersStore: User[] = [...INITIAL_MOCK_USERS];

export const usersApi = {
  getUsers: async (): Promise<User[]> => {
    try {
      const data = await api.get<User[]>('/users');
      // Si la respuesta del API es válida, devolverla
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
      return fallbackUsersStore;
    } catch {
      // Si el backend no responde o falla la red, devolver inmediatamente los datos de ejemplo
      return fallbackUsersStore;
    }
  },

  getUserById: async (id: string): Promise<User> => {
    try {
      return await api.get<User>(`/users/${id}`);
    } catch {
      const found = fallbackUsersStore.find((u) => u.id === id);
      if (found) return found;
      throw new Error('Usuario no encontrado');
    }
  },

  createUser: async (input: CreateUserInput): Promise<User> => {
    try {
      return await api.post<User>('/users', input);
    } catch {
      // Fallback local en memoria
      const newUser: User = {
        id: `usr-${Date.now()}`,
        ...input,
        createdAt: new Date().toISOString(),
      };
      fallbackUsersStore.push(newUser);
      return newUser;
    }
  },

  deleteUser: async (id: string): Promise<void> => {
    try {
      await api.delete<void>(`/users/${id}`);
    } catch {
      fallbackUsersStore = fallbackUsersStore.filter((u) => u.id !== id);
    }
  },
};
