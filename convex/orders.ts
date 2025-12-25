import { mutation } from "./_generated/server";
import { v } from "convex/values";


export const createOrderFromCart = mutation({
    args: {userId: v.string()},
    handler: async(ctx, {userId}) =>{
        if(!userId) throw new Error("No userId");

        const cartItems = await ctx.db

        }
    })