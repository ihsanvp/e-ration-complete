<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import Icon from '@iconify/svelte';
	import { useQueryClient, useMutation } from '@sveltestack/svelte-query';
	import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
	import { getFirestoreApp } from '$lib/firebase/firestore.client';
	import type { Item, ItemData } from '$lib/models/items.models';
	import Spinner from './Spinner.svelte';

	let data: Item;

	const {
		elements: { trigger, portalled, overlay, content, title, description, close },
		states: { open }
	} = createDialog({
		role: 'alertdialog',
		closeOnOutsideClick: false
	});

	export function start(item: Item) {
		data = item;
		$open = true;
	}

	const queryClient = useQueryClient();

	const mutation = useMutation<void, Error, Item>(
		async (item) => {
			await deleteDoc(doc(getFirestoreApp(), 'items', item.id));
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('items');
				queryClient.invalidateQueries('users');
			}
		}
	);

	function closeModal() {
		$open = false;
		$mutation.reset();
	}
</script>

<div use:melt={$portalled}>
	{#if $open}
		<div class="fixed inset-0 z-50 backdrop-blur-sm bg-black/20" use:melt={$overlay} />
		<div
			class="fixed flex flex-col bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] w-[90vw] z-50 border border-white rounded-md p-5"
			use:melt={$content}
		>
			{#if $mutation.isLoading}
				<div class="absolute inset-0 z-50 bg-white flex items-center justify-center">
					<Spinner color="black" width="3px" size="40px" />
				</div>
			{:else if $mutation.isError}
				<div class="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center">
					<div class="flex-1 flex flex-col items-center justify-center p-5">
						<div class="text-2xl font-medium">Error</div>
						<div>{$mutation.error?.message}</div>
					</div>
					<div class="p-5">
						<button on:click={closeModal} class="bg-black text-white px-10 py-3 text-sm rounded-md"
							>Close</button
						>
					</div>
				</div>
			{:else if $mutation.isSuccess}
				<div class="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center">
					<div class="flex-1 flex flex-col items-center justify-center p-5">
						<div class="text-2xl font-medium">Success</div>
						<div>Item ({data.name}) deleted</div>
					</div>
					<div class="p-5">
						<button on:click={closeModal} class="bg-black text-white px-10 py-3 text-sm rounded-md"
							>Close</button
						>
					</div>
				</div>
			{/if}
			<h2 use:melt={$title} class="text-xl font-medium text-center">Delete Item</h2>
			<p class="text-sm text-center" use:melt={$description}>
				Are you sure you want to delete this item?
			</p>
			<div class="flex items-center justify-between mt-5">
				<span>Name</span>
				<span>{data.name}</span>
			</div>
			<div class="flex items-center justify-between">
				<span>Unit</span>
				<span>{data.unit}</span>
			</div>
			<div class="flex items-center justify-between">
				<span>Max Quantity</span>
				<span>{data.max_quantity}</span>
			</div>
			<div class="grid grid-cols-2 items-center gap-5 mt-5">
				<button class="bg-gray-200 py-3 text-sm rounded-md" type="button" use:melt={$close}
					>Cancel</button
				>
				<button
					on:click={() => $mutation.mutate(data)}
					class="bg-black text-white py-3 text-sm rounded-md"
					type="submit">Delete</button
				>
			</div>
		</div>
	{/if}
</div>

<style>
	.btndisabled {
		@apply opacity-30;
	}
</style>
