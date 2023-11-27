import { signIn, signOut, useSession } from "auth";
import { trpc } from "../utils/trpc";
import { useEffect, useState } from "react";


export default function Home() {


  const {data:session} = useSession();

  const [msg, setMsg] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(()=>{

  },[msg])

  const initTopic = trpc.interview.topic.useMutation()
  const chat = trpc.interview.getLatestChat.useQuery(enabled,{
    onSuccess(data) {
      console.log(data?.chat)
    },
  })

  const handleTopic = async()=>{

    initTopic.mutate(
      {name:"COMPUTER NETWORKS"},
      {
        onSuccess(data){
          setMsg(data?.message || "RESULT NOT REURNED PROPERLY");
        }
      }
    )
  }
  

  return (
    <div>
      <div>{session?.user?.name}</div>
      <button onClick={handleTopic}>Click to send a topic</button><br />
      <button onClick={(e)=>setEnabled(true)} >Click to get Latest Chat</button>
      <br/>
      <div>
        {msg}
      </div>

    </div>
  )
  

}