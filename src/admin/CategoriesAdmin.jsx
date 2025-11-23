import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function CategoriesAdmin() {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!user?.isAdmin) return;
    axios.get(`${API}/api/admin/categories`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setCategories(res.data))
      .catch(console.error);
  }, [user]);

  if (!user?.isAdmin) return <p>Access denied</p>;

  const handleAdd = async () => {
    try {
      const res = await axios.post(`${API}/api/admin/categories`, { name }, { headers: { Authorization: `Bearer ${token}` } });
      setCategories([...categories, res.data]);
      setName('');
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/admin/categories/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setCategories(categories.filter(c => c._id !== id));
    } catch (err) { console.error(err); }
  };

  return (
    <div>
      <h2>Manage Categories</h2>
      <input placeholder="Category Name" value={name} onChange={e => setName(e.target.value)} />
      <button onClick={handleAdd}>Add Category</button>
      <ul>
        {categories.map(c => (
          <li key={c._id}>
            {c.name} <button onClick={() => handleDelete(c._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
