import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARLX21HzT1UeEkXt5nCszZ94MqyF1VxZU",
  authDomain: "rhythmflow-30b07.firebaseapp.com",
  projectId: "rhythmflow-30b07",
  storageBucket: "rhythmflow-30b07.firebasestorage.app",
  messagingSenderId: "75075881572",
  appId: "1:75075881572:web:a93964bd67bdf15460ad71"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
