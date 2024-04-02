import type { CategoryJson, ItemJson } from '@e-ration/database';
import { error } from '@sveltejs/kit';

/** @type {import("./$types").PageLoad} */
export async function load({ params, fetch }) {
	const itemRes = await fetch(`/api/items/${params.id}`);
	if (!itemRes.ok) {
		return error(404);
	}
	const catRes = await fetch('/api/categories');
	if (!catRes.ok) {
		return error(500);
	}
	const item = (await itemRes.json()) as ItemJson;
	const categories = (await catRes.json()).data as CategoryJson[];
	const linkedCategories = categories.filter((cat) =>
		cat.items ? cat.items.findIndex((i) => i.id == item.id) != -1 : false
	);
	return {
		title: `Delete ${item.name}`,
		showBackButton: true,
		item,
		linkedCategories
	};
}
