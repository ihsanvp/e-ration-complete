import { AuthConfig } from '$lib/auth/config.auth';
import { getSession } from '$lib/auth/session.auth';
import { isApiRequest, isProtectedRequest } from '$lib/auth/utils.auth';
import { getFirebaseAdminAuth } from '$lib/firebase/firebase.admin';
import { initializeDatabase } from '$lib/utils/db';
import { error, redirect } from '@sveltejs/kit';

/** @type {import("@sveltejs/kit").Handle} */
export async function handle({ event, resolve }) {
	if (isApiRequest(event)) {
		initializeDatabase();
	}

	if (isProtectedRequest(event, AuthConfig.excludeRoutes)) {
		const session = getSession(event, AuthConfig);
		if (!session) {
			throw redirect(307, '/login');
		}
		const auth = getFirebaseAdminAuth();
		const user = await auth.getUser(session.uid);
		if (!user) {
			event.cookies.delete(AuthConfig.cookie.name, AuthConfig.cookie.options);
			throw redirect(307, '/login');
		}
		const isAdmin = (user.customClaims && user.customClaims['admin'] == true) || false;
		if (!isAdmin) {
			event.cookies.delete(AuthConfig.cookie.name, AuthConfig.cookie.options);
			return redirect(307, '/login');
		}
		event.locals.user = {
			id: user.uid,
			email: user.email!
		};
	}
	return resolve(event);
}
