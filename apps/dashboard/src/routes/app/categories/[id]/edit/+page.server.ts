import type { CategoryJson, ItemJson } from '@e-ration/database';
import { error } from '@sveltejs/kit';

/** @type {import("./$types").PageLoad} */
export async function load({ fetch, params }) {
	const response = await fetch(`/api/categories/${params.id}`);
	if (!response.ok) {
		return error(404);
	}
	const category = (await response.json()) as CategoryJson;
	const res = await fetch('/api/items');
	if (!response.ok) {
		return error(500);
	}
	const items = (await res.json()).data as ItemJson[];
	return {
		title: `Edit ${category.name}`,
		showBackButton: true,
		category,
		items
	};
}
