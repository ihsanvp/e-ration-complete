import { CategoryService, type GetCategoriesResult } from '$lib/services/category.service';
import { useInfiniteQuery } from '@sveltestack/svelte-query';

interface UseCategoriesConfig {
	limit: number;
}
export function useCategories(config: UseCategoriesConfig) {
	return useInfiniteQuery<GetCategoriesResult, Error, GetCategoriesResult>(
		'categories',
		async ({ pageParam }) =>
			CategoryService.get({
				limit: config.limit,
				cursor: pageParam
			}),
		{
			getNextPageParam: (last) => last.cursor || undefined
		}
	);
}
