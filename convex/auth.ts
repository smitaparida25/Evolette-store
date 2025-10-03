import bcrypt from "bcrypt";
import{ mutation } from "./_generated/server";
// used to validate the arg types
import{ v } from "convex";

export const signupUser = mutation({
    args: {
        email: v.string(),
        password: v.string(),
    },

// handler is a function that will run when signupUser is called (it's async because it does the database calls and bcrypt that returns promise first)
handler: async(ctx, {email,password}) => {
    const existing = await ctx.db.query("users").filter(q => q.eq(q.field("email"), email)).first();
    if(existing){
        throw new Error("User Already Exits.");
        }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await ctx.db.insert("users",{
        email,
        password: hashedPassword
        });
    return {
          id: newUser._id,
          email: newUser.email,
        };
    },
  });


