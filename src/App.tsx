
import './App.css'
import { client } from "./shared/api/client.ts";
import { useQuery } from "@tanstack/react-query";

function App() {

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
      fuck you
    </>
  )
}

export default App
