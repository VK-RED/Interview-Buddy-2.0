import { authAtomSelector, useRecoilValue } from "store";
import { Loader } from "./loader";

interface ProfileCardProps  {
    totalChats : number,
    totalConvos : number,
    AVATAR : string
}

export function ProfileCard({totalChats, totalConvos, AVATAR}: ProfileCardProps){

    const {useSession,signIn} = useRecoilValue(authAtomSelector);
    const {data:session} = useSession();



    return(
        
            <div>
                    <img alt="userimage" src = {session?.user?.image || AVATAR}/>
                
                    <div>{session?.user?.name}</div>
                    <div>{session?.user?.email}</div>
                    <div>
                        Total chats - {totalChats}
                    </div>
                    <div>
                        Total Conversations - {totalConvos}
                    </div>
            </div>

    )
}