<script lang="ts">
	import CategoryForm from '$lib/components/CategoryForm.svelte';
	import { useUpdateData } from '@e-ration/hooks';
	import type { PageData } from './$types';
	import ActionLoader from '$lib/components/ActionLoader.svelte';
	import type { CategoryItemJson } from '@e-ration/database';
	import { page } from '$app/stores';

	export let data: PageData;

	export let updateCategory = useUpdateData({
		endpoint: '/api/categories',
		invalidateKeys: ['categories']
	});

	function handleSubmit(e: CustomEvent<{ name: string; items: CategoryItemJson[] }>) {
		const data = {
			id: $page.params.id,
			name: e.detail.name,
			items: e.detail.items
		};
		$updateCategory.mutate(data);
	}
</script>

<ActionLoader action={updateCategory} successMessage="Category updated successfully" />
<CategoryForm label="Update" initial={data.category} items={data.items} on:submit={handleSubmit} />
