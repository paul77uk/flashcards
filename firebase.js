// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANfEAX2ZIHPJEcjtb0Wo4opKuxFAtZ8ek",
  authDomain: "flashcards-e9988.firebaseapp.com",
  projectId: "flashcards-e9988",
  storageBucket: "flashcards-e9988.appspot.com",
  messagingSenderId: "613668632503",
  appId: "1:613668632503:web:34554839fe59c35bc59a32",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;