import { signIn, signOut, useSession } from "auth";
import {Navbar} from "ui"

export default function Home() {

  const {data:session} = useSession();

  return (
    <div>
      <Navbar profilePic = {session?.user?.image||""}/>
      <div>
      <button
         onClick={() => signIn()}>Sign in</button>
      </div>
    </div>
  )
  

}