<script lang="ts">
	import type { ItemJson } from '@e-ration/database';
	import Icon from '@iconify/svelte';
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { createEventDispatcher } from 'svelte';

	export let data: ItemJson;
	const dispatch = createEventDispatcher();

	const {
		elements: { trigger, menu, item, separator, arrow },
		states: { open }
	} = createDropdownMenu({
		forceVisible: true,
		loop: true,
		closeOnItemClick: false,
		closeOnOutsideClick: true,
		positioning: {
			placement: 'bottom-end'
		}
	});
</script>

<button type="button" use:melt={$trigger} class="grid grid-cols-6 gap-3 p-3 border rounded-md">
	<div class="col-span-4 flex items-start text-left capitalize">{data.name}</div>
	<div class="col-span-1 flex capitalize">{data.unit}</div>
	<div class="col-span-1 flex justify-end items-center">
		<Icon icon="mi:options-vertical" />
	</div>
</button>

{#if $open}
	<div use:melt={$menu} class="bg-white flex flex-col gap-1 w-52 border rounded-md z-40 p-3">
		<button
			class="px-3 py-2 flex items-center justify-start gap-3 bg-gray-100 rounded-md"
			use:melt={$item}
			on:click={() => dispatch('edit', data)}
		>
			<Icon icon="material-symbols:edit" />
			<span>Edit</span>
		</button>
		<button
			class="px-3 py-2 flex items-center justify-start gap-3 bg-red-100 rounded-md"
			use:melt={$item}
			on:click={() => dispatch('delete', data)}
		>
			<Icon icon="material-symbols:delete" />
			<span>Delete</span>
		</button>
	</div>
{/if}
