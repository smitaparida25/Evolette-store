import React from "react";
import { useQuery, useMutation } from "convex/react";
import { Link } from "react-router-dom";
import "../App.css";

function Products() {
  const products = useQuery("products:getProducts");
  const addToCart = useMutation("cart:addToCart");
  const addToWishlist = useMutation("wishlist:addToWishlist");
  const removeFromWishlist = useMutation("wishlist:removeFromWishlist");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const cart = useQuery(
                   "cart:getCart",
                   user ? { userId: user._id } : "skip"
                 );


  const updateQuantity = useMutation("cart:updateQuantity");
  const removeItem = useMutation("cart:removeItem");

  const wishlist = useQuery("wishlist:getWishlist", { userId });

  if (!products) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "50px auto", padding: "0 20px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
        <Link to="/cart">
          <button className="cart-btn">🛒 Cart</button>
        </Link>
        <Link to="/wishlist">
                        <button className="cart-btn">Wishlist</button>
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

            const isWishlisted = wishlist?.some(
              (item) => item.productId === product._id
            );

            const cartItem = cart?.find((item) => item.productId === product._id);
            const quantityInCart = cartItem ? cartItem.quantity : 0;

            const handleToggleWishlist = async () => {
              const user = JSON.parse(localStorage.getItem("user"));
              if (!user) return alert("Please log in first.");
              if(isWishlisted){
                  const wishlistItem = wishlist.find(
                        (item) => item.productId === product._id
                      );
                  await removeFromWishlist({
                        id: wishlistItem._id,
                        userId: user._id,
                      });
                  }
              else{
                  await addToWishlist({
                                  productId: product._id,
                                  userId: user._id,
                                });
                  }

            };

            const handleAddToCart = async () => {
              try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (!user) return alert("Please log in first.");
                await addToCart({
                  productId: product._id,
                  userId: user._id,
                });

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

                {product.quantity === 0 ? (
                    <p style={{ color: "red", marginTop: "10px" }}>Out of Stock</p>
                    ) :
                quantityInCart > 0 ? (
                                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "10px" }}>
                                    <button
                                      onClick={() =>
                                        updateQuantity({ id: cartItem._id, change: -1, userId })
                                      }
                                      style={{ padding: "4px 10px", borderRadius: "5px" }}
                                    >
                                      -
                                    </button>

                                    <span>{quantityInCart}</span>

                                    <button
                                      onClick={() =>
                                        updateQuantity({ id: cartItem._id, change: 1, userId })
                                      }
                                      style={{ padding: "4px 10px", borderRadius: "5px" }}
                                    >
                                      +
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={handleAddToCart}
                                    style={{
                                      marginTop: "10px",
                                      padding: "8px 12px",
                                      background: "#4caf50",
                                      color: "white",
                                      borderRadius: "5px",
                                      cursor: "pointer",
                                    }}
                                  >
                                    Add to Cart
                                  </button>
                                )}




                <label className="wishlist-toggle">
                  <input
                    type="checkbox"
                    checked={isWishlisted}
                    onChange={handleToggleWishlist}
                  />
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
