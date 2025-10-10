import { action } from "./_generated/server";
import { v } from "convex/values";
import bcrypt from "bcryptjs";

export const signupUser = action({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { email, password }) => {
    // Hash the password in the action (where async operations are allowed)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Call the mutation to insert the user
    return await ctx.runMutation("auth:insertUser", {
      email,
      password: hashedPassword,
    });
  },
});
