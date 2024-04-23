<script lang="ts">
	import type { ItemJson } from '@e-ration/database';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import DeleteItemDialog from '$lib/components/DeleteItemDialog.svelte';
	import { useAddData, useInfiniteData } from '@e-ration/hooks';
	import type { ApiGetResult } from '$lib/utils/types';
	import AddButton from '$lib/components/AddButton.svelte';
	import InfiniteScrollView from '$lib/components/InfiniteScrollView.svelte';
	import { goto } from '$app/navigation';

	const getItems = useInfiniteData<ApiGetResult<ItemJson>>({
		key: 'items',
		endpoint: '/api/items',
		limit: 10
	});
</script>

<InfiniteScrollView query={getItems}>
	<svelte:fragment slot="toolbar">
		<div class="flex-1">
			<input class="w-full border border-gray-300 rounded-md" type="search" placeholder="Search" />
		</div>
		<AddButton onClick={() => goto('/app/items/create')} />
	</svelte:fragment>
	<svelte:fragment slot="header">
		<div class="grid grid-cols-8 border-b sticky px-5 py-4 bg-white top-36 items-center">
			<div class="text-lg font-medium col-span-4">Name</div>
			<div class="text-lg font-medium col-span-2">Type</div>
			<div class="text-lg font-medium col-span-1">Unit</div>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="data" let:data>
		<ItemCard {data} on:delete={(e) => goto(`/app/items/${e.detail.id}/delete`)} />
	</svelte:fragment>
</InfiniteScrollView>
