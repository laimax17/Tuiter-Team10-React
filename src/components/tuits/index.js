import React from "react";
import "./tuits.css";
import Tuit from "./tuit";
import * as likesService from "../../services/likes-service";
import * as service from "../../services/tuits-service";
import * as privateService from "../../services/private-service";

const Tuits = ({ tuits = [], refreshTuits }) => {
  const likeTuit = (tuit) =>
    likesService
      .userLikesTuit("me", tuit._id)
      .then(refreshTuits)
      .catch((e) => alert(e));

  const dislikeTuit = (tuit) =>
    likesService
      .userDislikesTuit("me", tuit._id)
      .then(refreshTuits)
      .catch((e) => alert(e));

  const deleteTuit = (tid) => service.deleteTuit(tid).then(refreshTuits);

  const setTuitPublic = (tuit) =>
    privateService
      .setTuitPublic(tuit._id, {"isPrivate":false})
      .then(refreshTuits)
      .catch((e) => alert(e));

  const setTuitPrivate = (tuit) =>
    privateService
      .setTuitPublic(tuit._id, {"isPrivate":true})
      .then(refreshTuits)
      .catch((e) => alert(e));

  return (
    <div>
      <ul className="ttr-tuits list-group">
        {tuits.map &&
          tuits.map((tuit) => (
            <Tuit
              key={tuit._id}
              deleteTuit={deleteTuit}
              likeTuit={likeTuit}
              dislikeTuit={dislikeTuit}
              tuit={tuit}
              setTuitPrivate={setTuitPrivate}
              setTuitPublic={setTuitPublic}
            />
          ))}
      </ul>
    </div>
  );
};

export default Tuits;
