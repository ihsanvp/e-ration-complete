import { getPaginationLimit } from '$lib/utils/params.js';
import { getCategoryRepository } from '@e-ration/database';
import { json } from '@sveltejs/kit';

/** @type {import("./$types").RequestHandler} */
export async function GET({ url }) {
	const LIMIT = getPaginationLimit(url.searchParams);
	const categories = await getCategoryRepository().paginate({
		orderBy: 'created',
		limit: LIMIT,
		cursor: url.searchParams.get('cursor')
	});
	const cursor = categories.length == LIMIT ? categories[categories.length - 1].id : undefined;
	return json({
		cursor: cursor,
		data: categories.map((c) => c.toJson())
	});
}
