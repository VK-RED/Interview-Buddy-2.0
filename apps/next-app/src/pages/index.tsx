import { signIn, signOut, useSession } from "auth";
import {Navbar} from "ui"

export default function Home() {

  const {data:session,status} = useSession();

  return (
    <div>

      <Navbar profilePic = {session?.user?.image||""} 
              status={status||""} 
              signIn={signIn} 
              signOut={signOut}
      />

      
    </div>
  )
  
}