import { Navbar, useToast, ResponseCard, TextareaWithLabel, Button, InterviewScrollArea  } from "ui"
import { signIn, signOut, useSession } from "auth";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { useEffect, useState } from "react";

export default function Interview(){

    const {data:session, status} = useSession();
    const router = useRouter();
    const { toast } = useToast();
    const [chatTitle, setChatTitle] = useState("");
    const [chatId, setChatId] = useState("");
    const [userPrompt, setUserPrompt] = useState("");

    //fetch the initial convos
    const {data, refetch} = trpc.interview.getLatestChat.useQuery({},
        {
            enabled:false,
            onSuccess(data){
                setChatId((chatId) => data?.chatId||"");
                setChatTitle((t) => data?.chatTitle||"");
                setConvos((conv) => data?.conversations||[]);
            }
        }
    );
    
    //mutation to get and post each user response
    const {mutate} = trpc.interview.getResponse.useMutation();
    
    const [convos, setConvos] = useState(data?.conversations||[]);

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

    function getResponse():void{

        const content = userPrompt;
        setUserPrompt( pr => "");

        setConvos((con)=>{
            const existCon = con || [];
            return [...existCon, {role:"user",content}];
        })

        mutate({chatId,content},{
            onSuccess(data){
            
                setConvos((con)=>{
                    const existCon = con || [];
                    return [...existCon, {role:data?.role||"assistant",content:data?.content||""}];
                })

            }
        })
    }
    

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

                    <div className="relative ">

                        <h1 className="font-semibold  text-center text-3xl relative my-5">{chatTitle}</h1>

                        <InterviewScrollArea                        
                            convos={convos}
                            userName={session?.user?.name||""}
                        />

                        <div className="px-10 py-8 m-auto rounded-xl  flex items-center justify-center border border-zinc-300 dark:border-zinc-600 dark:bg-slate-950 z-10 space-x-5 sm:w-[600px] md:w-[700px] lg:w-[900px] shadow-xl bg-slate-50">

                            <TextareaWithLabel userPrompt = {userPrompt} setUserPrompt = {setUserPrompt} />

                            <Button onClick={()=>getResponse()}>
                                Submit
                            </Button>

                        </div>

                    </div>
                    
                </div>               
            </div>
        )
    }
}