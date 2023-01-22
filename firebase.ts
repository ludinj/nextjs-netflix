// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAYDQ2Akfo2Qttlr3bS5WX711sDr4c9NuQ',
  authDomain: 'netflix-clone-nextjs-ac499.firebaseapp.com',
  projectId: 'netflix-clone-nextjs-ac499',
  storageBucket: 'netflix-clone-nextjs-ac499.appspot.com',
  messagingSenderId: '1059562664049',
  appId: '1:1059562664049:web:346cdfd1148e7f7b772bd0'
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
