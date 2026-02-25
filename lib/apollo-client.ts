import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const SPACEX_API_URL = "https://spacex-production.up.railway.app/";

// Apollo Client para uso no servidor (SSR)
export function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: SPACEX_API_URL,
      fetchOptions: { cache: "no-store" },
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: "no-cache",
      },
    },
  });
}
