import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "https://super-backend-bzin.onrender.com";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/api/auth/signup`, form)
      .then(() => alert("Signup successful"))
      .catch((err) => alert(err.response?.data?.message || "Error"));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        /><br />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        /><br />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
p
