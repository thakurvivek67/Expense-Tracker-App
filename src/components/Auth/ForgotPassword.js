import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "./Firebase";
import { NavLink } from "react-router-dom";
import "./ForgotPassword.css";

const auth = getAuth(app);

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Forgot Password</h2>
      <div >
        {emailSent ? (
          <p>
            An email with password reset instructions has been sent to {email}.
            <NavLink to="/login">Go To Login Page</NavLink>
          
          </p>
        ) : (
          <form className="form" onSubmit={handleResetPassword}>
            <label htmlFor="email" className="label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-reset">
              Reset Password
            </button>
           

            <NavLink to="/login">Go To Login Page</NavLink>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
