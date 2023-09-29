import React from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthHooks";
import { useLogout } from "../hooks/userLogoutHooks";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout</h1>
        </Link>
        <nav>
          {user ? (
            <div>
              <span>{user.email}</span>
              <button onClick={logout}>Logout</button>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
