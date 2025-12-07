import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '../../../../shared/api/client.ts'
import { playlistsKeys } from '../../../../shared/api/keys-factories/playlists-keys-factory.ts'
import type {
  SchemaGetPlaylistsOutput,
  SchemaUpdatePlaylistRequestPayload,
} from '../../../../shared/api/schema.ts'
import type { JsonApiErrorDocument } from '../../../../shared/util/json-api-error.ts'

type MutationVariables = SchemaUpdatePlaylistRequestPayload & { playlistId: string };

export const useUpdatePlaylistMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: JsonApiErrorDocument) => void
}) => {
  const queryClient = useQueryClient();
  const key = playlistKey.myList();

  return useMutation({
    mutationFn: async (variables: MutationVariables) => {
      const { playlistId, ...rest } = variables;
      const response = await client.PUT('/playlists/{playlistId}', {
        params: { path: { playlistId: playlistId }},
        body: { ...rest, tagIds: [] },
      });
      return response.data
    },
    onMutate: async (variables: MutationVariables) => {
      await queryClient.cancelQueries({ queryKey: playlistsKey.all });

      const previousMyPlaylists = queryClient.getQueryData(key);

      queryClient.setQueryData(key, (oldData: SchemaGetPlaylistsOutput) => {
        return {
          ...oldData,
          data: oldData.data.map((p) => {
            if (p.id === variables.playlistId) return {
              ...p,
            }
          })
        }
      })
    }
  })
}