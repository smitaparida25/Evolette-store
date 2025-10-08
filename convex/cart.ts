import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const addToCart = mutation({
  args: {
    userId: v.string(),
    productId: v.string(),
    quantity: v.number()
  },
  handler: async (ctx, { userId, productId, quantity }) => {
    return await ctx.db.insert("cart", {
      userId,
      productId,
      quantity,
    });
  },
});

export const removeFromCart = mutation({
  args: { cartItemId: v.id("cart") },
  handler: async (ctx, { cartItemId }) => {
    return await ctx.db.delete(cartItemId);
  },
});

export const getCart = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("cart")
      .filter(q => q.eq(q.field("userId"), userId))
      .collect();
  },
});
