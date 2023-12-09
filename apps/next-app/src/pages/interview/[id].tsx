import { useSession } from "auth";
import { useParams } from "next/navigation"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, InterviewScrollArea, Navbar, TextareaWithLabel, useToast } from "ui";
import { trpc } from "../../utils/trpc";
import { chatAtom, chatAtomSelector, useRecoilValue, useSetRecoilState } from "store";


/*
    CHECK THE USER AUTHENTICATION
    EXTRACT THE CHATID

    GET THE RESPONSE USING THE CHATID

    IF THE CHATID IS INVALID -> SHOW A TOAST AND REDIRECT THE USER BACK TO HOME PAGE
    ELSE -> SHOW THE THINGS IN THE INTERVIEW PAGE ITSELF


*/

export default function InterviewById(){

    const params = useParams();
    const id:string = params?.id as string;

    const{data:session,status} = useSession();
    const router = useRouter()
    const { toast } = useToast();

    const [userPrompt, setUserPrompt] = useState("");

    const {chatId,chatTitle,convos,isLoading} = useRecoilValue(chatAtomSelector);
    const setChatItems = useSetRecoilState(chatAtom);

    //fetch the chat initially using the id from params

    const {refetch} = trpc.chat.getChat.useQuery({chatId:id},{
        enabled:false,

        onSuccess(data){
            setChatItems((prev)=>({
                chatId: data?.chat?.id||"",
                chatTitle: data?.chat?.title||"",
                convos:data?.chat?.conversations||[],
                isLoading:false,
            }));

            console.log(convos);
        },

        onError(err) {
            toast({description:err.message});
            router.push("/");
        },
    });

    //mutation to get and post each user response
    const {mutate} = trpc.interview.getResponse.useMutation();

    function getResponse():void{

        const content = userPrompt;
        setUserPrompt( pr => "");

        setChatItems((oldChatItems)=>({
            ...oldChatItems,
            convos: [...oldChatItems.convos, {content, role:"user"}]
        }))

        mutate({chatId,content},{
            onSuccess(data){

                setChatItems((prevState)=>({
                    ...prevState,
                    convos:[...prevState.convos, {role:data?.role||"assistant",content:data?.content||""}]
                }))

            }
        })
    }

    useEffect(()=>{

        if(status === "authenticated"){
            refetch();
        }

    },[status]);

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

            <div className="min-w-[500px]">

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

                            <Button onClick={()=>getResponse()} >
                                Submit
                            </Button>

                        </div>

                    </div>
                    
                </div>               
            </div>
        )
    }


}