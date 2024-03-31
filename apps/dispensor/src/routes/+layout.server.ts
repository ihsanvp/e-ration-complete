import { initializeDatabase } from '$lib/utils/db.js';
import { getUserRepository } from '@e-ration/database';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
	if (locals.session) {
		return {
			user: locals.user,
			session: locals.session
		};
	}
	return {
		user: undefined,
		session: undefined
	};
}
