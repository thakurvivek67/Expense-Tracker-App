import React from "react";
import Signin from "./components/Auth/Signin";
import Login from "./components/Auth/Login";
import { Routes, Route } from "react-router-dom";


function App() {
  
  return (
    <div>
       <Routes> 
        <Route path="/" element={<Signin/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
