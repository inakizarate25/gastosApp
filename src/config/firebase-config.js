import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDc7LrpovivkZ75ULYW7CQ9TQtDRmH5YE8",
  authDomain: "gastosapp-1bd60.firebaseapp.com",
  projectId: "gastosapp-1bd60",
  storageBucket: "gastosapp-1bd60.appspot.com",
  messagingSenderId: "770373298134",
  appId: "1:770373298134:web:9debe69acced2041daa677",
  measurementId: "G-6T1ENCP25X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
