import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import "../App.css";

function ProductPage() {
    const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id;
  const { productId } = useParams(); // use params returns an object, braces is for object destructuring, here we're making a variable productId which holds the value of product id. it's the same as const productId = useParams().productId;

  const SECTIONS = {
    DETAILS: "details",
    MATERIALS: "materials",
    COMMITMENT: "commitment",
  };

  // key value pairs should be an object and for defining objects we use {}

  const [openSection, setOpenSection] = useState(null); // openSection is a state variable, it can store any value; setOpenSection is a function that updates the state; in starting it's null.
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

            <section className = "accordion">
            <div className="section">
                <div className = "header" onClick={() => setOpenSection(openSection === SECTIONS.DETAILS ? null : SECTIONS.DETAILS)}>
                    <span>Details</span>
                    <ChevronDown
                      size={16}
                      className={openSection === SECTIONS.DETAILS ? "open" : ""}
                    />
                    </div>
                    {openSection === SECTIONS.DETAILS && <div className="content">{product.productDetails}</div>}
                </div>
                <div className="section">
                <div className = "header" onClick={() => setOpenSection(openSection === SECTIONS.MATERIALS ? null : SECTIONS.MATERIALS)}>
                    <span>Materials</span>
                    <ChevronDown
                    size={16}
                    className={openSection === SECTIONS.MATERIALS ? "▲" : "▼"}
                    />
                    </div>
                    {openSection === SECTIONS.MATERIALS && <div className="content">{"Crafted using high-quality yarn, crochet fabric is soft, breathable, and lightweight. The looped structure gives it natural flexibility and texture, making it comfortable to wear while maintaining durability and shape."}</div>}
                </div>

                <div className="section">
                <div className = "header" onClick={() => setOpenSection(openSection === SECTIONS.COMMITMENT ? null : SECTIONS.COMMITMENT)}>
                    <span>Commitment</span>
                    <ChevronDown
                    size= {16}
                    className={openSection === SECTIONS.COMMITMENT ? "▲" : "▼"}
                    />
                    </div>
                    {openSection === SECTIONS.COMMITMENT && <div className="content">{"We are committed to thoughtful craftsmanship, responsible sourcing, and enduring quality. Every piece is created with attention to detail and care, ensuring it meets the highest standards of design, comfort, and longevity."}</div>}
                </div>
                </section>
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
        <p className="delivery-info">
                      <strong>Estimated complimentary Express delivery</strong><br />
                      or Collect in Store: Wed, Jan 14 – Thu, Jan 15
                    </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ProductPage;
