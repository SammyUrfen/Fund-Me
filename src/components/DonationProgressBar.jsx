import React from "react";
import "../styles/DonationProgressBar.css";

const DonationProgressBar = ({ goal, raised }) => {
  const percentage = Math.min((raised / goal) * 100, 100);

  return (
    <div className="donation-progress-bar-container">
      <div className="donation-amounts">
        <span className="amount-raised">₹{raised.toLocaleString()}</span>
        <span className="amount-goal">₹{goal.toLocaleString()}</span>
      </div>
      <div className="donation-progress-container">
        <div 
          className="donation-progress-bar" 
          style={{ width: `${percentage}%` }} 
        />
        <div className="donation-progress-text">
          {percentage.toFixed(1)}% Funded
        </div>
      </div>
    </div>
  );
};

export default DonationProgressBar;