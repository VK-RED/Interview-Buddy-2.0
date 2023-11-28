import { router } from '../trpc';
import { chatRouter } from './chat';
import { healthRouter } from './health';
import { interviewRouter } from './interview';
import { metaRouter } from './metaDetails';

export const appRouter = router({
  
  health: healthRouter,
  interview: interviewRouter,
  meta: metaRouter,
  chat: chatRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;