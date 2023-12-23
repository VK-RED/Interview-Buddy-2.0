import { useSession } from "auth"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loader, Navbar, ProfileCard } from "ui";
import { trpc } from "../utils/trpc";
import { useToast } from "ui";
import {AVATAR} from "../assets/constants"
export default function Profile(){

    const [totalConvos,setTotalConvos] = useState(0);
    const [totalChats, setTotalChats] = useState(0);

    const {data:session, status} = useSession();
    const router = useRouter();
    const {toast} = useToast();

    //Get the Total Convos
    const convoData = trpc.meta.countTotalConvos.useQuery({},{
        enabled:false,
        onSuccess(data) {
            setTotalConvos((c)=>data?.totalConversations||c)
        },
        onError(err) {
            toast({description:"Something went wrong with getting total conversations",variant:"destructive"});
        },

    })

    //Get the Total Chats
    const chatData = trpc.meta.countChats.useQuery({},{
        enabled:false,
        onSuccess(data) {
            setTotalChats((ch)=>data?.totalChats||ch);
        },
        onError(err) {
            toast({description:"Something went wrong with getting total chats",variant:"destructive"});
        },
    })

    useEffect(()=>{
        if(status === "unauthenticated"){
            router.push("/");
        }
        else if(status === "authenticated"){
            convoData.refetch();
            chatData.refetch();
        }
    },[status])

    return (
        <div>
            {
                (status === "loading"||chatData.isLoading||convoData.isLoading) 
                ? <Loader /> :

                <div className="min-w-[500px] dark:bg-black h-screen">
                    <Navbar />

                    <div className="mt-20 flex flex-col items-center">

                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                            Profile
                        </h1>

                        <ProfileCard totalChats={totalChats} totalConvos={totalConvos} AVATAR={AVATAR}/>
                        
                    </div>
                    


                </div>
            }
        </div>
    )
}