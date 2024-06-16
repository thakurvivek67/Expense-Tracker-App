import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./Firebase";
import { useNavigate } from "react-router-dom";


const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Import useNavigate hook

  const signinUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
        alert("Login successful");
        navigate("/verify"); // Redirect to home page on successful login
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    signinUser();
  };

  return (
    <div>
      <h1>Login here</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

