//--------

// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA-BOpxyssc0MeVyVe3FfTv0ycjUQh_eHE',
  authDomain: 'netflix-portfolio-77c8e.firebaseapp.com',
  projectId: 'netflix-portfolio-77c8e',
  storageBucket: 'netflix-portfolio-77c8e.appspot.com',
  messagingSenderId: '462649946047',
  appId: '1:462649946047:web:4e3e06da8418ba3efd3b0a',
  measurementId: 'G-612265X7V5',
}

// Initialize Firebase: we need to do this becos we are using nextjs SSR
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
