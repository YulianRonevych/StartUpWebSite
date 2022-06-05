// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getStorage} from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkJUDhKX1EnE4xlv1kOyZ9-e-TNN7vOuE",
  authDomain: "startapp-46f7c.firebaseapp.com",
  projectId: "startapp-46f7c",
  storageBucket: "startapp-46f7c.appspot.com",
  messagingSenderId: "635258710992",
  appId: "1:635258710992:web:3c9a99a10c32c4107427d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export default storage;