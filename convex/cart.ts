import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addToCart = mutation({
  args: {
    productId: v.id("products"),
    userId: v.id("users"),
  },
  handler: async (ctx, { productId, userId }) => {
    const existingCartItem = await ctx.db
      .query("cartItems")
      .filter(q => q.eq(q.field("userId"), userId) && q.eq(q.field("productId"), productId))
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
  args: {
    id: v.id("cartItems"),
    userId: v.string(),
  },
  handler: async (ctx, { id, userId }) => {
    const item = await ctx.db.get(id);
    if (!item) throw new Error("Item not found");
    if (item.userId !== userId) throw new Error("Unauthorized");
    return await ctx.db.delete(id);
  },
});


export const updateQuantity = mutation({
  args: {
    id: v.id("cartItems"),
    change: v.number(),
    userId: v.string(),
  },
  handler: async (ctx, { id, change, userId }) => {
    const item = await ctx.db.get(id);
    if (!item) throw new Error("Item not found");
    if (item.userId !== userId) throw new Error("Unauthorized");

    const newQty = item.quantity + change;
    if (newQty <= 0) {
      await ctx.db.delete(id);
    } else {
      await ctx.db.patch(id, { quantity: newQty });
    }
  },
});

export const getCart = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
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

export const getCartItem = query({
    args: {userId : v.id("users"),
        productId: v.id("products")
        },
        handler: async (ctx, {userId, productId}) => {
            const item = await ctx.db
            .query("cartItems")
            .filter(q => q.eq(q.field("userId"), userId))
            .filter(q => q.eq(q.field("productId"), productId))
            .first();
            // collect returns an array and first is the query method and not array's
            return item;
        }
    // filter can only have one condition, use multiple filters. convex don't have and function because database cannot execute the jsx at run time for database, everything must exist.
    })
