import { getCategoryRepository, getUserRepository } from '@e-ration/database';
import { error, json, text } from '@sveltejs/kit';

/** @type {import("./$types").RequestHandler} */
export async function GET({ params }) {
	const repo = getCategoryRepository();
	const category = await repo.findById(params.id);
	if (!category) {
		return error(404);
	}
	const serialized = await repo.serialize(category);
	return json(serialized);
}

/** @type {import("./$types").RequestHandler} */
export async function DELETE({ params }) {
	const repo = getCategoryRepository();
	const category = await repo.findById(params.id);
	if (!category) {
		return error(404);
	}
	await repo.forceDeleteWithLinkedUsers(category);
	return text('Success');
}
