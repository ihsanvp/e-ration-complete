import { FIREBASE_ADMIN_KEY } from '$env/static/private';
import { AuthConfig } from '$lib/auth/config.auth';
import { getSession } from '$lib/auth/session.auth';
import { isApiRequest, isProtectedRoute } from '$lib/auth/utils.auth';
import { initializeDatabase } from '$lib/utils/db';
import { getUserRepository } from '@e-ration/database';
import { json, redirect } from '@sveltejs/kit';

/** @type {import("@sveltejs/kit").Handle} */
export async function handle({ event, resolve }) {
	initializeDatabase();

	if (isProtectedRoute(event, AuthConfig.excludeRoutes)) {
		const session = getSession(event, AuthConfig);
		if (!session) {
			throw redirect(307, '/login');
		}
		event.locals.session = session;
		const user = await getUserRepository().findById(session.uid);
		if (user) {
			event.locals.user = user.toJson();
		}
		if (!user || user.category == null || user.rationNumber == null) {
			if (event.url.pathname != '/register' && event.url.pathname != '/api/auth/register') {
				throw redirect(307, '/register');
			}
		}
	}
	return resolve(event);
}
