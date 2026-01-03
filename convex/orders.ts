import { mutation } from "./_generated/server";
import { v } from "convex/values";


export const createOrderFromCart = mutation({
    args: {userId: v.string()},
    handler: async(ctx, {userId}) =>{
        if(!userId) throw new Error("No userId");

        const cartItems = await ctx.db.query("cartItems").filter((q) =>q.eq(q.field("userId"), userId)).collect();

        if(cartItems.length == 0) throw new Error("cart is empty");

        let totalAmount = 0;
        for(const item of cartItems){
            const product = await ctx.db.get(item.productId);
            if(!product) throw new Error("Product not found.");
            totalAmount += product.price * item.quantity;
            }

        const orderId = await ctx.db.insert("orders",{
            userId,
            status:"PENDING",
            totalAmount,
            createdAt: Date.now(),
            });

        for(const item of cartItems){
            const product = await ctx.db.get(item.productId);
             await ctx.db.insert("orderItems", {
                    orderId,
                    productId: item.productId,
                    quantity: item.quantity,
                    priceAtTime: product!.price,
                  });
                }
            }
    })