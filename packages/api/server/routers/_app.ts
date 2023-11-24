import { z } from 'zod';
import { procedure, router } from '../trpc';

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(async (opts) => {
      const rep = await opts.ctx.prisma.user.findFirst({where:{name:"VK"}});
      console.log(rep);
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
    
});

// export type definition of API
export type AppRouter = typeof appRouter;