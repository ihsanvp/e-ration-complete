import admin from 'firebase-admin';
import * as fireorm from 'fireorm';

interface ConnectionConfig {
  credential: string;
  projectId: string;
}

let firebaseAdminApp: admin.app.App;
let firestoreAdminApp: admin.firestore.Firestore;

function getFirebaseAdminApp(config: ConnectionConfig): admin.app.App {
  if (!firebaseAdminApp) {
    if (!admin.apps.length) {
      firebaseAdminApp = admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(config.credential)),
        databaseURL: `https://${config.projectId}.firebaseio.com`
      });
    } else {
      firebaseAdminApp = admin.apps[0]!;
    }
  }
  return firebaseAdminApp;
}

function getFirestoreAdminApp(config: ConnectionConfig): admin.firestore.Firestore {
  if (!firestoreAdminApp) {
    firestoreAdminApp = getFirebaseAdminApp(config).firestore();
  }
  return firestoreAdminApp;
}

export function connectToFirebaseDatabase(config: ConnectionConfig) {
  const firestore = getFirestoreAdminApp(config);
  fireorm.initialize(firestore);
}
