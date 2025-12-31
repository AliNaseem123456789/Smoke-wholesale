import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  productId: string;
  name?: string;
  quantity: number;
  flavor?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: string, name?: string, quantity?: number, flavor?: string) => void;
  removeFromCart: (productId: string, flavor?: string) => void;
  updateQuantity: (productId: string, quantity: number, flavor?: string) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Load cart from localStorage
    const storedCart = localStorage.getItem('sootaCart');
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('sootaCart', JSON.stringify(items));
  }, [items]);

  const addToCart = (productId: string, name?: string, quantity: number = 1, flavor?: string) => {
    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(
        item => item.productId === productId && item.flavor === flavor
      );

      if (existingIndex >= 0) {
        const newItems = [...prevItems];
        newItems[existingIndex].quantity += quantity;
        return newItems;
      } else {
        return [...prevItems, { productId, name, quantity, flavor }];
      }
    });
  };

  const removeFromCart = (productId: string, flavor?: string) => {
    setItems(prevItems => prevItems.filter(
      item => !(item.productId === productId && item.flavor === flavor)
    ));
  };

  const updateQuantity = (productId: string, quantity: number, flavor?: string) => {
    setItems(prevItems => {
      const newItems = [...prevItems];
      const index = newItems.findIndex(item => item.productId === productId && item.flavor === flavor);
      if (index >= 0) {
        if (quantity <= 0) newItems.splice(index, 1);
        else newItems[index].quantity = quantity;
      }
      return newItems;
    });
  };

  const clearCart = () => setItems([]);

  const getItemCount = () => items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, getItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
