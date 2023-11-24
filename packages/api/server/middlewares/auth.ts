import { TRPCError } from "@trpc/server";
import {middleware} from "../trpc"

export const isAuth = middleware(async (opts) => {
    const {ctx} = opts;
    if(!ctx.session?.user)
        throw new TRPCError({code:"UNAUTHORIZED"});
    return opts.next({
        ctx:{
            prisma: ctx.prisma,
            session: ctx.session,
        }
    })
})