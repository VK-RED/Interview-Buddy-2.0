import { chatsHistorySelector, useRecoilValue } from "store"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "./src/ui/popover"
import { ScrollArea } from "./src/ui/scroll-area";
import { Separator } from "./src/ui/separator";  
import Link from "next/link";


export function InterviewPicker(){

    const {allChats, isLoading} = useRecoilValue(chatsHistorySelector);
    
    
    return(
        <Popover>
            <PopoverTrigger>
                History
            </PopoverTrigger>
            <PopoverContent className="w-[250px] ">
                    <ScrollArea className="h-[200px]">
                        {isLoading
                            ? <div>Loading...</div>
                            : <div className="space-y-1 py-2">
                                    {
                                        allChats.map((ch,ind)=>(
                                            <div key={ind} className="text-center">
                                                <Link href={`/interview/${ch.id}`}>
                                                    <div className="cursor-pointer">
                                                        {ch.title}
                                                    </div>
                                                </Link>
                                                
                                                <Separator className="my-2"/>
                                            </div>
                                        ))
                                    }

                            </div>
                        }
                    </ScrollArea>
            </PopoverContent>
        </Popover>
    )
}