import React from "react";
import Tuits from "../tuits";
import * as service from "../../services/tuits-service";
import * as userService from "../../services/security-service";
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./index.css";

const Home = () => {
  const location = useLocation();
  const { uid } = useParams();
  const navigate = useNavigate();
  const [tuits, setTuits] = useState([]);
  const [tuit, setTuit] = useState("");
  const [profile, setProfile] = useState({});

  const findTuits = () =>
    service.findAllTuits().then((tuits) => setTuits(tuits.reverse()));
  useEffect(async () => {
    try {
      const user = await userService.profile();
      setProfile(user);
      findTuits();
    } catch (e) {
      navigate("/login");
    }
  }, []);
  const [imageUrl, setImageUrl] = useState([]);
  const uploadImage = (e) => {
    const image = e.target.files[0];
    const storageRef = ref(storage, `/images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl([...imageUrl, downloadURL]);
        });
      }
    );
  };
  const createTuit = () => {
    setTuit("");
    setImageUrl([]);
    service.createTuit("my", { tuit: tuit, image: imageUrl }).then(findTuits);
  };

  const handleDelete = (url) => {
    console.log(url);
    imageUrl.indexOf(url) > -1 &&
      setImageUrl(imageUrl.filter((i) => i !== url));
  };
  //123
  return (
    <div className="ttr-home">
      <div className="border border-bottom-0">
        <h4 className="fw-bold p-2">Home Screen</h4>
        <div className="d-flex">
          <div className="p-2">
            <img
              className="ttr-width-50px rounded-circle avatar-logo"
              src={profile.avatar}
            />
          </div>
          <div className="p-2 w-100">
            <textarea
              onChange={(e) => setTuit(e.target.value)}
              value={tuit}
              placeholder="What's happening?"
              className="w-100 border-0"
            ></textarea>
            <div
              className="row"
              style={{ display: "flex", flexdirection: "row" }}
            >
              {imageUrl &&
                imageUrl.map((url) => (
                  <li className="image">
                    <i
                      onClick={() => handleDelete(url)}
                      className="fas fa-remove fa-2x fa-pull-right delete-image"
                    ></i>
                    <img
                      className="create-tuit-image"
                      key={url}
                      src={url}
                      alt="Tuit Image"
                      width={200}
                    />
                  </li>
                ))}
            </div>
            <div className="row">
              <div className="col-10 ttr-font-size-150pc text-primary">
                <i className="fas fa-portrait me-3"></i>
                <label className="far me-3" style={{ cursor: "pointer" }}>
                  <i className="far fa-image"></i>
                  <input
                    type="file"
                    onChange={uploadImage}
                    style={{ visibility: "hidden", width: 0, height: 0 }}
                  />
                </label>

                <i className="far fa-bar-chart me-3"></i>
                <i className="far fa-face-smile me-3"></i>
                <i className="far fa-calendar me-3"></i>
                <i className="far fa-map-location me-3"></i>
              </div>
              <div className="col-2">
                <a
                  onClick={createTuit}
                  className={`btn btn-primary rounded-pill fa-pull-right
                                fw-bold ps-4 pe-4`}
                >
                  Tuit
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tuits tuits={tuits} refreshTuits={findTuits} />
    </div>
  );
};
export default Home;
