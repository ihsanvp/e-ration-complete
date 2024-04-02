import { error } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
	if (!locals.user) {
		return error(401, 'Unauthorized');
	}
	return {
		user: locals.user
	};
}
