import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import superjson from 'superjson';

const API_BASE_URL =
  'https://3000-iryfjaiql3quhi8kjcfix-48e4d6be.us4.manus.computer';

export const mobileTrpc = createTRPCProxyClient<any>({
  links: [
    httpBatchLink({
      url: `${API_BASE_URL}/api/trpc`,
      transformer: superjson,
      fetch(url, options) {
        return fetch(url, { ...options, credentials: 'include' });
      },
    }),
  ],
}) as any;
