<script lang="ts">
	import type { ItemType } from '@e-ration/database';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<Events>();

	interface Events {
		submit: SubmitData;
	}

	interface Data {
		name: string;
		unit: string;
		type: string;
	}

	interface SubmitData extends Data {
		type: ItemType;
	}

	export let initial: Data = {
		name: '',
		unit: '',
		type: ''
	};

	let name: string = initial.name;
	let unit: string = initial.unit;
	let type: string = initial.type ?? '';

	function onSubmit() {
		if (name && unit) {
			dispatch('submit', {
				name: name.toLowerCase(),
				unit: unit.toLowerCase(),
				type: type as ItemType
			});
		}
	}
</script>

<form class="flex flex-col justify-between pb-24" on:submit|preventDefault={onSubmit}>
	<div class="flex-1 flex flex-col gap-5 overflow-y-scroll p-5">
		<label for="add-item__name">
			<p class="mb-2">Name</p>
			<input bind:value={name} required class="w-full rounded-md" type="text" id="add-item__name" />
		</label>
		<label for="add-item__type">
			<p class="mb-2">Type</p>
			<select bind:value={type} required class="w-full rounded-md" id="add-item__type">
				<option disabled selected value>------</option>
				<option value="solid">Solid</option>
				<option value="liquid">Liquid</option>
			</select>
		</label>
		<label for="add-item__unit">
			<p class="mb-2">Unit</p>
			<input bind:value={unit} required class="w-full rounded-md" type="text" id="add-item__unit" />
		</label>
	</div>
	<div
		class="fixed bottom-0 left-0 right-0 bg-white z-10 grid grid-cols-2 items-center gap-5 border-gray-300 border-t p-5"
	>
		<button
			class="border border-gray-300 text-black py-3 text-sm rounded-md"
			type="button"
			on:click={() => window.history.back()}>Cancel</button
		>
		<button class="bg-black text-white py-3 text-sm rounded-md" type="submit">Create</button>
	</div>
</form>
