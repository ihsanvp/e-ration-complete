import { initializeDatabase } from '$lib/utils/db.js';
import { Item, getItemRepository } from '@e-ration/database';
import { text } from '@sveltejs/kit';

/** @type {import("./$types").RequestHandler} */
export async function DELETE({ params }) {
	initializeDatabase();
	await getItemRepository().delete(params.id);
	return text('Success');
}
