import { initializeDatabase } from '$lib/utils/db.js';
import { Item, getItemRepository } from '@e-ration/database';
import { json, text } from '@sveltejs/kit';

/** @type {import("@sveltejs/kit").RequestHandler} */
export async function GET({}) {
	initializeDatabase();
	const repo = getItemRepository();
	const item = Item.new({
		name: 'rice',
		unit: 'kg'
	});
	await repo.create(item);
	const items = await repo.find();
	return json(items);
}
