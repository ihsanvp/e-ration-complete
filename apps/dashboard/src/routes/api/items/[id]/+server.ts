import { initializeDatabase } from '$lib/utils/db.js';
import { Item, getCategoryRepository, getItemRepository } from '@e-ration/database';
import { error, json, text } from '@sveltejs/kit';

/** @type {import("./$types").RequestHandler} */
export async function GET({ params }) {
	initializeDatabase();
	const item = await getItemRepository().findById(params.id);
	if (!item) {
		return error(404);
	}
	return json(item.toJson());
}

/** @type {import("./$types").RequestHandler} */
export async function DELETE({ params }) {
	initializeDatabase();
	await getItemRepository().deleteWithLinkedCategoryItems(params.id);
	return text('Success');
}
