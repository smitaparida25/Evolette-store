import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { ChevronLeft } from "lucide-react";
import "../App.css";

function ProductPage() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?._id;
  const { productId } = useParams();

  const product = useQuery("products:getProductById", { productId });
  const cartItem = useQuery("cart:getCartItem", userId ? { userId, productId } : "skip");
  const updateQuantity = useMutation("cart:updateQuantity");
  const addToCart = useMutation("cart:addToCart");

  if (!product) return <div className="loading-state">Loading...</div>;

  const imageSrc = product.imageUrl.trim().startsWith("/")
    ? product.imageUrl.trim()
    : `/${product.imageUrl.trim()}`;

  const handleAddToCart = async () => {
    if (!user) return alert("Please log in first.");
    await addToCart({ productId: product._id, userId });
  };

  return (
    <div className="product-page-wrapper">
      <Link to="/" className="back-btn-pill product-back" aria-label="Back to Home">
        <ChevronLeft size={24} />
      </Link>
      
      <div className="product-content-split">
        <div className="product-image-side">
          <img src={imageSrc} alt={product.name} className="product-main-image" />
          <button className="btn-360-view">
            360° View
          </button>
        </div>

        <div className="product-details-side">
          <h1 className="product-title-sleek">{product.name}</h1>
          <p className="product-price-sleek">₹{product.price}</p>
          
          <div className="product-details-minimal">
            <p>{product.description}</p>
            {product.productDetails && (
              <p className="product-materials">
                <strong>Details:</strong> {product.productDetails}
              </p>
            )}
            <p className="product-materials">
              <strong>Materials:</strong> Crafted using high-quality yarn, soft, breathable, and lightweight.
            </p>
          </div>

          <div className="product-actions-sleek">
            {!cartItem ? (
              <button className="submit-pill" onClick={handleAddToCart}>
                Add to Cart
              </button>
            ) : (
              <div className="quantity-pill">
                <button onClick={() => updateQuantity({ id: cartItem._id, change: -1, userId: user._id })}>-</button>
                <span>{cartItem.quantity}</span>
                <button onClick={() => updateQuantity({ id: cartItem._id, change: 1, userId: user._id })}>+</button>
              </div>
            )}
            
            <p className="delivery-info-sleek">
              <strong>Complimentary Express Delivery</strong><br />
              or Collect in Store: Wed, Jan 14 – Thu, Jan 15
            </p>
          </div>
        </div>
      </div>

      <div className="you-may-also-like-sleek">
        <h2>You may also like</h2>
        <div className="similar-products-grid">
          <div className="similar-card"><img src="/images/earrings.jpeg" alt="product"/></div>
          <div className="similar-card"><img src="/images/earrings.jpeg" alt="product"/></div>
          <div className="similar-card"><img src="/images/earrings.jpeg" alt="product"/></div>
          <div className="similar-card"><img src="/images/earrings.jpeg" alt="product"/></div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
