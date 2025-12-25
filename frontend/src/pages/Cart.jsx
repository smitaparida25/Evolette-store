import React from "react";
import { useQuery, useMutation } from "convex/react";
import { useUserStore } from "../store/useUserStore";
import { Link } from "react-router-dom";

function Cart() {
  const user = useUserStore((s) => s.user);

  const cartItems = useQuery(
    "cart:getCart",
    user ? { userId: user._id } : "skip"
  );

  const updateQuantity = useMutation("cart:updateQuantity");
  const removeItem = useMutation("cart:removeItem");

  if (!user) return <p>Please log in to view your cart.</p>;



  if (!cartItems) return <p>Loading...</p>;
  if (cartItems.length === 0) return <p>Your cart is empty 🛒</p>;

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum,item) => sum+item.price * item.quantity,0);


  return (
      <div
        style={{
          maxWidth: "1000px",
          margin: "50px auto",
          padding: "0 20px",
        }}
      >
        <Link to="/" className="logo-link">Evolette</Link>

        <div
          style={{
            display: "flex",
            gap: "30px",
            marginTop: "20px",
            alignItems: "flex-start",
          }}
        >
          <div style={{ flex: 2 }}>
            <h2 style={{ marginBottom: "20px" }}>Your Cart</h2>

            <ul style={{ listStyle: "none", padding: 0 }}>
              {cartItems.map((item) => (
                <li
                  key={item._id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "15px",
                    marginBottom: "10px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{ width: "60px", height: "60px", borderRadius: "8px" }}
                    />

                    <p style={{ flex: 1 }}>{item.name}</p>
                    <p>₹{item.price * item.quantity}</p>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <button
                        onClick={() =>
                          updateQuantity({ id: item._id, change: -1, userId: user._id })
                        }
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity({ id: item._id, change: 1, userId: user._id })
                        }
                      >
                        +
                      </button>

                      <button class="remove-btn"
                        onClick={() => removeItem({ id: item._id, userId: user._id })}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div
                  style={{
                    flex: 1,
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "20px",
                    position: "sticky",
                    top: "115px",
                  }}
                >
                  <h3>Order Summary</h3>
                  <p>Total Items: {totalQuantity}</p>
                  <p>Total Price: ₹{totalPrice}</p>

                  <button
                    style={{
                      width: "100%",
                      marginTop: "15px",
                      padding: "10px",
                      backgroundColor: "black",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>

  );
}

export default Cart;
