import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCukvpRXwLKnmiHTnrWhoySNXvnqP-BhbY",
  authDomain: "digiprex-01.firebaseapp.com",
  projectId: "digiprex-01",
  storageBucket: "digiprex-01.appspot.com",
  messagingSenderId: "714045436514",
  appId: "1:714045436514:web:a81ac0c0b44b266cb0173b",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
