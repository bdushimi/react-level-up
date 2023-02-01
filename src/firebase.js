import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ADD FIREBASE CONFIGURATION HERE
const firebaseConfig = {
  apiKey: "AIzaSyAazgp3u8SgSuF83fBDvIWlTGZh2Tz8T6w",
  authDomain: "trello-clone-f76b9.firebaseapp.com",
  projectId: "trello-clone-f76b9",
  storageBucket: "trello-clone-f76b9.appspot.com",
  messagingSenderId: "725864341251",
  appId: "1:725864341251:web:fd373da23c85ab4d9fd336",
  measurementId: "G-PLJFQS8JNV",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
