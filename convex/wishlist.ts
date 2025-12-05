import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addToWishlist = mutation({
    args: {
        productId: v.id("products"),
        userId: v.id("users"),
        },
    handler: async (ctx, {productId,userId}) => {
        const existing = await ctx.db
              .query("wishlist")
              .filter((q) =>
                q.eq(q.field("userId"), userId) &&
                q.eq(q.field("productId"), productId)
              )
              .first();

            if (existing) {
              return { message: "Already in wishlist" };
            }
        const newWishlistItem = await ctx.db.insert("wishlist", {
              userId,
              productId,
            })o;
        return { message: "Added to wishlist", newWishlistItem};
        },
    });

export const removeFromWishlist = mutation({
  args: {
    id: v.id("wishlist"),
    userId: v.string(),
  },
  handler: async (ctx, { id, userId }) => {
    const item = await ctx.db.get(id);
    if (!item) throw new Error("Item not found");
    if (item.userId !== userId) throw new Error("Unauthorized");

    return await ctx.db.delete(id);
  },
});

export const getWishlist = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const items = await ctx.db
      .query("wishlist")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();

    const wishlistProducts = await Promise.all(
      items.map(async (item) => {
        const product = await ctx.db.get(item.productId);
        return {
          _id: item._id,
          productId: item.productId,
          name: product?.name,
          price: product?.price,
          imageUrl: product?.imageUrl,
        };
      })
    );

    return wishlistProducts;
  },
});