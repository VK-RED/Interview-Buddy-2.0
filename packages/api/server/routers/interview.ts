import { router } from "../trpc";
import { authProcedure } from "../middlewares/auth";
import {z} from "zod";
import { TRPCError } from "@trpc/server";
import { defPrompt } from "../../constants";

export const interviewRouter = router({

    topic : authProcedure
            .input(z.object({
                name : z.string()
            }))
            .mutation(async(opts)=>{
                
                //collect the topic from frontend
                //create a new chat for the user
                //create a new convo using the def prompt
                //send the prompt to openAi

                
                if(opts.ctx.session.user){

                    try {

                        const user = await opts.ctx.prisma.user.findFirst({where:{email:opts.ctx.session.user.email}});

                        if(user){

                            const chat = await opts.ctx.prisma.chat.create({
                                data:{
                                    authorId:user.id,
                                    createdAt: new Date().toISOString(),
                                    updatedAt: new Date().toISOString(),
                                }
                            })

                            //create a system message convo for gpt, insert it in D.B , save the id of convo
                            //strip the message and role from convo and send it to the gpt

                            const convo = await opts.ctx.prisma.conversation.create({
                                data:{
                                    role:"system",
                                    content: defPrompt+opts.input.name,
                                    authorId:user.id,
                                    createdAt: new Date().toISOString(),
                                    updatedAt: new Date().toISOString(),
                                    chatId: chat.id,
                                }
                            })

                            const strippedConvo: { content: string, role: string }[] = [];

                            strippedConvo.push({role:convo.role, content:convo.content});

                            //TODO : send this strippedConvo to openAi

                            return {message: "INTERVIEW INITIALISATION SUCCESS, REIDRECT THE USER "}
                        }
                        

                    } catch (error) {
                        console.log(error);
                        throw new TRPCError({code:"INTERNAL_SERVER_ERROR"});
                    }
                  

                }
                else{
                    throw new TRPCError({code:"NOT_FOUND",message:"USER NOT AVAILABLE, KINDLY LOGIN AGAIN"});
                }
            })
})