import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addToCart = mutation({
  args: {
    productId: v.id("products"),
  },
  handler: async (ctx, { productId }) => {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) throw new Error("Not authenticated");

      const userId = identity.subject;
    const existingCartItem = await ctx.db
      .query("cartItems")
      .filter(
        (q) =>
          q.eq(q.field("userId"), userId) &&
          q.eq(q.field("productId"), productId)
      )
      .first();

    if (existingCartItem) {
      await ctx.db.patch(existingCartItem._id, {
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

export const removeItem = mutation({
  args: { id: v.id("cartItems") },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const item = await ctx.db.get(id);
    if (!item) throw new Error("Item not found");
    if (item.userId !== identity.subject) throw new Error("Unauthorized");

    return await ctx.db.delete(id);
  },
});

export const updateQuantity = mutation({
  args: { id: v.id("cartItems"), change: v.number() },
  handler: async (ctx, { id, change }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const item = await ctx.db.get(id);
    if (!item) throw new Error("Item not found");
    if (item.userId !== identity.subject) throw new Error("Unauthorized");

    const newQty = item.quantity + change;
    if (newQty <= 0) {
      await ctx.db.delete(id);
    } else {
      await ctx.db.patch(id, { quantity: newQty });
    }
  },
});
export const getCart = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const userId = identity.subject;

    const items = await ctx.db
      .query("cartItems")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();

    const cartWithProducts = await Promise.all(
      items.map(async (item) => {
        const product = await ctx.db.get(item.productId);
        return {
          _id: item._id,
          quantity: item.quantity,
          productId: item.productId,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
        };
      })
    );

    return cartWithProducts;
  },
});