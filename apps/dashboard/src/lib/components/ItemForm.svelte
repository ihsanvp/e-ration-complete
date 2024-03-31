<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	interface Data {
		name: string;
		unit: string;
	}

	export let initial: Data = {
		name: '',
		unit: ''
	};

	let name: string = initial.name;
	let unit: string = initial.unit;

	function onSubmit() {
		if (name && unit) {
			dispatch('submit', { name, unit });
		}
	}

	function onCancel() {
		dispatch('cancel');
	}
</script>

<form class="p-5 flex flex-col gap-5" on:submit|preventDefault={onSubmit}>
	<label for="add-item__name">
		<p class="mb-2">Name</p>
		<input bind:value={name} required class="w-full rounded-md" type="text" id="add-item__name" />
	</label>
	<label for="add-item__unit">
		<p class="mb-2">Unit</p>
		<input bind:value={unit} required class="w-full rounded-md" type="text" id="add-item__unit" />
	</label>
	<div class="grid grid-cols-2 items-center gap-5 mt-5">
		<button class="bg-gray-200 py-3 text-sm rounded-md" type="button" on:click={onCancel}
			>Cancel</button
		>
		<button class="bg-black text-white py-3 text-sm rounded-md" type="submit">Create</button>
	</div>
</form>
