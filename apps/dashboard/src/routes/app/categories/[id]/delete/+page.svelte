<script lang="ts">
	import DataView from '$lib/components/DataView.svelte';
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';
	import { useDeleteData } from '@e-ration/hooks';
	import ActionLoader from '$lib/components/ActionLoader.svelte';
	import Switch from '$lib/components/Switch.svelte';

	export let data: PageData;
	let forceDelete = false;

	const deleteCategory = useDeleteData({
		endpoint: '/api/categories',
		invalidateKeys: ['categories']
	});

	$: isDeleteDisabled = forceDelete ? false : data.linkedUsers.length > 0;
</script>

<ActionLoader action={deleteCategory} successMessage="Successfully deleted category" />
<div class="flex flex-col pb-20">
	<div class="flex-1 overflow-y-scroll">
		<h2 class="text-center font-medium text-3xl px-5 py-10">
			Are you sure to delete this Category?
		</h2>
		<div class=" p-5">
			<DataView data={data.category} exclude={['id', 'created', 'items.id']} />
		</div>
		{#if data.linkedUsers.length}
			<div class="p-5">
				<div class="flex items-center mt-5 mb-3 gap-5">
					<Icon class="text-red-500" width={50} icon="tdesign:close-circle-filled" />
					<div class="flex-1 text-2xl font-medium">Linked Users</div>
				</div>
				<p class="text-sm text-gray-600">
					This category needs to be force deleted because it is assigned to following users.
				</p>
				<ul class="list-disc pl-6 mt-5">
					{#each data.linkedUsers as user}
						<li>{user.name} ({user.phoneNumber})</li>
					{/each}
				</ul>
				<div class="flex items-center mt-10">
					<div class="flex-1 pr-5">
						<div class="text-xl">Force Delete</div>
						<p class="text-xs text-gray-600 mt-2">
							The above users might have to update their category on next login
						</p>
					</div>
					<div>
						<Switch bind:value={forceDelete} />
					</div>
				</div>
			</div>
		{/if}
	</div>
	<div
		class="fixed bottom-0 left-0 right-0 z-10 bg-white grid grid-cols-2 items-center gap-5 border-gray-300 border-t p-5"
	>
		<button
			class="bg-black text-white py-3 text-sm font-medium rounded-md"
			on:click={() => window.history.back()}>Cancel</button
		>
		<button
			disabled={isDeleteDisabled}
			class:disabled={isDeleteDisabled}
			class="bg-red-500 text-white py-3 text-sm font-medium rounded-md"
			on:click={() => $deleteCategory.mutate(data.category.id)}>Delete</button
		>
	</div>
</div>

<style>
	.disabled {
		@apply opacity-50;
	}
</style>
