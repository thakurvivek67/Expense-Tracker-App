import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendEmailVerification } from 'firebase/auth';

const Verify = () => {
  const [verificationSent, setVerificationSent] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleVerify = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        // Email verification sent successfully
        setVerificationSent(true); // Update state to indicate verification sent
        // Navigation to '/profile' happens only after successful verification
      })
      .catch((error) => {
        // Handle errors
        console.error("Error sending email verification:", error.message);
      });
  };

  // Render UI based on whether verification link is sent
  return (
    <div>
      {!verificationSent ? (
        <div>
          <input type='email' />
          <button onClick={handleVerify}>Verify</button>
        </div>
      ) : (
        <p>Email verification link sent. Please check your email.</p>
      )}
    </div>
  );
};

export default Verify;
