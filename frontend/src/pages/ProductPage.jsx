import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { Link } from "react-router-dom";
import "../App.css";

function ProductPage() {
    const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id;
  const { productId } = useParams(); // use params returns an object, braces is for object destructuring, here we're making a variable productId which holds the value of product id. it's the same as const productId = useParams().productId;

  const product = useQuery("products:getProductById", { productId });
  const cartItem = useQuery("cart:getCartItem",userId ? { userId, productId } : "skip");
  const updateQuantity = useMutation("cart:updateQuantity");

  const addToCart = useMutation("cart:addToCart");
  if (!product) return <p>Loading...</p>;
  const imageSrc = product.imageUrl.trim().startsWith("/")
                  ? product.imageUrl.trim()
                  : `/${product.imageUrl.trim()}`;


  const handleAddToCart = async () => {
    if (!user) return alert("Please log in first.");
    await addToCart({ productId: product._id, userId });
  };

  return (
    <div>
        <Link to="/" className="logo-link">Evolette</Link>
        <div className="product-image-container">
            <img
                src={imageSrc}
                alt={product.name}
                className="product-image"
              />

              <button className="btn-360-view">
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
            {!cartItem ? (
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
            ) : (
              <div className="quantity-controls">
                <button
                onClick={() => updateQuantity({ id: cartItem._id, change: -1, userId: user._id })
                }>-</button>
                <span>{cartItem.quantity}</span>
                <button
                onClick={() => updateQuantity({ id:  cartItem._id, change: 1, userId: user._id })
                }>+</button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductPage;
