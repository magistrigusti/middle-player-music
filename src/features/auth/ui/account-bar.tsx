import { LoginButton } from './login-button.tsx';
import { useQuery } from "@tanstack/react-query";
import { client } from "../../../shared/api/client.ts";

export const AccountBar = () => {

  const query = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => {
      return clientResponse.GET('/auth/me');
      return clientResponse.data
    }
  })

  return (
    <div>
      {!query.data && <LoginButton />}
    </div>
  )
}