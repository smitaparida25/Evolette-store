import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addToCart = mutation({
  args: {
    userId: v.id("users"),
    productId: v.id("products"),
  },
  handler: async (ctx, { userId, productId }) => {
    const existingCartItem = await ctx.db
      .query("cartItems")
      .filter(
        (q) =>
          q.eq(q.field("userId"), userId) &&
          q.eq(q.field("productId"), productId)
      )
      .first();

    if (existingCartItem) {
      await ctx.db.update(existingCartItem._id, {
        quantity: existingCartItem.quantity + 1,
      });
      return { message: "Cart updated", quantity: existingCartItem.quantity + 1 };
    } else {
      const newCartItem = await ctx.db.insert("cartItems", {
        userId,
        productId,
        quantity: 1,
      });
      return { message: "Added to cart", cartItemId: newCartItem };
    }
  },
});
