<script lang="ts">
	import type { CategoryJson, ItemJson } from '@e-ration/database';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	import DeleteDialog from './DeleteDialog.svelte';
	import { useCompleteData, useDeleteData } from '@e-ration/hooks';
	import type { ApiGetResult } from '$lib/utils/types';

	export let data: CategoryJson;

	const getItems = useCompleteData<ApiGetResult<ItemJson>>({
		key: 'items-all',
		endpoint: '/api/items'
	});

	const deleteCategory = useDeleteData({
		endpoint: '/api/items',
		invalidateKeys: ['categories', 'items', 'items-all']
	});
</script>

<div class="flex flex-col p-5 border rounded-md border-gray-500">
	<div class="text-2xl font-medium">{data.name}</div>
	{#if data.items}
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
			class="flex-1 bg-black text-white py-3 text-sm rounded-md font-medium flex items-center justify-center gap-3"
		>
			<Icon width={20} class="-ml-3" icon="material-symbols:edit" />
			<span> Edit </span>
		</button>
		<DeleteDialog query={getItems} action={deleteCategory}>
			<svelte:fragment slot="trigger" let:open>
				<button
					on:click={open}
					class="flex-1 bg-red-500 text-white py-3 text-sm rounded-md font-medium flex items-center justify-center gap-3"
				>
					<Icon width={20} class="-ml-3" icon="material-symbols:delete" />
					<span> Delete </span>
				</button>
			</svelte:fragment>
			<svelte:fragment slot="query" let:close let:result>
				<h2 class="text-xl font-medium text-center">Delete Category</h2>
				<p class="text-sm text-center">Are you sure you want to delete this category?</p>
				<div class="flex items-center justify-between mt-5">
					<span>Name</span>
					<span>{data.name}</span>
				</div>
				<div class="grid grid-cols-2 items-center gap-5 mt-5">
					<button class="bg-gray-200 py-3 text-sm rounded-md" type="button" on:click={close}
						>Cancel</button
					>
					<button class="bg-black text-white py-3 text-sm rounded-md" type="submit">Delete</button>
				</div>
			</svelte:fragment>
		</DeleteDialog>
	</div>
</div>
