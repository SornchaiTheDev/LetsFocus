import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDaB7C08E4fvsrb2ZvqztssTQrbuemhaAE",
  authDomain: "letmakeyoufocus.firebaseapp.com",
  projectId: "letmakeyoufocus",
  storageBucket: "letmakeyoufocus.appspot.com",
  messagingSenderId: "316103177997",
  appId: "1:316103177997:web:6a845dd60cf6b850992244",
  measurementId: "G-3SY1Y6C49Y",
};

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const firestore = firebase.firestore;
export const auth = firebase.auth;
