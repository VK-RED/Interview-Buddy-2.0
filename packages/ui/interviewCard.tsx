import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "./src/ui/card"

import { AlertDialoger } from "./alertDialoger"
  

type InterviewCardPropType = {
    imgSrc? : string,
    cardTitle : string,
    onClick : (name:string) => void,
}


export function InterviewCard({imgSrc, cardTitle, onClick} : InterviewCardPropType){

    return(
        
        <Card 
            className="m-2 md:m-4 dark:text-zinc-200 shadow-lg border border-zinc-300 dark:border-neutral-600 relative py-5 dark:bg-black">
            <CardHeader>
                <CardTitle>{cardTitle}</CardTitle>
            </CardHeader>
            <CardContent>
               <img className="rounded-lg"
                src={imgSrc} 
                alt={cardTitle}
                />
            </CardContent>
            <CardFooter className="flex justify-center">
                <div className="absolute bottom-3">
                    <AlertDialoger
                        onClick={onClick}
                        interviewTitle={cardTitle}
                        buttonTitle="Select"
                        alertTitle="Are you absolutely sure?"
                        alertDescription={`You have selected ${cardTitle} as your interview topic. On clicking the continue button you will be interviewed on the selected topic`}
                    />
                </div>
            </CardFooter>
        </Card>
    )
}