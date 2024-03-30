import { FIREBASE_ADMIN_KEY } from '$env/static/private';
import { ServerAuth } from '$lib/auth/server.auth';
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
		const session = ServerAuth.getServerSession(event);
		if (!session) {
			return error(401, 'Unauthorized');
		}
		const firebaseUser = await ServerAuth.getFirebaseUser(event, FIREBASE_ADMIN_KEY);
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
