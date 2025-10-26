import { useEffect, useState } from "react";
import { client } from "./shared/api/client.ts";
import { useQuery } from "@tanstack/react-query";

function App() {
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

const Playlists = () => {
  const query =  useQuery({
    queryKey: ['playlists'],
    queryFn: () => client.GET('/playlists')
  });

  return (
    <>
      {query.data?.data?.data.map(playlist => (
        <li>
          {playlist.attributes.title}
        </li>
      ))}
    </>
  )
}

export default App
