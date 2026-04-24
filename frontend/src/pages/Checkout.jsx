import React from "react";
import { useQuery } from "convex/react";
import { useState } from "react";
import { useUserStore } from "../store/useUserStore";
import {useMutation} from "convex/react";

function Checkout() {
    const user = useUserStore((s) => s.user);

    const createOrder = useMutation("orders:createOrder");

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");

    const cartItems = useQuery(
        "cart:getCart",
        user ? {userId : user._id} : "skip"
        );
    if (!user) return <div>Loading user...</div>;
    if (cartItems === undefined) return <div>Loading cart...</div>;

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

const handlePlaceOrder = async (e) => {
    // prevent loading
    e.preventDefault();
  try {
    const orderId = await createOrder({
      userId: user._id,
      address: { name, phone, street, city, state, pincode },
    });

    console.log("Order created:", orderId);
    alert("Order placed successfully!");

  } catch (err) {
    console.log("FULL ERROR:", err);

    const code = err?.data?.code;

    if (code === "EMPTY_CART") {
      alert("Your cart is empty.");
    } else if (code === "INVALID_ADDRESS") {
      alert("Please fill all address fields properly.");
    } else {
      alert("Something went wrong.");
    }
  }
  }

    return(
        <form onSubmit={handlePlaceOrder}>
        <div className="checkout">
            <div className="shipping">
                <h2>Shipping Address</h2>
                    <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                    <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
                    <input type="text" placeholder="Street" value={street} onChange={(e) => setStreet(e.target.value)} required/>
                    <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required/>
                    <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required/>
                    <input type="text" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} required/>

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
              <button type="submit" className="place-order">Place Order</button>
            </div>
        </div>
        </form>
        );
    }

export default Checkout;