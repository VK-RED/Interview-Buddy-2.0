import { Icons } from "./src/ui/icons"
import { Button } from "./src/ui/button"
import { Input } from "./src/ui/input"
import { Label } from "./src/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "./src/ui/card"

import { authAtomSelector, useRecoilValue } from "store"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { useToast } from "./src/ui/use-toast"
import Link from "next/link"



function SigninCard(){

    const {signIn} = useRecoilValue(authAtomSelector);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const searchParams = useSearchParams();
    const router = useRouter();
    const {toast} = useToast();
    const callbackUrl = searchParams.get('callbackUrl')||"/";

    

    const handleAuth = async()=>{
        const res = await signIn('credentials',{
            redirect: false,
            email,
            password,
            callbackUrl,
        })

        setEmail(""),
        setPassword("");

        if(res?.error){
            toast({description:"Please enter valid email or password",variant:"destructive"})
            setTimeout(() => {
                router.push("/");
            }, 2000);
            
            return;
        }
        else{
            router.push(callbackUrl);
        }
    }

    return(
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Login to your account</CardTitle>
                <CardDescription>
                Click the button below to Login
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div>
                <Button onClick={()=>signIn('google')} variant="outline" className="w-full">
                    <Icons.google className="mr-2 h-4 w-4" />
                    Google
                </Button>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                        </span>
                    </div>
                </div>
                <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="adithiyan@gmail.com" value={email} onChange={(e)=>setEmail((em)=>e.target.value)}/>
                </div>
                <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e)=>setPassword((p)=>e.target.value)} placeholder="NJKNsdc@123"/>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
                <Button className="w-full" onClick={handleAuth}>Login</Button>
                <p className="text-sm dark:text-gray-400">Don't have an account? <Link href ="/signup" className="dark:text-blue-200 text-blue-500"> Create one</Link> instead</p>
            </CardFooter>
        </Card>
    )
}

type SignupCardProps = {
    handleSignup: ({userName,email,password}:{userName:string,email:string,password:string}) => void;
}

function SignupCard({handleSignup}:SignupCardProps){
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");

    const handleClick = ()=>{
        handleSignup({email,password,userName});
        setEmail("");
        setPassword("");
        setUserName("");
        return;
    }
    
    return(
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Create an account</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" type="text" placeholder="Adithiyan" value={userName} onChange={(e)=>setUserName((un)=>e.target.value)}/>
                </div>
                <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="adithiyan@gmail.com" value={email} onChange={(e)=>setEmail((em)=>e.target.value)}/>
                </div>
                <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e)=>setPassword((p)=>e.target.value)} placeholder="NJKNsdc@123"/>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={handleClick}>Create an account</Button>
            </CardFooter>
        </Card>
    )
}

export {SigninCard, SignupCard}