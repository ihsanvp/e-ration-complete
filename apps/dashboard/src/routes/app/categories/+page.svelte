<script lang="ts">
	import AddCategory from '$lib/components/AddCategory.svelte';
	import CategoryCard from '$lib/components/CategoryCard.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import type { ApiGetResult } from '$lib/utils/types';
	import type { CategoryJson } from '@e-ration/database';
	import { useInfiniteData } from '@e-ration/hooks';

	const query = useInfiniteData<ApiGetResult<CategoryJson>>({
		key: 'categories',
		endpoint: '/api/categories',
		limit: 10
	});
</script>

{#if $query.isLoading}
	<div class="h-[80vh] flex items-center justify-center">
		<Spinner color="black" width="3px" size="40px" />
	</div>
{:else if $query.isError}
	<span>An error has occurred: {$query.error.message}</span>
{:else if $query.isSuccess}
	<!-- <DeleteItemDialog bind:this={deleteItemDialog} /> -->
	<div class="flex items-center justify-between py-5 px-3 sticky top-16 bg-white border-b gap-5">
		<div class="flex-1">
			<input class="w-full border border-gray-300 rounded-md" type="search" placeholder="Search" />
		</div>
		<AddCategory />
	</div>
	<div class="grid grid-cols-6 border-b sticky px-5 py-5 bg-white top-36 items-center">
		<div class="text-lg font-medium col-span-3">Name</div>
		<div class="text-lg font-medium col-span-2">Unit</div>
	</div>
	<div class="flex flex-col gap-5 p-3">
		{#each $query.data.pages as page}
			{#each page.data as category}
				<CategoryCard data={category} />
				<!-- <ItemCard data={item} on:delete={onDeleteItem} /> -->
			{/each}
		{/each}
	</div>
{/if}
