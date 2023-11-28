import { router } from '../trpc';
import { interviewRouter } from './interview';
import { metaRouter } from './metaDetails';

export const appRouter = router({
  
  interview: interviewRouter,
  meta: metaRouter

});

// export type definition of API
export type AppRouter = typeof appRouter;