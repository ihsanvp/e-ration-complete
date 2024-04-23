<script lang="ts">
	import type { CategoryItemJson, ItemJson } from '@e-ration/database';
	import CategoryItemManager from './CategoryItemManager.svelte';
	import { createEventDispatcher } from 'svelte';

	interface Data {
		name: string;
		items?: CategoryItemJson[];
	}

	export let label: string;
	export let items: ItemJson[];
	export let initial: Data | undefined = undefined;

	let itemsManager: CategoryItemManager;
	let name: string = initial ? initial.name : '';

	$: disabled = calculateDisabled(initial, itemsManager, name);

	function calculateDisabled(
		i: Data | undefined,
		manager: CategoryItemManager | undefined,
		n: string
	): boolean {
		if (i) {
			let d: Data = {
				name: n,
				items: manager ? manager.getData() : []
			};
			let f: Data = {
				name: i.name,
				items: i.items
			};
			return JSON.stringify(d) == JSON.stringify(f);
		}
		return false;
	}

	const dispatch = createEventDispatcher();

	function createManagerItems() {
		if (initial) {
			if (!initial.items) {
				initial.items = [];
			}
			return items.map((item) => {
				const matched = initial.items?.find((i) => i.id == item.id);
				if (matched) {
					return {
						...item,
						quantity: matched?.quantity,
						selected: true
					};
				}
				return {
					...item,
					quantity: undefined,
					selected: false
				};
			});
		}
		return items.map((item) => ({
			...item,
			quantity: undefined,
			selected: false
		}));
	}

	function onSubmit() {
		if (name) {
			dispatch('submit', { name, items: itemsManager.getData() });
		}
	}
</script>

<form class="flex flex-col justify-between pb-24" on:submit|preventDefault={onSubmit}>
	<div class="flex-1 flex flex-col overflow-y-scroll p-5 gap-5">
		<label for="add-item__name">
			<p class="mb-2">Name</p>
			<input required bind:value={name} class="w-full rounded-md" type="text" id="add-item__name" />
		</label>
		<CategoryItemManager
			on:change={() => (disabled = calculateDisabled(initial, itemsManager, name))}
			bind:this={itemsManager}
			items={createManagerItems()}
		/>
	</div>
	<div
		class="fixed bottom-0 left-0 right-0 bg-white z-20 grid grid-cols-2 items-center gap-5 border-gray-300 border-t p-5"
	>
		<button
			class="border border-gray-300 text-black py-3 text-sm rounded-md"
			type="button"
			on:click={() => window.history.back()}>Cancel</button
		>
		<button
			class="bg-black text-white py-3 text-sm rounded-md"
			type="submit"
			{disabled}
			class:disabled>{label}</button
		>
	</div>
</form>

<style>
	.disabled {
		@apply opacity-20;
	}
</style>
