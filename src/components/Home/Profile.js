import React, { useState, useRef, useEffect } from 'react';
import { updateProfile } from 'firebase/auth';
import { ref, push, onValue } from 'firebase/database';
import { rtdb } from '../Auth/Firebase'; // Adjust import as per your Firebase setup
import { getAuth} from "firebase/auth";
import { app } from '../Auth/Firebase';


const auth = getAuth(app);

const Profile = () => {
  const nameRef = useRef(null);
  const profileUrlRef = useRef(null);
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    // Fetch initial profile data when component mounts
    if (auth.currentUser) {
      fetchProfileData(auth.currentUser.uid);
    }
  }, []);

  const fetchProfileData = (uid) => {
    const dbRef = ref(rtdb, `users/${uid}/profile`);
    onValue(dbRef, (snapshot) => {
      const profileData = snapshot.val();
      if (profileData) {
        setDisplayName(profileData.displayName);
        setPhotoURL(profileData.photoURL);
      }
    });
  };

  // Function to handle profile update
  const handleUpdateProfile = async () => {
    const newName = nameRef.current.value;
    const newProfileUrl = profileUrlRef.current.value;

    try {
      // Update profile in Firebase Authentication
      await updateProfile(auth.currentUser, {
        displayName: newName,
        photoURL: newProfileUrl,
      });

      // Update profile in Realtime Database
      const dbRef = ref(rtdb, `users/${auth.currentUser.uid}/profile`);
      await push(dbRef, { displayName: newName, photoURL: newProfileUrl });

      // Update local state with new values
      setDisplayName(newName);
      setPhotoURL(newProfileUrl);

      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div>
      
      <div className='py-8 flex justify-between items-center w-6/12 mx-auto'>
        <h1 className='font-semibold text-xl'>Contact details</h1>
        <button className='bg-indigo-300 hover:bg-indigo-400 p-2 text-sm rounded-md'>Cancel</button>
      </div>
      <div className='flex items-center w-6/12 mx-auto justify-center'>
        <h2 className='font-semibold'>Name:</h2>
        <input ref={nameRef} defaultValue={displayName} className='p-1 border mx-4' />
        <h2 className='font-semibold'>Photo URL:</h2>
        <input ref={profileUrlRef} defaultValue={photoURL} className='p-1 border px-2 mx-4' />
      </div>
      <div className='flex items-center w-6/12 mx-auto my-16'>
        <button className='bg-indigo-300 hover:bg-indigo-400 p-2 text-sm rounded-md'
          onClick={handleUpdateProfile}
        >
          Update
        </button>
      </div>

      <div>
        <h2 className='name'>{displayName}</h2>
        <img src={photoURL} alt='Profile' className='img' style={{ width: 200, height: 200 }} />
      </div>
    </div>
  );
};

export default Profile;
