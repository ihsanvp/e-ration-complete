import type { Item } from '@e-ration/database';
import { useMutation, useQueryClient, type MutationStoreResult } from '@sveltestack/svelte-query';

export interface AddItemData {
	name: string;
	unit: string;
}

export function useAddItem() {
	const queryClient = useQueryClient();

	const mutation = useMutation<Item, Error, AddItemData>(
		async (data) => {
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
		},
		{
			onSuccess: (result) => {
				queryClient.setQueryData<Item[]>('items', (old) => {
					if (old) {
						return [...old, result];
					}
					return [result];
				});
			}
		}
	);

	return mutation;
}

export type AddItemMutation = MutationStoreResult<Item, Error, AddItemData, unknown>;
