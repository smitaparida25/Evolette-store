import { useQuery } from "convex/react";
import React from "react";

export default function Wishlist() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  const wishlist = useQuery("wishlist:getWishlist", { userId });

  if (!userId) return <p>Please login to see wishlist</p>;

  if (!wishlist) return <p>Loading...</p>;

  if (wishlist.length === 0) return <p>No items in wishlist yet ❤️</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Wishlist ❤️</h2>
      <div className="wishlist-container">
        {wishlist.map((item) => (
          <div key={item._id} className="wishlist-card">
            <img src={item.imageUrl} width={120} height={120} />
            <p>{item.name}</p>
            <p>₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
