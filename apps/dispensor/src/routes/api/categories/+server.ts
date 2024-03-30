import { initializeDatabase } from '$lib/utils/db';
import { Category, CategoryItem, getCategoryRepository } from '@e-ration/database';
import { json } from '@sveltejs/kit';

/** @type {import("./$types")} */
export async function GET() {
	initializeDatabase();
	const repo = getCategoryRepository();

	const category = new Category();
	category.name = 'APL';

	const item1 = new CategoryItem();
	item1.id = 'A9rDkZm6Cxm5zcgxzbVQ';
	item1.name = 'rice';
	item1.unit = 'kg';
	item1.quantity = 5;

	// Create new with items
	await repo.createWithItems(category, [item1]);

	// Add new items to existing category
	const item2 = new CategoryItem();
	item2.id = 'DF2saRvY1VpZim4p38J4';
	item2.name = 'rice';
	item2.unit = 'kg';
	item2.quantity = 10;
	await category.items.create(item2);

	const categories = await repo.find();
	const data = await Promise.all(categories.map((c) => c.toJson()));
	return json(data);
}
