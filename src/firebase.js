// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeIzkQaKx0_JOMnNPcOtdFQgtjB0wMQZo",
  authDomain: "inner-peace-meditation-app.firebaseapp.com",
  projectId: "inner-peace-meditation-app",
  storageBucket: "inner-peace-meditation-app.appspot.com",
  messagingSenderId: "611370435230",
  appId: "1:611370435230:web:2125450be2b666e91a318f",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);
