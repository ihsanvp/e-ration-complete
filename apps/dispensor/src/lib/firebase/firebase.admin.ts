import { FIREBASE_ADMIN_KEY } from '$env/static/private';
import firebaseAdmin from 'firebase-admin';

type FirebaseAdminApp = firebaseAdmin.app.App;
type FirebaseAdminAuth = firebaseAdmin.auth.Auth;

let firebaseAdminApp: FirebaseAdminApp;
let firebaseAdminAuth: FirebaseAdminAuth;

export function getFirebaseAdminApp(): FirebaseAdminApp {
	if (!firebaseAdminApp) {
		if (!firebaseAdmin.apps.length) {
			firebaseAdminApp = firebaseAdmin.initializeApp({
				credential: firebaseAdmin.credential.cert(JSON.parse(FIREBASE_ADMIN_KEY))
			});
		} else {
			firebaseAdminApp = firebaseAdmin.apps[0]!;
		}
	}
	return firebaseAdminApp;
}

export function getFirebaseAdminAuth(): FirebaseAdminAuth {
	if (!firebaseAdminAuth) {
		firebaseAdminAuth = getFirebaseAdminApp().auth();
	}
	return firebaseAdminAuth;
}
