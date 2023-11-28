import { signIn, signOut, useSession } from "auth";
import { trpc } from "../utils/trpc";
import { useEffect, useState } from "react";


export default function Home() {

  const chatId = "4b0e69c5-7980-40db-878b-da8875eb35d5"

  const {data:session} = useSession();

  const [msg, setMsg] = useState("");


  useEffect(()=>{

  },[msg])

  const initTopic = trpc.interview.topic.useMutation()
  const getRes = trpc.interview.getResponse.useMutation();
  // const latestChat = trpc.interview.getLatestChat.useQuery({},{
  //   onSuccess(data){
  //     console.log(data)
  //   }
  // })

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
    getRes.mutate({chatId, content:"Sure !!, but I don't know what it is "},{
      onSuccess(data){
        console.log(data);
      }
    })
  }

  // if(latestChat.isLoading) return <div>LOADING !!!!</div>
  // else{
  //   return (
  //     <div>
        
  //         <div>{latestChat.data?.chatId}</div>
  //         <div>{latestChat.data?.chatTitle}</div>

  //         <div>
  //           {
  //             latestChat.data?.conversations.map((con)=>(
  //               <div>
  //                 <div>{con.role+": "+con.content}</div>
  //               </div>
  //             ))
  //           }
  //         </div>
        
  //     </div>
  //   )
  // }

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