<script lang="ts">
	import type { CategoryItemJson, ItemJson } from '@e-ration/database';
	import Switch from './Switch.svelte';

	interface ManagerItem extends ItemJson {
		quantity: number | undefined;
		selected: boolean;
	}

	export let items: ManagerItem[];

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
			.filter((item) => item.selected && item.quantity)
			.map((item) => ({
				id: item.id,
				name: item.name,
				unit: item.unit,
				quantity: item.quantity ?? 0
			}));
	}
</script>

<div class="flex flex-col gap-3">
	<span class="mb-2">Choose Items</span>
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
					required={item.selected}
					disabled={!item.selected}
					min="0.1"
					step="0.1"
				/>
				<p class="capitalize">{item.unit}</p>
			</div>
			<div class="flex items-center justify-end col-span-1">
				<Switch value={item.selected} on:change={(e) => handleSwitchChange(item, e.detail)} />
			</div>
		</div>
	{/each}
</div>

<style>
	.notselected {
		@apply line-through;
	}
</style>
