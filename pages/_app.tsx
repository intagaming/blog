import "../styles/styles.scss";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";

// JSX.Element prevents me from "return 123;"
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <DefaultSeo titleTemplate="%s | An Hoang" defaultTitle="An Hoang" />
      <ThemeProvider
        attribute="class"
        storageKey="nightwind-mode"
        defaultTheme="system"
      >
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
