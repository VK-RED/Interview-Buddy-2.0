import { AvatarToggle } from "./avatarToggle";
import { DarkModeToggle } from "./darkModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "./src/ui/avatar";

export function Navbar(){

    return (
        <div className="border  py-3 flex justify-between items-center">
            <h1 className="mx-10 font-bold text-2xl font-mono">Interview Buddy</h1>
            <div className="flex space-x-5 mr-5">
                
                <DarkModeToggle /> 
                <AvatarToggle />

            </div>
        </div>
    )
}