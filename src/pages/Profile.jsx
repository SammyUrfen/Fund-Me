import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import defaultProfileImage from "../assets/hqdefault.jpg";
import "../styles/Profile.css";


const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    displayName: "",
    profileImage: "",
    fullName: "",
    birthDate: "",
    gender: "",
  });

  const [campaignsCreated, setCampaignsCreated] = useState([]);
  const [campaignsDonated, setCampaignsDonated] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log("user", user);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setProfile({
            displayName: userData.displayName || "",
            profileImage: userData.profileImage || user.photoURL || "",
            fullName: userData.fullName || "",
            birthDate: userData.birthDate || "",
            gender: userData.gender || "",
          });

          if (userData.campaigns?.length) {
            const q = query(
              collection(db, "campaigns"),
              where("__name__", "in", userData.campaigns)
            );
            const snap = await getDocs(q);
            setCampaignsCreated(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          }

          if (userData.donations?.length) {
            const ids = userData.donations.map(d => d.campaignId);
            const q = query(
              collection(db, "campaigns"),
              where("__name__", "in", ids)
            );
            const snap = await getDocs(q);

            const donationsMap = {};
            userData.donations.forEach(d => {
              donationsMap[d.campaignId] = d.amount;
            });

            setCampaignsDonated(
              snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                donatedAmount: donationsMap[doc.id],
              }))
            );
          }
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, profile);
      alert("Profile updated!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Update failed.");
    }
  };

  if (loading) return <div className="profile-loading">Loading...</div>;

  return (
    <div className="profile-container">
      <h2 className="profile-title">Your Profile</h2>

      <div className="profile-form">
        <img
          src={profile.profileImage || user?.photoURL || defaultProfileImage}
          alt="Profile"
          className="profile-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultProfileImage;
          }}
        />
        <input
          type="text"
          className="profile-input"
          name="profileImage"
          value={profile.profileImage}
          onChange={handleChange}
          placeholder="Profile Image URL"
        />

        <input
          type="text"
          className="profile-input"
          name="displayName"
          value={profile.displayName}
          onChange={handleChange}
          placeholder="Display Name"
        />

        <input
          type="text"
          className="profile-input"
          name="fullName"
          value={profile.fullName}
          onChange={handleChange}
          placeholder="Full Name"
        />

        <input
          type="date"
          className="profile-input"
          name="birthDate"
          value={profile.birthDate}
          onChange={handleChange}
        />

        <select
          name="gender"
          className="profile-input"
          value={profile.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <button className="profile-save-button" onClick={handleSave}>
          Save Profile
        </button>
      </div>

      <div className="profile-campaigns">
        <h3>Your Campaigns</h3>
        {campaignsCreated.length > 0 ? (
          <ul className="campaigns-list">
            {campaignsCreated.map(c => (
              <li
                key={c.id}
                className="campaign-card"
                onClick={() => navigate(`/campaign/${c.id}`)}
              >
                <h4>{c.title}</h4>
                <p>Goal: ₹{c.goalAmount}</p>
                <p>Raised: ₹{c.currentAmount}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No campaigns created yet.</p>
        )}

        <h3>Campaigns You Donated To</h3>
        {campaignsDonated.length > 0 ? (
          <ul className="campaigns-list">
            {campaignsDonated.map(c => (
              <li
                key={c.id}
                className="campaign-card"
                onClick={() => navigate(`/campaign/${c.id}`)}
              >
                <h4>{c.title}</h4>
                <p>Goal: ₹{c.goalAmount}</p>
                <p>You Donated: ₹{c.donatedAmount}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No donations made yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
