import { AppProps } from "next/app";

import { MantineProvider } from "@mantine/core";

import "styles/globals.css";
import { getDefaultLayout, NextPageWithLayout } from "components/layouts";

export default function App(
  props: AppProps & { Component: NextPageWithLayout }
) {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => getDefaultLayout(page));

  const MyApp = (
    <MantineProvider withGlobalStyles withNormalizeCSS withCSSVariables>
      <Component {...pageProps} />
    </MantineProvider>
  );

  return getLayout(MyApp);
}
