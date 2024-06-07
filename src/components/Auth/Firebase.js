// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
export { app };