// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyANrTXcHrFGGXpCgoz-zxvOhrnk_vyAs3M",
  authDomain: "recipe-app-1498f.firebaseapp.com",
  projectId: "recipe-app-1498f",
  storageBucket: "recipe-app-1498f.appspot.com",
  messagingSenderId: "807508496963",
  appId: "1:807508496963:web:a27b2ad2811c170cd23af6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const textDB = getFirestore(app);
const imgDB = getStorage(app);

export {textDB, imgDB};
export const auth = getAuth(app)
export default app