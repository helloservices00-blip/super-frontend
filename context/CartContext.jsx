import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`${API}/api/cart`, { headers: { Authorization: `Bearer ${token}` } });
        setCart(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCart();
  }, [user]);

  const addToCart = async (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p._id === product._id);
      if (existing) {
        return prev.map((p) =>
          p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });

    if (!user) return;
    try {
      await axios.post(`${API}/api/cart`, { productId: product._id, quantity: 1 }, { headers: { Authorization: `Bearer ${token}` } });
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (productId) => {
    setCart((prev) => prev.filter((p) => p._id !== productId));
    if (!user) return;
    try {
      await axios.delete(`${API}/api/cart/${productId}`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (err) {
      console.error(err);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    setCart((prev) =>
      prev.map((p) => (p._id === productId ? { ...p, quantity } : p))
    );
    if (!user) return;
    try {
      await axios.post(`${API}/api/cart`, { productId, quantity }, { headers: { Authorization: `Bearer ${token}` } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
