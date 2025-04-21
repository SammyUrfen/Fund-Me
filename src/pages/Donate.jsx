import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import "../styles/Donate.css";

const DonatePage = () => {
  const { id } = useParams(); // Campaign ID
  const navigate = useNavigate();
  const { user } = useAuth();

  const [donationAmount, setDonationAmount] = useState(0);
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const campaignRef = doc(db, "campaigns", id);
        const campaignSnap = await getDoc(campaignRef);

        if (campaignSnap.exists()) {
          setCampaign({ id: campaignSnap.id, ...campaignSnap.data() });
        } else {
          console.log("No such campaign!");
        }
      } catch (error) {
        console.error("Error fetching campaign:", error);
      }
    };

    fetchCampaign();
  }, [id]);

  const handleDonate = async () => {
    if (!donationAmount || donationAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    try {
      const campaignRef = doc(db, "campaigns", id);
      await updateDoc(campaignRef, {
        currentAmount: campaign.currentAmount + parseFloat(donationAmount),
      });

      // Save donation info to user profile
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        donations: arrayUnion({ campaignId: id, amount: parseFloat(donationAmount) }),
      });

      alert("Donation successful!");
      navigate(`/campaign/${id}`);
    } catch (error) {
      console.error("Error processing donation:", error);
      alert("Failed to donate. Try again later.");
    }
  };

  return (
    <div className="donate-page-container">
      <h2 className="donate-title">Donate to Campaign</h2>
      <h4 className="donate-head">Couldn't include a payment api, Use this placeholder instead</h4>
      {campaign && (
        <div className="campaign-summary">
          <h3 className="campaign-title">{campaign.title}</h3>
          <p className="campaign-story">{campaign.story}</p>
        </div>
      )}
      <div className="donation-input-group">
        <label htmlFor="donationAmount" className="donation-label">
          Enter Amount to Donate (₹):
        </label>
        <input
          type="number"
          id="donationAmount"
          className="donation-input"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
        />
      </div>
      <button className="donate-button-final" onClick={handleDonate}>
        Donate!
      </button>
    </div>
  );
};

export default DonatePage;
