import { trpcNext } from 'api/server';
import { appRouter } from 'api/server/routers/_app';
import {createContext} from 'api/server/context'

// export API handler
// @see https://trpc.io/docs/server/adapters
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext
});