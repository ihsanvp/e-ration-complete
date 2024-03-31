import { initializeDatabase } from '$lib/utils/db';
import { getPaginationLimit } from '$lib/utils/params.js';
import { Item, getItemRepository } from '@e-ration/database';
import { error, json } from '@sveltejs/kit';
import { z } from 'zod';

/** @type {import("./$types").RequestHandler} */
export async function GET({ url }) {
	initializeDatabase();
	let items: Item[];
	let cursor: string | undefined;
	const limit = getPaginationLimit(url.searchParams);
	const repo = getItemRepository();
	if (limit) {
		items = await repo.paginate({
			orderBy: 'created',
			limit: limit,
			cursor: url.searchParams.get('cursor')
		});
		cursor = items.length == limit ? items[items.length - 1].id : undefined;
	} else {
		items = await repo.orderByAscending('created').find();
	}
	return json({
		cursor: cursor,
		data: items.map((i) => i.toJson())
	});
}

const schema = z.object({
	name: z.string(),
	unit: z.string()
});

/** @type {import("./$types").RequestHandler} */
export async function POST({ request }) {
	const body = await request.json();
	const data = schema.parse(body);

	try {
		initializeDatabase();
		const item = await getItemRepository().createWithData(data);
		return json(item);
	} catch (err) {
		return error(400, String(err));
	}
}
