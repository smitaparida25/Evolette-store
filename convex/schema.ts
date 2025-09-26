import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    name: v.string(),
    price: v.number(),
    quantity: v.number(),
    imageUrl: v.string(),
  }),
  cartItems: defineTable({
    productId: v.id("products"),
    quantity: v.number(),
    userId: v.string(),
  }),
});
