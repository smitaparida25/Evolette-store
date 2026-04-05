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
    const orderId = await ctx.db.insert("orders", {
      userId: args.userId,
      status: "PLACED",
      totalAmount: 0,
      address: args.address,
      createdAt: Date.now(),
    });

    return orderId;
  },
});