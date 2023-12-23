import { authAtomSelector, useRecoilValue } from "store";
import {
    Card,
    CardContent,
  } from "ui/src/ui/card"

  

interface ProfileCardProps  {
    totalChats : number,
    totalConvos : number,
    AVATAR : string
}

export function ProfileCard({totalChats, totalConvos, AVATAR}: ProfileCardProps){

    
    const {useSession} = useRecoilValue(authAtomSelector);
    const {data:session} = useSession();
    const IMAGE = session?.user?.image || AVATAR;
    const USERNAME = session?.user?.name||"Rick Astley"
    
    return(
        
            <Card className=" mt-10 dark:border dark:border-slate-800">
                <CardContent className="py-4 flex flex-col items-center space-y-4 max-w-[400px]">
                    <div className="h-28 w-28">
                        <img src = {IMAGE} alt="avatar" className="rounded-full"/>
                    </div>
                    
                    
                    <p>
                        Hi <span className="font-semibold ">{USERNAME}</span> &#128075; You have been interviewed <span className="font-semibold animate-pulse">{totalChats}</span> times 
                    </p> 
                    <p>
                        We have had over <span className="font-semibold animate-pulse">{totalConvos}</span> total conversations
                    </p>
                    <p>
                        All the best and Keep practising !!!
                    </p>
                </CardContent>
    
            </Card>
      

    )
}