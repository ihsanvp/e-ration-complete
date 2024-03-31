import type { ItemJson } from '@e-ration/database';

export const ItemService = {
	remove,
	get,
	add
};

async function remove(id: string) {
	const response = await fetch(`/api/items/${id}`, {
		method: 'DELETE'
	});
	if (!response.ok) {
		throw new Error(await response.text());
	}
}

export interface GetItemsResult {
	cursor?: string;
	items: ItemJson[];
}
interface GetItemsConfig {
	limit: number;
	cursor?: undefined;
}
async function get(config: GetItemsConfig): Promise<GetItemsResult> {
	const params = new URLSearchParams([['limit', config.limit.toString()]]);
	if (config.cursor) {
		params.append('cursor', config.cursor);
	}
	const response = await fetch(`/api/items?${params.toString()}`);
	if (response.ok) {
		return await response.json();
	}
	throw new Error(await response.text());
}

export interface AddItemData {
	name: string;
	unit: string;
}
async function add(data: AddItemData) {
	const response = await fetch('/api/items', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	if (response.ok) {
		return await response.json();
	} else {
		const data = await response.json();
		if (data.message) {
			throw new Error(data.message);
		}
		const message = await response.text();
		throw new Error(message);
	}
}
