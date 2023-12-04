import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "./src/ui/card"

type ResponseCardPropType = {
    role:string,
    content:string,
}

export function ResponseCard({role,content}:ResponseCardPropType){

    return(
        <Card 
            className="m-2 md:m-4 dark:text-zinc-200 shadow-lg border border-zinc-300 dark:border-neutral-600 relative py-5">
            <CardContent>
                {
                    `${role} : ${content}`
                }
            </CardContent>
        </Card>
    )
}