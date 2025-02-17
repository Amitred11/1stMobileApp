// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCWDQ-k1S2JsHHNJtDuj6s0RMLKw66Faaw',
  authDomain: 'mobileapp-98382.firebaseapp.com',
  projectId: 'mobileapp-98382',
  storageBucket: 'mobileapp-98382.appspot.com', 
  messagingSenderId: '429171795983',
  appId: '1:429171795983:web:ae33eb7fc110fc4bfc9b7a',
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with persistence
const auth = getAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Firebase authentication functions
const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
const signInUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

export { auth, createUser, signInUser };
