//Android ClientId: 1006799876952-5jft6q2blgrgh64ptcd5a638mar38ihn.apps.googleusercontent.com
// Import the functions you need from the SDKs you need

import { getAuth } from "firebase/auth";

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVJq1CATvVC-Y7MuRYdJwG6q2-zOpaR6A",
  authDomain: "artbits-final-projecc.firebaseapp.com",
  projectId: "artbits-final-projecc",
  storageBucket: "artbits-final-projecc.appspot.com",
  messagingSenderId: "1006799876952",
  appId: "1:1006799876952:web:d070bacbee647496216b2d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
