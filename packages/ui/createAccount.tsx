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

export function CreateAccount(){

    const {signIn} = useRecoilValue(authAtomSelector);

    return(
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>
                Enter your email below to create your account
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
                <Input id="email" type="email" placeholder="me@example.com" />
                </div>
                <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Create account</Button>
            </CardFooter>
        </Card>
    )
}

