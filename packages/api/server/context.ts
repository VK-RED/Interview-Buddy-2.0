
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { prisma } from "db"
import { getServerSession } from "auth";
import { authOptions } from "auth";

export const createContext = async (opts: CreateNextContextOptions) =>{
    const session = await getServerSession(opts.req, opts.res, authOptions);
    return {prisma,session};
}

export type Context = Awaited<ReturnType<typeof createContext>>;