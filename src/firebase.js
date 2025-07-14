
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBo2Q62djphIsB9KKWu7UjqMFDoV7FIqno",
  authDomain: "todoapp-a3bae.firebaseapp.com",
  projectId: "todoapp-a3bae",
  storageBucket: "todoapp-a3bae.firebasestorage.app",
  messagingSenderId: "772563172834",
  appId: "1:772563172834:web:daf9639d97f0068c850dbb"
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)