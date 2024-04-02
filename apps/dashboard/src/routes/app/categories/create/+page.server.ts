import type { ItemJson } from '@e-ration/database';
import { error } from '@sveltejs/kit';

/** @type {import("./$types").PageLoad} */
export async function load({ fetch }) {
	const response = await fetch('/api/items');
	if (!response.ok) {
		return error(500);
	}
	const items = (await response.json()).data as ItemJson[];
	return {
		title: 'Create Category',
		showBackButton: true,
		items
	};
}
