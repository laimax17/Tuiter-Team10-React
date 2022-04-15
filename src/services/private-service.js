import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;
const TUITS_API = `${BASE_URL}/api/tuits`;


const api = axios.create({
  withCredentials: true,
});

const setPublic = { "isPrivate": false };
const setPrivate = { "isPrivate": true };

export const setTuitPublic = (tid, setPublic) => 
    api.put(`${TUITS_API}/${tid}/isPrivate`,setPublic).then(response => response.data);

export const setTuitPrivate = (tid, setPrivate) => 
    api.put(`${TUITS_API}/${tid}/isPrivate`,setPrivate).then(response => response.data);

