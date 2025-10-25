import createClient from "openapi-fetch";
import type { paths } from "./schema";

export const client = createClient<paths>({ 
  baseUrl: "https://musicfun.it-incubator.app/api/1.0", headers: {
    'api-key': '0207698f-369c-4590-bc3b-20fef7095329'
  }
});