import React, { createContext, useContext, useState } from "react";
import TopBar from "./TopBar.jsx";
import SideBar from "./SideBar.jsx";
import Products from "./products.jsx";
import Cart from "./cart.jsx";
import CurProduct from "./CurrentProduct.jsx";
import BottomBar from "./BottomBar.jsx";

const AppContext = createContext();

export function AppWrapper() {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [ItemPerPage, SetItemsPerPage] = useState(40);

  const toggleSwitch = () => setIsSwitchOn((prev) => !prev);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <AppContext.Provider
      value={{
        isSwitchOn,
        toggleSwitch,
        searchQuery,
        setSearchQuery,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        ItemPerPage,
        SetItemsPerPage, // <-- Add this!
      }}
    >
      <TopBar />
      <SideBar />
      <Products />
      <Cart />
      <CurProduct />
      <BottomBar />
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
