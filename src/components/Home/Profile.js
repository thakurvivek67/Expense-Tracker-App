import React, { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import HomePage from "./HomePage";

const Profile = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  // Initialize state with localStorage values or empty strings if not found
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [photoUrl, setPhotoUrl] = useState(localStorage.getItem("photoUrl") || "");

  // Update localStorage whenever name or photoUrl changes
  useEffect(() => {
    localStorage.setItem("name", name);
    localStorage.setItem("photoUrl", photoUrl);
  }, [name, photoUrl]);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    if (user) {
      updateProfile(user, {
        displayName: name,
        photoURL: photoUrl,
      })
        .then(() => {
          // Profile updated successfully
          console.log("Profile updated successfully");

          // Clear input fields
          setName("");
          setPhotoUrl("");
        })
        .catch((error) => {
          // An error occurred
          console.error("Error updating profile: ", error);
        });
    }
  };

  return (
    <div>
      <HomePage></HomePage>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="url"
            placeholder="Photo Url"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        {user && (
          <>
            <h2>{user.displayName}</h2>
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="User"
                style={{ width: 200, height: 200 }}
              />
            ) : (
              <p>No photo available</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
