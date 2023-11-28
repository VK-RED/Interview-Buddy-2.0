import { router } from '../trpc';
import { healthRouter } from './health';
import { interviewRouter } from './interview';
import { metaRouter } from './metaDetails';

export const appRouter = router({
  
  health: healthRouter,
  interview: interviewRouter,
  meta: metaRouter

});

// export type definition of API
export type AppRouter = typeof appRouter;