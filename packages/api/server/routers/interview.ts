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
                                    title: opts.input.name + " Interview",
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

    //TODO : You have to only return the chatID, chatTitle, convo with only role and content
    
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

                                    //get latest chat from latestChat[]

                                    const latestChatArr = await opts.ctx.prisma.chat.findMany({
                                        where:{
                                            authorId: user?.id,
                                        },
                                        select:{
                                            conversations:{
                                                orderBy:{createdAt:'asc'},
                                                select:{
                                                    role:true,
                                                    content:true,
                                                }
                                            },
                                            title:true,
                                            id:true
    
                                        },
                                        orderBy:{createdAt: 'desc'},
                                        take:1
                                    })

                                    const latestChat = latestChatArr[0];

                                    if(latestChat.conversations.length < 1) throw new TRPCError({code:"INTERNAL_SERVER_ERROR"});
                                    
                                    if(latestChat.conversations.length < 2){

                                        const convoArr = latestChat.conversations;

                                        convoArr.push({role:"user",content:readyPrompt});

                                        //TODO : send this msg to openAi collect the response , create a new convo for it and send the chat back to the user

                                        const res = {role:"assistant",content:"Sure, who is Heisenberg ?"}

                                        const newConvo = await opts.ctx.prisma.conversation.create({
                                            data:{
                                                role:'assistant',
                                                content: res.content,
                                                authorId:user.id,
                                                createdAt: new Date().toISOString(),
                                                updatedAt: new Date().toISOString(),
                                                chatId: latestChat.id
                                            }
                                        })

                                        return {chatId: latestChat.id, chatTitle: latestChat.title, conversations:[{role:newConvo.role, content: newConvo.content}]}

                                    }
                                    else{
                                        return {chatId: latestChat.id, chatTitle: latestChat.title, conversations:latestChat.conversations.splice(0,1)}
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

                    }),

        // get openai response for every user queries

        getResponse :  authProcedure
                        .input(z.object({content : z.string(), chatId : z.string()}))
                        .mutation(async (opts)=>{

                            if(opts.ctx.session.user){

                                try {

                                    const user = await opts.ctx.prisma.user.findFirst({where:{email:opts.ctx.session.user.email}});

                                    if(user){

                                        // Create convo for user query

                                        const convo = await opts.ctx.prisma.conversation.create({
                                            data:{
                                                role:"user",
                                                content:opts.input.content,
                                                authorId:user.id,
                                                chatId:opts.input.chatId,
                                                createdAt: new Date().toISOString(),
                                                updatedAt: new Date().toISOString(),
                                            }
                                        })

                                        // filter out the updated convo from D.B

                                        const updatedChat = await opts.ctx.prisma.chat.findUnique({
                                            where:{
                                                id: opts.input.chatId
                                            },
                                            select:{
                                                conversations:{
                                                    orderBy:{
                                                        createdAt:'asc'
                                                    },
                                                    select:{
                                                        content:true,
                                                        role:true
                                                    }
                                                }
                                            }
                                        })

                                        const convoArr = updatedChat?.conversations;

                                        // TODO : SEND THIS CONVO[] TO GPT AND GET THE RESPONSE

                                        const resp = "YEAH !!! THIS IS A GPT RESPONSE !!!"

                                        
                                        // CREATE A CONVO FOR THE GPT RESPONSE

                                        const newConvo = await opts.ctx.prisma.conversation.create({
                                            data:{
                                                role:"assistant",
                                                content:resp,
                                                authorId:user.id,
                                                chatId:opts.input.chatId,
                                                createdAt: new Date().toISOString(),
                                                updatedAt: new Date().toISOString(),
                                            }
                                        })

                                        // RETURN THE GPT RESPONSE 

                                        return {role:newConvo.role, content:newConvo.content}
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