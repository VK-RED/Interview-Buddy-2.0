import { z } from "zod";
import { procedure, router } from "../trpc";
import { healthMessage } from "../../constants";


export const healthRouter = router({

    get:   procedure
            .input(z.any().optional())
            .query(async(opts)=>{
                return {message:healthMessage}
            })
})