import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import Navbar from "../layout/navbar/Navbar";
import NavMobile from "../layout/NavMobile/NavMobile";
import styles from "./uploadVideo.module.css";

function UploadVideo() {
  const [firebaseConfig, setFirebaseConfig] = useState({
    apiKey: "AIzaSyAFYtftVDW-hbmQd_278uuY1OTQbUvMdW8",
    authDomain: "short-digital.firebaseapp.com",
    projectId: "short-digital",
    storageBucket: "short-digital.appspot.com",
    messagingSenderId: "384077321635",
    appId: "1:384077321635:web:5e568746c07e6d5f793616",
  });

  const [url, setUrl] = useState("");
  const [videoUpload, setVideoUpload] = useState();
  const [videoName, setVideoName] = useState("");
  const [toto, setToto] = useState([]);

  let tata = [0, 1, 2];

  setToto((prevState) => prevState.push([...tata]));

  // Initialise Firebase
  const app = initializeApp(firebaseConfig);

  // Initialise le stockage dans le cloud et obtient la référence du service
  const storage = getStorage(app);

  const handleClick = (e) => {
    //const newVideoRef = ref(storage, `/videos/tutu`);
    e.preventDefault();
    try {
      console.log(videoUpload);
      uploadBytes(
        ref(storage, `/videos/${videoName}${videoUpload.type}`),
        videoUpload
      ).then((snapshot) => {
        console.log("Uploaded a blob or file! ", snapshot);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleChangeFile = (event) => {
    const file = event.target.files[0];
    setVideoUpload(file);
    setUrl(URL.createObjectURL(file));
    console.log("ok");
  };

  const handleChangeName = (e) => {
    setVideoName(e.target.value);
  };

  return (
    <div id={styles.uploadVideoContainer}>
      <Navbar />
      <form id={styles.uploadVideoContainer__form}>
        <label htmlFor="uploadFile">Choisissez un fichier</label>
        <input
          type="file"
          name="input"
          id="uploadFile"
          onChange={handleChangeFile}
        />
        <label htmlFor="name">Quel est le nom de votre vidéo ?</label>
        <input
          type="text"
          id="name"
          value={videoName}
          onChange={(e) => handleChangeName(e)}
        />
        <label htmlFor="miniature">Veuillez choisir une miniature</label>
        <input type="file" id="miniature" />
        <input type="submit" onClick={(e) => handleClick(e)} />
      </form>
      <NavMobile />
    </div>
  );
}

export default UploadVideo;
