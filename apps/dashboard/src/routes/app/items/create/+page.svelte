<script lang="ts">
	import ItemForm from '$lib/components/ItemForm.svelte';
	import ActionLoader from '$lib/components/ActionLoader.svelte';
	import { useAddData } from '@e-ration/hooks';
	import type { ItemJson } from '@e-ration/database';

	interface Data {
		name: string;
		unit: string;
	}

	const addItem = useAddData<Data, ItemJson>({
		endpoint: '/api/items',
		invalidateKeys: ['items']
	});
</script>

<ActionLoader action={addItem} successMessage="New Item created successfully" />
<ItemForm on:submit={(e) => $addItem.mutate(e.detail)} />
