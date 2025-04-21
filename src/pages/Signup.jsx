import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { provider, auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const createUserDocument = async (user, displayName = "") => {
    const userRef = doc(db, "users", user.uid);
    try {
      await setDoc(userRef, {
        email: user.email,
        displayName: displayName || user.displayName || "",
        campaigns: [],
        donations: [],
        createdAt: new Date(),
      });
    } catch (err) {
      console.error("Error creating user document:", err);
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      await createUserDocument(result.user);
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(res.user, { displayName: name });
      await createUserDocument(res.user, name);
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="signup-container">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <form onSubmit={handleSignup} className="signup-form">
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} />
            <button type="submit" className="bg-blue-600 text-white py-2">Sign Up</button>
        </form>
        <p className="text-center my-4">or</p>
        <div className="divider"></div>
        <button onClick={handleGoogle} className="google-signup-button">
            Continue with Google
        </button>
        <Link to="/login" className="signup-link">
            Already have an account? Login
        </Link>
    </div>  
  );
};

export default Signup;
