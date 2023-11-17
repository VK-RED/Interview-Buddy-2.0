import {NextAuth, GoogleProvider} from "auth";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string, 
      }),
      // ...add more providers here
    ],
    secret: process.env.NEXTAUTH_SECRET
  }

export default NextAuth(authOptions)