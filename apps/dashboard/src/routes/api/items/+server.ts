import { initializeDatabase } from '$lib/utils/db';
import { Item, getItemRepository } from '@e-ration/database';
import { error, json } from '@sveltejs/kit';
import { z } from 'zod';

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
