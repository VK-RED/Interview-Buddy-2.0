import { z } from 'zod';
import { procedure, router } from '../trpc';
import { isAuth } from '../middlewares/auth';
import { TRPCClientError } from '@trpc/client';
import { interviewRouter } from './interview';

export const appRouter = router({

  interview: interviewRouter,
  
});

// export type definition of API
export type AppRouter = typeof appRouter;