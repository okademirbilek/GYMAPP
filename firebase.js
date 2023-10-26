import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env
    .VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_IDVITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
}

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAqtChh7TED-V3zfNZU-O2SIqtPcyH9QpM",
//   authDomain: "gymapp-6f391.firebaseapp.com",
//   projectId: "gymapp-6f391",
//   storageBucket: "gymapp-6f391.appspot.com",
//   messagingSenderId: "1000861413253",
//   appId: "1:1000861413253:web:7dcac16ccb6afeb4a31eec"
// };

const app = initializeApp(firebaseConfig)

//variable for authentication
export const auth = getAuth(app)

//database
export const db = getFirestore(app)

export default app
