import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function OrdersAdmin() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!user?.isAdmin) return;
    axios.get(`${API}/api/admin/orders`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setOrders(res.data))
      .catch(console.error);
  }, [user]);

  if (!user?.isAdmin) return <p>Access denied</p>;

  return (
    <div>
      <h2>All Orders</h2>
      {orders.length === 0 ? <p>No orders yet.</p> : (
        <ul>
          {orders.map(o => (
            <li key={o._id}>
              <strong>{o.user?.name || 'Unknown User'}</strong> - {o.items.length} items - ${o.total.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
