import { createFileRoute } from '@tanstack/react-router'
import PlaylistsPage from "../pages/playlists-page.tsx.tsx";

export const Route = createFileRoute('/my-playlists')({
  component: PlaylistsPage,
})


