import { authOptions, getProviders, getServerSession } from "auth";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { CreateAccount } from "ui/createAccount";

export default function Signin({
    providers,
  }: InferGetServerSidePropsType<typeof getServerSideProps>){

    const oAuthProviders = Object.values(providers).map((provider)=>provider);

    return (
        <div className="h-screen border flex justify-center items-center min-w-[500px]">  
            <CreateAccount/>            
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions)
  
    // If the user is already logged in, redirect.
    // Note: Make sure not to redirect to the same page
    // To avoid an infinite loop!
    if (session) {
      return { redirect: { destination: "/" } }
    }
  
    const providers = await getProviders();
  
    return {
      props: { providers: providers ?? [] },
    }
  }