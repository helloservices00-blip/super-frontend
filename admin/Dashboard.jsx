import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        <Link to="/admin/shops">Manage Shops</Link>
        <Link to="/admin/categories">Manage Categories</Link>
        <Link to="/admin/products">Manage Products</Link>
        <Link to="/admin/orders">View Orders</Link>
      </nav>
    </div>
  );
}
