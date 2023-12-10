import '../styles/globals.css'
import type { AppProps, AppType } from 'next/app';
import { SessionProvider, useSession } from 'auth';
import { trpc } from "../utils/trpc";
import { ThemeProvider } from 'ui';
import { Toaster } from 'ui';
import { RecoilRoot, chatsHistoryAtom, useSetRecoilState } from 'store';
import { useEffect } from 'react';

const MyApp: AppType = ({ Component, pageProps : {session, ...pageProps} } : AppProps) => {
  return (

    <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
    >
      <SessionProvider session={session}>
        <RecoilRoot>
          <Toaster />
          <DataGetter />
          <Component {...pageProps} />
        </RecoilRoot>
      </SessionProvider>
    </ThemeProvider>

    
  );
};

export default trpc.withTRPC(MyApp);


function DataGetter(){

  const {status} = useSession();

  const setAllChats = useSetRecoilState(chatsHistoryAtom);

  const {refetch} = trpc.chat.getChatTitles.useQuery({},{
    enabled:false,
    onSuccess(data){
      const chatsArr = data?.chatTitles||[];
      setAllChats((prev) => ({
        allChats: chatsArr,
        isLoading:false,
      }))

    }
  })

  useEffect(()=>{

    if(status === "authenticated"){
      refetch();
    }

  },[status])

  return <></>
}