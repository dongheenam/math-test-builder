import { AppProps } from "next/app";

import { NextPageWithLayout } from "layouts";
import "styles/globals.css";

export default function App(
  props: AppProps & { Component: NextPageWithLayout }
) {
  const { Component, pageProps } = props;
  // const getLayout = Component.getLayout ?? ((page) => getDefaultLayout(page));

  const MyApp = (
      <Component {...pageProps} />
  );
  return MyApp;
  // return getLayout(MyApp);
}
