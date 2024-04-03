import { getPaginationLimit } from '$lib/utils/params.js';
import { getUserRepository, type User } from '@e-ration/database';
import { json } from '@sveltejs/kit';

/** @type {import("./$types").RequestHandler} */
export async function GET({ url }) {
	let data: User[];
	let cursor: string | undefined;
	const limit = getPaginationLimit(url.searchParams);
	const repo = getUserRepository();
	if (limit) {
		data = await repo.paginate({
			orderBy: 'created',
			cursor: url.searchParams.get('cursor'),
			limit
		});
		cursor = data.length == limit ? data[data.length - 1].id : undefined;
	} else {
		data = await repo.orderByAscending('created').find();
	}
	const category = url.searchParams.get('category');
	if (category) {
		data = data.filter((user) => user.category?.id == category);
	}
	const serialized = await repo.serialize(data);
	return json({
		cursor,
		data: serialized
	});
}
