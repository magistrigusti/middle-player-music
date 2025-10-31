import { useState } from 'react';
import { client } from "../shared/api/client.ts";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "../shared/ui/pagination/pagination.tsx";

export const Playlists = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const query = useQuery({
    queryKey: ['playlists', {page, search}],
    queryFn: async ({signal}) => {
      const response = await client.GET('/playlists', {
        params: {
          query: {
            pageNumber: page,
            search
          }
        },
        signal
      });
      if (response.error) {
        throw (response as unknown as { error: Error }).error;
      }
      return response.data;
    },
    // placeholderData: keepPreviousData,
  });
  
  console.log('status:' + query.status);
  console.log('fetchStatus:' + query.fetchStatus);

  if (query.isPending) return <span>Loading...</span>
  if (query.isError) return <span>Error{JSON.stringify(query.error.message)}</span>

  return (
    <div>
      <div >
        <input 
          value={search}
          placeholder={'search..'}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </div>

      <hr />

      <Pagination 
        pagesCount={query.data.meta.pagesCount}
        current={page}
        changePageNumber={setPage}
        isFetching={query.isFetching}
      />

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