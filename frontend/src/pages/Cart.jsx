import React from "react";
import { useQuery, useMutation } from "convex/react";
import { useUserStore } from "../store/useUserStore";

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
    <div style={{ maxWidth: "800px", margin: "50px auto", padding: "0 20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Your Cart</h2>
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
               <p style={{ flex: 1, marginLeft: "15px" }}>{item.name}</p>
               <p>Price: ₹{item.price * item.quantity}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button

                    onClick={() => updateQuantity({ id: item._id, change: -1, userId: user._id })}
                    style={{
                      padding: "4px 8px",
                      borderRadius: "5px",
                      backgroundColor: "#ddd",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity({ id: item._id, change: 1,userId: user._id })}
                    style={{
                      padding: "4px 8px",
                      borderRadius: "5px",
                      backgroundColor: "#ddd",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeItem({ id: item._id,userId: user._id })}
                    style={{
                      marginLeft: "10px",
                      padding: "4px 10px",
                      borderRadius: "5px",
                      backgroundColor: "#ff4d4d",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>

               </div>
          </li>
        ))}
      </ul>
      <h3>Total Items: {totalQuantity}</h3>
      <h3>Total Price: {totalPrice}</h3>
    </div>
  );
}

export default Cart;
