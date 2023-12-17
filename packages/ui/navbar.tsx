import { authAtomSelector, useRecoilValue } from "store";
import { AvatarToggle } from "./avatarToggle";
import { DarkModeToggle } from "./darkModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "./src/ui/avatar";
import { Button } from "./src/ui/button";
import { InterviewPicker } from "./interviewPicker";

export function Navbar(){

    const {useSession,signIn} = useRecoilValue(authAtomSelector);
    const {status} = useSession();

    

    return (
        <div className="py-5 flex justify-between items-center dark:border-b dark:border-zinc-700 dark:bg-black  shadow-lg">
            <h1 className="mx-10 font-bold text-2xl font-mono">Interview Buddy</h1>
            <div className="flex space-x-5 mr-5">

                {
                    status==="authenticated" && <InterviewPicker/>
                }
                
                <DarkModeToggle /> 

                {
                    status === "authenticated"  ? <AvatarToggle />
                    : (
                        <Button onClick={()=>signIn()}>
                            Login
                        </Button>
                    )
                }
                

            </div>
        </div>
    )
}