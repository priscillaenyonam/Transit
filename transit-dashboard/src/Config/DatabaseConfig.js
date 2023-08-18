import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4KhCyoocsJd0bYIrrKkdvkneKAUZv5UM",
  authDomain: "transit-online.firebaseapp.com",
  projectId: "transit-online",
  storageBucket: "transit-online.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
