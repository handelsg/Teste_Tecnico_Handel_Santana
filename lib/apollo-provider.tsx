"use client";

import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from "@apollo/client";
import { ReactNode, useMemo } from "react";

const SPACEX_API_URL = "https://spacex-production.up.railway.app/";

export function ApolloClientProvider({ children }: { children: ReactNode }) {
  const client = useMemo(
    () =>
      new ApolloClient({
        link: new HttpLink({ uri: SPACEX_API_URL }),
        cache: new InMemoryCache(),
      }),
    []
  );

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
