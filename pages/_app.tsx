import "../styles/styles.css";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { DefaultSeo } from "next-seo";

// JSX.Element prevents me from "return 123;"
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <DefaultSeo titleTemplate="%s | An Hoang" defaultTitle="An Hoang" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
