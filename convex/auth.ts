import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const insertUser = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { email, password }) => {
    const existing = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), email))
      .first();

    if (existing) {
      throw new Error("User already exists.");
    }

    const newUser = await ctx.db.insert("users", { email, password });

    return {
      id: newUser,
      email: email,
    };
  },
});
