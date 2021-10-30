import "../styles/styles.scss";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import { UserContextProvider } from "../state/user-context";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <DefaultSeo titleTemplate="%s | An Hoang" defaultTitle="An Hoang" />
      <ThemeProvider
        attribute="class"
        storageKey="nightwind-mode"
        defaultTheme="system"
      >
        <UserContextProvider>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </UserContextProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
