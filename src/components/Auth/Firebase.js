import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDp8idFWhl-LP5BGCa7F_troVRArne3Zls",
  authDomain: "app01-5a07d.firebaseapp.com",
  projectId: "app01-5a07d",
  storageBucket: "app01-5a07d.appspot.com",
  messagingSenderId: "726413531382",
  appId: "1:726413531382:web:4d90f151146eeb59d4b4d7",
  databaseURL: "https://app01-5a07d-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imgDB = getStorage(app);
const rtdb = getDatabase(app);

export { app, imgDB, rtdb };
