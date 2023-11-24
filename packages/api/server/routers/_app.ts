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
      console.log(opts.ctx.session);
      return {
        greeting: `hello ${opts.input.text+" "+opts.ctx.session?.user?.email}`,
      };
    }),
    
});

// export type definition of API
export type AppRouter = typeof appRouter;