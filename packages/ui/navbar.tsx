import { authAtomSelector, useRecoilValue } from "store";
import { AvatarToggle } from "./avatarToggle";
import { DarkModeToggle } from "./darkModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "./src/ui/avatar";
import { Button } from "./src/ui/button";

export function Navbar(){

    const {useSession,signIn} = useRecoilValue(authAtomSelector);
    const {status} = useSession();

    return (
        <div className="border  py-3 flex justify-between items-center">
            <h1 className="mx-10 font-bold text-2xl font-mono">Interview Buddy</h1>
            <div className="flex space-x-5 mr-5">
                
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