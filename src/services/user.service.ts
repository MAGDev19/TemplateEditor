import { api } from '../utils/api';

export interface UserDTO {
  id: number;
  name: string;
  email: string;
  phone?: string;
  website?: string;
}

export const userService = {
  getUsers: async (): Promise<UserDTO[]> => {
    return api.get<UserDTO[]>('/users');
  },

  getUserById: async (id: number): Promise<UserDTO> => {
    return api.get<UserDTO>(`/users/${id}`);
  },

  createUser: async (user: Omit<UserDTO, 'id'>): Promise<UserDTO> => {
    return api.post<UserDTO>('/users', user);
  },

  updateUser: async (id: number, user: Partial<UserDTO>): Promise<UserDTO> => {
    return api.put<UserDTO>(`/users/${id}`, user);
  },

  deleteUser: async (id: number): Promise<void> => {
    return api.delete<void>(`/users/${id}`);
  },
};

export default userService;
