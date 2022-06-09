
import "styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { Provider } from "react-redux";
import store from 'store/index';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider supabaseClient={supabaseClient}>
      <Provider store={store}>
          <Component {...pageProps} />
      </Provider>
    </UserProvider>
  );
}

export default MyApp;
