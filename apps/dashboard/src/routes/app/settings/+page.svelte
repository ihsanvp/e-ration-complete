<script lang="ts">
	// import { getFirestoreApp } from '$lib/firebase/firestore.client';
	import { createSwitch, melt } from '@melt-ui/svelte';
	import { doc, setDoc } from 'firebase/firestore';
	import type { ChangeEventHandler } from 'svelte/elements';

	const {
		elements: { root, input },
		states: { checked }
	} = createSwitch();

	async function updateMonthlyBooking(value: boolean) {
		// await setDoc(doc(getFirestoreApp(), 'settings', 'enableMonthlyBooking'), { value });
	}

	$: updateMonthlyBooking($checked);
</script>

<div class="p-5">
	<div class="flex items-center justify-between gap-10">
		<div class="flex flex-col gap-2">
			<div class="text-xl">Monthly Booking</div>
			<div class="text-xs text-gray-500">Only allow users to book items once per month</div>
		</div>
		<div>
			<button
				use:melt={$root}
				class="relative h-6 cursor-default rounded-full bg-gray-800 transition-colors data-[state=checked]:bg-green-500"
				id="airplane-mode"
				aria-labelledby="airplane-mode-label"
			>
				<span class="thumb block rounded-full bg-white transition" />
			</button>
			<input use:melt={$input} />
		</div>
	</div>
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
