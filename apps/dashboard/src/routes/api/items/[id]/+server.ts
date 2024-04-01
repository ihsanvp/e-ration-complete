import { initializeDatabase } from '$lib/utils/db.js';
import { Item, getCategoryRepository, getItemRepository } from '@e-ration/database';
import { text } from '@sveltejs/kit';

/** @type {import("./$types").RequestHandler} */
export async function DELETE({ params }) {
	initializeDatabase();
	await getItemRepository().deleteWithLinkedCategoryItems(params.id);
	return text('Success');
}
