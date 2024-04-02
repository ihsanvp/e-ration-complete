<script lang="ts" generics="D, E extends Error, I">
	import type { MutationStoreResult } from '@sveltestack/svelte-query';
	import Spinner from './Spinner.svelte';
	import Icon from '@iconify/svelte';

	export let action: MutationStoreResult<D, E, I>;
	export let successMessage: string = '';
</script>

{#if $action.isLoading}
	<div class="fixed inset-0 z-50 bg-white/20 backdrop-blur-sm flex items-center justify-center">
		<Spinner width="5px" color="black" size="80px" />
	</div>
{:else if $action.isError}
	<div class="fixed inset-0 z-50 bg-white flex items-center justify-center">
		<slot name="error" error={$action.error}>
			<div class="flex flex-col items-center justify-center p-5">
				<Icon class="text-red-500" width={120} icon="mingcute:close-circle-fill" />
				<div class="text-4xl font-medium mt-5">Error</div>
				<div class="text-md text-gray-600 text-center">{$action.error?.message}</div>
				<div class="w-full grid grid-cols-2 items-center gap-5 mt-5">
					<button
						class="w-full py-3 text-xs font-medium border border-gray-300 text-black rounded-md mt-5"
						on:click={() => window.history.back()}>Go back</button
					>
					<button
						class="w-full py-3 text-xs font-medium bg-black text-white rounded-md mt-5"
						on:click={() => $action.reset()}>Try again</button
					>
				</div>
			</div>
		</slot>
	</div>
{:else if $action.isSuccess}
	<div class="fixed inset-0 z-50 bg-white flex items-center justify-center">
		<slot name="success" data={$action.data}>
			<div class="flex flex-col items-center justify-center p-5">
				<Icon class="text-green-500" width={120} icon="ep:success-filled" />
				<div class="text-4xl font-medium">Success</div>
				{#if successMessage}
					<div class="text-md text-gray-600">{successMessage}</div>
				{/if}
				<button
					class="px-10 py-3 text-sm bg-black text-white rounded-md mt-5"
					on:click={() => window.history.back()}>Continue</button
				>
			</div>
		</slot>
	</div>
{/if}
