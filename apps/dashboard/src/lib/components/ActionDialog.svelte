<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import Icon from '@iconify/svelte';
	import Spinner from './Spinner.svelte';
	import type { MutationStoreResult } from '@sveltestack/svelte-query';
	import { createEventDispatcher } from 'svelte';

	export let titleName: string;
	export let isLoading: boolean;
	export let isError: boolean;
	export let isSuccess: boolean;
	export let error: Error | null;

	const dispatch = createEventDispatcher();

	const {
		elements: { trigger, portalled, overlay, content, title, description, close },
		states: { open }
	} = createDialog({
		role: 'alertdialog',
		closeOnOutsideClick: false
	});

	function closeModal() {
		$open = false;
		dispatch('close');
	}

	function openModal() {
		$open = true;
	}
</script>

<slot name="trigger" open={openModal} />

<div use:melt={$portalled}>
	{#if $open}
		<div class="fixed inset-0 z-50 backdrop-blur-sm bg-black/20" use:melt={$overlay} />
		<div
			class="fixed flex flex-col bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] w-[90vw] z-50 border border-white rounded-md"
			use:melt={$content}
		>
			{#if isLoading}
				<div class="absolute inset-0 z-50 bg-white flex items-center justify-center">
					<Spinner color="black" width="3px" size="40px" />
				</div>
			{:else if isError}
				<div class="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center">
					<div class="flex-1 flex flex-col items-center justify-center p-5">
						<div class="text-2xl font-medium">Error</div>
						<div class="text-center mt-5">{error?.message}</div>
					</div>
					<div class="p-5">
						<button on:click={closeModal} class="bg-black text-white px-10 py-3 text-sm rounded-md"
							>Close</button
						>
					</div>
				</div>
			{:else if isSuccess}
				<div class="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center">
					<div class="flex-1 flex flex-col items-center justify-center p-5">
						<div class="text-2xl font-medium">Success</div>
						<div>New {titleName} added</div>
					</div>
					<div class="p-5">
						<button on:click={closeModal} class="bg-black text-white px-10 py-3 text-sm rounded-md"
							>Close</button
						>
					</div>
				</div>
			{/if}
			<h2 use:melt={$title} class="text-xl font-medium p-5 text-center">Create new {titleName}</h2>
			<div class="overflow-y-scroll">
				<slot close={closeModal} />
			</div>
		</div>
	{/if}
</div>
