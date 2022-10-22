import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import type { AppProps } from "next/app";
import type { Session } from "next-auth";

import { getDefaultLayout, NextPageWithLayout } from "layouts";
import "styles/globals.scss";

export default function App(
  props: AppProps<{ session: Session }> & { Component: NextPageWithLayout }
) {
  const {
    Component,
    pageProps: { session, ...componentProps },
  } = props;

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            cacheTime: 60 * 1000 * 60, // 60 minutes
          },
        },
      })
  );

  const getLayout = Component.getLayout ?? ((page) => getDefaultLayout(page));
  const MyApp = <Component {...componentProps} />;
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <SessionProvider session={session}>
        {getLayout(MyApp)}
        <ReactQueryDevtools initialIsOpen={false} />
      </SessionProvider>
    </QueryClientProvider>
  );
}
