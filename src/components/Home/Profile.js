import { ref, onValue, push } from "firebase/database";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import { uploadBytes, ref as storageRef } from "firebase/storage";
import { imgDB, rtdb } from "../Auth/Firebase";

const Profile = () => {
  const [txt, setTxt] = useState("");
  const [img, setImg] = useState("");
  const [data, setData] = useState([]);

  const handleUpload = (e) => {
    const imgs = storageRef(imgDB, `imgs/${v4()}`);
    uploadBytes(imgs, e.target.files[0])
      .then((snapshot) => {
        setImg(snapshot.ref.fullPath);
      })
      .catch((error) => {
        console.error("Error uploading image: ", error);
      });
  };

  const handleClick = () => {
    const dbRef = ref(rtdb, "txtDB");
    push(dbRef, { txtVal: txt, imgUrl: img })
      .then(() => {
        alert("Data Added");
      })
      .catch((error) => {
        console.error("Error adding data: ", error);
      });
  };

  const getData = () => {
    const dbRef = ref(rtdb, "txtDB");
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
