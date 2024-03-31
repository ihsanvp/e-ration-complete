<script lang="ts">
	import AddItemDialog from '$lib/components/AddItemDialog.svelte';
	import { useAddItem } from '$lib/mutations/useAddItem';
	import type { ItemJson } from '@e-ration/database';
	import Spinner from '$lib/components/Spinner.svelte';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import DeleteItemDialog from '$lib/components/DeleteItemDialog.svelte';
	import { useItems } from '$lib/queries/useItems';

	let deleteItemDialog: DeleteItemDialog;

	const addItem = useAddItem();
	const itemsQuery = useItems({ limit: 10 });

	function onDeleteItem(e: CustomEvent<ItemJson>) {
		deleteItemDialog.start(e.detail);
	}
</script>

{#if $itemsQuery.isLoading}
	<div class="h-[80vh] flex items-center justify-center">
		<Spinner color="black" width="3px" size="40px" />
	</div>
{:else if $itemsQuery.isError}
	<span>An error has occurred: {$itemsQuery.error.message}</span>
{:else if $itemsQuery.isSuccess}
	<DeleteItemDialog bind:this={deleteItemDialog} />
	<div class="flex items-center justify-between py-5 px-3 sticky top-16 bg-white border-b gap-5">
		<div class="flex-1">
			<input class="w-full border border-gray-300 rounded-md" type="search" placeholder="Search" />
		</div>
		<AddItemDialog action={addItem} />
	</div>
	<div class="grid grid-cols-6 border-b sticky px-5 py-5 bg-white top-36 items-center">
		<div class="text-lg font-medium col-span-3">Name</div>
		<div class="text-lg font-medium col-span-2">Unit</div>
	</div>
	<div class="flex flex-col gap-5 p-3">
		{#each $itemsQuery.data.pages as page}
			{#each page.items as item}
				<ItemCard data={item} on:delete={onDeleteItem} />
			{/each}
		{/each}
	</div>
{/if}
