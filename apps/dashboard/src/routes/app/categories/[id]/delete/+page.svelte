<script lang="ts">
	import DataView from '$lib/components/DataView.svelte';
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col h-[calc(100vh_-_theme(space.16))]">
	<div class="flex-1 overflow-y-scroll">
		<h2 class="text-center font-medium text-3xl px-5 py-10">Are you sure to delete this item?</h2>
		<div class=" p-5">
			<DataView data={{}} exclude={[]} />
		</div>
		{#if true}
			<div class="p-5">
				<div class="flex items-center mt-5 mb-3 gap-5">
					<Icon class="text-yellow-500" width={50} icon="ep:warning-filled" />
					<div class="flex-1 text-2xl font-medium">Linked Categories</div>
				</div>
				<p class="text-sm text-gray-600">
					This item will also be removed from the following categories
				</p>
				<!-- <ul class="list-disc pl-6 mt-5">
					{#each data.linkedCategories as category}
						<li>{category.name}</li>
					{/each}
				</ul> -->
			</div>
		{/if}
	</div>
	<div class="grid grid-cols-2 items-center gap-5 mt-5 border-gray-300 border-t p-5">
		<button
			class="bg-black text-white py-3 text-sm font-medium rounded-md"
			on:click={() => window.history.back()}>Cancel</button
		>
		<button class="bg-red-500 text-white py-3 text-sm font-medium rounded-md">Delete</button>
	</div>
</div>