<script lang="ts">
	import type { ItemJson } from '@e-ration/database';
	import Spinner from '$lib/components/Spinner.svelte';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import DeleteItemDialog from '$lib/components/DeleteItemDialog.svelte';
	import { useAddData, useInfiniteData } from '@e-ration/hooks';
	import type { ApiGetResult } from '$lib/utils/types';
	import AddButton from '$lib/components/AddButton.svelte';
	import ItemForm from '$lib/components/ItemForm.svelte';
	import ActionDialog from '$lib/components/ActionDialog.svelte';

	interface AddItemData {
		name: string;
		unit: string;
	}

	let deleteItemDialog: DeleteItemDialog;

	const getItems = useInfiniteData<ApiGetResult<ItemJson>>({
		key: 'items',
		endpoint: '/api/items',
		limit: 10
	});
	const addItem = useAddData<AddItemData, ItemJson>({
		endpoint: '/api/items',
		invalidateKeys: ['items']
	});

	function onDeleteItem(e: CustomEvent<ItemJson>) {
		deleteItemDialog.open(e.detail);
	}
</script>

{#if $getItems.isLoading}
	<div class="h-[80vh] flex items-center justify-center">
		<Spinner color="black" width="3px" size="40px" />
	</div>
{:else if $getItems.isError}
	<span>An error has occurred: {$getItems.error.message}</span>
{:else if $getItems.isSuccess}
	<DeleteItemDialog bind:this={deleteItemDialog} />
	<div class="flex items-center justify-between py-5 px-3 sticky top-16 bg-white border-b gap-5">
		<div class="flex-1">
			<input class="w-full border border-gray-300 rounded-md" type="search" placeholder="Search" />
		</div>
		<ActionDialog
			titleName="Item"
			isLoading={$addItem.isLoading}
			isError={$addItem.isError}
			isSuccess={$addItem.isSuccess}
			error={$addItem.error}
			let:close
			on:close={$addItem.reset}
		>
			<AddButton slot="trigger" let:open onClick={open} />
			<ItemForm on:cancel={close} on:submit={(e) => $addItem.mutate(e.detail)} />
		</ActionDialog>
	</div>
	<div class="grid grid-cols-6 border-b sticky px-5 py-5 bg-white top-36 items-center">
		<div class="text-lg font-medium col-span-3">Name</div>
		<div class="text-lg font-medium col-span-2">Unit</div>
	</div>
	<div class="flex flex-col gap-5 p-3">
		{#each $getItems.data.pages as page}
			{#each page.data as item}
				<ItemCard data={item} on:delete={onDeleteItem} />
			{/each}
		{/each}
	</div>
{/if}
