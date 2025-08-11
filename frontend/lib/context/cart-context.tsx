"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";

interface CartContextType {
  isCartPopoverOpen: boolean;
  openCartPopover: () => void;
  closeCartPopover: () => void;
  triggerCartRefresh: () => void;
  shouldRefreshCart: boolean;
  cartItemCount: number;
  setCartItemCount: (count: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [isCartPopoverOpen, setIsCartPopoverOpen] = useState(false);
  const [shouldRefreshCart, setShouldRefreshCart] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  const openCartPopover = useCallback(() => {
    setIsCartPopoverOpen(true);
  }, []);

  const closeCartPopover = useCallback(() => {
    setIsCartPopoverOpen(false);
  }, []);

  const triggerCartRefresh = useCallback(() => {
    console.log("Cart refresh triggered");
    setShouldRefreshCart(true);
    // Reset after a short delay to ensure the refresh is processed
    setTimeout(() => {
      setShouldRefreshCart(false);
      console.log("Cart refresh flag reset");
    }, 200);
  }, []);

  // Auto-reset refresh flag if it's been true for too long
  useEffect(() => {
    if (shouldRefreshCart) {
      const timer = setTimeout(() => {
        setShouldRefreshCart(false);
        console.log("Cart refresh flag auto-reset");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [shouldRefreshCart]);

  const value: CartContextType = {
    isCartPopoverOpen,
    openCartPopover,
    closeCartPopover,
    triggerCartRefresh,
    shouldRefreshCart,
    cartItemCount,
    setCartItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
