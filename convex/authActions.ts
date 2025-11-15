import { action } from "./_generated/server";
import { v } from "convex/values";
import bcrypt from "bcryptjs";
import { mutation } from "./_generated/server";

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
        const user = await ctx.runQuery("auth:getUserByEmail", { email });

        if (!user) {
          throw new Error("No user found");
        }

        const isValid = await bcrypt.compare(password, user.password);
                if(!isValid){
                    throw new Error("Invalid Password");
                }
            return { _id: user._id, email: user.email };
        },

    });
