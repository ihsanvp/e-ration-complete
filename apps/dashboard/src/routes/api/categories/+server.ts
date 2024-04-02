import { initializeDatabase } from '$lib/utils/db.js';
import { getPaginationLimit } from '$lib/utils/params.js';
import { Category, getCategoryRepository } from '@e-ration/database';
import { error, json } from '@sveltejs/kit';
import { z } from 'zod';

/** @type {import("./$types").RequestHandler} */
export async function GET({ url }) {
	let data: Category[];
	let cursor: string | undefined;
	const limit = getPaginationLimit(url.searchParams);
	const repo = getCategoryRepository();
	if (limit) {
		data = await repo.paginate({
			orderBy: 'created',
			limit: limit,
			cursor: url.searchParams.get('cursor')
		});
		cursor = data.length == limit ? data[data.length - 1].id : undefined;
	} else {
		data = await repo.orderByAscending('created').find();
	}
	const categoryItems = await Promise.all(data.map((category) => category.items.find()));
	return json({
		cursor: cursor,
		data: data.map((category, i) => ({
			...category.toJson(),
			items: categoryItems[i].map((item) => item.toJson())
		}))
	});
}

const schema = z.object({
	name: z.string(),
	items: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			unit: z.string(),
			quantity: z.number()
		})
	)
});

/** @type {import("./$types").RequestHandler} */
export async function POST({ request }) {
	const body = await request.json();
	const data = schema.parse(body);

	try {
		const category = await getCategoryRepository().createWithData(data);
		return json(category);
	} catch (err) {
		return error(400, String(err));
	}
}
