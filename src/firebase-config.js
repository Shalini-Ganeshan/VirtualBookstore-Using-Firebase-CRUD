// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_Uk3fYtbX1qbqUVXXcqs5IwYkmMvHSJg",
  authDomain: "bookstore-1a039.firebaseapp.com",
  databaseURL: "https://bookstore-1a039-default-rtdb.firebaseio.com",
  projectId: "bookstore-1a039",
  storageBucket: "bookstore-1a039.appspot.com",
  messagingSenderId: "1022940631410",
  appId: "1:1022940631410:web:d46d45fef127a38d164deb",
  measurementId: "G-C0MVKT9GQW"
};


const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);