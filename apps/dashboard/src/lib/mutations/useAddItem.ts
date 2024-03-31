import { ItemService, type AddItemData } from '$lib/services/item.service';
import type { Item } from '@e-ration/database';
import { useMutation, useQueryClient, type MutationStoreResult } from '@sveltestack/svelte-query';

export function useAddItem() {
	const queryClient = useQueryClient();

	const mutation = useMutation<Item, Error, AddItemData>(ItemService.add, {
		onSuccess: () => {
			queryClient.invalidateQueries('items');
		}
	});

	return mutation;
}

export type AddItemMutation = MutationStoreResult<Item, Error, AddItemData, unknown>;
