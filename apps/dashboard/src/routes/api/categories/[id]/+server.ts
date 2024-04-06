import { CategoryItem, getCategoryRepository, getUserRepository } from '@e-ration/database';
import { error, json, text } from '@sveltejs/kit';
import { z } from 'zod';

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

const schema = z.object({
	id: z.string(),
	name: z.string(),
	items: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			unit: z.string(),
			quantity: z.number()
		})
	)
});

/** @type {import("./$types").RequestHandler} */
export async function POST({ params, request }) {
	const repo = getCategoryRepository();
	const body = await request.json();
	const data = schema.parse(body);
	const category = await repo.findById(data.id);
	if (!category) {
		return error(404);
	}
	const items = await category.items.find();
	const toDeleteItems = items.filter((item) => data.items.findIndex((i) => i.id == item.id) == -1);
	category.name = data.name;
	for (const itemData of toDeleteItems) {
		await category.items.delete(itemData.id);
	}
	for (const itemData of data.items) {
		let item = await category.items.findById(itemData.id);
		if (item) {
			item.name = itemData.name;
			item.quantity = itemData.quantity;
			item.unit = itemData.unit;
			await category.items.update(item);
		} else {
			item = CategoryItem.fromJson(itemData);
			await category.items.create(item);
		}
	}
	await repo.update(category);
	const serialized = await repo.serialize(category);
	return json(serialized);
}
