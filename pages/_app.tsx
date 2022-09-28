import { AppProps } from "next/app";
import "styles/globals.css";

import { MantineProvider } from "@mantine/core";
import { AppLayout } from "components/Layout";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS withCSSVariables>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </MantineProvider>
  );
}
