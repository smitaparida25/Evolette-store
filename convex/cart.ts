import { query, mutation } from "./_generated/server";

export const addToCart = mutation({
    args: { userId: string, productId: string, quantity: number},
    handler: async (ctx, {userId, productId, quantity}) => {
        return await ctx.db.insert("cart", {
            userId,
            productId,
            quantity,
            });
        },
    });

export const removeFromCart = mutation ({
    args: {cartItemId: string},
    handler: async (ctx, {cartItemId}) => {
        return await ctx.db.delete(cartItemId);
        },
    });

export const getCart = query({
    args: { userId:string },
    handler: async (ctx, {userId}) =>{
        return await ctx.db.query("cart").filter(q => q.eq(q.field("userId"), userId)).collect();
        },
    });