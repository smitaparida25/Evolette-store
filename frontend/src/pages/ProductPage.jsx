import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { Link } from "react-router-dom";

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
    <div>
        <Link to="/" className="logo-link">Evolette</Link>
        <div className="product-image-container">
            <img
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
              />

              <button className="360-view">
                360°
              </button>
        </div>
      <div style={{ display: "flex", gap: "40px" }}>

        <div className="product-description-container">
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-price">₹{product.price}</p>
            <p className="product-desc">{product.description}</p>
          </div>

          <div className="product-cta">
            <button className="add-to-cart-btn">
              Add to Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductPage;
