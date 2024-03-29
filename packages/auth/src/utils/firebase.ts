import { type FirebaseApp, initializeApp } from 'firebase/app';
import { type Auth, initializeAuth } from 'firebase/auth';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

let firebaseApp: FirebaseApp;
let firebaseAuth: Auth;

export function getFirebaseApp(config: FirebaseConfig) {
  if (!firebaseApp) {
    firebaseApp = initializeApp(config);
  }
  return firebaseApp;
}

export function getFirebaseAuth(config: FirebaseConfig) {
  if (!firebaseAuth) {
    firebaseAuth = initializeAuth(getFirebaseApp(config));
  }
  return firebaseAuth;
}
