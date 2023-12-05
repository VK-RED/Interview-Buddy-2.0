import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "./src/ui/card"

import { Badge } from "./src/ui/badge"

type ResponseCardPropType = {
    role:"assistant"|"system"|"user",
    content:string,
    userName:string,
}

export function ResponseCard({role,content,userName}:ResponseCardPropType){

    return(
        <Card 
            className="m-2 md:m-4 dark:text-zinc-200 shadow-2xl border border-zinc-300 dark:border-neutral-600 relative py-5">

            <CardTitle className="px-4 mb-3">

                <Badge>{role === "assistant" ? "Interviewer" : userName}</Badge>

            </CardTitle>

            <CardContent>
                {
                    content
                }
            </CardContent>
        </Card>
    )
}