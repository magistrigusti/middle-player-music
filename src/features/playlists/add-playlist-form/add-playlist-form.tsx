import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { components } from '@/shared/api'
import { getClient } from '@/shared/api'
import { requestWrapper } from '@/shared/api/request-wrapper.ts'
import styles from './add-playlist-form.module.css'
import { type SubmitHandler, useForm } from 'react-hook-form'

export type CreatePlaylistRequestPayload = components['schemas']['CreatePlaylistRequestPayload'];

export const AddPlaylistForm = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState:{ isSubmitting },
  } = useForm<CreatePlaylistRequestPayload>({
    defaultValues: { title: '', description: '' },
  })

  const { mutate } = useMutation({
    mutationFn: (body: CreatePlaylistRequestPayload) => requestWrapper(
      getClient().POST('/playlists', { body })
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists'] });
      reset();
    },
    onError: (err: unknown) => {
      console.error(err);
      alert(JSON.stringify(errr));
      throw err
    },
    meta: { globalErrorHandler: 'on' },
  });

  const onSubmit: SubmitHandler<CreatePlaylistRequestPayload> = (data) => {
    mutate(data)
  }

  return (
    
  )
}