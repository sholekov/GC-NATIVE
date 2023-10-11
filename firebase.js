// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFT5XmuBSApbMeT7994w_z3CcVQXtCYJc",
  authDomain: "gc-chat-test-1.firebaseapp.com",
  projectId: "gc-chat-test-1",
  storageBucket: "gc-chat-test-1.appspot.com",
  messagingSenderId: "426704040232",
  appId: "1:426704040232:web:6862c2fb735848067be01d"
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// // Initialize Firebase
// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app()
// }

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export { auth };