import { DarkModeToggle } from "./darkModeToggle";

export function Navbar(){

    return (
        <div className="border h-12 flex justify-between">
            <h1 className="ml-10 font-bold text-2xl font-sans">Interview Buddy</h1>
            <DarkModeToggle/>
        </div>
    )
}