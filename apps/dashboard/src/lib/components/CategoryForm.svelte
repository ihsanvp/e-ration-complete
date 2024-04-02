<script lang="ts">
	import type { CategoryItemJson, ItemJson } from '@e-ration/database';
	import CategoryItemManager from './CategoryItemManager.svelte';
	import { createEventDispatcher } from 'svelte';

	interface Data {
		name: string;
		items?: CategoryItemJson[];
	}

	export let items: ItemJson[];
	export let initial: Data = {
		name: '',
		items: undefined
	};

	let itemsManager: CategoryItemManager;
	let name: string = initial.name;

	const dispatch = createEventDispatcher();

	function createManagerItems() {
		if (initial.items) {
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

<form
	class="flex flex-col justify-between h-[calc(100vh_-_theme(space.16))]"
	on:submit|preventDefault={onSubmit}
>
	<div class="flex-1 flex flex-col overflow-y-scroll p-5 gap-5">
		<label for="add-item__name">
			<p class="mb-2">Name</p>
			<input required bind:value={name} class="w-full rounded-md" type="text" id="add-item__name" />
		</label>
		<CategoryItemManager bind:this={itemsManager} items={createManagerItems()} />
	</div>
	<div class="grid grid-cols-2 items-center gap-5 border-gray-300 border-t p-5">
		<button
			class="border border-gray-300 text-black py-3 text-sm rounded-md"
			type="button"
			on:click={() => window.history.back()}>Cancel</button
		>
		<button class="bg-black text-white py-3 text-sm rounded-md" type="submit">Create</button>
	</div>
</form>
