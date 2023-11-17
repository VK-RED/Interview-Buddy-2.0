import '../styles/globals.css'
import type { AppType } from 'next/app';
import { trpc } from 'api';

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};
export default trpc.withTRPC(MyApp);