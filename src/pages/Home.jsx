import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Super Grocery</h1>
      <p>Browse our shops and products!</p>
      <nav style={{ marginTop: '20px' }}>
        <Link to="/products" style={{ marginRight: '10px' }}>Products</Link>
        <Link to="/cart" style={{ marginRight: '10px' }}>Cart</Link>
        <Link to="/profile">Profile</Link>
      </nav>
    </div>
  );
}
