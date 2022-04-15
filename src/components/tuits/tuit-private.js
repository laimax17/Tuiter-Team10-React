import React, { useEffect, useState } from "react";
import * as service from "../../services/tuits-service";
import * as privateService from "../../services/private-service";

const TuitPrivate = ({tuit, setTuitPrivate = () => {}, setTuitPublic = () => {}}) => {

    const [isPrivate, setIsPrivate] = useState(null);

    const findIfPrivate = () => {
        service.findTuitById(tuit._id).then(tuit => setIsPrivate(tuit.isPrivate));
    }
    const setPublic = { "isPrivate": false };
    const setPrivate = { "isPrivate": true };
    useEffect(() => {
        findIfPrivate();
    }, []);

    const toggleTuitStatus = () => {
        if (isPrivate) {
            // service.setTuitPublic(tuit._id).then(setIsPrivate(false));
            privateService.setTuitPublic(tuit._id, setPublic).then(setIsPrivate(false));
        } else {
            // service.setTuitPrivate(tuit._id).then(setIsPrivate(true));
            privateService.setTuitPrivate(tuit._id, setPrivate).then(setIsPrivate(true));
        }
    }

    return (
        <div>
            {isPrivate ? (
                <button onClick={() => toggleTuitStatus()}>
                    SET PUBLIC
                </button>
            ) : (
                <button onClick={() => toggleTuitStatus()}>
                    SET PRIVATE
                </button>
            )}
        </div>
    );
};

export default TuitPrivate;
