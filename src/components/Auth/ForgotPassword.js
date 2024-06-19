import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "./Firebase";
import { NavLink } from "react-router-dom";

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
      <h2>Forgot Password</h2>
      {emailSent ? (
        <p>An email with password reset instructions has been sent to {email}.</p>
      ) : (
        <form onSubmit={handleResetPassword}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
          {error && <p className="error">{error}</p>}

          <NavLink to="/login">Go To Login Page</NavLink>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
