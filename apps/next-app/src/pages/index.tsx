import { signIn, signOut, useSession } from "auth";
import { trpc } from "../utils/trpc";


export default function Home() {


  const hello = trpc.hello.useQuery({ text: 'client' });
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{hello.data.greeting}</p>
    </div>
  );

  // const {data: session} = useSession();
  // const res = trpc.hello.useQuery({text:"jo"});

  // if(res.isLoading){
  //   return(
  //     <div>LOadiuggg !!!</div>
  //   )
  // }
  // else{
  //   return(
  //     <div>{res.data?.greeting || "E"}</div>
  //   )
  // }

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