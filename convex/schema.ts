import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        email: v.string(),
        password: v.string(),
    }),
  products: defineTable({
    name: v.string(),
    price: v.number(),
    quantity: v.number(),
    imageUrl: v.string(),
    description: v.string(),
    productDetails: v.string(),
    materialsAndCare: v.string(),
  }),

  cartItems: defineTable({
    productId: v.id("products"),
    quantity: v.number(),
    userId: v.id("users"),
  }),

  wishlist: defineTable({
      userId: v.id("users"),
      productId: v.id("products"),
      }),

   orders: defineTable({
      userId: v.id("users"),
      status: v.string(),
      totalAmount: v.number(),
      createdAt: v.number(),
    }),

    orderItems: defineTable({
      orderId: v.id("orders"),
      productId: v.id("products"),
      quantity: v.number(),
      priceAtTime: v.number(),
    }),
});
