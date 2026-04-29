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

export const getProductById = query({
  args: {
    productId: v.id("products"),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.productId);

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  },
});

export const seedProducts = mutation({
  handler: async (ctx) => {
    const dummyProducts = [
      {
        name: "Strawberry Keychain",
        price: 199,
        quantity: 20,
        imageUrl: "/images/strawberry.png",
        description: "A sweet little strawberry to carry with you.",
        productDetails: "Handcrafted strawberry shaped crochet keychain.",
        materialsAndCare: "100% cotton yarn. Spot clean only."
      },
      {
        name: "Sunflower Hair Clip",
        price: 149,
        quantity: 15,
        imageUrl: "/images/sunflower.png",
        description: "Brighten your day with a tiny sunflower.",
        productDetails: "Secure metal clip covered with soft crochet.",
        materialsAndCare: "Cotton blend. Wipe with damp cloth."
      },
      {
        name: "Monstera Leaf Bookmark",
        price: 129,
        quantity: 10,
        imageUrl: "/images/leaf.png",
        description: "Perfect for plant lovers who read.",
        productDetails: "Beautifully detailed green monstera leaf.",
        materialsAndCare: "Stiffened cotton yarn."
      },
      {
        name: "Frog Buddy Keychain",
        price: 249,
        quantity: 50,
        imageUrl: "/images/frog.png",
        description: "Your new best friend on a keychain.",
        productDetails: "Adorable round frog head with safety eyes.",
        materialsAndCare: "Cotton blend. Spot clean only."
      }
    ];

    for (const product of dummyProducts) {
      await ctx.db.insert("products", product);
    }
    return "Seeded 4 magical products!";
  }
});
