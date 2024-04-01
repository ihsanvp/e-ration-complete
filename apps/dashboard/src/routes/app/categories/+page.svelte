<script lang="ts">
	import ActionDialog from '$lib/components/ActionDialog.svelte';
	import AddButton from '$lib/components/AddButton.svelte';
	import CategoryCard from '$lib/components/CategoryCard.svelte';
	import CategoryForm from '$lib/components/CategoryForm.svelte';
	import InfiniteScrollView from '$lib/components/InfiniteScrollView.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import type { ApiGetResult } from '$lib/utils/types';
	import type { CategoryItemJson, CategoryJson } from '@e-ration/database';
	import { useAddData, useInfiniteData } from '@e-ration/hooks';

	interface InputData {
		name: string;
		items: CategoryItemJson[];
	}

	const getCategories = useInfiniteData<ApiGetResult<CategoryJson>>({
		key: 'categories',
		endpoint: '/api/categories',
		limit: 10
	});

	const addCategory = useAddData<InputData, CategoryJson>({
		endpoint: '/api/categories',
		invalidateKeys: ['categories']
	});
</script>

<InfiniteScrollView query={getCategories}>
	<svelte:fragment slot="toolbar">
		<div class="flex-1">
			<input class="w-full border border-gray-300 rounded-md" type="search" placeholder="Search" />
		</div>
		<ActionDialog name="Item" action={addCategory} let:close on:close={$addCategory.reset}>
			<AddButton slot="trigger" let:open onClick={open} />
			<CategoryForm on:cancel={close} on:submit={(e) => $addCategory.mutate(e.detail)} />
		</ActionDialog>
	</svelte:fragment>
	<svelte:fragment slot="header">
		<div class="grid grid-cols-6 border-b sticky px-5 py-5 bg-white top-36 items-center">
			<div class="text-lg font-medium col-span-3">Name</div>
			<div class="text-lg font-medium col-span-2">Unit</div>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="data" let:data>
		<CategoryCard {data} />
	</svelte:fragment>
</InfiniteScrollView>
