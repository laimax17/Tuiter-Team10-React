// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/storage";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-dm1daGLT20OYeSLoEBaNgpONxDdiw44",
  authDomain: "image-d9eae.firebaseapp.com",
  projectId: "image-d9eae",
  storageBucket: "image-d9eae.appspot.com",
  messagingSenderId: "1038000136322",
  appId: "1:1038000136322:web:1176dce40b30e2aa0e949b",
  measurementId: "G-BNG7JV28LR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };
