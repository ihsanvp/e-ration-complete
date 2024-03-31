import { FIREBASE_ADMIN_KEY } from '$env/static/private';
import { AuthConfig } from '$lib/auth/config.auth.js';
import { getSession } from '$lib/auth/session.auth.js';
import { getFirebaseAdminAuth } from '$lib/firebase/firebase.admin.js';
import { User, getUserRepository } from '@e-ration/database';
import { error, redirect } from '@sveltejs/kit';
import { z } from 'zod';

const schema = z.object({
	name: z.string(),
	location: z.string()
});

/** @type {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const name = data.get('name');
		const location = data.get('location');
		const parsedData = schema.parse({ name, location });
		const session = getSession(event, AuthConfig);
		if (!session) {
			return error(401, 'Unauthorized');
		}
		const auth = getFirebaseAdminAuth();
		const firebaseUser = await auth.getUser(session.uid);
		if (!firebaseUser) {
			return error(401, 'Unauthorized');
		}
		const repo = getUserRepository();
		const user = User.fromJson({
			id: session.uid,
			name: parsedData.name,
			location: parsedData.location,
			phoneNumber: firebaseUser.phoneNumber!
		});
		await repo.create(user);
		return redirect(307, '/');
	}
};
