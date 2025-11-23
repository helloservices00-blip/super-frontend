import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products available.</p>;

  // Group products by shop → category → brand
  const grouped = {};
  products.forEach((p) => {
    if (!grouped[p.shop]) grouped[p.shop] = {};
    if (!grouped[p.shop][p.category]) grouped[p.shop][p.category] = {};
    if (!grouped[p.shop][p.category][p.brand])
      grouped[p.shop][p.category][p.brand] = [];
    grouped[p.shop][p.category][p.brand].push(p);
  });

  return (
    <div>
      <h2>Products by Shop</h2>
      {Object.keys(grouped).map((shopName) => (
        <div key={shopName} style={{ marginBottom: '30px' }}>
          <h3>{shopName}</h3>
          {Object.keys(grouped[shopName]).map((categoryName) => (
            <div key={categoryName} style={{ marginLeft: '20px', marginBottom: '15px' }}>
              <strong>{categoryName}</strong>
              {Object.keys(grouped[shopName][categoryName]).map((brandName) => (
                <div key={brandName} style={{ marginLeft: '20px', marginBottom: '10px' }}>
                  <em>{brandName}</em>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {grouped[shopName][categoryName][brandName].map((p) => (
                      <li key={p._id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                        <strong>{p.name}</strong> {p.price ? `- $${p.price}` : ''}
                        <div>{p.description || 'No description'}</div>
                        <button onClick={() => addToCart(p)} style={{ marginTop: '5px', padding: '5px 10px', cursor: 'pointer' }}>Add to Cart</button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
