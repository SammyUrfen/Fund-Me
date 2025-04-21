import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CampaignProvider } from "./context/CampaignContext";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import CreateCampaign from "./pages/CreateCampaign";
import CampaignDetail from "./pages/CampaignDetail";
import DonatePage from "./pages/Donate";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SeedDataUploader from "./utils/SeedDataUploader";

function App() {
  return (
    <AuthProvider>
      <CampaignProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateCampaign />} />
            <Route path="/campaign/:id" element={<CampaignDetail />} />
            <Route path="/campaign/donate/:id" element={<DonatePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/upload-seed" element={<SeedDataUploader />} />
          </Routes>
        </Router>
      </CampaignProvider>
    </AuthProvider>
  );
}

export default App;
