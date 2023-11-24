import { z } from 'zod';
import { procedure, router } from '../trpc';
import { isAuth } from '../middlewares/auth';

export const appRouter = router({
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
          })
});

// export type definition of API
export type AppRouter = typeof appRouter;