<script lang="ts">
	import type { PageData } from './$types';
	import Switch from '$lib/components/Switch.svelte';
	import { browser } from '$app/environment';

	export let data: PageData;
	let enableMonthlyBooking = data.monthlyBooking.value;

	console.log(data.monthlyBooking);

	async function updateMonthlyBooking(value: boolean) {
		await fetch(`/api/configurations/${data.monthlyBooking.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: data.monthlyBooking.id,
				value
			})
		});
	}

	$: if (browser) {
		updateMonthlyBooking(enableMonthlyBooking);
	}
</script>

<div class="p-5">
	<div class="flex items-center justify-between gap-10">
		<div class="flex flex-col gap-2">
			<div class="text-xl">Monthly Booking</div>
			<div class="text-xs text-gray-500">Only allow users to book items once per month</div>
		</div>
		<div>
			<Switch bind:value={enableMonthlyBooking} />
		</div>
	</div>
</div>
