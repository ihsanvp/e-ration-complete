<script lang="ts">
	import type { CategoryItemJson } from '@e-ration/database';
	import CategoryItemManager from './CategoryItemManager.svelte';
	import { createEventDispatcher } from 'svelte';

	interface Data {
		name: string;
		items?: CategoryItemJson[];
	}

	export let initial: Data = {
		name: '',
		items: undefined
	};

	let itemsManager: CategoryItemManager;
	let name: string = initial.name;
	let items: CategoryItemJson[] | undefined = initial.items;

	const dispatch = createEventDispatcher();

	function onSubmit() {
		if (name) {
			dispatch('submit', { name, items: itemsManager.getData() });
		}
	}

	function onCancel() {
		dispatch('cancel');
	}
</script>

<form class="p-5 flex flex-col gap-5 overflow-y-scroll" on:submit|preventDefault={onSubmit}>
	<label for="add-item__name">
		<p class="mb-2">Name</p>
		<input required bind:value={name} class="w-full rounded-md" type="text" id="add-item__name" />
	</label>
	<CategoryItemManager bind:this={itemsManager} initial={initial.items} />
	<div class="grid grid-cols-2 items-center gap-5 mt-5">
		<button class="bg-gray-200 py-3 text-sm rounded-md" type="button" on:click={onCancel}
			>Cancel</button
		>
		<button class="bg-black text-white py-3 text-sm rounded-md" type="submit">Create</button>
	</div>
</form>
