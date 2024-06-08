import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database"; 

const Profile = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleUpdate = () => {
    const db = getDatabase(); // Get a reference to the database service
    const profileRef = ref(db, "profiles/" + name); // Reference to the 'profiles' node with the user's name as key
    set(profileRef, { name, url }) // Set the data under this reference
      .then(() => {
        console.log("Data saved successfully!");
        setName("");
        setUrl("");
      })
      .catch((error) => {
        console.error("Error saving data: ", error);
      });
  };

  return (
    <div>
      <label htmlFor="username">Name</label>
      <input
        type="text"
        id="username"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <label htmlFor="img">Profile photo url</label>
      <input
        type="url"
        id="img"
        onChange={(e) => setUrl(e.target.value)}
        value={url}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default Profile;
