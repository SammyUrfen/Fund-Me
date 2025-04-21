import React, { useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
  setDoc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/CreateCampaign.css";

const CreateCampaign = () => {
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddImageUrl = () => {
    if (imageUrl.trim()) {
      setImageUrls([...imageUrls, imageUrl.trim()]);
      setImageUrl("");
    }
  };

  const handleRemoveImageUrl = (index) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !story || !goalAmount || imageUrls.length === 0) {
      alert("All fields including at least one image URL are required.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create campaign in Firestore
      const campaignData = {
        title,
        story,
        images: imageUrls,
        goalAmount: parseFloat(goalAmount),
        currentAmount: 0,
        createdAt: serverTimestamp(),
        createdBy: user.uid,
      };

      const docRef = await addDoc(collection(db, "campaigns"), campaignData);

      // Add campaign ID to user profile
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          campaigns: arrayUnion(docRef.id),
        },
        { merge: true }
      );

      alert("Campaign created successfully!");
      navigate(`/campaign/${docRef.id}`);
    } catch (err) {
      console.error("Error creating campaign:", err);
      alert("Failed to create campaign.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-campaign-container">
      <h2 className="create-campaign-title">Create a Campaign</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Campaign Title</label>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Campaign Story</label>
          <textarea
            className="form-textarea"
            rows="5"
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Describe your situation"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Funding Goal (₹)</label>
          <input
            type="number"
            className="form-input"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
            placeholder="How much money do you need?"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Add Image URLs</label>
          <div className="image-url-input">
            <input
              type="url"
              className="form-input"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
            />
            <button
              type="button"
              className="add-url-button"
              onClick={handleAddImageUrl}
            >
              Add URL
            </button>
          </div>
          {imageUrls.length > 0 && (
            <div className="image-urls-list">
              {imageUrls.map((url, index) => (
                <div key={index} className="image-url-item">
                  <span>{url.slice(0,68)+"...."}</span>
                  <button
                    type="button"
                    className="remove-url-button"
                    onClick={() => handleRemoveImageUrl(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Campaign"}
        </button>
      </form>
    </div>
  );
};

export default CreateCampaign;