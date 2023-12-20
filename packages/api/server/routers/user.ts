import { TRPCError } from "@trpc/server";
import { procedure, router } from "../trpc";
import {z} from 'zod';
import { bcrypt } from "features";

export const userRouter = router({
    signup:  procedure
                .input(z.object({
                    userName:z.string(), 
                    email:z.string(),
                    password:z.string(),
                }))
                .mutation(async(opts)=>{
                    const {prisma} = opts.ctx;
                    const{userName,email,password} = opts.input;
                    
                    try {
                        const existUser = await prisma.user.findUnique({where:{email}});

                        const hashedPassword = bcrypt.hashSync(password,10);

                        if(!existUser){
                            const user = await prisma.user.create({
                                data:{
                                    name:userName,
                                    email,
                                    password:hashedPassword,
                                }
                            })

                            return {message:"User created Successfully !!!", name:user.name, email:user.email};
                        }
                        else{
                            throw new TRPCError({code:"BAD_REQUEST",message:"USER EXISTS ALREADY, TRY SIGNING IN"});
                        }
                    } catch (error) {
                        console.log(error);
                        throw new TRPCError({code:"BAD_REQUEST",message:"User Exists Already, Try Signing in !!"});
                    }
                    
                })
})