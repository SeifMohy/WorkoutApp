
import "../styles/globals.css";
import type { AppProps } from "next/app";
import AuthWrapper from "../components/AuthWrapper";
import { SessionProvider } from "next-auth/react";
import { WorkoutProvider } from "components/WorkoutProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WorkoutProvider>
      <SessionProvider session={pageProps.session}>
        {/* <AuthWrapper> */}
          <Component {...pageProps} />
        {/* </AuthWrapper> */}
      </SessionProvider>
    </WorkoutProvider>

  );
}

export default MyApp;
