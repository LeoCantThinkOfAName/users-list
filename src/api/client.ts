import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const authorizedFetch = (
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) => {
  const headers: RequestInit = {
    headers: {
      Authorization: import.meta.env.VITE_GITHUB_TOKEN,
    },
  };
  return fetch(input, {
    ...init,
    ...headers,
  });
};
