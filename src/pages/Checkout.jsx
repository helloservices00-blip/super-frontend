import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!user) return alert('Please login');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API}/api/orders`, { items: cart }, { headers: { Authorization: `Bearer ${token}` } });
      alert('Order placed successfully!');
      setCart([]);
    } catch (err) {
      console.error(err);
      alert('Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) return <p>Your cart is empty.</p>;

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Checkout</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cart.map(item => (
          <li key={item._id}>
            {item.name} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <h3>Total: ${total.toFixed(2)}</h3>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Processing...' : 'Place Order'}
      </button>
    </div>
  );
}
