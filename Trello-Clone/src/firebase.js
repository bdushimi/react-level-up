import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const API_KEY = import.meta.env.VITE_API_KEY;

// ADD FIREBASE CONFIGURATION HERE
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "trello-clone-97722.firebaseapp.com",
  projectId: "trello-clone-97722",
  storageBucket: "trello-clone-97722.appspot.com",
  messagingSenderId: "186038753184",
  appId: "1:186038753184:web:7a1dd95227ff8b3df136c5",
  measurementId: "G-QH8XDG0L52"
};





const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
