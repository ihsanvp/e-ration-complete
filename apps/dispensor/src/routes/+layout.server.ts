import { initializeDatabase } from '$lib/utils/db.js';
import { getUserRepository } from '@e-ration/database';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
	if (locals.session) {
		initializeDatabase();
		const user = await getUserRepository().findById(locals.session.uid);
		return {
			user: user.toJson(),
			session: locals.session
		};
	}
	return {
		user: undefined,
		session: undefined
	};
}
