import { AuthConfig } from '$lib/auth/config.auth';
import { getSession } from '$lib/auth/session.auth';
import { getFirebaseAdminAuth } from '$lib/firebase/firebase.admin';
import { User, getUserRepository } from '@e-ration/database';
import { error, redirect, text } from '@sveltejs/kit';
import { z } from 'zod';

const schema = z.object({
	id: z.string().optional(),
	name: z.string(),
	rationNumber: z.string(),
	category: z.object({
		id: z.string(),
		name: z.string()
	})
});

/** @type {import("./$types").RequestHandler} */
export async function POST(event) {
	const body = await event.request.json();
	const data = schema.parse(body);
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
	if (data.id) {
		const user = await repo.findById(data.id);
		user.name = data.name;
		user.rationNumber = data.rationNumber;
		user.category = data.category;
		await repo.update(user);
	} else {
		const user = User.fromJson({
			id: session.uid,
			name: data.name,
			rationNumber: data.rationNumber,
			phoneNumber: firebaseUser.phoneNumber!,
			category: data.category,
			created: new Date().toISOString()
		});
		await repo.create(user);
	}
	return text('Success');
}
