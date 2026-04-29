import React, { useState, useMemo } from "react";
import { useQuery, useMutation } from "convex/react";
import { Link } from "react-router-dom";
import { Search, Heart, ShoppingBag, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import "../App.css";

function Products() {
  const products = useQuery("products:getProducts");
  const addToCart = useMutation("cart:addToCart");
  const addToWishlist = useMutation("wishlist:addToWishlist");
  const removeFromWishlist = useMutation("wishlist:removeFromWishlist");
  const seedProducts = useMutation("products:seedProducts");

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?._id;

  const cart = useQuery("cart:getCart", user ? { userId: user._id } : "skip");
  const wishlist = useQuery("wishlist:getWishlist", userId ? { userId } : "skip");

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [category, setCategory] = useState("all");

  const updateQuantity = useMutation("cart:updateQuantity");
  const removeItem = useMutation("cart:removeItem");

  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];
    let result = [...products];

    // Filter by Search
    if (search) {
      result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    // Filter by Category
    if (category !== "all") {
      if (category === "keychain") result = result.filter(p => p.name.toLowerCase().includes("keychain") || p.name.toLowerCase().includes("bow"));
      if (category === "earrings") result = result.filter(p => p.name.toLowerCase().includes("earring") || p.name.toLowerCase().includes("drop"));
      if (category === "clip") result = result.filter(p => p.name.toLowerCase().includes("clip") || p.name.toLowerCase().includes("pin"));
    }

    // Sort
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "name-asc") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "name-desc") result.sort((a, b) => b.name.localeCompare(a.name));

    return result;
  }, [products, search, sortBy, category]);


  if (!products) return <div className="loading-state">Loading Magic...</div>;

  return (
    <div className="products-page-wrapper">
      <div className="products-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <h1 className="products-title">Shop Collection</h1>
          {products && products.length < 20 && (
            <button
              className="submit-pill"
              style={{ height: '36px', padding: '0 20px', fontSize: '0.8rem', marginTop: 0 }}
              onClick={async () => {
                try {
                  await seedProducts();
                  alert("Magic added! 4 new beautiful items have been injected into your store.");
                } catch (e) {
                  alert("Error: Make sure your Convex backend is running.");
                }
              }}
            >
              Add Demo Products ✨
            </button>
          )}
        </div>

        <div className="products-toolbar">
          <div className="search-pill">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-pill">
            <SlidersHorizontal size={16} />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">All Items</option>
              <option value="keychain">Keychains & Bows</option>
              <option value="earrings">Earrings</option>
              <option value="clip">Hair Clips</option>
            </select>
          </div>

          <div className="sort-pill">
            <ArrowUpDown size={16} />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
            </select>
          </div>

          <div className="action-pills-group">
            <Link to="/wishlist" className="icon-pill">
              <Heart size={20} />
            </Link>
            <Link to="/cart" className="icon-pill">
              <ShoppingBag size={20} />
            </Link>
          </div>
        </div>
      </div>

      <div className="products-grid">
        {filteredAndSortedProducts.length === 0 ? (
          <div className="empty-state">
            <p>No items found for your selection.</p>
          </div>
        ) : (
          filteredAndSortedProducts.map((product) => {
            const isWishlisted = wishlist?.some((item) => item.productId === product._id);
            const cartItem = cart?.find((item) => item.productId === product._id);
            const quantityInCart = cartItem ? cartItem.quantity : 0;

            const handleToggleWishlist = async (e) => {
              e.preventDefault();
              if (!user) return alert("Please log in first!");

              if (isWishlisted) {
                const wishlistItem = wishlist.find((item) => item.productId === product._id);
                await removeFromWishlist({ id: wishlistItem._id, userId });
              } else {
                await addToWishlist({ productId: product._id, userId });
              }
            };

            const handleAddToCart = async (e) => {
              e.preventDefault();
              if (!user) return alert("Please log in first!");
              try {
                await addToCart({ productId: product._id, userId });
              } catch (err) {
                console.error(err);
                alert("Failed to add to cart");
              }
            };

            return (
              <div key={product._id} className="product-card">
                <Link to={`/product/${product._id}`} className="card-link" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div className="card-image-wrapper">
                    <img src={product.imageUrl} alt={product.name} />
                    <button
                      className={`wishlist-floating-btn ${isWishlisted ? 'active' : ''}`}
                      onClick={handleToggleWishlist}
                    >
                      <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>
                  </div>

                  <div className="card-content">
                    <h3>{product.name}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 10px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {product.description || "A magical handcrafted piece just for you."}
                    </p>
                    <p className="card-price">₹{product.price}</p>

                    {product.quantity === 0 ? (
                      <p className="out-of-stock-text">Out of Stock</p>
                    ) : quantityInCart > 0 ? (
                      <div className="quantity-pill small-quantity" onClick={(e) => e.preventDefault()}>
                        <button onClick={() => {
                          if (quantityInCart === 1) removeItem({ id: cartItem._id, userId });
                          else updateQuantity({ id: cartItem._id, change: -1, userId });
                        }}>-</button>
                        <span>{quantityInCart}</span>
                        <button onClick={() => updateQuantity({ id: cartItem._id, change: 1, userId })}>+</button>
                      </div>
                    ) : (
                      <button className="submit-pill small-submit" onClick={handleAddToCart}>
                        Add to Cart
                      </button>
                    )}
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Products;
