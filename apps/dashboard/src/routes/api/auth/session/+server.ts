import { AuthConfig } from '$lib/auth/config.auth.js';
import { createSession, getSession } from '$lib/auth/session.auth.js';
import { error, redirect, text } from '@sveltejs/kit';
import { z } from 'zod';

const schema = z.object({
	uid: z.string()
});

/** @type {import("./$types").RequestHandler} */
export async function POST({ cookies, request }) {
	const body = await request.json();
	const data = schema.parse(body);
	const session = await createSession(data.uid);

	cookies.set(AuthConfig.cookie.name, JSON.stringify(session), AuthConfig.cookie.options);
	return text('Success');
}

/** @type {import("./$types").RequestHandler} */
export async function DELETE(event) {
	const session = getSession(event, AuthConfig);
	if (!session) {
		return error(401, 'Unauthorized');
	}
	event.cookies.delete(AuthConfig.cookie.name, AuthConfig.cookie.options);
	event.locals.user = undefined;
	event.locals.session = undefined;
	return text('Success');
}
