import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Profile() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {user.isAdmin && <p><strong>Admin User</strong></p>}
      <button onClick={logout} style={{ marginTop: '10px', padding: '5px 15px' }}>Logout</button>
    </div>
  );
}
