import { connectToFirebaseDatabase } from '@e-ration/database';
import { FIREBASE_ADMIN_KEY } from '$env/static/private';
import { PUBLIC_FIREBASE_PROJECT_ID } from '$env/static/public';

export function initializeDatabase() {
	connectToFirebaseDatabase({
		credential: FIREBASE_ADMIN_KEY,
		projectId: PUBLIC_FIREBASE_PROJECT_ID
	});
}
