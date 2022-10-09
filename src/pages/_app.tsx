import { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";

import { getDefaultLayout, NextPageWithLayout } from "layouts";
import "styles/globals.css";

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
