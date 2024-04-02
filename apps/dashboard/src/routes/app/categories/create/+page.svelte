<script lang="ts">
	import ActionLoader from '$lib/components/ActionLoader.svelte';
	import CategoryForm from '$lib/components/CategoryForm.svelte';
	import { useAddData } from '@e-ration/hooks';
	import type { PageData } from '../$types';

	export let data: PageData;

	const addCategory = useAddData({
		endpoint: '/api/categories',
		invalidateKeys: ['categories']
	});
</script>

<ActionLoader action={addCategory} successMessage="New category successfully created" />
<CategoryForm items={data.items} on:submit={(e) => $addCategory.mutate(e.detail)} />
