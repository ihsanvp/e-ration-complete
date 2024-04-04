import { AuthConfig } from '$lib/auth/config.auth.js';
import { getSession } from '$lib/auth/session.auth.js';
import { getFirebaseAdminAuth } from '$lib/firebase/firebase.admin.js';
import { error, text } from '@sveltejs/kit';
import { z } from 'zod';

const schema = z.object({
	uid: z.string()
});

/** @type {import("./$types").RequestHandler} */
export async function POST(event) {
	const body = await event.request.json();
	const data = schema.parse(body);
	const session = getSession(event, AuthConfig);
	if (!session) {
		return error(401);
	}
	const auth = getFirebaseAdminAuth();
	const user = await auth.getUser(data.uid);
	if (!user) {
		return error(401);
	}
	if (!user.customClaims || !user.customClaims['admin']) {
		return error(401);
	}
	await auth.setCustomUserClaims(data.uid, {
		admin: true
	});
	return text('Success');
}
