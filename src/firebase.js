import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// ADD FIREBASE CONFIGURATION HERE
const firebaseConfig = "<your_firebase_config>";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}