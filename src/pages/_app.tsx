import { useState } from "react";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { getDefaultLayout, NextPageWithLayout } from "layouts";
import "styles/globals.scss";

export default function App(
  props: AppProps & { Component: NextPageWithLayout }
) {
  const { Component, pageProps } = props;
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            cacheTime: 60 * 1000 * 10, // 10 minutes
          },
        },
      })
  );
  const getLayout = Component.getLayout ?? ((page) => getDefaultLayout(page));

  const MyApp = <Component {...pageProps} />;
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      {getLayout(MyApp)}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
