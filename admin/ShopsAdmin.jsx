import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ShopsAdmin() {
  const { user } = useContext(AuthContext);
  const [shops, setShops] = useState([]);
  const [name, setName] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!user?.isAdmin) return;
    axios.get(`${API}/api/admin/shops`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setShops(res.data))
      .catch(console.error);
  }, [user]);

  if (!user?.isAdmin) return <p>Access denied</p>;

  const handleAdd = async () => {
    try {
      const res = await axios.post(`${API}/api/admin/shops`, { name }, { headers: { Authorization: `Bearer ${token}` } });
      setShops([...shops, res.data]);
      setName('');
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/admin/shops/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setShops(shops.filter(s => s._id !== id));
    } catch (err) { console.error(err); }
  };

  return (
    <div>
      <h2>Manage Shops</h2>
      <input placeholder="Shop Name" value={name} onChange={e => setName(e.target.value)} />
      <button onClick={handleAdd}>Add Shop</button>
      <ul>
        {shops.map(s => (
          <li key={s._id}>
            {s.name} <button onClick={() => handleDelete(s._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
