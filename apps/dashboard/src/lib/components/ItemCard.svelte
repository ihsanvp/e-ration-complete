<script lang="ts">
	import type { CategoryJson, Item, ItemJson } from '@e-ration/database';
	import Icon from '@iconify/svelte';
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { createEventDispatcher } from 'svelte';
	import DeleteDialog from './DeleteDialog.svelte';
	import { useCompleteData, useDeleteData } from '@e-ration/hooks';
	import type { ApiGetResult } from '$lib/utils/types';

	export let data: ItemJson;
	const dispatch = createEventDispatcher();

	const getCategories = useCompleteData<ApiGetResult<CategoryJson>>({
		key: 'categories-all',
		endpoint: '/api/categories'
	});
	const deleteItem = useDeleteData({
		endpoint: '/api/items',
		invalidateKeys: ['items', 'categories', 'categories-all', 'items-all']
	});

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

	function closeDelete(fn: VoidFunction) {
		$open = false;
		fn();
	}

	function getLinkedCategories(categories: CategoryJson[]): CategoryJson[] {
		return categories.filter((cat) =>
			cat.items ? cat.items.findIndex((item) => item.id == data.id) != -1 : false
		);
	}
</script>

<button
	type="button"
	use:melt={$trigger}
	class="grid grid-cols-6 p-3 border rounded-md items-center"
>
	<div class="col-span-3 flex items-start capitalize">{data.name}</div>
	<div class="col-span-2 flex capitalize">{data.unit}</div>
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
		<DeleteDialog query={getCategories} action={deleteItem}>
			<svelte:fragment slot="trigger" let:open>
				<button
					class="px-3 py-2 flex items-center justify-start gap-3 bg-red-100 rounded-md"
					use:melt={$item}
					on:click={open}
				>
					<Icon icon="material-symbols:delete" />
					<span>Delete</span>
				</button>
			</svelte:fragment>
			<svelte:fragment slot="query" let:close let:result>
				<h2 class="text-2xl font-medium text-center">Are you sure ?</h2>
				<h4 class="mt-5 mb-2 text-lg font-medium">Details</h4>
				<div class="flex items-center justify-start gap-3 capitalize">
					<span>Name: </span>
					<span>{data.name}</span>
				</div>
				<div class="flex items-center justify-start gap-3 capitalize">
					<span>Unit:</span>
					<span>{data.unit}</span>
				</div>
				{#if result && getLinkedCategories(result.data).length}
					<div class="flex items-center mt-5 mb-3 gap-5">
						<Icon class="text-yellow-600" width={30} icon="mdi:warning" />
						<div class="flex-1 text-md font-medium">
							This item will be removed from following <em>Categories</em>
						</div>
					</div>
					<ul class="list-disc pl-6">
						{#each getLinkedCategories(result.data) as category}
							<li>{category.name}</li>
						{/each}
					</ul>
				{/if}
				<div class="grid grid-cols-2 items-center gap-5 mt-5">
					<button
						class="bg-gray-200 py-3 text-sm rounded-md"
						type="button"
						on:click={() => closeDelete(close)}>Cancel</button
					>
					<button
						class="bg-red-500 text-white py-3 text-sm rounded-md"
						type="submit"
						on:click={() => $deleteItem.mutate(data.id)}>Delete</button
					>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="action" let:close>
				<div class="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center">
					<div class="flex-1 flex flex-col items-center justify-center p-5">
						<div class="text-2xl font-medium">Success</div>
						<div>Item ({data.name}) deleted</div>
					</div>
					<div class="p-5">
						<button
							on:click={() => closeDelete(close)}
							class="bg-black text-white px-10 py-3 text-sm rounded-md">Close</button
						>
					</div>
				</div>
			</svelte:fragment>
		</DeleteDialog>
	</div>
{/if}
