# FundMe - Donation-Based Crowdfunding Platform 💸

**FundMe** is a web-based crowdfunding platform that allows users to create and support fundraising campaigns with ease. Built for simplicity and functionality, this project is perfect for those in need of financial help, and for donors who want to contribute to meaningful causes.
A transparent, story-driven crowdfunding platform built with React & Firebase

---

## 🌟 Features

- ✅ **User Authentication** (Signup / Login / Logout)
- 🧾 **Create Campaigns** with title, story, funding goal, and images
- 🎯 **Track Campaign Progress** with a dynamic donation bar
- 💬 **Comment Section** for community engagement
- 🤝 **Donate to Campaigns** (with real-time Firestore updates)
- 👤 **User Profiles** showing:
  - Editable user details (display name, full name, birth date, gender, etc.)
  - Campaigns created
  - Campaigns donated to
- 🗑️ **Delete Campaigns** (Only by the creator, with confirmation prompts)

---

## 🛠 Tech Stack

### 🧩 **Frontend**
- **React.js** – Component-based UI
- **React Router** – Routing between pages
- **CSS** – Custom styling (with classNames)
- **React Context API** – Global state management for auth & campaign data

### 🔥 **Backend / Database**
- **Firebase Firestore** – Real-time NoSQL database to store users, campaigns, and donations
- **Firebase Authentication** – Secure user login and signup system
- **Hosting on Vercel**

---

## 🚀 Project Structure

```
src/
├── components/                  # Reusable UI components
│   ├── Comments.jsx              # Campaign comments functionality
│   ├── DonationProgressBar.jsx   # Progress tracking for campaigns
│   ├── CampaignCard.jsx          # Card component for campaign display
│   ├── Navbar.jsx                # Navigation component
│   └── HomeSlideshowjsx          # Homepage slideshow component
│
├── context/                     # React Context providers
│   ├── AuthContext.jsx           # Authentication state management
│   └── CampaignContext.jsx       # Campaign data state management
│
├── pages/                       # Application pages
│   ├── Home.jsx                  # Landing page
│   ├── Profile.jsx               # User profile management
│   ├── CreateCampaign.jsx        # Campaign creation
│   ├── CampaignDetail.jsx        # Individual campaign view
│   ├── Donate.jsx                # Donation processing
│   ├── Login.jsx                 # User login
│   └── Signup.jsx                # User registration
│
├── styles/                      # CSS styling files
│   ├── App.css                   # Global styles
│   ├── Auth.css                  # Authentication pages styling
│   ├── Campaign.css              # Campaign-related components
│   └── components...             # Component-specific styles
│
├── utils/                       # Utility functions and helpers
│   └── firebase.js               # Firebase configuration
│
├── assets/                      # Static assets
│   └── images/                   # Image resources
│
└── App.jsx                 # Main application component
```

### 📁 Key Directories and Files

- **/components**: Reusable UI components used throughout the application
- **/context**: Global state management using React Context API
- **/pages**: Main application views and routes
- **/styles**: CSS modules and styling configurations
- **/utils**: Helper functions and third-party service configurations
- **/assets**: Static files like images and icons


---

## 🚧 Future Improvements (Version 1.0 Ideas)

- 💳 Payment Integration (e.g., Razorpay, Stripe)
- 🖼️ Image Uploads using Firebase Storage
- 🔍 Campaign Search & Filtering
- 📈 Campaign Analytics for creators
- 🔐 Admin Dashboard for moderation

---


## 👨‍💻 Developed By

**Bibek Jyoti Charah**  
*1st-year Computer Science student, passionate about AI/ML & Web Dev.*
*Created the website as an end-term project*

---

## 📄 License

This project is open-source and free to use for educational purposes.

