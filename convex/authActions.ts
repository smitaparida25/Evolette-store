import { action } from "./_generated/server";
import { v } from "convex/values";
import bcrypt from "bcryptjs";

export const signupUser = action({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await ctx.runMutation("auth:insertUser", {
      email,
      password: hashedPassword,
    });
  },
});

export const loginUser = action({
    args: {
        email: v.string(),
        password: v.string(),
        },
    handler: async (ctx, {email,password}) => {
        const user = await ctx.db.query("users").filter(q=> q.eq(q.field("email"), email)).first();
        if(!user){
            throw new Error("No user");
            }
        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid){
            throw new Error("Invalid Password");
            }
        return { id: user._id, email: user.email };
        },
    });
