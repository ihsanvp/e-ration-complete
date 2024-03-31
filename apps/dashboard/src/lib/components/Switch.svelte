<script lang="ts">
	import { createSwitch, melt } from '@melt-ui/svelte';
	import { createEventDispatcher, onMount } from 'svelte';

	export let value: boolean = false;

	const dispatch = createEventDispatcher();
	const {
		elements: { root, input },
		states: { checked }
	} = createSwitch();

	onMount(() => {
		$checked = value;
	});

	$: dispatch('change', $checked);
</script>

<div class="flex items-center justify-center">
	<button
		use:melt={$root}
		class="relative h-6 cursor-default rounded-full bg-gray-800 transition-colors data-[state=checked]:bg-green-500"
	>
		<span class="thumb block rounded-full bg-white transition" />
	</button>
	<input class="absolute" use:melt={$input} />
</div>

<style>
	button {
		--w: 2.75rem;
		--padding: 0.125rem;
		width: var(--w);
	}

	.thumb {
		--size: 1.25rem;
		width: var(--size);
		height: var(--size);
		transform: translateX(var(--padding));
	}

	:global([data-state='checked']) .thumb {
		transform: translateX(calc(var(--w) - var(--size) - var(--padding)));
	}
</style>
