"use client"

import * as React from "react"

import { Button } from "ui/src/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "ui/src/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "./src/ui/avatar";

type AvatarTogglerType = {
    profilePic : string,
    status: "authenticated"|"unauthenticated"|"loading",
    signIn:()=>{},
    signOut:()=>{},
}

export function AvatarToggle({status,profilePic,signIn,signOut}:AvatarTogglerType){

    return(
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Avatar>
                <AvatarImage src={profilePic} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={()=>{
            if(status === "unauthenticated"){
                signOut();
                return;
            }
            signIn()
          }}>
            {status==="authenticated" ? "Signout" :"Signin"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
}