<script lang="ts" generics="D, E extends Error">
	import { createDialog, melt } from '@melt-ui/svelte';
	import type { MutationStoreResult, UseQueryStoreResult } from '@sveltestack/svelte-query';
	import Spinner from './Spinner.svelte';

	export let query: UseQueryStoreResult<void, E, D>;
	export let action: MutationStoreResult<void, E, string>;

	const {
		elements: { portalled, overlay, content, title, description },
		states: { open: show }
	} = createDialog({
		role: 'alertdialog',
		closeOnOutsideClick: false
	});

	export function close() {
		$show = false;
	}

	export function open() {
		$show = true;
	}
</script>

<slot name="trigger" {open} />
<div use:melt={$portalled}>
	{#if $show}
		<div class="fixed inset-0 z-50 backdrop-blur-sm bg-black/20" use:melt={$overlay} />
		<div
			class="fixed flex flex-col bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] w-[90vw] min-h-40 z-50 border border-white rounded-md p-5"
			use:melt={$content}
		>
			{#if $query.isLoading}
				<slot name="loading">
					<div class="absolute inset-0 z-50 bg-white flex items-center justify-center">
						<Spinner color="black" width="3px" size="40px" />
					</div>
				</slot>
			{:else if $action.isLoading}
				<slot name="loading">
					<div class="absolute inset-0 z-50 bg-white flex items-center justify-center">
						<Spinner color="black" width="3px" size="40px" />
					</div>
				</slot>
			{:else if $query.isError}
				<slot name="query-error" error={$query.error}>
					<div class="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center">
						<div class="flex-1 flex flex-col items-center justify-center p-5">
							<div class="text-2xl font-medium">Error</div>
							<div>{$query.error?.message}</div>
						</div>
						<div class="p-5">
							<button on:click={close} class="bg-black text-white px-10 py-3 text-sm rounded-md"
								>Close</button
							>
						</div>
					</div>
				</slot>
			{:else if $action.isError}
				<slot name="action-error" error={$action.error}>
					<div class="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center">
						<div class="flex-1 flex flex-col items-center justify-center p-5">
							<div class="text-2xl font-medium">Error</div>
							<div>{$action.error?.message}</div>
						</div>
						<div class="p-5">
							<button on:click={close} class="bg-black text-white px-10 py-3 text-sm rounded-md"
								>Close</button
							>
						</div>
					</div>
				</slot>
			{:else if $action.isSuccess}
				<slot name="action" result={$action.data} {close} />
			{/if}
			<slot name="query" result={$query.data} {close} />
		</div>
	{/if}
</div>
