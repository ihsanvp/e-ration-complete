import { initializeDatabase } from '$lib/utils/db.js';
import { getItemRepository } from '@e-ration/database';

/** @type {import("./$types").PageLoad} */
export async function load(event) {
	initializeDatabase();
	const repo = getItemRepository();
	const items = await repo;
}
