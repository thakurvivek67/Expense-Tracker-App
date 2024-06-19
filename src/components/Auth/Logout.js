import React from "react";
import "./Logout.css";
import { getAuth, signOut } from "firebase/auth";
import { app } from "./Firebase";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to the sign-in page after logout
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  };

  const handleCancel = () => {
    navigate("/home"); // Redirect to home page
  };

  return (
    <div className="logout">
      <h2 className="text">Are you sure you want to logout?</h2>
      <button className="btn" onClick={handleLogout}>Logout</button>
      <button className="btnCancel" onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default Logout;
