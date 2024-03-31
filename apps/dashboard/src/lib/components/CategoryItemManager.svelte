<script lang="ts">
	import { createCombobox, melt } from '@melt-ui/svelte';
	import { useCompleteData } from '@e-ration/hooks';
	import type { CategoryItemJson, ItemJson } from '@e-ration/database';
	import Switch from './Switch.svelte';
	import Spinner from './Spinner.svelte';
	import type { ApiGetResult } from '$lib/utils/types';
	import type {
		QueryObserverSuccessResult,
		UseQueriesResult,
		UseQueryResult
	} from '@sveltestack/svelte-query';
	import { onMount } from 'svelte';

	interface ManagerItem extends ItemJson {
		quantity: number;
		selected: boolean;
	}

	export let initial: CategoryItemJson[] | undefined = undefined;

	const query = useCompleteData<ApiGetResult<ItemJson>>({
		key: 'items-all',
		endpoint: '/api/items'
	});

	function initialize(
		init: CategoryItemJson[] | undefined,
		q: UseQueryResult<ApiGetResult<ItemJson>, Error>
	): ManagerItem[] {
		if (q.isSuccess) {
			if (init) {
				return q.data.data.map((item) => {
					const matched = init.find((i) => i.id == item.id);
					if (matched) {
						return { ...item, quantity: matched.quantity, selected: true };
					}
					return { ...item, quantity: 0, selected: false };
				});
			} else {
				return q.data.data.map((item) => ({ ...item, quantity: 0, selected: false }));
			}
		}
		return [];
	}

	$: items = initialize(initial, $query);

	onMount(() => {
		if (!initial) {
			$query.refetch();
		}
	});

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput },
		helpers: { isSelected }
	} = createCombobox({
		forceVisible: true,
		multiple: false
	});

	function handleSwitchChange(item: ItemJson, state: boolean) {
		items = items.map((i) => {
			if (i.id == item.id) {
				return {
					...i,
					selected: state
				};
			}
			return i;
		});
	}

	function handleQuantityChange(item: ItemJson, value: string) {
		items = items.map((i) => {
			if (i.id == item.id) {
				return {
					...i,
					quantity: parseFloat(value)
				};
			}
			return i;
		});
	}

	export function getData(): CategoryItemJson[] {
		return items
			.filter((item) => item.selected)
			.map((item) => ({
				id: item.id,
				name: item.name,
				unit: item.unit,
				quantity: item.quantity
			}));
	}
</script>

<div class="flex flex-col gap-3">
	<span class="font-medium text-magnum-900 mb-3">Choose Items</span>
	{#if $query.isLoading}
		<div class="flex items-center justify-center py-5">
			<Spinner color="black" size="40px" width="3px" />
		</div>
	{:else if $query.isSuccess}
		{#each items as item}
			<div class="grid grid-cols-4 items-center border border-gray-300 rounded-sm px-3 py-2">
				<div class="font-medium capitalize col-span-2" class:notselected={!item.selected}>
					{item.name}
				</div>
				<div class="col-span-1 flex items-center justify-start gap-1 text-sm">
					<input
						value={item.quantity}
						on:change={(e) => handleQuantityChange(item, e.currentTarget.value)}
						class="w-10 text-center"
						type="number"
					/>
					<p class="capitalize">{item.unit}</p>
				</div>
				<div class="flex items-center justify-end col-span-1">
					<Switch value={item.selected} on:change={(e) => handleSwitchChange(item, e.detail)} />
				</div>
			</div>
		{/each}
	{/if}
</div>

<style>
	.notselected {
		@apply line-through;
	}
</style>
