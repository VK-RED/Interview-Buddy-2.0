import { Navbar, useToast  } from "ui"
import { signIn, signOut, useSession } from "auth";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { useEffect, useState } from "react";

export default function Interview(){

    const {data:session, status} = useSession();
    const router = useRouter();
    const { toast } = useToast();
    const [chatTitle, setChatTitle] = useState("");
    const {data, refetch} = trpc.interview.getLatestChat.useQuery({},
        {
            enabled:false,
            onSuccess(data){
                setChatTitle((t) => data?.chatTitle||"");
                setConvos((conv) => data?.conversations||[]);
            }
        }
    );

    const [convos, setConvos] = useState(data?.conversations);



    useEffect(()=>{
        if(status==="authenticated"){
            
            toast({
                description:"You can start answering for the Questions !!!",
            })

            refetch();
        }
    },[status])

    useEffect(()=>{

    },[convos])

    if(status === "loading"){
        return(
            <div>
                Loading ....
            </div>
        )
    }
    else if(status === "unauthenticated"){
        router.push("/");
    }
    else{
        return(

            <div className="min-w-[500px]">

                <Navbar signIn={signIn}
                        signOut={signOut}
                        profilePic={session?.user?.image || ""}
                        status={status}
                />

                <div className="my-20">
                   <h1 className="font-semibold  text-center text-3xl my-3">{chatTitle}</h1>
                    <div>
                        {
                            convos?.map((convo,ind)=>(

                                <div key = {ind}>
                                    {
                                        convo.role+"  :"+"  "+convo.content
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
                
            </div>
        )
    }
}