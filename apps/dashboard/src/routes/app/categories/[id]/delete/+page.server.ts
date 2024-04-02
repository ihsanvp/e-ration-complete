import type { CategoryJson } from '@e-ration/database';
import { error } from '@sveltejs/kit';

/** @type {import("./$types").PageLoad} */
export async function load({ fetch, params }) {
	const response = await fetch(`/api/categories/${params.id}`);
	if (!response.ok) {
		return error(404);
	}
	const category = (await response.json()) as CategoryJson;
	return {
		title: `Delete ${category.name}`,
		showBackButton: true,
		category
	};
}
