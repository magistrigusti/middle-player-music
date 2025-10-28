import { useEffect, useState } from "react";
import { Playlists } from "../features/playlists.tsx";

export function PlaylistsPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setIsVisible(prev => !prev)
    }, 10000)
  }, []);

  return (
    <>
      <h2>Allodium Sounds</h2>
      
      { isVisible && <Playlists /> }
    </>
  )
}


