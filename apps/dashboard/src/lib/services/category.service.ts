import type { CategoryJson } from '@e-ration/database';

export const CategoryService = {
	get
};

export interface GetCategoriesResult {
	cursor?: string;
	data: CategoryJson;
}
interface GetCategoriesConfig {
	limit: number;
	cursor?: undefined;
}
async function get(config: GetCategoriesConfig): Promise<GetCategoriesResult> {
	const params = new URLSearchParams([['limit', config.limit.toString()]]);
	if (config.cursor) {
		params.append('cursor', config.cursor);
	}
	const response = await fetch(`/api/categories?${params.toString()}`);
	if (response.ok) {
		return await response.json();
	}
	throw new Error(await response.text());
}
