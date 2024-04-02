import { initializeDatabase } from '$lib/utils/db.js';
import { error } from '@sveltejs/kit';

/** @type {import("./$types").RequestHandler} */
export async function DELETE({ params }) {
	return error(450);
}
