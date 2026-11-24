import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '../api/users.api';
import type { CreateUserInput } from '../types/users.types';
import { showSuccessAlert, showErrorAlert } from '@/utils/sweetalert';

export const USERS_QUERY_KEY = ['users'];

/**
 * Hook del dominio Users que expone las queries y mutaciones con caché de TanStack Query.
 */
export const useUsers = () => {
  const queryClient = useQueryClient();

  // Query para obtener lista de usuarios
  const usersQuery = useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: usersApi.getUsers,
  });

  // Mutación para crear usuario
  const createUserMutation = useMutation({
    mutationFn: (newUserData: CreateUserInput) => usersApi.createUser(newUserData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
      showSuccessAlert('¡Usuario creado!', 'El usuario se ha registrado exitosamente en el sistema.');
    },
    onError: (error: Error) => {
      showErrorAlert('Error al crear usuario', error.message || 'Ocurrió un error inesperado');
    },
  });

  // Mutación para eliminar usuario
  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => usersApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
      showSuccessAlert('Eliminado', 'El usuario ha sido eliminado correctamente.');
    },
    onError: (error: Error) => {
      showErrorAlert('Error al eliminar', error.message || 'No se pudo eliminar el usuario');
    },
  });

  return {
    users: usersQuery.data ?? [],
    isLoading: usersQuery.isLoading,
    isError: usersQuery.isError,
    error: usersQuery.error,
    refetch: usersQuery.refetch,
    createUser: createUserMutation.mutateAsync,
    isCreating: createUserMutation.isPending,
    deleteUser: deleteUserMutation.mutate,
    isDeleting: deleteUserMutation.isPending,
  };
};

export default useUsers;
