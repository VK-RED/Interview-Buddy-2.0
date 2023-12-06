import { Navbar, useToast, ResponseCard, TextareaWithLabel, Button  } from "ui"
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

                <div className="h-screen mt-5 px-10 py-3">

                    <div className="px-10 py-8 m-auto rounded-xl sticky top-[820px] flex items-center justify-center border border-zinc-300 dark:border-zinc-600 dark:bg-slate-950 z-10 space-x-5 sm:w-[600px] md:w-[700px] lg:w-[900px] shadow-xl bg-slate-50">

                            <TextareaWithLabel />

                            <Button>
                                Submit
                            </Button>
                    </div>

                    <div className="relative top-[-120px]">

                        <h1 className="font-semibold  text-center text-3xl relative my-5">{chatTitle}</h1>


                        <div className="p-5 my-10">
                            {
                                convos?.map((convo,ind)=>(

                                    <ResponseCard 
                                        key={ind}
                                        content={convo.content}
                                        role={convo.role}
                                        userName={session?.user?.name||"You"}
                                    />
                                ))
                            }

                            
                        </div>

                        


                    </div>

                    

                    

                    
                    
                    
                    
                    
                   

                   


                    
                </div>

                
                
            </div>
        )
    }
}