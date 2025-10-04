import { query, mutation } from "./_generated/server";

export const getProducts = query({
    handler: async (ctx) => {
        return await ctx.db.query("products").collect();
        },
    });

export const getProduct = query({
    args: {id, string},
    handler: async (ctx, {id}) => {
        return await ctx.db.get("products", id);
        },
    });

export const updateProductQuantity = mutation({
  args: { productId: string, newQuantity: number },
  handler: async (ctx, { productId, newQuantity }) => {
    return await ctx.db.patch("products", productId, { quantity: newQuantity });
  },
});