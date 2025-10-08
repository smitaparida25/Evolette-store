import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getProducts = query({
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  },
});

export const getProduct = query({
  args: { id: v.id("products") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const updateProductQuantity = mutation({
  args: { productId: v.id("products"), newQuantity: v.number() },
  handler: async (ctx, { productId, newQuantity }) => {
    return await ctx.db.patch(productId, { quantity: newQuantity });
  },
});
