// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxxx",
  projectId: "xxxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxxxxxxx",
  appId: "xxxxxxxxxxxxxx",
  measurementId: "xxxxxxxxxxxxx"
};

// Initialize Firebase
 initializeApp(firebaseConfig);

 export const db = getFirestore();
 export const getAuths = getAuth()
