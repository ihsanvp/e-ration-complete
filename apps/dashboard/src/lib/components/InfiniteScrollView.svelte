<script lang="ts" generics="D, E extends Error">
	import { type ApiGetResult } from '$lib/utils/types';

	import { type UseInfiniteQueryStoreResult } from '@sveltestack/svelte-query';
	import Spinner from './Spinner.svelte';

	export let query: UseInfiniteQueryStoreResult<ApiGetResult<D>, E>;
</script>

{#if $query.isLoading}
	<slot name="loading">
		<div class="h-[80vh] flex items-center justify-center">
			<Spinner color="black" width="3px" size="40px" />
		</div>
	</slot>
{:else if $query.isError}
	<slot name="error">
		<span>An error has occurred: {$query.error.message}</span>
	</slot>
{:else if $query.isSuccess}
	<div class="flex items-center justify-between py-5 px-3 sticky top-16 bg-white border-b gap-5">
		<slot name="toolbar" />
	</div>
	<slot name="header" />
	<div class="flex flex-col gap-5 p-3">
		{#each $query.data.pages as page}
			{#each page.data as doc}
				<slot name="data" data={doc} />
			{/each}
		{/each}
	</div>
	<slot />
{/if}
