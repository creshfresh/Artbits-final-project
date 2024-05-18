//Android ClientId: 1006799876952-5jft6q2blgrgh64ptcd5a638mar38ihn.apps.googleusercontent.com
//                  1006799876952-5lsho05s7c1kj1edc01kp8ljvp85marj.apps.googleusercontent.com
// Import the functions you need from the SDKs you need

import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";

const firebaseConfig = {
  apiKey: "AIzaSyAVJq1CATvVC-Y7MuRYdJwG6q2-zOpaR6A",
  authDomain: "artbits-final-projecc.firebaseapp.com",
  projectId: "artbits-final-projecc",
  storageBucket: "artbits-final-projecc.appspot.com",
  messagingSenderId: "1006799876952",
  appId: "1:1006799876952:web:d070bacbee647496216b2d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage= getStorage(app);
export const database= getFirestore(app);
