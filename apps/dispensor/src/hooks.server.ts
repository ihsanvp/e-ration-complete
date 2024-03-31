import { AuthConfig } from '$lib/auth/config.auth';
import { getSession } from '$lib/auth/session.auth';
import { isProtectedRoute } from '$lib/auth/utils.auth';
import { initializeDatabase } from '$lib/utils/db';
import { getUserRepository } from '@e-ration/database';
import { redirect } from '@sveltejs/kit';

/** @type {import("@sveltejs/kit").Handle} */
export async function handle({ event, resolve }) {
	if (isProtectedRoute(event, AuthConfig.excludeRoutes)) {
		initializeDatabase();
		const session = getSession(event, AuthConfig);
		if (!session) {
			throw redirect(307, '/login');
		}
		event.locals.session = session;
		const user = await getUserRepository().findById(session.uid);
		if (user) {
			event.locals.user = user.toJson();
		}
		if (!user) {
			if (event.url.pathname != '/register') {
				throw redirect(307, '/register');
			}
		}
	}
	return resolve(event);
}
