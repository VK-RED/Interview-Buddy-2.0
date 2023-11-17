import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { SessionProvider,useSession, signIn, signOut } from "next-auth/react"



export {
    NextAuth, 
    GoogleProvider, 
    SessionProvider, 
    useSession, 
    signIn, 
    signOut
}