import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../data/mockData';

export interface CartItem {
  product: Product;
  quantity: number;
  flavor?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, flavor?: string) => void;
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

  const addToCart = (product: Product, quantity: number, flavor?: string) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id && item.flavor === flavor
      );

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        // Add new item
        return [...prevItems, { product, quantity, flavor }];
      }
    });
  };

  const removeFromCart = (productId: string, flavor?: string) => {
    setItems(prevItems => 
      prevItems.filter(item => 
        !(item.product.id === productId && item.flavor === flavor)
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, flavor?: string) => {
    setItems(prevItems => {
      const newItems = [...prevItems];
      const itemIndex = newItems.findIndex(
        item => item.product.id === productId && item.flavor === flavor
      );
      
      if (itemIndex >= 0) {
        if (quantity <= 0) {
          newItems.splice(itemIndex, 1);
        } else {
          newItems[itemIndex].quantity = quantity;
        }
      }
      
      return newItems;
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      getItemCount 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
