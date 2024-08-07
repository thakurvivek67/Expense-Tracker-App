import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { app } from "./Firebase";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Login.css";

const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Import useNavigate hook

  const signinUser = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Login successful");

      // Get the ID token for the user
      const idToken = await userCredential.user.getIdToken();

      // Send email for verification
      const mailVerify = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAtT2tM0vyvpVl3YO-igDVgDCOb4fdcCGQ",
        {
          requestType: "VERIFY_EMAIL",
          idToken: idToken,
        }
      );
      setEmail("");
        setPassword("");

      navigate("/verify"); // Redirect to verification page on successful login

    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    await signinUser(); // Await signinUser function
  };

  return (
    <div>
      <h1 className="heading">Login Here</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required // Adding required attribute for form validation
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required // Adding required attribute for form validation
          />
          <button type="submit">Submit</button>

          <NavLink to="/Forgot">ForgotPassword</NavLink>
          <NavLink to="/">SignUp</NavLink>
        </form>
      </div>
    </div>
  );
};

export default Login;
