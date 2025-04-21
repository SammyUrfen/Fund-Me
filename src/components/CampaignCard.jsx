import React from "react";
import { Link } from "react-router-dom";
import "../styles/CampaignCard.css";

const CampaignCard = ({ campaign }) => {
  return (
    <div className="campaign-card">
      <div className="campaign-image-wrapper">
        <img
          src={campaign.images[0]}
          alt={campaign.title}
          className="campaign-image"
          />
      </div>
      <div className="campaign-content">
        <h3 className="campaign-title">{campaign.title}</h3>
        <p className="campaign-story">{campaign.story.slice(0, 100)}...</p>
        <div className="campaign-progress">
          <span className="campaign-raised">₹{campaign.currentAmount}</span>
          <span className="campaign-goal"> / ₹{campaign.goalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
