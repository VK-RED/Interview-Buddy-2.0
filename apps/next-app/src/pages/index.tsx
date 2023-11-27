import { signIn, signOut, useSession } from "auth";
import { trpc } from "../utils/trpc";
import { useEffect, useState } from "react";


export default function Home() {

  const chatId = "e6588c76-ad26-4f7f-853e-adfae60b67a8"

  const {data:session} = useSession();

  const [msg, setMsg] = useState("");


  useEffect(()=>{

  },[msg])

  const initTopic = trpc.interview.topic.useMutation()
  const getRes = trpc.interview.getResponse.useMutation();

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

  const handleRes = async () => {
    getRes.mutate({chatId, content:"Heisenberg the GOAT OF B.B"},{
      onSuccess(data){
        console.log(data);
      }
    })
  }
  

  return (
    <div>
      <div>{session?.user?.name}</div>
      <button onClick={handleTopic}>Click to send a topic</button><br />
      <button onClick={handleRes}>Click to get GPT RESPONSE</button>
      <br/>
      <div>
        {msg}
      </div>

    </div>
  )
  

}