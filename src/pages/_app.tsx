import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { getDefaultLayout, NextPageWithLayout } from "layouts";
import "styles/globals.scss";

const queryClient = new QueryClient();

export default function App(
  props: AppProps & { Component: NextPageWithLayout }
) {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => getDefaultLayout(page));

  const MyApp = (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
  return getLayout(MyApp);
}
