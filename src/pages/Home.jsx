import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import CampaignCard from "../components/CampaignCard";
import HomeSlideshow from "../components/SlideShow";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Home.css";


const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "campaigns"));
        const campaignList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCampaigns(campaignList);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="home-page-container">
      {!user && <HomeSlideshow />}

      <div className="campaigns-section">
        <h2 className="section-heading">Ongoing Campaigns</h2>
        <div className="campaigns-grid">
          {campaigns.map(campaign => (
            (campaign.currentAmount < campaign.goalAmount) &&
            <Link to={`/campaign/${campaign.id}`} key={campaign.id} className="campaign-card-link">
              <CampaignCard campaign={campaign} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
