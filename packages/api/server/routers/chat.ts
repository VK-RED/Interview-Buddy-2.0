import { z } from "zod";
import { authProcedure } from "../middlewares/auth";
import { router } from "../trpc";
import { TRPCError } from "@trpc/server";



export const chatRouter = router({

    //get the title of all chats

    getChatTitles : authProcedure
                    .input(z.any().optional())
                    .query(async(opts)=>{

                        if(opts.ctx.session.user){

                            try {

                                const user = await opts.ctx.prisma.user.findFirst({where:{email:opts.ctx.session.user.email}});

                                if(user){

                                    const chatTitles = await opts.ctx.prisma.chat.findMany({
                                        where:{
                                            authorId: user.id
                                        },
                                        orderBy:{
                                            createdAt: 'desc'
                                        },
                                        select:{
                                            title: true,
                                            id:true
                                        }
                                    })

                                    return {chatTitles}
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

    // given an id of a chat, return the chat

    getChat :       authProcedure
                    .input(z.object({chatId: z.string()}))
                    .query(async(opts)=>{

                        if(opts.ctx.session.user){

                            try {

                                const user = await opts.ctx.prisma.user.findFirst({where:{email:opts.ctx.session.user.email}});

                                if(user){

                                    const chat = await opts.ctx.prisma.chat.findUniqueOrThrow({
                                        where:{
                                            id : opts.input.chatId,
                                        },
                                        select:{
                                            id:true,
                                            title:true,
                                            conversations:{
                                                orderBy:{
                                                    createdAt:'asc'
                                                },
                                                select:{
                                                    role:true,
                                                    content:true,
                                                }
                                            }
                                        }
                                    });

                                    return {chatId:chat.id,chatTitle:chat.title,conversations:chat.conversations.slice(1)}
                                }
                                
                            } catch (error) {
                                console.log(error);
                                throw new TRPCError({code:"BAD_REQUEST",message:"ENTER VALID CHATID"});
                            }

                        }
                        else{
                            throw new TRPCError({code:"NOT_FOUND",message:"USER NOT AVAILABLE, KINDLY LOGIN AGAIN"});
                        }
                    }),
})