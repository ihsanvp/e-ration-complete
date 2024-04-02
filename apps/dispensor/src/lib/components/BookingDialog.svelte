<script lang="ts">
	import { useAuth } from '$lib/auth/contexts.auth';
	import type { CategoryItemJson, CategoryJson } from '@e-ration/database';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { createEventDispatcher } from 'svelte';
	import BookingStatus from './BookingStatus.svelte';
	import { createBooking } from '$lib/utils/booking';

	export let items: CategoryItemJson[];
	export let category: CategoryJson;
	let loading = false;
	let confirmed = false;
	let bookingId: string | undefined = undefined;
	const user = useAuth();
	const dispatch = createEventDispatcher();

	const {
		elements: { trigger, portalled, overlay, content, title, description, close },
		states: { open }
	} = createDialog({
		role: 'alertdialog',
		closeOnOutsideClick: false
	});

	async function handleConfirmBooking() {
		try {
			confirmed = true;
			loading = true;
			bookingId = await createBooking({
				uid: user.id,
				category: category.id,
				items
			});
		} catch (err) {
			alert(err);
		} finally {
			loading = false;
		}
	}

	function handleExit() {
		$open = false;
		dispatch('exit');
	}

	function handleContinue() {
		$open = false;
		dispatch('continue');
	}

	$: {
		if ($open == false) {
			confirmed = false;
			bookingId = undefined;
		}
	}

	$: disabled = items.length == 0;
</script>

<button
	class="w-full bg-black text-white flex items-center justify-center py-4 rounded-sm"
	class:btndisabled={disabled}
	{disabled}
	use:melt={$trigger}
>
	Book Items
</button>

<div use:melt={$portalled}>
	{#if $open}
		<div class="fixed inset-0 z-50 backdrop-blur-sm bg-black/20" use:melt={$overlay} />
		<div
			class="fixed flex flex-col bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] w-[90vw] z-50 border border-white"
			use:melt={$content}
		>
			{#if confirmed}
				<BookingStatus bind:bookingId on:exit={handleExit} on:continue={handleContinue} />
			{/if}
			<h2 class="text-center text-2xl py-5" use:melt={$title}>Booking Details</h2>
			<div class="flex-1 flex flex-col gap-3 py-5 px-5" use:melt={$description}>
				{#each items as item}
					<div class="flex items-center justify-between">
						<div class="text-xl capitalize">{item.name}</div>
						<div class="text-md">{`${item.quantity}${item.unit}`}</div>
					</div>
				{/each}
			</div>
			<div class="flex items-center justify-center gap-5 p-5">
				<button
					class="rounded-sm border border-gray-300 text-black py-3 w-full text-sm"
					use:melt={$close}>Cancel</button
				>
				<button
					class="rounded-sm bg-black text-white py-3 w-full text-sm"
					on:click={handleConfirmBooking}>Confirm</button
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
