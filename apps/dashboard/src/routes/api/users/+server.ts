import { getUserRepository, type User } from '@e-ration/database';
import { json } from '@sveltejs/kit';

/** @type {import("./$types").RequestHandler} */
export async function GET({ url }) {
	let data: User[];
	const repo = getUserRepository();
	const category = url.searchParams.get('category');
	if (category) {
		data = await repo.whereEqualTo((user) => user.category, category).find();
	} else {
		data = await repo.find();
	}
	const serialized = await repo.serialize(data);
	return json({
		data: serialized
	});
}
