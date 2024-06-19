import React from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "./components/Auth/Signin";
import Login from "./components/Auth/Login";
import HomePage from "./components/Home/HomePage";
import Profile from "./components/Home/Profile";
import Verify from "./components/Auth/Verify";
import Expense from "./components/Expenses/Expense";
import Logout from "./components/Auth/Logout"; // Import the Logout component
import ForgotPassword from "./components/Auth/ForgotPassword";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Expense" element={<Expense />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/Forgot" element={<ForgotPassword/>} />
      </Routes>
    </div>
  );
}

export default App;
