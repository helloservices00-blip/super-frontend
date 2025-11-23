import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("https://super-backend-bzin.onrender.com/api/auth/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchProfile();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Profile</h2>

      <div style={styles.card}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <button style={styles.logoutBtn} onClick={logout}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "20px",
    textAlign: "center",
    fontFamily: "Arial",
  },
  title: {
    marginBottom: "20px",
  },
  card: {
    background: "#f1f1f1",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "left",
  },
  logoutBtn: {
    marginTop: "20px",
    width: "100%",
    padding: "10px",
    border: "none",
    background: "red",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default ProfilePage;
