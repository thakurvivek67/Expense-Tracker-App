import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtT2tM0vyvpVl3YO-igDVgDCOb4fdcCGQ",
  authDomain: "project01-6d2a3.firebaseapp.com",
  projectId: "project01-6d2a3",
  storageBucket: "project01-6d2a3.appspot.com",
  messagingSenderId: "345282664329",
  appId: "1:345282664329:web:6234bd089d1f352b23f358"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imgDB = getStorage(app);
const rtdb = getDatabase(app);

export { app, imgDB, rtdb };
