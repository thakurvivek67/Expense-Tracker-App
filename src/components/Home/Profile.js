import { ref, uploadBytes } from "firebase/storage";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import { push, ref as rtdbRef, onValue } from "firebase/database";
import { imgDB, rtdb } from "../Auth/Firebase";

const Profile = () => {
  const [txt, setTxt] = useState("");
  const [img, setImg] = useState("");
  const [data, setData] = useState([]);

  const handleUpload = (e) => {
    console.log(e.target.files[0]);
    const imgs = ref(imgDB, `imgs/${v4()}`);
    uploadBytes(imgs, e.target.files[0])
      .then((snapshot) => {
        console.log(snapshot, "imgs");
        setImg(snapshot.ref.fullPath); // Storing the full path of the image
      })
      .catch((error) => {
        console.error("Error uploading image: ", error);
      });
  };

  const handleClick = () => {
    const dbRef = rtdb.ref(rtdb, "txtDB"); // Reference to the location in the database
    dbRef.push({ txtVal: txt, imgUrl: img }) // Push and set data directly
      .then(() => {
        alert("Data Added");
      })
      .catch((error) => {
        console.error("Error adding data: ", error);
      });
  };
  
  

  const getData = () => {
    const dbRef = rtdbRef(rtdb, "txtDB");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setData(dataArray);
      } else {
        setData([]);
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <label htmlFor="username">Name</label>
      <input type="text" id="username" onChange={(e) => setTxt(e.target.value)} />
      <label htmlFor="img">Profile photo</label>
      <input type="file" id="img" onChange={(e) => handleUpload(e)} />
      <button onClick={handleClick}>Add</button>

      {data.map((value) => (
        <div key={value.id}>
          <h1>{value.txtVal}</h1>
          <img src={value.imgUrl} height="200px" width="200px" alt="Profile" />
        </div>
      ))}
    </div>
  );
};

export default Profile;
