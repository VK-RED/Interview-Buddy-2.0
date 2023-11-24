import { signIn, signOut, useSession } from "auth";
import { trpc } from "../utils/trpc";


export default function Home() {


  const hello = trpc.hello.useQuery({ text: 'client' });

  const secretMessaage = trpc.secret.useQuery(null);

  if(hello.data && secretMessaage.data){
    return(
      <div>
        <div>{hello.data.greeting}</div>
        <div>{secretMessaage.data}</div>
      </div>
      
    )
  }
  else{
    return (
      <div>
        LOADING .....
      </div>
    )
  }

  // const {data: session} = useSession();

  // if(session){
  //   return(
  //     <>
  //       <div>Congrats !! Successfully Signed In !!!</div>
  //       <div>{`Signed in as ${session.user?.email}`}</div>
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   )
  // } 
  // else{
  //   return (
  //     <>
  //       <button onClick={() => signIn()}>Sign In</button>
  //     </>
  //   )
  // }
  

}