import { useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("Loading...");

    try {
      const res = await axios.post(`${API}/api/auth/signup`, form);
      setMessage("Signup successful! Redirecting to login...");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);

    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Signup</h2>

      <form onSubmit={handleSignup} style={{ maxWidth: "300px" }}>
        <div>
          <label>Name</label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button style={{ marginTop: "15px" }} type="submit">
          Signup
        </button>
      </form>

      <p style={{ marginTop: "10px", color: "blue" }}>{message}</p>

      <p style={{ marginTop: "10px" }}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}
