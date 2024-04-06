<script lang="ts">
	import type { CategoryJson } from '@e-ration/database';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';

	export let data: CategoryJson;
</script>

<div class="flex flex-col p-5 border rounded-md border-gray-500">
	<div class="text-2xl font-medium">{data.name}</div>
	{#if Array.isArray(data.items) && data.items.length}
		<div class="bg-gray-100 rounded-md p-3 mt-5">
			<div class="flex items-center justify-between mb-3">
				<div class="font-bold">Item</div>
				<div class="font-bold">Quantity</div>
			</div>
			{#each data.items as item}
				<div class="flex items-center justify-between">
					<div class="capitalize">{item.name}</div>
					<div>{item.quantity}{item.unit}</div>
				</div>
			{/each}
		</div>
	{/if}
	<div class="flex items-center gap-5 mt-5">
		<button
			on:click={() => goto(`/app/categories/${data.id}/edit`)}
			class="flex-1 bg-black text-white py-3 text-sm rounded-md font-medium flex items-center justify-center gap-3"
		>
			<Icon width={20} class="-ml-3" icon="material-symbols:edit" />
			<span> Edit </span>
		</button>
		<button
			on:click={() => goto(`/app/categories/${data.id}/delete`)}
			class="flex-1 bg-red-500 text-white py-3 text-sm rounded-md font-medium flex items-center justify-center gap-3"
		>
			<Icon width={20} class="-ml-3" icon="material-symbols:delete" />
			<span> Delete </span>
		</button>
	</div>
</div>
