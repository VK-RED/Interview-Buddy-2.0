import { signIn, signOut, useSession } from "auth";
import { trpc } from "../utils/trpc";
import { useEffect, useState } from "react";


export default function Home() {


  const {data:session} = useSession();

  const [msg, setMsg] = useState("");

  useEffect(()=>{

  },[msg])

  const getChat = trpc.getChat.useQuery(null);
  const initChat = trpc.interview.useMutation()

  const handleClick = async () => {

    initChat.mutate(null, {
      onSuccess(data){
        const res = data?.message || "RESULT NOT REURNED PROPERLY";
        setMsg(res);
      }
    })
  }

  

  return (
    <div>
      <div>{session?.user?.name}</div>
      <div>{msg}</div><br/>
      <button onClick={handleClick}>Click to initiate the chat</button>
      <div>
        {
          getChat.data?.map((c)=>
            <div>
              {c.message+" "+c.role}
            </div>
          )
        }
      </div>

    </div>
  )
  

}