import { signIn, signOut, useSession } from "auth";

export default function Home() {

  const {data: session} = useSession();
  if(session){
    return(
      <>
        <div>Congrats !! Successfully Signed In !!!</div>
        <div>{`Signed in as ${session.user?.email}`}</div>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  } 
  else{
    return (
      <>
        <button onClick={() => signIn()}>Sign out</button>
      </>
    )
  }
  

}