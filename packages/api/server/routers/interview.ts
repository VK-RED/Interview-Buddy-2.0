import { router } from "../trpc";
import { authProcedure } from "../middlewares/auth";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { defPrompt, readyPrompt } from "../../constants";

export const interviewRouter = router({

    // Sends the interview topic to openAI

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
                                    title: opts.input.name,
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
            }),

    // gets the latest chat from D.B
    
    getLatestChat : authProcedure.
                    input(z.any().optional())
                    .query(async(opts)=>{


                        // Get the latest chat from D.B
                        // Check if the convo > 2
                        // if yes send it to client
                        // else send a ready message to openai , get the response from it
                        // and return the new chat to the client


                        if(opts.ctx.session.user){

                            try {

                                const user = await opts.ctx.prisma.user.findFirst({where:{email:opts.ctx.session.user.email}});

                                if(user){

                                    //get latest chat

                                    const latestChat = await opts.ctx.prisma.chat.findMany({
                                        where:{
                                        authorId: user?.id,
                                        },
                                        include:{
                                        conversations:{
                                            orderBy:{createdAt:'asc'},
                                        }
                    
                                        },
                                        orderBy:{createdAt: 'desc'},
                                        take:1
                                    })

                                    if(latestChat[0].conversations.length < 1) throw new TRPCError({code:"INTERNAL_SERVER_ERROR"});
                                    
                                    if(latestChat[0].conversations.length < 2){

                                        const convo = latestChat[0].conversations.map((c)=>{
                                            return {
                                            role: c.role,
                                            content: c.content,
                                            }
                                        });

                                        convo.push({role:"user",content:readyPrompt});

                                        //TODO : send this msg to openAi collect the response , create a new convo for it and send the chat back to the user

                                        const res = {role:"assistant",content:"Sure, who is Heisenberg ?"}

                                        const newConvo = await opts.ctx.prisma.conversation.create({
                                            data:{
                                                role:'assistant',
                                                content: res.content,
                                                authorId:user.id,
                                                createdAt: new Date().toISOString(),
                                                updatedAt: new Date().toISOString(),
                                                chatId: latestChat[0].id
                                            }
                                        })

                                        const newLatestChat = await opts.ctx.prisma.chat.findUnique({
                                            where:{id:latestChat[0].id},
                                            include:{
                                                conversations:{
                                                    orderBy:{createdAt:'asc'},
                                                }
                                            },
                                        });

                                        return {chat:newLatestChat}

                                    }
                                    else{
                                        return {chat:latestChat[0]}
                                    }

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