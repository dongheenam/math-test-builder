import { AppProps } from "next/app";

import { getDefaultLayout, NextPageWithLayout } from "layouts";
import "styles/globals.scss";

export default function App(
  props: AppProps & { Component: NextPageWithLayout }
) {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => getDefaultLayout(page));

  const MyApp = (
      <Component {...pageProps} />
  );
  return getLayout(MyApp);
}
