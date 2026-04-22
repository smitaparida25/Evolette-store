// create order in database
// create orderItems in database
// clear cart

import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createOrder = mutation({
  args: {
    userId: v.id("users"),
    address: v.object({
      name: v.string(),
      phone: v.string(),
      street: v.string(),
      city: v.string(),
      state: v.string(),
      pincode: v.string(),
    }),
  },

  handler: async (ctx, args) => {
       const { address } = args;
      const fields = ["name", "phone", "street", "city", "state", "pincode"];

      for(const field of fields){
          const value = address[field];

          if(value.trim() == ""){
              throw new Error("INVALID_ADDRESS");
              }
      }
      const cartItems = await ctx.db.query("cartItems").withIndex("by_userId", (q) => q.eq("userId", args.userId)).collect();

      if (!cartItems.length) {
        throw new Error("EMPTY_CART");
      }
      // calculate totalAmount
      let totalPrice = 0;

      for (const item of cartItems) {
        const product = await ctx.db.get(item.productId);
        if (!product) continue;
        totalPrice += product.price * item.quantity;
      }

      // insert into order table
    const orderId = await ctx.db.insert("orders", {
      userId: args.userId,
      status: "PLACED",
      totalAmount: totalPrice,
      address: args.address,
      createdAt: Date.now(),
    });

    // inset into order items table
    for(const item of cartItems){
        const product = await ctx.db.get(item.productId);
        if (!product) {
            await ctx.db.delete(item._id);
            continue;
        }
        await ctx.db.insert("orderItems", {
            orderId,
            productId: item.productId,
            quantity: item.quantity,
            priceAtTime: product.price,
            })
        }
    // clear cart
    await Promise.all(
      cartItems.map((item) => ctx.db.delete(item._id))
    );

    return orderId;
  },
});