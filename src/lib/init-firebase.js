// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAb5ucDahLmDupsP3s5M2aSP3Hfczz-_OE",
  authDomain: "workoutapp-b9293.firebaseapp.com",
  databaseURL: "https://workoutapp-b9293-default-rtdb.firebaseio.com",
  projectId: "workoutapp-b9293",
  storageBucket: "workoutapp-b9293.appspot.com",
  messagingSenderId: "384097413483",
  appId: "1:384097413483:web:ae0d95ff5a02e06816442e",
  measurementId: "G-Y2RGXGKQM9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firstore
export const db = getFirestore(app);
