import { Skeleton } from "./src/ui/skeleton"

export function Loader(){

    return (

        <div className="h-screen w-screen dark:bg-black flex flex-col justify-center items-center space-y-10 min-w-[550px]">

            <div className="flex items-center space-x-4 border border-1 p-10 rounded-xl shadow-xl">
                
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px] bg-slate-300 dark:bg-slate-700" />
                    <Skeleton className="h-4 w-[200px] bg-slate-300 dark:bg-slate-700" />
                    <Skeleton className="h-4 w-[150px] bg-slate-300 dark:bg-slate-700" />
                    
                </div>

            </div>

            <div className="dark:text-slate-400 tracking-wider text-gray-500 font-semibold text-lg animate-bounce">
                Hang on for a moment !
            </div>
            
        </div>
        
      )
}