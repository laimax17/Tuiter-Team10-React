import React, { useEffect, useState } from "react";
import TuitStats from "./tuit-stats";
import TuitVideo from "./tuit-video";
import { Link } from "react-router-dom";
import { TuitContext } from "../tuiter";
import { useContext } from "react";
import * as tuitService from "../../services/tuits-service";
import * as service from "../../services/security-service";

const Tuit = ({ tuit, deleteTuit, likeTuit, dislikeTuit }) => {

  const { handleZoom } = useContext(TuitContext);

  const [profile, setProfile] = useState({});
  useEffect(async () => {
    const user = await service.profile();
    setProfile(user);
  }, []);


  return (
    <div>
      <div>
        <li className="p-2 ttr-tuit list-group-item d-flex rounded-0">
          <div className="w-100">
            <div className="row">
              {tuit.image &&
                tuit.image.map((url, index) => (
                  <div
                    data-testid="background"
                    onClick={() => handleZoom(url)}
                    alt="Tuit Image"
                    className="m-1 img-thumbnail create-tuit-image"
                    key={index}
                    style={{
                      display: "inline-block",
                      width: "150px",
                      height: "150px",
                      backgroundImage: `url(${url})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover"
                    }}
                  />
                ))}
            </div>
          </div>
        </li>
      </div>
    </div>
  );
};
export default Tuit;
