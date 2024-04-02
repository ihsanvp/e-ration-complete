<script lang="ts" generics="D extends Record<string, any>">
	export let data: D;
	export let exclude: Array<keyof D> = [];

	function getData() {
		return Object.entries(data).filter(([key, value]) => !exclude.includes(key));
	}
</script>

<div class="p-5 border border-gray-300 rounded-md flex flex-col gap-3">
	{#each getData() as [key, value]}
		<div class="capitalize"><strong>{key} : </strong> {value}</div>
	{/each}
</div>
