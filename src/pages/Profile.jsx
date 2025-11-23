import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div>
      <h2>Please Login</h2>
      <Link to="/login">
        <button>Login</button>
      </Link>

      <p>Don't have an account?</p>
      <Link to="/signup">
        <button>Create Account</button>
      </Link>
    </div>
  );
}
