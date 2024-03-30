import { type FirebaseApp, initializeApp } from 'firebase/app';
import { type Auth, initializeAuth } from 'firebase/auth';

import { FIREBASE_ADMIN_KEY } from '$env/static/private';
import firebaseAdmin from 'firebase-admin';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

type FirebaseAdminApp = firebaseAdmin.app.App;
type FirebaseAdminAuth = firebaseAdmin.auth.Auth;

let firebaseAdminApp: FirebaseAdminApp;
let firebaseAdminAuth: FirebaseAdminAuth;

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

export function getFirebaseAdminApp(credential: string): FirebaseAdminApp {
  if (!firebaseAdminApp) {
    if (!firebaseAdmin.apps.length) {
      firebaseAdminApp = firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(JSON.parse(credential))
      });
    } else {
      firebaseAdminApp = firebaseAdmin.apps[0]!;
    }
  }
  return firebaseAdminApp;
}

export function getFirebaseAdminAuth(credential: string): FirebaseAdminAuth {
  if (!firebaseAdminAuth) {
    firebaseAdminAuth = getFirebaseAdminApp(credential).auth();
  }
  return firebaseAdminAuth;
}
