// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxsxZhGnA45By4wTmu275aaqqqbXjMIxk",
  authDomain: "petapp-4e257.firebaseapp.com",
  projectId: "petapp-4e257",
  storageBucket: "petapp-4e257.appspot.com",
  messagingSenderId: "1068781362337",
  appId: "1:1068781362337:web:253ac22911b998a0ed24e0",
  measurementId: "G-LDQCZDP8Y7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const DB = getFirestore(app);
const storage = getStorage(app);
export {storage, DB, auth, provider}