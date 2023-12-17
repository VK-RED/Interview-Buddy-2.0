import { Navbar, useToast, ResponseCard, TextareaWithLabel, Button, InterviewScrollArea  } from "ui"
import { useSession } from "auth";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { useEffect, useState } from "react";
import { useRecoilValue,useSetRecoilState,chatAtomSelector, chatAtom } from "store";

export default function Interview(){

    const {data:session, status} = useSession();
    const router = useRouter();
    const { toast } = useToast();
    const [userPrompt, setUserPrompt] = useState("");

    const {chatId,chatTitle,convos,isLoading} = useRecoilValue(chatAtomSelector);
    const setChatItems = useSetRecoilState(chatAtom);

    const [disabled, setDisabled] = useState(false);

    //fetch the initial convos
    const {data, refetch} = trpc.interview.getLatestChat.useQuery({},
        {
            enabled:false,
            onSuccess(data){
                
                setChatItems((prevChat)=>(
                    {
                        chatId:data?.chatId || "",
                        chatTitle:data?.chatTitle || "",
                        convos:data?.conversations || [],
                        isLoading: false,
                    }
                ))
            },
            onError(err) {
                console.log(err);
                router.push("/");
            },
        }
    );
    
    //mutation to get and post each user response
    const {mutate} = trpc.interview.getResponse.useMutation();

    useEffect(()=>{

        if(status === "unauthenticated") router.push("/");

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

        setDisabled((prev)=>true);
        const content = userPrompt;
        setUserPrompt( pr => "");

        setChatItems((oldChatItems)=>({
            chatId:oldChatItems.chatId,
            chatTitle:oldChatItems.chatTitle,
            convos: [...oldChatItems.convos, {content, role:"user"}]
        }))

        mutate({chatId,content},{
            onSuccess(data){

                setChatItems((prevState)=>({
                    chatId:prevState.chatId,
                    chatTitle:prevState.chatTitle,
                    convos:[...prevState.convos, {role:data?.role||"assistant",content:data?.content||""}]
                }))

                setDisabled((prev)=>false);

            }
        })
    }
    

    if(status === "loading" || isLoading){
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

            <div className="min-w-[500px]  dark:bg-black">

                <Navbar />

                <div className="h-screen mt-5 px-10 py-3">

                    <div className="relative ">

                        <h1 className="font-semibold  text-center text-3xl relative my-5">{chatTitle}</h1>

                        <InterviewScrollArea                        
                            convos={convos}
                            userName={session?.user?.name||""}
                        />

                        <div className="px-10 py-8 m-auto rounded-xl  flex items-center justify-center border border-zinc-300 dark:border-zinc-600 dark:bg-slate-950 z-10 space-x-5 sm:w-[600px] md:w-[700px] lg:w-[900px] shadow-xl bg-slate-50">

                            <TextareaWithLabel userPrompt = {userPrompt} setUserPrompt = {setUserPrompt} />

                            <Button onClick={()=>getResponse()} disabled={disabled}>
                                Submit
                            </Button>

                        </div>

                    </div>
                    
                </div>               
            </div>
        )
    }
}