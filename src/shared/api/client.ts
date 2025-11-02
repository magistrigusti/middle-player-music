import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./schema";

const myMiddleware: Middleware = {
  async onRequest({ request, options }) {
    const accessToken = localStorage.getItem('musicfun-access-token');
    if (accessToken) {
      request.headers.set("Authorization", "Bearer" + accessToken);
    }

    return request;
  }
}

export const client = createClient<paths>({ 
  baseUrl: "https://musicfun.it-incubator.app/api/1.0", headers: {
    'api-key': '0207698f-369c-4590-bc3b-20fef7095329'
  }
});

client.use(myMiddleware);