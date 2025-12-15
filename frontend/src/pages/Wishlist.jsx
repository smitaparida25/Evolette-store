import { useQuery, useMutation } from "convex/react";
import React from "react";


export default function Wishlist() {
const user = JSON.parse(localStorage.getItem("user"));
const userId = user?._id;


const wishlist = useQuery("wishlist:getWishlist", userId ? { userId } : "skip");
const removeFromWishlist = useMutation("wishlist:removeFromWishlist");


if (!userId) {
return (
<div className="wishlist-state">
<h2>Wishlist</h2>
<p>Please log in to see your wishlist.</p>
</div>
);
}


if (wishlist === undefined) {
return <p className="wishlist-state">Loading wishlist…</p>;
}


if (wishlist.length === 0) {
return (
<div className="wishlist-state">
<h2>My Wishlist ❤️</h2>
<p>No items yet. Good taste takes time.</p>
</div>
);
}


return (
<div className="wishlist-page">
<h2>My Wishlist ❤️</h2>


<div className="wishlist-grid">
{wishlist.map((item) => (
<div key={item._id} className="wishlist-card">
<img
src={item.imageUrl}
alt={item.name}
className="wishlist-image"
/>


<div className="wishlist-info">
<p className="wishlist-name">{item.name}</p>
<p className="wishlist-price">₹{item.price}</p>
</div>


<button
className="wishlist-remove"
onClick={() => removeFromWishlist({ id: item._id, userId, })}
>
Remove
</button>
</div>
))}
</div>
</div>
);
}