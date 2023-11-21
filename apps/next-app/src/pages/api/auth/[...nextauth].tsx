import {NextAuth, GoogleProvider, PrismaAdapter, PrismaClient} from "auth";
import { randomBytes, randomUUID } from "crypto";
import { SessionStrategy } from "next-auth";


const prisma = new PrismaClient()

export const authOptions = {

  adapter: PrismaAdapter(prisma),

    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string, 
      }),
      // ...add more providers here
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
    session: {
      // Choose how you want to save the user session.
      // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
      // If you use an `adapter` however, we default it to `"database"` instead.
      // You can still force a JWT session by explicitly defining `"jwt"`.
      // When using `"database"`, the session cookie will only contain a `sessionToken` value,
      // which is used to look up the session in the database.
      strategy: "database" as SessionStrategy,
    
      // Seconds - How long until an idle session expires and is no longer valid.
      maxAge: 30 * 24 * 60 * 60, // 30 days
    
      // Seconds - Throttle how frequently to write to database to extend a session.
      // Use it to limit write operations. Set to 0 to always update the database.
      // Note: This option is ignored if using JSON Web Tokens
      updateAge: 24 * 60 * 60, // 24 hours
      
      // The session token is usually either a random UUID or string, however if you
      // need a more customized session token string, you can define your own generate function.
      generateSessionToken: () => {
        return randomUUID?.() ?? randomBytes(32).toString("hex")
      }
    }
  }

export default NextAuth(authOptions)