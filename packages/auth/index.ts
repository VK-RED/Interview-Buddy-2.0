import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
export * from "next-auth/react"
export * from "@auth/prisma-adapter"
export * from "@prisma/client"

export {
    NextAuth, 
    GoogleProvider,
}