import { getFirebaseAdminAuth } from '$lib/firebase/firebase.admin.js';
import { text } from '@sveltejs/kit';
import { z } from 'zod';

const schema = z.object({
	uid: z.string()
});

/** @type {import("./$types").RequestHandler} */
export async function POST({ request }) {
	const body = await request.json();
	const data = schema.parse(body);
	const auth = getFirebaseAdminAuth();
	await auth.setCustomUserClaims(data.uid, {
		admin: true
	});
	return text('Success');
}
