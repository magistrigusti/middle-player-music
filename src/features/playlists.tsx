import { client } from "../shared/api/client.ts";
import { useQuery } from "@tanstack/react-query";

export const Playlists = () => {
  const query = useQuery({
    queryKey: ['playlists'],
    queryFn: async () => {
      const response = await client.GET('/playlists' as unknown as '/playlists');
      if (response.error) {
        throw (response as unknown as { error: Error }).error;
      }
      return response.data!;
    }
  });
  
  console.log('status:' + query.status);
  console.log('fetchStatus:' + query.fetchStatus);

  if (query.isPending) return <span>Loading...</span>
  if (query.isError) return <span>Error{JSON.stringify(query.error.message)}</span>

  return (
    <div>
      {query.isFetching ? 'time' : ''}

      <ul>
        {query.data.data.map(playlist => (
          <li key={playlist.id}>
            {playlist.attributes.title}
          </li>
        ))}
      </ul>
    </div>
  )
}