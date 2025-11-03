import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./schema";

const myMiddleware: Middleware = {
  onRequest({ request }) {
    const accessToken = localStorage.getItem('musicfun-access-token');
    if (accessToken) {
      request.headers.set("Authorization", "Bearer" + accessToken);
    }

    return request;
  },
  onResponse({ response }) {
    if (!response.ok) {
      throw new Error(`
        ${response.url}: ${response.status} ${response.statusText}  
      `)
    }
  }
}

export const client = createClient<paths>({ 
  baseUrl: "https://musicfun.it-incubator.app/api/1.0", headers: {
    'api-key': '0207698f-369c-4590-bc3b-20fef7095329'
  }
});

client.use(myMiddleware);