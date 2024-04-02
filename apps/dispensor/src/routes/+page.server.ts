import { getCategoryRepository, type CategoryJson } from '@e-ration/database';
import { error } from '@sveltejs/kit';

/** @type {import("./$types").PageLoad} */
export async function load({ locals }) {
	const user = locals.user;
	if (!user) {
		return error(401);
	}
	if (!user.category) {
		return error(403);
	}
	const category = await getCategoryRepository().findById(user.category);
	if (!category) {
		return error(500, 'Invalid Category');
	}
	const serialized = (await getCategoryRepository().serialize(category)) as CategoryJson;
	const items = Array.isArray(serialized.items) ? serialized.items : [];
	return {
		category: serialized,
		items
	};
}
