import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ProductsAdmin() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', shop: '', category: '', brand: '' });

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!user?.isAdmin) return;
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API}/api/admin/products`, { headers: { Authorization: `Bearer ${token}` } });
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [user]);

  if (!user?.isAdmin) return <p>Access denied</p>;

  const handleAdd = async () => {
    try {
      const res = await axios.post(`${API}/api/admin/products`, newProduct, { headers: { Authorization: `Bearer ${token}` } });
      setProducts([...products, res.data]);
      setNewProduct({ name: '', price: '', description: '', shop: '', category: '', brand: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/admin/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Admin Products</h2>
      <div>
        <input placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
        <input placeholder="Price" type="number" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
        <input placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
        <input placeholder="Shop" value={newProduct.shop} onChange={e => setNewProduct({ ...newProduct, shop: e.target.value })} />
        <input placeholder="Category" value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} />
        <input placeholder="Brand" value={newProduct.brand} onChange={e => setNewProduct({ ...newProduct, brand: e.target.value })} />
        <button onClick={handleAdd}>Add Product</button>
      </div>

      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.name} - ${p.price} ({p.shop}/{p.category}/{p.brand})
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
