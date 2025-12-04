import React from "react";
import { useQuery, useMutation } from "convex/react";
import { Link } from "react-router-dom";
import "../App.css";

function Products() {
  const products = useQuery("products:getProducts");
  const addToCart = useMutation("cart:addToCart");

  if (!products) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "50px auto", padding: "0 20px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
        <Link to="/cart">
          <button className="cart-btn">🛒 Cart</button>
        </Link>
      </div>

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Products</h2>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((product) => {

            const handleAddToCart = async () => {
              try {
                const user = JSON.parse(localStorage.getItem("user"));
                console.log("ADD TO CART PAYLOAD:", {
                  productId: product._id,
                  userId: user._id,
                });

                if (!user) {
                  alert("Please log in first.");
                  return;
                }

                await addToCart({
                  productId: product._id,
                  userId: user._id,
                });


                alert(`${product.name} added to cart ✅`);
              } catch (err) {
                console.error(err);
                alert("Failed to add to cart ❌");
              }
            };

            return (
              <div
                key={product._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "15px",
                  textAlign: "center",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  position: "relative",
                }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
                <h3 style={{ margin: "10px 0" }}>{product.name}</h3>
                <p>Price: ₹{product.price}</p>
                <p>Quantity: {product.quantity}</p>
                <button
                  onClick={handleAddToCart}
                  style={{
                    marginTop: "10px",
                    padding: "8px 15px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Add to Cart
                </button>
                <label class="wishlist-toggle">
                   <input type="checkbox" />
                   <span>❤️</span>
                 </label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Products;
