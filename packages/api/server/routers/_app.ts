import { z } from 'zod';
import { procedure, router } from '../trpc';
import { isAuth } from '../middlewares/auth';
import { TRPCClientError } from '@trpc/client';
import { interviewRouter } from './interview';

export const appRouter = router({

  interview: interviewRouter,

  hello: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(async (opts) => {
      return {
        greeting: `hello ${opts.input.text+" "+opts.ctx.session?.user?.email || "YOU ARE NOT SIGNED IN"}`,
      };
    }),
    
  secret: procedure
          .input(z.null())
          .use(isAuth)
          .query(async (opts)=>{
            return "YOU CAN SEE THE SECRET MESSAGE";
          }),

  interview_test: procedure
              .input(z.null())
              .use(isAuth)
              .mutation(async(opts)=>{

                const defPrompt = 'Consider yourself and start an interview';
                const gptResponse = 'Sure, what is the height of himalayas'
                const myReply = "I don't know"

                if(!opts.ctx.session.user) throw new TRPCClientError("USER NOT FOUND");
                
                if(opts.ctx.session.user){


                  const user = await opts.ctx.prisma.user.findFirst({where:{email:opts.ctx.session.user.email}})
                
                  if(!user) throw new TRPCClientError("USER NOT FOUND");

                  console.log("USER FOUND SUCCESSFULLY");
                  
  
                  const chat = await opts.ctx.prisma.chat.create({
                    data:{
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString(),
                      authorId: user.id,
                    }
                  });


                  console.log("CHAT CREATED SUCCESSFULLY");
  
                  const convo1 = await opts.ctx.prisma.conversation.create({
                    data:{
                      content:defPrompt,
                      role:'system',
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString(),
                      authorId: user.id,
                      chatId: chat.id
                    }
                  });

                  console.log("CONVO1 CREATED SUCCESSFULLY");
  
                  const convo2 = await opts.ctx.prisma.conversation.create({
                    data:{
                      content:gptResponse,
                      role:'assistant',
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString(),
                      authorId: user.id,
                      chatId: chat.id
                    }
                  });

                  console.log("CONVO2 CREATED SUCCESSFULLY");
  
                  const convo3 = await opts.ctx.prisma.conversation.create({
                    data:{
                      content:myReply,
                      role:'user',
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString(),
                      authorId: user.id,
                      chatId: chat.id
                    }
                  });

                  console.log("CONVO3 CREATED SUCCESSFULLY");
  
                  return {message:"The demo chat and convo has been initialised"};

                }
                

              }),

              //Procedure to find to latest chat with convo in ascending order
              
  getChat:  procedure
            .input(z.null())
            .use(isAuth)
            .query(async (opts)=>{

              if(opts.ctx.session.user){
                const user = await opts.ctx.prisma.user.findFirst({where:{email: opts.ctx.session.user.email}})
                const chat = await opts.ctx.prisma.chat.findMany({
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
                
                if(chat.length > 0){
                  const convo = chat[0].conversations.map((c)=>{
                    return {
                      role: c.role,
                      message: c.content,
                    }
                  });

                  console.log(convo);

                  return convo;
                } 
                
              }

              
            })
});

// export type definition of API
export type AppRouter = typeof appRouter;