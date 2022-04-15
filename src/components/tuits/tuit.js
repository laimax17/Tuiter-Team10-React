import React, { useState } from "react";
import TuitStats from "./tuit-stats";
//import TuitImage from "./tuit-image";
import TuitVideo from "./tuit-video";
import TuitPrivate from "./tuit-private";
import { Link } from "react-router-dom";
import { TuitContext } from "../tuiter";
import { useContext } from "react";
import * as userService from "../../services/users-service";
import * as profileService from "../../services/security-service";

const Tuit = ({ tuit, deleteTuit, likeTuit, dislikeTuit, setTuitPrivate, setTuitPublic }) => {
  const daysOld = (tuit) => {
    const now = new Date();
    const nowMillis = now.getTime();
    const posted = new Date(tuit.postedOn);
    const postedMillis = posted.getTime();
    const oldMillis = nowMillis - postedMillis;
    let old = 0.0;
    const secondsOld = oldMillis / 1000.0;
    const minutesOld = secondsOld / 60.0;
    const hoursOld = minutesOld / 60.0;
    const daysOld = hoursOld / 24.0;
    if (daysOld > 1) {
      old = Math.round(daysOld) + "d";
    } else if (hoursOld > 1) {
      old = Math.round(hoursOld) + "h";
    } else if (minutesOld > 1) {
      old = Math.round(minutesOld) + "m";
    } else if (secondsOld > 1) {
      old = Math.round(secondsOld) + "s";
    }
    return old;
  };

  const { handleZoom } = useContext(TuitContext);
  
  
  const getUser = async () => {
    const user = await profileService.profile(tuit.userId);
    return user;
  }; 
  
  const [ifMyTuit, setIfMyTuit] = useState( false );
  let user;
  getUser().then(data => {
    user = data;
    if (tuit.postedBy._id === user._id) {
      setIfMyTuit(true);
    } else {
      setIfMyTuit(false);
    }
    
  });

const notMyTuitAndPrivate = (ifMyTuit === false) && (tuit.isPrivate === true);
console.log(notMyTuitAndPrivate);
  
//if not my tuit and isPrivate==true then dont render, else render
  // (!ifMyTuit && tuit.isPrivate)

  return (
    
   
  <div>
    { notMyTuitAndPrivate ?  (<span></span>): (
      <div>
    <li className="p-2 ttr-tuit list-group-item d-flex rounded-0">
      <div className="pe-2">
        {tuit.postedBy && (
          <img
            src={tuit.postedBy.avatar ? tuit.postedBy.avatar : ""}
            className="ttr-tuit-avatar-logo rounded-circle avatar-logo"
          />
        )}
      </div>
      <div className="w-100">
        <i
          onClick={() => deleteTuit(tuit._id)}
          className="fas fa-remove fa-2x fa-pull-right"
        ></i>
        <Link to={`/tuit/${tuit._id}`}>
          <i className="float-end fas fa-circle-ellipsis me-1"></i>
        </Link>
        <h2 className="fs-5">
          {tuit.postedBy && tuit.postedBy.username}@
          {tuit.postedBy && tuit.postedBy.email} -
          <span className="ms-1">{daysOld(tuit)}</span>
        </h2>
        {tuit.tuit}
        {tuit.youtube && <TuitVideo tuit={tuit} />}
        <div className="row">
          {tuit.image &&
            tuit.image.map((url) => (
              <div
                onClick={() => handleZoom(url)}
                alt="Tuit Image"
                className="m-1 img-thumbnail create-tuit-image"
                style={{
                  display: "inline-block",
                  width: "150px",
                  height: "150px",
                  backgroundImage: `url(${url})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              />
            ))}
        </div>
        <TuitStats tuit={tuit} likeTuit={likeTuit} dislikeTuit={dislikeTuit} />

        <div>
          { ifMyTuit ?
              <TuitPrivate tuit={tuit} setTuitPublic={setTuitPublic} setTuitPrivate={setTuitPrivate} />
              : <p1></p1>
          }
        </div>
      </div>
    </li>
    
    </div>)
    
        }
    </div>
  );
};
export default Tuit;
