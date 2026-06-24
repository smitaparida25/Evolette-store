import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import Wishlist from "./pages/Wishlist";
import ProductPage from "./pages/ProductPage";
import { useUserStore } from "./store/useUserStore";
import Checkout from "./pages/Checkout";

function App() {
    const setUser = useUserStore((s)=> s.setUser);

  useEffect(() => {
    fetch("http://localhost:3000/me", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          setUser(null);
          return null;
        }

        return res.json();
      })
      .then((data) => {
        if (data) {
          setUser(data.user);
        }
      })
      .catch(() => {
        setUser(null);
      });
  }, [setUser]); // dependency array; if it changes then run this but in this case that'll not happen as setuser(only created once other than that considered same) will not change so it's usually done to follow the react rule of having the things used inside the function being in dependency array.

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
