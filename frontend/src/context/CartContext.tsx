"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface CartItem {
  product: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  size: string;
  customText?: string;
  customImage?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQty: (productId: string, size: string, qty: number) => void;
  clearCart: () => void;
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existItem = prev.find((x) => x.product === item.product && x.size === item.size);
      if (existItem) {
        return prev.map((x) => (x.product === item.product && x.size === item.size ? item : x));
      } else {
        return [...prev, item];
      }
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setCartItems((prev) => prev.filter((x) => !(x.product === productId && x.size === size)));
  };

  const updateQty = (productId: string, size: string, qty: number) => {
    setCartItems((prev) =>
      prev.map((x) => (x.product === productId && x.size === size ? { ...x, qty } : x))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 1000 ? 0 : 100;
  const totalPrice = itemsPrice + shippingPrice;
  const cartTotal = totalPrice;
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQty,
      clearCart, 
      itemsPrice, 
      shippingPrice, 
      totalPrice,
      cartTotal,
      cartCount
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
