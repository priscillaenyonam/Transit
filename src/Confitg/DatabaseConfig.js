import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDVTseW_ykfxh3hbeapUanPCS2-CdC-F_Y",
  authDomain: "transit-df522.firebaseapp.com",
  projectId: "transit-df522",
  storageBucket: "transit-df522.appspot.com",
  messagingSenderId: "823885398303",
  appId: "1:823885398303:web:5b601421656ed683b7302a"
};

const app = initializeApp(firebaseConfig);

//Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

