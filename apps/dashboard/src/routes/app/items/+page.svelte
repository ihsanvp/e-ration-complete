<script>
	import AddItemDialog from '$lib/components/AddItemDialog.svelte';
	import { useAddItem } from '$lib/mutations/useAddItem';

	const addItem = useAddItem();
</script>

<!-- <DeleteItemDialog bind:this={deleteItemDialog} /> -->
<div class="flex items-center justify-between py-5 px-3 sticky top-16 bg-white border-b gap-5">
	<div class="flex-1">
		<input class="w-full border border-gray-300 rounded-md" type="search" placeholder="Search" />
	</div>
	<AddItemDialog action={addItem} />
</div>
<div class="grid grid-cols-6 border-b sticky px-5 py-5 bg-white top-36 items-center">
	<div class="text-lg font-medium col-span-4">Name</div>
	<div class="text-lg font-medium col-span-1 flex justify-end">Unit</div>
</div>
<!-- <div class="flex flex-col gap-5 p-3">
	{#each $queryResult.data as item}
		<ItemBlock on:delete={onDeleteItem} data={item} />
	{/each}
</div> -->
