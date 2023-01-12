// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY6rXKZGUnU9hlegGubJzD805EOdFCsgo",
  authDomain: "flirtee-dd54a.firebaseapp.com",
  projectId: "flirtee-dd54a",
  storageBucket: "flirtee-dd54a.appspot.com",
  messagingSenderId: "473511394114",
  appId: "1:473511394114:web:f120f27408808bf2ae66db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore();

export { auth, db };

