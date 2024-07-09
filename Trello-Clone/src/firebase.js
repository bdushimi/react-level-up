import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ADD FIREBASE CONFIGURATION HERE
// const firebaseConfig = "<your_firebase_config>";
const firebaseConfig = {
  apiKey: "AIzaSyBoy2EsR0n15LqR4L0OBZZs_g9Aw7rkOKI",
  authDomain: "trello-clone-f0e97.firebaseapp.com",
  projectId: "trello-clone-f0e97",
  storageBucket: "trello-clone-f0e97.appspot.com",
  messagingSenderId: "842001788566",
  appId: "1:842001788566:web:bfbfa35d95d6ac694e9cb7",
  measurementId: "G-0X0SJ8CL2L",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
