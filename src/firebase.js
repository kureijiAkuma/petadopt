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
  apiKey: "AIzaSyCvM12sgxzWcTSmBPVa6hiiKIo47_NtOdo",
  authDomain: "petapp-2ce00.firebaseapp.com",
  projectId: "petapp-2ce00",
  storageBucket: "petapp-2ce00.appspot.com",
  messagingSenderId: "362396351909",
  appId: "1:362396351909:web:ce5e9938afa519090e3c4c",
  measurementId: "G-Y1629NPZQP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const imgDB = getStorage(app);
const txtDB = getFirestore(app);

export {txtDB, imgDB , auth, provider}