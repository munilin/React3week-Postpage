import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFqWf-YnomhM0SFOTvjVcjQEiOSppFCwM",
  authDomain: "react3week.firebaseapp.com",
  projectId: "react3week",
  storageBucket: "react3week.appspot.com",
  messagingSenderId: "1016125190277",
  appId: "1:1016125190277:web:e86afc62f611813cec79ec",
  measurementId: "G-G16LN98M9G",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
