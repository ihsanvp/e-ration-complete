<script lang="ts" generics="D extends Record<string, any>">
	import type { CategoryJson } from '@e-ration/database';
	import objectPath from 'object-path';

	export let data: D;
	export let exclude: string[];
	export let level = 1;

	function getData() {
		return Object.entries(data).filter(([key, value]) => !exclude.includes(key));
	}

	function getNextExclude(property: string) {
		return exclude
			.filter((key) => key.split('.').length > 1 && key.split('.')[0] == property)
			.map((key) =>
				key
					.split('.')
					.filter((_, i) => i != 0)
					.join('.')
			);
	}
</script>

<div
	class="p-5 border border-gray-300 rounded-md flex flex-col gap-3"
	style={`margin-left: ${level * 20}px`}
>
	{#each getData() as [key, value]}
		{#if Array.isArray(value) && value.length}
			<div class="flex flex-col gap-3">
				<div class="capitalize font-bold">{key} :</div>
				{#each value as view}
					<svelte:self data={view} level={level + 1} exclude={getNextExclude(key)} />
				{/each}
			</div>
		{:else if !Array.isArray(value)}
			<div class="capitalize"><strong>{key} : </strong> {value}</div>
		{/if}
	{/each}
</div>
