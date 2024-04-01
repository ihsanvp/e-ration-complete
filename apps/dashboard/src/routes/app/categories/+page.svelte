<script lang="ts">
	import ActionDialog from '$lib/components/ActionDialog.svelte';
	import AddButton from '$lib/components/AddButton.svelte';
	import CategoryCard from '$lib/components/CategoryCard.svelte';
	import CategoryForm from '$lib/components/CategoryForm.svelte';
	import DeleteDialog from '$lib/components/DeleteDialog.svelte';
	import InfiniteScrollView from '$lib/components/InfiniteScrollView.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import type { ApiGetResult } from '$lib/utils/types';
	import type { CategoryItemJson, CategoryJson, ItemJson } from '@e-ration/database';
	import { useAddData, useCompleteData, useDeleteData, useInfiniteData } from '@e-ration/hooks';

	interface InputData {
		name: string;
		items: CategoryItemJson[];
	}

	let currentDeletingCategory: CategoryJson;
	let deleteDialog: DeleteDialog<CategoryJson, ApiGetResult<ItemJson>, Error>;

	const getItems = useCompleteData<ApiGetResult<ItemJson>>({
		key: 'items-all',
		endpoint: '/api/items'
	});

	const deleteCategory = useDeleteData({
		endpoint: '/api/items',
		invalidateKeys: ['categories', 'items', 'items-all']
	});

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
	<svelte:fragment slot="data" let:data>
		<CategoryCard {data} />
	</svelte:fragment>
</InfiniteScrollView>
