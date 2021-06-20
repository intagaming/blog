import "../styles/styles.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { DefaultSeo } from "next-seo";

// FontAwesome global library
library.add(fab, faHeart);

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
