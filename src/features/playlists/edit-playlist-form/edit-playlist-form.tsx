import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getClient } from '../../../shared/api/client'
import type { components } from '../../../shared/api/schema'
import { requestWrapper } from '../../../shared/api/request-wrapper.ts'
import { queryErrorHandlerForRHFFactory } from '../../../shared/api/query-error-handler-for-rhf-factory.ts'

type Props = {
  classNames: string;
  playlistId: string | null;
  onCancelEditing: () => void;
}

type UpdatePlaylistRequestPayload = components['schemas']['UpdatePlaylistRequestPayload'];

export const EditPlaylistForm = ({
  playlistId, onCancelEditing, classNames
}: Props) => {
  const queryClient = useQueryClient();

  const { data: playlistResp, isPending: isPlaylistPending} = useQuery({
    queryKey: ['playlists', 'details', playlistId],
    queryFn: ({ signal }) =>
      getClient().GET('/playlists/{playlistId}', {
        params: { path: { playlistId: playlistId! }},
        signal,
      }),
    enabled: Boolean(playlistId),
  })

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<UpdatePlaylistRequestPayload>({
    defaultValues: { title: '', description: ''},
  })

  useEffect(() => {
    if (playlistResp?.data) {
      const { title = '', description = '' } = playlistResp.data.data.attributes;
      reset({ title, description})
    }
  }, [playlistResp, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: (body: UpdatePlaylistRequestPayload) =>
      requestWrapper(
        getClient().PUT('/playlists/{playlistsId}', {
          body: { ...body, tagIds: [] },
          params: { path: { playlistId: playlistId! }},
        }),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['playlists'],
      })
      onCancelEditing?.()
    },
    onError: queryErrorHandlerForRHFFactory({ setError }),
  })

  const onSubmit: SubmitHandler<UpdatePlaylistRequestPayload> = (values) => {
    if (!playlistId) return;
    mutate(values)
  }

  if (!playlistId) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classNames}>

    </form>
  )
}