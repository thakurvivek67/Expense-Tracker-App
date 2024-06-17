import React from "react";
import Signin from "./components/Auth/Signin";
import Login from "./components/Auth/Login";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import Profile from "./components/Home/Profile";
import Verify from "./components/Auth/Verify";




function App() {
  
  return (
    <div>
       <Routes> 
        <Route path="/" element={<Signin/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/verify" element={<Verify/>} />
        <Route path="/profile" element={<Profile/>} />


      </Routes>
    </div>
  );
}

export default App;
