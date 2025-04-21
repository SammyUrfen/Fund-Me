import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyD7byvBsNY--rSqmu4pwvP8TR2frDVv3XU",
    authDomain: "fund-me-183c8.firebaseapp.com",
    projectId: "fund-me-183c8",
    storageBucket: "fund-me-183c8.firebasestorage.app",
    messagingSenderId: "994743483211",
    appId: "1:994743483211:web:0abf310b27c42b8c7bc6ce"  
};


const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);