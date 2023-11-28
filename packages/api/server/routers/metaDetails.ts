import { z } from "zod";
import { authProcedure } from "../middlewares/auth";
import { TRPCError } from "@trpc/server";
import {router} from "../trpc"

export const metaRouter = router ({

    // count convos for a given chat

    countConvos : authProcedure
    .input(z.object({chatId: z.string()}))
    .query(async(opts)=>{
        
        // get the user 

        if(opts.ctx.session.user){

            try {

                const user = await opts.ctx.prisma.user.findFirst({where:{email:opts.ctx.session.user.email}});

                if(user){

                    const totalConversations = await opts.ctx.prisma.conversation.count({
                        where:{
                            authorId : user.id,
                            chatId: opts.input.chatId,
                        }
                    })

                    return {totalConversations}
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

    // get total conversations

    countTotalConvos : authProcedure
    .input(z.any().optional())
    .query(async(opts)=>{
        
        // get the user 


        if(opts.ctx.session.user){

            try {

                const user = await opts.ctx.prisma.user.findFirst({where:{email:opts.ctx.session.user.email}});

                if(user){

                    const totalConversations = await opts.ctx.prisma.conversation.count({
                        where:{
                            authorId : user.id
                        }
                    })

                    return {totalConversations}
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

    // get total chats

    countChats : authProcedure
                    .input(z.any().optional())
                    .query(async(opts)=>{
                        
                        // get the user 


                        if(opts.ctx.session.user){

                            try {

                                const user = await opts.ctx.prisma.user.findFirst({where:{email:opts.ctx.session.user.email}});

                                if(user){

                                    const totalChats = await opts.ctx.prisma.chat.count({
                                        where:{
                                            authorId : user.id
                                        }
                                    })

                                    return {totalChats}
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