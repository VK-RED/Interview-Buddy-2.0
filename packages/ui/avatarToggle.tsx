"use client"

import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "ui/src/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./src/ui/avatar";
import { useRecoilValue, authAtomSelector } from "store";

export function AvatarToggle(){

  const {signIn, signOut, useSession} = useRecoilValue(authAtomSelector)
  const {data:session,status} = useSession();

    return(
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
                <AvatarImage src={session?.user?.image||""} alt="@shadcn" />
                <AvatarFallback>
                  <img src="https://github.com/shadcn.png" alt="@shadcn" />
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="cursor-pointer"
           onClick={()=>{
            if(status === "unauthenticated"){
                signIn();
                return;
            }
            signOut()
          }}>
            {status==="authenticated" ? "Signout" :"Signin"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
}