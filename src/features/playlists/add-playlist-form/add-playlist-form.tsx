import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getClient } from '../../../shared/api/client'
import type { components } from '../../../shared/api/schema'
import { requestWrapper } from '../../../shared/api/request-wrapper.ts'
import { queryErrorHandlerForRHFFactory } from '../../../shared/api/query-error-handler-for-rhf-factory.ts'

type Props = {
  classNames: string
  playlostId: string | null
  onCancelEditing: () => void
}

type UpdatePlaylistRequestPayload = components['schema']['UpdatePlaylistRequestPayload'];

export const EditPlaylistForm = ({ playlistId, onCancelEditing, classNames }: Props) => {
  const queryClient = useQueryClient();

  const { data: playlistResp, isPending: isPlaylistPending } = useQuery({
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
      const { title = '', description = ''} = playlistResp.data.data.attributes
      reset({ title, description })
    }
  }, [playlistResp, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: (body: UpdatePlaylistRequestPayload) => 
      requestWrapper(
        getClient().PUT('/playlists/{playlistId}', {
          body: { ...body, tagIds: [] },
          params: { path: { playlistId: playlistId! }},
        }),
      ),
     onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['playlists'],
      });
      onCancelEditing?.();
     },
     onError: queryErrorHandleForRHFFactory({ setError }), 
  })

  const onSubmit: SubmitHandler<UpdatePlaylistRequestPayload> = (values) => {
    if (!playlistId) return;
    mutate(values)
  }

  if (!playlistId) return null

  return (
    <form
      className={classNames}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2>Редактировать плейлист</h2>

      <p>
        <label>
          <input 
            { ...register('title')}
            placeholder="Title"
            disabled={
              isPending || isPlaylistPending || isSubmitting
            }
          />
        </label>
      </p>

      {errors.title && <p>{errors.title.message}</p>}

      <p>
        <label>
          <textarea 
            {...register('description')}
            placeholder="Description"
            disabled={isPending || is}
          />
        </label>
      </p>
    </form>
  )
}