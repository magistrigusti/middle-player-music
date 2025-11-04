import { useMutation, useQueryClient } from '@tanstack/react-query'
import { localStorageKeys } from '../../../shared/db/localstorage-keys.ts'
import { getClient } from '../../../shared/api/client.ts'

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return getClient().POST('/auth/logout', {
        body: {
          refreshToken: localStorage.getItem(localStorageKeys.refreshToken)!,
        },
      })
    },
    onSuccess: async () => {
      localStorage.removeItem(localStorageKeys.accessToken);
      localStorage.removeItem(localStorageKeys.refreshToken);
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] })
    },
  });

  return mutation
}