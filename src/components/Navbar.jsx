import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import fundMeLogo from "../assets/fund_me.png";
import "../styles/Navbar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // console.log(user);

  return (
    <nav className="navbar">
      <Link to="/" className="brand-link">
        <img src={fundMeLogo} alt="FundMe Logo" className="brand-logo" />
        <span className="brand-text">FundMe</span>
      </Link>
      <div className="nav-links">
        {user ? (
          <>
            <span>Hi, {user.displayName}</span>
            <Link to="/create">Create Campaign</Link>
            <Link to="/profile">Profile</Link>
            {(user.email === "bibekcharah@gmail.com") && <Link to="/upload-seed">Upload Seed Data</Link>}
            <button onClick={logout} className="logout-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
