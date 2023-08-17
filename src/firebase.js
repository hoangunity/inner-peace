// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { GoogleAuthProvider, getAuth } from "firebase/auth";

// export const googleProvider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyCeIzkQaKx0_JOMnNPcOtdFQgtjB0wMQZo",
  authDomain: "inner-peace-meditation-app.firebaseapp.com",
  projectId: "inner-peace-meditation-app",
  storageBucket: "inner-peace-meditation-app.appspot.com",
  messagingSenderId: "611370435230",
  appId: "1:611370435230:web:2125450be2b666e91a318f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
// export const auth = getAuth(firebaseApp);
