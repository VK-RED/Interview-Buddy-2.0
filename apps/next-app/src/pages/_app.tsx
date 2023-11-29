import '../styles/globals.css'
import type { AppProps, AppType } from 'next/app';
import { SessionProvider } from 'auth';
import { trpc } from "../utils/trpc";
import { ThemeProvider } from 'ui';

const MyApp: AppType = ({ Component, pageProps : {session, ...pageProps} } : AppProps) => {
  return (

    <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
    >
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>

    
  );
};

export default trpc.withTRPC(MyApp);