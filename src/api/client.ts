import createFetchClient, { type Middleware } from 'openapi-fetch'
import createClient from 'openapi-react-query'
import type { paths } from './schema'
import { getAccessToken, setAccessToken } from './token'

const baseUrl = import.meta.env.VITE_API_URL

const refreshClient = createFetchClient<paths>({
  baseUrl,
  credentials: 'include',
})

let refreshPromise: Promise<string | null> | null = null

export function refreshAccessToken() {
  refreshPromise ??= refreshClient
    .POST('/api/auth/refresh/')
    .then(({ data }) => {
      const token = data?.access ?? null
      setAccessToken(token)
      return token
    })
    .finally(() => {
      refreshPromise = null
    })
  return refreshPromise
}

async function fetchWithRefresh(request: Request) {
  const retryRequest = request.clone()
  const response = await fetch(request)

  const isAuthRoute = new URL(request.url).pathname.startsWith('/api/auth/')
  if (response.status !== 401 || isAuthRoute) {
    return response
  }

  const token = await refreshAccessToken()
  if (!token) {
    return response
  }

  retryRequest.headers.set('Authorization', `Bearer ${token}`)
  return fetch(retryRequest)
}

const authMiddleware: Middleware = {
  onRequest({ request }) {
    const token = getAccessToken()
    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`)
    }
    return request
  },
}

const fetchClient = createFetchClient<paths>({
  baseUrl,
  credentials: 'include',
  fetch: fetchWithRefresh,
})

fetchClient.use(authMiddleware)

export const $api = createClient(fetchClient)