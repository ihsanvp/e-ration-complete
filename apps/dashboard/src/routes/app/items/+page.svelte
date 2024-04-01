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
	import InfiniteScrollView from '$lib/components/InfiniteScrollView.svelte';

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

<InfiniteScrollView query={getItems}>
	<DeleteItemDialog bind:this={deleteItemDialog} />
	<svelte:fragment slot="toolbar">
		<div class="flex-1">
			<input class="w-full border border-gray-300 rounded-md" type="search" placeholder="Search" />
		</div>
		<ActionDialog name="Item" action={addItem} let:close on:close={$addItem.reset}>
			<AddButton slot="trigger" let:open onClick={open} />
			<ItemForm on:cancel={close} on:submit={(e) => $addItem.mutate(e.detail)} />
		</ActionDialog>
	</svelte:fragment>
	<svelte:fragment slot="header">
		<div class="grid grid-cols-6 border-b sticky px-5 py-5 bg-white top-36 items-center">
			<div class="text-lg font-medium col-span-3">Name</div>
			<div class="text-lg font-medium col-span-2">Unit</div>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="data" let:data>
		<ItemCard {data} on:delete={onDeleteItem} />
	</svelte:fragment>
</InfiniteScrollView>
