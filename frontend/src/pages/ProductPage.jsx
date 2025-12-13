import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";

function ProductPage() {
  const { productId } = useParams();

  const product = useQuery("products:getProductById", { productId });
  const addToCart = useMutation("cart:addToCart");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = async () => {
    if (!user) return alert("Please log in first.");
    await addToCart({ productId: product._id, userId });
  };

  return (
    <div style={{ maxWidth: "900px", margin: "50px auto", padding: "20px" }}>
      <div style={{ display: "flex", gap: "40px" }}>
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            width: "350px",
            height: "350px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />

        <div>
          <h1>{product.name}</h1>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            ₹{product.price}
          </p>

          <p style={{ margin: "15px 0" }}>{product.description}</p>

          <p>
            Status:{" "}
            <span style={{ color: product.quantity > 0 ? "green" : "red" }}>
              {product.quantity > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </p>

          {product.quantity > 0 && (
            <button
              onClick={handleAddToCart}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                background: "#4caf50",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
