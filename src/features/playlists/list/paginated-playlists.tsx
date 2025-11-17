import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getClient } from '../../../shared/api/client.ts'
import { useEffect, useState } from 'react'
import { Pagination } from '@/shared/ui/pagination/pagination.tsx'
import { useMeQuery } from '../../auth/api/use-me.query.ts'
import { PlaylistCover } from '../playlist-cover/playlist-cover.tsx'
import { playlistListKey, usePlaylistsQuery } from '../api/use-playlists-query.tsx'
import type { SchemaGetPlaylistOutput, SchemaGetPlaylistsOutput } from '../../../shared/api/schema.ts'
import { getSharedSocket } from '../../../shared/api/socket.ts'
import styles from './paginated-playlists.module.css'

type Props = {
  classNames?: string;
  userId?: string;
  onPlaylistSelected?: (playlistId: string) => void;
}

export type PlaylistCreatedEventPayload = SchemaGetPlaylistOutput;
export const PlaylistCreatedEventName = 'tracks.playlist-created';
export type PlaylistCreatedEvent = {
  type: typeof PlaylistCreatedEventName;
  payload: PlaylistCreatedEventPayload;
};

export const PaginatedPlaylists = ({ userId, onPlaylistSelected, classNames }: Props) => {
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const { data: meData } = useMeQuery();
  const query = usePlaylistsQuery(search, pageNumber, userId);

  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = getSharedSocket(import.meta.env.VITE_AUTH_TOKEN);

    socket.on(PlaylistCreatedEventName, (data: PlaylistCreatedEvent) => {
      queryClient.setQueryData(
        playlistListKey({ search, pageNumber: 1, userId: undefined }),
        (oldData: SchemaGetPlaylistOutput) => {
          return {
            data: [data.payload.data, ...oldData.data],
            meta: oldData.meta
          } as SchemaGetPlaylistsOutput
        },
      )
    })
  }, []);

  const { mutate: deletePlaylist } = useMutation({
    mutationFn: (playlistId: string) => 
      getClient().DELETE('/playlists/{playlistId}', {
        params: {
          path: { playlistId },
        },
      }),
      onSucceses
  })
}