import { ItemService, type GetItemsResult } from '$lib/services/item.service';
import { useInfiniteQuery } from '@sveltestack/svelte-query';

interface UseItemsConfig {
	limit: number;
}
export function useItems(config: UseItemsConfig) {
	return useInfiniteQuery<GetItemsResult, Error, GetItemsResult>(
		'items',
		async ({ pageParam }) =>
			ItemService.get({
				limit: config.limit,
				cursor: pageParam
			}),
		{
			getNextPageParam: (last) => last.cursor || undefined
		}
	);
}
