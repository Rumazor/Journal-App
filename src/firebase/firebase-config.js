import "firebase/firestore";
import "firebase/auth";
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgUpMWoJqQtVhomWda16gOH45rJ09cIWM",
  authDomain: "react-app-journal-60c5e.firebaseapp.com",
  projectId: "react-app-journal-60c5e",
  storageBucket: "react-app-journal-60c5e.appspot.com",
  messagingSenderId: "465301752158",
  appId: "1:465301752158:web:cb8d787b0d0aed9f3667cf",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
auth.languageCode = "es";
