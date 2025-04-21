import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useCampaign } from "../context/CampaignContext";
import DonationProgressBar from "../components/DonationProgressBar";
import Comments from "../components/Comments";
import "../styles/CampaignDetail.css";

const CampaignPage = () => {
  const { id } = useParams();
  const { campaign, setCampaign } = useCampaign();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const docRef = doc(db, "campaigns", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCampaign({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("Campaign not found");
        }
      } catch (error) {
        console.error("Error loading campaign:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id, setCampaign]);

  const handleDonateClick = () => {
    if (!user) {
      const wantToLogin = window.confirm("Please login or signup to donate. Would you like to login now?");
      if (wantToLogin) {
        navigate('/login');
      }
      return;
    }
    navigate(`/campaign/donate/${campaign.id}`);
  };

  const handleDelete = async () => {
    const confirm1 = window.confirm("Are you sure you want to delete this campaign?");
    if (!confirm1) return;

    const confirm2 = window.confirm("This action is irreversible. Do you still want to proceed?");
    if (!confirm2) return;

    try {
      await deleteDoc(doc(db, "campaigns", id));

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        const updatedCampaigns = (userData.campaigns || []).filter(cid => cid !== id);
        await updateDoc(userRef, { campaigns: updatedCampaigns });
      }

      alert("Campaign deleted successfully.");
      navigate("/profile");
    } catch (error) {
      console.error("Failed to delete campaign:", error);
      alert("Failed to delete campaign. Please try again.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!campaign) return <p className="text-center mt-10">Campaign not found</p>;

  return (
    <div className="campaign-page-container">
      <h1 className="campaign-page-title">{campaign.title}</h1>
      
      <div className="campaign-content-wrapper">
        <div className="campaign-images">
          {campaign.images.map((imgUrl, idx) => (
            <img
              key={idx}
              src={imgUrl}
              alt={`Campaign ${idx}`}
              className="current-image"
            />
          ))}
        </div>

        <div className="campaign-story">
          {campaign.story}
        </div>
      </div>

      <div className="donation-section">
        <div className="campaign-progress">
          <DonationProgressBar
            goal={campaign.goalAmount}
            raised={campaign.currentAmount}
          />
        </div>
        <button 
          onClick={handleDonateClick}
          className={`donate-button campaign-card-link ${!user ? 'donate-button-disabled' : ''}`}
        >
          {user ? 'Donate' : 'Login to Donate'}
        </button>
      </div>

      {user && user.uid === campaign.createdBy && (
        <div className="delete-campaign-wrapper">
          <button className="delete-campaign-button" onClick={handleDelete}>
            Delete This Campaign
          </button>
        </div>
      )}

      <div className="comments-section">
        <Comments campaignId={campaign.id} />
      </div>
    </div>
  );
};

export default CampaignPage;
