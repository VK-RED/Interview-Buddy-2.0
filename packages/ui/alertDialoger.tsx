
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "./src/ui/alert-dialog"

import { Button } from "./src/ui/button"

type AlertDialogerPropType = {
    buttonTitle: string,
    alertTitle: string,
    alertDescription: string,
    onClick : (name:string) => void,
    interviewTitle: string,
}

export function AlertDialoger({buttonTitle,alertTitle,alertDescription,onClick,interviewTitle} : AlertDialogerPropType){

    return (
        <AlertDialog >
                <AlertDialogTrigger asChild>
                    <Button className="dark:bg-slate-300" variant={"default"}>{buttonTitle}</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {alertDescription}
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={()=>onClick(interviewTitle)} >Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
        </AlertDialog>
    )
}