import React, { useEffect, useState } from "react";
import * as service from "../../services/tuits-service";

const TuitPrivate = ({tuit, setTuitPrivate = () => {}, setTuitPublic = () => {}}) => {

    const [isPrivate, setIsPrivate] = useState(null);

    const findIfPrivate = () => {
        service.findTuitById(tuit._id).then(tuit => setIsPrivate(tuit.isPrivate));
    }

    useEffect(() => {
        findIfPrivate();
    }, []);

    const toggleTuitStatus = () => {
        if (isPrivate) {
            service.setTuitPublic(tuit._id).then(setIsPrivate(false));
        } else {
            service.setTuitPrivate(tuit._id).then(setIsPrivate(true));
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
