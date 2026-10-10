import createFetchClient, { type Middleware } from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "./schema";
import { getAccessToken } from "./token";

const authMiddleware: Middleware = {
  onRequest({ request }) {
    const token = getAccessToken();
    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    }
    return request;
  },
};

const fetchClient = createFetchClient<paths>({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
});

fetchClient.use(authMiddleware);

export const $api = createClient(fetchClient);
