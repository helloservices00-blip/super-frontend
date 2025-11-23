import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>User Profile</h2>

      <div style={{ marginTop: "20px" }}>
        <Link to="/login">
          <button style={{ marginRight: "10px" }}>Login</button>
        </Link>

        <Link to="/signup">
          <button>Signup</button>
        </Link>
      </div>
    </div>
  );
}
