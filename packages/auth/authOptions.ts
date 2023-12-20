import { randomBytes, randomUUID } from "crypto";
import { SessionStrategy } from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter"
import {PrismaClient} from "@prisma/client"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
const prisma = new PrismaClient()

export const authOptions = {

  adapter: PrismaAdapter(prisma),

    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string, 
      }),
      CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: { label: "Email", type: "email", placeholder: "adithiyan@gmail.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the `req` object to obtain additional parameters
          // (i.e., the request IP address)
          

          if(!credentials?.email || !credentials.password) return null;

          //Handle Signin here 
          
          const user = await prisma.user.findUnique({where:{
            email:credentials.email,
          }})
          
          if(!user || user.password !== credentials.password) return  null;
          
          return user;
          
        }
      })
      
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
    session: {
      // Choose how you want to save the user session.
      // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
      // If you use an `adapter` however, we default it to `"database"` instead.
      // You can still force a JWT session by explicitly defining `"jwt"`.
      // When using `"database"`, the session cookie will only contain a `sessionToken` value,
      // which is used to look up the session in the database.return {...newUser};
      strategy: "jwt" as SessionStrategy,
    
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
    },
    pages:{
      signIn:"/signin",
    },
    callbacks:{
      async redirect({url,baseUrl}:{url:string,baseUrl:string}){
        // console.log("The flow being affected !!!!!")
        // console.log(url, "<------------- This has defined in the dashboard")
        // console.log(baseUrl, "<------------- Base Url of the site")
        return url.startsWith(baseUrl)
          ? Promise.resolve(baseUrl+"/topics")
          : Promise.resolve(baseUrl)
      },

      async jwt({ token, account, profile, session }: any) {
        
        /*
          This function is fired whenever a new token is created , ideally during signin
          token will be an object containing user details passed to session({token})
        */

        return token;
      },

      async session({session,token,user}:any) {
          
        /*
          Any extra info, needed to pass to the client can be done here. Ex: userId to the client 
          The session and token are got from the jwt()
        */
          
          return session;
      }
    }
  }
