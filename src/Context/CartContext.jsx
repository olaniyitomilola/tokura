import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage or empty
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch {
      return [];
    }
  });

  // Controls modal visibility
  const [isOpen, setIsOpen] = useState(false);

  // Persist cart to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {
      // Fail silently if storage is unavailable
    }
  }, [cart]);

  // Add item to cart (increment qty if same id + size)
const addToCart = (item) => {
  setCart((prevCart) => {
    const exists = prevCart.some(
      (cartItem) => cartItem.id === item.id && cartItem.size === item.size
    );

    if (exists) {
      // ❌ Item already exists – don’t add again
      return prevCart;
    }

    // ✅ Use passed quantity, fallback to 1
    return [...prevCart, { ...item, quantity: item.quantity || 1 }];
  });

  return true;
};

  // Remove item by id and size
  const removeFromCart = (id, size) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.size === size))
    );
  };
  const clearCart = () => {
  setCart([]);
};
const updateQuantity = (id, size, quantity) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.id === id && item.size === size
        ? { ...item, quantity: Math.max(1, quantity) } // minimum quantity = 1
        : item
    )
  );
};



  // Toggle modal visibility
  const toggleCart = () => setIsOpen((prev) => !prev);
  // Open modal
  const openCart = () => setIsOpen(true);
  // Close modal
  const closeCart = () => setIsOpen(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        isOpen,
        toggleCart,
        openCart,
        closeCart,
        clearCart,
        updateQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for easier context consumption
export const useCart = () => useContext(CartContext);
