<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { MouseEventHandler } from 'svelte/elements';

	export let onClick: MouseEventHandler<HTMLButtonElement> = () => {};
</script>

<button
	on:click={onClick}
	class="p-2 flex items-center justify-center border rounded-md bg-black text-white"
>
	<Icon width={25} icon="material-symbols:add" />
</button>
