import { createFileRoute } from '@tanstack/react-router'
import { MyPlaylistsPage } from "../../pages/playlists/ui/my-playlists/my-playlists-page.tsx";

export const Route = createFileRoute('/my-playlists')({
  component: MyPlaylistsPage,
})


