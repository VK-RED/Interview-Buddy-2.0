
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { PrismaClient } from "db"

export const createContext = async (opts: CreateNextContextOptions) =>{
    const prisma = new PrismaClient();
    return {prisma};
}

export type Context = Awaited<ReturnType<typeof createContext>>;