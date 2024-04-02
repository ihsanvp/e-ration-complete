<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Spinner from './Spinner.svelte';

	export let bookingId: string | undefined = undefined;
	const dispatch = createEventDispatcher();
</script>

<div class="absolute bg-white inset-0 flex flex-col items-center justify-center">
	{#if bookingId}
		<div class="flex-1 flex flex-col items-center justify-center p-5 gap-3">
			<div class="text-2xl">Booking Confirmed</div>
			<div class="text-4xl">{`#${bookingId}`}</div>
		</div>
		<div class="flex items-center justify-center px-2 py-5 gap-5">
			<button
				class="border border-gray-300 text-black rounded-sm px-10 py-3 text-sm"
				on:click={() => dispatch('continue')}>Book Again</button
			>
			<button
				class="bg-black text-white rounded-sm px-10 py-3 text-sm"
				on:click={() => dispatch('exit')}>Exit</button
			>
		</div>
	{:else}
		<Spinner color="black" size="40px" width="3px" />
	{/if}
</div>
