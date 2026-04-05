import React from "react";
import { useQuery } from "convex/react";
import { useUserStore } from "../store/useUserStore";

function Checkout() {
    const user = useUserStore((s) => s.user);
    const cartItems = useQuery(
        "cart:getCart",
        user ? {userId : user._id} : "skip"
        );
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return(
        <div className="checkout">
            <div className="shipping">
                <h2>Shipping Address</h2>
                <form>
                    <input type="text" placeholder="Full Name" />
                    <input type="tel" placeholder="Phone Number" />
                    <input type="text" placeholder="Address" />
                    <input type="text" placeholder="City" />
                    <input type="text" placeholder="State" />
                    <input type="text" placeholder="Pincode" />
                </form>

                <h2> Payment Method </h2>
                    <div className="payment-method">
                        <label>
                            <input type="radio" name="payment" value="upi"/>
                            Pay with UPI
                            </label>
                            <input
                                type="text"
                                placeholder="Enter UPI ID (example@upi)"
                                className="upi-input"
                              />
                              <button className="verify-btn">
                                    Verify
                                  </button>
                        </div>
            </div>
            <div className="summary">
              <h2>Order Summary</h2>
               <p>Total Price: ₹{totalPrice}</p>
              <button className="place-order">Place Order</button>
            </div>
        </div>
        );
    }

export default Checkout;