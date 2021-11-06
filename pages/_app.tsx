import "../styles/styles.scss";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { UserContextProvider } from "../state/user-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <DefaultSeo titleTemplate="%s | An Hoang" defaultTitle="An Hoang" />
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
          <div id="dialog-root" />
          <Toaster />
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
