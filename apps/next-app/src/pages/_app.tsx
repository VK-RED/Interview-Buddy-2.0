import '../styles/globals.css'
import type { AppProps, AppType } from 'next/app';
import { SessionProvider } from 'auth';
import { trpc } from 'api';

const MyApp: AppType = ({ Component, pageProps : {session, ...pageProps} } : AppProps) => {
  return (
    <SessionProvider session={session}>
       <Component {...pageProps} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);