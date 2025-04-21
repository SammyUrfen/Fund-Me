import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { provider, auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
    <form onSubmit={handleLogin} className="login-form">
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} />
        <button type="submit" className="bg-blue-600 text-white py-2">Login</button>
    </form>
      <p className="text-center my-4">or</p>
      <div className="divider"></div>
      <button onClick={handleGoogle} className="google-login-button">
        Continue with Google
      </button>
      <div className="divider"></div>
      <Link to="/signup" className="signup-link">
        Don't have an account? Sign Up
      </Link>
    </div>
  );
};

export default Login;
