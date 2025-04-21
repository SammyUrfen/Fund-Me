import React from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const sampleData = [
  {
    title: "Help Ramesh Rebuild His House",
    story: "After the recent floods, Ramesh lost his home and belongings. He needs support to rebuild his house and life.",
    images: [
      "https://source.unsplash.com/featured/?flood,house",
      "https://source.unsplash.com/featured/?help,people",
    ],
    goalAmount: 50000,
    currentAmount: 12000,
    createdBy: "user_001",
  },
  {
    title: "Cancer Treatment for Anjali",
    story: "Anjali is fighting stage 3 cancer. Your donations will help cover her chemotherapy and hospital bills.",
    images: [
      "https://source.unsplash.com/featured/?hospital,patient",
      "https://source.unsplash.com/featured/?cancer,treatment",
    ],
    goalAmount: 200000,
    currentAmount: 87000,
    createdBy: "user_002",
  },
  {
    title: "Support Village School Renovation",
    story: "We're raising funds to renovate our village school with proper classrooms and teaching equipment.",
    images: [
      "https://source.unsplash.com/featured/?school,children",
      "https://source.unsplash.com/featured/?classroom,village",
    ],
    goalAmount: 150000,
    currentAmount: 40000,
    createdBy: "user_003",
  },
  {
    title: "Emergency Aid for Earthquake Victims",
    story: "Families affected by the recent earthquake need food, shelter, and medical aid urgently.",
    images: [
      "https://source.unsplash.com/featured/?earthquake,rescue",
      "https://source.unsplash.com/featured/?disaster,relief",
    ],
    goalAmount: 300000,
    currentAmount: 195000,
    createdBy: "user_004",
  },
  {
    title: "Help Kabir Start His Small Business",
    story: "Kabir lost his job during the pandemic. He's looking to start a tea stall and needs funds for setup and licenses.",
    images: [
      "https://source.unsplash.com/featured/?streetfood,tea",
      "https://source.unsplash.com/featured/?smallbusiness,indian",
    ],
    goalAmount: 25000,
    currentAmount: 6000,
    createdBy: "user_005",
  },
];

const SeedDataUploader = () => {
  const uploadData = async () => {
    const campaignRef = collection(db, "campaigns");

    try {
      for (let campaign of sampleData) {
        await addDoc(campaignRef, {
          ...campaign,
          createdAt: serverTimestamp(), // Use Firestore server time
        });
        console.log(`Added: ${campaign.title}`);
      }
      alert("Sample campaigns uploaded successfully!");
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl mb-4">Upload Sample Campaigns</h1>
      <button onClick={uploadData} className="bg-green-600 text-white px-4 py-2 rounded">
        Upload to Firestore
      </button>
    </div>
  );
};

export default SeedDataUploader;
