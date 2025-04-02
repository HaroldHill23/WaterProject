import { createContext, ReactNode, useContext, useState } from "react";
import { CartItem } from "../types/CartItem";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (projectId: number) => void;
  clearCart: () => void;
}

const cartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (temp) => temp.projectId === item.projectId
      );
      const updatedCart = prevCart.map((temp) =>
        temp.projectId === item.projectId
          ? {
              ...temp,
              donationAmount: temp.donationAmount + item.donationAmount,
            }
          : temp
      );

      return existingItem ? updatedCart : [...prevCart, item];
    });
  };

  const removeFromCart = (projectId: number) => {
    setCart((prevCart) =>
      prevCart.filter((temp) => temp.projectId !== projectId)
    );
  };

  const clearCart = () => {
    setCart(() => []);
  };

  return (
    <cartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context;
}
