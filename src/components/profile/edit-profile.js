import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import * as service from "../../services/users-service";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./profile.css";

const EditProfile = () => {
  const [profile, setProfile] = useState("");
  const mlocation = useLocation();
  useEffect(() => {
    setProfile(mlocation.state);
  }, []);

  const saveState = e => {
    service.updateUser(profile);
  };

  const editBio = e => {
    setProfile({ ...profile, biography: e.target.value });
  };

  const uploadAvatar = e => {
    const image = e.target.files[0];
    const storageRef = ref(storage, `/images/${profile.username}-avatar`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          let newProfile = { ...profile, avatar: downloadURL };
          setProfile({ ...profile, header: downloadURL });
        });
      }
    );
  };

  const uploadHeader = e => {
    const image = e.target.files[0];
    const storageRef = ref(storage, `/images/${profile.username}-header`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          console.log(downloadURL);
          setProfile({ ...profile, header: downloadURL });
        });
      }
    );
  };

  return (
    <div className="ttr-edit-profile">
      <div className="border border-bottom-0">
        <Link
          to="/profile"
          className="btn btn-light rounded-pill fa-pull-left fw-bolder mt-2 mb-2 ms-2"
        >
          <i className="fa fa-close"></i>
        </Link>
        <Link
          to="/profile"
          onClick={saveState}
          className="btn btn-dark rounded-pill fa-pull-right fw-bolder mt-2 mb-2 me-2"
        >
          Save
        </Link>
        <h4 className="p-2 mb-0 pb-0 fw-bolder">Edit profile</h4>
        <div className="mb-5 position-relative">
          <img className="w-100" src={profile.header} />
          <div className="bottom-0 left-0 position-absolute">
            <div className="position-relative">
              <img
                className="rounded-circle position-relative ttr-z-index-1 ttr-top-40px ttr-width-150px profile-logo"
                src={profile.avatar}
              />
            </div>
          </div>
        </div>
      </div>
      <form action="profile.html">
        <div className="border border-secondary rounded-3 p-2 mb-3">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            title="Username"
            readOnly
            className="p-0 form-control border-0"
            placeholder={profile.username}
          />
        </div>
        <div className="border border-secondary rounded-3 p-2 mb-3">
          <label htmlFor="first-name">First name</label>
          <input
            id="first-name"
            className="p-0 form-control border-0"
            placeholder="First Name"
            value={profile.firstName}
          />
        </div>
        <div className="border border-secondary rounded-3 p-2 mb-3">
          <label htmlFor="last-name">Last name</label>
          <input
            id="last-name"
            className="p-0 form-control border-0"
            placeholder="Last Name"
            value={profile.lastName}
          />
        </div>
        <div className="border border-secondary rounded-3 p-2 mb-3">
          <label htmlFor="bio">Bio</label>
          <textarea
            onChange={editBio}
            className="p-0 form-control border-0"
            id="bio"
          ></textarea>
        </div>
        <div className="border border-secondary rounded-3 p-2 mb-3">
          <label htmlFor="date-of-birth">Date of birth</label>
          <input
            id="date-of-birth"
            className="p-0 form-control border-0"
            type="date"
            value="2003-01-02"
          />
        </div>
        <div className="border border-secondary rounded-3 p-2 mb-3">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="alan@cam.ac.uk"
            className="p-0 form-control border-0"
            type="email"
          />
        </div>
        <div className="border border-secondary rounded-3 p-2 mb-3">
          <label htmlFor="password">Reset password</label>
          <input
            id="password"
            className="p-0 form-control border-0"
            type="password"
          />
        </div>
        <div className="border border-secondary rounded-3 p-2 mb-3">
          <label for="photo">Profile photo</label>
          <input
            id="photo"
            className="p-0 form-control border-0"
            onChange={uploadAvatar}
            type="file"
          />
        </div>
        <div className="border border-secondary rounded-3 p-2 mb-3">
          <label for="header">Header image</label>
          <input
            id="header"
            className="p-0 form-control border-0"
            onChange={uploadHeader}
            type="file"
          />
        </div>
        <div className="border border-secondary rounded-3 p-2 mb-3">
          <label for="account">Select account</label>
          <select className="p-0 form-control border-0" id="account">
            <option>Personal account</option>
            <option selected>Academic account</option>
          </select>
        </div>
        <div className="border border-secondary rounded-3 p-2 mb-3">
          Marital status
          <input id="married" type="radio" name="marital" />
          <label for="married">Married</label>
          <input id="single" type="radio" checked name="marital" />
          <label for="single">Single</label>
        </div>
        <div className="border border-secondary rounded-3 p-2 mb-3">
          Topics of interest
          <input id="space" type="checkbox" checked name="topics" />
          <label for="space">Space</label>
          <input id="energy" type="checkbox" checked name="topics" />
          <label for="energy">Energy</label>
          <input id="politics" type="checkbox" name="topics" />
          <label for="politics">Politics</label>
        </div>
      </form>
    </div>
  );
};
export default EditProfile;
