import "../styles/globals.css";
import type { AppProps } from "next/app";
import AuthWrapper from "../components/AuthWrapper";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      {/* <AuthWrapper> */}
        <Component {...pageProps} />
      {/* </AuthWrapper> */}
    </SessionProvider>
  );
}

export default MyApp;
