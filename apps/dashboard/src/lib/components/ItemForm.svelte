<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<Events>();

	interface Events {
		submit: Data;
	}

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
</script>

<form
	class="flex flex-col justify-between h-[calc(100vh_-_theme(space.16))]"
	on:submit|preventDefault={onSubmit}
>
	<div class="flex-1 flex flex-col gap-5 overflow-y-scroll p-5">
		<label for="add-item__name">
			<p class="mb-2">Name</p>
			<input bind:value={name} required class="w-full rounded-md" type="text" id="add-item__name" />
		</label>
		<label for="add-item__unit">
			<p class="mb-2">Unit</p>
			<input bind:value={unit} required class="w-full rounded-md" type="text" id="add-item__unit" />
		</label>
	</div>
	<div class="grid grid-cols-1 items-center gap-5 mt-5 border-gray-300 border-t p-5">
		<button class="bg-black text-white py-3 text-sm rounded-md" type="submit">Create</button>
	</div>
</form>
