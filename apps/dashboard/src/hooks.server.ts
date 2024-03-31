import { AuthConfig } from '$lib/auth/config.auth';
import { getSession } from '$lib/auth/session.auth';
import { isProtectedRoute } from '$lib/auth/utils.auth';
import { getFirebaseAdminAuth } from '$lib/firebase/firebase.admin';
import { initializeDatabase } from '$lib/utils/db';
import { error, redirect } from '@sveltejs/kit';

/** @type {import("@sveltejs/kit").Handle} */
export async function handle({ event, resolve }) {
	if (isProtectedRoute(event, AuthConfig.excludeRoutes)) {
		initializeDatabase();
		const session = getSession(event, AuthConfig);
		if (!session) {
			throw redirect(307, '/login');
		}
		event.locals.session = session;
		const auth = getFirebaseAdminAuth();
		const user = await auth.getUser(session.uid);
		if (!user) {
			event.locals.session = undefined;
			event.cookies.delete(AuthConfig.cookie.name, AuthConfig.cookie.options);
			throw redirect(307, '/login');
		}
		const isAdmin = (user.customClaims && user.customClaims['admin'] == true) || false;
		if (!isAdmin) {
			event.locals.session = undefined;
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
