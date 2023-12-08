import { ScrollArea } from "./src/ui/scroll-area"
import { ResponseCard } from "./responseCard"

type InterviewScrollAreaProps = {
  convos : {role:"assistant"|"user"|"system", content:string}[],
  userName: string,

}

export function InterviewScrollArea({convos, userName}:InterviewScrollAreaProps){

    return(
        <ScrollArea className="p-5 my-10 h-[600px]">

          {
            convos?.map((convo,ind)=>(

                <ResponseCard 
                    key={ind}
                    content={convo.content}
                    role={convo.role}
                    userName={userName||"You"}
                />
            ))
          }
        
        </ScrollArea>
    )
}