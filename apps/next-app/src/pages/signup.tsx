
import { SignupCard } from "ui/createAccount";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import { useToast } from "ui";
import { authAtomSelector, useRecoilValue } from "store"

export default function Signup(){
    const {signIn} = useRecoilValue(authAtomSelector);

    const {mutate} = trpc.user.signup.useMutation();
    const router = useRouter();
    const {toast} = useToast();

    const handleSignup = async({email,password,userName}:{email:string, password:string, userName:string})=>{
        mutate({email,password,userName},{
            onSuccess(data){
                toast({description:"User Created Successfully !! Login again to confirm your identity"});
                setTimeout(()=>{
                    signIn()
                },2000);
                return;
            },
            onError(error){
                toast({description:error.message, variant:"destructive"});
                setTimeout(()=>{
                    router.push("/");
                },2000)
                return;
            }
        })
    }

    return (
        <div className="h-screen border flex justify-center items-center min-w-[500px]">  
            <SignupCard handleSignup={handleSignup}/>            
        </div>
    )
}
